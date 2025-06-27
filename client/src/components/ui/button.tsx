// src/components/ui/button.tsx
import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
} & VariantProps<typeof buttonVariants>;

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-current bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(buttonVariants({ variant: props.variant }), props.className)}
    >
      {children}
    </button>
  );
}
