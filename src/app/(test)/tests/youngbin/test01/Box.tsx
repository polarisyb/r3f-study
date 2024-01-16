"use client";

import { useRef, useEffect } from "react";

const Box: any = (props: any) => {
  const ref = useRef<any>({});
  console.log(ref);

  return (
    <>
      <mesh {...props} ref={ref}>
        <boxGeometry />
        <meshBasicMaterial color={0x00ff00} wireframe />
      </mesh>
    </>
  );
};

export default Box;