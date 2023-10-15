'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { GroupTopic } from '@/model'

interface IProps {
  topic: GroupTopic
}

const classes = {
  default:
    'border-[--black] dark:border-[--white] hover:border-[--orange] hover:text-[--orange] ',
  selected: 'bg-[--orange] border-[--orange] text-[--white]',
}

export default function Tag({ topic: { slug, name: topicName } }: IProps) {
  const [stateClass, setStateClass] = useState<string>(classes.default)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!
  const filterGroups = useCallback(() => {
    const params = new URLSearchParams('topic')
    params.delete('topic')
    params.set('topic', slug)
    router.push(`${pathname}?${params.toString()}`)
  }, [slug, pathname, router])

  useEffect(() => {
    setStateClass(
      searchParams.get('topic') === slug ? classes.selected : classes.default
    )
  }, [slug, searchParams])

  return (
    <button
      className={`rounded-full border-[1px] px-8 py-2 text-sm transition-colors ${stateClass}`.trim()}
      onClick={filterGroups}
    >
      {topicName}
    </button>
  )
}
