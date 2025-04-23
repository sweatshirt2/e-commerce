import { NextRequest } from "next/server";
import { ProductsService } from "./products.service";
import { PrismaClient } from "@prisma/client";

const productsService = new ProductsService(new PrismaClient());

export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log(body);
  // await productsService.createProduct(body);
}

export async function GET(request: NextRequest) {
  const products = await productsService.findAllProducts();

  return new Response(JSON.stringify(products), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
