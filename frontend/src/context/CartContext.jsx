import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      const selectedSizePrice = item.selectedSize.price;
      const baseIngredientsPrice = item.baseIngredients.reduce((ingredientTotal, ingredient) => {
        return ingredientTotal + ingredient.price;
      }, 0);
      const customIngredientsPrice = item.customIngredients.reduce((ingredientTotal, ingredient) => {
        return ingredientTotal + (ingredient.price * ingredient.quantity);
      }, 0);
      return total + selectedSizePrice + baseIngredientsPrice + customIngredientsPrice;
    }, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, calculateTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
