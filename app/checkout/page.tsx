"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/features/cart/hooks";
import { formatCurrency } from "@/lib/formatCurrency";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types";

const DELIVERY_FEE = 10000;
const SERVICE_FEE = 1000;

const PAYMENT_METHODS = [
  { id: "bni", name: "BNI Bank Negara Indonesia", color: "#005398" },
  { id: "bri", name: "BRI Bank Rakyat Indonesia", color: "#003366" },
  { id: "bca", name: "BCA Bank Central Asia", color: "#0066b3" },
  { id: "mandiri", name: "Mandiri", color: "#c12116" },
] as const;

function groupByRestaurant(items: CartItem[]) {
  const groups = new Map<
    string,
    { restaurantName: string; restaurantId?: string; items: CartItem[] }
  >();

  for (const item of items) {
    const key = item.restaurantId ?? "unknown";
    const name = item.restaurantName ?? "Restaurant";

    if (!groups.has(key)) {
      groups.set(key, {
        restaurantName: name,
        restaurantId: item.restaurantId,
        items: [],
      });
    }
    groups.get(key)!.items.push(item);
  }

  return Array.from(groups.values());
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, changeQuantity, totalPrice, clear } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<string>("bni");
  const [deliveryName, setDeliveryName] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const groups = groupByRestaurant(items);
  const subtotal = totalPrice;
  const total = subtotal + DELIVERY_FEE + SERVICE_FEE;

  const handleBuy = () => {
    if (items.length === 0) return;
    if (!deliveryName.trim() || !deliveryPhone.trim() || !deliveryAddress.trim()) {
      setIsEditingAddress(true);
      return;
    }
    setIsSubmitting(true);
    const itemCount = items.reduce((s, i) => s + i.quantity, 0);
    const params = new URLSearchParams({
      total: String(total),
      subtotal: String(subtotal),
      items: String(itemCount),
      method: paymentMethod,
    });
    clear();
    router.push(`/checkout/success?${params.toString()}`);
  };

  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-dvh bg-white flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 bg-gray-100 md:bg-white">
          <h1 className="text-xl sm:text-2xl font-display font-bold text-[#0a0d12] mb-2">
            Checkout
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Your cart is empty. Add items to checkout.
          </p>
          <Button onClick={() => router.push("/")}>Browse Restaurants</Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-white flex flex-col">
      <Header />

      <main className="flex-1 py-4 sm:py-8 lg:py-12 bg-gray-100">
        <div className="w-full mx-auto px-3 sm:px-6 lg:px-8 max-w-6xl">
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-display font-extrabold text-[#0a0d12] text-center sm:text-left mb-4 sm:mb-8">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column - 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Delivery Address Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-6">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c12116"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <h2 className="font-display font-bold text-[#0a0d12] text-base sm:text-lg">
                    Delivery Address
                  </h2>
                </div>

                {isEditingAddress ? (
                  <div className="space-y-2 sm:space-y-3">
                    <Input
                      placeholder="Nama lengkap"
                      value={deliveryName}
                      onChange={(e) => setDeliveryName(e.target.value)}
                      className="h-10 sm:h-11"
                    />
                    <Input
                      type="tel"
                      placeholder="No. HP (0812-3456-7890)"
                      value={deliveryPhone}
                      onChange={(e) => setDeliveryPhone(e.target.value)}
                      className="h-10 sm:h-11"
                    />
                    <Input
                      placeholder="Alamat lengkap (Jl. Sudirman No. 25, Jakarta Pusat, 10220)"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="h-10 sm:h-11"
                    />
                  </div>
                ) : (
                  <div>
                    <p className="text-[#0a0d12] font-medium mb-1">{deliveryName}</p>
                    <p className="text-[#535862] text-sm mb-1">{deliveryPhone}</p>
                    <p className="text-[#535862] text-sm">{deliveryAddress}</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (isEditingAddress) {
                      if (
                        deliveryName.trim() &&
                        deliveryPhone.trim() &&
                        deliveryAddress.trim()
                      ) {
                        setIsEditingAddress(false);
                      }
                    } else {
                      setIsEditingAddress(true);
                    }
                  }}
                  className="mt-3 sm:mt-4 h-9 sm:h-10 px-4 rounded-lg border border-gray-200 text-[#0a0d12] font-medium hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                >
                  {isEditingAddress ? "Simpan" : "Change"}
                </button>
              </div>

              {/* Order Items Card */}
              {groups.map((group) => (
                <div
                  key={group.restaurantId ?? "unknown"}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="flex items-center justify-between p-3 sm:p-5 border-b border-gray-100">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-[#FF6B35] flex items-center justify-center shrink-0">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                        >
                          <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z" />
                          <path d="M6 1v3M10 1v3M14 1v3" />
                        </svg>
                      </div>
                      <span className="font-display font-bold text-[#0a0d12] text-sm sm:text-base">
                        {group.restaurantName}
                      </span>
                    </div>
                    <Link
                      href={
                        group.restaurantId
                          ? `/restaurant/${group.restaurantId}`
                          : "/"
                      }
                      className="h-8 sm:h-9 px-3 sm:px-4 rounded-lg border border-gray-200 text-[#0a0d12] font-medium hover:bg-gray-50 transition-colors text-xs sm:text-sm flex items-center"
                    >
                      Add item
                    </Link>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2.5 sm:gap-4 p-3 sm:p-5"
                      >
                        <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
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
                              </svg>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-bold text-[#0a0d12] text-xs sm:text-base truncate">
                            {item.menuItem.name}
                          </h3>
                          <p className="font-bold text-[#0a0d12] text-xs sm:text-base mt-0.5">
                            {formatCurrency(item.menuItem.price)}
                          </p>
                        </div>

                        {/* Mobile: circular buttons (Figma 37421-11177); Desktop: rectangular */}
                        <div className="flex items-center gap-1 sm:gap-0 rounded-full sm:rounded-lg border border-gray-200 overflow-hidden shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              changeQuantity(item.id, item.quantity - 1)
                            }
                            className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-full sm:rounded-none bg-gray-200 sm:bg-transparent text-[#0a0d12] font-bold hover:bg-gray-300 sm:hover:bg-gray-50"
                          >
                            −
                          </button>
                          <span className="h-8 w-6 sm:h-9 sm:w-8 flex items-center justify-center font-bold text-xs sm:text-sm text-[#0a0d12] sm:border-x sm:border-gray-200">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              changeQuantity(item.id, item.quantity + 1)
                            }
                            className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-full sm:rounded-none bg-[#c12116] text-white font-bold hover:bg-[#a01a12]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Payment & Summary */}
            <div className="space-y-4 sm:space-y-6">
              {/* Payment Method Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-6">
                <h2 className="font-display font-bold text-[#0a0d12] text-sm sm:text-lg mb-3 sm:mb-4">
                  Payment Method
                </h2>
                <div className="space-y-1.5 sm:space-y-2">
                  {PAYMENT_METHODS.map((bank) => (
                    <label
                      key={bank.id}
                      className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg border border-gray-100 hover:bg-gray-50/50 cursor-pointer has-checked:border-[#c12116] has-checked:bg-red-50/30 transition-colors"
                    >
                      <div
                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center text-white font-bold text-[10px] sm:text-xs shrink-0"
                        style={{ backgroundColor: bank.color }}
                      >
                        {bank.name.split(" ")[0].slice(0, 2)}
                      </div>
                      <span className="flex-1 text-xs sm:text-sm font-medium text-[#0a0d12]">
                        {bank.name}
                      </span>
                      <input
                        type="radio"
                        name="payment"
                        value={bank.id}
                        checked={paymentMethod === bank.id}
                        onChange={() => setPaymentMethod(bank.id)}
                        className="w-4 h-4 rounded-full border-2 border-gray-300 text-[#c12116] focus:ring-[#c12116] accent-[#c12116]"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Summary Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-6">
                <h2 className="font-display font-bold text-[#0a0d12] text-sm sm:text-lg mb-3 sm:mb-4">
                  Payment Summary
                </h2>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-[#535862]">
                    <span>Price ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#535862]">
                    <span>Delivery Fee</span>
                    <span>{formatCurrency(DELIVERY_FEE)}</span>
                  </div>
                  <div className="flex justify-between text-[#535862]">
                    <span>Service Fee</span>
                    <span>{formatCurrency(SERVICE_FEE)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#0a0d12] pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
                <Button
                  onClick={handleBuy}
                  className="w-full h-11 sm:h-12 mt-4 sm:mt-6 rounded-2xl sm:rounded-xl font-bold text-sm sm:text-base"
                >
                  Buy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
