import Logo from '@/assets/logoWhite.svg'
import SignupForm from '@/components/user/Signup/SignupForm';
import transalationKey from '@/utils/i18n/transalationKey';
import { useTranslation } from 'react-i18next'
function Signup() {
    const {t} = useTranslation();
  return (
    <div className='w-screen h-screen flex'>
        <div className="flex-1/2 bg-black flex items-center justify-center">
            <div className='flex gap-8'>
                <img src={Logo} alt="" />
                <h1 className='text-white nerko-one text-9xl font-[900]'>{t(transalationKey.brand.name)}</h1>
            </div>
        </div>
        <div className="flex-1/2 flex flex-col  items-center justify-center">
            <h3 className='text-4xl font-bold mb-10'>{t(transalationKey.usersignup.form.lables.signup)}</h3>
            <SignupForm/>
        </div>
    </div>
  )
}

export default Signup
