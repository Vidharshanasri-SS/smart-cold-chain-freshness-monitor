import {
  ArrowUpRight,
  Bot,
  Lightbulb,
  ShieldAlert,
  Sparkles,
  TrendingDown,
} from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConditionBadge } from "@/components/condition-badge"
import { MultiLine, CHART } from "@/components/charts"
import { predictions, trendSeries } from "@/lib/data"

const forecast = trendSeries(6, 12, 0.6).map((d, i) => ({
  t: `D${i + 1}`,
  predicted: +(6 - i * 0.42).toFixed(1),
  actual: i < 5 ? +(6 - i * 0.38).toFixed(1) : Number.NaN,
}))

export default function PredictionsPage() {
  const critical = predictions.filter((p) => p.riskLevel === "Critical").length
  const avgConfidence = Math.round(
    predictions.reduce((a, p) => a + p.confidence, 0) / predictions.length,
  )

  return (
    <>
      <PageHeader
        title="AI Predictions"
        description="Machine-learning shelf-life forecasts, risk scoring, and recommended interventions."
        action={
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">
            <Sparkles className="h-4 w-4 text-primary" /> Model v4.2 · live
          </span>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Batches Analyzed" value={`${predictions.length}`} sub="active forecasts" icon={Bot} />
        <StatCard label="Critical Risk" value={`${critical}`} sub="require action" trend="urgent" icon={ShieldAlert} />
        <StatCard label="Avg Confidence" value={`${avgConfidence}%`} sub="across predictions" icon={Sparkles} />
        <StatCard label="Avg Shelf Life" value="2.9 d" sub="predicted mean" trend="-0.5 d" icon={TrendingDown} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Predicted vs Actual Shelf Life Decay</CardTitle>
        </CardHeader>
        <CardContent>
          <MultiLine
            data={forecast}
            lines={[
              { key: "actual", color: CHART.primary, label: "Observed" },
              { key: "predicted", color: CHART.amber, label: "AI Predicted" },
            ]}
            height={280}
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Active Predictions</h2>
        {predictions.map((p) => (
          <Card key={p.id} className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-4">
              {/* Left identity */}
              <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{p.produce}</p>
                  <ConditionBadge status={p.riskLevel} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{p.batch} · {p.location}</p>
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground">Predicted Shelf Life</p>
                  <p className="text-2xl font-bold">{p.predictedShelfLife}</p>
                </div>
              </div>

              {/* Cause + confidence */}
              <div className="border-b border-border p-5 lg:col-span-2 lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <ShieldAlert className="h-4 w-4 text-warning" /> Primary Cause
                </div>
                <p className="mt-1 text-sm text-foreground">{p.primaryCause}</p>

                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">AI Confidence</span>
                    <span className="font-semibold">{p.confidence}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${p.confidence}%` }} />
                  </div>
                </div>
              </div>

              {/* Recommended action */}
              <div className="bg-secondary/50 p-5">
                <div className="flex items-center gap-2 text-sm font-medium text-secondary-foreground">
                  <Lightbulb className="h-4 w-4 text-primary" /> Recommended Action
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">{p.recommendedAction}</p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-success"
                >
                  Apply Action <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
