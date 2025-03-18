import Container from "../../components/layouts/Container";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "@mui/material/Link";
import { AiOutlineRight } from "react-icons/ai";
import { URL_BD_MR, URL_IMAGES_RESULTSSMS } from "../../helpers/Constants";
import { useDispatch, useSelector } from "react-redux";
import ModalMensajes from "../mensajes/ModalMensajes";
import moment from "moment";

export default function verCompra() {
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [facturasVtasPrd, setFacturasVtasPrd] = useState(null);
    const [guiaDespacho, setGuiaDespacho] = useState(null);
    const [estadoFactura, setEstadofactura] = useState(0);
    const fechaactual = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [estadoDespacho, setEstadoDespacho] = useState(null);

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const router = useRouter();
    const irA = useRef(null); //PosiciónTopPage
    const [contarPrb, setContarPrb] = useState(0);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    //Función para obtener el UID del Usuario que nos sirve para mapear sus historial
    useEffect(() => {
        const leerMensajes = async () => {
            setContarPrb(0);
            let params = {
                estado: 31,
                idcomprador: datosusuarios.uid,
            };
            //console.log("PARAMS: ", params);
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "289",
                    params,
                });

                //idaprobacioncompra
                let datmessage = res.data.listarmensajes;
                let contador = 0;
                //console.log("DATOS XX : ", datmessage);
                datmessage &&
                    datmessage.map((row, index) => {
                        if (
                            row.idmicompra > 0 &&
                            row.idproducto == producto.idproducto
                        ) {
                            contador = contador + 1;
                            setContarPrb(contador);
                        }
                    });
            } catch (error) {
                console.error("Error al leer datos mensajes", error);
                // Maneja el error según tus necesidades
            }
        };
        leerMensajes();
    }, [datosusuarios]);

    //recibir los datos del producto comprado y guardar url para cuando reinicie seguir en el mismo
    let producto = null;
    let uidcomprador = null;

    if (typeof window !== "undefined") {
        if (router.query.producto) {
            producto = JSON.parse(router.query.producto);
            console.log("DATPRD : ", producto);
            // Guardar los datos en el almacenamiento local
            localStorage.setItem("producto", JSON.stringify(producto));
        } else {
            // Recuperar los datos del almacenamiento local
            const data = localStorage.getItem("producto");
            if (data) {
                producto = JSON.parse(data);
            }
            //console.log("DATPRD : ", producto);
        }
    }

    if (typeof window !== "undefined") {
        if (router.query.uidcomprador) {
            uidcomprador = JSON.parse(router.query.uidcomprador);
            //console.log("UIDCOMPRADOR : ", router.query.uidcomprador);
        }
    }

    useEffect(() => {
        const leerMensajes = async () => {
            setContarPrb(0);
            let params = {
                estado: 31,
                idcomprador: uidcomprador,
            };
            //console.log("PARAMS: ", params);
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "289",
                    params,
                });

                //idaprobacioncompra
                let datmessage = res.data.listarmensajes;
                let contador = 0;
                //console.log("DATOS XX : ", datmessage);
                datmessage &&
                    datmessage.map((row, index) => {
                        if (
                            row.idmicompra > 0 &&
                            row.idproducto == producto.idproducto
                        ) {
                            contador = contador + 1;
                            setContarPrb(contador);
                        }
                    });
            } catch (error) {
                console.error("Error al leer datos mensajes", error);
                // Maneja el error según tus necesidades
            }
        };
        if (uidcomprador) leerMensajes();
    }, [uidcomprador]);

    //toppagewhilesign
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    useEffect(() => {
       
        if (producto) {
            let facturasvtaprd = [];
            const leerfacturaDeLaVenta = async () => {
                let params = {
                    numerodeventa: producto.numerodeaprobacion
                }

                console.log("PARAMS Prd : ", params)

                try {
                    const res = await axios({
                        method: "post",
                        url: URL_BD_MR + "290", params
                    });

                    console.log("PrdGGGGG : ", res.data.listarfacturavendedor)

                    if (res.data.type == 1) {
                        if (res.data.listarfacturavendedor.length > 0) {
                            console.log("FACTURA PRD : ", res.data.listarfacturavendedor);
                            setFacturasVtasPrd(res.data.listarfacturavendedor[0].nombreimagen1);
                            setEstadofactura(44)
                        }
                    }
                } catch (error) {
                    console.error("Error al leer los datos", error);
                }
            };
            leerfacturaDeLaVenta();

            const leeGuiaDespacho = async () => {
                let params = {
                    numerodeventa: producto.numerodeaprobacion
                }

                try {
                    const res = await axios({
                        method: "post",
                        url: URL_BD_MR + "1101", params
                    });

                    console.log("DATAGUIA : ", res.data.listarcontguiadespacho);

                    if (res.data.type == 1) {
                        if (res.data.listarcontguiadespacho.length > 0) {
                            //console.log("DATAGUIA : ", res.data.listarcontguiadespacho);

                            setGuiaDespacho(res.data.listarcontguiadespacho[0].pdfguiadespacho);
                            setEstadoDespacho(res?.data?.listarcontguiadespacho[0]?.estadodeldespacho);
                            //setEstadofactura(res.data.listarcontguiadespacho[0].estadodelafactura)
                        }
                    }
                } catch (error) {
                    console.error("Error al leer datos de la guía", error);
                }
            };
            leeGuiaDespacho();
        }
    }, [producto])

    const tengoUnProblema = (data) => {
        if (contarPrb > 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Problemas con tu compra");
            setTextoMensajes(
                "Tienes un caso activo relacionada con este compra, no puedes crear dos casos sobre el mismo producto!"
            );
            return;
        } else {
            localStorage.setItem("tengoproblema", JSON.stringify(1));
            router.push({
                pathname: "./linktoTengounProblema",
                query: {
                    producto: JSON.stringify(data),
                },
            });
        }
    };

    const nollegomicrompra = (data) => {
        if (contarPrb > 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Problemas con tu compra");
            setTextoMensajes(
                "Tienes un caso activo relacionada con este compra, no puedes crear dos casos sobre el mismo producto!"
            );
            return;
        } else {
            localStorage.setItem("tengoproblema", JSON.stringify(0));
            router.push({
                pathname: "./tengoUnProblema",
                query: {
                    producto: JSON.stringify(producto),
                },
            });
        }
    };

    const recibiProducto = (data) => {
        //console.log("PRODUCTO : ", producto)
        //return
        setShowModalMensajes(true);
        setTituloMensajes("Recibiste tu producto");
        setTextoMensajes(
            "Gracias por informarnos sobre la recepción de tu producto!"
        )

        const crearNotificacionEstado = async () => {
            const idnotificacion = Math.floor(Math.random() * 10000000);
            let comentario = 'El comprar ha recibido el producto con número de compra ' + producto.numerodeaprobacion + " notifico el día " + fechaactual;

            let params = {
                uidusuario: 1652703118227,
                idnotificacion: idnotificacion,
                comentario: comentario,
                estado: 90,
                ctlrnotificaentrada: 0,
                ctlrnotificasalida: 0,
                tiponotificacion: 2,
            }

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "167", params
                });

                if (res.data.type == 1) {
                    console.log("Notificación al aminsitrador creada")
                    //return;
                    const updateEstadoDespacho = async () => {
                        let params = {
                            estadoventa: 54,
                            id: producto.idmicompra
                        }
                        //console.log("PARAMS : ", params)
                        try {
                            const res = await axios({
                                method: "post",
                                url: URL_BD_MR + "820", params
                            });

                            console.log("PARAMS : ", res.data)

                            if (res.data.type == 1) {
                                console.log("Estado del despacho actualizado")


                                const crearNotificacionUsuario = async () => {

                                    const idnotificacion = Math.floor(Math.random() * 10000000);
                                    let comentario = 'Por  favor recuerda calificar el producto, y tu experiencia de compra en MR';

                                    let params = {
                                        estado: 0,
                                        uidusuario: producto.uidcomprador,
                                        idorigen: producto.numerodeaprobacion,
                                        idnotificacion: idnotificacion,
                                        comentario: comentario,
                                        estado: 90,
                                        ctlrnotificaentrada: 0,
                                        ctlrnotificasalida: 0,
                                        tiponotificacion: 1,
                                    }

                                    try {
                                        const res = await axios({
                                            method: "post",
                                            url: URL_BD_MR + "823", params
                                        });

                                        if (res.data.type == 1) {
                                            console.log("Notificación creada")
                                            router.push("./misCompras");
                                        }
                                    } catch (error) {
                                        console.error("Error creando Notificación", error);
                                    }
                                };
                                crearNotificacionUsuario();
                            }
                        } catch (error) {
                            console.error("Error al actualizar estado del despacho", error);

                        }
                    };
                    updateEstadoDespacho();

                }
            } catch (error) {
                console.error("Error creando Notificación", error);
            }
        };
        crearNotificacionEstado();
    };

    return (
        <>
            <div ref={irA}>
                {producto ? (
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
                                <div>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6} md={6} lg={6}>
                                            <Link
                                                underline="none"
                                                color="inherit"
                                                href="./misCompras"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    router.push("./misCompras");
                                                }}
                                                sx={{
                                                    color: "#D9D9D9",
                                                    fontSize: 22,
                                                    fontWeight: 700,
                                                }}>
                                                <div className="mt-10 ml-70">
                                                    Mis Compras
                                                </div>
                                            </Link>
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        className="contDataUsers"
                                        container
                                        style={{
                                            width: isMdDown ? "100%" : "90%",
                                        }}>
                                        <Grid
                                            item
                                            xs={12}
                                            md={8}
                                            style={{
                                                borderRight:
                                                    "3px solid #EBEBEB",
                                                height: "21rem",
                                            }}>
                                            <div>
                                                <p
                                                    style={{
                                                        fontSize: "24px",
                                                        color: "#2D2E83",
                                                        fontWeight: "700",
                                                    }}>
                                                    {" "}
                                                    Estado compra{" "}
                                                </p>
                                            </div>
                                            <div
                                                className="subtitlesvercompra"
                                                style={{ display: "flex" }}>
                                                <p>Numero de compra:</p>
                                                <p>
                                                    {
                                                        producto.numerodeaprobacion
                                                    }
                                                </p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Fecha de compra:</p>
                                                <p>{producto.fechacompra}</p>
                                            </div>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            md={4}
                                            sx={{ paddingLeft: "4rem" }}>
                                            <div>
                                                <p
                                                    style={{
                                                        fontSize: "20px",
                                                        color: "#2D2E83",
                                                        fontWeight: "600",
                                                    }}>
                                                    {producto.nombreProducto}
                                                </p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Unidades compradas:</p>
                                                <p>{producto.cantidad}</p>
                                            </div>
                                            <div
                                                className="subtitlesvercompra"
                                                style={{ display: "flex" }}>
                                                <p>Precio del producto:</p>
                                                <p>${producto.preciodeventa}</p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Precio del envío:</p>
                                                <p>${producto.precioenvio}</p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Total:</p>
                                                <p>${parseInt(producto.preciodeventa) + parseInt(producto.precioenvio)}</p>
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        className="contDataUsers"
                                        container
                                        style={{
                                            width: isMdDown ? "100%" : "90%",
                                            marginTop: "4rem",
                                        }}>
                                        <div className="detallesypagovercompra">
                                            <p>Detalles de pago y envio</p>
                                        </div>
                                        <Grid
                                            className="ContPsubtitlesvercompra"
                                            item
                                            xs={12}
                                            md={8}>
                                            <div className="subtitlesvercompra">
                                                <p>Forma de pago:</p>
                                                <p>{producto.mediodepago} </p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Valor pagado:</p>
                                                <p>${parseInt(producto.preciodeventa) + parseInt(producto.precioenvio)}</p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Fecha de pago:</p>
                                                <p>{producto.fechadepago} </p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Estado del pago:</p>
                                                <p>
                                                    {" "}
                                                    {producto.estadomisventas}
                                                </p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Número de aprobación:</p>
                                                <p>
                                                    {
                                                        producto.numerodeaprobacion
                                                    }
                                                </p>
                                            </div>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            md={4}
                                            sx={{ paddingLeft: "4rem" }}>
                                            <div className="subtitlesvercompra">
                                                <p>Estado del despacho:</p>
                                                <p>
                                                    {producto.estadomiscompras}
                                                </p>
                                            </div>
                                            <div className="subtitlesvercompra direccionsubtcompraver">
                                                <p>Dirección de envío:</p>
                                                <p>
                                                    {producto.direcciondeenvio}{" "}
                                                </p>
                                            </div>
                                            <div className="subtitlesvercompraDos">
                                                <p>
                                                    {producto.nombreciudad},{" "}
                                                    {producto.nombre_dep}{" "}
                                                </p>
                                            </div>
                                            {
                                                /*
                                                <button className="RastrMiEnvVerCompraButton">
                                                    Rastrear mi envío
                                                </button>
                                                */
                                            }

                                        </Grid>
                                    </Grid>

                                    <Grid
                                        className="ContVendedor"
                                        container
                                        style={{
                                            width: isMdDown ? "100%" : "90%",
                                        }}>
                                        <div className="SubcontainerMisDatos">
                                            <div style={{ width: "85%" }}>
                                                <p className="titlecontVend1">
                                                    Contactar con vendedor
                                                </p>
                                                <p className="subtitlecontVend1">
                                                    {producto.nombreVendedor}{" "}
                                                    {producto.apellidoVendedor}
                                                </p>
                                            </div>
                                            <div className="EnviarmMsjVercompra">
                                                <button
                                                    onClick={() =>
                                                        router.push({
                                                            pathname:
                                                                "./msjVendedor",
                                                            query: {
                                                                producto:
                                                                    JSON.stringify(
                                                                        producto
                                                                    ),
                                                            },
                                                        })
                                                    }>
                                                    Enviar mensaje
                                                </button>
                                            </div>
                                        </div>
                                    </Grid>

                                    {
                                        estadoDespacho == 59 ?
                                            <div>
                                                <Grid
                                                    onClick={() =>
                                                        tengoUnProblema(producto)
                                                    }
                                                    className="ContVendedor3"
                                                    container
                                                    style={{
                                                        width: isMdDown ? "100%" : "90%",
                                                        cursor: "pointer",
                                                    }}>
                                                    <div
                                                        style={{
                                                            marginBottom: "2rem",
                                                            width: "100%",
                                                        }}>
                                                        <p className="titlecontVend2">
                                                            Ayuda con mi compra
                                                        </p>
                                                    </div>
                                                    <div className="containerTitlecontvendBottom">
                                                        <p className="titlecontvendBottom">
                                                            Tengo un problema con el
                                                            producto o con el paquete que me
                                                            llegó
                                                        </p>
                                                        <AiOutlineRight
                                                            size={30}
                                                            style={{ cursor: "pointer" }}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid
                                                    onClick={() =>
                                                        router.push({
                                                            pathname: "./calificarVendedor",
                                                            query: {
                                                                producto:
                                                                    JSON.stringify(
                                                                        producto
                                                                    ),
                                                            },
                                                        })
                                                    }
                                                    className="subContVendedor2"
                                                    container
                                                    style={{
                                                        width: isMdDown ? "100%" : "90%",
                                                        cursor: "pointer",
                                                    }}>
                                                    <div className="containerTitlecontvendBottom">
                                                        <p className="titlecontvendBottom">
                                                            Calificar vendedor
                                                        </p>
                                                        <AiOutlineRight
                                                            size={30}
                                                            style={{ cursor: "pointer" }}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid
                                                    onClick={() =>
                                                        router.push({
                                                            pathname: "./calificarProducto",
                                                            query: {
                                                                producto:
                                                                    JSON.stringify(
                                                                        producto
                                                                    ),
                                                            },
                                                        })
                                                    }
                                                    className="subContVendedor2"
                                                    container
                                                    style={{
                                                        width: isMdDown ? "100%" : "90%",
                                                        cursor: "pointer",
                                                    }}>
                                                    <div className="containerTitlecontvendBottom">
                                                        <p className="titlecontvendBottom">
                                                            Calificar producto
                                                        </p>
                                                        <AiOutlineRight
                                                            size={30}
                                                            style={{ cursor: "pointer" }}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid
                                                    onClick={() =>
                                                        nollegomicrompra(producto)
                                                    }
                                                    className="subContVendedor2"
                                                    container
                                                    style={{
                                                        width: isMdDown ? "100%" : "90%",
                                                        cursor: "pointer",
                                                    }}>
                                                    <div className="containerTitlecontvendBottom">
                                                        <p className="titlecontvendBottom">
                                                            No llegó mi compra
                                                        </p>
                                                        <AiOutlineRight
                                                            size={30}
                                                            style={{ cursor: "pointer" }}
                                                        />
                                                    </div>
                                                </Grid>
                                            </div>
                                            :
                                            null
                                    }

                                    {contarPrb > 0 ? (
                                        <Grid
                                            onClick={() =>
                                                router.push({
                                                    pathname:
                                                        "/MisCompras/SeguimientoProblemas",
                                                    query: {
                                                        producto:
                                                            JSON.stringify(
                                                                producto
                                                            ),
                                                    },
                                                })
                                            }
                                            className="UltsubContVendedor2"
                                            container
                                            style={{
                                                width: isMdDown
                                                    ? "100%"
                                                    : "90%",
                                                cursor: "pointer",
                                            }}>
                                            <div className="containerTitlecontvendBottom">
                                                <p className="titlecontvendBottom">
                                                    Seguimiento de mi problema
                                                </p>
                                                <AiOutlineRight
                                                    size={30}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                />
                                            </div>
                                        </Grid>
                                    ) : null}


                                    {
                                        facturasVtasPrd && estadoFactura == 44 ?
                                            <br />
                                            :
                                            null
                                    }
                                    {
                                        facturasVtasPrd && estadoFactura == 44 ?
                                            <Grid
                                                className="subContVendedor2"
                                                container
                                                style={{
                                                    width: isMdDown ? "100%" : "90%",
                                                    cursor: "pointer",
                                                }}>
                                                <a
                                                    href={`${URL_IMAGES_RESULTSSMS}${facturasVtasPrd}`}
                                                >
                                                    <div className="containerTitlecontvendBottom">
                                                        <p className="titlecontvendBottom">
                                                            Ya puedes consultar o descargar tu factura
                                                        </p>
                                                    </div>
                                                </a>
                                            </Grid>
                                            :
                                            null
                                    }
                                    {
                                        guiaDespacho ?
                                            <br />
                                            :
                                            null
                                    }
                                    {
                                        guiaDespacho ?
                                            <Grid
                                                className="subContVendedor2"
                                                container
                                                style={{
                                                    width: isMdDown ? "100%" : "90%",
                                                    cursor: "pointer",
                                                }}>
                                                <a
                                                    href={producto.urlpdf}
                                                >
                                                    <div className="containerTitlecontvendBottom">
                                                        <p className="titlecontvendBottom">
                                                            Aquí puedes consultar o descargar tu guía de despacho
                                                        </p>
                                                    </div>
                                                </a>
                                            </Grid>
                                            :
                                            null
                                    }
                                    
                                    {
                                        guiaDespacho ?
                                            <Grid
                                                className="subContVendedor2"
                                                container
                                                style={{
                                                    width: isMdDown ? "100%" : "90%",
                                                    cursor: "pointer",
                                                }}>
                                                <a
                                                    href="https://www.envioclick.com/paqueteria/tcc/rastreo-tcc#:~:text=D%C3%B3nde%20rastrear%20tu%20paquete%20TCC&text=Consulta%20el%20estatus%20de%20tu,introduce%20tu%20n%C3%BAmero%20de%20gu%C3%ADa.&text=Consulta%20el%20n%C3%BAmero%20telef%C3%B3nico%20actualizado,sitio%20web%20de%20la%20paqueter%C3%ADa"
                                                    target="_blank"
                                                >
                                                    <div className="containerTitlecontvendBottom">
                                                        <p className="titlecontvendBottom">
                                                            Rastrear mi envío
                                                        </p>
                                                    </div>
                                                </a>
                                            </Grid>
                                            :
                                            null
                                    }

                                    {
                                        producto.estadodeldespacho == 58 ?
                                            <Grid
                                                className="subContVendedor2"
                                                container
                                                style={{
                                                    width: isMdDown ? "100%" : "90%",
                                                    cursor: "pointer",
                                                }}>

                                                <div className="containerTitlecontvendBottom"
                                                    onClick={() => recibiProducto()}
                                                >
                                                    <p className="titlecontvendBottom">
                                                        He recibido mi producto ha satisfacción
                                                    </p>
                                                </div>

                                            </Grid>
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                    </Container>
                ) : (
                    <div>
                        {/* Aquí puedes manejar el caso en que 'producto' es 'null' */}
                        <p>Cargando datos del producto...</p>
                    </div>
                )}
            </div>
        </>
    );
}
