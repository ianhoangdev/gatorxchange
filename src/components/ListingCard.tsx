'use client';

type Listing = {
  id?: string;
  title: string;
  description: string;
  price: number;
  category?: string;
  imageUrl?: string;
  createdAt?: string | Date;
  sellerEmail?: string | null; // ✅ NEW
};

type ListingCardProps = {
  listing: Listing;
};

export default function ListingCard({ listing }: ListingCardProps) {
  const formattedPrice =
    typeof listing.price === 'number'
      ? listing.price.toFixed(2)
      : listing.price;

  const createdLabel = listing.createdAt
    ? new Date(listing.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      })
    : 'Recently listed';

  const mailtoHref =
    listing.sellerEmail &&
    `mailto:${encodeURIComponent(
      listing.sellerEmail
    )}?subject=${encodeURIComponent(
      `Interested in your listing: ${listing.title}`
    )}&body=${encodeURIComponent(
      `Hi,\n\nI'm interested in your listing "${listing.title}" on GatorXchange.\n\nCould you share more details?\n\nThanks!`
    )}`;

  const handleContactClick = () => {
    if (mailtoHref) {
      window.location.href = mailtoHref;
    } else {
      alert('Seller email is not available for this listing yet.');
    }
  };

  return (
    <article
      className="
        relative overflow-hidden rounded-3xl border border-white/15
        bg-white/5 backdrop-blur-xl
        shadow-[0_20px_60px_rgba(0,0,0,0.75)]
        transition-transform transition-shadow
        hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(0,0,0,0.9)]
      "
    >
      {/* Glow + gradient accents */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-40 w-40 rounded-full bg-[#FA4616]/35 blur-3xl" />
      <div className="pointer-events-none absolute right-[-30%] top-6 h-24 w-40 rounded-full bg-[#0021A5]/50 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-black/40" />

      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden">
        {listing.imageUrl ? (
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-500"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#00153D] to-[#011E57]">
            <span className="text-xs font-medium tracking-wide text-white/60">
              No image uploaded
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3 p-4 pb-5">
        <header className="space-y-1">
          <h3 className="line-clamp-1 text-base font-semibold text-white drop-shadow">
            {listing.title}
          </h3>
          <p className="line-clamp-2 text-xs text-white/70">
            {listing.description}
          </p>
        </header>

        <div className="flex items-end justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xl font-semibold text-[#FA4616] drop-shadow-sm">
              ${formattedPrice}
            </p>
            <p className="text-[11px] text-white/60">{createdLabel}</p>
          </div>

          <div className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur">
            {listing.category}
          </div>
        </div>

        {/* Contact seller button */}
        <button
          type="button"
          onClick={handleContactClick}
          className="
            mt-2 inline-flex w-full items-center justify-center gap-2
            rounded-xl border border-white/20
            bg-white/10 px-4 py-2
            text-xs font-medium text-white/90
            backdrop-blur
            transition-all
            hover:bg-white/20 hover:border-white/30
            hover:shadow-lg hover:shadow-black/40
          "
        >
          {/* email icon */}
          <svg
            aria-hidden="true"
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
              ry="2"
              className="stroke-current"
              strokeWidth="1.5"
            />
            <path
              d="M5 7.5L12 12.5L19 7.5"
              className="stroke-current"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Contact seller</span>
        </button>
      </div>
    </article>
  );
}
