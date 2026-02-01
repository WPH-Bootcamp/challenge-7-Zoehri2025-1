import { Restaurant } from "@/types";
import { Card } from "@/components/ui/card";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card className="rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow p-4 lg:p-5">
      <div className="flex items-start gap-3 lg:gap-4">
        {/* Logo - Orange square with rounded corners as per Figma */}
        <div className="relative h-12 w-12 lg:h-16 lg:w-16 shrink-0 rounded-lg bg-[#FF6B35] flex flex-col items-center justify-center overflow-hidden">
          {restaurant.logo ? (
            <img
              src={restaurant.logo}
              alt={restaurant.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              {/* Crown icon for Burger King style */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-0.5"
              >
                <path
                  d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z"
                  fill="white"
                />
              </svg>
              <span className="text-white text-[8px] lg:text-[10px] font-bold leading-tight text-center px-1">
                {restaurant.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </span>
            </>
          )}
        </div>

        {/* Restaurant Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base lg:text-lg font-bold text-[#0a0d12] mb-1 truncate">
            {restaurant.name}
          </h3>
          {restaurant.rating && (
            <div className="flex items-center gap-1 mb-1">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-yellow-400"
              >
                <path
                  d="M7 0L8.5716 4.83688L14 5.61143L10.5 9.16312L11.4164 14L7 11.3369L2.58359 14L3.5 9.16312L0 5.61143L5.4284 4.83688L7 0Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-sm lg:text-base font-medium text-[#0a0d12]">
                {restaurant.rating}
              </span>
            </div>
          )}
          {restaurant.location && (
            <p className="text-xs lg:text-sm font-medium text-[#535862] truncate">
              {restaurant.location}
              {restaurant.distance && ` - ${restaurant.distance}`}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
