import GroupImg from '@/assets/img/group.jpeg'
import { IContainerProps } from '@/model'

interface IProps extends IContainerProps {
  bgColor?: string
  bgImage?: string | undefined
  flat?: boolean
}

export default function PillWrapper({
  bgColor = 'orange',
  bgImage,
  flat = true,
  className,
  children,
}: IProps) {
  const classes = [
    'relative flex flex-col justify-end gap-2 py-20 px-8 rounded-full text-left',
    'h-full min-h-[300px] w-full min-w-[200px]',
    'border-[1px] border-[--black] dark:border-[--white]',
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
