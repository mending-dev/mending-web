// Shared types for site config and products

export type NavItem = { label: string; href: string };

export type ImageRef = { src: string; alt: string };

export type SiteConfig = {
    url: string; // production URL without trailing slash
    ogImage: string; // social preview image, 1200 x 630 px
    name: string;
    slogan: string;
    description: string;
    logo: ImageRef;
    links: { github: string; discord: string; kofi: string };
    nav: NavItem[];
    hero: {
        titlePrefix: string;
        titleHighlight: string; // rendered in emerald gradient
        titleSuffix: string;
        text: string;
        primaryButton: NavItem;
        secondaryButton: NavItem;
        terminal: {
            title: string;
            prompt: string;
            plugins: { name: string; version: string }[];
        };
    };
    about: {
        title: string;
        text: string;
        image: ImageRef;
        techStackTitle: string;
        techStack: { title: string; description: string; icon: string }[];
    };
    community: {
        title: string;
        text: string;
        features: string[];
        buttonLabel: string;
    };
    productsPage: {
        title: string;
        text: string;
        searchPlaceholder: string;
        statusLabels: StatusLabels;
    };
    contact: {
        title: string;
        text: string;
        discordTitle: string;
        discordNote: string;
        discordButtonLabel: string;
        projectTypes: string[];
        form: {
            nameLabel: string;
            emailLabel: string;
            typeLabel: string;
            typePlaceholder: string;
            messageLabel: string;
            messagePlaceholder: string;
            submitLabel: string;
            successMessage: string;
            errorMessage: string;
        };
    };
    footer: {
        text: string;
        columns: { title: string; links: NavItem[] }[];
        copyright: string;
    };
};

export const CATEGORIES = [
    "plugins",
    "libraries",
    "addons",
    "server-setups",
    "tools",
    "web",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type ProductSource = {
    name: string; // e.g. "SpigotMC", "BuiltByBit"
    url: string;
    price?: number; // optional per-source price override
};

export type Product = {
    slug: string; // taken from the file name
    title: string;
    shortDescription: string;
    categories: Category[]; // at least one
    price: number; // 0 = free
    currency: string;
    featured?: boolean;
    images: ImageRef[]; // first image = card thumbnail
    sources: ProductSource[];
    dependencies: ProductDependency[]; // name + optional download link
    compatibleWith: ProductDependency[]; // same shape as dependencies
    minecraftVersions: string[];
    serverSoftware: string[]; // e.g. ["Paper", "Velocity"]
    tags: string[];
    version?: string;
    descriptionFile?: string; // defaults to <slug>.md
    sourceCode?: string;
    documentation?: string;
    status: ProductStatus;
};

export type ProductDependency = { name: string; url?: string };

export const CATEGORY_LABELS: Record<Category, string> = {
    plugins: "Plugins",
    libraries: "Libraries / APIs",
    addons: "Addons",
    "server-setups": "Server Setups",
    tools: "Tools",
    web: "Web",
};

export const PRODUCT_STATUSES = ["available", "maintenance", "coming-soon"] as const;

export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

// Button text for products that cannot be bought or downloaded right now
export type StatusLabels = Record<Exclude<ProductStatus, "available">, string>;