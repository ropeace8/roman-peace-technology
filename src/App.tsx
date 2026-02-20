import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import BlogPage from "./components/BlogPage/BlogPage";
import { fetchPosts, fetchProjects } from "./content";
import type { Post, Project } from "./model";

import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    Promise.all([fetchPosts(), fetchProjects()]).then(([p, pr]) => {
      setPosts(p);
      setProjects(pr);
    });
  }, []);

  const setPage = (postId: string) => {
    setCurrentPage(postId);
  }

  if (!posts || !projects) {
    return (
      <div className="shell">
        <Header setPage={setPage} />
      </div>
    );
  }

  const getCurrentPage = () => {
    if (currentPage === "home") {
      return <HomePage setPage={setPage} posts={posts} projects={projects} />
    } else {
      return <BlogPage postId={currentPage} setPage={setPage} posts={posts} />
    }
  }

  return (
    <div className="shell">
      <Header setPage={setPage} />
      {getCurrentPage()}
    </div>
  )
}

export default App;
