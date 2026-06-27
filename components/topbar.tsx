"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Radio,
  Search,
  Truck,
  User,
  Warehouse,
  X,
} from "lucide-react"
import { sensorNodes, trucks, warehouses, alerts } from "@/lib/data"
import { cn } from "@/lib/utils"

type Result = { label: string; sub: string; href: string; icon: typeof Truck }

const mobileNav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/fleet", label: "Fleet & Transport" },
  { href: "/warehouses", label: "Warehouses" },
  { href: "/monitoring", label: "Live Monitoring" },
  { href: "/freshness", label: "Freshness Analysis" },
  { href: "/predictions", label: "AI Predictions" },
  { href: "/alerts", label: "Alerts" },
  { href: "/reports", label: "Reports" },
  { href: "/settings", label: "Settings" },
]

export function TopBar() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [bellOpen, setBellOpen] = useState(false)

  const index: Result[] = useMemo(
    () => [
      ...trucks.map((t) => ({ label: `${t.name} (${t.id})`, sub: t.location, href: `/fleet/${t.id}`, icon: Truck })),
      ...warehouses.map((w) => ({ label: w.name, sub: w.location, href: `/warehouses/${w.id}`, icon: Warehouse })),
      ...sensorNodes.map((n) => ({ label: `${n.name} (${n.id})`, sub: n.location, href: `/monitoring/${n.id}`, icon: Radio })),
    ],
    [],
  )

  const results = query.trim()
    ? index.filter((r) => (r.label + r.sub).toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : []

  const unread = alerts.filter((a) => a.severity !== "Resolved").length

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur lg:px-6">
      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-secondary lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowResults(true)
          }}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 150)}
          placeholder="Search trucks, warehouses, sensor nodes..."
          className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
        {showResults && results.length > 0 ? (
          <div className="absolute left-0 right-0 top-11 overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
            {results.map((r) => {
              const Icon = r.icon
              return (
                <Link
                  key={r.href}
                  href={r.href}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-secondary"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="flex-1">
                    <span className="font-medium">{r.label}</span>
                    <span className="block text-xs text-muted-foreground">{r.sub}</span>
                  </span>
                </Link>
              )
            })}
          </div>
        ) : null}
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        {/* Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setBellOpen((v) => !v)
              setProfileOpen(false)
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-secondary"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unread > 0 ? (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {unread}
              </span>
            ) : null}
          </button>
          {bellOpen ? (
            <div className="absolute right-0 top-11 w-80 overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
              <div className="border-b border-border px-4 py-2.5 text-sm font-semibold">Notifications</div>
              {alerts.slice(0, 4).map((a) => (
                <Link
                  key={a.id}
                  href="/alerts"
                  onClick={() => setBellOpen(false)}
                  className="block border-b border-border px-4 py-2.5 last:border-0 hover:bg-secondary"
                >
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.location} · {a.timestamp.split(" ")[1]}</p>
                </Link>
              ))}
              <Link href="/alerts" onClick={() => setBellOpen(false)} className="block px-4 py-2.5 text-center text-sm font-medium text-primary hover:bg-secondary">
                View all alerts
              </Link>
            </div>
          ) : null}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setProfileOpen((v) => !v)
              setBellOpen(false)
            }}
            className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-secondary"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              DR
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-sm font-medium">Vidharshana sri</span>
              <span className="block text-xs text-muted-foreground">Admin</span>
            </span>
            <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
          </button>
          {profileOpen ? (
            <div className="absolute right-0 top-12 w-48 overflow-hidden rounded-lg border border-border bg-popover py-1 shadow-lg">
              <Link href="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary">
                <User className="h-4 w-4" /> Profile
              </Link>
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-secondary"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Mobile nav drawer */}
      {menuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64 bg-sidebar p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-bold">FoodFresh AI</span>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {mobileNav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent",
                  )}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  )
}
