import GroupImg from '@/assets/img/group.jpeg'
import { IContainerProps } from '@/model'

interface IProps extends IContainerProps {
  bgColor?: 'black' | 'orange'
  bgImage?: string | undefined
  flat?: boolean
}

export default function PillWrapper({
  bgColor = 'black',
  bgImage,
  flat = true,
  className,
  children,
}: IProps) {
  const classes = [
    'flex items-end py-20 px-8 rounded-full',
    'h-full min-h-[300px] w-full w-[200px]',
    `border-[1px] border-[--black] dark:border-[--white] `,
    `bg-[--${bgColor}] bg-center bg-no-repeat bg-center bg-cover`,
    className || '',
  ]
  return (
    <div
      style={{
        backgroundImage: flat ? undefined : `url('${bgImage || GroupImg.src}')`,
      }}
      className={classes.join(' ').trim()}
    >
      {children}
    </div>
  )
}
