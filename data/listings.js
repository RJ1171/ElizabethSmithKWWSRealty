/*
  Manual Featured Listings Admin Notes

  1. Add a listing by copying one object in the listings array and giving it a new id.
  2. Remove a listing by deleting its object from the array.
  3. Change status with the status field: "active", "under-agreement", or "sold".
  4. Paste the Zillow URL into zillowUrl.
  5. Add image paths in primaryImage and images. Use relative paths such as "assets/property-front.jpg".
  6. Only active listings priced at $800,000 or more will appear.
  7. The site displays the three highest-priced qualifying listings.

  Only use listing data that Elizabeth Smith, Willis & Smith Group, Keller Williams,
  or the approved IDX/MLS provider has permission to display.
*/

export const ALL_LISTINGS_URL = "https://www.zillow.com/profile/elizabethsmithws";

export const listings = [
  {
    id: "placeholder-listing-1",
    address: "123 North Shore Road",
    city: "Newburyport",
    state: "MA",
    zipCode: "01950",
    price: 1425000,
    beds: 4,
    baths: 3.5,
    squareFeet: 3280,
    propertyType: "Single Family",
    description: "Placeholder listing copy for a premier North Shore residence with generous living spaces, refined finishes, and inviting outdoor areas. Replace this text with the approved property description supplied by Elizabeth Smith, Willis & Smith Group, Keller Williams, or an approved MLS/IDX provider.",
    status: "active",
    badge: "New Listing",
    agentName: "Elizabeth Smith",
    coListingAgent: "Willis & Smith Group",
    primaryImage: "assets/coastal-hero.png",
    images: ["assets/coastal-hero.png", "assets/elizabeth-smith-portrait.jpg"],
    zillowUrl: "https://www.zillow.com/",
    mlsNumber: "PLACEHOLDER-1",
    updatedAt: "2026-07-18"
  },
  {
    id: "placeholder-listing-2",
    address: "48 Harbor View Lane",
    city: "Marblehead",
    state: "MA",
    zipCode: "01945",
    price: 1189000,
    beds: 3,
    baths: 2.5,
    squareFeet: 2710,
    propertyType: "Condominium",
    description: "Placeholder listing copy for a polished coastal home close to local amenities, commuter routes, and favorite North Shore destinations. Replace these details with the approved listing language before publishing live property information.",
    status: "active",
    badge: "Open House",
    agentName: "Elizabeth Smith",
    primaryImage: "assets/coastal-hero.png",
    images: ["assets/coastal-hero.png", "assets/elizabeth-smith-portrait.jpg"],
    zillowUrl: "https://www.zillow.com/",
    mlsNumber: "PLACEHOLDER-2",
    updatedAt: "2026-07-17"
  },
  {
    id: "placeholder-listing-3",
    address: "7 Maple Ridge Drive",
    city: "Windham",
    state: "NH",
    zipCode: "03087",
    price: 875000,
    beds: 4,
    baths: 3,
    squareFeet: 2950,
    propertyType: "Single Family",
    description: "Placeholder listing copy for a spacious Southern New Hampshire property with flexible living areas, comfortable gathering spaces, and an easy connection to nearby town centers. Replace this copy with approved property facts before launch.",
    status: "active",
    agentName: "Willis & Smith Group",
    coListingAgent: "Elizabeth Smith",
    primaryImage: "assets/coastal-hero.png",
    images: ["assets/coastal-hero.png", "assets/elizabeth-smith-portrait.jpg"],
    zillowUrl: "https://www.zillow.com/",
    mlsNumber: "PLACEHOLDER-3",
    updatedAt: "2026-07-16"
  },
  {
    id: "excluded-placeholder-listing",
    address: "22 Garden Street",
    city: "Topsfield",
    state: "MA",
    zipCode: "01983",
    price: 725000,
    beds: 3,
    baths: 2,
    squareFeet: 1840,
    propertyType: "Single Family",
    description: "This placeholder is intentionally below the featured price threshold and should not appear in the Featured Listings section.",
    status: "active",
    agentName: "Elizabeth Smith",
    primaryImage: "assets/coastal-hero.png",
    images: ["assets/coastal-hero.png"],
    zillowUrl: "https://www.zillow.com/",
    mlsNumber: "PLACEHOLDER-4",
    updatedAt: "2026-07-15"
  }
];
