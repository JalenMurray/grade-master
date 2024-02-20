import { useState, useEffect } from 'react';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';

function Carousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slide, setSlide] = useState({});

  useEffect(() => {
    setSlide(slides[currentIndex]);
  }, [currentIndex, slides]);

  const handleLeftClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(slides.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRightClick = () => {
    if (currentIndex === slides.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex h-full">
      <div className="flex justify-center items-center cursor-pointer" onClick={handleLeftClick}>
        <ChevronLeft style={{ fontSize: '6rem' }} />
      </div>
      <div className="h-full">
        {slide.showcase}
        <div className="height-[10%] text-center items-center">
          <h1 className="font-bold text-[18px]">{slide.label}</h1>
          <p>{slide.description}</p>
        </div>
      </div>
      <div className="flex justify-center items-center cursor-pointer" onClick={handleRightClick}>
        <ChevronRight style={{ fontSize: '6rem' }} />
      </div>
    </div>
  );
}

export default Carousel;
