import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getBlockScreen } from "../../store/blockscreen/action";

function ModalMensajesShoppingCart(props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { shown, close, titulo, mensaje, tipo, setSoyNuevo, setTengoCuenta } =
        props;
    // Asignamos Datos al arreglo de Usuarios desde el state
    const leeira = useSelector((state) => state.leeira.ira);

    const creaTuCuenta = () => {
        dispatch(getBlockScreen(0));
        router.push("/my-account#myaccount");
        localStorage.setItem("ira", JSON.stringify(2));
    };

    const cerrar = () => {
        dispatch(getBlockScreen(0));
        router.push("/loginaccount#login");
        //close(false);
    };

    const tengocuenta = () => {
        dispatch(getBlockScreen(0));
        router.push("/loginaccount#login");
        if (leeira) {
            if (leeira == 3) localStorage.setItem("ira", JSON.stringify(3));
        } else localStorage.setItem("ira", JSON.stringify(2));
    };
    
    return shown ? (
        <div
            className="modal-fondo-city mtmenos15"
            onClick={() => {
                cerrar();
            }}>
            <div
                className="modal-shopping-cart redondearventamensajes "
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
                            <div className="ml-20 titulolistadeseos">
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
                <div
                    className="btncreacuentashoppingcart"
                    onClick={() => creaTuCuenta()}>
                    Crea tu cuenta
                </div>
                <div
                    className="btningresacuentashoppingcart"
                    onClick={() => tengocuenta()}>
                    Ingresa a tu cuenta
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalMensajesShoppingCart;
