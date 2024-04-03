import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import StoresSection from '../components/StoresSection'
import FeaturedOffers from '../components/FeaturedOffers'
import TravelSection from '../components/TravelSection'
import TodaysDeals from '../components/TodaysDeals'
import Footer from '../components/Footer'
import ReviewsSection from '../components/Reviews'
import Services from '../components/Services'
import Blog from '../components/Blog'

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <StoresSection />
      <FeaturedOffers />
      <TravelSection />
      <TodaysDeals />
      <ReviewsSection />
      <Services />
      <div className="bg-gray-100">
        <Blog />    
      </div>
      <Footer />
    </div>
  )
}

export default Home
