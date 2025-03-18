import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
//import Cars from "./Cars";
import Cars from "./Modelo";
import Engine from "../Engine/Engine";
import ApuntadorMotor from "./ApuntadorMotor";
import ApuntadorMonocasco from "./ApuntadorMonocasco";
import ApuntadorMonocasco2 from "./ApuntadorMonocasco2";
import ApuntadorTrasero from "./ApuntadorTrasero";
import { Modal, Button, Row, Col } from "react-bootstrap";

const options = [
    { label: "Refrigeración", value: 1 },
    { label: "Sistema de Escape", value: 2 },
    { label: "Arbol de Levas", value: 3, disabled: true },
    { label: "Culata y Valvulas", value: 4, disabled: true },
    { label: "Carter Inferior", value: 5, disabled: true },
];

const refrigeracion = [
    { label: "El radiador", value: 1 },
    { label: "Los manguitos", value: 2 },
    { label: "La bomba de agua", value: 3, disabled: true },
    { label: "El termostato", value: 4, disabled: true },
    { label: "El ventilador", value: 5, disabled: true },
    { label: "El líquido refrigerante", value: 6, disabled: true },
    { label: "Reloj de temperatura", value: 7, disabled: true }
];

function Carros(props) {
    const [showModal, setShowModal] = useState(false);
    const [showParte, setShowParte] = useState(false);
    const [nombreParte, setNombreParte] = useState('Componentes Refrigeración');
    //console.log("VALOR TEM : ", showModal)

    const handleChange = (e) => {
        console.log("CODIGO PARTE MOTOR : ", e)
        setShowParte(true);
        if (e === 1)
            setNombreParte("Refrigeración")
        else
            if (e === 2)
                setNombreParte("Sistema de Escape")
            else
                if (e === 3)
                    setNombreParte("Arbol de Levas")
                else
                    if (e === 4)
                        setNombreParte("Culata y Valvulas")
                    else
                        if (e === 5)
                            setNombreParte("Carter Inferior")
    }

    return (
        <div style={{ width: '100%', height: "70vh" }}>
            <h2> Buscador Interactivo </h2>
            <Canvas camera={{ zoom: 1, position: [250, 120, 250] }}>
                <pointLight position={[35, 35, 0]} intensity={0.5} />
                <pointLight position={[-35, 35, 0]} intensity={0.5} />
                <Suspense fallback={null} >
                    <Cars />
                </Suspense>
                <ambientLight />
                <ApuntadorMotor setShowModal={setShowModal} position={[6, 80, 200]} />
                <ApuntadorMonocasco position={[95, 60, 0]} />
                <ApuntadorMonocasco2 position={[-95, 60, 0]} />
                <ApuntadorTrasero position={[2, 100, -190]} />
                <OrbitControls />
            </Canvas>

            <Modal size="lg" show={showModal}>
                <Modal.Header closeButton>
                    <h2>Motor del Vehiculo</h2>
                </Modal.Header>
                <Modal.Body>
                    <h2> Partes del Motor </h2>
                    <div >
                        <Row>
                            <Col
                                xs={{
                                    order: "firts",
                                }}
                                lg={3} >
                                <select
                                    //disabled="disabled"
                                    className="custom-select ps-form__labelselect"
                                    onChange={(e) =>
                                        handleChange(
                                            e.target
                                                .value
                                        )
                                    }>
                                    <option
                                        selected
                                        className="select-fontsize ps-form__label">
                                        Componentes del Motor
                                    </option>
                                    {options &&
                                        options.map(
                                            (
                                                itemselect
                                            ) => {
                                                return (
                                                    <option
                                                        value={itemselect.value}>
                                                        {itemselect.label}
                                                    </option>
                                                );
                                            }
                                        )}
                                </select>
                            </Col>
                            {
                                showParte ?
                                    (
                                        <Col
                                            xs={{
                                                order: "firts",
                                            }}
                                            lg={3} >
                                            <select
                                                //disabled="disabled"
                                                className="custom-select ps-form__labelselect"
                                                onChange={(e) =>
                                                    handleChange(
                                                        e.target
                                                            .value
                                                    )
                                                }>
                                                <option
                                                    selected
                                                    className="select-fontsize ps-form__label">
                                                    {nombreParte}
                                                </option>
                                                {refrigeracion &&
                                                    refrigeracion.map(
                                                        (
                                                            itemselect
                                                        ) => {
                                                            return (
                                                                <option
                                                                    value={itemselect.value}>
                                                                    {itemselect.label}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </Col>
                                    )
                                    :
                                    (
                                        null
                                    )
                            }
                        </Row>
                    </div>
                    <Engine />
                </Modal.Body>
                <Modal.Footer>
                    <Button> Aceptar </Button>
                    <Button onClick={() => setShowModal(false)} > Cancelar </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Carros;
/*
 <Canvas camera={{ zoom: 1, position: [250, 120, 250] }}>
                <pointLight position={[35, 35, 0]} intensity={0.5} />
                <pointLight position={[-35, 35, 0]} intensity={0.5} />
                <Suspense fallback={null} >
                    <Cars />
                </Suspense>
                <OrbitControls />
                <ambientLight intensity={0.5} />

            </Canvas>
*/