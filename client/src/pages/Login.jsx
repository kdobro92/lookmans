import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직
    console.log('Login attempt:', formData);
    alert('로그인 기능은 준비 중입니다.');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 pt-24">
      <div className="max-w-md w-full mx-4">
        {/* 로그인 카드 */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* 헤더 */}
          <div className="text-center mb-6">
            <Link to="/" className="inline-block mb-6">
              <div className="text-3xl font-bold font-display text-gray-800 tracking-tight">
                LOOKMANS
              </div>
            </Link>
            <h1 className="text-2xl font-bold font-display text-gray-800 mb-2">
              로그인
            </h1>
            <p className="text-gray-600 font-body">
              계정에 로그인하여 예약을 관리하세요
            </p>
          </div>

          {/* 로그인 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2 font-body">
                이메일
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
                비밀번호
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition duration-300 font-body pr-12"
                  placeholder="비밀번호를 입력하세요"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-600 font-body">
                  로그인 상태 유지
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-indigo-600 hover:text-indigo-700 font-body"
              >
                비밀번호 찾기
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 font-semibold font-body text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              로그인
            </button>
          </form>

          {/* 소셜 로그인 */}
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
                네이버로 로그인
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300 font-body">
                <span className="mr-3">💬</span>
                카카오로 로그인
              </button>
            </div>
          </div>

          {/* 회원가입 링크 */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 font-body">
              아직 계정이 없으신가요?{' '}
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                회원가입
              </Link>
            </p>
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 font-body text-sm">
            로그인하시면 예약 관리, 포인트 적립, 개인 맞춤 서비스를 이용하실 수
            있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
