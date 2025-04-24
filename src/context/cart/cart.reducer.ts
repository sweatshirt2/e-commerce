import { TCartAction, TUserCart } from "./cart.type";

export const cartReducer = (
  state: TUserCart,
  action: TCartAction
): TUserCart => {
  switch (action.type) {
    case "SET_USER_ID":
      return { ...state, userId: action.payload.userId };
    case "UPSERT_ITEM": {
      const { productId, quantity } = action.payload;
      const existingProductIndex = state.products.findIndex(
        (item) => item.productId === productId
      );

      if (existingProductIndex >= 0) {
        const newProducts = [...state.products];
        newProducts[existingProductIndex].quantity += quantity;
        return { ...state, products: newProducts };
      } else {
        return {
          ...state,
          products: [...state.products, { productId, quantity }],
        };
      }
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
