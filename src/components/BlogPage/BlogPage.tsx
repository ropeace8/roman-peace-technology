import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { IoMdArrowRoundBack } from "react-icons/io";

import type { Post } from "../../model";
import { getMarkdownUrl, getPostThumbnailUrl } from "../../content";
import { renderImage, renderCode } from "./utils";

import "./BlogPage.css";
import "./BlogArticle.css"

interface BlogPageProps {
    postId: string;
    setPage: (postId: string) => void;
    posts: Post[];
}

function BlogPage({ postId, setPage, posts }: BlogPageProps) {
    const [blogMarkdown, setBlogMarkdown] = useState<string | null>(null);

    const isAboutPage = postId === "about";
    const post = !isAboutPage ? posts.find((p) => p.id === postId) : undefined;

    const blogContentFilename = isAboutPage ? "about.md" : `${post?.id}.md`;

    useEffect(() => {
        fetch(getMarkdownUrl(blogContentFilename))
            .then(res => res.text())
            .then(setBlogMarkdown);
    }, [blogContentFilename]);

    const title = isAboutPage ? "About Roman" : post!.title;
    const thumbnailUrl = !isAboutPage
        ? getPostThumbnailUrl(post!.thumbnail)
        : undefined;

    if (blogMarkdown === null) {
        return (
            <div className="blog-page">
                <button
                    className="blog-back"
                    onClick={() => setPage("home")}
                    aria-label="Back to home"
                >
                    <IoMdArrowRoundBack className="icon"/>
                </button>
            </div>
        );
    }

    return (
        <div className="blog-page">
            <button
                className="blog-back"
                onClick={() => setPage("home")}
                aria-label="Back to home"
            >
                <IoMdArrowRoundBack className="icon"/>
            </button>

            <article className="blog-article-card">
                {!isAboutPage && post && (
                    <>
                        {thumbnailUrl && (
                            <div className="blog-hero-thumb">
                                <img src={thumbnailUrl} alt={post.title} />
                            </div>
                        )}

                        <div className="blog-article-header">
                            <div className="blog-article-category">{post.category}</div>
                            <h1 className="blog-article-title">{post.title}</h1>
                            <time className="blog-article-date">{post.date}</time>
                        </div>
                    </>
                )}

                {isAboutPage && (
                    <header className="blog-article-header blog-article-header--about">
                        <h1 className="blog-article-title">{title}</h1>
                    </header>
                )}

                <div className="blog-article-body">
                    <ReactMarkdown
                        components={{
                            img: renderImage,
                            code: renderCode
                        }}
                    >
                        {blogMarkdown}
                    </ReactMarkdown>
                </div>
            </article>
        </div>
    )
}

export default BlogPage;
