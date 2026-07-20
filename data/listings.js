/*
  Verified Featured Listings Fallback

  The live Featured Listings section first requests /api/listings, which retrieves
  listings from https://willisandsmith.com/agents/elizabeth-smith and verifies each
  property-detail page server-side. This file is a safe fallback if that API request
  is unavailable.

  To update this fallback manually:
  1. Verify the property on its Willis & Smith detail page.
  2. Confirm the named listing agent is exactly "Elizabeth Smith".
  3. Confirm Property Status is "For Sale".
  4. Confirm the price is $800,000 or more.
  5. Paste the Willis & Smith property URL into propertyUrl.
  6. Add approved image URLs or relative image paths in primaryImage and images.
  7. The site displays the three highest-priced qualifying listings.

  Only use listing data that Elizabeth Smith, Willis & Smith Group, Keller Williams,
  or the approved IDX/MLS provider has permission to display.
*/

export const ALL_LISTINGS_URL = "https://willisandsmith.com/agents/elizabeth-smith";

export const listings = [
  {
    id: "73549588",
    address: "13 Meetinghouse Hill Road",
    city: "West Newbury",
    state: "MA",
    zipCode: "01985",
    price: 989000,
    beds: 4,
    baths: 3,
    squareFeet: 2268,
    propertyType: "Residential",
    description: "Privately set at the end of a long, tree-lined stone driveway, this renovated 4-bedroom Ranch offers a peaceful retreat on 7.44 wooded acres. The home features Harvey windows, hardwood floors, shiplap accents, quartz countertops, stainless-steel appliances, and a bright open layout, with storage and future potential above the garage and in the unfinished basement.",
    status: "For Sale",
    badge: "For Sale",
    agentName: "Elizabeth Smith",
    primaryImage: "https://dlajgvw9htjpb.cloudfront.net/cms/3b1aa99a-1923-4741-ac63-63eee47210f4/73549588/4305097725437387118.jpg",
    images: [
      "https://dlajgvw9htjpb.cloudfront.net/cms/3b1aa99a-1923-4741-ac63-63eee47210f4/73549588/4305097725437387118.jpg",
      "https://dlajgvw9htjpb.cloudfront.net/cms/3b1aa99a-1923-4741-ac63-63eee47210f4/73549588/-1548619243661297193.jpg",
      "https://dlajgvw9htjpb.cloudfront.net/cms/3b1aa99a-1923-4741-ac63-63eee47210f4/73549588/527380688465413170.jpg",
      "https://dlajgvw9htjpb.cloudfront.net/cms/3b1aa99a-1923-4741-ac63-63eee47210f4/73549588/8544430548737159832.jpg"
    ],
    propertyUrl: "https://willisandsmith.com/properties/13-meetinghouse-hill-road-west-newbury-ma-us-01985-73549588",
    mlsNumber: "73549588",
    updatedAt: "2026-07-20"
  }
];
