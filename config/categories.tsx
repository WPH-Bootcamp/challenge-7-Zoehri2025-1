import React from "react";

export const categories = [
  {
    id: "all",
    name: "All Restaurant",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="8" y="12" width="24" height="4" rx="2" fill="#FFD700" />
        <rect x="8" y="16" width="24" height="5" rx="2.5" fill="#C12116" />
        <rect x="8" y="21" width="24" height="4" rx="2" fill="#FFD700" />
        <rect x="26" y="6" width="6" height="8" rx="1" fill="#C12116" />
        <line x1="28" y1="6" x2="30" y2="6" stroke="#C12116" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="27" y1="4" x2="27" y2="8" stroke="#C12116" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "nearby",
    name: "Nearby",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6C13.373 6 8 11.373 8 18C8 25 20 35 20 35C20 35 32 25 32 18C32 11.373 26.627 6 20 6Z" fill="#C12116" />
        <circle cx="20" cy="18" r="5" fill="white" />
      </svg>
    ),
  },
  {
    id: "discount",
    name: "Discount",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="20" y="28" fontSize="28" fontWeight="900" fill="#C12116" textAnchor="middle" fontFamily="Arial, sans-serif">%</text>
      </svg>
    ),
  },
  {
    id: "best-seller",
    name: "Best Seller",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12C10 10.895 10.895 10 12 10H28C29.105 10 30 10.895 30 12V18C30 21.314 27.314 24 24 24H16C12.686 24 10 21.314 10 18V12Z" fill="#FFD700" />
        <path d="M15 24V30H25V24" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M17 30V33H23V30" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="20" cy="15" r="2.5" fill="#FFA500" />
      </svg>
    ),
  },
  {
    id: "delivery",
    name: "Delivery",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="22" width="20" height="8" rx="4" fill="#C12116" />
        <circle cx="11" cy="32" r="4" fill="#1a1a1a" />
        <circle cx="25" cy="32" r="4" fill="#1a1a1a" />
        <rect x="8" y="14" width="16" height="10" rx="2.5" fill="#C12116" />
        <rect x="10" y="16" width="12" height="6" rx="1.5" fill="#FFF" />
        <path d="M24 20L28 14L32 20" stroke="#C12116" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    id: "lunch",
    name: "Lunch",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="20" cy="28" rx="12" ry="4" fill="#C12116" />
        <path d="M8 24C8 21 10.5 18 13 18H27C29.5 18 32 21 32 24V28C32 31 29.5 34 27 34H13C10.5 34 8 31 8 28V24Z" fill="white" />
        <ellipse cx="20" cy="24" rx="12" ry="3" fill="#C12116" />
      </svg>
    ),
  },
] as const;
