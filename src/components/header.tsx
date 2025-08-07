import {ThemeToggle} from "@/components/theme/theme-toggle";
import DiscordButton from "@/components/discord-button";
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full px-5 md:px-25 xl:px-50 2xl:px-75 py-8 fixed flex items-center justify-between bg-background">
            <Link href="/" className="font-black text-lg cursor-pointer hover:opacity-80 smooth">mending.dev</Link>
            <div className="flex gap-2">
                <Link href="/discord" target="_blank">
                    <DiscordButton />
                </Link>
                <ThemeToggle />
            </div>
        </header>
    )
}