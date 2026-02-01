"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatCurrency";

const DELIVERY_FEE = 10000;
const SERVICE_FEE = 1000;

const PAYMENT_METHOD_NAMES: Record<string, string> = {
  bni: "BNI Bank Negara Indonesia",
  bri: "BRI Bank Rakyat Indonesia",
  bca: "BCA Bank Central Asia",
  mandiri: "Mandiri",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const total = parseInt(searchParams?.get("total") ?? "0", 10);
  const itemCount = parseInt(searchParams?.get("items") ?? "0", 10);
  const methodId = searchParams?.get("method") ?? "bni";
  const subtotal = parseInt(searchParams?.get("subtotal") ?? String(total - DELIVERY_FEE - SERVICE_FEE), 10);
  const paymentMethodName = PAYMENT_METHOD_NAMES[methodId] ?? "Bank Transfer";

  return (
    <div className="min-h-dvh bg-white sm:bg-gray-100 flex flex-col items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
      {/* Logo - mobile: white bg (Figma 37421-11466) */}
      <div className="mb-4 sm:mb-8">
        <Logo />
      </div>

      {/* Payment Success Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-8">
          {/* Success icon */}
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="h-14 w-14 sm:h-20 sm:w-20 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 sm:w-10 sm:h-10"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          </div>

          <h1 className="font-display font-extrabold text-[#0a0d12] text-lg sm:text-2xl text-center mb-1 sm:mb-2">
            Payment Success
          </h1>
          <p className="text-[#717680] text-xs sm:text-base text-center mb-4 sm:mb-6">
            Your payment has been successfully processed.
          </p>

          {/* Dashed separator - perforated ticket style (Figma 37421-11466) */}
          <div className="border-t border-dashed border-gray-300 mb-4 sm:mb-6" />

          {/* Transaction Details */}
          <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between text-[#0a0d12] sm:text-[#535862]">
              <span>Date</span>
              <span>{formatDate(new Date())}</span>
            </div>
            <div className="flex justify-between text-[#0a0d12] sm:text-[#535862]">
              <span>Payment Method</span>
              <span className="text-right max-w-[60%]">{paymentMethodName}</span>
            </div>
            <div className="flex justify-between text-[#0a0d12] sm:text-[#535862]">
              <span>Price ({itemCount} items)</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#0a0d12] sm:text-[#535862]">
              <span>Delivery Fee</span>
              <span>{formatCurrency(DELIVERY_FEE)}</span>
            </div>
            <div className="flex justify-between text-[#0a0d12] sm:text-[#535862]">
              <span>Service Fee</span>
              <span>{formatCurrency(SERVICE_FEE)}</span>
            </div>

            {/* Dashed separator before Total */}
            <div className="border-t border-dashed border-gray-300 pt-2.5 sm:pt-3 mt-2.5 sm:mt-3" />

            <div className="flex justify-between font-bold text-[#0a0d12] pt-0">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <Button
            onClick={() => router.push("/orders")}
            className="w-full h-11 sm:h-12 mt-5 sm:mt-8 rounded-2xl sm:rounded-xl font-bold text-sm sm:text-base"
          >
            See My Orders
          </Button>
        </div>
      </div>
    </div>
  );
}
