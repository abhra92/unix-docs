import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { CopyCodeButton } from "./copy-code-button"

/* ── helpers ────────────────────────────────────────────── */
function extractText(node: ReactNode): string {
  if (typeof node === "string") return node
  if (typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(extractText).join("")
  if (node && typeof node === "object" && "props" in (node as object)) {
    const el = node as React.ReactElement<{ children?: ReactNode }>
    return extractText(el.props.children)
  }
  return ""
}

/* ── styled components ──────────────────────────────────── */
function Heading1({ children, ...props }: ComponentPropsWithoutRef<"h1">) {
  return (
    <h1
      className="mt-8 mb-3 scroll-mt-20 text-2xl font-semibold tracking-tight text-foreground first:mt-0"
      {...props}
    >
      {children}
    </h1>
  )
}

function Heading2({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className="mt-8 mb-2 scroll-mt-20 border-b border-border pb-1.5 text-lg font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h2>
  )
}

function Heading3({ children, ...props }: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className="mt-6 mb-2 scroll-mt-20 text-base font-semibold text-foreground"
      {...props}
    >
      {children}
    </h3>
  )
}

function Paragraph({ children, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p className="mb-3 text-sm leading-relaxed text-muted-foreground" {...props}>
      {children}
    </p>
  )
}

function HorizontalRule() {
  return <hr className="my-6 border-border" />
}

function UnorderedList({ children, ...props }: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul className="mb-3 ml-4 list-disc space-y-1 text-sm text-muted-foreground" {...props}>
      {children}
    </ul>
  )
}

function OrderedList({ children, ...props }: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className="mb-3 ml-4 list-decimal space-y-1 text-sm text-muted-foreground"
      {...props}
    >
      {children}
    </ol>
  )
}

function ListItem({ children, ...props }: ComponentPropsWithoutRef<"li">) {
  return (
    <li className="pl-1" {...props}>
      {children}
    </li>
  )
}

function InlineCode({ children, ...props }: ComponentPropsWithoutRef<"code">) {
  return (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground"
      {...props}
    >
      {children}
    </code>
  )
}

function CodeBlock({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
  const code = extractText(children)
  return (
    <div className="group relative my-4 overflow-hidden rounded-xl border border-border bg-muted/40">
      {/* header bar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-2">
        <span className="font-mono text-[11px] text-muted-foreground">bash</span>
        <CopyCodeButton code={code} />
      </div>
      {/* code */}
      <pre
        className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-foreground"
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}

function Code({ children, ...props }: ComponentPropsWithoutRef<"code">) {
  // When code is inside a pre it won't get the inline style
  return (
    <code className="font-mono text-[12.5px] text-foreground" {...props}>
      {children}
    </code>
  )
}

function Blockquote({ children, ...props }: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className="my-4 border-l-4 border-primary/40 pl-4 text-sm italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  )
}

function Strong({ children, ...props }: ComponentPropsWithoutRef<"strong">) {
  return (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  )
}

/* ── component map ──────────────────────────────────────── */
const components = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  hr: HorizontalRule,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  pre: CodeBlock,
  code: Code,
  blockquote: Blockquote,
  strong: Strong,
}

/* ── public export ──────────────────────────────────────── */
export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
      }}
    />
  )
}
