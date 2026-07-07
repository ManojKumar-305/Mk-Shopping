import api from './api';

export function fetchDeliveryOptions() {
  return api
    .get('/api/delivery-options?expand=estimatedDeliveryTime')
    .then((response) => response.data);
}

export function fetchPaymentSummary() {
  return api.get('/api/payment-summary').then((response) => response.data);
}
