import React, { useEffect, useState } from 'react';
import './PeptoneDesign.css';

const Bubble = ({ index }) => {
  const [style, setStyle] = useState({});
  const colors = ['#7d9cd3', '#f5af65'];

  useEffect(() => {
    const size = Math.floor(Math.random() * (2)) + 25;
    const duration = Math.random() * (10 - 5) + 5; 
    const x = Math.random() * 0.5; 
    const y = Math.random() * 0.5; 
    const position = Math.floor(Math.random() * 4);  
    const bubbleColor = colors[Math.floor(Math.random() * colors.length)];  

    console.log('Bubble color:', bubbleColor); 

    setStyle({
      width: `${size}px`,
      height: `${size}px`,
      left: position === 0 ? `calc(-${size / 2}px)` : 'auto',
      right: position === 3 ? `calc(-${size / 2}px)` : 'auto',
      top: position === 1 ? `calc(-${size / 2}px)` : 'auto',
      bottom: position === 2 ? `calc(-${size / 2}px)` : 'auto',
      '--duration': `${duration}s`,
      '--x': x,
      '--y': y,
      '--bubbleColor': bubbleColor,
      '--duration1': `${Math.random() * (10 - 5) + 5}s`,
      '--duration2': `${Math.random() * (10 - 5) + 5}s`,
      '--duration3': `${Math.random() * (10 - 5) + 5}s`,
    });
  }, [index]);

  return <div className={`bubble bubble${(index % 3) + 1}`} style={style}></div>;
};


const Bubbles = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const bubbleCount = 5;
    const newBubbles = Array.from({ length: bubbleCount }, (_, index) => index);
    setBubbles(newBubbles);
  }, []);

  return (
    <>
      {bubbles.map((index) => (
        <Bubble key={index} index={index} />
      ))}
    </>
  );
};

export default Bubbles;
