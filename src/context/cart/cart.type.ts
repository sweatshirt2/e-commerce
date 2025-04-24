export type TUserCart = {
  userId: string | null;
  products: {
    productName: string;
    productId: string;
    quantity: number;
  }[];
};

export type TCartAction =
  | { type: "SET_USER_ID"; payload: { userId: string | null } }
  | {
      type: "UPSERT_ITEM";
      payload: { productName: string; productId: string; quantity: string };
    }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: string; quantity: string };
    }
  | { type: "CLEAR_CART" };

export type TCartContextType = {
  cart: TUserCart;
  dispatchCart: React.Dispatch<TCartAction>;
  upsertItem: (
    productName: string,
    productId: string,
    quantity: string
  ) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: string) => void;
  clearCart: () => void;
};
