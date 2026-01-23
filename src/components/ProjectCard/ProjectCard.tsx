import { useState } from "react";
import ProjectModal from "../ProjectModal/ProjectModal";

import type { Project } from "../../model";

import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
  setPage: (postId: string) => void;
}

const projectThumbnailImages = import.meta.glob(
  '../../posts/thumbnails/projects/*',
  {
    eager: true,
    import: 'default'
  }
) as Record<string, string>;

function ProjectCard({ project, setPage }: ProjectCardProps) {
  const [isShowModal, setIsShowModal] = useState(false);

  const exitModal = () => {
    setIsShowModal(false);
  }

  const thumbnailImage = projectThumbnailImages[
  `../../posts/thumbnails/projects/${project.thumbnail}`
  ];

  return (
    <>
      <button className="project-card" onClick={() => setIsShowModal(true)}>
        <div className="project-thumb">
          <img src={thumbnailImage} alt={project.name} />
        </div>
        <div className="project-card-body">
          <div className="project-meta">
            <h3 className="project-name">{project.name}</h3>
            <div className="project-count">{`${project.posts.length} post${project.posts.length === 1 ? "" : "s"}`}</div>
          </div>
          <div className="project-description">{project.description}</div>
        </div>
      </button>

      {isShowModal ? <ProjectModal project={project} onExit={exitModal} setPage={setPage}/> : ""}
    </>
  );
}

export default ProjectCard;