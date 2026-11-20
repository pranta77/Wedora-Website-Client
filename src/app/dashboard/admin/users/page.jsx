"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Users,
  LoaderCircle,
  Search,
  ShieldBan,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
          {
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load users.");
        }

        setUsers(data.users || []);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const updateUserStatus = async (id, isBlocked) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}/status`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ isBlocked }),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to update user status.");
        }

        setUsers((previous) =>
          previous.map((user) =>
            user._id === id ? { ...user, isBlocked } : user,
          ),
        );

        toast.success(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    };
    const searchText = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText)
    );
  });
//   const handleStatusConfirm = (user) => {
//     const isBlocked = !user.isBlocked;

//     toast(
//       `Are you sure you want to ${isBlocked ? "block" : "unblock"} ${user.name}?`,
//       {
//         duration: 10000,
//         action: {
//           label: "Confirm",
//           onClick: () => updateUserStatus(user._id, isBlocked),
//         },
//         cancel: {
//           label: "Cancel",
//           onClick: () => {},
//         },
//       },
//     );
//   };

const handleStatusConfirm = (user) => {
  const isBlocked = !user.isBlocked;

  toast(
    `Are you sure you want to ${
      isBlocked ? "block" : "unblock"
    } ${user.name}?`,
    {
      duration: 10000,
      action: {
        label: "Confirm",
        onClick: () => updateUserStatus(user._id, isBlocked),
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    }
  );
};

const updateUserStatus = async (id, isBlocked) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ isBlocked }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update user status.");
    }

    setUsers((previous) =>
      previous.map((user) =>
        user._id === id ? { ...user, isBlocked } : user
      )
    );

    toast.success(data.message);
  } catch (error) {
    toast.error(error.message);
  }
};


  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoaderCircle className="animate-spin text-[#285943]" size={35} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <div className="flex items-center gap-3">
          <Users className="text-[#285943]" size={30} />

          <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          View and manage all registered customers and vendors.
        </p>
      </div>

      {/* Total Users */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Total Users</p>

        <h2 className="mt-2 text-3xl font-bold text-[#285943]">
          {users.length}
        </h2>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">All Users</h2>

            <p className="text-sm text-gray-500">
              {filteredUsers.length} users found
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={18}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or email..."
              className="w-full rounded-xl border border-gray-200 py-2.5 pr-4 pl-10 text-sm outline-none transition focus:border-[#285943]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-212.5 text-left">
            <thead className="bg-gray-50 text-xs font-semibold tracking-wide text-gray-500 uppercase">
              <tr>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Account Status</th>
                <th className="px-5 py-4">Joined</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="transition hover:bg-gray-50">
                    {/* User Information */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name || "User"}
                            width={500}
                            height={500}
                            className="h-11 w-11 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 font-bold text-[#285943]">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                        )}

                        <div>
                          <p className="font-semibold text-gray-800">
                            {user.name || "Unknown User"}
                          </p>

                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold capitalize text-blue-700">
                        {user.role || "customer"}
                      </span>
                    </td>

                    {/* Account Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          user.isBlocked
                            ? "bg-red-50 text-red-600"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>

                    {/* Joined Date */}
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-4">
                      {user.role !== "admin" ? (
                        <button
                          onClick={() => handleStatusConfirm(user)}
                          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                            user.isBlocked
                              ? "bg-green-50 text-green-700 hover:bg-green-100"
                              : "bg-red-50 text-red-600 hover:bg-red-100"
                          }`}
                        >
                          {user.isBlocked ? (
                            <>
                              <ShieldCheck size={15} />
                              Unblock
                            </>
                          ) : (
                            <>
                              <ShieldBan size={15} />
                              Block
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="text-xs font-medium text-gray-400">
                          Protected
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    {search
                      ? "No users found matching your search."
                      : "No users registered yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
