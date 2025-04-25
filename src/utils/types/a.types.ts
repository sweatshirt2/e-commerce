import { ProductCategory } from "@prisma/client";

export type TProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
  description?: string | null;
  category: ProductCategory;
  productColors: {
    filePath: string;
    color: string;
  }[];
};

export type ICartProduct = {
  productId: string;
  quantity: number;
};

export type TCart = {
  id?: string;
  userId?: string;
  products: TProduct[];
};
