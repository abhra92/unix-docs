import { MdxContent } from "@/components/mdx/mdx-content"
import { getDocBySlug } from "@/lib/content"

export default function DocsIndexPage() {
  const doc = getDocBySlug("docs", ["index"])

  return <MdxContent source={doc.content} />
}
