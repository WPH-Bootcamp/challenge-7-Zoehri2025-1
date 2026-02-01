"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryCard } from "@/components/CategoryCard";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useRestaurantsQuery } from "@/services/queries/useRestaurantsQuery";
import { Button } from "@/components/ui/button";
import { categories } from "@/config/categories";

// Hero background image from Figma (design node 37415-7437)
const heroBackgroundImage =
  "https://www.figma.com/api/mcp/asset/9855b6b9-ebc9-4618-82db-b4f0cba1a1fe";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: restaurantsData, isLoading } = useRestaurantsQuery();

  const restaurants = Array.isArray(restaurantsData) ? restaurantsData : [];
  const filteredRestaurants = restaurants.filter((restaurant) =>
    searchQuery
      ? restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  // Show limited restaurants initially (9 as per design)
  const [showAll, setShowAll] = useState(false);
  const displayedRestaurants = showAll
    ? filteredRestaurants
    : filteredRestaurants.slice(0, 9);

  return (
    <div className="min-h-dvh bg-white flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section - Mobile first (Figma 37421-12498) */}
      <section className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[500px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroBackgroundImage}
            alt="Food background"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-8">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-display font-extrabold text-white mb-2 sm:mb-4 lg:mb-6 leading-tight px-2">
            Explore Culinary Experiences
          </h1>
          <p className="text-sm sm:text-base lg:text-lg font-body font-medium text-white/90 mb-4 sm:mb-6 lg:mb-10 max-w-2xl px-1">
            Search and refine your choice to discover the perfect restaurant.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl px-0">
            <div className="relative">
              <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400 sm:w-5 sm:h-5"
                >
                  <path
                    d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 19L14.65 14.65"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search restaurants, food and drink"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 sm:h-12 lg:h-14 pl-10 sm:pl-12 lg:pl-14 pr-4 rounded-lg sm:rounded-xl lg:rounded-2xl bg-white text-[#0a0d12] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c12116] text-sm lg:text-base"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Section - Mobile: 3 cols, scroll on small */}
      <section id="categories" className="py-4 sm:py-6 lg:py-8 bg-white scroll-mt-20">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                icon={category.icon}
                label={category.name}
                href={`/category/${category.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Restaurants Section - Mobile: 1 col */}
      <section id="recommended" className="py-6 sm:py-8 lg:py-12 bg-white flex-1 pb-safe scroll-mt-20">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-extrabold text-[#0a0d12]">
              Recommended
            </h2>
            <button className="text-xs sm:text-sm lg:text-base font-bold text-[#c12116] hover:underline min-h-[44px] min-w-[44px] flex items-center justify-end">
              See All
            </button>
          </div>

          {/* Restaurants Grid - 1 col mobile, 2 tablet, 3 desktop */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 sm:h-24 lg:h-32 bg-gray-200 animate-pulse rounded-xl sm:rounded-2xl"
                />
              ))}
            </div>
          ) : displayedRestaurants.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {displayedRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>

              {/* Show More Button */}
              {!showAll && filteredRestaurants.length > 9 && (
                <div className="flex justify-center mt-6 sm:mt-8 lg:mt-10">
                  <Button
                    variant="outline"
                    onClick={() => setShowAll(true)}
                    className="rounded-xl lg:rounded-2xl border-gray-300 text-[#0a0d12] hover:bg-gray-50 px-6 sm:px-8 lg:px-10 h-11 sm:h-12 min-h-[44px]"
                  >
                    Show More
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 sm:py-12 lg:py-16">
              <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-500 px-4">
                No restaurants found. Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
