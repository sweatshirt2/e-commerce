import { z } from "zod";

const cartProductSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
});

export const addToCartSchema = z
  .object({
    userId: z.string(),
    products: z.array(cartProductSchema),
  })
  .refine((data) => data.products.length > 0);
