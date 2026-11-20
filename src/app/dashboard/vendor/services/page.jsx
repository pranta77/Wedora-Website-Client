"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  BriefcaseBusiness,
  MapPin,
  Pencil,
  LoaderCircle,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function MyServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/vendor/services`,
          {
            credentials: "include",
          },
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

  const handleDeleteService = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/vendor/services/${id}`,
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
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            My Services
          </h1>
          <p className="mt-2 text-gray-500">
            Manage your wedding services and track their approval status.
          </p>
        </div>

        <Link
          href="/dashboard/vendor/services/add"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white transition hover:bg-pink-700"
        >
          <Plus size={19} />
          Add New Service
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <LoaderCircle className="animate-spin text-pink-600" size={35} />
        </div>
      ) : services.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-pink-200 bg-white px-6 py-16 text-center">
          <BriefcaseBusiness className="mx-auto text-pink-400" size={45} />
          <h2 className="mt-4 text-xl font-bold text-gray-900">
            No Services Yet
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Start sharing your wedding services with couples.
          </p>
          <Link
            href="/dashboard/vendor/services/add"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700"
          >
            <Plus size={18} />
            Add Your First Service
          </Link>
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

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      service.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : service.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {service.status}
                  </span>
                </div>

                <p className="text-sm text-gray-500">{service.category}</p>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={16} />
                  {service.location}
                </div>

                <p className="text-lg font-bold text-pink-600">
                  ৳{Number(service.price).toLocaleString("en-BD")}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={`/dashboard/vendor/services/edit/${service._id}`}
                    className="flex items-center justify-center gap-2 rounded-xl border border-pink-200 bg-pink-50 px-3 py-2.5 text-sm font-semibold text-pink-600 transition hover:bg-pink-100"
                  >
                    <Pencil size={17} />
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDeleteService(service._id)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={17} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
