import * as React from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  rightIcon?: React.ReactNode;
  label?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, error, rightIcon, label, value, ...props }, ref) => {
    const hasValue = value !== undefined && value !== "";

    return (
      <div className="flex flex-col gap-[4px] w-full">
        <div className="relative">
          {hasValue && label && (
            <label className="absolute left-3 top-2 text-xs font-normal leading-4 tracking-[-0.24px] text-[#717680] pointer-events-none z-10 transition-all">
              {label}
            </label>
          )}
          <Input
            ref={ref}
            value={value}
            className={cn(
              error && "border-[#c12116] focus:ring-[#c12116] focus:border-[#c12116]",
              rightIcon && !error && "pr-10",
              error && "pr-10",
              hasValue && label && "pt-6 pb-1",
              className
            )}
            placeholder={!hasValue ? label || props.placeholder : undefined}
            {...props}
          />
          {error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#c12116]"
              >
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M8 4V8M8 12H8.01"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}
          {!error && rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <div className="flex items-start gap-1.5 mt-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#c12116] mt-0.5 shrink-0"
            >
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M7 3.5V7M7 10.5H7.01"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <p className="font-body text-sm font-semibold leading-[20px] tracking-[-0.28px] text-[#c12116] flex-1">
              {error}
            </p>
          </div>
        )}
      </div>
    );
  }
);
InputField.displayName = "InputField";

export { InputField };
