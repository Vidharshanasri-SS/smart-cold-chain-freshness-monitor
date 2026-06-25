import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Boxes, Droplets, Radio, Thermometer } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricTile } from "@/components/metric-tile"
import { ConditionBadge } from "@/components/condition-badge"
import { BarStat, DonutChart, CHART } from "@/components/charts"
import { getWarehouse, warehouses } from "@/lib/data"

export function generateStaticParams() {
  return warehouses.map((w) => ({ id: w.id }))
}

const heatTone: Record<string, string> = {
  Optimal: "bg-primary/80 text-primary-foreground",
  Caution: "bg-warning/80 text-warning-foreground",
  Critical: "bg-destructive/80 text-destructive-foreground",
}

export default async function WarehouseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const wh = getWarehouse(id)
  if (!wh) notFound()

  // 6x4 heatmap grid derived from zones
  const grid = Array.from({ length: 24 }, (_, i) => {
    const zone = wh.zones[i % wh.zones.length]
    return { id: i, condition: zone.condition, temp: +(zone.temp + (i % 3) * 0.4).toFixed(1) }
  })

  const shelfLifeDist = [
    { name: "5+ days", value: 42, color: CHART.primary },
    { name: "2-5 days", value: 34, color: CHART.amber },
    { name: "< 2 days", value: 24, color: CHART.red },
  ]

  const zoneTemps = wh.zones.map((z) => ({ t: z.name.split("·")[1]?.trim() ?? z.name, value: z.temp }))

  return (
    <>
      <Link
        href="/warehouses"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Warehouses
      </Link>

      <PageHeader
        title={wh.name}
        description={`${wh.location} · ${wh.capacity}`}
        action={<ConditionBadge status={wh.condition} />}
      />

      {/* Storage overview */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MetricTile label="Avg Temperature" value={wh.temperature} unit="°C" icon={Thermometer} />
        <MetricTile label="Avg Humidity" value={wh.humidity} unit="%" icon={Droplets} />
        <MetricTile label="Active Nodes" value={`${wh.activeNodes}/${wh.totalNodes}`} icon={Radio} />
        <MetricTile label="Utilization" value={wh.utilization} unit="%" icon={Boxes} tone={wh.utilization > 90 ? "warning" : "default"} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Heatmap */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Facility Temperature Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-2">
              {grid.map((cell) => (
                <div
                  key={cell.id}
                  className={`flex aspect-square items-center justify-center rounded-md text-xs font-semibold ${heatTone[cell.condition]}`}
                  title={`${cell.temp}°C · ${cell.condition}`}
                >
                  {cell.temp}
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-primary/80" /> Optimal</span>
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-warning/80" /> Caution</span>
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-destructive/80" /> Critical</span>
            </div>
          </CardContent>
        </Card>

        {/* Shelf life distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Shelf Life Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart data={shelfLifeDist} />
            <div className="mt-2 space-y-1.5">
              {shelfLifeDist.map((d) => (
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sensor nodes / zones */}
        <Card>
          <CardHeader>
            <CardTitle>Sensor Nodes by Zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {wh.zones.map((z) => (
              <div key={z.name} className="flex items-center justify-between border-b border-border py-2.5 last:border-0">
                <div>
                  <p className="text-sm font-medium">{z.name}</p>
                  <p className="text-xs text-muted-foreground">{z.temp}°C · {z.humidity}% RH</p>
                </div>
                <ConditionBadge status={z.condition} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Zone Temperatures</CardTitle>
          </CardHeader>
          <CardContent>
            <BarStat data={zoneTemps} unit="°C" />
          </CardContent>
        </Card>
      </div>

      {/* Active alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          {wh.condition === "Optimal" ? (
            <p className="py-6 text-center text-sm text-muted-foreground">No active alerts for this facility.</p>
          ) : (
            <div className="rounded-lg border border-border p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">
                  {wh.condition === "Critical" ? "Temperature Excursion in Zone D" : "Capacity nearing limit"}
                </p>
                <ConditionBadge status={wh.condition} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Recommended: dispatch technician and rebalance load across cooler zones.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
