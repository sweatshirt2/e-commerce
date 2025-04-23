import { TUserSession } from "./user.type";

type UserAction =
  | { type: "SET_USER"; payload: TUserSession }
  | { type: "CLEAR_USER" };

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
