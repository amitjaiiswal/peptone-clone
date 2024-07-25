import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './Bubble.css';

const Bubble = ({ size, initialX, initialY, color }) => {
  const bubbleRef = useRef(null);

  useEffect(() => {
    const animateBubble = () => {
      const randomX = () => (Math.random() - 0.5) * 2 * window.innerWidth;
      const randomY = () => (Math.random() - 0.5) * 2 * window.innerHeight;

      anime({
        targets: bubbleRef.current,
        translateX: randomX,
        translateY: randomY,
        duration: 50000,
        easing: 'linear',
        complete: animateBubble, 
      });
    };

    animateBubble();
  }, [size]);

  const style = {
    width: size,
    height: size,
    top: initialY,
    left: initialX,
    backgroundColor: color,
    position: 'absolute',
    borderRadius: '50%',
  };

  return <div ref={bubbleRef} className="bubble" style={style}></div>;
};

export default Bubble;
