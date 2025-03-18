import Container from "../../components/layouts/Container";
import { Grid, useMediaQuery, useTheme, Button } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { URL_BD_MR } from "../../helpers/Constants";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import ModalMensajesShoppingCart from "../../pages/mensajes/ModalMensajesShoppingCart";
import { getLeeIra } from "../../store/leeira/action";
import LateralMenu from "../../pages/LateralMenu";
import MenuIcon from "@material-ui/icons/Menu";
import { getUserMenuPrimary } from "../../store/usermenuprimary/action";
import { getCloseMenu } from "../../store/closemenu/action";
import ModalControlAcceso from "../mensajes/ModalControlAcceso";

export default function facturacion() {
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    // console.log("Usuario Facturacion : ", datosusuarios);
    const [producto, setProducto] = useState({});
    const [compraReciente, setCompraReciente] = useState({});
    //NextRouter
    const router = useRouter();
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const irA = useRef(null); //PosiciónTopPage
    const [user, setUser] = useState(null);
    const [direccion, setDireccion] = useState(null);
    const [UidUser, setUidUser] = useState("");

    const [showModalMensajesShoppingCart, setShowModalMensajesShoppingCart] =
        useState(false);
    const [tituloMensajesShoppingCart, setTituloMensajesShoppingCart] =
        useState(false);
    const [textoMensajesShoppingCart, setTextoMensajesShoppingCart] =
        useState(false);

    const [showModalControlAcceso, setShowModalControlAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

    const [compraRecienteEstado70, setCompraRecienteEstado70] = useState(null);
    const [compraRecienteEstado71, setCompraRecienteEstado71] = useState(null);
    const [productoEstado70, setProductoEstado70] = useState(null);
    const [productoEstado71, setProductoEstado71] = useState(null);

    const [sombraOpen, setSombraOpen] = useState("");
    const [sombraOpenDos, setSombraOpenDos] = useState("segdoSubcontFactu");
    const [sombraOpenTres, setSombraOpenTres] = useState("contDataFactrs");

    const [controlImg, setControlImg] = useState("");
    const [disabledImg, setDisabledImg] = useState("menulateralcuatro");
    const [closeOpen, setcloseOpen] = useState(false);
    const activausermenu = useSelector((state) => state.usermenu.usermenu);
    const closemenu = useSelector((state) => state.closemenu.closemenu);

    useEffect(() => {
        if (datosusuarios.activo == 30) {
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Facturación");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            return;
        }
    });

    //toppagewhilesign
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        if (!datosusuarios.uid || datosusuarios.uid == 0) {
            /* Guarda datos del producto que se debe agregar al localstorage */
            localStorage.setItem("ira", JSON.stringify(7));
            localStorage.setItem("rutaira", JSON.stringify(router.pathname));

            dispatch(getLeeIra(7));

            setShowModalMensajesShoppingCart(true);
            setTituloMensajesShoppingCart(
                "¡Bienvenido! Para ir a facturación debes ingresar a tu cuenta"
            );
            let texto = "";
            setTextoMensajesShoppingCart(texto);
            //setLogin(true);
            return;
        }
    }, []);

    //función para formatear la fecha en cuando la factura estará lista
    const formatearFecha = (fechaCompra) => {
        let fechaDeCompra = null;
        if (fechaCompra) {
            const fecha = new Date(fechaCompra);
            const dia = String(fecha.getDate()).padStart(2, "0");
            const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript van de 0 a 11
            const ano = fecha.getFullYear();
            fechaDeCompra = `${dia}-${mes}-${ano}`;
        }
        return fechaDeCompra;
    };

    //función para obtener datos de usuario loggeado
    useEffect(() => {
        const obtenerDatosUsuario = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });
                setUidUser(res.data[0].uid);
                setUser(res.data[0]);
            } catch (error) {
                //    console.error("Error al leer los datos del usuario", error);
            }
        };
        obtenerDatosUsuario();
    }, [datosusuarios]);

    //función para obtener direccion de usuario
    useEffect(() => {
        const obtenerDireccionUsuario = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "65",
                    params,
                });
                // Ordenamos las direcciones por fecha de creación y seleccionamos la más reciente
                const direccionesOrdenadas =
                    res.data.listardireccionesusuario.sort(
                        (a, b) =>
                            new Date(b.fechacreacion) -
                            new Date(a.fechacreacion)
                    );
                setDireccion(direccionesOrdenadas[0]);
            } catch (error) {
                // console.error("Error al leer la dirección del usuario", error);
            }
        };
        obtenerDireccionUsuario();
    }, [datosusuarios]);

    //Función para obtener factura comparando con UId loggeado del vendedor o no
    useEffect(() => {
        const ObtenerFacturas = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "121",
                    params: {
                        uidvendedor: UidUser,
                    },
                });
                console.log("Datos del endPoint 121:", res.data);
                const comprasUsuario = res.data.listarcompras;

                if (comprasUsuario.length > 0) {
                    // Obtener la compra más reciente
                    const compraReciente = comprasUsuario.sort(
                        (a, b) =>
                            new Date(b.fechacompra) - new Date(a.fechacompra)
                    )[0];
                    console.log("Compra más reciente:", compraReciente);
                    setCompraReciente(compraReciente);

                    // Llamamos a ObtDatosProducto aquí
                    ObtDatosProducto(compraReciente.idproducto).then(
                        (producto) => setProducto(producto)
                    );

                    // Obtener la compra más reciente con estado 70
                    const comprasEstado70 = comprasUsuario.filter(
                        (compra) => compra.estadodelpago === 70
                    );
                    if (comprasEstado70.length > 0) {
                        const compraRecienteEstado70 = comprasEstado70.sort(
                            (a, b) =>
                                new Date(b.fechacompra) -
                                new Date(a.fechacompra)
                        )[0];
                        console.log(
                            "Compra más reciente con estado 70:",
                            compraRecienteEstado70
                        );
                        setCompraRecienteEstado70(compraRecienteEstado70);

                        // Llamamos a ObtDatosProducto aquí para el producto con estado 70
                        ObtDatosProducto(
                            compraRecienteEstado70.idproducto
                        ).then((producto) => setProductoEstado70(producto));
                    } else {
                        console.log(
                            "No hay compras con estado 70 para este usuario"
                        );
                    }

                    // Obtener la compra más reciente con estado 71
                    const comprasEstado71 = comprasUsuario.filter(
                        (compra) => compra.estadodelpago === 71
                    );
                    if (comprasEstado71.length > 0) {
                        const compraRecienteEstado71 = comprasEstado71.sort(
                            (a, b) =>
                                new Date(b.fechacompra) -
                                new Date(a.fechacompra)
                        )[0];
                        console.log(
                            "Compra más reciente con estado 71:",
                            compraRecienteEstado71
                        );
                        setCompraRecienteEstado71(compraRecienteEstado71);

                        // Llamamos a ObtDatosProducto aquí para el producto con estado 71
                        ObtDatosProducto(
                            compraRecienteEstado71.idproducto
                        ).then((producto) => setProductoEstado71(producto));
                    } else {
                        console.log(
                            "No hay compras con estado 71 para este usuario"
                        );
                    }
                } else {
                    console.log("No hay compras para este usuario");
                }
            } catch (error) {
                console.error("Error al leer los datos de las compras", error);
            }
        };
        ObtenerFacturas();
    }, [UidUser]);

    //obtener los datos del producto
    async function ObtDatosProducto(idproducto) {
        let params = {
            idarticulo: idproducto,
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "18",
                params,
            });
            const nombreProducto = res.data[0].name;
            const salePrice = res.data[0].sale_price;

            return { nombreProducto, salePrice };
        } catch (error) {
            console.error("Error al obtener el nombre del producto", error);
        }
    }

    // Función para renderizar los detalles de la última compra
    const renderUltimaCompra = () => {
        if (Object.keys(compraReciente).length > 0) {
            // Limita el nombre del producto a 40 caracteres
            const nombreProductoCorto =
                producto && producto.nombreProducto
                    ? producto.nombreProducto.slice(0, 40)
                    : "";

            return (
                <div>
                    <div>
                        <p>Impuestos y retenciones</p>
                    </div>
                    <p>Factura venta "{nombreProductoCorto}..."</p>
                    <p>
                        Retención de $
                        {compraReciente.retencion.toLocaleString("en-US")}
                    </p>
                    <p>
                        Impuestos de $
                        {compraReciente.impuestos.toLocaleString("en-US")}
                    </p>
                </div>
            );
        } else {
            return (
                <div className={sombraOpenDos}>
                    <div>
                        <p>No hay facturas disponibles.</p>
                    </div>
                </div>
            );
        }
    };

    const renderUltimaCompraEstado70 = () => {
        if (compraRecienteEstado70 && productoEstado70) {
            // Limita el nombre del producto a 40 caracteres
            const nombreProductoCorto = productoEstado70.nombreProducto
                ? productoEstado70.nombreProducto.slice(0, 40)
                : "";

            // Formatea la fecha de vencimiento
            const fechaDeVencimiento = formatearFecha(
                compraRecienteEstado70.fechadevencimiento
            );

            return (
                <div className="primerSubcontFactu">
                    <div>
                        <p>Facturas en curso</p>
                    </div>
                    <p>Factura venta "{nombreProductoCorto}..."</p>
                    <p>{compraRecienteEstado70.nombreestadopago}</p>
                    <p>La factura estará lista el {fechaDeVencimiento}</p>
                </div>
            );
        } else {
            return (
                <div className={sombraOpenDos}>
                    <div>
                        <p>No hay facturas en curso disponibles.</p>
                    </div>
                </div>
            );
        }
    };

    const renderUltimaCompraEstado71 = () => {
        if (compraRecienteEstado71 && productoEstado71) {
            // Limita el nombre del producto a 40 caracteres
            const nombreProductoCorto = productoEstado71.nombreProducto
                ? productoEstado71.nombreProducto.slice(0, 40)
                : "";

            // Formatea la fecha de vencimiento
            const fechaDeVencimiento = formatearFecha(
                compraRecienteEstado71.fechadevencimiento
            );

            return (
                <div className={sombraOpenDos}>
                    <div>
                        <div>
                            <p>Facturas por pagar</p>
                        </div>
                        <p>Factura venta "{nombreProductoCorto}..."</p>
                        <div className="statePaymentFacturacion">
                            {compraRecienteEstado71.nombreestadopago}
                        </div>
                        <p>La factura vence el {fechaDeVencimiento}</p>
                    </div>
                    <div className="buttonFactVermas">
                        <div
                            onClick={() =>
                                router.push({
                                    pathname: "./resFactura",
                                    query: {
                                        ultimaCompra: JSON.stringify(
                                            compraRecienteEstado71
                                        ),
                                        producto:
                                            JSON.stringify(productoEstado71),
                                    },
                                })
                            }>
                            Ver más
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={sombraOpenDos}>
                    <div>
                        <p>No hay facturas por pagar disponibles.</p>
                    </div>
                </div>
            );
        }
    };

    // Función para enviar mensajes
    useEffect(() => {
        setcloseOpen(false);
        setSombraOpen("");
        setSombraOpenDos("segdoSubcontFactu");
        setSombraOpenTres("contDataFactrs");
        //setDisabledImg("");
    }, [activausermenu]);

    useEffect(() => {
        if (closemenu) {
            setcloseOpen(false);
            setSombraOpen("");
            setSombraOpenDos("segdoSubcontFactu");
            setSombraOpenTres("contDataFactrs");
            //setDisabledImg("");
            dispatch(getCloseMenu(false));
        }
    }, [closemenu]);

    const closeOpenMenu = () => {
        setcloseOpen(true);
        setSombraOpen("disablemyaccountcuatro1");

        setSombraOpenDos("segdoSubcontFactuDisable");
        setSombraOpenTres("contDataFactrsDisable");
        setControlImg("disabledimg");
        dispatch(getUserMenuPrimary(false));
    };

    useEffect(() => {
        if (closeOpen) {
            setDisabledImg("menulateralcinco");
        } else {
            setDisabledImg("menulateralcuatro");
            setControlImg("");
        }
    }, [closeOpen]);

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <ModalMensajesShoppingCart
                            shown={showModalMensajesShoppingCart}
                            close={setShowModalMensajesShoppingCart}
                            titulo={tituloMensajesShoppingCart}
                            mensaje={textoMensajesShoppingCart}
                            setSoyNuevo={0}
                            setTengoCuenta={0}
                            tipo="1"
                        />
                        <ModalControlAcceso
                            shown={showModalControlAcceso}
                            close={setShowModalControlAcceso}
                            titulo={tituloControlAcceso}
                            mensaje={textoControlAcceso}
                            tipo="1"
                        />
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div
                                className="ps-page__content ps-account"
                                style={{ marginBottom: "28rem" }}>
                                <div className="mtmenos30">
                                    <Grid container spacing={1}>
                                        <Grid item xs={1} md={1} lg={1}>
                                            <Button
                                                variant="outline-light"
                                                onClick={() => closeOpenMenu()}
                                                style={{
                                                    backgroundColor:
                                                        "transparent",
                                                }}>
                                                <div className={disabledImg}>
                                                    <MenuIcon className="menuproperty" />
                                                </div>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={8} md={8} lg={8}>
                                            <div className="titlesformsUsersCuatro">
                                                <div className="textomisfacturas">
                                                    <p>Facturación</p>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <div className="mtmenos20">
                                                    {closeOpen ? (
                                                        <LateralMenu />
                                                    ) : null}
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>

                                <div className={sombraOpen}>
                                    <Grid
                                        className="contMainFacturacion"
                                        container
                                        style={{
                                            width: isMdDown ? "100%" : "90%",
                                        }}>
                                        <Grid
                                            item
                                            xs={12}
                                            md={8}
                                            className="primerContFacturacion"
                                            display={"flex"}
                                            flexDirection={"column"}>
                                            {renderUltimaCompraEstado70()}

                                            {renderUltimaCompraEstado71()}

                                            <div className={sombraOpenDos}>
                                                {renderUltimaCompra()}
                                                <div className="buttonFactVermas">
                                                    <div
                                                        onClick={() =>
                                                            router.push({
                                                                pathname:
                                                                    "./resFactura",
                                                                query: {
                                                                    ultimaCompra:
                                                                        JSON.stringify(
                                                                            compraReciente
                                                                        ),
                                                                    producto:
                                                                        JSON.stringify(
                                                                            producto
                                                                        ),
                                                                },
                                                            })
                                                        }>
                                                        Ver más
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>

                                        {user && direccion ? (
                                            <Grid
                                                item
                                                xs={12}
                                                md={4}
                                                className="segdoContFacturacion"
                                                display={"flex"}
                                                flexDirection={"column"}>
                                                <div className="buttonMisFacts">
                                                    <button
                                                        onClick={() =>
                                                            router.push({
                                                                pathname:
                                                                    "./misFacturas",
                                                            })
                                                        }>
                                                        Mis facturas
                                                    </button>
                                                </div>
                                                <div className={sombraOpenTres}>
                                                    <div className="titleContDataFactrs">
                                                        <p>Datos facturación</p>
                                                    </div>
                                                    <div className="dataFactrs">
                                                        <p>
                                                            Nombres y apellidos
                                                        </p>
                                                        <p>
                                                            {user.primernombre &&
                                                                user.primernombre}{" "}
                                                            {user.segundonombre &&
                                                                user.segundonombre}{" "}
                                                            {user.primerapellido &&
                                                                user.primerapellido}{" "}
                                                            {user.segundoapellido &&
                                                                user.segundoapellido}
                                                        </p>
                                                    </div>
                                                    <div className="dataFactrs">
                                                        <p>Documento</p>
                                                        <p>
                                                            {user.identificacion &&
                                                                user.identificacion}
                                                        </p>
                                                    </div>
                                                    <div className="dataFactrs">
                                                        <p>
                                                            Correo electrónico
                                                        </p>
                                                        <p>
                                                            {user.email &&
                                                                user.email}
                                                        </p>
                                                    </div>
                                                    <div className="dataFactrs">
                                                        <p>Dirección</p>
                                                        <p>
                                                            {
                                                                direccion.direccion
                                                            }
                                                            ,{" "}
                                                            {
                                                                direccion.nombreciudad
                                                            }
                                                            ,{" "}
                                                            {
                                                                direccion.nombre_dep
                                                            }
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="irDatosFact"
                                                        onClick={() =>
                                                            router.push({
                                                                pathname:
                                                                    "../EditUsers/MisDatos",
                                                            })
                                                        }>
                                                        <p>Editar datos</p>
                                                        <HiOutlineChevronRight className="iconRightFact" />
                                                    </div>
                                                </div>
                                            </Grid>
                                        ) : (
                                            <p>Cargando datos del usuario...</p>
                                        )}
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
