import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/axios";
import { env } from "@/config/env";
import { MenuItem } from "@/types";

function mapToMenuItem(item: Record<string, unknown>): MenuItem {
  return {
    id: String(item.id ?? item._id ?? item.menu_id ?? ""),
    name: String(item.name ?? item.menu_name ?? item.title ?? "Food Name"),
    description: item.description != null ? String(item.description) : undefined,
    price: typeof item.price === "number" ? item.price : Number(item.price ?? 50000),
    category: String(item.category ?? item.type ?? "food"),
    rating: item.rating != null ? Number(item.rating) : undefined,
    image: item.image != null ? String(item.image) : undefined,
  };
}

function normalizeMenus(raw: unknown): MenuItem[] {
  if (Array.isArray(raw)) {
    return raw.map((item: Record<string, unknown>) => mapToMenuItem(item));
  }
  if (raw && typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    if ("data" in obj) {
      const inner = obj.data;
      if (Array.isArray(inner)) return inner.map((item: Record<string, unknown>) => mapToMenuItem(item));
      if (inner && typeof inner === "object") {
        const innerObj = inner as Record<string, unknown>;
        if (Array.isArray(innerObj.items)) return innerObj.items.map((item: Record<string, unknown>) => mapToMenuItem(item));
        if (Array.isArray(innerObj.menus)) return innerObj.menus.map((item: Record<string, unknown>) => mapToMenuItem(item));
      }
    }
    if ("items" in obj && Array.isArray(obj.items)) return (obj.items as Record<string, unknown>[]).map(mapToMenuItem);
    if ("menus" in obj && Array.isArray(obj.menus)) return (obj.menus as Record<string, unknown>[]).map(mapToMenuItem);
  }
  return [];
}

export function useRestaurantMenusQuery(restaurantId: string | null) {
  return useQuery<MenuItem[]>({
    queryKey: ["restaurant-menus", restaurantId],
    queryFn: async (): Promise<MenuItem[]> => {
      if (!restaurantId) return [];
      const baseUrl = env.apiBaseUrl.replace(/\/$/, "");

      // Try /api/resto/:id/menu first, then /api/menu?resto_id=
      try {
        const url = `${baseUrl}/api/resto/${restaurantId}/menu`;
        const response = await apiClient.get(url);
        const raw = response.data?.data ?? response.data;
        return normalizeMenus(raw);
      } catch {
        try {
          const url = `${baseUrl}/api/menu`;
          const response = await apiClient.get(url, {
            params: { resto_id: restaurantId, restaurant_id: restaurantId },
          });
          const raw = response.data?.data ?? response.data;
          return normalizeMenus(raw);
        } catch {
          return [];
        }
      }
    },
    enabled: !!restaurantId,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
}
