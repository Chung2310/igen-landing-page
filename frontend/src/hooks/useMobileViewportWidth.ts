import { useEffect, useState } from 'react';

const readMobileViewportWidth = () => {
  if (typeof window === 'undefined' || !window.matchMedia('(max-width: 1023px)').matches) return null;
  return Math.round(window.visualViewport?.width ?? window.innerWidth);
};

export function useMobileViewportWidth() {
  const [width, setWidth] = useState<number | null>(readMobileViewportWidth);

  useEffect(() => {
    const update = () => setWidth(readMobileViewportWidth());
    update();
    window.addEventListener('resize', update);
    window.visualViewport?.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('resize', update);
    };
  }, []);

  return width;
}
