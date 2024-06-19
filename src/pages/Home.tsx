import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import StoresSection from '../components/StoresSection'
import FeaturedOffers from '../components/FeaturedOffers'
import TravelSection from '../components/TravelSection'
import Footer from '../components/Footer'

const Home: React.FC = () => {
  const sender = '65f94b151102771a08a6dce6'; 
  const recipient = '6614d3855219f9ce39db1af8';
  return (
    <div>
      <Navbar />
      <Hero />
      <StoresSection />
      <FeaturedOffers />
      <TravelSection />
      <Footer />
    </div>
  )
}

export default Home
