"use client"

import Link from "next/link"
import { Menu, SquareTerminal, X } from "lucide-react"
import { useState } from "react"

import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:h-[72px]">
        {/* ── Left: Logo + Name + Theme Toggle ────────── */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-card/80 transition-colors hover:bg-muted">
              <SquareTerminal className="h-[18px] w-[18px] text-foreground" />
            </div>
            <span className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
              Unix &amp; Shell Docs
            </span>
          </Link>
        </div>

        {/* ── Right: Desktop Nav ────────────────────────── */}
        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
          <Link
            href="/docs"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Docs
          </Link>
          <Link
            href="/commands"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Commands
          </Link>
          <Link
            href="/docs/labs/permissions-lab"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Labs
          </Link>
          <Link
            href="/bca-6th-sem"
            className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-primary/20"
          >
            BCA 6th Sem
          </Link>
          <ThemeToggle />
        </nav>

        {/* ── Right: Mobile Hamburger + Toggle ─────────── */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown ────────────────────────────── */}
      {mobileOpen && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur sm:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            <Link
              href="/docs"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Docs
            </Link>
            <Link
              href="/commands"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Commands
            </Link>
            <Link
              href="/docs/labs/permissions-lab"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Labs
            </Link>
            <Link
              href="/bca-6th-sem"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              BCA 6th Sem
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
