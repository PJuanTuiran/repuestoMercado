import Container from "../../components/layouts/Container";
import { Modal, Grid, useMediaQuery, useTheme, Autocomplete, TextField, FormControl } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { URL_BD_MR, URL_IMAGES_RESULTSSMS, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { useSelector } from "react-redux";
import ModalMensajes from "../mensajes/ModalMensajes";
import { validateEmail } from "../../utilities/Validations";
import Moment from "moment";
//import PDFViewer from "./VerPDF";

let arrayImagenes = [];
let destinatarionittype = null;
let destinydanecode = null;

export default function GenerarGuiaDespacho({ setModalGuiaDespacho }) {
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const router = useRouter();
    const theme = useTheme();
    const irA = useRef(null);//PosiciónTopPage

    //Estado de cuenta
    const [datosVendedor, setDatosVendedor] = useState(null);
    const [tipoIdentificacion, setTipoIdentificacion] = useState("");
    const [listaCiudades, setListaCiudades] = useState([]);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD");
    const [selectTipoIdentificacion, setSelectTipoIdentificacion] = useState(null);
    const [selectTipoIdentificacionDesti, setSelectTipoIdentificacionDesti] = useState(null);
    const [selectedTipoIdentificacion, setSelectedTipoIdentificacion] = useState("Tipo de identificación");
    const [tipoIdentificacionDesti, setTipoIdentificacionDesti] = useState("Tipo de identificación");
    const [selectedTipoCuenta, setSelectedTipoCuenta] = useState("tipo de cuenta");

    const [errorNombreRemitente, setErrorNombreRemitente] = useState(false);
    const [errorApellidoRemitente, setErrorApellidoRemitente] = useState(false);
    const [errorTelefonoRemitente, setErrorTelefonoRemitente] = useState(false);
    const [errorEmailRemitente, setErrorEmailRemitente] = useState(false);
    const [errorDireccionRemitente, setErrorDireccionRemitente] = useState(false);
    const [errorTipoDctoRemitente, setErrorTipoDctoRemitente] = useState(false);
    const [errorNumeroDctoRemitente, setErrorNumeroDctoRemitente] = useState(false);
    const [errorCiudadRemitente, setErrorCiudadRemitente] = useState(false);

    const [errorNombreDestinatario, setErrorNombreDestinatario] = useState(false);
    const [errorApellidoDestinatario, setErrorApellidoDestinatario] = useState(false);
    const [errorTelefonoDestinatario, setErrorTelefonoDestinatario] = useState(false);
    const [errorEmailDestinatario, setErrorEmailDestinatario] = useState(false);
    const [errorDireccionDestinatario, setErrorDireccionDestinatario] = useState(false);
    const [errorTipoDctoDestinatario, setErrorTipoDctoDestinatario] = useState(false);
    const [errorNumeroDctoDestinatario, setErrorNumeroDctoDestinatario] = useState(false);
    const [errorCiudadDestinatario, setErrorCiudadDestinatario] = useState(false);

    const [errorCantidad, setErrorCantidad] = useState(false);
    const [errorCajas, setErrorCajas] = useState(false);
    const [errorAncho, setErrorAncho] = useState(false);
    const [errorLargo, setErrorLargo] = useState(false);
    const [errorAlto, setErrorAlto] = useState(false);
    const [errorPeso, setErrorPeso] = useState(false);
    const [errorValor, setErrorValor] = useState(false);

    const [classBtn, setClassBtn] = useState("btnsesiondespacho");

    const [errorNombreAlmacen, setErrorNombreAlmacen] = useState(false);
    const handleModalClose = () => {
        setShowModalMensajes(false);
    };

    const [remitenteName, setRemitenteName] = useState(null);
    const [remitenteSurName, setRemitenteSurName] = useState(null);
    const [remitenteCellPhone, setRemitenteCellPhone] = useState(null);
    const [remitentePrefix, setRemitentePrefix] = useState("+57");
    const [remitenteEmail, setRemitenteEmail] = useState(null);
    const [remitentePickupAddress, setRemitentePickupAddress] = useState(null);
    const [remitenteNit, setRemitenteNit] = useState(null);
    const [remitenteNitType, setRemitenteNitType] = useState(null);
    const [originDaneCode, setOriginDaneCode] = useState(null);
    const [ciudadOrigen, setCiudadOrigen] = useState(null);
    const [ciudadDestino, setCiudadDestino] = useState(null);

    const [destinatarioName, setDestinatarioName] = useState(null);
    const [destinatarioSurName, setDestinatarioSurName] = useState(null);
    const [destinatarioCellPhone, setDestinatarioCellPhone] = useState(null);
    const [destinatarioPrefix, setDestinatarioPrefix] = useState("+57");
    const [destinatarioEmail, setDestinatarioEmail] = useState(null);
    const [destinatarioPickupAddress, setDestinatarioPickupAddress] = useState(null);
    const [destinatarioNit, setDestinatarioNit] = useState(null);
    const [destinatarioNitType, setDestinatarioNitType] = useState(null);
    const [destinyDaneCode, setDestinyDaneCode] = useState(null);

    const [quantity, setQuantity] = useState(null);
    const [unidadesInternas, setUnidadesInternas] = useState(null);
    const [width, setWidth] = useState(null);
    const [large, setLarge] = useState(null);
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [forbiddenProduct, setForbiddenProduct] = useState(true);
    const [productReference, setProductReference] = useState(null);
    const [declaredValue, setDeclaredValue] = useState(null);

    const [channel, setChannel] = useState("Mercado Repuesto SAS");
    const [deliveryCompany, setDeliveryCompany] = useState("5ca22d9587981510092322f6");
    const [criteria, setCriteria] = useState("price");
    const [description, setDescription] = useState(null);
    const [comments, setComments] = useState(null);
    const [paymentType, setPaymentType] = useState(101);
    const [valueCollection, setValueCollection] = useState(0);
    const [requestPickup, setRequestPickup] = useState(false);

    const [datosRimitente, setDatosRimitente] = useState(true);
    const [datosDestinatario, setDatosDestinatario] = useState(false);
    const [datosProducto, setDatosProducto] = useState(false);
    const [datosAlmacen, setDatosAlmacen] = useState(false);

    const [editRimitente, setEditRimitente] = useState(false);
    const [editDestinatario, setEditDestinatario] = useState(false);
    const [editProducto, setEditProducto] = useState(false);

    const [verGuia, setVerGuia] = useState(null);
    const [verRotulo, setVerRotulo] = useState(null);
    const [habiltarBtnGuia, sethabiltarBtnGuia] = useState("btnverguia");
    const [generarBtnGuia, setGenerarBtnGuia] = useState("btnverguia2");

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [abrirDatosRemitente, setAbrirDatosRemitente] = useState(false);
    const [abrirDatosDestinatario, setAbrirDatosDestinatario] = useState(false);
    const [abrirDatosProducto, setAbrirDatosProducto] = useState(false);

    const [controlPrd, setControlPrd] = useState(false);

    /*
     if (!validateEmail(formData.email)) {
                setInputControlEmail("form-control ps-form__input  alertboton");
                setMensajeEmail("Recuerda, Ingresa un email valido");
                setActivaMensajeEmail(true);
                errors.email = true;
                formOk = false;
                return;
            }
    */

    let product = null;

    if (typeof window !== "undefined") {
        if (router.query.product) {
            product = JSON.parse(router.query.product);
            //console.log("PRODUCTO : ", product);
        }
    }

    useEffect(() => {
        const leerCiudades = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}166`,
                });
                if (Array.isArray(res.data.ciudades)) {
                    setListaCiudades(res.data.ciudades);
                } else {
                    console.error("Error: se esperaba un array, pero se recibió", res.data.ciudades);
                }
            } catch (error) {
                console.error("Error al obtener las ciudades", error);
            }
        };
        leerCiudades();

        const obtenerTiposIdentificacion = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}7`,
                });
                if (Array.isArray(res.data.tipoidentificacion)) {
                    setTipoIdentificacion(res.data.tipoidentificacion);
                } else {
                    console.error("Error: se esperaba un array, pero se recibió", res.data.tipoidentificacion);
                }
            } catch (error) {
                console.error("Error al obtener los tipos de identificación", error);
            }
        };
        obtenerTiposIdentificacion();

    }, []);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    useEffect(() => {
        if (product) {
            setProductReference(product.compatible);
            setDescription(product.nombreProducto);
        }
    }, [product]);

    //Petición para obtener datos de usuario loggeado
    useEffect(() => {
        const datosDeusuario = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });
                //setDatosUsuario(res.data[0]);
                //setUidUser(res.data[0].uid)
            } catch (error) {
                console.error("Error al leer los datos del usuario a retirar", error);
                // Maneja el error según tus necesidades
            }
        };
        datosDeusuario();
        if (!controlPrd) {
            const datosVendedor = async () => {
                let params = {
                    usuario: product.uidcomprador,
                };
                try {
                    const res = await axios({
                        method: "post",
                        url: URL_BD_MR + "13",
                        params,
                    });
                    setDatosVendedor(res.data[0]);
                    console.log("DATOS COMPRADOR : ", res.data[0]);
                    if (res.data) {
                        setDestinatarioName(res.data[0].primernombre)
                        setDestinatarioSurName(res.data[0].primerapellido);
                        setDestinatarioCellPhone(res.data[0].celular);
                        setDestinatarioEmail(res.data[0].email);
                        setDestinatarioPickupAddress(product.direcciondeenvio);
                        setDestinatarioNit(res.data[0].identificacion);

                        let ciud = [];
                        listaCiudades &&
                            listaCiudades.map((item) => {
                                if (item.id_ciu == product.ciudadenvio) {
                                    ciud.push(item);
                                }
                            });

                        console.log("CIUDAD ENVIO : ", ciud)
                        setCiudadDestino(ciud[0]);
                        setDestinyDaneCode(ciud[0].codigo_ciu);

                        let tipoident = [];
                        tipoIdentificacion &&
                            tipoIdentificacion.map((item) => {
                                if (item.id == res.data[0].tipoidentificacion) {
                                    tipoident.push(item);
                                }
                            });

                        console.log("TIPO IDENTIFICACION : ", tipoident[0]);
                        setSelectTipoIdentificacionDesti(tipoident[0]);
                        setTipoIdentificacionDesti(tipoident[0].tipoidentificacion);
                        setDestinatarioNitType(tipoident[0].tipoidentificacion);

                        destinatarionittype = tipoident[0].tipoidentificacion;
                        destinydanecode = ciud[0].codigo_ciu;
                        setControlPrd(true);

                        //res.data[0].tipoidentificacion
                        //product.ciudadenvio
                    }

                } catch (error) {
                    console.error("Error al leer los datos del usuario a retirar", error);
                    // Maneja el error según tus necesidades
                }
            };

            if (product)
                datosVendedor();
        }
    }, [datosusuarios, product]);


    //Params a envíar al endPoint
    const [form, setForm] = useState({
        nombretitular: '',
        tipoidentificacion: '',
        tipodecuenta: '',
        identificacion: '',
        entidadbancaria: '',
        numerodecuenta: '',
        valortransferencia: '0',
        nombredocumentouno: '',
        nombredocumentodos: '',
    });

    //función para ponerle "," a valor
    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    //Función para eliminar "," a la hora de envíar
    const handleChangeCiudadRemite = (value) => {
        //console.log("VALUE : ", value.codigo_ciu)
        if (value) {
            setOriginDaneCode(value.codigo_ciu);
            setCiudadOrigen(value)
        }

    };

    const handleChangeCiudadDestino = (value) => {
        //console.log("VALUE : ", value.codigo_ciu)
        if (value) {
            setDestinyDaneCode(value.codigo_ciu);
            setCiudadDestino(value);
        }
    };

    //Función para handles de form para hacer retiro 
    //Validar datos remitente
    const handleChangeRemitente = () => {
        let validar = false;

        if (!destinatarioName) {
            setErrorNombreDestinatario(true);
            validar = true;
        } else {
            setErrorNombreDestinatario(false);
        }

        if (!destinatarioSurName) {
            validar = true;
            setErrorApellidoDestinatario(true);
        } else {
            setErrorApellidoDestinatario(false);
        }

        if (destinatarioCellPhone.length < 10 || destinatarioCellPhone.length > 10) {
            setErrorTelefonoDestinatario(true);
            validar = true;
        } else
            if (!destinatarioCellPhone) {
                validar = true;
                setErrorTelefonoDestinatario(true);
            } else {
                setErrorTelefonoDestinatario(false);
            }

        if (!validateEmail(destinatarioEmail)) {
            setErrorEmailDestinatario(true);
            validar = true;
        } else
            if (!destinatarioEmail) {
                validar = true;
                setErrorEmailDestinatario(true);
            } else {
                setErrorEmailDestinatario(false);
            }

        if (!destinatarioPickupAddress) {
            validar = true;
            setErrorDireccionDestinatario(true);
        } else {
            setErrorDireccionDestinatario(false);
        }

        if (!destinatarioNitType) {
            validar = true;
            setErrorTipoDctoDestinatario(true);
        } else {
            setErrorTipoDctoDestinatario(false);
        }

        if (destinatarioNit.length < 6 || destinatarioNit.length > 10) {
            setErrorNumeroDctoDestinatario(true);
            validar = true;
        } else
            if (!destinatarioNit) {
                validar = true;
                setErrorNumeroDctoDestinatario(true);
            } else {
                setErrorNumeroDctoDestinatario(false);
            }

        if (!destinyDaneCode) {
            setErrorCiudadDestinatario(true);
            validar = true;
        } else {
            setErrorCiudadDestinatario(false);
        }









        if (!validar) {
            habilitarDestinatario();
        }
    };

    const handleChangeDestinatario = () => {
        let validar = false;



        if (!remitenteName) {
            setErrorNombreRemitente(true);
            validar = true;
        } else {
            setErrorNombreRemitente(false);
        }

        if (!remitenteSurName) {
            setErrorApellidoRemitente(true);
            validar = true;
        } else {
            setErrorApellidoRemitente(false);
        }

        if (remitenteCellPhone && remitenteCellPhone.length < 10 ||
            remitenteCellPhone && remitenteCellPhone.length > 10) {
            setErrorTelefonoRemitente(true);
            validar = true;
        } else
            if (!remitenteCellPhone) {
                setErrorTelefonoRemitente(true);
                validar = true;
            } else {
                setErrorTelefonoRemitente(false);
            }

        if (!validateEmail(remitenteEmail)) {
            setErrorEmailRemitente(true);
            validar = true;
        } else
            if (!remitenteEmail) {
                setErrorEmailRemitente(true);
                validar = true;
            } else {
                setErrorEmailRemitente(false);
            }

        if (!remitentePickupAddress) {
            setErrorDireccionRemitente(true);
            validar = true;
        } else {
            setErrorDireccionRemitente(false);
        }

        if (!remitenteNitType) {
            setErrorTipoDctoRemitente(true);
            validar = true;
        } else {
            setErrorTipoDctoRemitente(false);
        }

        if (remitenteNit && remitenteNit.length < 6 ||
            remitenteNit && remitenteNit.length > 10) {
            setErrorNumeroDctoRemitente(true);
            validar = true;
        } else
            if (!remitenteNit) {
                setErrorNumeroDctoRemitente(true);
                validar = true;
            } else {
                setErrorNumeroDctoRemitente(false);
            }

        if (!originDaneCode) {
            setErrorCiudadRemitente(true);
            validar = true;
        } else {
            setErrorCiudadRemitente(false);
        }

        if (!validar) {
            habilitarRemitente();
        }
    };

    const handleChangeProducto = () => {
        let validar = false;

        if (!quantity) {
            setErrorCantidad(true);
            validar = true;
        } else {
            setErrorCantidad(false);
        }

        if (!unidadesInternas) {
            setErrorCajas(true);
            validar = true;
        } else {
            setErrorCajas(false);
        }

        if (!width) {
            setErrorAncho(true);
            validar = true;
        } else {
            setErrorAncho(false);
        }

        if (!height) {
            setErrorAlto(true);
            validar = true;
        } else {
            setErrorAlto(false);
        }

        if (!weight) {
            setErrorPeso(true);
            validar = true;
        } else {
            setErrorPeso(false);
        }

        if (!large) {
            setErrorLargo(true);
            validar = true;
        } else {
            setErrorLargo(false);
        }

        if (!declaredValue) {
            validar = true;
            setErrorValor(true);
        } else {
            setErrorValor(false);
        }

        if (!validar) {
            habilitarProducto();
        }
    };

    const handleChangeAlmacen = () => {
        let validar = false;
        /*
                if (!channel) {
                    validar = true;
                    setErrorNombreAlmacen(true);
                } else {
                    setErrorNombreAlmacen(false);
                }
                */

        if (!validar) {
            habilitarAlmacen();
        }
    };

    const handleChangeRetiro = () => {
        if (!remitenteName) {
            setErrorNombreRemitente(true);
        } else {
            setErrorNombreRemitente(false);
        }

        if (!remitenteSurName) {
            setErrorApellidoRemitente(true);
        } else {
            setErrorApellidoRemitente(false);
        }

        if (!remitenteCellPhone) {
            setErrorTelefonoRemitente(true);
        } else {
            setErrorTelefonoRemitente(false);
        }

        if (!remitenteEmail) {
            setErrorEmailRemitente(true);
        } else {
            setErrorEmailRemitente(false);
        }

        if (!remitentePickupAddress) {
            setErrorDireccionRemitente(true);
        } else {
            setErrorDireccionRemitente(false);
        }

        if (!remitenteNitType) {
            setErrorTipoDctoRemitente(true);
        } else {
            setErrorTipoDctoRemitente(false);
        }

        if (!remitenteNit) {
            setErrorNumeroDctoRemitente(true);
        } else {
            setErrorNumeroDctoRemitente(false);
        }

        if (!destinatarioName) {
            setErrorNombreDestinatario(true);
        } else {
            setErrorNombreDestinatario(false);
        }

        if (!destinatarioSurName) {
            setErrorApellidoDestinatario(true);
        } else {
            setErrorApellidoDestinatario(false);
        }

        if (!destinatarioCellPhone) {
            setErrorTelefonoDestinatario(true);
        } else {
            setErrorTelefonoDestinatario(false);
        }

        if (!destinatarioEmail) {
            setErrorEmailDestinatario(true);
        } else {
            setErrorEmailDestinatario(false);
        }

        if (!destinatarioPickupAddress) {
            setErrorDireccionDestinatario(true);
        } else {
            setErrorDireccionDestinatario(false);
        }

        if (!destinatarioNitType) {
            setErrorTipoDctoDestinatario(true);
        } else {
            setErrorTipoDctoDestinatario(false);
        }

        if (!destinatarioNit) {
            setErrorNumeroDctoDestinatario(true);
        } else {
            setErrorNumeroDctoDestinatario(false);
        }

        if (!quantity) {
            setErrorCantidad(true);
        } else {
            setErrorCantidad(false);
        }

        if (!unidadesInternas) {
            setErrorCajas(true);
            validar = true;
        } else {
            setErrorCajas(false);
        }

        if (!width) {
            setErrorAncho(true);
        } else {
            setErrorAncho(false);
        }

        if (!height) {
            setErrorAlto(true);
        } else {
            setErrorAlto(false);
        }

        if (!weight) {
            setErrorPeso(true);
        } else {
            setErrorPeso(false);
        }

        if (!large) {
            setLarge(true);
        } else {
            setErrorNumeroDctoDestinatario(false);
        }

        if (!declaredValue) {
            setErrorValor(true);
        } else {
            setErrorValor(false);
        }
    };

    const handleSelectTipoIdentificacion = (value) => {
        if (value) {
            setSelectedTipoIdentificacion(value.tipoidentificacion);
            setSelectTipoIdentificacion(value);
            setRemitenteNitType(value.tipoidentificacion);
        }
    };

    const handleTipoIdentificacionDesti = (value) => {
        //console.log("VALUEXXX : ", value)
        if (value) {
            setTipoIdentificacionDesti(value.tipoidentificacion);
            setSelectTipoIdentificacionDesti(value);
            setDestinatarioNitType(value.tipoidentificacion);
        }
    };

    const generarGuia = (data) => {

        /*
        console.log("REQUESST : ", remitenteName, " - ", remitenteSurName, " - ", remitenteCellPhone, " - ", remitentePrefix, " - ",
            remitenteEmail, " - ", remitentePickupAddress, " - ", remitenteNit, " - ", remitenteNitType, " - ",
            destinatarioName, " - ", destinatarioSurName, " - ", destinatarioCellPhone, " - ", destinatarioPrefix, " - ",
            destinatarioEmail, " - ", destinatarioPickupAddress, " - ", destinatarioNit, " - ", destinatarioNitType, " - ",
            quantity, " - ", width, " - ", large, " - ", height, " - ",
            weight, " - ", forbiddenProduct, " - ", productReference, " - ", declaredValue, " - ",
            channel, " - ", deliveryCompany, " - ", criteria, " - ", description, " - ",
            comments, " - ", paymentType, " - ", valueCollection, " - ", requestPickup)
        */
        if (remitenteName || remitenteSurName || remitenteCellPhone || remitentePrefix ||
            remitenteEmail || remitentePickupAddress || remitenteNit || remitenteNitType ||
            destinatarioName || destinatarioSurName || destinatarioCellPhone || destinatarioPrefix ||
            destinatarioEmail || destinatarioPickupAddress || destinatarioNit || destinatarioNitType ||
            quantity || width || large || height ||
            weight || forbiddenProduct || productReference || declaredValue ||
            channel || deliveryCompany || criteria || description ||
            comments || paymentType) {
            //alert("Debes ingresar todos los datos")
            //return
        }


        let arrayunidades = [];
        for (var i = 0; i < quantity; i++) {
            let item = {
                "tipounidad": "TIPO_UND_PAQ",
                "tipoempaque": "",
                "claseempaque": "CLEM_CAJA",
                "dicecontener": "Mercancia",
                "kilosreales": weight,
                "largo": large,
                "alto": height,
                "ancho": width,
                "pesovolumen": "",
                "valormercancia": declaredValue,
                "codigobarras": null,
                "numerobolsa": null,
                "referencias": null,
                "unidadesinternas": unidadesInternas
            }
            arrayunidades.push(item);
        }

        console.log("ARRA UNID : ", arrayunidades);

        //return

        let nitmr = 901483675;
        let urlpdf = null;
        let urltiquete = null;

        let requestData = {
            "despacho": {
                "clave": "CLITCC20240OLPBZGKAK",
                "numerorelacion": null,
                "fechahorarelacion": null,
                "solicitudrecogida": {
                    "numero": null,
                    "fecha": null,
                    "ventanainicio": null,
                    "ventanafin": null
                },
                "unidadnegocio": 1,
                "numeroremesa": null,
                "fechadespacho": fechaactual,
                "cuentaremitente": "1485100",
                "tipoidentificacionremitente": "NIT",
                "identificacionremitente": nitmr,
                "sederemitente": null,
                "primernombreremitente": null,
                "segundonombreremitente": null,
                "primerapellidoremitente": null,
                "segundoapellidoremitente": null,
                "razonsocialremitente": "Mercado Repuesto SAS",
                "direccionremitente": "Carrera 90 # 190 Sur 35",
                "naturalezaremitente": "J",
                "contactoremitente": "Daniela Ramirez",
                "emailremitente": "administracion@mercadorepuesto.com.co",
                "telefonoremitente": "3158912110",
                "ciudadorigen": "05631000",
                "tipoidentificaciondestinatario": "NIT",
                "identificaciondestinatario": destinatarioNit,
                "sededestinatario": null,
                "primernombredestinatario": destinatarioName,
                "segundonombredestinatario": "",
                "primerapellidodestinatario": destinatarioSurName,
                "segundoapellidodestinatario": "",
                "razonsocialdestinatario": destinatarioName + " " + destinatarioSurName,
                "naturalezadestinatario": null,
                "direcciondestinatario": destinatarioPickupAddress,
                "contactodestinatario": destinatarioName + " " + destinatarioSurName,
                "emaildestinatario": null,
                "telefonodestinatario": destinatarioCellPhone,
                "ciudaddestinatario": destinyDaneCode + "000",
                "barriodestinatario": null,
                "totalpeso": weight,
                "totalpesovolumen": weight,
                "totalvalormercancia": declaredValue,
                "formapago": null,
                "observaciones": comments,
                "llevabodega": null,
                "recogebodega": null,
                "centrocostos": null,
                "totalvalorproducto": null,
                "tiposervicio": "TISE_NORMAL_PAQ",
                "unidad": arrayunidades,
                "documentoreferencia": {
                    "tipodocumento": "ORDER",
                    "numerodocumento": product.numerodeaprobacion,
                    "fechadocumento": fechaactual,
                    "numeroreferenciacliente": product.compatible
                }
            }
        }
        /*
  "tipodocumento": "ORDER",
                    "numerodocumento": product.numerodeaprobacion,
                    "fechadocumento": fechaactual,
                    "numeroreferenciacliente": product.compatible
        */

        //console.log("DATOS GUIA : ", requestData);
        //return
        /* Guardar en BD MR */

        let item = {
            remitenteName: remitenteName,
            remitenteSurName: remitenteSurName,
            remitenteCellPhone: remitenteCellPhone,
            remitentePrefix: remitentePrefix,
            remitenteEmail: remitenteEmail,
            remitentePickupAddress: remitentePickupAddress,
            remitenteNit: remitenteNit,
            selectedTipoIdentificacion: selectedTipoIdentificacion,
            destinatarioName: destinatarioName,
            destinatarioSurName: destinatarioSurName,
            destinatarioCellPhone: destinatarioCellPhone,
            destinatarioPrefix: destinatarioPrefix,
            destinatarioEmail: destinatarioEmail,
            destinatarioPickupAddress: destinatarioPickupAddress,
            destinatarioNit: destinatarioNit,
            tipoIdentificacionDesti: tipoIdentificacionDesti,
            unidadesInternas: unidadesInternas,
            quantity: quantity,
            width: width,
            large: large,
            height: height,
            weight: weight,
            forbiddenProduct: forbiddenProduct,
            productReference: productReference,
            declaredValue: parseFloat(declaredValue),
            originDaneCode: originDaneCode + "000",
            destinyDaneCode: destinyDaneCode + "000",
            interCode: "1234",
            channel: channel,
            deliveryCompany,
            criteria,
            description,
            comments,
            paymentType,
            valueCollection,
            requestPickup,
            saleValue: 0

        }

        //console.log("DATOS GUIA : ", item);
        //return

        const config = {
            headers: {
                "Authorization": "$2y$10$hc8dShHM0E71/08Tcjq3nOdq.hCmOcn5mEH5a/UZ9Lk0eBptD8CeG",
                "Content-Type": "application/json" || x < z
            }
        };

        const getRequest = async () => {
            try {
                const response = await axios.post("https://gimcloud.com.co/api/endpoint/10006", requestData, config);

                console.log("MENSAJE : ", response.data);

                if (response.data.remesa) {
                    setClassBtn("deshabilitar btnsesiondespacho");
                    let mensaje = "Generaste una guía de despacho # " + response.data.remesa;
                    setShowModalMensajes(true);
                    setTituloMensajes("Guía de despacho1");
                    setTextoMensajes(mensaje);
                    getGuia(response.data.remesa);
                } else {
                    let mensaje = response.data.mensaje;
                    if (!mensaje) {
                        mensaje = "Error de conexión con TCC";
                    }
                    console.log("GUIA ERROR 2 :", response.data)
                    setShowModalMensajes(true);
                    setTituloMensajes("Guía de despacho2");
                    setTextoMensajes(mensaje);
                    return
                    //getGuia(response.data.remesa);
                }

                //console.log("MENSAJE : ", response.data.mensaje);
                //console.log("REMESA : ", response.data.remesa);
                //console.log("URLENVIO : ", response.data.urlrelacionenvio);
                //console.log("URLREMESA : ", response.data.urlremesa);
                //console.log("URLROTULO : ", response.data.urlrotulos);
                //setShowModalMensajes(true);
            } catch (error) {
                console.error('Errorxx:', error);
            }
        }
        getRequest();

        const getGuia = async (remesa) => {

            let datxxx = '"' + remesa + '"';
            let requestData = {
                "identificacion": nitmr,
                "remesas": [
                    remesa
                ]
            }

            const config = {
                headers: {
                    "Authorization": "$2y$10$hc8dShHM0E71/08Tcjq3nOdq.hCmOcn5mEH5a/UZ9Lk0eBptD8CeG",
                    "Content-Type": "application/json" || x < z
                }
            };

            try {
                const response = await axios.post("https://gimcloud.com.co/api/endpoint/10004", requestData, config);

                //console.log("GUAIXXXX : ", response.data);
                //return
                setVerGuia(response.data.UrlRelacion);
                setVerRotulo(response.data.UrlRotulos);
                sethabiltarBtnGuia("btnverguia2")
                setGenerarBtnGuia("btnverguia")
                grabarGuia(remesa, item, response.data.UrlRelacion, response.data.UrlRotulos);
                urlpdf = response.data.UrlRelacion;
                urltiquete = response.data.UrlRotulos;
                //setShowModalMensajes(true);
            } catch (error) {
                console.error('Errorxx:', error);
            }
        }
    }

    const grabarGuia = (numeroguia, data, dataurlpdf, urlrotulos) => {

        //console.log("DATA : ", data)

        let archivo;
        let URLTIPO = `${URL_BD_MR}1092`;

        // Crear un objeto FormData
        let formData = new FormData();
        // Agregar los demás campos a formData
        let params = {
            idcomprador: product.uidcomprador,
            idproducto: product.idproducto,
            idvendedor: product.uidvendedor,
            fechadeventa: product.fechadeventa,
            numerodeventa: product.numerodeaprobacion,
            numeroguiadespacho: numeroguia,
            nombreimagen1: "Eg6fYMACb.pdf",
            numerodeimagenes: 1,
            imagen1: "",
            remitenteName: remitenteName,
            remitenteSurName: data.remitenteSurName,
            remitenteCellPhone: data.remitenteCellPhone,
            remitentePrefix: data.remitentePrefix,
            remitenteEmail: data.remitenteEmail,
            remitentePickupAddress: data.remitentePickupAddress,
            remitenteNit: data.remitenteNit,
            selectedTipoIdentificacion: data.selectedTipoIdentificacion,
            destinatarioName: data.destinatarioName,
            destinatarioSurName: data.destinatarioSurName,
            destinatarioCellPhone: data.destinatarioCellPhone,
            destinatarioPrefix: data.destinatarioPrefix,
            destinatarioEmail: data.destinatarioEmail,
            destinatarioPickupAddress: data.destinatarioPickupAddress,
            destinatarioNit: data.destinatarioNit,
            tipoIdentificacionDesti: data.tipoIdentificacionDesti,
            urlpdf: dataurlpdf,
            urlrotulos: urlrotulos,
            quantity: data.quantity,
            unidadesInternas: data.unidadesInternas,
            width: data.width,
            large: data.large,
            height: data.height,
            weight: data.weight,
            forbiddenProduct: data.forbiddenProduct,
            productReference: data.productReference,
            declaredValue: data.declaredValue,
            originDaneCode: data.originDaneCode,
            destinyDaneCode: data.destinyDaneCode,
            interCode: data.interCode,
            channel: data.channel,
            deliveryCompany: data.deliveryCompany,
            criteria: data.criteria,
            description: data.description,
            comments: data.comments,
            paymentType: data.paymentType,
            valueCollection: data.valueCollection,
            requestPickup: data.requestPickup,
            adminTransactionData: 0,
            saleValue: data.saleValue,
        }

        //console.log("DATAGUIA : ", params)
        //return

        // Verificar si estás enviando una imagen o un PDF
        // Antes de la solicitud, imprime los datos que estás enviando
        try {
            const grabarImg = async () => {
                try {
                    const res = await axios({
                        method: "post",
                        url: URL_BD_MR + "1092", params
                    });

                    //console.log("PARAMS : ", res.data)

                    if (res.data.type == 1) {
                        //console.log("Guía de despacho creada")
                        //setIsLoading(false);
                        //console.log("OK INGRESO FOTOS : ", response);
                        const crearNotificacionEstado = async () => {
                            const idnotificacion = Math.floor(Math.random() * 10000000);
                            let comentario = 'Guía de despacho para la compra ' + product.numerodeaprobacion + ' esta disponible para su consulta.';

                            let params = {
                                uidusuario: 1652703118227,
                                idnotificacion: idnotificacion,
                                comentario: comentario,
                                estado: 90,
                                ctlrnotificaentrada: 0,
                                ctlrnotificasalida: 0,
                                tiponotificacion: 14,
                            }

                            try {
                                const res = await axios({
                                    method: "post",
                                    url: URL_BD_MR + "167", params
                                });

                                if (res.data.type == 1) {
                                    //console.log("Notificación comprador creada")
                                    //return;
                                    const crearNotificacionUsuario = async () => {

                                        const idnotificacion = Math.floor(Math.random() * 10000000);
                                        let comentario = 'Guía de despacho para la compra ' + product.numerodeaprobacion + ' esta disponible para su consulta.';

                                        let params = {
                                            estado: 0,
                                            uidusuario: product.uidcomprador,
                                            idnotificacion: idnotificacion,
                                            idorigen: product.numerodeaprobacion,
                                            comentario: comentario,
                                            estado: 90,
                                            ctlrnotificaentrada: 0,
                                            ctlrnotificasalida: 0,
                                            tiponotificacion: 14,
                                        }

                                        try {
                                            const res = await axios({
                                                method: "post",
                                                url: URL_BD_MR + "823", params
                                            });

                                            if (res.data.type == 1) {
                                                //console.log("Notificación creada")
                                                //return;

                                                const notificarCorreo = () => {
                                                    let parrafo = 'La guía de despacho para la compra ' + product.numerodeaprobacion + ' esta disponible para su consulta.';
                                                    let texto = 'Compra # ' + product.numerodeaprobacion;
                                                    let imagen = "<p><strong><img src='https://gimcloud.com.co/files/mercadorepuesto/" + product.nombreImagen + "' alt='Mercado Repuesto' height='150 width=150' ></strong>.</p>";

                                                    const requestData = {
                                                        "remitente": datosVendedor.email,
                                                        "asunto": "GUÍA DE DESPACHO DE LA COMPRA",
                                                        "plantilla": "info",
                                                        "to": "Mercado Repuesto",
                                                        "contenido_html": {
                                                            "title": imagen,
                                                            "subtitle": "Guía de despacho generada por TCC, " + dataurlpdf,
                                                            "body": parrafo,
                                                            "tipo": "01"
                                                        }
                                                    };

                                                    //console.log("requestData : ", requestData)
                                                    const config = {
                                                        headers: {
                                                            "Authorization": "$2y$10$hc8dShHM0E71/08Tcjq3nOdq.hCmOcn5mEH5a/UZ9Lk0eBptD8CeG",
                                                            "Content-Type": "application/json" || x < z
                                                        }
                                                    };

                                                    const sendRequest = async () => {
                                                        try {
                                                            const response = await axios.post("https://gimcloud.com.co/api/endpoint/mail", requestData, config);
                                                            console.log(response.data);
                                                            //setShowModalMensajes(true);
                                                        } catch (error) {
                                                            console.error('Errorxx:', error);
                                                        }
                                                    }
                                                    sendRequest();
                                                }
                                                notificarCorreo();

                                                const updateEstadoDespacho = async () => {
                                                    let params = null;

                                                    params = {
                                                        estadoventa: 58,
                                                        id: product.id
                                                    }
                                                    //console.log("PARAMS : ", params)
                                                    try {
                                                        const res = await axios({
                                                            method: "post",
                                                            url: URL_BD_MR + "820", params
                                                        });

                                                        //console.log("PARAMS : ", res.data)

                                                        if (res.data.type == 1) {
                                                            console.log("Estado del despacho actualizado")
                                                        }
                                                    } catch (error) {
                                                        console.error("Error al actualizar estado del despacho", error);

                                                    }
                                                };
                                                updateEstadoDespacho();
                                            }
                                        } catch (error) {
                                            console.error("Error creando Notificación", error);
                                        }
                                    };
                                    crearNotificacionUsuario();

                                }
                            } catch (error) {
                                console.error("Error creando Notificación", error);
                            }
                        };
                        crearNotificacionEstado();


                    } else {
                        console.error("Error creando guía despacho");
                    }
                } catch (error) {
                    console.error("Error en CATCH guía despacho", error);
                }

            };
            grabarImg();

            //console.log("Respuesta del servidor:", response.data); // Esto imprimirá la respuesta del servidor
        } catch (error) {
            console.error("Error al enviar la factura", error);
            // Maneja el error según tus necesidades
        }
    }

    const abrirDestinatario = () => {
        setEditRimitente(true);
        setDatosRimitente(true)
        setAbrirDatosRemitente(false);
    }

    const habilitarDestinatario = () => {
        if (editRimitente) {
            setDatosRimitente(false);
            setAbrirDatosRemitente(true);
        }
        else {
            setAbrirDatosRemitente(true);
            setDatosDestinatario(true)
            setDatosRimitente(false)
            setDatosProducto(false)
            //setDatosAlmacen(false)
        }
    }

    const abrirRemitente = () => {
        setEditDestinatario(true);
        setAbrirDatosDestinatario(false);
        setDatosDestinatario(true)
    }

    const habilitarRemitente = () => {
        if (editDestinatario) {
            setDatosDestinatario(false);
            setAbrirDatosDestinatario(true);
            setDatosAlmacen(true)
        }
        else {
            setAbrirDatosRemitente(true);
            setAbrirDatosProducto(false);
            setDatosDestinatario(false)
            setDatosRimitente(false)
            setDatosProducto(true)
        }
    }

    const abrirProducto = () => {
        setEditProducto(true);
        setAbrirDatosProducto(false);
        setDatosProducto(true)
    }

    const habilitarProducto = () => {
        if (editProducto) {
            setDatosProducto(false);
            setAbrirDatosProducto(true);
            setDatosAlmacen(true)
        }
        else {
            setAbrirDatosProducto(true)
            setDatosDestinatario(false)
            setDatosRimitente(false)
            setDatosProducto(false)
            setDatosAlmacen(true)
        }
    }

    const habilitarAlmacen = () => {
        generarGuia();
    }

    /*
setErrorTipoDctoRemitente(false)
                                                                                      
    */
    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">

                    <ModalMensajes
                        shown={showModalMensajes}
                        close={handleModalClose}
                        titulo={tituloMensajes}
                        mensaje={textoMensajes}
                        tipo="error"
                    />
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <div className="textoguiadespacho1">Generar guía de despacho</div>
                        </Grid>
                    </Grid>
                    <div className="modalguiadespacho">
                        {
                            datosRimitente && !abrirDatosRemitente ?
                                <div>
                                    <Grid container>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className="textoguiadespacho">Datos del remitente</div>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Nombre del remitente</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="remitentename"
                                                    className="titulosguiadespacho inputplaceholder"
                                                    type="text"
                                                    value={remitenteName}
                                                    onChange={(e) => setRemitenteName(e.target.value)}
                                                    style={errorNombreRemitente ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Nombre del remitente"

                                                    onInput={(e) => {
                                                        // Permitir solo letras y espacios
                                                        e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                        setErrorNombreRemitente(false);
                                                        // Capitalizar la primera letra de cada palabra
                                                        e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                    }}
                                                />
                                                {errorNombreRemitente && <div className="ErrorRetitorText"> <p>Ingresa un nombre valido!</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Apellido del remitente</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="remitentesurname"
                                                    type="text"
                                                    value={remitenteSurName}
                                                    className="titulosguiadespacho inputplaceholder"
                                                    onChange={(e) => setRemitenteSurName(e.target.value)}
                                                    style={errorApellidoRemitente ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Apellido del remitente"
                                                    maxLength={50}
                                                    onInput={(e) => {
                                                        setErrorApellidoRemitente(false);
                                                        // Permitir solo letras y espacios
                                                        e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                        // Capitalizar la primera letra de cada palabra
                                                        e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                    }}
                                                />
                                                {errorApellidoRemitente && <div className="ErrorRetitorText"> <p>Ingresa un apellido valido!</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Número de teléfono</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="telefonoremitente"
                                                    value={remitenteCellPhone}
                                                    type="text"
                                                    className="titulosguiadespacho inputplaceholder"
                                                    maxLength={16}
                                                    onChange={(e) => setRemitenteCellPhone(e.target.value)}
                                                    style={errorTelefonoRemitente ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Número de teléfono"
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                        setErrorTelefonoRemitente(false);
                                                    }}
                                                />
                                                {errorTelefonoRemitente && <div className="ErrorRetitorText"> <p>Recuerda, El teléfono debe contener solo números</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Email del remitente</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="remitenteemail"
                                                    type="text"
                                                    value={remitenteEmail}
                                                    className="titulosguiadespacho inputplaceholder"
                                                    onChange={(e) => setRemitenteEmail(e.target.value)}
                                                    style={errorEmailRemitente ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Email del remitente"
                                                    maxLength={100}
                                                    onInput={(e) => {
                                                        setErrorEmailRemitente(false);
                                                        // Permitir solo letras y espacios
                                                        //e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                        // Capitalizar la primera letra de cada palabra
                                                        //e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                    }}
                                                />
                                                {errorEmailRemitente && <div className="ErrorRetitorText"> <p>Ingresa un email valido!</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Ciudad remitente</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div
                                                style={errorCiudadRemitente ? { border: '1px solid red', borderRadius: '10px', width: '230px' } : { width: '230px' }}
                                                onClick={() => setErrorCiudadRemitente(false)
                                                }
                                            >
                                                <Autocomplete
                                                    labelId="ciudad-remite"
                                                    id="ciudad-remite"
                                                    name="ciudadremite"
                                                    value={ciudadOrigen}
                                                    className="inputselectciudadremite"
                                                    onChange={(event, newValue) => {
                                                        handleChangeCiudadRemite(newValue);
                                                    }}
                                                    options={listaCiudades}
                                                    getOptionLabel={(option) => option.label}
                                                    ListboxProps={{
                                                        sx: { fontSize: 16, color: '#2D2E83' },
                                                    }}
                                                    sx={{
                                                        // border: "1px solid blue",
                                                        "& .MuiOutlinedInput-root": {
                                                            // border: "1px solid yellow",
                                                            borderRadius: "0",
                                                            padding: "0",
                                                            fontSize: "16"
                                                        },
                                                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                                            border: "none",

                                                        }
                                                    }}
                                                    hiddenLabel="true"
                                                    renderInput={(params) =>
                                                        <TextField {...params}
                                                            placeholder="Seleccione ciudad"
                                                            size="small"
                                                            margin="none"
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                style: {
                                                                    fontSize: 15,
                                                                    color: " #2D2E83",
                                                                    fontWeight: '500',
                                                                    textAlign: 'right',
                                                                    //border: "1px solid red"
                                                                },
                                                            }}
                                                        />}
                                                />

                                            </div>
                                            {errorCiudadRemitente &&
                                                <div className="ErrorRetitorTextCuatro">
                                                    <p>Recuerda, debes elegir una ciudad</p>
                                                </div>}
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Dirección del remitente</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="remitenteaddress"
                                                    type="text"
                                                    value={remitentePickupAddress}
                                                    className="titulosguiadespacho inputplaceholder"
                                                    onChange={(e) => setRemitentePickupAddress(e.target.value)}
                                                    style={errorDireccionRemitente ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Dirección del remitente"
                                                    maxLength={100}
                                                    onInput={(e) => {
                                                        setErrorDireccionRemitente(false);
                                                        // Permitir solo letras y espacios
                                                        //e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                        // Capitalizar la primera letra de cada palabra
                                                        //e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                    }}
                                                />
                                                {errorDireccionRemitente && <div className="ErrorRetitorText"> <p>Ingresa una dirección valida!</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Tipo de identificación</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div
                                                style={errorTipoDctoRemitente ? { border: '1px solid red', borderRadius: '10px', width: '230px' } : { width: '230px' }}
                                                onClick={() => setErrorTipoDctoRemitente(false)
                                                }
                                            >
                                                <Autocomplete
                                                    labelId="tipoidentificacion-remite"
                                                    id="tipoidentificacion-remite"
                                                    name="tipoidentificacionremite"
                                                    value={selectTipoIdentificacion}
                                                    className="inputselectciudadremite"
                                                    onChange={(event, newValue) => {
                                                        handleSelectTipoIdentificacion(newValue);
                                                    }}
                                                    options={tipoIdentificacion}
                                                    ListboxProps={{
                                                        sx: { fontSize: 16, color: '#2D2E83' },
                                                    }}
                                                    getOptionLabel={(option) => option.descripcion}
                                                    sx={{
                                                        // border: "1px solid blue",
                                                        "& .MuiOutlinedInput-root": {
                                                            // border: "1px solid yellow",
                                                            borderRadius: "0",
                                                            padding: "0"
                                                        },
                                                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                                            border: "none"
                                                        }
                                                    }}
                                                    hiddenLabel="true"
                                                    renderInput={(params) =>
                                                        <TextField {...params}
                                                            placeholder="Tipo de identificación"
                                                            size="small"
                                                            margin="none"
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                style: {
                                                                    fontSize: "15px",
                                                                    color: " #2D2E83",
                                                                    fontWeight: '500',
                                                                    textAlign: 'right',
                                                                    //border: "1px solid red"
                                                                },
                                                            }}
                                                        />}
                                                />

                                            </div>
                                            {errorTipoDctoRemitente &&
                                                <div className="ErrorRetitorTextCuatro">
                                                    <p>Recuerda, debes elegir un tipo de identificación</p>
                                                </div>}
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Número identificación</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="identificacion"
                                                    type="text"
                                                    value={remitenteNit}
                                                    className="titulosguiadespacho inputplaceholder"
                                                    maxLength={16}
                                                    onChange={(e) => setRemitenteNit(e.target.value)}
                                                    style={errorNumeroDctoRemitente ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Número de identificación"
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                        setErrorNumeroDctoRemitente(false)
                                                    }}
                                                />
                                                {errorNumeroDctoRemitente && <div className="ErrorRetitorText"> <p>Recuerda, El documento debe contener solo números, longitud minima de 6 y maximo de 10</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} md={3} lg={3}></Grid>
                                        {
                                            /*
<Grid item xs={12} md={4} lg={4}>
                                            <div className="btnotrometodo"
                                                onClick={() => handleChangeRemitente()}
                                            >
                                                Continuar a datos del destinatario
                                            </div>
                                        </Grid>
                                        
                                            */
                                        }
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div className="btnotrometodo"
                                                onClick={() => handleChangeDestinatario()}
                                            >Continuar a datos del producto</div>
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <br />
                                    <br />
                                </div>
                                : abrirDatosRemitente ?
                                    <Grid container>
                                        <Grid item xs={12} md={3} lg={3}></Grid>
                                        <Grid item xs={12} md={3} lg={3}>
                                            <div className={classBtn}
                                                onClick={() => abrirDestinatario()}
                                            >
                                                Abrir datos del remitente
                                            </div>
                                        </Grid>

                                    </Grid>
                                    :
                                    null
                        }

                        {
                            datosDestinatario && !abrirDatosDestinatario ?
                                <div>
                                    <Grid container>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className="textoguiadespacho">Datos del destinatario</div>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Nombre del destinatario</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="destinatarioname"
                                                    className="titulosguiadespacho inputplaceholder"
                                                    type="text"
                                                    value={destinatarioName}
                                                    onChange={(e) => setDestinatarioName(e.target.value)}
                                                    style={errorNombreDestinatario ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Nombre del destinatario"

                                                    onInput={(e) => {
                                                        // Permitir solo letras y espacios
                                                        setErrorNombreDestinatario(false);
                                                        e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                        // Capitalizar la primera letra de cada palabra
                                                        e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                    }}
                                                />
                                                {errorNombreDestinatario && <div className="ErrorRetitorText"> <p>Ingresa un nombre valido!</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Apellido del destinatario</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="destinatariosurname"
                                                    type="text"
                                                    value={destinatarioSurName}
                                                    className="titulosguiadespacho inputplaceholder"
                                                    onChange={(e) => setDestinatarioSurName(e.target.value)}
                                                    style={errorApellidoDestinatario ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Apellido del destinatario"
                                                    maxLength={50}
                                                    onInput={(e) => {
                                                        setErrorApellidoDestinatario(false);
                                                        // Permitir solo letras y espacios
                                                        e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                        // Capitalizar la primera letra de cada palabra
                                                        e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                    }}
                                                />
                                                {errorApellidoDestinatario && <div className="ErrorRetitorText"> <p>Ingresa un apellido valido!</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Número de teléfono</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="telefonodestinatario"
                                                    type="text"
                                                    value={destinatarioCellPhone}
                                                    className="titulosguiadespacho inputplaceholder"
                                                    maxLength={16}
                                                    onChange={(e) => setDestinatarioCellPhone(e.target.value)}
                                                    style={errorTelefonoDestinatario ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Número de identificación"
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                        setErrorTelefonoDestinatario(false);
                                                    }}
                                                />
                                                {errorTelefonoDestinatario && <div className="ErrorRetitorText"> <p>Recuerda, El teléfono debe contener solo números</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Email del destinatario</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="destinatarioemail"
                                                    type="text"
                                                    value={destinatarioEmail}
                                                    className="titulosguiadespacho inputplaceholder"
                                                    onChange={(e) => setDestinatarioEmail(e.target.value)}
                                                    style={errorEmailDestinatario ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Email del destinatario"
                                                    maxLength={100}
                                                    onInput={(e) => {
                                                        setErrorEmailDestinatario(false);
                                                        // Permitir solo letras y espacios
                                                        //e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                        // Capitalizar la primera letra de cada palabra
                                                        //e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                    }}
                                                />
                                                {errorEmailDestinatario && <div className="ErrorRetitorText"> <p>Ingresa un email valido!</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Ciudad destinatario</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>

                                            <div
                                                style={errorCiudadDestinatario ? { border: '1px solid red', borderRadius: '10px', width: '230px' } : { width: '230px' }}
                                                onClick={() => setErrorCiudadDestinatario(false)
                                                }
                                            >
                                                <Autocomplete
                                                    labelId="ciudad-remite"
                                                    id="ciudad-remite"
                                                    name="ciudadremite"
                                                    value={ciudadDestino}
                                                    className="inputselectciudadremite"
                                                    onChange={(event, newValue) => {
                                                        handleChangeCiudadDestino(newValue);
                                                    }}
                                                    options={listaCiudades}
                                                    getOptionLabel={(option) => option.label}
                                                    ListboxProps={{
                                                        sx: { fontSize: 16, color: '#2D2E83' },
                                                    }}
                                                    sx={{
                                                        // border: "1px solid blue",
                                                        "& .MuiOutlinedInput-root": {
                                                            // border: "1px solid yellow",
                                                            borderRadius: "0",
                                                            padding: "0",
                                                            fontSize: "16"
                                                        },
                                                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                                            border: "none"
                                                        }
                                                    }}
                                                    hiddenLabel="true"
                                                    renderInput={(params) =>
                                                        <TextField {...params}
                                                            placeholder="Seleccione ciudad"
                                                            size="small"
                                                            margin="none"
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                style: {
                                                                    fontSize: 15,
                                                                    color: " #2D2E83",
                                                                    fontWeight: '500',
                                                                    textAlign: 'right',
                                                                    //border: "1px solid red"
                                                                },
                                                            }}
                                                        />}
                                                />
                                            </div>
                                            {errorCiudadDestinatario &&
                                                <div className="ErrorRetitorTextCuatro">
                                                    <p>Recuerda, debes elegir una ciudad</p>
                                                </div>}
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Dirección del destinatario</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="destinatarioaddress"
                                                    type="text"
                                                    value={destinatarioPickupAddress}
                                                    className="titulosguiadespacho inputplaceholder"
                                                    onChange={(e) => setDestinatarioPickupAddress(e.target.value)}
                                                    style={errorDireccionDestinatario ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Dirección del destinatario"
                                                    maxLength={100}
                                                    onInput={(e) => {
                                                        setErrorDireccionDestinatario(false);
                                                        // Permitir solo letras y espacios
                                                        //e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                        // Capitalizar la primera letra de cada palabra
                                                        //e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                    }}
                                                />
                                                {errorDireccionDestinatario && <div className="ErrorRetitorText"> <p>Ingresa una dirección valido!</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Tipo de identificación</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div
                                                style={errorTipoDctoDestinatario ? { border: '1px solid red', borderRadius: '10px', width: '230px' } : { width: '230px' }}
                                                onClick={() => setErrorTipoDctoDestinatario(false)
                                                }
                                            >
                                                <Autocomplete
                                                    labelId="tipoidentificacion-destino"
                                                    id="tipoidentificacion-destino"
                                                    name="tipoidentificaciondestino"
                                                    value={selectTipoIdentificacionDesti}
                                                    className="inputselectciudadremite"
                                                    onChange={(event, newValue) => {
                                                        handleTipoIdentificacionDesti(newValue);
                                                    }}
                                                    options={tipoIdentificacion}
                                                    ListboxProps={{
                                                        sx: { fontSize: 16, color: '#2D2E83' },
                                                    }}
                                                    getOptionLabel={(option) => option.descripcion}
                                                    sx={{
                                                        // border: "1px solid blue",
                                                        "& .MuiOutlinedInput-root": {
                                                            // border: "1px solid yellow",
                                                            borderRadius: "0",
                                                            padding: "0"
                                                        },
                                                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                                            border: "none"
                                                        }
                                                    }}
                                                    hiddenLabel="true"
                                                    renderInput={(params) =>
                                                        <TextField {...params}
                                                            placeholder="Tipo de identificación"
                                                            size="small"
                                                            margin="none"
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                style: {
                                                                    fontSize: "15px",
                                                                    color: " #2D2E83",
                                                                    fontWeight: '500',
                                                                    textAlign: 'right',
                                                                    //border: "1px solid red"
                                                                },
                                                            }}
                                                        />}
                                                />

                                            </div>
                                            {errorTipoDctoDestinatario &&
                                                <div className="ErrorRetitorTextCuatro">
                                                    <p>Recuerda, debes elegir un tipo de identificación</p>
                                                </div>}
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Número de identificación</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="identificaciondesti"
                                                    type="text"
                                                    className="titulosguiadespacho inputplaceholder"
                                                    maxLength={16}
                                                    value={destinatarioNit}
                                                    onChange={(e) => setDestinatarioNit(e.target.value)}
                                                    style={errorNumeroDctoDestinatario ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Número de identificación"
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                        setErrorNumeroDctoDestinatario(false)
                                                    }}
                                                />
                                                {errorNumeroDctoDestinatario && <div className="ErrorRetitorText"> <p>Recuerda, El documento debe contener solo números, longitud minima de 6 y maximo de 10</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} md={3} lg={3}></Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div className="btnotrometodo"
                                                onClick={() => handleChangeDestinatario()}
                                            >Continuar a datos del producto</div>
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <br />
                                    <br />
                                </div>
                                : abrirDatosDestinatario ?
                                    <Grid container>
                                        <Grid item xs={12} md={3} lg={3}></Grid>
                                        <Grid item xs={12} md={3} lg={3}>
                                            <div className={classBtn}
                                                onClick={() => abrirRemitente()}
                                            >
                                                Abrir datos del destinatario
                                            </div>
                                        </Grid>
                                    </Grid>
                                    :
                                    null
                        }

                        {
                            datosProducto && !abrirDatosProducto ?
                                <div>
                                    <Grid container>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className="textoguiadespacho">Datos del producto</div>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Cantidad de cajas</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="quantity"
                                                    type="text"
                                                    value={quantity}
                                                    className="titulosguiadespacho inputplaceholder"
                                                    maxLength={16}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                    style={errorCantidad ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Número de cajas"
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                        setErrorCantidad(false)
                                                    }}
                                                />
                                                {errorCantidad && <div className="ErrorRetitorText"> <p>Recuerda, la cantidad debe contener solo números.</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Unidades por Caja</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="unidadesInternas"
                                                    type="text"
                                                    value={unidadesInternas}
                                                    className="titulosguiadespacho inputplaceholder"
                                                    maxLength={16}
                                                    onChange={(e) => setUnidadesInternas(e.target.value)}
                                                    style={errorCajas ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Número de unidades por caja"
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                        setErrorCajas(false)
                                                    }}
                                                />
                                                {errorCajas && <div className="ErrorRetitorText"> <p>Recuerda, número de cajas debe contener solo números.</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>


                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Ancho del paquete en cm</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="ancho"
                                                    type="text"
                                                    value={width}
                                                    className="titulosguiadespacho inputplaceholder"
                                                    maxLength={16}
                                                    onChange={(e) => setWidth(e.target.value)}
                                                    style={errorAncho ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Ancho del paquete"
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                        setErrorAncho(false);
                                                    }}
                                                />
                                                {errorAncho && <div className="ErrorRetitorText"> <p>Recuerda, solo números</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Largo del paquete en cm</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="ancho"
                                                    type="text"
                                                    value={large}
                                                    className="titulosguiadespacho inputplaceholder"
                                                    maxLength={16}
                                                    onChange={(e) => setLarge(e.target.value)}
                                                    style={errorLargo ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Largo del paquete"
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                        setErrorLargo(false);
                                                    }}
                                                />
                                                {errorLargo && <div className="ErrorRetitorText"> <p>Recuerda, solo números</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Alto del paquete en cm</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="alto"
                                                    type="text"
                                                    value={height}
                                                    className="titulosguiadespacho inputplaceholder"
                                                    maxLength={16}
                                                    onChange={(e) => setHeight(e.target.value)}
                                                    style={errorAlto ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Alto del paquete"
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                        setErrorAlto(false)
                                                    }}
                                                />
                                                {errorAlto && <div className="ErrorRetitorText"> <p>Recuerda, solo números</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Peso del paquete en cm</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="peso"
                                                    type="text"
                                                    value={weight}
                                                    className="titulosguiadespacho inputplaceholder"
                                                    maxLength={16}
                                                    onChange={(e) => setWeight(e.target.value)}
                                                    style={errorPeso ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Peso del paquete"
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                        setErrorPeso(false)
                                                    }}
                                                />
                                                {errorPeso && <div className="ErrorRetitorText"> <p>Recuerda, solo números</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Valor declarado</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="valor"
                                                    type="text"
                                                    value={declaredValue}
                                                    className="titulosguiadespacho inputplaceholder"
                                                    maxLength={16}
                                                    onChange={(e) => setDeclaredValue(e.target.value)}
                                                    style={errorValor ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Valor declarado"
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                        setErrorValor(false)
                                                    }}
                                                />
                                                {errorValor && <div className="ErrorRetitorText"> <p>Recuerda, solo números</p></div>}
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <div className="textotipodcto">Comentarios</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div>
                                                <input
                                                    autoComplete="off"
                                                    name="comentarios"
                                                    type="text"
                                                    value={comments}
                                                    className="titulosguiadespacho inputplaceholder"
                                                    onChange={(e) => setComments(e.target.value)}
                                                    //style={errorNombreTitular ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                    placeholder="Comentarios"
                                                    maxLength={50}
                                                    onInput={(e) => {
                                                        // Permitir solo letras y espacios
                                                        e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                        // Capitalizar la primera letra de cada palabra
                                                        //e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                    }}
                                                />
                                                {
                                                    //errorNombreTitular && <div className="ErrorRetitorText"> <p>Aqui puedes imgresar tus comentarios</p></div>
                                                }
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} md={3} lg={3}></Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div className="btnotrometodo"
                                                onClick={() => handleChangeProducto()}
                                            >validar datos del producto</div>
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <br />
                                    <br />
                                </div>
                                : abrirDatosProducto ?
                                    <Grid container>
                                        <Grid item xs={12} md={3} lg={3}></Grid>
                                        <Grid item xs={12} md={3} lg={3}>
                                            <div className={classBtn}
                                                onClick={() => abrirProducto()}
                                            >
                                                Abrir datos del producto
                                            </div>
                                        </Grid>
                                    </Grid>
                                    :
                                    null
                        }

                        {
                            datosAlmacen ?
                                <div>

                                    <Grid container>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className="textoguiadespacho">Ya puedes generar la Guía de despacho</div>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={3} lg={3}></Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div className={generarBtnGuia}
                                                onClick={() => handleChangeAlmacen()}
                                            >Generar guía</div>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={3} lg={3}></Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div className={habiltarBtnGuia}>
                                                <a href={verGuia}>
                                                    Ver guía despacho
                                                </a>
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} md={3} lg={3}></Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div className={habiltarBtnGuia}>
                                                <a href={verRotulo}>
                                                    Ver o descargar etiqueta
                                                </a>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                                :
                                null
                        }
                    </div>
                </Container >
            </div >
        </>
    )
}
