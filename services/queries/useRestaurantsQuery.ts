import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/axios";
import { Restaurant } from "@/types";

/**
 * React Query hook for fetching restaurants
 * Handles server state: fetching, caching, and error handling
 */
export const useRestaurantsQuery = () => {
  return useQuery<Restaurant[]>({
    queryKey: ["restaurants"],
    queryFn: async (): Promise<Restaurant[]> => {
      try {
        // Try restaurants endpoint first
        const response = await apiClient.get("/restaurants");
        const data = response.data?.data || response.data || [];
        // Ensure data is an array
        return Array.isArray(data) ? data : [];
      } catch (error: any) {
        // Fallback to menus endpoint if restaurants doesn't exist
        try {
          const response = await apiClient.get("/menus");
          const data = response.data?.data || response.data || [];
          // Transform menu items to restaurants if needed
          // For now, return empty array if menus endpoint also fails
          return Array.isArray(data) ? data : [];
        } catch (fallbackError) {
          console.error("Failed to fetch restaurants:", fallbackError);
          // Return empty array on error to prevent crashes
          return [];
        }
      }
    },
    retry: 1, // Only retry once
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    initialData: [], // Ensure initial data is always an array
  });
};
