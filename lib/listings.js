import { listings } from "../data/listings.js";

export const MINIMUM_FEATURED_PRICE = 800000;
export const MAX_FEATURED_LISTINGS = 3;
export const FEATURED_AGENT_NAME = "Elizabeth Smith";

/*
  Currently this section uses manually entered listing data from /data/listings.js.
  When IDX/API access is approved, replace getListings with a server-side API call
  to the approved IDX provider. Keep the same normalized listing object shape so
  the front-end rendering does not need to change.

  Future server-side environment variables:
  IDX_API_URL
  IDX_API_KEY
  IDX_AGENT_ID
  IDX_TEAM_ID
*/
export async function getListings() {
  return listings;
}

export function getFeaturedListings(allListings) {
  return allListings
    .filter((listing) => listing.status === "active")
    .filter((listing) => listing.price >= MINIMUM_FEATURED_PRICE)
    .filter((listing) => {
      const agent = `${listing.agentName || ""} ${listing.coListingAgent || ""}`.toLowerCase();
      return agent.includes(FEATURED_AGENT_NAME.toLowerCase());
    })
    .sort((a, b) => b.price - a.price)
    .slice(0, MAX_FEATURED_LISTINGS);
}
