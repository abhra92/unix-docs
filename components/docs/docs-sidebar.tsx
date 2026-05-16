import Link from "next/link"

import { docsNavigation } from "@/lib/navigation"

export function DocsSidebar() {
  return (
    <aside className="flex h-full flex-col gap-6 border-r border-border/60 bg-sidebar px-6 py-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Unix & Shell Docs
        </p>
        <p className="mt-2 text-sm text-sidebar-foreground/80">
          Production-grade Unix guidance, from commands to ops.
        </p>
      </div>
      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto pr-2 text-sm">
        {docsNavigation.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {section.title}
            </p>
            <div className="flex flex-col gap-1.5">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-2 py-1.5 text-sidebar-foreground/85 transition hover:bg-sidebar-accent hover:text-sidebar-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}
