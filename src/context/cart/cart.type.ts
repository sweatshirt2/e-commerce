export type TUserCart = {
  userId: string | null;
  products: {
    productId: string;
    quantity: number;
  }[];
};

export type TCartAction =
  | { type: "SET_USER_ID"; payload: { userId: string | null } }
  | { type: "UPSERT_ITEM"; payload: { productId: string; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: string; quantity: number };
    }
  | { type: "CLEAR_CART" };

export type TCartContextType = {
  cart: TUserCart;
  dispatchCart: React.Dispatch<TCartAction>;
  upsertItem: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};
