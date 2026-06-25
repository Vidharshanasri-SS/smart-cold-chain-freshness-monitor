import Link from "next/link"
import { ArrowRight, MapPin, Truck, User } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { ConditionBadge } from "@/components/condition-badge"
import { trucks } from "@/lib/data"

const statusTone: Record<string, string> = {
  "In Transit": "Optimal",
  Loading: "Caution",
  Idle: "Offline",
  Maintenance: "Warning",
}

export default function FleetPage() {
  return (
    <>
      <PageHeader
        title="Fleet & Transport"
        description="Live status of every refrigerated transport unit in your network."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {trucks.map((t) => (
          <Link key={t.id} href={`/fleet/${t.id}`} className="group">
            <Card className="h-full p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Truck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold leading-tight">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.id}</p>
                  </div>
                </div>
                <ConditionBadge status={statusTone[t.status]} />
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" /> {t.driver}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {t.location}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="text-xs text-muted-foreground">Shelf Life</p>
                  <p className="text-sm font-semibold">{t.shelfLife}</p>
                </div>
                <ConditionBadge status={t.shelfLifeStatus} />
              </div>

              <div className="mt-4 flex items-center justify-between text-sm font-medium text-primary">
                <span>{t.status}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
