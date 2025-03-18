import ReactDOM from 'react-dom';
import React, { Fragment, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import ModalEngine from '../ModalEngine';

function ApuntadorMotor(props) {
    // This reference will give us direct access to the mesh
    const { setShowModal } = props;

    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    // useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
    // Return view, these are regular three.js elements expressed in JSX

    // Coloca en verdadero la modal para mostrar el 3D del Motor 
    const modalMotor = () => {
        setShowModal(true)
    }

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 20}
            onClick={() => modalMotor()}
            onPointerOver={(event) => () => alert('azul')}
        //onPointerOut={() => alert("Ir a partes del Motor")}
        > 
            <boxGeometry attach="geometry"  args={[1, .5, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : '#2D2E83'} />
        </mesh>
    )
}
// onClick={(event) => setActive(!active)}
//<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
export default ApuntadorMotor;

// <circleGeometry args={[1, 58]} />