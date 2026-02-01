const DEFAULT_API_BASE_URL = "https://restaurant-be-400174736012.asia-southeast2.run.app";

/**
 * Environment configuration
 * Access environment variables with type safety
 * Fallback to default backend so request always fires (visible in Network)
 */
export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL,
} as const;

// Optional: warn if using default (no .env.local)
if (typeof window !== "undefined" && !process.env.NEXT_PUBLIC_API_BASE_URL) {
  console.warn(
    "NEXT_PUBLIC_API_BASE_URL not set; using default API URL. Set in .env.local to override."
  );
}
