"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryCard } from "@/components/CategoryCard";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useRestaurantsQuery } from "@/services/queries/useRestaurantsQuery";
import { useAppSelector } from "@/features/cart/hooks";
import { Button } from "@/components/ui/button";

// Hero background image from Figma
const heroBackgroundImage =
  "https://www.figma.com/api/mcp/asset/9855b6b9-ebc9-4618-82db-b4f0cba1a1fe";

// Category icons - Updated to match Figma design with proper colors
const categories = [
  {
    id: "all",
    name: "All Restaurant",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Burger with yellow bun and red patty */}
        <rect x="8" y="12" width="24" height="4" rx="2" fill="#FFD700" />
        <rect x="8" y="16" width="24" height="5" rx="2.5" fill="#C12116" />
        <rect x="8" y="21" width="24" height="4" rx="2" fill="#FFD700" />
        {/* Soda cup with straw */}
        <rect x="26" y="6" width="6" height="8" rx="1" fill="#C12116" />
        <line
          x1="28"
          y1="6"
          x2="30"
          y2="6"
          stroke="#C12116"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="27"
          y1="4"
          x2="27"
          y2="8"
          stroke="#C12116"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "nearby",
    name: "Nearby",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 6C13.373 6 8 11.373 8 18C8 25 20 35 20 35C20 35 32 25 32 18C32 11.373 26.627 6 20 6Z"
          fill="#C12116"
        />
        <circle cx="20" cy="18" r="5" fill="white" />
      </svg>
    ),
  },
  {
    id: "discount",
    name: "Discount",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="20"
          y="28"
          fontSize="28"
          fontWeight="900"
          fill="#C12116"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
        >
          %
        </text>
      </svg>
    ),
  },
  {
    id: "best-seller",
    name: "Best Seller",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Trophy cup - golden */}
        <path
          d="M10 12C10 10.895 10.895 10 12 10H28C29.105 10 30 10.895 30 12V18C30 21.314 27.314 24 24 24H16C12.686 24 10 21.314 10 18V12Z"
          fill="#FFD700"
        />
        <path
          d="M15 24V30H25V24"
          stroke="#FFD700"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M17 30V33H23V30"
          stroke="#FFD700"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="15" r="2.5" fill="#FFA500" />
      </svg>
    ),
  },
  {
    id: "delivery",
    name: "Delivery",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Delivery scooter */}
        <rect x="6" y="22" width="20" height="8" rx="4" fill="#C12116" />
        <circle cx="11" cy="32" r="4" fill="#1a1a1a" />
        <circle cx="25" cy="32" r="4" fill="#1a1a1a" />
        <rect x="8" y="14" width="16" height="10" rx="2.5" fill="#C12116" />
        <rect x="10" y="16" width="12" height="6" rx="1.5" fill="#FFF" />
        <path
          d="M24 20L28 14L32 20"
          stroke="#C12116"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    id: "lunch",
    name: "Lunch",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bowl with white rim and red border */}
        <ellipse cx="20" cy="28" rx="12" ry="4" fill="#C12116" />
        <path
          d="M8 24C8 21 10.5 18 13 18H27C29.5 18 32 21 32 24V28C32 31 29.5 34 27 34H13C10.5 34 8 31 8 28V24Z"
          fill="white"
        />
        <ellipse cx="20" cy="24" rx="12" ry="3" fill="#C12116" />
      </svg>
    ),
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "all"
  );
  const { data: restaurantsData, isLoading } = useRestaurantsQuery();

  // Ensure restaurants is always an array
  const restaurants = Array.isArray(restaurantsData) ? restaurantsData : [];

  // Filter restaurants based on selected category and search query
  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (selectedCategory && selectedCategory !== "all") {
      // This would need to match with actual restaurant categories from API
      // For now, we'll just show all if category is selected
    }
    if (searchQuery) {
      return restaurant.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    }
    return true;
  });

  // Show limited restaurants initially (9 as per design)
  const [showAll, setShowAll] = useState(false);
  const displayedRestaurants = showAll
    ? filteredRestaurants
    : filteredRestaurants.slice(0, 9);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[400px] lg:h-[500px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroBackgroundImage}
            alt="Food background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl lg:text-5xl font-display font-extrabold text-white mb-4 lg:mb-6">
            Explore Culinary Experiences
          </h1>
          <p className="text-base lg:text-lg font-body font-medium text-white/90 mb-8 lg:mb-10 max-w-2xl">
            Search and refine your choice to discover the perfect restaurant.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400"
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
                className="w-full h-12 lg:h-14 pl-12 lg:pl-14 pr-4 rounded-xl lg:rounded-2xl bg-white text-[#0a0d12] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c12116] text-sm lg:text-base"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-6 lg:py-8 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                icon={category.icon}
                label={category.name}
                isActive={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Restaurants Section */}
      <section className="py-8 lg:py-12 bg-white flex-1">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <h2 className="text-2xl lg:text-3xl font-display font-extrabold text-[#0a0d12]">
              Recommended
            </h2>
            <button className="text-sm lg:text-base font-bold text-[#c12116] hover:underline">
              See All
            </button>
          </div>

          {/* Restaurants Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="h-24 lg:h-32 bg-gray-200 animate-pulse rounded-2xl"
                />
              ))}
            </div>
          ) : displayedRestaurants.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {displayedRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>

              {/* Show More Button */}
              {!showAll && filteredRestaurants.length > 9 && (
                <div className="flex justify-center mt-8 lg:mt-10">
                  <Button
                    variant="outline"
                    onClick={() => setShowAll(true)}
                    className="rounded-xl lg:rounded-2xl border-gray-300 text-[#0a0d12] hover:bg-gray-50 px-8 lg:px-10"
                  >
                    Show More
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 lg:py-16">
              <p className="text-base lg:text-lg font-medium text-gray-500">
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
