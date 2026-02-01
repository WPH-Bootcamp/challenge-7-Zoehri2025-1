"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/features/cart/hooks";
import { formatCurrency } from "@/lib/formatCurrency";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types";

function groupByRestaurant(items: CartItem[]) {
  const groups = new Map<string, { restaurantName: string; restaurantId?: string; items: CartItem[] }>();

  for (const item of items) {
    const key = item.restaurantId ?? "unknown";
    const name = item.restaurantName ?? "Restaurant";

    if (!groups.has(key)) {
      groups.set(key, { restaurantName: name, restaurantId: item.restaurantId, items: [] });
    }
    groups.get(key)!.items.push(item);
  }

  return Array.from(groups.values());
}

export default function CartPage() {
  const router = useRouter();
  const { items, changeQuantity } = useCart();
  const groups = groupByRestaurant(items);

  if (items.length === 0) {
    return (
      <div className="min-h-dvh bg-white flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 bg-gray-100 md:bg-white">
          <h1 className="text-xl sm:text-2xl font-display font-extrabold text-[#0a0d12] mb-2">
            My Cart
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Your cart is empty. Add items from a restaurant to get started.
          </p>
          <Button onClick={() => router.push("/")}>
            Browse Restaurants
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-white flex flex-col">
      <Header />

      {/* Mobile: light gray bg (Figma 37421-9342); Desktop: white */}
      <main className="flex-1 py-4 sm:py-8 lg:py-12 bg-gray-100 md:bg-white">
        <div className="w-full mx-auto px-3 sm:px-6 lg:px-8 max-w-3xl">
          {/* Page Title */}
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-display font-extrabold text-[#0a0d12] text-center mb-4 sm:mb-8">
            My Cart
          </h1>

          <div className="space-y-4 sm:space-y-6">
            {groups.map((group) => {
              const groupTotal = group.items.reduce(
                (sum, item) => sum + item.menuItem.price * item.quantity,
                0
              );

              return (
                <div
                  key={group.restaurantId ?? "unknown"}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Restaurant Header - mobile: compact */}
                  <Link
                    href={group.restaurantId ? `/restaurant/${group.restaurantId}` : "/"}
                    className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-5 border-b border-gray-100 hover:bg-gray-50/50 transition-colors active:bg-gray-50/50"
                  >
                    <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg bg-[#FF6B35] flex items-center justify-center shrink-0">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z" />
                        <path d="M6 1v3M10 1v3M14 1v3" />
                      </svg>
                    </div>
                    <span className="font-display font-bold text-[#0a0d12] text-sm sm:text-lg flex-1">
                      {group.restaurantName}
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#535862]"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>

                  {/* Food Items - mobile: compact layout */}
                  <div className="divide-y divide-gray-100">
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2.5 sm:gap-4 p-3 sm:p-5"
                      >
                        <div className="h-14 w-14 sm:h-20 sm:w-20 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
                          {item.menuItem.image ? (
                            <img
                              src={item.menuItem.image}
                              alt={item.menuItem.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              >
                                <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z" />
                                <path d="M6 1v3M10 1v3M14 1v3" />
                              </svg>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-bold text-[#0a0d12] text-xs sm:text-base truncate">
                            {item.menuItem.name}
                          </h3>
                          <p className="text-[#0a0d12] sm:text-[#c12116] font-bold text-xs sm:text-base mt-0.5">
                            {formatCurrency(item.menuItem.price)}
                          </p>
                        </div>

                        {/* Quantity Controls - mobile: circular buttons (Figma 37421-9342) */}
                        <div className="flex items-center gap-1 sm:gap-0 rounded-full sm:rounded-lg border border-gray-200 overflow-hidden shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              changeQuantity(item.id, item.quantity - 1)
                            }
                            className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full sm:rounded-none bg-gray-200 sm:bg-transparent text-[#0a0d12] font-bold hover:bg-gray-300 sm:hover:bg-gray-50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="h-8 w-6 sm:h-10 sm:w-10 flex items-center justify-center font-bold text-xs sm:text-sm text-[#0a0d12] sm:border-x sm:border-gray-200">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              changeQuantity(item.id, item.quantity + 1)
                            }
                            className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full sm:rounded-none bg-[#c12116] text-white font-bold hover:bg-[#a01a12] transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary & Checkout - mobile: full-width red button */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-5 border-t border-gray-100 bg-gray-50/50 sm:bg-gray-50/50">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-[#0a0d12] sm:text-[#717680]">Total</p>
                      <p className="font-display font-bold text-base sm:text-xl text-[#0a0d12]">
                        {formatCurrency(groupTotal)}
                      </p>
                    </div>
                    <Button
                      onClick={() => router.push("/checkout")}
                      className="w-full sm:w-auto shrink-0 h-11 sm:h-12 px-6 sm:px-8 rounded-2xl sm:rounded-xl font-bold text-sm sm:text-base"
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
