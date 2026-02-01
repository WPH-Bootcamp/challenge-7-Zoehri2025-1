import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/axios";
import { MenuItem } from "@/types";

/**
 * React Query hook for fetching menu items
 * Handles server state: fetching, caching, and error handling
 */
export const useMenusQuery = () => {
  return useQuery({
    queryKey: ["menus"],
    queryFn: async (): Promise<MenuItem[]> => {
      const response = await apiClient.get("/menus"); // Adjust endpoint based on actual API
      return response.data;
    },
  });
};
