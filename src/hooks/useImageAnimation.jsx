import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useImageAnimation() {
  const imageRefs = useRef([]);

  useEffect(() => {
    if (imageRefs.current.length) {
      gsap.fromTo(
        imageRefs.current,
        {
          opacity: 0,
          rotate: 90,
          scale: 0.8,
        },
        {
          opacity: 1,
          rotate: 0,
          scale: 1,
          duration: 1,
          stagger: 0.5,
          ease: 'power2.out',
        }
      );
    }
  }, []);

  return { imageRefs };
}
