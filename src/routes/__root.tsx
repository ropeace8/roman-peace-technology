import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import Header from '../components/Header/Header'
import { fetchPosts, fetchProjects } from '../content'

import '../App.css'

export const Route = createRootRoute({
  loader: async () => {
    const [posts, projects] = await Promise.all([fetchPosts(), fetchProjects()])
    return { posts, projects }
  },
  component: RootLayout,
  notFoundComponent: NotFound,
})

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>This page doesn't exist.</p>
      <Link to="/">Back to home</Link>
    </div>
  )
}

function RootLayout() {
  return (
    <div className="shell">
      <Header />
      <Outlet />
    </div>
  )
}
