import dayjs from 'dayjs';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import BuyAgainIcon from '../../assets/images/icons/buy-again.png';
import { Button } from '../../components/ui/Button';
import { useCartContext } from '../../context/CartContext';

export function OrderDetailsGrid({ order }) {
  const { addToCart } = useCartContext();

  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {
        const handleBuyAgain = async () => {
          await addToCart(orderProduct.productId, 1);
        };
        return (
          <Fragment key={orderProduct.product.id}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {orderProduct.product.name}
              </div>
              <div className="product-delivery-date">
                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button className="buy-again-button button-primary"
                onClick={handleBuyAgain}>
                <img className="buy-again-icon" src={BuyAgainIcon} alt="Buy again" />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <a href={`/tracking/${order.id}/${orderProduct.product.id}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}