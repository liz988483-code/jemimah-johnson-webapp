import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

const MainLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main className="flex-grow pt-32 md:pt-40">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
