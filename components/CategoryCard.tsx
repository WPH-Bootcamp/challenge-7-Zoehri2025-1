import { cn } from "@/lib/utils";

interface CategoryCardProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function CategoryCard({
  icon,
  label,
  isActive = false,
  onClick,
}: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 lg:gap-3 p-3 lg:p-4 rounded-xl lg:rounded-2xl transition-all hover:scale-105",
        isActive
          ? "bg-[#c12116] text-white"
          : "bg-white text-[#0a0d12] hover:bg-gray-50"
      )}
    >
      <div className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10">
        {icon}
      </div>
      <span className="text-xs lg:text-sm font-medium text-center leading-tight">
        {label}
      </span>
    </button>
  );
}
