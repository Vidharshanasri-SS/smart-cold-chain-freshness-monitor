import { Droplets, MapPin, Thermometer } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConditionBadge } from "@/components/condition-badge"
import { BarStat, CHART } from "@/components/charts"
import { batches } from "@/lib/data"

function scoreColor(score: number) {
  if (score >= 75) return CHART.primary
  if (score >= 55) return CHART.amber
  return CHART.red
}

export default function FreshnessPage() {
  const chartData = batches.map((b) => ({ t: b.produce.split(" ")[0], value: b.freshnessScore }))

  return (
    <>
      <PageHeader
        title="Freshness Analysis"
        description="Per-batch freshness scoring and storage condition assessment."
      />

      <Card>
        <CardHeader>
          <CardTitle>Freshness Score by Batch</CardTitle>
        </CardHeader>
        <CardContent>
          <BarStat data={chartData} unit="%" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {batches.map((b) => (
          <Card key={b.id} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold leading-tight">{b.produce}</p>
                <p className="text-xs text-muted-foreground">{b.id} · {b.quantity}</p>
              </div>
              <ConditionBadge status={b.status} />
            </div>

            <div className="mt-4 flex items-end gap-3">
              <span className="text-3xl font-bold" style={{ color: scoreColor(b.freshnessScore) }}>
                {b.freshnessScore}
              </span>
              <span className="pb-1 text-xs text-muted-foreground">freshness score</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full"
                style={{ width: `${b.freshnessScore}%`, background: scoreColor(b.freshnessScore) }}
              />
            </div>

            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Shelf life remaining</span>
                <span className="font-semibold">{b.shelfLifeRemaining}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" /> {b.location}
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1.5"><Thermometer className="h-4 w-4" /> {b.storageTemp}°C</span>
                <span className="flex items-center gap-1.5"><Droplets className="h-4 w-4" /> {b.storageHumidity}%</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
