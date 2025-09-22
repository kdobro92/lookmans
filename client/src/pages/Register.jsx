import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthYear: '',
    agreeTerms: false,
    agreeMarketing: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 약관 동의 확인
    if (!formData.agreeTerms) {
      alert('이용약관에 동의해주세요.');
      return;
    }

    // 회원가입 처리 로직
    console.log('Register attempt:', formData);
    alert('회원가입이 완료되었습니다!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 pt-24">
      <div className="max-w-lg w-full mx-4">
        {/* 회원가입 카드 */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* 헤더 */}
          <div className="text-center mb-6">
            <Link to="/" className="inline-block mb-6">
              <div className="text-3xl font-bold font-display text-gray-800 tracking-tight">
                LOOKMANS
              </div>
            </Link>
            <h1 className="text-2xl font-bold font-display text-gray-800 mb-2">
              회원가입
            </h1>
            <p className="text-gray-600 font-body">
              LOOKMANS의 프리미엄 서비스를 경험해보세요
            </p>
          </div>

          {/* 회원가입 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2 font-body">
                이름 *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition duration-300 font-body"
                placeholder="성함을 입력해주세요"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 font-body">
                이메일 *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition duration-300 font-body"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 font-body">
                전화번호 *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition duration-300 font-body"
                placeholder="010-1234-5678"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 font-body">
                출생년도
              </label>
              <select
                name="birthYear"
                value={formData.birthYear}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition duration-300 font-body"
              >
                <option value="">출생년도 선택</option>
                {Array.from({ length: 50 }, (_, i) => 2024 - i).map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 font-body">
                비밀번호 *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition duration-300 font-body pr-12"
                  placeholder="8자리 이상 입력해주세요"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 font-body">
                비밀번호 확인 *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition duration-300 font-body pr-12"
                  placeholder="비밀번호를 다시 입력해주세요"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {formData.password &&
                formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1 font-body">
                    비밀번호가 일치하지 않습니다.
                  </p>
                )}
            </div>

            {/* 약관 동의 */}
            <div className="space-y-3">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-1"
                />
                <span className="ml-3 text-gray-700 font-body">
                  <span className="text-red-500">*</span> 이용약관 및
                  개인정보처리방침에 동의합니다.
                  <Link
                    to="/terms"
                    className="text-indigo-600 hover:text-indigo-700 ml-1"
                  >
                    [보기]
                  </Link>
                </span>
              </label>

              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeMarketing"
                  checked={formData.agreeMarketing}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-1"
                />
                <span className="ml-3 text-gray-700 font-body">
                  마케팅 정보 수신에 동의합니다. (선택)
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 font-semibold font-body text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              회원가입
            </button>
          </form>

          {/* 소셜 회원가입 */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 font-body">
                  또는
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300 font-body">
                <span className="mr-3">📘</span>
                네이버로 가입하기
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300 font-body">
                <span className="mr-3">💬</span>
                카카오로 가입하기
              </button>
            </div>
          </div>

          {/* 로그인 링크 */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 font-body">
              이미 계정이 있으신가요?{' '}
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                로그인
              </Link>
            </p>
          </div>
        </div>

        {/* 혜택 안내 */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-4">
          <h3 className="text-lg font-semibold font-display text-gray-800 mb-4 text-center">
            회원 혜택
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <div className="text-2xl mb-2">🎁</div>
              <div className="text-sm font-body text-gray-700">
                신규 가입
                <br />
                10% 할인
              </div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">⭐</div>
              <div className="text-sm font-body text-gray-700">
                포인트
                <br />
                적립
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">📅</div>
              <div className="text-sm font-body text-gray-700">
                우선
                <br />
                예약
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">💆‍♂️</div>
              <div className="text-sm font-body text-gray-700">
                맞춤
                <br />
                서비스
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
