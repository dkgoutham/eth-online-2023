'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Group } from '@/model'

interface IProps {
  group: Group
}

const classes = {
  default:
    'border-[--black] dark:border-[--white] hover:border-[--orange] hover:text-[--orange] ',
  selected: 'bg-[--orange] border-[--orange] text-[--white]',
}

export default function Tag({ group }: IProps) {
  const [stateClass, setStateClass] = useState<string>(classes.default)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!
  const filterGroups = useCallback(() => {
    const params = new URLSearchParams('group')
    params.delete('group')
    params.set('group', group.slug)
    router.push(`${pathname}?${params.toString()}`)
  }, [group.slug, pathname, router])

  useEffect(() => {
    setStateClass(
      searchParams.get('group') === group.slug
        ? classes.selected
        : classes.default
    )
  }, [group.slug, searchParams])

  return (
    <button
      className={`rounded-full border-[1px] px-8 py-2 text-sm transition-colors ${stateClass}`.trim()}
      onClick={filterGroups}
    >
      {group.name}
    </button>
  )
}
