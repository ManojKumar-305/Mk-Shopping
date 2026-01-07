import api from '../../utils/axios';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import './OrdersPage.css';
import { OrdersGrid } from './OrdersGrid';
import { OrderDetailsGrid } from './OrderDetailsGrid';

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
      const response = await api.get('/api/orders?expand=products');
      setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrdersData();
  }, []);
  return (
    <>
        <title>Orders</title>
        <link rel="icon" type="image/png" href="/images/orders-favicon.png" />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        {isLoading && <p>Loading orders...</p>}

        {isLoading && orders.length === 0 && (
          <p>No orders yet. Place your first order!</p>
        )}

        {!isLoading && orders.length > 0 && (
          <OrdersGrid orders={orders} loadCart={loadCart} />
          )}
      </div>
    </>
  );
} 