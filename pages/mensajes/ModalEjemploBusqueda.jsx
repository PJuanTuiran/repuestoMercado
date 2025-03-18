import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";

function ModalEjemploBusqueda(props) {
    const { shown, close, titulo, mensaje, tipo } = props;

    return shown ? (
        <div
            className="modal-fondo"
            onClick={() => {
                close(false);
            }}>
            <div
                className="modal-ejemplo-busqueda redondearventamensajes"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Row>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <div className="ml-10 iconoventanamensajes mtmenos20">
                                <InfoIcon style={{ fontSize: 45 }} />
                            </div>
                        </Col>
                        <Col xl={9} lg={9} md={9} sm={9}>
                            <div className="ml-40 mtmenos10 titulodetaildescription">
                                {titulo}
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodal ml-50 sinborder colorbase"
                                data-dismiss="modal"
                                onClick={() => close(false)}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                </div>
                <div className="ml-12 mt-15">
                    <Row>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <p className="textotituloayudabusqueda pl-3 pt-2">
                                Criterio de búsqueda
                            </p>
                        </Col>
                        <Col xl={6} lg={6} md={6} xs={6} className="mlmenos18">
                            <p className="textotituloayudabusquedados pl-3 pt-2">
                                Ejemplo
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <p className="textoitemoayudabusqueda">
                                Nombre del producto + Especificaciones del
                                vehículo
                            </p>
                        </Col>
                        <Col xl={6} lg={6} md={6} xs={6} className="mlmenos18">
                            <p className="textoitemoayudabusqueda">
                                Disco de freno Chevrolet Aveo 2009
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <p className="textoitemoayudabusqueda">
                                Nombre del producto + Marca del producto/fabricante
                            </p>
                        </Col>
                        <Col xl={6} lg={6} md={6} xs={6} className="mlmenos18">
                            <p className="textoitemoayudabusqueda">     
                                Filtro de aceite Motorcraft
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <p className="textoitemoayudabusqueda">
                                Nombre del producto + Número de parte
                            </p>
                        </Col>
                        <Col xl={6} lg={6} md={6} xs={6} className="mlmenos18">
                            <p className="textoitemoayudabusqueda">
                                Limpiaparabrisas 578572
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <p className="textoitemoayudabusquedauno">
                                Número de parte
                            </p>
                        </Col>
                        <Col xl={6} lg={6} md={6} xs={6} className="mlmenos18">
                            <p className="textoitemoayudabusquedados">
                                578572
                            </p>
                        </Col>
                    </Row>
                </div>

                <div className="mt-50 textoventanamensajes"></div>
            </div>
        </div>
    ) : null;
}

export default ModalEjemploBusqueda;
