'use client';
import Navbar from "@/components/Navbar/page"
import Carousel from "@/components/Carousel/page"
import Main from "@/components/Main/page"
import About from "@/components/About/page"
import Style from "@/components/Style/page"
import Price from "@/components/Price/page"
import Contact from "@/components/Contact/page"
import KakaoMap from "@/components/KakaoMap/page"
import Footer from "@/components/Footer/page"
import moveTo from "@/components/moveTo/page"
import { useTypewriterEffect }  from "@/hooks/useTypewriterEffect"
import { useState, useEffect, useRef } from "react"

export default function Home() {
  const [scrollTo, setScrollTo] = useState('');
  const sectionsRef = useRef([]);

  // useTypewriterEffect();

  // Navbar 화면 이동
  useEffect(() => {
    if (scrollTo) {
      const targetElement = document.getElementById(scrollTo);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      setScrollTo('');
    }
  }, [scrollTo]);

  // Fade In CSS Effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div>
      <Navbar setScrollTo={setScrollTo} />
      {/* <Carousel /> */}
      <div ref={(el) => (sectionsRef.current[0] = el)} className="typewriter-text">
        <Main />
      </div>
      <About />
      <div ref={(el) => (sectionsRef.current[1] = el)} className="parallax-section">
        <Style />
      </div>
      <div ref={(el) => (sectionsRef.current[2] = el)} className="fade-in-section">
        <Price />
      </div>
      <div ref={(el) => (sectionsRef.current[3] = el)} className="fade-in-section">
        <Contact />
      </div>
      <div ref={(el) => (sectionsRef.current[4] = el)} className="fade-in-section">
        <KakaoMap />
      </div>
      <Footer />
    </div>
  );
}
