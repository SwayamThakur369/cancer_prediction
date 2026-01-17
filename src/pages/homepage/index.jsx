import { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import ResearchHighlights from './components/ResearchHighlights';
import TrustIndicators from './components/TrustIndicators';
import MedicalDisclaimer from './components/MedicalDisclaimer';
import CTASection from './components/CTASection';

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-16">
        <HeroSection />
        <FeaturesSection />
        <ResearchHighlights />
        <TrustIndicators />
        <MedicalDisclaimer />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Homepage;