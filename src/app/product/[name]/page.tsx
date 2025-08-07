import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default async function Page({
    params,
}: {
    params: Promise<{ name: string }>
}) {

    const { name } = await params
    const markdown = `# [Click](http://localhost:3000/product/${name})`

    return (
        <main className="h-dvh w-full px-5 md:px-25 xl:px-50 2xl:px-75 py-8 flex flex-col justify-center items-center gap-6">
            <h1>{name}</h1>
            <Markdown>{markdown}</Markdown>
        </main>
    )
}