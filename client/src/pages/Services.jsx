import React from 'react';
import { services, detailedServices } from '../data/servicesData';

const Services = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 헤더 섹션 */}
      <section className="pt-32 pb-20 bg-gray-50 flex items-center justify-center min-h-[400px]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold font-display text-gray-800 mb-6 tracking-tight">
            서비스
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body leading-relaxed">
            남성 헤어 전문가들이 제공하는 최고 수준의 헤어 디자인과 케어 서비스
          </p>
        </div>
      </section>

      {/* 메인 서비스 카드 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 hover:bg-gray-50 transition duration-300 hover:shadow-2xl border border-gray-200"
              >
                <div className="text-6xl mb-6 text-center">{service.icon}</div>
                <h3 className="text-3xl font-semibold font-display text-gray-800 mb-4 text-center tracking-tight">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 text-center font-body leading-relaxed text-lg">
                  {service.description}
                </p>

                <div className="mb-6">
                  <div className="text-indigo-600 text-2xl font-bold text-center mb-6 font-display">
                    {service.price}
                  </div>
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-gray-600 font-body text-lg"
                      >
                        <span className="text-indigo-600 mr-3 text-xl">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="https://booking.naver.com/booking/13/bizes/1092304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 font-semibold shadow-md hover:shadow-lg text-center text-lg"
                >
                  예약하기
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 상세 서비스 목록 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-gray-800 mb-4 tracking-tight">
              상세 서비스
            </h2>
            <p className="text-xl text-gray-600 font-body leading-relaxed">
              각 서비스별 세부 옵션과 가격을 확인해보세요
            </p>
          </div>

          <div className="space-y-16">
            {detailedServices.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto">
                    <img
                      src={category.image}
                      alt={category.category}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <h3 className="text-3xl font-bold font-display text-white">
                        {category.category}
                      </h3>
                    </div>
                  </div>
                  <div className="p-8 lg:p-12">
                    <div className="space-y-6">
                      {category.services.map((service, serviceIndex) => (
                        <div
                          key={serviceIndex}
                          className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-xl font-semibold font-display text-gray-800">
                              {service.name}
                            </h4>
                            <span className="text-indigo-600 font-bold font-display text-lg">
                              {service.price}
                            </span>
                          </div>
                          <p className="text-gray-600 font-body leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8">
                      <a
                        href="https://booking.naver.com/booking/13/bizes/1092304"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 font-semibold"
                      >
                        {category.category} 예약하기
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 추가 정보 섹션 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-display text-gray-800 mb-4 tracking-tight">
              서비스 안내
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold font-display text-gray-800 mb-6">
                💎 프리미엄 패키지
              </h3>
              <p className="text-gray-600 mb-4 font-body leading-relaxed">
                헤어 디자인과 케어를 함께 받으시면 특별 할인 혜택을 드립니다.
              </p>
              <ul className="text-gray-600 space-y-2 font-body">
                <li>• 헤어 디자인 + 기본 케어: 10% 할인</li>
                <li>• 헤어 디자인 + 프리미엄 케어: 15% 할인</li>
                <li>• 정기 관리 (월 2회 이상): 20% 할인</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold font-display text-gray-800 mb-6">
                ⏰ 운영시간
              </h3>
              <div className="text-gray-600 space-y-2 font-body">
                <div>월요일 - 토요일: 10:00 - 20:00</div>
                <div>일요일: 10:00 - 18:00</div>
                <div className="mt-4 text-indigo-600 font-semibold">
                  * 예약제로 운영됩니다
                </div>
                <div className="text-gray-500 text-sm">
                  * 마지막 예약: 마감 1시간 전
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
