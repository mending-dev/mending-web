"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
import type { ImageRef } from "@/lib/types";

const controlClass =
    "absolute flex size-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70";

export function ProductGallery({ images }: { images: ImageRef[] }) {
    const [active, setActive] = useState(0);
    const [open, setOpen] = useState(false);

    if (images.length === 0) return null;

    const current = images[active];
    const multiple = images.length > 1;

    // Wraps around at both ends
    const show = (index: number) => setActive((index + images.length) % images.length);

    return (
        <div className="space-y-3">
            {/* Main image, click to enlarge */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Enlarge image"
                className="group relative block aspect-video w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border/50 bg-muted"
            >
                <Image
                    key={current.src}
                    src={current.src}
                    alt={current.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="object-cover"
                />
                <span className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          <ZoomIn className="size-4" />
        </span>
            </button>

            {/* Thumbnails */}
            {multiple && (
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

            {/* Lightbox */}
            <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
                <DialogPrimitive.Portal>
                    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
                    <DialogPrimitive.Content
                        // Keeps smooth scrolling (Lenis) from scrolling the page behind the lightbox
                        data-lenis-prevent
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none sm:p-10"
                        onClick={(event) => {
                            // Click on the empty area closes the lightbox
                            if (event.target === event.currentTarget) setOpen(false);
                        }}
                        onKeyDown={(event) => {
                            if (!multiple) return;
                            if (event.key === "ArrowRight") show(active + 1);
                            if (event.key === "ArrowLeft") show(active - 1);
                        }}
                    >
                        <DialogPrimitive.Title className="sr-only">{current.alt}</DialogPrimitive.Title>
                        <DialogPrimitive.Description className="sr-only">
                            Enlarged product image
                        </DialogPrimitive.Description>

                        <div className="relative h-[80vh] w-full max-w-6xl">
                            <Image
                                key={current.src}
                                src={current.src}
                                alt={current.alt}
                                fill
                                sizes="(min-width: 1280px) 1152px, 100vw"
                                className="object-contain"
                            />
                        </div>

                        <DialogPrimitive.Close aria-label="Close" className={cn(controlClass, "top-4 right-4")}>
                            <X className="size-5" />
                        </DialogPrimitive.Close>

                        {multiple && (
                            <>
                                <button
                                    type="button"
                                    aria-label="Previous image"
                                    onClick={() => show(active - 1)}
                                    className={cn(controlClass, "top-1/2 left-4 -translate-y-1/2")}
                                >
                                    <ChevronLeft className="size-6" />
                                </button>
                                <button
                                    type="button"
                                    aria-label="Next image"
                                    onClick={() => show(active + 1)}
                                    className={cn(controlClass, "top-1/2 right-4 -translate-y-1/2")}
                                >
                                    <ChevronRight className="size-6" />
                                </button>
                                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur">
                  {active + 1} / {images.length}
                </span>
                            </>
                        )}
                    </DialogPrimitive.Content>
                </DialogPrimitive.Portal>
            </DialogPrimitive.Root>
        </div>
    );
}