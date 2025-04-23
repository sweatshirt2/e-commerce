import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative flex grow min-w-0 w-full sm:w-[320px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search"
        className="w-full rounded-full border border-gray-200 pl-10 pr-4 py-2 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-beige/30 transition shadow-sm"
        style={{ background: "#fff" }}
      />
    </div>
  );
}
