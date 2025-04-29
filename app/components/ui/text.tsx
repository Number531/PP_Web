import type React from "react"
import { cn } from "@/lib/utils"

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "display" | "h1" | "h2" | "h3" | "h4" | "body" | "subtitle" | "caption" | "overline" | "quote" | "monospace"
  gradient?: "default" | "subtle" | "bright" | "none"
  glow?: boolean
  as?: React.ElementType
  balance?: boolean
  shadow?: "sm" | "md" | "lg" | "none"
}

export function Text({
  variant = "body",
  gradient = "none",
  glow = false,
  as,
  balance = false,
  shadow = "none",
  className,
  children,
  ...props
}: TextProps) {
  const Component = as || getDefaultElement(variant)

  return (
    <Component
      className={cn(
        // Base variant styles
        variant === "display" && "display",
        variant === "h1" && "text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter",
        variant === "h2" && "text-3xl md:text-4xl font-semibold tracking-tight",
        variant === "h3" && "text-2xl font-medium tracking-tight",
        variant === "h4" && "text-xl font-medium tracking-tight",
        variant === "body" && "text-base leading-relaxed",
        variant === "subtitle" && "subtitle",
        variant === "caption" && "caption",
        variant === "overline" && "overline",
        variant === "quote" && "quote",
        variant === "monospace" && "monospace",

        // Gradient styles
        gradient === "default" && "text-gradient",
        gradient === "subtle" && "text-gradient-subtle",
        gradient === "bright" && "text-gradient-bright",

        // Glow effect
        glow && "text-glow",

        // Text balance
        balance && "text-balance",

        // Shadow styles
        shadow === "sm" && "text-shadow-sm",
        shadow === "md" && "text-shadow-md",
        shadow === "lg" && "text-shadow-lg",

        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

function getDefaultElement(variant: TextProps["variant"]): React.ElementType {
  switch (variant) {
    case "display":
    case "h1":
      return "h1"
    case "h2":
      return "h2"
    case "h3":
      return "h3"
    case "h4":
      return "h4"
    case "subtitle":
      return "p"
    case "caption":
      return "span"
    case "overline":
      return "span"
    case "quote":
      return "blockquote"
    case "monospace":
      return "code"
    default:
      return "p"
  }
}
