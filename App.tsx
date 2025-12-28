
import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import PerformanceMonitor from './components/PerformanceMonitor';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleRefresh);
    return () => window.removeEventListener('resize', handleRefresh);
  }, []);

  return (
    <main id="main-content" className="relative bg-[#0B0F19]">
      <CustomCursor />
      
      {isLoading && (
        <Loader onComplete={() => setIsLoading(false)} />
      )}

      {/* Main Content wrapper */}
      {!isLoading && (
        <div className="opacity-0 animate-in">
          <PerformanceMonitor />
          <Hero />
          <article>
            <About />
            <Skills />
            <Projects />
          </article>
          <Footer />
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </main>
  );
};

export default App;
