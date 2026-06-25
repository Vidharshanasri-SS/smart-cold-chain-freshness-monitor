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

export const trucks: Truck[] = [
  {
    id: "TRK-018",
    name: "Reefer Unit 018",
    driver: "Marcus Bell",
    status: "In Transit",
    location: "I-80, Sacramento, CA",
    destination: "Reno Distribution Center",
    cargo: "Strawberries · 4.2t",
    shelfLife: "3.5 days",
    shelfLifeStatus: "Optimal",
    temperature: 2.4,
    humidity: 88,
    co2: 410,
    ethylene: 0.8,
    produceTemp: 3.1,
    battery: 92,
    signal: 87,
    progress: 64,
  },
  {
    id: "TRK-024",
    name: "Reefer Unit 024",
    driver: "Sofia Vergil",
    status: "In Transit",
    location: "Hwy 99, Fresno, CA",
    destination: "Los Angeles Cold Hub",
    cargo: "Leafy Greens · 3.1t",
    shelfLife: "1.2 days",
    shelfLifeStatus: "Critical",
    temperature: 7.8,
    humidity: 79,
    co2: 690,
    ethylene: 2.4,
    produceTemp: 8.2,
    battery: 64,
    signal: 71,
    progress: 38,
  },
  {
    id: "TRK-031",
    name: "Reefer Unit 031",
    driver: "Liam Carter",
    status: "Loading",
    location: "Salinas Packing Facility",
    destination: "Phoenix Regional DC",
    cargo: "Avocados · 5.0t",
    shelfLife: "6.0 days",
    shelfLifeStatus: "Optimal",
    temperature: 5.1,
    humidity: 85,
    co2: 520,
    ethylene: 1.1,
    produceTemp: 5.6,
    battery: 100,
    signal: 95,
    progress: 5,
  },
  {
    id: "TRK-042",
    name: "Reefer Unit 042",
    driver: "Ava Nguyen",
    status: "In Transit",
    location: "I-10, Tucson, AZ",
    destination: "El Paso Cross-Dock",
    cargo: "Tomatoes · 4.6t",
    shelfLife: "2.4 days",
    shelfLifeStatus: "Caution",
    temperature: 6.2,
    humidity: 82,
    co2: 600,
    ethylene: 1.9,
    produceTemp: 6.8,
    battery: 78,
    signal: 80,
    progress: 52,
  },
  {
    id: "TRK-055",
    name: "Reefer Unit 055",
    driver: "Noah Pierce",
    status: "Idle",
    location: "Bakersfield Yard",
    destination: "Awaiting Dispatch",
    cargo: "Empty",
    shelfLife: "—",
    shelfLifeStatus: "Optimal",
    temperature: 4.0,
    humidity: 70,
    co2: 430,
    ethylene: 0.3,
    produceTemp: 4.0,
    battery: 88,
    signal: 90,
    progress: 0,
  },
  {
    id: "TRK-067",
    name: "Reefer Unit 067",
    driver: "Maya Flores",
    status: "Maintenance",
    location: "Stockton Service Depot",
    destination: "Service Bay 3",
    cargo: "Empty",
    shelfLife: "—",
    shelfLifeStatus: "Caution",
    temperature: 12.0,
    humidity: 55,
    co2: 400,
    ethylene: 0.1,
    produceTemp: 12.0,
    battery: 41,
    signal: 60,
    progress: 0,
  },
]

export const warehouses: Warehouse[] = [
  {
    id: "WH-NORTH",
    name: "Northgate Cold Storage",
    location: "Sacramento, CA",
    capacity: "12,000 pallets",
    utilization: 78,
    activeNodes: 46,
    totalNodes: 48,
    condition: "Optimal",
    temperature: 3.2,
    humidity: 86,
    zones: [
      { name: "Zone A · Berries", temp: 1.8, humidity: 90, condition: "Optimal" },
      { name: "Zone B · Leafy Greens", temp: 3.4, humidity: 88, condition: "Optimal" },
      { name: "Zone C · Citrus", temp: 6.2, humidity: 82, condition: "Caution" },
      { name: "Zone D · Root Veg", temp: 4.5, humidity: 80, condition: "Optimal" },
    ],
  },
  {
    id: "WH-CENTRAL",
    name: "Central Valley Distribution",
    location: "Fresno, CA",
    capacity: "18,500 pallets",
    utilization: 91,
    activeNodes: 60,
    totalNodes: 64,
    condition: "Caution",
    temperature: 5.6,
    humidity: 81,
    zones: [
      { name: "Zone A · Tomatoes", temp: 7.1, humidity: 78, condition: "Caution" },
      { name: "Zone B · Stone Fruit", temp: 4.9, humidity: 85, condition: "Optimal" },
      { name: "Zone C · Avocados", temp: 5.4, humidity: 84, condition: "Optimal" },
      { name: "Zone D · Mixed", temp: 8.8, humidity: 72, condition: "Critical" },
    ],
  },
  {
    id: "WH-SOUTH",
    name: "Harbor Logistics Hub",
    location: "Long Beach, CA",
    capacity: "22,000 pallets",
    utilization: 64,
    activeNodes: 70,
    totalNodes: 72,
    condition: "Optimal",
    temperature: 2.9,
    humidity: 87,
    zones: [
      { name: "Zone A · Imports", temp: 2.1, humidity: 89, condition: "Optimal" },
      { name: "Zone B · Frozen", temp: -18.0, humidity: 60, condition: "Optimal" },
      { name: "Zone C · Dairy", temp: 3.5, humidity: 80, condition: "Optimal" },
      { name: "Zone D · Produce", temp: 4.2, humidity: 86, condition: "Optimal" },
    ],
  },
  {
    id: "WH-DESERT",
    name: "Desert Edge Facility",
    location: "Phoenix, AZ",
    capacity: "9,800 pallets",
    utilization: 83,
    activeNodes: 34,
    totalNodes: 40,
    condition: "Critical",
    temperature: 9.4,
    humidity: 68,
    zones: [
      { name: "Zone A · Citrus", temp: 9.8, humidity: 66, condition: "Critical" },
      { name: "Zone B · Melons", temp: 8.2, humidity: 70, condition: "Caution" },
      { name: "Zone C · Peppers", temp: 7.9, humidity: 74, condition: "Caution" },
    ],
  },
]

export const sensorNodes: SensorNode[] = [
  { id: "ND-A12", name: "Node A12", location: "Northgate · Zone A", zone: "Berries", status: "Online", temperature: 1.8, humidity: 90, co2: 420, ethylene: 0.6, produceTemp: 2.1, battery: 94, signal: 91 },
  { id: "ND-B07", name: "Node B07", location: "Northgate · Zone C", zone: "Citrus", status: "Degraded", temperature: 6.2, humidity: 82, co2: 610, ethylene: 1.8, produceTemp: 6.6, battery: 52, signal: 64 },
  { id: "ND-C19", name: "Node C19", location: "Central Valley · Zone D", zone: "Mixed", status: "Online", temperature: 8.8, humidity: 72, co2: 720, ethylene: 2.6, produceTemp: 9.1, battery: 71, signal: 78 },
  { id: "ND-D03", name: "Node D03", location: "Harbor Hub · Zone A", zone: "Imports", status: "Online", temperature: 2.1, humidity: 89, co2: 405, ethylene: 0.4, produceTemp: 2.4, battery: 88, signal: 96 },
  { id: "ND-E22", name: "Node E22", location: "Desert Edge · Zone A", zone: "Citrus", status: "Online", temperature: 9.8, humidity: 66, co2: 680, ethylene: 2.1, produceTemp: 10.2, battery: 60, signal: 70 },
  { id: "ND-F08", name: "Node F08", location: "Central Valley · Zone B", zone: "Stone Fruit", status: "Online", temperature: 4.9, humidity: 85, co2: 480, ethylene: 1.0, produceTemp: 5.2, battery: 83, signal: 88 },
  { id: "ND-G14", name: "Node G14", location: "Harbor Hub · Zone B", zone: "Frozen", status: "Online", temperature: -18.0, humidity: 60, co2: 390, ethylene: 0.1, produceTemp: -17.6, battery: 97, signal: 93 },
  { id: "ND-H05", name: "Node H05", location: "Desert Edge · Zone C", zone: "Peppers", status: "Offline", temperature: 0, humidity: 0, co2: 0, ethylene: 0, produceTemp: 0, battery: 0, signal: 0 },
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
  { label: "Active Nodes", value: "210", sub: "of 224 deployed", trend: "+3 today" },
  { label: "Active Trucks", value: "18", sub: "4 idle · 2 service", trend: "stable" },
  { label: "Warehouses Online", value: "4", sub: "all regions reporting", trend: "100%" },
  { label: "Avg Shelf Life", value: "3.8 d", sub: "across all batches", trend: "-0.4 d" },
  { label: "Produce Protected", value: "1,240t", sub: "this month", trend: "+8.2%" },
  { label: "Active Alerts", value: "4", sub: "2 critical · 2 warning", trend: "needs review" },
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
