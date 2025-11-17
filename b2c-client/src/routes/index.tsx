import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Code,
  Shield,
  TrendingDown,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-center px-6 py-4">
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Features
            </a>
            <a
              href="#integration"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Integration
            </a>
            <a
              href="#pricing"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Pricing
            </a>
            <Button variant="ghost" className="text-sm">
              Documentation
            </Button>
          </div>
        </nav>
      </header>

      <section className="relative px-6 pt-32 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Now in Public Beta
          </div>
          <h1 className="mb-6 max-w-4xl text-balance bg-gradient-to-br from-white via-white to-zinc-400 bg-clip-text text-6xl font-bold leading-tight tracking-tight text-transparent md:text-7xl">
            Virtual Try-On API for Fashion Retailers
          </h1>
          <p className="mb-10 max-w-2xl text-pretty text-xl leading-relaxed text-zinc-400">
            Reduce return rates by up to 70% with enterprise-grade AI. Powered
            by vision transformers and diffusion models, AugMint delivers
            photorealistic virtual try-on experiences directly on your eCommerce
            site.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={() => navigate({ to: "/dashboard/settings" })}
            >
              Get API Access
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-1 text-3xl font-bold text-emerald-500">
                70%
              </div>
              <div className="text-sm text-zinc-500">Lower return rates</div>
            </div>
            <div>
              <div className="mb-1 text-3xl font-bold text-emerald-500">
                35%
              </div>
              <div className="text-sm text-zinc-500">Higher conversions</div>
            </div>
            <div>
              <div className="mb-1 text-3xl font-bold text-emerald-500">
                2.3s
              </div>
              <div className="text-sm text-zinc-500">Average latency</div>
            </div>
            <div>
              <div className="mb-1 text-3xl font-bold text-emerald-500">
                99.9%
              </div>
              <div className="text-sm text-zinc-500">Uptime SLA</div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[120px]" />
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              The $550B Problem
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
              Online fashion returns cost retailers billions annually. 60-70% of
              clothing is returned due to poor fit and uncertainty about
              appearance.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                <TrendingDown className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">High Return Rates</h3>
              <p className="text-zinc-400">
                Generic model photos fail to show how clothes look on different
                body types, leading to massive return volumes.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
                <svg
                  className="h-6 w-6 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Lost Revenue</h3>
              <p className="text-zinc-400">
                Customers abandon carts due to sizing uncertainty, directly
                impacting your bottom line and conversion rates.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10">
                <svg
                  className="h-6 w-6 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Poor Experience</h3>
              <p className="text-zinc-400">
                Bracketing (buying multiple sizes) creates friction, damages
                brand trust, and frustrates customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              Enterprise AI That Just Works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
              Drop-in API that transforms your product pages with photorealistic
              virtual try-on in minutes, not months.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20">
                <Zap className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="mb-3 text-2xl font-semibold">Lightning Fast</h3>
              <p className="mb-4 text-zinc-400">
                Average 2.3s latency with global CDN distribution. Optimized
                inference pipeline delivers results in real-time.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Sub-3 second response times</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Edge-optimized inference</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Automatic scaling</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                <Code className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mb-3 text-2xl font-semibold">
                Simple Integration
              </h3>
              <p className="mb-4 text-zinc-400">
                RESTful API with SDKs for all major platforms. Get started with
                just a few lines of code.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Drop-in JavaScript SDK</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Shopify, WooCommerce plugins</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Comprehensive documentation</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                <svg
                  className="h-6 w-6 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-semibold">
                Photorealistic Results
              </h3>
              <p className="mb-4 text-zinc-400">
                State-of-the-art vision transformers and diffusion models create
                indistinguishable-from-reality outputs.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Accurate body measurements</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Natural pose preservation</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Fabric texture fidelity</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="mb-3 text-2xl font-semibold">Enterprise Ready</h3>
              <p className="mb-4 text-zinc-400">
                SOC 2 compliant, GDPR ready, with 99.9% uptime SLA and dedicated
                support.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>SOC 2 Type II certified</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>GDPR & CCPA compliant</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>24/7 dedicated support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="integration" className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              Integrate in Minutes
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
              Simple REST API with webhooks for async processing. Start
              transforming your product pages today.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-emerald-400">
                  Request
                </span>
                <span className="text-xs text-zinc-500">
                  POST /api/v1/try-on
                </span>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-black p-4 text-sm">
                <code className="text-zinc-300">{`fetch('https://api.augmint.ai/v1/try-on', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    personImage: 'https://...',
    garmentImage: 'https://...',
    webhook: 'https://your-site.com/webhook'
  })
})`}</code>
              </pre>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-emerald-400">
                  Response
                </span>
                <span className="text-xs text-zinc-500">200 OK</span>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-black p-4 text-sm">
                <code className="text-zinc-300">{`{
  "jobId": "job-uuid-123",
  "status": "PROCESSING",
  "estimatedTime": 2300,
  "webhook": {
    "url": "https://your-site.com/webhook",
    "events": ["completed", "failed"]
  }
}`}</code>
              </pre>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20">
                <svg
                  className="h-5 w-5 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-white">
                  Webhook Notifications
                </h3>
                <p className="text-sm text-zinc-400">
                  Get real-time updates when jobs complete. Perfect for async
                  workflows and seamless user experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              Simple, Usage-Based Pricing
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
              Pay only for what you use. No hidden fees, no surprises. Scale as
              you grow.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
              <div className="mb-4">
                <h3 className="mb-2 text-xl font-semibold">Starter</h3>
                <div className="mb-1 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$0.15</span>
                  <span className="text-zinc-500">per request</span>
                </div>
                <p className="text-sm text-zinc-500">
                  Perfect for testing and small catalogs
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 bg-transparent"
                onClick={() => navigate({ to: "/dashboard" })}
              >
                Start Free Trial
              </Button>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Up to 1,000 requests/month</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Standard support</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>99% uptime SLA</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Basic analytics</span>
                </li>
              </ul>
            </div>

            <div className="relative rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-500/10 to-transparent p-8">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold">
                Popular
              </div>
              <div className="mb-4">
                <h3 className="mb-2 text-xl font-semibold">Pro</h3>
                <div className="mb-1 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$0.08</span>
                  <span className="text-zinc-500">per request</span>
                </div>
                <p className="text-sm text-zinc-500">For growing businesses</p>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Get Started
              </Button>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Up to 50,000 requests/month</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>99.9% uptime SLA</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Webhook notifications</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
              <div className="mb-4">
                <h3 className="mb-2 text-xl font-semibold">Enterprise</h3>
                <div className="mb-1 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <p className="text-sm text-zinc-500">
                  For high-volume retailers
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 bg-transparent"
              >
                Contact Sales
              </Button>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Unlimited requests</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Dedicated support team</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>99.99% uptime SLA</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>White-label options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-balance text-4xl font-bold md:text-5xl">
            Ready to Transform Your Fashion Retail?
          </h2>
          <p className="mb-10 text-pretty text-xl text-zinc-400">
            Join leading retailers already reducing returns and increasing
            conversions with AugMint.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            No credit card required · 14-day free trial · Cancel anytime
          </p>
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <span className="text-xl font-semibold">AugMint</span>
              </div>
              <p className="text-sm text-zinc-500">
                Enterprise AI virtual try-on for fashion retailers.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API Reference
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-zinc-500">
            © 2025 AugMint. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
