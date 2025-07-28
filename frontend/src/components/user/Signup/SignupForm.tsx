import transalationKey from "@/utils/i18n/transalationKey"
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next"
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod"
import { motion, AnimatePresence } from 'motion/react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserSignupSendOtpMutation, useUserSignupVerifyMutation } from "@/hooks/userApiHook";
import { toast } from "sonner";
import { useState } from "react";
import OTPModal from "./OTPModal";
import { useNavigate } from "@tanstack/react-router";

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

function SignupForm() {
    const { mutate: sendOtpMutate } = useUserSignupSendOtpMutation()
    const { mutate: verifyOtpMutate } = useUserSignupVerifyMutation();
    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const navigate = useNavigate();
    // schema
    const signUpFormSchema = z.object({
        fullname: z.string().trim().min(1, { error: t(transalationKey.usersignup.form.validations.fullname.required) }),
        email: z.string().min(1, { error: t(transalationKey.usersignup.form.validations.email.required) }).email({ error: t(transalationKey.usersignup.form.validations.email.invalid) }),
        password: z.string().min(1, { error: t(transalationKey.usersignup.form.validations.password.required) }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { error: t(transalationKey.usersignup.form.validations.password.invalid) }),
        confirmPassword: z.string().min(1, { error: t(transalationKey.usersignup.form.validations.confirmPassword.required) })
    }).refine((data) => data.password === data.confirmPassword, { error: t(transalationKey.usersignup.form.validations.confirmPassword.notsame), path: ['confirmPassword'] });

    type signupFormFields = z.infer<typeof signUpFormSchema>;

    const onSubmit: SubmitHandler<signupFormFields> = (data: signupFormFields) => {
        sendOtpMutate(data, {
            onSuccess: (response) => {
                toast.success(response.message);
                setOtpModalOpen(true)
            },
            onError: (err) => {
                toast.error(err.message);
            }
        })
    }

    const handleOtpSubmit = (otp: string) => {
        verifyOtpMutate({ otp, userData: getValues() }, {
            onSuccess: (response) => {
                toast.success(response.message);
                navigate({ to: '/user/login', replace: true })
            },
            onError: (err) => {
                toast.error(err.message)
            }
        })
    }

    const { handleSubmit, register, formState: { errors, isSubmitting }, getValues } = useForm<signupFormFields>({
        resolver: zodResolver(signUpFormSchema)
    })

    return (
        <>
            <OTPModal isOpen={otpModalOpen} setIsOpen={setOtpModalOpen} email={getValues('email')} onSubmit={handleOtpSubmit} />
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">

                {/* email */}
                <motion.div initial={inputAnimation.initial} animate={inputAnimation.animate}>
                    <label htmlFor="" className=''>{t(transalationKey.usersignup.form.lables.email)}</label>
                    <Input {...register('email')} className={`z-50 mt-1 ${errors.email && errorStyle}`} />
                    <div className='h-7 overflow-hidden'>
                        <AnimatePresence mode='sync' >
                            {errors.email && <motion.p className='z-0 text-red-500' initial={{ y: -50 }} animate={{ y: 0 }} exit={{ y: -50 }}>{errors.email.message}</motion.p>}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* fullname */}
                <motion.div initial={inputAnimation.initial} animate={inputAnimation.animate}>
                    <label htmlFor="" className=''>{t(transalationKey.usersignup.form.lables.fullname)}</label>
                    <Input {...register('fullname')} className={`z-50 mt-1 ${errors.fullname && errorStyle}`} />
                    <div className='h-7 overflow-hidden'>
                        <AnimatePresence mode='sync' >
                            {errors.fullname && <motion.p className='z-0 text-red-500' initial={{ y: -50 }} animate={{ y: 0 }} exit={{ y: -50 }}>{errors.fullname.message}</motion.p>}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* password */}
                <motion.div initial={inputAnimation.initial} animate={inputAnimation.animate}>
                    <label htmlFor="" className=''>{t(transalationKey.usersignup.form.lables.password)}</label>
                    <Input {...register('password')} className={`z-50 mt-1 ${errors.password && errorStyle}`} type="password" />
                    <div className='min-h-7 overflow-hidden'>
                        <AnimatePresence mode='sync' >
                            {errors.password && <motion.p className='z-0 text-red-500' initial={{ y: -50 }} animate={{ y: 0 }} exit={{ y: -50 }}>{errors.password.message}</motion.p>}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* confirm password */}
                <motion.div initial={inputAnimation.initial} animate={inputAnimation.animate}>
                    <label htmlFor="" className=''>{t(transalationKey.usersignup.form.lables.confirmPassword)}</label>
                    <Input {...register('confirmPassword')} className={`z-50 mt-1 ${errors.confirmPassword && errorStyle}`} type="password" />
                    <div className='h-7 overflow-hidden'>
                        <AnimatePresence mode='sync' >
                            {errors.confirmPassword && <motion.p className='z-0 text-red-500' initial={{ y: -50 }} animate={{ y: 0 }} exit={{ y: -50 }}>{errors.confirmPassword.message}</motion.p>}
                        </AnimatePresence>
                    </div>
                </motion.div>
                <p className="font-medium hover:cursor-pointer" onClick={() => navigate({ to: '/user/login' })}>{t(transalationKey.usersignup.form.lables.alreadyHaveAccount)}</p>
                <Button type="submit" className="mt-3">{isSubmitting ? t(transalationKey.button.submiting) : t(transalationKey.button.submit)}</Button>
            </form>
        </>
    )
}

export default SignupForm
