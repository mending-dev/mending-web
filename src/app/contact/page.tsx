import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact/contact-form";
import { DiscordIcon } from "@/components/icons";
import { getSiteConfig } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
    const { contact, links } = getSiteConfig();

    return (
        <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="mb-10 space-y-3">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{contact.title}</h1>
                <p className="max-w-2xl text-muted-foreground">{contact.text}</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                    <CardContent>
                        <ContactForm projectTypes={contact.projectTypes} labels={contact.form} />
                    </CardContent>
                </Card>

                {/* Discord hint */}
                <Card className="self-start border-primary/30 bg-primary/5">
                    <CardContent className="space-y-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <DiscordIcon className="size-5" />
                        </div>
                        <h2 className="text-lg font-semibold">{contact.discordTitle}</h2>
                        <p className="text-sm text-muted-foreground">{contact.discordNote}</p>
                        <Button className="w-full" asChild>
                            <a href={links.discord} target="_blank" rel="noreferrer">
                                {contact.discordButtonLabel}
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}