
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderCircle, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

const initialForm = {
  serviceName: "",
  category: "",
  description: "",
  price: "",
  location: "",
  images: "",
};

export default function EditServicePage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/vendor/services`,
          { credentials: "include" }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load service.");
        }

        const service = data.services?.find((item) => item._id === id);

        if (!service) {
          throw new Error("Service not found.");
        }

        setFormData({
          serviceName: service.serviceName || "",
          category: service.category || "",
          description: service.description || "",
          price: service.price || "",
          location: service.location || "",
          images: service.images?.[0] || "",
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchService();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/vendor/services/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update service.");
      }

      toast.success(data.message);
      router.push("/dashboard/vendor/services");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoaderCircle className="animate-spin text-pink-600" size={35} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link
          href="/dashboard/vendor/services"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-pink-600"
        >
          <ArrowLeft size={17} />
          Back to My Services
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Edit Service
        </h1>
        <p className="mt-2 text-gray-500">
          Update your wedding service information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-pink-100 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Service Name
          </label>
          <input
            type="text"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-500"
          >
            <option value="">Select a category</option>
            {[
              "Photography",
              "Catering",
              "Wedding Venues",
              "Decoration",
              "Makeup & Beauty",
              "Music & Entertainment",
            ].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-500"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Price (৳)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="1"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            name="images"
            value={formData.images}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-500"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? (
            <LoaderCircle className="animate-spin" size={19} />
          ) : (
            <Save size={19} />
          )}
          {saving ? "Updating..." : "Update Service"}
        </button>
      </form>
    </div>
  );
}
