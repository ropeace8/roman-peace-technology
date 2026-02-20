import { createFileRoute } from '@tanstack/react-router'
import BlogPage from '../components/BlogPage/BlogPage'
import { Route as rootRoute } from './__root'

export const Route = createFileRoute('/posts/$postId')({
  component: PostRoute,
})

function PostRoute() {
  const { postId } = Route.useParams()
  const { posts } = rootRoute.useLoaderData()

  return <BlogPage postId={postId} posts={posts} />
}
