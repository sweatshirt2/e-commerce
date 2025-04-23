"use client";

import { TCreateProduct } from "@/schemas/product.schema";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { TProduct } from "@/utils/types/a.types";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async function createItem(product: TCreateProduct) {
      const { data } = await axiosInstance.post("/products", product);
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

export function useFetchProducts() {
  return useQuery<TProduct[]>({
    queryKey: ["products"],
    queryFn: async function () {
      const { data } = await axiosInstance.get("/products");
      return data;
    },
  });
}

// ! implement to save the cart
export function saveCart() {}
