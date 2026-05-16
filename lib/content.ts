import fs from "node:fs"
import path from "node:path"
import { cache } from "react"
import matter from "gray-matter"

export type DocType = "docs" | "commands"

export type DocFrontmatter = {
  title: string
  description: string
  section?: string
  updated?: string
  tags?: string[]
  difficulty?: "beginner" | "intermediate" | "advanced"
}

export type DocEntry = {
  slug: string[]
  type: DocType
  frontmatter: DocFrontmatter
  content: string
}

const CONTENT_ROOT = path.join(process.cwd(), "content")

function readMdxFile(type: DocType, slug: string[]) {
  const docPath = path.join(CONTENT_ROOT, type, ...slug) + ".mdx"
  const raw = fs.readFileSync(docPath, "utf8")
  const parsed = matter(raw)

  return {
    content: parsed.content,
    frontmatter: parsed.data as DocFrontmatter,
  }
}

function walkMdxFiles(dir: string, slugPrefix: string[] = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files: string[][] = []

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue
    }

    if (entry.isDirectory()) {
      files.push(...walkMdxFiles(path.join(dir, entry.name), [...slugPrefix, entry.name]))
      continue
    }

    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      const name = entry.name.replace(/\.mdx$/, "")
      files.push([...slugPrefix, name])
    }
  }

  return files
}

export const getDocBySlug = cache((type: DocType, slug: string[]) => {
  const { content, frontmatter } = readMdxFile(type, slug)

  return {
    slug,
    type,
    content,
    frontmatter,
  } satisfies DocEntry
})

export const getAllDocs = cache((type: DocType) => {
  const root = path.join(CONTENT_ROOT, type)
  const slugs = walkMdxFiles(root)

  return slugs
    .map((slug) => getDocBySlug(type, slug))
    .sort((a, b) => (b.frontmatter.updated ?? "").localeCompare(a.frontmatter.updated ?? ""))
})

export const getRecentDocs = cache((count: number) => {
  const docs = getAllDocs("docs")
  return docs.slice(0, count)
})

export const getAllCommands = cache(() => getAllDocs("commands"))

export const getSearchIndex = cache(() => {
  const docs = getAllDocs("docs").map((doc) => ({
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    href: `/docs/${doc.slug.join("/")}`,
    type: "docs" as const,
    tags: doc.frontmatter.tags ?? [],
  }))

  const commands = getAllCommands().map((doc) => ({
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    href: `/commands/${doc.slug.join("/")}`,
    type: "commands" as const,
    tags: doc.frontmatter.tags ?? [],
  }))

  return [...docs, ...commands]
})
