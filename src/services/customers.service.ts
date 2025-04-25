import { logger } from "@/utils/logger";
import { ICartProduct, TCart, TProduct } from "@/utils/types/a.types";
import { PrismaClient } from "@prisma/client";

export class CustomersService {
  constructor(private prisma: PrismaClient) {}

  async addToCart(products: ICartProduct[], cartId: string, userId: string) {
    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.cart.update({
          where: { userId },
          data: {
            cartProducts: {
              create: products.map((product) => ({
                productId: product.productId,
                quantity: product.quantity,
              })),
            },
          },
        });
      });
    } catch (error) {
      logger({
        type: "server action error in customers service line 25",
        message: error,
      });
    }
  }

  async removeFromCart(productId: string, cartId: string, userId: string) {
    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.cart.update({
          where: { userId },
          data: {
            cartProducts: {
              delete: {
                id: productId,
              },
            },
          },
        });
      });
    } catch (error) {
      logger({
        type: "server action error in customers service line 47",
        message: error,
      });
    }
  }
}
