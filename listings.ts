import { getFeaturedListings } from "../lib/listings";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function FeaturedListings() {
  const listings = getFeaturedListings();

  if (listings.length === 0) {
    return null;
  }

  return (
    <section className="section featured-listings-section" aria-labelledby="featured-listings">
      <div className="section-heading">
        <p className="script-label">Current Featured Listings</p>
        <h2 id="featured-listings">Explore Elizabeth Smith's Most Prominent Active Listings.</h2>
      </div>
      <div className="featured-listings-grid">
        {listings.map((listing) => (
          <article className="listing-card" key={listing.id}>
            <div className="listing-card__media">
              {listing.imageUrl ? (
                <img src={listing.imageUrl} alt={`${listing.address} listing`} />
              ) : (
                <div className="listing-card__placeholder">Willis &amp; Smith</div>
              )}
            </div>
            <div className="listing-card__body">
              <p className="listing-card__price">{currencyFormatter.format(listing.price)}</p>
              <h3>{listing.address}</h3>
              <p className="listing-card__location">{listing.city}, {listing.state}</p>
              <div className="listing-card__facts">
                <span>{listing.beds} Beds</span>
                <span>{listing.baths} Baths</span>
                <span>{listing.sqft} Sq Ft</span>
              </div>
              <p>{listing.description}</p>
              <a className="listing-card__button" href={listing.listingUrl}>View Listing</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
