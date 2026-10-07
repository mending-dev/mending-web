import { ArrowRight, BookOpen, Code2, ExternalLink } from "lucide-react";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { getSiteConfig } from "@/lib/content";
import { SourceDialog } from "./source-dialog";
import Link from "next/link";

const { productsPage } = getSiteConfig();

function InfoBlock({
   title,
   items,
   variant = "secondary",
   prefix = "",
}: {
    title: string;
    items: string[];
    variant?: "secondary" | "outline";
    prefix?: string;
}) {
    return (
        <div className="space-y-2">
            <h3 className="text-sm font-semibold">{title}</h3>
            {items.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                        <Badge key={item} variant={variant}>
                            {prefix}
                            {item}
                        </Badge>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-muted-foreground">None</p>
            )}
        </div>
    );
}

// Badge list where items can link to an external site or an internal page
function LinkBlock({
                       title,
                       items,
                       hideWhenEmpty = false,
                   }: {
    title: string;
    items: Product["dependencies"];
    hideWhenEmpty?: boolean;
}) {
    if (hideWhenEmpty && items.length === 0) return null;

    const linkClass = cn(
        badgeVariants({ variant: "secondary" }),
        "gap-1 transition-colors hover:bg-primary/20 hover:text-primary"
    );

    return (
        <div className="space-y-2">
            <h3 className="text-sm font-semibold">{title}</h3>
            {items.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => {
                        if (!item.url) {
                            return (
                                <Badge key={item.name} variant="secondary">
                                    {item.name}
                                </Badge>
                            );
                        }

                        // Internal path (e.g. /products/MendingCore), works on localhost and in production
                        if (item.url.startsWith("/")) {
                            return (
                                <Link key={item.name} href={item.url} className={linkClass}>
                                    {item.name}
                                    <ArrowRight className="size-3" />
                                </Link>
                            );
                        }

                        return (
                            <a
                                key={item.name}
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className={linkClass}
                            >
                                {item.name}
                                <ExternalLink className="size-3" />
                            </a>
                        );
                    })}
                </div>
            ) : (
                <p className="text-sm text-muted-foreground">None</p>
            )}
        </div>
    );
}

export function ProductSidebar({ product }: { product: Product }) {
    const hasLinks = product.sourceCode || product.documentation;

    return (
        <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="space-y-5">
                    <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">
              {formatPrice(product.price, product.currency)}
            </span>
                        {product.version && (
                            <span className="text-sm text-muted-foreground">{product.version}</span>
                        )}
                    </div>

                    <SourceDialog
                        product={product}
                        statusLabels={productsPage.statusLabels}
                        size="lg"
                        className="h-12 w-full text-base"
                    />

                    {hasLinks && (
                        <div className="grid gap-2">
                            {product.sourceCode && (
                                <Button variant="outline" asChild>
                                    <a href={product.sourceCode} target="_blank" rel="noreferrer">
                                        <Code2 className="size-4" />
                                        Source Code
                                    </a>
                                </Button>
                            )}
                            {product.documentation && (
                                <Button variant="outline" asChild>
                                    <a href={product.documentation} target="_blank" rel="noreferrer">
                                        <BookOpen className="size-4" />
                                        Documentation
                                    </a>
                                </Button>
                            )}
                        </div>
                    )}

                    <Separator />

                    <LinkBlock title="Dependencies" items={product.dependencies} hideWhenEmpty />
                    <LinkBlock title="Compatible With" items={product.compatibleWith} hideWhenEmpty />
                    <InfoBlock title="Supported Minecraft Versions" items={product.minecraftVersions} />
                    <InfoBlock title="Supported Server Software" items={product.serverSoftware} />
                    <InfoBlock title="Tags" items={product.tags} variant="outline" prefix="#" />
                </CardContent>
            </Card>
        </aside>
    );
}