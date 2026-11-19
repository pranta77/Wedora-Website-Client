
"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Happy Customer",
    image: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    review:
      "Wedora made our wedding planning so much easier. We found amazing vendors and everything went smoothly. Highly recommended!",
  },
  {
    name: "Tanvir Hasan",
    role: "Happy Customer",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    review:
      "The booking process was simple, and we found the perfect photographer for our special day. Truly a wonderful experience!",
  },
  {
    name: "Nusrat Jahan",
    role: "Happy Customer",
    image: "https://i.pravatar.cc/150?img=44",
    rating: 5,
    review:
      "I loved how easy it was to explore wedding services in one place. Wedora helped us plan a beautiful celebration.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#fff8fa] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-semibold uppercase tracking-widest text-pink-600">
            Customer Stories
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Love Stories from Our Customers
          </h2>

          <p className="mt-4 text-gray-500">
            Discover what couples say about their wedding planning experience
            with Wedora.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl border border-pink-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <Quote size={32} className="mb-5 text-pink-200" />

              <div className="mb-4 flex gap-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={17}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="min-h-28 text-sm leading-7 text-gray-600">
                {item.review}
              </p>

              <div className="mt-7 flex items-center gap-3 border-t border-gray-100 pt-5">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={500}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
