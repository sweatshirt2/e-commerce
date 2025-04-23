import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useUser } from "../user/user.context";
import { TUserCart } from "./cart.type";

// Create the Cart Context
type CartContextType = {
  cart: TUserCart;
  setCart: React.Dispatch<React.SetStateAction<TUserCart>>;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [cart, setCart] = useState<TUserCart>({
    userId: user.userId,
    products: [],
  });

  useEffect(() => {
    setCart((prevCart) => ({ ...prevCart, userId: user.userId }));
  }, [user.userId]);

  const addToCart = (productId: string) => {
    setCart((prevCart) => {
      if (!prevCart.userId) {
        return prevCart;
      }
      const existingProductIndex = prevCart.products.findIndex(
        (item) => item.productId === productId
      );

      if (existingProductIndex >= 0) {
        const newProducts = [...prevCart.products];
        newProducts[existingProductIndex].quantity += 1;
        return { ...prevCart, products: newProducts };
      } else {
        return {
          ...prevCart,
          products: [...prevCart.products, { productId, quantity: 1 }],
        };
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      products: prevCart.products.filter(
        (item) => item.productId !== productId
      ),
    }));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) => {
      const newProducts = prevCart.products.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      return { ...prevCart, products: newProducts };
    });
  };

  const clearCart = () => {
    setCart((prevCart) => ({ ...prevCart, products: [] }));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
