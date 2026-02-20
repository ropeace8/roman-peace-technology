import { createFileRoute } from '@tanstack/react-router'
import BlogPage from '../components/BlogPage/BlogPage'
import { Route as rootRoute } from './__root'

export const Route = createFileRoute('/about')({
  component: AboutRoute,
})

function AboutRoute() {
  const { posts } = rootRoute.useLoaderData()

  return <BlogPage postId="about" posts={posts} />
}
