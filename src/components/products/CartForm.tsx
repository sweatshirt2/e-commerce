import { FormProvider, useForm } from "react-hook-form";
import InputWithLabel from "@/components/inputs/InputWithLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addProductToCartSchema,
  TProductToCart,
} from "@/schemas/product.schema";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function CartForm() {
  const defaultValues = { toCartQuantity: 1 };

  const form = useForm({
    mode: "onSubmit",
    resolver: zodResolver(addProductToCartSchema),
    defaultValues: { toCartQuantity: 1 },
  });

  const resetForm = () => {
    form.reset(defaultValues);
  };

  return (
    <div className="flex flex-col">
      <Form {...form}>
        <InputWithLabel<TProductToCart>
          fieldTitle="Quantity"
          nameInSchema={"toCartQuantity"}
        />

        <div className="flex gap-2">
          <Button
            type="submit"
            className="w-2/4"
            variant="default"
            title="Save"
          >
            {/* uncomment after initializing tanstack */}
            {/* {isSaving ? <LoaderCircle className="animate-spin" /> : "Save"} */}
          </Button>

          <Button
            type="button"
            variant="destructive"
            title="Reset"
            onClick={resetForm}
          >
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}
