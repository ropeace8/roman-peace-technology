export type PostId = Post["id"];

export interface Post {
  id: string;
  title: string;
  category: string;
  date: string; // stored as string (e.g. "Jan 11, 2026")
  thumbnail: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  posts: PostId[]; // array of Post.id
  thumbnail: string;
}
