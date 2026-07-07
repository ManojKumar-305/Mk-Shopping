import { useState, useEffect, useCallback } from 'react';
import { fetchCartItems, addCartItem, updateCartItem, deleteCartItem } from '../services/cart';

export function useCart() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCart = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchCartItems();
      setCart(data);
    } catch (error) {
      setError('Failed to load cart. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = useCallback(async (productId, quantity) => {
    await addCartItem(productId, quantity);
    await loadCart();
  }, [loadCart]);

  const updateItem = useCallback(async (productId, payload) => {
    await updateCartItem(productId, payload);
    await loadCart();
  }, [loadCart]);

  const removeItem = useCallback(async (productId) => {
    await deleteCartItem(productId);
    await loadCart();
  }, [loadCart]);

  return {
    cart,
    isLoading,
    error,
    loadCart,
    addToCart,
    updateItem,
    removeItem,
  };
}
