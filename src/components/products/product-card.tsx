import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";
import { CATEGORY_LABELS, type Product, type StatusLabels } from "@/lib/types";
import { SourceDialog } from "./source-dialog";

export function ProductCard({
    product,
    statusLabels,
}: {
    product: Product;
    statusLabels: StatusLabels;
}) {

    const image = product.images[0];
    const href = `/products/${product.slug}`;

    return (
        <Card className="group flex h-full flex-col overflow-hidden border-border/50 bg-card/50 pt-0 backdrop-blur transition-colors hover:border-primary/50">
            <Link href={href} className="relative block aspect-video overflow-hidden bg-muted">
                {image && (
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                )}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {product.categories.map((category) => (
                        <Badge key={category} variant="secondary">
                            {CATEGORY_LABELS[category]}
                        </Badge>
                    ))}
                </div>
            </Link>

            <CardContent className="flex-1 space-y-2">
                <Link href={href}>
                    <h3 className="text-lg font-semibold transition-colors hover:text-primary">
                        {product.title}
                    </h3>
                </Link>
                <p className="line-clamp-3 text-sm text-muted-foreground">{product.shortDescription}</p>
            </CardContent>

            <CardFooter className="justify-between">
        <span className="text-lg font-semibold">
          {formatPrice(product.price, product.currency)}
        </span>
                <SourceDialog product={product} statusLabels={statusLabels} />
            </CardFooter>
        </Card>
    );
}