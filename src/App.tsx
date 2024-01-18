import FeaturedOffers from './components/FeaturedOffers';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import StoresSection from './components/StoresSection';
import TodaysDeals from './components/TodaysDeals';
import TravelSection from './components/TravelSection';

function App() {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <Hero />
      <StoresSection />
      <FeaturedOffers />
      <TravelSection />
      <TodaysDeals />
      <Footer />
    </div>
  );
}

export default App;
