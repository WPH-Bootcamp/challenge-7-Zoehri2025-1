import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/axios";
import { env } from "@/config/env";
import { Restaurant } from "@/types";

function mapItemToRestaurant(item: Record<string, unknown>): Restaurant {
  const images = item.images
    ? (Array.isArray(item.images) ? item.images : []).map(String)
    : item.image
      ? [String(item.image)]
      : undefined;

  return {
    id: String(item.id ?? item._id ?? item.resto_id ?? ""),
    name: String(item.name ?? item.resto_name ?? item.restaurant_name ?? ""),
    rating:
      typeof item.rating === "number"
        ? item.rating
        : item.rating != null
          ? Number(item.rating)
          : undefined,
    location:
      item.location != null
        ? String(item.location)
        : item.address != null
          ? String(item.address)
          : undefined,
    distance: item.distance != null ? String(item.distance) : undefined,
    image: item.image != null ? String(item.image) : undefined,
    logo:
      item.logo != null ? String(item.logo) : item.image != null ? String(item.image) : undefined,
    images,
    reviewCount:
      typeof item.review_count === "number"
        ? item.review_count
        : item.reviewCount != null
          ? Number(item.reviewCount)
          : item.ulasan != null
            ? Number(item.ulasan)
            : undefined,
  };
}

export function useRestaurantDetailQuery(id: string | null) {
  return useQuery<Restaurant | null>({
    queryKey: ["restaurant", id],
    queryFn: async (): Promise<Restaurant | null> => {
      if (!id) return null;
      const baseUrl = env.apiBaseUrl.replace(/\/$/, "");
      const url = `${baseUrl}/api/resto/${id}`;
      try {
        const response = await apiClient.get(url);
        const raw = response.data?.data ?? response.data;
        if (!raw) return null;
        const item = typeof raw === "object" ? raw : { id, ...raw };
        return mapItemToRestaurant(item as Record<string, unknown>);
      } catch {
        return null;
      }
    },
    enabled: !!id,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
}
