
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { UserRound, Mail, Save } from "lucide-react";

export default function CustomerProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
      });
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: formData.name,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile.");
      } else {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (isPending) {
    return <p className="p-8 text-center">Loading profile...</p>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-2 text-gray-500">
          Manage your personal information.
        </p>
      </div>

      <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-pink-600">
            <UserRound size={32} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {formData.name || "Customer"}
            </h2>
            <p className="text-sm text-gray-500">Customer Account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4">
              <UserRound size={18} className="text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full py-3 outline-none"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                value={formData.email}
                readOnly
                className="w-full cursor-not-allowed bg-transparent py-3 outline-none"
              />
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Email address cannot be changed.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-pink-600 disabled:opacity-60"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
