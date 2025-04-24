export type UserAction =
  | { type: "SET_USER"; payload: TUserSession }
  | { type: "CLEAR_USER" };

export type TUserSession = {
  userId: string | null;
  name: string | null;
};

export type UserContextType = {
  user: TUserSession;
  dispatchUser: React.Dispatch<UserAction>;
};
