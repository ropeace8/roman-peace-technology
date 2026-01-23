import { useState } from 'react';

import Hero from '../Hero/Hero';
import PostCard from '../PostCard/PostCard';
import ProjectCard from '../ProjectCard/ProjectCard';

import posts from "../../posts/posts.json";
import projects from "../../posts/projects.json"

import './HomePage.css';

interface HomePageProps {
    setPage: (postId: string) => void;
}

function HomePage({ setPage }: HomePageProps ) {
    const [isAllPosts, setIsAllPosts] = useState(true);

    const getPostView = () => {
        if (isAllPosts) {
            return (
                posts
                    .slice()
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map(post => {
                        return <PostCard key={post.id} post={post} setPage={setPage}/> 
                    })
            );
        } else {
            return (
                projects
                    .slice()
                    .map(project => {
                        return <ProjectCard key={project.id} project={project} setPage={setPage}/>
                    })
            );
        }
    }

    return (
        <>
            <Hero />
            <div className="posts-head">
                <div className="tabs" role="tablist" aria-label="Post filters">
                    <div 
                        className={`tab  ${isAllPosts ? "active" : ""}`} 
                        role="tab" 
                        aria-selected={isAllPosts}
                        onClick={() => setIsAllPosts(true)}
                    >
                        All Posts
                    </div>
                    <div 
                        className={`tab  ${!isAllPosts ? "active" : ""}`} 
                        role="tab" 
                        aria-selected={!isAllPosts}
                        onClick={() => setIsAllPosts(false)}
                    >
                        Posts by Project
                    </div>
                </div>
            </div>
            <section className='posts-grid'>
                {getPostView()}
            </section>
        </>
    )
}

export default HomePage;