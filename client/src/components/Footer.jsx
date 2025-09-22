import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8 border-t border-gray-200">
      <div className="flex justify-center">
        {/* 푸터 컨테이너 - 전체의 70% */}
        <div className="w-[70%] px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-indigo-600 font-display">LOOKMANS</h3>
              <p className="text-gray-600 font-body leading-relaxed">
                전문적인 기술과 세련된 서비스로 고객만족을 최우선으로 하는 LOOKMANS입니다.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 font-display">빠른 링크</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/services" className="hover:text-indigo-600 font-body">서비스</Link></li>
                <li><Link to="/stylists" className="hover:text-indigo-600 font-body">스타일리스트</Link></li>
                <li><Link to="/gallery" className="hover:text-indigo-600 font-body">갤러리</Link></li>
                <li><Link to="/contact" className="hover:text-indigo-600 font-body">연락처</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 font-display">소셜 미디어</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-600 hover:text-indigo-600 text-2xl">📘</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600 text-2xl">📷</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600 text-2xl">🐦</a>
              </div>
              <div className="text-gray-600 font-body">
                <p>📍 서울시 강남구 테헤란로 123, 2층</p>
                <p>📞 02-1234-5678</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-500">
            <p className="font-body">&copy; 2024 LOOKMANS. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
