import ForgetPassword from '@/pages/admin/ForgetPassword'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/forgetPassword')({
  component: ForgetPassword,
})

