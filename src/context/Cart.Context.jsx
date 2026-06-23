import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = useCallback((item) => {
    setItems((prev) => [...prev, { ...item, localId: Date.now() }]);
  }, []);

  const removeItem = useCallback((localId) => {
    setItems((prev) => prev.filter((item) => item.localId !== localId));
  }, []);

  const updateQuantity = useCallback((localId, quantity) => {
    setItems((prev) =>
      prev.map((item) => (item.localId === localId ? { ...item, quantity } : item))
    );
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    total: items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
