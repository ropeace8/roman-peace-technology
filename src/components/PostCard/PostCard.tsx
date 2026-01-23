import type { Post } from "../../model";

import "./PostCard.css";

const postThumbnailImages = import.meta.glob(
  '../../posts/thumbnails/projects/*',
  {
    eager: true,
    import: 'default'
  }
) as Record<string, string>;

interface PostCardProps {
  post: Post;
  setPage: (postId: string) => void;
}

function PostCard({ post, setPage }: PostCardProps) {
  const thumbnailImage = postThumbnailImages[
  `../../posts/thumbnails/projects/${post.thumbnail}`
  ];

  return (
    <a 
      className="post-card"
      onClick={(e) => {
        e.preventDefault();
        setPage(post.id);
      }}
    >
      <div className="post-thumb">
        <img src={thumbnailImage} alt={post.title} />
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