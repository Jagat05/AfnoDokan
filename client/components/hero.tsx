"use client";
import { motion } from "framer-motion";
import { Store, Globe, ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-400 to-white">
      {/* Decorative blur */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
              <Store className="h-4 w-4" />
              Afno Dokan. Afno Brand. Afno Website.
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
              <span className="text-indigo-600">Afno Dokan </span>
              <br /> Everything You Need.
            </h1>

            <p className="max-w-xl text-lg text-gray-700">
              <strong>Afno Dokan</strong> From daily essentials to trending
              products, Aafno Dokan makes online shopping fast, simple, and
              reliable. Discover more, pay less, and enjoy doorstep delivery.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => router.push("/register")}
                className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-white shadow-lg transition hover:scale-[1.02] hover:bg-indigo-700"
              >
                Register Now
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 px-6 py-3 text-gray-700 transition hover:bg-gray-50">
                Explore Products
              </button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-emerald-600" />
                Afno Dokan
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                From the Real Owner. With Real Products.
              </div>
            </div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="flex relative  justify-center p-2 shadow-xl bg-white rounded-3xl h-100 w-120 ml-4">
              <Image
                src="/giphy.gif"
                alt="Online Shopping"
                width={400}
                height={400}
                className="rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
