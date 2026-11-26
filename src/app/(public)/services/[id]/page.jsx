"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { MapPin, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

import BookingForm from "@/components/services/BookingForm";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorState from "@/components/shared/ErrorState";
import EmptyState from "@/components/shared/EmptyState";

export default function ServiceDetailsPage() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace(`/sign-in?callbackURL=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, session, pathname, router]);

  const { id } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const fetchService = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services/${id}`,
        {},
      );

      if (!response.ok) {
        throw new Error("Service not found");
      }

      const data = await response.json();
      setService(data.service || null);
      setError(false);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchService();
  }, [fetchService]);

  const handleRetry = () => {
    setLoading(true);
    fetchService();
  };

  const handleBooking = async (bookingData) => {
    try {
      setBookingLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            serviceId: id,
            ...bookingData,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit booking.");
      }

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setBookingLoading(false);
    }
  };
  if (isPending || !session?.user) {
    return <LoadingSpinner message="Checking your account..." />;
  }
  if (loading) {
    return <LoadingSpinner message="Loading service details..." />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20">
        <ErrorState
          title="Unable to load service"
          message="This service may not exist. Please try again."
          onRetry={handleRetry}
        />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20">
        <EmptyState
          title="Service Not Found"
          description="The wedding service you're looking for is unavailable."
        />
      </div>
    );
  }

  const serviceImage =
    service.images?.[0] || "/images/services/placeholder.jpg";

  return (
    <main className="min-h-screen bg-[#fff8fa] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/browse-services"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-pink-600 hover:text-pink-700"
        >
          <ArrowLeft size={18} />
          Back to Services
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="relative h-80 overflow-hidden rounded-2xl bg-gray-100 sm:h-112.5">
              <Image
                src={serviceImage}
                alt={service.serviceName}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {service.images?.length > 1 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {service.images.slice(1, 4).map((image, index) => (
                  <div
                    key={index}
                    className="relative h-24 overflow-hidden rounded-xl bg-gray-100"
                  >
                    <Image
                      src={image}
                      alt={`${service.serviceName} ${index + 2}`}
                      fill
                      sizes="(max-width: 1024px) 33vw, 16vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <span className="inline-block rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600">
              {service.category}
            </span>

            <h1 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
              {service.serviceName}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <MapPin size={18} className="text-pink-600" />
                {service.location}
              </span>

              <span className="flex items-center gap-2">
                <Tag size={18} className="text-pink-600" />
                {service.category}
              </span>
            </div>

            <div className="mt-7 rounded-2xl bg-pink-50 p-6">
              <p className="text-sm font-medium text-gray-500">
                Starting Price
              </p>
              <p className="mt-2 text-3xl font-bold text-pink-600">
                ৳{Number(service.price).toLocaleString("en-BD")}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900">
                About This Service
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                {service.description}
              </p>
            </div>

            {/* Vendor Information */}
            <div className="mt-8 rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                Vendor Information
              </h2>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-xl font-bold text-pink-600">
                  {service.vendorName?.charAt(0)?.toUpperCase() || "V"}
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    {service.vendorName || "Wedora Vendor"}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Verified Service Provider
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <BookingForm onSubmit={handleBooking} loading={bookingLoading} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
