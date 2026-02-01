import { useAppDispatch, useAppSelector } from "../cart/hooks";
import {
  setCategory,
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
    setPriceRange: (min: number | null, max: number | null) =>
      dispatch(setPriceRange({ min, max })),
    setMinRating: (rating: number | null) => dispatch(setMinRating(rating)),
    setSortBy: (
      sortBy: "price-asc" | "price-desc" | "rating-desc" | "name-asc" | null
    ) => dispatch(setSortBy(sortBy)),
    resetFilters: () => dispatch(resetFilters()),
  };
};
