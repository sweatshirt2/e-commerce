"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { products, useCart, useUser } from "@/context";

export default function UserCart() {
  const { user } = useUser();
  const { cart } = useCart();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span className="flex items-center gap-3">
            Cart <ShoppingCart />
          </span>
          <span className="sr-only">Check Cart</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex flex-col p-5">
          <h3 className="text-lg font-bold">{user.name}</h3>
          {cart.products.map((product) => (
            <div>
              {products.find(
                (globalProduct) => globalProduct.id == product.productId
              )?.name ?? "Unknow Product"}
              : {product.quantity}
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
