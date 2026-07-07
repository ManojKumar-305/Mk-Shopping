import './OrdersPage.css';
import { OrdersGrid } from './OrdersGrid';
import { EmptyState } from '../../components/ui/EmptyState';
import { useOrders } from '../../hooks/useOrders';

export function OrdersPage() {
  const { orders, isLoading, error } = useOrders();

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/png" href="/images/orders-favicon.png" />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        {isLoading && <p>Loading orders...</p>}

        {!isLoading && error && (
          <p>Failed to load orders. Please try again later.</p>
        )}

        {!isLoading && !error && orders.length === 0 && (
          <EmptyState
            title="No orders yet"
            message="Place your first order to see it here."
          />
        )}

        {!isLoading && !error && orders.length > 0 && (
          <OrdersGrid orders={orders} />
        )}
      </div>
    </>
  );
} 