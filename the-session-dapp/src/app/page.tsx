'use client'

import Button from '@/components/ui/Button'
import TheSessionLogo from '@/assets/icons/the-session-logo.svg'

export default function Home() {
  return (
    <main className='mx-auto flex min-h-screen max-w-[1080px] flex-col items-center justify-between px-12 pb-24 pt-12'>
      <img src={TheSessionLogo.src} alt='logo' className='max-w-[200px]' />
      <section className='flex flex-col gap-[clamp(1rem,3vw,3rem)] pb-16 pt-12'>
        <h1 className='text-balance max-w-[450px] text-center text-[clamp(3.5rem,10vw,6rem)] font-black leading-none'>
          let’s talk about it
        </h1>
        <p className='text-balance text-center text-[clamp(1rem,3vw,1.5rem)] text-lg font-bold'>
          Find your favorite group therapy
        </p>
      </section>
      {/* TODO Add Cometh Auth */}
      <Button onClick={() => console.log('clicked')}>connect</Button>
    </main>
  )
}
