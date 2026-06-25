"use client"

import { useState } from "react"
import { Bell, Cpu, Plus, Radio, SlidersHorizontal, Users } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConditionBadge } from "@/components/condition-badge"
import { users } from "@/lib/data"
import { cn } from "@/lib/utils"

const sections = [
  { id: "users", label: "User Management", icon: Users },
  { id: "thresholds", label: "Alert Thresholds", icon: SlidersHorizontal },
  { id: "sensors", label: "Sensor Settings", icon: Radio },
  { id: "gateway", label: "Gateway Settings", icon: Cpu },
  { id: "notifications", label: "Notification Preferences", icon: Bell },
] as const

const roles = ["Admin", "Warehouse Manager", "Fleet Manager", "Viewer"]

function Toggle({ defaultOn = false, label }: { defaultOn?: boolean; label: string }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-sm">{label}</span>
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          on ? "bg-primary" : "bg-muted",
        )}
        aria-pressed={on}
        aria-label={label}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-transform",
            on ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  )
}

function Field({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="flex items-center gap-2">
        <input
          defaultValue={value}
          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
        {unit ? <span className="text-sm text-muted-foreground">{unit}</span> : null}
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const [active, setActive] = useState<(typeof sections)[number]["id"]>("users")

  return (
    <>
      <PageHeader title="Settings" description="Manage users, thresholds, sensors, gateways, and notifications." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Section nav */}
        <Card className="h-fit p-2 lg:col-span-1">
          {sections.map((s) => {
            const Icon = s.icon
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                  active === s.id ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/60",
                )}
              >
                <Icon className="h-4 w-4 text-primary" />
                {s.label}
              </button>
            )
          })}
        </Card>

        <div className="lg:col-span-3">
          {active === "users" ? (
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>User Management</CardTitle>
                <button type="button" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-success">
                  <Plus className="h-4 w-4" /> Invite User
                </button>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary text-left text-secondary-foreground">
                      <tr>
                        <th className="px-4 py-2.5 font-medium">Name</th>
                        <th className="px-4 py-2.5 font-medium">Role</th>
                        <th className="px-4 py-2.5 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className="border-t border-border">
                          <td className="px-4 py-3">
                            <p className="font-medium">{u.name}</p>
                            <p className="text-xs text-muted-foreground">{u.email}</p>
                          </td>
                          <td className="px-4 py-3">
                            <select
                              defaultValue={u.role}
                              className="rounded-lg border border-input bg-background px-2 py-1.5 text-sm outline-none focus:border-ring"
                            >
                              {roles.map((r) => (
                                <option key={r}>{r}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <ConditionBadge status={u.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Roles: Admin · Warehouse Manager · Fleet Manager · Viewer
                </p>
              </CardContent>
            </Card>
          ) : null}

          {active === "thresholds" ? (
            <Card>
              <CardHeader>
                <CardTitle>Alert Thresholds</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Max Temperature" value="8" unit="°C" />
                <Field label="Min Temperature" value="0" unit="°C" />
                <Field label="Max Humidity" value="92" unit="%" />
                <Field label="Max CO₂" value="650" unit="ppm" />
                <Field label="Max Ethylene" value="2.0" unit="ppm" />
                <Field label="Low Battery Warning" value="55" unit="%" />
              </CardContent>
            </Card>
          ) : null}

          {active === "sensors" ? (
            <Card>
              <CardHeader>
                <CardTitle>Sensor Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <Field label="Reading Interval" value="60" unit="seconds" />
                <div className="mt-4 divide-y divide-border">
                  <Toggle defaultOn label="Enable produce temperature probe" />
                  <Toggle defaultOn label="Auto-calibrate gas sensors" />
                  <Toggle label="High-frequency mode (10s)" />
                  <Toggle defaultOn label="Offline buffering" />
                </div>
              </CardContent>
            </Card>
          ) : null}

          {active === "gateway" ? (
            <Card>
              <CardHeader>
                <CardTitle>Gateway Settings</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Gateway ID" value="GW-PRIMARY-01" />
                <Field label="Uplink Protocol" value="LoRaWAN + LTE" />
                <Field label="Heartbeat Interval" value="30" unit="seconds" />
                <Field label="Data Retention" value="180" unit="days" />
                <div className="sm:col-span-2 divide-y divide-border">
                  <Toggle defaultOn label="Failover to cellular" />
                  <Toggle defaultOn label="Edge anomaly detection" />
                </div>
              </CardContent>
            </Card>
          ) : null}

          {active === "notifications" ? (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-border">
                <Toggle defaultOn label="Email notifications" />
                <Toggle defaultOn label="SMS for critical alerts" />
                <Toggle label="Push notifications" />
                <Toggle defaultOn label="Daily summary digest" />
                <Toggle label="Weekly performance report" />
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </>
  )
}
