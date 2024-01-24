import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import StoresSection from '../components/StoresSection'
import FeaturedOffers from '../components/FeaturedOffers'
import TravelSection from '../components/TravelSection'
import TodaysDeals from '../components/TodaysDeals'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <StoresSection />
      <FeaturedOffers />
      <TravelSection />
      <TodaysDeals />
      <Footer />
    </div>
  )
}

export default Home
