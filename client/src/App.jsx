import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// 컴포넌트 import
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// 페이지 컴포넌트 import
import Home from './pages/Home';
import Services from './pages/Services';
import Stylists from './pages/Stylists';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import StyleDiagnosis from './pages/StyleDiagnosis';
import Blog from './pages/Blog';

// 메인 App 컴포넌트
function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App bg-white min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/stylists" element={<Stylists />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/style-diagnosis" element={<StyleDiagnosis />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
