import FeaturedOffers from './components/FeaturedOffers';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import StoresSection from './components/StoresSection';
import TravelSection from './components/TravelSection';

function App() {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <Hero />
      <StoresSection />
      <FeaturedOffers />
      <TravelSection />
    </div>
  );
}

export default App;
