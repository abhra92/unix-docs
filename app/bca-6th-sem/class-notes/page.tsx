import fs from "node:fs"
import path from "node:path"
import { MdxContent } from "@/components/mdx/mdx-content"

export default function BcaClassNotesPage() {
  const mdPath = path.join(process.cwd(), "app", "bca-6th-sem", "class-notes", "pca2.md")
  let source = ""
  try {
    source = fs.readFileSync(mdPath, "utf8")
  } catch (e) {
    source = "# Class Notes\n\nCould not load notes.`pca2.md` not found.`"
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Class Notes</h1>
      <p className="text-sm text-muted-foreground">
        Add your weekly notes here. You can organize by unit, week, or topic.
      </p>

      <div className="prose max-w-none">
        <MdxContent source={source} />
      </div>
    </div>
  )
}
