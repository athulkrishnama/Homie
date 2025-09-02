import AdminLoginForm from '@/components/admin/login/AdminLoginForm'
import transalationKey from '@/utils/i18n/transalationKey'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'

function Login() {
    const { t } = useTranslation()
    return (
        <div className='h-screen w-screen flex items-center justify-center bg-zinc-200'>
            <div className='w-1/3 h-1/2 bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center'>
                <motion.h2 initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }} className='font-bold text-5xl text-center mb-5'>{t(transalationKey.adminLogin.form.lables.adminLogin)}</motion.h2>
                <AdminLoginForm />
            </div>

        </div>
    )
}

export default Login
