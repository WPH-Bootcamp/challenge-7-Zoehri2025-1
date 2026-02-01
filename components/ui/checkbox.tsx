import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, ...props }, ref) => {
    return (
      <div className="relative inline-block">
        <input
          type="checkbox"
          checked={checked}
          className={cn(
            "h-5 w-5 rounded-[6px] border bg-white text-[#c12116] focus:ring-2 focus:ring-[#c12116] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer transition-colors",
            checked 
              ? "bg-[#c12116] border-[#c12116]" 
              : "border-[#d5d7da]",
            className?.includes("border-[#c12116]") && !checked && "border-[#c12116]",
            className
          )}
          ref={ref}
          {...props}
        />
        {checked && (
          <svg
            className="absolute inset-[15%] pointer-events-none"
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5L5 9L13 1"
              stroke="#fdfdfd"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
