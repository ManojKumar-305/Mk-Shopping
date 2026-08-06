import { createContext, useContext, useMemo } from 'react';
import { useCart } from '../hooks/useCart';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const cartState = useCart();
  const value = useMemo(() => cartState, [cartState.cart, cartState.isLoading, cartState.error]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }

  return context;
}
