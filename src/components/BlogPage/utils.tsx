import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { postContentFiles, postImageFiles, postThumbnailImageFiles } from "./files";

export function getThumbnailByFilename(filename: string) {
    return getFileByFilename(postThumbnailImageFiles, filename);
}

export function getMarkdownByFilename(filename: string) {
    return getFileByFilename(postContentFiles, filename);
}

export function renderImage(props: any) {
    const { src, alt, ...rest } = props;
    let resolved = src as string | undefined;

    if (resolved && !resolved.startsWith("http") && !resolved.startsWith("/")) {
        const found = getImageByFilename(resolved);
        if (found) resolved = found;
    }

    return (
        <img className="blog-image" src={resolved} alt={alt || ""} {...rest} />
    );
}

export function renderCode(props: any) {
    console.log(props)
    const {children, className, node, ...rest} = props;
    const match = /language-(\w+)/.exec(className || '')
    
    if (match) {
        return (
            <SyntaxHighlighter
                {...rest}
                className="blog-article-code"
                language={match[1]}
                style={materialDark}
                customStyle={{ fontSize: "var(--code-font-size, 14px)" }}
                codeTagProps={{ style: { fontSize: "var(--code-font-size, 14px)" } }}
            >
                {children}
            </SyntaxHighlighter>
        )
    } else {
        return (
            <code {...rest} className={className}>
                {children}
            </code>
        )
    }
}

function getImageByFilename(filename: string) {
    return getFileByFilename(postImageFiles, filename);
}

function getFileByFilename(files: Record<string, string>, filename: string) {
    const fileKey = Object.keys(files).find(k => k.endsWith(`/${filename}`));
    return fileKey ? files[fileKey] : undefined;
}
