import { useEffect, type MouseEvent } from "react";
import { MdClose } from "react-icons/md";
import type { Post, Project } from "../../model";


import PostCard from "../PostCard/PostCard";

import posts from "../../posts/posts.json";

import "./ProjectModal.css";

interface ProjectModalProps {
    project: Project;
    onExit: () => void;
    setPage: (postId: string) => void;
}

const allPosts = posts as Post[];

function ProjectModal({ project, onExit, setPage }: ProjectModalProps) {
    useEffect(() => {
        const { body } = document;
        const previousOverflow = body.style.overflow;

        body.style.overflow = "hidden";

        return () => {
            body.style.overflow = previousOverflow;
        };
    }, []);
    
    const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onExit();
        }
    };

    const postsInProject = allPosts
        .filter(post => project.posts.includes(post.id))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="project-modal-backdrop" id="backdrop" aria-hidden="true" onClick={handleBackdropClick}>
            <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <div className="project-modal-head">
                    <div className="project-modal-title">
                        <strong>{project.name}</strong>
                        <span>{project.description}</span>
                    </div>
                    <button className="xbtn" id="closeModal" aria-label="Close modal" title="Close" onClick={onExit}>
                        <MdClose className="x-icon" />
                    </button>
                </div>
                <div className="project-modal-body">
                    <section className="project-modal-grid" aria-label="Project posts">
                        {postsInProject.map(post => (
                            <PostCard key={post.id} post={post} setPage={setPage}/>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
}

export default ProjectModal;
