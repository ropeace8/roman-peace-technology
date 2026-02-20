import type { Post } from "../../model";
import { getPostThumbnailUrl } from "../../content";

import "./PostCard.css";

interface PostCardProps {
  post: Post;
  setPage: (postId: string) => void;
}

function PostCard({ post, setPage }: PostCardProps) {
  return (
    <a
      className="post-card"
      onClick={(e) => {
        e.preventDefault();
        setPage(post.id);
      }}
    >
      <div className="post-thumb">
        <img src={getPostThumbnailUrl(post.thumbnail)} alt={post.title} />
      </div>
      <div className="post-card-body">
        <div className="post-category">{post.category}</div>
        <h3 className="post-title">{post.title}</h3>
        <div className="post-date">{post.date}</div>
      </div>
    </a>
  );
}

export default PostCard;
