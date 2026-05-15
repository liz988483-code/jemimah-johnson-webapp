import React from 'react'
import HeroSection from '@/components/home/HeroSection'
import ServicesOverview from '@/components/home/ServicesOverview'
import ContactCTA from '@/components/home/ContactCTA'

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <ServicesOverview />
      <ContactCTA />
    </div>
  )
}

export default Home
