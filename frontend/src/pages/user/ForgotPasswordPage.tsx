import ForgotPassword, { type forgetPasswordProps } from "@/components/shared/forgotPassword/ForgotPassword"
import { useUserForgetPasswordRequestOtp, useUserForgetPasswordVerifyOtp } from "@/hooks/userApiHook"
import transalationKey from "@/utils/i18n/transalationKey"
import { useNavigate } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

function ForgotPasswordPage() {
  const { t } = useTranslation()
  const forgetPasswordProps: forgetPasswordProps = {
    heading: t(transalationKey.heading.forgetPassword),
    onOtpRequest: handleOtpRequest,
    onOtpSubmit,
    onResendOtp,
  }

  const { mutate: requestOtpMutation } = useUserForgetPasswordRequestOtp();
  const { mutate: verifyOtpMutation } = useUserForgetPasswordVerifyOtp()

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
        navigate({ to: "/user/login", replace: true })
      },
      onError: (err) => {
        toast.error(err.message)
      }
    })
  }

  async function onResendOtp(email: string) {
    console.log(email)
    return
  }
  return (
    <ForgotPassword {...forgetPasswordProps} />
  )
}

export default ForgotPasswordPage
