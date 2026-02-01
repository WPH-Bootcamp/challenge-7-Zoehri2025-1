/**
 * Environment configuration
 * Access environment variables with type safety
 */

export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
} as const;

// Validate required environment variables
if (typeof window !== "undefined" && !env.apiBaseUrl) {
  console.warn(
    "NEXT_PUBLIC_API_BASE_URL is not set. Please check your .env.local file."
  );
}
