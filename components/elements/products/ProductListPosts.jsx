import React, { useState, useEffect } from "react";
import Link from "next/link";
import useProduct from "~/hooks/useProduct";
import { myNumber } from "../../../utilities/ArrayFunctions";
import { Box, Grid, Button } from "@mui/material";

import { getLeeIra } from "../../../store/leeira/action";
import { getCancelCondition } from "../../../store/cancelcondition/action";
import { getDuplicarPrd } from "../../../store/duplicarprd/action";

import { useDispatch, connect, useSelector } from "react-redux";
import MenuPost from "../../partials/shop/modules/MenuPosts";
import MenuPostsActivar from "../../partials/shop/modules/MenuPostsActivar";
import shortid from "shortid";
import Switch from "@mui/material/Switch";

import axios from "axios";
import { useRouter } from "next/router";
import ModalMensajes from "../../../pages/mensajes/ModalMensajes";
import ModalMensajesConfirmarEliminar from "../../../pages/mensajes/ModalMensajesConfirmarEliminar";
import ModalMensajesDuplicarPublicacion from "../../../pages/mensajes/ModalMensajesDuplicarPublicacion";
import Moment from "moment";
//Constantes
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../helpers/Constants";
import SortByPosts from "../../partials/shop/modules/SortByPosts";

const ProductListPosts = ({ product }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { pricesearch, badges } = useProduct();
    const [numeroVisitas, setNumeroVisitas] = useState(0);
    const [visitasProducto, setVisitasProducto] = useState([]);
    const [selectOptions, setSelectOptions] = useState(0);
    const [estadoMyPosts, setEstadoMyPosts] = useState(
        product.estadopublicacion
    );
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [textoEstado, setTextoEstado] = useState("");
    const [calificacionProducto, setCalificacionProducto] = useState([]);

    const [showModalMensajesEliminar, setShowModalMensajesEliminar] =
        useState(false);
    const [continuarEliminar, setContinuarEliminar] = useState(false);
    const [abandonarEliminar, setAbandonarEliminar] = useState(false);

    const [showModalMensajesDuplicar, setShowModalMensajesDuplicar] =
        useState(false);
    const [continuarDuplicar, setContinuarDuplicar] = useState(false);
    const [abandonarDuplicar, setAbandonarDuplicar] = useState(false);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [login, setLogin] = useState(false);
    const [calificacionPrd, setCalificacionPrd] = useState(0);

    const [controlImg, setControlImg] = useState("cajaimageresultpost");
    const [controlImgCaja, setControlImgCaja] = useState(
        "ps-product__thumbnail cajaimagenespost"
    );
    const [cajaImg, setCajaImg] = useState(
        "ps-product__thumbnail cajaimagenespost"
    );
    const [divVertical, setdivVertical] = useState("divverticalpost");

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    //console.log("PRODUCT : ", product.id);
    const menupublication = useSelector(
        (state) => state.menupublication.menupublication
    );

    useEffect(() => {
        const visitasPrd = async () => {
            let params = {
                usuario: datosusuarios.uid,
                idproducto: parseInt(product.id),
            };
            //console.log("VISITAS: ", params);
            await axios({
                method: "post",
                url: URL_BD_MR + "71",
                params,
            })
                .then((res) => {
                    setNumeroVisitas(res.data.tolistmyposts.length);
                    //console.log("VISITAS PRDD: ", res.data.tolistmyposts);
                    setVisitasProducto(res.data);
                })
                .catch(function (error) {
                    return;
                });
        };
        visitasPrd();

        const leerCalificacionProducto = async () => {
            let params = {
                producto: product.id,
            };

            await axios({
                method: "post",
                url: "https://gimcloud.com.co/mrp/api/48",
                params,
            })
                .then((res) => {
                    //console.log("DATA : ", res.data);
                    setCalificacionProducto(res.data.listarcalificacionprd);

                    let totcalificacion = 0;
                    res.data.listarcalificacionprd &&
                        res.data.listarcalificacionprd.map((row, index) => {
                            totcalificacion =
                                parseInt(totcalificacion) +
                                parseInt(row.calificacion);
                        });
                    if (res.data.listarcalificacionprd.length > 0) {
                        let calprd =
                            totcalificacion /
                            res.data.listarcalificacionprd.length;
                        setCalificacionPrd(calprd);
                    } else setCalificacionPrd(0);

                    //let ventas = res.data.listarcalificacionprd.length;
                    //setprdVendidos(ventas);
                })
                .catch(function (error) {
                    console.log("Error leyendo calificación al Producto");
                });
        };
        leerCalificacionProducto();
    }, [product.id]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (login) {
                router.push("/loginaccount");
                setLogin(false);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [login]);

    useEffect(() => {
        if (product.estadopublicacion == 0 || estadoMyPosts == 0) {
            setTextoEstado("Inactiva");
        } else {
            setTextoEstado("Activa");
        }
    }, [product.estadopublicacion, estadoMyPosts]);

    const onClickImagen = () => {
        dispatch(getLeeIra(6));
        localStorage.setItem("ira", JSON.stringify(6));
        localStorage.setItem("rutaira", JSON.stringify(router.pathname));
        localStorage.setItem("activargrilla", JSON.stringify(1));
    };

    const handleChange = (event) => {
        if (event.target.checked) setTextoEstado("Activa");
        else setTextoEstado("Inactiva");
        actualizaPublicacion(0, event.target.checked);
    };

    const actualizaPublicacion = (id, data) => {
        //console.log("EVENT : ", event.target.checked)
        setEstadoMyPosts(data);
        let estadopublicacion = null;

        if (id == 8) {
            estadopublicacion = 11;
            setEstadoMyPosts(11);
        } else if (id == 4) {
            estadopublicacion = 0;
            setEstadoMyPosts(0);
        } else if (id == 6) {
            estadopublicacion = 16;
        } else if (data) estadopublicacion = 11;
        else estadopublicacion = 0;

        const updatePublication = async () => {
            let params = {
                estadopublicacion: estadopublicacion,
                id: product.id,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "77",
                params,
            })
                .then((res) => {
                    if (res.data.type == 1) {
                        if (estadopublicacion == 16) {
                            setShowModalMensajes(true);
                            setTituloMensajes("Actualizar publicación");
                            setTextoMensajes(
                                "Publicación eliminada por el vendedor!"
                            );
                            dispatch(getCancelCondition(1));
                        } else {
                            setShowModalMensajes(true);
                            setTituloMensajes("Actualizar publicación");
                            setTextoMensajes(
                                "Estado de publicación actualizada!"
                            );
                        }
                    } else {
                        setShowModalMensajes(true);
                        setTituloMensajes("Actualizar publicación");
                        setTextoMensajes(
                            "Error, actualizando estado de la publicación!"
                        );
                    }
                })
                .catch(function (error) {
                    setShowModalMensajes(true);
                    setTituloMensajes("Actualizar publicación");
                    setTextoMensajes(
                        "Error, actualizando estado de la publicación!"
                    );
                    return;
                });
        };
        updatePublication();
    };

    useEffect(() => {
        if (selectOptions == 1) {
            localStorage.setItem("accion", JSON.stringify("editar"));
            setShowModalMensajesDuplicar(true);
            setTituloMensajes("Editar publicación");
            setTextoMensajes("¿Estas seguro de querer editar la publicación?");
            setSelectOptions(0);
        } else if (selectOptions == 2) {
            let dato = product.id;
            router.push("/product/" + dato);
            setSelectOptions(0);
        } else if (selectOptions == 3) {
            const visitasPrd = async () => {
                let params = {
                    usuario: datosusuarios.uid,
                    idproducto: parseInt(product.id),
                };
                //console.log("VISITAS: ", params);
                await axios({
                    method: "post",
                    url: URL_BD_MR + "71",
                    params,
                })
                    .then((res) => {
                        //console.log("VISITAS PRDD: ", res.data.tolistmyposts);
                        setVisitasProducto(res.data.tolistmyposts);
                        localStorage.setItem(
                            "visitasproducto",
                            JSON.stringify(res.data.tolistmyposts)
                        );
                        setSelectOptions(0);
                        router.push("publication/viewstats");
                    })
                    .catch(function (error) {
                        return;
                    });
            };
            visitasPrd();
        } else if (selectOptions == 4) {
            actualizaPublicacion(4, false);
            //AQUI
            setSelectOptions(0);
        } else if (selectOptions == 5) {
            localStorage.setItem("accion", JSON.stringify("duplicar"));
            setShowModalMensajesDuplicar(true);
            setTituloMensajes("Duplicar publicación");
            setTextoMensajes(
                "¿Estas seguro de querer duplicar la publicación?"
            );
            setSelectOptions(0);
        } else if (selectOptions == 6) {
            confirmarBorrarPublicacion(selectOptions, false);
            setSelectOptions(0);
        } else if (selectOptions == 8) {
            actualizaPublicacion(8, false);
            setSelectOptions(0);
        }
    }, [selectOptions]);

    const confirmarBorrarPublicacion = (item, estado) => {
        setShowModalMensajesEliminar(true);
        setTituloMensajes("Actualizar publicación");
        setTextoMensajes("¿Estas seguro de querer eliminar la publicación?");
        //continuarRegistro, setContinuarRegistro
    };

    useEffect(() => {
        if (continuarEliminar) {
            actualizaPublicacion(6, false);
        }
    }, [continuarEliminar]);

    useEffect(() => {
        if (continuarDuplicar && product.productogenerico == "No") {
            dispatch(getDuplicarPrd(0));
            let datprd = [];
            let vehprd = [];
            let idprd = shortid();

            const readPrdByID = async () => {
                let params = {
                    idarticulo: parseInt(product.id),
                };
                //console.log("VISITAS: ", params);
                await axios({
                    method: "post",
                    url: URL_BD_MR + "78",
                    params,
                })
                    .then((res) => {
                        datprd = res.data.listapublicacion[0];
                        //console.log("PRD DUPLICAR: ", datprd);
                        if (res.data.type == 1) {
                            const duplicarPrd = async () => {
                                let params = {
                                    alto: datprd.alto,
                                    ancho: datprd.ancho,
                                    anno: datprd.anno,
                                    carroceria: datprd.carroceria,
                                    cilindrajemotor: datprd.cilindrajemotor,
                                    ciudad: datprd.ciudad,
                                    compatible: idprd,
                                    condicion: datprd.condicion,
                                    descripcionproducto:
                                        datprd.descripcionproducto,
                                    descuento: datprd.descuento,
                                    estado: datprd.estado,
                                    estadoproducto: datprd.estadoproducto,
                                    fechacreacion: datprd.fechacreacion,
                                    funcionalidad: datprd.funcionalidad,
                                    id: datprd.id,
                                    idproductovehiculo: idprd,
                                    largo: datprd.largo,
                                    marca: datprd.marca,
                                    marcarepuesto: datprd.marcarepuesto,
                                    modelo: datprd.modelo,
                                    moneda: datprd.moneda,
                                    nombreimagen1: datprd.nombreimagen1,
                                    nombreimagen2: datprd.nombreimagen2,
                                    nombreimagen3: datprd.nombreimagen3,
                                    nombreimagen4: datprd.nombreimagen4,
                                    nombreimagen5: datprd.nombreimagen5,
                                    nombreimagen6: datprd.nombreimagen6,
                                    nombreimagen7: datprd.nombreimagen7,
                                    nombreimagen8: datprd.nombreimagen8,
                                    nombreimagen9: datprd.nombreimagen9,
                                    nombreimagen10: datprd.nombreimagen10,
                                    numerodeimagenes: datprd.numerodeimagenes,
                                    numerodeparte: datprd.numerodeparte,
                                    numerodeunidades: datprd.numerodeunidades,
                                    partedelvehiculo: datprd.partedelvehiculo,
                                    peso: datprd.peso,
                                    posicionproducto: datprd.posicionproducto,
                                    precio: datprd.precio,
                                    productogenerico: datprd.productogenerico,
                                    tipocombustible: datprd.tipocombustible,
                                    tipotraccion: datprd.tipotraccion,
                                    tipovehiculo: datprd.tipovehiculo,
                                    titulonombre: datprd.titulonombre,
                                    transmision: datprd.transmision,
                                    turbocompresor: datprd.turbocompresor,
                                    usuario: datprd.usuario,
                                    vendeporpartes: datprd.vendeporpartes,
                                    nombre_dep: datprd.nombre_dep,
                                    nombreciudad: datprd.nombreciudad,
                                };
                                localStorage.setItem(
                                    "duplicarprd",
                                    JSON.stringify(params)
                                );
                                dispatch(getDuplicarPrd(1));
                            };
                            duplicarPrd();
                        }

                        const readPrdCompatibles = async () => {
                            let params = {
                                idproducto:
                                    '"' + datprd.idproductovehiculo + '"',
                            };
                            //console.log("PARAMS: ", datprd.idproductovehiculo);
                            //return
                            await axios({
                                method: "post",
                                url: URL_BD_MR + "45",
                                params,
                            })
                                .then((res) => {
                                    vehprd = res.data.vehiculoscomp;
                                    //console.log("VEH COMP PRD: ", vehprd);
                                    //return
                                    if (res.data.type == 1) {
                                        let itemveh = [];
                                        const addVehCompatibles = async () => {
                                            vehprd &&
                                                vehprd.map((items) => {
                                                    let comparar =
                                                        items.tipovehiculo +
                                                        "" +
                                                        items.carroceria +
                                                        "" +
                                                        items.id_marca +
                                                        "" +
                                                        items.anno +
                                                        "" +
                                                        items.modelo +
                                                        "" +
                                                        items.id_cilindraje +
                                                        "" +
                                                        items.transmision +
                                                        "" +
                                                        items.combustible +
                                                        "" +
                                                        items.traccion;

                                                    let selectTransmision = "";

                                                    if (
                                                        items.transmision == 1
                                                    ) {
                                                        selectTransmision =
                                                            "Automática";
                                                    } else if (
                                                        items.transmision == 2
                                                    ) {
                                                        selectTransmision =
                                                            "Manual";
                                                    } else {
                                                        selectTransmision = "";
                                                    }

                                                    let selectCombustible = "";
                                                    if (
                                                        items.combustible == 1
                                                    ) {
                                                        selectCombustible =
                                                            "Gasolina";
                                                    } else if (
                                                        items.combustible == 2
                                                    ) {
                                                        selectCombustible =
                                                            "Diesel";
                                                    } else if (
                                                        items.combustible == 3
                                                    ) {
                                                        selectCombustible =
                                                            "Gasolina - Gas";
                                                    } else if (
                                                        items.combustible == 4
                                                    ) {
                                                        selectCombustible =
                                                            "Gasolina – Eléctrico";
                                                    } else {
                                                        selectCombustible = "";
                                                    }

                                                    let selectTraccion = "";
                                                    if (items.traccion == 1) {
                                                        selectTraccion =
                                                            "Tracción Delantera";
                                                    } else if (
                                                        items.traccion == 2
                                                    ) {
                                                        selectTraccion =
                                                            "Tracción Trasera";
                                                    } else if (
                                                        items.traccion == 3
                                                    ) {
                                                        selectTraccion =
                                                            "Tracción 4x4";
                                                    } else if (
                                                        items.traccion == 4
                                                    ) {
                                                        selectTraccion = "";
                                                    }

                                                    let params = {
                                                        idprd: datprd.id,
                                                        anno: items.anno,
                                                        carroceria:
                                                            items.carroceria,
                                                        cilindraje:
                                                            items.id_cilindraje,
                                                        combustible:
                                                            items.combustible,
                                                        comparar: comparar,
                                                        estado: 1,
                                                        fecha: fechaactual,
                                                        id: items.id,
                                                        idtipoproducto:
                                                            items.tipovehiculo,
                                                        compatible:
                                                            items.compatible,
                                                        idproducto:
                                                            items.idproducto,
                                                        idproductovehiculo:
                                                            items.idproductovehiculo,
                                                        marca: items.id_marca,
                                                        modelo: items.id_modelos,
                                                        selectanno:
                                                            items.anovehiculo,
                                                        selectcarroceria:
                                                            items.nombrecarroceria,
                                                        selectcilindraje:
                                                            items.cilindraje,
                                                        selectcombustible:
                                                            selectCombustible,
                                                        selectmarca:
                                                            items.marca,
                                                        selectmodelo:
                                                            items.modelos,
                                                        selecttipo:
                                                            items.nombretipoveh,
                                                        selecttraccion:
                                                            selectTraccion,
                                                        selecttransmision:
                                                            selectTransmision,
                                                        tipovehiculo:
                                                            items.tipovehiculo,
                                                        traccion:
                                                            items.traccion,
                                                        transmision:
                                                            items.transmision,
                                                    };
                                                    itemveh.push(params);
                                                });
                                            localStorage.setItem(
                                                "vehproductos",
                                                JSON.stringify(itemveh)
                                            );
                                            localStorage.setItem(
                                                "vehproductosctrl",
                                                JSON.stringify(itemveh)
                                            );
                                            dispatch(getDuplicarPrd(2));
                                            setContinuarDuplicar(false);
                                            //router.push("/CreateProduct");
                                            router.push({
                                                pathname: "/CreateProduct",
                                                query: {
                                                    editarprd:
                                                        JSON.stringify(1),
                                                    itemeditar:
                                                        JSON.stringify(2),
                                                },
                                            });
                                        };
                                        addVehCompatibles();
                                    }
                                })
                                .catch(function (error) {
                                    return;
                                });
                        };
                        readPrdCompatibles();
                    })
                    .catch(function (error) {
                        return;
                    });
            };
            readPrdByID();
            setContinuarDuplicar(false);
        } else if (continuarDuplicar && product.productogenerico == "Si") {
            dispatch(getDuplicarPrd(0));
            let datprd = [];
            let vehprd = [];
            let idprd = shortid();

            const readPrdByID = async () => {
                let params = {
                    idarticulo: parseInt(product.id),
                };
                //console.log("VISITAS: ", params);
                await axios({
                    method: "post",
                    url: URL_BD_MR + "78",
                    params,
                })
                    .then((res) => {
                        datprd = res.data.listapublicacion[0];
                        //console.log("PRD DUPLICAR: ", datprd);
                        if (res.data.type == 1) {
                            const duplicarPrd = async () => {
                                let params = {
                                    alto: datprd.alto,
                                    ancho: datprd.ancho,
                                    anno: datprd.anno,
                                    carroceria: datprd.carroceria,
                                    cilindrajemotor: datprd.cilindrajemotor,
                                    ciudad: datprd.ciudad,
                                    compatible: idprd,
                                    condicion: datprd.condicion,
                                    descripcionproducto:
                                        datprd.descripcionproducto,
                                    descuento: datprd.descuento,
                                    estado: datprd.estado,
                                    estadoproducto: datprd.estadoproducto,
                                    fechacreacion: datprd.fechacreacion,
                                    funcionalidad: datprd.funcionalidad,
                                    id: datprd.id,
                                    idproductovehiculo: idprd,
                                    largo: datprd.largo,
                                    marca: datprd.marca,
                                    marcarepuesto: datprd.marcarepuesto,
                                    modelo: datprd.modelo,
                                    moneda: datprd.moneda,
                                    nombreimagen1: datprd.nombreimagen1,
                                    nombreimagen2: datprd.nombreimagen2,
                                    nombreimagen3: datprd.nombreimagen3,
                                    nombreimagen4: datprd.nombreimagen4,
                                    nombreimagen5: datprd.nombreimagen5,
                                    nombreimagen6: datprd.nombreimagen6,
                                    nombreimagen7: datprd.nombreimagen7,
                                    nombreimagen8: datprd.nombreimagen8,
                                    nombreimagen9: datprd.nombreimagen9,
                                    nombreimagen10: datprd.nombreimagen10,
                                    numerodeimagenes: datprd.numerodeimagenes,
                                    numerodeparte: datprd.numerodeparte,
                                    numerodeunidades: datprd.numerodeunidades,
                                    partedelvehiculo: datprd.partedelvehiculo,
                                    peso: datprd.peso,
                                    posicionproducto: datprd.posicionproducto,
                                    precio: datprd.precio,
                                    productogenerico: datprd.productogenerico,
                                    tipocombustible: datprd.tipocombustible,
                                    tipotraccion: datprd.tipotraccion,
                                    tipovehiculo: datprd.tipovehiculo,
                                    titulonombre: datprd.titulonombre,
                                    transmision: datprd.transmision,
                                    turbocompresor: datprd.turbocompresor,
                                    usuario: datprd.usuario,
                                    vendeporpartes: datprd.vendeporpartes,
                                    nombre_dep: datprd.nombre_dep,
                                    nombreciudad: datprd.nombreciudad,
                                };
                                localStorage.setItem(
                                    "duplicarprd",
                                    JSON.stringify(params)
                                );
                                dispatch(getDuplicarPrd(1));
                                setContinuarDuplicar(false);
                                router.push("/CreateProduct");
                            };
                            duplicarPrd();
                        }
                    })
                    .catch(function (error) {
                        return;
                    });
            };
            readPrdByID();
            setContinuarDuplicar(false);
        }
    }, [continuarDuplicar]);

    //closemenu

    useEffect(() => {
        if (menupublication == 1) {
            setControlImg("cajaimageresultpost disableicon");
            setControlImgCaja(
                "ps-product__thumbnail cajaimagenespost disableicon"
            );
            setCajaImg("ps-product__thumbnail cajaimagenespostoutdisable");
            setdivVertical("divverticalpostdisable");
        } else {
            setControlImg("cajaimageresultpost");
            setControlImgCaja("ps-product__thumbnail cajaimagenespost");
            setCajaImg("ps-product__thumbnail cajaimagenespostout");
            setdivVertical("divverticalpost");
        }
    }, [menupublication]);

    return (
        <div className={cajaImg}>
            <ModalMensajes
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
            <ModalMensajesDuplicarPublicacion
                shown={showModalMensajesDuplicar}
                setShowModalMensajesDuplicar={setShowModalMensajesDuplicar}
                setContinuarDuplicar={setContinuarDuplicar}
                setAbandonarDuplicar={setAbandonarDuplicar}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <Grid container spacing={1}>
                <Grid item xs={9} md={9} lg={9}>
                    {estadoMyPosts == 0 ? (
                        <div className="deshabilitar">
                            <Grid container spacing={1}>
                                <Grid item xs={3} md={3} lg={3}>
                                    <div
                                        className={controlImgCaja}
                                        onClick={() => onClickImagen()}>
                                        <a
                                            href={`/product/${product.id}`}
                                            as={`/product/${product.id}`}>
                                            <img
                                                className={controlImg}
                                                src={
                                                    URL_IMAGES_RESULTS +
                                                    product.images[0].name
                                                }
                                                alt="First slide"
                                            />
                                            {badges(product)}
                                        </a>
                                    </div>
                                </Grid>
                                <Grid item xs={7} md={7} lg={7}>
                                    <div className="cajadatosprdgripposts">
                                        <div
                                            className="namegriplistresult"
                                            onClick={() => onClickImagen()}>
                                            <Link
                                                href="/product/[id]"
                                                as={`/product/${product.id}`}>
                                                <div className="colorbase textoposts">
                                                    {product.name}
                                                </div>
                                            </Link>
                                        </div>
                                        <ul className="ps-product__short-desc">
                                            <li className="mt-6">
                                                Id Publicación:{" "}
                                                {product.compatible}
                                            </li>

                                            <li className="mt-6">
                                                Unidades disponibles :{" "}
                                                {product.numerounidades}
                                            </li>
                                        </ul>
                                    </div>
                                </Grid>

                                <Grid item xs={2} md={2} lg={2}>
                                    <div className="formatopreciogripcuatro">
                                        $ {myNumber(1, product.price, 2)}
                                    </div>
                                    <div className="ml-2 colorbase">
                                        <a>{textoEstado}</a>
                                        <Switch
                                            checked={estadoMyPosts}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    ) : (
                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={3} md={3} lg={3}>
                                    <div
                                        className={controlImgCaja}
                                        onClick={() => onClickImagen()}>
                                        <a
                                            href={`/product/${product.id}`}
                                            as={`/product/${product.id}`}>
                                            <img
                                                className={controlImg}
                                                src={
                                                    URL_IMAGES_RESULTS +
                                                    product.images[0].name
                                                }
                                                alt="First slide"
                                            />
                                            {badges(product)}
                                        </a>
                                    </div>
                                </Grid>
                                <Grid item xs={7} md={7} lg={7}>
                                    <div className="cajadatosprdgripposts">
                                        <div
                                            className="namegriplistresult"
                                            onClick={() => onClickImagen()}>
                                            <Link
                                                href="/product/[id]"
                                                as={`/product/${product.id}`}>
                                                <div className="colorbase textoposts">
                                                    {product.name}
                                                </div>
                                            </Link>
                                        </div>
                                        <ul className="ps-product__short-desc">
                                            <li className="mt-6">
                                                Id Publicación:{" "}
                                                {product.compatible}
                                            </li>

                                            <li className="mt-6">
                                                Unidades disponibles :{" "}
                                                {product.numerounidades}
                                            </li>
                                        </ul>
                                        <Grid
                                            container
                                            spacing={1}
                                            className="mlmenos20">
                                            <Grid item xs={12} md={6} lg={6}>
                                                {calificacionPrd > 0 ? (
                                                    <Grid container spacing={1}>
                                                        <Grid
                                                            item
                                                            xs={2}
                                                            md={2}
                                                            lg={2}>
                                                            <div>
                                                                {
                                                                    //calificacionPrd
                                                                }
                                                            </div>
                                                        </Grid>

                                                        <Grid
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            lg={1}>
                                                            {calificacionPrd >
                                                                0 ? (
                                                                <i className="calificacionprdtotal2 fa fa-cog"></i>
                                                            ) : (
                                                                <i className="calificacionprdtotal1 fa fa-cog"></i>
                                                            )}
                                                        </Grid>
                                                        <Grid
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            lg={1}>
                                                            <div className="ml-10">
                                                                {calificacionPrd >
                                                                    1 ? (
                                                                    <i className="calificacionprdtotal2 fa fa-cog"></i>
                                                                ) : (
                                                                    <i className="calificacionprdtotal1 fa fa-cog"></i>
                                                                )}
                                                            </div>
                                                        </Grid>
                                                        <Grid
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            lg={1}>
                                                            <div className="ml-20">
                                                                {calificacionPrd >
                                                                    2 ? (
                                                                    <i className="calificacionprdtotal2 fa fa-cog"></i>
                                                                ) : (
                                                                    <i className="calificacionprdtotal1 fa fa-cog"></i>
                                                                )}
                                                            </div>
                                                        </Grid>
                                                        <Grid
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            lg={1}>
                                                            <div className="ml-30">
                                                                {calificacionPrd >
                                                                    3 ? (
                                                                    <i className="calificacionprdtotal2 fa fa-cog"></i>
                                                                ) : (
                                                                    <i className="calificacionprdtotal1 fa fa-cog"></i>
                                                                )}
                                                            </div>
                                                        </Grid>
                                                        <Grid
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            lg={1}>
                                                            <div className="ml-40">
                                                                {calificacionPrd >
                                                                    4 ? (
                                                                    <i className="calificacionprdtotal2 fa fa-cog"></i>
                                                                ) : (
                                                                    <i className="calificacionprdtotal1 fa fa-cog"></i>
                                                                )}
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                ) : null}
                                            </Grid>
                                            <Grid item xs={2} md={2} lg={2}>
                                                <div
                                                    className="subrayartextocalificacion"
                                                    onClick={() =>
                                                        router.push({
                                                            pathname:
                                                                "/MisVentas/calificacionProducto",
                                                            query: {
                                                                product:
                                                                    JSON.stringify(
                                                                        product.id
                                                                    ),
                                                                imagen: product
                                                                    .images[0]
                                                                    .name,
                                                                titulo: product.name,
                                                            },
                                                        })
                                                    }>
                                                    {calificacionPrd > 0 ? (
                                                        <div>Ver opiniones</div>
                                                    ) : null}
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid item xs={2} md={2} lg={2}>
                                    <div className="formatopreciogripcuatro">
                                        $ {myNumber(1, product.price, 2)}
                                    </div>
                                    <div className="ml-2 colorbase">
                                        <a>{textoEstado}</a>
                                        <Switch
                                            checked={estadoMyPosts}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </Grid>

                <Grid item xs={3} md={3} lg={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12} lg={12}>
                            <div className="cajamypostestadisticas">
                                <div className="ml-20">
                                    <Grid container spacing={1}>
                                        <Grid item xs={1} md={1} lg={1}>
                                            <div className={divVertical}></div>
                                        </Grid>
                                        <Grid item xs={1} md={1} lg={1}>
                                            <div className="ubicarmenupost">
                                                {estadoMyPosts != 0 ? (
                                                    <MenuPost
                                                        selectOptions={
                                                            selectOptions
                                                        }
                                                        setSelectOptions={
                                                            setSelectOptions
                                                        }
                                                        estadoMyPosts={
                                                            estadoMyPosts
                                                        }
                                                    />
                                                ) : (
                                                    <MenuPostsActivar
                                                        selectOptions={
                                                            selectOptions
                                                        }
                                                        setSelectOptions={
                                                            setSelectOptions
                                                        }
                                                        estadoMyPosts={
                                                            estadoMyPosts
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </Grid>

                                        <Grid item xs={8} md={8} lg={8}>
                                            <Grid container spacing={1}>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={12}
                                                    lg={12}>
                                                    <div className="textopublicaciones pt-25">
                                                        Visitas de la
                                                        publicación:{" "}
                                                        {numeroVisitas}
                                                    </div>
                                                </Grid>

                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={12}
                                                    lg={12}>
                                                    <div className="textopublicaciones">
                                                        Cantidad vendida : 10{" "}
                                                    </div>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={12}
                                                    lg={12}>
                                                    <div className="textopublicaciones">
                                                        {estadoMyPosts == 0 ? (
                                                            <div>
                                                                Publicación esta
                                                                Inactiva
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                Publicación esta
                                                                Activa
                                                            </div>
                                                        )}
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default ProductListPosts;

/*
  <Grid container spacing={1}>
                    <Grid>
                        <h1>PRUEBA</h1>
                    </Grid>
                </Grid>
*/
