import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  BatteryMedium,
  Droplets,
  Gauge,
  Leaf,
  MapPin,
  Signal,
  Thermometer,
  Wind,
} from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricTile } from "@/components/metric-tile"
import { ConditionBadge } from "@/components/condition-badge"
import { MultiLine, CHART } from "@/components/charts"
import { getTruck, trucks, trendSeries } from "@/lib/data"

export function generateStaticParams() {
  return trucks.map((t) => ({ id: t.id }))
}

const routeHistory = [
  { time: "06:10", place: "Departed Watsonville Packing", status: "Optimal" },
  { time: "07:42", place: "Checkpoint · Gilroy Scale", status: "Optimal" },
  { time: "08:55", place: "Rest Stop · Vacaville", status: "Caution" },
  { time: "09:30", place: "Current · Sacramento corridor", status: "Optimal" },
]

export default async function TruckDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const truck = getTruck(id)
  if (!truck) notFound()

  const series = trendSeries(truck.temperature, 12, 1.2).map((d, i) => ({
    t: d.t,
    temp: d.value,
    humidity: +(truck.humidity + Math.sin(i / 2) * 3).toFixed(1),
    co2: +(truck.co2 + i * 8).toFixed(0),
  }))

  return (
    <>
      <Link
        href="/fleet"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Fleet
      </Link>

      <PageHeader
        title={`${truck.name} · ${truck.id}`}
        description={`Driver ${truck.driver} · ${truck.cargo}`}
        action={<ConditionBadge status={truck.shelfLifeStatus} />}
      />

      <Card>
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium">{truck.location}</span>
            <span className="text-muted-foreground">→ {truck.destination}</span>
          </div>
          <div className="flex-1 sm:max-w-xs">
            <div className="mb-1 flex justify-between text-xs text-muted-foreground">
              <span>Route progress</span>
              <span>{truck.progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary" style={{ width: `${truck.progress}%` }} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        <MetricTile label="Temperature" value={truck.temperature} unit="°C" icon={Thermometer} />
        <MetricTile label="Humidity" value={truck.humidity} unit="%" icon={Droplets} />
        <MetricTile label="CO₂" value={truck.co2} unit="ppm" icon={Wind} tone={truck.co2 > 600 ? "warning" : "default"} />
        <MetricTile label="Ethylene" value={truck.ethylene} unit="ppm" icon={Gauge} tone={truck.ethylene > 2 ? "critical" : "default"} />
        <MetricTile label="Battery" value={truck.battery} unit="%" icon={BatteryMedium} tone={truck.battery < 50 ? "warning" : "default"} />
        <MetricTile label="Signal" value={truck.signal} unit="%" icon={Signal} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sensor Trends (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <MultiLine
              data={series}
              lines={[
                { key: "temp", color: CHART.primary, label: "Temp °C" },
                { key: "humidity", color: CHART.green, label: "Humidity %" },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-primary" /> Shelf Life Estimate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg bg-secondary p-4 text-center">
              <p className="text-3xl font-bold text-secondary-foreground">{truck.shelfLife}</p>
              <p className="text-xs text-muted-foreground">remaining at current conditions</p>
            </div>
            <p className="text-sm text-muted-foreground">
              AI estimate based on temperature stability, ethylene exposure, and produce type.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Route History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {routeHistory.map((r) => (
              <div key={r.time} className="flex items-center gap-3 border-b border-border py-2.5 last:border-0">
                <span className="font-mono text-xs text-muted-foreground">{r.time}</span>
                <span className="flex-1 text-sm">{r.place}</span>
                <ConditionBadge status={r.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            {truck.shelfLifeStatus === "Optimal" ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No active alerts. All readings within range.
              </p>
            ) : (
              <div className="space-y-2">
                <div className="rounded-lg border border-border bg-card p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {truck.ethylene > 2 ? "High Ethylene Detected" : "Temperature Drift"}
                    </p>
                    <ConditionBadge status={truck.shelfLifeStatus === "Critical" ? "Critical" : "Warning"} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Recommended: separate ripening produce and verify reefer setpoint.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
