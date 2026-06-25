"use client"

import { useState } from "react"
import { AlertOctagon, AlertTriangle, CheckCircle2, Clock, MapPin } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { StatCard } from "@/components/stat-card"
import { ConditionBadge } from "@/components/condition-badge"
import { alerts } from "@/lib/data"
import { cn } from "@/lib/utils"

const tabs = ["All", "Critical", "Warning", "Resolved"] as const
type Tab = (typeof tabs)[number]

const icon = {
  Critical: AlertOctagon,
  Warning: AlertTriangle,
  Resolved: CheckCircle2,
}

const iconTone = {
  Critical: "text-destructive bg-[#fde4e3]",
  Warning: "text-warning bg-[#fdf3dd]",
  Resolved: "text-success bg-secondary",
}

export default function AlertsPage() {
  const [tab, setTab] = useState<Tab>("All")
  const filtered = tab === "All" ? alerts : alerts.filter((a) => a.severity === tab)

  const counts = {
    Critical: alerts.filter((a) => a.severity === "Critical").length,
    Warning: alerts.filter((a) => a.severity === "Warning").length,
    Resolved: alerts.filter((a) => a.severity === "Resolved").length,
  }

  return (
    <>
      <PageHeader
        title="Alerts"
        description="Centralized alert management across fleet, warehouses, and sensor nodes."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Critical" value={`${counts.Critical}`} sub="immediate action" icon={AlertOctagon} />
        <StatCard label="Warning" value={`${counts.Warning}`} sub="monitor closely" icon={AlertTriangle} />
        <StatCard label="Resolved" value={`${counts.Resolved}`} sub="last 24h" icon={CheckCircle2} />
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
              tab === t
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-secondary",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((a) => {
          const Icon = icon[a.severity]
          return (
            <Card key={a.id}>
              <CardContent className="flex items-start gap-4 p-4">
                <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", iconTone[a.severity])}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold">{a.title}</p>
                    <ConditionBadge status={a.severity} />
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{a.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {a.location}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {a.timestamp}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-sm text-muted-foreground">
              No {tab.toLowerCase()} alerts.
            </CardContent>
          </Card>
        ) : null}
      </div>
    </>
  )
}
