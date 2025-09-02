import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import Modal from '../modal/Modal'
import OTP from '@/components/shared/otp/OTP'
import transalationKey from '@/utils/i18n/transalationKey'
import { Input } from '@/components/ui/input'
import { AnimatePresence, motion } from 'motion/react'
import { Label } from '@/components/ui/label'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

interface OTPAndNewPasswordModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  email: string
  handlePasswordSubmit(email: string, otp: string, password: string): void
  handleResendOtp(email: string): void
}


const inputAnimation = {
  initial: { y: 50 },
  animate: { y: 0 }
}

const errorAnimation = {
  initial: { y: -50 },
  animate: { y: 0 },
  exit: { y: -50 }
}

function OTPAndNewPasswordModal({ isOpen, setIsOpen, email, handlePasswordSubmit, handleResendOtp }: OTPAndNewPasswordModalProps) {
  const rootRef = useRef<(HTMLInputElement | null)[]>([]);

  const [time, setTime] = useState(6 * 2);
  const intervalId = useRef<null | NodeJS.Timeout>(null);

  const { t } = useTranslation()

  // password form validation

  const passwordFieldSchema = z.object({
    password: z.string().min(1, { error: t(transalationKey.form.errors.passwordRequired) }).min(8, { error: t(transalationKey.form.errors.passwordMinLength, { count: 8 }) }).max(15, { error: t(transalationKey.form.errors.passwordMaxLength, { count: 15 }) }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { error: t(transalationKey.usersignup.form.validations.password.invalid) }),
    confirmPassword: z.string().min(1, { error: t(transalationKey.form.errors.confirmPasswordRequired) })
  }).refine((data) => data.password === data.confirmPassword, { error: t(transalationKey.form.errors.passwordNotMatching), path: ['confirmPassword'] })

  type passwordFormType = z.infer<typeof passwordFieldSchema>


  const { register, formState: { errors, isSubmitting }, handleSubmit, setValue, clearErrors } = useForm<passwordFormType>({
    resolver: zodResolver(passwordFieldSchema)
  })


  const calculateOtp = (): string | null => {
    let otp = '';

    for (const ref of rootRef.current) {
      if (isNaN(Number(ref?.value))) {
        ref?.focus();
        return null;
      }
      otp += ref?.value
    }

    // const otp = rootRef.current.reduce((acc: string, elem) => acc + elem?.value, '');
    return otp;
  }

  const onSubmit = (data: passwordFormType) => {
    const otp = calculateOtp();
    if (!otp) {
      toast.error("Enter full otp")
      return
    }
    handlePasswordSubmit(email, otp, data.password)
  }

  const handleResendOtpButton = () => {
    setTime(2 * 60)
    handleResendOtp(email)
  }

  // useEffect(() => {
  //   if (intervalId.current === null && isOpen) {
  //     setTime(6 * 2)
  //     intervalId.current = setInterval(() => {
  //       setTime(prev => prev - 1)
  //     }, 1000);
  //   } else {
  //     if (time <= 0 && intervalId.current) {
  //       clearInterval(intervalId.current);
  //       intervalId.current = null;
  //     }
  //   }
  // }, [time, isOpen])

  useEffect(() => {
    if (isOpen === true) {
      setTime(60 * 2)
      intervalId.current = setInterval(() => {
        setTime(prev => {
          if (prev <= 1 && intervalId.current) clearInterval(intervalId.current);
          return prev - 1
        });
      }, 1000);
    }

    return () => {
      setValue("password", "");
      setValue("confirmPassword", "")
      clearErrors()
      if (intervalId.current) clearInterval(intervalId.current)
    }
  }, [isOpen, setValue, clearErrors])

  return (
    <Modal open={isOpen} setOpen={setIsOpen} >
      <div className='p-4 w-[50vh]'>
        <h4 className='text-center text-4xl font-bold upper mb-5'>{t(transalationKey.usersignup.form.lables.enterotp)}</h4>
        <p className='text-center text-gray-500 '>{t(transalationKey.usersignup.form.lables.otpsetdto, { email })}</p>
        <OTP rootRef={rootRef} disabled={!(time > 0)} length={6} />
        <div className='flex justify-between my-3'>
          <p onClick={handleResendOtpButton} className='hover:cursor-pointer'>{t(transalationKey.usersignup.form.lables.resentOtp)}</p>
          <p>{`${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`}</p>
        </div>

        {/* new password form */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
          {/* password field */}

          <motion.div className='flex flex-col gap-2 my-3' initial={inputAnimation.initial} animate={inputAnimation.animate} >
            <Label>{t(transalationKey.form.label.password)}</Label>
            <Input {...register('password')} type='password' error={!!errors.password?.message} />
            <div className='overflow-hidden h-11'>
              <AnimatePresence>
                {errors.password && <motion.p className='text-red-500  flex' initial={errorAnimation.initial} animate={errorAnimation.animate} exit={errorAnimation.exit}>{errors.password.message}</motion.p>}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* confirm password field */}
          <motion.div className='flex flex-col gap-2' initial={inputAnimation.initial} animate={inputAnimation.animate} >
            <Label>{t(transalationKey.form.label.confirmPassword)}</Label>
            <Input {...register('confirmPassword')} type='password' error={!!errors.confirmPassword?.message} />
            <div className='overflow-hidden h-7'>
              <AnimatePresence>
                {errors.confirmPassword && <motion.p className='text-red-500' initial={errorAnimation.initial} animate={errorAnimation.animate} exit={errorAnimation.exit}>{errors.confirmPassword.message}</motion.p>}
              </AnimatePresence>
            </div>
          </motion.div>

          <Button>{isSubmitting ? t(transalationKey.form.button.submitting) : t(transalationKey.form.button.submit)}</Button>
        </form>
      </div>
    </Modal>
  )
}

export default OTPAndNewPasswordModal
