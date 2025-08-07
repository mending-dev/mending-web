import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/components/theme/theme-provider"
import Header from "@/components/header";

export const metadata: Metadata = {
    title: "Minecraft Plugins by MrMending",
    description: "High-Quality Paper & Velocity Plugins for modern Minecraft Servers.",
};

export default function RootLayout({
   children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Header />
                {children}
            </ThemeProvider>
        </body>
        </html>
    );
}
