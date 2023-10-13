'use client'

import Link from 'next/link'
import { useDarkMode } from '@/hooks'
import SSLogoWhite from '@/assets/svg/ss-logo-orange.svg'
import SSLogoOrange from '@/assets/svg/ss-logo-orange.svg'

export default function SSLogo() {
  const isDarkMode = useDarkMode()
  return (
    <li className='flex items-center justify-center overflow-hidden'>
      <Link href='/' className='h-full'>
        <img
          className='h-5 w-auto object-cover'
          src={isDarkMode ? SSLogoWhite.src : SSLogoOrange.src}
          alt='SS Logo'
        />
      </Link>
    </li>
  )
}
