'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export function useTypewriterEffect(ref) {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    // 초기 텍스트를 빈 문자열로 설정
    element.innerText = '';

    // GSAP 애니메이션 설정
    gsap.fromTo(
      element,
      { width: '0%' },
      {
        width: '100%',
        duration: 1,
        ease: 'steps(40)',
        onUpdate: function () {
          const text = 'LOOKMANS HAIR'; // 실제 텍스트를 이곳에 설정
          element.innerText = text.slice(0, Math.floor(this.progress() * text.length));
        },
      }
    );
  }, [ref]);
}
