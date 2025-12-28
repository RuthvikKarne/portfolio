
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const ripple = rippleRef.current;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out"
      });
    };

    const onMouseDown = (e: MouseEvent) => {
      // Ripple effect
      if (ripple) {
        gsap.set(ripple, { 
          x: e.clientX, 
          y: e.clientY, 
          scale: 0, 
          opacity: 1 
        });
        gsap.to(ripple, {
          scale: 4,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out"
        });
      }

      gsap.to(cursor, { scale: 0.5, duration: 0.2 });
      gsap.to(follower, { 
        scale: 1.5, 
        borderWidth: "1px",
        borderColor: "rgba(59, 130, 246, 0.8)",
        duration: 0.2 
      });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { scale: 1, borderWidth: "1px", duration: 0.2 });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .skill-tag, .project-card')) {
        gsap.to(cursor, {
          scale: 0.4,
          backgroundColor: "#fff",
          duration: 0.3
        });
        gsap.to(follower, {
          scale: 2.2,
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderColor: "rgba(59, 130, 246, 0.5)",
          duration: 0.3
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .skill-tag, .project-card')) {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "#3b82f6",
          duration: 0.3
        });
        gsap.to(follower, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(59, 130, 246, 0.4)",
          duration: 0.3
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      {/* Small Core Dot */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#3b82f6] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block shadow-[0_0_15px_rgba(59,130,246,0.6)] will-change-transform"
      />
      
      {/* Large Fluid Follower */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-12 h-12 border border-[#3b82f6]/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block will-change-transform backdrop-blur-[1px]"
      />

      {/* Ripple Element */}
      <div 
        ref={rippleRef}
        className="fixed top-0 left-0 w-16 h-16 border-2 border-[#3b82f6] rounded-full pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 opacity-0 hidden md:block"
      />
    </>
  );
};

export default CustomCursor;
