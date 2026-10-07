import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().trim().min(2, "Please enter your name").max(80),
    email: z.string().trim().email("Please enter a valid email address").max(120),
    type: z.string().min(1, "Please select a project type"),
    message: z
        .string()
        .trim()
        .min(20, "Please write at least 20 characters")
        .max(3000, "Message is too long"),
    // Cloudflare Turnstile token
    turnstileToken: z.string().min(1, "Please complete the captcha"),
    // Honeypot field, must stay empty
    website: z.string().optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;