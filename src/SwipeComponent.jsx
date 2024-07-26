import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Background from './Background';
import PeptoneDesign from './PeptoneDesign';

const SwipeComponent = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef(null);
  const startY = useRef(0);
  const pages = [<Background key="background" />, <PeptoneDesign key="peptone" />];

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    const currentY = e.touches[0].clientY;
    const diffY = startY.current - currentY;

    if (diffY > 50) {
      // swipe up
      setCurrentPage((prevPage) => (prevPage + 1) % pages.length);
      startY.current = 0;
    } else if (diffY < -50) {
      // swipe down
      setCurrentPage((prevPage) => (prevPage - 1 + pages.length) % pages.length);
      startY.current = 0;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="page-container">
      {pages.map((page, index) => (
        <div
          key={index}
          className={`page ${
            index === currentPage ? 'visible' : index < currentPage ? 'hidden-up' : 'hidden-down'
          }`}
        >
          {page}
        </div>
      ))}
    </div>
  );
};

export default SwipeComponent;
