export const postContentFiles = import.meta.glob("../../posts/content/*.md", {
    eager: true,
    query: '?raw',
    import: 'default'
}) as Record<string, string>;

export const postImageFiles = import.meta.glob("../../posts/images/*", {
    eager: true,
    import: 'default'
}) as Record<string, string>;

export const postThumbnailImageFiles = import.meta.glob("../../posts/thumbnails/posts/*", {
    eager: true,
    import: 'default'
}) as Record<string, string>;
