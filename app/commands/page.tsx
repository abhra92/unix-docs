import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { getAllCommands } from "@/lib/content"

export default function CommandsPage() {
  const commands = getAllCommands()

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Command Index
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          Unix command reference
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Structured command references with syntax, options, and operational guidance.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {commands.map((command) => (
          <Link
            key={command.slug.join("/")}
            href={`/commands/${command.slug.join("/")}`}
            className="rounded-2xl border border-border/60 bg-card/50 p-5 transition hover:border-primary/50 hover:bg-card"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">{command.frontmatter.title}</h2>
              <Badge variant="secondary">{command.frontmatter.section ?? "Command"}</Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {command.frontmatter.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
