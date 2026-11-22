
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Check,
  CreditCard,
  LoaderCircle,
  Crown,
} from "lucide-react";

export default function VendorSubscriptionPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/subscription-plans`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load plans.");
        }

        setPlans(data.plans || []);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Handle Premium Checkout
  const handleUpgrade = async () => {
    try {
      setCheckoutLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to start checkout."
        );
      }

      window.location.href = data.url;
    } catch (error) {
      toast.error(error.message);
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
          <CreditCard size={28} />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Subscription Plans
        </h1>

        <p className="mt-2 text-gray-500">
          Choose a plan to grow your wedding business with Wedora.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <LoaderCircle className="animate-spin text-pink-600" size={35} />
        </div>
      ) : plans.length === 0 ? (
        <p className="rounded-xl bg-white p-8 text-center text-gray-500">
          No subscription plans available.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => {
            const isPremium = plan.id === "premium";
            const isFree = Number(plan.price) === 0;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border bg-white p-6 shadow-sm ${
                  isPremium
                    ? "border-pink-400 ring-2 ring-pink-100"
                    : "border-pink-100"
                }`}
              >
                {isPremium && (
                  <span className="absolute -top-3 right-5 rounded-full bg-pink-600 px-4 py-1 text-xs font-bold text-white">
                    Popular
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                    {isPremium ? (
                      <Crown size={22} />
                    ) : (
                      <CreditCard size={22} />
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-gray-900">
                    {plan.name}
                  </h2>
                </div>

                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ৳{Number(plan.price).toLocaleString("en-BD")}
                  </span>

                  <span className="ml-2 text-sm text-gray-500">
                    {plan.duration}
                  </span>
                </div>

                <div className="my-6 border-t border-gray-100" />

                <h3 className="mb-4 font-semibold text-gray-800">
                  What&apos;s included:
                </h3>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-gray-600"
                    >
                      <Check
                        size={18}
                        className="shrink-0 text-green-600"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={isPremium ? handleUpgrade : undefined}
                  disabled={!isPremium || isFree || checkoutLoading}
                  className={`mt-8 w-full rounded-xl px-5 py-3 font-semibold transition ${
                    isPremium
                      ? "bg-pink-600 text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
                      : "cursor-not-allowed bg-gray-100 text-gray-500"
                  }`}
                >
                  {checkoutLoading && isPremium ? (
                    <span className="flex items-center justify-center gap-2">
                      <LoaderCircle size={18} className="animate-spin" />
                      Redirecting...
                    </span>
                  ) : isFree ? (
                    "Free Plan"
                  ) : isPremium ? (
                    "Upgrade to Premium"
                  ) : (
                    "Coming Soon"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="rounded-2xl border border-pink-100 bg-pink-50 p-5">
        <h3 className="font-bold text-gray-900">
          Subscription Payments
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          Secure subscription payments are powered by Stripe.
        </p>
      </div>
    </div>
  );
}
