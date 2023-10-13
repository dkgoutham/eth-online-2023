'use client'

import Link from 'next/link'
import { useDarkMode } from '@/hooks'
import SSLogoWhite from '@/assets/svg/ss-logo-orange.svg'
import SSLogoOrange from '@/assets/svg/ss-logo-orange.svg'

export default function SSLogo() {
  const isDarkMode = useDarkMode()
  return (
    <li className='flex h-full w-auto items-center justify-center overflow-hidden'>
      <Link href='/' className='h-full'>
        <img
          className='h-full object-cover'
          src={isDarkMode ? SSLogoWhite.src : SSLogoOrange.src}
          alt='SS Logo'
        />
      </Link>
    </li>
  )
}
