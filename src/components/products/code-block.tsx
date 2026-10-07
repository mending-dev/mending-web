"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";

export function CodeBlock({ children }: { children: React.ReactNode }) {
    const preRef = useRef<HTMLPreElement>(null);
    const [copied, setCopied] = useState(false);

    async function copy() {
        const text = preRef.current?.textContent ?? "";
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard not available (e.g. insecure context)
        }
    }

    return (
        // not-prose opts out of the typography styles
        <div className="not-prose group relative my-6 overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
            <button
                type="button"
                onClick={copy}
                aria-label="Copy code"
                className="absolute top-2.5 right-2.5 z-10 flex size-8 items-center justify-center rounded-md border border-white/10 bg-zinc-900 text-zinc-400 transition hover:text-zinc-100 focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            >
                {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
            </button>
            <pre
                ref={preRef}
                className="overflow-x-auto p-4 pr-14 font-mono text-sm leading-relaxed text-zinc-200 [&_code]:bg-transparent! [&_code]:p-0!"
            >
        {children}
      </pre>
        </div>
    );
}