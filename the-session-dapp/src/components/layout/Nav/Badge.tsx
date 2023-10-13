interface IProps {
  notifications: number
}

export default function Badge({ notifications }: IProps) {
  return (
    <div className='text-bold h-2 w-2 rounded-full bg-[--orange] p-1 text-[0.5rem] text-white'>
      {notifications}
    </div>
  )
}
