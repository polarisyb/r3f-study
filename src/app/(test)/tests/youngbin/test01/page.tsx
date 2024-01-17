"use client";

import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import Box from "./Box";
import styles from "./page.module.scss";
import Polyhedron from "./Polyhedron";
import * as THREE from 'three';
import { Stats, OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';

const Page = () => {

  const color = useControls({
    value: 'black',
  });

  const polyhedron = [
    new THREE.BoxGeometry(),
    new THREE.SphereGeometry(0.785398),
    new THREE.DodecahedronGeometry(0.785398),
  ];

  const options = useMemo(() => {
    return {
      x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      visible: true,
      color: { value: 'lime' },
    }
  }, []);

  const pA = useControls('Polyhedron A', options);
  const pB = useControls('Polyhedron B', options);

  return (
    <>
      <div className={styles.container}>
        <Canvas camera={{ position: [-1, 4, 2.5] }}>
          <color attach="background" args={[color.value]} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {/* <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
          <Box position={[-3.2, 0, 0]} />
          <Box position={[3.2, 0, 0]} /> */}
          <Polyhedron
            position={[-1, 1, 0]}
            rotation={[pA.x, pA.y, pA.z]}
            visible={pA.visible}
            color={pA.color}
            polyhedron={polyhedron}
          />
          <Polyhedron
            position={[1, 1, 0]}
            rotation={[pB.x, pB.y, pB.z]}
            visible={pB.visible}
            color={pB.color}
            polyhedron={polyhedron}
          />

          {/* 
            Stats

            showPanel 은 처음에 렌더링되는 패널을 설정한다. 기본 값은 0이다.
            또한 props로 className을 설정하여 스타일링할 수 있다.
            showPanel={0} : fps
            showPanel={1} : ms
            showPanel={2} : mb
          */}
          <Stats showPanel={0} className="stats-panel" />
          <OrbitControls />
          <axesHelper args={[5]}/>
          <gridHelper />
          {/* <Perf position="top-center" /> */}
        </Canvas>
      </div>
    </>
  );
};

export default Page;