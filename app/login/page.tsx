"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Leaf, ShieldCheck } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState<{ id?: string; pw?: string }>({})

  function validate() {
    const next: { id?: string; pw?: string } = {}
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)
    const isPhone = /^[+]?[\d\s-]{7,}$/.test(identifier)
    if (!identifier) next.id = "Email or phone number is required."
    else if (!isEmail && !isPhone) next.id = "Enter a valid email or phone number."
    if (!password) next.pw = "Password is required."
    else if (password.length < 6) next.pw = "Password must be at least 6 characters."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) router.push("/dashboard")
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left illustration */}
      <div className="relative hidden flex-col justify-between bg-secondary p-10 lg:flex">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </span>
          <div>
            <p className="text-lg font-bold text-foreground">FoodFresh AI Monitor</p>
            <p className="text-xs text-muted-foreground">Smart Food Freshness Monitoring</p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <Image
            src="/login-illustration.png"
            alt="Fresh produce, cold storage warehouse, delivery truck and IoT monitoring"
            width={640}
            height={640}
            priority
            className="h-auto w-full rounded-2xl"
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-balance text-foreground">
            Protect every harvest, from farm to shelf.
          </h2>
          <p className="text-sm text-muted-foreground text-pretty">
            Real-time temperature, humidity, CO₂ and ethylene monitoring with AI-powered
            shelf-life predictions across your fleet and warehouses.
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center bg-background p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="h-5 w-5" />
            </span>
            <p className="text-lg font-bold">FoodFresh AI Monitor</p>
          </div>

          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your monitoring console to continue.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
            <div className="space-y-1.5">
              <label htmlFor="identifier" className="text-sm font-medium">
                Email or Phone Number
              </label>
              <input
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="you@company.com"
                className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                aria-invalid={!!errors.id}
              />
              {errors.id ? <p className="text-xs text-destructive">{errors.id}</p> : null}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <button type="button" className="text-xs font-medium text-primary hover:underline">
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-lg border border-input bg-card px-3 pr-10 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                  aria-invalid={!!errors.pw}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.pw ? <p className="text-xs text-destructive">{errors.pw}</p> : null}
            </div>

            <button
              type="submit"
              className="h-11 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-success"
            >
              Login
            </button>

            <button
              type="button"
              className="h-11 w-full rounded-lg border border-border bg-card text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Enterprise-grade encryption · SOC 2 compliant
          </div>
        </div>
      </div>
    </div>
  )
}
