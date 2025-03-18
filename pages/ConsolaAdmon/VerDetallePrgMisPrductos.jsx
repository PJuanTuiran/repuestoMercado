import Container from "../../components/layouts/Container";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Moment from "moment";
import {
    URL_BD_MR,
    URL_IMAGES_RESULTS,
    URL_IMAGES_RESULTSSMS,
} from "../../helpers/Constants";
import shortid from "shortid";
import { myNumber } from "../../utilities/ArrayFunctions";
import { Button } from "react-bootstrap";
import ModalMensajes from "../mensajes/ModalMensajes";
import { getReturn } from "../../store/return/action";
import { getUserMenuPrimary } from "../../store/usermenuprimary/action";
import { useDispatch, useSelector } from "react-redux";

export default function VerDetallePrgMisPrductos() {
    //Consts measured, 80% and in md 100%.
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const irA = useRef(null);
    const [messages, setMessages] = useState([]);
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const dispatch = useDispatch();

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

    useEffect(() => {
        dispatch(getUserMenuPrimary(false));
    }, []);

    let producto = [];

    if (typeof window !== "undefined") {
        if (router.query.producto) {
            let item;
            item = JSON.parse(router.query.producto);
            producto.push(item);
        } else {
        }
    }

    //console.log("PRODDASA : ", producto)

    const regresar = async () => {
        dispatch(getReturn(true));
        router.push("/ConsolaAdmon/PreguntasSobreMisProductos");
    };

    const aceptarMensaje = async () => {
        let estadoacepta = 0;

        if (producto[0].estado == 80) estadoacepta = 81;
        else if (producto[0].estado == 82) estadoacepta = 83;

        const actualizarMensaje = async () => {
            let params = {
                estadomensaje: estadoacepta,
                id: producto[0].idpregunta,
            };
            
            //console.log("params : ", params);
            //return
            await axios({
                method: "post",
                url: URL_BD_MR + "852",
                params,
            })
                .then((res) => {
                    if (res.data.type == 1) {
                        setShowModalMensajes(true);
                        setTituloMensajes("Validar mensajes");
                        setTextoMensajes("Mensaje fue aprobado.");
                        return;
                    } else {
                        setShowModalMensajes(true);
                        setTituloMensajes("Validar mensajes");
                        setTextoMensajes("Error actualizando mensaje.");
                        return;
                    }
                })
                .catch(function (error) {});
        };
        actualizarMensaje();
    };

    return (
        <>
            <div ref={irA}>
                <div>
                    <Container title="Mi Cuenta">
                        <ModalMensajes
                            shown={showModalMensajes}
                            close={setShowModalMensajes}
                            titulo={tituloMensajes}
                            mensaje={textoMensajes}
                            tipo="1"
                        />
                        <div className="ps-page ps-page--inner" id="myaccount">
                            <div className="container">
                                <div className="ps-page__header"> </div>
                                <div className="ps-page__content ps-account">
                                    <div className="titleTproblema">
                                        <p>Información mensaje enviado</p>
                                    </div>
                                    {producto &&
                                        producto.map((mensaje) => (
                                            <div className="divverproblemasusuarios">
                                                <Grid container spacing={1}>
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        md={6}
                                                        lg={6}>
                                                        <p className="primerSubcProblContP2">
                                                            <Grid
                                                                container
                                                                spacing={1}>
                                                                <Grid
                                                                    item
                                                                    xs={4}
                                                                    md={4}
                                                                    lg={4}>
                                                                    <p className="textosolicita">
                                                                        Datos
                                                                        del
                                                                        comprador
                                                                    </p>
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    xs={6}
                                                                    md={6}
                                                                    lg={6}>
                                                                    {mensaje.estado ==
                                                                    41 ? (
                                                                        <p className="textosolicita mlmenos3">
                                                                            solicitante
                                                                        </p>
                                                                    ) : null}
                                                                </Grid>
                                                            </Grid>
                                                        </p>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                ID comprador:
                                                            </p>
                                                            <p>
                                                                {
                                                                    mensaje.usuariocomprador
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Nombres y
                                                                apellidos:
                                                            </p>
                                                            <p>
                                                                {mensaje.nombrecomprador +
                                                                    " " +
                                                                    mensaje.apellidocomprador}
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Correo:
                                                            </p>
                                                            <p>
                                                                {
                                                                    mensaje.emailcomprador
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Número de
                                                                teléfono:
                                                            </p>
                                                            <p>
                                                                {
                                                                    mensaje.telefonocomprador
                                                                }{" "}
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas"></div>
                                                        <div className="datasProblPersonas"></div>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        md={6}
                                                        lg={6}>
                                                        <p className="primerSubcProblContP2">
                                                            Datos producto
                                                        </p>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                {
                                                                    mensaje.titulonombre
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Unidades
                                                                disponibles:
                                                            </p>
                                                            <p>
                                                                {
                                                                    mensaje.unidadesdisponible
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Precio del
                                                                producto:
                                                            </p>
                                                            <p>
                                                                ${" "}
                                                                {myNumber(
                                                                    1,
                                                                    mensaje.precio,
                                                                    2
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas"></div>
                                                        <div className="datasProblPersonas"></div>
                                                    </Grid>

                                                    <Grid
                                                        item
                                                        xs={6}
                                                        md={6}
                                                        lg={6}>
                                                        <p className="primerSubcProblContP2">
                                                            <Grid
                                                                container
                                                                spacing={1}>
                                                                <Grid
                                                                    item
                                                                    xs={4}
                                                                    md={4}
                                                                    lg={4}>
                                                                    <p className="textosolicita">
                                                                        Datos
                                                                        del
                                                                        vendedor
                                                                    </p>
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    xs={6}
                                                                    md={6}
                                                                    lg={6}>
                                                                    {mensaje.estado ==
                                                                    43 ? (
                                                                        <p className="textosolicita mlmenos10">
                                                                            solicitante
                                                                        </p>
                                                                    ) : null}
                                                                </Grid>
                                                            </Grid>
                                                        </p>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                ID del usuario:
                                                            </p>
                                                            <p>{mensaje.uid}</p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Nombres y
                                                                apellidos:
                                                            </p>
                                                            <p>
                                                                {mensaje.primernombre +
                                                                    " " +
                                                                    mensaje.primerapellido}
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Correo:
                                                            </p>
                                                            <p>
                                                                {mensaje.email}
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas">
                                                            <p className="datasProblPersonasP">
                                                                Número de
                                                                teléfono:
                                                            </p>
                                                            <p>
                                                                {
                                                                    mensaje.celular
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="datasProblPersonas mlmenos25 mt-45">
                                                            <Grid
                                                                item
                                                                xs={2}
                                                                md={2}
                                                                lg={2}>
                                                                <Button
                                                                    variant="outline-light"
                                                                    onClick={() =>
                                                                        regresar()
                                                                    }
                                                                    className="botonaprobarpregunta">
                                                                    Regresar
                                                                </Button>
                                                            </Grid>
                                                        </div>
                                                        <div className="datasProblPersonas"></div>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        md={6}
                                                        lg={6}>
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
                                                            <p>
                                                                {
                                                                    mensaje.idmensaje
                                                                }
                                                            </p>
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
                                                                Fotos agregadas:
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
                                                                <Grid
                                                                    item
                                                                    xs={2}
                                                                    md={2}
                                                                    lg={2}>
                                                                    {mensaje.nombreimagen3 ? (
                                                                        <img
                                                                            className="imageresultsms"
                                                                            src={
                                                                                URL_IMAGES_RESULTSSMS +
                                                                                mensaje.nombreimagen3
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
                                                                    <Button
                                                                        variant="outline-light"
                                                                        onClick={() =>
                                                                            aceptarMensaje()
                                                                        }
                                                                        className="botonaprobarpregunta">
                                                                        Aprobar
                                                                    </Button>
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    xs={2}
                                                                    md={2}
                                                                    lg={2}>
                                                                    <Button
                                                                        variant="outline-light"
                                                                        className="botonrechazarpregunta">
                                                                        Rechazar
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
}
