import { createContext, ReactNode, useContext, useState } from "react";

interface CartContextProps {
  cartId: string;
  numOfCartItems: number;
  updateNumOfCartItems: (count: number) => void;
  updateCartId: (cartId: string) => void;
}

const CartContext = createContext<CartContextProps>({
  cartId: "",
  numOfCartItems: 0,
  updateNumOfCartItems: (count: number) => {},
  updateCartId: (cartId: string) => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState<string>("");

  function updateNumOfCartItems(count: number) {
    setNumOfCartItems(count);
  }
  function updateCartId(cartId: string) {
    setCartId(cartId);
  }

  return (
    <CartContext.Provider
      value={{ numOfCartItems, updateNumOfCartItems, updateCartId, cartId }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
