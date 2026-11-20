
import Link from "next/link";
import {
  BriefcaseBusiness,
  CalendarCheck,
  CreditCard,
  Plus,
  ArrowRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Services",
    value: "0",
    icon: BriefcaseBusiness,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Pending Bookings",
    value: "0",
    icon: CalendarCheck,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "Total Earnings",
    value: "$0",
    icon: CreditCard,
    color: "bg-green-100 text-green-600",
  },
];

export default function VendorDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Vendor Dashboard
        </h1>
        <p className="mt-2 text-gray-500">
          Welcome to Wedora! Manage your wedding services and bookings.
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
          Quick Actions
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Start managing your wedding business with these shortcuts.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/dashboard/vendor/services/add"
            className="flex items-center justify-between rounded-xl bg-pink-50 p-5 transition hover:bg-pink-100"
          >
            <div className="flex items-center gap-3">
              <Plus className="text-pink-600" size={24} />
              <span className="font-semibold text-gray-800">
                Add New Service
              </span>
            </div>
            <ArrowRight size={20} className="text-pink-600" />
          </Link>

          <Link
            href="/dashboard/vendor/services"
            className="flex items-center justify-between rounded-xl bg-purple-50 p-5 transition hover:bg-purple-100"
          >
            <div className="flex items-center gap-3">
              <BriefcaseBusiness className="text-purple-600" size={24} />
              <span className="font-semibold text-gray-800">
                Manage Services
              </span>
            </div>
            <ArrowRight size={20} className="text-purple-600" />
          </Link>
        </div>
      </div>
    </div>
  );
}
