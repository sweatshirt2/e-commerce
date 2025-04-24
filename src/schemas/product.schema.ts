import { ProductCategory } from "@prisma/client";
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  price: z.number(),
  quantity: z.number(),
  description: z.string().nullish(),
  category: z.enum([
    ProductCategory.HOME,
    ProductCategory.KITCHEN,
    ProductCategory.OUTDOOR,
    ProductCategory.OFFICE,
  ]),
});

export const addProductToCartSchema = z
  .object({
    quantity: z.number(),
    toCartQuantity: z.number(),
  })
  .refine((data) => {
    return data.quantity >= data.toCartQuantity;
  });

export type TCreateProduct = z.infer<typeof productSchema>;
export type TProductToCart = z.infer<typeof addProductToCartSchema>;
