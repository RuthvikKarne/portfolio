
import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowUpDown, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import InteractiveBackground from './InteractiveBackground';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTag, setActiveTag] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'default' | 'az'>('default');

  const allTags = useMemo(() => {
    const tags = new Set<string>(['All']);
    PROJECTS.forEach(project => project.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

  const filteredProjects = useMemo(() => {
    let result = activeTag === 'All' 
      ? [...PROJECTS] 
      : PROJECTS.filter(p => p.tags.includes(activeTag));
    
    if (sortBy === 'az') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    return result;
  }, [activeTag, sortBy]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card') as HTMLElement[];
      const scrollElement = scrollRef.current;
      
      if (!scrollElement || cards.length === 0) return;

      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === containerRef.current) st.kill();
      });

      const getScrollAmount = () => {
        return -(scrollElement.scrollWidth - window.innerWidth);
      };

      gsap.to(scrollElement, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          start: "top top",
          end: () => `+=${scrollElement.scrollWidth}`,
        }
      });

      cards.forEach((card, i) => {
        const bg = card.querySelector('.project-card-bg');
        const title = card.querySelector('.project-title');
        const desc = card.querySelector('.project-desc');
        const tags = card.querySelector('.project-tags');
        const link = card.querySelector('.project-link');

        const scrollConfig = {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollElement.scrollWidth}`,
          scrub: true
        };

        if (bg) {
          gsap.to(bg, { x: 350, rotate: 8, ease: "none", scrollTrigger: scrollConfig });
        }
        if (title) {
          gsap.to(title, { x: window.innerWidth > 768 ? 120 : 40, ease: "none", scrollTrigger: scrollConfig });
        }
        if (desc) {
          gsap.to(desc, { x: window.innerWidth > 768 ? 60 : 20, ease: "none", scrollTrigger: scrollConfig });
        }
        if (tags) {
          gsap.to(tags, { x: window.innerWidth > 768 ? 30 : 10, ease: "none", scrollTrigger: scrollConfig });
        }
        if (link) {
          gsap.to(link, { x: 15, ease: "none", scrollTrigger: scrollConfig });
        }

        gsap.to(card, {
          y: i % 2 === 0 ? (window.innerWidth > 768 ? -60 : -20) : (window.innerWidth > 768 ? 60 : 20),
          rotateZ: i % 2 === 0 ? 1 : -1,
          ease: "sine.inOut",
          scrollTrigger: scrollConfig
        });
      });

      gsap.fromTo(cards, 
        { opacity: 0, scale: 0.9, y: 100 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 1.5, 
          stagger: 0.2, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section ref={containerRef} className="relative overflow-hidden min-h-screen bg-[#050a14] flex flex-col justify-center">
      <InteractiveBackground colors={['rgba(59, 130, 246, 0.2)', 'rgba(37, 99, 235, 0.15)', 'rgba(29, 78, 216, 0.1)']} count={4} />

      <div className="absolute top-8 md:top-16 left-6 md:left-24 z-20 w-[calc(100%-3rem)] md:w-full max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-[9px] md:text-[10px] font-black tracking-[0.7em] text-[#3b82f6] uppercase opacity-90 border-l-2 border-[#3b82f6] pl-6 md:pl-8">Portfolio</h2>
            <h3 className="text-3xl sm:text-4xl md:text-8xl font-display font-bold tracking-tight text-[#E5E7EB]">Case Studies.</h3>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 bg-[#0b1221]/80 backdrop-blur-3xl p-2 md:p-3 rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar max-w-[200px] sm:max-w-none">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black tracking-widest transition-all duration-500 whitespace-nowrap uppercase ${
                    activeTag === tag 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                      : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            
            <div className="hidden md:block w-px h-8 bg-white/10 mx-2" />

            <button
              onClick={() => setSortBy(prev => prev === 'default' ? 'az' : 'default')}
              className="px-3 md:px-5 py-2 md:py-3 text-[8px] md:text-[10px] font-black tracking-widest text-[#9CA3AF] hover:text-white transition-all duration-300 flex items-center gap-2 uppercase rounded-xl md:rounded-2xl hover:bg-white/5"
            >
              <ArrowUpDown className={`w-3 md:w-4 h-3 md:h-4 ${sortBy === 'az' ? 'text-[#3b82f6]' : ''}`} />
              {sortBy === 'az' ? 'Sorted' : 'Sort'}
            </button>
          </div>
        </div>
      </div>
      
      <div 
        ref={scrollRef} 
        className="flex items-center pl-6 md:pl-24 pt-32 md:pt-40 pb-12 md:pb-20 gap-8 md:gap-32 relative z-10 w-fit h-full"
      >
        {filteredProjects.length > 0 ? (
          <>
            {filteredProjects.map((project, idx) => (
              <div 
                key={`${project.title}-${activeTag}-${sortBy}`} 
                className="project-card flex-shrink-0 w-[85vw] md:w-[75vw] lg:w-[65vw] h-[60vh] md:h-[65vh] bg-[#0b1221] border border-white/5 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-24 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-700 shadow-2xl will-change-transform"
              >
                <div className="project-card-bg absolute -inset-40 bg-gradient-to-br from-blue-600/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl pointer-events-none will-change-transform" />
                
                <div className="flex flex-col h-full justify-between relative z-10">
                  <div className="space-y-6 md:space-y-12">
                    <div className="project-tags flex flex-wrap gap-2 md:gap-4 will-change-transform">
                      {project.tags.map((tag, t) => (
                        <span key={t} className="px-4 md:px-6 py-1.5 md:py-2.5 bg-blue-600/10 border border-blue-500/20 rounded-full text-[8px] md:text-[10px] uppercase font-black tracking-[0.2em] text-[#3b82f6]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h4 className="project-title text-3xl sm:text-5xl md:text-8xl font-display font-bold tracking-tighter leading-tight text-[#E5E7EB] will-change-transform">
                      {project.title}
                    </h4>
                    
                    <p className="project-desc text-[#9CA3AF] text-base md:text-3xl font-light leading-relaxed max-w-4xl border-l-2 border-blue-500/20 pl-6 md:pl-10 will-change-transform line-clamp-3 md:line-clamp-none">
                      {project.description}
                    </p>
                  </div>

                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link group/link inline-flex items-center gap-4 md:gap-10 text-[#E5E7EB] font-black text-[9px] md:text-[11px] tracking-[0.4em] md:tracking-[0.5em] uppercase mt-auto py-4 md:py-8 px-6 md:px-12 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5 hover:bg-blue-600 hover:border-blue-600 transition-all duration-500 w-fit shadow-2xl will-change-transform"
                  >
                    Repo
                    <div className="p-2 md:p-4 bg-white/5 rounded-xl md:rounded-2xl group-hover/link:bg-white/20 transition-all duration-300">
                      <ExternalLink className="w-4 md:w-6 h-4 md:h-6" />
                    </div>
                  </a>
                </div>
              </div>
            ))}
            
            <div className="project-card flex-shrink-0 w-[85vw] md:w-[60vw] h-[60vh] md:h-[65vh] flex flex-col items-center justify-center text-center p-8 md:p-32 relative overflow-hidden group rounded-[2.5rem] md:rounded-[4rem] border border-dashed border-blue-500/20">
               <div className="space-y-8 md:space-y-12 relative z-10">
                  <h4 className="text-3xl md:text-7xl font-display font-bold tracking-tighter text-[#E5E7EB]">
                    Next Chapter?
                  </h4>
                  <p className="text-[#9CA3AF] text-base md:text-xl max-w-md mx-auto font-light leading-relaxed mb-6 md:mb-12">
                    Let's discuss how my fullstack and data expertise can contribute to your vision.
                  </p>
                  <div className="flex flex-col items-center gap-4 md:gap-6">
                    <p className="text-[#3b82f6] text-[9px] md:text-[11px] font-black uppercase tracking-[0.6em] animate-pulse">Scroll to Connect</p>
                    <ArrowRight className="text-[#3b82f6] w-6 md:w-8 h-6 md:h-8 animate-bounce" />
                  </div>
               </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center w-[100vw] min-h-[50vh] pr-6 md:pr-24">
            <p className="text-[#9CA3AF] text-xl md:text-3xl font-light mb-8 md:mb-16">No matching repositories.</p>
            <button 
              onClick={() => { setActiveTag('All'); setSortBy('default'); }} 
              className="px-8 md:px-16 py-4 md:py-8 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl text-[#3b82f6] uppercase tracking-[0.4em] md:tracking-[0.5em] text-[9px] md:text-[11px] font-black hover:bg-blue-600 hover:text-white transition-all duration-700 shadow-2xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
