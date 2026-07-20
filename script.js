import { ALL_LISTINGS_URL } from "./data/listings.js";
import { getFeaturedListings, getListings } from "./lib/listings.js";

const stickyCta = document.querySelector(".sticky-cta");
const closing = document.querySelector(".closing");

if (stickyCta && closing && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      stickyCta.style.opacity = entry.isIntersecting ? "0" : "1";
      stickyCta.style.pointerEvents = entry.isIntersecting ? "none" : "auto";
    },
    { threshold: 0.25 }
  );

  observer.observe(closing);
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const numberFormatter = new Intl.NumberFormat("en-US");

function formatPrice(price) {
  return currencyFormatter.format(price);
}

function formatSquareFeet(squareFeet) {
  return `${numberFormatter.format(squareFeet)} Sq. Ft.`;
}

function createListingCard(listing) {
  const article = document.createElement("article");
  article.className = "listing-card";
  article.dataset.listingId = listing.id;
  article.dataset.currentImage = "0";

  const images = listing.images && listing.images.length ? listing.images : [listing.primaryImage];
  const propertyUrl = listing.propertyUrl || listing.zillowUrl || "#";
  const galleryButtons = images.length > 1
    ? `
      <button class="gallery-button gallery-button--prev" type="button" data-gallery-prev aria-label="Previous image for ${listing.address}">Prev</button>
      <button class="gallery-button gallery-button--next" type="button" data-gallery-next aria-label="Next image for ${listing.address}">Next</button>
      <span class="gallery-count" data-gallery-count>1 / ${images.length}</span>
    `
    : `<span class="gallery-count" data-gallery-count>1 / 1</span>`;

  article.innerHTML = `
    <div class="listing-media">
      <a href="${propertyUrl}" target="_blank" rel="noopener noreferrer" aria-label="View Willis and Smith property page for ${listing.address}">
        <img src="${listing.primaryImage}" alt="${listing.address}, ${listing.city}, ${listing.state}" loading="lazy" data-gallery-image>
      </a>
      ${listing.badge ? `<span class="listing-badge">${listing.badge}</span>` : ""}
      <div class="listing-gallery-controls" data-gallery-controls>
        ${galleryButtons}
      </div>
    </div>
    <div class="listing-content">
      <p class="listing-price">${formatPrice(listing.price)}</p>
      <h3><a href="${propertyUrl}" target="_blank" rel="noopener noreferrer">${listing.address}</a></h3>
      <p class="listing-location">${listing.city}, ${listing.state} ${listing.zipCode}</p>
      <dl class="listing-details">
        <div><dt>Beds</dt><dd>${listing.beds}</dd></div>
        <div><dt>Baths</dt><dd>${listing.baths}</dd></div>
        <div><dt>Sq. Ft.</dt><dd>${formatSquareFeet(listing.squareFeet)}</dd></div>
      </dl>
      <p class="listing-type">${listing.propertyType}${listing.mlsNumber ? ` | MLS ${listing.mlsNumber}` : ""}</p>
      ${listing.agentName ? `<p class="listing-agent">Listed by ${listing.agentName}</p>` : ""}
      <p class="listing-description">${listing.description}</p>
      <a class="button button--primary listing-button" href="${propertyUrl}" target="_blank" rel="noopener noreferrer">View Property</a>
    </div>
  `;

  article._listingImages = images;
  return article;
}

function updateGallery(card, direction) {
  const images = card._listingImages || [];
  if (images.length < 2) return;

  const image = card.querySelector("[data-gallery-image]");
  const count = card.querySelector("[data-gallery-count]");
  const currentIndex = Number(card.dataset.currentImage || "0");
  const nextIndex = (currentIndex + direction + images.length) % images.length;

  card.dataset.currentImage = String(nextIndex);
  image.src = images[nextIndex];
  count.textContent = `${nextIndex + 1} / ${images.length}`;
}

async function renderFeaturedListings() {
  const section = document.querySelector("[data-featured-listings]");
  const grid = document.querySelector("[data-listings-grid]");
  const empty = document.querySelector("[data-listings-empty]");
  const allListingsLink = document.querySelector("[data-all-listings-link]");

  if (!section || !grid || !empty) return;

  const allListings = await getListings();
  const featuredListings = getFeaturedListings(allListings);

  if (allListingsLink) {
    allListingsLink.href = ALL_LISTINGS_URL;
  }

  grid.innerHTML = "";

  if (!featuredListings.length) {
    empty.hidden = false;
    grid.hidden = true;
    return;
  }

  empty.hidden = true;
  grid.hidden = false;
  featuredListings.map(createListingCard).forEach((card) => grid.appendChild(card));
}

document.addEventListener("click", (event) => {
  const previous = event.target.closest("[data-gallery-prev]");
  const next = event.target.closest("[data-gallery-next]");

  if (!previous && !next) return;

  const card = event.target.closest(".listing-card");
  updateGallery(card, previous ? -1 : 1);
});

document.addEventListener("keydown", (event) => {
  const button = event.target.closest("[data-gallery-prev], [data-gallery-next]");
  if (!button || (event.key !== "Enter" && event.key !== " ")) return;

  event.preventDefault();
  const card = button.closest(".listing-card");
  updateGallery(card, button.matches("[data-gallery-prev]") ? -1 : 1);
});

renderFeaturedListings();
