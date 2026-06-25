"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BatteryMedium,
  Droplets,
  Gauge,
  Radio,
  Signal,
  Sprout,
  Thermometer,
  Wind,
} from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricTile } from "@/components/metric-tile"
import { ConditionBadge } from "@/components/condition-badge"
import { TrendArea, CHART } from "@/components/charts"
import { sensorNodes, trendSeries } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function MonitoringPage() {
  const [selectedId, setSelectedId] = useState(sensorNodes[0].id)
  const node = sensorNodes.find((n) => n.id === selectedId)!

  return (
    <>
      <PageHeader
        title="Live Monitoring"
        description="Real-time sensor readings across all deployed nodes. Select a node to inspect."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Node list */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Sensor Nodes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {sensorNodes.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelectedId(n.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left transition-colors",
                  n.id === selectedId
                    ? "border-primary bg-secondary"
                    : "border-border bg-card hover:bg-secondary",
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Radio className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{n.name}</p>
                    <p className="text-xs text-muted-foreground">{n.location}</p>
                  </div>
                </div>
                <ConditionBadge status={n.status} />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Selected node live data */}
        <div className="space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{node.name}</h2>
              <p className="text-sm text-muted-foreground">{node.location} · {node.zone}</p>
            </div>
            <Link
              href={`/monitoring/${node.id}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-success"
            >
              Full History <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {node.status === "Offline" ? (
            <Card>
              <CardContent className="py-12 text-center text-sm text-muted-foreground">
                This node is currently offline. Last reading unavailable.
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <MetricTile label="Temperature" value={node.temperature} unit="°C" icon={Thermometer} />
                <MetricTile label="Humidity" value={node.humidity} unit="%" icon={Droplets} />
                <MetricTile label="CO₂" value={node.co2} unit="ppm" icon={Wind} tone={node.co2 > 600 ? "warning" : "default"} />
                <MetricTile label="Ethylene" value={node.ethylene} unit="ppm" icon={Gauge} tone={node.ethylene > 2 ? "critical" : "default"} />
                <MetricTile label="Produce Temp" value={node.produceTemp} unit="°C" icon={Sprout} />
                <MetricTile label="Battery" value={node.battery} unit="%" icon={BatteryMedium} tone={node.battery < 55 ? "warning" : "default"} />
                <MetricTile label="Signal" value={node.signal} unit="%" icon={Signal} />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Temperature (Live · 24h)</CardTitle>
                </CardHeader>
                <CardContent>
                  <TrendArea data={trendSeries(node.temperature, 12, 1)} unit="°C" color={CHART.primary} />
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </>
  )
}
