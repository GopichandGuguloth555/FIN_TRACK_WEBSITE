import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "h-10 w-full rounded-md border border-brand-borderLight bg-white px-3 text-sm shadow-sm",
          "focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple",
          "placeholder:text-brand-textMuted",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
