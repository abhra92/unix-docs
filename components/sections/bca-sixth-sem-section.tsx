import Link from "next/link"
import { BookOpen, ClipboardList, Code, ExternalLink, Lightbulb, Terminal } from "lucide-react"

export function BcaSixthSemSection() {
  return (
    <section className="rounded-3xl border border-border/60 bg-card/50 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          BCA 6th Sem
        </p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
          Class notes, lab work, and assignments.
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          A focused workspace for your semester materials with direct links to notes and lab
          submissions.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/bca-6th-sem/class-notes"
            className="rounded-2xl border border-border/50 bg-background/60 p-4 transition hover:border-primary/60"
          >
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-foreground">Class Notes</p>
              <BookOpen className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Weekly notes, key topics, and revision summaries.
            </p>
          </Link>
          <Link
            href="/bca-6th-sem/lab-work"
            className="rounded-2xl border border-border/50 bg-background/60 p-4 transition hover:border-primary/60"
          >
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-foreground">Lab Work</p>
              <Terminal className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Lab exercises, scripts, and output snapshots.
            </p>
          </Link>
          <Link
            href="/bca-6th-sem/assignments"
            className="rounded-2xl border border-border/50 bg-background/60 p-4 transition hover:border-primary/60"
          >
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-foreground">Assignments</p>
              <ClipboardList className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Problem statements, submissions, and references.
            </p>
          </Link>
          <Link
            href="/bca-6th-sem/project-notes"
            className="rounded-2xl border border-border/50 bg-background/60 p-4 transition hover:border-primary/60"
          >
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-foreground">Project Notes</p>
              <Lightbulb className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Mini project ideas, architecture, and checklists.
            </p>
          </Link>
          <a
            href="https://abhra92.github.io/Class_Resource_Dashboard/syllabus/UnixShell.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-border/50 bg-background/60 p-4 transition hover:border-primary/60"
          >
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-foreground">Syllabus</p>
              <ExternalLink className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Unix &amp; Shell Programming — official syllabus PDF.
            </p>
          </a>
          <Link
            href="/bca-6th-sem/bash-shell-script"
            className="rounded-2xl border border-border/50 bg-background/60 p-4 transition hover:border-primary/60"
          >
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-foreground">Bash Shell Scripts</p>
              <Code className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Scripts executed remotely on Linux.
            </p>
          </Link>
        </div>
    </section>
  )
}
