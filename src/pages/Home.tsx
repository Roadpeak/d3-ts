import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import StoresSection from '../components/StoresSection'
import FeaturedOffers from '../components/FeaturedOffers'
import TravelSection from '../components/TravelSection'
import Footer from '../components/Footer'
import { useAuth } from '../utils/context/AuthContext'
import EventSection from '../components/EventSection'

const Home: React.FC = () => {
  const { user } = useAuth();
  return (
    <div>
      <Navbar />
      {user && user.first_discount === 0 && (
        <div className="bg-yellow-200">
          <p className="text-yellow-800 px-4 text-center py-3 text-sm">
            You have one free voucher. You will use it to access any discount and book an appointment.
          </p>
        </div>
      )}
      <Hero />
      <StoresSection />
      <FeaturedOffers />
      <TravelSection />
      {/* <EventSection /> */}
      <Footer />
    </div>
  )
}

export default Home
