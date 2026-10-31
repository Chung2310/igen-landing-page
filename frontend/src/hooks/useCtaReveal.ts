import { useEffect, type RefObject } from 'react';
import './useCtaReveal.css';

export function useCtaReveal(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    const observer = new IntersectionObserver(([entry]) => {
      card.classList.toggle('is-revealed', entry.isIntersecting);
    }, { threshold: 0, rootMargin: '-90px 0px -45px 0px' });
    observer.observe(card);
    return () => observer.disconnect();
  }, [ref]);
}
