import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./Layout";
import Moment from "moment";
import { URL_BD_MR, URL_IMAGES_RESULTS, URL_MK_MR } from "../../helpers/Constants";
import { Box, Grid, Bu } from "@mui/material";
import { useRouter } from "next/router";
import ModalMensajes from "../mensajes/ModalMensajes";
import shortid from "shortid";

function ConsultTransactions(props) {
    const router = useRouter();
    const [listarTransacciones, setListarTransacciones] = useState([]);
    const [estadoTransaccion, setEstadoTransaccion] = useState("");
    const [idTransaccion, setIdTransaccion] = useState(0);
    const [itemUpdate, setItemUpdate] = useState([]);
    const fechaactual = Moment(new Date()).subtract(5, 'days');
    const fechacompara = Moment(fechaactual).format("YYYY-MM-DD HH:mm:ss");
    const [grabar, setGrabar] = useState(false);
    const [grabarRechazo, setGrabarRechazo] = useState(false);

    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [showModalMensajes, setShowModalMensajes] = useState(false);

    //console.log("FECHA : ", fechacompara)
    //let variosprd = useSelector((state) => state.itemcomprar.itemcomprar);

    let hoy = Moment();
    let now = Moment();
    let masdias = "192:00:00";
    now.add(Moment.duration(masdias));
    let fechavence = Moment(now).format("YYYY-MM-DD");
    let fechahoy = Moment(hoy).format("YYYY-MM-DD");

    useEffect(() => {
        const movimientos = async () => {
            await axios({
                method: 'post',
                url: 'https://gimcloud.com.co/mrp/api/1017'
            }).then(rest => {
                if (rest) {
                    //console.log("RETORNA : ", rest);
                    //setListarTransacciones(rest.data);

                    const valores = window.location.search;

                    //console.log("VALORES : ", valores);
                    //Mostramos los valores en consola:
                    const urlParams = new URLSearchParams(valores);
                    //Accedemos a los valores
                    var idtransaction = urlParams.get('id');
                    //console.log("ID TRANSACTION : ", idtransaction);
                    let idtransaccion = '"'+idtransaction+'"';
                    
                    ///Creamos la instancia

                    const transaccion = async () => {
                        let params = {
                            idtransaccion: idtransaccion
                        }

                        await axios({
                            method: 'post',
                            url: 'https://gimcloud.com.co/mrp/api/5003', params
                        }).then(rest => {
                            if (rest) {
                                console.log("TRANSA WOMPI : ", rest.data);
                                setListarTransacciones(rest.data.listarmvtowompi[0]);
                                if (rest.data.listarmvtowompi[0]?.status == "APPROVED") {
                                    setEstadoTransaccion("APROBADA");
                                    console.log("WOMPIXX : ", "APROBADA");
                                    setIdTransaccion(idtransaction);
                                    setGrabar(true);
                                    compraAprobada(idtransaction);
                                    //setValorPago(Intl.NumberFormat("en-US").format(Number.parseFloat(listarTransaccion[0].amount_in_cents)))

                                } else {
                                    console.log("WOMPIYY : ", "RECHAZADA");
                                    setEstadoTransaccion("RECHAZADA");
                                    setGrabarRechazo(true);
                                    compraRechazada();
                                    //setShowModalMensajes(true);
                                    //setTituloMensajes("Error en la compra");
                                    //setTextoMensajes("No hemos podido completar la compra, contacta con la administración de MR");
                                    //router.push("/");
                                }
                            }
                        }
                        ).catch(function (error) {
                            console.log("ERROR LEYENDO TRANSACCION", error);
                        })
                    };
                    transaccion();
                }
            }
            ).catch(function (error) {
                console.log("ERROR LEYENDO MOVIMIENTOS");
            })
        };
        movimientos();
    }, []);

    const compraAprobada = (idtransaction) => {
         localStorage.setItem("activacompra", JSON.stringify(true));
        setGrabar(false);
        //console.log("ENTRE GRABAR VENTA");
        let incremento = 0;
        let incrementocxc = 0;
        let datitem = [];

        let variosprd = JSON.parse(localStorage.getItem("variosprd"));

        if (variosprd == 1) {
            datitem = JSON.parse(localStorage.getItem("itemcompraall"));
        } else {
            datitem = JSON.parse(localStorage.getItem("itemcompra"));
        }

        console.log("VARIOS PRD : ", datitem)
        //return

        let direccionusuario = JSON.parse(
            localStorage.getItem("direccionusuario")
        );

        let consecutivo = 0;
        let producto = 0;
        let long = datitem.length;
        let control = 0;

        datitem &&
            datitem.map((datprd, index) => {
                //función para obtener datos del producto
                async function leerProducto(idprd) {
                    let params = {
                        idarticulo: idprd,
                    };

                    try {
                        const res = await axios({
                            method: "post",
                            url: URL_BD_MR + "18",
                            params,
                        });
                        producto = res.data[0];

                        addBuy(datprd);
                    } catch (error) {
                        console.error("Error leyendo producto", error);
                    }
                }
                leerProducto(datprd.idproducto);
            });

        const addBuy = async (data) => {
            //console.log("SE LLAMA ADD BUY");
            const leerConsecutivo = async () => {
                let params = {
                    id: 1,
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR + "113",
                    params,
                })
                    .then((res) => {
                        consecutivo = res.data.consecutivoMR;
                        incremento = consecutivo[0].consecutivo;
                        /* Actualiza Consecutivo */
                        const updateCons = async () => {
                            let params = {
                                id: 1,
                                siguiente: consecutivo[0].consecutivo + long,
                            };

                            await axios({
                                method: "post",
                                url: URL_BD_MR + "114",
                                params,
                            })
                                .then((res) => {
                                    console.log(
                                        "UPDATE CONSECUTIVO UNO: ",
                                        res.data
                                    );
                                    grabarVenta();
                                })
                                .catch(function (error) {
                                    console.log(
                                        "Error leyendo Consecutivo Uno"
                                    );
                                });
                        };
                        updateCons();
                    })
                    .catch(function (error) {
                        console.log("Error leyendo consecutivo");
                    });
            };
            leerConsecutivo();

            //console.log("ADD BUY DATA : ", data);
            //return;
            let unidadescomprar = JSON.parse(localStorage.getItem("undselcompraahora"));
            let precioventa = data.precio * data.cantidad;
            let unidades = data.cantidad;
            let unidadesdisponibles = 0;

            if (unidadescomprar > 0) {
                precioventa = data.precio * unidadescomprar;
                unidades = unidadescomprar;
                unidadesdisponibles = data.numerodeunidades - unidades;
            }
            else {
                precioventa = data.precio * data.cantidad;
                unidades = data.cantidad;
                unidadesdisponibles = data.numerodeunidades - unidades;
            }

            const grabarVenta = async () => {
                
                let idventa = shortid();

                incremento = incremento + 1;
                let params = {
                    idproducto: data.idproducto,
                    idventa: idventa,
                    compatible: data.compatible,
                    idtransaccionpago: idtransaction,
                    numerodeaprobacion: incremento,
                    uidcomprador: data.usuario,
                    uidvendedor: producto.usuario,
                    fechaentrega: "2020-01-01",
                    fechadespacho: "2020-01-01",
                    fechadevolucion: "2020-01-01",
                    formadepago: 1,
                    cantidad: unidades,
                    preciodeventa: precioventa+12900,
                    precioenvio: data.precioenvio,
                    retencion: (precioventa * 0.035).toFixed(0),
                    impuestos: (precioventa * 0.19).toFixed(0),
                    direcciondeenvio: direccionusuario.direccion,
                    ciudadenvio: direccionusuario.ciudad,
                    estadodeldespacho: 57,
                    estadodelaventa: 56,
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR + "80",
                    params,
                })
                    .then((res) => {
                        console.log("ADD BUY : ", res.data);
                        async function noticarCrearPrd() {
                            //console.log("DATA EVEBDD : ", datavendedor && datavendedor.email)
                            //return
                            let enlace = URL_MK_MR+"loginaccount/?redirect=1&idventa="+idventa;
                            let mensaje = "Tienes 3 días hábiles como máximo para realizar el envío del producto, para confirmar el envío, dirigete a www.mercadorepuesto.com.co, luego inicia sesión con tu correo y contraseña, y en el menú de usuario ve a mis ventas y busca el numero de venta que corresponda, haz clic en la venta y vas encontrar un botón para subir la guia de envío.";
                            let imagen = "<p><strong><img src='https://gimcloud.com.co/files/mercadorepuesto/"+data.nombreimagen1+"' alt='Mercado Repuesto' height='150 width=150' ></strong>.</p>";
                            
                            const requestData = {
                                "remitente": data.emailvendedor,
                                "asunto": "¡FELICITACIONES TIENES UNA NUEVA VENTA!",
                                "plantilla": "info",
                                "to" : "Mercado Repuesto",
                                "contenido_html": {
                                    "title" : imagen,
                                    "subtitle": data.titulonombre+" "+unidades + " unidades, " + "por un valor de $ " + precioventa,
                                    "body": mensaje,
                                    "tipo": "01"
                                }
                            };

                            const config = {
                                headers: {
                                    "Authorization": "$2y$10$hc8dShHM0E71/08Tcjq3nOdq.hCmOcn5mEH5a/UZ9Lk0eBptD8CeG",
                                    "Content-Type": "application/json" || x < z
                                }
                            };

                            try {
                                const response = await axios.post("https://gimcloud.com.co/api/endpoint/mail", requestData, config);
                            } catch (error) {
                                console.error('Errorxx:', error);
                            }
                        }
                        noticarCrearPrd();

                        async function noticarComprador() {
                            let enlace = URL_MK_MR+"loginaccount/?redirect=2&idventa="+idventa;
                            let mensaje = "Para ver todas tus compras dirigete a www.mercadorepuesto.com.co, luego inicia sesión con tu correo y contraseña, y en el menu de usuario ve a mis compras.";
                            let imagen = "<p><strong><img src='https://gimcloud.com.co/files/mercadorepuesto/"+data.nombreimagen1+"' alt='Mercado Repuesto' height='150 width=150' ></strong>.</p>";

                            const requestData = {
                                "remitente": data.email,
                                "asunto": "TU COMPRA FUE EXITOSA",
                                "plantilla": "info",
                                "to" : "Mercado Repuesto",
                                "contenido_html": {
                                    "title" : imagen,
                                    "subtitle": data.titulonombre+" "+unidades + " unidades, " + "por un valor de $ " + precioventa,
                                    "body": mensaje,
                                    "tipo": "01"
                                }
                            };
                            
                            const config = {
                                headers: {
                                    "Authorization": "$2y$10$hc8dShHM0E71/08Tcjq3nOdq.hCmOcn5mEH5a/UZ9Lk0eBptD8CeG",
                                    "Content-Type": "application/json" || x < z
                                }
                            };

                            try {
                                const response = await axios.post("https://gimcloud.com.co/api/endpoint/mail", requestData, config);
                            } catch (error) {
                                console.error('Errorxx:', error);
                            }

                        }
                        noticarComprador();

                        const crearNotificacionComprador = async () => {
                            const idnotificacion = Math.floor(Math.random() * 10000000);
                            let comentario = 'Realizaste una compra a traves de Mercado Repuesto';

                            let params = {
                                estado: 0,
                                uidusuario: data.usuario,
                                idnotificacion: idnotificacion,
                                idorigen: incremento,
                                comentario: comentario,
                                estado: 90,
                                ctlrnotificaentrada: 0,
                                ctlrnotificasalida: 0,
                                tiponotificacion: 3,
                            }

                            try {
                                const res = await axios({
                                    method: "post",
                                    url: URL_BD_MR + "823", params
                                });

                                if (res.data.type == 1) {
                                    console.log("Notificación creada")
                                }
                            } catch (error) {
                                console.error("Error creando Notificación", error);
                            }
                        };
                        crearNotificacionComprador();

                        const crearNotificacionvendedor = async () => {
                            const idnotificacion = Math.floor(Math.random() * 10000000);
                            let comentario = 'Realizaste una venta a traves de Mercado Repuesto';

                            let params = {
                                estado: 0,
                                uidusuario: producto.usuario,
                                idnotificacion: idnotificacion,
                                idorigen: incremento,
                                comentario: comentario,
                                estado: 90,
                                ctlrnotificaentrada: 0,
                                ctlrnotificasalida: 0,
                                tiponotificacion: 4,
                            }

                            try {
                                const res = await axios({
                                    method: "post",
                                    url: URL_BD_MR + "823", params
                                });

                                if (res.data.type == 1) {
                                    console.log("Notificación creada")
                                }
                            } catch (error) {
                                console.error("Error creando Notificación", error);
                            }
                        };

                        crearNotificacionvendedor();
                        
                        if (res.data.type == 1) {
                            const actualizaUnidadesDisponibles = async () => {
                                //console.log("ENTRE ACTUALIZA");
                                let params = {
                                    id: data.idproducto,
                                    unddisponibles: unidadesdisponibles
                                };

                                await axios({
                                    method: "post",
                                    url: URL_BD_MR + "1018",
                                    params,
                                })
                                    .then((res) => {
                                        console.log(
                                            "UPDATE UNIDADES DISPONIBLES: ",
                                            res.data
                                        );
                                    })
                                    .catch(function (error) {
                                        console.log(
                                            "Error leyendo Consecutivo Dos"
                                        );
                                    });
                            }
                            actualizaUnidadesDisponibles()
                        }

                        // Crea cuenta x cobrar por compras a traves de MR
                        let consecutivocxc = 0;
                        const leerDatosCxC = async () => {
                            let params = {
                                id: 2,
                            };

                            await axios({
                                method: "post",
                                url: URL_BD_MR + "113",
                                params,
                            })
                                .then((res) => {
                                    consecutivocxc = res.data.consecutivoMR;
                                    incrementocxc = consecutivocxc[0].consecutivo;
                                    //console.log("DAT ITEM : ", datitem);

                                    const updateCons = async () => {
                                        let params = {
                                            id: 2,
                                            siguiente:
                                                consecutivocxc[0]
                                                    .consecutivo + 1,
                                        };

                                        await axios({
                                            method: "post",
                                            url: URL_BD_MR + "114",
                                            params,
                                        })
                                            .then((res) => {
                                                console.log(
                                                    "UPDATE CONSECUTIVO DOS: ",
                                                    res.data
                                                );
                                                grabarCxC();
                                            })
                                            .catch(function (error) {
                                                console.log(
                                                    "Error leyendo Consecutivo Dos"
                                                );
                                            });
                                    };
                                    updateCons();

                                    async function grabarCxC() {
                                        incrementocxc = incrementocxc + 1;
                                        let cargoporventa = (
                                            precioventa * 0.05
                                        ).toFixed(0);
                                        let retencion = (
                                            cargoporventa * 0.035
                                        ).toFixed(0);
                                        let impuesto = (
                                            cargoporventa * 0.19
                                        ).toFixed(0);

                                        let params = {
                                            idproducto: data.idproducto,
                                            compatible: data.compatible,
                                            idtransaccionpago: idTransaccion,
                                            numeroctaxcobrar: incrementocxc,
                                            conceptopago: 1,
                                            uidvendedor: producto.usuario,
                                            fechaentrega: "2020-01-01",
                                            fechadevolucion: "2020-01-01",
                                            fechadepago: fechahoy,
                                            fechadevencimiento: fechavence,
                                            formadepago: 1,
                                            preciodelservicio:
                                                cargoporventa,
                                            precioenvio: data.precioenvio,
                                            retencion: retencion,
                                            impuestos: impuesto,
                                            titulomensaje: "",
                                            mensajevendedor: "",
                                            estadodelpago: 70,
                                        };

                                        await axios({
                                            method: "post",
                                            url: URL_BD_MR + "119",
                                            params,
                                        })
                                            .then((res) => {
                                                console.log(
                                                    "GRABAR CXC : ",
                                                    res.data
                                                );
                                                control = control + 1;
                                                if (control == long) {
                                                    /*Carga pagina principal */
                                                    router.push("/");
                                                }
                                                //Actualiza Consecutivo Compras
                                            })
                                            .catch(function (error) {
                                                console.log(
                                                    "Error leyendo direcciones"
                                                );
                                            });
                                    }
                                })
                                .catch(function (error) {
                                    console.log(
                                        "Error leyendo direcciones"
                                    );
                                });
                        };

                        if (res.data.type == 1)
                            leerDatosCxC();
                        else {
                            setShowModalMensajes(true);
                            setTituloMensajes("Error en la compra");
                            setTextoMensajes("No hemos podido completar la compra, contacta con la administración de MR");
                        }
                    })
                    .catch(function (error) {
                        console.log("Error leyendo direcciones");
                    });
            };
        };
    }

    const compraRechazada = () => {
        let incremento = 0;
        let incrementocxc = 0;
        let datitem = [];

        let variosprd = JSON.parse(localStorage.getItem("variosprd"));
        //console.log("VARIOS PRD : ",  variosprd)
        if (variosprd == 1) {
            datitem = JSON.parse(localStorage.getItem("itemcompraall"));
        } else {
            datitem = JSON.parse(localStorage.getItem("itemcompra"));
        }

        //console.log("VARIOS PRD : ",  datitem)
        //return

        let direccionusuario = JSON.parse(
            localStorage.getItem("direccionusuario")
        );

        let consecutivo = 0;
        let producto = 0;
        let long = datitem.length;
        let control = 0;

        datitem &&
            datitem.map((datprd, index) => {
                //función para obtener datos del producto
                async function leerProducto(idprd) {
                    let params = {
                        idarticulo: idprd,
                    };

                    try {
                        const res = await axios({
                            method: "post",
                            url: URL_BD_MR + "18",
                            params,
                        });
                        producto = res.data[0];

                        addPurchaseRejection(datprd);
                    } catch (error) {
                        console.error("Error leyendo producto", error);
                    }
                }
                leerProducto(datprd.idproducto);
            });

        const addPurchaseRejection = async (data) => {
            const leerConsecutivo = async () => {
                let params = {
                    id: 1,
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR + "113",
                    params,
                })
                    .then((res) => {
                        consecutivo = res.data.consecutivoMR;
                        incremento = consecutivo[0].consecutivo;
                        /* Actualiza Consecutivo */
                        const updateCons = async () => {
                            let params = {
                                id: 1,
                                siguiente: consecutivo[0].consecutivo + long,
                            };

                            await axios({
                                method: "post",
                                url: URL_BD_MR + "114",
                                params,
                            })
                                .then((res) => {
                                    console.log(
                                        "UPDATE CONSECUTIVO UNO: ",
                                        res.data
                                    );
                                    purchaseRejection();
                                })
                                .catch(function (error) {
                                    console.log(
                                        "Error leyendo Consecutivo Uno"
                                    );
                                });
                        };
                        updateCons();
                    })
                    .catch(function (error) {
                        console.log("Error leyendo consecutivo");
                    });
            };
            leerConsecutivo();

            //console.log("ADD BUY : ", params);
            //return;
            let unidadescomprar = JSON.parse(localStorage.getItem("undselcompraahora"));
            let precioventa = data.precio * data.cantidad;
            let unidades = data.cantidad;

            if (unidadescomprar > 0) {
                precioventa = data.precio * unidadescomprar;
                unidades = unidadescomprar;
            }
            else {
                precioventa = data.precio * data.cantidad;
                unidades = data.cantidad;
            }

            const purchaseRejection = async () => {
                incremento = incremento + 1;
                let params = {
                    idproducto: data.idproducto,
                    compatible: data.compatible,
                    idtransaccionpago: idTransaccion,
                    numerodeaprobacion: incremento,
                    uidcomprador: data.usuario,
                    uidvendedor: producto.usuario,
                    fechaentrega: "2020-01-01",
                    fechadespacho: "2020-01-01",
                    fechadevolucion: "2020-01-01",
                    formadepago: 1,
                    cantidad: unidades,
                    preciodeventa: precioventa+12900,
                    precioenvio: data.precioenvio,
                    retencion: (precioventa * 0.035).toFixed(0),
                    impuestos: (precioventa * 0.19).toFixed(0),
                    direcciondeenvio: direccionusuario.direccion,
                    ciudadenvio: direccionusuario.ciudad,
                    estadodeldespacho: 55,
                    estadodelaventa: 54,
                };

                console.log("PARAMSXXX: ", params);

                await axios({
                    method: "post",
                    url: URL_BD_MR + "801",
                    params,
                })
                    .then((res) => {
                        console.log("Purchase Rejection: ", res.data);
                        // Crea cuenta x cobrar por compras a traves de MR
                        let consecutivocxc = 0;
                        const leerDatosCxC = async () => {
                            let params = {
                                id: 2,
                            };

                            await axios({
                                method: "post",
                                url: URL_BD_MR + "113",
                                params,
                            })
                                .then((res) => {
                                    consecutivocxc = res.data.consecutivoMR;
                                    incrementocxc = consecutivocxc[0].consecutivo;
                                    //console.log("DAT ITEM : ", datitem);

                                    const updateCons = async () => {
                                        let params = {
                                            id: 2,
                                            siguiente:
                                                consecutivocxc[0]
                                                    .consecutivo + 1,
                                        };

                                        await axios({
                                            method: "post",
                                            url: URL_BD_MR + "114",
                                            params,
                                        })
                                            .then((res) => {
                                                console.log(
                                                    "UPDATE CONSECUTIVO DOS: ",
                                                    res.data
                                                );
                                                router.push("/");
                                            })
                                            .catch(function (error) {
                                                console.log(
                                                    "Error leyendo Consecutivo Dos"
                                                );
                                            });
                                    };
                                    updateCons();
                                })
                                .catch(function (error) {
                                    console.log(
                                        "Error leyendo direcciones"
                                    );
                                });
                        };
                        leerDatosCxC();
                    })
                    .catch(function (error) {
                        console.log("Error leyendo direcciones");
                    });
            };
        };
    }


    const columnas = [
        {
            field: 'reference',
            title: 'Referencia',
            cellStyle: { minWidth: 50 }
        },
        {
            field: 'created_at',
            title: 'Fecha',
            cellStyle: { minWidth: 200 },
            type: 'date',
            render: rowData => Moment(rowData.created_at).format('YYYY-MM-DD HH:mm')
        },
        {
            field: 'legal_id',
            title: 'Cedula',
            cellStyle: { minWidth: 50 }
        },
        {
            field: 'full_name',
            title: 'Cliente',
            cellStyle: { minWidth: 100 }
        },

        {
            field: 'city',
            title: 'Ciudad',
            cellStyle: { minWidth: 50 }
        },
        {
            field: 'payment_method',
            title: 'Medio Pago',
            cellStyle: { minWidth: 50 }
        },
        {
            field: 'status',
            title: 'Estado',
            cellStyle: { minWidth: 50 }
        },
        {
            field: 'amount_in_cents',
            title: 'valor',
            cellStyle: { minWidth: 50 },
            type: 'number',
            render: rowData => Intl.NumberFormat("en-US").format(Number.parseFloat(rowData.amount_in_cents))
        }
    ]

    const handleModalClose = () => {
        setShowModalMensajes(false);
    };

    return (
        <Layout>
            <div className="tamanoconsultamvto">
                <ModalMensajes
                    shown={showModalMensajes}
                    close={handleModalClose}
                    titulo={tituloMensajes}
                    mensaje={textoMensajes}
                    tipo="error"
                />
                {
                    /*
                <MaterialTable
                    title="TRANSACCIONES PASARELA DE MERCADO REPUESTO"
                    columns={columnas}
                    icons={tableIcons}
                    data={listarTransacciones}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...pendienteCrear];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;
                                    setPendienteCrear([...dataUpdate]);
                                    setItemUpdate(newData);
                                    grabarDatos(newData);
                                    resolve();
                                }, 1000)
                            }),
                    }}
                    options={{
                        actionsColumnIndex: 11,
                        headerStyle: { backgroundColor: '#63ABDD', fontSize: 14, color: 'white', height: '30px' },
                        rowStyle: rowData => ({
                            backgroundColor: (rowData.created_at > fechacompara) ? '#C186E3' : '#FFF'
                        })
                    }}
                />
                    */
                }
            </div>
        </Layout >
    );
}

export default ConsultTransactions;