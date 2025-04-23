"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

type Props<T> = {
  fieldTitle: string;
  nameInSchema: keyof T & string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputWithLabel<T>({
  fieldTitle,
  nameInSchema,
  className,
  ...props
}: Props<T>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="text-base">
          <FormLabel className="text-base" htmlFor={nameInSchema}>
            <h5 className="text-sm">{fieldTitle}</h5>
          </FormLabel>

          <FormControl>
            <Input
              id={nameInSchema}
              className={`
              w-full max-w-xs disabled:text-blue-500 dark:disabled:text-green-500
              disabled:opacity-75 ${className}
              `}
              {...props}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
