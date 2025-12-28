
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveBackground from './InteractiveBackground';
import { SKILLS } from '../constants';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.2 
      });
      
      gsap.set([titleRef.current, subtitleRef.current, tickerRef.current], { 
        filter: 'blur(15px)',
        opacity: 0,
        y: 60
      });

      tl.to(titleRef.current, {
        filter: 'blur(0px)',
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "expo.out"
      })
      .to(subtitleRef.current, {
        filter: 'blur(0px)',
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out"
      }, "-=1.0")
      .to(tickerRef.current, {
        filter: 'blur(0px)',
        opacity: 1,
        y: 0,
        duration: 0.8
      }, "-=0.8");

      gsap.to(".ticker-content", {
        xPercent: -50,
        repeat: -1,
        duration: 35,
        ease: "none"
      });

      gsap.to(contentRef.current, {
        y: -150,
        scale: 0.9,
        opacity: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const triggerEasterEgg = () => {
    if (!containerRef.current || !titleRef.current) return;

    const tl = gsap.timeline();
    
    tl.to(titleRef.current, {
      skewX: 20,
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      ease: "none",
      textShadow: "2px 0 #3b82f6, -2px 0 #0ea5e9"
    })
    .to(titleRef.current, {
      skewX: 0,
      duration: 0.1,
      textShadow: "none"
    });

    gsap.to(containerRef.current, {
      filter: "hue-rotate(30deg) brightness(1.2)",
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.innerText = Math.random() > 0.5 ? '1' : '0';
      particle.className = 'fixed pointer-events-none text-[#3b82f6] font-mono text-xs z-[50]';
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      document.body.appendChild(particle);

      gsap.fromTo(particle, 
        { opacity: 0, scale: 0 },
        { 
          opacity: 0.8, 
          scale: 2, 
          y: -100 - Math.random() * 300, 
          x: (Math.random() - 0.5) * 200,
          duration: 1 + Math.random() * 2, 
          ease: "power1.out",
          onComplete: () => particle.remove()
        }
      );
    }
  };

  const handleTitleClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount + 1 >= 3) {
      triggerEasterEgg();
      setClickCount(0);
    }
    setTimeout(() => setClickCount(0), 1000);
  };

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050a14] px-4 md:px-6">
      <InteractiveBackground />
      
      <div ref={contentRef} className="relative z-10 text-center w-full max-w-5xl will-change-transform">
        <p className="text-[#3b82f6] font-bold tracking-[0.4em] mb-4 md:mb-8 uppercase text-[10px] md:text-xs select-none">
          Aspiring Data Scientist & Java Developer
        </p>
        <h1 
          ref={titleRef} 
          onClick={handleTitleClick}
          className="text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-display font-bold leading-[0.9] md:leading-[0.85] mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-b from-[#E5E7EB] via-[#E5E7EB] to-[#3b82f6]/40 tracking-tighter cursor-pointer select-none transition-transform"
        >
          KARNE<br />RUTHVIK
        </h1>
        <p 
          ref={subtitleRef} 
          className="text-base md:text-2xl text-[#9CA3AF] font-light max-w-2xl mx-auto leading-relaxed mb-10 md:mb-16 px-4 md:px-0 select-none"
        >
          Architecting robust backends. Visualizing complex data.<br className="hidden md:block" />
          Bridging the gap between code and intelligence.
        </p>

        <div ref={tickerRef} className="relative w-full max-w-xl mx-auto overflow-hidden py-4 md:py-6 pointer-events-none border-y border-blue-500/10 opacity-60">
          <div className="ticker-content flex gap-12 md:gap-16 whitespace-nowrap w-fit">
            {[...SKILLS, ...SKILLS].map((skill, i) => (
              <span key={i} className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] text-[#E5E7EB] font-black">
                {skill.name} <span className="text-[#3b82f6] ml-12 md:ml-16 opacity-50">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 md:bottom-12 flex flex-col items-center z-10">
        <div className="w-px h-12 md:h-16 bg-gradient-to-b from-[#3b82f6] to-transparent mb-4 opacity-50" />
        <p className="text-[#9CA3AF] text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-bold select-none">Scroll</p>
      </div>
    </section>
  );
};

export default Hero;
