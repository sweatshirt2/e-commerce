import ProductCardButton from "./ProductCardButton";

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
  description?: string | null;
}

export default function ProductCard({
  id,
  // img,
  name,
  price,
  quantity,
  description,
  imageUrl,
}: ProductCardProps) {
  return (
    <div
      className="
        rounded-3xl shadow-lg p-2.5 h-full flex flex-col bg-gray-50 dark:bg-gray-900
        group gap-5 transition-all animate-fade-in relative
      "
    >
      <div className="relative rounded-2xl overflow-hidden aspect-[1/1]">
        <img
          src={imageUrl ?? undefined}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-5">
          <span className="text-white text-base font-medium text-center drop-shadow max-h-[80%] overflow-auto">
            {description}
          </span>
        </div>
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-amber-100 transition z-10"
          style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.09)" }}
        >
          {/* <ArrowRight className="w-5 h-5 text-gray-700" /> */}
          <ProductCardButton
            id={id}
            imageUrl={imageUrl ?? ""}
            name={name}
            price={price}
            quantity={quantity}
            description={description}
          />
        </button>
      </div>

      <div className="flex flex-col gap-2 mt-auto mb-2.5 px-1">
        <div className="flex justify-between">
          <span className="bg-gray-800/70 text-white px-3 py-1.5 rounded-full text-xs font-medium select-none">
            {name}
          </span>
          <span className="bg-yellow-500/90 text-gray-900 px-3 py-1.5 rounded-full text-xs font-semibold ml-2 select-none">
            ${price}
          </span>
        </div>
      </div>
    </div>
  );
}
