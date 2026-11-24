"use client";

import { Search, SlidersHorizontal } from "lucide-react";

export default function ServiceFilters({
  search,
  setSearch,
  category,
  setCategory,
  location,
  setLocation,
  sort,
  setSort,
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <SlidersHorizontal className="text-pink-600" size={20} />
        <h3 className="font-bold text-gray-900">Find Your Perfect Service</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services..."
            className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-pink-500"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-pink-500"
        >
          <option value="">All Categories</option>
          <option value="Photography & Videography">
            Photography & Videography
          </option>
          <option value="Wedding Venues">Wedding Venues</option>
          <option value="Decoration & Florist">Decoration & Florist</option>
          <option value="Catering Services">Catering Services</option>
          <option value="Makeup & Styling">Makeup & Styling</option>
          <option value="Wedding Fashion">Wedding Fashion</option>
        </select>

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search by location..."
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-pink-500"
        >
          <option value="">Default Sorting</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
