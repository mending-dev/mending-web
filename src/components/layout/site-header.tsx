import Image from "next/image";
import { ScrollLink } from "@/components/scroll-link";
import { Button } from "@/components/ui/button";
import { DiscordIcon, GithubIcon } from "@/components/icons";
import { getSiteConfig } from "@/lib/content";
import { MainNav, MobileNav } from "./main-nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
    const site = getSiteConfig();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
            <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4">
                {/* Left: logo + name */}
                <div className="flex items-center gap-2">
                    <MobileNav items={site.nav} />
                    <ScrollLink href="/" className="flex items-center gap-2">
                        <Image
                            src={site.logo.src}
                            alt={site.logo.alt}
                            width={28}
                            height={28}
                            loading="eager"
                            unoptimized
                        />
                        <span className="text-lg font-semibold tracking-tight">{site.name}</span>
                    </ScrollLink>
                </div>

                {/* Center: navigation */}
                <MainNav items={site.nav} />

                {/* Right: actions */}
                <div className="col-start-3 flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" asChild>
                        <a href={site.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                            <GithubIcon className="size-5" />
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a href={site.links.discord} target="_blank" rel="noreferrer" aria-label="Discord">
                            <DiscordIcon className="size-5" />
                        </a>
                    </Button>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}