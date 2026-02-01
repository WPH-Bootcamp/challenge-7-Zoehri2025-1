"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useRestaurantsQuery } from "@/services/queries/useRestaurantsQuery";
import { useAppDispatch, useAppSelector } from "@/features/cart/hooks";
import { setCategory, setDistance, setPriceRange, setMinRating } from "@/features/filters/filtersSlice";
import { categories } from "@/config/categories";
import { Restaurant } from "@/types";
import { Input } from "@/components/ui/input";

const DISTANCE_OPTIONS = [
  { value: "nearby" as const, label: "Nearby" },
  { value: "1km" as const, label: "Within 1 km" },
  { value: "3km" as const, label: "Within 3 km" },
  { value: "5km" as const, label: "Within 5 km" },
];

const RATING_OPTIONS = [5, 4, 3, 2, 1];

function parseDistance(distanceStr: string | undefined): number | null {
  if (!distanceStr) return null;
  const match = distanceStr.match(/([\d.]+)\s*km?/i);
  return match ? parseFloat(match[1]) : null;
}

function filterRestaurants(
  restaurants: Restaurant[],
  categorySlug: string,
  distance: "nearby" | "1km" | "3km" | "5km" | null,
  minPrice: number | null,
  maxPrice: number | null,
  minRating: number | null
): Restaurant[] {
  let result = [...restaurants];

  if (categorySlug && categorySlug !== "all") {
    result = result.filter((r) => {
      if (categorySlug === "nearby") return true;
      if (categorySlug === "discount") return true;
      if (categorySlug === "best-seller") return (r.rating ?? 0) >= 4;
      return true;
    });
  }

  if (distance) {
    const maxKm = distance === "nearby" ? 5 : distance === "1km" ? 1 : distance === "3km" ? 3 : 5;
    result = result.filter((r) => {
      const d = parseDistance(r.distance);
      if (d == null) return true;
      return d <= maxKm;
    });
  }

  if (minPrice != null || maxPrice != null) {
    result = result.filter((r) => {
      return true;
    });
  }

  if (minRating != null) {
    result = result.filter((r) => (r.rating ?? 0) >= minRating);
  }

  return result;
}

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params?.slug === "string" ? params.slug : "all";

  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const { data: restaurantsData, isLoading } = useRestaurantsQuery();

  const category = categories.find((c) => c.id === slug) ?? categories[0];
  const restaurants = Array.isArray(restaurantsData) ? restaurantsData : [];
  const filteredRestaurants = filterRestaurants(
    restaurants,
    slug,
    filters.distance,
    filters.minPrice,
    filters.maxPrice,
    filters.minRating
  );

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    dispatch(setCategory(slug));
  }, [slug, dispatch]);

  return (
    <div className="min-h-dvh bg-white flex flex-col">
      <Header />

      <main className="flex-1 py-6 sm:py-8 lg:py-12">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Page Title */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-[#0a0d12] text-center mb-4 sm:mb-6 lg:mb-8">
            {category.name}
          </h1>

          {/* Mobile: Filter bar with hamburger (Figma 37421-9341) */}
          <div className="flex lg:hidden items-center justify-between mb-4 px-0">
            <span className="text-xs font-bold uppercase tracking-wider text-[#717680]">
              Filter
            </span>
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center justify-center h-10 w-10 rounded-lg text-[#0a0d12] hover:bg-gray-100 active:bg-gray-200 min-h-[44px] min-w-[44px]"
              aria-label="Open filter"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left - Filter Sidebar (desktop only) */}
            <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 lg:sticky lg:top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#717680]">
                    Filter
                  </h2>
                  {(filters.distance || filters.minPrice != null || filters.maxPrice != null || filters.minRating != null) && (
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(setDistance(null));
                        dispatch(setPriceRange({ min: null, max: null }));
                        dispatch(setMinRating(null));
                      }}
                      className="text-xs font-medium text-[#c12116] hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Distance */}
                <div className="mb-5">
                  <p className="font-display font-bold text-[#0a0d12] text-sm mb-3">Distance</p>
                  <div className="space-y-2">
                    {DISTANCE_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="distance"
                          checked={filters.distance === opt.value}
                          onChange={() => dispatch(setDistance(opt.value))}
                          className="w-4 h-4 rounded-full border-2 border-gray-300 text-[#c12116] focus:ring-[#c12116]"
                        />
                        <span className="text-sm font-medium text-[#0a0d12] group-hover:text-[#c12116]">
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <p className="font-display font-bold text-[#0a0d12] text-sm mb-3">Price</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717680] text-sm">
                        Rp
                      </span>
                      <Input
                        type="number"
                        placeholder="Minimum Price"
                        value={filters.minPrice != null ? String(filters.minPrice) : ""}
                        onChange={(e) => {
                          const v = e.target.value ? parseInt(e.target.value, 10) : null;
                          dispatch(setPriceRange({ min: v ?? null, max: filters.maxPrice }));
                        }}
                        className="pl-8 h-10 text-sm"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717680] text-sm">
                        Rp
                      </span>
                      <Input
                        type="number"
                        placeholder="Maximum Price"
                        value={filters.maxPrice != null ? String(filters.maxPrice) : ""}
                        onChange={(e) => {
                          const v = e.target.value ? parseInt(e.target.value, 10) : null;
                          dispatch(setPriceRange({ min: filters.minPrice, max: v ?? null }));
                        }}
                        className="pl-8 h-10 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <p className="font-display font-bold text-[#0a0d12] text-sm mb-3">Rating</p>
                  <div className="space-y-2">
                    {RATING_OPTIONS.map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.minRating === rating}
                          onChange={() => dispatch(setMinRating(rating))}
                          className="w-4 h-4 rounded-full border-2 border-gray-300 text-[#c12116] focus:ring-[#c12116]"
                        />
                        <div className="flex items-center gap-1">
                          {[...Array(rating)].map((_, i) => (
                            <svg
                              key={i}
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="#FFD700"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7 0L8.5716 4.83688L14 5.61143L10.5 9.16312L11.4164 14L7 11.3369L2.58359 14L3.5 9.16312L0 5.61143L5.4284 4.83688L7 0Z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm font-medium text-[#0a0d12]">{rating}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Mobile: Filter overlay panel (Figma 37421-9341) */}
            {mobileFilterOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                  onClick={() => setMobileFilterOpen(false)}
                  aria-hidden="true"
                />
                <div
                  className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,85vw)] max-w-full bg-gray-100 lg:hidden flex flex-col shadow-xl transition-transform duration-200 ease-out"
                  role="dialog"
                  aria-label="Filter"
                >
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#717680]">
                      Filter
                    </h2>
                    <button
                      type="button"
                      onClick={() => setMobileFilterOpen(false)}
                      className="flex items-center justify-center h-10 w-10 rounded-lg text-[#0a0d12] hover:bg-gray-100 -mr-2"
                      aria-label="Close filter"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="flex justify-end mb-4">
                      {(filters.distance || filters.minPrice != null || filters.maxPrice != null || filters.minRating != null) && (
                        <button
                          type="button"
                          onClick={() => {
                            dispatch(setDistance(null));
                            dispatch(setPriceRange({ min: null, max: null }));
                            dispatch(setMinRating(null));
                          }}
                          className="text-xs font-medium text-[#c12116] hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="mb-5">
                      <p className="font-display font-bold text-[#0a0d12] text-sm mb-3">Distance</p>
                      <div className="space-y-2">
                        {DISTANCE_OPTIONS.map((opt) => (
                          <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="radio"
                              name="distance-mobile"
                              checked={filters.distance === opt.value}
                              onChange={() => dispatch(setDistance(opt.value))}
                              className="w-4 h-4 rounded-full border-2 border-gray-300 text-[#c12116] focus:ring-[#c12116] accent-[#c12116]"
                            />
                            <span className="text-sm font-medium text-[#0a0d12] group-hover:text-[#c12116]">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="mb-5">
                      <p className="font-display font-bold text-[#0a0d12] text-sm mb-3">Price</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717680] text-sm">Rp</span>
                          <Input
                            type="number"
                            placeholder="Minimum Price"
                            value={filters.minPrice != null ? String(filters.minPrice) : ""}
                            onChange={(e) => {
                              const v = e.target.value ? parseInt(e.target.value, 10) : null;
                              dispatch(setPriceRange({ min: v ?? null, max: filters.maxPrice }));
                            }}
                            className="pl-8 h-10 text-sm bg-white"
                          />
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717680] text-sm">Rp</span>
                          <Input
                            type="number"
                            placeholder="Maximum Price"
                            value={filters.maxPrice != null ? String(filters.maxPrice) : ""}
                            onChange={(e) => {
                              const v = e.target.value ? parseInt(e.target.value, 10) : null;
                              dispatch(setPriceRange({ min: filters.minPrice, max: v ?? null }));
                            }}
                            className="pl-8 h-10 text-sm bg-white"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="font-display font-bold text-[#0a0d12] text-sm mb-3">Rating</p>
                      <div className="space-y-2">
                        {RATING_OPTIONS.map((rating) => (
                          <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="radio"
                              name="rating-mobile"
                              checked={filters.minRating === rating}
                              onChange={() => dispatch(setMinRating(rating))}
                              className="w-4 h-4 rounded-full border-2 border-gray-300 text-[#c12116] focus:ring-[#c12116] accent-[#c12116]"
                            />
                            <div className="flex items-center gap-0.5">
                              {[...Array(rating)].map((_, i) => (
                                <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#FFD700" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M7 0L8.5716 4.83688L14 5.61143L10.5 9.16312L11.4164 14L7 11.3369L2.58359 14L3.5 9.16312L0 5.61143L5.4284 4.83688L7 0Z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm font-medium text-[#0a0d12]">{rating}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <button
                      type="button"
                      onClick={() => setMobileFilterOpen(false)}
                      className="w-full h-12 rounded-xl bg-[#c12116] text-white font-bold text-sm hover:bg-[#a01a12] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Right - Restaurant List */}
            <div className="flex-1 min-w-0">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="h-24 sm:h-28 bg-gray-200 animate-pulse rounded-xl"
                    />
                  ))}
                </div>
              ) : filteredRestaurants.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 sm:py-16">
                  <p className="text-sm sm:text-base font-medium text-gray-500 px-4">
                    No restaurants found. Try adjusting your filters.
                  </p>
                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="mt-4 text-[#c12116] font-bold hover:underline"
                  >
                    Back to Home
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
