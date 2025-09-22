import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const NavLink = ({ to, children, mobile = false }) => {
    const active = isActive(to);
    const baseClasses = mobile
      ? "block py-3 px-4 transition duration-300 rounded-lg mx-2"
      : "relative transition duration-300 font-medium group";
    
    const activeClasses = active
      ? "text-indigo-600"
      : "text-gray-700 hover:text-indigo-600";
    
    const hoverClasses = mobile
      ? "hover:bg-gray-100"
      : "";

    return (
      <Link 
        to={to} 
        className={`${baseClasses} ${activeClasses} ${hoverClasses}`}
        onClick={() => setIsMenuOpen(false)}
      >
        {children}
        {!mobile && (
          <span className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-600 transition-all duration-300 ${
            active ? 'w-full' : 'w-0 group-hover:w-full'
          }`}></span>
        )}
      </Link>
    );
  };

  return (
    <header className="bg-white fixed w-full top-0 z-50 border-b border-gray-200 shadow-lg">
      <div className="flex justify-center">
        {/* 헤더 컨테이너 - 전체의 70% */}
        <div className="w-[70%] px-4">
          <div className="flex items-center justify-between py-4">
            {/* 로고 - 왼쪽 */}
            <Link to="/" className="flex items-center group">
              <div className="text-4xl font-bold font-display text-gray-800 tracking-tight">
                LOOKMANS
              </div>
              <img 
                src="/images/logo.jpg" 
                alt="LOOKMANS Logo" 
                className="ml-3 w-8 h-8 group-hover:scale-110 transition-transform duration-300 object-contain"
                onLoad={() => {
                  console.log('로고 이미지 로드 성공:', '/images/logo.jpg');
                }}
                onError={(e) => {
                  console.warn('로고 이미지 로드 실패:', e.target.src);
                  e.target.style.display = 'none';
                }}
              />
            </Link>
            
            {/* 데스크톱 메뉴 - 중앙 */}
            <nav className="hidden md:flex space-x-10">
              <NavLink to="/services">서비스</NavLink>
              <NavLink to="/stylists">스타일리스트</NavLink>
              <NavLink to="/gallery">갤러리</NavLink>
              <NavLink to="/style-diagnosis">스타일 진단</NavLink>
              <NavLink to="/blog">블로그</NavLink>
              <NavLink to="/contact">연락처</NavLink>
            </nav>

            {/* 로그인/로그아웃 - 오른쪽 */}
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-indigo-600 transition duration-300 font-body px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                로그인
              </Link>
              <Link 
                to="/register" 
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-body"
              >
                회원가입
              </Link>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
              className="md:hidden text-gray-700 hover:text-indigo-600 transition duration-300 p-2 rounded-xl hover:bg-indigo-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="flex justify-center">
          <div className="w-[70%]">
            <nav className="md:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-xl rounded-b-2xl shadow-xl">
              <NavLink to="/services" mobile>서비스</NavLink>
              <NavLink to="/stylists" mobile>스타일리스트</NavLink>
              <NavLink to="/gallery" mobile>갤러리</NavLink>
              <NavLink to="/style-diagnosis" mobile>스타일 진단</NavLink>
              <NavLink to="/blog" mobile>블로그</NavLink>
              <NavLink to="/contact" mobile>연락처</NavLink>
              <div className="border-t border-gray-200 pt-4 mt-4 px-4">
                <Link 
                  to="/login" 
                  className="block w-full text-left py-2 text-gray-700 hover:text-indigo-600 font-body hover:bg-gray-50 rounded-lg px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  로그인
                </Link>
                <Link 
                  to="/register" 
                  className="block w-full text-left py-2 text-gray-700 hover:text-indigo-600 font-body hover:bg-gray-50 rounded-lg px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  회원가입
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
