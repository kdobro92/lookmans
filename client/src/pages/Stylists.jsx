import React from 'react';
import { stylists } from '../data/stylistsData';

const Stylists = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 헤더 섹션 */}
      <section className="pt-32 pb-20 bg-gray-50 flex items-center justify-center min-h-[400px]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold font-display text-gray-800 mb-6 tracking-tight">
            전문 바버팀
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body leading-relaxed">
            풍부한 경험과 전문성을 갖춘 남성 헤어 전문가들이 최고의 서비스를
            제공합니다
          </p>
        </div>
      </section>

      {/* 바버 소개 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-16">
            {stylists.map((stylist, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-reverse' : ''}`}
              >
                {/* 프로필 카드 */}
                <div className="bg-white rounded-xl p-8 text-center border border-gray-200 shadow-lg hover:shadow-xl transition duration-300">
                  <div className="mb-8 flex justify-center">
                    <img 
                      src="/images/designer.jpeg" 
                      alt={`${stylist.name} 프로필`} 
                      className="w-48 h-48 rounded-full object-cover shadow-lg"
                      onError={(e) => {
                        console.warn('디자이너 이미지 로드 실패:', e.target.src);
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiByeD0iNjQiIGZpbGw9IiM0NjYzZTYiLz4KPGNpcmNsZSBjeD0iNjQiIGN5PSI1MCIgcj0iMjAiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMCA5OGMwLTE1IDE0LTI3IDI5LTI3aDQwYzE1IDAgMjkgMTIgMjkgMjd2MTBIMjB2LTEweiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';
                      }}
                    />
                  </div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold font-display text-gray-800 mb-2 tracking-tight">
                      {stylist.name}
                    </h3>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <p className="text-indigo-600 font-semibold font-body">
                        {stylist.position}
                      </p>
                      <span className="text-gray-400">•</span>
                      <p className="text-gray-600 font-body">
                        {stylist.experience}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-gray-800 font-semibold mb-3 font-display">
                      전문 분야
                    </h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {stylist.specialty.map((spec, idx) => (
                        <span
                          key={idx}
                          className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href="https://booking.naver.com/booking/13/bizes/1092304"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 font-semibold shadow-md"
                  >
                    {stylist.name} 예약하기
                  </a>
                </div>

                {/* 상세 정보 */}
                <div className="space-y-8">
                  <div>
                    <h4 className="text-2xl font-semibold font-display text-gray-800 mb-4">
                      소개
                    </h4>
                    <p className="text-gray-600 leading-relaxed font-body text-lg">
                      {stylist.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-2xl font-semibold font-display text-gray-800 mb-4">
                      수상 경력
                    </h4>
                    <ul className="space-y-3">
                      {stylist.awards.map((award, idx) => (
                        <li
                          key={idx}
                          className="text-gray-600 flex items-center font-body text-lg"
                        >
                          <span className="text-indigo-600 mr-3 text-xl">
                            🏆
                          </span>
                          {award}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-2xl font-semibold font-display text-gray-800 mb-4">
                      서비스 철학
                    </h4>
                    <p className="text-gray-600 italic font-body leading-relaxed text-lg">
                      "{stylist.philosophy}"
                    </p>
                  </div>

                  {/* 전문 서비스 */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold font-display text-gray-800 mb-4">
                      제공 서비스
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {stylist.specialty.map((service, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0"
                        >
                          <span className="font-body text-gray-700">
                            {service}
                          </span>
                          <span className="text-indigo-600 font-semibold">
                            전문
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 팀 철학 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-gray-800 mb-4">
              LOOKMANS의 약속
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto font-body leading-relaxed text-lg">
              모든 바버와 헤어 전문가는 지속적인 교육과 기술 연마를 통해 최고
              수준의 남성 헤어 서비스를 제공하기 위해 노력합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <div className="text-5xl mb-6">🎓</div>
              <h3 className="text-xl font-semibold font-display text-gray-800 mb-4">
                지속적인 교육
              </h3>
              <p className="text-gray-600 font-body leading-relaxed">
                최신 남성 헤어 트렌드와 기술을 익히기 위한 정기적인 교육 참여
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <div className="text-5xl mb-6">✂️</div>
              <h3 className="text-xl font-semibold font-display text-gray-800 mb-4">
                전문적 기술
              </h3>
              <p className="text-gray-600 font-body leading-relaxed">
                클래식한 바버 기법부터 모던 스타일까지 완벽한 기술력
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <div className="text-5xl mb-6">🤝</div>
              <h3 className="text-xl font-semibold font-display text-gray-800 mb-4">
                고객 중심
              </h3>
              <p className="text-gray-600 font-body leading-relaxed">
                개인별 맞춤 상담을 통한 최적의 스타일 제안
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 예약 안내 */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-display text-white mb-6">
            전문가와 함께하는 스타일링
          </h2>
          <p className="text-xl text-white/90 font-body mb-8 max-w-2xl mx-auto leading-relaxed">
            원하는 전문가를 선택하여 예약하거나, 상담을 통해 최적의 전문가를
            추천받으세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://booking.naver.com/booking/13/bizes/1092304"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-none font-semibold text-lg hover:bg-gray-100 transition duration-300 min-w-[200px] uppercase tracking-wider text-center"
            >
              전문가 예약
            </a>
            <button className="border-2 border-white text-white px-8 py-4 rounded-none font-semibold text-lg hover:bg-white hover:text-indigo-600 transition duration-300 min-w-[200px] uppercase tracking-wider">
              상담 문의
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stylists;
