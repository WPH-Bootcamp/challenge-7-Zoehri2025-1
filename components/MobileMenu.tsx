"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const navItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/#categories", label: "Explore", icon: ExploreIcon },
  { href: "/#recommended", label: "Restaurants", icon: RestaurantIcon },
  { href: "/cart", label: "My Cart", icon: CartIcon },
];

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9.5L12 4L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21V12H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExploreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="8" r="1.5" fill="currentColor" />
    </svg>
  );
}

function RestaurantIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 21V8L13 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 21V12L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 9V9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12V12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 15V15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" />
      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function OrdersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

export function MobileMenu({ open, onClose, isLoggedIn, onLogout }: MobileMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, mounted]);

  const handleNav = (href: string) => {
    if (href.startsWith("/#")) {
      router.push(href);
      onClose();
      return;
    }
    router.push(href);
    onClose();
  };

  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Close menu"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      {/* Drawer - left side, Figma-style */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-[280px] max-w-[85vw] bg-white shadow-xl transition-transform duration-300 ease-out md:hidden",
          "flex flex-col safe-area-inset-left",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        aria-hidden={!open}
        aria-label="Mobile navigation menu"
      >
        {/* Header inside drawer: Logo + Close */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 min-h-[56px]">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-[#0a0d12] min-h-[44px] min-w-[44px]"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Nav list */}
        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === "/" && pathname === "/");
            return (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNav(item.href)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-left font-semibold transition-colors min-h-[48px]",
                  isActive
                    ? "bg-[#c12116]/10 text-[#c12116]"
                    : "text-[#0a0d12] hover:bg-gray-50 active:bg-gray-100"
                )}
              >
                <item.icon className="h-6 w-6 shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>
        {/* Auth section at bottom - User menu per Figma 37418-9713 */}
        <div className="border-t border-gray-100 px-3 py-4">
          {isLoggedIn ? (
            <>
              <button
                type="button"
                onClick={() => {
                  handleNav("/profile");
                  onClose();
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-semibold min-h-[48px]",
                  pathname === "/profile"
                    ? "bg-[#c12116]/10 text-[#c12116]"
                    : "text-[#0a0d12] hover:bg-gray-50"
                )}
              >
                <UserIcon className="h-6 w-6 shrink-0" />
                Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  handleNav("/delivery-address");
                  onClose();
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-semibold min-h-[48px]",
                  pathname === "/delivery-address"
                    ? "bg-[#c12116]/10 text-[#c12116]"
                    : "text-[#0a0d12] hover:bg-gray-50"
                )}
              >
                <LocationIcon className="h-6 w-6 shrink-0" />
                Delivery Address
              </button>
              <button
                type="button"
                onClick={() => {
                  handleNav("/orders");
                  onClose();
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-semibold min-h-[48px] mt-1",
                  pathname === "/orders"
                    ? "bg-[#c12116]/10 text-[#c12116]"
                    : "text-[#0a0d12] hover:bg-gray-50"
                )}
              >
                <OrdersIcon className="h-6 w-6 shrink-0" />
                My Orders
              </button>
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="mt-1 flex w-full items-center justify-center rounded-xl bg-gray-100 py-3 font-semibold text-[#0a0d12] hover:bg-gray-200 min-h-[48px]"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  router.push("/login");
                  onClose();
                }}
                className="flex w-full items-center justify-center rounded-xl border border-gray-200 py-3 font-bold text-[#0a0d12] hover:bg-gray-50 min-h-[48px]"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push("/register");
                  onClose();
                }}
                className="flex w-full items-center justify-center rounded-xl bg-[#c12116] py-3 font-bold text-white hover:bg-[#a01a12] min-h-[48px]"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
