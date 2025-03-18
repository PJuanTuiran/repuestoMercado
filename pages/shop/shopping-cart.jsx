import React, { useEffect, useState } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Shop from "~/components/partials/shop/Shop";
import { useRouter, connect } from "next/router";
import Link from "next/link";
import { caculateArrayQuantity } from "~/utilities/ecomerce-helpers";
import useEcomerce from "~/hooks/useEcomerce";
import ModuleEcomerceWishlist from "~/components/ecomerce/modules/ModuleEcomerceWishlist";
import SkeletonTable from "~/components/elements/skeletons/SkeletonTable";
import { Result } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { Box, Grid, Button } from "@mui/material";
import { myNumber } from "../../utilities/ArrayFunctions";
import ModalMensajesWishList from "../../pages/mensajes/ModalMensajesWishList";
import { getDataShoppingCart } from "../../store/datashoppingcart/action";
import { getSelectedAddress } from "../../store/selectedaddress/action";
import LoadingSearchResult from "~/components/elements/Loading/LoadingSearchResult";
import RefreshWishlist from "./refreshwishlist";
import ModalMensajesConfirmarEliminar from "../mensajes/ModalMensajesConfirmarEliminar";
import AddItemWishList from "./additemwishlist";
import { getResetInput } from "../../store/resetinput/action";
import ModalControlAcceso from "../mensajes/ModalControlAcceso";

const breadcrumb = [
    {
        text: "Inicio",
        url: "/",
    },
    {
        text: "Tienda",
        url: "/shopping",
    },
    {
        text: "Carrito de Compras",
    },
];

let undsel = [];

const WishlistScreen = ({ ecomerce }) => {
    const router = useRouter();
    const { loading, products, getProducts } = useEcomerce();
    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState(false);
    const [selectItem, setSelectItem] = useState(false);
    const [itemsShoppingCart, setItemsShoppingCart] = useState([]);
    const [arrayItems, setArrayItems] = useState([]);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [showModalMensajesEliminar, setShowModalMensajesEliminar] =
        useState(false);
    const [continuarEliminar, setContinuarEliminar] = useState(false);
    const [abandonarEliminar, setAbandonarEliminar] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    const [classEliminarAll, setClassEliminarAll] = useState(
        "textoreliminartodowishlist"
    );

    const [direccionesUsuarios, setDireccionesUsuarios] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [unidadesSelect, setUnidadesSelect] = useState(1);
    const [unidadesPrd, setUnidadesPrd] = useState([]);
    const [classUnd, setClassUnd] = useState("btnunidselshoppingcartmenos");
    const [classUndMas, setClassUndMas] = useState("btnunidselshoppingcart");
    const [itemSelect, setItemSelect] = useState(0);
    const [agregarItemWishList, setAgregarItemWishList] = useState(false);
    const [prdExiste, setPrdExiste] = useState(false);
    const [totalPrd, setTotalPrd] = useState(0);
    const [envios, setEnvios] = useState(21000);
    const [totalCompra, setTotalCompra] = useState(0);

    const [showModalControlAcceso, setShowModalControlAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const numberitemsshoppingcart = useSelector(
        (state) => state.datashoppingcart.datashoppingcart
    );

    useEffect(() => {
        if (datosusuarios.activo == 30) {
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Agregar al carrito");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            return;
        }
    });

    useEffect(() => {
        if (unidadesSelect == 0) {
            setClassUnd("btnunidselshoppingcartmenos sinborder deshabilitar");
        } else {
            setClassUnd("btnunidselshoppingcartmenos sinborder");
        }

        if (unidadesSelect >= quantity) {
            setClassUndMas("btnunidselshoppingcart sinborder deshabilitar");
        } else {
            setClassUndMas("btnunidselshoppingcart sinborder");
        }
        //product.numerounidades
    }, [unidadesSelect]);

    //console.log("UND SEL : ", unidadesSelect, undsel[0]);

    const selCantidad = (cant, unddispo, index) => {
        if (undsel[index] == null) undsel[index] = parseInt(cant);
        else undsel[index] = parseInt(undsel[index]) + parseInt(cant);

        let cantidad = parseInt(undsel[index]); // + parseInt(cant);

        setUnidadesSelect(cantidad);
        setQuantity(unddispo);
        //product.numerounidades
    };

    const verProduct = (dat) => {
        let ruta = "/product/" + dat;
        router.push(ruta);
    };

    const comprarAhora = (dat, index) => {
        dispatch(getSelectedAddress([]));
        if (direccionesUsuarios.length == 0) {
            let item = [];
            item.push(dat);
            localStorage.setItem("itemcompraall", JSON.stringify(item));
            let ruta = "/shop/youraddresses/";
            router.push(ruta);
        } else {
            localStorage.setItem(
                "undselcompraahora",
                JSON.stringify(undsel[index])
            );
            let item = [];
            item.push(dat);
            localStorage.setItem("itemcompra", JSON.stringify(item));
            localStorage.setItem("itemcompraall", JSON.stringify(item));
            let ruta = "/shop/checkout/";
            router.push(ruta);
        }
    };

    const continuarCompra = (dat) => {
        dispatch(getSelectedAddress([]));
        if (direccionesUsuarios.length == 0) {
            localStorage.setItem(
                "itemcompraall",
                JSON.stringify(itemsShoppingCart)
            );
            let ruta = "/shop/youraddresses/";
            router.push(ruta);
        } else {
            localStorage.setItem(
                "itemcompraall",
                JSON.stringify(itemsShoppingCart)
            );
            let ruta = "/shop/checkoutall/";
            router.push(ruta);
        }
    };

    useEffect(() => {
        dispatch(getResetInput(1));
        const leerItems = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "59",
                params,
            })
                .then((res) => {


                    //console.log("DAT WISH LIST: ",res.data.listarcarritocompra);
                    //AQUI
                    let array = [];
                    let total = 0;
                    res.data.listarcarritocompra &&
                        res.data.listarcarritocompra.map((item, index) => {
                            total =
                                parseInt(total) +
                                parseInt(item.cantidad * item.precio);
                            undsel[index] = item.cantidad;
                            array.push({
                                ...item, email: datosusuarios.email
                            });
                        });
                    setItemsShoppingCart(array);
                    dispatch(
                        getDataShoppingCart(res.data.listarcarritocompra.length)
                    );
                    //console.log("TOTAL: ", total);
                    setTotalPrd(total);
                    let totalcpr = total + envios;
                    setTotalCompra(totalcpr);
                })
                .catch(function (error) {
                    console.log("Error leyendo datos carrito de compras");
                });
        };
        leerItems();

        const leerDirecciones = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "65",
                params,
            })
                .then((res) => {
                    if (res.data.listardireccionesusuario.length > 0) {
                        console.log(
                            "DIRECCIONES : ",
                            res.data.listardireccionesusuario
                        );
                        setDireccionesUsuarios(
                            res.data.listardireccionesusuario[0]
                        );
                    }
                })
                .catch(function (error) {
                    console.log("Error leyendo direcciones");
                });
        };
        leerDirecciones();
    }, [numberitemsshoppingcart, isLoading, datosusuarios]);
    // view
    let totalView, wishListView;
    if (products && products.length > 0) {
        totalView = caculateArrayQuantity(products);
        wishListView = <ModuleEcomerceWishlist source={products} />;
    } else {
        if (loading) {
            wishListView = <SkeletonTable rows={1} />;
        } else {
            wishListView = (
                <Result
                    status="warning"
                    title="Ningún producto en su carrito de compra."
                />
            );
        }
    }

    const confirmarBorrarUnItem = (item) => {
        setItemSelect(item);
        setShowModalMensajesEliminar(true);
        setTituloMensajes("Carrito de compra");
        setTextoMensajes("¿Estas seguro de querer eliminar tu producto?");
        //continuarRegistro, setContinuarRegistro
    };

    useEffect(() => {
        if (continuarEliminar) {
            borrarUnItem(itemSelect);
        }
    }, [continuarEliminar]);

    const borrarUnItem = (item) => {
        let borrar = true;
        const borrarAllItems = async () => {
            let params = {
                usuario: item.usuario,
                idproducto: item.idproducto,
            };

            //console.log("DAT XX : ", params);
            await axios({
                method: "post",
                url: URL_BD_MR + "61",
                params,
            })
                .then((res) => {
                    console.log(
                        "OK Borrando item del carrito de compra: ",
                        res
                    );
                    if (res.data.type == 1) {
                        const leerItems = async () => {
                            let params = {
                                usuario: datosusuarios.uid,
                            };

                            await axios({
                                method: "post",
                                url: URL_BD_MR + "59",
                                params,
                            })
                                .then((res) => {
                                    //console.log("LONGITUD : ", res.data.listarcarritocompra.length);
                                    let array = [];
                                    res.data.listarcarritocompra &&
                                        res.data.listarcarritocompra.map((item, index) => {
                                            array.push({
                                                ...item, email: datosusuarios.email
                                            });
                                        });
                                    setItemsShoppingCart(array);
                                    dispatch(
                                        getDataShoppingCart(
                                            res.data.listarcarritocompra.length
                                        )
                                    );
                                    setContinuarEliminar(false);
                                })
                                .catch(function (error) {
                                    console.log(
                                        "Error leyendo datos carrito de compra"
                                    );
                                });
                        };
                        leerItems();
                    }
                })
                .catch(function (error) {
                    borrar = false;
                    console.log("Error leyendo datos carrito de compra");
                });
        };
        borrarAllItems();

        if (borrar) {
            //setShowModalMensajes(true);
            //setTituloMensajes("Carrito de compra");
            //let texto = "Producto eliminado del carrito de compra";
            //setTextoMensajes(texto);
            leerItemsCarrito();
            setArrayItems([]);
            setSelectAll(false);
        }
    };

    useEffect(() => {
        leerItemsCarrito();
    }, [showModalMensajesEliminar]);

    const leerItemsCarrito = () => {
        const leerItems = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "59",
                params,
            })
                .then((res) => {
                    //console.log("LONGITUD : ", res.data.listarcarritocompra.length);
                    let array = [];
                    res.data.listarcarritocompra &&
                        res.data.listarcarritocompra.map((item, index) => {
                            array.push({
                                ...item, email: datosusuarios.email
                            });
                        });
                    setItemsShoppingCart(array);
                    dispatch(
                        getDataShoppingCart(res.data.listarcarritocompra.length)
                    );
                })
                .catch(function (error) {
                    console.log("Error leyendo datos carrito de compra");
                });
        };
        leerItems();
    };

    useEffect(() => {
        if (arrayItems.length > 0) {
            setSelectItem(true);
            setClassEliminarAll("textoreliminartodowishlistselect");
        } else {
            setSelectItem(false);
            setClassEliminarAll("textoreliminartodowishlist");
        }
    }, [arrayItems]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearInterval(interval);
    }, [isLoading]);

    useEffect(() => {
        if (prdExiste) {
            setShowModalMensajes(true);
            setTituloMensajes("Lista de deseos");
            let texto = "Producto ya existe en lista de deseo";
            setTextoMensajes(texto);
            setPrdExiste(false);
        }
    }, [prdExiste]);

    const AddWishList = (data) => {
        setAgregarItemWishList(true);
        setShowModalMensajes(true);
        setTituloMensajes("Lista de deseos");
        let texto = "Producto agregado a lista de deseo";
        setTextoMensajes(texto);
        setItemSelect(data);
    };

    return (
        <Container title="Wishlist">
            <ModalMensajesWishList
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <ModalMensajesConfirmarEliminar
                shown={showModalMensajesEliminar}
                setShowModalMensajesEliminar={setShowModalMensajesEliminar}
                setContinuarEliminar={setContinuarEliminar}
                setAbandonarEliminar={setAbandonarEliminar}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <ModalControlAcceso
                shown={showModalControlAcceso}
                close={setShowModalControlAcceso}
                titulo={tituloControlAcceso}
                mensaje={textoControlAcceso}
                tipo="1"
            />
            {refreshData ? <RefreshWishlist /> : null}

            {agregarItemWishList ? (
                <AddItemWishList
                    item={itemSelect}
                    setAgregarItemWishList={setAgregarItemWishList}
                    setPrdExiste={setPrdExiste}
                />
            ) : null}

            <div className="ps-page ps-page--inner">
                <div className="container">
                    <div className="ps-page__header">
                        <div className="ml-50">
                            <BreadCrumb breacrumb={breadcrumb} />
                        </div>

                        {isLoading ? (
                            <LoadingSearchResult />
                        ) : (
                            <div className="cajashoppingcart">
                                <Grid container spacing={1}>
                                    <Grid item xs={4} md={4} lg={4}>
                                        <div className="tituloshoppingcart">
                                            Carrito de compras
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <div>
                                            <Grid container spacing={1}>
                                                <Grid
                                                    item
                                                    xs={8}
                                                    md={8}
                                                    lg={8}></Grid>
                                                <Grid item xs={4} md={4} lg={4}>
                                                    <div className="numeroprodlistadeseo">
                                                        Productos en carrito de
                                                        compra:{" "}
                                                        {
                                                            itemsShoppingCart.length
                                                        }
                                                    </div>
                                                </Grid>
                                            </Grid>

                                            {itemsShoppingCart.length > 0
                                                ? itemsShoppingCart &&
                                                itemsShoppingCart.map(
                                                    (item, index) => {
                                                        return (
                                                            <div>
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
                                                                        <div className="lineashoppingcart"></div>
                                                                    </Grid>

                                                                    <Grid
                                                                        item
                                                                        xs={2}
                                                                        md={2}
                                                                        lg={
                                                                            2
                                                                        }>
                                                                        <img
                                                                            className="imagelistadeseo apuntador"
                                                                            onClick={() =>
                                                                                verProduct(
                                                                                    item.idproducto
                                                                                )
                                                                            }
                                                                            src={
                                                                                URL_IMAGES_RESULTS +
                                                                                item.nombreimagen1
                                                                            }
                                                                            alt="First slide"
                                                                        />
                                                                    </Grid>

                                                                    <Grid
                                                                        item
                                                                        xs={8}
                                                                        md={8}
                                                                        lg={
                                                                            8
                                                                        }>
                                                                        <div className="mlmenos20">
                                                                            <Grid
                                                                                container
                                                                                alignItems="center"
                                                                                spacing={
                                                                                    1
                                                                                }>
                                                                                <Grid
                                                                                    item
                                                                                    xs={
                                                                                        12
                                                                                    }
                                                                                    md={
                                                                                        8
                                                                                    }
                                                                                    lg={
                                                                                        8
                                                                                    }>
                                                                                    <div
                                                                                        className="textotituloshoppingcart"
                                                                                        onClick={() =>
                                                                                            verProduct(
                                                                                                item.idproducto
                                                                                            )
                                                                                        }>
                                                                                        {
                                                                                            item.titulonombre
                                                                                        }
                                                                                    </div>
                                                                                </Grid>
                                                                                <Grid
                                                                                    item
                                                                                    xs={
                                                                                        12
                                                                                    }
                                                                                    md={
                                                                                        3
                                                                                    }
                                                                                    lg={
                                                                                        3
                                                                                    }>
                                                                                    <div>
                                                                                        <Grid
                                                                                            container
                                                                                            alignItems="center"
                                                                                            spacing={
                                                                                                1
                                                                                            }
                                                                                            className="cajaunidadeselectshoppingcart">
                                                                                            <Grid
                                                                                                item
                                                                                                xs={
                                                                                                    12
                                                                                                }
                                                                                                md={
                                                                                                    4
                                                                                                }
                                                                                                lg={
                                                                                                    4
                                                                                                }>
                                                                                                {undsel[
                                                                                                    index
                                                                                                ] <=
                                                                                                    1 ? (
                                                                                                    <div
                                                                                                        className="btnunidselshoppingcartmenos sinborder deshabilitar"
                                                                                                        onClick={() =>
                                                                                                            selCantidad(
                                                                                                                -1,
                                                                                                                item.numerodeunidades,
                                                                                                                index
                                                                                                            )
                                                                                                        }>
                                                                                                        _
                                                                                                    </div>
                                                                                                ) : (
                                                                                                    <div
                                                                                                        className="btnunidselshoppingcartmenos sinborder"
                                                                                                        onClick={() =>
                                                                                                            selCantidad(
                                                                                                                -1,
                                                                                                                item.numerodeunidades,
                                                                                                                index
                                                                                                            )
                                                                                                        }>
                                                                                                        _
                                                                                                    </div>
                                                                                                )}
                                                                                            </Grid>
                                                                                            <Grid
                                                                                                item
                                                                                                xs={
                                                                                                    12
                                                                                                }
                                                                                                md={
                                                                                                    4
                                                                                                }
                                                                                                lg={
                                                                                                    4
                                                                                                }>
                                                                                                <input
                                                                                                    className="cajaunidadeinputshoppingcart"
                                                                                                    type="text"
                                                                                                    defaultValue="1"
                                                                                                    value={
                                                                                                        undsel[
                                                                                                        index
                                                                                                        ]
                                                                                                    }
                                                                                                    //onChange={(e)=>handleChangeInput(e.target.value)}
                                                                                                    placeholder="1"
                                                                                                />
                                                                                            </Grid>
                                                                                            <Grid
                                                                                                item
                                                                                                xs={
                                                                                                    12
                                                                                                }
                                                                                                md={
                                                                                                    4
                                                                                                }
                                                                                                lg={
                                                                                                    4
                                                                                                }>
                                                                                                {undsel[
                                                                                                    index
                                                                                                ] >=
                                                                                                    item.numerodeunidades ? (
                                                                                                    <div
                                                                                                        className="btnunidselshoppingcart sinborder deshabilitar"
                                                                                                        onClick={() =>
                                                                                                            selCantidad(
                                                                                                                1,
                                                                                                                item.numerodeunidades,
                                                                                                                index
                                                                                                            )
                                                                                                        }>
                                                                                                        +
                                                                                                    </div>
                                                                                                ) : (
                                                                                                    <div
                                                                                                        className="btnunidselshoppingcart sinborder"
                                                                                                        onClick={() =>
                                                                                                            selCantidad(
                                                                                                                1,
                                                                                                                item.numerodeunidades,
                                                                                                                index
                                                                                                            )
                                                                                                        }>
                                                                                                        +
                                                                                                    </div>
                                                                                                )}
                                                                                            </Grid>
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
                                                                                                <div className="textounidadesshoppingcart">
                                                                                                    Disponibles:{" "}
                                                                                                    {myNumber(
                                                                                                        1,
                                                                                                        item.numerodeunidades,
                                                                                                        2
                                                                                                    )}
                                                                                                </div>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </div>
                                                                                </Grid>
                                                                                <Grid
                                                                                    item
                                                                                    xs={
                                                                                        12
                                                                                    }
                                                                                    md={
                                                                                        1
                                                                                    }
                                                                                    lg={
                                                                                        1
                                                                                    }>
                                                                                    <div className="formatoprecioshoppingcart">
                                                                                        ${" "}
                                                                                        {myNumber(
                                                                                            1,
                                                                                            item.precio *
                                                                                            undsel[
                                                                                            index
                                                                                            ],
                                                                                            2
                                                                                        )}
                                                                                    </div>
                                                                                </Grid>
                                                                            </Grid>
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
                                                                                        2
                                                                                    }
                                                                                    lg={
                                                                                        2
                                                                                    }>
                                                                                    <div
                                                                                        className="botoncarritocompra"
                                                                                        onClick={() =>
                                                                                            confirmarBorrarUnItem(
                                                                                                item
                                                                                            )
                                                                                        }>
                                                                                        Eliminar
                                                                                    </div>
                                                                                </Grid>
                                                                                <Grid
                                                                                    item
                                                                                    xs={
                                                                                        12
                                                                                    }
                                                                                    md={
                                                                                        2
                                                                                    }
                                                                                    lg={
                                                                                        2
                                                                                    }>
                                                                                    <div
                                                                                        className="botonlistacarritocompra"
                                                                                        onClick={() =>
                                                                                            AddWishList(
                                                                                                item
                                                                                            )
                                                                                        }>
                                                                                        Lista
                                                                                        de
                                                                                        deseos
                                                                                    </div>
                                                                                </Grid>
                                                                                <Grid
                                                                                    item
                                                                                    xs={
                                                                                        12
                                                                                    }
                                                                                    md={
                                                                                        2
                                                                                    }
                                                                                    lg={
                                                                                        2
                                                                                    }>
                                                                                    <div
                                                                                        className="botonlistacarritocomprados"
                                                                                        onClick={() =>
                                                                                            comprarAhora(
                                                                                                item,
                                                                                                index
                                                                                            )
                                                                                        }>
                                                                                        Comprar
                                                                                        ahora
                                                                                    </div>
                                                                                </Grid>
                                                                                <Grid
                                                                                    item
                                                                                    xs={
                                                                                        12
                                                                                    }
                                                                                    md={
                                                                                        4
                                                                                    }
                                                                                    lg={
                                                                                        4
                                                                                    }>
                                                                                    <div className="botonmasprdvendedor">
                                                                                        Más
                                                                                        productos
                                                                                        del
                                                                                        vendedor
                                                                                    </div>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </div>
                                                                    </Grid>
                                                                    {itemsShoppingCart.length ==
                                                                        index +
                                                                        1 ? (
                                                                        <div>
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
                                                                                <div
                                                                                    className="btncontinuarcompra"
                                                                                    onClick={() =>
                                                                                        continuarCompra()
                                                                                    }>
                                                                                    Continuar
                                                                                </div>
                                                                            </Grid>
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
                                                                                <div className="lineashoppingcart"></div>
                                                                            </Grid>
                                                                        </div>
                                                                    ) : null}
                                                                </Grid>
                                                            </div>
                                                        );
                                                    }
                                                )
                                                : null}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        )}
                    </div>
                    {
                        //<div className="ps-page__content">{wishListView}</div>
                    }
                </div>
            </div>
        </Container>
    );
};
export default WishlistScreen;
