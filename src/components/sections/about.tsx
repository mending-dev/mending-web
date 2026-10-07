import Image from "next/image";
import {
    Coffee,
    Server,
    Database,
    Globe,
    Palette,
    GitBranch,
    Code2,
    type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { getSiteConfig } from "@/lib/content";

// Maps icon names from site.json to lucide icons
const ICONS: Record<string, LucideIcon> = {
    coffee: Coffee,
    server: Server,
    database: Database,
    globe: Globe,
    palette: Palette,
    "git-branch": GitBranch,
};

export function About() {
    const { about } = getSiteConfig();

    return (
        <section id="about" className="scroll-mt-20 border-t border-border/40">
            <div className="mx-auto max-w-6xl space-y-16 px-4 py-20">
                {/* Intro */}
                <div className="grid items-center gap-10 md:grid-cols-2">
                    <Reveal className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{about.title}</h2>
                        <p className="text-muted-foreground">{about.text}</p>
                    </Reveal>
                    <Reveal delay={20}>
                        <div className="relative aspect-video">
                            <Image
                                src={about.image.src}
                                alt={about.image.alt}
                                fill
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className="object-contain"
                            />
                        </div>
                    </Reveal>
                </div>

                {/* Tech stack */}
                <div className="space-y-6">
                    <Reveal>
                        <h3 className="text-xl font-semibold">{about.techStackTitle}</h3>
                    </Reveal>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {about.techStack.map((item, i) => {
                            const Icon = ICONS[item.icon] ?? Code2;
                            return (
                                <Reveal key={item.title} delay={(i % 3) * 80} className="h-full">
                                    <Card className="h-full border-border/50 bg-card/50 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                                        <CardContent className="space-y-3">
                                            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                <Icon className="size-5" />
                                            </div>
                                            <h4 className="font-semibold">{item.title}</h4>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </CardContent>
                                    </Card>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}