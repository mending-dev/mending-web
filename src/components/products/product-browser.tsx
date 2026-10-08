"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    CATEGORIES,
    CATEGORY_LABELS,
    type Category,
    type Product,
    type StatusLabels,
} from "@/lib/types";
import { ProductCard } from "./product-card";
import { Reveal } from "@/components/reveal";
import { ProductSearch } from "./product-search";
import { compareVersions } from "@/lib/format";

const ALL = "all";

const unique = (values: string[]) => [...new Set(values)];

type Props = {
    products: Product[];
    searchPlaceholder: string;
    statusLabels: StatusLabels;
};

export function ProductBrowser({ products, searchPlaceholder, statusLabels }: Props) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState(ALL);
    const [version, setVersion] = useState(ALL);
    const [software, setSoftware] = useState(ALL);
    const [pricing, setPricing] = useState(ALL); // all | free | paid

    // Filter options are derived from the product JSONs
    const versions = useMemo(
        () =>
            unique(products.flatMap((p) => p.minecraftVersions)).sort((a, b) => compareVersions(b, a)),
        [products]
    );
    const softwareOptions = useMemo(
        () => unique(products.flatMap((p) => p.serverSoftware)).sort(),
        [products]
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return products
            .filter((p) => {
                if (category !== ALL && !p.categories.includes(category as Category)) return false;
                if (version !== ALL && !p.minecraftVersions.includes(version)) return false;
                if (software !== ALL && !p.serverSoftware.includes(software)) return false;
                if (pricing === "free" && p.price !== 0) return false;
                if (pricing === "paid" && p.price === 0) return false;
                if (!q) return true;
                return [p.title, p.shortDescription, ...p.tags].some((text) =>
                    text.toLowerCase().includes(q)
                );
            })
            // Featured products first, then alphabetical
            .sort(
                (a, b) =>
                    Number(!!b.featured) - Number(!!a.featured) || a.title.localeCompare(b.title)
            );
    }, [products, query, category, version, software, pricing]);

    const hasFilters =
        query !== "" || category !== ALL || version !== ALL || software !== ALL || pricing !== ALL;

    function reset() {
        setQuery("");
        setCategory(ALL);
        setVersion(ALL);
        setSoftware(ALL);
        setPricing(ALL);
    }

    return (
        <div className="space-y-6">
            {/* Search */}
            <div className="relative">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="h-11 pr-20 pl-10"
                />
                <ProductSearch products={products} />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
                {[ALL, ...CATEGORIES].map((c) => (
                    <Button
                        key={c}
                        size="sm"
                        variant={category === c ? "default" : "outline"}
                        onClick={() => setCategory(c)}
                    >
                        {c === ALL ? "All" : CATEGORY_LABELS[c as keyof typeof CATEGORY_LABELS]}
                    </Button>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
                <Select value={version} onValueChange={setVersion}>
                    <SelectTrigger className="w-44">
                        <SelectValue placeholder="Minecraft version" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={ALL}>All versions</SelectItem>
                        {versions.map((v) => (
                            <SelectItem key={v} value={v}>
                                {v}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={software} onValueChange={setSoftware}>
                    <SelectTrigger className="w-44">
                        <SelectValue placeholder="Server software" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={ALL}>All software</SelectItem>
                        {softwareOptions.map((s) => (
                            <SelectItem key={s} value={s}>
                                {s}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={pricing} onValueChange={setPricing}>
                    <SelectTrigger className="w-36">
                        <SelectValue placeholder="Price" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={ALL}>Any price</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                </Select>

                {hasFilters && (
                    <Button variant="ghost" size="sm" onClick={reset}>
                        <X className="size-4" />
                        Reset
                    </Button>
                )}

                <span className="ml-auto text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </span>
            </div>

            {/* Results */}
            {filtered.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((product) => (
                        <Reveal key={product.slug} className="h-full">
                            <ProductCard product={product} statusLabels={statusLabels} />
                        </Reveal>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-border py-20 text-center text-muted-foreground">
                    No products found. Try different filters.
                </div>
            )}
        </div>
    );
}