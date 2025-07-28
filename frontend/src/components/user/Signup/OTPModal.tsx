import Modal from '@/components/shared/modal/Modal'
import { Button } from '@/components/ui/button'
import { useUserSignupResendOtpMutation } from '@/hooks/userApiHook'
import transalationKey from '@/utils/i18n/transalationKey'
import { t } from 'i18next'
import React, { useEffect, useRef, useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react'
import { toast } from 'sonner'

interface OTPModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  email: string,
  onSubmit: (otp: string) => void
}


function OTPModal({ isOpen, setIsOpen, email, onSubmit }: OTPModalProps) {
  const rootRef = useRef<(HTMLInputElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const [time, setTime] = useState(2 * 60);
  const { mutate } = useUserSignupResendOtpMutation()

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

  const onData = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let value = e?.target?.value;
    const index = Number(e.target.getAttribute('data-index'));

    if (+value > 9) {
      value = (+value % 10) + '';
      e.target.value = value;
    }

    if (index === rootRef.current.length - 1) {
      handleSubmit()
    } else if (value !== '' && +value >= 0) {
      rootRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.key === "Backspace") {
      if (e.target instanceof HTMLInputElement) {
        const index = Number(e.target.getAttribute('data-index'))
        e.target.value = ''
        rootRef.current[index - 1]?.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const data = e.clipboardData.getData('text/plain');
    if (!isNaN(+data)) {
      rootRef.current.forEach((ref, i) => {
        if (ref) {
          ref.value = data[i]
        }
      })
    }
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
    <Modal open={isOpen} setOpen={setIsOpen}>
      <div className='p-5'>
        <h4 className='text-center text-4xl font-bold upper mb-5'>{t(transalationKey.usersignup.form.lables.enterotp)}</h4>
        <p className='text-center text-gray-500 '>{t(transalationKey.usersignup.form.lables.otpsetdto, { email })}</p>

        {/* otp area */}

        <div className='flex justify-around my-4 '>
          {
            Array(6).fill(null).map((_, i) => <input
              disabled={time === 0}
              data-index={i}
              type='number'
              onChange={onData}
              onKeyUp={handleKeyDown}
              onPaste={handlePaste}
              className='border-2 border-gray-400 h-15 w-15 rounded-xl t remove-arrow focus-visible:shadow-sm text-center text-3xl text-gray-600'
              ref={(r) => { rootRef.current[i] = r }}
            />)
          }
        </div>

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
