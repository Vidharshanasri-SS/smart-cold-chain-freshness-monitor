import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

export function StatCard({
  label,
  value,
  sub,
  trend,
  icon: Icon,
}: {
  label: string
  value: string
  sub?: string
  trend?: string
  icon?: LucideIcon
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
        </div>
        {Icon ? (
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
            <Icon className="h-5 w-5" />
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        {sub ? <span className="text-muted-foreground">{sub}</span> : <span />}
        {trend ? (
          <span className="font-medium text-secondary-foreground">{trend}</span>
        ) : null}
      </div>
    </Card>
  )
}
