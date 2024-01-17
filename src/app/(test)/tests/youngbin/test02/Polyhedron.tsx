"use client";

import { useRef } from 'react'
import { useControls } from 'leva'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const Polyhedron = ({ polyhedron, color, ...props }: any) => {
  const ref = useRef<any>({});

  useFrame((_, delta) => {
    ref.current.rotation.x += 0.2 * delta
    ref.current.rotation.y += 0.05 * delta
  })

  // useControls
  // 레바(Leva)를 이용하여 컴포넌트의 프로퍼티를 컨트롤할 수 있게 해주는 훅.
  // 레바는 컴포넌트의 프로퍼티를 컨트롤하는 UI를 제공한다.
  // 레바를 이용하면 컴포넌트의 프로퍼티를 변경하면서 렌더링 결과를 실시간으로 확인할 수 있다.
  // 레바는 컴포넌트의 프로퍼티를 변경할 때마다 컴포넌트를 다시 렌더링한다.
  useControls(props.name, {
    wireframe: {
      value: false,
      onChange: (v) => {
        ref.current.material.wireframe = v
        console.log(ref.current.material.uuid)
      },
    },
    flatShading: {
      value: true,
      onChange: (v) => {
        ref.current.material.flatShading = v
        ref.current.material.needsUpdate = true
      },
    },
    color: {
      value: 'lime',
      onChange: (v) => {
        ref.current.material.color = new THREE.Color(v)
      },
    },
  })

  return (
    <mesh {...props} ref={ref}>
      <icosahedronGeometry args={[1, 1]} />
    </mesh>
  )
};

export default Polyhedron;