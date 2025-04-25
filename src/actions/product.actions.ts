"use server";

import { productsWithColorVariants } from "@/context";
import { actionClient } from "@/lib/safe-action";
import { logger } from "@/utils/logger";
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
      logger({
        type: "server action error in product actions line 27",
        message: error,
      });
      throw Error("Error seeding products");
    }
  });

async function seedProducts() {
  const furnitureItems = [
    ...productsWithColorVariants,
    // {
    //   name: "Oak Dining Table",
    //   price: 799.99,
    //   quantity: 5,
    //   description: "Solid oak dining table with a natural finish.",
    //   category: ProductCategory.KITCHEN,
    //   imageUrl: "../../../images/assessment-sofa1.jpg",
    //   productColors: [],
    // },
    // {
    //   name: "Leather Sofa",
    //   price: 1299.5,
    //   quantity: 3,
    //   description: "Three-seater genuine leather sofa in dark brown.",
    //   category: ProductCategory.HOME,
    //   imageUrl: "../../../images/assessment-sofa1.jpg",
    // },
    // {
    //   name: "Bookshelf",
    //   price: 149.95,
    //   quantity: 10,
    //   description: "Tall wooden bookshelf with adjustable shelves.",
    //   category: ProductCategory.OFFICE,
    //   imageUrl: "../../../images/assessment-sofa1.jpg",
    // },
    // {
    //   name: "Coffee Table",
    //   price: 249.99,
    //   quantity: 7,
    //   description: "Modern glass-top coffee table with metal legs.",
    //   category: ProductCategory.HOME,
    //   imageUrl: "../../../images/assessment-sofa1.jpg",
    // },
    // {
    //   name: "Queen Bed Frame",
    //   price: 599.0,
    //   quantity: 4,
    //   description: "Queen-size wooden bed frame with storage drawers.",
    //   category: ProductCategory.HOME,
    //   imageUrl: "../../../images/assessment-sofa1.jpg",
    // },
    // {
    //   name: "Recliner Chair",
    //   price: 399.89,
    //   quantity: 6,
    //   description: "Plush recliner chair with manual tilt function.",
    //   category: ProductCategory.HOME,
    //   imageUrl: "../../../images/assessment-sofa1.jpg",
    // },
    // {
    //   name: "TV Stand",
    //   price: 199.99,
    //   quantity: 8,
    //   description: "Low-profile TV stand with cable management.",
    //   category: ProductCategory.HOME,
    //   imageUrl: "../../../images/assessment-sofa1.jpg",
    // },
    // {
    //   name: "Nightstand",
    //   price: 89.5,
    //   quantity: 12,
    //   description: "Compact nightstand with a drawer and shelf.",
    //   category: ProductCategory.HOME,
    //   imageUrl: "../../../images/assessment-sofa1.jpg",
    // },
    // {
    //   name: "Dining Chair",
    //   price: 109.99,
    //   quantity: 20,
    //   description: "Set of two cushioned dining chairs with wooden legs.",
    //   category: ProductCategory.KITCHEN,
    //   imageUrl: "../../../images/assessment-sofa1.jpg",
    // },
    // {
    //   name: "Wardrobe",
    //   price: 849.0,
    //   quantity: 2,
    //   description: "Spacious wardrobe with mirrored sliding doors.",
    //   category: ProductCategory.HOME,
    //   imageUrl: "../../../images/assessment-sofa1.jpg",
    // },
    // {
    //   name: "L-Shape Sofa",
    //   price: 1299.5,
    //   quantity: 30,
    //   description:
    //     "Three-seater genuine leather sofa in dark brown. Comfortable for a small living room.",
    //   category: ProductCategory.HOME,
    //   imageUrl: "../../../productImages/sofa_1_blue.jpg",
    //   productColors: [
    //     {
    //       color: "Blue",
    //       imageUrl: "../../../productImages/sofa_1_blue.jpg",
    //     },
    //     {
    //       color: "Gray",
    //       imageUrl: "../../../productImages/sofa_1_gray.jpg",
    //     },
    //     {
    //       color: "White",
    //       imageUrl: "../../../productImages/sofa_1_white.jpg",
    //     },
    //   ],
    // },
  ];

  const users = [
    {
      id: "john-doe",
      email: "johndoe@email.com",
      name: "John Doe",
      password: "JohnDoe123Ulearna",
    },
    {
      id: "jane-doe",
      email: "janedoe@email.com",
      name: "Jane Doe",
      password: "JaneDoe123Ulearna",
    },
    {
      id: "mohamed-salah",
      email: "mohamedsalah@email.com",
      name: "Mohamed Salah",
      password: "MohamedSalah123Ulearna",
    },
  ];

  try {
    const prismaClient = new PrismaClient();

    for (const product of furnitureItems) {
      await prismaClient.product.create({
        data: {
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          description: product.description,
          category: product.category,
          imageUrl: product.imageUrl,
          productColors: {
            createMany: {
              data: product.productColors,
            },
          },
        },
      });
    }

    await prismaClient.user.createMany({
      data: users,
    });

    const createdUsers = await prismaClient.user.findMany({
      select: {
        id: true,
      },
    });

    for (const createdUser of createdUsers) {
      await prismaClient.cart.create({
        data: {
          userId: createdUser.id,
        },
      });
    }

    return {
      message: "Data Seeded Successfully!",
    };
  } catch (error) {
    logger({
      type: "server action error in product actions line 204",
      message: error,
    });
    throw error;
  }
}
