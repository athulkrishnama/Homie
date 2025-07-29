import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  const location = useLocation();

  if(location.pathname === '/admin/login')return <Outlet/>

  return (
    <>
      <Outlet/>
    </>
  )
}
