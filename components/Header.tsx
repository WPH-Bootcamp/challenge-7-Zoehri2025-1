"use client";

import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 lg:gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/login")}
              className="h-9 lg:h-12 px-4 lg:px-6 rounded-lg lg:rounded-xl bg-white border border-gray-200 text-[#0a0d12] font-bold hover:bg-gray-50"
            >
              Sign In
            </Button>
            <Button
              size="sm"
              onClick={() => router.push("/register")}
              className="h-9 lg:h-12 px-4 lg:px-6 rounded-lg lg:rounded-xl bg-[#c12116] text-white font-bold hover:bg-[#a01a12]"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
