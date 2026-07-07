import dayjs from 'dayjs';
import { Link, useParams } from 'react-router-dom';
import { EmptyState } from '../../components/ui/EmptyState';
import { Loader } from '../../components/ui/Loader';
import { useOrder } from '../../hooks/useOrders';
import './TrackingPage.css';

export function TrackingPage() {
  const { orderId, productId } = useParams();
  const { order, isLoading, error } = useOrder(orderId);

  if (isLoading) {
    return <Loader label="Loading tracking details..." />;
  }

  if (error || !order) {
    return (
      <div className="tracking-page">
        <div className="order-tracking">
          <div className="not-found-message">Unable to load tracking information.</div>
        </div>
      </div>
    );
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  if (!orderProduct) {
    return (
      <div className="tracking-page">
        <div className="order-tracking">
          <div className="not-found-message">Product not found in this order.</div>
        </div>
      </div>
    );
  }

  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent >= 100;

  return(
    <>
    {/* <Helmet> */}
      <title>Tracking</title>
      <link rel="icon" type="image/png" href="/images/tracking-favicon.png?v=2" />
    {/* </Helmet> */}

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? 'Deliverd on ' : 'Arriving on'}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
              <div className={`progress-label ${isShipped && 'current-status'}`}>
                Shipped
              </div>
              <div className={`progress-label ${isDelivered && 'current-status'}`}>
                Delivered
              </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{
              width: `${deliveryPercent}%`
            }}></div>
          </div>
        </div>
      </div>
    </>
  );
}