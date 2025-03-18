import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/engine.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0.54, 0, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.Object_4.geometry} material={nodes.Object_4.material} />
            <mesh geometry={nodes.Object_5.geometry} material={nodes.Object_5.material} />
            <mesh geometry={nodes.Object_6.geometry} material={nodes.Object_6.material} />
            <mesh geometry={nodes.Object_7.geometry} material={nodes.Object_7.material} />
            <mesh geometry={nodes.Object_8.geometry} material={nodes.Object_8.material} />
            <mesh geometry={nodes.Object_9.geometry} material={nodes.Object_9.material} />
            <mesh geometry={nodes.Object_10.geometry} material={nodes.Object_10.material} />
            <mesh geometry={nodes.Object_11.geometry} material={nodes.Object_11.material} />
          </group>
          <group position={[-0.41, 0, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.Object_13.geometry} material={nodes.Object_13.material} />
            <mesh geometry={nodes.Object_14.geometry} material={nodes.Object_14.material} />
            <mesh geometry={nodes.Object_15.geometry} material={nodes.Object_15.material} />
            <mesh geometry={nodes.Object_16.geometry} material={nodes.Object_16.material} />
            <mesh geometry={nodes.Object_17.geometry} material={nodes.Object_17.material} />
            <mesh geometry={nodes.Object_18.geometry} material={nodes.Object_18.material} />
            <mesh geometry={nodes.Object_19.geometry} material={nodes.Object_19.material} />
            <mesh geometry={nodes.Object_20.geometry} material={nodes.Object_20.material} />
            <mesh geometry={nodes.Object_21.geometry} material={materials['Material.003']} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/engine.gltf')
