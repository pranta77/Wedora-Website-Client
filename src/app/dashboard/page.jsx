
"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

import StatsCard from "@/components/dashboard/StatsCard";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });

  useEffect(() => {
    if (isPending || user?.role !== "customer") return;

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
          pending: bookings.filter((booking) => booking.status === "pending").length,
          accepted: bookings.filter((booking) => booking.status === "accepted").length,
          rejected: bookings.filter((booking) => booking.status === "rejected").length,
        });
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    fetchBookings();
  }, [user?.role, isPending]);

  if (isPending) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  const role = user?.role;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome, {user?.name || "User"}! 👋
        </h2>

        <p className="mt-2 text-gray-500">
          {role === "admin" && "Manage your Wedora platform from here."}
          {role === "vendor" && "Manage your wedding services and bookings."}
          {role === "customer" && "Track your wedding planning activities."}
        </p>
      </div>

      {role === "customer" && (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard title="Total Bookings" value={counts.total} icon={CalendarDays} color="pink" />
          <StatsCard title="Pending Bookings" value={counts.pending} icon={Clock} color="orange" />
          <StatsCard title="Accepted Bookings" value={counts.accepted} icon={CheckCircle} color="green" />
          <StatsCard title="Rejected Bookings" value={counts.rejected} icon={XCircle} color="purple" />
        </div>
      )}

      {role === "vendor" && (
        <div className="rounded-2xl border border-pink-100 bg-white p-7 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900">
            Vendor Dashboard
          </h3>
          <p className="mt-2 text-gray-500">
            Manage your services, booking requests, and subscription plan.
          </p>
        </div>
      )}

      {role === "admin" && (
        <div className="rounded-2xl border border-pink-100 bg-white p-7 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900">
            Admin Dashboard
          </h3>
          <p className="mt-2 text-gray-500">
            Manage users, wedding services, and platform transactions.
          </p>
        </div>
      )}

      <div className="rounded-2xl bg-linear-to-r from-pink-600 to-rose-400 p-7 text-white shadow-md">
        <h3 className="text-xl font-bold">
          Plan Your Perfect Wedding
        </h3>

        <p className="mt-2 max-w-xl text-sm leading-6 text-white/90">
          Discover amazing wedding services, connect with trusted
          professionals, and make your special day unforgettable with Wedora.
        </p>
      </div>
    </div>
  );
}
