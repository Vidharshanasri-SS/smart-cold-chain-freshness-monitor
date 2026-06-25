import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

export function MetricTile({
  label,
  value,
  unit,
  icon: Icon,
  tone = "default",
}: {
  label: string
  value: string | number
  unit?: string
  icon: LucideIcon
  tone?: "default" | "warning" | "critical"
}) {
  const toneClass =
    tone === "critical"
      ? "text-destructive"
      : tone === "warning"
        ? "text-warning"
        : "text-primary"
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className={`h-4 w-4 ${toneClass}`} />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-bold tracking-tight">
        {value}
        {unit ? <span className="ml-1 text-sm font-medium text-muted-foreground">{unit}</span> : null}
      </p>
    </Card>
  )
}
