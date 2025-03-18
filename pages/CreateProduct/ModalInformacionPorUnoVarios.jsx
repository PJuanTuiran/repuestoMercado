import React from 'react';
import { Button, Row, Col, Card, Tooltip, Overlay} from "react-bootstrap";

function ModalInformacionPorUnoVarios(props) {
    const { shown, close } = props;

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
                            xl={9}
                            lg={9}
                            md={9}
                            sm={9}
                            className="ml-60 mb-10">
                            <div className="tamañotextocrearproductoinfo">
                                PRODUCTOS ES PARA UNO O VARIOS VEHÍCULOS
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
                    <h2>
                        {" "}
                        El producto a vender puede ser utilizado en varios
                        vehículos de la misma marca o modelo, para varios años,
                        línea o cilindraje
                    </h2>

                    <h2>TEM</h2>
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalInformacionPorUnoVarios;