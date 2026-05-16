import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { MdxContent } from "@/components/mdx/mdx-content"
import { getAllDocs, getDocBySlug } from "@/lib/content"

export default async function CommandPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const resolvedSlug = [slug]

  try {
    const doc = getDocBySlug("commands", resolvedSlug)

    return (
      <div className="docs-content">
        <div className="mb-8 rounded-2xl border border-border/60 bg-card/50 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              {doc.frontmatter.title}
            </h1>
            <Badge variant="secondary">{doc.frontmatter.section ?? "Command"}</Badge>
          </div>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            {doc.frontmatter.description}
          </p>
        </div>
        <MdxContent source={doc.content} />
      </div>
    )
  } catch {
    return notFound()
  }
}

export function generateStaticParams() {
  return getAllDocs("commands").map((doc) => ({ slug: doc.slug[0] }))
}
