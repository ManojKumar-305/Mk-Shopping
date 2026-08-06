import { useState, useEffect, useMemo } from 'react';
import { fetchProducts } from '../services/products';

export function useProducts(search) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const normalizedSearch = useMemo(() => search?.trim() ?? '', [search]);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchProducts(normalizedSearch);
        if (isMounted) {
          setProducts(data);
        }
      } catch {
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
  }, [normalizedSearch]);

  return { products, isLoading, error };
}
