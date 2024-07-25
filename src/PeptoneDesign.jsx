import React, { useState, useEffect } from "react";
import "./PeptoneDesign.css";
import BubblePeptone from './PeptoneBubble';
import { useNavigate } from "react-router-dom";
import "./Background.css";

const PeptoneDesign = () => {
  const navigate = useNavigate();
  const [backgroundColor, setBackgroundColor] = useState("#292838");
  const [circleColors, setCircleColors] = useState({
    circle1: "#2b2d5a",
    circle2: "#30357f",
    circle3: "#313990",
  });
  const [activeButton, setActiveButton] = useState("proprietaryExperiments");
  const [imageSrc, setImageSrc] = useState("../src/assets/1.png");
  const [animationClass, setAnimationClass] = useState("fadeIn");

  useEffect(() => {
    document.documentElement.style.setProperty('--background-color', backgroundColor);
    document.documentElement.style.setProperty('--circle1-color', circleColors.circle1);
    document.documentElement.style.setProperty('--circle2-color', circleColors.circle2);
    document.documentElement.style.setProperty('--circle3-color', circleColors.circle3);
  }, [backgroundColor, circleColors]);

  const handleClick = (backgroundColor, circleColors, button, imageSrc, animationClass) => {
    setAnimationClass("fadeOut");
    setTimeout(() => {
      setBackgroundColor(backgroundColor);
      setCircleColors(circleColors);
      setActiveButton(button);
      setImageSrc(imageSrc);
      setAnimationClass("fadeIn");
    }, 500);
  };

  const handleNextGenerationClick = () => {
    handleClick("#1d464a", {
      circle1: "#204b41",
      circle2: "#1e5747",
      circle3: "#1d5f49",
    }, "nextGeneration", "../src/assets/mirocontroller.png", "nextGenerationAnimation");
  };

  const handleProteinDisorderClick = () => {
    handleClick("#ad6336", {
      circle1: "#aa6038",
      circle2: "#a96b37",
      circle3: "#ac7e36",
    }, "proteinDisorder", "../src/assets/2.png", "proteinDisorderAnimation");
  };

  const handleProprietaryExperimentsClick = () => {
    handleClick("#292838", {
      circle1: "#2b2d5a",
      circle2: "#30357f",
      circle3: "#313990",
    }, "proprietaryExperiments", "../src/assets/1.png", "proprietaryExperimentsAnimation");
  };

  const containerStyle = {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor,
    color: "white",
    overflow: "hidden",
    position: "relative",
    flexDirection: "column",
    fontFamily: "Mate",
    fontWeight: 400,
  };

  const leftSectionStyle = {
    position: "absolute",
    left: "12%",
    top: "23%",
    maxWidth: "16%",
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
    fontSize: '16px'
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

  const centerSectionStyle = {
    position: "relative",
    width: "50%",
    textAlign: "center",
  };

  const circleStyle = {
    position: "absolute",
    borderRadius: "50%",
    zIndex: 1,
    transition: "background-color 0.5s ease, transform 0.3s ease",
  };

  const circle1Style = {
    ...circleStyle,
    width: "980px",
    height: "950px",
    backgroundColor: `var(--circle1-color)`,
    top: "50%",
    left: "90%",
    transform: "translate(-50%, -50%)",
    zIndex: 0,
  };

  const circle2Style = {
    ...circleStyle,
    width: "620px",
    height: "620px",
    backgroundColor: `var(--circle2-color)`,
    top: "50%",
    left: "90%",
    transform: "translate(-50%, -50%)",
    zIndex: 0,
  };

  const circle3Style = {
    ...circleStyle,
    width: "350px",
    height: "350px",
    backgroundColor: `var(--circle3-color)`,
    top: "50%",
    left: "90%",
    transform: "translate(-50%, -50%)",
    zIndex: 0,
  };

  const menuIconStyle = {
    display: "inline-block",
    width: "30px",
    height: "30px",
    backgroundColor: "white",
    borderRadius: "50%",
    marginLeft: "20px",
    textAlign: "center",
    lineHeight: "30px",
    cursor: "pointer",
  };

  const buttonStyle = {
    margin: "10px auto",
    padding: "10px 20px",
    fontSize: "0.85em",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    display: "inline-block",
    zIndex: 2,
    fontWeight: "bold",
    width: "230px",
    textAlign: "start",
    height: "62px",
    transition: "background-color 0.3s ease",
  };

  const buttonContainerStyle = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "44px",
    zIndex: 3,
    flexDirection: "column",
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const offsetX = (clientX - centerX) / width;
    const offsetY = (clientY - centerY) / height;

    const rotateX = offsetY * 30;
    const rotateY = offsetX * -30;

    currentTarget.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTransform = (e) => {
    e.currentTarget.style.transform = "translate(-50%, -50%) rotateX(0) rotateY(0)";
  };

  return (
    <div className="container" style={containerStyle}>
      <div style={leftSectionStyle}>
        <BubblePeptone />
        <h1 style={h1Style}>Physics meets biology</h1>
        <p style={pStyle}>
          Peptone has multiple core capabilities that define and protect our
          unique approach to therapeutic development for challenging IDP
          targets.
        </p>
        <a href="#" style={linkStyle}>
          Oppenheimer Platform &gt;
        </a>
      </div>
      <div style={buttonContainerStyle}>
        <button className="button"
          style={{
            ...buttonStyle,
            backgroundColor:
              activeButton === "proprietaryExperiments"
                ? "#3f4ff6"
                : "transparent",
          }}
          onClick={handleProprietaryExperimentsClick}
        >
          <span>
          PROPRIETARY <br /> EXPERIMENTS

          </span>
        </button>
        <button
        className="button"
          style={{
            ...buttonStyle,
            backgroundColor:
              activeButton === "nextGeneration" ? "#188055" : "transparent",
          }}
          onClick={handleNextGenerationClick}
        >
          <span>
          NEXT-GENERATION <br /> SUPERCOMPUTING

          </span>
        </button>
        <button
        className="button"
          style={{
            ...buttonStyle,
            backgroundColor:
              activeButton === "proteinDisorder" ? "#dd9d35" : "transparent",
          }}
          onClick={handleProteinDisorderClick}
        >
          <span>

          PROTEIN DISORDER <br /> LABORATORY EXPERTISE
          </span>
        </button>
      </div>
      <div style={centerSectionStyle}>
        <div
          className="circle"
          style={circle1Style}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTransform}
        ></div>
        <div
          className="circle"
          style={circle2Style}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTransform}
        ></div>
        <div
          className="circle"
          style={circle3Style}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTransform}
        ></div>
        <img
          src={imageSrc}
          alt="Bruker"
          className={`image ${animationClass}`}
          style={{
            width: "450px",
            height: "auto",
            position: "relative",
            zIndex: 2,
            left: "41%",
            opacity: 1,
          }}
        />
      </div>
      <div className="arrow"></div>
      <button className="redirect-button" onClick={() => navigate('/')}>
        Go
      </button>
    </div>
  );
};

export default PeptoneDesign;
