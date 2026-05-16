import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

export default function CommandsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
      <SiteFooter />
    </div>
  )
}
