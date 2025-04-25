import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { AnalyticsService } from "./analytics.service";

const analyticsService = new AnalyticsService(new PrismaClient());

export async function GET(request: NextRequest) {
  const [productsAnalytics, userConsumption] = await Promise.all([
    analyticsService.getProductSales(),
    analyticsService.getUserConsumption(),
  ]);

  const data = { productsAnalytics, userConsumption };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
