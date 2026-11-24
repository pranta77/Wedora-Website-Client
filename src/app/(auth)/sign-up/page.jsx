"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Eye, EyeOff, UserRound, Camera } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");
    const imageFile = formData.get("image");

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain an uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must contain a lowercase letter.");
      return;
    }

    try {
      setLoading(true);

      let image = "";

      // Upload profile image to ImgBB
      if (imageFile && imageFile.size > 0) {
        if (!imageFile.type.startsWith("image/")) {
          throw new Error("Please select a valid image.");
        }

        if (imageFile.size > 5 * 1024 * 1024) {
          throw new Error("Image size must be less than 5 MB.");
        }

        const imageData = new FormData();
        imageData.append("image", imageFile);

        const uploadResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          {
            method: "POST",
            body: imageData,
          },
        );

        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok || !uploadResult.success) {
          throw new Error("Profile image upload failed.");
        }

        image = uploadResult.data.url;
      }

      // Create account with Better Auth
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
        role,
        callbackURL: "/dashboard",
      });

      if (error) {
        throw new Error(error.message || "Registration failed.");
      }

      if (data) {
        toast.success("Your Wedora account has been created!");

        router.push(
          role === "vendor" ? "/dashboard/vendor" : "/dashboard/customer",
        );

        router.refresh();
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Google registration
  const handleGoogleSignUp = async () => {
    try {
      setGoogleLoading(true);
      setError("");

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000/dashboard",
      });

      if (error) {
        throw new Error(error.message || "Google authentication failed.");
      }
    } catch (err) {
      setError(err.message || "Google authentication failed.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-rose-50/50 px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm sm:p-9">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100">
              <Heart className="h-8 w-8 fill-rose-500 text-rose-500" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">Join Wedora</h1>

            <p className="mt-2 text-sm text-gray-500">
              Create your account and start planning beautiful weddings.
            </p>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={googleLoading || loading}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
          >
            <svg viewBox="0 0 48 48" className="h-5 w-5">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.44 38.03 46.98 31.92 46.98 24.55z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.9 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48z"
              />
            </svg>

            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium text-gray-400">
              OR REGISTER WITH EMAIL
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                autoComplete="name"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
              />
            </div>

            {/* Profile Image */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Profile Image (Optional)
              </label>

              <label
                htmlFor="image"
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-gray-300 px-4 py-4 transition hover:border-rose-400 hover:bg-rose-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                  <Camera className="h-5 w-5 text-rose-500" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Choose profile image
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG or JPEG (Maximum 5 MB)
                  </p>
                </div>
              </label>

              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              <p className="mt-2 text-xs leading-5 text-gray-400">
                At least 6 characters, including one uppercase and one lowercase
                letter.
              </p>
            </div>

            {/* Account Role */}
            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Account Type
              </label>

              <select
                id="role"
                name="role"
                defaultValue="customer"
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
              >
                <option value="customer">Customer — Plan my wedding</option>
                <option value="vendor">Vendor — Offer wedding services</option>
              </select>
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-rose-500 font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <UserRound size={18} />
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-rose-500 hover:text-rose-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Your dream wedding starts with Wedora. ❤️
        </p>
      </div>
    </div>
  );
}
