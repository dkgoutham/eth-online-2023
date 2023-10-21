'use client'

import { AppColors } from '@/model'
import style from './styles.module.css'

interface IProps {
  weight?: number
  color?: AppColors
  size?: number
}

export default function Spinner({
  weight = 5,
  color = AppColors.ORANGE,
  size = 48,
}: IProps) {
  return (
    <span
      style={{
        width: size,
        height: size,
        border: `${weight}px solid ${color}`,
        borderBottomColor: 'transparent',
      }}
      className={style.loader}
    ></span>
  )
}
