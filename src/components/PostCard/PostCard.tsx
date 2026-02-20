import { Link } from "@tanstack/react-router";
import type { Post } from "../../model";
import { getPostThumbnailUrl } from "../../content";

import "./PostCard.css";

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  return (
    <Link
      to="/posts/$postId"
      params={{ postId: post.id }}
      className="post-card"
    >
      <div className="post-thumb">
        <img src={getPostThumbnailUrl(post.thumbnail)} alt={post.title} />
      </div>
      <div className="post-card-body">
        <div className="post-category">{post.category}</div>
        <h3 className="post-title">{post.title}</h3>
        <div className="post-date">{post.date}</div>
      </div>
    </Link>
  );
}

export default PostCard;
