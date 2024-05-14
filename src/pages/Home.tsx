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
import ChatRoom from './chat/ChatRoom'
import ChatInput from './chat/ChatInput'

const Home: React.FC = () => {
  const sender = '65f94b151102771a08a6dce6'; 
  const recipient = '6614d3855219f9ce39db1af8';
  return (
    <div>
      {/* <ChatRoom recipient={recipient} sender={sender} />
      <ChatInput sender={sender} recipient={recipient} /> */}
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
