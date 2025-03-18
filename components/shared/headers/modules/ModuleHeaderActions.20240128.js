import React, { useEffect, useState } from "react";
import { toggleDrawer } from "~/store/app/action";
import { useDispatch, connect, useSelector } from "react-redux";
import Link from "next/link";
import { Modal, Button, Row, Col, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getDataWishList } from "../../../../store/datawishlist/action";
import { getDataShoppingCart } from "../../../../store/datashoppingcart/action";
import { useRouter } from "next/router";
import axios from "axios";
import { URL_BD_MR } from "../../../../helpers/Constants";
import { IoCartOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { LiaBellSolid } from "react-icons/lia";
import { RxBell } from "react-icons/rx";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";

import AppMenuUser from "../../../../pages/LateralMenu/AppMenuUser";
import { Box, Grid } from "@mui/material";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { getUserMenuPrimary } from "../../../../store/usermenuprimary/action";
import { getUserMenu } from "../../../../store/usermenu/action";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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

import NotificacionesComponente from "./NotificacionesComponente";

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import { PiBasketBold } from "react-icons/pi"; //Icono para compra - como comprador 
import { TbMessageHeart } from "react-icons/tb";//icono para cuando se califico el vendedor - como vendedor
import { MdOutlineSell } from "react-icons/md"; //Iocno para cuando se hace venta - como vendedor
import { RiCheckDoubleLine } from "react-icons/ri"; //para cuando hizo la entrega - como vendedor
import { TbAlertCircle } from "react-icons/tb";
import { RxQuestionMarkCircled } from "react-icons/rx"; //para cuando le hacen una pregunta en preguntas y respuestas
import { TbMessageDown } from "react-icons/tb"; //respuesta de vendedor - como comprador

const ModuleHeaderActions = ({ ecomerce, search = false }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [cartTotal, setCartTotal] = useState(0);
    const [wishlistTotal, setWishlistTotal] = useState(0);
    const [openUno, setOpenUno] = React.useState(false);
    const [openClose, setOpenClose] = React.useState(true);
    const [datosUsuario, setDatosUsuario] = useState(null);

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const numberitemswishlist = useSelector((state) => state.wishlist.datawishlist);
    const numberitemsshoppingcart = useSelector((state) => state.datashoppingcart.datashoppingcart);
    const [isOpen, setIsOpen] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [preguntas, setPreguntas] = useState([]);
    const [compras, setCompras] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [transaccionesRecientes, setTransaccionesRecientes] = useState([]);
    const [respuestas, setRespuestas] = useState([]);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const activausermenuprimary = useSelector((state) => state.usermenuprimary.usermenuprimary);
    const activausermenu = useSelector((state) => state.usermenuprimary.usermenu);

    function handleOpenDrawer(e) {
        e.preventDefault();
        dispatch(toggleDrawer(true));
    }

    const handleClick = (event) => {
        setOpenUno((prev) => !prev);
        setAnchorEl(event.currentTarget);
    };

    const handleClickAway = () => {
        dispatch(getUserMenuPrimary(false));
        setOpenUno(false);
        setOpenClose(false);
    };

    useEffect(() => {
        if (!openUno) {
            setOpenUno(true);
        }
    }, [openUno]);


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
        localStorage.setItem(
            "contrview",
            JSON.stringify(0)
        );
    }

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

    useEffect(() => {
        const leerDatosUsuario = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "13",
                params,
            })
                .then((res) => {
                    setDatosUsuario(res.data[0]);
                })
                .catch(function (error) {
                    console.error("Error al leer los datos del usuario", error);
                });
        };

        leerDatosUsuario();
    }, [datosusuarios]);

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const leerRespuestas = async () => {
            let params = {
                uidcomprador: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "5211",
                params,
            })
                .then((res) => {
                    console.log("Respuestas del usuario para notificaciones:", res.data.listpreguntacompra);
                    // Agregamos una propiedad 'tipo' a cada compra
                    const comprasConTipo = res.data.listpreguntacompra.map(respuesta => ({ ...respuesta, tipo: 'respuesta' }));
                    setRespuestas(comprasConTipo);
                })
                .catch(function (error) {
                    console.error("Error al leer los respuestas del usuario", error);
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
                url: URL_BD_MR + "103",
                params,
            })
                .then((res) => {
                    if (res.data.type == 1) {
                        console.log("Compras del usuario para notificaciones:", res.data.listarmiscompras);
                        let arraycompras = res.data.listarmiscompras;

                        // Agregamos una propiedad 'tipo' a cada compra
                        const comprasConTipo = arraycompras && arraycompras.map(compra => ({ ...compra, tipo: 'compra' }));
                        setCompras(comprasConTipo);
                    } else {
                        console.log("ERROR")
                    }
                })
                .catch(function (error) {
                    console.error("Error al leer los compras del usuario", error);
                });
        };

        //leerComrpasUsuario();
    }, []);

    useEffect(() => {
        const leerVentasUsuario = async () => {
            let params = {
                uidvendedor: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "106",
                params,
            })
                .then((res) => {
                    console.log("Ventas del usuario para notificaciones:", res.data.listarmisventas);
                    // Agregamos una propiedad 'tipo' a cada venta
                    const ventasConTipo = res.data.listarmisventas.map(venta => ({ ...venta, tipo: 'venta' }));
                    setVentas(ventasConTipo);
                })
                .catch(function (error) {
                    console.error("Error al leer los compras del usuario", error);
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
                url: URL_BD_MR + "52",
                params,
            })
                .then((res) => {
                    console.log("Preguntas recientes del usuario:", res.data.listarpreguntavend);
                    // Filtramos las preguntas para incluir solo las que están en estado 80 y no tienen una pregunta correspondiente en estado 81
                    const preguntasFiltradas = res.data.listarpreguntavend.filter(pregunta =>
                        pregunta.estado === 80 &&
                        !res.data.listarpreguntavend.some(p => p.idpregunta === pregunta.idpregunta && p.estado === 81)
                    );
                    // Agregamos una propiedad 'tipo' a cada pregunta
                    const preguntasConTipo = preguntasFiltradas.map(pregunta => ({ ...pregunta, tipo: 'pregunta' }));
                    setPreguntas(preguntasConTipo);
                })
                .catch(function (error) {
                    console.error("Error al leer las preguntas recientes del usuario", error);
                });
        };

        leerPreguntasRecientes();
    }, []);

    useEffect(() => {
        // Unimos las compras, las ventas, las preguntas y las respuestas en una sola lista
        const transacciones = [...compras, ...ventas, ...preguntas, ...respuestas];

        // Ordenamos las transacciones por fecha
        transacciones.sort((a, b) => new Date(b.fechacompra || b.fechacreacion) - new Date(a.fechacompra || a.fechacreacion));

        // Nos quedamos con las 4 transacciones más recientes
        const recientes = transacciones.slice(0, 4);

        console.log("Transacciones recientes:", recientes); // Mostramos las transacciones recientes en la consola

        setTransaccionesRecientes(recientes);
    }, [compras, ventas, preguntas, respuestas]); // Este useEffect se ejecutará cada vez que cambien las compras, las ventas, las preguntas o las respuestas // Este useEffect se ejecutará cada vez que cambien las compras, las ventas o las preguntas

    const irAPagina = (transaccion) => {
        // Supongamos que tienes rutas separadas para compras y ventas
        if (transaccion.tipo === 'compra') {
            router.push('/MisCompras/misCompras');
        } else if (transaccion.tipo === 'venta') {
            router.push('/MisVentas/misVentas');
        }
        else if (transaccion.tipo === 'pregunta') {
            router.push('/PreguntasYrespuestas/preguntasSobreMisProductos');
        }
        else if (transaccion.tipo === 'respuesta') {
            router.push('/PreguntasYrespuestas/preguntasRealizadasPorUsuario');
        }
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
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
                                                <p>{datosUsuario ? `${datosUsuario.primernombre[0]}${datosUsuario.primerapellido[0]}` : 'JP'}</p>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={9} md={9} lg={9}>
                                        <div className="nameuser">{" "} {datosUsuario ? `${datosUsuario.primernombre} ${datosUsuario.primerapellido[0]}` : ''}</div>
                                    </Grid>
                                    <Grid item xs={2} md={2} lg={2}>
                                        <ExpandMoreIcon
                                            onClick={() => close()}
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
                        ) :

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

                <li >
                    <a className="header__action" onClick={handleClick} >
                        <RxBell className="coloricon" />
                        <span className="header__action-badge">
                            {transaccionesRecientes.length ? transaccionesRecientes.length : 0}
                        </span>
                    </a>
                </li>
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
                            <p>Notificaciones</p>
                        </div>
                        <div className="SubMainAlertasContenido">
                            {transaccionesRecientes.map((transaccion, index) => (
                                <div className='notifCont' key={index} onClick={() => irAPagina(transaccion)}>
                                    <div className='notifContIcono'>
                                        {transaccion.tipo === 'compra' ? <PiBasketBold /> :
                                            transaccion.tipo === 'venta' ? <MdOutlineSell /> :
                                                transaccion.tipo === 'pregunta' ? <RxQuestionMarkCircled /> :
                                                    <TbMessageDown />}
                                    </div>
                                    <div className='notifContenido'>
                                        <p>
                                            {transaccion.tipo === 'compra' ? 'Felicidades! compraste un producto' :
                                                transaccion.tipo === 'venta' ? 'Felicidades! vendiste un producto' :
                                                    transaccion.tipo === 'pregunta' ? 'Tienes una nueva pregunta' :
                                                        'Tienes una nueva respuesta'}
                                        </p>
                                        <p>Toca para ver más</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Popover>

                <li className="ml-10"
                    onClick={() => reiniciarCtr()}
                >
                    <Link href="/shop/wishlist">
                        <a className="header__action">
                            <GoHeart className="mlmenos20 coloricon" />
                            <span className="header__action-badge mlmenos10">
                                {numberitemswishlist ? numberitemswishlist : 0}
                            </span>
                        </a>
                    </Link>
                </li>


                <li onClick={() => reiniciarCtr()}>
                    <Link href="/shop/shopping-cart">
                        <a className="header__action">
                            <HiOutlineShoppingCart className="mlmenos20 coloricon" />
                            <span className="header__action-badge mlmenos10">
                                {numberitemsshoppingcart ? numberitemsshoppingcart : 0}
                            </span>
                        </a>
                    </Link>
                </li>
            </ul>
        </ClickAwayListener>
    );
};

export default connect((state) => state)(ModuleHeaderActions);


/*
 {
                    datosusuarios.logged ?
                        (
                            <Dropdown className="dropNavbar" onToggle={(isOpen) => setIsOpen(isOpen)}>
                                <Dropdown.Toggle className="infousuario" id="dropdown-basic">
                                    {
                                        datosusuarios.tipoidentificacion === 6 ?
                                            (
                                                <>
                                                    {" "} {datosusuarios.razonsocial}{isOpen ? <IoChevronUp /> : <IoChevronDown />}
                                                </>
                                            )
                                            :
                                            (
                                                <>
                                                    <div className="DropdownNavbar">
                                                        <div className="BallDropdownNavbar">
                                                            <p>{datosUsuario ? `${datosUsuario.primernombre[0]}${datosUsuario.primerapellido[0]}` : 'JP'}</p>
                                                        </div>
                                                        <div className="NameDropdownNavbar">
                                                            {" "} {datosUsuario ? `${datosUsuario.primernombre} ${datosUsuario.primerapellido[0]}` : ''}{isOpen ? <IoChevronUp /> : <IoChevronDown />}
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                    }
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="datainfousuario">
                                    <Dropdown.Item className="datainfousuario" href="/EditUsers/MisDatos">Mis Datos</Dropdown.Item>
                                    <Dropdown.Item className="datainfousuario" href="/publication">Mis Publicaciones</Dropdown.Item>
                                    <Dropdown.Item className="datainfousuario" href="/MisCompras/misCompras">Mis Compras</Dropdown.Item>
                                    <Dropdown.Item className="datainfousuario" onClick={Salir} >Cerrar Sesión</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )
                        :
                        (
                            <div className="headercrearcuenta">
                                <div className=" navCCC">
                                    <div>
                                        <div className="espaciotextocrearcuenta">
                                            <a className="textocrearcuenta" href="/my-account">
                                                Crea tu cuenta
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="espaciotextocrearcuenta">
                                            <Link href="/loginaccount">
                                                <a className="textocrearcuenta">
                                                    Ingresa
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                }

*/