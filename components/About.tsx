
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll('.reveal-word');
      if (!words) return;

      gsap.fromTo(words, 
        { opacity: 0, y: 50, filter: 'blur(15px)', rotateX: 45 },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          rotateX: 0,
          stagger: 0.03,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 65%",
            scrub: 1.5,
          }
        }
      );

      gsap.to(textRef.current, {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(bgTextRef.current, {
        y: 200,
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const summary = "I am an aspiring Data Scientist and Java Fullstack Developer dedicated to merging the power of predictive analytics with robust software engineering. My expertise ranges from deep neural networks and complex statistical analysis to architecting enterprise-grade backend systems using Spring Boot and React.";

  return (
    <section ref={sectionRef} className="py-32 md:py-64 px-6 md:px-24 bg-[#050a14] relative overflow-hidden perspective-1000">
      <h2 className="sr-only">About Karne Ruthvik - Professional Mission</h2>
      
      <div 
        ref={bgTextRef} 
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none select-none opacity-[0.02] md:opacity-[0.03]"
        aria-hidden="true"
      >
        <span className="text-[40vw] md:text-[25vw] font-black tracking-tighter text-blue-500 whitespace-nowrap will-change-transform">
          INNOVATE • ANALYZE • BUILD
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-[10px] md:text-[11px] font-black tracking-[0.6em] text-[#3b82f6] uppercase mb-12 md:mb-20 opacity-80 border-l-2 border-[#3b82f6] pl-6 md:pl-8">Mission</p>
        <div ref={textRef} className="text-2xl sm:text-3xl md:text-7xl font-display font-medium leading-tight md:leading-[1.05] text-[#E5E7EB] flex flex-wrap gap-x-[0.3em] gap-y-3 md:gap-y-6 tracking-tight will-change-transform">
          {summary.split(' ').map((word, i) => (
            <span key={i} className="reveal-word inline-block">{word}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
