// Slider.js (상단 포스터 슬라이더 컴포넌트)
import React, { useState, useEffect } from 'react';

function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    "https://web-images-kmhyuk1018.s3.ap-northeast-2.amazonaws.com/111.jpg",
    "https://web-images-kmhyuk1018.s3.ap-northeast-2.amazonaws.com/222.jpg",
    "https://web-images-kmhyuk1018.s3.ap-northeast-2.amazonaws.com/333.jpg",
    "https://web-images-kmhyuk1018.s3.ap-northeast-2.amazonaws.com/444.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="slider">
      <div className="slide-show">
        <img className="slides" src={slides[slideIndex]} alt={`슬라이드 ${slideIndex + 1}`} />
      </div>
    </section>
  );
}

export default Slider;
