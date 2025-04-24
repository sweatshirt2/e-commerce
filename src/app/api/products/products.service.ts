import { generateImageUrl } from "@/utils/helpers/formatting.helpers";
import { TProduct } from "@/utils/types/a.types";
import { PrismaClient } from "@prisma/client";

export class ProductsService {
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

  async findAllProducts() {
    try {
      const products: TProduct[] = [];
      await this.prisma.$transaction(async (tx) => {
        const fetchedProducts = await tx.product.findMany();

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
      throw error;
    }
  }
}
