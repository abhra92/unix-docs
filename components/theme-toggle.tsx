"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="h-8 w-[72px] rounded-none border border-border bg-background" />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      id="theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={[
        "group relative flex items-center justify-center gap-2",
        "rounded-none border px-3 py-1.5",
        "text-xs font-semibold uppercase tracking-widest",
        "transition-all duration-300 ease-in-out",
        "select-none outline-none",
        // deep dark mode styles
        isDark
          ? [
              "border-[oklch(1_0_0/12%)]",
              "bg-[oklch(0.10_0_0)]",
              "text-[oklch(0.85_0_0)]",
              "shadow-[inset_0_1px_0_oklch(1_0_0/6%),0_0_0_1px_oklch(0_0_0/40%)]",
              "hover:border-[oklch(1_0_0/20%)]",
              "hover:bg-[oklch(0.13_0_0)]",
              "hover:text-[oklch(0.95_0_0)]",
              "hover:shadow-[inset_0_1px_0_oklch(1_0_0/10%),0_0_12px_oklch(0.5_0_0/8%)]",
            ].join(" ")
          : [
              "border-border",
              "bg-background",
              "text-foreground",
              "shadow-[inset_0_1px_0_oklch(1_0_0/80%),0_1px_2px_oklch(0_0_0/8%)]",
              "hover:bg-muted",
              "hover:text-foreground",
            ].join(" "),
      ].join(" ")}
    >
      {/* Animated glow ring in dark mode */}
      {isDark && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-none opacity-0 ring-1 ring-[oklch(0.7_0_0/20%)] transition-opacity duration-300 group-hover:opacity-100"
        />
      )}

      {/* Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={[
          "h-4 w-4 shrink-0",
          "transition-transform duration-500 ease-in-out",
          isDark ? "rotate-0" : "rotate-[360deg]",
        ].join(" ")}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18" />
        <path d="M12 9l4.65-4.65" />
        <path d="M12 14.3l7.37-7.37" />
        <path d="M12 19.6l8.85-8.85" />
      </svg>

      {/* Label */}
      {/* <span>D</span> */}
    </button>
  )
}
