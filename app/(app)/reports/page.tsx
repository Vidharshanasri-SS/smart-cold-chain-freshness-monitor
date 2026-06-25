"use client"

import { useState } from "react"
import { Calendar, Download, FileSpreadsheet, FileText, Printer } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarStat, CHART } from "@/components/charts"
import { batches, trucks, warehouses } from "@/lib/data"
import { cn } from "@/lib/utils"

const periods = ["Daily", "Weekly", "Monthly"] as const
type Period = (typeof periods)[number]

const reportRows = [
  { metric: "Produce Protected (tons)", daily: "42.6", weekly: "298.4", monthly: "1,240.8" },
  { metric: "Cold-Chain Compliance (%)", daily: "98.4", weekly: "97.9", monthly: "98.1" },
  { metric: "Avg Shelf Life (days)", daily: "3.8", weekly: "3.6", monthly: "3.7" },
  { metric: "Critical Alerts", daily: "2", weekly: "11", monthly: "38" },
  { metric: "Spoilage Prevented (tons)", daily: "1.9", weekly: "12.4", monthly: "51.2" },
]

export default function ReportsPage() {
  const [period, setPeriod] = useState<Period>("Weekly")
  const key = period.toLowerCase() as "daily" | "weekly" | "monthly"

  function exportCSV() {
    const header = ["Metric", period]
    const lines = reportRows.map((r) => `${r.metric},${r[key]}`)
    const csv = [header.join(","), ...lines].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `foodfresh-${key}-report.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const chart = warehouses.map((w) => ({ t: w.name.split(" ")[0], value: w.utilization }))

  return (
    <>
      <PageHeader
        title="Reports"
        description="Generate and export operational reports across the monitoring network."
        action={
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-secondary"
            >
              <FileText className="h-4 w-4" /> PDF Export
            </button>
            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-success"
            >
              <FileSpreadsheet className="h-4 w-4" /> CSV Export
            </button>
          </div>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        {periods.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPeriod(p)}
            className={cn(
              "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
              period === p
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:bg-secondary",
            )}
          >
            {p} Report
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>{period} Summary</CardTitle>
            <Printer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary text-left text-secondary-foreground">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Metric</th>
                    <th className="px-4 py-2.5 text-right font-medium">{period} Value</th>
                  </tr>
                </thead>
                <tbody>
                  {reportRows.map((r, i) => (
                    <tr key={r.metric} className={i % 2 ? "bg-card" : "bg-muted/40"}>
                      <td className="px-4 py-2.5">{r.metric}</td>
                      <td className="px-4 py-2.5 text-right font-semibold">{r[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Warehouse Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <BarStat data={chart} unit="%" color={CHART.primary} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Generated Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {[
            { name: `${period} Operations Report`, date: "2026-06-25", size: "1.2 MB" },
            { name: "Cold-Chain Compliance Audit", date: "2026-06-24", size: "880 KB" },
            { name: "Fleet Performance Summary", date: "2026-06-22", size: "1.6 MB" },
            { name: "Spoilage Prevention Report", date: "2026-06-20", size: "740 KB" },
          ].map((r) => (
            <div key={r.name} className="flex items-center justify-between border-b border-border py-3 last:border-0">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.date} · {r.size}</p>
                </div>
              </div>
              <button type="button" className="text-muted-foreground hover:text-primary" aria-label="Download report">
                <Download className="h-4 w-4" />
              </button>
            </div>
          ))}
          <p className="pt-2 text-xs text-muted-foreground">
            Covering {trucks.length} transport units, {warehouses.length} warehouses, and {batches.length} active batches.
          </p>
        </CardContent>
      </Card>
    </>
  )
}
