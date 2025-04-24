import { ProductCategory } from "@prisma/client";

export const productsWithColorVariants = [
  {
    name: "L-Shape Sofa",
    price: 1299.5,
    quantity: 30,
    description:
      "Three-seater genuine leather sofa in dark brown. Comfortable for a small living room.",
    category: ProductCategory.HOME,
    imageUrl: "../../../productImages/sofa_1_blue.jpg",
    productColors: [
      {
        color: "Blue",
        imageUrl: "../../../productImages/sofa_1_blue.jpg",
      },
      {
        color: "Gray",
        imageUrl: "../../../productImages/sofa_1_gray.jpg",
      },
      {
        color: "White",
        imageUrl: "../../../productImages/sofa_1_white.jpg",
      },
    ],
  },
  {
    name: "Two Seater Sofa",
    price: 1299.5,
    quantity: 30,
    description:
      "Two-seater genuine leather sofa in dark brown. Comfortable for a small living room. Ideal spot for couples",
    category: ProductCategory.HOME,
    imageUrl: "../../../productImages/sofa_2_brown.jpg",
    productColors: [
      {
        color: "Blue",
        imageUrl: "../../../productImages/sofa_2_brown.jpg",
      },
      {
        color: "Gray",
        imageUrl: "../../../productImages/sofa_2_gray.jpg",
      },
      {
        color: "White",
        imageUrl: "../../../productImages/sofa_2_light_gray.jpg",
      },
    ],
  },
  {
    name: "Grand Channel Sofa",
    price: 1299.5,
    quantity: 30,
    description:
      "A large size to accommodate your family. Hang out, watch movies, and play games in this spacious sofa.",
    category: ProductCategory.HOME,
    imageUrl: "../../../productImages/sofa_3_brown.jpg",
    productColors: [
      {
        color: "Blue",
        imageUrl: "../../../productImages/sofa_3_brown.jpg",
      },
      {
        color: "Gray",
        imageUrl: "../../../productImages/sofa_3_green.jpg",
      },
      {
        color: "White",
        imageUrl: "../../../productImages/sofa_3_pink.jpg",
      },
    ],
  },
];
