import { generateImageUrl } from "@/utils/helpers/formatting.helpers";
import { logger } from "@/utils/logger";
import { TProduct } from "@/utils/types/a.types";
import { PrismaClient } from "@prisma/client";

export class ProductsService {
  constructor(private prisma: PrismaClient) {}

  async findAllProducts() {
    try {
      const products: TProduct[] = [];
      await this.prisma.$transaction(async (tx) => {
        const fetchedProducts = await tx.product.findMany({
          include: {
            productColors: {
              select: {
                filePath: true,
                color: true,
              },
            },
          },
        });

        for (const product of fetchedProducts) {
          products.push({
            ...product,
            imageUrl: product.imageUrl,
            price: product.price.toNumber(),
          });
        }
      });

      return products;
    } catch (error) {
      logger({
        type: "server action error in products service line 36",
        message: error,
      });
      throw error;
    }
  }
}
