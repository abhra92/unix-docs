import type { MetadataRoute } from "next"

import { getAllCommands, getAllDocs } from "@/lib/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const bcaRoutes = [
    "https://unix.abhrajoyti.me/bca-6th-sem",
    "https://unix.abhrajoyti.me/bca-6th-sem/class-notes",
    "https://unix.abhrajoyti.me/bca-6th-sem/lab-work",
    "https://unix.abhrajoyti.me/bca-6th-sem/assignments",
    "https://unix.abhrajoyti.me/bca-6th-sem/project-notes",
  ].map((url) => ({
    url,
    lastModified: new Date().toISOString().split("T")[0],
  }))

  const docs = getAllDocs("docs").map((doc) => ({
    url: `https://unix.abhrajoyti.me/docs/${doc.slug.join("/")}`,
    lastModified: doc.frontmatter.updated ?? new Date().toISOString().split("T")[0],
  }))

  const commands = getAllCommands().map((doc) => ({
    url: `https://unix.abhrajoyti.me/commands/${doc.slug.join("/")}`,
    lastModified: doc.frontmatter.updated ?? new Date().toISOString().split("T")[0],
  }))

  return [
    {
      url: "https://unix.abhrajoyti.me",
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: "https://unix.abhrajoyti.me/docs",
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: "https://unix.abhrajoyti.me/commands",
      lastModified: new Date().toISOString().split("T")[0],
    },
    ...docs,
    ...commands,
    ...bcaRoutes,
  ]
}
