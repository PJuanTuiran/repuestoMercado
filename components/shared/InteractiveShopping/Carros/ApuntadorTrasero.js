import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function ApuntadorTrasero(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  //useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 20}
      onClick={(event) => alert("Ir a Guarda Trasero y Maletero")}
      onPointerOver={(event) => () => alert('azul')}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry attach="geometry"  args={[5, .5, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : '#2D2E83'} />
    </mesh>
  )
}
// onClick={(event) => setActive(!active)}
//<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
export default ApuntadorTrasero;