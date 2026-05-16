import Link from "next/link"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { BcaSixthSemSection } from "@/components/sections/bca-sixth-sem-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getRecentDocs } from "@/lib/content"
import { featuredCommands, quickCategories } from "@/lib/navigation"

export default function HomePage() {
  const recentDocs = getRecentDocs(5)

  return (
    <div className="min-h-svh">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Badge variant="secondary">Unix & Shell Platform</Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Production-grade Unix documentation for engineers who run real systems.
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Command references, scripting guides, operational labs, and cheat sheets organized
              for rapid lookup and deep learning. Built for terminal-first workflows.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="sm">Start with Basics</Button>
              <Button size="sm" variant="secondary" asChild>
                <Link href="/commands">Explore Commands</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-3xl border border-border/60 bg-card/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Interactive Terminal Teaser
            </p>
            <div className="mt-4 space-y-3 rounded-2xl border border-border/50 bg-background/70 p-4 font-mono text-xs text-foreground">
              <p>unix@docs:~$ ls -la /var/log</p>
              <p className="text-muted-foreground">auth.log  boot.log  kern.log  syslog  wtmp</p>
              <p>unix@docs:~$ grep -i "error" syslog | tail -n 3</p>
              <p className="text-muted-foreground">May 16 09:41:12 scheduler: error queue full</p>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Terminal playground and Docker sandboxes are on the roadmap.
            </p>
          </div>
        </section>

        <BcaSixthSemSection />

        <section className="flex flex-col gap-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickCategories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="rounded-2xl border border-border/60 bg-card/50 p-4 text-sm text-foreground transition hover:border-primary/50"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-border/60 bg-card/50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Featured Commands
            </p>
            <div className="mt-6 grid gap-4">
              {featuredCommands.map((command) => (
                <Link
                  key={command.href}
                  href={command.href}
                  className="rounded-2xl border border-border/50 bg-background/60 p-4 transition hover:border-primary/50"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">{command.title}</p>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Command
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{command.summary}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-border/60 bg-card/50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Shell Scripting Highlights
            </p>
            <div className="mt-6 space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="text-foreground">Reliability Patterns</p>
                <p>Strict mode, traps, retries, and safe temp directories.</p>
              </div>
              <div>
                <p className="text-foreground">Automation Playbooks</p>
                <p>Backups, log rotation, release rollbacks, and health checks.</p>
              </div>
              <div>
                <p className="text-foreground">Observability</p>
                <p>Readable logs, structured output, and performance timing.</p>
              </div>
              <Button size="sm" variant="secondary" asChild>
                <Link href="/docs/shell-scripting/variables-and-conditions">View Scripting Docs</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-border/60 bg-card/50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Cheatsheets
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              Curated quick references for on-call speed.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Command syntax, flags, and patterns grouped by operational intent. Designed for
              terminal-side reading.
            </p>
            <Button size="sm" className="mt-4" asChild>
              <Link href="/docs/cheatsheets/core-commands">Open Cheatsheet</Link>
            </Button>
          </div>
          <div className="rounded-3xl border border-border/60 bg-card/50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Recent Documentation
            </p>
            <div className="mt-6 space-y-4">
              {recentDocs.map((doc) => (
                <Link
                  key={doc.slug.join("/")}
                  href={`/docs/${doc.slug.join("/")}`}
                  className="block rounded-2xl border border-border/50 bg-background/60 p-4 transition hover:border-primary/50"
                >
                  <p className="text-sm font-semibold text-foreground">{doc.frontmatter.title}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {doc.frontmatter.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
