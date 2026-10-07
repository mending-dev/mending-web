"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import type { ComponentProps } from "react";

// Link that scrolls smoothly on the home page: "/" = top, "/#id" = anchor
export function ScrollLink({ href, onClick, ...props }: ComponentProps<typeof Link>) {
    const pathname = usePathname();
    const lenis = useLenis();
    const target = String(href);

    return (
        <Link
            href={href}
            onClick={(e) => {
                onClick?.(e);
                if (!lenis || pathname !== "/") return;

                if (target === "/") {
                    e.preventDefault();
                    lenis.scrollTo(0);
                } else if (target.startsWith("/#")) {
                    const el = document.getElementById(target.slice(2));
                    if (el) {
                        e.preventDefault();
                        // Offset = sticky header height
                        lenis.scrollTo(el, { offset: -64 });
                    }
                }
            }}
            {...props}
        />
    );
}