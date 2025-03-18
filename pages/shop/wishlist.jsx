import React, { useEffect, useState, useRef } from "react";
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
import { getDataWishList } from "../../store/datawishlist/action";
import LoadingSearchResult from "~/components/elements/Loading/LoadingSearchResult";
import RefreshWishlist from "./refreshwishlist";
import { getDataShoppingCart } from "../../store/datashoppingcart/action";
import { getAddEdToCart } from "../../store/addedtocart/action";
import { getLeeIra } from "../../store/leeira/action";
import { getBlockScreen } from "../../store/blockscreen/action";
import { getResetInput } from "../../store/resetinput/action";
import ViewAddShoppingCart from "./viewaddshoppingcart";
import ModalControlAcceso from "../mensajes/ModalControlAcceso";

const breadcrumb = [
    {
        text: "Inicio",
        url: "/",
    },
    {
        text: "Tienda",
        url: "/shopping-cart",
    },
    {
        text: "Lista de deseos",
    },
];

const WishlistScreen = ({ ecomerce }) => {
    const router = useRouter();
    const irA = useRef(null);

    const { loading, products, getProducts } = useEcomerce();
    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState(false);
    const [selectItem, setSelectItem] = useState(false);
    const [itemsListWish, setItemsListWish] = useState([]);
    const [arrayItems, setArrayItems] = useState([]);
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    const [classEliminarAll, setClassEliminarAll] = useState(
        "textoreliminartodowishlist"
    );

    const [showModalControlAcceso, setShowModalControlAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

    const [addcartId, setAddcartId] = useState(0);
    const [addcartIdLogin, setAddcartIdLogin] = useState(0);
    const [addcartImagen, setAddcartImagen] = useState(0);
    const [addcartTitulo, setAddcartTitulo] = useState(0);
    const [addcartCantidad, setAddcartCantidad] = useState(0);
    const [agregarCarrito, setAgregarCarrito] = useState(false);
    const [dataCart, setDataCart] = useState(0);

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    let numberitemswishlist = useSelector(
        (state) => state.wishlist.datawishlist
    );

    useEffect(() => {
        if (datosusuarios.activo == 30) {
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Agregar a lista de deseos");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            return;
        }
    });

    const verProduct = (dat) => {
        let ruta = "/product/" + dat;
        router.push(ruta);
    };

    const controlNumPrdCar = (index) => {
        //alert(index)
        let data = itemsListWish[index];
        //alert(data.idproducto)
        //return
        let continuar = true;
        //console.log("PRODUCS : ", itemsListWish);
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
        localStorage.setItem("aadditemcar", JSON.stringify(true));

        if (datosusuarios.uid == 0) agregarCarritoCompra(data);
        else {
            const leerItems = async () => {
                let params = {
                    idproducto: data.idproducto,
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
                                ) + parseInt(1);

                            if (unidades <= 1) {
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
                                                    idproducto: data.idproducto,
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
                                                    agregarCarritoCompra(data);
                                                })
                                                .catch(function (error) {
                                                    console.log(
                                                        "Error leyendo items carrito de compra uno"
                                                    );
                                                });
                                        };
                                        leerItemsCarrito();
                                    })
                                    .catch(function (error) {
                                        console.log(
                                            "Error leyendo items carrito de compra dos"
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
        //let rutaira = router.pathname;
        let rutaira = "/search?keyword=1";

        if (!datosusuarios.uid || datosusuarios.uid == 0) {
            /* Guarda datos del producto que se debe agregar al localstorage */
            dispatch(getLeeIra(6));
            dispatch(getBlockScreen(1));
            localStorage.setItem("activargrilla", JSON.stringify(1));
            localStorage.setItem("ira", JSON.stringify(6));
            //product.images[0].name
            let itemshoppingcartadd = {
                ruta: rutaira,
                idproducto: data.idproducto,
                compatible: data.compatible,
                cantidad: 1,
                nombreimagen1: data.nombreimagen1,
                titulonombre: data.titulonombre,
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

        const grabarItemCarrito = async () => {
            localStorage.setItem("aadditemcar", JSON.stringify(true));
            let params = {
                idproducto: data.idproducto,
                compatible: data.compatible,
                usuario: datosusuarios.uid,
                cantidad: 1,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "58",
                params,
            })
                .then((res) => {
                    const grabarItemCarritoHistorial = async () => {
                        let params = {
                            idproducto: data.idproducto,
                            compatible: data.compatible,
                            usuario: datosusuarios.uid,
                            cantidad: 1,
                        };
                        
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
                            idproducto: data.idproducto,
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
                                //router.push(rutaira);
                                setAddcartId(
                                    res.data.listaritemcarrito[0].idproducto
                                );
                                localStorage.setItem(
                                    "itemshoppingcartadd",
                                    JSON.stringify(null)
                                );
                                setAddcartIdLogin(0);
                                setAddcartImagen(
                                    res.data.listaritemcarrito[0].nombreimagen1
                                );
                                setAddcartTitulo(
                                    res.data.listaritemcarrito[0].titulonombre
                                );
                                setAddcartCantidad(1);
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
                                //router.push(rutaira);
                                setAddcartId(
                                    res.data.listarcarritocompra[0].idproducto
                                );
                                localStorage.setItem(
                                    "itemshoppingcartadd",
                                    JSON.stringify(null)
                                );
                                setAddcartIdLogin(0);
                                setAddcartImagen(
                                    res.data.listarcarritocompra[0]
                                        .nombreimagen1
                                );
                                setAddcartTitulo(
                                    res.data.listarcarritocompra[0].titulonombre
                                );
                                setAddcartCantidad(1);
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

    useEffect(() => {
        dispatch(getResetInput(1));
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
                    //console.log("DAT WISH LIST: ", res.data.listaritemdeseos);
                    setItemsListWish(res.data.listaritemdeseos);
                    dispatch(getDataWishList(res.data.listaritemdeseos.length));
                })
                .catch(function (error) {
                    console.log("Error leyendo datos lista deseos");
                });
        };
        leerItems();
    }, [numberitemswishlist, isLoading, datosusuarios]);
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
                    title="Ningún producto en su lista de deseos."
                />
            );
        }
    }

    const borrarUnItem = (item) => {
        let borrar = true;
        const borrarAllItems = async () => {
            let params = {
                usuario: datosusuarios.uid,
                idproducto: item,
            };

            //console.log("DAT XX : ", params);
            await axios({
                method: "post",
                url: URL_BD_MR + "56",
                params,
            })
                .then((res) => {
                    console.log("OK Borrando item lista deseos: ", res);
                    if (res.data.type == 1) {
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
                                    //console.log("LONGITUD : ", res.data.listaritemdeseos.length);
                                    setItemsListWish(res.data.listaritemdeseos);
                                    dispatch(
                                        getDataWishList(
                                            res.data.listaritemdeseos.length
                                        )
                                    );
                                })
                                .catch(function (error) {
                                    console.log(
                                        "Error leyendo datos lista deseosXXX"
                                    );
                                });
                        };
                        leerItems();
                    }
                })
                .catch(function (error) {
                    borrar = false;
                    console.log("Error leyendo datos lista deseos000");
                });
        };
        borrarAllItems();

        if (borrar) {
            setShowModalMensajes(true);
            setTituloMensajes("Lista de deseos");
            let texto = "Productos eliminados de la lista de deseos";
            setTextoMensajes(texto);
            setArrayItems([]);
            setSelectAll(false);
        }
    };

    const deleteItemsSelect = () => {
        let borrar = true;
        arrayItems &&
            arrayItems.map((row, index) => {
                const borrarAllItems = async () => {
                    let params = {
                        usuario: datosusuarios.uid,
                        idproducto: row,
                    };

                    //console.log("DAT XX : ", params);
                    await axios({
                        method: "post",
                        url: URL_BD_MR + "56",
                        params,
                    })
                        .then((res) => {
                            console.log("OK Borrando item lista deseos: ", res);
                            if (res.data.type == 1) {
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
                                            //console.log("LONGITUD : ", res.data.listaritemdeseos.length);
                                            setItemsListWish(
                                                res.data.listaritemdeseos
                                            );
                                            dispatch(
                                                getDataWishList(
                                                    res.data.listaritemdeseos
                                                        .length
                                                )
                                            );
                                        })
                                        .catch(function (error) {
                                            console.log(
                                                "Error leyendo datos lista deseosXXX"
                                            );
                                        });
                                };
                                leerItems();
                            }
                        })
                        .catch(function (error) {
                            borrar = false;
                            console.log("Error leyendo datos lista deseos000");
                        });
                };
                borrarAllItems();
            });

        if (borrar) {
            setShowModalMensajes(true);
            setTituloMensajes("Lista de deseos");
            let texto = "Productos eliminados de la lista de deseos";
            setTextoMensajes(texto);
            setArrayItems([]);
            setSelectAll(false);
        }
    };

    const selectItemsAll = () => {
        setArrayItems([]);
        let array = [];
        itemsListWish &&
            itemsListWish.map((row, index) => {
                array.push(row.idproducto);
            });
        setArrayItems(array);
        setSelectAll(true);
    };

    const deleteItemsAll = () => {
        setArrayItems([]);
        setSelectAll(false);
    };

    const selectItems = (item) => {
        let array = [];
        array.push(item);
        arrayItems &&
            arrayItems.map((row, index) => {
                array.push(row);
            });
        //console.log("ITEMS SEL : ", array);
        setArrayItems(array);
    };

    const unSelectItems = (item) => {
        let nvoarray = arrayItems;
        let nvo = [];

        nvoarray &&
            nvoarray.map((row, index) => {
                if (row != item) {
                    nvo.push(row);
                }
            });
        setArrayItems(nvo);
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
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [addcartId]);

    return (
        <Container title="Wishlist">
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
            {refreshData ? <RefreshWishlist /> : null}

            <div className="ps-page ps-page--inner" ref={irA}>
                <div className="container">
                    <div className="ps-page__header">
                        <div className="ml-50">
                            <BreadCrumb breacrumb={breadcrumb} />
                        </div>

                        {isLoading ? (
                            <LoadingSearchResult />
                        ) : (
                            <div>
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item xs={4} md={4} lg={4}>
                                        <div className="textoresultprod">
                                            Lista de deseos
                                        </div>
                                    </Grid>
                                </Grid>

                                {addcartId > 0 ? (
                                    <div className="productoagregarcarritotres">
                                        <ViewAddShoppingCart
                                            idproducto={addcartId}
                                            nombreimagen1={addcartImagen}
                                            titulonombre={addcartTitulo}
                                        />
                                    </div>
                                ) : addcartIdLogin > 0 ? (
                                    <div className="productoagregarcarritotres">
                                        <ViewAddShoppingCart
                                            idproducto={addcartIdLogin}
                                            nombreimagen1={addcartImagen}
                                            titulonombre={addcartTitulo}
                                        />
                                    </div>
                                ) : null}

                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item xs={1} md={1} lg={1}>
                                        {itemsListWish.length > 0 ? (
                                            <div>
                                                {!selectAll ? (
                                                    <i
                                                        onClick={() =>
                                                            selectItemsAll()
                                                        }
                                                        className="checklistachequeo fa fa-square-o apuntador"
                                                        aria-hidden="true"></i>
                                                ) : (
                                                    <i
                                                        onClick={() =>
                                                            deleteItemsAll()
                                                        }
                                                        className="checklistachequeo fa fa-check-square-o apuntador"
                                                        aria-hidden="true"></i>
                                                )}
                                            </div>
                                        ) : null}
                                    </Grid>
                                    <Grid item xs={4} md={4} lg={4}>
                                        {itemsListWish.length > 0 ? (
                                            <div
                                                className={classEliminarAll}
                                                onClick={() =>
                                                    deleteItemsSelect()
                                                }>
                                                Eliminar producto(s)
                                                seleccionados
                                            </div>
                                        ) : null}
                                    </Grid>
                                    <Grid item xs={4} md={4} lg={4}></Grid>
                                    <Grid item xs={3} md={3} lg={3}>
                                        <div className="numeroprodlistadeseo">
                                            Productos en lista de deseo:{" "}
                                            {itemsListWish.length}
                                        </div>
                                    </Grid>
                                </Grid>

                                {itemsListWish.length > 0
                                    ? itemsListWish &&
                                      itemsListWish.map((item, index) => {
                                          return (
                                              <div>
                                                  <Grid
                                                      container
                                                      alignItems="center"
                                                      spacing={1}>
                                                      <Grid
                                                          item
                                                          xs={12}
                                                          md={12}
                                                          lg={12}>
                                                          <div className="linealistadeseo"></div>
                                                      </Grid>
                                                      <Grid
                                                          item
                                                          xs={1}
                                                          md={1}
                                                          lg={1}>
                                                          <div>
                                                              {arrayItems.includes(
                                                                  item.idproducto
                                                              ) ? (
                                                                  <i
                                                                      onClick={() =>
                                                                          unSelectItems(
                                                                              item.idproducto
                                                                          )
                                                                      }
                                                                      className="checklistachequeo 
                                                                         fa fa-check-square-o
                                                                         apuntador"
                                                                      aria-hidden="true"></i>
                                                              ) : (
                                                                  <i
                                                                      onClick={() =>
                                                                          selectItems(
                                                                              item.idproducto
                                                                          )
                                                                      }
                                                                      className="checklistachequeo
                                                                         fa fa-square-o
                                                                         apuntador"
                                                                      aria-hidden="true"></i>
                                                              )}
                                                          </div>
                                                      </Grid>
                                                      <Grid
                                                          item
                                                          xs={2}
                                                          md={2}
                                                          lg={2}>
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
                                                          xs={7}
                                                          md={7}
                                                          lg={7}>
                                                          <div className="mlmenos90">
                                                              <Grid
                                                                  item
                                                                  xs={12}
                                                                  md={12}
                                                                  lg={12}>
                                                                  <div
                                                                      className="textotitulolistadeseo apuntador"
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
                                                                  xs={12}
                                                                  md={12}
                                                                  lg={12}>
                                                                  <div className="formatopreciolistadeseo">
                                                                      ${" "}
                                                                      {myNumber(
                                                                          1,
                                                                          item.precio,
                                                                          2
                                                                      )}
                                                                  </div>
                                                              </Grid>
                                                              <Grid
                                                                  item
                                                                  xs={12}
                                                                  md={12}
                                                                  lg={12}>
                                                                  <div className="textounidadeslistadeseo">
                                                                      Unidades
                                                                      disponible:{" "}
                                                                      {myNumber(
                                                                          1,
                                                                          item.numerodeunidades,
                                                                          2
                                                                      )}
                                                                  </div>
                                                              </Grid>
                                                              <Grid
                                                                  item
                                                                  xs={12}
                                                                  md={12}
                                                                  lg={12}>
                                                                  <div
                                                                      className="botoneliminarlistadeseo apuntador"
                                                                      onClick={() =>
                                                                          borrarUnItem(
                                                                              item.idproducto
                                                                          )
                                                                      }>
                                                                      Eliminar
                                                                  </div>
                                                              </Grid>
                                                          </div>
                                                      </Grid>
                                                      <Grid
                                                          item
                                                          xs={2}
                                                          md={2}
                                                          lg={2}>
                                                          <div
                                                              className="cajaagregarcarrito apuntador"
                                                              onClick={() =>
                                                                  controlNumPrdCar(
                                                                      index
                                                                  )
                                                              }
                                                              href="#">
                                                              Agregar al carrito
                                                          </div>{" "}
                                                      </Grid>
                                                      {itemsListWish.length ==
                                                      index + 1 ? (
                                                          <Grid
                                                              item
                                                              xs={12}
                                                              md={12}
                                                              lg={12}>
                                                              <div className="linealistadeseo"></div>
                                                          </Grid>
                                                      ) : null}
                                                  </Grid>
                                              </div>
                                          );
                                      })
                                    : null}
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
