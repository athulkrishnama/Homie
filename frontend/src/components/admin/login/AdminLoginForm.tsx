import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminLoginMutation } from "@/hooks/adminApiHook";
import { setToken } from "@/store/slices/user/tokenSlice";
import { setUser } from "@/store/slices/user/userDataSlice";
import transalationKey from "@/utils/i18n/transalationKey";
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import z from "zod"

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

function AdminLoginForm() {
    const { t } = useTranslation()
    const { mutate } = useAdminLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const adminLoginFieldSchema = z.object({
        email: z.string().min(1, { error: t(transalationKey.userlogin.form.validations.email.required) }).email({ error: t(transalationKey.userlogin.form.validations.email.invalid) }),
        password: z.string().min(1, { error: t(transalationKey.userlogin.form.validations.password.required) }).min(8, { error: t(transalationKey.userlogin.form.validations.password.min, { count: 8 }) }).max(15, { error: t(transalationKey.userlogin.form.validations.password.max, { count: 15 }) })
    })

    type adminLoginFields = z.infer<typeof adminLoginFieldSchema>

    const onSubmit: SubmitHandler<adminLoginFields> = (data) => {
        mutate(data, {
            onSuccess: (response) => {
                dispatch(setToken(response.accessToken))
                dispatch(setUser(response.user))
                navigate({ to: '/admin', replace: true })
                toast.success(response.message);
            },
            onError: (err) => {
                toast.error(err.message)
            }
        })
    }

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<adminLoginFields>({
        resolver: zodResolver(adminLoginFieldSchema)
    })
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-3/4">
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

            <motion.div initial={{ y: 10 }} animate={{ y: 0 }}><Button type='submit' className='w-full'>{t(isSubmitting ? transalationKey.button.submiting : transalationKey.button.submit)}</Button></motion.div>

            <Button type="button" className="my-2" variant={'link'} onClick={() => navigate({ to: "/admin/forgetPassword" })}>{t(transalationKey.heading.forgetPassword)} ?</Button>
        </form>
    )
}

export default AdminLoginForm
