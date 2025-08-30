import Modal from '@/components/shared/modal/Modal'
// import OTP from '@/components/shared/otp/Otp'
import OTP from '@/components/shared/otp/OTP'
import { Button } from '@/components/ui/button'
import { useUserSignupResendOtpMutation } from '@/hooks/userApiHook'
import transalationKey from '@/utils/i18n/transalationKey'
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

interface OTPModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  email: string,
  onSubmit: (otp: string) => void
}


function OTPModal({ isOpen, setIsOpen, email, onSubmit }: OTPModalProps) {

  const { t } = useTranslation()
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const [time, setTime] = useState(2 * 60);
  const { mutate } = useUserSignupResendOtpMutation()

  const rootRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleSubmit = () => {
    const index = rootRef.current.findIndex((ref) => {
      if (ref) {
        if (Number(ref.value) < 0 || Number(ref.value) > 9) return true
      }
    });

    if (index !== -1) {
      rootRef.current[index]?.focus()
    }
    const otp = rootRef.current.map((ref) => ref ? ref.value : '').join('');
    onSubmit(otp)
  }

  const resendOtp = () => {
    mutate({ email }, {
      onSuccess: (response) => {
        toast.success(response.message);
        clearInterval(intervalRef.current!);
        intervalRef.current = setInterval(() => {
          setTime(prev => {
            if (prev <= 1) {
              clearInterval(intervalRef.current!);
              intervalRef.current = null;
            }
            return prev - 1;
          });
        }, 1000);
        setTime(2 * 60);
      }
    })
  }

  useEffect(() => {
    if (isOpen) {
      if (!intervalRef.current) {
        setTime(2 * 60)
        intervalRef.current = setInterval(() => {
          setTime(prev => {
            if (prev <= 1) {
              clearInterval(intervalRef.current!);
              intervalRef.current = null;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        clearInterval(intervalRef.current)
        intervalRef.current = null;
        setTime(0)
      }
    }

    return () => {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
    }
  }, [isOpen])

  return (
    <Modal open={isOpen} setOpen={setIsOpen} >
      {/* <OTP email={email} setIsOpen={setIsOpen} isOpen={isOpen} onSubmit={onSubmit} /> */}
      <div className='p-5'>
        <h4 className='text-center text-4xl font-bold upper mb-5'>{t(transalationKey.usersignup.form.lables.enterotp)}</h4>
        <p className='text-center text-gray-500 '>{t(transalationKey.usersignup.form.lables.otpsetdto, { email })}</p>
        <OTP rootRef={rootRef} disabled={time <= 0} length={6} onComplete={handleSubmit} />
        <div className='flex justify-between my-3'>
          <p onClick={resendOtp} className='hover:cursor-pointer'>{t(transalationKey.usersignup.form.lables.resentOtp)}</p>
          <p>{`${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`}</p>
        </div>
        <div className='flex justify-between'>
          <Button onClick={() => setIsOpen(false)} variant={'outline'}>{t(transalationKey.button.cancel)}</Button>
          <Button disabled={time === 0} onClick={handleSubmit}>{t(transalationKey.button.verify)}</Button>
        </div>
      </div>
    </Modal>
  )
}

export default OTPModal
