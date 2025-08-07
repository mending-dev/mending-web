import {Card, CardContent} from "@/components/ui/card";
import * as React from "react";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";

export default function ProductCard() {
    return (
        <Card className="hover:scale-95 smooth">
            <CardContent className="flex flex-col gap-6 p-6">
                <Image className="rounded-lg" src="/tinyworlds.png" alt="Preview" width={1280} height={720} />
                <div className="flex justify-center gap-2">
                    <Badge variant="outline">Plugin</Badge>
                    <Badge variant="outline">Paper</Badge>
                </div>
                <article>
                    <h3 className="font-semibold text-md">TinyWorlds</h3>
                    <p className="text-gray-600 dark:text-gray-200">Simple & lightweight world manager with an intuitive gui.</p>
                </article>
            </CardContent>
        </Card>
    )
}