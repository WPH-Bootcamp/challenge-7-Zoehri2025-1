"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useRestaurantDetailQuery } from "@/services/queries/useRestaurantDetailQuery";
import { useRestaurantMenusQuery } from "@/services/queries/useRestaurantMenusQuery";
import { useRestaurantsQuery } from "@/services/queries/useRestaurantsQuery";
import { useCart } from "@/features/cart/hooks";
import { formatCurrency } from "@/lib/formatCurrency";
import { Button } from "@/components/ui/button";
import { MenuItem, Review } from "@/types";

// Placeholder images for gallery when API has none
const DEFAULT_GALLERY = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80",
  "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80",
];

// Mock reviews for demo (API may not have review endpoint)
const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    userName: "Michael Brown",
    rating: 5,
    comment:
      "Amazing food and great service! The burger was perfectly cooked and the fries were crispy. Will definitely come back.",
    date: "25 August 2025, 13:38",
  },
  {
    id: "2",
    userName: "Sarah Davis",
    rating: 5,
    comment:
      "Best burger in town. The quality of ingredients really shows. Staff was very friendly and attentive.",
    date: "24 August 2025, 10:22",
  },
  {
    id: "3",
    userName: "David Wilson",
    rating: 5,
    comment:
      "Excellent experience from start to finish. Food arrived hot and the portion sizes were generous.",
    date: "23 August 2025, 19:15",
  },
  {
    id: "4",
    userName: "Emily Johnson",
    rating: 5,
    comment:
      "Love the ambiance and the food. Perfect for a casual dinner with friends. Highly recommend!",
    date: "22 August 2025, 12:45",
  },
];

function MenuItemCard({
  item,
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
}: {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square relative bg-gray-100">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-2 sm:p-4">
        <h3 className="font-display font-bold text-[#0a0d12] text-xs sm:text-base mb-0.5 sm:mb-1 truncate">
          {item.name}
        </h3>
        <p className="text-[#c12116] font-bold text-xs sm:text-base mb-2 sm:mb-3">
          {formatCurrency(item.price)}
        </p>
        {quantity === 0 ? (
          <Button
            size="sm"
            onClick={onAdd}
            className="w-full h-8 sm:h-10 rounded-lg font-bold text-xs sm:text-sm"
          >
            Add
          </Button>
        ) : (
          <div className="flex items-center justify-between gap-1 sm:gap-2 h-8 sm:h-10 rounded-lg border border-gray-200 overflow-hidden">
            <button
              type="button"
              onClick={onDecrement}
              className="flex-1 h-full flex items-center justify-center text-[#0a0d12] font-bold hover:bg-gray-50 transition-colors min-w-[44px]"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="font-bold text-sm text-[#0a0d12] min-w-[24px] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={onIncrement}
              className="flex-1 h-full flex items-center justify-center bg-[#c12116] text-white font-bold hover:bg-[#a01a12] transition-colors min-w-[44px]"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[#FF6B35] flex items-center justify-center shrink-0 text-white font-bold">
          {review.userName.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-[#0a0d12] text-sm sm:text-base">
            {review.userName}
          </p>
          <p className="text-xs text-gray-500 mb-1">{review.date}</p>
          <div className="flex gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill={i < review.rating ? "#FFD700" : "#e5e7eb"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L8.5716 4.83688L14 5.61143L10.5 9.16312L11.4164 14L7 11.3369L2.58359 14L3.5 9.16312L0 5.61143L5.4284 4.83688L7 0Z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-[#535862] leading-relaxed">{review.comment}</p>
        </div>
      </div>
    </div>
  );
}

export default function RestaurantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : null;

  const { data: detailRestaurant, isLoading: loadingRestaurant } =
    useRestaurantDetailQuery(id);
  const { data: restaurantsList = [] } = useRestaurantsQuery();
  const { data: menus = [], isLoading: loadingMenus } =
    useRestaurantMenusQuery(id);

  // Fallback: use restaurant from list if detail API fails
  const restaurant =
    detailRestaurant ??
    restaurantsList.find((r) => r.id === id) ??
    null;
  const { items: cartItems, totalItems, totalPrice, addToCart, changeQuantity } =
    useCart();

  const [menuTab, setMenuTab] = useState<"all" | "food" | "drink">("all");
  const [menuShowMore, setMenuShowMore] = useState(false);
  const [reviewShowMore, setReviewShowMore] = useState(false);

  // Fallback menu items when API returns empty (for demo)
  const defaultMenus: MenuItem[] = [
    { id: "1", name: "Classic Burger", price: 45000, category: "food", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
    { id: "2", name: "Spaghetti Bolognese", price: 55000, category: "food", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&q=80" },
    { id: "3", name: "French Fries", price: 25000, category: "food", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80" },
    { id: "4", name: "Pepperoni Pizza", price: 75000, category: "food", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80" },
    { id: "5", name: "Fried Chicken Burger", price: 42000, category: "food", image: "https://images.unsplash.com/photo-1569042503923-4128566c6dce?w=400&q=80" },
    { id: "6", name: "Cola", price: 15000, category: "drink", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&q=80" },
    { id: "7", name: "Ice Cream", price: 20000, category: "food", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80" },
    { id: "8", name: "Hot Dog", price: 35000, category: "food", image: "https://images.unsplash.com/photo-1612392062797-2d4bb419ada8?w=400&q=80" },
  ];
  const displayMenus = menus.length > 0 ? menus : defaultMenus;

  const filteredMenus = displayMenus.filter((m) => {
    if (menuTab === "all") return true;
    const cat = (m.category || "").toLowerCase();
    if (menuTab === "food") return cat !== "drink" && cat !== "beverage";
    return cat === "drink" || cat === "beverage";
  });

  const displayedMenus = menuShowMore ? filteredMenus : filteredMenus.slice(0, 9);
  const displayedReviews = reviewShowMore ? MOCK_REVIEWS : MOCK_REVIEWS.slice(0, 4);
  const reviewCount = restaurant?.reviewCount ?? 24;

  const getQuantity = (itemId: string) => {
    const cartItem = cartItems.find((c) => c.menuItem.id === itemId);
    return cartItem?.quantity ?? 0;
  };

  const galleryImages =
    restaurant?.images?.length
      ? restaurant.images
      : restaurant?.image
        ? [restaurant.image, ...DEFAULT_GALLERY.slice(1)]
        : DEFAULT_GALLERY;

  if (!id) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Invalid restaurant</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className={`min-h-dvh bg-white flex flex-col ${totalItems > 0 ? "pb-20 sm:pb-24" : ""}`}
    >
      <Header />

      {loadingRestaurant ? (
        <main className="flex-1 py-8">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="h-[280px] sm:h-[360px] bg-gray-200 animate-pulse rounded-2xl mb-6" />
            <div className="h-24 bg-gray-100 animate-pulse rounded-xl mb-8" />
          </div>
        </main>
      ) : !restaurant ? (
        <main className="flex-1 flex flex-col items-center justify-center py-16">
          <p className="text-gray-500 mb-4">Restaurant not found</p>
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </main>
      ) : (
        <main className="flex-1">
          {/* Hero - Image Gallery (Figma 37421-8388 mobile: full-width; desktop: gallery) */}
          <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-2 sm:pt-6">
            {/* Desktop: Back link above image */}
            <button
              type="button"
              onClick={() => router.push("/")}
              className="hidden md:flex items-center gap-2 text-[#0a0d12] font-medium mb-4 hover:underline"
              aria-label="Back to home"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
              <div className="relative lg:col-span-2 rounded-none sm:rounded-xl lg:rounded-2xl overflow-hidden aspect-4/3 lg:aspect-auto lg:min-h-[320px] bg-gray-200 -mx-4 sm:mx-0">
                <img
                  src={galleryImages[0]}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                {/* Mobile: Back button overlay on image */}
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="md:hidden absolute left-3 top-3 z-10 flex items-center justify-center h-10 w-10 rounded-full bg-black/40 text-white backdrop-blur-sm min-h-[44px] min-w-[44px]"
                  aria-label="Back to home"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
              <div className="hidden lg:flex flex-col gap-2 sm:gap-3">
                {galleryImages.slice(1, 3).map((src, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-xl overflow-hidden bg-gray-200 min-h-0"
                  >
                    <img
                      src={src}
                      alt={`${restaurant.name} ${i + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Restaurant Info - mobile: card-style compact */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mt-3 sm:mt-6">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-[#FF6B35] flex items-center justify-center overflow-hidden shrink-0">
                {restaurant.logo ? (
                  <img
                    src={restaurant.logo}
                    alt={restaurant.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-white text-xl font-bold">
                    {restaurant.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-[#0a0d12]">
                  {restaurant.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                  {restaurant.rating != null && (
                    <div className="flex items-center gap-1">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 14 14"
                        fill="#FFD700"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L8.5716 4.83688L14 5.61143L10.5 9.16312L11.4164 14L7 11.3369L2.58359 14L3.5 9.16312L0 5.61143L5.4284 4.83688L7 0Z" />
                      </svg>
                      <span className="font-bold text-[#0a0d12]">
                        {restaurant.rating}
                      </span>
                      <span className="text-sm text-[#535862]">
                        ({reviewCount} Ulasan)
                      </span>
                    </div>
                  )}
                  {(restaurant.location || restaurant.distance) && (
                    <span className="text-sm text-[#535862]">
                      {[restaurant.location, restaurant.distance]
                        .filter(Boolean)
                        .join(" • ")}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-200 text-[#0a0d12] font-medium hover:bg-gray-50 transition-colors self-start sm:self-center"
                aria-label="Share"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                Share
              </button>
            </div>
          </section>

          {/* Menu Section - mobile: 2-col grid (Figma 37421-8388) */}
          <section className="py-4 sm:py-8 lg:py-12">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <h2 className="text-base sm:text-xl md:text-2xl font-display font-extrabold text-[#0a0d12] mb-3 sm:mb-6">
                Menu
              </h2>

              {/* Tabs */}
              <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
                {(["all", "food", "drink"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setMenuTab(tab)}
                    className={`shrink-0 px-3 sm:px-6 h-9 sm:h-11 rounded-lg font-bold text-xs sm:text-sm transition-colors ${
                      menuTab === tab
                        ? "bg-[#c12116] text-white"
                        : "bg-white border border-gray-200 text-[#0a0d12] hover:bg-gray-50"
                    }`}
                  >
                    {tab === "all" ? "All Menu" : tab === "food" ? "Food" : "Drink"}
                  </button>
                ))}
              </div>

              {loadingMenus ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gray-200 animate-pulse rounded-xl"
                    />
                  ))}
                </div>
              ) : displayedMenus.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                    {displayedMenus.map((item: MenuItem) => {
                      const qty = getQuantity(item.id);
                      const cartItem = cartItems.find(
                        (c) => c.menuItem.id === item.id
                      );
                      return (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          quantity={qty}
                          onAdd={() => addToCart({ menuItem: item, restaurantId: restaurant.id, restaurantName: restaurant.name })}
                          onIncrement={() =>
                            cartItem &&
                            changeQuantity(cartItem.id, cartItem.quantity + 1)
                          }
                          onDecrement={() =>
                            cartItem &&
                            changeQuantity(cartItem.id, cartItem.quantity - 1)
                          }
                        />
                      );
                    })}
                  </div>
                  {!menuShowMore && filteredMenus.length > 9 && (
                    <div className="flex justify-center mt-6 sm:mt-8">
                      <Button
                        variant="outline"
                        onClick={() => setMenuShowMore(true)}
                        className="rounded-xl border-[#c12116] text-[#c12116] hover:bg-red-50 md:border-gray-300 md:text-[#0a0d12] md:hover:bg-gray-50"
                      >
                        Show More
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500 py-8">
                  No menu items available for this restaurant.
                </p>
              )}
            </div>
          </section>

          {/* Review Section */}
          <section className="py-4 sm:py-8 lg:py-12 bg-gray-50/50">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <h2 className="text-lg sm:text-xl md:text-2xl font-display font-extrabold text-[#0a0d12] mb-2">
                Review
              </h2>
              <p className="text-sm text-[#535862] mb-4 sm:mb-6">
                {restaurant.rating ?? "4.9"} ({reviewCount} Ulasan)
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                {displayedReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>

              {!reviewShowMore && MOCK_REVIEWS.length > 4 && (
                <div className="flex justify-center mt-6 sm:mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setReviewShowMore(true)}
                    className="rounded-xl border-gray-300 text-[#0a0d12] hover:bg-gray-50"
                  >
                    Show More
                  </Button>
                </div>
              )}
            </div>
          </section>
        </main>
      )}

      {/* Checkout Summary Bar - mobile: red bar (Figma 37421-8388); desktop: white */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:bg-white md:border-t md:border-gray-200 md:shadow-[0_-4px_12px_rgba(0,0,0,0.08)] bg-[#c12116] safe-area-inset-bottom">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-3 sm:py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white md:text-[#0a0d12]"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <span className="absolute -top-1.5 -right-1.5 h-4 min-w-[16px] px-1 flex items-center justify-center rounded-full bg-white text-[#c12116] md:bg-[#c12116] md:text-white text-xs font-bold">
                    {totalItems}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-white md:text-[#0a0d12] text-base sm:text-lg">
                    {totalItems} Item{totalItems !== 1 ? "s" : ""}
                  </p>
                  <p className="text-white/90 md:text-[#c12116] font-bold text-sm sm:text-base">
                    {formatCurrency(totalPrice)}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => router.push("/checkout")}
                className="shrink-0 h-11 sm:h-12 px-6 sm:px-8 rounded-xl font-bold text-sm sm:text-base bg-white text-[#c12116] hover:bg-gray-100 md:bg-[#c12116] md:text-white md:hover:bg-[#a01a12]"
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
