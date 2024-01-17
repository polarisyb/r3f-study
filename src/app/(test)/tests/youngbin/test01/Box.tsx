"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Box: any = (props: any) => {
  const ref = useRef<any>({});
  // const [hovered, setHover] = useState(false);
  const [count, setCount] = useState(0);

  // 'count' 상태가 변경될 때마다 콜백 함수가 다시 실행된다.
  // 따라서 geometry 배열은 'count' 상태에 따라 새로운 값으로 설정된다.
  // 이에 따라 geometry 의 참조 값도 변경되므로 Three.js의 'uuid'도 변경된다. 
  const geometry = useMemo(
    () => [new THREE.BoxGeometry(), new THREE.SphereGeometry(0.785398)],
    []
  );

  // 최초 렌더링 시에만 useMemo의 콜백 함수가 실행되고, 이후에는 해당 함수가 메모이제이션된 값을 반환한다.
  // 의존성 배열이 빈 배열이므로 'count'의 변경이 발생해도 콜백 함수가 재실행되지 않는다.
  // 따라서 geometry 배열은 최초 한 번만 생성되며, Three.js의 'uuid'도 처음 할당된 값이 유지된다.
  // const geometry = useMemo(
  //   () => [new THREE.BoxGeometry(), new THREE.SphereGeometry(0.785398)],
  //   []
  // );
  /* useFrame((state, delta) => {

    // 각 렌더링 프레임에서 실행될 로직이 들어간다.
    // state를 이용하여 현재 시간, 경과 시간, 카메라 위치 등을 알 수 있다.
    // delta는 이전 프레임에서 현재 프레임까지의 시간이다.
    // delta를 이용하여 각 프레임 간의 시간 간격을 활용할 수 있다.
    if (rotate) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    };

    // state.clock.getElapsedTime()은 현재까지의 경과 시간을 초 단위로 반환한다.
    // ref.current.position.y 는 3D 객체의 y축 좌표를 설정하는데,
    // 여기서는 sin 함수를 이용하여 y축 좌표를 -1 ~ 1 사이로 변화시키고 있다.
    ref.current.position.y = Math.sin(state.clock.getElapsedTime())
  }); */

  useFrame((_, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += 0.5 * delta;
  });

  useEffect(() => {
    console.log(ref.current.geometry.uuid);
  });

  return (
    <>
      <mesh {...props} 
        ref={ref}
        // scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}

        // onPointerDown은 3D 객체에 대한 포인터(클릭) 다운 이벤트가 발생했을 때 실행되는 콜백 함수.
        // setCount((count + 1) % 2)은 현재 count 상태에 1을 더하고 2로 나눈 나머지를 새로운 count로 설정한다.
        // 이를 통해 count를 0과 1 사이의 값으로 유지하면서 클릭할 때마다 0과 1을 번갈아가며 전환한다.
        // %는 나머지 연산자이다.
        onPointerDown={() => setCount((count + 1) % 2)}

        // geometry 속성은 컴포넌트에 대한 기하 도형을 설정한다.
        // 배열로 정의된 geometry에 현재 count 상태를 인덱스로 사용하여 선택도니 기하 도형을 설정한다.
        geometry={geometry[count]}
        // onPointerOver={() => {setHover(true)}}
        // onPointerOut={() => {setHover(false)}}
        // onUpdate={(self) => console.log(self)}
      >
        <boxGeometry />
        <meshBasicMaterial color={'lime'} wireframe />
      </mesh>
    </>
  );
};

export default Box;