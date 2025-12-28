
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Activity, Gauge, Cpu, Zap, X } from 'lucide-react';

const PerformanceMonitor: React.FC = () => {
  const [fps, setFps] = useState(0);
  const [activeTweens, setActiveTweens] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const monitorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMetrics = () => {
      frameCount.current++;
      const now = performance.now();
      const elapsed = now - lastTime.current;

      if (elapsed >= 1000) {
        setFps(Math.round((frameCount.current * 1000) / elapsed));
        frameCount.current = 0;
        lastTime.current = now;
      }

      setActiveTweens(gsap.exportRoot().getChildren(true, true, false).length);
      setScrollVelocity(Math.round(Math.abs(gsap.getProperty(window, "scrollY") as number)));

      requestAnimationFrame(updateMetrics);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'p') {
        setIsVisible(prev => !prev);
        setIsDismissed(false);
      }
    };

    const animFrame = requestAnimationFrame(updateMetrics);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (isDismissed) return null;

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[10001] flex items-center gap-2">
        <button 
          onClick={() => setIsVisible(true)}
          className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-blue-600/20 transition-all duration-300 text-[#9CA3AF] hover:text-[#3b82f6] shadow-xl"
          title="Show Performance Telemetry (Alt+P)"
        >
          <Activity size={16} />
        </button>
        <button 
          onClick={() => setIsDismissed(true)}
          className="p-1.5 bg-black/20 hover:bg-red-500/20 rounded-full text-[#9CA3AF] hover:text-red-400 transition-colors"
          title="Dismiss"
        >
          <X size={12} />
        </button>
      </div>
    );
  }

  return (
    <div 
      ref={monitorRef}
      className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[10001] w-[calc(100vw-2rem)] max-w-[280px] bg-[#0b1221]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-5 md:p-6 shadow-2xl pointer-events-auto"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <Activity size={14} className="text-[#3b82f6]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E5E7EB]">Telemetry</span>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/5 rounded-full text-[#9CA3AF] hover:text-white transition-all"
        >
          <X size={16} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gauge size={12} className="text-[#9CA3AF]" />
            <span className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-widest">Frame Rate</span>
          </div>
          <span className={`text-xs font-mono font-bold ${fps >= 55 ? 'text-green-400' : fps >= 30 ? 'text-yellow-400' : 'text-red-400'}`}>
            {fps} FPS
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap size={12} className="text-[#9CA3AF]" />
            <span className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-widest">GSAP Nodes</span>
          </div>
          <span className="text-xs font-mono font-bold text-blue-400">
            {activeTweens}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu size={12} className="text-[#9CA3AF]" />
            <span className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-widest">Y Offset</span>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-400">
            {scrollVelocity} PX
          </span>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-white/5">
        <div className="flex items-center justify-between opacity-50">
          <span className="text-[8px] font-black uppercase tracking-widest text-[#9CA3AF]">Engine: GSAP Core</span>
          <div className="flex gap-1">
            <div className={`w-1 h-1 rounded-full ${fps > 30 ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
            <div className="w-1 h-1 rounded-full bg-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
