interface IProps {
  src: string | null
}

export default function Avatar({ src }: IProps) {
  return (
    <span className='relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-[1px] border-[--blue] bg-[--blue] dark:border-[--orange] dark:bg-[--orange]'>
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
