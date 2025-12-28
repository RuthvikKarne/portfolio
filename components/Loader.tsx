
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  
  const [progress, setProgress] = useState(0);
  const [scrambledName, setScrambledName] = useState("");

  const name = "KARNE RUTHVIK";
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  const logs = [
    "[INFO] Initializing Kernel...",
    "[OK] Data Models Loaded.",
    "[WARN] Neural Network Syncing...",
    "[INFO] Optimizing React Virtual DOM.",
    "[OK] Backend Spring Boot Handshake Successful.",
    "[INFO] Rendering Canvas Layers.",
    "[STATUS] Systems Nominal."
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => onComplete()
      });

      // 1. Progress Logic
      const progressObj = { value: 0 };
      tl.to(progressObj, {
        value: 100,
        duration: 3,
        ease: "none",
        onUpdate: () => {
          const val = Math.floor(progressObj.value);
          setProgress(val);
          if (counterRef.current) counterRef.current.innerText = val.toString().padStart(3, '0');
          
          // Scramble Text Effect
          const nameProgress = val / 100;
          let newName = "";
          for (let i = 0; i < name.length; i++) {
            if (name[i] === " ") {
              newName += " ";
              continue;
            }
            if (i / name.length < nameProgress - 0.1) {
              newName += name[i];
            } else {
              newName += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          setScrambledName(newName);
        }
      });

      // 2. Terminal Logs Stagger
      gsap.fromTo(".log-item", 
        { opacity: 0, x: -10 },
        { 
          opacity: 1, 
          x: 0, 
          stagger: 0.3, 
          duration: 0.5,
          ease: "power1.out"
        }
      );

      // 3. Reveal Shatter
      // We generate a grid of blocks and animate them out
      tl.add(() => {
        const blocks = gridRef.current?.querySelectorAll('.grid-block');
        if (blocks) {
          gsap.to(blocks, {
            scale: 0,
            opacity: 0,
            rotate: () => (Math.random() - 0.5) * 90,
            stagger: {
              grid: [10, 10],
              from: "random",
              amount: 1.2
            },
            ease: "expo.inOut",
            duration: 1.5
          });
        }
        
        gsap.to([nameRef.current, counterRef.current?.parentElement, logRef.current], {
          opacity: 0,
          y: -50,
          filter: "blur(20px)",
          duration: 0.8,
          ease: "power4.in"
        });
      }, "+=0.2");

      tl.to(containerRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.5
      }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden font-mono">
      {/* Background Grid Blocks */}
      <div ref={gridRef} className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="grid-block bg-[#0B0F19] border-[0.5px] border-white/5" />
        ))}
      </div>

      {/* Main UI */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#6366F1]/20 shadow-[0_0_15px_#6366F1] animate-scan" />

        <div className="text-center space-y-8">
          <h2 ref={nameRef} className="text-white text-3xl md:text-5xl font-bold tracking-widest uppercase h-12 flex items-center justify-center">
            {scrambledName}
          </h2>

          <div className="flex flex-col items-center gap-4">
            <div className="text-7xl md:text-[9rem] font-black text-white/90 tabular-nums leading-none flex items-baseline">
              <span ref={counterRef}>000</span>
              <span className="text-2xl text-[#6366F1] ml-2">%</span>
            </div>
            
            <div className="w-64 h-1 bg-white/5 relative">
              <div 
                className="absolute inset-y-0 left-0 bg-[#6366F1] transition-all duration-100 shadow-[0_0_10px_#6366F1]" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Side Logs */}
      <div ref={logRef} className="absolute bottom-12 left-12 z-30 hidden md:block space-y-2">
        {logs.map((log, i) => (
          <p key={i} className="log-item text-[10px] text-[#6366F1]/60 tracking-tighter uppercase font-bold">
            {log}
          </p>
        ))}
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0vh); }
          100% { transform: translateY(100vh); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;
