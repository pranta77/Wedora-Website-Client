
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  BriefcaseBusiness,
  LoaderCircle,
  MapPin,
  CheckCircle,
  XCircle,
  Trash2,
  Search,
  Eye,
  EyeOff,
} from "lucide-react";
import Image from "next/image";

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/services`,
          { credentials: "include" },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load services.");
        }

        setServices(data.services || []);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Search and filter services
  const filteredServices = services.filter((service) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      service.serviceName?.toLowerCase().includes(searchText) ||
      service.vendorName?.toLowerCase().includes(searchText);

    const isActive = service.isActive !== false;

    const matchesFilter =
      filter === "all" ||
      service.status === filter ||
      (filter === "active" &&
        service.status === "approved" &&
        isActive) ||
      (filter === "inactive" &&
        service.status === "approved" &&
        !isActive);

    return matchesSearch && matchesFilter;
  });

  // Approve or reject pending services
  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/services/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update service.");
      }

      setServices((previous) =>
        previous.map((service) =>
          service._id === id ? { ...service, status } : service,
        ),
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Activate or deactivate approved services
  const handleActiveChange = async (id, isActive) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/services/${id}/active`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ isActive }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update service availability.",
        );
      }

      setServices((previous) =>
        previous.map((service) =>
          service._id === id ? { ...service, isActive } : service,
        ),
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete service
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this service?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/services/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete service.");
      }

      setServices((previous) =>
        previous.filter((service) => service._id !== id),
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Manage Services
        </h1>

        <p className="mt-2 text-gray-500">
          Review vendor submissions and manage published services.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 rounded-2xl border border-pink-100 bg-white p-5 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service or vendor..."
            className="w-full rounded-xl border border-gray-200 py-3 pr-4 pl-10 text-sm outline-none transition focus:border-pink-400"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-pink-400 sm:w-52"
        >
          <option value="all">All Services</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900">Submitted Services</h2>

        <p className="text-sm text-gray-500">
          {filteredServices.length} services found
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-16">
          <LoaderCircle className="animate-spin text-pink-600" size={35} />
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-pink-200 bg-white px-6 py-16 text-center">
          <BriefcaseBusiness
            className="mx-auto text-pink-400"
            size={45}
          />

          <h2 className="mt-4 text-xl font-bold text-gray-900">
            No Services Found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredServices.map((service) => {
            const isActive = service.isActive !== false;

            return (
              <div
                key={service._id}
                className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm"
              >
                {/* Service Image */}
                {service.images?.[0] ? (
                  <Image
                    src={service.images[0]}
                    alt={service.serviceName || "Service"}
                    width={500}
                    height={300}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-pink-50">
                    <BriefcaseBusiness
                      size={45}
                      className="text-pink-300"
                    />
                  </div>
                )}

                <div className="space-y-3 p-5">
                  {/* Name and Status */}
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-bold text-gray-900">
                      {service.serviceName}
                    </h2>

                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      service.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : service.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                    }`}>
                      {service.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">
                    {service.category}
                  </p>

                  <p className="line-clamp-2 text-sm text-gray-600">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={16} />
                    {service.location}
                  </div>

                  <p className="text-lg font-bold text-pink-600">
                    ৳{Number(service.price).toLocaleString("en-BD")}
                  </p>

                  <p className="text-xs text-gray-400">
                    Vendor: {service.vendorName}
                  </p>

                  {/* Published Availability */}
                  {service.status === "approved" && (
                    <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          Published Status
                        </p>

                        <p className={`text-xs font-medium ${
                          isActive ? "text-green-600" : "text-red-600"
                        }`}>
                          {isActive ? "Active" : "Inactive"}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          handleActiveChange(service._id, !isActive)
                        }
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                          isActive
                            ? "bg-red-50 text-red-600 hover:bg-red-100"
                            : "bg-green-50 text-green-700 hover:bg-green-100"
                        }`}
                      >
                        {isActive ? (
                          <>
                            <EyeOff size={15} />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <Eye size={15} />
                            Activate
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Pending Review */}
                  {service.status === "pending" && (
                    <div className="flex gap-3 pt-3">
                      <button
                        onClick={() =>
                          handleStatusChange(service._id, "approved")
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-100 px-3 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-200"
                      >
                        <CheckCircle size={17} />
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleStatusChange(service._id, "rejected")
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-100 px-3 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-200"
                      >
                        <XCircle size={17} />
                        Reject
                      </button>
                    </div>
                  )}

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100"
                  >
                    <Trash2 size={17} />
                    Delete Service
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
