"use server";

import { contactSchema, type ContactValues } from "@/lib/contact-schema";

// Verifies the Turnstile token with Cloudflare
async function verifyCaptcha(token: string): Promise<boolean> {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
        console.error("TURNSTILE_SECRET_KEY is not set");
        return false;
    }

    try {
        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ secret, response: token }),
        });
        const data = (await response.json()) as { success: boolean };
        return data.success;
    } catch {
        return false;
    }
}

export async function sendContactMessage(values: ContactValues): Promise<{ ok: boolean }> {
    // Validate again on the server, never trust the client
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) return { ok: false };

    const { name, email, type, message, website, turnstileToken } = parsed.data;

    // Honeypot filled = bot, pretend success
    if (website) return { ok: true };

    // Captcha must be valid
    if (!(await verifyCaptcha(turnstileToken))) return { ok: false };

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
        console.error("DISCORD_WEBHOOK_URL is not set");
        return { ok: false };
    }

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                // Prevent @everyone / role pings from user input
                allowed_mentions: { parse: [] },
                embeds: [
                    {
                        title: `New inquiry: ${type}`,
                        description: message,
                        color: 0x10b981,
                        fields: [
                            { name: "Name", value: name, inline: true },
                            { name: "Email", value: email, inline: true },
                        ],
                        timestamp: new Date().toISOString(),
                    },
                ],
            }),
        });
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}