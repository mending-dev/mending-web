import { getSiteConfig } from "@/lib/content";
import { TerminalScreen } from "./terminal-screen";

export function Terminal() {
    const { terminal } = getSiteConfig().hero;

    return (
        <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-2xl shadow-emerald-500/10">
            {/* Window title bar (macOS style) */}
            <div className="relative flex items-center border-b border-white/10 bg-zinc-900 px-4 py-3">
                <div className="flex gap-2">
                    <span className="size-3 rounded-full bg-[#ff5f57]" />
                    <span className="size-3 rounded-full bg-[#febc2e]" />
                    <span className="size-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="absolute inset-x-0 text-center font-mono text-xs text-zinc-400">
          {terminal.title}
        </span>
            </div>

            {/* Terminal body (always dark, independent of theme) */}
            <TerminalScreen prompt={terminal.prompt} plugins={terminal.plugins} />
        </div>
    );
}