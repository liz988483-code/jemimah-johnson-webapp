import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut, ChevronDown, ChevronRight, Building2, Calculator, Receipt, Briefcase, LayoutGrid } from 'lucide-react'
import { APP_CONFIG } from '@/utils/constants'

interface HeaderProps {
  isMenuOpen: boolean
  toggleMenu: () => void
}

const SERVICES_DROPDOWN = [
  { name: 'All Services', path: '/services', icon: <LayoutGrid className="h-4 w-4" /> },
  { name: 'Company Registration', path: '/company-registration', icon: <Building2 className="h-4 w-4" /> },
  { name: 'Accounting', path: '/accounting', icon: <Calculator className="h-4 w-4" /> },
  { name: 'Taxation', path: '/taxation', icon: <Receipt className="h-4 w-4" /> },
  { name: 'Advisory', path: '/advisory', icon: <Briefcase className="h-4 w-4" /> },
]

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

const Header: React.FC<HeaderProps> = ({ isMenuOpen, toggleMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [clientUser, setClientUser] = useState<any>(null)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const userStr = localStorage.getItem('clientUser')
    if (userStr) setClientUser(JSON.parse(userStr))
  }, [location])

  // Close services dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isAuthModalOpen])

  const handleLogout = () => {
    localStorage.removeItem('clientToken')
    localStorage.removeItem('clientUser')
    setClientUser(null)
    navigate('/')
  }

  const closeMenu = () => { if (isMenuOpen) toggleMenu() }

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode)
    setAuthError('')
    setLoginForm({ email: '', password: '' })
    setRegisterForm({ name: '', email: '', password: '', confirm: '' })
    setIsAuthModalOpen(true)
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)
    try {
      const res = await fetch('/api/client/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginForm.email, password: loginForm.password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed')
      localStorage.setItem('clientToken', data.data.token)
      localStorage.setItem('clientUser', JSON.stringify(data.data.user))
      setClientUser(data.user)
      setIsAuthModalOpen(false)
      navigate('/dashboard')
    } catch (err: any) {
      setAuthError(err.message)
    } finally {
      setAuthLoading(false)
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    if (registerForm.password !== registerForm.confirm) {
      setAuthError('Passwords do not match')
      return
    }
    setAuthLoading(true)
    try {
      const res = await fetch('/api/client/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: registerForm.name, email: registerForm.email, password: registerForm.password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Registration failed')
      localStorage.setItem('clientToken', data.data.token)
      localStorage.setItem('clientUser', JSON.stringify(data.data.user))
      setClientUser(data.user)
      setIsAuthModalOpen(false)
      navigate('/dashboard')
    } catch (err: any) {
      setAuthError(err.message)
    } finally {
      setAuthLoading(false)
    }
  }

  const isServicesActive = ['/services', '/company-registration', '/accounting', '/taxation', '/advisory'].includes(location.pathname)

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-4' : 'bg-white/95 backdrop-blur-sm py-8'
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <Link to="/" className="flex items-start gap-4 shrink-0">
              <img
                src="/images/logo.svg.jpeg"
                alt={APP_CONFIG.name}
                className="h-24 w-24 object-contain"
              />
              <div className="flex flex-col justify-center">
                <div className="text-xl font-black text-secondary-900 tracking-wide leading-tight">
                  JEMIMAH JOHNSTONE & ASSOCIATES
                </div>
                <div className="text-sm font-bold text-primary-500 tracking-widest uppercase mt-1 whitespace-nowrap">
                  YOUR FINANCIAL SOLUTION PARTNER
                </div>
                <div className="text-xs text-secondary-600 italic mt-0.5">
                  Accurate, Relevant and Reliable financial solutions.
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">

              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  location.pathname === '/' ? 'text-primary-600' : 'text-secondary-700'
                }`}
              >
                Home
              </Link>

              {/* Services dropdown */}
              <div className="relative" ref={servicesRef}>
                <button
                  onClick={() => setIsServicesOpen((v) => !v)}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary-600 ${
                    isServicesActive ? 'text-primary-600' : 'text-secondary-700'
                  }`}
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {isServicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
                    {SERVICES_DROPDOWN.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsServicesOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-primary-50 hover:text-primary-600 ${
                          location.pathname === item.path ? 'text-primary-600 bg-primary-50' : 'text-secondary-700'
                        }`}
                      >
                        <span className="text-primary-400">{item.icon}</span>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {NAV_LINKS.filter(l => l.name !== 'Home').map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                    location.pathname === link.path ? 'text-primary-600' : 'text-secondary-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              {clientUser ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-2 text-sm font-medium text-secondary-700 hover:text-primary-600 transition-colors border border-secondary-200 hover:border-primary-400 rounded-lg px-4 py-2"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile hamburger */}
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

      {/* ===== MOBILE MENU ===== */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={closeMenu} />
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-primary-600">{APP_CONFIG.name}</h2>
                <button onClick={closeMenu} className="p-2 rounded-lg hover:bg-secondary-100 transition-colors">
                  <X className="h-6 w-6 text-secondary-700" />
                </button>
              </div>

              <nav className="space-y-1">
                <Link
                  to="/"
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-primary-50 hover:text-primary-600 ${
                    location.pathname === '/' ? 'bg-primary-50 text-primary-600' : 'text-secondary-700'
                  }`}
                >
                  Home
                </Link>

                {/* Mobile services */}
                <div>
                  <button
                    onClick={() => setIsMobileServicesOpen((v) => !v)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-primary-50 hover:text-primary-600 ${
                      isServicesActive ? 'bg-primary-50 text-primary-600' : 'text-secondary-700'
                    }`}
                  >
                    Services
                    <ChevronRight className={`h-4 w-4 transition-transform ${isMobileServicesOpen ? 'rotate-90' : ''}`} />
                  </button>
                  {isMobileServicesOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {SERVICES_DROPDOWN.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={closeMenu}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-colors hover:bg-primary-50 hover:text-primary-600 ${
                            location.pathname === item.path ? 'text-primary-600 bg-primary-50' : 'text-secondary-600'
                          }`}
                        >
                          <span className="text-primary-400">{item.icon}</span>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {NAV_LINKS.filter(l => l.name !== 'Home').map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-primary-50 hover:text-primary-600 ${
                      location.pathname === link.path ? 'bg-primary-50 text-primary-600' : 'text-secondary-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 border-t pt-6">
                {clientUser ? (
                  <>
                    <Link to="/dashboard" onClick={closeMenu} className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                      <User className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { handleLogout(); closeMenu() }}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full text-left transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { openAuthModal('login'); closeMenu() }}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors w-full"
                  >
                    <User className="h-4 w-4" />
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== AUTH MODAL ===== */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAuthModalOpen(false)} />
          <div ref={modalRef} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-secondary-900">
                  {authMode === 'login' ? 'Welcome back' : 'Create an account'}
                </h2>
                <p className="text-sm text-secondary-500 mt-0.5">
                  {authMode === 'login' ? 'Sign in to your account' : 'Join Jemimah Johnstone & Associates'}
                </p>
              </div>
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
              >
                <X className="h-5 w-5 text-secondary-500" />
              </button>
            </div>

            <div className="p-6">
              {/* Mode toggle tabs */}
              <div className="flex rounded-lg bg-secondary-100 p-1 mb-6">
                <button
                  onClick={() => { setAuthMode('login'); setAuthError('') }}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    authMode === 'login'
                      ? 'bg-white text-secondary-900 shadow-sm'
                      : 'text-secondary-500 hover:text-secondary-700'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthMode('register'); setAuthError('') }}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    authMode === 'register'
                      ? 'bg-white text-secondary-900 shadow-sm'
                      : 'text-secondary-500 hover:text-secondary-700'
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Error */}
              {authError && (
                <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {authError}
                </div>
              )}

              {/* Login form */}
              {authMode === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-secondary-600 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="w-full border border-secondary-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-secondary-600 uppercase tracking-wider mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="w-full border border-secondary-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="btn-primary w-full py-3 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {authLoading ? 'Signing in...' : 'Sign In'}
                  </button>
                  <p className="text-center text-sm text-secondary-500 pt-2">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setAuthMode('register'); setAuthError('') }}
                      className="text-primary-600 font-medium hover:underline"
                    >
                      Register here
                    </button>
                  </p>
                </form>
              )}

              {/* Register form */}
              {authMode === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-secondary-600 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      className="w-full border border-secondary-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-secondary-600 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      className="w-full border border-secondary-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-secondary-600 uppercase tracking-wider mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      className="w-full border border-secondary-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-secondary-600 uppercase tracking-wider mb-1.5">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      value={registerForm.confirm}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirm: e.target.value })}
                      className="w-full border border-secondary-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="btn-primary w-full py-3 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {authLoading ? 'Creating account...' : 'Create Account'}
                  </button>
                  <p className="text-center text-sm text-secondary-500 pt-2">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setAuthMode('login'); setAuthError('') }}
                      className="text-primary-600 font-medium hover:underline"
                    >
                      Sign in
                    </button>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header