import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/products';

export function useProducts(search) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchProducts(search);
        if (isMounted) {
          setProducts(data);
        }
      } catch (error) {
        if (isMounted) {
          setError('Failed to load products. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [search]);

  return { products, isLoading, error };
}
