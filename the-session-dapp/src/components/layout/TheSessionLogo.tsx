'use client'

import { useDarkMode } from '@/hooks'
import Logo from '@/assets/svg/the-session-logo.svg'

export default function TheSessionLogo() {
  return <img src={Logo.src} alt='logo' className='max-w-[200px]' />
}
