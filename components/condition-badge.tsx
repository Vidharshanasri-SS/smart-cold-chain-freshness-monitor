import { cn } from "@/lib/utils"

const styles: Record<string, string> = {
  Optimal: "bg-secondary text-success-foreground border-transparent",
  Online: "bg-secondary text-success-foreground border-transparent",
  Active: "bg-secondary text-success-foreground border-transparent",
  Resolved: "bg-secondary text-success-foreground border-transparent",
  Caution: "bg-[#fdf3dd] text-warning-foreground border-transparent",
  Warning: "bg-[#fdf3dd] text-warning-foreground border-transparent",
  Degraded: "bg-[#fdf3dd] text-warning-foreground border-transparent",
  Invited: "bg-[#fdf3dd] text-warning-foreground border-transparent",
  Critical: "bg-[#fde4e3] text-destructive border-transparent",
  Offline: "bg-muted text-muted-foreground border-transparent",
}

const dot: Record<string, string> = {
  Optimal: "bg-success",
  Online: "bg-success",
  Active: "bg-success",
  Resolved: "bg-success",
  Caution: "bg-warning",
  Warning: "bg-warning",
  Degraded: "bg-warning",
  Invited: "bg-warning",
  Critical: "bg-destructive",
  Offline: "bg-muted-foreground",
}

export function ConditionBadge({
  status,
  className,
}: {
  status: string
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[status] ?? "bg-muted text-muted-foreground border-transparent",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dot[status] ?? "bg-muted-foreground")} />
      {status}
    </span>
  )
}
