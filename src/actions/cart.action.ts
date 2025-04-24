"use server";

import { actionClient } from "@/lib/safe-action";
import { addToCartSchema } from "@/schemas/cart.schema";
import { PrismaClient, ProductCategory } from "@prisma/client";
import { flattenValidationErrors } from "next-safe-action";
import { z } from "zod";

export const feedCartAction = actionClient
  .metadata({
    actionName: "Add to cart",
  })
  .schema(addToCartSchema, {
    handleValidationErrorsShape: async (e) =>
      flattenValidationErrors(e).fieldErrors,
  })
  .action(async (cartData) => {
    try {
      console.log("In the cart action");
      await feedCart(cartData.parsedInput);

      return {
        message: "Added to cart Successfully!",
      };
    } catch (error) {
      console.log(error);
      throw Error("Error adding to cart");
    }
  });

async function feedCart(cartData: z.infer<typeof addToCartSchema>) {
  try {
    const prismaClient = new PrismaClient();

    console.log("In feed cart");

    let existingCart = await prismaClient.cart.findUnique({
      where: { userId: cartData.userId },
      select: {
        cartProducts: {
          select: {
            productId: true,
            quantity: true,
          },
        },
      },
    });

    if (!existingCart) {
      await prismaClient.cart.create({
        data: {
          userId: cartData.userId,
          cartProducts: {
            create: cartData.products.map((product) => ({
              productId: product.productId,
              quantity: product.quantity,
            })),
          },
        },
      });
    } else {
      const cartDataProductsIds = new Set<string>(
        cartData.products.map((product) => product.productId)
      );

      const existingCartProductsIds = new Set<string>(
        existingCart.cartProducts.map((product) => product.productId)
      );

      const updatedCartProducts = existingCart.cartProducts.filter((product) =>
        cartDataProductsIds.has(product.productId)
      );

      const newCartProducts = cartData.products.filter(
        (product) => !existingCartProductsIds.has(product.productId)
      );

      await prismaClient.$transaction(async (tx) => {
        await tx.cart.update({
          where: { userId: cartData.userId },
          data: {
            cartProducts: {
              create: newCartProducts.map((cartProduct) => ({
                productId: cartProduct.productId,
                quantity: cartProduct.quantity,
              })),
              update: updatedCartProducts.map((cartProduct) => ({
                where: { id: cartProduct.productId },
                data: { quantity: cartProduct.quantity },
              })),
            },
          },
        });
      });
    }

    return {
      message: "Added to cart successfully!",
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
