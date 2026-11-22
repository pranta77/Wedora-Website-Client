
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="overflow-hidden bg-[#FFF7FA]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600">
            <Sparkles size={16} />
            Make Your Dream Wedding Come True
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            &quot;Your Perfect Day,
            <span className="block text-pink-600">
              Our Perfect Plan.&quot;
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-gray-600 sm:text-lg">
            Discover trusted wedding professionals, explore
            beautiful venues, and find everything you need
            to create unforgettable memories.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/browse-services"
              className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-1 hover:bg-pink-700"
            >
              Explore Wedding Services
              <ArrowRight size={19} />
            </Link>

            <div className="flex items-center gap-2 rounded-xl border border-pink-200 bg-white px-5 py-3.5 font-medium text-gray-700">
              <Heart size={19} className="text-pink-500" />
              Plan With Love
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full bg-pink-200/60 blur-2xl" />

          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
            alt="Beautiful wedding celebration"
            className="relative h-87.5 w-full rounded-3xl object-cover shadow-2xl sm:h-112.5"
            width={500}
            height={500}
            priority
          />

          <div className="absolute -bottom-5 -left-3 rounded-2xl bg-white p-4 shadow-xl sm:-left-6 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-pink-100 p-3 text-pink-600">
                <Heart size={22} fill="currentColor" />
              </div>

              <div>
                <p className="font-bold text-gray-900">
                  Your Dream Wedding
                </p>
                <p className="text-xs text-gray-500">
                  Starts with Wedora
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
