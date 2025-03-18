import React, { useEffect, useState } from "react";
import { toggleDrawer } from "~/store/app/action";
import { useDispatch, connect, useSelector } from "react-redux";
import Link from "next/link";
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getDataWishList } from "../../../../store/datawishlist/action";
import { getDataShoppingCart } from "../../../../store/datashoppingcart/action";
import { useRouter } from "next/router";
import axios from "axios";
import { URL_BD_MR } from "../../../../helpers/Constants";
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { RxBell } from "react-icons/rx";
import AppMenuUser from "../../../../pages/LateralMenu/AppMenuUser";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { getUserMenuPrimary } from "../../../../store/usermenuprimary/action";
import { getUserMenu } from "../../../../store/usermenu/action";
import { getCtlrNotificacion } from "../../../../store/ctlrnotificacion/action";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import NotificacionesComponente from "./NotificacionesComponente";
import Moment from "moment";

import { Box, Grid, Popover, Typography } from "@mui/material";
import { AiOutlineNotification } from "react-icons/ai";
import { PiBasketBold } from "react-icons/pi"; //Icono para compra - como comprador 
import { TbMessageHeart } from "react-icons/tb";//icono para cuando se califico el vendedor - como vendedor
import { MdOutlineSell } from "react-icons/md"; //Iocno para cuando se hace venta - como vendedor
import { RiCheckDoubleLine } from "react-icons/ri"; //para cuando hizo la entrega - como vendedor
import { TbAlertCircle } from "react-icons/tb";
import { RxQuestionMarkCircled } from "react-icons/rx"; //para cuando le hacen una pregunta en preguntas y respuestas
import { TbMessageDown } from "react-icons/tb"; //respuesta de vendedor - como comprador
import ModalMensajes from "../../../../pages/mensajes/ModalMensajes";

//Firebase
import firebase from "../../../../utilities/firebase";
import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "firebase/auth";

import {
    caculateArrayQuantity,
    calculateCartQuantity,
} from "~/utilities/ecomerce-helpers";
import moment from "moment";

const ModuleHeaderActions = ({ ecomerce, search = false }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [cartTotal, setCartTotal] = useState(0);
    const [wishlistTotal, setWishlistTotal] = useState(0);
    const [inicialesUser, setInicialesUser] = useState("");
    const [openOption, setOpenOption] = React.useState(false);
    const [openClose, setOpenClose] = React.useState(true);
    const [recargarDatos, setRecargarDatos] = React.useState(false);

    // Asignamos Datos al arreglo de Usuarios desde el state
    const [showModalMensaje, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);


    let datosusuarios = null;
    datosusuarios = useSelector((state) => state.userlogged.userlogged);
    //console.log("DATOS USUARIO STATE : ", datosusuarios);
    const numberitemswishlist = useSelector((state) => state.wishlist.datawishlist);
    const numberitemsshoppingcart = useSelector((state) => state.datashoppingcart.datashoppingcart);

    const [isOpen, setIsOpen] = useState(false);
    const activausermenuprimary = useSelector((state) => state.usermenuprimary.usermenuprimary);
    const activausermenu = useSelector((state) => state.usermenuprimary.usermenu);
    //const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    //const ctlrnotificacion = useSelector((state) => state.ctlrnotificacion.ctlrnotificacion);

    function handleOpenDrawer(e) {
        e.preventDefault();
        dispatch(toggleDrawer(true));
    }

    const handleClickAway = () => {
        setOpenOption(false);
        setOpenClose(false);
    };

    useEffect(() => {
        if (!openOption) {
            setOpenOption(true);
        }
    }, [openOption]);

    useEffect(() => {

        if (datosusuarios.uid > 0) {
            //alert("ENTRE")
            //console.log("DATOS USUARIO STATE : ", datosusuarios);
            let primerletra = datosusuarios.name.charAt(0);
            let segundaletra = datosusuarios.lastname.charAt(0);
            setInicialesUser(primerletra + segundaletra)
        }
    }, [datosusuarios]);

    const Salir = () => {
        const auth = getAuth(firebase);
        signOut(auth).then(() => {
            // Sign-out successful.
            router.push("/");
            console.log("Sesión Cerrada")
        }).catch((error) => {
            // An error happened.
            console.log("Error Cerrando Sesión")
        });
    }

    useEffect(() => {
        const leerItems = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "54",
                params,
            })
                .then((res) => {
                    //console.log("DAT WISH LIST: ", res.data.listaritemdeseos.length);
                    dispatch(getDataWishList(res.data.listaritemdeseos.length));
                })
                .catch(function (error) {
                    console.log("Error número de productos en lista de deseos");
                });
        };
        leerItems();

        if (ecomerce.cartItems) {
            setCartTotal(calculateCartQuantity(ecomerce.cartItems));
        }
        if (ecomerce.wishlistItems) {
            setWishlistTotal(caculateArrayQuantity(ecomerce.wishlistItems));
        }
    }, []);

    useEffect(() => {
        const leerItemsCart = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "59",
                params,
            })
                .then((res) => {
                    //console.log("DAT WISH LIST: ", res.data.listaritemdeseos.length);
                    dispatch(getDataShoppingCart(res.data.listarcarritocompra.length));
                })
                .catch(function (error) {
                    console.log("Error número de productos en carrito de compras");
                });
        };
        leerItemsCart();

        if (ecomerce.cartItems) {
            setCartTotal(calculateCartQuantity(ecomerce.cartItems));
        }
        if (ecomerce.wishlistItems) {
            setWishlistTotal(caculateArrayQuantity(ecomerce.wishlistItems));
        }
    }, [numberitemswishlist]);

    // view
    let searchBtnView;
    if (search) {
        searchBtnView = (
            <li>
                <a className="header__action" href="#">
                    <i className="icon-magnifier"></i>
                </a>
            </li>
        );
    }

    const reiniciarCtr = () => {
        setOpenClose(false);
        dispatch(getUserMenu(false));
        localStorage.setItem(
            "contrview",
            JSON.stringify(0)
        );
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [preguntas, setPreguntas] = useState([]);
    const [compras, setCompras] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [notificacionesgen, setNotificacionesGen] = useState([]);
    const [notificacionesRecientes, setNotificacionesRecientes] = useState([]);
    const [respuestas, setRespuestas] = useState([]);

    useEffect(() => {
        const leerRespuestas = async () => {
            let params = {
                uidcomprador: datosusuarios.uid,
            };

            //console.log("PARAMSRESP:", params);

            await axios({
                method: "post",
                url: URL_BD_MR + "5211",
                params,
            })
                .then((res) => {
                    if (res.data.type === 1) {
                        console.log("Respuestas del usuario para notificaciones:", res.data.listpreguntacompra);
                        const comprasConTipo = res.data.listpreguntacompra.map(respuesta => ({ ...respuesta, tipo: 'respuesta' }));
                        setRespuestas(comprasConTipo);
                    } else if (res.data.type === 0 || res.data === "ERROR de respuestas") {
                        console.error("Error del servidor de respuestas:", res.data);
                    } else {
                        console.error("Respuesta inesperada del servidor de respuestas:", res.data);
                    }
                })
                .catch(function (error) {
                    console.error("Error al hacer la petición de respuestas:", error);
                });
        };

        leerRespuestas();
    }, []);

    useEffect(() => {
        const leerComrpasUsuario = async () => {
            let params = {
                uidcomprador: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "1031",
                params,
            })
                .then((res) => {
                    if (res.data.type === 1) {
                        console.log("Compras del usuario para notificaciones:", res.data.listarmiscompras);
                        const comprasConTipo = res.data.listarmiscompras.map(compra => ({ ...compra, tipo: 'compra' }));
                        setCompras(comprasConTipo);
                    } else if (res.data.type === 0 || res.data === "ERROR al leer compra notificaciones") {
                        console.error("Error del servidor al leer compra notificaciones:", res.data);
                    } else {
                        console.error("Respuesta inesperada del servidor al leer compra notificaciones:", res.data);
                    }
                })
                .catch(function (error) {
                    console.error("Error al hacer la petición al leer compra notificaciones:", error);
                });
        };

        leerComrpasUsuario();
    }, []);

    useEffect(() => {
        const leerVentasUsuario = async () => {
            let params = {
                uidvendedor: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "1061",
                params,
            })
                .then((res) => {
                    if (res.data.type === 1) {
                        console.log("Ventas del usuario para notificaciones ventas:", res.data.listarmisventas);
                        const ventasConTipo = res.data.listarmisventas.map(venta => ({ ...venta, tipo: 'venta' }));
                        setVentas(ventasConTipo);
                    } else if (res.data.type === 0 || res.data === "ERROR ventas") {
                        console.error("Error del servidor ventas:", res.data);
                    } else {
                        console.error("Respuesta inesperada del servidor ventasx:", res.data);
                    }
                })
                .catch(function (error) {
                    console.error("Error al hacer la petición ventas:", error);
                });
        };
        leerVentasUsuario();
    }, []);

    useEffect(() => {
        const leerPreguntasRecientes = async () => {
            let params = {
                uidvendedor: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "5215",
                params,
            })
                .then((res) => {
                    if (res.data.type === 1) {
                        let preguntasFiltradas = [];
                        let preguntasConTipo = [];
                        console.log("Preguntas fILTRADAS:", res.data.listarpreguntavend);
                        /*
                        if (res.data.listarpreguntavend.length > 0) {
                            console.log("Preguntas recientes del usuario de preguntas:", res.data.listarpreguntavend);
                            preguntasFiltradas = res.data.listarpreguntavend.filter(pregunta =>
                                pregunta.estado === 81 &&
                                res.data.listarpreguntavend.some(p => p.idpregunta === pregunta.idpregunta && p.estado === 83)
                            );
                            preguntasConTipo = preguntasFiltradas.map(pregunta => ({ ...pregunta, tipo: 'pregunta' }));
                            //console.log("Preguntas fILTRADAS:", preguntasConTipo);
                        }
                        */
                        setPreguntas(preguntasConTipo);
                    } else if (res.data.type === 0 || res.data === "ERROR de preguntas") {
                        console.error("Error del servidor  de preguntas:", res.data);
                    } else {
                        console.error("Respuesta inesperada del servidor  de preguntas:", res.data);
                    }
                })
                .catch(function (error) {
                    console.error("Error al hacer la petición preguntas:", error);
                });
        };

        leerPreguntasRecientes();
    }, []);

    useEffect(() => {
        const leerNotificacionesActivas = async () => {
            let params = {
                uidusuario: datosusuarios.uid,
            };

            //console.log("USER ID:", params);
            await axios({
                method: "post",
                url: URL_BD_MR + "825",
                params,
            })
                .then((res) => {
                    if (res.data.type === 1) {
                        //console.log("Notificación ACTIVAS Usuario:", res.data.listarnotificacionesactivas);
                        let datanotificacion = res.data.listarnotificacionesactivas;
                        localStorage.setItem(
                            "notificacionesusuario",
                            JSON.stringify(datanotificacion)
                        );
                    } else if (res.data.type === 0 || res.data === "ERROR de notificaciones") {
                        console.error("Error notificaciones activas:", res.data);
                    } else {
                        console.error("Respuesta inesperada notificaciones activas:", res.data);
                    }
                })
                .catch(function (error) {
                    console.error("Error petición notificaciones activas:", error);
                });
        };

        //leerNotificacionesActivas();

        const leerNotificacionesGeneral = async () => {

            let params = {
                uidusuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "824",
                params,
            })
                .then((res) => {
                    if (res.data.type === 1) {
                        console.log("Notificación General Usuario:", res.data.listarnotificaciones);
                        let datanotificacion = res.data.listarnotificaciones;
                        localStorage.setItem(
                            "notificacionesusuario",
                            JSON.stringify(datanotificacion)
                        );

                        let notificacionesFiltradas = [];
                        let notificacionesConTipo = [];
                        if (res.data.listarnotificaciones.length > 0) {
                            //alert(res.data.listarnotificaciones.length)
                            notificacionesFiltradas = res.data.listarnotificaciones.filter(notificacion =>
                                (notificacion.estado == 90 || notificacion.estado == 91) &&
                                res.data.listarnotificaciones.some(p => p.idnotificacion === notificacion.idnotificacion &&
                                    (p.estado === 90 || p.estado === 91))
                            );
                            notificacionesConTipo = notificacionesFiltradas.map(notificacion => ({ ...notificacion, tipo: 'notificacion' }));
                        }

                        //console.log("notificaciones fILTRADAS:", notificacionesConTipo);
                        setNotificacionesGen(notificacionesConTipo);
                    } else if (res.data.type === 0 || res.data === "ERROR de notificaciones") {
                        console.error("Error del servidor  de notificaciones:", res.data);
                    } else {
                        console.error("Respuesta inesperada del servidor  de notificaciones:", res.data);
                    }
                })
                .catch(function (error) {
                    console.error("Error al hacer la petición notificación:", error);
                });
        };

        leerNotificacionesGeneral();
    }, []);

    useEffect(() => {
        //Verificamos que las variables estén definidas y no estén vacías
        //console.log("TRANSACCIONXXXX:", preguntas);
        if (compras && ventas && preguntas && respuestas && notificacionesgen) {
            // Unimos las compras, las ventas, las preguntas y las respuestas en una sola lista
            const transacciones = [...compras, ...ventas, ...preguntas, ...respuestas, ...notificacionesgen];
            // Mostramos las transacciones recientes en la consola
            // Ordenamos las transacciones por fecha
            transacciones.sort((a, b) => new Date(b.fechacompra || b.fechacreacion) - new Date(a.fechacompra || a.fechacreacion));
            //console.log("TRANSACCIONXXXX:", transacciones);
            // Nos quedamos con las 4 transacciones más recientes
            const recientes = transacciones.slice(0, 8);
            //console.log("Transacciones recientes:", recientes); // Mostramos las transacciones recientes en la consola
            let ctlrnotificacion = JSON.parse(localStorage.getItem("ctlrnotificacion"));

            if (ctlrnotificacion == 0) {
                localStorage.setItem("arraynotificacion", JSON.stringify(recientes));
                setNotificacionesRecientes(recientes);
                //dispatch(getCtlrNotificacion(1));
            } else {
                let arraynotificacion = JSON.parse(localStorage.getItem("arraynotificacion"));
                setNotificacionesRecientes(arraynotificacion);
            }
        } else {
            console.error("Error: Las variables compras, ventas, preguntas o respuestas están vacías o no definidas");
        }
    }, [compras, ventas, preguntas, respuestas, notificacionesgen]); // Este useEffect se ejecutará cada vez que cambien las compras, las ventas, las preguntas o las respuestas
    /*
        useEffect(() => {
            const interval = setInterval(() => {
                setRecargarDatos(true)
            }, 6000);
            return () => clearInterval(interval);
        }, []);
    */

    const irAPagina = (notificacion, index) => {
        let idnot = 0;
        if (notificacion.tipo === 'compra') {
            idnot = notificacion.numerodeaprobacion;
            const actNotCompra = async () => {
                let params = {
                    numerodeaprobacion: idnot
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR + "821",
                    params,
                })
                    .then((res) => {
                        console.log("Actualiza notificación compra OK.");
                    })
                    .catch(function (error) {
                        console.log("Error Actualiza notificación compra");
                    });
            };
            actNotCompra()
        } else
            if (notificacion.tipo === 'venta') {
                idnot = notificacion.numerodeaprobacion;
                const actNotVenta = async () => {
                    let params = {
                        numerodeaprobacion: idnot
                    };

                    await axios({
                        method: "post",
                        url: URL_BD_MR + "822",
                        params,
                    })
                        .then((res) => {
                            console.log("Actualiza notificación Venta OK.");
                        })
                        .catch(function (error) {
                            console.log("Error Actualiza notificación Venta");
                        });
                };
                actNotVenta()
            } else
                if (notificacion.tipo === 'pregunta') {
                    idnot = notificacion.idpregunta;
                    const actNotPregunta = async () => {
                        let params = {
                            idpregunta: idnot
                        };

                        await axios({
                            method: "post",
                            url: URL_BD_MR + "853",
                            params,
                        })
                            .then((res) => {
                                console.log("Actualiza notificación Pregunta OK.");
                            })
                            .catch(function (error) {
                                console.log("Error Actualiza notificación Pregunta");
                            });
                    };
                    actNotPregunta();
                } else
                    if (notificacion.tipo === 'respuesta') {
                        idnot = notificacion.idpregunta;
                        const actNotRespuesta = async () => {
                            let params = {
                                idpregunta: idnot
                            };

                            await axios({
                                method: "post",
                                url: URL_BD_MR + "854",
                                params,
                            })
                                .then((res) => {
                                    console.log("Actualiza notificación Respuesta OK.");
                                })
                                .catch(function (error) {
                                    console.log("Error Actualiza notificación Respuesta");
                                });
                        };
                        actNotRespuesta();
                    }

        localStorage.setItem("ctlrnotificacion", JSON.stringify(1));
        let arraynotificacion = JSON.parse(localStorage.getItem("arraynotificacion"));
        //console.log("NOTIFICAC : ", arraynotificacion.length);
        //alert(index)
        arraynotificacion.splice(index, 1);
        // Supongamos que tienes rutas separadas para compras y ventas
        //console.log("XXXXNOTFICAA : ", arraynotificacion.length);
        setNotificacionesRecientes(arraynotificacion);
        localStorage.setItem("arraynotificacion", JSON.stringify(arraynotificacion));

        if (notificacion.tipo === 'compra') {
            router.push('/MisCompras/misCompras');
        } else if (notificacion.tipo === 'venta') {
            router.push('/MisVentas/misVentas');
        }
        else if (notificacion.tipo === 'pregunta') {
            router.push('/PreguntasYrespuestas/preguntasSobreMisProductos');
        }
        else if (notificacion.tipo === 'respuesta') {
            router.push('/PreguntasYrespuestas/preguntasRealizadasPorUsuario');
        } else if (notificacion.tipo === 'notificacion') {

            console.log("NOTIFICAC : ", notificacion);
            const actualizaNotificacion = async () => {
                let params = {
                    ctllecturanotifica: 1,
                    id: notificacion.id
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR + "856",
                    params,
                })
                    .then((res) => {
                        console.log("Actualiza notificación Respuesta OK.");
                    })
                    .catch(function (error) {
                        console.log("Error Actualiza notificación Respuesta");
                    });
            };
            actualizaNotificacion();
            //setAnchorEl(null);

            router.push({
                pathname: "/Notification",
                query: {
                    tiponotificacion: "usuario",
                    uid: notificacion.uidusuario,
                    idnotificacion: notificacion.idnotificacion,
                },
            });

            setShowModalMensajes(true);
            setTituloMensajes("Notificaciones");
            setTextoMensajes(notificacion.comentario);

        }
    };

    useEffect(() => {
        if (activausermenuprimary)
            dispatch(getUserMenu(false));
    }, [activausermenuprimary]);

    const habilitarMenuUser = () => {
        setOpenClose(true);
        dispatch(getUserMenuPrimary(true));
        if (activausermenu)
            dispatch(getUserMenu(false));
        else
            dispatch(getUserMenu(true));
    }

    const handleModalClose = () => {
        setShowModalMensajes(false);
    };

    const Notificar = () => {

        notificacionesRecientes &&
            notificacionesRecientes.map((row, index) => {

                console.log("DDSASAS : ", row)

                let idnot = 0;
                if (row.tipo === 'compra') {
                    idnot = row.numerodeaprobacion;
                    const actNotCompra = async () => {

                        let params = {
                            numerodeaprobacion: idnot
                        };

                        await axios({
                            method: "post",
                            url: URL_BD_MR + "821",
                            params,
                        })
                            .then((res) => {
                                console.log("Actualiza notificación compra OK.");
                            })
                            .catch(function (error) {
                                console.log("Error Actualiza notificación compra");
                            });
                    };
                    actNotCompra()
                } else
                    if (row.tipo === 'venta') {
                        idnot = row.numerodeaprobacion;
                        const actNotVenta = async () => {


                            let params = {
                                numerodeaprobacion: idnot
                            };

                            await axios({
                                method: "post",
                                url: URL_BD_MR + "822",
                                params,
                            })
                                .then((res) => {
                                    console.log("Actualiza notificación Venta OK.");
                                })
                                .catch(function (error) {
                                    console.log("Error Actualiza notificación Venta");
                                });
                        };
                        actNotVenta()
                    } else
                        if (row.tipo === 'pregunta') {
                            idnot = row.idpregunta;
                            const actNotPregunta = async () => {

                                let params = {
                                    idpregunta: idnot
                                };

                                await axios({
                                    method: "post",
                                    url: URL_BD_MR + "853",
                                    params,
                                })
                                    .then((res) => {
                                        console.log("Actualiza notificación Pregunta OK.");
                                    })
                                    .catch(function (error) {
                                        console.log("Error Actualiza notificación Pregunta");
                                    });
                            };
                            actNotPregunta();
                        } else
                            if (row.tipo === 'respuesta') {
                                idnot = row.idpregunta;
                                const actNotRespuesta = async () => {

                                    let params = {
                                        idpregunta: idnot
                                    };

                                    await axios({
                                        method: "post",
                                        url: URL_BD_MR + "854",
                                        params,
                                    })
                                        .then((res) => {
                                            console.log("Actualiza notificación Respuesta OK.");
                                        })
                                        .catch(function (error) {
                                            console.log("Error Actualiza notificación Respuesta");
                                        });
                                };
                                actNotRespuesta();
                            } else
                                if (row.tipo === "notificacion") {

                                    const actualizaNotificacion = async () => {

                                        let params = {
                                            ctllecturanotifica: 1,
                                            id: row.id
                                        };

                                        await axios({
                                            method: "post",
                                            url: URL_BD_MR + "856",
                                            params,
                                        })
                                            .then((res) => {
                                                console.log("Actualiza notificación Respuesta OK.");
                                            })
                                            .catch(function (error) {
                                                console.log("Error Actualiza notificación Respuesta");
                                            });
                                    };
                                    actualizaNotificacion();
                                    //setAnchorEl(null);
                                }
            });

        let recientes = [];
        localStorage.setItem("arraynotificacion", JSON.stringify(recientes));
        setNotificacionesRecientes(recientes);

        router.push("/Notification");
        dispatch(getUserMenuPrimary(false));
        console.log("Sesión Cerrada");
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div>
                <ModalMensajes
                    shown={showModalMensaje}
                    close={handleModalClose}
                    titulo={tituloMensajes}
                    mensaje={textoMensajes}
                    tipo="error"
                />
                <ul className="header__actions">
                    {searchBtnView}
                    {
                        datosusuarios.logged ?
                            (
                                <div className="apuntador mt-10"
                                    onClick={() => habilitarMenuUser()}
                                >

                                    <Grid container spacing={1}>
                                        <Grid item xs={1} md={1} lg={1}>
                                            <div className="pt-1">
                                                <div className="BallDropdownNavbar">
                                                    <p>{datosusuarios ? `${inicialesUser}` : ' '}</p>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={10} md={10} lg={10}>
                                            {
                                                //<div className="nameuser">{" "} {datosusuarios ? `${datosusuarios.name+" "}${datosusuarios.lastname}` : ''}</div>
                                            }
                                            <div className="nameuser">{" "} {datosusuarios ? `${datosusuarios.usuario}` : ''}</div>
                                        </Grid>
                                        <Grid item xs={1} md={1} lg={1}>
                                            <ExpandMoreIcon
                                                //onClick={() => close()}
                                                className="apuntador"
                                                style={{
                                                    fontSize: 25,
                                                    color: "#2D2E83",
                                                    marginLeft: -10,
                                                    marginTop: 5,
                                                    marginBottom: 0,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            )
                            :
                            (
                                <div className="headercrearcuenta">
                                    <Row >
                                        <Col lg={6}>
                                            <div className="espaciotextocrearcuenta1">
                                                <a className="textocrearcuenta" href="/my-account">
                                                    Crea tu cuenta
                                                </a>
                                            </div>

                                        </Col>
                                        <Col lg={3}>
                                            <div className="espaciotextocrearcuenta">
                                                <Link href="/loginaccount">
                                                    <a className="textocrearcuenta">
                                                        Ingresa
                                                    </a>
                                                </Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            )
                    }
                    {
                        activausermenuprimary && openClose ?
                            <div className="divmenulateraldos">
                                <AppMenuUser />
                            </div>
                            :
                            null
                    }
                    {
                        !datosusuarios.uid || datosusuarios.uid === 0 ?
                            <li >
                                <a className="header__action colorbase deshabilitar">
                                    <RxBell />
                                    <span className="header__action-badge">
                                        0
                                    </span>
                                </a>
                            </li>
                            :
                            <li >
                                <a className="header__action colorbase" onClick={handleClick} >
                                    <RxBell />
                                    <span className="header__action-badge">
                                        {notificacionesRecientes && notificacionesRecientes.length ? notificacionesRecientes.length : 0}
                                    </span>
                                </a>
                            </li>
                    }

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        disableScrollLock={true}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <div className="MainContainerAlertas">
                            <div className="subMainContainerAlertas">
                                <Grid container spacing={1}>
                                    <Grid item xs={8} md={8} lg={8}>
                                        <p>Notificaciones</p>
                                    </Grid>
                                    <Grid item xs={4} md={4} lg={4}>
                                        <p className="vertodasnotificacion"
                                            onClick={() => Notificar(20)}
                                        >Ver todas</p>
                                    </Grid>
                                </Grid>
                            </div>

                            <div className="SubMainAlertasContenido">
                                {notificacionesRecientes && notificacionesRecientes.length > 0 ? (
                                    notificacionesRecientes && notificacionesRecientes.map((notificacion, index) => (
                                        <div className='notifCont' key={index} onClick={() => irAPagina(notificacion, index)}>
                                            <div className='notifContIcono'>
                                                {notificacion.tipo === 'compra' ? <PiBasketBold /> :
                                                    notificacion.tipo === 'venta' ? <MdOutlineSell /> :
                                                        notificacion.tipo === 'pregunta' ? <RxQuestionMarkCircled /> :
                                                            notificacion.tipo === 'notificacion' ? <AiOutlineNotification /> :
                                                                <TbMessageDown />}
                                            </div>

                                            <div className='notifContenido'>
                                                {
                                                    notificacion && notificacion.uidusuario != 0 ?
                                                        <p className="textonotificacionmr">
                                                            {notificacion.tipo === 'compra' ? 'Felicidades! compraste un producto' :
                                                                notificacion.tipo === 'venta' ? 'Felicidades! vendiste un producto' :
                                                                    notificacion.tipo === 'pregunta' ? 'Tienes una nueva pregunta' :
                                                                        notificacion.comentario && notificacion.tipo === 'notificacion' ? notificacion && notificacion.comentario.substr(0, 260) :
                                                                            'Tienes una nueva respuesta'}
                                                        </p>
                                                        :
                                                        null
                                                }

                                                <p>{
                                                    notificacion.tipo === 'compra' ?
                                                        Moment(
                                                            notificacion.fechacompra
                                                        ).format(
                                                            "YYYY-MM-DD HH:MM"
                                                        )
                                                        :
                                                        Moment(
                                                            notificacion.fechacreacion
                                                        ).format(
                                                            "YYYY-MM-DD HH:MM"
                                                        )
                                                }</p>
                                                <p>Toca para ver más</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No tienes notificaciones</p>
                                )}
                            </div>
                        </div>
                    </Popover>

                    {
                        !datosusuarios.uid || datosusuarios.uid === 0 ?
                            <li className="ml-10 deshabilitar">
                                <a className="header__action colorbase">
                                    <GoHeart className="mlmenos20" />
                                    <span className="header__action-badge mlmenos10">
                                        0
                                    </span>
                                </a>
                            </li>
                            :
                            <li className="ml-10"
                                onClick={() => reiniciarCtr()}
                            >
                                <Link href="/shop/wishlist">
                                    <a className="header__action colorbase">
                                        <GoHeart className="mlmenos20" />
                                        <span className="header__action-badge mlmenos10">
                                            {numberitemswishlist ? numberitemswishlist : 0}
                                        </span>
                                    </a>
                                </Link>
                            </li>
                    }


                    {
                        !datosusuarios.uid || datosusuarios.uid === 0 ?
                            <li>
                                <a className="header__action colorbase deshabilitar">
                                    <HiOutlineShoppingCart className="mlmenos20" />
                                    <span className="header__action-badge mlmenos10">
                                        0
                                    </span>
                                </a>
                            </li>
                            :
                            <li onClick={() => reiniciarCtr()}>
                                <Link href="/shop/shopping-cart">
                                    <a className="header__action colorbase">
                                        <HiOutlineShoppingCart className="mlmenos20" />
                                        <span className="header__action-badge mlmenos10">
                                            {numberitemsshoppingcart ? numberitemsshoppingcart : 0}
                                        </span>
                                    </a>
                                </Link>
                            </li>
                    }
                </ul>
            </div>
        </ClickAwayListener>
    );
};

export default connect((state) => state)(ModuleHeaderActions);