import React, { useEffect, useRef } from 'react';

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle sizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray: Particle[] = [];
    const numberOfParticles = 80;
    let mouseX = 0;
    let mouseY = 0;
    let lastScrollY = window.scrollY;
    let currentScrollSpeed = 0;

    // Mouse move tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      baseX: number;
      baseY: number;
      density: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1;
      }

      update(scrollSpeed: number) {
        const speedMultiplier = 1 + scrollSpeed * 0.5;
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = 200;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;

        if (distance < maxDistance) {
          this.x += directionX;
          this.y += directionY;
        } else {
          if (this.x !== this.baseX) {
            const dxBack = this.x - this.baseX;
            this.x -= dxBack / 20;
          }
          if (this.y !== this.baseY) {
            const dyBack = this.y - this.baseY;
            this.y -= dyBack / 20;
          }
        }

        this.x += this.speedX * speedMultiplier;
        this.y += this.speedY * speedMultiplier;

        // Wrap around boundaries
        if (canvas) {
          if (this.x < 0) this.x = canvas.width;
          if (this.x > canvas.width) this.x = 0;
          if (this.y < 0) this.y = canvas.height;
          if (this.y > canvas.height) this.y = 0;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(0, 151, 178, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particlesArray.length = 0;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const newScrollY = window.scrollY;
      const delta = Math.abs(newScrollY - lastScrollY);
      currentScrollSpeed = delta;
      lastScrollY = newScrollY;

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update(currentScrollSpeed);
      }
      animationId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      id="particle-canvas"
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};
