import { useFetchProducts } from "@/lib/hooks/product.hooks";
import ProductCard from "./ProductCard";
import { TProduct } from "@/utils/types/a.types";
import axiosInstance from "@/lib/axios";

const products: TProduct[] = [
  {
    id: "1",
    name: "Sophisticated comfort",
    quantity: 30,
    price: 1320,
    imageUrl: "../../../images/assessment-sofa1.jpg",
    description: "lorem ipsum dolor amet lorem ipsum dolor amet lorem ip",
    category: "HOME",
  },
  {
    id: "2",
    name: "Modern Elegance",
    quantity: 30,
    price: 980,
    imageUrl: "../../../images/assessment-sofa1.jpg",
    description: "lorem ipsum dolor amet lorem ipsum dolor amet lorem ip",
    category: "HOME",
  },
  {
    id: "3",
    name: "Refined Simplicity",
    quantity: 30,
    price: 720,
    imageUrl: "../../../images/assessment-sofa1.jpg",
    description: "lorem ipsum dolor amet lorem ipsum dolor amet lorem ip",
    category: "HOME",
  },
  {
    id: "4",
    name: "Modern Elegance",
    quantity: 30,
    price: 980,
    imageUrl: "../../../images/assessment-sofa1.jpg",
    description: "lorem ipsum dolor amet lorem ipsum dolor amet lorem ip",
    category: "HOME",
  },
  {
    id: "5",
    name: "Sophisticated comfort",
    quantity: 30,
    price: 1320,
    imageUrl: "../../../images/assessment-sofa1.jpg",
    description: "lorem ipsum dolor amet lorem ipsum dolor amet lorem ip",
    category: "HOME",
  },
  {
    id: "6",
    name: "Refined Simplicity",
    quantity: 30,
    price: 720,
    imageUrl: "../../../images/assessment-sofa1.jpg",
    description: "lorem ipsum dolor amet lorem ipsum dolor amet lorem ip",
    category: "HOME",
  },
];

type ProductGridProps = {
  products?: TProduct[];
};

export default async function ProductGrid() {
  // const res = await axiosInstance(`/products`);
  // console.log(res.data);
  // const { data: products } = res;

  return (
    <div className="dark:bg-slate-700 bg-orange-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mt-2 p-10">
      {/* {data.map((prod, idx) => (
        <ProductCard key={idx} {...prod} />
      ))} */}
      {products.map((prod, index) => (
        <ProductCard key={index} {...prod} />
      ))}
    </div>
  );
}
