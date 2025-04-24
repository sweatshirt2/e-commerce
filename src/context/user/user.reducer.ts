import { TUserSession, UserAction } from "./user.type";

export const userReducer = (
  state: TUserSession,
  action: UserAction
): TUserSession => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    case "CLEAR_USER":
      return { userId: null, name: null };
    default:
      return state;
  }
};
