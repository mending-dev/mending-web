"use client"

import {Button} from "@/components/ui/button";
import { motion } from "motion/react";
import { Link as SectionLink } from "react-scroll";
import {ProductCarousel} from "@/components/product/product-carousel";
import Link from "next/link";

export default function Home() {

    return (
        <main>
            <motion.section
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
                id="home"
                className="h-dvh w-full px-5 md:px-25 xl:px-50 2xl:px-75 py-8 flex flex-col justify-center items-center gap-6"
            >
                <motion.h1
                    className="font-black text-xl sm:text-2xl md:text-4xl text-center w-full md:w-200"
                >
                    High-Quality <span className="highlight">Paper & Velocity</span> Plugins for modern Minecraft Servers.
                </motion.h1>
                <SectionLink to="products" smooth={true} duration={400}>
                    <Button className="highlight-button">Showcase</Button>
                </SectionLink>
            </motion.section>
            <motion.section
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
                className="w-full px-5 md:px-25 xl:px-50 2xl:px-75 py-8 flex flex-col justify-center items-center gap-4"
            >
            </motion.section>
            <motion.section
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
                id="products"
                className="h-dvh w-full px-5 md:px-25 xl:px-50 2xl:px-75 py-8 flex flex-col justify-center items-center gap-6"
            >
                <h2 className="font-black text-xl sm:text-2xl md:text-4xl">Most popular</h2>
                <ProductCarousel />
                <Link href="/products" >
                    <Button variant="ghost">View all products</Button>
                </Link>
            </motion.section>
        </main>
    );
}
