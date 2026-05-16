export type NavItem = {
  title: string
  href: string
}

export type NavSection = {
  title: string
  items: NavItem[]
}

export const docsNavigation: NavSection[] = [
  {
    title: "Basics",
    items: [
      { title: "What is Unix?", href: "/docs/basics/what-is-unix" },
      { title: "Shell Basics", href: "/docs/basics/shell-basics" },
    ],
  },
  {
    title: "Filesystem",
    items: [{ title: "Paths & Navigation", href: "/docs/filesystem/paths-and-navigation" }],
  },
  {
    title: "Permissions",
    items: [{ title: "Ownership & Modes", href: "/docs/permissions/ownership-and-modes" }],
  },
  {
    title: "Processes",
    items: [{ title: "Process Lifecycle", href: "/docs/processes/process-lifecycle" }],
  },
  {
    title: "Networking",
    items: [{ title: "Network Tools", href: "/docs/networking/net-tools" }],
  },
  {
    title: "Shell Scripting",
    items: [{ title: "Variables & Conditions", href: "/docs/shell-scripting/variables-and-conditions" }],
  },
  {
    title: "awk/sed/grep",
    items: [{ title: "Text Processing", href: "/docs/awk-sed-grep/text-processing" }],
  },
  {
    title: "SSH",
    items: [{ title: "Secure Shell", href: "/docs/ssh/secure-shell" }],
  },
  {
    title: "Cron Jobs",
    items: [{ title: "Scheduling", href: "/docs/cron-jobs/scheduling" }],
  },
  {
    title: "Bash Projects",
    items: [{ title: "Log Rotation Script", href: "/docs/bash-projects/log-rotate" }],
  },
  {
    title: "Labs",
    items: [{ title: "Permissions Lab", href: "/docs/labs/permissions-lab" }],
  },
  {
    title: "Cheatsheets",
    items: [{ title: "Core Commands", href: "/docs/cheatsheets/core-commands" }],
  },
  {
    title: "Interview Questions",
    items: [{ title: "Unix Basics", href: "/docs/interview-questions/unix-basics" }],
  },
]

export const featuredCommands = [
  {
    title: "ls",
    summary: "Inspect directory contents with precision filters.",
    href: "/commands/ls",
  },
  {
    title: "grep",
    summary: "Search text streams with regex-grade control.",
    href: "/commands/grep",
  },
  {
    title: "find",
    summary: "Traverse filesystems safely at scale.",
    href: "/commands/find",
  },
  {
    title: "curl",
    summary: "Probe HTTP services and automate API checks.",
    href: "/commands/curl",
  },
]

export const quickCategories = [
  { title: "Processes", href: "/docs/processes/process-lifecycle" },
  { title: "Networking", href: "/docs/networking/net-tools" },
  { title: "Permissions", href: "/docs/permissions/ownership-and-modes" },
  { title: "Shell Scripting", href: "/docs/shell-scripting/variables-and-conditions" },
  { title: "Labs", href: "/docs/labs/permissions-lab" },
  { title: "Cheatsheets", href: "/docs/cheatsheets/core-commands" },
]
