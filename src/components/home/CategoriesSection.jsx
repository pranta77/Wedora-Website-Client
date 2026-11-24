"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Camera,
  Utensils,
  Building2,
  Flower2,
  Sparkles,
  Shirt,
} from "lucide-react";

const categories = [
  {
    name: "Photography & Videography",
    value: "Photography & Videography",
    description: "Capture every beautiful moment.",
    icon: Camera,
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Wedding Venues",
    value: "Wedding Venues",
    description: "Find your dream wedding location.",
    icon: Building2,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Decoration & Florist",
    value: "Decoration & Florist",
    description: "Create a magical wedding atmosphere.",
    icon: Flower2,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Catering Services",
    value: "Catering Services",
    description: "Delicious food for your celebration.",
    icon: Utensils,
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Makeup & Styling",
    value: "Makeup & Styling",
    description: "Look stunning on your special day.",
    icon: Sparkles,
    color: "bg-rose-100 text-rose-600",
  },
  {
    name: "Wedding Fashion",
    value: "Wedding Fashion",
    description: "Discover your perfect wedding look.",
    icon: Shirt,
    color: "bg-blue-100 text-blue-600",
  },
];

export default function CategoriesSection() {
  return (
    <section className="bg-[#fff8fa] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-semibold uppercase tracking-widest text-pink-600">
            Explore Categories
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything You Need for Your Perfect Wedding
          </h2>

          <p className="mt-4 text-gray-500">
            Discover trusted wedding professionals across different service
            categories and bring your dream celebration to life.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={{
                  pathname: "/browse-services",
                  query: { category: category.value },
                }}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group h-full cursor-pointer rounded-2xl border border-pink-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${category.color}`}
                  >
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 transition group-hover:text-pink-600">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {category.description}
                  </p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
