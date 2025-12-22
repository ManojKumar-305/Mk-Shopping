import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
// import { Helmet } from 'react-helmet-async';
import './OrdersPage.css';
import { OrdersGrid } from './OrdersGrid';
import { OrderDetailsGrid } from './OrderDetailsGrid';

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    };
    fetchOrdersData();
  }, []);
  return (
    <>
      {/* <Helmet> */}
        <title>Orders</title>
        <link rel="icon" type="image/png" href="/images/orders-favicon.png" />
      {/* </Helmet> */}
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
} 