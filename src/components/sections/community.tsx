import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/components/icons";
import { getSiteConfig } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Community() {
    const { community, links } = getSiteConfig();

    return (
        <section className="border-t border-border/40">
            <div className="mx-auto max-w-6xl px-4 py-20">
                <Reveal>
                    <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/40 px-6 py-16 text-center backdrop-blur">
                        {/* Background glow */}
                        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{community.title}</h2>
                        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{community.text}</p>

                        <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                            {community.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2">
                                    <Check className="size-4 text-primary" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Button size="lg" className="mt-8" asChild>
                            <a href={links.discord} target="_blank" rel="noreferrer">
                                <DiscordIcon className="size-5" />
                                {community.buttonLabel}
                            </a>
                        </Button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}