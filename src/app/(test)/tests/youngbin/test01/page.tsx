"use client";

import React from "react"
import { Canvas } from "@react-three/fiber";
import Box from "./Box";
import styles from "./page.module.scss";

const Page = () => {
  return (
    <>
      <div className={styles.container}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
      </div>
    </>
  );
};

export default Page;