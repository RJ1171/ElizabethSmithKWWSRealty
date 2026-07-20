/*
  Verified Featured Listings Fallback

  The live Featured Listings section first requests /api/listings, which retrieves
  listings from https://willisandsmith.com/agents/elizabeth-smith and verifies each
  property-detail page server-side. This file is a safe fallback if that API request
  is unavailable.

  To update this fallback manually:
  1. Verify the property on its Willis & Smith detail page.
  2. Confirm the named listing agent on the Willis & Smith detail page.
  3. Confirm Property Status is "For Sale".
  4. Confirm the property is one of Elizabeth's top current listings by price.
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
      "https://dlajgvw9htjpb.cloudfront.net/cms/3b1aa99a-1923-4741-ac63-63eee47210f4/73549588/4305097725437387118.jpg"
    ],
    propertyUrl: "https://willisandsmith.com/properties/13-meetinghouse-hill-road-west-newbury-ma-us-01985-73549588",
    mlsNumber: "73549588",
    updatedAt: "2026-07-20"
  },
  {
    id: "5098510",
    address: "11 Hanson Avenue",
    city: "Salem",
    state: "NH",
    zipCode: "03079",
    price: 769000,
    beds: 3,
    baths: 3,
    squareFeet: 1706,
    propertyType: "Residential",
    description: "Turnkey, stylish, and completely refreshed, this California-modern Salem home sits on a corner lot with a large, level, fenced-in yard. Renovated throughout with new siding, new flooring, a sleek kitchen, updated baths, and designer finishes, it offers bright open living close to downtown Salem, Tuscan Village, shopping, dining, and commuter routes.",
    status: "For Sale",
    badge: "For Sale",
    agentName: "Elizabeth Smith",
    primaryImage: "https://dlajgvw9htjpb.cloudfront.net/cms/3b1aa99a-1923-4741-ac63-63eee47210f4/5098510/7717605723520752702.jpg",
    images: [
      "https://dlajgvw9htjpb.cloudfront.net/cms/3b1aa99a-1923-4741-ac63-63eee47210f4/5098510/7717605723520752702.jpg"
    ],
    propertyUrl: "https://willisandsmith.com/properties/11-hanson-avenue-salem-nh-us-03079-5098510",
    mlsNumber: "5098510",
    updatedAt: "2026-07-20"
  },
  {
    id: "73541944",
    address: "83 High Street # 4",
    city: "Ipswich",
    state: "MA",
    zipCode: "01938",
    price: 749000,
    beds: 4,
    baths: 4,
    squareFeet: 2056,
    propertyType: "Residential",
    description: "Newer construction, generous space, and an in-town Ipswich location define this 4-bedroom, 3.5-bath townhouse-style condo. The home lives like a single-family with a flexible layout, modern kitchen open to the living area, hardwood floors, off-street parking, and easy access to restaurants, shops, commuter rail, Crane Beach, Cape Ann, and Boston.",
    status: "For Sale",
    badge: "For Sale",
    agentName: "Elizabeth Smith",
    primaryImage: "https://dlajgvw9htjpb.cloudfront.net/cms/3b1aa99a-1923-4741-ac63-63eee47210f4/73541944/-4620967112132897933.jpg",
    images: [
      "https://dlajgvw9htjpb.cloudfront.net/cms/3b1aa99a-1923-4741-ac63-63eee47210f4/73541944/-4620967112132897933.jpg"
    ],
    propertyUrl: "https://willisandsmith.com/properties/83-high-street-4-ipswich-ma-us-01938-73541944",
    mlsNumber: "73541944",
    updatedAt: "2026-07-20"
  }
];
