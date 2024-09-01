import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Background.css";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from '@react-three/fiber'

const BubbleAnimation = () => {
  const mountRef = useRef(null);
  const navigate = useNavigate();

  const leftSectionStyle = {
    position: "absolute",
    left: "12%",
    top: "23%",
    maxWidth: "20%",
    zIndex: 1,
  };

  const h1Style = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    fontSize: "4.5em",
    margin: 0,
    fontFamily: "Mate",
    position: "relative",
  };

  const pStyle = {
    marginTop: "20px",
    color: "#bfbfbf",
    fontFamily: "Mate",
    fontWeight: 800,
    fontSize: "16px",
    position: "relative",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-block",
    marginTop: "20px",
    fontFamily: "Mate",
    fontSize: "18px",
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setClearColor("#2d2b36");
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const colors = [0x4d74be, 0xea9a4f];
    const bubbles = [];
    const initialPositions = [];
    const spacing = 6;

    const angle = THREE.MathUtils.degToRad(75);
    const smoothFactor = 0.1;

    for (let i = 0; i < 50; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 2 + 2, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.7,
        transparent: true,
      });
      const bubble = new THREE.Mesh(geometry, material);

      const x = i * spacing - 100;
      const y = 0;
      const initialPosition = {
        x: x * Math.cos(angle) - y * Math.sin(angle),
        y: x * Math.sin(angle) + y * Math.cos(angle),
        z: 0,
      };

      bubble.position.set(
        initialPosition.x,
        initialPosition.y,
        initialPosition.z
      );
      scene.add(bubble);
      bubbles.push(bubble);
      initialPositions.push(initialPosition);

      bubble.userData = {
        isHovered: false,
        moveDirection: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          0
        ).normalize(),
        moveSpeed: Math.random() * 0.4 + 0.2,
        rotationSpeed: new THREE.Vector3(
          Math.random() * 0.02,
          Math.random() * 0.02,
          Math.random() * 0.02
        ),
      };

      // Create small orbiting bubbles
      const smallBubbles = [];
      for (let j = 0; j < 5; j++) {
        const smallBubbleGeometry = new THREE.SphereGeometry(
          Math.random() * 0.5 + 0.5,
          32,
          32
        );
        const smallBubbleMaterial = new THREE.MeshBasicMaterial({
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0.7,
          transparent: true,
        });
        const smallBubble = new THREE.Mesh(
          smallBubbleGeometry,
          smallBubbleMaterial
        );
        bubble.add(smallBubble);
        smallBubbles.push(smallBubble);
      }
      bubble.userData.smallBubbles = smallBubbles;
    }

    camera.position.z = 30;

    const mouse = new THREE.Vector2();
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const raycaster = new THREE.Raycaster();

    const animate = () => {
      requestAnimationFrame(animate);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      bubbles.forEach((bubble) => (bubble.userData.isHovered = false));

      intersects.forEach((intersect) => {
        if (bubbles.includes(intersect.object)) {
          intersect.object.userData.isHovered = true;
        }
      });

      while (scene.children.length > bubbles.length) {
        scene.remove(scene.children[bubbles.length]);
      }

      bubbles.forEach((bubble, index) => {
        const initialPosition = initialPositions[index];
        const targetPosition = bubble.userData.isHovered
          ? bubble.position
              .clone()
              .add(
                bubble.userData.moveDirection
                  .clone()
                  .multiplyScalar(bubble.userData.moveSpeed * 10) 
              )
          : new THREE.Vector3(
              initialPosition.x,
              initialPosition.y,
              bubble.position.z
            );

        bubble.position.lerp(targetPosition, smoothFactor);
        bubble.rotation.x += bubble.userData.rotationSpeed.x;
        bubble.rotation.y += bubble.userData.rotationSpeed.y;
        bubble.rotation.z += bubble.userData.rotationSpeed.z;

        // Animate small bubbles around main bubble only on hover
        // bubble.userData.smallBubbles.forEach((smallBubble, idx) => {
        //   const angle = (idx / bubble.userData.smallBubbles.length) * Math.PI * 2;
        //   const radius = 10; // Radius of the orbit
        //   if (bubble.userData.isHovered) {
        //     smallBubble.position.set(
        //       Math.cos(angle + Date.now() * 0.001) * radius,
        //       Math.sin(angle + Date.now() * 0.001) * radius,
        //       0
        //     );
        //   } else {
        //     smallBubble.position.set(
        //       Math.cos(angle) * radius,
        //       Math.sin(angle) * radius,
        //       0
        //     );
        //   }
        // });

        if (index > 0) {
          const prevBubble = bubbles[index - 1];
          const distanceBetween = bubble.position.distanceTo(
            prevBubble.position
          );
          const minDistance = 0.5;
          if (distanceBetween < minDistance) {
            const overlap = minDistance - distanceBetween;
            const direction = bubble.position
              .clone()
              .sub(prevBubble.position)
              .normalize();
            bubble.position.add(direction.multiplyScalar(overlap / 2));
            prevBubble.position.sub(direction.multiplyScalar(overlap / 2));
          }

          const points = [];
          points.push(prevBubble.position);
          points.push(bubble.position);

          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const lineMaterial = new THREE.LineBasicMaterial({
            color: "#2d2b36",
            opacity: 0.1,
            transparent: true,
          });
          const line = new THREE.Line(lineGeometry, lineMaterial);
          scene.add(line);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} className="background">
      <div style={leftSectionStyle}>
        <h1 style={h1Style}>Bringing order to disorder</h1>
        <p style={pStyle}>
          We are a translational biophysics company focusing on the discovery of
          novel therapeutics against intrinsically disordered proteins.
        </p>
        {/* <a href="#" style={linkStyle}>
          Learn More &gt;
        </a> */}
      </div>
      <div className="arrow"></div>
      <button className="redirect-button" onClick={() => navigate("/page2")}>
        Go
      </button>
    </div>
  );
};

export default BubbleAnimation;
