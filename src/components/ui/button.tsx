import * as React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'tonal'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', asChild = false, children, ...props }, ref) => {
    const variants = {
      default: "bg-[#4285F4] text-white hover:bg-[#1A73E8] shadow-sm",
      outline: "border border-[#DADCE0] bg-transparent text-[#202124] hover:bg-[#F8F9FA]",
      ghost: "bg-transparent text-[#5F6368] hover:bg-[#F8F9FA] hover:text-[#202124]",
      tonal: "bg-[#E8F0FE] text-[#1A73E8] hover:bg-[#D2E3FC]"
    }

    const classes = cn(
      "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      variants[variant],
      className
    )

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>
      return React.cloneElement(child, {
        ...props,
        className: cn(classes, child.props?.className),
      })
    }

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
