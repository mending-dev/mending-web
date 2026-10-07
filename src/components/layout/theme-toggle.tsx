"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    function toggle(event: React.MouseEvent<HTMLButtonElement>) {
        const next = resolvedTheme === "dark" ? "light" : "dark";
        const root = document.documentElement;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduceMotion) {
            setTheme(next);
            return;
        }

        // Fallback: fade colors via CSS transitions (works in every browser)
        if (typeof document.startViewTransition !== "function") {
            root.classList.add("theme-transition");
            setTheme(next);
            window.setTimeout(() => root.classList.remove("theme-transition"), 450);
            return;
        }

        // Circle expands from the center of the button
        const rect = event.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            flushSync(() => setTheme(next));
        });

        transition.ready.then(() => {
            root.animate(
                {
                    clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
                },
                {
                    duration: 600,
                    easing: "ease-in-out",
                    pseudoElement: "::view-transition-new(root)",
                }
            );
        });
    }

    return (
        <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle} className="relative">
            {/* Icons rotate and scale into each other */}
            <Sun className="size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <Moon className="absolute size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        </Button>
    );
}