export function ProductSkeleton() {
  return(
    <div className="product-container skeleton">
      <div className="product-image-container skeleton-box"></div>

      <div className="skeleton-line short"></div>
      <div className="skeleton-line"></div>

      <div className="skeleton-stars"></div>

      <div className="skeleton-line price"></div>

      <div className="skeleton-button"></div>
    </div>
  );
}