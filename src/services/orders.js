import api from './api';

export function fetchOrders() {
  return api.get('/api/orders?expand=products').then((response) => response.data);
}

export function fetchOrder(orderId) {
  return api.get(`/api/orders/${orderId}?expand=products`).then((response) => response.data);
}

export function createOrder() {
  return api.post('/api/orders');
}
