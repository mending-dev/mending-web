import { CATEGORY_LABELS, type Product, type SiteConfig } from "./types";

// Builds schema.org Product markup for a product page
export function productJsonLd(product: Product, site: SiteConfig) {
    const absolute = (src: string) => (src.startsWith("http") ? src : `${site.url}${src}`);

    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.shortDescription,
        sku: product.slug,
        url: `${site.url}/products/${product.slug}`,
        image: product.images.map((image) => absolute(image.src)),
        brand: { "@type": "Brand", name: site.name },
        category: product.categories.map((c) => CATEGORY_LABELS[c]).join(", "),
        // One offer per shop the product is sold on
        // Only available products with at least one shop get offers
        ...(product.status === "available" &&
            product.sources.length > 0 && {
                offers: product.sources.map((source) => ({
                    "@type": "Offer",
                    url: source.url,
                    price: (source.price ?? product.price).toFixed(2),
                    priceCurrency: product.currency,
                    availability: "https://schema.org/InStock",
                    seller: { "@type": "Organization", name: source.name },
                })),
            }),
    };
}