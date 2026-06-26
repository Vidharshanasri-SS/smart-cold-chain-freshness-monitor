import Link from "next/link"
import {
  Activity as ActivityIcon,
  AlertTriangle,
  Bot,
  Cherry,
  Clock,
  Radio,
  ShieldCheck,
  Truck,
  Warehouse,
} from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendArea, DonutChart, CHART } from "@/components/charts"
import { ConditionBadge } from "@/components/condition-badge"
import { activities, dashboardStats, trendSeries } from "@/lib/data"

const icons = [Radio, Truck, Warehouse, Clock, ShieldCheck, AlertTriangle]

const dotColor: Record<string, string> = {
  info: "bg-primary",
  warning: "bg-warning",
  success: "bg-success",
  critical: "bg-destructive",
}

const freshnessDist = [
  { name: "Optimal", value: 58, color: CHART.primary },
  { name: "Caution", value: 28, color: CHART.amber },
  { name: "Critical", value: 14, color: CHART.red },
]

const quickLinks = [
  { href: "/predictions", label: "AI Predictions", icon: Bot },
  { href: "/freshness", label: "Freshness Analysis", icon: Cherry },
  { href: "/monitoring", label: "Live Monitoring", icon: Radio },
  { href: "/alerts", label: "Alerts", icon: AlertTriangle },
]

export default function DashboardPage() {
  "use client"

import { useEffect, useState } from "react";

export default function DashboardPage() {

  const [sensor, setSensor] = useState({
    temperature: 0,
    humidity: 0,
    mq135: 0,
    sgp40: 0,
    foodStatus: "Loading...",
  });

  useEffect(() => {
    const loadSensor = async () => {
      const res = await fetch("/api/sensor");
      const data = await res.json();
      setSensor(data);
    };

    loadSensor();

    const interval = setInterval(loadSensor, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <PageHeader
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

  <Card>
    <CardHeader>
      <CardTitle>🌡 Temperature</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">{sensor.temperature} °C</p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>💧 Humidity</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">{sensor.humidity} %</p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>🟢 MQ135</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">{sensor.mq135}</p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>🌫 SGP40</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">{sensor.sgp40}</p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>🍎 Food Status</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">{sensor.foodStatus}</p>
    </CardContent>
  </Card>

</div>
        title="Dashboard"
        description="System overview across your fleet, warehouses, and sensor network."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardStats.map((s, i) => (
          <StatCard key={s.label} {...s} icon={icons[i]} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Produce Protected (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendArea data={trendSeries(48, 12, 6)} unit="t" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Freshness Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart data={freshnessDist} />
            <div className="mt-2 space-y-1.5">
              {freshnessDist.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                    {d.name}
                  </span>
                  <span className="font-medium">{d.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ActivityIcon className="h-4 w-4 text-primary" /> Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {activities.map((a) => (
              <div key={a.id} className="flex items-start gap-3 rounded-lg px-1 py-2.5">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotColor[a.type]}`} />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{a.message}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <SummaryRow label="Network Health" value="Healthy" badge="Optimal" />
              <SummaryRow label="Cold-Chain Compliance" value="98.4%" />
              <SummaryRow label="Sensors Reporting" value="210 / 224" />
              <SummaryRow label="Open Incidents" value="4" badge="Caution" />
            </div>
            <div className="border-t border-border pt-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground">Quick Access</p>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((q) => {
                  const Icon = q.icon
                  return (
                    <Link
                      key={q.href}
                      href={q.href}
                      className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-medium hover:bg-secondary"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      {q.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

function SummaryRow({
  label,
  value,
  badge,
}: {
  label: string
  value: string
  badge?: string
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      {badge ? (
        <ConditionBadge status={badge} />
      ) : (
        <span className="font-semibold">{value}</span>
      )}
    </div>
  )
}
