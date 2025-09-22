import React, { useEffect, useRef } from 'react';
import ChatWidget from '../components/ChatWidget';

const Home = () => {
  // 스크롤 애니메이션을 위한 Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // 애니메이션을 적용할 요소들 관찰
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-0">
      {/* 히어로 섹션 - 남성 바버샵 이미지 */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 배경 이미지 (남성 바버샵) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70">
          <img
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="LOOKMANS Premium Barbershop"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 히어로 콘텐츠 */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold font-display mb-6 leading-tight tracking-tight">
            <span className="block">LOOKMANS</span>
            <span className="block text-4xl md:text-5xl font-light mt-2 opacity-90 font-accent">
              Premium Barbershop
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-body leading-relaxed mb-8 opacity-90 max-w-3xl mx-auto">
            남성을 위한 프리미엄 헤어 디자인 & 케어 전문점
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://booking.naver.com/booking/13/bizes/1092304"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-none font-accent font-semibold text-lg hover:bg-gray-100 transition duration-300 min-w-[200px] uppercase tracking-wider text-center transform hover:scale-105"
            >
              예약하기
            </a>
            <button className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-none font-accent font-semibold text-lg hover:bg-white hover:text-black transition duration-300 min-w-[200px] uppercase tracking-wider transform hover:scale-105">
              스타일 보기
            </button>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <button
          onClick={() => {
            const nextSection = document.querySelector('.scroll-target');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce hover:text-gray-300 transition duration-300 cursor-pointer p-2 rounded-full hover:bg-white/10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </section>

      {/* 브랜드 소개 섹션 */}
      <section className="py-20 bg-white scroll-animate scroll-target opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold font-display text-gray-900 mb-6 leading-tight tracking-tight">
                  남성 스타일의
                  <br />
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    새로운 기준
                  </span>
                </h2>
                <p className="text-xl text-gray-600 font-body leading-relaxed mb-6">
                  LOOKMANS는 현대 남성을 위한 프리미엄 바버샵입니다. 클래식한
                  바버샵의 전통과 모던한 헤어 디자인 기술을 결합하여 최고의
                  서비스를 제공합니다.
                </p>
                <p className="text-lg text-gray-600 font-body leading-relaxed">
                  전문적인 헤어 디자인부터 깊이 있는 헤어 케어까지, 남성의
                  개성과 라이프스타일에 맞는 완벽한 스타일을 완성해드립니다.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div className="text-center transform hover:scale-110 transition duration-300">
                  <div className="text-4xl font-bold font-display text-indigo-600 mb-2">
                    10+
                  </div>
                  <div className="text-gray-600 font-body">년의 경험</div>
                </div>
                <div className="text-center transform hover:scale-110 transition duration-300">
                  <div className="text-4xl font-bold font-display text-indigo-600 mb-2">
                    2000+
                  </div>
                  <div className="text-gray-600 font-body">만족한 고객</div>
                </div>
                <div className="text-center transform hover:scale-110 transition duration-300">
                  <div className="text-4xl font-bold font-display text-indigo-600 mb-2">
                    5★
                  </div>
                  <div className="text-gray-600 font-body">평균 평점</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Men's Hair Cut"
                  className="rounded-lg shadow-xl object-cover h-64 w-full transform hover:scale-105 transition duration-500"
                />
                <img
                  src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Professional Barber"
                  className="rounded-lg shadow-xl object-cover h-64 w-full mt-8 transform hover:scale-105 transition duration-500"
                />
                <img
                  src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Hair Styling"
                  className="rounded-lg shadow-xl object-cover h-64 w-full -mt-8 transform hover:scale-105 transition duration-500"
                />
                <img
                  src="https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Hair Care Treatment"
                  className="rounded-lg shadow-xl object-cover h-64 w-full transform hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 하이라이트 - 헤어디자인 & 헤어케어만 */}
      <section className="py-20 bg-gray-50 scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-gray-900 mb-4 tracking-tight">
              프리미엄 서비스
            </h2>
            <p className="text-xl text-gray-600 font-body max-w-3xl mx-auto leading-relaxed">
              남성 헤어 전문가들이 제공하는 최고 수준의 헤어 디자인과 케어
              서비스
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              {
                image:
                  'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: '헤어 디자인',
                description:
                  '클래식부터 트렌디까지, 개인의 얼굴형과 라이프스타일에 맞는 완벽한 헤어 디자인',
                features: [
                  '페이드 컷',
                  '클래식 컷',
                  '모던 스타일',
                  '비즈니스 룩',
                ],
              },
              {
                image:
                  'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: '헤어 케어',
                description:
                  '두피와 모발 건강을 위한 전문적인 케어 프로그램과 프리미엄 트리트먼트',
                features: [
                  '두피 케어',
                  '모발 트리트먼트',
                  '영양 공급',
                  '손상 복구',
                ],
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-500 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold font-display text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 font-body leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-gray-700 transform hover:translate-x-2 transition duration-300"
                      >
                        <span className="text-indigo-600 mr-3">✓</span>
                        <span className="font-body">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="https://booking.naver.com/booking/13/bizes/1092304"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 font-semibold transform hover:scale-105"
                  >
                    예약하기
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After 섹션 */}
      <section className="py-20 bg-white scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-400">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-gray-900 mb-4 tracking-tight">
              스타일 변화
            </h2>
            <p className="text-xl text-gray-600 font-body max-w-2xl mx-auto leading-relaxed">
              LOOKMANS에서 새로운 스타일로 변신한 고객들의 만족스러운 결과
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img
                      src={`https://images.unsplash.com/photo-${1580618672318 + index * 10}-4b3c6c5d6c5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80`}
                      alt="Before"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded animate-pulse">
                      BEFORE
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={`https://images.unsplash.com/photo-${1599351431202 + index * 5}-4b3c6c5d6c5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80`}
                      alt="After"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded animate-pulse">
                      AFTER
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold font-display text-gray-900 mb-2">
                    {index === 0
                      ? '클래식 페이드'
                      : index === 1
                        ? '모던 언더컷'
                        : '비즈니스 스타일'}
                  </h3>
                  <p className="text-gray-600 font-body text-sm">
                    개인의 스타일과 라이프스타일에 맞춘 완벽한 변신 결과입니다.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6 tracking-tight">
            새로운 스타일, 새로운 자신감
          </h2>
          <p className="text-xl text-white/90 font-body mb-8 max-w-2xl mx-auto leading-relaxed">
            LOOKMANS에서 당신만의 스타일을 찾아보세요. 전문 바버의 정교한 기술과
            개인 맞춤 서비스를 경험하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://booking.naver.com/booking/13/bizes/1092304"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-indigo-600 px-8 py-4 rounded-none font-accent font-semibold text-lg hover:bg-gray-100 transition duration-300 min-w-[200px] uppercase tracking-wider text-center transform hover:scale-105"
            >
              지금 예약하기
            </a>
            <button className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-none font-accent font-semibold text-lg hover:bg-white hover:text-indigo-600 transition duration-300 min-w-[200px] uppercase tracking-wider transform hover:scale-105">
              02-1234-5678
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1.5s ease-out;
        }

        .scroll-animate.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>

      {/* 채팅 위젯 */}
      <ChatWidget />
    </div>
  );
};

export default Home;
