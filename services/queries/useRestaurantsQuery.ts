import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/axios";
import { env } from "@/config/env";
import { Restaurant } from "@/types";

function mapItemToRestaurant(item: Record<string, unknown>): Restaurant {
  return {
    id: String(item.id ?? item._id ?? item.resto_id ?? ""),
    name: String(item.name ?? item.resto_name ?? item.restaurant_name ?? ""),
    rating: typeof item.rating === "number" ? item.rating : item.rating != null ? Number(item.rating) : undefined,
    location: item.location != null ? String(item.location) : item.address != null ? String(item.address) : undefined,
    distance: item.distance != null ? String(item.distance) : undefined,
    image: item.image != null ? String(item.image) : undefined,
    logo: item.logo != null ? String(item.logo) : item.image != null ? String(item.image) : undefined,
  };
}

/**
 * Normalize API response to Restaurant[]
 */
function normalizeRestaurants(raw: unknown): Restaurant[] {
  if (Array.isArray(raw)) {
    return raw.map((item: Record<string, unknown>) => mapItemToRestaurant(item));
  }
  if (raw && typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    if ("data" in obj) {
      const inner = obj.data;
      if (Array.isArray(inner)) return inner.map((item: Record<string, unknown>) => mapItemToRestaurant(item));
      if (inner && typeof inner === "object") {
        const innerObj = inner as Record<string, unknown>;
        if (Array.isArray(innerObj.items)) return innerObj.items.map((item: Record<string, unknown>) => mapItemToRestaurant(item));
        if (Array.isArray(innerObj.restaurants)) return innerObj.restaurants.map((item: Record<string, unknown>) => mapItemToRestaurant(item));
      }
      return normalizeRestaurants(inner);
    }
    if ("recommended" in obj) return normalizeRestaurants(obj.recommended);
    if ("items" in obj && Array.isArray(obj.items)) return (obj.items as Record<string, unknown>[]).map(mapItemToRestaurant);
    if ("restaurants" in obj && Array.isArray(obj.restaurants)) return (obj.restaurants as Record<string, unknown>[]).map(mapItemToRestaurant);
  }
  return [];
}

/**
 * React Query hook for fetching recommended restaurants
 * Uses API endpoint: /api/resto?location=jakarta&page=1&limit=20
 */
export const useRestaurantsQuery = (options?: { location?: string; page?: number; limit?: number }) => {
  const location = options?.location ?? "jakarta";
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 20;

  return useQuery<Restaurant[]>({
    queryKey: ["restaurants", location, page, limit],
    queryFn: async (): Promise<Restaurant[]> => {
      const baseUrl = env.apiBaseUrl.replace(/\/$/, "");
      const url = `${baseUrl}/api/resto`;
      const response = await apiClient.get(url, {
        params: { location, page, limit },
      });
      const raw = response.data?.data ?? response.data;
      return normalizeRestaurants(raw);
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};
