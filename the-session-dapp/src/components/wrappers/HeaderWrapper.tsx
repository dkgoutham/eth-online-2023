import { IContainerProps as IProps } from '@/model'

export default function HeaderWrapper({ children }: IProps) {
  return <header className='mb-8 mt-10 px-4'>{children}</header>
}
