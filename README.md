import manualListings from "../data/featured-listings.json";

export type FeaturedListing = {
  id: string;
  address: string;
  city: string;
  state: string;
  price: number;
  beds: string;
  baths: string;
  sqft: string;
  status: string;
  listingDate: string;
  imageUrl: string;
  description: string;
  listingUrl: string;
  agentName: string;
  teamName: string;
};

const MIN_FEATURED_PRICE = 750000;
const MAX_FEATURED_LISTINGS = 6;

// Only use listing data that Elizabeth Smith, Willis & Smith Group, Keller Williams, or the approved IDX/MLS provider has permission to display.
// Currently this section uses manually entered listing data from /data/featured-listings.json.
// When IDX/API access is approved, replace the manual JSON import in this file with a server-side API call to the approved IDX provider.
// Keep the same normalized listing object shape so the front-end component does not need to change.
//
// Future IDX/API environment variables:
// IDX_API_URL
// IDX_API_KEY
// IDX_AGENT_ID
// IDX_TEAM_ID
export function getFeaturedListings(): FeaturedListing[] {
  return (manualListings as FeaturedListing[])
    .filter((listing) => listing.status === "Active")
    .filter((listing) => Number(listing.price) >= MIN_FEATURED_PRICE)
    .sort((a, b) => {
      const priceDifference = Number(b.price) - Number(a.price);
      if (priceDifference !== 0) return priceDifference;

      const bDate = new Date(b.listingDate || 0).getTime();
      const aDate = new Date(a.listingDate || 0).getTime();
      return bDate - aDate;
    })
    .slice(0, MAX_FEATURED_LISTINGS);
}
