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
import { useCart, useUser } from "@/context";

type TCartFormProps = {
  productName: string;
  productId: string;
  closeModal: () => void;
};

export default function CartForm({
  productName,
  productId,
  closeModal,
}: TCartFormProps) {
  const { dispatchCart } = useCart();
  const { user } = useUser();

  const defaultValues = { toCartQuantity: 1 };

  const form = useForm({
    mode: "onSubmit",
    resolver: zodResolver(addProductToCartSchema),
    defaultValues: { toCartQuantity: 1 },
  });

  const resetForm = () => {
    form.reset(defaultValues);
  };

  const submit = () => {
    if (!user || !user.userId) {
      console.log("Please select a user");

      return;
    }

    dispatchCart({
      type: "UPSERT_ITEM",
      payload: {
        productName,
        productId,
        quantity: form.getValues().toCartQuantity.toString(),
      },
    });
    closeModal();
  };

  return (
    <div className="flex flex-col gap-3">
      <Form {...form}>
        <InputWithLabel<TProductToCart>
          fieldTitle="Quantity"
          nameInSchema={"toCartQuantity"}
          type="number"
        />

        <Button
          type="button"
          className="w-2/4"
          variant="default"
          title="Save"
          onClick={submit}
        >
          Cart
          {/* uncomment after initializing tanstack */}
          {/* {isSaving ? <LoaderCircle className="animate-spin" /> : "Save"} */}
        </Button>
      </Form>
    </div>
  );
}
