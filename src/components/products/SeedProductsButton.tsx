"use client";

import { seedProductsAction } from "@/actions/product.actions";
import { Button } from "@/components/ui/button";
import { useCustomAction } from "@/lib/hooks/action.hooks";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

export default function SeedProductsButton() {
  const {
    execute: executeSeed,
    result: seedResult,
    isExecuting: isSeeding,
    reset: resetSeed,
  } = useCustomAction({
    action: seedProductsAction,
    onSuccess: () => {
      toast("Successfully populated data :)");
      window.location.reload();
    },
    onError: () => {
      toast("Data already populated!");
    },
  });

  async function seedProducts() {
    executeSeed({});
  }

  return (
    <Button onClick={seedProducts}>
      {isSeeding ? <LoaderCircle className="animate-spin" /> : "Seed Products"}
    </Button>
  );
}
