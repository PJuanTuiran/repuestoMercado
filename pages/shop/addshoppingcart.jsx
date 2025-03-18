import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { getDataWishList } from "../../store/datawishlist/action";
import LoadingSearchResult from "~/components/elements/Loading/LoadingSearchResult";

function AddShoppingCart(props) {
    const {data} = props;
    //console.log("DATAXXX : ", data)
    
    const dispatch = useDispatch();
    const [saveItemPrd, setSaveItemPrd] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const numberitemsshoppingcart = useSelector((state) => state.datashoppingcart.datashoppingcart);

    useEffect(() => {
        let continuar = true;
        const leerItemsCarrito = async () => {
            let params = {
                usuario: data.usuario,
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
                        if (res.data.listarcarritocompra.length >= 15){
                            continuar = false;
                            setShowModalMensajes(true);
                            setTituloMensajes("Carrito de compra");
                            let texto = "Puedes agregar maximo 15 productos al carrito de compra";
                            setTextoMensajes(texto);
                            return
                        }else validaPrdShoppingCar();
                    } else {
                        continuar = true;
                        validaPrdShoppingCar()
                    }
                })
                .catch(function (error) {
                    console.log("Error leyendo items carrito de compra");
                });
        };
        leerItemsCarrito();
        
        const validaPrdShoppingCar = () => {
            localStorage.setItem(
                "contrview",
                JSON.stringify(0)
            );
            const leerItem = async () => {
                const leerItems = async () => {
                    let params = {
                        idproducto: data.idproducto,
                        usuario: data.usuario,
                    };
    
                    await axios({
                        method: "post",
                        url: URL_BD_MR + "62",
                        params,
                    })
                        .then((res) => {
                            if (res.data.listaritemcarrito.length > 0) {
                                //console.log("LEER : ", res.data.listaritemcarrito[0].idproducto
                            } else grabarItemCarrito();
                        })
                        .catch(function (error) {
                           
                        });
                };
                leerItems();
            };
            leerItem();
        };

        const grabarItemCarrito = async () => {
            let params = {
                idproducto: data.idproducto,
                compatible: data.compatible,
                usuario: data.usuario,
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
                            idproducto: data.idproducto,
                            compatible: data.compatible,
                            usuario: data.usuario,
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
                            usuario: data.usuario,
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
      
    }, [numberitemsshoppingcart, isLoading, datosusuarios]);
    // view

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(false);
        }, 500);
        return () => clearInterval(interval);
    }, [isLoading]);

    return (
        <div className="ps-page ps-page--inner">
            {isLoading ? <LoadingSearchResult /> : null}
        </div>
    );
}

export default AddShoppingCart;
