import { formatMoney } from '../../utils/money';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { useCartContext } from '../../context/CartContext';
import { createOrder as submitOrder } from '../../services/orders';

export function PaymentSummary({ paymentSummary, isLoading }) {
  const navigate = useNavigate();
  const { loadCart } = useCartContext();

  if (isLoading) {
    return <div className="payment-summary">Calculating payment...</div>;
  }

  if (!paymentSummary) {
    return <div className="payment-summary">Failed to load payment summary.</div>;
  }

  const createOrder = async () => {
    await submitOrder();
    await loadCart();
    navigate('/orders');
  };

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>

      <div
        className="payment-summary-row"
        data-testid="payment-summary-product-cost"
      >
        <div>Items ({paymentSummary.totalItems}):</div>
        <div className="payment-summary-money">
          {formatMoney(paymentSummary.productCostCents)}
        </div>
      </div>

      <div
        className="payment-summary-row"
        data-testid="payment-summary-shipping-cost"
      >
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money">
          {formatMoney(paymentSummary.shippingCostCents)}
        </div>
      </div>

      <div
        className="payment-summary-row subtotal-row"
        data-testid="payment-summary-total-before-tax"
      >
        <div>Total before tax:</div>
        <div className="payment-summary-money">
          {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
        </div>
      </div>

      <div
        className="payment-summary-row"
        data-testid="payment-summary-tax"
      >
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">
          {formatMoney(paymentSummary.taxCents)}
        </div>
      </div>

      <div
        className="payment-summary-row total-row"
        data-testid="payment-summary-total">
        <div>Order total:</div>
        <div className="payment-summary-money">
          {formatMoney(paymentSummary.totalCostCents)}
        </div>
      </div>

      <Button
        className="place-order-button"
        data-testid="place-order-button"
        variant="primary"
        size="lg"
        onClick={createOrder}
      >
        Place your order
      </Button>
    </div>
  );
}
