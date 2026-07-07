import api from './api';

export function fetchCartItems() {
  return api.get('/api/cart-items?expand=product').then((response) => response.data);
}

export function addCartItem(productId, quantity) {
  return api.post('/api/cart-items', { productId, quantity });
}

export function updateCartItem(productId, payload) {
  return api.put(`/api/cart-items/${productId}`, payload).then((response) => response.data);
}

export function deleteCartItem(productId) {
  return api.delete(`/api/cart-items/${productId}`);
}
