import { z } from 'zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import transalationKey from '@/utils/i18n/transalationKey'
import { useNavigate } from '@tanstack/react-router'
import { useUserLoginMutation } from '@/hooks/userApiHook'
import { toast } from 'sonner'
import { useAppDispatch } from '@/hooks/storeHook'
import { setToken } from '@/store/slices/user/userTokenSlice'

const errorStyle = 'border-red-500 focus-visible:border-red-500 shadow-red-500 outline-red-500 border-r-red-500 focus-visible:ring-0';
const inputAnimation = {
    initial: {
        y: 10,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1
    }
}
function LoginForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { mutate } = useUserLoginMutation();
    const dispatch = useAppDispatch();


    // validation schema
    const loginFormSchema = z.object({
        email: z.string().trim().min(1, { error: t(transalationKey.userlogin.form.validations.email.required) }).email({ error: t(transalationKey.userlogin.form.validations.email.invalid) }),
        password: z.string().min(1, { error: t(transalationKey.userlogin.form.validations.password.required) }).min(8, { error: t(transalationKey.userlogin.form.validations.password.min, { count: 8 }) }).max(15, { error: t(transalationKey.userlogin.form.validations.password.max, { count: 15 }) })
    });

    type loginFormFields = z.infer<typeof loginFormSchema>;

    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm<loginFormFields>({
        resolver: zodResolver(loginFormSchema)
    });

    const onSubmit: SubmitHandler<loginFormFields> = (data: loginFormFields) => {
        mutate(data, {
            onSuccess: (data) => {
                dispatch(setToken(data.accessToken));
                toast.success(data.message);
            },
            onError: (err) => {
                toast.error(err.message);
                console.log(err);
            }
        })
    }
    return (

        <form onSubmit={handleSubmit(onSubmit)} className='w-1/2'>
            <motion.div initial={inputAnimation.initial} animate={inputAnimation.animate}>
                <label htmlFor="" className=''>{t(transalationKey.userlogin.form.labels.email)}</label>
                <Input {...register('email')} className={`z-50 mt-1 ${errors.email && errorStyle}`} />
                <div className='h-7 overflow-hidden'>
                    <AnimatePresence mode='sync' >
                        {errors.email && <motion.p className='z-0 text-red-500' initial={{ y: -50 }} animate={{ y: 0 }} exit={{ y: -50 }}>{errors.email.message}</motion.p>}
                    </AnimatePresence>
                </div>
            </motion.div>

            <motion.div initial={inputAnimation.initial} animate={inputAnimation.animate}>
                <label htmlFor="" className=''>{t(transalationKey.userlogin.form.labels.password)}</label>
                <Input {...register('password')} className={`z-50 mt-1 ${errors.password && errorStyle}`} type='password' />
                <div className='h-7 overflow-hidden'>
                    <AnimatePresence mode='sync' >
                        {errors.password && <motion.p className='z-0 text-red-500' initial={{ y: -50 }} animate={{ y: 0 }} exit={{ y: -50 }}>{errors.password.message}</motion.p>}
                    </AnimatePresence>
                </div>
            </motion.div>

            <Button type='submit' className='w-full'>{t(isSubmitting ? transalationKey.button.submiting : transalationKey.button.submit)}</Button>
            <p className='my-2 font-medium hover:cursor-pointer' onClick={() => navigate({ to: '/user/signup' })}>{t(transalationKey.userlogin.form.labels.register)}</p>
        </form>
    )
}

export default LoginForm
