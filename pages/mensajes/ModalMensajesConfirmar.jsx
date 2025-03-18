import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import axios from "axios";
import { useSelector } from "react-redux";
import { URL_BD_MR } from "../../helpers/Constants";

function ModalMensajesConfirmar(props) {
    const {
        shown,
        close,
        setconfirmarMensaje,
        titulo,
        mensaje,
        setTipo,
    } = props;

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    const confirmar = () =>{

        const updateEstadoUser = async () => {
            let params = {
                estado: 30,
                id: datosusuarios.uid
            }

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "164", params
                });

                if (res.data.type == 1) {
                    console.log("Estado del usuario actualizado")
                    //return;
                }
            } catch (error) {
                console.error("Error al leer estados por proceso", error);
            }
        };

        updateEstadoUser();
        //close(false);
        setTipo(1);
        setconfirmarMensaje(true);
    }

    return shown ? (
        <div
            className="modal-fondo"
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
                <div className="mt-50 textoventanamensajes">
                    <div>{mensaje}</div>
                </div>
                <div className="ml-200 mt-60">
                    <Row>
                        <Col xl={7} lg={7} md={7} xs={7}>
                        </Col>
                        <Col xl={2} lg={2} md={2} xs={2}>
                            <Button
                                variant="outline-light"
                                className="ps-btn redondearborde"
                                onClick={() => confirmar()}>
                                {" "}
                                Continuar
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalMensajesConfirmar;
