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
  4. Confirm the property should be part of the top price-sorted display.
  5. Paste the Willis & Smith property URL into propertyUrl.
  6. Add approved image URLs or relative image paths in primaryImage and images.
  7. The site displays the three highest-priced qualifying listings.

  Only use listing data that Elizabeth Smith, Willis & Smith Group, Keller Williams,
  or the approved IDX/MLS provider has permission to display.
*/

export const ALL_LISTINGS_URL = "https://willisandsmith.com/agents/elizabeth-smith";

export const listings = [
  {
    id: "73516703",
    address: "41 Baldpate Rd",
    city: "Georgetown",
    state: "MA",
    zipCode: "01833",
    price: 1499000,
    beds: 4,
    baths: 4,
    squareFeet: 5336,
    propertyType: "Residential",
    description: "Stunning estate-like home offering more than 5,300 square feet of exceptional living space with panoramic views of Black Swan Golf Course. A grand foyer, expansive great room, chef's kitchen, library, luxurious primary suite, new deck and patio, and a newer guest or extended-living addition create an impressive and flexible property.",
    status: "For Sale",
    badge: "For Sale",
    agentName: "Wendy Willis",
    primaryImage: "https://dlajgvw9htjpb.cloudfront.net/cms/3b1aa99a-1923-4741-ac63-63eee47210f4/73516703/-290305057703961148.jpg",
    images: [
      "https://dlajgvw9htjpb.cloudfront.net/cms/3b1aa99a-1923-4741-ac63-63eee47210f4/73516703/-290305057703961148.jpg"
    ],
    propertyUrl: "https://willisandsmith.com/properties/41-baldpate-rd-georgetown-ma-us-01833-73516703",
    mlsNumber: "73516703",
    updatedAt: "2026-07-20"
  },
  {
    id: "73504810",
    address: "8 Ridgeway Cir # 8",
    city: "West Newbury",
    state: "MA",
    zipCode: "01985",
    price: 1150000,
    beds: 3,
    baths: 5,
    squareFeet: 3642,
    propertyType: "Condo",
    description: "Spacious maintenance-free townhouse filled with natural light and thoughtful design. The main level offers hardwood floors, a large dining room, cook's kitchen, fireplaced living room with vaulted ceiling, sunroom, deck, and a first-floor primary suite, while the finished lower level adds flexible guest, office, and entertaining space.",
    status: "For Sale",
    badge: "For Sale",
    agentName: "Wendy Willis",
    primaryImage: "https://dlajgvw9htjpb.cloudfront.net/cms/3b1aa99a-1923-4741-ac63-63eee47210f4/73504810/8929933197862775039.jpg",
    images: [
      "https://dlajgvw9htjpb.cloudfront.net/cms/3b1aa99a-1923-4741-ac63-63eee47210f4/73504810/8929933197862775039.jpg"
    ],
    propertyUrl: "https://willisandsmith.com/properties/8-ridgeway-cir-8-west-newbury-ma-us-01985-73504810",
    mlsNumber: "73504810",
    updatedAt: "2026-07-20"
  },
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
  }
];
