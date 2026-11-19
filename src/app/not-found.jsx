'use client'
import Link from "next/link";
import { Heart, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center bg-[#FFF9FB] px-5 text-center">
      {/* Illustration */}
      <div className="relative mb-8">
        <h1 className="text-[120px] font-extrabold leading-none text-pink-100 sm:text-[160px]">
          404
        </h1>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pink-600 text-white shadow-xl sm:h-24 sm:w-24">
            <Heart size={45} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Message */}
      <h2 className="text-3xl font-bold text-gray-900">
        Oops! Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        Looks like this page wandered away.
        Don&apos;t worry, let&apos;s get you back to planning
        your dream wedding!
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-lg bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700"
        >
          <Home size={18} />
          Back to Home
        </Link>

        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center gap-2 rounded-lg border border-pink-200 bg-white px-6 py-3 font-semibold text-pink-600 transition hover:bg-pink-50"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    </div>
  );
}
