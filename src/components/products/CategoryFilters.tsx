const categories = [
  { name: "Home", count: 98, active: true },
  { name: "Office", count: 75, active: false },
  { name: "Sofa", count: 82, active: false },
  { name: "Dining", count: 53, active: true },
  { name: "Outdoor", count: 15, active: false },
  { name: "Chase", count: 7, active: true },
];

export default function CategoryFilters() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {categories.map((cat) => (
        <button
          key={cat.name}
          className={`flex items-center gap-1 rounded-full px-4 py-1.5 font-medium text-sm border border-transparent transition ${
            cat.active
              ? "bg-yellow-500/70 text-brown-900 shadow"
              : "bg-gray-100 text-gray-500 hover:bg-yellow-200/70 hover:text-gray-700"
          }`}
        >
          {cat.name}
          <span className={`ml-2 text-xs ${cat.active ? "font-bold" : "font-normal"}`}>({cat.count})</span>
          <span className="ml-0.5 text-lg -mr-3.5 text-gray-300">×</span>
        </button>
      ))}
    </div>
  );
}
