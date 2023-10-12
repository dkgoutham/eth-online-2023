'use client'

import { useDarkMode } from '@/hooks'
import Logo from '@/assets/svg/the-session-logo.svg'
import LogoOrange from '@/assets/svg/the-session-logo-orange.svg'

export default function TheSessionLogo() {
  const isDarkMode = useDarkMode()
  return (
    <img
      src={isDarkMode ? Logo.src : LogoOrange.src}
      alt='logo'
      className='max-w-[200px]'
    />
  )
}
