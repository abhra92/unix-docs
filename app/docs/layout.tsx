import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh">
      <SiteHeader />
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[260px_1fr]">
        <div className="hidden lg:block">
          <DocsSidebar />
        </div>
        <main className="docs-content min-w-0 max-w-3xl">{children}</main>
      </div>
      <SiteFooter />
    </div>
  )
}
