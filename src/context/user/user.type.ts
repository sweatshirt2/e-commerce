export type TUserSession = {
  userId: string | null;
  name: string | null;
};

export type UserContextType = {
  user: TUserSession;
  setUser: React.Dispatch<React.SetStateAction<TUserSession>>;
};
