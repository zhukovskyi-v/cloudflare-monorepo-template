import {Badge} from "@/components/ui/badge";

const features = [
    {
        title: "Next.js Frontend",
        description:
            "App router, RSC, and SSR — optimized for Cloudflare Pages with edge rendering out of the box.",
        icon: (
            <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M9 3v18"/>
                <path d="M3 9h6"/>
            </svg>
        ),
    },
    {
        title: "TypeScript API",
        description:
            "Type-safe API on Cloudflare Workers. End-to-end types shared across frontend and backend.",
        icon: (
            <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
                <line x1="14" y1="4" x2="10" y2="20"/>
            </svg>
        ),
    },
    {
        title: "Terraform IaC",
        description:
            "Declarative infrastructure for DNS, Workers, Pages, KV, R2, and all Cloudflare resources.",
        icon: (
            <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
            </svg>
        ),
    },
    {
        title: "Turborepo",
        description:
            "Monorepo with shared configs, incremental builds, and remote caching. Scales with your team.",
        icon: (
            <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
            </svg>
        ),
    },
    {
        title: "shadcn/ui",
        description:
            "55 accessible components pre-installed. Built on Radix primitives — fully customizable.",
        icon: (
            <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
        ),
    },
    {
        title: "Edge-First",
        description:
            "Runs on Cloudflare's global network. Low latency, automatic scaling, zero cold starts.",
        icon: (
            <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
        ),
    },
];

const steps = [
    {
        step: "1",
        title: "Clone the template",
        code: "npx create-cloudflare-stack my-app",
    },
    {
        step: "2",
        title: "Install dependencies",
        code: "cd my-app && bun install",
    },
    {
        step: "3",
        title: "Start building",
        code: "bun dev",
    },
];

const githubUrl = `https://github.com/zhukovskyi-v/cloudflare-monorepo-template`

export default async function Home() {
    return (
        <div className="min-h-dvh bg-[#0a0a0a] text-[#fafafa]">
            {/* Nav */}
            <header className="sticky top-0 z-50 border-b border-white/6 bg-[#0a0a0a]/80 backdrop-blur-xl">
                <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
                    <div className="flex items-center gap-2.5">
                        <div
                            className="flex size-7 items-center justify-center rounded-lg bg-linear-to-b from-orange-500 to-orange-600 shadow-[0_0_12px_rgba(249,115,22,0.3)]">
                            <svg
                                className="size-3.5 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                            </svg>
                        </div>
                        <span className="text-sm font-semibold tracking-tight">
              CF Stack
            </span>
                    </div>
                    <nav className="flex items-center gap-1">
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer rounded-md px-3 py-1.5 text-xs text-[#a1a1a1] transition-colors duration-150 hover:text-white"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://developers.cloudflare.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer rounded-md px-3 py-1.5 text-xs text-[#a1a1a1] transition-colors duration-150 hover:text-white"
                        >
                            Docs
                        </a>
                    </nav>
                </div>
            </header>

            {/* Hero */}
            <section className="relative overflow-hidden">
                {/* Gradient orb behind hero */}
                <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
                    <div className="h-150 w-225 rounded-full bg-orange-500/[0.07] blur-[120px]"/>
                </div>
                <div className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2">
                    <div className="h-75 w-125 rounded-full bg-orange-400/5 blur-[80px]"/>
                </div>

                <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-24 text-center sm:pb-36 sm:pt-32">
                    <Badge
                        variant="outline"
                        className="mb-6 border-orange-500/20 bg-orange-500/6 text-orange-400"
                    >
                        Open-source template
                    </Badge>

                    <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
                        Ship full-stack apps on{" "}
                        <span
                            className="bg-linear-to-r from-orange-400 via-orange-300 to-amber-400 bg-clip-text text-transparent">
              Cloudflare
            </span>{" "}
                        in minutes
                    </h1>

                    <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#888]">
                        A production-ready monorepo with Next.js, a TypeScript API on
                        Workers, Terraform for infrastructure, and 55 shadcn/ui components
                        — all wired up.
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <a
                            href="#get-started"
                            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg bg-linear-to-b from-orange-500 to-orange-600 px-5 text-sm font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.3),0_0_16px_rgba(249,115,22,0.25)] transition-all duration-200 hover:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_0_24px_rgba(249,115,22,0.4)] hover:brightness-110"
                        >
                            Get Started
                        </a>
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/4 px-5 text-sm font-medium text-[#ccc] transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                        >
                            <svg
                                className="size-4"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            View on GitHub
                        </a>
                    </div>

                    {/* Terminal preview */}
                    <div className="mx-auto mt-16 max-w-lg">
                        <div
                            className="overflow-hidden rounded-xl border border-white/8 bg-[#111] shadow-2xl shadow-black/40">
                            <div className="flex items-center gap-1.5 border-b border-white/6 px-4 py-3">
                                <div className="size-2.5 rounded-full bg-[#ff5f57]"/>
                                <div className="size-2.5 rounded-full bg-[#febc2e]"/>
                                <div className="size-2.5 rounded-full bg-[#28c840]"/>
                                <span className="ml-2 text-[11px] text-[#555]">terminal</span>
                            </div>
                            <div className="px-5 py-4 font-mono text-[13px] leading-7">
                                <div>
                                    <span className="text-[#28c840]">$</span>{" "}
                                    <span className="text-[#ccc]">
                    npx create-cloudflare-stack my-app
                  </span>
                                </div>
                                <div>
                                    <span className="text-[#28c840]">$</span>{" "}
                                    <span className="text-[#ccc]">cd my-app && bun install</span>
                                </div>
                                <div>
                                    <span className="text-[#28c840]">$</span>{" "}
                                    <span className="text-[#ccc]">bun dev</span>
                                </div>
                                <div className="mt-1 text-[#555]">
                                    ready - started on http://localhost:3000
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="relative border-t border-white/6">
                <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
                    <div className="mb-14 text-center">
                        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            Everything you need, nothing you don&apos;t
                        </h2>
                        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#888]">
                            Pre-configured tooling so you can focus on your product, not your
                            build pipeline.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="group rounded-xl border border-white/6 bg-white/2 p-6 transition-all duration-300 hover:border-white/12 hover:bg-white/4"
                            >
                                <div
                                    className="mb-4 flex size-10 items-center justify-center rounded-lg border border-white/8 bg-white/4 text-orange-400 transition-colors duration-300 group-hover:border-orange-500/20 group-hover:bg-orange-500/8">
                                    {feature.icon}
                                </div>
                                <h3 className="mb-2 text-sm font-semibold text-[#eee]">
                                    {feature.title}
                                </h3>
                                <p className="text-[13px] leading-relaxed text-[#777]">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Get Started */}
            <section
                id="get-started"
                className="relative border-t border-white/6"
            >
                <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
                    <div className="mb-14 text-center">
                        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            Up and running in under a minute
                        </h2>
                        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#888]">
                            Three commands. That&apos;s it.
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-2xl gap-3">
                        {steps.map((item) => (
                            <div
                                key={item.step}
                                className="flex items-start gap-4 rounded-xl border border-white/6 bg-white/2 p-5"
                            >
                <span
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-linear-to-b from-orange-500 to-orange-600 text-xs font-bold text-white shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                  {item.step}
                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="mb-2 text-sm font-medium text-[#ddd]">
                                        {item.title}
                                    </p>
                                    <code
                                        className="block rounded-lg bg-[#111] px-4 py-2.5 font-mono text-[13px] text-orange-300/80">
                                        {item.code}
                                    </code>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stack */}
            <section className="border-t border-white/6">
                <div className="mx-auto max-w-6xl px-6 py-24 text-center sm:py-32">
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        Built on the modern stack
                    </h2>
                    <p className="mx-auto mt-3 max-w-md text-sm text-[#888]">
                        Battle-tested tools used by teams shipping to production every day.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
                        {[
                            "Next.js 16",
                            "React 19",
                            "TypeScript 5",
                            "Tailwind CSS 4",
                            "shadcn/ui",
                            "Cloudflare Workers",
                            "Cloudflare Pages",
                            "Terraform",
                            "Turborepo",
                            "Bun",
                        ].map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-white/8 bg-white/3 px-3.5 py-1.5 text-xs font-medium text-[#999] transition-colors duration-200 hover:border-white/15 hover:text-[#ccc]"
                            >
                {tech}
              </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-white/6">
                <div className="mx-auto max-w-6xl px-6 py-24 text-center sm:py-32">
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        Start shipping faster
                    </h2>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#888]">
                        Stop configuring. Start building. This template gives you
                        everything you need to go from zero to production on Cloudflare.
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <a
                            href="#get-started"
                            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg bg-linear-to-b from-orange-500 to-orange-600 px-6 text-sm font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.3),0_0_16px_rgba(249,115,22,0.25)] transition-all duration-200 hover:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_0_24px_rgba(249,115,22,0.4)] hover:brightness-110"
                        >
                            Get Started
                        </a>
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/4 px-6 text-sm font-medium text-[#ccc] transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                        >
                            Star on GitHub
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/6">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
                    <div className="flex items-center gap-2">
                        <div
                            className="flex size-5 items-center justify-center rounded bg-linear-to-b from-orange-500 to-orange-600">
                            <svg
                                className="size-3 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                            </svg>
                        </div>
                        <span className="text-xs text-[#555]">
              Cloudflare Stack Template
            </span>
                    </div>
                    <span className="text-xs text-[#555]">Open Source</span>
                </div>
            </footer>
        </div>
    );
}
