import { useState } from "react";
import ProjectModal from "../ProjectModal/ProjectModal";

import type { Post, Project } from "../../model";
import { getProjectThumbnailUrl } from "../../content";

import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
  setPage: (postId: string) => void;
  posts: Post[];
}

function ProjectCard({ project, setPage, posts }: ProjectCardProps) {
  const [isShowModal, setIsShowModal] = useState(false);

  const exitModal = () => {
    setIsShowModal(false);
  }

  return (
    <>
      <button className="project-card" onClick={() => setIsShowModal(true)}>
        <div className="project-thumb">
          <img src={getProjectThumbnailUrl(project.thumbnail)} alt={project.name} />
        </div>
        <div className="project-card-body">
          <div className="project-meta">
            <h3 className="project-name">{project.name}</h3>
            <div className="project-count">{`${project.posts.length} post${project.posts.length === 1 ? "" : "s"}`}</div>
          </div>
          <div className="project-description">{project.description}</div>
        </div>
      </button>

      {isShowModal ? <ProjectModal project={project} onExit={exitModal} setPage={setPage} posts={posts}/> : ""}
    </>
  );
}

export default ProjectCard;
