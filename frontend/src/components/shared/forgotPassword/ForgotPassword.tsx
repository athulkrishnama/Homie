import Logo from '@/assets/ForgotPasswordAmico.svg'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm, } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { AnimatePresence } from 'motion/react'
import { motion } from 'motion/react'
import { useState } from 'react'
import OTPAndNewPasswordModal from './OTPAndNewPasswordModal'
import { useTranslation } from 'react-i18next'
import transalationKey from '@/utils/i18n/transalationKey'

const errorStyle = 'border-red-500 focus-visible:border-red-500 shadow-red-500 outline-red-500 border-r-red-500 focus-visible:ring-0';

export interface forgetPasswordProps {
    heading: string,
    onOtpRequest(email: string): Promise<boolean>
    onOtpSubmit(email: string, otp: string, password: string): Promise<void>
    onResendOtp(email: string): void
}

function ForgotPassword({ heading, onOtpRequest, onOtpSubmit, onResendOtp }: forgetPasswordProps) {
    const [isOpen, setIsOpen] = useState(false)

    const { t } = useTranslation()

    const emailSchema = z.object({
        email: z.email({ error: t(transalationKey.form.errors.invalidMail) })
    })


    type emailType = z.infer<typeof emailSchema>
    const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm<emailType>({
        resolver: zodResolver(emailSchema)
    })

    async function onSubmit(data: emailType) {
        const response = await onOtpRequest(data.email);
        if (response) setIsOpen(true);
    }
    return (
        <>
            <OTPAndNewPasswordModal isOpen={isOpen} setIsOpen={setIsOpen} email={getValues().email} handlePasswordSubmit={onOtpSubmit} handleResendOtp={onResendOtp} />
            <div className='w-screen h-screen bg-zinc-900 flex justify-center items-center'>
                <div className='w-1/2 h-1/2 flex  bg-neutral-100 rounded-4xl shadow-[3px_-3px_40px_3px_#aaaaaa]'>
                    <div className='flex-1/2'>
                        <img src={Logo} alt="" />
                    </div>
                    <div className='flex-1/2 px-5 py-10 '>
                        <h1 className='text-center text-5xl font-bold'>{heading}</h1>
                        <div className=''>
                            <form onSubmit={handleSubmit(onSubmit)} className='mt-15'>

                                {/* email  */}
                                <motion.div className='flex flex-col gap-2' initial={{ y: 15, x: 15 }} animate={{ y: 0, x: 0 }}>
                                    <Label>{t(transalationKey.form.label.email)}</Label>
                                    <Input {...register('email')} className={`${errors.email && errorStyle}`} />
                                    <div className='h-7 overflow-hidden'>
                                        <AnimatePresence >
                                            {errors.email && <motion.p className='text-red-600  relative' initial={{ y: -50 }} animate={{ y: 0 }} exit={{ y: -50 }}>{errors.email.message}</motion.p>}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                                <Button className='w-full' >{!isSubmitting ? t(transalationKey.form.button.sendOtp) : t(transalationKey.form.button.sendingOtp)}</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
