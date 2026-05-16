import fs from "node:fs"
import path from "node:path"
import { MdxContent } from "@/components/mdx/mdx-content"

async function getLabContent() {
  const filePath = path.join(process.cwd(), "app", "bca-6th-sem", "lab-work", "lab.md")
  return fs.readFileSync(filePath, "utf8")
}

export default async function BcaLabWorkPage() {
  const content = await getLabContent()

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="border-b border-border pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Lab Work
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          Unix &amp; Shell Programming
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
          Step-by-step solutions for all lab exercises. Click <strong>Copy</strong> on any code
          block to copy commands directly to your clipboard.
        </p>
      </div>

      {/* Rendered markdown */}
      <div className="prose-none">
        <MdxContent source={content} />
      </div>
    </div>
  )
}
