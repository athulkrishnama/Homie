import { createFileRoute } from '@tanstack/react-router'
import Logo from '@/assets/logoWhite.svg'
import { useTranslation } from 'react-i18next'
import transalationKey from '@/utils/i18n/transalationKey'
import LoginForm from '@/components/user/Login/LoginForm'
export const Route = createFileRoute('/user/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  return <div className='h-screen w-screen flex'>
    <div className='bg-black flex-1/2 flex items-center justify-center'>
      <div className='flex gap-8'>
        <img src={Logo} alt="" />
        <h1 className='text-white nerko-one text-9xl font-[900]' >{t(transalationKey.brand.name)}</h1>
      </div>
    </div>
    <div className='flex-1/2 flex flex-col items-center justify-center gap-10'>
      <h1 className='text-4xl font-bold'>{t(transalationKey.userlogin.form.labels.login)}</h1>
      <LoginForm />
    </div>
  </div>
}
