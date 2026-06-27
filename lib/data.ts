// Centralized sample data for FoodFresh AI Monitor

export type Condition = "Optimal" | "Caution" | "Critical"

export type Truck = {
  id: string
  name: string
  driver: string
  status: "In Transit" | "Loading" | "Idle" | "Maintenance"
  location: string
  destination: string
  cargo: string
  shelfLife: string
  shelfLifeStatus: Condition
  temperature: number
  humidity: number
  co2: number
  ethylene: number
  produceTemp: number
  battery: number
  signal: number
  progress: number
}

export type Warehouse = {
  id: string
  name: string
  location: string
  capacity: string
  utilization: number
  activeNodes: number
  totalNodes: number
  condition: Condition
  temperature: number
  humidity: number
  zones: { name: string; temp: number; humidity: number; condition: Condition }[]
}

export type SensorNode = {
  id: string
  name: string
  location: string
  zone: string
  status: "Online" | "Offline" | "Degraded"
  temperature: number
  humidity: number
  co2: number
  ethylene: number
  produceTemp: number
  battery: number
  signal: number
}

export type Batch = {
  id: string
  produce: string
  origin: string
  location: string
  freshnessScore: number
  shelfLifeRemaining: string
  status: Condition
  storageTemp: number
  storageHumidity: number
  quantity: string
}

export type Prediction = {
  id: string
  batch: string
  produce: string
  location: string
  predictedShelfLife: string
  riskLevel: Condition
  primaryCause: string
  confidence: number
  recommendedAction: string
}

export type Alert = {
  id: string
  title: string
  description: string
  severity: "Critical" | "Warning" | "Resolved"
  location: string
  timestamp: string
}

export type Activity = {
  id: string
  message: string
  time: string
  type: "info" | "warning" | "success" | "critical"
}

export const trucks: Truck[] 

export const warehouses: Warehouse[] 

export const sensorNodes = [
  {
    id: "node-001",
    name: "Node 01",
    location: "Warehouse A",
    zone: "Zone 1",
    status: "Optimal",
    temperature: 0,
    humidity: 0,
    co2: 0,
    ethylene: 0,
    produceTemp: 0,
    battery: 0,
    signal: 0,
  },
]

export const batches: Batch[] = [
  { id: "BAT-3301", produce: "Strawberries", origin: "Watsonville Farms", location: "TRK-018 · In Transit", freshnessScore: 91, shelfLifeRemaining: "3.5 days", status: "Optimal", storageTemp: 2.4, storageHumidity: 88, quantity: "4.2t" },
  { id: "BAT-3318", produce: "Leafy Greens", origin: "Salinas Valley Co-op", location: "TRK-024 · In Transit", freshnessScore: 48, shelfLifeRemaining: "1.2 days", status: "Critical", storageTemp: 7.8, storageHumidity: 79, quantity: "3.1t" },
  { id: "BAT-3325", produce: "Avocados", origin: "Michoacán Imports", location: "Northgate · Zone A", freshnessScore: 84, shelfLifeRemaining: "6.0 days", status: "Optimal", storageTemp: 5.1, storageHumidity: 85, quantity: "5.0t" },
  { id: "BAT-3340", produce: "Tomatoes", origin: "Central Valley Grow", location: "Central Valley · Zone A", freshnessScore: 66, shelfLifeRemaining: "2.4 days", status: "Caution", storageTemp: 7.1, storageHumidity: 78, quantity: "4.6t" },
  { id: "BAT-3357", produce: "Citrus Mix", origin: "Desert Edge Orchards", location: "Desert Edge · Zone A", freshnessScore: 39, shelfLifeRemaining: "0.8 days", status: "Critical", storageTemp: 9.8, storageHumidity: 66, quantity: "2.9t" },
  { id: "BAT-3362", produce: "Stone Fruit", origin: "Modesto Growers", location: "Central Valley · Zone B", freshnessScore: 78, shelfLifeRemaining: "4.1 days", status: "Optimal", storageTemp: 4.9, storageHumidity: 85, quantity: "3.7t" },
]

export const predictions: Prediction[] = [
  { id: "PRD-001", batch: "BAT-3318", produce: "Leafy Greens", location: "TRK-024 · In Transit", predictedShelfLife: "1.2 days", riskLevel: "Critical", primaryCause: "High Ethylene Detected", confidence: 96, recommendedAction: "Separate Ripening Produce" },
  { id: "PRD-002", batch: "BAT-3357", produce: "Citrus Mix", location: "Desert Edge · Zone A", predictedShelfLife: "0.8 days", riskLevel: "Critical", primaryCause: "Temperature Excursion", confidence: 93, recommendedAction: "Move Batch To Cooler Storage" },
  { id: "PRD-003", batch: "BAT-3340", produce: "Tomatoes", location: "Central Valley · Zone A", predictedShelfLife: "2.4 days", riskLevel: "Caution", primaryCause: "Elevated CO₂ Levels", confidence: 88, recommendedAction: "Increase Ventilation" },
  { id: "PRD-004", batch: "BAT-3325", produce: "Avocados", location: "Northgate · Zone A", predictedShelfLife: "6.0 days", riskLevel: "Optimal", primaryCause: "Stable Conditions", confidence: 91, recommendedAction: "Maintain Current Settings" },
  { id: "PRD-005", batch: "BAT-3362", produce: "Stone Fruit", location: "Central Valley · Zone B", predictedShelfLife: "4.1 days", riskLevel: "Caution", primaryCause: "Humidity Drift", confidence: 85, recommendedAction: "Adjust Humidity To 88%" },
]

export const alerts: Alert[] = [
  { id: "ALR-901", title: "Temperature Excursion", description: "Zone D exceeded 8°C threshold for 22 minutes.", severity: "Critical", location: "Central Valley · Zone D", timestamp: "2026-06-25 09:42" },
  { id: "ALR-902", title: "High Ethylene Concentration", description: "Ethylene at 2.4 ppm detected in cargo hold.", severity: "Critical", location: "TRK-024 · In Transit", timestamp: "2026-06-25 09:15" },
  { id: "ALR-903", title: "Sensor Battery Low", description: "Node B07 battery dropped below 55%.", severity: "Warning", location: "Northgate · Zone C", timestamp: "2026-06-25 08:50" },
  { id: "ALR-904", title: "Signal Degraded", description: "Node E22 reporting intermittent connectivity.", severity: "Warning", location: "Desert Edge · Zone A", timestamp: "2026-06-25 08:21" },
  { id: "ALR-905", title: "Humidity Restored", description: "Zone A humidity returned to optimal range.", severity: "Resolved", location: "Northgate · Zone A", timestamp: "2026-06-25 07:48" },
  { id: "ALR-906", title: "Door Left Open", description: "Loading dock door open for 6 minutes — now closed.", severity: "Resolved", location: "Harbor Hub · Dock 4", timestamp: "2026-06-25 07:12" },
]

export const activities: Activity[] = [
  { id: "1", message: "AI flagged BAT-3318 (Leafy Greens) for critical spoilage risk", time: "4 min ago", type: "critical" },
  { id: "2", message: "TRK-031 began loading avocados at Salinas facility", time: "18 min ago", type: "info" },
  { id: "3", message: "Zone A humidity restored to optimal at Northgate", time: "54 min ago", type: "success" },
  { id: "4", message: "Node B07 battery warning triggered", time: "1 hr ago", type: "warning" },
  { id: "5", message: "Weekly freshness report generated for Central Valley DC", time: "2 hr ago", type: "info" },
  { id: "6", message: "TRK-042 entered Arizona corridor on schedule", time: "3 hr ago", type: "info" },
]

export const dashboardStats = [
  { label: "Active Nodes", value: "2", sub: "of 1 deployed", trend: "+3 today" },
  { label: "Active Trucks", value: "1", sub: "1 idle · 0 service", trend: "stable" },
  { label: "Warehouses Online", value: "0", sub: "nil", trend: "nil" },
  { label: "Avg Shelf Life", value: "3.8 d", sub: "across all batches", trend: "-0.4 d" },
  { label: "Active Alerts", value: "0", sub: "0 critical · 0 warning", trend: "no review" },
]

// chart helpers
export function trendSeries(base: number, points = 12, variance = 1.5) {
  return Array.from({ length: points }, (_, i) => ({
    t: `${i * 2}:00`.padStart(5, "0"),
    value: +(base + Math.sin(i / 1.7) * variance + (i % 3) * 0.3).toFixed(1),
  }))
}

export const users = [
  { id: "U-01", name: "Dana Reyes", email: "dana@foodfresh.io", role: "Admin", status: "Active" },
  { id: "U-02", name: "Marcus Bell", email: "marcus@foodfresh.io", role: "Fleet Manager", status: "Active" },
  { id: "U-03", name: "Priya Anand", email: "priya@foodfresh.io", role: "Warehouse Manager", status: "Active" },
  { id: "U-04", name: "Tom Walsh", email: "tom@foodfresh.io", role: "Viewer", status: "Invited" },
]

export function getTruck(id: string) {
  return trucks.find((t) => t.id === id)
}
export function getWarehouse(id: string) {
  return warehouses.find((w) => w.id === id)
}
export function getNode(id: string) {
  return sensorNodes.find((n) => n.id === id)
}
