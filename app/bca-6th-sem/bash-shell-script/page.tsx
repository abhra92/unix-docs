import fs from "node:fs"
import path from "node:path"
import { MdxContent } from "@/components/mdx/mdx-content"

async function getScriptContent() {
  const filePath = path.join(
    process.cwd(),
    "app",
    "bca-6th-sem",
    "bash-shell-script",
    "scripts.md"
  )
  return fs.readFileSync(filePath, "utf8")
}

export default async function BashShellScriptPage() {
  const content = await getScriptContent()

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="border-b border-border pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          BCA 6th Sem
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          Bash Shell Scripts
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
          Scripts executed remotely on the Linux server. Click{" "}
          <strong>Copy</strong> on any block to copy commands to your clipboard.
        </p>
      </div>

      {/* Rendered markdown */}
      <div className="prose-none">
        <MdxContent source={content} />
      </div>
    </div>
  )
}
