import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import ProductCard from "@/components/product/product-card";
import Link from "next/link";

export function ProductCarousel() {
    return (
        <Carousel className="w-full">
            <CarouselContent>
                {Array.from({ length: 20 }).map((_, index) => (
                    <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3">
                        <div>
                            <Link href={"/product/" + "TinyWorlds"}>
                                <ProductCard />
                            </Link>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
