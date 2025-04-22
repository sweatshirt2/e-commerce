import { generateImageUrl } from "@/utils/helpers/formatting.helpers";
import { TProduct } from "@/utils/types/a.types";
import { PrismaClient } from "@prisma/client";

export class ProductService {
  constructor(private prisma: PrismaClient) {}

  async createProduct(product: TProduct) {
    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.product.create({
          data: product,
        });
      });
    } catch (error) {
      // winston and sentry logging
    }
  }
}
