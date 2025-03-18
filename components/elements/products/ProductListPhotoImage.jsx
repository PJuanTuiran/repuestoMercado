import React, { useState, useEffect } from "react";
import Link from "next/link";
import useProduct from "~/hooks/useProduct";
import { Row, Col } from "react-bootstrap";
import { myNumber } from "../../../utilities/ArrayFunctions";
import RatingPrdSingleView from "~/components/elements/products/modules/RatingPrdSingleView";
import ModalMensajesWishList from "../../../pages/mensajes/ModalMensajesWishList";
import ModalMensajesSoyNuevo from "../../../pages/mensajes/ModalMensajesSoyNuevo";
import ModalControlAcceso from "../../../pages/mensajes/ModalControlAcceso";

import ModalMensajesWishListControl from "../../../pages/mensajes/ModalMensajesWishListControl";
import ModalMensajes from "../../../pages/mensajes/ModalMensajes";
import axios from "axios";
import { getDataWishList } from "../../../store/datawishlist/action";
import { getDataShoppingCart } from "../../../store/datashoppingcart/action";
import { getAddEdToCart } from "../../../store/addedtocart/action";
import { getLeeIra } from "../../../store/leeira/action";
import { getBlockScreen } from "../../../store/blockscreen/action";
import { useDispatch, connect, useSelector } from "react-redux";

import { useRouter } from "next/router";
//Constantes
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../helpers/Constants";
let itemmasselect = [];
let itemmenosselect = [];

const ProductListPhotoImage = ({ product }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { pricesearch, badges } = useProduct();
    const [unidadesSelect, setunidadesSelect] = useState(1);
    const [classUnd, setClassUnd] = useState(0);
    const [classUndMas, setClassUndMas] = useState(0);

    const [showModalMensajesInfo, setShowModalMensajesInfo] = useState(false);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [showModalControlAcceso, setShowModalControlAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

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
    //soynuevo, tengocuenta, seguir

    const [login, setLogin] = useState(false);

    function handleAddItemToCart(e, product) {
        e.preventDefault();
        //addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, "cart");
        //dispatch(toggleDrawer(true));
    }

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    useEffect(() => {

        if (unidadesSelect == 0) {
            setClassUnd("botonescontrolunidadesmenos sinborder deshabilitar");
        } else {
            setClassUnd("botonescontrolunidadesmenos sinborder");
        }

        if (unidadesSelect >= product.numerounidades) {
            setClassUndMas("botonescontrolunidades sinborder deshabilitar");
        } else {
            setClassUndMas("botonescontrolunidades sinborder");
        }
        //product.numerounidades
    }, [unidadesSelect]);

    const selCantidad = (cant) => {
        let cantidad = parseInt(unidadesSelect) + parseInt(cant);
        setunidadesSelect(cantidad);
        //product.numerounidades
    };

    const validaPrdListWish = () => {
        if (datosusuarios.activo == 30) {
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Crear productos");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            return
        }

        if (datosusuarios.uid && datosusuarios.uid != 0) {
            const leerItems = async () => {
                let params = {
                    idproducto: product.id,
                    usuario: datosusuarios.uid,
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR + "57",
                    params,
                })
                    .then((res) => {
                        if (res.data.listaritemdeseos.length > 0) {
                            //console.log("LEER : ", res.data.listaritemdeseos[0].idproducto
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
        } else agregarListaDeseo();
    };

    const agregarListaDeseo = () => {
        if (!datosusuarios.uid || datosusuarios.uid == 0) {
            dispatch(getLeeIra(4));
            dispatch(getBlockScreen(1));

            localStorage.setItem("ira", JSON.stringify(4));

            let itemswishlistadd = {
                ruta: "/search?keyword=",
                idproducto: product.id,
                compatible: product.compatible,
                cantidad: 1,
            };
            localStorage.setItem(
                "itemswishlistadd",
                JSON.stringify(itemswishlistadd)
            );

            //return
            setShowModalMensajesShoppingCart(true);
            let texto =
                "¡Bienvenido! Para agregar a lista de deseo debes ingresar a tu cuenta";
            setTituloMensajesShoppingCart(texto);
            setTextoMensajesShoppingCart(texto);
            //setLogin(true);
            return;
        }

        const grabarItem = async () => {
            let params = {
                idproducto: product.id,
                compatible: product.compatible,
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
                            idproducto: product.id,
                            compatible: product.compatible,
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
                                //console.log("DAT WISH LIST: ", res.data.listaritemdeseos.length);
                                dispatch(
                                    getDataWishList(
                                        res.data.listaritemdeseos.length
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

    useEffect(() => {
        const interval = setInterval(() => {
            if (login) {
                router.push("/loginaccount");
                setLogin(false);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [login]);

    const controlNumPrdCar = (data) => {
        if (datosusuarios.activo == 30) {
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Crear productos");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            return
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
                    if (res.data.type == 1) {
                        console.log(
                            "RESPDATA : ",
                            res.data.listarcarritocompra.length
                        );
                        if (res.data.listarcarritocompra.length >= 15) {
                            continuar = false;
                            setShowModalMensajes(true);
                            setTituloMensajes("Carrito de compra");
                            let texto =
                                "Puedes agregar maximo 15 productos al carrito de compra";
                            setTextoMensajes(texto);
                            return;
                        } else validaPrdShoppingCar();
                    } else {
                        continuar = true;
                        validaPrdShoppingCar();
                    }
                })
                .catch(function (error) {
                    console.log("Error leyendo items carrito de compra");
                });
        };

        if (datosusuarios.uid == 0) {
            agregarCarritoCompra(0);
        } else leerItemsCarrito();
    };

    const validaPrdShoppingCar = (data) => {
        if (unidadesSelect == 0) {
            setShowModalMensajesInfo(true);
            setTituloMensajes("Carrito de compra");
            let texto = "Debes seleccionar como minimo una unidad";
            setTextoMensajes(texto);
            return;
        }

        localStorage.setItem("contrview", JSON.stringify(0));
        localStorage.setItem("aadditemcar", JSON.stringify(true));

        if (datosusuarios.uid == 0) agregarCarritoCompra(data);
        else {
            const leerItems = async () => {
                let params = {
                    idproducto: product.id,
                    usuario: datosusuarios.uid,
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR + "62",
                    params,
                })
                    .then((res) => {
                        if (res.data.listaritemcarrito.length > 0) {
                            let unidades =
                                parseInt(
                                    res.data.listaritemcarrito[0].cantidad
                                ) + parseInt(unidadesSelect);

                            if (unidades <= unidadesSelect) {
                                setShowModalMensajes(true);
                                setTituloMensajes("Carrito de compra");
                                let texto =
                                    "No tenemos unidades disponibles en inventario";
                                setTextoMensajes(texto);
                                return;
                            }

                            const actualizarItemCarrito = async () => {
                                let params = {
                                    id: res.data.listaritemcarrito[0].id,
                                    idproducto:
                                        res.data.listaritemcarrito[0]
                                            .idproducto,
                                    compatible:
                                        res.data.listaritemcarrito[0]
                                            .compatible,
                                    usuario:
                                        res.data.listaritemcarrito[0].usuario,
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
                                                    idproducto: product.id,
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
                                                    //console.log("DAT WISH LIST: ", res.data.listaritemdeseos.length);
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
        let rutaira = router.pathname;
        if (!datosusuarios.uid || datosusuarios.uid == 0) {
            /* Guarda datos del producto que se debe agregar al localstorage */
            dispatch(getLeeIra(6));
            dispatch(getBlockScreen(1));
            localStorage.setItem("activargrilla", JSON.stringify(1));
            localStorage.setItem("ira", JSON.stringify(6));
            //product.images[0].name
            let itemshoppingcartadd = {
                ruta: rutaira,
                idproducto: product.id,
                compatible: product.compatible,
                cantidad: unidadesSelect,
                nombreimagen1: product.images[0].name,
                titulonombre: product.name,
                valida: 0,
            };
            localStorage.setItem(
                "itemshoppingcartadd",
                JSON.stringify(itemshoppingcartadd)
            );

            //console.log("DATASXXX : ", itemshoppingcartadd)
            //return

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
            localStorage.setItem("aadditemcar", JSON.stringify(true));
            let params = {
                idproducto: product.id,
                compatible: product.compatible,
                usuario: datosusuarios.uid,
                cantidad: unidadesSelect,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "58",
                params,
            })
                .then((res) => {
                    const grabarItemCarritoHistorial = async () => {
                        let params = {
                            idproducto: product.id,
                            compatible: product.compatible,
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

                    const leeItemAgregadoCarrito = async () => {
                        let params = {
                            usuario: datosusuarios.uid,
                            idproducto: product.id,
                        };

                        await axios({
                            method: "post",
                            url: URL_BD_MR + "62",
                            params,
                        })
                            .then((res) => {
                                let item = {
                                    idproducto:
                                        res.data.listaritemcarrito[0]
                                            .idproducto,
                                    nombreimagen1:
                                        res.data.listaritemcarrito[0]
                                            .nombreimagen1,
                                    titulonombre:
                                        res.data.listaritemcarrito[0]
                                            .titulonombre,
                                    cantidad:
                                        res.data.listaritemcarrito[0].cantidad,
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
                                dispatch(
                                    getDataShoppingCart(
                                        res.data.listarcarritocompra.length
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
                    console.log("Error leyendo items carrito de compra");
                });
        };
        grabarItemCarrito();
    };

    const onClickImagen = () => {
        dispatch(getLeeIra(6));
        localStorage.setItem("ira", JSON.stringify(6));
        localStorage.setItem("rutaira", JSON.stringify(router.pathname));
        localStorage.setItem("activargrilla", JSON.stringify(1));

        const addItemVisita = async () => {
            let params = {
                idproducto: product.id,
                usuario: datosusuarios.uid,
                compatible: product.compatible,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "70",
                params,
            })
                .then((res) => {
                    if (res.data > 0) {
                        console.log("LEER : ", res.data);
                    } else console.log("ERROR : ", res.data);
                })
                .catch(function (error) {
                    console.log("ERROR : ", res.data);
                    return;
                });
        };
        addItemVisita();

        const addItemHistoryPrd = async () => {
            let datauser = JSON.parse(localStorage.getItem("datauser"));

            let params = {
                idproducto: product.id,
                usuario: datauser.uid,
                compatible: product.compatible,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "87",
                params,
            })
                .then((res) => {
                    if (res.data > 0) {
                        console.log("LEER : ", res.data);
                    } else console.log("ERROR : ", res.data);
                })
                .catch(function (error) {
                    console.log("ERROR : ", res.data);
                    return;
                });
        };
        addItemHistoryPrd();
    };

    //console.log("RUTAXXXX : ", router.pathname);
    return (
        <div className="ps-product ps-product--horizontal">
            <ModalMensajes
                shown={showModalMensajesInfo}
                close={setShowModalMensajesInfo}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />

            <ModalMensajesWishList
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
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

            <ModalControlAcceso
                shown={showModalControlAcceso}
                close={setShowModalControlAcceso}
                titulo={tituloControlAcceso}
                mensaje={textoControlAcceso}
                tipo="1"
            />

            <div
                className="ps-product__thumbnail cajaimageresultlist"
                onClick={() => onClickImagen()}>
                <a
                    href={`/product/${product.id}`}
                    as={`/product/${product.id}`}>
                    <img
                        className="imageresultlist"
                        src={URL_IMAGES_RESULTS + product.images[0].name}
                        alt="First slide"
                    />
                    {badges(product)}
                </a>
            </div>

            <div className="ps-product__wrapper">
                <div className="cajadatosprdgriptres">
                    <div
                        className="namegriplistresult"
                        onClick={() => onClickImagen()}>
                        <Link
                            href="/product/[id]"
                            as={`/product/${product.id}`}>
                            <a className="colorbase">{product.name}</a>
                        </Link>
                    </div>
                    <ul className="ps-product__short-desc">
                        <li>Marca: {product.marcarepuesto}</li>
                        <li>Condicion : {product.condicion}</li>
                    </ul>

                    {product.estadoproducto > 0 ? (
                        <Row className="mt-1">
                            <Col xs={5} sm={5} md={5} lg={5}>
                                <div className="tamañotextoestadoprd ">
                                    Estado del producto:{" "}
                                </div>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                                <RatingPrdSingleView
                                    estadoproducto={product.estadoproducto}
                                />
                            </Col>
                        </Row>
                    ) : null}
                    <Row>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            <div>
                                {product.estadoproducto > 0 ? (
                                    <div className="mtmenos8 divlistadeseos">
                                        <i className="searchContainerFont colorbase fa fa-heart-o"></i>
                                        <Link href="#">
                                            <a
                                                className="ml-2 textoordenarpor"
                                                onClick={() =>
                                                    validaPrdListWish()
                                                }>
                                                Agregar a lista de deseos{" "}
                                            </a>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="divlistadeseos">
                                        <i className="mt-4 searchContainerFont colorbase fa fa-heart-o"></i>
                                        <Link href="#">
                                            <a
                                                className="ml-2 textoordenarpor pt-3"
                                                onClick={() =>
                                                    validaPrdListWish()
                                                }>
                                                Agregar a lista de deseos{" "}
                                            </a>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="ps-product__right ">
                    <div className="formatopreciogriptres">
                        $ {myNumber(1, product.price, 2)}
                    </div>
                    <div>
                        <Row className="cajacontrolunidades">
                            <Col xs={4} sm={4} md={4} lg={4}>
                                <button
                                    className={classUnd}
                                    onClick={() => selCantidad(-1)}>
                                    _
                                </button>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                                {
                                    product.numerounidades || product.numerounidades > 0 ?
                                        <input
                                            className="inputcajaunidades"
                                            type="text"
                                            defaultValue="1"
                                            value={unidadesSelect}
                                            placeholder="1"
                                        />
                                        :
                                        <input
                                            className="inputcajaunidades "
                                            type="text"
                                            defaultValue="0"
                                            value={0}
                                            placeholder="0"
                                        />
                                }
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2}>
                                <button
                                    className={classUndMas}
                                    onClick={() => selCantidad(1)}>
                                    +
                                </button>
                            </Col>
                        </Row>
                        <div className="textounddisponibles">
                            Unidades disponibles : {
                                product.numerounidades || product.numerounidades > 0 ?
                                    product.numerounidades
                                    :
                                    0
                            }
                        </div>
                        <Row className="mt-3">
                            <Col xs={12} sm={12} md={12} lg={12}>
                                {
                                    product.numerounidades || product.numerounidades > 0 ?
                                        <div
                                            className="cajaagregarcarritoresult"
                                            href="#"
                                            onClick={() => controlNumPrdCar(product)}>
                                            Agregar al carrito
                                        </div>
                                        :
                                        <div
                                            className="cajaagregarcarritoresult disabledButton2"
                                            href="#"
                                            onClick={() => controlNumPrdCar(product)}>
                                            Agregar al carrito
                                        </div>
                                }
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListPhotoImage;
