import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
}

export function CategoryCard({
  icon,
  label,
  isActive = false,
  href,
  onClick,
}: CategoryCardProps) {
  const className = cn(
    "flex flex-col items-center justify-center gap-1.5 sm:gap-2 lg:gap-3 p-2.5 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl lg:rounded-2xl transition-all active:scale-[0.98] sm:hover:scale-105 min-h-[72px] sm:min-h-[80px] touch-manipulation",
    isActive
      ? "bg-[#c12116] text-white shadow-sm"
      : "bg-white text-[#0a0d12] hover:bg-gray-50 border border-gray-100"
  );

  if (href) {
    return (
      <Link href={href} className={className}>
      <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 shrink-0 [&>svg]:w-6 [&>svg]:h-6 sm:[&>svg]:w-8 sm:[&>svg]:h-8 lg:[&>svg]:w-10 lg:[&>svg]:h-10">
        {icon}
      </div>
      <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-center leading-tight line-clamp-2 px-0.5">
        {label}
      </span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} type="button" className={className}>
      <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 shrink-0 [&>svg]:w-6 [&>svg]:h-6 sm:[&>svg]:w-8 sm:[&>svg]:h-8 lg:[&>svg]:w-10 lg:[&>svg]:h-10">
        {icon}
      </div>
      <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-center leading-tight line-clamp-2 px-0.5">
        {label}
      </span>
    </button>
  );
}
