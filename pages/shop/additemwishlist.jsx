import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { getDataWishList } from "../../store/datawishlist/action";
import LoadingSearchResult from "~/components/elements/Loading/LoadingSearchResult";
import ModalMensajesWishList from "../mensajes/ModalMensajesWishList";

function AddItemWishList(props) {
    const {item, setAgregarItemWishList, setPrdExiste} = props;

    //console.log("ITEM WISH : ", item);
    const dispatch = useDispatch();
    const [itemsListWish, setItemsListWish] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    let numberitemswishlist = useSelector(
        (state) => state.wishlist.datawishlist
    );

    useEffect(() => {
        const validaPrdListWish = () => {
            setAgregarItemWishList(false);

            const leerItem = async () => {
                const leerItems = async () => {
                    let params = {
                        idproducto: item.idproducto,
                        usuario: datosusuarios.uid,
                    };

                    await axios({
                        method: "post",
                        url: URL_BD_MR + "57",
                        params,
                    })
                        .then((res) => {
                            if (res.data.listaritemdeseos.length > 0) {
                                setAgregarItemWishList(false);
                                setPrdExiste(true);
                                //console.log(
                                //    "LEER : ",
                                //    res.data.listaritemdeseos[0].idproducto
                                //);
                            } else agregarListaDeseo();
                        })
                        .catch(function (error) {
                            return;
                        });
                };
                leerItems();
            };
            leerItem();
        };
        validaPrdListWish();

        const agregarListaDeseo = () => {
            if (!datosusuarios.uid || datosusuarios.uid == 0) {
                /*
                setShowModalMensajesCtlr(true);
                setTituloMensajesCtlr("Mercado Repuesto");
                let texto = "¡Bienvenido! Para comprar debes ingresar a tu cuenta";
                setTextoMensajesCtlr(texto);
                */
                //setLogin(true);
                return;
            }

            const grabarItem = async () => {
                let params = {
                    idproducto: item.idproducto,
                    compatible: item.compatible,
                    usuario: item.usuario,
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
                                idproducto: item.idproducto,
                                compatible: item.compatible,
                                usuario: item.usuario,
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

                        setAgregarItemWishList(false);

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
                                    //leerItems();
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
                    setItemsListWish(res.data.listaritemdeseos);
                    dispatch(getDataWishList(res.data.listaritemdeseos.length));
                    setRefresh(false);
                })
                .catch(function (error) {
                    console.log("Error leyendo datos lista deseos");
                });
        };
    }, [item, datosusuarios]);
    // view

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(false);
        }, 500);
        return () => clearInterval(interval);
    }, [isLoading]);

    return (
        <div className="ps-page ps-page--inner">
            <ModalMensajesWishList
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            {isLoading ? <LoadingSearchResult /> : null}
        </div>
    );
}

export default AddItemWishList;
