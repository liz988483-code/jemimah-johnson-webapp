import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import { NAVIGATION_ITEMS, APP_CONFIG, SOCIAL_LINKS } from '@/utils/constants'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />
      case 'twitter':
        return <Twitter className="h-5 w-5" />
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />
      case 'instagram':
        return <Instagram className="h-5 w-5" />
      default:
        return <div className="h-5 w-5" />
    }
  }

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="break-words text-xl font-bold text-gradient">
                {APP_CONFIG.name}
              </h3>
              <p className="text-secondary-300 text-sm leading-relaxed">
                {APP_CONFIG.description}
              </p>
              <div className="flex space-x-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-10 h-10 bg-secondary-800 rounded-full flex items-center justify-center text-secondary-300 hover:bg-primary-600 hover:text-white transition-colors duration-200"
                    aria-label={social.name}
                  >
                    {getSocialIcon(social.icon)}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <nav className="space-y-2">
                {NAVIGATION_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-secondary-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Services</h4>
              <nav className="space-y-2">
                <Link
                  to="/services"
                  className="block text-secondary-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Accounting Services
                </Link>
                <Link
                  to="/services"
                  className="block text-secondary-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Tax Services
                </Link>
                <Link
                  to="/services"
                  className="block text-secondary-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Business Advisory
                </Link>
                <Link
                  to="/company-registration"
                  className="block text-secondary-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Company Registration
                </Link>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 shrink-0 text-primary-400" />
                  <div className="min-w-0">
                    <p className="text-sm text-secondary-300">Phone</p>
                    <a
                      href={`tel:${APP_CONFIG.contact.phone}`}
                      className="text-white hover:text-primary-400 transition-colors duration-200"
                    >
                      {APP_CONFIG.contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 shrink-0 text-primary-400" />
                  <div className="min-w-0">
                    <p className="text-sm text-secondary-300">Email</p>
                    <a
                      href={`mailto:${APP_CONFIG.contact.email}`}
                      className="break-words text-white hover:text-primary-400 transition-colors duration-200"
                    >
                      {APP_CONFIG.contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 shrink-0 text-primary-400" />
                  <div className="min-w-0">
                    <p className="text-sm text-secondary-300">Address</p>
                    <p className="text-white">{APP_CONFIG.contact.address}</p>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-secondary-300">
                    {APP_CONFIG.contact.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-800">
        <div className="container-custom py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-sm text-secondary-400">
              © {currentYear} {APP_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link
                to="/privacy"
                className="text-sm text-secondary-400 hover:text-primary-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-secondary-400 hover:text-primary-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
