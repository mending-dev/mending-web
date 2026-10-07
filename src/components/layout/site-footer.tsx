import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DiscordIcon, GithubIcon, KofiIcon } from "@/components/icons";
import { getSiteConfig } from "@/lib/content";

export function SiteFooter() {
    const site = getSiteConfig();

    return (
        <footer className="border-t border-border/40 bg-background">
            <div className="mx-auto max-w-6xl px-4 py-12">
                <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
                    {/* Brand */}
                    <div className="max-w-sm space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src={site.logo.src} alt={site.logo.alt} width={28} height={28} unoptimized />
                            <span className="text-lg font-semibold tracking-tight">{site.name}</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">{site.footer.text}</p>
                        <div className="flex gap-1">
                            <Button variant="outline" size="icon" asChild>
                                <a href={site.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                                    <GithubIcon className="size-4" />
                                </a>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <a href={site.links.discord} target="_blank" rel="noreferrer" aria-label="Discord">
                                    <DiscordIcon className="size-4" />
                                </a>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <a href={site.links.kofi} target="_blank" rel="noreferrer" aria-label="Ko-fi">
                                    <KofiIcon className="size-5" />
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Link columns from config */}
                    {site.footer.columns.map((column) => (
                        <div key={column.title} className="space-y-3">
                            <h3 className="text-sm font-semibold">{column.title}</h3>
                            <ul className="space-y-2">
                                {column.links.map((link) => {
                                    const external = link.href.startsWith("http");
                                    const className =
                                        "text-sm text-muted-foreground transition-colors hover:text-foreground";
                                    return (
                                        <li key={link.href}>
                                            {external ? (
                                                <a href={link.href} target="_blank" rel="noreferrer" className={className}>
                                                    {link.label}
                                                </a>
                                            ) : (
                                                <Link href={link.href} className={className}>
                                                    {link.label}
                                                </Link>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                <Separator className="my-8" />
                <p className="text-sm text-muted-foreground">{site.footer.copyright}</p>
            </div>
        </footer>
    );
}