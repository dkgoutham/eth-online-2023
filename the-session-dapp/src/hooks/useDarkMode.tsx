import { useState, useEffect } from 'react'

export const useDarkMode = (): boolean => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleDarkModeChange = (event: any) => {
      setIsDarkMode(event.matches)
    }

    darkModeMediaQuery.addEventListener('change', handleDarkModeChange)
    setIsDarkMode(darkModeMediaQuery.matches)

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleDarkModeChange)
    }
  }, [])

  return isDarkMode
}
