import React, { useEffect, useState, useRef } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import { useRouter } from "next/router";
import { Box, Grid, Button, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { myNumber } from "../../utilities/ArrayFunctions";
import moment from "moment";
import "moment/locale/es";
import { getItemComprar } from "../../store/itemcomprar/action";
import { getSelectedAddress } from "../../store/selectedaddress/action";
import { getViewCheckout } from "../../store/viewcheckout/action";
import { getSelectViewPrd } from "../../store/selectviewprd/action";
import ModalMensajes from "../mensajes/ModalMensajes";
import CalcularEnvio from "./calcularenvio";
import { set } from "lodash";

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
        text: "Pagar",
    },
];

let undsel = [];

const CheckoutScreen = () => {
    const router = useRouter();
    const irA = useRef(null);
    const dispatch = useDispatch();
    const [direccionesUsuarios, setDireccionesUsuarios] = useState([]);
    const [prdComprarAhora, setPrdComprarAhora] = useState([]);
    const [itemCompra, setItemCompra] = useState([]);

    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [codigoCiudadDian, setCodigoCiudadDian] = useState("");
    const [codigoCiudadVendedor, setCodigoCiudadVendedor] = useState("");
    const [codigoCiudadDespacho, setCodigoCiudadDespacho] = useState("");

    const [datosCiudades, setDatosCiudades] = useState("");

    const [departamento, setDepartamento] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [unidadesSelect, setUnidadesSelect] = useState(0);
    const [classUnd, setClassUnd] = useState("btnunidselshoppingcartmenos");
    const [classUndMas, setClassUndMas] = useState("btnunidselshoppingcart");
    const [valorEnvio, setvalorEnvio] = useState(0);
    const [totalPagar, setTotalPagar] = useState(0);
    const fechaactual = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [consultarValorEnvio, setConsultarValorEnvio] = useState(false);

    let selectedaddress = [];
    selectedaddress = useSelector(
        (state) => state.selectedaddress.selectedaddress
    );

    let viewSearch = useSelector((state) => state.viewsearch.viewsearch);

    useEffect(() => {
        if (viewSearch) {
            dispatch(getViewCheckout(true));
        }
    }, [viewSearch])

    let now = moment();
    let masdias = "48:00:00";
    now.add(moment.duration(masdias));
    //console.log(now.format("[Se entrega el dia] dddd, DD [de] MMMM [de] YYYY"));
    let fechaentrega = now.format(
        "[Se entrega el dia] dddd, DD [de] MMMM [de] YYYY"
    );
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    // Asignamos Datos al arreglo de Usuarios desde el state
    const leeira = useSelector((state) => state.leeira.ira);

    useEffect(() => {
        let datitem = JSON.parse(localStorage.getItem("itemcompra"));
        //alert("IDPRD")
        //alert(datitem[0].idproducto)
        dispatch(getSelectViewPrd(datitem[0].idproducto));
    }, [])

    useEffect(() => {
        let datauser = JSON.parse(localStorage.getItem("datauser"));

        let direccionenvio = JSON.parse(localStorage.getItem("direccionenvio"));
        localStorage.setItem("ctrview", JSON.stringify(true));

        if (direccionenvio) {
            setCodigoCiudadDian(direccionenvio.codigo_ciu);
            setCodigoCiudadDespacho(direccionenvio);
        }

        let datitem = JSON.parse(localStorage.getItem("itemcompra"));
        //console.log("ITEM COMPRA: ", datitem);
        //alert("ITEM COMPRA")
        //alert(datitem[0].idproducto);
        dispatch(getSelectViewPrd(datitem[0].idproducto));

        let dat = {
            cantidad: 1,
            compatible: datitem[0].compatible,
            fechacreacion: fechaactual,
            id: datitem[0].id,
            idproducto: datitem[0].idproducto,
            nombreimagen1: datitem[0].nombreimagen1,
            numerodeunidades: datitem[0].numerodeunidades,
            precio: datitem[0].precio,
            titulonombre: datitem[0].titulonombre,
            usuario: datauser.uid,
            email: datauser.email,
            emailvendedor: datitem[0].emailvendedor
        };
        let item = [];
        item.push(dat);
        localStorage.setItem("itemcompra", JSON.stringify(item));
        localStorage.setItem("itemcompraall", JSON.stringify(item));
        datitem = item;
        //console.log("ITEM COMPRA: ", datitem);

        let undselcompraahora = JSON.parse(
            localStorage.getItem("undselcompraahora")
        );
        setUnidadesSelect(undselcompraahora);

        //"undselcompraahora"
        //console.log("DAITEM : ", datitem);
        if (leeira != 3) setItemCompra(datitem[0]);

        let totalpagar = undselcompraahora * datitem[0].precio + valorEnvio;

        //console.log("DAT XXXX : ", totalpagar);
        setTotalPagar(totalpagar);

        const leerItems = async () => {
            let datauser = JSON.parse(localStorage.getItem("datauser"));

            let params = {
                usuario: datauser.uid,
            };

            //console.log("PARAMS : ", params)

            await axios({
                method: "post",
                url: URL_BD_MR + "281",
                params,
            })
                .then((res) => {
                    console.log("DIRECCION : ", res.data.listardireccionesusuario);

                    if (selectedaddress.length == 0) {
                        setDireccionesUsuarios(
                            res.data.listardireccionesusuario[0]
                        );
                        localStorage.setItem(
                            "direccionusuario",
                            JSON.stringify(res.data.listardireccionesusuario[0])
                        );

                        setDireccion(
                            res.data.listardireccionesusuario[0].direccion
                        );
                        dispatch(
                            getSelectedAddress(
                                res.data.listardireccionesusuario[0]
                            )
                        );
                        setCiudad(res.data.listardireccionesusuario[0].nombreciudad);

                        setCodigoCiudadDian(res.data.listardireccionesusuario[0].codigo_ciu);
                        setDepartamento(res.data.listardireccionesusuario[0].nombre_dep);
                    }
                })
                .catch(function (error) {
                    console.log("Error leyendo direcciones");
                });
        };
        leerItems();
    }, [datosusuarios, valorEnvio]);

    useEffect(() => {
        const leerCiudades = async () => {

            await axios({
                method: "post",
                url: URL_BD_MR + "166"
            })
                .then((res) => {
                    if (res.data.type == 1) {
                        setDatosCiudades(res.data.ciudades);
                        console.log("DATOS CIEUDAD: ", res.data.ciudades)
                    } else console.log("ERROR Leyendo Ciudades");
                })
                .catch(function (error) { });
        };
        leerCiudades();

        if (selectedaddress.length > 0) {
            setDireccionesUsuarios(selectedaddress[0]);
            localStorage.setItem(
                "direccionusuario",
                JSON.stringify(selectedaddress[0])
            );

            setDireccion(selectedaddress[0].direccion);
            //dispatch(getSelectedAddress(selectedaddress[0]));
            setCiudad(selectedaddress[0].nombreciudad);
            setDepartamento(selectedaddress[0].nombre_dep);
            //console.log("DIRECCIONES : ", selectedaddress);
        }
    }, [selectedaddress]);

    useEffect(() => {
        let ciudadvendedor = 0;
        let codigociudaddian = codigoCiudadDian + "000";
        if (prdComprarAhora.length > 0 && codigociudaddian && codigociudaddian > 0)
            prdComprarAhora &&
                prdComprarAhora.map((item, index) => {
                    if (item.idproducto == itemCompra.idproducto) {
                        //console.log("ITEM COMPRA : ", item)

                        const leerDataUser = async () => {
                            let params = {
                                usuario: item.uidvendedor
                            };

                            await axios({
                                method: "post",
                                url: URL_BD_MR + "13",
                                params,
                            })
                                .then((res) => {
                                    console.log("DATOS USER : ", res.data[0].ciudad);
                                    ciudadvendedor = res.data[0].ciudad + '000';
                                    setCodigoCiudadVendedor(ciudadvendedor)
                                    //setEmailComprador(res.data[0].email);
                                    let requestData = {
                                        "poblacionesorigen": [
                                            ciudadvendedor
                                        ],
                                        "poblacionesdestino": [
                                            codigociudaddian
                                        ],
                                        "idunidadnegocio": "2",
                                        "registros": 1000
                                    }

                                    console.log("requestData : ", requestData);

                                    const config = {
                                        headers: {
                                            "Authorization": "$2y$10$hc8dShHM0E71/08Tcjq3nOdq.hCmOcn5mEH5a/UZ9Lk0eBptD8CeG",
                                            "Content-Type": "application/json" || x < z
                                        }
                                    };

                                    const getRequest = async () => {
                                        try {
                                            const response = await axios.post("https://gimcloud.com.co/api/endpoint/10001", requestData, config);

                                            console.log("response.data : ", response.data);

                                            setvalorEnvio(6900);
                                            if (response.data.tarifas.length > 0) {
                                                let long = response.data.tarifas.length - 1;
                                                //console.log("CALCULAR ENVIO : ", response.data.tarifas);
                                                setvalorEnvio(response.data.tarifas[long].kilo1);
                                            }
                                        } catch (error) {
                                            console.error('Errorxx:', error);
                                        }
                                    }
                                    getRequest();

                                })
                                .catch(function (error) {
                                    console.log("Error leyendo datos usuario");
                                });
                        };
                        leerDataUser();
                    }
                });
    }, [ciudad, codigoCiudadDian, prdComprarAhora]);

    useEffect(() => {
        const leerItems = async () => {
            let ira = localStorage.getItem("ira")

            if (ira == 3) {
                let datitem = JSON.parse(
                    localStorage.getItem("itemshoppingcartadd")
                );

                //console.log("datitem XXXX: ", datitem)

                const leerItems = async () => {
                    let datauser = JSON.parse(localStorage.getItem("datauser"));

                    let params = {
                        idproducto: datitem.idproducto,
                        usuario: datauser.uid,
                    };

                    //console.log("datosusuariosXXX: ", datosusuarios)
                    //console.log("PARAMS XXXX: ", params)

                    await axios({
                        method: "post",
                        url: URL_BD_MR + "62",
                        params,
                    })
                        .then((res) => {
                            //console.log("DATAS RETORN: ", res.data)
                            if (res.data.listaritemcarrito.length > 0) {
                                setPrdComprarAhora(res.data.listaritemcarrito);
                                setItemCompra(res.data.listaritemcarrito[0]);
                            } else {
                                console.log("ERROR");
                                let datitemall = JSON.parse(localStorage.getItem("itemcompraall"));
                                //console.log("DATAS STORAGE: ", datitemall)
                                setPrdComprarAhora(datitemall);
                                setItemCompra(datitemall[0]);
                            }
                        })
                        .catch(function (error) { });
                };
                leerItems();
            } else {
                let datauser = JSON.parse(localStorage.getItem("datauser"));
                let params = {
                    usuario: datauser.uid,
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR + "59",
                    params,
                })
                    .then((res) => {
                        setPrdComprarAhora(res.data.listarcarritocompra);
                        res.data.listarcarritocompra &&
                            res.data.listarcarritocompra.map((item, index) => {
                                undsel[index] = item.cantidad;
                            });
                        //ispatch(getDataShoppingCart(res.data.listarcarritocompra.length));
                    })
                    .catch(function (error) {
                        console.log("Error leyendo datos carrito de compras");
                    });
            }
        };
        leerItems();
    }, [datosusuarios]);

    const tusDirecciones = (dat) => {
        let ruta = "/shop/youraddresses/";
        router.push(ruta);
    };

    const infoSiguiente = (dat) => {

        let direccionenvio = JSON.parse(localStorage.getItem("direccionenvio"));
        let datitem = JSON.parse(localStorage.getItem("itemcompra"));
        let datitemall = JSON.parse(localStorage.getItem("itemcompraall"));

        if (!direccion) {
            setShowModalMensajes(true);
            setTituloMensajes("Direcciones usuarios");
            setTextoMensajes(
                "Debes seleccionar o agregar una dirección de envio!"
            );
            return;
        }

        let arrayuno = [];
        let arraydos = [];

        datitem &&
            datitem.map((item, index) => {

                let row = {
                    cantidad: item.cantidad,
                    compatible: item.compatible,
                    email: item.email,
                    emailvendedor: item.emailvendedor,
                    fechacreacion: item.fechacreacion,
                    id: item.id,
                    idproducto: item.idproducto,
                    nombreimagen1: item.nombreimagen1,
                    numerodeunidades: item.numerodeunidades,
                    precio: item.precio,
                    titulonombre: item.titulonombre,
                    usuario: item.usuario,
                    precioenvio: valorEnvio
                }

                arrayuno.push(row);
            });

        datitemall &&
            datitemall.map((item, index) => {
                let row = {
                    cantidad: item.cantidad,
                    compatible: item.compatible,
                    email: item.email,
                    emailvendedor: item.emailvendedor,
                    fechacreacion: item.fechacreacion,
                    id: item.id,
                    idproducto: item.idproducto,
                    nombreimagen1: item.nombreimagen1,
                    numerodeunidades: item.numerodeunidades,
                    precio: item.precio,
                    titulonombre: item.titulonombre,
                    usuario: item.usuario,
                    precioenvio: valorEnvio
                }
                arraydos.push(row);
            });

        localStorage.setItem("itemcompra", JSON.stringify(arrayuno));
        localStorage.setItem("itemcompraall", JSON.stringify(arraydos));

        if (direccionenvio.length == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Direcciones usuarios");
            setTextoMensajes(
                "Debes seleccionar o agregar una dirección de envio!"
            );
            return;
        }
        localStorage.setItem("totalapagar", JSON.stringify(totalPagar));
        //let ruta = "/shop/payment/";

        dispatch(getItemComprar(false));

        router.push({
            pathname: "/shop/payment/",
            query: {
                direccion: JSON.stringify(direccion),
            },
        });

        //router.push(ruta);
    };

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    const openCalcularEnvio = (data) => {
        setConsultarValorEnvio(true)
        //console.log("DATAWOXXX : ", data)
        //setDataCostoWO(data)
        //setEditInvoice(true);
    }

    const handleClose = () => {
        setConsultarValorEnvio(false);
    };

    /*
    if (history.go(-1)) {
        alert("RETROCESO")
    }
        */

    return (
        <Container title="Checkout">
            <div className="ps-page ps-page--shopping" ref={irA}>
                <Modal open={consultarValorEnvio} >
                    <CalcularEnvio
                        setConsultarValorEnvio={setConsultarValorEnvio}
                        setvalorEnvio={setvalorEnvio}
                        valorEnvio={valorEnvio}
                        codigoCiudadVendedor={codigoCiudadVendedor}
                        setCodigoCiudadDespacho={setCodigoCiudadDespacho}
                        codigoCiudadDespacho={codigoCiudadDespacho}
                        datosCiudades={datosCiudades}
                        handleClose={handleClose}
                    />
                </Modal>
                <ModalMensajes
                    shown={showModalMensajes}
                    close={setShowModalMensajes}
                    titulo={tituloMensajes}
                    mensaje={textoMensajes}
                    tipo="1"
                />
                <div className="container">
                    <div className="ml-52">
                        <BreadCrumb breacrumb={breadcrumb} />
                    </div>

                    <div className="cajacheckout">
                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={7} lg={7}>
                                    <div className="titulodireccionenvio">
                                        Dirección de envío
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={5} lg={5}>
                                    <div className="titulodireccionenviotres">
                                        Tu producto
                                    </div>
                                </Grid>
                            </Grid>
                        </div>

                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className="cajadireccionenvio">
                                                <Grid container spacing={1}>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={1}
                                                        lg={1}>
                                                        <div className="iconlocatecinco">
                                                            <LocationOnIcon
                                                                className="locationoniconaddress"
                                                                style={{
                                                                    fontSize: 30,
                                                                }}
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={7}
                                                        lg={7}>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={12}
                                                            lg={12}>
                                                            <div className="textodireccionenvio">
                                                                {direccionesUsuarios
                                                                    ? direccion
                                                                    : null}
                                                            </div>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={12}
                                                            lg={12}>
                                                            <div className="textodireccionenviodos">
                                                                {direccionesUsuarios
                                                                    ? ciudad +
                                                                    ", " +
                                                                    departamento
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase() +
                                                                    departamento
                                                                        .slice(
                                                                            1
                                                                        )
                                                                        .toLowerCase()
                                                                    : null}
                                                            </div>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={3}
                                                        lg={3}>
                                                        <div
                                                            className="btnaddaddressdos"
                                                            onClick={() =>
                                                                tusDirecciones()
                                                            }>
                                                            Elegir o agregar una
                                                            nueva dirección
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <div className="titulodetallesenvio">
                                            Detalles del envío
                                        </div>
                                    </Grid>
                                    {prdComprarAhora?.length > 0
                                        ? prdComprarAhora &&
                                        prdComprarAhora?.map((item, index) => {
                                            return (
                                                <div>
                                                    {item?.idproducto ==
                                                        itemCompra.idproducto ? (
                                                        <Grid
                                                            container
                                                            alignItems="center"
                                                            spacing={1}>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={12}
                                                                lg={12}>
                                                                <div className="cajadetallesenvioprd">
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
                                                                                1
                                                                            }
                                                                            lg={
                                                                                1
                                                                            }>
                                                                            <div className="iconlocatecinco">
                                                                                <LocalShippingIcon
                                                                                    className="locationoniconaddress"
                                                                                    style={{
                                                                                        fontSize: 30,
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                12
                                                                            }
                                                                            md={
                                                                                7
                                                                            }
                                                                            lg={
                                                                                7
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
                                                                                <div className="textodireccionenviocuatro">
                                                                                    {
                                                                                        fechaentrega
                                                                                    }
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
                                                                                <Grid container>
                                                                                    {
                                                                                        /*
                                                                                    <Grid item xs={12} md={8} lg={8}>
                                                                                        <div className="btncalcularenvio"
                                                                                            onClick={() => openCalcularEnvio()}
                                                                                        >
                                                                                            Calcular
                                                                                            valor
                                                                                            del
                                                                                            envio
                                                                                        </div>
                                                                                    </Grid>
                                                                                        */
                                                                                    }


                                                                                    <Grid item xs={12} md={4} lg={4}>
                                                                                        <div className="textocalcularenvio">
                                                                                            Valor del envio: {
                                                                                                valorEnvio == 0 ?
                                                                                                    myNumber(
                                                                                                        1,
                                                                                                        12400,
                                                                                                        2
                                                                                                    )
                                                                                                    :
                                                                                                    myNumber(
                                                                                                        1,
                                                                                                        valorEnvio,
                                                                                                        2
                                                                                                    )
                                                                                            }
                                                                                        </div>
                                                                                    </Grid>
                                                                                </Grid>

                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    ) : null}
                                                </div>
                                            );
                                        })
                                        : null}
                                </Grid>
                                <Grid item xs={12} md={5} lg={5}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className="cajaresumenpedidouno">
                                                {prdComprarAhora.length > 0
                                                    ? prdComprarAhora &&
                                                    prdComprarAhora.map(
                                                        (item, index) => {
                                                            return (
                                                                <div>
                                                                    {item.idproducto ==
                                                                        itemCompra.idproducto ? (
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
                                                                                    12
                                                                                }
                                                                                lg={
                                                                                    12
                                                                                }>
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
                                                                                                3
                                                                                            }
                                                                                            lg={
                                                                                                3
                                                                                            }>
                                                                                            <div className="">
                                                                                                <img
                                                                                                    className="imageshoppingcartuno"
                                                                                                    src={
                                                                                                        URL_IMAGES_RESULTS +
                                                                                                        itemCompra.nombreimagen1
                                                                                                    }
                                                                                                    alt="First slide"
                                                                                                />
                                                                                            </div>
                                                                                        </Grid>

                                                                                        <Grid
                                                                                            item
                                                                                            xs={
                                                                                                12
                                                                                            }
                                                                                            md={
                                                                                                9
                                                                                            }
                                                                                            lg={
                                                                                                9
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
                                                                                                <div className="textoproductocomprauno">
                                                                                                    {
                                                                                                        itemCompra.titulonombre
                                                                                                    }
                                                                                                </div>
                                                                                            </Grid>
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
                                                                                                        6
                                                                                                    }
                                                                                                    lg={
                                                                                                        6
                                                                                                    }>
                                                                                                    <div className="textocantidadtuptoducto">
                                                                                                        Cantidad:
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
                                                                                                    <div className="simbolopesosseis"></div>
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
                                                                                                    <div className="undprdresumendos">
                                                                                                        {" "}
                                                                                                        {myNumber(
                                                                                                            1,
                                                                                                            unidadesSelect,
                                                                                                            2
                                                                                                        )}
                                                                                                    </div>
                                                                                                </Grid>
                                                                                            </Grid>
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
                                                                                                        6
                                                                                                    }
                                                                                                    lg={
                                                                                                        6
                                                                                                    }>
                                                                                                    <div className="textoprecioprdresumendos">
                                                                                                        Precio
                                                                                                        producto:
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
                                                                                                    <div className="simbolopesosseis">
                                                                                                        $
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
                                                                                                    <div className="precioprdresumendos">
                                                                                                        {" "}
                                                                                                        {myNumber(
                                                                                                            1,
                                                                                                            item.precio,
                                                                                                            2
                                                                                                        )}
                                                                                                    </div>
                                                                                                </Grid>
                                                                                            </Grid>
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
                                                                                            } className="mt-15" >
                                                                                            <Grid
                                                                                                container
                                                                                                spacing={
                                                                                                    1
                                                                                                }
                                                                                            >
                                                                                                <Grid
                                                                                                    item
                                                                                                    xs={
                                                                                                        12
                                                                                                    }
                                                                                                    md={
                                                                                                        6
                                                                                                    }
                                                                                                    lg={
                                                                                                        6
                                                                                                    }>
                                                                                                    <div className="textoprecioprdresumendos">
                                                                                                        Precio
                                                                                                        envio:
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
                                                                                                    <div className="simbolopesosseis">
                                                                                                        $
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
                                                                                                    <div className="precioprdresumendos">
                                                                                                        {" "}
                                                                                                        {
                                                                                                            valorEnvio == 0 ?
                                                                                                                myNumber(
                                                                                                                    1,
                                                                                                                    12400,
                                                                                                                    2
                                                                                                                )
                                                                                                                :
                                                                                                                myNumber(
                                                                                                                    1,
                                                                                                                    valorEnvio,
                                                                                                                    2
                                                                                                                )}
                                                                                                    </div>
                                                                                                </Grid>
                                                                                            </Grid>
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
                                                                                                        6
                                                                                                    }
                                                                                                    lg={
                                                                                                        6
                                                                                                    }>
                                                                                                    <div className="textoprecioprdresumentres">
                                                                                                        Precio
                                                                                                        total:
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
                                                                                                    <div className="simbolopesossiete">
                                                                                                        $
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
                                                                                                    <div className="precioprdresumentres">
                                                                                                        {isNaN(
                                                                                                            parseInt(
                                                                                                                itemCompra.precio *
                                                                                                                unidadesSelect
                                                                                                            )
                                                                                                        )
                                                                                                            ? myNumber(
                                                                                                                1,
                                                                                                                ((itemCompra.precio *
                                                                                                                    unidadesSelect) + valorEnvio),
                                                                                                                2
                                                                                                            )
                                                                                                            : myNumber(
                                                                                                                1,
                                                                                                                ((itemCompra.precio *
                                                                                                                    unidadesSelect) + valorEnvio),
                                                                                                                2
                                                                                                            )}
                                                                                                    </div>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </div>
                                                                            </Grid>
                                                                        </Grid>
                                                                    ) : null}
                                                                </div>
                                                            );
                                                        }
                                                    )
                                                    : null}
                                            </div>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            md={12}
                                            lg={12}
                                            onClick={() => infoSiguiente()}>
                                            <div className="botoncontinuardirecciontres">
                                                Siguiente
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CheckoutScreen;
