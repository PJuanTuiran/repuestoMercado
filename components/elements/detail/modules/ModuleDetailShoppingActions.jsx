import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "~/store/app/action";
import useEcomerce from "~/hooks/useEcomerce";
import axios from "axios";
import { Modal } from "antd";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { Box, Grid } from "@mui/material";
import useProduct from "~/hooks/useProduct";
import ModalMensajesWishList from "../../../../pages/mensajes/ModalMensajesWishList";
import ModalMensajesWishListControl from "../../../../pages/mensajes/ModalMensajesWishListControl";
import ModalControlAcceso from "../../../../pages/mensajes/ModalControlAcceso";
import ModalMensajesSoyNuevo from "../../../../pages/mensajes/ModalMensajesSoyNuevo";
import RefreshWishlist from "../../../../pages/shop/refreshwishlist";
import { getLeeIra } from "../../../../store/leeira/action";
import { getDataShoppingCart } from "../../../../store/datashoppingcart/action";
import { getAddEdToCart } from "../../../../store/addedtocart/action";
import { getAddLogin } from "../../../../store/addlogin/action";
import { getSelectedAddress } from "../../../../store/selectedaddress/action";
import { getUserMenuPrimary } from "../../../../store/usermenuprimary/action";
import { getFiltroPrd } from "../../../../store/filtroprd/action";

import { useRouter } from "next/router";
import Moment from "moment";

//Constantes
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../../helpers/Constants";
import { getFiltroCondicionPrd } from "../../../../store/filtrocondicionprd/action";

const ModuleDetailShoppingActions = ({ product, cart, ecomerce }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const { brand } = useProduct();
    const { loading, addItem } = useEcomerce();
    const [masProductos, setMasProductos] = useState(true);

    const [unidadesSelect, setunidadesSelect] = useState(1);
    const [classUnd, setClassUnd] = useState(0);
    const [classUndMas, setClassUndMas] = useState(0);

    const [showModalControlAcceso, setShowModalControlAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [showModalMensajesCtlr, setShowModalMensajesCtlr] = useState(false);
    const [tituloMensajesCtlr, setTituloMensajesCtlr] = useState(false);
    const [textoMensajesCtlr, setTextoMensajesCtlr] = useState(false);

    const [showModalMensajesShoppingCart, setShowModalMensajesShoppingCart] =
        useState(false);
    const [tituloMensajesShoppingCart, setTituloMensajesShoppingCart] =
        useState(false);
    const [textoMensajesShoppingCart, setTextoMensajesShoppingCart] =
        useState(false);

    const [soyNuevo, setSoyNuevo] = useState(false);
    const [TengoCuenta, setTengoCuenta] = useState(false);

    const [login, setLogin] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [direccionesUsuarios, setDireccionesUsuarios] = useState([]);

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const filtroprd = useSelector((state) => state.filtroprd.filtroprd);
    const filtrocondicionprd = useSelector(
        (state) => state.filtrocondicionprd.filtrocondicionprd
    );
    // Asignamos Datos al arreglo de Usuarios desde el state
    //const leeira = useSelector((state) => state.leeira.ira);
    //console.log("DAT USERSSS: ", datosusuarios);

    useEffect(() => {
        if (filtroprd == 0) dispatch(getFiltroPrd(1));
        else if (filtroprd == 1) dispatch(getFiltroPrd(0));

        if (filtrocondicionprd == 0) dispatch(getFiltroCondicionPrd(1));
        else if (filtrocondicionprd == 1) dispatch(getFiltroCondicionPrd(0));
    }, []);

    useEffect(() => {
        dispatch(getUserMenuPrimary(false));
        if (quantity >= product?.numerounidades) {
            setMasProductos(false);
        } else {
            setMasProductos(true);
        }

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
                    if (res.data?.listardireccionesusuario?.length > 0) {
                        console.log(
                            "DIRECCIONES : ",
                            res.data?.listardireccionesusuario
                        );
                        setDireccionesUsuarios(
                            res.data?.listardireccionesusuario[0]
                        );
                    }
                })
                .catch(function (error) {
                    console.log("Error leyendo direcciones");
                });
        };
        leerDirecciones();
    }, [quantity, datosusuarios]);

    useEffect(() => {
        if (unidadesSelect == 0) {
            setClassUnd("botonesunidadesselectmenos sinborder deshabilitar");
        } else {
            setClassUnd("botonesunidadesselectmenos sinborder");
        }

        if (unidadesSelect >= product?.numerounidades) {
            setClassUndMas("botonesunidadesselect sinborder deshabilitar");
        } else {
            setClassUndMas("botonesunidadesselect sinborder");
        }
        //product?.numerounidades
    }, [unidadesSelect]);

    const selCantidad = (cant) => {
        let cantidad = parseInt(unidadesSelect) + parseInt(cant);
        setunidadesSelect(cantidad);
        //product?.numerounidades
    };

    const handleAddItemToCart = (e) => {
        e.preventDefault();

        const dat = [
            {
                id: product?.id,
                quantity: unidadesSelect,
            },
        ];

        addItem({ id: product?.id, quantity: unidadesSelect }, dat, "cart");
        dispatch(toggleDrawer(true));
        return;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (login) {
                router.push("/loginaccount");
                setLogin(false);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [login]);

    const validaPrdListWish = () => {
        if (datosusuarios.activo == 30) {
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Comprar productos");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            return;
        }

        const leerItem = async () => {
            const leerItems = async () => {
                let params = {
                    idproducto: product?.id,
                    usuario: datosusuarios.uid,
                };
                //console.log("PARAM : ", params);
                await axios({
                    method: "post",
                    url: URL_BD_MR + "57",
                    params,
                })
                    .then((res) => {
                        if (res.data?.listaritemdeseos?.length > 0) {
                            //console.log("LEER : ", res.data?.listaritemdeseos[0]?.idproducto
                            setShowModalMensajes(true);
                            setTituloMensajes("Lista de deseos");
                            let texto = "Producto ya existe en lista de deseo";
                            setTextoMensajes(texto);
                            return;
                        } else agregarListaDeseo();
                    })
                    .catch(function (error) {
                        setShowModalMensajes(true);
                        setTituloMensajes("Lista de deseos");
                        let texto = "Error leyendo producto en lista de deseo";
                        setTextoMensajes(texto);
                        return;
                    });
            };
            leerItems();
        };
        leerItem();
    };

    const agregarListaDeseo = () => {
        if (!datosusuarios.uid || datosusuarios.uid == 0) {
            dispatch(getLeeIra(4));
            let itemswishlistadd = {
                ruta: "product/",
                idproducto: product?.id,
                compatible: product?.compatible,
                cantidad: unidadesSelect,
            };
            localStorage.setItem(
                "itemswishlistadd",
                JSON.stringify(itemswishlistadd)
            );

            setShowModalMensajesShoppingCart(true);
            setTituloMensajesShoppingCart("Lista de deseos");
            let texto =
                "¡Bienvenido! Para agregar a lista de deseo debes ingresar a tu cuenta";
            setTextoMensajesShoppingCart(texto);
            //AQUI
            //localStorage.setItem("ira",JSON.stringify(1));
            //setLogin(true);
            return;
        }

        const grabarItem = async () => {
            let params = {
                idproducto: product?.id,
                compatible: product?.compatible,
                usuario: datosusuarios.uid,
            };
            //console.log("PROD : ", params);

            await axios({
                method: "post",
                url: URL_BD_MR + "53",
                params,
            })
                .then((res) => {
                    //console.log("DAT: ", res.data);
                    setShowModalMensajes(true);
                    setTituloMensajes("Lista de deseos");
                    let texto = "Producto agregado a lista de deseo";
                    setTextoMensajes(texto);

                    const grabarItemhistorial = async () => {
                        let params = {
                            idproducto: product?.id,
                            compatible: product?.compatible,
                            usuario: datosusuarios.uid,
                        };

                        await axios({
                            method: "post",
                            url: URL_BD_MR + "531",
                            params,
                        })
                            .then((res) => {
                                console.log("HISTORIAL LISTA DESEOS ", OK);
                            })
                            .catch(function (error) {
                                console.log("ERROR HISTORIAL LISTA DESEOS");
                            });
                    };
                    grabarItemhistorial();

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
                                //console.log("DAT WISH LIST: ", res.data?.listaritemdeseos?.length);
                                dispatch(
                                    getDataWishList(
                                        res.data?.listaritemdeseos?.length
                                    )
                                );
                            })
                            .catch(function (error) {
                                console.log(
                                    "Error leyendo preguntas al vendedor"
                                );
                            });
                    };
                    leerItems();
                })
                .catch(function (error) {
                    console.log("Error leyendo preguntas al vendedor");
                });
        };
        grabarItem();
    };

    const comprarAhora = () => {
        console.log("PRODUCT : ", product)

        if (product?.usuario == datosusuarios.uid) {
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Comprar productos");
            setTextoControlAcceso(
                "La cuenta del compradror y vendedor no pueden ser iguales!"
            );
            return;
        }

        if (datosusuarios.activo == 30) {
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Comprar productos");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            return;
        }

        let dat = {
            cantidad: 1,
            compatible: product?.compatible,
            fechacreacion: fechaactual,
            id: product?.id,
            idproducto: product?.id,
            nombreimagen1: product?.images[0].name,
            numerodeunidades: product?.numerounidades,
            precio: product?.price,
            titulonombre: product?.name,
            usuario: datosusuarios.uid,
            emailvendedor: product?.emailvendedor,
            email: datosusuarios.email,
        };
        let item = [];
        item.push(dat);
        localStorage.setItem("itemcompra", JSON.stringify(item));
        localStorage.setItem("itemcompraall", JSON.stringify(item));
        localStorage.setItem(
            "undselcompraahora",
            JSON.stringify(unidadesSelect)
        );

        dispatch(getSelectedAddress([]));
        if (!datosusuarios.uid || datosusuarios.uid == 0) {
            /* Guarda datos del producto que se debe agregar al localstorage */
            dispatch(getLeeIra(3));
            let itemshoppingcartadd = {
                ruta: "shop/checkout",
                idproducto: product?.id,
                compatible: product?.compatible,
                cantidad: unidadesSelect,
                valida: 0,
            };
            localStorage.setItem(
                "itemshoppingcartadd",
                JSON.stringify(itemshoppingcartadd)
            );

            setShowModalMensajesShoppingCart(true);
            setTituloMensajesShoppingCart(
                "¡Bienvenido! Para comprar debes ingresar a tu cuenta"
            );
            let texto = "";
            setTextoMensajesShoppingCart(texto);
            //setLogin(true);
            return;
        }

        if (direccionesUsuarios.length == 0) {
            let item = [];

            let dat = {
                compatible: product?.compatible,
                cantidad: unidadesSelect,
                fechacreacion: fechaactual,
                id: product?.id,
                idproducto: product?.id,
                nombreimagen1: product?.thumbnail.name,
                numerodeunidades: product?.numerounidades,
                precio: product?.price,
                titulonombre: product?.name,
                usuario: datosusuarios.uid,
                emailvendedor: product?.emailvendedor,
                email: datosusuarios.email,
            };

            item.push(dat);
            localStorage.setItem("itemcompraall", JSON.stringify(item));
            let ruta = "/shop/youraddresses/";
            router.push(ruta);
        } else {
            localStorage.setItem(
                "undselcompraahora",
                JSON.stringify(unidadesSelect)
            );

            const leeItemAgregadoCarrito = async () => {
                let params = {
                    usuario: datosusuarios.uid,
                    idproducto: product?.id,
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR + "62",
                    params,
                })
                    .then((res) => {
                        if (res.data?.listaritemcarrito.length > 0) {
                            //console.log("Producto existe : ",res.data?.listaritemcarrito);

                            let dat = res.data?.listaritemcarrito[0];
                            let item = {
                                cantidad: dat.cantidad,
                                compatible: dat.compatible,
                                fechacreacion: dat.fechacreacion,
                                id: dat.id,
                                idproducto: dat.idproducto,
                                nombreimagen1: dat.nombreimagen1,
                                numerodeunidades: dat.numerodeunidades,
                                precio: dat.precio,
                                titulonombre: dat.titulonombre,
                                usuario: datosusuarios.uid,
                                emailvendedor: dat.emailvendedor,
                                email: datosusuarios.email,
                            };

                            let prd = [];
                            prd.push(item);
                            localStorage.setItem(
                                "itemcompraall",
                                JSON.stringify(prd)
                            );

                            localStorage.setItem(
                                "undselcompraahora",
                                JSON.stringify(unidadesSelect)
                            );

                            //console.log("DATOS : ", dat);
                            localStorage.setItem(
                                "itemcompra",
                                JSON.stringify(prd)
                            );
                            let ruta = "/shop/checkout/";
                            router.push(ruta);
                        } else {
                            const grabarItemCarrito = async () => {
                                let params = {
                                    idproducto: product?.id,
                                    compatible: product?.compatible,
                                    usuario: datosusuarios.uid,
                                    cantidad: unidadesSelect,
                                };
                                //console.log("PROD : ", params);

                                await axios({
                                    method: "post",
                                    url: URL_BD_MR + "58",
                                    params,
                                })
                                    .then((res) => {
                                        const grabarItemCarritoHistorial = async () => {
                                            let params = {
                                                idproducto: product?.id,
                                                compatible: product?.compatible,
                                                usuario: datosusuarios.uid,
                                                cantidad: unidadesSelect,
                                            };
                                            //console.log("PROD : ", params);

                                            await axios({
                                                method: "post",
                                                url: URL_BD_MR + "581",
                                                params,
                                            })
                                                .then((res) => {
                                                    console.log(
                                                        "OK item  add carrito de compra"
                                                    );
                                                })
                                                .catch(function (error) {
                                                    console.log(
                                                        "Error item add carrito de compra"
                                                    );
                                                });
                                        };
                                        grabarItemCarritoHistorial();

                                        const leeItemAgregadoCarrito =
                                            async () => {
                                                let params = {
                                                    usuario: datosusuarios.uid,
                                                    idproducto: product?.id,
                                                };

                                                await axios({
                                                    method: "post",
                                                    url: URL_BD_MR + "62",
                                                    params,
                                                })
                                                    .then((res) => {
                                                        let item = {
                                                            idproducto:
                                                                res.data
                                                                    .listaritemcarrito[0]
                                                                    .idproducto,
                                                            nombreimagen1:
                                                                res.data
                                                                    .listaritemcarrito[0]
                                                                    .nombreimagen1,
                                                            titulonombre:
                                                                res.data
                                                                    .listaritemcarrito[0]
                                                                    .titulonombre,
                                                            cantidad:
                                                                res.data
                                                                    .listaritemcarrito[0]
                                                                    .cantidad,
                                                        };

                                                        dispatch(
                                                            getAddEdToCart(item)
                                                        );
                                                        localStorage.setItem(
                                                            "addedtocart",
                                                            JSON.stringify(item)
                                                        );
                                                        localStorage.setItem(
                                                            "itemshoppingcartadd",
                                                            JSON.stringify(null)
                                                        );
                                                        localStorage.setItem(
                                                            "contrview",
                                                            JSON.stringify(1)
                                                        );
                                                    })
                                                    .catch(function (error) {
                                                        console.log(
                                                            "Error leyendo items carrito de compra"
                                                        );
                                                    });
                                            };
                                        leeItemAgregadoCarrito();

                                        const leerItemsCarrito = async () => {
                                            let params = {
                                                usuario: datosusuarios.uid,
                                            };

                                            await axios({
                                                method: "post",
                                                url: URL_BD_MR + "59",
                                                params,
                                            })
                                                .then((res) => {
                                                    //console.log("DAT WISH LIST: ", res.data?.listaritemdeseos.length);
                                                    dispatch(
                                                        getDataShoppingCart(
                                                            res.data
                                                                .listarcarritocompra
                                                                .length
                                                        )
                                                    );
                                                })
                                                .catch(function (error) {
                                                    console.log(
                                                        "Error leyendo items carrito de compra"
                                                    );
                                                });
                                        };
                                        leerItemsCarrito();
                                    })
                                    .catch(function (error) {
                                        console.log(
                                            "Error leyendo items carrito de compra"
                                        );
                                    });
                            };
                            grabarItemCarrito();

                            let dat = {
                                cantidad: unidadesSelect,
                                compatible: product?.compatible,
                                fechacreacion: fechaactual,
                                id: product?.id,
                                idproducto: product?.id,
                                nombreimagen1: product?.thumbnail.name,
                                numerodeunidades: product?.numerounidades,
                                precio: product?.price,
                                titulonombre: product?.name,
                                usuario: datosusuarios.uid,
                                emailvendedor: product?.emailvendedor,
                                email: datosusuarios.email,
                            };

                            //console.log("DATOS : ", dat);
                            let row = [];
                            row.push(dat);
                            localStorage.setItem(
                                "itemcompra",
                                JSON.stringify(row)
                            );
                            let ruta = "/shop/checkout/";
                            router.push(ruta);
                        }
                    })
                    .catch(function (error) {
                        console.log("Error leyendo items carrito de compra");
                    });
            };
            leeItemAgregadoCarrito();
        }
    };

    const controlNumPrdCar = (data) => {
        if (datosusuarios.activo == 30) {
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Comprar productos");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            return;
        }

        let continuar = true;

        const leerItemsCarrito = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "59",
                params,
            })
                .then((res) => {
                    if (res.data?.type == 1) {
                        if (res.data?.listarcarritocompra?.length >= 15) {
                            continuar = false;
                            setShowModalMensajes(true);
                            setTituloMensajes("Carrito de compra");
                            let texto =
                                "Puedes agregar maximo 15 productos al carrito de compra";
                            setTextoMensajes(texto);
                            return;
                        } else validaPrdShoppingCar(data);
                    } else {
                        continuar = true;
                        validaPrdShoppingCar(data);
                    }
                })
                .catch(function (error) {
                    console.log("Error leyendo items carrito de compra");
                });
        };
        leerItemsCarrito();
    };

    const validaPrdShoppingCar = (data) => {
        localStorage.setItem("contrview", JSON.stringify(0));
        if (datosusuarios.uid == 0) agregarCarritoCompra(data);
        else {
            const leerItems = async () => {
                let params = {
                    idproducto: product?.id,
                    usuario: datosusuarios.uid,
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR + "62",
                    params,
                })
                    .then((res) => {
                        if (res.data?.listaritemcarrito?.length > 0) {
                            let unidades =
                                parseInt(
                                    res.data?.listaritemcarrito[0]?.cantidad
                                ) + parseInt(unidadesSelect);

                            if (unidades > product?.numerounidades) {
                                setShowModalMensajes(true);
                                setTituloMensajes("Carrito de compra");
                                let texto =
                                    "No tenemos unidades disponibles en inventario";
                                setTextoMensajes(texto);
                                return;
                            }

                            //console.log("DATOS : ", unidades," - ", product?.numerounidades)
                            //return

                            const actualizarItemCarrito = async () => {
                                let params = {
                                    id: res.data?.listaritemcarrito[0]?.id,
                                    idproducto:
                                        res.data?.listaritemcarrito[0]
                                            .idproducto,
                                    compatible:
                                        res.data?.listaritemcarrito[0]
                                            .compatible,
                                    usuario:
                                        res.data?.listaritemcarrito[0]?.usuario,
                                    cantidad: unidades,
                                };
                                //console.log("PROD : ", params);

                                await axios({
                                    method: "post",
                                    url: URL_BD_MR + "63",
                                    params,
                                })
                                    .then((res) => {
                                        const leeItemAgregadoCarrito =
                                            async () => {
                                                let params = {
                                                    usuario: datosusuarios.uid,
                                                    idproducto: product?.id,
                                                };

                                                await axios({
                                                    method: "post",
                                                    url: URL_BD_MR + "62",
                                                    params,
                                                })
                                                    .then((res) => {
                                                        //console.log("DATDASAS : ", res.data)
                                                        //return
                                                        let datos =
                                                            res.data
                                                                .listaritemcarrito[0];
                                                        let item = {
                                                            idproducto:
                                                                datos.idproducto,
                                                            nombreimagen1:
                                                                datos.nombreimagen1,
                                                            titulonombre:
                                                                datos.titulonombre,
                                                            cantidad:
                                                                datos.cantidad,
                                                        };

                                                        dispatch(
                                                            getAddEdToCart(item)
                                                        );
                                                        localStorage.setItem(
                                                            "addedtocart",
                                                            JSON.stringify(item)
                                                        );
                                                        localStorage.setItem(
                                                            "itemshoppingcartadd",
                                                            JSON.stringify(null)
                                                        );
                                                        localStorage.setItem(
                                                            "contrview",
                                                            JSON.stringify(1)
                                                        );

                                                        let row = [];
                                                        let temp = {
                                                            idproducto:
                                                                datos.idproducto,
                                                            nombreimagen1:
                                                                datos.nombreimagen1,
                                                            titulonombre:
                                                                datos.titulonombre,
                                                            cantidad:
                                                                datos.cantidad,
                                                        };

                                                        row.push(temp);
                                                        dispatch(
                                                            getAddLogin(row)
                                                        );
                                                        let ruta =
                                                            "/search?keyword=1";
                                                        router.push(ruta);
                                                    })
                                                    .catch(function (error) {
                                                        console.log(
                                                            "Error leyendo items carrito de compra"
                                                        );
                                                    });
                                            };
                                        leeItemAgregadoCarrito();

                                        const leerItemsCarrito = async () => {
                                            let params = {
                                                usuario: datosusuarios.uid,
                                            };

                                            await axios({
                                                method: "post",
                                                url: URL_BD_MR + "59",
                                                params,
                                            })
                                                .then((res) => {
                                                    //console.log("DAT WISH LIST: ", res.data?.listaritemdeseos.length);
                                                    dispatch(
                                                        getDataShoppingCart(
                                                            res.data
                                                                .listarcarritocompra
                                                                .length
                                                        )
                                                    );
                                                })
                                                .catch(function (error) {
                                                    console.log(
                                                        "Error leyendo items carrito de compra"
                                                    );
                                                });
                                        };
                                        leerItemsCarrito();
                                    })
                                    .catch(function (error) {
                                        console.log(
                                            "Error leyendo items carrito de compra"
                                        );
                                    });
                            };
                            actualizarItemCarrito();
                        } else agregarCarritoCompra(data);
                    })
                    .catch(function (error) {
                        setShowModalMensajes(true);
                        setTituloMensajes("Carrito de compra");
                        let texto =
                            "Error leyendo producto en carrito de compra";
                        setTextoMensajes(texto);
                        return;
                    });
            };
            leerItems();
        }
    };

    const agregarCarritoCompra = (data) => {
        let leeira = JSON.parse(localStorage.getItem("ira"));
        let rutaira = JSON.parse(localStorage.getItem("rutaira"));

        if (leeira == 6) {
            rutaira = rutaira;
            localStorage.setItem("aadditemcar", JSON.stringify(true));
        } else {
            rutaira = "/search?keyword=1";
        }

        if (!datosusuarios.uid || datosusuarios.uid == 0) {
            /* Guarda datos del producto que se debe agregar al localstorage */
            let itemshoppingcartadd;

            if (leeira == 6) {
                dispatch(getLeeIra(6));
                itemshoppingcartadd = {
                    ruta: rutaira,
                    idproducto: data?.id,
                    compatible: data?.compatible,
                    cantidad: unidadesSelect,
                    nombreimagen1: product?.images[0]?.name,
                    titulonombre: product?.name,
                    valida: 1,
                };
            } else {
                dispatch(getLeeIra(3));
                itemshoppingcartadd = {
                    ruta: "/search?keyword=1",
                    idproducto: data?.id,
                    compatible: data?.compatible,
                    cantidad: unidadesSelect,
                    nombreimagen1: product?.images[0]?.name,
                    titulonombre: product?.name,
                    valida: 1,
                };
            }

            //product?.images[0].name
            //console.log("DATSASA : ", itemshoppingcartadd)
            //return
            localStorage.setItem(
                "itemshoppingcartadd",
                JSON.stringify(itemshoppingcartadd)
            );

            setShowModalMensajesShoppingCart(true);
            setTituloMensajesShoppingCart(
                "¡Bienvenido! Para comprar debes ingresar a tu cuenta"
            );
            let texto = "";
            setTextoMensajesShoppingCart(texto);
            //setLogin(true);
            return;
        }

        const grabarItemCarrito = async () => {
            let params = {
                idproducto: product?.id,
                compatible: product?.compatible,
                usuario: datosusuarios.uid,
                cantidad: unidadesSelect,
                valida: 1,
            };
            //console.log("DATSASA : ", params)
            //return
            await axios({
                method: "post",
                url: URL_BD_MR + "58",
                params,
            })
                .then((res) => {
                    const grabarItemCarritoHistorial = async () => {
                        let params = {
                            idproducto: product?.id,
                            compatible: product?.compatible,
                            usuario: datosusuarios.uid,
                            cantidad: unidadesSelect,
                            valida: 1,
                        };
                        //console.log("PROD : ", params);

                        await axios({
                            method: "post",
                            url: URL_BD_MR + "581",
                            params,
                        })
                            .then((res) => {
                                console.log(
                                    "OK item  add carrito de compra"
                                );
                            })
                            .catch(function (error) {
                                console.log(
                                    "Error item add carrito de compra"
                                );
                            });
                    };
                    grabarItemCarritoHistorial();

                    const leeItemAgregadoCarrito = async () => {
                        localStorage.setItem(
                            "activargrilla",
                            JSON.stringify(1)
                        );
                        let params = {
                            usuario: datosusuarios.uid,
                            idproducto: product?.id,
                        };

                        await axios({
                            method: "post",
                            url: URL_BD_MR + "62",
                            params,
                        })
                            .then((res) => {
                                let item = {
                                    idproducto:
                                        res.data?.listaritemcarrito[0]
                                            ?.idproducto,
                                    nombreimagen1:
                                        res.data?.listaritemcarrito[0]
                                            ?.nombreimagen1,
                                    titulonombre:
                                        res.data?.listaritemcarrito[0]
                                            ?.titulonombre,
                                    cantidad:
                                        res.data?.listaritemcarrito[0]?.cantidad,
                                };

                                dispatch(getAddEdToCart(item));
                                localStorage.setItem(
                                    "addedtocart",
                                    JSON.stringify(item)
                                );
                                localStorage.setItem(
                                    "itemshoppingcartadd",
                                    JSON.stringify(null)
                                );
                                localStorage.setItem(
                                    "contrview",
                                    JSON.stringify(1)
                                );

                                if (leeira == 6) {
                                    localStorage.setItem(
                                        "activargrilla",
                                        JSON.stringify(1)
                                    );
                                } else {
                                    localStorage.setItem(
                                        "activargrilla",
                                        JSON.stringify(0)
                                    );
                                }
                            })
                            .catch(function (error) {
                                console.log(
                                    "Error leyendo items carrito de compra"
                                );
                            });
                    };
                    leeItemAgregadoCarrito();

                    const leerItemsCarrito = async () => {
                        let params = {
                            usuario: datosusuarios.uid,
                        };

                        await axios({
                            method: "post",
                            url: URL_BD_MR + "59",
                            params,
                        })
                            .then((res) => {
                                console.log("DAT WISH LIST: ", product);
                                dispatch(
                                    getDataShoppingCart(
                                        res.data?.listarcarritocompra?.length
                                    )
                                );

                                let row = [];
                                let temp = {
                                    idproducto: product?.id,
                                    nombreimagen1: product?.thumbnail.name,
                                    titulonombre: product?.name,
                                    cantidad: 1,
                                    compatible: product?.compatible,
                                };
                                //console.log("DAT WISH LIST: ", temp);
                                row.push(temp);
                                dispatch(getAddLogin(row));
                                let ruta = rutaira;
                                router.push(ruta);
                            })
                            .catch(function (error) {
                                console.log(
                                    "Error leyendo items carrito de compra"
                                );
                            });
                    };
                    leerItemsCarrito();
                })
                .catch(function (error) {
                    console.log("Error leyendo items carrito de compra");
                });
        };
        grabarItemCarrito();
    };

    return (
        <div className="mtmenos20 mb-20">
            <ModalMensajesWishList
                shown={showModalMensajes}
                close={setShowModalMensajes}
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
            <ModalMensajesWishListControl
                shown={showModalMensajesCtlr}
                close={setShowModalMensajesCtlr}
                titulo={tituloMensajesCtlr}
                mensaje={textoMensajesCtlr}
                setSoyNuevo={setSoyNuevo}
                setTengoCuenta={setTengoCuenta}
                tipo="1"
            />
            <ModalMensajesSoyNuevo
                shown={showModalMensajesShoppingCart}
                close={setShowModalMensajesShoppingCart}
                titulo={tituloMensajesShoppingCart}
                mensaje={textoMensajesShoppingCart}
                setSoyNuevo={setSoyNuevo}
                setTengoCuenta={setTengoCuenta}
                tipo="1"
            />
            {refresh ? <RefreshWishlist setRefresh={setRefresh} /> : null}
            <div className="ps-product__add-cart">
                <label className="ps-product__label">
                    Unidades disponibles: {product?.numerounidades}
                </label>
                {
                    product?.numerounidades > 0 ?
                        <div>
                            <Row className="cajaunidadeselect">
                                <Col xs={4} sm={4} md={4} lg={4}>
                                    <button
                                        className={classUnd}
                                        onClick={() => selCantidad(-1)}>
                                        _
                                    </button>
                                </Col>
                                <Col xs={5} sm={5} md={5} lg={5}>
                                    <input
                                        className="cajaunidadeinput"
                                        type="text"
                                        defaultValue="1"
                                        value={unidadesSelect}
                                        //onChange={(e)=>handleChangeInput(e.target.value)}
                                        placeholder="1"
                                    />
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2}>
                                    <button
                                        className={classUndMas}
                                        onClick={() => selCantidad(1)}>
                                        +
                                    </button>
                                </Col>
                            </Row>

                            <div className="mt-20">
                                <Grid container spacing={1}>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <h1
                                            className="botoncomprarahora"
                                            onClick={() => comprarAhora()}>
                                            Comprar ahora
                                        </h1>
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <Grid item xs={6} md={6} lg={6}>
                                            <h1
                                                className="botonagregarcarrito"
                                                onClick={(e) =>
                                                    controlNumPrdCar(product)
                                                }>
                                                Agregar al carrito
                                            </h1>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                            <Row className="subrayartextosingleview ">
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <a onClick={(e) => validaPrdListWish()}>
                                        Agregar a lista de deseos{" "}
                                        <i class="fa fa-heart-o" aria-hidden="true"></i>
                                    </a>
                                </Col>
                            </Row>
                        </div>
                        :
                        <div>
                            <Row className="cajaunidadeselect">
                                <Col xs={4} sm={4} md={4} lg={4}>
                                    <button
                                        className={classUnd}
                                        onClick={() => selCantidad(-1)}>
                                        _
                                    </button>
                                </Col>
                                <Col xs={5} sm={5} md={5} lg={5}>
                                    <input
                                        className="cajaunidadeinput disabledButton2"
                                        type="text"
                                        defaultValue="0"
                                        value={0}
                                        //onChange={(e)=>handleChangeInput(e.target.value)}
                                        placeholder="1"
                                    />
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2}>
                                    <button
                                        className={classUndMas}
                                        onClick={() => selCantidad(1)}>
                                        +
                                    </button>
                                </Col>
                            </Row>

                            <div className="mt-20">
                                <Grid container spacing={1}>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <h1
                                            className="botoncomprarahora disabledButton2"
                                            onClick={() => comprarAhora()}>
                                            Comprar ahora
                                        </h1>
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <Grid item xs={6} md={6} lg={6}>
                                            <h1
                                                className="botonagregarcarrito disabledButton2"
                                                onClick={(e) =>
                                                    controlNumPrdCar(product)
                                                }>
                                                Agregar al carrito
                                            </h1>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                            <Row className="subrayartextosingleview disabledButton2">
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <a onClick={(e) => validaPrdListWish()}>
                                        Agregar a lista de deseos{" "}
                                        <i class="fa fa-heart-o" aria-hidden="true"></i>
                                    </a>
                                </Col>
                            </Row>
                        </div>
                }

            </div>
        </div>
    );
};
export default connect((state) => state)(ModuleDetailShoppingActions);
