import { createFileRoute, redirect } from '@tanstack/react-router'
import Signup from '@/pages/user/Signup'
import { isAuthenticated } from '@/utils/auth'

export const Route = createFileRoute('/user/signup')({
  component: Signup,
  beforeLoad: () => {
    if (isAuthenticated()) {
      redirect({ to: '/user', replace: true });
    }
  }
})

