import type { Post, Project } from "./model";

const CONTENT_BASE = "/content";

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${CONTENT_BASE}/posts.json`);
  return res.json();
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${CONTENT_BASE}/projects.json`);
  return res.json();
}

export function getMarkdownUrl(filename: string): string {
  return `${CONTENT_BASE}/markdown/${filename}`;
}

export function getImageUrl(filename: string): string {
  return `${CONTENT_BASE}/images/${filename}`;
}

export function getPostThumbnailUrl(filename: string): string {
  return `${CONTENT_BASE}/thumbnails/posts/${filename}`;
}

export function getProjectThumbnailUrl(filename: string): string {
  return `${CONTENT_BASE}/thumbnails/projects/${filename}`;
}
