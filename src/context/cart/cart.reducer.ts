import { TUserCart } from "./cart.type";

type CartAction =
  | { type: "ADD_ITEM"; payload: { productId: string } }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: string; quantity: number };
    }
  | { type: "CLEAR_CART" };

export const cartReducer = (
  state: TUserCart,
  action: CartAction
): TUserCart => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingProductIndex = state.products.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (existingProductIndex >= 0) {
        const newProducts = [...state.products];
        newProducts[existingProductIndex].quantity += 1;
        return { ...state, products: newProducts };
      } else {
        return {
          ...state,
          products: [
            ...state.products,
            { productId: action.payload.productId, quantity: 1 },
          ],
        };
      }
    case "REMOVE_ITEM":
      return {
        ...state,
        products: state.products.filter(
          (item) => item.productId !== action.payload.productId
        ),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        products: state.products.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, products: [] };
    default:
      return state;
  }
};
