import { Terminal } from "./terminal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSiteConfig } from "@/lib/content";
import { ScrollLink } from "@/components/scroll-link";

export function Hero() {
    const { hero } = getSiteConfig();

    return (
        <section className="relative overflow-hidden">
            {/* Blurry gradient background */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-40 left-1/4 size-[32rem] rounded-full bg-emerald-500/20 blur-3xl" />
                <div className="absolute top-20 right-0 size-[28rem] rounded-full bg-teal-400/15 blur-3xl" />
                <div className="absolute bottom-0 left-0 size-[24rem] rounded-full bg-cyan-500/10 blur-3xl" />
            </div>

            <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:py-28 lg:grid-cols-2">
                {/* Text */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                        {hero.titlePrefix}{" "}
                        <span className="bg-linear-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              {hero.titleHighlight}
            </span>{" "}
                        {hero.titleSuffix}
                    </h1>
                    <p className="max-w-xl text-lg text-muted-foreground">{hero.text}</p>
                    <div className="flex flex-wrap gap-4 pt-2">
                        <Button
                            size="lg"
                            className="h-12 px-8 text-base shadow-lg shadow-emerald-500/25 transition-transform hover:scale-105"
                            asChild
                        >
                            <Link href={hero.primaryButton.href}>
                                {hero.primaryButton.label}
                                <ArrowRight className="size-5" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-12 px-8 text-base transition-transform hover:scale-105"
                            asChild
                        >
                            <ScrollLink href={hero.secondaryButton.href}>{hero.secondaryButton.label}</ScrollLink>
                        </Button>
                    </div>
                </div>

                {/* Terminal */}
                <Terminal />
            </div>
        </section>
    );
}