interface ProductRatingProps {
  rating: number;
}

export function ProductRating({ rating }: ProductRatingProps) {
  const isLow = rating < 3.5;

  return (
    <span style={{ color: isLow ? '#ff4d4f' : 'inherit' }}>
      {rating}/5
    </span>
  );
}
