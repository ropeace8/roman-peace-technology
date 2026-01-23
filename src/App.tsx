import { useState } from "react";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import BlogPage from "./components/BlogPage/BlogPage";

import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const setPage = (postId: string) => {
    setCurrentPage(postId);
  }
  
  const getCurrentPage = () => {
    if (currentPage === "home") {
      return <HomePage setPage={setPage}/>
    } else {
      // If not on the home page, we will be on a post page.
      return <BlogPage postId={currentPage} setPage={setPage} />
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
