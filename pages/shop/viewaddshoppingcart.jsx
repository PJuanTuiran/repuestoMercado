import React, { useEffect, useState } from "react";
import { useRouter, connect } from "next/router";
import Link from "next/link";
import useEcomerce from "~/hooks/useEcomerce";
import { useDispatch, useSelector } from "react-redux";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { Box, Grid, Button } from "@mui/material";
import axios from "axios";
import { getDataShoppingCart } from "../../store/datashoppingcart/action";

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

const ViewAddShoppingCart = (props) => {
    const { idproducto, nombreimagen1, titulonombre } = props;
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
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    const [classEliminarAll, setClassEliminarAll] = useState(
        "textoreliminartodowishlist"
    );

    const [quantity, setQuantity] = useState(1);
    const [unidadesSelect, setunidadesSelect] = useState(0);
    const [classUnd, setClassUnd] = useState("btnunidselshoppingcartmenos");
    const [classUndMas, setClassUndMas] = useState("btnunidselshoppingcart");
    const [masProductos, setMasProductos] = useState(true);
    const [totalPrd, setTotalPrd] = useState(0);
    const [envios, setEnvios] = useState(21000);
    const [totalCompra, setTotalCompra] = useState(0);
    const [direccionesUsuarios, setDireccionesUsuarios] = useState([]);

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    let numberitemswishlist = useSelector(
        (state) => state.wishlist.datawishlist
    );

    useEffect(() => {
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
                    setItemsShoppingCart(res.data.listarcarritocompra);
                    //console.log("DAT WISH LIST: ",res.data.listarcarritocompra);
                    //AQUI
                    let total = 0;
                    res.data.listarcarritocompra &&
                        res.data.listarcarritocompra.map((item, index) => {
                            total =
                                parseInt(total) +
                                parseInt(item.cantidad * item.precio);
                            undsel[index] = item.cantidad;
                        });
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
    }, []);

    useEffect(() => {
        //console.log("CANTIDAD : ", quantity);
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

    const selCantidad = (cant, unddispo) => {
        let cantidad = parseInt(unidadesSelect) + parseInt(cant);
        setunidadesSelect(cantidad);
        setQuantity(unddispo);
        //product.numerounidades
    };

    const verProduct = (dat) => {
        let ruta = "/product/" + dat;
        router.push(ruta);
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

    const continuarCompra = (dat) => {
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

    return (
        <div>
            <div className="container">
                <div className="ps-page__header">
                    <div>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs={2} md={2} lg={2}>
                                <img
                                    className="imageaddshoppingcart"
                                    onClick={() => verProduct(idproducto)}
                                    src={URL_IMAGES_RESULTS + nombreimagen1}
                                    alt="First slide"
                                />
                                <div className="mtmenos20 ml-80">
                                    <i
                                        className="checkaddshoppingcart fa fa-check-circle"
                                        aria-hidden="true"></i>
                                </div>
                            </Grid>
                            <Grid item xs={7} md={7} lg={7}>
                                <div className="mlmenos110">
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}>
                                        <Grid item xs={12} md={9} lg={9}>
                                            <div className="tituloaddhsoppingcart">
                                                Producto agregado a tu carrito!
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} md={9} lg={9}>
                                            <div
                                                className="textoaddhsoppingcart"
                                                onClick={() =>
                                                    verProduct(idproducto)
                                                }>
                                                {titulonombre}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={3} md={3} lg={3}>
                                <Grid
                                    container
                                    alignItems="center"
                                    spacing={1}>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <Link href="/shop/shopping-cart">
                                            <div className="btnvercarrito">
                                                Ver tu carrito
                                            </div>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <div
                                            className="btncomprarcarrito"
                                            onClick={() =>
                                                continuarCompra()
                                            }>
                                            Comprar carrito
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ViewAddShoppingCart;
