import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";

function ModalMensajesImagenes(props) {
    const {
        shown,
        close,
        titulo,
        textouno,
        textodos,
        textotres,
        textocuatro,
        mensaje,
        tipo,
        contadortexto,
        mensajeUno,
        mensajeDos,
    } = props;

    //console.log("CONTADOR TEXTO : ", mensajeUno)

    console.log(
        "TIPO : ",
        textouno,
        "DIMENSION : ",
        textodos,
        "PROPORCION : ",
        textotres,
        "LONGITUD : ",
        textocuatro
    );

    const cerrar = () => {
        shown(false);
        close(false);
    };

    return shown ? (
        <div
            className="modal-fondo mtmenos15"
            onClick={() => {
                close(false);
            }}>
            <div
                className="modal-mensajes-imagenes redondearventamensajes "
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Row>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <div className="iconoventanamensajes">
                                <InfoIcon style={{ fontSize: 45 }} />
                            </div>
                        </Col>
                        <Col xl={9} lg={9} md={9} sm={9}>
                            <div className="ml-40 titulodetaildescriptionimagenes">
                                {titulo}
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodalbuscar ml-55 sinborder colorbase"
                                data-dismiss="modal"
                                onClick={() => close(false)}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                </div>

                <div className="mt-25">
                    <div className={mensajeUno}>
                        <h4>{mensaje}</h4>
                    </div>
                </div>
                <div className="cajamodalmensajesimagenes">
                    {textouno ? (
                        <div className={mensajeDos}>{textouno}</div>
                    ) : null}

                    {textodos ? (
                        <div className={mensajeDos}>{textodos}</div>
                    ) : null}

                    {textotres ? (
                        <div className={mensajeDos}>{textotres}</div>
                    ) : null}

                    {textocuatro ? (
                        <div className={mensajeDos}>{textocuatro}</div>
                    ) : null}
                </div>
                <div className="ml-580 mt-1">
                    <Row>
                        <Col xl={4} lg={4} md={4} xs={4}></Col>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <Button
                                variant="outline-light"
                                className="ps-btn redondearborde"
                                onClick={() => close(false)}>
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

export default ModalMensajesImagenes;
