import { createFileRoute, redirect } from '@tanstack/react-router'
import Signup from '@/pages/user/Signup'
import { isUser } from '@/utils/auth'

export const Route = createFileRoute('/user/signup')({
  component: Signup,
  beforeLoad: () => {
    if (isUser()) {
      throw redirect({ to: '/user', replace: true });
    }
  }
})

