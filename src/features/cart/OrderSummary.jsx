import dayjs from 'dayjs';
import { useCartContext } from '../../context/CartContext';
import { DeliveryOptions } from './DeliveryOptions';
import { CartItemDetails } from './CartItemsDetails';

export function OrderSummary({ deliveryOptions = [] }) {
  const { cart } = useCartContext();

  if (!Array.isArray(cart) || cart.length === 0) {
    return <div className="order-summary">Your cart is empty.</div>;
  }

  return (
    <div className="order-summary">
      {cart.map((cartItem) => {
        const selectedDeliveryOption = deliveryOptions
          .find((deliveryOption) => deliveryOption.id === cartItem.deliveryOptionId);

        if (!selectedDeliveryOption) {
          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">Delivery date: Not available</div>
              <div className="cart-item-details-grid">
                <CartItemDetails cartItem={cartItem} />
                <DeliveryOptions 
                  cartItem={cartItem}
                  deliveryOptions={deliveryOptions}
                />
              </div>
            </div>
          );
        }

        return (
          <div key={cartItem.productId} className="cart-item-container">
            <div className="delivery-date">
              Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="cart-item-details-grid">
              <CartItemDetails cartItem={cartItem} />

              <DeliveryOptions 
                cartItem={cartItem} 
                deliveryOptions={deliveryOptions} 
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}