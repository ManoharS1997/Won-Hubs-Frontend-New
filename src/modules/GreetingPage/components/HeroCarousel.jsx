import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import T from "../../../helpers/Translator";

export function HeroCarousel({ slides, language }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const Navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // const prevSlide = () =>
  //   setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  // const nextSlide = () =>
  //   setCurrentIndex((prev) => (prev + 1) % slides.length);
  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
    <filter id="gooey">
      <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
      <feColorMatrix in="blur"
        mode="matrix"
        values="
        1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 20 -10"
        result="gooey"
      />
      <feBlend in="SourceGraphic" in2="gooey" />
    </filter>
  </svg>

  return (
    <div
      className="  relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-lg 
      bg-gradient-to-r from-[#0476d3]/10 to-white"
    >
      {/* Gooey Blobs Animated Background */}
      <div className="blobs-container">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
        <div className="blob blob4"></div>
        <div className="blob blob5"></div>
        <div className="blob blob6"></div>
      </div>


      <div className="absolute inset-0 bg-white/70 pointer-events-none" />
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex flex-col items-center justify-center
            text-center px-6 transition-opacity duration-1000 ease-in-out
            ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#14213d]">
            <T to={language}>{slide.title}</T>
          </h2>
          <p className="mt-4 text-lg md:text-2xl text-gray-700">
            <T to={language}>{slide.subtitle}</T>
          </p>
          <p className="mt-2 text-[#0476d3] font-semibold text-xl">
            <T to={language}>{slide.cta}</T>
          </p>
          <button
            onClick={() => Navigate('/external/register')}
            className="mt-6 px-6 py-2 !rounded-full border border-[#0476d3] text-[#0476d3]
            hover:!bg-[#0476d3] hover:!text-white transition duration-500"
          >
            <T to={language}>Start Free Trial</T>
          </button>
        </div>
      ))}

      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === currentIndex ? "bg-[#0476d3]" : "bg-gray-300"
              } transition`}
          />
        ))}
      </div>
    </div>
  );
}
