import React, { useState, useEffect, useRef } from "react";
import {
    Button,
    Row,
    Col,
    Modal,
    ButtonGroup,
    Card,
    Form,
} from "react-bootstrap";

function ModalComentariosHabitaculo({ shown, close, texto }) {
    const [textoConsola, setTextoConsola] = useState(
        "Comentarios productos ubicados en la consola"
    );
    const [textoAsiento, setTextoAsiento] = useState(
        "Comentarios productos ubicados en los Asientos del Vehiculo"
    );
    const [textoTecho, setTextoTecho] = useState(
        "Incluir aqui los comentarios relacionados con los productos ubicados en el techo"
    );

    return shown ? (
        <div
            className="modal-fondo"
            onClick={() => {
                close();
            }}>
            <div
                className="modal-contenido"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Row>
                        <Col
                            xl={7}
                            lg={7}
                            md={7}
                            sm={7}
                            className="ml-160 mb-10">
                            <div className="tamañotextocrearproductoinfo">
                                PRODUCTOS GENERICOS
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodal ml-30"
                                data-dismiss="modal"
                                onClick={close}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                </div>
               
                <div className="ml-20 mr-30 textomodalinfoproductos">
                    {texto == 1 ? (
                        <h2>{ textoConsola }</h2>
                    ) : texto == 2 ? (
                        <h2>{ textoAsiento }</h2>
                    ) : texto == 3 ? (
                        <h2>{ textoTecho }</h2>
                    ) : null}
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalComentariosHabitaculo;
