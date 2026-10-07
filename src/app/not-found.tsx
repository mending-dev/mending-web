import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-32 text-center">
            <p className="font-mono text-sm text-primary">404</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Page not found</h1>
            <p className="mt-3 max-w-md text-muted-foreground">
                The page you are looking for does not exist or has been moved.
            </p>
            <div className="mt-8 flex gap-3">
                <Button size="lg" asChild>
                    <Link href="/">Back home</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <Link href="/products">Browse products</Link>
                </Button>
            </div>
        </div>
    );
}