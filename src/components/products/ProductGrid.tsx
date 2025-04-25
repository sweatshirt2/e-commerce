import { useFetchProducts } from "@/lib/hooks/product.hooks";
import ProductCard from "./ProductCard";
import { TProduct } from "@/utils/types/a.types";

type ProductGridProps = {
  products?: TProduct[];
};

export default async function ProductGrid() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000/api";

  const res = await fetch(`${baseUrl}/products`);

  const data: TProduct[] = await res.json();

  return (
    <div className="dark:bg-transparent bg-orange-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mt-2 p-10">
      {data.map((prod, idx) => (
        <ProductCard key={idx} {...prod} />
      ))}
    </div>
  );
}
