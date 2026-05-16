import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-foreground">Unix & Shell Docs</p>
          <p className="mt-2 max-w-md">
            Documentation, labs, and command references built for production-grade Unix workflows.
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Deployed by{" "}
            <Link
              href="https://www.abhrajoyti.me/"
              className="underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              Abhrajyoti Dhara
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/docs" className="hover:text-foreground">
            Documentation
          </Link>
          <Link href="/commands" className="hover:text-foreground">
            Command Index
          </Link>
          <Link href="/docs/cheatsheets/core-commands" className="hover:text-foreground">
            Cheatsheets
          </Link>
          <Link href="/docs/interview-questions/unix-basics" className="hover:text-foreground">
            Interview Prep
          </Link>
        </div>
      </div>
    </footer>
  )
}
