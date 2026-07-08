const section = document.querySelector("#featured-listings-section");
const grid = document.querySelector("#featured-listings-grid");

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeDate(value) {
  const date = new Date(value || 0).getTime();
  return Number.isNaN(date) ? 0 : date;
}

function getFeaturedListings(listings) {
  return listings
    .filter((listing) => listing.status === "Active")
    .filter((listing) => Number(listing.price) >= 750000)
    .sort((a, b) => {
      const priceDifference = Number(b.price) - Number(a.price);
      if (priceDifference !== 0) return priceDifference;
      return normalizeDate(b.listingDate) - normalizeDate(a.listingDate);
    })
    .slice(0, 6);
}

function renderListingCard(listing) {
  const image = listing.imageUrl
    ? `<img src="${escapeHtml(listing.imageUrl)}" alt="${escapeHtml(listing.address)} listing">`
    : `<div class="listing-card__placeholder">Willis &amp; Smith</div>`;
  const listingLink = listing.listingUrl && listing.listingUrl !== "#"
    ? `<a class="listing-card__button" href="${escapeHtml(listing.listingUrl)}" target="_blank" rel="noopener">View Listing</a>`
    : `<span class="listing-card__button" aria-disabled="true">View Listing</span>`;

  return `
    <article class="listing-card">
      <div class="listing-card__media">${image}</div>
      <div class="listing-card__body">
        <p class="listing-card__price">${currencyFormatter.format(Number(listing.price))}</p>
        <h2>${escapeHtml(listing.address)}</h2>
        <p class="listing-card__location">${escapeHtml(listing.city)}, ${escapeHtml(listing.state)}</p>
        <div class="listing-card__facts">
          <span>${escapeHtml(listing.beds)} Beds</span>
          <span>${escapeHtml(listing.baths)} Baths</span>
          <span>${escapeHtml(listing.sqft)} Sq Ft</span>
        </div>
        <p class="listing-card__description">${escapeHtml(listing.description)}</p>
        ${listingLink}
      </div>
    </article>
  `;
}

// Only use listing data that Elizabeth Smith, Willis & Smith Group, Keller Williams, or the approved IDX/MLS provider has permission to display.
// Currently this module uses manually entered listing data from /data/featured-listings.json.
// When IDX/API access is approved, replace this fetch with a server-side API call to the approved IDX provider.
// Keep the same normalized listing object shape so the front-end rendering does not need to change.
if (section && grid) {
  fetch("./data/featured-listings.json")
    .then((response) => (response.ok ? response.json() : []))
    .then((listings) => {
      const featuredListings = getFeaturedListings(Array.isArray(listings) ? listings : []);
      if (featuredListings.length === 0) return;

      grid.innerHTML = featuredListings.map(renderListingCard).join("");
      section.hidden = false;
    })
    .catch(() => {
      section.hidden = true;
    });
}
