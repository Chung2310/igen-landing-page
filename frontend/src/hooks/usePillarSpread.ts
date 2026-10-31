import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function usePillarSpread(gridRef: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const media = gsap.matchMedia();
    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const heading = grid.closest('.home-pillars')?.querySelector<HTMLElement>('.home-pillars__heading');
      if (!heading) return;
      const words = heading.querySelectorAll('.home-pillars__word-inner');
      const subtitle = heading.querySelector('p');
      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: 'top 90%',
          end: 'top 38%',
          scrub: .55,
          invalidateOnRefresh: true,
        },
      });
      reveal.fromTo(words, {
        yPercent: 120,
        rotationX: -65,
        rotation: 5,
      }, {
        yPercent: 0,
        rotationX: 0,
        rotation: 0,
        duration: 1,
        stagger: .075,
        ease: 'power3.out',
      });
      if (subtitle) {
        gsap.fromTo(subtitle.querySelectorAll('.home-pillars__subtitle-word'), {
          yPercent: 115,
          rotation: 7,
        }, {
          yPercent: 0,
          rotation: 0,
          duration: 1,
          stagger: .09,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: subtitle,
            start: 'top 88%',
            end: 'top 48%',
            scrub: .45,
            invalidateOnRefresh: true,
          },
        });
      }
    });
    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const cards = Array.from(grid.querySelectorAll<HTMLElement>('.home-pillars__card'));
      const rotations = [-9, -3, 3, 9];
      gsap.set(cards, { zIndex: (index) => cards.length - index });

      const spread = gsap.fromTo(cards, {
        x: (index, card: HTMLElement) => grid.clientWidth / 2 - card.offsetLeft - card.offsetWidth / 2 + (index - 1.5) * 8,
        y: (index, card: HTMLElement) => grid.clientHeight / 2 - card.offsetTop - card.offsetHeight / 2 + 24 + Math.abs(index - 1.5) * 6,
        rotation: (index) => rotations[index],
        scale: .9,
      }, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        ease: 'power2.inOut',
        stagger: .035,
        scrollTrigger: {
          trigger: grid,
          start: 'top 88%',
          end: 'top 32%',
          scrub: .65,
          invalidateOnRefresh: true,
        },
      });

      // Reveal all links immediately when navigating the cards with a keyboard.
      const revealForFocus = () => {
        spread.scrollTrigger?.disable(false);
        spread.progress(1);
      };
      grid.addEventListener('focusin', revealForFocus);
      return () => grid.removeEventListener('focusin', revealForFocus);
    }, grid);

    return () => media.revert();
  }, [gridRef]);
}
