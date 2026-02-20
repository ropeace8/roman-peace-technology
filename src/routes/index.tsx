import { createFileRoute } from '@tanstack/react-router'
import HomePage from '../components/HomePage/HomePage'
import { Route as rootRoute } from './__root'

export const Route = createFileRoute('/')({
  component: HomeRoute,
})

function HomeRoute() {
  const { posts, projects } = rootRoute.useLoaderData()

  return <HomePage posts={posts} projects={projects} />
}
