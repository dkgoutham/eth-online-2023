interface IProps {
  src: string | null
}

export default function Avatar({ src }: IProps) {
  return (
    <span className='rounded-full dark:border-[--orange] relative flex h-8 w-8 items-center justify-center overflow-hidden border-[1px] border-[--blue] bg-[--blue]'>
      {src && (
        <img
          className='h-full w-full object-contain'
          alt='User Avatar'
          src={src}
        />
      )}
    </span>
  )
}
