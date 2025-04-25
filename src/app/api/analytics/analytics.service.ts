import { logger } from "@/utils/logger";
import { PrismaClient } from "@prisma/client";

export class AnalyticsService {
  constructor(private prisma: PrismaClient) {}

  async getProductSales() {
    try {
      const products = await this.prisma.product.findMany({
        select: {
          id: true,
          name: true,
          cartProducts: {
            select: {
              quantity: true,
            },
          },
        },
      });

      const calculatedProducts = products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          sold: product.cartProducts.reduce((acc, cartProduct) => {
            return acc + cartProduct.quantity;
          }, 0),
        };
      });

      return calculatedProducts;
    } catch (error) {
      logger({
        type: "server action error in analytics service line 34",
        message: error,
      });
      throw new Error("Error getting products analytics");
    }
  }

  async getUserConsumption() {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          cart: {
            select: {
              cartProducts: {
                select: {
                  quantity: true,
                  product: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const calculatedUsers = users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          purchases:
            user.cart?.cartProducts.reduce((acc, cartProduct) => {
              return acc + cartProduct.quantity;
            }, 0) ?? 0,
        };
      });

      return calculatedUsers.sort((a, b) => b.purchases - a.purchases);
    } catch (error) {
      logger({
        type: "server action error in anaalytics service line 78",
        message: error,
      });
      throw new Error("Error getting products analytics");
    }
  }

  async getProductsAnalytics() {
    const products = await this.prisma.product.findMany({
      select: {
        id: true,
      },
    });

    const productsAnalysis = await Promise.all(
      products.map(async (product) => this.getProductAnalytics(product.id))
    );

    return productsAnalysis;
  }

  async getProductAnalytics(productId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        cartProducts: {
          select: {
            quantity: true,
            cart: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    let totalSoldQuantity = 0;
    let totalSoldPrice = 0;

    const buyersMap = product.cartProducts
      .map((cartProduct) => {
        return {
          user: cartProduct.cart.user,
          quantity: cartProduct.quantity,
        };
      })
      .reduce(
        (mapAcc, buyer) => {
          if (mapAcc.has(buyer.user.id)) {
            mapAcc.get(buyer.user.id)!.quantity += buyer.quantity;
          } else {
            mapAcc.set(buyer.user.id, buyer);
          }
          return mapAcc;
        },
        new Map<
          string,
          {
            user: {
              id: string;
              name: string;
            };
            quantity: number;
          }
        >()
      );

    const buyers = Array.from(buyersMap.values());

    for (const cartProduct of product.cartProducts) {
      totalSoldQuantity += cartProduct.quantity;
      totalSoldPrice += cartProduct.quantity * product.price.toNumber();
    }

    return {
      product,
      totalSoldQuantity,
      totalSoldPrice,
      buyers,
    };
  }
}
