import Login from '@/pages/admin/Login'
import { isAdmin } from '@/utils/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/login')({
  beforeLoad: () => {
    if (isAdmin()) {
      throw redirect({ to: '/admin', replace: true })
    }
  },
  component: Login,
})


