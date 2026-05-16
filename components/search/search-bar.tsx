"use client"

import * as React from "react"
import Link from "next/link"
import { MagnifyingGlass } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

export type SearchEntry = {
  title: string
  description: string
  href: string
  type: "docs" | "commands"
  tags: string[]
}

export function SearchBar({
  entries,
  className,
}: {
  entries: SearchEntry[]
  className?: string
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [query, setQuery] = React.useState("")
  const [focused, setFocused] = React.useState(false)

  const results = React.useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) {
      return []
    }

    return entries
      .filter((entry) => {
        const haystack = `${entry.title} ${entry.description} ${entry.tags.join(" ")}`.toLowerCase()
        return haystack.includes(term)
      })
      .slice(0, 8)
  }, [entries, query])

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== "k" || !event.ctrlKey) {
        return
      }

      event.preventDefault()
      inputRef.current?.focus()
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-card/60 px-4 py-3 shadow-sm">
        <MagnifyingGlass className="h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search commands, docs, labs, and cheatsheets"
          className="w-full min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <span className="hidden items-center rounded-full border border-border/60 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline-flex">
          Ctrl K
        </span>
      </div>
      {focused && results.length > 0 ? (
        <div className="absolute left-0 right-0 z-20 mt-2 rounded-2xl border border-border/70 bg-popover/95 p-2 shadow-xl backdrop-blur">
          {results.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              className="flex flex-col gap-1 rounded-xl px-3 py-2 text-left transition hover:bg-muted"
            >
              <div className="flex items-center justify-between text-sm font-medium text-foreground">
                {entry.title}
                <span className="rounded-full border border-border/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {entry.type}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {entry.description}
              </p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}
