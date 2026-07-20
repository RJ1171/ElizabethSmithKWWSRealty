import { listings } from "../data/listings.js";

export const MINIMUM_FEATURED_PRICE = 800000;
export const MAX_FEATURED_LISTINGS = 3;
export const FEATURED_AGENT_NAME = "Elizabeth Smith";
export const FEATURED_PROPERTY_STATUS = "For Sale";

/*
  The browser requests /api/listings first. That Vercel function retrieves candidate
  properties from https://willisandsmith.com/agents/elizabeth-smith, opens each
  Willis & Smith property-detail page, and only returns verified Elizabeth Smith
  listings. If the API is unavailable, the verified local fallback above is used.

  When IDX/API access is approved, replace the source retrieval inside /api/listings.js
  with a server-side API call to the approved IDX provider. Keep the same normalized
  listing object shape so the front-end rendering does not need to change.

  Future server-side environment variables:
  IDX_API_URL
  IDX_API_KEY
  IDX_AGENT_ID
  IDX_TEAM_ID
*/
export async function getListings() {
  try {
    const response = await fetch("/api/listings", {
      headers: { accept: "application/json" }
    });

    if (!response.ok) throw new Error(`Listings API returned ${response.status}`);

    const apiListings = await response.json();
    if (Array.isArray(apiListings)) return apiListings;
  } catch (error) {
    console.warn("Using verified local featured listings fallback.", error);
  }

  return listings;
}

export function getFeaturedListings(allListings) {
  return allListings
    .filter((listing) => listing.status === FEATURED_PROPERTY_STATUS)
    .filter((listing) => listing.price >= MINIMUM_FEATURED_PRICE)
    .filter((listing) => {
      return listing.agentName === FEATURED_AGENT_NAME || listing.coListingAgent === FEATURED_AGENT_NAME;
    })
    .sort((a, b) => b.price - a.price)
    .slice(0, MAX_FEATURED_LISTINGS);
}
