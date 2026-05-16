import type { Metadata } from "next"
import { JetBrains_Mono, Space_Grotesk } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const fontSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'})

export const metadata: Metadata = {
  metadataBase: new URL("https://unix.abhrajoyti.me"),
  title: {
    default: "Unix & Shell Docs",
    template: "%s | Unix & Shell Docs",
  },
  description:
    "Production-grade Unix and shell documentation: commands, scripting, labs, and operational playbooks.",
  applicationName: "Unix & Shell Docs",
  keywords: [
    "unix",
    "shell",
    "bash",
    "linux",
    "commands",
    "administration",
    "scripting",
    "processes",
    "networking",
  ],
  openGraph: {
    title: "Unix & Shell Docs",
    description:
      "Production-grade Unix and shell documentation: commands, scripting, labs, and operational playbooks.",
    url: "https://unix.abhrajoyti.me",
    siteName: "Unix & Shell Docs",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://unix.abhrajoyti.me",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontSans.variable, "font-mono", jetbrainsMono.variable)}
    >
      <body
        className="min-h-svh bg-background text-foreground"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
