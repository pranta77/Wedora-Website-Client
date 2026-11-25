"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message || "Sign in failed.");
      }

      const { data: sessionData } = await authClient.getSession();

      if (!sessionData?.user) {
        throw new Error(
          "Signed in, but session cookie was not saved. Check backend CORS/cookie settings.",
        );
      }

      const role = sessionData.user.role;

      toast.success("Welcome back to Wedora!");

      const dashboardLink =
        role === "vendor"
          ? "/dashboard/vendor"
          : role === "admin"
            ? "/dashboard/admin"
            : "/dashboard/customer";

      const params = new URLSearchParams(window.location.search);
      const callbackURL = params.get("callbackURL");

      const redirectTo =
        callbackURL &&
        callbackURL.startsWith("/") &&
        !callbackURL.startsWith("//")
          ? callbackURL
          : dashboardLink;

      window.location.href = redirectTo;
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-rose-50/50 px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm sm:p-9">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100">
              <Heart className="h-8 w-8 fill-rose-500 text-rose-500" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to continue your journey with Wedora.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-rose-500 py-3 font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-rose-500 hover:text-rose-600"
            >
              Create Account
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Your dream wedding starts with Wedora.
        </p>
      </div>
    </div>
  );
}
