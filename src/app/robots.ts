import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
    const { url } = getSiteConfig();

    return {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${url}/sitemap.xml`,
    };
}