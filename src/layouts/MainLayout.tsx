import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

const MainLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Measure header height dynamically
  useEffect(() => {
    const header = document.querySelector('header')
    if (header) {
      setHeaderHeight(header.offsetHeight)
    }

    const handleResize = () => {
      const header = document.querySelector('header')
      if (header) {
        setHeaderHeight(header.offsetHeight)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main 
        className="flex-grow" 
        style={{ paddingTop: `${headerHeight + 20}px` }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout