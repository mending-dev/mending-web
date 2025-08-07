import Link from 'next/link';
import {Button} from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="mb-6">Page not found.</p>
            <Link href="/">
                <Button>Back to Home</Button>
            </Link>
        </div>
    );
}