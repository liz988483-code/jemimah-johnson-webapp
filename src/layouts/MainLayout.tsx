import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

const MainLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(100)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const measure = () => {
      const header = document.querySelector('header')
      if (header) setHeaderHeight(header.offsetHeight)
    }

    // Measure after fonts/images have loaded so logo height is final
    measure()
    window.addEventListener('resize', measure)

    // Re-measure after a short delay to catch logo load
    const t = setTimeout(measure, 300)

    return () => {
      window.removeEventListener('resize', measure)
      clearTimeout(t)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main
        className="flex-grow pt-3"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout