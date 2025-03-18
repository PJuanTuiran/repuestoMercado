import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getBlockScreen } from "../../store/blockscreen/action";
import { Grid } from "@mui/material";

function ModalMensajesSoyNuevo(props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { shown, close, titulo, mensaje, tipo, setSoyNuevo, setTengoCuenta } =
        props;
    // Asignamos Datos al arreglo de Usuarios desde el state
    const leeira = useSelector((state) => state.leeira.ira);

    const creaTuCuenta = () => {
        dispatch(getBlockScreen(0));

        if (router.pathname == "/my-account") {
            close(false);
        } else {
            dispatch(getBlockScreen(0));
            router.push("/my-account#myaccount");
        }
        localStorage.setItem("ira", JSON.stringify(2));
    };

    const cerrar = () => {
        if (router.pathname == "/loginaccount") {
            close(false);
        } else {
            dispatch(getBlockScreen(0));
            router.push("/loginaccount#login");
        }
        //close(false);
    };

    const tengocuenta = () => {
        let item = {
            login: true
        };
        
        localStorage.setItem("loginvender", JSON.stringify(item));
       
        if (router.pathname == "/loginaccount") {
            location.reload();
        } else {
            dispatch(getBlockScreen(0));
            router.push("/loginaccount#login");
            if (leeira) {
                if (leeira == 3) localStorage.setItem("ira", JSON.stringify(3));
            } else localStorage.setItem("ira", JSON.stringify(2));
        }
    };

    return shown ? (
        <div
            className="modal-fondo-city mtmenos15"
            onClick={() => {
                cerrar();
            }}>
            <div
                className="modal-soy-nuevo"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3} lg={3}></Grid>
                    <Grid item xs={12} md={7} lg={7}>
                        <img
                            className="imglogomodal"
                            src="/static/img/logomr.png"
                            alt=""
                        />
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                        <button
                            type="button"
                            className="cerrarmodal mt-1 ml-40 sinborder colorbase"
                            data-dismiss="modal"
                            onClick={() => cerrar()}>
                            {" "}
                            X{" "}
                        </button>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} lg={12}>
                        <div className="ml-20 titulolistadeseos">{titulo}</div>
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} lg={12}>
                        <div
                            className="btnsoynuevo"
                            onClick={() => creaTuCuenta()}>
                            Soy nuevo
                        </div>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <div
                            className="btncreacuenta"
                            onClick={() => tengocuenta()}>
                            Ya tengo una cuenta
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    ) : null;
}

export default ModalMensajesSoyNuevo;
