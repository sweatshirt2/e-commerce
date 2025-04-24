"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FurnitureStoreErrorPage = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-4xl w-full text-center">
        <h1 className="text-4xl font-semibold text-red-500 dark:text-red-400 mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We couldn't find the products you were looking for.
        </p>
        <div className="flex justify-center mb-4">
          <img
            src="../../../images/assessment-error.jpg"
            alt="Error: Furniture not found"
            className="rounded-md"
            style={{ maxWidth: "100%" }}
          />
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
          It seems we're having trouble displaying the product catalog. Please
          try the following:
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button
            variant="default"
            className={cn(
              "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-5 rounded-lg",
              "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors duration-200"
            )}
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.href = "/products";
              }
            }}
          >
            View All Products
          </Button>
          <Button
            variant="outline"
            className={cn(
              "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600",
              "font-semibold py-2.5 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300",
              "dark:focus:ring-gray-700 focus:ring-offset-2 transition-colors duration-200"
            )}
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.href = "/";
              }
            }}
          >
            Go Back to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FurnitureStoreErrorPage;
