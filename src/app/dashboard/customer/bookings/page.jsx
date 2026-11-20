"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, PackageOpen } from "lucide-react";
import { toast } from "sonner";

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/customer/bookings`,
          {
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load bookings.");
        }

        setBookings(data.bookings || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);
  const handleCancelConfirm = (booking) => {
    toast(`Are you sure you want to cancel "${booking.serviceName}"?`, {
      duration: 10000,
      action: {
        label: "Confirm",
        onClick: () => cancelBooking(booking._id),
      },
      cancel: {
        label: "Keep Booking",
        onClick: () => {},
      },
    });
  };

  const cancelBooking = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customer/bookings/${id}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to cancel booking.");
      }

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === id ? { ...booking, status: "cancelled" } : booking,
        ),
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  };
  const getStatusStyle = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-700",
      accepted: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
      completed: "bg-blue-100 text-blue-700",
      cancelled: "bg-gray-100 text-gray-600",
    };

    return styles[status?.toLowerCase()] || "bg-gray-100 text-gray-700";
  };

  if (loading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          My Bookings
        </h1>
        <p className="mt-2 text-gray-500">
          Track and manage your wedding service booking requests.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
          <PackageOpen className="mx-auto h-12 w-12 text-gray-400" />

          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            No Bookings Yet
          </h2>

          <p className="mt-2 text-gray-500">
            You haven&apos;t booked any wedding services yet.
          </p>

          <Link
            href="/browse-services"
            className="mt-6 inline-block rounded-xl bg-[#285943] px-6 py-3 font-semibold text-white transition hover:bg-[#1f4635]"
          >
            Browse Services
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-bold text-gray-900">
                  {booking.serviceName}
                </h2>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                    booking.status,
                  )}`}
                >
                  {booking.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Vendor: {booking.vendorName}
              </p>

              <div className="mt-5 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CalendarDays size={18} className="text-[#285943]" />
                  {new Date(
                    `${booking.eventDate}T00:00:00`,
                  ).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-[#285943]" />
                  {booking.eventLocation}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-sm text-gray-500">Service Price</span>

                <span className="text-lg font-bold text-[#285943]">
                  ৳{Number(booking.price).toLocaleString("en-BD")}
                </span>
                {booking.status === "pending" && (
                  <button
                    onClick={() => handleCancelConfirm(booking)}
                    className="mt-4 w-full rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
