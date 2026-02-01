import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { addItem, removeItem, updateQuantity, clearCart } from "./cartSlice";
import type { AddItemPayload } from "./cartSlice";
import { MenuItem } from "@/types";

// Typed hooks for Redux
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// Cart hooks
export const useCart = () => {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const addToCart = (payload: MenuItem | AddItemPayload) => {
    dispatch(addItem(payload));
  };

  const removeFromCart = (id: string) => {
    dispatch(removeItem(id));
  };

  const changeQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const clear = () => {
    dispatch(clearCart());
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    changeQuantity,
    clear,
  };
};
