import ProductCard from "./ProductCard";

const products = [
  {
    id: "1",
    title: "Sophisticated comfort",
    quantity: 30,
    price: "1,320",
    img: "../../../images/assessment-sofa1.jpg",
    description: "lorem ipsum dolor amet lorem ipsum dolor amet lorem ip",
  },
  {
    id: "2",
    title: "Modern Elegance",
    quantity: 30,
    price: "980",
    img: "../../../images/assessment-sofa1.jpg",
    description: "lorem ipsum dolor amet lorem ipsum dolor amet lorem ip",
  },
  {
    id: "3",
    title: "Refined Simplicity",
    quantity: 30,
    price: "720",
    img: "../../../images/assessment-sofa1.jpg",
    description: "lorem ipsum dolor amet lorem ipsum dolor amet lorem ip",
  },
  {
    id: "4",
    title: "Modern Elegance",
    quantity: 30,
    price: "980",
    img: "../../../images/assessment-sofa1.jpg",
    description: "lorem ipsum dolor amet lorem ipsum dolor amet lorem ip",
  },
  {
    id: "5",
    title: "Sophisticated comfort",
    quantity: 30,
    price: "1,320",
    img: "../../../images/assessment-sofa1.jpg",
    description: "lorem ipsum dolor amet lorem ipsum dolor amet lorem ip",
  },
  {
    id: "6",
    title: "Refined Simplicity",
    quantity: 30,
    price: "720",
    img: "../../../images/assessment-sofa1.jpg",
    description: "lorem ipsum dolor amet lorem ipsum dolor amet lorem ip",
  },
];

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mt-2 pb-10">
      {products.map((prod, idx) => (
        <ProductCard key={idx} {...prod} />
      ))}
    </div>
  );
}
