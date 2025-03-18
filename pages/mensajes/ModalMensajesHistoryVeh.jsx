import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import { useRouter } from "next/router";

function ModalMensajesHistoryVeh(props) {
    const router = useRouter();

    const {
        shown,
        close,
        titulo,
        mensaje,
        tipo,
    } = props;

    const irAlBuscador = () => {
        router.push("/searchinteractive/searchinteractive");
    };

    const cerrar = () => {
        close(false);
    };

    return shown ? (
        <div
            className="modal-fondo"
            onClick={() => {
                cerrar()
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
                            <div className="iconoventanamensajes mtmenos14">
                                <InfoIcon style={{ fontSize: 45 }} />
                            </div>
                        </Col>
                        <Col xl={9} lg={9} md={9} sm={9}>
                            <div className="ml-40 titulodetaildescription">
                                {titulo}
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodal ml-40 sinborder colorbase"
                                data-dismiss="modal"
                                //onClick={() => close(false)}
                            >
                                {" "}
                            </button>
                        </Col>
                    </Row>
                </div>
                <div className="mt-30 textoventanamensajes">
                    <div>{mensaje}</div>
                </div>
                <div className="ml-150 mt-45">
                    <Row>
                        <Col xl={1} lg={1} md={1} xs={1}></Col>
                        <Col xl={7} lg={7} md={7} xs={7}>
                            <Button
                                variant="outline-light"
                                className="ps-btn redondearborde"
                                onClick={() => irAlBuscador(true)}>
                                {" "}
                                Ir al Buscador Especial
                            </Button>
                        </Col>
                        <Col xl={2} lg={2} md={2} xs={2}>
                            <Button
                                variant="outline-light"
                                className="ps-btn baseinput redondearborde"
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

export default ModalMensajesHistoryVeh;
