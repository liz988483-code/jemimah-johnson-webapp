import React from 'react'
import HeroSection from '@/components/home/HeroSection'
import ServicesOverview from '@/components/home/ServicesOverview'
import CompanyRegistrationPackages from '@/components/home/CompanyRegistrationPackages'
import ContactCTA from '@/components/home/ContactCTA'

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <ServicesOverview />
      <CompanyRegistrationPackages />
      <ContactCTA />
    </div>
  )
}

export default Home
