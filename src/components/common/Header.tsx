import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Phone, Mail, User, LogOut } from 'lucide-react'
import { NAVIGATION_ITEMS, APP_CONFIG } from '@/utils/constants'

interface HeaderProps {
  isMenuOpen: boolean
  toggleMenu: () => void
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, toggleMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [clientUser, setClientUser] = useState<any>(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const userStr = localStorage.getItem('clientUser')
    if (userStr) {
      setClientUser(JSON.parse(userStr))
    }
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('clientToken')
    localStorage.removeItem('clientUser')
    setClientUser(null)
    navigate('/')
  }

  const closeMenu = () => {
    if (isMenuOpen) {
      toggleMenu()
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-lg py-2'
            : 'bg-white/95 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex flex-col">
              <div className="flex items-center space-x-3">
                <img
                  src="/images/logo.svg.jpeg"
                  alt={APP_CONFIG.name}
                  className="h-16 w-16"
                />
                <div className="leading-tight">
                  <div className="text-lg font-black text-secondary-900 tracking-wide">
                    JEMIMAH
                  </div>
                  <div className="text-lg font-black text-secondary-900 tracking-wide">
                    JOHNSTONE
                  </div>
                  <div className="text-lg font-black text-secondary-900 tracking-wide">
                    & ASSOCIATES
                  </div>
                </div>
              </div>
              <div className="mt-1">
                <div className="text-sm font-bold text-primary-500 tracking-wider uppercase">
                  YOUR FINANCIAL SOLUTION PARTNER
                </div>
                <div className="text-xs text-secondary-600 italic">
                  Accurate, Relevant and Reliable financial solutions.
                </div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-primary-600 ${
                    location.pathname === item.path
                      ? 'text-primary-600'
                      : 'text-secondary-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <a
                href={`tel:${APP_CONFIG.contact.phone}`}
                className="flex items-center space-x-2 text-sm text-secondary-600 hover:text-primary-600 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{APP_CONFIG.contact.phone}</span>
              </a>
              {clientUser ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary text-sm px-4 py-2"
                  >
                    Register
                  </Link>
                </>
              )}

            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-secondary-700" />
              ) : (
                <Menu className="h-6 w-6 text-secondary-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={closeMenu} />
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gradient">
                  {APP_CONFIG.name}
                </h2>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
                >
                  <X className="h-6 w-6 text-secondary-700" />
                </button>
              </div>

              <nav className="space-y-4">
                {NAVIGATION_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-primary-50 hover:text-primary-600 ${
                      location.pathname === item.path
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-secondary-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 space-y-4">
                {clientUser ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={closeMenu}
                      className="flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-primary-50 hover:text-primary-600 text-secondary-700"
                    >
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        closeMenu()
                      }}
                      className="flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-red-50 hover:text-red-600 text-red-600 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-primary-50 hover:text-primary-600 text-secondary-700"
                    >
                      <User className="h-4 w-4" />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeMenu}
                      className="btn-primary w-full text-center"
                    >
                      Register
                    </Link>
                  </>
                )}
                <a
                  href={`tel:${APP_CONFIG.contact.phone}`}
                  className="flex items-center space-x-2 text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>{APP_CONFIG.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${APP_CONFIG.contact.email}`}
                  className="flex items-center space-x-2 text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>{APP_CONFIG.contact.email}</span>
                </a>
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="btn-primary w-full text-center"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
