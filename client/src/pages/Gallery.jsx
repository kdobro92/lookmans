import React, { useState } from 'react';
import { categories, galleryItems } from '../data/galleryData';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems =
    selectedCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-white min-h-screen">
      {/* 헤더 섹션 */}
      <section className="pt-32 pb-20 bg-gray-50 flex items-center justify-center min-h-[400px]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold font-display text-gray-800 mb-6 tracking-tight">
            스타일 갤러리
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body leading-relaxed">
            LOOKMANS에서 완성된 다양한 남성 헤어 스타일과 케어 서비스 결과를
            확인해보세요
          </p>
        </div>
      </section>

      {/* 카테고리 필터 */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 갤러리 그리드 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 h-64 hover:shadow-2xl transition duration-300 border border-gray-300"
              >
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <h4 className="text-lg font-semibold font-display mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm font-body mb-4">{item.description}</p>
                    <a
                      href="https://booking.naver.com/booking/13/bizes/1092304"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
                    >
                      이 스타일 예약
                    </a>
                  </div>
                </div>
                <div className="h-full flex items-center justify-center text-6xl">
                  {item.image}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-gray-800 mb-4">
              스타일 변화
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-body leading-relaxed">
              LOOKMANS에서 새로운 스타일로 변신한 고객들의 놀라운 변화
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { before: '긴 머리', after: '클래식 컷', style: '전문직 남성' },
              { before: '무성한 머리', after: '페이드 컷', style: '대학생' },
              {
                before: '손상된 모발',
                after: '케어 후',
                style: '모발 건강 회복',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="grid grid-cols-2">
                  <div className="relative bg-gray-300 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">😐</div>
                      <div className="text-sm font-semibold text-gray-600">
                        BEFORE
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                      BEFORE
                    </div>
                  </div>
                  <div className="relative bg-indigo-100 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">😎</div>
                      <div className="text-sm font-semibold text-indigo-600">
                        AFTER
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded">
                      AFTER
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold font-display text-gray-900 mb-2">
                    {item.after}
                  </h3>
                  <p className="text-gray-600 font-body text-sm mb-2">
                    {item.before} → {item.after}
                  </p>
                  <p className="text-indigo-600 font-body text-sm font-semibold">
                    {item.style}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 고객 후기 섹션 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-gray-800 mb-4">
              고객 후기
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-body leading-relaxed">
              LOOKMANS를 경험한 고객들의 생생한 후기
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
              <div className="text-indigo-600 text-xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 mb-4 font-body leading-relaxed">
                "페이드 컷을 정말 완벽하게 해주셨어요. 직장에서도 많은 칭찬을
                받았습니다. 앞으로 계속 이곳에서 관리받을 예정입니다."
              </p>
              <div className="text-gray-500 font-body">- 김○○님 (회사원)</div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
              <div className="text-indigo-600 text-xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 mb-4 font-body leading-relaxed">
                "두피 케어 서비스가 정말 좋았어요. 전문적인 상담과 케어로 두피
                건강이 많이 좋아졌습니다."
              </p>
              <div className="text-gray-500 font-body">- 이○○님 (자영업)</div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
              <div className="text-indigo-600 text-xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 mb-4 font-body leading-relaxed">
                "바버님이 정말 친절하고 실력이 좋으세요. 제가 원하는 스타일을
                정확히 이해하고 완성해주셨어요."
              </p>
              <div className="text-gray-500 font-body">- 박○○님 (대학생)</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-display text-white mb-6">
            당신의 스타일을 찾아보세요
          </h2>
          <p className="text-xl text-white/90 font-body mb-8 max-w-2xl mx-auto leading-relaxed">
            전문 바버와 상담을 통해 당신에게 가장 어울리는 스타일을 찾아보세요.
          </p>
          <a
            href="https://booking.naver.com/booking/13/bizes/1092304"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-none font-semibold text-lg hover:bg-gray-100 transition duration-300 min-w-[200px] uppercase tracking-wider"
          >
            지금 예약하기
          </a>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
