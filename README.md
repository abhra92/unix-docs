# Unix & Shell Docs

Production-grade Unix and shell documentation platform built for terminal-first workflows. Live at **[unix.abhrajoyti.me](https://unix.abhrajoyti.me)**.

---

## Overview

A comprehensive documentation hub covering Unix commands, shell scripting, operational labs, cheatsheets, and BCA 6th semester coursework. Content is authored in MDX and rendered with a custom component pipeline featuring copy-to-clipboard code blocks, smart search, and dark/light theming.

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, RSC, Turbopack) |
| **Language** | TypeScript (strict, ES2023 target) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + CSS variables |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (radix-lyra style, 55+ components) |
| **Icons** | [Lucide React](https://lucide.dev/) + [Phosphor Icons](https://phosphoricons.com/) |
| **Content** | MDX via [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) |
| **MDX Plugins** | remark-gfm, rehype-slug, rehype-autolink-headings |
| **Theming** | [next-themes](https://github.com/pacocoursey/next-themes) (dark default, `D` hotkey toggle) |
| **Fonts** | Space Grotesk (sans), JetBrains Mono (mono) via `next/font/google` |
| **Package Manager** | pnpm |

## Project Structure

```
unix docs/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout — fonts, metadata, ThemeProvider
│   ├── page.tsx                # Homepage — hero, terminal teaser, sections
│   ├── globals.css             # Design tokens & Tailwind base
│   ├── robots.ts               # robots.txt generation
│   ├── sitemap.ts              # Dynamic sitemap from MDX content
│   ├── bca-6th-sem/            # BCA semester workspace
│   │   ├── page.tsx            # Semester hub — cards for each section
│   │   ├── layout.tsx          # Shared BCA layout
│   │   ├── assignments/        # Assignment submissions
│   │   ├── bash-shell-script/  # Remote bash scripts
│   │   ├── class-notes/        # Weekly lecture notes
│   │   ├── lab-work/           # Lab exercises & monitoring scripts
│   │   └── project-notes/      # Mini project ideas
│   ├── commands/               # Command reference pages
│   │   ├── page.tsx            # Command index
│   │   └── [slug]/             # Dynamic command detail pages
│   └── docs/                   # Documentation pages
│       ├── page.tsx            # Docs landing
│       ├── layout.tsx          # Sidebar layout with DocsSidebar
│       └── [...slug]/          # Catch-all MDX doc pages
├── components/
│   ├── layout/
│   │   ├── site-header.tsx     # Sticky header — responsive nav, mobile menu
│   │   └── site-footer.tsx     # Footer — links, attribution
│   ├── docs/
│   │   └── docs-sidebar.tsx    # Sidebar navigation for /docs
│   ├── mdx/
│   │   ├── mdx-content.tsx     # MDX renderer with styled components
│   │   └── copy-code-button.tsx# Clipboard copy for code blocks
│   ├── search/
│   │   └── search-bar.tsx      # Client-side fuzzy search (Ctrl+K)
│   ├── sections/
│   │   └── bca-sixth-sem-section.tsx  # Homepage BCA card grid
│   ├── theme-provider.tsx      # next-themes wrapper + D hotkey
│   ├── theme-toggle.tsx        # Dark/light toggle with animated icon
│   └── ui/                     # 55 shadcn/ui primitives
├── content/
│   ├── commands/               # 12 command MDX files
│   │   ├── ls.mdx, grep.mdx, find.mdx, curl.mdx
│   │   ├── chmod.mdx, chown.mdx, cd.mdx
│   │   ├── ps.mdx, kill.mdx, tar.mdx
│   │   ├── awk.mdx, sed.mdx
│   │   └── ...
│   └── docs/                   # Documentation MDX (13 sections)
│       ├── basics/             # What is Unix, Shell Basics
│       ├── filesystem/         # Paths & Navigation
│       ├── permissions/        # Ownership & Modes
│       ├── processes/          # Process Lifecycle
│       ├── networking/         # Network Tools
│       ├── shell-scripting/    # Variables & Conditions
│       ├── awk-sed-grep/       # Text Processing
│       ├── ssh/                # Secure Shell
│       ├── cron-jobs/          # Scheduling
│       ├── bash-projects/      # Log Rotation Script
│       ├── labs/               # Permissions Lab
│       ├── cheatsheets/        # Core Commands
│       └── interview-questions/# Unix Basics
├── lib/
│   ├── content.ts              # MDX loader — gray-matter, walker, search index
│   ├── navigation.ts           # Sidebar nav, featured commands, quick categories
│   └── utils.ts                # cn() helper (clsx + tailwind-merge)
├── hooks/
│   └── use-mobile.ts           # useIsMobile() responsive hook
└── public/                     # Static assets
```

## Key Features

### Content System
- **MDX authoring** with frontmatter support (`title`, `description`, `section`, `tags`, `difficulty`, `updated`)
- **Dynamic routing** — docs via `[...slug]` catch-all, commands via `[slug]`
- **`generateStaticParams`** for static generation of all content pages
- **Search index** built at request time from all docs + commands with tag support

### UI / UX
- **Responsive header** with desktop nav links, mobile hamburger menu, and persistent theme toggle
- **Dark-first theming** — default dark mode, toggle via button or `D` key
- **Interactive terminal teaser** on homepage with simulated shell output
- **Copy-to-clipboard** on all code blocks with visual feedback
- **Keyboard search** — `Ctrl+K` focuses the search bar
- **Client-side fuzzy search** across docs, commands, labs, and cheatsheets

### SEO
- Comprehensive `<meta>` tags and Open Graph data in root layout
- Dynamic `sitemap.xml` generated from all MDX content + BCA routes
- `robots.txt` allowing all crawlers
- Canonical URL set to `https://unix.abhrajoyti.me`

### BCA 6th Semester
- Dedicated section with cards for: Class Notes, Lab Work, Assignments, Project Notes, Syllabus (external PDF), and Bash Shell Scripts
- Highlighted in header nav with a styled badge
- Promoted on the homepage via a dedicated section component

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** (recommended)

### Install & Run

```bash
# Clone the repository
git clone https://github.com/abhra92/unix-docs.git
cd unix-docs

# Install dependencies
pnpm install

# Start dev server (Turbopack)
pnpm run dev
```

The site will be available at `http://localhost:3000`.

### Available Scripts

| Script | Description |
|---|---|
| `pnpm run dev` | Start dev server with Turbopack |
| `pnpm run build` | Production build |
| `pnpm run start` | Serve production build |
| `pnpm run lint` | Run ESLint |
| `pnpm run format` | Format with Prettier |
| `pnpm run typecheck` | Type-check without emitting |

## Adding Content

### New documentation page

Create an MDX file under `content/docs/<section>/<slug>.mdx`:

```mdx
---
title: "Page Title"
description: "Brief summary for search and SEO."
section: "Section Name"
updated: "2026-05-16"
tags: ["unix", "example"]
difficulty: "beginner"
---

Your markdown content here.
```

The page will be automatically available at `/docs/<section>/<slug>`.

### New command reference

Create an MDX file under `content/commands/<command>.mdx` with the same frontmatter schema. It will appear at `/commands/<command>` and be included in the search index.

## Adding UI Components

```bash
npx shadcn@latest add <component-name>
```

Components are placed in `components/ui/` and imported via the `@/components/ui/` alias.

## Knowledge Graph

This project maintains a [graphify](https://github.com/graphify-ai/graphify) knowledge graph at `graphify-out/`. After modifying code files, run:

```bash
graphify update .
```

## Author

Built and deployed by [Abhrajyoti Dhara](https://www.abhrajoyti.me/).

## License

Private — all rights reserved.
