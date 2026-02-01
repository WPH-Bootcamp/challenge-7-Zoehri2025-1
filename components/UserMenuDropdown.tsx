"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface UserMenuDropdownProps {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
  onLogout: () => void;
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" />
      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function OrdersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export function UserMenuDropdown({
  open,
  onClose,
  anchorRef,
  onLogout,
}: UserMenuDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose, anchorRef]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  const menuItems = [
    { href: "/profile", label: "Profile", icon: UserIcon },
    { href: "/delivery-address", label: "Delivery Address", icon: LocationIcon },
    { href: "/orders", label: "My Orders", icon: OrdersIcon },
  ];

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-full mt-2 z-50 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2"
    >
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="font-display font-bold text-[#0a0d12] text-sm">John Doe</p>
        <p className="text-xs text-[#717680]">john@example.com</p>
      </div>
      <div className="py-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <button
              key={item.href}
              type="button"
              onClick={() => {
                router.push(item.href);
                onClose();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors",
                isActive ? "text-[#c12116] bg-red-50/50" : "text-[#0a0d12] hover:bg-gray-50"
              )}
            >
              <item.icon className={cn("shrink-0", isActive ? "text-[#c12116]" : "text-[#535862]")} />
              {item.label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#0a0d12] hover:bg-gray-50 transition-colors"
        >
          <LogoutIcon className="shrink-0 text-[#535862]" />
          Logout
        </button>
      </div>
    </div>
  );
}
