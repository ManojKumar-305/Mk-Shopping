function FullStar({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#618bff"
      stroke="#1e3a8a"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
    </svg>
  );
}

function HalfStar({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <clipPath id="half">
          <rect x="0" y="0" width="12" height="24" />
        </clipPath>
      </defs>

      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z"
        fill="#618bff"
        clipPath="url(#half)"
      />

      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z"
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="2"
      />
    </svg>
  );
}

function EmptyStar({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1e3a8a"
      strokeWidth="2"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
    </svg>
  );
}

export function StarRating({ rating, size = 20 }) {
  // Clamp rating between 0 and 50
  const safeRating = Math.max(0, Math.min(50, Math.round(rating / 5) * 5));

  const fullStars = Math.floor(safeRating / 10);
  const hasHalfStar = safeRating % 10 === 5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    // <div className="flex items-center gap-1">
    <div
      className="star-rating"
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2px' }}
    >
      {Array.from({ length: fullStars }).map((_, i) => (
        <FullStar key={`full-${i}`} size={size} />
      ))}

      {hasHalfStar && <HalfStar size={size} />}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <EmptyStar key={`empty-${i}`} size={size} />
      ))}
    </div>
  );
}
