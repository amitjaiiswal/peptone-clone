import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Bubble = ({ position, color }) => {
  const mesh = useRef();
  useFrame(() => (mesh.current.position.y += 0.01));

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const PageOneBubble = () => {
  const bubbles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 20 - 10;
      const y = Math.random() * 20 - 10;
      const z = Math.random() * 20 - 10;
      const color = Math.random() > 0.5 ? '#7d9cd3' : '#f5af65';
      temp.push({ position: [x, y, z], color });
    }
    return temp;
  }, []);

  return (
    <Canvas style={{ height: '100vh', width: '100vw' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {bubbles.map((bubble, index) => (
        <Bubble key={index} position={bubble.position} color={bubble.color} />
      ))}
    </Canvas>
  );
};

export default PageOneBubble;
