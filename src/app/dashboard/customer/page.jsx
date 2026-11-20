
import Link from "next/link";
import {
  CalendarDays,
  Heart,
  Clock,
  Search,
  ArrowRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Bookings",
    value: "0",
    icon: CalendarDays,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Pending Bookings",
    value: "0",
    icon: Clock,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "Saved Services",
    value: "0",
    icon: Heart,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Customer Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome to Wedora! Let&apos;s make your dream wedding unforgettable.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-900">
                    {stat.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-4 ${stat.color}`}>
                  <Icon size={25} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">
          Start Planning Your Wedding
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Discover trusted wedding professionals and manage your bookings.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/browse-services"
            className="flex items-center justify-between rounded-xl bg-pink-50 p-5 transition hover:bg-pink-100"
          >
            <div className="flex items-center gap-3">
              <Search size={24} className="text-pink-600" />

              <span className="font-semibold text-gray-800">
                Browse Services
              </span>
            </div>

            <ArrowRight size={20} className="text-pink-600" />
          </Link>

          <Link
            href="/dashboard/customer/bookings"
            className="flex items-center justify-between rounded-xl bg-purple-50 p-5 transition hover:bg-purple-100"
          >
            <div className="flex items-center gap-3">
              <CalendarDays size={24} className="text-purple-600" />

              <span className="font-semibold text-gray-800">
                My Bookings
              </span>
            </div>

            <ArrowRight size={20} className="text-purple-600" />
          </Link>
        </div>
      </div>
    </div>
  );
}
