import "highlight.js/styles/github-dark.css";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./code-block";

export function Markdown({ content }: { content: string }) {
    return (
        <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-primary prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                // Unknown languages are shown without highlighting instead of throwing
                rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
                components={{
                    // Open external links in a new tab
                    a: ({ href, children }) => {
                        const external = href?.startsWith("http");
                        return (
                            <a href={href} {...(external && { target: "_blank", rel: "noreferrer" })}>
                                {children}
                            </a>
                        );
                    },
                    // Code blocks get their own wrapper with a copy button
                    pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}