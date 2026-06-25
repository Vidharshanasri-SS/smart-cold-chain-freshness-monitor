import Link from "next/link"
import { ArrowRight, Boxes, MapPin, Radio, Warehouse as WarehouseIcon } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { ConditionBadge } from "@/components/condition-badge"
import { warehouses } from "@/lib/data"

export default function WarehousesPage() {
  return (
    <>
      <PageHeader
        title="Warehouses"
        description="Cold storage facilities and their real-time operating conditions."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {warehouses.map((w) => (
          <Link key={w.id} href={`/warehouses/${w.id}`} className="group">
            <Card className="h-full p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary">
                    <WarehouseIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold leading-tight text-balance">{w.name}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {w.location}
                    </p>
                  </div>
                </div>
                <ConditionBadge status={w.condition} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Boxes className="h-4 w-4" /> {w.capacity}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Radio className="h-4 w-4" /> {w.activeNodes}/{w.totalNodes} nodes
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                  <span>Capacity utilization</span>
                  <span>{w.utilization}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${w.utilization}%` }} />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm font-medium text-primary">
                <span>View details</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
