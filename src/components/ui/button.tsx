import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f75b20] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-[#ed1c24] via-[#f75b20] to-[#e52772] text-white shadow-[0_0_36px_rgba(247,91,32,0.34)] hover:brightness-110",
        glass:
          "border border-slate-900/10 bg-white/70 text-slate-900 shadow-[0_12px_36px_rgba(8,32,70,0.08)] backdrop-blur-xl hover:border-[#f75b20]/60 hover:bg-white",
        ghost: "text-slate-600 hover:text-slate-950",
      },
      size: {
        default: "h-12 px-6",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11 px-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      suppressHydrationWarning
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
