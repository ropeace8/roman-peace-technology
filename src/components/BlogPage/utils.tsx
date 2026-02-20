import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { getImageUrl } from "../../content";

export function renderImage(props: any) {
    const { src, alt, ...rest } = props;
    let resolved = src as string | undefined;

    if (resolved && !resolved.startsWith("http") && !resolved.startsWith("/")) {
        resolved = getImageUrl(resolved);
    }

    return (
        <img className="blog-image" src={resolved} alt={alt || ""} {...rest} />
    );
}

export function renderCode(props: any) {
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
