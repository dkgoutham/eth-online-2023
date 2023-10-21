'use client'

import { useState } from 'react'
import { AppColors } from '@/model'

export default function SendMessageButton() {
  const [iconColor, setIconColor] = useState<AppColors>(AppColors.WHITE)
  return (
    <button
      onMouseEnter={() => {
        setIconColor(AppColors.ORANGE)
      }}
      onMouseLeave={() => {
        setIconColor(AppColors.WHITE)
      }}
      className='flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1px] border-[--orange] bg-[--orange] px-0 py-0 hover:bg-[--background]'
      type='submit'
    >
      <svg
        className='transition-colors'
        xmlns='http://www.w3.org/2000/svg'
        width={32}
        height={32}
        fill='none'
      >
        <path
          d='M14.667 10.433 7.2 17.9 5.334 16 16 5.333 26.667 16 24.8 17.9l-7.466-7.467v16.234h-2.667V10.433Z'
          fill={iconColor}
        />
      </svg>
    </button>
  )
}
