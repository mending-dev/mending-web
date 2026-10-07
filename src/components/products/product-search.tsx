"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { formatPrice } from "@/lib/format";
import { CATEGORY_LABELS, type Product } from "@/lib/types";

const subscribe = () => () => {};

// Detects macOS/iOS to show the right shortcut label
function useIsMac() {
    return useSyncExternalStore(
        subscribe,
        () => /Mac|iPhone|iPad/.test(navigator.userAgent),
        () => false
    );
}

export function ProductSearch({ products }: { products: Product[] }) {
    const router = useRouter();
    const isMac = useIsMac();
    const [open, setOpen] = useState(false);

    // Featured products first, then alphabetical
    const sorted = useMemo(
        () =>
            [...products].sort(
                (a, b) =>
                    Number(!!b.featured) - Number(!!a.featured) || a.title.localeCompare(b.title)
            ),
        [products]
    );

    // Global shortcut: Ctrl + K / Cmd + K
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                setOpen((current) => !current);
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, []);

    function openProduct(slug: string) {
        setOpen(false);
        router.push(`/products/${slug}`);
    }

    return (
        <>
            {/* Shortcut hint inside the search field */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open quick search"
                className="absolute top-1/2 right-3 hidden -translate-y-1/2 items-center rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
                {isMac ? "⌘ K" : "Ctrl K"}
            </button>

            <CommandDialog
                open={open}
                onOpenChange={setOpen}
                title="Search products"
                description="Search for a product and press enter to open it."
                className="sm:max-w-2xl"
            >
                <CommandDialog
                    open={open}
                    onOpenChange={setOpen}
                    title="Search products"
                    description="Search for a product and press enter to open it."
                    className="sm:max-w-2xl"
                >
                    <Command
                        loop
                        onKeyDown={(event) => {
                            if (event.key !== "Tab") return;
                            // Tab / Shift + Tab move the selection like the arrow keys
                            event.preventDefault();
                            event.stopPropagation();
                            event.currentTarget.dispatchEvent(
                                new KeyboardEvent("keydown", {
                                    key: event.shiftKey ? "ArrowUp" : "ArrowDown",
                                    bubbles: true,
                                })
                            );
                        }}
                    >
                        <CommandInput placeholder="Search products, categories or tags..." />
                        <CommandList className="max-h-[420px]">
                            <CommandEmpty>No products found.</CommandEmpty>
                            <CommandGroup heading="Products">
                                {sorted.map((product) => {
                                    const image = product.images[0];
                                    return (
                                        <CommandItem
                                            key={product.slug}
                                            value={product.slug}
                                            keywords={[
                                                product.title,
                                                ...product.categories.map((c) => CATEGORY_LABELS[c]),
                                                product.shortDescription,
                                                ...product.tags,
                                            ]}
                                            onSelect={() => openProduct(product.slug)}
                                            className="gap-3 py-2"
                                        >
                                            <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-muted">
                                                {image && (
                                                    <Image
                                                        src={image.src}
                                                        alt=""
                                                        fill
                                                        sizes="40px"
                                                        className="object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-medium">{product.title}</p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    {product.categories.map((c) => CATEGORY_LABELS[c]).join(", ")}
                                                    {product.tags.length > 0 &&
                                                        ` · ${product.tags
                                                            .slice(0, 3)
                                                            .map((tag) => `#${tag}`)
                                                            .join(" ")}`}
                                                </p>
                                            </div>
                                            <span className="text-sm text-muted-foreground">
                                                {formatPrice(product.price, product.currency)}
                                            </span>
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </CommandList>
                        <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
                            ↑ ↓ to navigate · Enter to open · Esc to close
                        </div>
                    </Command>
                </CommandDialog>
                <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
                    ↑ ↓ to navigate · Enter to open · Esc to close
                </div>
            </CommandDialog>
        </>
    );
}