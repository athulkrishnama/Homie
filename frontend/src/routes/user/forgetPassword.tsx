import { createFileRoute } from '@tanstack/react-router'
import ForgotPasswordPage from '@/pages/user/ForgotPasswordPage'

export const Route = createFileRoute('/user/forgetPassword')({
  component: ForgotPasswordPage,
})

