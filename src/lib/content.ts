import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { productSchema } from "./product-schema";
import type { Product, SiteConfig } from "./types";
import { compareVersions } from "./format";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Load the global site config
export const getSiteConfig = cache((): SiteConfig => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, "site.json"), "utf-8");
    return JSON.parse(raw) as SiteConfig;
});

// Loads and validates a single product file
function loadProduct(file: string): Product {
    const slug = file.replace(/\.json$/, "");
    const where = `content/products/${file}`;

    if (!/^[A-Za-z0-9_-]+$/.test(slug)) {
        throw new Error(`${where}: file name may only contain letters, numbers, "-" and "_"`);
    }

    let data: unknown;
    try {
        data = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, "products", file), "utf-8"));
    } catch {
        throw new Error(`${where}: invalid JSON syntax`);
    }

    const result = productSchema.safeParse(data);
    if (!result.success) {
        const issues = result.error.issues
            .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
            .join("\n");
        throw new Error(`${where} is invalid:\n${issues}`);
    }

    // Warn (not fail) when a local image file is missing
    for (const image of result.data.images) {
        if (image.src.startsWith("/") && !fs.existsSync(path.join(PUBLIC_DIR, image.src))) {
            console.warn(`[products] ${where}: image not found in /public: ${image.src}`);
        }
    }

    return {
        slug,
        ...result.data,
        // Newest Minecraft version first
        minecraftVersions: [...result.data.minecraftVersions].sort((a, b) => compareVersions(b, a)),
    };
}

// Load all products (one .json file per product)
export const getProducts = cache((): Product[] => {
    const dir = path.join(CONTENT_DIR, "products");
    const products = fs
        .readdirSync(dir)
        .filter((file) => file.endsWith(".json"))
        .map(loadProduct);

    // Slugs are matched case-insensitively, so they must be unique that way
    const seen = new Set<string>();
    for (const product of products) {
        const key = product.slug.toLowerCase();
        if (seen.has(key)) {
            throw new Error(`Duplicate product slug (case-insensitive): "${product.slug}"`);
        }
        seen.add(key);
    }

    // Internal product links (e.g. "/products/MendingCore") must point to an existing product
    for (const product of products) {
        for (const item of [...product.dependencies, ...product.compatibleWith]) {
            const match = item.url?.match(/^\/products\/([^/?#]+)/);
            if (match && !seen.has(match[1].toLowerCase())) {
                throw new Error(
                    `content/products/${product.slug}.json: "${item.name}" links to unknown product "${match[1]}"`
                );
            }
        }
    }

    return products;
});

// Case-insensitive lookup
export function getProduct(slug: string): Product | undefined {
    const key = slug.toLowerCase();
    return getProducts().find((p) => p.slug.toLowerCase() === key);
}

// Load the Markdown description of a product (empty string if missing)
export function getProductDescription(product: Product): string {
    const file = product.descriptionFile ?? `${product.slug}.md`;
    const filePath = path.join(CONTENT_DIR, "descriptions", file);
    return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf-8") : "";
}