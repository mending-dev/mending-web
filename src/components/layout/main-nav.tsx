"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/types";

// Horizontal padding of a nav link (px-3), the underline is inset by this amount
const INSET = 12;

function isActive(pathname: string, href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function MainNav({ items }: { items: NavItem[] }) {
    const pathname = usePathname();
    const navRef = useRef<HTMLElement>(null);
    const indicatorRef = useRef<HTMLSpanElement>(null);
    const placedRef = useRef(false);
    const activeHref = items.find((item) => isActive(pathname, item.href))?.href;

    // Moves the underline below the active link, the CSS transition makes it glide
    useEffect(() => {
        const nav = navRef.current;
        const bar = indicatorRef.current;
        if (!nav || !bar) return;

        const update = () => {
            const active = activeHref
                ? nav.querySelector<HTMLElement>(`[data-href="${activeHref}"]`)
                : null;

            if (!active) {
                bar.style.opacity = "0";
                return;
            }

            // No slide-in animation on the very first placement
            const firstPlacement = !placedRef.current;
            if (firstPlacement) bar.style.transition = "none";

            bar.style.width = `${Math.max(active.offsetWidth - INSET * 2, 0)}px`;
            bar.style.transform = `translateX(${active.offsetLeft + INSET}px)`;
            bar.style.opacity = "1";

            if (firstPlacement) {
                void bar.offsetWidth; // force reflow before re-enabling the transition
                bar.style.transition = "";
                placedRef.current = true;
            }
        };

        update();
        // Re-measure when fonts load or the layout changes
        const observer = new ResizeObserver(update);
        observer.observe(nav);
        return () => observer.disconnect();
    }, [activeHref]);

    return (
        <nav ref={navRef} className="relative hidden h-full items-center gap-1 md:flex">
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    data-href={item.href}
                    className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                        item.href === activeHref ? "text-foreground" : "text-muted-foreground"
                    )}
                >
                    {item.label}
                </Link>
            ))}

            {/* Active indicator */}
            <span
                ref={indicatorRef}
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-primary opacity-0 transition-[transform,width,opacity] duration-300 ease-out"
            />
        </nav>
    );
}

export function MobileNav({ items }: { items: NavItem[] }) {
    const pathname = usePathname();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                    <Menu className="size-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <nav className="mt-10 flex flex-col gap-1 px-4">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "rounded-md px-3 py-2 text-base font-medium",
                                isActive(pathname, item.href)
                                    ? "bg-accent text-foreground"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}