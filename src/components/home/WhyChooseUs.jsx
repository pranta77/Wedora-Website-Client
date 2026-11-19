
"use client";

import { motion } from "framer-motion";
import {
  HeartHandshake,
  ShieldCheck,
  Wallet,
  Headset,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Professionals",
    description:
      "Connect with verified wedding vendors and reliable service providers for your special day.",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: Wallet,
    title: "Budget Friendly",
    description:
      "Explore different services and find options that perfectly match your wedding budget.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: HeartHandshake,
    title: "Easy Booking",
    description:
      "Book your favorite wedding services easily and manage your bookings in one place.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Headset,
    title: "Dedicated Support",
    description:
      "Get helpful assistance throughout your wedding planning journey whenever you need it.",
    color: "bg-green-100 text-green-600",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-semibold uppercase tracking-widest text-pink-600">
              Why Choose Wedora
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              Making Your Dream Wedding
              <span className="text-pink-600"> Stress-Free</span>
            </h2>

            <p className="mt-5 leading-7 text-gray-500">
              Planning a wedding should be exciting, not stressful. Wedora
              brings trusted professionals, convenient booking, and helpful
              tools together to make your special day unforgettable.
            </p>

            <div className="mt-8 flex items-center gap-4 rounded-2xl bg-pink-50 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                <HeartHandshake size={25} />
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Your Wedding, Your Way
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Everything you need to create your perfect celebration.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}
                  >
                    <Icon size={24} />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
