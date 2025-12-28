
import React, { useEffect, useRef, useMemo, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS, CATEGORY_ICONS } from '../constants';
import { Skill } from '../types';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [activeTooltip, setActiveTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const groupedSkills = useMemo(() => {
    return SKILLS.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, Skill[]>);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.skill-category-card');
      if (!cards || cards.length === 0) return;

      // Initial entry animation for cards
      gsap.set(cards, { opacity: 0, y: 150, rotateX: -15, scale: 0.95 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        stagger: 0.1,
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        onComplete: () => {
          // Animate inner tags after card reveal
          cards.forEach((card) => {
            const tags = card.querySelectorAll('.skill-tag');
            gsap.fromTo(tags, 
              { opacity: 0, scale: 0.8, y: 10 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.8,
                ease: "back.out(1.7)",
                overwrite: 'auto'
              }
            );
          });
        }
      });

      // Individual Tag Animation (Independent Trigger per card for better scroll-in feeling)
      cards.forEach((card) => {
        const tags = card.querySelectorAll('.skill-tag');
        gsap.set(tags, { opacity: 0, scale: 0.8, y: 10 });
        
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          onEnter: () => {
            gsap.to(tags, {
              opacity: 1,
              scale: 1,
              y: 0,
              stagger: 0.05,
              duration: 1,
              ease: "back.out(2)",
            });
          }
        });
      });

      // Dynamic vertical parallax for cards - different speeds for different columns/indices
      cards.forEach((card, i) => {
        const speed = 80 + (i % 3) * 60; // Varies speed between 80, 140, 200
        gsap.to(card, {
          y: -speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        const cardEl = card as HTMLElement;
        cardEl.addEventListener('mousemove', (e) => {
          const rect = cardEl.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const xc = rect.width / 2;
          const yc = rect.height / 2;
          const dx = (x - xc) / xc;
          const dy = (y - yc) / yc;
          
          gsap.to(cardEl, {
            rotateY: dx * 10,
            rotateX: -dy * 10,
            scale: 1.05,
            duration: 0.4,
            ease: "power3.out",
            backgroundColor: "#0f172a",
            borderColor: "rgba(59, 130, 246, 0.4)",
            boxShadow: `0 25px 50px -12px rgba(59, 130, 246, 0.25)`
          });
        });

        cardEl.addEventListener('mouseleave', () => {
          gsap.to(cardEl, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
            backgroundColor: "#0b1221",
            borderColor: "rgba(255, 255, 255, 0.03)",
            boxShadow: "none"
          });
        });
      });

      // Background Orb - Deep Parallax
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          y: 350,
          x: -100,
          scale: 1.4,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent, description?: string) => {
    if (!description) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setActiveTooltip({
      text: description,
      x: rect.left + rect.width / 2,
      y: rect.top - 15
    });
  };

  const getCategoryTitle = (category: string) => {
    if (category === 'Tool') return 'BI & Visuals';
    if (category === 'Library') return 'Libraries';
    return category + 's';
  };

  return (
    <section ref={containerRef} className="py-64 px-6 md:px-24 bg-[#050a14] relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div 
        ref={orbRef}
        className="absolute top-0 right-[-10%] w-[700px] h-[700px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none will-change-transform" 
      />

      {activeTooltip && (
        <div 
          ref={tooltipRef}
          className="fixed z-[999] px-6 py-4 bg-blue-950/90 backdrop-blur-2xl border border-blue-500/20 rounded-2xl shadow-2xl pointer-events-none max-w-[280px] -translate-x-1/2 -translate-y-full text-center"
          style={{ left: activeTooltip.x, top: activeTooltip.y }}
        >
          <p className="text-[11px] leading-relaxed text-[#E5E7EB] font-semibold tracking-wide uppercase">
            {activeTooltip.text}
          </p>
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-40 gap-12">
          <div className="space-y-6">
            <h2 className="text-[11px] font-black tracking-[0.6em] text-[#3b82f6] uppercase opacity-90 border-l-2 border-[#3b82f6] pl-8">Stack</h2>
            <h3 className="text-6xl md:text-[8rem] font-display font-bold tracking-tighter leading-none text-[#E5E7EB]">Engineering<br />Toolbox.</h3>
          </div>
          <p className="text-[#9CA3AF] max-w-lg text-2xl font-light leading-relaxed">
            Meticulously selected technologies for high-performance computing and predictive intelligence.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 perspective-1000">
          {(Object.entries(groupedSkills) as [string, Skill[]][]).map(([category, items]) => (
            <div 
              key={category}
              className={`skill-category-card group p-10 md:p-14 bg-[#0b1221] border border-white/5 rounded-[3.5rem] flex flex-col transition-all duration-500 will-change-transform ${
                category === 'Library' ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="flex items-center gap-8 mb-16">
                <div className="p-6 bg-blue-600/10 rounded-2xl text-[#3b82f6] group-hover:bg-[#3b82f6] group-hover:text-white transition-all duration-700 shadow-2xl shadow-blue-900/10">
                  {CATEGORY_ICONS[category]}
                </div>
                <h4 className="text-[11px] font-black text-[#9CA3AF] tracking-[0.4em] uppercase">{getCategoryTitle(category)}</h4>
              </div>

              <div className="flex flex-wrap gap-5 mt-auto">
                {items.map((skill) => (
                  <div 
                    key={skill.name}
                    onMouseEnter={(e) => handleMouseEnter(e, skill.description)}
                    onMouseLeave={() => setActiveTooltip(null)}
                    className="skill-tag px-7 py-5 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black tracking-[0.2em] text-[#9CA3AF] transition-all duration-500 hover:bg-[#3b82f6]/10 hover:text-white hover:border-[#3b82f6]/50 cursor-help uppercase"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
