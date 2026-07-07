import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import { useCartContext } from '../../context/CartContext';
import { fetchDeliveryOptions, fetchPaymentSummary } from '../../services/checkout';
import './CheckoutPage.css';

export function CheckoutPage() {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(true);
  const { cart } = useCartContext();

  useEffect(() => {
    const loadDeliveryOptions = async () => {
      try {
        const data = await fetchDeliveryOptions();
        setDeliveryOptions(data);
      } catch (error) {
        console.error('Failed to load delivery options', error);
      }
    };

    loadDeliveryOptions();
  }, []);

  useEffect(() => {
    const loadPaymentSummary = async () => {
      try {
        setIsPaymentLoading(true);
        const data = await fetchPaymentSummary();
        setPaymentSummary(data);
      } catch (error) {
        console.error('Failed to load payment summary', error);
        setPaymentSummary(null);
      } finally {
        setIsPaymentLoading(false);
      }
    };

    loadPaymentSummary();
  }, [cart]);

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/png" href="/images/cart-favicon.png" />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <Card className="checkout-panel">
            <OrderSummary deliveryOptions={deliveryOptions} />
          </Card>
          <Card className="checkout-panel">
            <PaymentSummary paymentSummary={paymentSummary} isLoading={isPaymentLoading} />
          </Card>
        </div>
      </div>
    </>
  );
}