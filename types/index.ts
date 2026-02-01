/**
 * TypeScript type definitions for the application
 */

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  rating?: number;
  image?: string;
  // Add other fields as needed based on API response
}

export interface Restaurant {
  id: string;
  name: string;
  rating?: number;
  location?: string;
  distance?: string;
  image?: string;
  logo?: string;
  images?: string[];
  reviewCount?: number;
  // Add other fields as needed based on API response
}

export interface Review {
  id: string;
  userName: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  // Add other fields as needed
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  restaurantId?: string;
  restaurantName?: string;
}

export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  status?: string;
}

export interface FilterState {
  category: string | null;
  distance: "nearby" | "1km" | "3km" | "5km" | null;
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  sortBy: "price-asc" | "price-desc" | "rating-desc" | "name-asc" | null;
  searchQuery?: string;
}
