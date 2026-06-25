import type { ReactNode } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/topbar"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <TopBar />
        <main className="mx-auto max-w-7xl space-y-6 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
