import {Badge} from "@/components/ui/badge";
import {FC} from "react";

export const OrpcHero: FC = () => {
    return <section className="relative overflow-hidden border-b border-white/6">
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
            <div className="h-100 w-200 rounded-full bg-orange-500/6 blur-[120px]"/>
        </div>
        <div className="relative mx-auto max-w-2xl px-6 pt-16 pb-12 text-center">
            <Badge
                variant="outline"
                className="mb-6 border-orange-500/20 bg-orange-500/6 text-orange-400"
            >
                oRPC + Zod + React Hook Form
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Register a user
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#888]">
                End-to-end type-safe form. Same Zod schema validates on the client
                and the Cloudflare Worker.
            </p>
        </div>
    </section>
}
