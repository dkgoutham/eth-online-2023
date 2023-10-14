interface IProps {
  className?: string | undefined
  children: React.ReactNode
}

export default function H1({ className, children }: IProps) {
  return (
    <h1
      className={`text-center text-4xl font-black text-[--black] dark:text-white ${className}`.trim()}
    >
      {children}
    </h1>
  )
}
