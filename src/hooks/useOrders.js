import { useState, useEffect } from 'react';
import { fetchOrders, fetchOrder } from '../services/orders';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadOrders() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchOrders();
        if (isMounted) {
          setOrders(data);
        }
      } catch (error) {
        if (isMounted) {
          setError('Failed to load orders. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  return { orders, isLoading, error };
}

export function useOrder(orderId) {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadOrder() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchOrder(orderId);
        if (isMounted) {
          setOrder(data);
        }
      } catch (error) {
        if (isMounted) {
          setError('Failed to load order. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (orderId) {
      loadOrder();
    }

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  return { order, isLoading, error };
}
