import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import api from '../../utils/axios';

export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
  if (!cartItem) {
    return <div className="delivery-options">No delivery options available</div>;
  }

  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        const priceString = deliveryOption.priceCents > 0 
          ? `${formatMoney(deliveryOption.priceCents)} - Shipping`
          : 'Free Shipping';


          const updateDeliveryOption = async () => {
            await api.put(`/api/cart-items/${cartItem.productId}`, {
              deliveryOptionId: deliveryOption.id
            });
            await loadCart();
          };

        return (
          <div key={deliveryOption.id} className="delivery-option">
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
              onChange={updateDeliveryOption}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
