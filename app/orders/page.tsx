"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UserSidebar } from "@/components/UserSidebar";
import { GiveReviewDialog } from "@/components/GiveReviewDialog";
import { formatCurrency } from "@/lib/formatCurrency";
import { Button } from "@/components/ui/button";

const ORDER_STATUSES = [
  { id: "preparing", label: "Preparing" },
  { id: "on-the-way", label: "On the Way" },
  { id: "delivered", label: "Delivered" },
  { id: "done", label: "Done" },
  { id: "canceled", label: "Canceled" },
] as const;

interface MockOrder {
  id: string;
  restaurantName: string;
  status: string;
  items: { name: string; quantity: number; price: number; image?: string }[];
  total: number;
}

const MOCK_ORDERS: MockOrder[] = [
  {
    id: "1",
    restaurantName: "Burger King",
    status: "done",
    items: [
      { name: "Classic Burger", quantity: 2, price: 50000, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80" },
    ],
    total: 100000,
  },
  {
    id: "2",
    restaurantName: "Burger King",
    status: "done",
    items: [
      { name: "Spaghetti Bolognese", quantity: 1, price: 55000, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=200&q=80" },
      { name: "French Fries", quantity: 1, price: 25000, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&q=80" },
    ],
    total: 80000,
  },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("done");
  const [reviewOrderId, setReviewOrderId] = useState<string | null>(null);

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    const matchesSearch =
      !searchQuery ||
      order.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-dvh bg-gray-100 md:bg-white flex flex-col">
      <Header />
      <div className="flex flex-1">
        <UserSidebar currentPath="/orders" />

        <main className="flex-1 py-4 px-3 sm:py-6 sm:px-6 lg:py-12 lg:px-8">
          <div className="w-full mx-auto max-w-4xl">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-display font-extrabold text-[#0a0d12] mb-3 sm:mb-6">
              My Orders
            </h1>

            {/* Search Bar - Figma 37421-11975 mobile */}
            <div className="relative mb-3 sm:mb-6">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#717680]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 sm:h-12 pl-9 sm:pl-10 pr-3 sm:pr-4 rounded-xl border border-gray-200 bg-white text-[#0a0d12] placeholder:text-[#717680] focus:outline-none focus:ring-2 focus:ring-[#c12116] focus:border-transparent text-sm"
              />
            </div>

            {/* Status Filters - mobile: horizontal scroll, Figma 37421-11975 */}
            <div className="flex overflow-x-auto gap-2 mb-4 sm:mb-6 pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0 -mx-1">
              {ORDER_STATUSES.map((status) => (
                <button
                  key={status.id}
                  type="button"
                  onClick={() => setStatusFilter(status.id)}
                  className={`shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                    statusFilter === status.id
                      ? "bg-white border border-gray-200 text-[#0a0d12] sm:bg-[#c12116] sm:border-transparent sm:text-white"
                      : "bg-white border border-gray-200 text-[#0a0d12] sm:bg-gray-100 sm:border-transparent sm:hover:bg-gray-200"
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>

            {/* Order List - mobile Figma 37421-11975 */}
            <div className="space-y-3 sm:space-y-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div className="p-3 sm:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex gap-3 flex-1">
                          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-[#8B4513] flex items-center justify-center shrink-0">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="sm:w-5 sm:h-5">
                              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                              <line x1="3" y1="6" x2="21" y2="6" />
                              <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0 space-y-3">
                            <h3 className="font-display font-bold text-[#0a0d12] text-sm sm:text-base">
                              {order.restaurantName}
                            </h3>
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex gap-3">
                                <div className="h-14 w-14 sm:h-20 sm:w-20 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
                                  {item.image ? (
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="sm:w-6 sm:h-6">
                                        <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-[#0a0d12] text-sm sm:text-base">
                                    {item.name}
                                  </p>
                                  <p className="text-[#0a0d12] sm:text-[#535862] font-semibold sm:font-normal text-xs sm:text-sm mt-0.5">
                                    {item.quantity} x {formatCurrency(item.price)}
                                  </p>
                                  <p className="font-bold text-[#0a0d12] text-sm sm:text-base mt-1">
                                    Total {formatCurrency(order.total)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Give Review - opens dialog Figma 37418-9716 */}
                        <Button
                          onClick={() => setReviewOrderId(order.id)}
                          className="w-full sm:w-auto shrink-0 h-11 min-w-0 sm:min-w-[120px] px-4 rounded-2xl sm:rounded-xl font-bold text-sm"
                        >
                          Give Review
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 sm:py-16">
                  <p className="text-[#535862] text-sm sm:text-base">
                    No orders found.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
      <GiveReviewDialog
        open={!!reviewOrderId}
        onOpenChange={(open) => !open && setReviewOrderId(null)}
        orderId={reviewOrderId ?? undefined}
        restaurantName={filteredOrders.find((o) => o.id === reviewOrderId)?.restaurantName}
      />
    </div>
  );
}
