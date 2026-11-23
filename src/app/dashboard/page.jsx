
"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

import StatsCard from "@/components/dashboard/StatsCard";

export default function DashboardPage() {
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/customer/bookings`,
          { credentials: "include" }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load bookings.");
        }

        const bookings = data.bookings || [];

        setCounts({
          total: bookings.length,
          pending: bookings.filter(
            (booking) => booking.status === "pending"
          ).length,
          accepted: bookings.filter(
            (booking) => booking.status === "accepted"
          ).length,
          rejected: bookings.filter(
            (booking) => booking.status === "rejected"
          ).length,
        });
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome to Wedora! 👋
        </h2>

        <p className="mt-2 text-gray-500">
          Here&apos;s an overview of your wedding planning activities.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Bookings"
          value={counts.total}
          icon={CalendarDays}
          color="pink"
        />

        <StatsCard
          title="Pending Bookings"
          value={counts.pending}
          icon={Clock}
          color="orange"
        />

        <StatsCard
          title="Accepted Bookings"
          value={counts.accepted}
          icon={CheckCircle}
          color="green"
        />

        <StatsCard
          title="Rejected Bookings"
          value={counts.rejected}
          icon={XCircle}
          color="purple"
        />
      </div>

      {/* Welcome Card */}
      <div className="rounded-2xl bg-linear-to-r from-pink-600 to-rose-400 p-7 text-white shadow-md">
        <h3 className="text-xl font-bold">
          Plan Your Perfect Wedding
        </h3>

        <p className="mt-2 max-w-xl text-sm leading-6 text-white/90">
          Discover amazing wedding services, connect with
          trusted professionals, and make your special day
          unforgettable with Wedora.
        </p>
      </div>
    </div>
  );
}
