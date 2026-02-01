"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/MobileMenu";
import { UserMenuDropdown } from "@/components/UserMenuDropdown";
import { useCart } from "@/features/cart/hooks";

export function Header() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      router.push("/login");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 safe-area-inset-top">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20 min-h-[56px]">
            {/* Mobile: Hamburger + Logo | Desktop: Logo only */}
            <div className="flex items-center min-w-0 flex-1 gap-2">
              {/* Hamburger - visible only on mobile (up to md) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="flex md:hidden items-center justify-center h-10 w-10 rounded-lg text-[#0a0d12] hover:bg-gray-100 active:bg-gray-200 min-h-[44px] min-w-[44px]"
                aria-label="Open menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center min-w-0 flex-1 md:flex-initial">
                <Logo />
              </div>
              {/* Mobile: Cart icon */}
              <button
                onClick={() => router.push("/cart")}
                className="relative flex md:hidden items-center justify-center h-10 w-10 rounded-lg text-[#0a0d12] hover:bg-gray-100 min-h-[44px] min-w-[44px]"
                aria-label={`Cart ${totalItems} items`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-1 flex items-center justify-center rounded-full bg-[#c12116] text-white text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Desktop nav: Cart, User icon or Sign In/Sign Up */}
            <div className="hidden md:flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0">
              <button
                onClick={() => router.push("/cart")}
                className="relative flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full text-[#0a0d12] hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px]"
                aria-label={`Cart ${totalItems} items`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-1 flex items-center justify-center rounded-full bg-[#c12116] text-white text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    ref={userButtonRef}
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 sm:gap-3 h-10 sm:h-11 lg:h-12 rounded-full pl-1 pr-2 sm:pr-3 bg-[#f5f5f5] hover:bg-gray-200 active:bg-gray-300 text-[#0a0d12] transition-colors min-h-[44px]"
                    aria-label="User menu"
                    aria-expanded={userMenuOpen}
                  >
                    <div className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 rounded-full bg-[#FF6B35] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      JD
                    </div>
                    <span className="hidden sm:inline font-display font-bold text-[#0a0d12] text-sm">John Doe</span>
                  </button>
                  <UserMenuDropdown
                    open={userMenuOpen}
                    onClose={() => setUserMenuOpen(false)}
                    anchorRef={userButtonRef}
                    onLogout={handleLogout}
                  />
                </div>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => router.push("/login")} className="h-9 sm:h-10 lg:h-12 px-3 sm:px-4 lg:px-6 rounded-lg lg:rounded-xl bg-white border border-gray-200 text-[#0a0d12] font-bold hover:bg-gray-50 text-xs sm:text-sm min-h-[44px]">
                    Sign In
                  </Button>
                  <Button size="sm" onClick={() => router.push("/register")} className="h-9 sm:h-10 lg:h-12 px-3 sm:px-4 lg:px-6 rounded-lg lg:rounded-xl bg-[#c12116] text-white font-bold hover:bg-[#a01a12] text-xs sm:text-sm min-h-[44px]">
                    Sign Up
                  </Button>
                </>
              )}
            </div>

          </div>
        </div>
      </header>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
    </>
  );
}
