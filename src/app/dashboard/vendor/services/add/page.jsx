
"use client";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddServicePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    description: "",
    price: "",
    location: "",
    images: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add service.");
    }

    toast.success(data.message);

    setFormData({
      serviceName: "",
      category: "",
      description: "",
      price: "",
      location: "",
      images: "",
    });

    router.push("/dashboard/vendor/services");
    router.refresh();
  } catch (error) {
    toast.error(error.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <Link
          href="/dashboard/vendor/services"
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-pink-600 hover:text-pink-700"
        >
          <ArrowLeft size={17} />
          Back to My Services
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Add Wedding Service
        </h1>

        <p className="mt-2 text-gray-500">
          Share your wedding service with couples looking for trusted professionals.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
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
            placeholder="e.g. Professional Wedding Photography"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-pink-500"
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
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-pink-500"
          >
            <option value="">Select a category</option>
            <option value="Photography">Photography</option>
            <option value="Catering">Catering</option>
            <option value="Wedding Venues">Wedding Venues</option>
            <option value="Decoration">Decoration</option>
            <option value="Makeup & Beauty">Makeup & Beauty</option>
            <option value="Music & Entertainment">Music & Entertainment</option>
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
            placeholder="Describe your wedding service..."
            rows={5}
            required
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-pink-500"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Price (BDT)
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter your price"
              min="1"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-pink-500"
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
              placeholder="e.g. Chattogram"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-pink-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <ImagePlus size={18} className="text-pink-600" />
            Service Image URL
          </label>

          <input
            type="url"
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="Paste your service image URL"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-pink-500"
          />

          <p className="mt-2 text-xs text-gray-400">
            We&apos;ll connect image uploading in a later step.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-pink-600 px-6 py-3.5 font-semibold text-white transition hover:bg-pink-700 disabled:opacity-60"
        >
          {loading ? "Adding Service..." : "Add Wedding Service"}
        </button>
      </form>
    </div>
  );
}
