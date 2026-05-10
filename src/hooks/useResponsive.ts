import { useState, useEffect } from 'react'

interface WindowSize {
  width: number
  height: number
}

interface BreakpointValues {
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
  '2xl': boolean
}

export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  const [breakpoints, setBreakpoints] = useState<BreakpointValues>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      setWindowSize({ width, height })
      
      setBreakpoints({
        sm: width >= 640,
        md: width >= 768,
        lg: width >= 1024,
        xl: width >= 1280,
        '2xl': width >= 1536,
      })
    }

    if (typeof window !== 'undefined') {
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const isMobile = windowSize.width < 768
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024
  const isDesktop = windowSize.width >= 1024

  return {
    windowSize,
    breakpoints,
    isMobile,
    isTablet,
    isDesktop,
  }
}
