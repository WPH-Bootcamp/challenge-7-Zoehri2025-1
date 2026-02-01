import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState } from "@/types";

const initialState: FilterState = {
  category: null,
  minPrice: null,
  maxPrice: null,
  minRating: null,
  sortBy: null,
  searchQuery: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
    setPriceRange: (
      state,
      action: PayloadAction<{ min: number | null; max: number | null }>
    ) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    setMinRating: (state, action: PayloadAction<number | null>) => {
      state.minRating = action.payload;
    },
    setSortBy: (
      state,
      action: PayloadAction<
        "price-asc" | "price-desc" | "rating-desc" | "name-asc" | null
      >
    ) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    resetFilters: (state) => {
      state.category = null;
      state.minPrice = null;
      state.maxPrice = null;
      state.minRating = null;
      state.sortBy = null;
      state.searchQuery = "";
    },
  },
});

export const {
  setCategory,
  setPriceRange,
  setMinRating,
  setSortBy,
  setSearchQuery,
  resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
