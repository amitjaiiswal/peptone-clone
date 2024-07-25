import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Bubble from "./Bubble";
import "./Background.css";

const Background = () => {
  const [bubbles, setBubbles] = useState([]);
  const navigate = useNavigate();

  const leftSectionStyle = {
    position: "absolute",
    left: "12%",
    top: "23%",
    maxWidth: "20%",
    zIndex: 1,
  };

  const h1Style = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    fontSize: "4.5em",
    margin: 0,
    fontFamily: "Mate",
    position: 'relative',
  };

  const pStyle = {
    marginTop: "20px",
    color: "#bfbfbf",
    fontFamily: "Mate",
    fontWeight: 800,
    fontSize: '16px',
    position: 'relative',
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-block",
    marginTop: "20px",
    fontFamily: "Mate",
    fontSize: '18px'
  };

  useEffect(() => {
    const newBubbles = Array.from({ length: 25 }).map((_, index) => {
      const size = Math.random() * 80 + 40;
      const initialX = Math.random() * (window.innerWidth - size);
      const initialY = Math.random() * (window.innerHeight - size);
      const color = Math.random() > 0.5 ? "#4d74be" : "#ea9a4f"; 

      return {
        id: index,
        size,
        initialX,
        initialY,
        color,
      };
    });

    setBubbles(newBubbles);
  }, []);

  return (
    <div className="background">
      <div style={leftSectionStyle}>
        {bubbles.map((bubble) => (
          <Bubble
            key={bubble.id}
            size={bubble.size}
            initialX={bubble.initialX}
            initialY={bubble.initialY}
            color={bubble.color}
          />
        ))}
        <h1 style={h1Style}>Intrinsically Disordered Proteins</h1>
        <p style={pStyle}>
          Intrinsically disordered proteins (IDPs) lack rigid 3D structure, yet
          they play critical roles in biological processes in human body, which
          makes them prime therapeutic targets.
        </p>
        <a href="#" style={linkStyle}>
          Learn More &gt;
        </a>
      </div>
      <div className="arrow"></div>
      <button className="redirect-button" onClick={() => navigate('/page2')}>
        Go
      </button>
    </div>
  );
};

export default Background;
