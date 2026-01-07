import api from '../../utils/axios';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import { ProductsGrid } from './productsGrid';
import { ProductSkeleton } from './productSkeleton';
import './HomePage.css';

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const getHomeData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setProducts([]);

        const response = await api.get(
          search ? `/api/products?search=${search}` : '/api/products'
        );

        {products.length === 0 && (
        <p>No products available right now.</p>
      )}

        setProducts(response.data);
      } catch {
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    getHomeData();
  }, [search]);

  return (
    <>
        <title>MK Shopping</title>
        <link rel="icon" href="/public/images/home-favicon.png" />
    
      <Header cart={cart} />

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
        <ProductsGrid
          products={products}
          loadCart={loadCart}
        />
      )}
      </div>
    </>
  );
}
