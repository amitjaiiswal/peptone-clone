// src/Bubbles.js
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Bubble = ({ position, color }) => {
  const mesh = useRef();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setScale(Math.random() * 0.5 + 0.5);
  }, []);

  useFrame(() => {
    mesh.current.position.y += 0.01; // Move bubbles upward
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
    if (mesh.current.position.y > 5) {
      mesh.current.position.y = -5; // Reset position when it goes off screen
    }
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Three = () => {
  const bubbleColors = ['#7d9cd3', '#f5af65'];

  const generateBubble = () => {
    const x = (Math.random() - 0.5) * 10;
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 10;
    const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
    return { position: [x, y, z], color };
  };

  const bubbles = new Array(50).fill().map(() => generateBubble());

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {bubbles.map((bubble, index) => (
        <Bubble key={index} position={bubble.position} color={bubble.color} />
      ))}
    </Canvas>
  );
};

export default Three;
