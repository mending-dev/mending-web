// Formats a price, 0 is shown as "Free"
export function formatPrice(price: number, currency: string) {
    if (price === 0) return "Free";
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price);
}