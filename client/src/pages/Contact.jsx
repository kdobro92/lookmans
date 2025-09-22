import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 예약 처리 로직을 추가할 수 있습니다
    alert('예약 문의가 접수되었습니다. 곧 연락드리겠습니다!');
    setFormData({
      name: '',
      phone: '',
      service: '',
      date: '',
      time: '',
      message: '',
    });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 헤더 섹션 */}
      <section className="pt-32 pb-20 bg-gray-50 flex items-center justify-center min-h-[400px]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold font-display text-gray-800 mb-6 tracking-tight">
            연락처
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body leading-relaxed">
            남성 헤어 전문가와 상담하고 예약하세요. 최고의 바버샵 서비스를
            제공합니다
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* 연락처 정보 */}
          <div>
            <h2 className="text-3xl font-bold font-display text-gray-800 mb-8">
              연락 정보
            </h2>

            <div className="space-y-6 mb-12">
              <div className="flex items-start">
                <div className="text-indigo-600 text-2xl mr-4 mt-1">📍</div>
                <div>
                  <h3 className="text-lg font-semibold font-display text-gray-800 mb-1">
                    주소
                  </h3>
                  <p className="text-gray-300">
                    서울시 강남구 테헤란로 123, 2층
                  </p>
                  <p className="text-gray-400 text-sm">
                    지하철 2호선 강남역 3번 출구 도보 5분
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-yellow-400 text-2xl mr-4 mt-1">📞</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-1">
                    전화번호
                  </h3>
                  <p className="text-gray-300">02-1234-5678</p>
                  <p className="text-gray-400 text-sm">예약 및 문의</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-yellow-400 text-2xl mr-4 mt-1">🕐</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-1">
                    운영시간
                  </h3>
                  <div className="text-gray-300 space-y-1">
                    <p>월요일 - 토요일: 10:00 - 20:00</p>
                    <p>일요일: 휴무</p>
                  </div>
                  <p className="text-gray-400 text-sm">마지막 예약: 19:00</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-yellow-400 text-2xl mr-4 mt-1">📧</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-1">
                    이메일
                  </h3>
                  <p className="text-gray-300">info@lookmans.com</p>
                  <p className="text-gray-400 text-sm">온라인 문의</p>
                </div>
              </div>
            </div>

            {/* 소셜 미디어 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                소셜 미디어
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  <span className="text-2xl">📘</span>
                </a>
                <a
                  href="#"
                  className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  <span className="text-2xl">📷</span>
                </a>
                <a
                  href="#"
                  className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  <span className="text-2xl">🐦</span>
                </a>
                <a
                  href="#"
                  className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  <span className="text-2xl">💬</span>
                </a>
              </div>
            </div>
          </div>

          {/* 예약 폼 */}
          <div className="bg-gray-700 rounded-xl p-8">
            <h2 className="text-3xl font-bold font-display text-gray-800 mb-8">
              온라인 예약
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-800 font-medium mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 bg-white text-gray-800 placeholder-gray-400"
                    placeholder="성함을 입력해주세요"
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-medium mb-2">
                    전화번호 *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 bg-white text-gray-800 placeholder-gray-400"
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  서비스 선택 *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 bg-white text-gray-800"
                >
                  <option value="">서비스를 선택해주세요</option>
                  <option value="classic-cut">클래식 컷</option>
                  <option value="fade-cut">페이드 컷</option>
                  <option value="modern-style">모던 스타일</option>
                  <option value="business-look">비즈니스 룩</option>
                  <option value="hair-care">헤어 케어</option>
                  <option value="scalp-care">두피 케어</option>
                  <option value="consultation">상담</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-800 font-medium mb-2">
                    희망 날짜
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 bg-gray-800 text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-medium mb-2">
                    희망 시간
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 bg-gray-800 text-gray-100"
                  >
                    <option value="">시간 선택</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  추가 요청사항
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 bg-white text-gray-800 placeholder-gray-400"
                  placeholder="원하시는 스타일이나 특별한 요청사항이 있으시면 자세히 적어주세요"
                />
              </div>

              <a
                href="https://booking.naver.com/booking/13/bizes/1092304"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 font-semibold text-lg shadow-lg text-center"
              >
                네이버 예약하기
              </a>
            </form>

            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <p className="text-gray-300 text-sm">
                <span className="text-yellow-400">※</span> 예약 확정은 전화 통화
                후 완료됩니다. 영업시간 내에 연락드리겠습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 찾아오는 길 */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              찾아오는 길
            </h2>
            <p className="text-gray-300">
              강남역에서 도보로 5분 거리에 위치해 있습니다
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-4">
                  🚇 지하철 이용시
                </h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• 지하철 2호선 강남역 3번 출구</li>
                  <li>• 도보 약 5분 거리</li>
                  <li>• 테헤란로 방향으로 직진</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-4">
                  🚗 자차 이용시
                </h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• 건물 지하 주차장 이용 가능</li>
                  <li>• 2시간 무료 주차 제공</li>
                  <li>• 발렛파킹 서비스 가능</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-300">
                <div className="text-4xl mb-4">🗺️</div>
                <p>지도 영역</p>
                <p className="text-sm">
                  (실제 구현시 Google Maps API 등을 사용)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
