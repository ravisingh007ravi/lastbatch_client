import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiTruck, FiRefreshCw } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-200 dark:bg-zinc-950 dark:text-gray-100">
      {/* Hero section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-black/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-black dark:bg-white/10 dark:text-white">
              Latest Technology Deals
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Next-Gen Tech, <br />
              <span className="text-gray-400 dark:text-zinc-500">Delivered to You.</span>
            </h1>
            <p className="mt-5 text-base text-gray-600 sm:text-lg dark:text-zinc-400">
              Discover premium laptops, mobile phones, iPads, and accessories.
              Seamless ordering with fast shipping across India.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/laptops"
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Explore Laptops <FiArrowRight size={16} />
              </Link>
              <Link
                to="/deals"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                Today's Deals
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex flex-col gap-4">
                <div className="h-44 rounded-2xl bg-gradient-to-tr from-gray-900 to-gray-700 p-6 text-white flex flex-col justify-between">
                  <span className="text-xs uppercase font-bold tracking-widest text-gray-400">Featured Offer</span>
                  <div>
                    <h3 className="text-2xl font-bold">Up to 30% Off</h3>
                    <p className="text-xs text-gray-300">Flagship smartphones & laptops</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-gray-200 bg-white p-3 text-center dark:border-zinc-700 dark:bg-zinc-800">
                    <FiTruck className="mx-auto mb-1 text-black dark:text-white" size={20} />
                    <p className="text-[11px] font-semibold">Free Delivery</p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3 text-center dark:border-zinc-700 dark:bg-zinc-800">
                    <FiShield className="mx-auto mb-1 text-black dark:text-white" size={20} />
                    <p className="text-[11px] font-semibold">1 Yr Warranty</p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3 text-center dark:border-zinc-700 dark:bg-zinc-800">
                    <FiRefreshCw className="mx-auto mb-1 text-black dark:text-white" size={20} />
                    <p className="text-[11px] font-semibold">7 Days Return</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
