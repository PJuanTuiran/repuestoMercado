import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";

function ModalMensajesDctosNit(props) {
    const { shown, close, titulo, mensaje, tipo, setMostrarSubirDctos } = props;

    const subirDctos = () => {
        setMostrarSubirDctos(true);
        close(false);
    };

    const cerrar = () => {
        setMostrarSubirDctos(false);
        close(false);
    };

    return shown ? (
        <div
            className="modal-fondo mtmenos15"
            onClick={() => {
                close(false);
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
                            <div className="ml-30 titulodetaildescription">
                                {titulo}
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodal ml-40 sinborder colorbase"
                                data-dismiss="modal"
                                onClick={() => close(false)}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                </div>
                <div className="mt-30 textoventanamensajesdos">
                    <div>{mensaje}</div>
                </div>
                <div>
                    <Row>
                        <Col xl={8} lg={8} md={8} xs={12}>
                            <div
                                //variant="outline-light"
                                className="btncancelarsubirdcto"
                                onClick={() => cerrar()}>
                                {" "}
                                Cancelar
                            </div>
                        </Col>
                        <Col xl={3} lg={3} md={3} xs={12}>
                            <div
                                //variant="outline-light"
                                className="btnaceptarsubirdcto"
                                onClick={() => subirDctos()}>
                                {" "}
                                Aceptar
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalMensajesDctosNit;
