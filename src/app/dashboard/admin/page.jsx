
"use client";

import { useEffect, useState } from "react";
import {
  Users,
  BriefcaseBusiness,
  CreditCard,
  Clock,
  UserRound,
  CheckCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Registered Users",
    key: "totalUsers",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Total Vendors",
    key: "totalVendors",
    icon: BriefcaseBusiness,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Total Customers",
    key: "totalCustomers",
    icon: UserRound,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Total Services",
    key: "totalServices",
    icon: CheckCircle,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Pending Services",
    key: "pendingServices",
    icon: Clock,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "Total Transactions",
    key: "totalTransactions",
    icon: CreditCard,
    color: "bg-indigo-100 text-indigo-600",
  },
];

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalCustomers: 0,
    totalServices: 0,
    pendingServices: 0,
    totalTransactions: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersResponse, servicesResponse, transactionsResponse] =
          await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
              credentials: "include",
            }),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/services`, {
              credentials: "include",
            }),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/transactions`, {
              credentials: "include",
            }),
          ]);

        const [usersData, servicesData, transactionsData] =
          await Promise.all([
            usersResponse.json(),
            servicesResponse.json(),
            transactionsResponse.json(),
          ]);

        if (
          !usersResponse.ok ||
          !servicesResponse.ok ||
          !transactionsResponse.ok
        ) {
          throw new Error("Failed to load admin dashboard data.");
        }

        const users = usersData.users || [];
        const services = servicesData.services || [];
        const transactions = transactionsData.transactions || [];

        setCounts({
          totalUsers: users.length,
          totalVendors: users.filter(
            (user) => user.role === "vendor"
          ).length,
          totalCustomers: users.filter(
            (user) => user.role === "customer"
          ).length,
          totalServices: services.length,
          pendingServices: services.filter(
            (service) => service.status === "pending"
          ).length,
          totalTransactions: transactions.length,
        });
      } catch (error) {
        console.error("Admin dashboard error:", error);
      }
    };

    fetchDashboardData();
  }, []);

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

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
                    {counts[stat.key]}
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
