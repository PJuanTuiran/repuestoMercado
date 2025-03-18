import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Cars({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('./carmazda.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0.97, 0.01, 0]} rotation={[-Math.PI / 2, -0.01, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials['12___Default']} />
        <mesh geometry={nodes.Object_3.geometry} material={nodes.Object_3.material} />
        <mesh geometry={nodes.Object_4.geometry} material={nodes.Object_4.material} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.glass} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.glass_clear} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.glass_yellow} />
        <mesh geometry={nodes.Object_8.geometry} material={materials.plastic_matt} />
        <mesh geometry={nodes.Object_9.geometry} material={materials.shadow} />
        <mesh geometry={nodes.Object_10.geometry} material={nodes.Object_10.material} />
        <mesh geometry={nodes.Object_11.geometry} material={nodes.Object_11.material} />
        <mesh geometry={nodes.Object_12.geometry} material={nodes.Object_12.material} />
        <mesh geometry={nodes.Object_13.geometry} material={nodes.Object_13.material} />
        <mesh geometry={nodes.Object_14.geometry} material={nodes.Object_14.material} />
        <mesh geometry={nodes.Object_15.geometry} material={nodes.Object_15.material} />
        <mesh geometry={nodes.Object_16.geometry} material={materials.glass_red} />
        <mesh geometry={nodes.Object_17.geometry} material={materials.glass_white} />
        <mesh geometry={nodes.Object_18.geometry} material={nodes.Object_18.material} />
        <mesh geometry={nodes.Object_19.geometry} material={nodes.Object_19.material} />
        <mesh geometry={nodes.Object_20.geometry} material={nodes.Object_20.material} />
        <mesh geometry={nodes.Object_21.geometry} material={nodes.Object_21.material} />
        <mesh geometry={nodes.Object_22.geometry} material={nodes.Object_22.material} />
        <mesh geometry={nodes.Object_23.geometry} material={nodes.Object_23.material} />
        <mesh geometry={nodes.Object_24.geometry} material={nodes.Object_24.material} />
        <mesh geometry={nodes.Object_25.geometry} material={nodes.Object_25.material} />
        <mesh geometry={nodes.Object_26.geometry} material={nodes.Object_26.material} />
        <mesh geometry={nodes.Object_27.geometry} material={nodes.Object_27.material} />
        <mesh geometry={nodes.Object_28.geometry} material={nodes.Object_28.material} />
        <mesh geometry={nodes.Object_29.geometry} material={nodes.Object_29.material} />
        <mesh geometry={nodes.Object_30.geometry} material={nodes.Object_30.material} />
        <mesh geometry={nodes.Object_31.geometry} material={nodes.Object_31.material} />
        <mesh geometry={nodes.Object_32.geometry} material={nodes.Object_32.material} />
        <mesh geometry={nodes.Object_33.geometry} material={nodes.Object_33.material} />
      </group>
    </group>
  )
}

useGLTF.preload('/carmazda.gltf')
