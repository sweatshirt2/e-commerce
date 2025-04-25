"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

export default function DashboardError() {
  return (
    <div className="flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md text-center dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="flex flex-col items-center space-y-4">
          <TriangleAlert className="w-12 h-12 text-red-500 dark:text-red-400" />

          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Chart Data Mismatch!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600 dark:text-gray-400">
            Oops! Looks like our data points went on vacation. We couldn't load
            the chart because the numbers are... well, let's just say they don't
            add up right now.
          </p>

          <svg
            className="w-full h-32 mx-auto text-blue-500 dark:text-blue-400"
            viewBox="0 0 300 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <line
              x1="0"
              y1="50"
              x2="300"
              y2="50"
              stroke="currentColor"
              strokeOpacity="0.2"
            />
            <line
              x1="100"
              y1="0"
              x2="100"
              y2="100"
              stroke="currentColor"
              strokeOpacity="0.2"
            />
            <line
              x1="200"
              y1="0"
              x2="200"
              y2="100"
              stroke="currentColor"
              strokeOpacity="0.2"
            />

            <path
              d="M 0 80 Q 50 20, 100 70 T 200 30 Q 250 90, 300 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="50" cy="25" r="8" fill="red" />
            <circle cx="150" cy="85" r="8" fill="red" />
            <circle cx="250" cy="35" r="8" fill="red" />
          </svg>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Our data team is working hard to get things back on track. Please
            try refreshing the page or check back later!
          </p>

          <Button className="w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-gray-100">
            Refresh Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
