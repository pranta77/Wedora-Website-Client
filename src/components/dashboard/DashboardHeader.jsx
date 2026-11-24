
"use client";

import { Bell, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const DashboardHeader = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const role = user?.role || "user";

  return (
    <header className="flex flex-col justify-between gap-4 border-b border-pink-100 bg-white px-5 py-5 sm:flex-row sm:items-center sm:px-8">
      <div>
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome to your Wedora {role} dashboard.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-full border border-gray-200 p-2.5 text-gray-600 transition hover:bg-pink-50 hover:text-pink-600"
        >
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3 rounded-full bg-pink-50 py-2 pl-2 pr-4">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-pink-100 text-pink-600">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                className="h-full w-full object-cover"
                width={500}
                height={500}
              />
            ) : (
              <UserRound size={20} />
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">
              Welcome
            </p>
            <p className="text-xs text-gray-500">
              {user?.name || "Wedora User"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
