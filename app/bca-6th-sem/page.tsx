import Link from "next/link"
import { BookOpen, ClipboardList, Code, ExternalLink, Lightbulb, Terminal } from "lucide-react"

export default function BcaSixthSemPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          BCA 6th Sem
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          Semester workspace
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Central hub for the syllabus, class notes, lab work, assignments, and project notes.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/bca-6th-sem/class-notes"
          className="rounded-2xl border border-border/60 bg-card/50 p-5 transition hover:border-primary/50"
        >
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-foreground">Class Notes</p>
            <BookOpen className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Weekly notes and summaries.</p>
        </Link>
        <Link
          href="/bca-6th-sem/lab-work"
          className="rounded-2xl border border-border/60 bg-card/50 p-5 transition hover:border-primary/50"
        >
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-foreground">Lab Work</p>
            <Terminal className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Lab exercises and scripts.</p>
        </Link>
        <Link
          href="/bca-6th-sem/assignments"
          className="rounded-2xl border border-border/60 bg-card/50 p-5 transition hover:border-primary/50"
        >
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-foreground">Assignments</p>
            <ClipboardList className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Problems and submissions.</p>
        </Link>
        <Link
          href="/bca-6th-sem/project-notes"
          className="rounded-2xl border border-border/60 bg-card/50 p-5 transition hover:border-primary/50"
        >
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-foreground">Project Notes</p>
            <Lightbulb className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Ideas and checklists.</p>
        </Link>
        <a
          href="https://abhra92.github.io/Class_Resource_Dashboard/syllabus/UnixShell.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-border/60 bg-card/50 p-5 transition hover:border-primary/50"
        >
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-foreground">Syllabus</p>
            <ExternalLink className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Unix &amp; Shell Programming — official syllabus PDF.</p>
        </a>
        <Link
          href="/bca-6th-sem/bash-shell-script"
          className="rounded-2xl border border-border/60 bg-card/50 p-5 transition hover:border-primary/50"
        >
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-foreground">Bash Shell Scripts</p>
            <Code className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Scripts executed remotely on Linux.</p>
        </Link>
      </div>
    </div>
  )
}
