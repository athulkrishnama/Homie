import { useAppSelector } from '@/hooks/storeHook';
import { createFileRoute, Navigate, Outlet, useLocation } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  const location = useLocation();

  const user = useAppSelector((store) => store.user)

  if (location.pathname === '/admin/login' || location.pathname === '/admin/forgetPassword') return <Outlet />

  return (
    <>
    {
      user.isLogin && user.data.isAdmin ? <Outlet /> : <Navigate to='/admin/login' replace/>
    }
      
    </>
  )
}
