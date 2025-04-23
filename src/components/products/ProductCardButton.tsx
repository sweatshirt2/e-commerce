"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCardProps } from "./ProductCard";
import ProductModal from "./ProductModal";
import { ArrowRight } from "lucide-react";

export default function ProductCardButton(props: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openProductModal() {
    setIsModalOpen((prev) => !prev);
  }

  return (
    <>
      <ProductModal
        {...props}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
      <ArrowRight
        className="w-5 h-5 text-gray-700"
        onClick={openProductModal}
      />
    </>
  );
}
