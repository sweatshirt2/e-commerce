import Header from "@/components/common/Header";
// import SearchBar from "/components/SearchBar";
import CategoryFilters from "@/components/products/CategoryFilters";
import ProductGrid from "@/components/products/ProductGrid";
import { ChevronDown, View } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen w-full bg-[#f6f5f3] flex flex-col items-center py-4 px-5">
      <div className="w-full max-w-[1400px] flex flex-col gap-6 rounded-3xl overflow-hidden bg-[#f6f5f3]">
        {/* Header */}
        <Header />
        {/* Hero section with image and text overlay */}
        <section className="relative w-full min-h-[260px] flex items-center rounded-3xl overflow-hidden bg-gradient-to-b from-[#e9e3db] to-[#f6f5f3]">
          {/* bg image */}
          <img
            src="/lovable-uploads/2e17c50f-90d6-4acd-9fa1-962930c7404f.png"
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover object-center opacity-70"
            style={{ objectPosition: "0% 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f6f5f399] to-[#f6f5f3e1] z-10" />
          {/* text */}
          <div className="relative z-20 px-12 py-10 max-w-[670px]">
            <h1 className="text-5xl font-bold text-white drop-shadow mb-2">Curated Collections</h1>
            <p className="text-lg text-white/90 font-medium mb-2 drop-shadow">
              Discover our range of minimalist masterpieces
            </p>
            <div className="text-base text-white/90 font-normal max-w-lg">
              Handpicked minimalist masterpieces for the modern home, blending form and function in the perfect harmony. Each piece is thoughtfully selected to enhance your space with timeless style and practical elegance.
            </div>
          </div>
        </section>
        {/* Filters/Search row */}
        <div className="w-full bg-white rounded-2xl shadow p-4 flex flex-col gap-5">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between w-full">
            <div className="flex gap-3 w-full md:max-w-[390px]">
              {/* <SearchBar /> */}
            </div>
            <div className="flex gap-3">
              {/* All categories dropdown (mock) */}
              <button className="flex items-center gap-2 rounded-full px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium shadow hover:bg-gray-200 border">
                All Categories <span className="text-xs font-semibold">(323)</span> <ChevronDown className="w-4 h-4" />
              </button>
              {/* Sort dropdown (mock) */}
              <button className="flex items-center gap-2 rounded-full px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium shadow hover:bg-gray-200 border">
                Sort By <span className="font-semibold">RECENT</span> <ChevronDown className="w-4 h-4" />
              </button>
              {/* Grid/List toggle */}
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 border shadow">
                <View className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          {/* Category pills */}
          <div className="w-full">
            <CategoryFilters />
          </div>
        </div>
        {/* Product grid */}
        <div className="w-full">
          <ProductGrid />
        </div>
      </div>
    </div>
  );
}
