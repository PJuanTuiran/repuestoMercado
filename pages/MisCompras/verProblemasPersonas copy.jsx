import Container from "../../components/layouts/Container";
import {
    Box,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    InputAdornment,
    TextField,
    InputBase,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import { Dropdown } from "react-bootstrap";
import { NextRouter } from "next/router";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { AiOutlineRight } from "react-icons/ai";
import { IoIosCamera } from "react-icons/io";
import { IoSquareOutline } from "react-icons/io5";
import ModalMensajes from "../mensajes/ModalMensajes";
import { RiSettings5Fill } from "react-icons/ri";
import { SlPaperClip } from "react-icons/sl";
import { LuSendHorizonal } from "react-icons/lu";
import {
    URL_BD_MR,
    URL_IMAGES_RESULTS,
    URL_IMAGES_RESULTSSMS,
} from "../../helpers/Constants";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";

export default function verProblemasPersonas() {
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const irA = useRef(null);
    const [messages, setMessages] = useState([]);

    // Función para leer mensajes
    const leerMensajes = async () => {
        let params = {
            estado: 81,
        };

        try {
            const response = await axios({
                method: "post",
                url: `${URL_BD_MR}84`,
                params,
            });

            const mensajes = response.data.listarmensajes;
            console.log(
                "Respuesta del servidor:",
                response.data.listarmensajes
            );
            // Obtener el nombre y apellido del usuario para cada mensaje
            const mensajesConNombres = await Promise.all(
                mensajes.map(async (mensaje) => {
                    const {
                        nombreUsuario,
                        SegundoNombreUsuarioC,
                        correo,
                        primerApellidoComprador,
                        segundoApellidoComprador,
                        teléfonoComprador,
                    } = await obtenerNombreUsuario(mensaje.usuariocompra);
                    return {
                        ...mensaje,
                        nombreUsuario,
                        SegundoNombreUsuarioC,
                        correo,
                        primerApellidoComprador,
                        segundoApellidoComprador,
                        teléfonoComprador,
                    };
                })
            );

            // Ordenar los mensajes por fecha de creación
            const mensajesOrdenados = mensajesConNombres.sort(
                (b, a) => new Date(a.fechacreacion) - new Date(b.fechacreacion)
            );

            // Actualizar el estado con los mensajes recibidos
            setMessages(mensajesOrdenados);
        } catch (error) {
            console.error("Error leyendo mensajes:", error);
        }
    };

    // Efecto para cargar mensajes al montar y actualizar
    useEffect(() => {
        leerMensajes();
    }, []);

    // Función para obtener el nombre y apellido del usuario
    async function obtenerNombreUsuario(uidcomprador) {
        let params = {
            usuario: uidcomprador,
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "13",
                params,
            });

            const nombreUsuario = res.data[0].primernombre;
            const SegundoNombreUsuarioC = res.data[0].segundonombre;
            const primerApellidoComprador = res.data[0].primerapellido;
            const segundoApellidoComprador = res.data[0].segundoapellido;
            const correo = res.data[0].email;
            const teléfonoComprador = res.data[0].celular;
            return {
                nombreUsuario,
                SegundoNombreUsuarioC,
                correo,
                primerApellidoComprador,
                segundoApellidoComprador,
                teléfonoComprador,
            };
        } catch (error) {
            console.error("Error al obtener el nombre del usuario", error);
        }
    }

    return (
        <>
            <div ref={irA}>
                <div>
                    <Container title="Mi Cuenta">
                        <div className="ps-page ps-page--inner" id="myaccount">
                            <div className="container">
                                <div className="ps-page__header"> </div>
                                <div className="ps-page__content ps-account">
                                    <Grid container>
                                        <Grid
                                            className="subcprinccalific"
                                            item
                                            xs={12}
                                            md={8}
                                            sx={{ width: "100%" }}
                                            flexDirection={"column"}>
                                            <div className="titleTproblema">
                                                <p>Problemas de los usuarios</p>
                                            </div>

                                            {messages.map((mensaje) => (
                                               <Grid container spacing={1}
                                                    key={mensaje.id}
                                                   
                                                    className="VerProblemasPersonasCont"
                                                    item
                                                    xs={12}
                                                    md={12}>
                                                    

                                                    <Grid
                                                        className="primerSubcProblCont"
                                                        item
                                                        xs={12}
                                                        md={6}>


                                                        <p className="primerSubcProblContP2">
                                                            Datos del comprador
                                                            (solicitante)
                                                        </p>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Nombre de
                                                                usuario:
                                                            </p>
                                                            <p>
                                                                {
                                                                    mensaje.nombreUsuario
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Nombres y
                                                                apellidos:
                                                            </p>
                                                            <p>
                                                                {
                                                                    mensaje.nombreUsuario
                                                                }{" "}
                                                                {
                                                                    mensaje.SegundoNombreUsuarioC
                                                                }{" "}
                                                                {
                                                                    mensaje.primerApellidoComprador
                                                                }{" "}
                                                                {
                                                                    mensaje.segundoApellidoComprador
                                                                }{" "}
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Correo:
                                                            </p>
                                                            <p>
                                                                {mensaje.correo}
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Número de
                                                                teléfono:
                                                            </p>
                                                            <p>
                                                                {
                                                                    mensaje.teléfonoComprador
                                                                }{" "}
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Número de
                                                                compra:
                                                            </p>
                                                            <p>21212</p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Fecha de compra:
                                                            </p>
                                                            <p>21-12-23</p>
                                                        </div>
                                                    </Grid>
                                                    <Grid
                                                        className="SegSubcProblCont"
                                                        item
                                                        xs={12}
                                                        md={6}
                                                        flexDirection={
                                                            "column"
                                                        }>

                                                        <p className="primerSubcProblContP2">
                                                            Datos producto
                                                        </p>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Farolas mazda
                                                                2006 azul:
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Unidades
                                                                compradas:
                                                            </p>
                                                            <p>12</p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Precio del
                                                                producto:
                                                            </p>
                                                            <p>23.000</p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Precio del envío
                                                            </p>
                                                            <p>23.000</p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Total:
                                                            </p>
                                                            <p>23.000</p>
                                                        </div>
                                                    </Grid>

                                                    <Grid
                                                        className="primerSubcProblCont"
                                                        item
                                                        xs={12}
                                                        md={6}
                                                        mt={5}>
                                                            
                                                        <p className="primerSubcProblContP2">
                                                            Datos del vendedor
                                                        </p>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Nombre de
                                                                usuario:
                                                            </p>
                                                            <p>Juan</p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Nombres y
                                                                apellidos:
                                                            </p>
                                                            <p>
                                                                Juan Pablo Rojas
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Correo:
                                                            </p>
                                                            <p>
                                                                Juanpablorojas@gmail.com
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Número de
                                                                teléfono:
                                                            </p>
                                                            <p>3045567789</p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Estado del pago:
                                                            </p>
                                                            <p>
                                                                Juan Pablo Rojas
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Estado del
                                                                envío:
                                                            </p>
                                                            <p>Entregado</p>
                                                        </div>
                                                    </Grid>
                                                    <Grid
                                                        className="SegSubcProblCont"
                                                        item
                                                        xs={12}
                                                        md={6}
                                                        mt={5}
                                                        flexDirection={
                                                            "column"
                                                        }>

                                                        <p className="primerSubcProblContP2">
                                                            Datos de la
                                                            solicitud
                                                        </p>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Fecha de la
                                                                solicitud:
                                                            </p>
                                                            <p>
                                                                {mensaje.fechacreacion
                                                                    .toString()
                                                                    .slice(
                                                                        0,
                                                                        10
                                                                    )}
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                ID solicitud:
                                                            </p>
                                                            <p>21-12-23</p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="descrpProbl">
                                                                {
                                                                    mensaje.comentario
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas3">
                                                            <p className="datasProblPersonasP2">
                                                                Fotos de la
                                                                solicitud:
                                                            </p>
                                                            <Grid
                                                                container
                                                                spacing={1}>
                                                                <Grid
                                                                    item
                                                                    xs={2}
                                                                    md={2}
                                                                    lg={2}>
                                                                    {mensaje.nombreimagen1 ? (
                                                                        <img
                                                                            className="imageresultsms"
                                                                            src={
                                                                                URL_IMAGES_RESULTSSMS +
                                                                                mensaje.nombreimagen1
                                                                            }
                                                                            alt="First slide"
                                                                        />
                                                                    ) : null}
                                                                </Grid>

                                                                <Grid
                                                                    item
                                                                    xs={2}
                                                                    md={2}
                                                                    lg={2}>
                                                                    {mensaje.nombreimagen2 ? (
                                                                        <img
                                                                            className="imageresultsms"
                                                                            src={
                                                                                URL_IMAGES_RESULTSSMS +
                                                                                mensaje.nombreimagen2
                                                                            }
                                                                            alt="First slide"
                                                                        />
                                                                    ) : null}
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
}
