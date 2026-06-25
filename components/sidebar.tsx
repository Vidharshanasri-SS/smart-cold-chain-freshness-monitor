"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  AlertTriangle,
  BarChart3,
  Bot,
  Cherry,
  LayoutDashboard,
  Leaf,
  Radio,
  Settings,
  Truck,
  Warehouse,
} from "lucide-react"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/fleet", label: "Fleet & Transport", icon: Truck },
  { href: "/warehouses", label: "Warehouses", icon: Warehouse },
  { href: "/monitoring", label: "Live Monitoring", icon: Radio },
  { href: "/freshness", label: "Freshness Analysis", icon: Cherry },
  { href: "/predictions", label: "AI Predictions", icon: Bot },
  { href: "/alerts", label: "Alerts", icon: AlertTriangle },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Leaf className="h-5 w-5" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-sidebar-foreground">FoodFresh</p>
          <p className="text-xs text-muted-foreground">AI Monitor</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {nav.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/")
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-lg bg-card p-3 text-xs text-muted-foreground shadow-sm">
          <p className="font-semibold text-card-foreground">System Healthy</p>
          <p className="mt-0.5">210 / 224 nodes reporting</p>
        </div>
      </div>
    </aside>
  )
}
