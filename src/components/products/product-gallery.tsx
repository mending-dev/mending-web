"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ImageRef } from "@/lib/types";

export function ProductGallery({ images }: { images: ImageRef[] }) {
    const [active, setActive] = useState(0);

    if (images.length === 0) return null;
    const current = images[active];

    return (
        <div className="space-y-3">
            {/* Main image */}
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/50 bg-muted">
                <Image
                    key={current.src}
                    src={current.src}
                    alt={current.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="object-cover"
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
                    {images.map((image, i) => (
                        <button
                            key={image.src}
                            type="button"
                            onClick={() => setActive(i)}
                            aria-label={`Show image ${i + 1}`}
                            className={cn(
                                "relative aspect-video overflow-hidden rounded-lg border-2 transition",
                                i === active
                                    ? "border-primary"
                                    : "border-transparent opacity-60 hover:opacity-100"
                            )}
                        >
                            <Image src={image.src} alt={image.alt} fill sizes="150px" className="object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}