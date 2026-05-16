import { notFound } from "next/navigation"

import { MdxContent } from "@/components/mdx/mdx-content"
import { getAllDocs, getDocBySlug } from "@/lib/content"

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params

  try {
    const doc = getDocBySlug("docs", slug)
    return <MdxContent source={doc.content} />
  } catch {
    return notFound()
  }
}

export function generateStaticParams() {
  return getAllDocs("docs").map((doc) => ({ slug: doc.slug }))
}
