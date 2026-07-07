import api from './api';

export function fetchProducts(query) {
  const path = query ? `/api/products?search=${encodeURIComponent(query)}` : '/api/products';
  return api.get(path).then((response) => response.data);
}
