import { IContainerProps as IProps } from '@/model'

export default function MainWrapper({ className, children }: IProps) {
  const mainClass =
    `flex flex-col items-center justify-between px-8 pb-16 pt-8 ${
      className || ''
    }`.trim()
  return <main className={mainClass}>{children}</main>
}
