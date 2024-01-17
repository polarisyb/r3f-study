"use client";

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const Polyhedron = ({ polyhedron, color, ...props }: any) => {
  const ref = useRef<any>({});
  const [count, setCount] = useState(0);

  // useFrame
  // 렌더링이 발생할 때마다 호출되는 훅으로,
  // 컴포넌트의 상태나 프로퍼티가 변경되지 않더라도 계속해서 호출된다.
  // 그렇기 때문에 useFrame 내에서 렌더링 시 마다 객체를 생성하는 것은 성능상 이슈를 발생시킬 수 있다.
  useFrame((_, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += 0.5 * delta
  });

  return (
    <mesh
      {...props}
      ref={ref}
      position={props.position}
      onPointerDown={() => {
        setCount((count + 1) % 3)
      }}
      geometry={polyhedron[count]}
    >
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
};

export default Polyhedron;