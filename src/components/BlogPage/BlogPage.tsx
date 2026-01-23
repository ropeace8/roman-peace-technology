import ReactMarkdown from "react-markdown";
import { IoMdArrowRoundBack } from "react-icons/io";

import type { Post } from "../../model";
import { getThumbnailByFilename, getMarkdownByFilename, renderImage, renderCode } from "./utils";

import "./BlogPage.css";
import "./BlogArticle.css"

import posts from "../../posts/posts.json";

interface BlogPageProps {
    postId: string;
    setPage: (postId: string) => void;
}

const allPosts = posts as Post[];

function BlogPage({ postId, setPage }: BlogPageProps) {
    const isAboutPage = postId === "about";
    const post = !isAboutPage ? allPosts.find((p) => p.id === postId) : undefined;

    const blogContentFilename = isAboutPage ? "about.md" : `${post?.id}.md`;
    const blogMarkdown = getMarkdownByFilename(blogContentFilename);

    const title = isAboutPage ? "About Roman" : post!.title;
    const thumbnailUrl = !isAboutPage
        ? getThumbnailByFilename(post!.thumbnail)
        : undefined;

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

                <div className={`blog-article-body${isAboutPage ? " blog-article-body--about" : ""}`}>
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
