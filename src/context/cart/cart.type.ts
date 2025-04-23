export type TUserCart = {
  userId: string | null;
  products: {
    productId: string;
    quantity: number;
  }[];
};
