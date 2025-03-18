import Container from "../../components/layouts/Container";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../utilities/firebase";
import { getAuth, signOut } from "firebase/auth";
import {
    URL_BD_MR,
    URL_IMAGES_RESULTS,
    URL_IMAGES_RESULTSSMS,
} from "../../helpers/Constants";

export default function SeguimientoProblemasRedirigir() {
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const irA = useRef(null);
    const [messages, setMessages] = useState([]);
    const [zoomImgUno, setZoomImgUno] = useState("imageresultsms");
    const [zoomImgDos, setZoomImgDos] = useState("imageresultsms");
    const [zoomImgTres, setZoomImgTres] = useState("imageresultsms");
    const [zoomImgCuatro, setZoomImgCuatro] = useState("imageresultsms");
    const [zoomImgCinco, setZoomImgCinco] = useState("imageresultsms");
    let datosusuarios = useSelector((state) => state.userlogged.userlogged);

    const imgImgUnoAmpliar = async () => {
        setZoomImgUno("imageresultsms zoomproblem");
    };

    const imgImgUnoDisminuir = async () => {
        setZoomImgUno("imageresultsms");
    };

    const imgImgDosAmpliar = async () => {
        setZoomImgDos("imageresultsms zoomproblem");
    };

    const imgImgDosDisminuir = async () => {
        setZoomImgDos("imageresultsms");
    };

    const imgImgTresAmpliar = async () => {
        setZoomImgTres("imageresultsms zoomproblem");
    };

    const imgImgTresDisminuir = async () => {
        setZoomImgTres("imageresultsms");
    };

    const imgImgCuatroAmpliar = async () => {
        setZoomImgCuatro("imageresultsms zoomproblem");
    };

    const imgImgCuatroDisminuir = async () => {
        setZoomImgCuatro("imageresultsms");
    };

    const imgImgCincoAmpliar = async () => {
        setZoomImgCinco("imageresultsms zoomproblem");
    };

    const imgImgCincoDisminuir = async () => {
        setZoomImgCinco("imageresultsms");
    };

    //recibir los datos del producto comprado y guardar url para cuando reinicie seguir en el mismo
    let producto = null;
    let uiduser = null;
    let origen = false;

    if (typeof window !== "undefined") {
        console.log("XXXXXXXXXX  : ", router.query.producto);
        if (router.query.origen) {
            const auth = getAuth(firebase);
            signOut(auth).then(() => {
                console.log("Sesión Cerrada")
            }).catch((error) => {
                console.log("Error Cerrando Sesión")
            });

            producto = JSON.parse(router.query.producto);
            uiduser = JSON.parse(router.query.uidcomprador);
            origen = JSON.parse(router.query.origen);
            //console.log("UDICOMPRA  : ", router.query.uidcomprador)

            // Guardar los datos en el almacenamiento local
            localStorage.setItem("producto", JSON.stringify(producto));
        } else if (router.query.producto) {
            //datosusuarios = useSelector((state) => state.userlogged.userlogged);
            producto = JSON.parse(router.query.producto);
            
            console.log("PRODDAAAA  : ", producto);
            // Guardar los datos en el almacenamiento local
            localStorage.setItem("producto", JSON.stringify(producto));
        } else {
            // Recuperar los datos del almacenamiento local
            //datosusuarios = useSelector((state) => state.userlogged.userlogged);
            const data = localStorage.getItem("producto");
            if (data) {
                producto = JSON.parse(data);
            }
        }
    }

    // Función para leer mensajes
    const leerMensajes = async () => {
        let params = null;

        if (!datosusuarios)
            origen = true;

        if (origen) {
            params = {
                estado: 81,
                idcomprador: uiduser,
            };
        } else {
            params = {
                estado: 81,
                idcomprador: datosusuarios.uid,
            };
        }

        //console.log("PARAMS:", params);

        try {
            const response = await axios({
                method: "post",
                url: `${URL_BD_MR}244`,
                params,
            });

            const mensajes = response.data.listarmensajes;

            console.log("PARAMS:", mensajes);

            //console.log("Respuesta Mensajes:",response.data.listarmensajes);
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
    }, [uiduser]);

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

    //TopPage
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    return (
        <>
            <div ref={irA}>
                <div>
                    <Container title="Mi Cuenta">
                        <div className="ps-page ps-page--inner" id="myaccount">
                            <div className="container">
                                <div className="ps-page__header"> </div>
                                <div className="ps-page__content ps-account">
                                    <div className="titleTproblema">
                                        <p>Seguimiento de mi problema</p>
                                    </div>
                                    {
                                        console.log("Devoluciones : ", messages)
                                    }
                                    {messages &&
                                        messages.map((mensaje) => (
                                            <div>
                                                {mensaje.idproducto ==
                                                    producto.idproducto ? (
                                                    <div className="divverproblemasusuarios">
                                                        <Grid
                                                            container
                                                            spacing={1}>
                                                            <Grid
                                                                item
                                                                xs={6}
                                                                md={6}
                                                                lg={6}>
                                                                <div className="datasProblPersonas">
                                                                    <p className="datasProblPersonasP">
                                                                        Fecha de
                                                                        la
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
                                                                        ID
                                                                        solicitud:
                                                                    </p>
                                                                    <p>
                                                                        {" "}
                                                                        {
                                                                            mensaje.idmensaje
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="datasProblPersonas">
                                                                    <Grid
                                                                        container
                                                                        spacing={
                                                                            1
                                                                        }>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                12
                                                                            }
                                                                            md={
                                                                                12
                                                                            }
                                                                            lg={
                                                                                12
                                                                            }>
                                                                            {
                                                                                <div className="textosolicitados mt-5">
                                                                                    Aquí
                                                                                    podrás
                                                                                    ver
                                                                                    el
                                                                                    estado
                                                                                    de
                                                                                    la
                                                                                    gestión
                                                                                    de
                                                                                    tu
                                                                                    solicitud,
                                                                                    cuando
                                                                                    haya
                                                                                    una
                                                                                    respuesta
                                                                                    tambien
                                                                                    la
                                                                                    podrás
                                                                                    ver
                                                                                    aquí
                                                                                </div>
                                                                            }
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                6
                                                                            }
                                                                            md={
                                                                                6
                                                                            }
                                                                            lg={
                                                                                6
                                                                            }>
                                                                            <div className="botonrespuestavende">
                                                                                {
                                                                                    mensaje.estadosolicitud
                                                                                }
                                                                            </div>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                                <div className="datasProblPersonas">
                                                                    <Grid
                                                                        container
                                                                        spacing={
                                                                            1
                                                                        }>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                12
                                                                            }
                                                                            md={
                                                                                12
                                                                            }
                                                                            lg={
                                                                                12
                                                                            }>
                                                                            <div className="textosolicita mt-5">
                                                                                Descripción
                                                                                de
                                                                                mi
                                                                                problema:
                                                                            </div>
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                6
                                                                            }
                                                                            md={
                                                                                6
                                                                            }
                                                                            lg={
                                                                                6
                                                                            }>
                                                                            <p className="textocomentarioproblema">
                                                                                {
                                                                                    mensaje.comentario
                                                                                }
                                                                            </p>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                                <div className="datasProblPersonas3">
                                                                    <p className="datasProblPersonasP2">
                                                                        Fotos
                                                                        agregadas:
                                                                    </p>
                                                                    <Grid
                                                                        container
                                                                        spacing={
                                                                            1
                                                                        }>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                2
                                                                            }
                                                                            md={
                                                                                2
                                                                            }
                                                                            lg={
                                                                                2
                                                                            }>
                                                                            {mensaje.nombreimagen1 ? (
                                                                                <img
                                                                                    onClick={() =>
                                                                                        imgImgUnoAmpliar()
                                                                                    }
                                                                                    onMouseLeave={() =>
                                                                                        imgImgUnoDisminuir()
                                                                                    }
                                                                                    className={
                                                                                        zoomImgUno
                                                                                    }
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
                                                                            xs={
                                                                                2
                                                                            }
                                                                            md={
                                                                                2
                                                                            }
                                                                            lg={
                                                                                2
                                                                            }>
                                                                            {mensaje.nombreimagen2 ? (
                                                                                <img
                                                                                    onClick={() =>
                                                                                        imgImgDosAmpliar()
                                                                                    }
                                                                                    onMouseLeave={() =>
                                                                                        imgImgDosDisminuir()
                                                                                    }
                                                                                    className={
                                                                                        zoomImgDos
                                                                                    }
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
                                                                            xs={
                                                                                2
                                                                            }
                                                                            md={
                                                                                2
                                                                            }
                                                                            lg={
                                                                                2
                                                                            }>
                                                                            {mensaje.nombreimagen3 ? (
                                                                                <img
                                                                                    onClick={() =>
                                                                                        imgImgTresAmpliar()
                                                                                    }
                                                                                    onMouseLeave={() =>
                                                                                        imgImgTresDisminuir()
                                                                                    }
                                                                                    className={
                                                                                        zoomImgTres
                                                                                    }
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
                                                                            xs={
                                                                                2
                                                                            }
                                                                            md={
                                                                                2
                                                                            }
                                                                            lg={
                                                                                2
                                                                            }>
                                                                            {mensaje.nombreimagen4 ? (
                                                                                <img
                                                                                    onClick={() =>
                                                                                        imgImgCuatroAmpliar()
                                                                                    }
                                                                                    onMouseLeave={() =>
                                                                                        imgImgCuatroDisminuir()
                                                                                    }
                                                                                    className={
                                                                                        zoomImgCuatro
                                                                                    }
                                                                                    src={
                                                                                        URL_IMAGES_RESULTSSMS +
                                                                                        mensaje.nombreimagen4
                                                                                    }
                                                                                    alt="First slide"
                                                                                />
                                                                            ) : null}
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                2
                                                                            }
                                                                            md={
                                                                                2
                                                                            }
                                                                            lg={
                                                                                2
                                                                            }>
                                                                            {mensaje.nombreimagen5 ? (
                                                                                <img
                                                                                    onClick={() =>
                                                                                        imgImgCincoAmpliar()
                                                                                    }
                                                                                    onMouseLeave={() =>
                                                                                        imgImgCincoDisminuir()
                                                                                    }
                                                                                    className={
                                                                                        zoomImgCinco
                                                                                    }
                                                                                    src={
                                                                                        URL_IMAGES_RESULTSSMS +
                                                                                        mensaje.nombreimagen5
                                                                                    }
                                                                                    alt="First slide"
                                                                                />
                                                                            ) : null}
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                            </Grid>
                                                            <div className="mtmenos20">
                                                                <Grid
                                                                    item
                                                                    xs={4}
                                                                    md={4}
                                                                    lg={4}>
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                        md={12}
                                                                        lg={12}>
                                                                        <div className="titleTproblema">
                                                                            <p>
                                                                                Producto
                                                                            </p>
                                                                        </div>
                                                                    </Grid>
                                                                    <div className="mtmenos20">
                                                                        <Grid
                                                                            container
                                                                            spacing={
                                                                                1
                                                                            }
                                                                            className="productCompradoCuatro">
                                                                            <Grid
                                                                                item
                                                                                xs={
                                                                                    5
                                                                                }
                                                                                md={
                                                                                    5
                                                                                }
                                                                                lg={
                                                                                    5
                                                                                }
                                                                                className="imageresultproblema">
                                                                                <img
                                                                                    src={`${URL_IMAGES_RESULTS}${producto.nombreImagen}`}
                                                                                />
                                                                            </Grid>
                                                                            <Grid
                                                                                item
                                                                                xs={
                                                                                    7
                                                                                }
                                                                                md={
                                                                                    7
                                                                                }
                                                                                lg={
                                                                                    7
                                                                                }>
                                                                                <Grid className="subContMiscompras">
                                                                                    <p className="tituloprdproblema">
                                                                                        {
                                                                                            producto.nombreProducto
                                                                                        }
                                                                                    </p>
                                                                                    <div className="divNcompraDos">
                                                                                        <p className="UnidCompradasdos">
                                                                                            Unidades
                                                                                            compradas
                                                                                            :{" "}
                                                                                            {
                                                                                                producto.cantidad
                                                                                            }
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className="divNcompraDos">
                                                                                        <p className="UnidCompradasdos">
                                                                                            {" "}
                                                                                            Número
                                                                                            de
                                                                                            compra
                                                                                            :{" "}
                                                                                            {
                                                                                                producto.numerodeaprobacion
                                                                                            }
                                                                                        </p>
                                                                                    </div>
                                                                                    <p className="dateCompra">
                                                                                        {
                                                                                            producto.fechacompra
                                                                                        }
                                                                                    </p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </div>
                                                                </Grid>
                                                            </div>
                                                        </Grid>
                                                    </div>
                                                ) : null}
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
