"use client";

import { useEffect, useRef, useState } from "react";

type Tone = "default" | "dim" | "accent";
type Segment = { text: string; tone?: Tone };
type Line = Segment[];
type Plugin = { name: string; version: string };
type Step = { line: Line; delay: number };

const TONE_CLASS: Record<Tone, string> = {
    default: "text-zinc-200",
    dim: "text-zinc-500",
    accent: "text-emerald-400",
};

// Prompt shown while the Minecraft server console is running
const SERVER_PROMPT = ">";
const CLEAR_COMMAND = "clear";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const step = (line: Line, delay: number): Step => ({ line, delay });

// Builds a console log line like "[INFO]: message"
function info(message: string | Segment[]): Line {
    const body: Segment[] = typeof message === "string" ? [{ text: message }] : message;
    return [{ text: "[INFO]: ", tone: "dim" }, ...body];
}

function bootLog(plugins: Plugin[]): Step[] {
    return [
        step([{ text: "Starting org.bukkit.craftbukkit.Main", tone: "dim" }], 400),
        step(info("[bootstrap] Running Java 25 (OpenJDK 64-Bit Server VM)"), 250),
        step(
            info([
                { text: "[bootstrap] Loading " },
                { text: "Paper 26.2-130", tone: "accent" },
                { text: " for Minecraft 26.2" },
            ]),
            250
        ),
        step(info(`[PluginInitializerManager] Initialized ${plugins.length} plugins`), 400),
        step(info("Starting minecraft server version 26.2"), 300),
        step(info("Loading properties"), 150),
        step(info("Default game type: SURVIVAL"), 150),
        step(info("Starting Minecraft server on *:25565"), 400),
        step(info('Preparing level "world"'), 500),
        step(info("Preparing spawn area: 100%"), 600),
        step(info('Done preparing level "world" (2.639s)'), 300),
        ...plugins.map((p) =>
            step(info(`[${p.name}] Enabling ${p.name} v${p.version}`), 200)
        ),
    ];
}

function doneLine(seconds: number): Line {
    return info([
        { text: `Done (${seconds.toFixed(3)}s)!`, tone: "accent" },
        { text: ' For help, type "help"' },
    ]);
}

function pluginsLine(plugins: Plugin[]): Line {
    const names: Segment[] = plugins.flatMap((p, i) => [
        ...(i > 0 ? [{ text: ", " }] : []),
        { text: p.name, tone: "accent" as const },
    ]);
    return info([{ text: `Server Plugins (${plugins.length}): ` }, ...names]);
}

function stopLog(plugins: Plugin[]): Step[] {
    return [
        step(info("Stopping the server"), 300),
        step(info("Stopping server"), 200),
        ...plugins.map((p) =>
            step(info(`[${p.name}] Disabling ${p.name} v${p.version}`), 150)
        ),
        step(info("Saving players"), 250),
        step(info("Saving worlds"), 250),
        step(info("ThreadedAnvilChunkStorage: All dimensions are saved"), 400),
    ];
}

export function TerminalScreen({ prompt, plugins }: { prompt: string; plugins: Plugin[] }) {
    const [lines, setLines] = useState<Line[]>([]);
    const [activePrompt, setActivePrompt] = useState<string | null>(null);
    const [typed, setTyped] = useState("");
    const screenRef = useRef<HTMLDivElement>(null);

    // Keep the newest line visible, like a real terminal
    useEffect(() => {
        const el = screenRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [lines, typed, activePrompt]);

    useEffect(() => {
        let cancelled = false;

        // Sleeps and aborts the whole animation after unmount
        const wait = async (ms: number) => {
            await sleep(ms);
            if (cancelled) throw new Error("cancelled");
        };

        const print = (line: Line) => setLines((prev) => [...prev, line]);

        async function printSteps(steps: Step[]) {
            for (const { line, delay } of steps) {
                print(line);
                await wait(delay);
            }
        }

        // Types a command character by character, then "submits" it
        async function type(promptText: string, command: string) {
            setActivePrompt(promptText);
            setTyped("");
            await wait(700);
            for (const char of command) {
                setTyped((t) => t + char);
                await wait(70 + Math.random() * 60);
            }
            await wait(350);
            print([
                { text: `${promptText} `, tone: promptText === prompt ? "accent" : "dim" },
                { text: command },
            ]);
            setActivePrompt(null);
            setTyped("");
        }

        async function run() {
            try {
                while (true) {
                    // Clear screen = restart of the loop
                    setLines([]);
                    await type(prompt, "./start.sh");
                    const startedAt = performance.now();
                    await printSteps(bootLog(plugins));
                    // Real elapsed time of the "boot" in seconds
                    await printSteps([step(doneLine((performance.now() - startedAt) / 1000), 0)]);
                    await wait(1200);
                    await type(SERVER_PROMPT, "plugins");
                    await printSteps([step(pluginsLine(plugins), 0)]);
                    await wait(1800);
                    await type(SERVER_PROMPT, "stop");
                    await printSteps(stopLog(plugins));
                    await wait(1000);
                    await type(prompt, CLEAR_COMMAND);
                    await wait(300);
                }
            } catch {
                // Animation cancelled
            }
        }

        run();
        return () => {
            cancelled = true;
        };
    }, [prompt, plugins]);

    return (
        <div
            ref={screenRef}
            className="h-80 overflow-hidden whitespace-pre-wrap p-5 font-mono text-xs leading-relaxed sm:text-sm"
        >
            {lines.map((line, i) => (
                <p key={i} className="break-words">
                    {line.map((segment, j) => (
                        <span key={j} className={TONE_CLASS[segment.tone ?? "default"]}>
              {segment.text}
            </span>
                    ))}
                </p>
            ))}

            {activePrompt !== null && (
                <p>
          <span className={activePrompt === prompt ? TONE_CLASS.accent : TONE_CLASS.dim}>
            {activePrompt}
          </span>{" "}
                    <span className={TONE_CLASS.default}>{typed}</span>
                    <span className="terminal-cursor inline-block h-[1.1em] w-2 translate-y-[0.2em] bg-zinc-200" />
                </p>
            )}
        </div>
    );
}