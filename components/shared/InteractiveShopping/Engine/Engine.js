import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Motor from "./Motor";

function Engine(props) {
    return (
        <div style={{ width: '100%', height: "70vh" }}>
            <Canvas camera={{ zoom: 150, position: [250, 120, 250] }}>
                <pointLight position={[35, 35, 0]} intensity={0.5} />
                <pointLight position={[-35, 35, 0]} intensity={0.5} />
                <Suspense fallback={null} >
                    <Motor />
                </Suspense>
                <ambientLight />
                <OrbitControls />
            </Canvas>
        </div>
    );
}

export default Engine;
