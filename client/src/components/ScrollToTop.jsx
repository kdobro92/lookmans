import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// 페이지 이동 시 스크롤을 맨 위로 이동시키는 컴포넌트
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [showScrollButton, setShowScrollButton] = useState(false);

  // 페이지 경로가 변경될 때마다 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // 부드러운 스크롤 애니메이션
    });
  }, [pathname]);

  // 스크롤 위치에 따라 버튼 표시/숨김
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollButton(scrollTop > 300); // 300px 이상 스크롤 시 버튼 표시
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 스크롤을 맨 위로 이동시키는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* 스크롤 맨 위로 이동 버튼 */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
          aria-label="맨 위로 이동"
        >
          <svg
            className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
