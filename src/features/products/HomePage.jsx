import { useSearchParams } from 'react-router-dom';
import { ProductsGrid } from './ProductsGrid';
import { ProductSkeleton } from './ProductSkeleton';
import { useProducts } from '../../hooks/useProducts';
import './HomePage.css';

export function HomePage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const { products, isLoading, error } = useProducts(search);

  return (
    <>
      <div className="home-page">
        {isLoading && (
          <div className="products-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        )}

        {error && !isLoading && (
          <div className="products-error">
            <h3>{error}</h3>
          </div>
        )}

        {!isLoading && !error && (
          <ProductsGrid products={products} />
        )}
      </div>
    </>
  );
}
