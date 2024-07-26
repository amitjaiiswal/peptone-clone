import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import "./PeptoneDesign.css";
import BubblePeptone from "./PeptoneBubble";
import { useNavigate, useLocation } from "react-router-dom";
import defaultImage from "../src/assets/1.png";
import "./Background.css";

const PeptoneDesign = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [backgroundColor, setBackgroundColor] = useState("#292838");
  const [circleColors, setCircleColors] = useState({
    circle1: "#2b2d5a",
    circle2: "#30357f",
    circle3: "#313990",
  });
  const [activeButton, setActiveButton] = useState("proprietaryExperiments");
  // const [imageSrc, setImageSrc] = useState();

  const containerRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(
    new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
  );
  const rendererRef = useRef(new THREE.WebGLRenderer({ antialias: true }));
  const planeRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background-color",
      backgroundColor
    );
    document.documentElement.style.setProperty(
      "--circle1-color",
      circleColors.circle1
    );
    document.documentElement.style.setProperty(
      "--circle2-color",
      circleColors.circle2
    );
    document.documentElement.style.setProperty(
      "--circle3-color",
      circleColors.circle3
    );
  }, [backgroundColor, circleColors]);

  useEffect(() => {
    const container = containerRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    renderer.setClearColor(new THREE.Color(backgroundColor));

    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "8%";

    camera.position.z = 4;

    const createCircle = (radius, color, zIndex) => {
      const geometry = new THREE.CircleGeometry(radius, 64);
      const material = new THREE.MeshBasicMaterial({ color });
      const circle = new THREE.Mesh(geometry, material);
      circle.position.set(1.5, 0, zIndex);
      scene.add(circle);
    };

    createCircle(5, circleColors.circle1, -1);
    createCircle(2.8, circleColors.circle2, -0.5);
    createCircle(1.5, circleColors.circle3, 0);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const centerY = containerRect.top + containerRect.height / 2;
      const offsetX = (clientX - centerX) / centerX;
      const offsetY = (clientY - centerY) / centerY;

      gsap.to(scene.rotation, {
        y: offsetX * 0.09,
        x: -offsetY * 0.09,
        duration: 0.5,
        ease: "power1.out",
      });

      if (planeRef.current) {
        gsap.to(planeRef.current.rotation, {
          y: offsetX * 0.2,
          x: -offsetY * 0.2,
          duration: 0.5,
          ease: "power1.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeChild(renderer.domElement);
      if (planeRef.current) {
        scene.remove(planeRef.current);
        planeRef.current.geometry.dispose();
        planeRef.current.material.dispose();
        planeRef.current = null;
      }
    };
  }, [backgroundColor, circleColors]);

  const handleClick = (backgroundColor, circleColors, button, imageSrc) => {
    setBackgroundColor(backgroundColor);
    setCircleColors(circleColors);
    setActiveButton(button);
    const textureLoader = new THREE.TextureLoader();

    if (planeRef.current) {
      sceneRef.current.remove(planeRef.current);
      planeRef.current.geometry.dispose();
      planeRef.current.material.dispose();
      planeRef.current = null;
    }

    textureLoader.load(imageSrc, (texture) => {
      const geometry = new THREE.PlaneGeometry(
        3,
        3 * (texture.image.height / texture.image.width)
      );
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
      });
      const plane = new THREE.Mesh(geometry, material);
      plane.position.set(1.3, 0, 1);
      sceneRef.current.add(plane);
      planeRef.current = plane;
    });
  };

  const handleNextGenerationClick = () => {
    handleClick(
      "#1d464a",
      {
        circle1: "#204b41",
        circle2: "#1e5747",
        circle3: "#1d5f49",
      },
      "nextGeneration",
      "../src/assets/3.png"
    );
  };

  const handleProteinDisorderClick = () => {
    handleClick(
      "#a74f38",
      {
        circle1: "#aa6038",
        circle2: "#a96b37",
        circle3: "#ac7e36",
      },
      "proteinDisorder",
      "../src/assets/2.png"
    );
  };

  const handleProprietaryExperimentsClick = () => {
    handleClick(
      "#292838",
      {
        circle1: "#2c2e61",
        circle2: "#2e3476",
        circle3: "#333a95",
      },
      "proprietaryExperiments",
      defaultImage
    );
  };


  return (
    <div
      className="container"
      style={{
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        backgroundColor: backgroundColor || "#292838",
      }}
      ref={containerRef}
    >
      {/* <div className="grain"></div> */}
      <div
        style={{
          position: "absolute",
          left: "12%",
          top: "23%",
          maxWidth: "16%",
          zIndex: 1,
        }}
      >
        <BubblePeptone />
        <h1
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontSize: "4.5em",
            margin: 0,
            fontFamily: "Mate",
            position: "relative",
          }}
        >
          Physics meets biology
        </h1>
        <p
          style={{
            marginTop: "20px",
            color: "#bfbfbf",
            fontFamily: "Mate",
            fontWeight: 800,
            fontSize: "16px",
          }}
        >
          Peptone has multiple core capabilities that define and protect our
          unique approach to therapeutic development for challenging IDP
          targets.
        </p>
        <a
          href="#"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
            display: "inline-block",
            marginTop: "20px",
            fontFamily: "Mate",
            fontSize: "18px",
          }}
        >
          Oppenheimer Platform &gt;
        </a>
      </div>
      <div
        style={{
          position: "absolute",
          top: "28%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "44px",
          zIndex: 3,
          flexDirection: "column",
        }}
      >
        <button
          className="button"
          id="mainButton"
          style={{
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
      <div className="arrow"></div>
      <button className="redirect-button" onClick={() => navigate("/")}>
        Go
      </button>
    </div>
  );
};

export default PeptoneDesign;
