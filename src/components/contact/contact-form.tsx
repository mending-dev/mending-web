"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { Loader2, Send } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { sendContactMessage } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";
import type { SiteConfig } from "@/lib/types";

type Props = {
    projectTypes: string[];
    labels: SiteConfig["contact"]["form"];
};

function FieldError({ message }: { message?: string }) {
    return message ? <p className="text-sm text-destructive">{message}</p> : null;
}

function ContactFormFields({
                               projectTypes,
                               labels,
                               onSent,
                           }: Props & { onSent: () => void }) {
    const { resolvedTheme } = useTheme();
    // Changing the key remounts the widget, which requests a fresh token
    const [captchaKey, setCaptchaKey] = useState(0);

    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ContactValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            type: "",
            message: "",
            turnstileToken: "",
            website: "",
        },
    });

    async function onSubmit(values: ContactValues) {
        const result = await sendContactMessage(values);
        if (result.ok) {
            toast.success(labels.successMessage);
            onSent();
        } else {
            toast.error(labels.errorMessage);
            // Tokens are single-use, request a fresh one
            setCaptchaKey((k) => k + 1);
            setValue("turnstileToken", "");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name">{labels.nameLabel}</Label>
                    <Input id="name" autoComplete="name" {...register("name")} />
                    <FieldError message={errors.name?.message} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">{labels.emailLabel}</Label>
                    <Input id="email" type="email" autoComplete="email" {...register("email")} />
                    <FieldError message={errors.email?.message} />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="type">{labels.typeLabel}</Label>
                <Controller
                    control={control}
                    name="type"
                    render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger id="type" className="w-full">
                                <SelectValue placeholder={labels.typePlaceholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {projectTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                <FieldError message={errors.type?.message} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="message">{labels.messageLabel}</Label>
                <Textarea
                    id="message"
                    rows={7}
                    placeholder={labels.messagePlaceholder}
                    {...register("message")}
                />
                <FieldError message={errors.message?.message} />
            </div>

            {/* Captcha */}
            <div className="space-y-2">
                <Turnstile
                    key={captchaKey}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    options={{ theme: resolvedTheme === "light" ? "light" : "dark" }}
                    onSuccess={(token) => setValue("turnstileToken", token, { shouldValidate: true })}
                    onExpire={() => setValue("turnstileToken", "")}
                    onError={() => setValue("turnstileToken", "")}
                />
                <FieldError message={errors.turnstileToken?.message} />
            </div>

            {/* Honeypot: invisible for humans, bots tend to fill it */}
            <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px]"
                {...register("website")}
            />

            <Button type="submit" size="lg" className="h-12 px-8 text-base" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="size-5 animate-spin" /> : <Send className="size-5" />}
                {labels.submitLabel}
            </Button>
        </form>
    );
}

export function ContactForm(props: Props) {
    // Changing the key remounts the form (and a fresh captcha) after a successful send
    const [formKey, setFormKey] = useState(0);

    return (
        <ContactFormFields
            key={formKey}
            {...props}
            onSent={() => setFormKey((k) => k + 1)}
        />
    );
}