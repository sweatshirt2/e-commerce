"use server";

import { actionClient } from "@/lib/safe-action";
import { addToCartSchema } from "@/schemas/cart.schema";
import { logger } from "@/utils/logger";
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
      await feedCart(cartData.parsedInput);

      return {
        message: "Added to cart Successfully!",
      };
    } catch (error) {
      logger({
        type: "server action error in cart actions line 27",
        message: error,
      });
      throw Error("Error adding to cart");
    }
  });

async function feedCart(cartData: z.infer<typeof addToCartSchema>) {
  try {
    const prismaClient = new PrismaClient();

    let existingCart = await prismaClient.cart.findUnique({
      where: { userId: cartData.userId },
      select: {
        cartProducts: {
          select: {
            id: true,
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

      const updatedCartProducts = existingCart.cartProducts
        .filter((product) => cartDataProductsIds.has(product.productId))
        .map((product) => ({
          id: product.id,
          quantity:
            (cartData.products.find(
              (cartProduct) => cartProduct.productId === product.productId
            )?.quantity ?? 0) + product.quantity,
        }));

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
                where: { id: cartProduct.id },
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
    logger({
      type: "server action error in cart actions line 107",
      message: error,
    });
    throw error;
  }
}
