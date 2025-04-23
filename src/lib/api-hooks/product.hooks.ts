import { TCreateProduct } from "@/schemas/product.schema";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async function createItem(product: TCreateProduct) {
      const { data } = await axiosInstance.post("/product", product);
      return data;
    },

    onSuccess: () => {
      // ! add toast
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      // ! add toast
    },
  });
}

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async function () {
      const { data } = await axiosInstance.get("/product");
      return data;
    },
  });
}

// ! implement to save the cart
export function saveCart() {}
