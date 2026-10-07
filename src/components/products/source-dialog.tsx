"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { formatPrice } from "@/lib/format";
import type { Product, StatusLabels } from "@/lib/types";

type Props = {
    product: Product;
    statusLabels: StatusLabels;
    size?: "default" | "sm" | "lg";
    className?: string;
};

export function SourceDialog({ product, statusLabels, size = "default", className }: Props) {
    // Maintenance / coming soon: disabled button with a status text
    if (product.status !== "available") {
        return (
            <Button size={size} variant="secondary" className={className} disabled>
                {statusLabels[product.status]}
            </Button>
        );
    }

    // Free products are downloaded, paid products are bought
    const verb = product.price === 0 ? "Download" : "Buy";

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={size} className={className}>
                    {verb}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {verb} {product.title}
                    </DialogTitle>
                    <DialogDescription>Choose a platform to continue.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-2">
                    {product.sources.map((source) => (
                        <Button
                            key={source.url}
                            variant="outline"
                            className="h-12 justify-between"
                            asChild
                        >
                            <a href={source.url} target="_blank" rel="noreferrer">
                                <span>{source.name}</span>
                                <span className="flex items-center gap-2 text-muted-foreground">
                  {source.price !== undefined && formatPrice(source.price, product.currency)}
                                    <ExternalLink className="size-4" />
                </span>
                            </a>
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}