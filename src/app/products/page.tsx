import { ProductBrowser } from "@/components/products/product-browser";
import { getProducts, getSiteConfig } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage() {
    const { productsPage } = getSiteConfig();
    const products = getProducts();

    return (
        <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="mb-10 space-y-3">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{productsPage.title}</h1>
                <p className="max-w-2xl text-muted-foreground">{productsPage.text}</p>
            </div>
            <ProductBrowser
                products={products}
                searchPlaceholder={productsPage.searchPlaceholder}
                statusLabels={productsPage.statusLabels}
            />
        </div>
    );
}