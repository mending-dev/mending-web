import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function DiscordButton() {
    return (
        <Button variant="outline">
            <Image
                src="/discord-black.svg"
                alt="Light Logo"
                className="block dark:hidden"
                width={16}
                height={16}
            />
            <Image
                src="/discord-white.svg"
                alt="Dark Logo"
                className="hidden dark:block"
                width={16}
                height={16}
            />
            Discord
        </Button>
    )
}