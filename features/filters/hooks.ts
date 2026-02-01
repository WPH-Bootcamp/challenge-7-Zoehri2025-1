import { useAppDispatch, useAppSelector } from "../cart/hooks";
import {
  setCategory,
  setDistance,
  setPriceRange,
  setMinRating,
  setSortBy,
  resetFilters,
} from "./filtersSlice";

export const useFilters = () => {
  const filters = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  return {
    filters,
    setCategory: (category: string | null) => dispatch(setCategory(category)),
    setDistance: (distance: "nearby" | "1km" | "3km" | "5km" | null) =>
      dispatch(setDistance(distance)),
    setPriceRange: (min: number | null, max: number | null) =>
      dispatch(setPriceRange({ min, max })),
    setMinRating: (rating: number | null) => dispatch(setMinRating(rating)),
    setSortBy: (
      sortBy: "price-asc" | "price-desc" | "rating-desc" | "name-asc" | null
    ) => dispatch(setSortBy(sortBy)),
    resetFilters: () => dispatch(resetFilters()),
  };
};
