"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, GitBranch, Users, Settings, BarChart3, UserPlus, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Pipestreams", href: "/pipestreams", icon: GitBranch },
  { name: "Hierarchies", href: "/hierarchies", icon: Users },
  { name: "Team", href: "/team", icon: UserPlus },
  { name: "Roles", href: "/roles", icon: Shield },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-strong border-r border-white/10 p-6 z-50">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Pipestream</h1>
        <p className="text-sm text-white/60">Feedback Pipeline</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                isActive
                  ? "glass-strong text-white glow"
                  : "text-white/70 hover:glass hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
