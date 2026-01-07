import api from '../../utils/axios';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import '../../components/CheckoutHeader.css';
import './CheckoutPage.css';

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(true);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const response = await api.get(
          '/api/delivery-options?expand=estimatedDeliveryTime'
        );
        setDeliveryOptions(response.data);
      } catch (error) {
        console.error('Failed to load delivery options', error);
      }
    };

    fetchCheckoutData();
  }, []);

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      try {
        setIsPaymentLoading(true);
        const response = await api.get('/api/payment-summary');
        setPaymentSummary(response.data);
      } catch (error) {
        console.error('Failed to load payment summary', error);
        setPaymentSummary(null);
      } finally {
        setIsPaymentLoading(false);
      }
    };
    fetchPaymentSummary();
  }, [cart]);

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/png" href="/images/cart-favicon.png" />

      <Header cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary 
          cart={cart} 
          deliveryOptions={deliveryOptions} 
          loadCart={loadCart} 
          />

          <PaymentSummary 
          paymentSummary={paymentSummary} 
          isLoading={isPaymentLoading}
          loadCart={loadCart} 
          />
        </div>
      </div>
    </>
  );
}