import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {getControlAcceso} from "../../store/controlacceso/action"

function ModalDenegarAcceso(props) {
    const dispatch = useDispatch();
    const { shown, close, titulo, mensaje, tipo } = props;
    const router = useRouter();

    const cerrar = () => {
        dispatch(getControlAcceso(1));
        close(false);
        //router.push(`/search?keyword=${""}`);
        router.push("/");
    };

    return shown ? (
        <div
            className="modal-fondo mtmenos15"
            onClick={() => {
                cerrar();
            }}>
            <div
                className="modal-mensajes-login redondearventamensajes "
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Row>
                        <Col xl={1} lg={1} md={1} sm={1}>
                           
                        </Col>
                        <Col xl={9} lg={9} md={9} sm={9}>
                            <div className="ml-30 titulodetaildescription">
                                {titulo}
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodal ml-40 sinborder colorbase"
                                data-dismiss="modal"
                                onClick={() => cerrar()}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                </div>
                <div className="mt-30 textoventanamensajesdos">
                    <div>{mensaje}</div>
                </div>
                <div className="ml-340">
                    <Row>
                        <Col xl={4} lg={4} md={4} xs={4}></Col>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <Button
                                variant="outline-light"
                                className="ps-btn redondearborde"
                                onClick={() => cerrar()}>
                                {" "}
                                Cerrar
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalDenegarAcceso;
