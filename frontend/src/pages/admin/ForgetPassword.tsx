import { default as SharedForgetPassword, type forgetPasswordProps } from '@/components/shared/forgotPassword/ForgotPassword'
import { useUserForgetPasswordRequestOtp, useUserForgetPasswordResendOtp, useUserForgetPasswordVerifyOtp } from '@/hooks/userApiHook';
import transalationKey from '@/utils/i18n/transalationKey';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import ForgetPasswordImage from '@/assets/Forgot password-bro.svg'

function ForgetPassword() {
  const { t } = useTranslation()
  const forgetPasswordProps: forgetPasswordProps = {
    heading: t(transalationKey.heading.forgetPassword),
    onOtpRequest: handleOtpRequest,
    onOtpSubmit,
    onResendOtp,
    image: ForgetPasswordImage
  }

  const { mutate: requestOtpMutation } = useUserForgetPasswordRequestOtp();
  const { mutate: verifyOtpMutation } = useUserForgetPasswordVerifyOtp();
  const { mutate: resendOtpMutation } = useUserForgetPasswordResendOtp()

  const navigate = useNavigate()

  async function handleOtpRequest(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      requestOtpMutation({ email }, {
        onSuccess: (data) => {
          toast.success(data.message)
          resolve(true)
        },
        onError: (err) => {
          console.log(err)
          toast.error(err.message)
          reject(false)
        }
      })
    })
  }

  async function onOtpSubmit(email: string, otp: string, password: string) {
    verifyOtpMutation({ email, otp, password }, {
      onSuccess: (data) => {
        toast.success(data.message);
        navigate({ to: "/admin/login", replace: true })
      },
      onError: (err) => {
        toast.error(err.message)
      }
    })
  }

  async function onResendOtp(email: string) {
    resendOtpMutation({ email }, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (err) => {
        toast.error(err.message)
      }
    })
    return
  }

  return (
    <SharedForgetPassword {...forgetPasswordProps} />
  )
}

export default ForgetPassword
