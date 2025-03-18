import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import CheckIcon from '@material-ui/icons/Check';
import { useRouter } from "next/router";
import { getRefreshPage } from "../../store/refreshpage/action";
import { useDispatch, useSelector } from "react-redux";

function ModalMensajesImgNit(props) {
    const dispatch = useDispatch();
    const { shown, close, titulo, mensaje, tipo, setActivarCity, textoBoton } = props;
    const router = useRouter();

    const cerrar = () =>{
        close(false);
        dispatch(getRefreshPage(false));
        router.push("/");
    }

    return shown ? (
        <div
            className="modal-fondo-city mtmenos15"
            onClick={() => {
                cerrar();
            }}>
            <div
                className="modal-mensajes-login redondearventamensajes"
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
                                style={{ fontSize: 35 }} />
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
                <div className="ml-250">
                    <Row>
                        <Col xl={6} lg={6} md={6} xs={12}></Col>
                        <Col xl={6} lg={6} md={6} xs={12}>
                            <Button
                                variant="outline-light"
                                className="ps-btn redondearborde"
                                onClick={() => cerrar()}>
                                {" "}
                                {textoBoton}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalMensajesImgNit;
