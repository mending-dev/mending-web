import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Markdown } from "@/components/products/markdown";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductSidebar } from "@/components/products/product-sidebar";
import {
    getProduct,
    getProductDescription,
    getProducts,
    getSiteConfig,
} from "@/lib/content";
import { productJsonLd } from "@/lib/structured-data";
import { CATEGORY_LABELS } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

// Pre-render one page per product JSON
export function generateStaticParams() {
    return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = getProduct(slug);
    if (!product) return {};

    return {
        title: product.title,
        description: product.shortDescription,
        alternates: { canonical: `/products/${product.slug}` },
        openGraph: {
            title: product.title,
            description: product.shortDescription,
            images: product.images[0] ? [product.images[0].src] : [],
        },
    };
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = getProduct(slug);
    if (!product) notFound();

    // Slugs are case-insensitive, redirect to the canonical spelling
    if (product.slug !== slug) permanentRedirect(`/products/${product.slug}`);

    const description = getProductDescription(product);
    const jsonLd = productJsonLd(product, getSiteConfig());

    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            {/* Structured data for search engines */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
                }}
            />

            <Link
                href="/products"
                className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="size-4" />
                Back to products
            </Link>

            <header className="mb-8 space-y-3">
                <div className="flex flex-wrap gap-2">
                    {product.categories.map((category) => (
                        <Badge key={category} variant="secondary">
                            {CATEGORY_LABELS[category]}
                        </Badge>
                    ))}
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{product.title}</h1>
                <p className="max-w-2xl text-muted-foreground">{product.shortDescription}</p>
            </header>

            <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
                <div className="min-w-0 space-y-10">
                    <ProductGallery images={product.images} />

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold">Description</h2>
                        {description ? (
                            <Markdown content={description} />
                        ) : (
                            <p className="text-muted-foreground">{product.shortDescription}</p>
                        )}
                    </section>
                </div>

                <ProductSidebar product={product} />
            </div>
        </div>
    );
}