"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface UserSidebarProps {
  currentPath?: string;
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

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" />
      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" />
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

export function UserSidebar({ currentPath }: UserSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    }
  };
  const isProfile = pathname === "/profile" || currentPath === "/profile";
  const isOrders = pathname === "/orders" || currentPath === "/orders";
  const isDelivery = pathname === "/delivery-address" || currentPath === "/delivery-address";

  const menuItems = [
    { href: "/profile", label: "Profile", icon: UserIcon, isActive: isProfile },
    { href: "/delivery-address", label: "Delivery Address", icon: LocationIcon, isActive: isDelivery },
    { href: "/orders", label: "My Orders", icon: OrdersIcon, isActive: isOrders },
  ];

  return (
    <aside className="hidden lg:block w-64 shrink-0 bg-gray-100 border-r border-gray-200">
      <div className="sticky top-20 p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="h-16 w-16 rounded-full bg-[#FF6B35] flex items-center justify-center text-white font-bold text-xl mb-2">
            JD
          </div>
          <p className="font-display font-bold text-[#0a0d12]">John Doe</p>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors",
                item.isActive
                  ? "bg-[#c12116] text-white"
                  : "text-[#0a0d12] hover:bg-gray-200"
              )}
            >
              <item.icon className={cn("shrink-0", item.isActive ? "text-white" : "text-[#535862]")} />
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-[#0a0d12] hover:bg-gray-200 transition-colors text-left"
          >
            <LogoutIcon className="shrink-0 text-[#535862]" />
            Logout
          </button>
        </nav>
      </div>
    </aside>
  );
}
