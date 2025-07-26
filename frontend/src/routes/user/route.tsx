import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import Nav from '@/components/user/Nav/Nav'
export const Route = createFileRoute('/user')({
  component: RouteComponent,
})

function RouteComponent() {
  const location = useLocation()

  if (location.pathname === '/user/login' || location.pathname === '/user/signup') {
    return <Outlet />
  }

  return <div>
    <Nav></Nav>
    <Outlet/>
  </div>
}