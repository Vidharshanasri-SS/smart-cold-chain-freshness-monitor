import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  BatteryMedium,
  Droplets,
  Gauge,
  Signal,
  Sprout,
  Thermometer,
  Wind,
} from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricTile } from "@/components/metric-tile"
import { ConditionBadge } from "@/components/condition-badge"
import { MultiLine, TrendArea, CHART } from "@/components/charts"
import { getNode, sensorNodes, trendSeries } from "@/lib/data"

export function generateStaticParams() {
  return sensorNodes.map((n) => ({ id: n.id }))
}

export default async function NodeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const node = getNode(id)
  if (!node) notFound()

  const combined = trendSeries(node.temperature, 12, 1).map((d, i) => ({
    t: d.t,
    temp: d.value,
    produce: +(node.produceTemp + Math.sin(i / 2) * 0.8).toFixed(1),
    humidity: +(node.humidity + Math.cos(i / 2) * 2).toFixed(1),
  }))

  return (
    <>
      <Link
        href="/monitoring"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Live Monitoring
      </Link>

      <PageHeader
        title={`${node.name} · ${node.id}`}
        description={`${node.location} · ${node.zone}`}
        action={<ConditionBadge status={node.status} />}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        <MetricTile label="Temperature" value={node.temperature} unit="°C" icon={Thermometer} />
        <MetricTile label="Humidity" value={node.humidity} unit="%" icon={Droplets} />
        <MetricTile label="CO₂" value={node.co2} unit="ppm" icon={Wind} />
        <MetricTile label="Ethylene" value={node.ethylene} unit="ppm" icon={Gauge} />
        <MetricTile label="Battery" value={node.battery} unit="%" icon={BatteryMedium} />
        <MetricTile label="Signal" value={node.signal} unit="%" icon={Signal} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Temperature vs Produce Temp (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <MultiLine
              data={combined}
              lines={[
                { key: "temp", color: CHART.primary, label: "Ambient °C" },
                { key: "produce", color: CHART.amber, label: "Produce °C" },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Humidity Trend (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendArea data={trendSeries(node.humidity, 12, 2)} unit="%" color={CHART.green} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center gap-2">
          <Sprout className="h-4 w-4 text-primary" />
          <CardTitle>CO₂ &amp; Gas Composition (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <TrendArea data={trendSeries(node.co2, 12, 30)} unit="ppm" color={CHART.primary} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reading Log</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {combined.slice(0, 6).map((r) => (
            <div key={r.t} className="flex items-center justify-between border-b border-border py-2 text-sm last:border-0">
              <span className="font-mono text-xs text-muted-foreground">{r.t}</span>
              <span>Ambient {r.temp}°C</span>
              <span>Produce {r.produce}°C</span>
              <span>Humidity {r.humidity}%</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}
