import { IContainerProps as IProps } from '@/model'

export default function SectionWrapper({ className, children }: IProps) {
  const sectionClass = `flex flex-col items-center justify-between my-4 ${
    className || ''
  }`.trim()
  return <section className={sectionClass}>{children}</section>
}
