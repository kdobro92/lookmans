import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useImageBounce() {
  const imageRefs = useRef([]);

  useEffect(() => {
    if (imageRefs.current.length) {
      gsap.fromTo(
        imageRefs.current,
        {
          y: 0, // 시작 위치
          scale: 1, // 시작 크기
        },
        {
          y: -20, // 이동 거리
          scale: 1.05, // 확대
          duration: 1, // 애니메이션 지속 시간
          repeat: -1, // 무한 반복
          yoyo: true, // 애니메이션이 끝난 후 원래 상태로 복귀
          ease: 'power1.inOut', // 애니메이션의 가속도
        }
      );
    }
  }, []);

  return { imageRefs };
}
