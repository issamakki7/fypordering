import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/Menu/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
  name: string;
  price: number;
  imgUrl: string;
};

type ShoppingCartContextType = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContextProvider = createContext(
  {} as ShoppingCartContextType,
);

export function useShoppingCart() {
  return useContext(ShoppingCartContextProvider);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    [],
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0,
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function addToCart(item: CartItem) {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCart);
    } else {
      const newCart = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(newCart);
    }
  }
  function removeFromCart(id: number) {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  }
  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  return (
    <ShoppingCartContextProvider.Provider
      value={{
        getItemQuantity,
        addToCart,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        increaseCartQuantity,
        decreaseCartQuantity
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} onClose={closeCart} />
    </ShoppingCartContextProvider.Provider>
  );
}
