
import {
  Users,
  BriefcaseBusiness,
  CreditCard,
  CalendarCheck,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "0",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Total Services",
    value: "0",
    icon: BriefcaseBusiness,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Total Bookings",
    value: "0",
    icon: CalendarCheck,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "Total Transactions",
    value: "0",
    icon: CreditCard,
    color: "bg-green-100 text-green-600",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-gray-500">
          Welcome to Wedora! Manage users, services, bookings, and transactions.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
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

      <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">
          Welcome, Administrator!
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Use the dashboard sidebar to manage your Wedora platform.
        </p>
      </div>
    </div>
  );
}
