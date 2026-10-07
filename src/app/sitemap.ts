import type { MetadataRoute } from "next";
import { getProducts, getSiteConfig } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
    const { url } = getSiteConfig();

    const pages = ["", "/products", "/contact"].map((path) => ({
        url: `${url}${path}`,
        changeFrequency: "monthly" as const,
        priority: path === "" ? 1 : 0.8,
    }));

    // One entry per product JSON
    const products = getProducts().map((product) => ({
        url: `${url}/products/${product.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...pages, ...products];
}