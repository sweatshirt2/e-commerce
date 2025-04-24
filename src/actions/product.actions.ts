"use server";

import { actionClient } from "@/lib/safe-action";
import { PrismaClient, ProductCategory } from "@prisma/client";
import { flattenValidationErrors } from "next-safe-action";
import { z } from "zod";

export const seedProductsAction = actionClient
  .metadata({
    actionName: "Seed Products",
  })
  .schema(z.object({}), {
    handleValidationErrorsShape: async (e) =>
      flattenValidationErrors(e).fieldErrors,
  })
  .action(async () => {
    try {
      await seedProducts();

      return {
        message: "Products Seeded Successfully!",
      };
    } catch (error) {
      console.log(error);
      throw Error("Error seeding products");
    }
  });

async function seedProducts() {
  const furnitureItems = [
    {
      name: "Oak Dining Table",
      price: 799.99,
      quantity: 5,
      description: "Solid oak dining table with a natural finish.",
      category: ProductCategory.KITCHEN,
      imageUrl: "../../../images/assessment-sofa1.jpg",
    },
    {
      name: "Leather Sofa",
      price: 1299.5,
      quantity: 3,
      description: "Three-seater genuine leather sofa in dark brown.",
      category: ProductCategory.HOME,
      imageUrl: "../../../images/assessment-sofa1.jpg",
    },
    {
      name: "Bookshelf",
      price: 149.95,
      quantity: 10,
      description: "Tall wooden bookshelf with adjustable shelves.",
      category: ProductCategory.OFFICE,
      imageUrl: "../../../images/assessment-sofa1.jpg",
    },
    {
      name: "Coffee Table",
      price: 249.99,
      quantity: 7,
      description: "Modern glass-top coffee table with metal legs.",
      category: ProductCategory.HOME,
      imageUrl: "../../../images/assessment-sofa1.jpg",
    },
    {
      name: "Queen Bed Frame",
      price: 599.0,
      quantity: 4,
      description: "Queen-size wooden bed frame with storage drawers.",
      category: ProductCategory.HOME,
      imageUrl: "../../../images/assessment-sofa1.jpg",
    },
    {
      name: "Recliner Chair",
      price: 399.89,
      quantity: 6,
      description: "Plush recliner chair with manual tilt function.",
      category: ProductCategory.HOME,
      imageUrl: "../../../images/assessment-sofa1.jpg",
    },
    {
      name: "TV Stand",
      price: 199.99,
      quantity: 8,
      description: "Low-profile TV stand with cable management.",
      category: ProductCategory.HOME,
      imageUrl: "../../../images/assessment-sofa1.jpg",
    },
    {
      name: "Nightstand",
      price: 89.5,
      quantity: 12,
      description: "Compact nightstand with a drawer and shelf.",
      category: ProductCategory.HOME,
      imageUrl: "../../../images/assessment-sofa1.jpg",
    },
    {
      name: "Dining Chair",
      price: 109.99,
      quantity: 20,
      description: "Set of two cushioned dining chairs with wooden legs.",
      category: ProductCategory.KITCHEN,
      imageUrl: "../../../images/assessment-sofa1.jpg",
    },
    {
      name: "Wardrobe",
      price: 849.0,
      quantity: 2,
      description: "Spacious wardrobe with mirrored sliding doors.",
      category: ProductCategory.HOME,
      imageUrl: "../../../images/assessment-sofa1.jpg",
    },
  ];

  try {
    const prismaClient = new PrismaClient();

    await prismaClient.product.createMany({
      data: furnitureItems,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
