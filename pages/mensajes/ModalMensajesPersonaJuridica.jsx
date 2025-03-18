import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getBlockScreen } from "../../store/blockscreen/action";
import { Grid } from "@mui/material";

function ModalMensajesPersonaJuridica(props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        shown,
        close,
        titulo,
        mensaje,
        tipo,
        setSoyNuevo,
        setTengoCuenta,
        setSubirDocsNit,
        setShowModalFotos,
    } = props;
    // Asignamos Datos al arreglo de Usuarios desde el state
    const leeira = useSelector((state) => state.leeira.ira);

    const subirDocumentos = () => {
        setSubirDocsNit(true);
        setShowModalFotos(true);
        close(false);
    };

    const cerrar = () => {
        close(false);
    };

    const cancelar = () => {
        close(false);
    };

    return shown ? (
        <div
            className="modal-fondo-city mtmenos15"
            onClick={() => {
                cerrar();
            }}>
            <div
                className="modal-persona-juridica"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={11} lg={11}>
                        <div className="titulopersonajuridica">{titulo}</div>
                    </Grid>
                    <Grid item xs={12} md={1} lg={1}>
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
                        <div className="textomensajepersonajuridica">
                            Tu cuenta ya está creada, puedes comprar productos,
                            pero no puedes vender hasta no ingresar los
                            siguientes documentos:
                        </div>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <div className="textomodaldocspersonajuridica">
                            - Cámara de Comercio.
                        </div>
                        <div className="textomodaldocspersonajuridica">
                            - RUT.
                        </div>
                        <div className="textomodaldocspersonajuridica">
                            - Cedula de ciudadanía del Representante legal.
                        </div>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <div className="textomensajepersonajuridica">
                            Por favor sube los documentos solicitados, si no
                            dispones de estos archivos en este momento, tienes
                            un enlace en tus datos de usuario para ingresarlos y
                            continuar con el proceso de activación de la cuenta.
                            Al recibir los documentos, el área Jurídica de
                            Mercado Repuesto realizara la revisión,
                            inmediatamente tengamos la confirmación
                            habilitaremos la opción para la activación de tu
                            cuenta.
                        </div>
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item xs={12} md={6} lg={6}>
                        <div
                            className="btncancelarpersonajuridica"
                            onClick={() => cancelar()}>
                            Cancelar
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <div
                            className="btnsubirdcto"
                            onClick={() => subirDocumentos()}>
                            Subir documentos
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    ) : null;
}

export default ModalMensajesPersonaJuridica;
