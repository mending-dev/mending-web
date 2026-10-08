// Formats a price, 0 is shown as "Free"
export function formatPrice(price: number, currency: string) {
    if (price === 0) return "Free";
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price);
}

// Compares versions like "1.21.1" numerically, so 26.1 > 1.21.1 > 1.21 > 1.8
export function compareVersions(a: string, b: string): number {
    const partsA = a.match(/\d+/g)?.map(Number) ?? [];
    const partsB = b.match(/\d+/g)?.map(Number) ?? [];

    for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
        const diff = (partsA[i] ?? 0) - (partsB[i] ?? 0);
        if (diff !== 0) return diff;
    }
    return a.localeCompare(b);
}