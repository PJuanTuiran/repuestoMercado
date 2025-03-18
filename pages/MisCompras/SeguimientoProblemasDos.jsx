import Container from "../../components/layouts/Container";
import { Grid, useMediaQuery, useTheme, Button } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { myNumber } from "../../utilities/ArrayFunctions";
import {
    URL_BD_MR,
    URL_IMAGES_RESULTS,
    URL_IMAGES_RESULTSSMS,
} from "../../helpers/Constants";

export default function SeguimientoProblemasDos() {
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const irA = useRef(null);
    const [messages, setMessages] = useState([]);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    //recibir los datos del producto comprado y guardar url para cuando reinicie seguir en el mismo
    let producto = null;

    if (typeof window !== "undefined") {
        if (router.query.producto) {
            producto = JSON.parse(router.query.producto);
            //console.log("PRODDAAAA  : ", producto)
            // Guardar los datos en el almacenamiento local
            localStorage.setItem("producto", JSON.stringify(producto));
        } else {
            // Recuperar los datos del almacenamiento local
            const data = localStorage.getItem("producto");
            if (data) {
                producto = JSON.parse(data);
            }
        }
    }

    // Función para leer mensajes
    const leerMensajes = async () => {
        let params = {
            estado: 11,
            idcomprador: datosusuarios.uid,
        };

        try {
            const response = await axios({
                method: "post",
                url: `${URL_BD_MR}845`,
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

    const masayuda = () => {
        alert("EN DESARROLLO");
    };

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
                                                                xs={8}
                                                                md={8}
                                                                lg={8}>
                                                                <Grid
                                                                    container
                                                                    spacing={1}>
                                                                    <Grid
                                                                        item
                                                                        xs={6}
                                                                        md={6}
                                                                        lg={6}>
                                                                        <p className="primerSubcProblContP2">
                                                                            Datos
                                                                            de
                                                                            la
                                                                            solicitud
                                                                        </p>
                                                                        <div className="datasProblPersonas">
                                                                            <p className="datasProblPersonasP">
                                                                                Fecha
                                                                                de
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
                                                                                    <div className="textosolicita mt-5">
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
                                                                                        Finalizada
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
                                                                                        Respuesta
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
                                                                                    <p className="textocomentarioproblemados">
                                                                                        En
                                                                                        Mercado
                                                                                        Repuesto
                                                                                        estamos
                                                                                        para
                                                                                        ayudarle
                                                                                        a
                                                                                        nuestros
                                                                                        clientes,
                                                                                        por
                                                                                        eso,
                                                                                        se
                                                                                        realizará
                                                                                        el
                                                                                        reembolso
                                                                                        total
                                                                                        del
                                                                                        valor
                                                                                        de
                                                                                        tu
                                                                                        compra,
                                                                                        este
                                                                                        se
                                                                                        hará
                                                                                        efectivo
                                                                                        en
                                                                                        XX
                                                                                        días.
                                                                                        Luego
                                                                                        podrás
                                                                                        verlo
                                                                                        en
                                                                                        la
                                                                                        seccion
                                                                                        de
                                                                                        “Tu
                                                                                        billetera”
                                                                                        y
                                                                                        podrás
                                                                                        elegir
                                                                                        una
                                                                                        cuenta
                                                                                        bancaria
                                                                                        donde
                                                                                        desees
                                                                                        que
                                                                                        hagamos
                                                                                        el
                                                                                        reintegro
                                                                                        del
                                                                                        dinero.
                                                                                    </p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </div>
                                                                        <div className="ml-15 mt-10">
                                                                            <a className="textobuscadorintecractivo subrayartextoclicaqui">
                                                                                Si
                                                                                necesitas
                                                                                más
                                                                                ayuda,{" "}
                                                                                <a
                                                                                    className="subrayartextoclicaqui"
                                                                                    onClick={() =>
                                                                                        masayuda()
                                                                                    }>
                                                                                    haz
                                                                                    clic
                                                                                    aquí
                                                                                </a>
                                                                            </a>
                                                                        </div>
                                                                        <div className="datasProblPersonas mt-10">
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
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                          
                                                            <Grid
                                                                item
                                                                xs={4}
                                                                md={4}
                                                                lg={4} 
                                                                >
                                                                <Grid
                                                                    container
                                                                    spacing={1}
                                                                    className="productCompradoTres">
                                                                    <Grid
                                                                        item
                                                                        xs={4}
                                                                        md={4}
                                                                        lg={4}
                                                                        className="imageresultproblema">
                                                                        <img
                                                                            src={`${URL_IMAGES_RESULTS}${producto.nombreImagen}`}
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={8}
                                                                        md={8}
                                                                        lg={8}
                                                                        
                                                                        >
                                                                        <Grid className="subContMiscompras">
                                                                            <p className="tituloprdproblema">
                                                                                {
                                                                                    producto.nombreProducto
                                                                                }
                                                                            </p>
                                                                            <div className="divCantCompradas">
                                                                                <p className="UnidCompradas">
                                                                                    Unidades
                                                                                    compradas:
                                                                                </p>
                                                                                <p className="numeroUnidsCompradas">
                                                                                    {
                                                                                        producto.cantidad
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                            <div className="divNcompra">
                                                                                <p className="UnidCompradas">
                                                                                    {" "}
                                                                                    Número
                                                                                    de
                                                                                    compra:
                                                                                </p>
                                                                                <p className="numeroUnidsCompradas">
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
                                                            </Grid>
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
