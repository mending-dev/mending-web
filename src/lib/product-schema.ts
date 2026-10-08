import { z } from "zod";
import { CATEGORIES, PRODUCT_STATUSES } from "./types";

const url = z.string().url();

// Full https URL or internal path like "/products/MendingCore"
const linkTarget = z
    .string()
    .refine(
        (value) => (value.startsWith("/") ? !value.startsWith("//") : /^https?:\/\/\S+$/.test(value)),
        "Must be a full URL (https://...) or an internal path like /products/MendingCore"
    );

const imageSchema = z.strictObject({
    src: z.string().min(1),
    alt: z.string(),
});

const sourceSchema = z.strictObject({
    name: z.string().min(1),
    url,
    price: z.number().min(0).optional(),
});

// A dependency is either just a name or a name with a download link
const dependencySchema = z.union([
    z.string().min(1).transform((name) => ({ name })),
    z.strictObject({ name: z.string().min(1), url: linkTarget.optional() }),
]);

// strictObject rejects unknown keys, so typos like "dependancies" are caught
export const productSchema = z.strictObject({
    title: z.string().min(1),
    shortDescription: z.string().min(1),
    categories: z.array(z.enum(CATEGORIES)).min(1),
    price: z.number().min(0),
    currency: z.string().length(3),
    featured: z.boolean().optional(),
    images: z.array(imageSchema).min(1),
    status: z.enum(PRODUCT_STATUSES).default("available"),
    sources: z.array(sourceSchema).default([]),
    dependencies: z.array(dependencySchema).default([]),
    compatibleWith: z.array(dependencySchema).default([]),
    minecraftVersions: z.array(z.string().min(1)).min(1),
    serverSoftware: z.array(z.string().min(1)).min(1),
    tags: z.array(z.string().min(1)).default([]),
    version: z.string().optional(),
    liveDemo: url.optional(),
    documentation: url.optional(),
    sourceCode: url.optional(),
    descriptionFile: z.string().regex(/^[\w.-]+\.md$/).optional(),
}).refine((product) => product.status !== "available" || product.sources.length > 0, {
    path: ["sources"],
    message: "Available products need at least one source",
});