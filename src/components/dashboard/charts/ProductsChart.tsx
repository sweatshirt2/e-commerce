"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ProductsChartProps = {
  chartData: { name: string; sales: number }[];
};

export default function ProductsChart({ chartData }: ProductsChartProps) {
  return (
    <div>
      <Card className="col-span-1 lg:col-span-1 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Product Sales Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              className="text-xs"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#d1d5db"
                strokeOpacity={0.5}
              />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                tick={{ fill: "#6b7280" }}
              />
              <YAxis stroke="#6b7280" tick={{ fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #d1d5db",
                  color: "#1f2937",
                }}
                labelStyle={{ fontWeight: "bold", color: "#1f2937" }}
                itemStyle={{ color: "#1f2937" }}
                wrapperStyle={{ color: "#374151" }}
              />
              <Legend wrapperStyle={{ color: "#374151" }} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
