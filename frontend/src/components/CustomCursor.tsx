import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const trailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const circle = circleRef.current;
    const trails = trailsRef.current;

    if (!dot || !circle || !trails) return;

    gsap.set([dot, circle], { opacity: 0 });
    let cursorVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      if (!cursorVisible) {
        gsap.to([dot, circle], { opacity: 1, duration: 0.3 });
        cursorVisible = true;
      }

      // Position the dot and circle
      gsap.to(dot, { x, y, duration: 0.1 });
      gsap.to(circle, { x, y, duration: 0.4, ease: 'power2.out' });

      // Dynamic trail generation
      if (Math.random() > 0.8) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = '0px';
        trail.style.top = '0px';
        trails.appendChild(trail);

        gsap.set(trail, { x, y, scale: 0.5, opacity: 0.6 });
        gsap.to(trail, {
          scale: 2,
          opacity: 0,
          duration: 1,
          ease: 'power1.out',
          onComplete: () => trail.remove(),
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to([dot, circle], { opacity: 0, duration: 0.3 });
      cursorVisible = false;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Dynamic Hover interaction handler for elements with '.interactable' class
    const addInteractListeners = () => {
      const interactables = document.querySelectorAll('.interactable, a, button');
      
      interactables.forEach((el) => {
        const handleMouseEnter = () => {
          document.body.classList.add('hovered');
          gsap.to(circle, { scale: 1.8, borderColor: 'rgba(255, 255, 255, 0.8)', duration: 0.3 });
          gsap.to(dot, { scale: 0.5, backgroundColor: '#ffffff', duration: 0.3 });
        };

        const handleMouseLeave = () => {
          document.body.classList.remove('hovered');
          gsap.to(circle, { scale: 1, borderColor: 'rgba(0, 151, 178, 0.5)', duration: 0.3 });
          gsap.to(dot, { scale: 1, backgroundColor: '#0097b2', duration: 0.3 });
        };

        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Run interact listener attachment
    addInteractListeners();

    // Create an observer to attach listeners to dynamically added DOM elements (useful in SPAs)
    const observer = new MutationObserver(addInteractListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={circleRef} className="cursor-circle hidden md:block" />
      <div ref={trailsRef} id="cursor-trails" className="pointer-events-none" />
    </>
  );
};
