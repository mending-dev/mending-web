"use client";

import "lenis/dist/lenis.css";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

// Resets the scroll position to the top on every route change
function ScrollReset() {
    const pathname = usePathname();
    const lenis = useLenis();
    const previousPath = useRef(pathname);

    useEffect(() => {
        if (!lenis || previousPath.current === pathname) return;
        previousPath.current = pathname;
        lenis.scrollTo(0, { immediate: true });
    }, [pathname, lenis]);

    return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.1 }}>
            <ScrollReset />
            {children}
        </ReactLenis>
    );
}