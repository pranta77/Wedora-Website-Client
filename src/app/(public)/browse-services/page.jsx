"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ServiceFilters from "@/components/services/ServiceFilters";
import ServiceGrid from "@/components/services/ServiceGrid";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorState from "@/components/shared/ErrorState";

export default function BrowseServicesPage() {
  const searchParams = useSearchParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("");

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }

      const data = await response.json();
      setServices(data.services || []);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);
  useEffect(() => {
  const selectedCategory = searchParams.get("category");
  setCategory(selectedCategory || "");
}, [searchParams]);

  const filteredServices = services
    .filter((service) => {
      const matchesSearch = service.serviceName
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const categoryAliases = {
        "Photography & Videography": [
          "Photography",
          "Photography & Videography",
        ],
        "Wedding Venues": ["Wedding Venues"],
        "Decoration & Florist": ["Decoration", "Decoration & Florist"],
        "Catering Services": ["Catering", "Catering Services"],
        "Makeup & Styling": ["Makeup & Beauty", "Makeup & Styling"],
        "Wedding Fashion": ["Wedding Fashion"],
      };

      const matchesCategory =
        !category || categoryAliases[category]?.includes(service.category);

      const matchesLocation = service.location
        ?.toLowerCase()
        .includes(location.toLowerCase());

      return matchesSearch && matchesCategory && matchesLocation;
    })
    .sort((a, b) => {
      if (sort === "low-to-high") {
        return Number(a.price) - Number(b.price);
      }

      if (sort === "high-to-low") {
        return Number(b.price) - Number(a.price);
      }

      return 0;
    });

  return (
    <main className="min-h-screen bg-[#fff8fa] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="font-semibold uppercase tracking-widest text-pink-600">
            Explore Wedora
          </p>

          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Browse Wedding Services
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Discover trusted wedding professionals and find everything you need
            to make your special day unforgettable.
          </p>
        </div>

        <ServiceFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          location={location}
          setLocation={setLocation}
          sort={sort}
          setSort={setSort}
        />

        <div className="mb-6 mt-10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Available Wedding Services
          </h2>

          {!loading && !error && (
            <p className="text-sm text-gray-500">
              {filteredServices.length} services found
            </p>
          )}
        </div>

        {loading ? (
          <LoadingSpinner message="Loading wedding services..." />
        ) : error ? (
          <ErrorState
            title="Unable to load services"
            message="Please try again."
            onRetry={fetchServices}
          />
        ) : (
          <ServiceGrid services={filteredServices} />
        )}
      </div>
    </main>
  );
}
