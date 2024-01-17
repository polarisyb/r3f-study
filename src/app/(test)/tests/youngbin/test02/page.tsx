"use client";

import React, { useMemo } from "react";
import styles from "./page.module.scss";
import { Canvas } from '@react-three/fiber'
import Polyhedron from './Polyhedron'
import * as THREE from 'three'
import { Stats, OrbitControls } from '@react-three/drei'

const Page = () => {

  return (
    <>
      <div className={styles.container}>
        <Canvas camera={{ position: [-1, 4, 2.5] }}>
          <directionalLight position={[1, 1, 1]} />
          <Polyhedron
            name="meshBasicMaterial"
            position={[-3, 1, 0]}
            material={new THREE.MeshBasicMaterial()}
          />
          {/* <Polyhedron
            name="meshNormalMaterial"
            position={[-1, 1, 0]}
            material={new THREE.MeshNormalMaterial()}
          />
          <Polyhedron
            name="meshPhongMaterial"
            position={[1, 1, 0]}
            material={new THREE.MeshPhongMaterial()}
          /> */}
          <Polyhedron
            name="meshStandardMaterial"
            position={[3, 1, 0]}
            material={new THREE.MeshStandardMaterial()}
          />
          <Stats showPanel={0} className="stats-panel" />
          <OrbitControls />
          <axesHelper args={[5]}/>
          <gridHelper />
        </Canvas>
      </div>
    </>
  );
};

export default Page;