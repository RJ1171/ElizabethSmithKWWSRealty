const SOURCE_AGENT_PAGE = "https://willisandsmith.com/agents/elizabeth-smith";
const GRAPHQL_ENDPOINT = "https://willisandsmith.com/api-gw/graphql";
const COMPANY_ID = "3b1aa99a-1923-4741-ac63-63eee47210f4";
const MINIMUM_FEATURED_PRICE = 800000;
const MAX_FEATURED_LISTINGS = 3;
const FEATURED_AGENT_NAME = "Elizabeth Smith";
const FEATURED_PROPERTY_STATUS = "For Sale";

const PROPERTY_QUERY = `
  query Properties(
    $agentIds: [ID!]
    $companyId: String
    $websiteId: ID
    $limit: Int
    $sort: String
    $sortDir: SortDirectionEnum
    $salesPriceGTE: Float
    $leaseProperty: Boolean
    $advancedFilters: JSON
  ) {
    properties(
      agentIds: $agentIds
      companyId: $companyId
      websiteId: $websiteId
      limit: $limit
      sort: $sort
      sortDir: $sortDir
      salesPriceGTE: $salesPriceGTE
      leaseProperty: $leaseProperty
      advancedFilters: $advancedFilters
    ) {
      id
      status
      originalStatus {
        name
      }
      salesPrice
      bedroomCount
      bathCount
      fullAddress
      addressLine1
      addressCity
      addressState
      postalCode
      description
      slug
      mlsId
      livingSpaceSize
      media {
        largeUrl
        xLargeUrl
        xxLargeUrl
      }
    }
  }
`;

function decodeHtml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x3D;/g, "=")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripTags(value) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getVariables(agentPageHtml) {
  const match = agentPageHtml.match(/data-variables="([^"]+)"/);
  if (!match) throw new Error("Could not find Willis & Smith listing variables.");

  const variables = JSON.parse(decodeHtml(match[1]));
  return {
    ...variables,
    companyId: COMPANY_ID,
    salesPriceGTE: MINIMUM_FEATURED_PRICE,
    limit: 80
  };
}

function detailPath(property) {
  return `/properties/${property.slug}`;
}

function detailUrl(property) {
  return `https://willisandsmith.com${detailPath(property)}`;
}

function extractAgentName(detailHtml) {
  const agentMatches = [...detailHtml.matchAll(/property-details-tabs-agent__name">\s*([^<]+)\s*</g)]
    .map((match) => stripTags(match[1]));
  return agentMatches.find((name) => name === FEATURED_AGENT_NAME) || "";
}

function extractPropertyStatus(detailHtml) {
  const statusBlock = detailHtml.match(/Property Status[\s\S]{0,500}?property-details-tabs-copy__value">\s*([^<]+)\s*</);
  return statusBlock ? stripTags(statusBlock[1]) : "";
}

function extractPropertyType(detailHtml) {
  const typeBlock = detailHtml.match(/Property Type[\s\S]{0,500}?property-details-tabs-copy__value">\s*([^<]+)\s*</);
  return typeBlock ? stripTags(typeBlock[1]) : "Residential";
}

function extractGalleryImages(detailHtml, property) {
  const escapedMls = String(property.mlsId || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const imagePattern = new RegExp(`https://dlajgvw9htjpb\\.cloudfront\\.net/cms/${COMPANY_ID}/${escapedMls}/[^"'\\)\\s<]+\\.jpg`, "g");
  const detailImages = [...detailHtml.matchAll(imagePattern)].map((match) => match[0]);
  const apiImages = (property.media || [])
    .flatMap((media) => [media.xxLargeUrl, media.xLargeUrl, media.largeUrl])
    .filter(Boolean);
  return [...new Set([...detailImages, ...apiImages])];
}

function normalizeListing(property, detailHtml) {
  const images = extractGalleryImages(detailHtml, property);

  return {
    id: property.mlsId || property.id,
    address: property.addressLine1,
    city: property.addressCity,
    state: property.addressState,
    zipCode: property.postalCode,
    price: Number(property.salesPrice || 0),
    beds: Number(property.bedroomCount || 0),
    baths: Number(property.bathCount || 0),
    squareFeet: Number.parseInt(property.livingSpaceSize || "0", 10),
    propertyType: extractPropertyType(detailHtml),
    description: stripTags(property.description || ""),
    status: extractPropertyStatus(detailHtml),
    badge: FEATURED_PROPERTY_STATUS,
    agentName: extractAgentName(detailHtml),
    primaryImage: images[0] || "",
    images,
    propertyUrl: detailUrl(property),
    mlsNumber: property.mlsId || "",
    updatedAt: new Date().toISOString().slice(0, 10),
    sourceAgentPage: SOURCE_AGENT_PAGE
  };
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "user-agent": "Mozilla/5.0"
    }
  });

  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  return response.text();
}

async function fetchCandidateProperties(variables) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      query: PROPERTY_QUERY,
      variables
    })
  });

  if (!response.ok) throw new Error(`Willis & Smith GraphQL returned ${response.status}`);

  const json = await response.json();
  if (json.errors) throw new Error(json.errors.map((error) => error.message).join("; "));
  return json.data.properties || [];
}

module.exports = async function handler(request, response) {
  try {
    const agentPageHtml = await fetchText(SOURCE_AGENT_PAGE);
    const variables = getVariables(agentPageHtml);
    const candidates = await fetchCandidateProperties(variables);

    const verified = [];

    for (const property of candidates) {
      if (property.status !== "FOR_SALE") continue;
      if (Number(property.salesPrice || 0) < MINIMUM_FEATURED_PRICE) continue;

      const propertyDetailHtml = await fetchText(detailUrl(property));
      const listing = normalizeListing(property, propertyDetailHtml);

      if (listing.agentName !== FEATURED_AGENT_NAME) continue;
      if (listing.status !== FEATURED_PROPERTY_STATUS) continue;

      verified.push(listing);
    }

    verified.sort((a, b) => b.price - a.price);

    response.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=3600");
    response.status(200).json(verified.slice(0, MAX_FEATURED_LISTINGS));
  } catch (error) {
    response.status(500).json({
      error: "Unable to retrieve verified Willis & Smith listings.",
      message: error.message
    });
  }
};
