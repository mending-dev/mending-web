"use client";

import "lenis/dist/lenis.css";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

// Trigger of an open Radix select or menu (dialogs are not matched on purpose)
const OPEN_DROPDOWN =
    '[role="combobox"][data-state="open"], [aria-haspopup="menu"][data-state="open"]';

// Scrollable list of a select or menu
const DROPDOWN_LIST = '[role="listbox"], [role="menu"]';

const isDropdownOpen = () => document.querySelector(OPEN_DROPDOWN) !== null;

const isInsideDropdownList = (target: EventTarget | null) =>
    target instanceof Element && target.closest(DROPDOWN_LIST) !== null;

// Defined outside the component so Lenis is not re-created on every render
const LENIS_OPTIONS = {
    lerp: 0.1,
    // Returning false makes Lenis ignore the wheel event (native scrolling takes over).
    virtualScroll: ({ event }: { event: Event }) => {
        // Radix sets this attribute on the body while a dropdown or dialog is open
        if (!document.body.hasAttribute("data-scroll-locked")) return true;

        // Dropdown open: scrolling outside of it scrolls the page (the dropdown closes),
        // scrolling inside its list stays native. Dialogs keep the page locked.
        return isDropdownOpen() && !isInsideDropdownList(event.target);
    },
};

// Closes an open dropdown when the page is scrolled outside of it, like native selects
function CloseDropdownOnScroll() {
    useEffect(() => {
        const onWheel = (event: WheelEvent) => {
            if (!isDropdownOpen() || isInsideDropdownList(event.target)) return;
            // Radix closes the topmost layer on Escape
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
        };

        window.addEventListener("wheel", onWheel, { passive: true, capture: true });
        return () => window.removeEventListener("wheel", onWheel, { capture: true });
    }, []);

    return null;
}

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
        <ReactLenis root options={LENIS_OPTIONS}>
            <ScrollReset />
            <CloseDropdownOnScroll />
            {children}
        </ReactLenis>
    );
}