import Logo from '@/assets/logoWhite.svg';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import type { userDataState } from '@/store/slices/user/userDataSlice';
import transalationKey from '@/utils/i18n/transalationKey';
import { useTranslation } from 'react-i18next';
import { removeUser } from '@/store/slices/user/userDataSlice';
import { deleteToken } from '@/store/slices/user/tokenSlice'
import { useNavigate } from '@tanstack/react-router';
import { setLanguage } from '@/store/slices/lang/langSlice';
import { Languages, type Langtype } from '@/types/language';
import { Languages as LanguagesIcon } from 'lucide-react';
import i18next from 'i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectIcon } from '@radix-ui/react-select';


function Nav() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const user: userDataState = useAppSelector((state) => state.user);
  const lang = useAppSelector((state) => state.lang.lang);

  const handleLanguageChange = (value: string) => {
    const newLang = value;
    i18next.changeLanguage(newLang);
    dispatch(setLanguage(newLang as Langtype));
    document.documentElement.setAttribute('lang', newLang)
  }

  const handleLogout = () => {
    dispatch(removeUser());
    dispatch(deleteToken());
    navigate({ to: '/user/login' })
  }



  return (
    <nav className='bg-black items-center py-5 px-10 flex'>
      {/* branding */}
      <div className='flex items-center grow gap-5'>
        <img src={Logo} alt="Brand Logo" />
        <h3 className='nerko-one text-white text-8xl'>{t(transalationKey.brand.name)}</h3>
      </div>

      {/* user side */}
      <div className='grow flex justify-end items-center gap-4'>
        {/* language swithcing */}

        <div className='flex items-center gap-2'>
          <Select value={lang} onValueChange={handleLanguageChange}>
            <SelectTrigger className=" text-white">
              <SelectValue placeholder="Select a fruit" className='text-white' />
              <SelectIcon>
                <LanguagesIcon color='white' />
              </SelectIcon>
            </SelectTrigger>
            <SelectContent>
              {
                Languages.map((l, i) => <SelectItem key={i} value={l}  >{l}</SelectItem>)
              }
            </SelectContent>
          </Select>
        </div>

        {/* username */}
        <h5 className='text-white'>{user.data.fullname}</h5>
        {
          user.isLogin ?
            <Button onClick={handleLogout} className='bg-red-700 font-bold hover:bg-red-600'>{t(transalationKey.button.logout)}</Button>
            : <Button onClick={() => navigate({ to: '/user/login' })} className='bg-zinc-100 text-stone-800 font-bold hover:bg-zinc-300'>{t(transalationKey.button.login)}</Button>
        }
      </div>
    </nav>
  )
}

export default Nav
