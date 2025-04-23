import { FormProvider, useForm } from "react-hook-form";
import InputWithLabel from "../inputs/InputWithLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, TCreateProduct } from "@/schemas/product.schema";
import { z } from "zod";

export default function ProductForm() {
  const form = useForm({
    mode: "onSubmit",
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
      description: null,
    },
  });

  return (
    <div className="flex flex-col">
      <FormProvider {...form}>
        <InputWithLabel<TCreateProduct>
          fieldTitle="Name"
          nameInSchema={"name"}
        />
        <InputWithLabel<TCreateProduct>
          fieldTitle="Price"
          nameInSchema={"price"}
          type="number"
        />
        <InputWithLabel<TCreateProduct>
          fieldTitle="Quantity"
          nameInSchema={"quantity"}
          type="number"
        />
        <InputWithLabel<TCreateProduct>
          fieldTitle="Description"
          nameInSchema={"description"}
        />
      </FormProvider>
    </div>
  );
}
