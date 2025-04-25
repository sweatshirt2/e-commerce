"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LoaderCircle, ShoppingCart } from "lucide-react";
import { products, useCart, useUser } from "@/context";
import { useCustomAction } from "@/lib/hooks/action.hooks";
import { feedCartAction } from "@/actions/cart.action";
import { cartReducer } from "../../context/cart/cart.reducer";
import { toast } from "sonner";

export default function UserCart() {
  const { user } = useUser();
  const { cart, dispatchCart } = useCart();

  const totalItems = cart.products.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const {
    execute: executeSeed,
    result: feedResult,
    isExecuting: isFeeding,
    reset: resetFeed,
  } = useCustomAction({
    action: feedCartAction,
    onSuccess: () => {
      dispatchCart({ type: "CLEAR_CART" });
      toast("Success", { description: "Cart updated successfully :)" });
    },
    onError: () => {
      toast("Error", { description: "Error updating cart :(" });
    },
  });

  async function seedProducts() {
    executeSeed({
      userId: user.userId,
      products: cart.products,
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative px-4 py-2">
          <span className="flex items-center gap-2">
            Cart <ShoppingCart className="w-5 h-5" />
          </span>
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Check Cart</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72 p-4 space-y-3">
        <div>
          <h3 className="text-base font-semibold mb-2">Hi, {user.name} 👋</h3>
          {cart.products.length === 0 ? (
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
          ) : (
            <div className="space-y-2">
              {cart.products.map((product) => {
                return (
                  <DropdownMenuItem
                    key={product.productId}
                    className="flex justify-between text-sm"
                  >
                    <span className="font-medium">
                      {product.productName ?? "Unknown Product"}
                    </span>
                    <span className="text-muted-foreground">
                      x{product.quantity}
                    </span>
                  </DropdownMenuItem>
                );
              })}

              <div className="border-t pt-2 text-right text-sm font-medium">
                Total Items: {totalItems}
              </div>

              <div className="border-t pt-2 text-right text-sm font-medium">
                <Button
                  variant="default"
                  size="sm"
                  onClick={seedProducts}
                  disabled={isFeeding}
                >
                  {isFeeding ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Confirm Order"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
