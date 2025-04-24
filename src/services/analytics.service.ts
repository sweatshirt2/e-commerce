import { PrismaClient } from "@prisma/client";

export class CustomersService {
  constructor(private prisma: PrismaClient) {}

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
