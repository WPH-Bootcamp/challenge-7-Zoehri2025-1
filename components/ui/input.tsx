import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, ...props }, ref) => {
    const hasValue = value !== undefined && value !== "";
    
    return (
      <input
        type={type}
        value={value}
        className={cn(
          "flex h-[48px] lg:h-[56px] w-full rounded-xl lg:rounded-[10px] border bg-white px-3 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-[#c12116] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          hasValue
            ? "text-[#0a0d12] font-semibold tracking-[-0.28px] lg:tracking-[-0.32px] py-2 border-[#d5d7da]"
            : "text-[#717680] font-normal placeholder:text-[#717680] tracking-[-0.28px] lg:tracking-[-0.32px] py-2 border-[#d5d7da]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
