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
} from "lucide-react";
import Image from "next/image";

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Manage Services
        </h1>
        <p className="mt-2 text-gray-500">
          Review vendor submissions and manage service approvals.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <LoaderCircle className="animate-spin text-pink-600" size={35} />
        </div>
      ) : services.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-pink-200 bg-white px-6 py-16 text-center">
          <BriefcaseBusiness className="mx-auto text-pink-400" size={45} />
          <h2 className="mt-4 text-xl font-bold text-gray-900">
            No Services Found
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Vendor submissions will appear here for review.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div
              key={service._id}
              className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm"
            >
              <Image
                src={service.images?.[0]}
                alt={service.serviceName}
                width={500}
                height={500}
                className="h-48 w-full object-cover"
              />

              <div className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-bold text-gray-900">
                    {service.serviceName}
                  </h2>

                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold capitalize text-amber-700">
                    {service.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{service.category}</p>
                <p className="text-sm text-gray-600 line-clamp-2">
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
                <button
                  onClick={() => handleDelete(service._id)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-100 hover:text-red-700"
                >
                  <Trash2 size={17} />
                  Delete Service
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
