import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import CheckIcon from "@material-ui/icons/Check";
import { useRouter } from "next/router";

function ModalMensajesChat(props) {
    const { shown, close, titulo, mensaje, tipo, setActivarCity, textoBoton, textoBotonDos} =
        props;
    const router = useRouter();

    const cerrar = () => {
        close(false);
        //router.push(`/search?keyword=${""}`);
        router.push("/");
    };

    const miscompras = () => {
        close(false);
        //router.push(`/search?keyword=${""}`);
        router.push("/MisCompras/misCompras");
    };

    return shown ? (
        <div
            className="modal-fondo-city mtmenos15"
            onClick={() => {
                cerrar();
            }}>
            <div
                className="modal-mensajes-chat redondearventamensajes"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Row>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <div className="iconoventanamensajescontact mtmenos14">
                                <CheckIcon
                                    className="ml-2 mtmenos25"
                                    style={{ fontSize: 35 }}
                                />
                            </div>
                        </Col>
                        <Col xl={10} lg={10} md={10} sm={10}>
                            <div className="ml-40 titulodetaildescription">
                                {titulo}
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodalcontact sinborder colorbase"
                                data-dismiss="modal"
                                onClick={() => cerrar()}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                </div>
                <div className="mt-25 textoventanamensajesdos">
                    <div>{mensaje}</div>
                </div>
                <div className="ml-150 mt-20">
                    <Row>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <Button
                                variant="outline-light"
                                className="botonchatir redondearborde"
                                onClick={() => miscompras()}>
                                {" "}
                                {textoBoton}
                            </Button>
                        </Col>
                        <Col xl={4} lg={4} md={4} xs={4}>
                            <Button
                                variant="outline-light"
                                className="botonchatmiscompras redondearborde"
                                onClick={() => cerrar()}>
                                {" "}
                                {textoBotonDos}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalMensajesChat;
