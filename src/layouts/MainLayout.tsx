import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

const MainLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(112)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const header = document.querySelector('header')
    const measure = () => {
      if (header) setHeaderHeight(header.offsetHeight)
    }

    // Measure after fonts/images have loaded so logo height is final
    measure()
    const observer = header ? new ResizeObserver(measure) : null
    if (header) observer?.observe(header)
    window.addEventListener('resize', measure)

    // Re-measure after a short delay to catch logo load
    const t = setTimeout(measure, 300)

    return () => {
      window.removeEventListener('resize', measure)
      observer?.disconnect()
      clearTimeout(t)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main
        className="flex-grow"
        style={{ paddingTop: headerHeight }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
