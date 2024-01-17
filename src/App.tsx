import Hero from './components/Hero';
import Navbar from './components/Navbar';
import StoresSection from './components/StoresSection';

function App() {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <Hero />
      <StoresSection />
    </div>
  );
}

export default App;
