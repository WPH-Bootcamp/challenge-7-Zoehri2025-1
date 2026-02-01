import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, MenuItem } from "@/types";

export interface AddItemPayload {
  menuItem: MenuItem;
  restaurantId?: string;
  restaurantName?: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<MenuItem | AddItemPayload>) => {
      const payload = action.payload;
      const menuItem = "menuItem" in payload ? payload.menuItem : payload;
      const restaurantId = "restaurantId" in payload ? payload.restaurantId : undefined;
      const restaurantName = "restaurantName" in payload ? payload.restaurantName : undefined;

      const existingItem = state.items.find(
        (item) =>
          item.menuItem.id === menuItem.id &&
          item.restaurantId === restaurantId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: `${menuItem.id}-${Date.now()}`,
          menuItem,
          quantity: 1,
          restaurantId,
          restaurantName,
        });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
