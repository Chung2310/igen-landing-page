import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AIRobotCoreProps {
  soundEnabled: boolean;
}

export const AIRobotCore: React.FC<AIRobotCoreProps> = ({ soundEnabled }) => {
  const robotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const robot = robotRef.current;
    if (!robot) return;

    // Power up intro animation
    gsap.set(robot, {
      x: window.innerWidth - 120,
      y: window.innerHeight - 120,
      opacity: 0,
      scale: 0.2,
    });

    gsap.to(robot, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: 'elastic.out(1, 0.5)',
    });

    // Smooth mouse follow (lagging float effect)
    let targetX = window.innerWidth - 120;
    let targetY = window.innerHeight - 120;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      // Offset slightly from cursor so it doesn't overlap the exact click point
      targetX = e.clientX + 30;
      targetY = e.clientY + 30;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Keep it on screen bounds
    const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

    let animId: number;
    const updatePosition = () => {
      // Spring interpolation
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 80;

      gsap.set(robot, {
        x: clamp(currentX, 20, maxX),
        y: clamp(currentY, 20, maxY),
      });

      animId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      id="ai-robot-core"
      ref={robotRef}
      className="fixed top-0 left-0 w-[60px] h-[60px] z-[9990] pointer-events-none transition-filter duration-200"
    >
      <div className="core-inner-light"></div>
      <div className="core-sphere">
        <div className="core-fibers"></div>
      </div>
      <div className="core-plate"></div>
      <div className="core-plate"></div>
      
      {/* Equalizer Visualizer UI */}
      <div 
        className="audio-visualizer-ui"
        style={{
          opacity: soundEnabled ? 1 : 0,
          pointerEvents: 'none'
        }}
      >
        <div className="equalizer-bar"></div>
        <div className="equalizer-bar"></div>
        <div className="equalizer-bar"></div>
        <div className="equalizer-bar"></div>
      </div>
    </div>
  );
};
