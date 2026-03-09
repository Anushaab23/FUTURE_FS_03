import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import Classes from './components/Classes';
import Trainers from './components/Trainers';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';
import { useState, useEffect } from 'react';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(window.location.pathname === '/admin');

  // Simple listener for manual URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdmin(window.location.pathname === '/admin');
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (isAdmin) {
    return <Admin />;
  }

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <WhyUs />
      <Classes />
      <Trainers />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
