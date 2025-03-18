import Container from "../../components/layouts/Container";
import {
    Grid,
    useMediaQuery,
    useTheme,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Modal
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { GrNext } from "react-icons/gr";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { IoIosInformationCircle } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { PiSquareThin } from "react-icons/pi";
import ModalMensajes from "../mensajes/ModalMensajes";
import ModalMensajesConfirmarMsj from "../mensajes/ModalMensajesConfirmarMsj";
import ModalMensajesConfirmarEliminar from "../mensajes/ModalMensajesConfirmarEliminar";
import shortid from "shortid";
import { FaCheckCircle } from "react-icons/fa";
import { URL_IMAGES_RESULTSSMS } from "../../helpers/Constants";
import { TfiEye } from "react-icons/tfi";
import { getUserMenuPrimary } from "../../store/usermenuprimary/action";
import { useDispatch, useSelector } from "react-redux";
import GenerarGuiaDespacho from "./GenerarGuiaDespacho";
import Moment from "moment";

export default function verVenta() {
    //ModalDatosGUardados
    const dispatch = useDispatch();
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    //mostrarModaldeConfirmación
    const handleConfirmationOpen = () => {
        setConfirmationOpen(true);
    };
    //router push si los datos son colocados correctamente sale esto en el dialog
    const handleConfirmationSuccess = (route) => () => {
        router.push(route);
    };

    const [showModal, setShowModal] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    //NextRouter
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const irA = useRef(null); //PosiciónTopPage
    const [selectedFile, setSelectedFile] = useState();
    const fileInput = useRef(null);
    const maxImageSize = 819200; // 800 KB en bytes
    const maxImageWidth = 1024;
    const maxImageHeight = 1024;
    const [showModal2, setShowModal2] = useState(false);
    const [buttonText, setButtonText] = useState("Adjuntar factura");
    const [controlMsj, setControlMsj] = useState([]); // Estado para almacenar el nombre de la imagen
    const [imageName, setImageName] = useState("");
    const [extension, setExtension] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPDF, setSelectedPDF] = useState(null);
    const [selectedPDFDos, setSelectedPDFDos] = useState(null);
    const [tipoFile, setTipoFile] = useState(null);
    const [guiaDespacho, setGuiaDespacho] = useState(null);

    const [tituloMensajesConfirmar, setTituloMensajesConfirmar] = useState(false);
    const [textoMensajesConfirmar, setTextoMensajesConfirmar] = useState(false);
    const [showModalMensajesConfirmar, setShowModalMensajesConfirmar] =
        useState(false);
    const [continuarConfirmar, setContinuarConfirmar] = useState(false);
    const [abandonarConfirmar, setAbandonarConfirmar] = useState(false);
    const [pdfGuiaDespacho, setPdfGuiaDespacho] = useState("");
    const [pdfGuiaEtiqueta, setPdfGuiaEtiqueta] = useState("");
    const [numeroGuiaDespacho, setNumeroGuiaDespacho] = useState(0);
    const [modalGuiaDespacho, setModalGuiaDespacho] = useState(false);
    const [estadoDespacho, setEstadoDespacho] = useState(null);
    const [fechaDespacho, setFechaDespacho] = useState(null);

    const [emailComprador, setEmailComprador] = useState(null);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const handleGuiaDespacho = () => setModalGuiaDespacho(false);

    //recibir los datos del producto comprado y guardar url para cuando reinicie seguir en el mismo
    let venta = null;
    let contmensajes = [];

    if (typeof window !== "undefined") {
        const prdunicos = JSON.parse(localStorage.getItem("prdunicos"));
        const arrayprd = JSON.parse(localStorage.getItem("arrayprd"));


        if (router.query.venta) {
            venta = JSON.parse(router.query.venta);
            //Guardar los datos en el almacenamiento local
            //console.log("VENTA XXX: ", venta);
            localStorage.setItem("venta", JSON.stringify(venta));
        } else {
            // Recuperar los datos del almacenamiento local
            const data = localStorage.getItem("venta");
            if (data) {
                venta = JSON.parse(data);
            }
        }

        //console.log("VENTAXXX : ", venta);
        prdunicos &&
            prdunicos.map((item) => {
                let contador = 0;
                arrayprd &&
                    arrayprd.map((row) => {
                        if (
                            item == row.idmicompra &&
                            row.mensajeleidovendedor == 0
                        ) {
                            contador = contador + 1;
                        }
                    });
                let det = {
                    idmicompra: item,
                    mensajes: contador,
                };

                contmensajes.push(det);
            });
        //console.log("NUM MENSAJE : ", contmensajes);
    }

    const generarDespacho = (data) => {
        router.push({
            pathname: "./GenerarGuiaDespacho",
            query: {
                product: JSON.stringify(
                    venta
                ),
            },
        })
    }

    useEffect(() => {
        dispatch(getUserMenuPrimary(false));
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    useEffect(() => {
        if (venta) {
            let facturasvtaprd = [];

            const leerDataUser = async () => {
                let params = {
                    usuario: venta && venta?.uidcomprador,
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                })
                    .then((res) => {
                        console.log("DATOS COMPRA : ", res.data[0].email);
                        setEmailComprador(res.data[0].email);
                    })
                    .catch(function (error) {
                        console.log("Error leyendo datos usuario");
                    });
            };
            leerDataUser();

            const leerfacturaDeLaVenta = async () => {
                let params = {
                    numerodeventa: venta?.numerodeaprobacion
                }

                try {
                    const res = await axios({
                        method: "post",
                        url: URL_BD_MR + "1101", params
                    });

                    if (res.data.type == 1) {
                        if (res.data.listarcontguiadespacho.length > 0) {
                            //console.log("DAGUIADESPACHO : ", res.data.listarcontguiadespacho);
                            setPdfGuiaDespacho(res?.data?.listarcontguiadespacho[0]?.urlpdf);
                            setPdfGuiaEtiqueta(res.data.listarcontguiadespacho[0]?.urlrotulos);
                            //setPdfGuiaDespacho(res.data.listarcontguiadespacho[0].pdfguiadespacho);
                            setNumeroGuiaDespacho(res?.data?.listarcontguiadespacho[0]?.numeroguiadespacho);
                            ///setEstadoDespacho(res?.data?.listarcontguiadespacho[0]?.estadodeldespacho);
                        }
                    }
                } catch (error) {
                    console.error("Error al leer los datos", error);
                }
            };
            leerfacturaDeLaVenta();
        }

        const leeGuiaDespacho = async () => {
            let params = {
                numerodeventa: venta?.numerodeaprobacion
            }

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "1101", params
                });

                if (res.data.type == 1) {
                    if (res.data.listarcontguiadespacho.length > 0) {
                        //console.log("DATAGUIA : ", res.data.listarcontguiadespacho);

                        setGuiaDespacho(res.data.listarcontguiadespacho[0].urlpdf);
                        //setEstadofactura(res.data.listarcontguiadespacho[0].estadodelafactura)
                        setEstadoDespacho(res?.data?.listarcontguiadespacho[0]?.estadodeldespacho);
                        setFechaDespacho(res?.data?.listarcontguiadespacho[0]?.fechadespacho);
                    }
                }
            } catch (error) {
                console.error("Error al leer datos de la guía", error);
            }
        };
        leeGuiaDespacho();
    }, [venta])

    useEffect(() => {
        if (continuarConfirmar) {
            generarDespacho();
            /*
            setShowModal(true);
            setTituloMensajes("Guía generada");
            let textoguia = "Tu guía de despacho para la venta " + venta?.numerodeaprobacion + " es la N. 04908761 "
            setTextoMensajes(textoguia);

            */
            //grabarGuia();
        }
    }, [continuarConfirmar]);

    const grabarGuia = () => {
        let archivo;
        let URLTIPO = `${URL_BD_MR}1092`;

        // Crear un objeto FormData
        let formData = new FormData();
        // Agregar los demás campos a formData
        formData.append("idcomprador", venta?.uidcomprador);
        formData.append("idproducto", venta?.idproducto);
        formData.append("idvendedor", venta?.uidvendedor);
        formData.append("fechadeventa", venta?.fechadeventa);
        formData.append("numerodeventa", venta?.numerodeaprobacion);
        formData.append("numeroguiadespacho", "045678901");
        formData.append("nombreimagen1", "Eg6fYMACb.pdf");
        formData.append("numerodeimagenes", 1);
        formData.append("imagen1", archivo);

        // Verificar si estás enviando una imagen o un PDF

        // Antes de la solicitud, imprime los datos que estás enviando
        try {

            const grabarImg = async () => {
                await fetch(`${URLTIPO}`, {
                    method: "POST",
                    body: formData,
                    //headers: headers,
                }).then((response) => {
                    //setIsLoading(false);
                    if (response) {
                        //console.log("OK INGRESO FOTOS : ", response);
                        const crearNotificacionEstado = async () => {
                            const idnotificacion = Math.floor(Math.random() * 10000000);
                            let comentario = 'Guía de despacho para la compra ' + venta?.numerodeaprobacion + ' esta disponible para su consulta.';

                            let params = {
                                uidusuario: 1652703118227,
                                idnotificacion: idnotificacion,
                                comentario: comentario,
                                estado: 90,
                                ctlrnotificaentrada: 0,
                                ctlrnotificasalida: 0,
                                tiponotificacion: 2,
                            }

                            try {
                                const res = await axios({
                                    method: "post",
                                    url: URL_BD_MR + "167", params
                                });

                                if (res.data.type == 1) {
                                    console.log("Notificación comprador creada")
                                    //return;
                                    const crearNotificacionUsuario = async () => {

                                        const idnotificacion = Math.floor(Math.random() * 10000000);
                                        let comentario = 'Guía de despacho para la compra ' + venta?.numerodeaprobacion + ' esta disponible para su consulta.';

                                        let params = {
                                            estado: 0,
                                            idorigen: venta?.numerodeaprobacion,
                                            uidusuario: venta?.uidcomprador,
                                            idnotificacion: idnotificacion,
                                            comentario: comentario,
                                            estado: 90,
                                            ctlrnotificaentrada: 0,
                                            ctlrnotificasalida: 0,
                                            tiponotificacion: 1,
                                        }

                                        try {
                                            const res = await axios({
                                                method: "post",
                                                url: URL_BD_MR + "823", params
                                            });

                                            if (res.data.type == 1) {
                                                console.log("Notificación creada")
                                                //return;

                                                const notificarCorreo = () => {
                                                    let parrafo = 'La guía de despacho para la compra ' + venta?.numerodeaprobacion + ' esta disponible para su consulta.';
                                                    let texto = 'Compra # ' + venta?.numerodeaprobacion;

                                                    const requestData = {
                                                        "remitente": emailComprador,
                                                        "asunto": "Guía de despacho",
                                                        "plantilla": "info",
                                                        "to": "Mercado Repuesto",
                                                        "contenido_html": {
                                                            "title": texto,
                                                            "subtitle": "Guía de despacho generada por TCC",
                                                            "body": parrafo,
                                                            "tipo": "13"
                                                        }
                                                    };

                                                    console.log("requestData : ", requestData)

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
                                                            setShowModal(true);
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
                                                        id: venta?.id
                                                    }
                                                    //console.log("PARAMS : ", params)
                                                    try {
                                                        const res = await axios({
                                                            method: "post",
                                                            url: URL_BD_MR + "820", params
                                                        });

                                                        console.log("PARAMS : ", res.data)

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

                        console.log("ERROR, INGRESO FOTOS : ", response);
                    }
                });
            };
            grabarImg();

            //console.log("Respuesta del servidor:", response.data); // Esto imprimirá la respuesta del servidor
        } catch (error) {
            console.error("Error al enviar la factura", error);
            // Maneja el error según tus necesidades
        }
    }

    //cerrar modal si no hay nada en el input
    const handleModalClose = () => {
        setShowModal(false);
    };
    // En tu estado del componente, añade una nueva variable para el archivo
    const [userFile, setUserFile] = useState(null);

    const changeHandler = async (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        setSelectedPDFDos(event.target.files[0]);

        reader.onloadend = () => {
            // Convertir la imagen a base64
            const base64Image = reader.result;

            // Generar un ID único para la imagen
            let uniqueImageName = shortid.generate();
            uniqueImageName = uniqueImageName.substring(0, 11);

            let extension =
                "." +
                base64Image.substring(
                    base64Image.indexOf("/") + 1,
                    base64Image.indexOf(";base64")
                );
            setExtension(extension);

            if (file.type === "application/pdf") {
                const blob = new Blob([file], { type: "application/pdf" });
                setUserFile(blob);
                setSelectedPDF(event.target.files[0]);
                setTipoFile(2);
            } else {
                setSelectedImage(base64Image);
                setTipoFile(1);
            }
        };

        if (file) {
            let maxSize = maxImageSize; // 800 KB para imágenes

            // Permitir hasta 1 MB para archivos PDF
            if (file.type === "application/pdf") {
                maxSize = 1048576; // 1 MB en bytes
            }

            if (file.size > maxSize) {
                setShowModal(true);
                setTituloMensajes("Tamaño incorrecto");
                setTextoMensajes(
                    file.type === "application/pdf"
                        ? "Los archivos PDF deben pesar máximo 1 MB."
                        : "Las imágenes deben pesar máximo 800 KB."
                );
                return;
            }

            if (file.type !== "application/pdf") {
                const image = new Image();
                image.src = URL.createObjectURL(file);

                // Esperar a que la imagen cargue antes de realizar las validaciones
                await new Promise((resolve) => {
                    image.onload = resolve;
                });

                const imageWidth = image.width;
                const imageHeight = image.height;

                if (
                    imageWidth > maxImageWidth ||
                    imageHeight > maxImageHeight
                ) {
                    setShowModal(true);
                    setTituloMensajes("Dimensiones incorrectas");
                    setTextoMensajes(
                        `Las dimensiones de las imágenes deben ser como máximo ${maxImageWidth} x ${maxImageHeight}.`
                    );
                    return;
                }
            }

            // Si la imagen pasa todas las validaciones, actualiza el estado
            let nombreimagen = shortid();
            //console.log("NombreImagen: ", nombreimagen);
            setImageName(nombreimagen);
            setSelectedFile(URL.createObjectURL(file));
            // Leer la imagen como una URL de datos
            reader.readAsDataURL(file);

            setButtonText("Enviar factura");
        } else {
            setShowModal(true);
            setTituloMensajes("Archivo incorrecto");
            setTextoMensajes("Solo se permiten archivos JPG, JPEG, PNG y PDF.");
        }
        event.target.value = null;
    };

    const handleClick = () => {
        if (buttonText === "Enviar factura") {
            // Muestra el modal de confirmación
            setShowModal2(true);
        } else {
            // Abre el diálogo de selección de archivos
            fileInput.current.click();
        }


    };

    const handleClickGuia = () => {
        setShowModalMensajesConfirmar(true);
        setTituloMensajesConfirmar("Generar guía despacho");
        setTextoMensajesConfirmar("¿Estas seguro de querer generar la guía de despacho?");
    }

    const handleRemoveFile = () => {
        // Elimina la imagen y el PDF y restablece el texto del botón
        setSelectedFile(null);
        setSelectedImage(null);
        setSelectedPDF(null);
        setButtonText("Adjuntar factura");

        // Restablecer el valor del campo de entrada del archivo para permitir la selección del mismo archivo
        fileInput.current.value = null;
    };

    const confirmarEnvio = async () => {
        // Aquí puedes verificar si la factura ya existe

        const facturaExistente = await verificarFacturaExistente();

        // Cierra el modal de confirmación
        setShowModal2(false);

        if (facturaExistente) {
            // Muestra el modal de aviso
            setShowModal(true);
            setTituloMensajes("Factura existente");
            setTextoMensajes(
                "Ya existe una factura para esta venta y no es posible enviar de nuevo."
            );
        } else {
            let archivo;
            let URLTIPO;
            if (tipoFile == 1) {
                archivo = selectedImage;
                URLTIPO = `${URL_BD_MR}109`;
            } else if (tipoFile == 2) {
                archivo = selectedPDFDos;
                URLTIPO = `${URL_BD_MR}1091`;
            }

            // Crear un objeto FormData
            let formData = new FormData();
            // Agregar los demás campos a formData
            formData.append("idcomprador", venta?.uidcomprador);
            formData.append("idproducto", venta?.idproducto);
            formData.append("idvendedor", venta?.uidvendedor);
            formData.append("fechadeventa", venta?.fechadeventa);
            formData.append("numerodeventa", venta?.numerodeaprobacion);
            formData.append("nombreimagen1", imageName + extension);
            formData.append("numerodeimagenes", 1);
            formData.append("imagen1", archivo);

            // Verificar si estás enviando una imagen o un PDF

            // Antes de la solicitud, imprime los datos que estás enviando
            for (let pair of formData.entries()) {
                console.log("DATOS CONT", pair[0] + ", " + pair[1]);
            }

            try {

                const grabarImg = async () => {
                    await fetch(`${URLTIPO}`, {
                        method: "POST",
                        body: formData,
                        //headers: headers,
                    }).then((response) => {
                        //setIsLoading(false);
                        if (response) {
                            console.log("OK INGRESO FOTOS : ", response);

                            const crearNotificacionEstado = async () => {
                                const idnotificacion = Math.floor(Math.random() * 10000000);
                                let comentario = 'Factura de venta, asociada con la compra ' + venta?.numerodeaprobacion + ' ya fue registrada por el vendedor.';

                                let params = {
                                    uidusuario: venta?.uidvendedor,
                                    idnotificacion: idnotificacion,
                                    comentario: comentario,
                                    estado: 90,
                                    ctlrnotificaentrada: 0,
                                    ctlrnotificasalida: 0,
                                    tiponotificacion: 15,
                                }

                                try {
                                    const res = await axios({
                                        method: "post",
                                        url: URL_BD_MR + "167", params
                                    });

                                    if (res.data.type == 1) {
                                        console.log("Notificación comprador creada")
                                        //return;
                                        //Pendiente definir usuarios adicionales para notiticar
                                        //Carga de facturas a MR

                                        const crearNotificacionUsuario = async () => {

                                            const idnotificacion = Math.floor(Math.random() * 10000000);
                                            let comentario = 'Ya esta disponible la factura de compra ' + venta?.numerodeaprobacion + ' esta disponible para su consulta.';

                                            let params = {
                                                estado: 0,
                                                uidusuario: venta?.uidcomprador,
                                                idorigen: venta?.numerodeaprobacion,
                                                idnotificacion: idnotificacion,
                                                comentario: comentario,
                                                estado: 90,
                                                ctlrnotificaentrada: 0,
                                                ctlrnotificasalida: 0,
                                                tiponotificacion: 15,
                                            }

                                            try {
                                                const res = await axios({
                                                    method: "post",
                                                    url: URL_BD_MR + "823", params
                                                });

                                                if (res.data.type == 1) {
                                                    console.log("Notificación creada")
                                                    //return;
                                                }
                                            } catch (error) {
                                                console.error("Error creando Notificación", error);
                                            }
                                        };
                                        crearNotificacionUsuario();

                                        const updateEstadoFactura = async () => {
                                            let params = {
                                                estadofactura: 43,
                                                id: venta?.id
                                            }

                                            try {
                                                const res = await axios({
                                                    method: "post",
                                                    url: URL_BD_MR + "826", params
                                                });

                                                if (res.data.type == 1) {
                                                    console.log("Actualizacion factura OK");
                                                }
                                            } catch (error) {
                                                console.error("Error al actualizar estado factua", error);
                                            }
                                        };
                                        updateEstadoFactura();
                                    }
                                } catch (error) {
                                    console.error("Error creando Notificación", error);
                                }
                            };
                            crearNotificacionEstado();

                        } else {

                            console.log("ERROR, INGRESO FOTOS : ", response);
                        }
                    });
                };
                grabarImg();

                //console.log("Respuesta del servidor:", response.data); // Esto imprimirá la respuesta del servidor

                setConfirmationOpen(true);
                // Restablece el archivo seleccionado y el texto del botón
                setSelectedFile(null);
                setButtonText("Adjuntar factura");
            } catch (error) {
                console.error("Error al enviar la factura", error);
                // Maneja el error según tus necesidades
                if (error.response) {
                    // El servidor respondió con un estado fuera del rango de 2xx
                    console.log(
                        "Datos devueltos por el servidor:",
                        error.response.data
                    );
                    console.log(
                        "Estado devuelto por el servidor:",
                        error.response.status
                    );
                    console.log(
                        "Encabezados devueltos por el servidor:",
                        error.response.headers
                    );
                } else if (error.request) {
                    // La solicitud fue hecha pero no se recibió ninguna respuesta
                    console.log("Solicitud:", error.request);
                } else {
                    // Algo sucedió en la configuración de la solicitud que desencadenó un error
                    console.log("Error:", error.message);
                }
                console.log("Configuración de la solicitud:", error.config);
            }


        }
    };

    //Función para verificar si una factura existe por el numero de venta
    // Función para verificar si una factura existe por el numero de venta
    const verificarFacturaExistente = async () => {
        let params = {
            idvendedor: venta?.uidvendedor,
        };

        const response = await axios({
            method: "post",
            url: URL_BD_MR + "111",
            params,
        });

        const facturas = response?.data?.listarfacturavendedor;

        // Encuentra la factura con el mismo número de venta
        const facturaExistente = facturas?.find(
            (factura) => factura.numerodeventa === venta?.numerodeaprobacion
        );

        // Muestra el nombre de la imagen en la consola
        if (facturaExistente) {
            console.log(facturaExistente.nombreimagen1);
        }

        return facturaExistente;
    };

    // Estado para almacenar si la factura existe
    const [facturaExistente, setFacturaExistente] = useState(false);

    // Verifica si la factura existe cuando el componente se monta
    useEffect(() => {
        const verificarFactura = async () => {
            const existeFactura = await verificarFacturaExistente();
            setFacturaExistente(existeFactura);
        };

        verificarFactura();
    }, []);


    console.log("PROD VENTA : ", venta);
    return (
        <>
            <div ref={irA} >
                {venta ? (
                    <Container title="Mi Cuenta">

                        <ModalMensajesConfirmarEliminar
                            shown={showModalMensajesConfirmar}
                            setShowModalMensajesEliminar={setShowModalMensajesConfirmar}
                            setContinuarEliminar={setContinuarConfirmar}
                            setAbandonarEliminar={setAbandonarConfirmar}
                            titulo={tituloMensajesConfirmar}
                            mensaje={textoMensajesConfirmar}
                            tipo="1"
                        />
                        <div className="ps-page ps-page--inner" id="myaccount">

                            <div className="container">
                                <div className="ps-page__header"> </div>
                                <div
                                    className="ps-page__content ps-account"
                                    style={{ marginBottom: "28rem" }}>
                                    <Grid
                                        className="contDataUsers"
                                        container
                                        style={{
                                            width: isMdDown ? "100%" : "90%",
                                            marginBottom: "4rem",
                                        }}>
                                        <Breadcrumbs
                                            separator={
                                                <GrNext
                                                    style={{ color: "#D9D9D9" }}
                                                    size={17}
                                                />
                                            }
                                            aria-label="breadcrumb">
                                            <Link
                                                className="linkMisv"
                                                underline="none"
                                                href="./"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    router.push("./misVentas");
                                                }}>
                                                <p className="VerVentaLink">
                                                    Mis ventas
                                                </p>
                                            </Link>
                                            <p className="VerVentaLink">
                                                Ver venta
                                            </p>
                                        </Breadcrumbs>
                                    </Grid>
                                    <Grid
                                        className="contDataUsersVerventa"
                                        container
                                        style={{
                                            width: isMdDown ? "100%" : "90%",
                                        }}>
                                        <Grid
                                            item
                                            xs={12}
                                            md={7}
                                            className="misVentasr">
                                            <div>
                                                <p
                                                    style={{
                                                        fontSize: "24px",
                                                        color: "#2D2E83",
                                                        fontWeight: "700",
                                                    }}>
                                                    {venta?.estadodelaventa}{" "}
                                                </p>
                                            </div>
                                            <div
                                                className="subtitlesvercompra"
                                                style={{ display: "flex" }}>
                                                <p>{venta?.nombreProducto} </p>
                                            </div>
                                            <div
                                                className="subtitlesvercompra"
                                                style={{ display: "flex" }}>
                                                <p>Número de venta:</p>
                                                <p>
                                                    {venta?.numerodeaprobacion}
                                                </p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Fecha de venta:</p>
                                                <p>{venta?.fechadeventa}</p>
                                            </div>

                                            <div className="DetalleSEnvioVerVenta">
                                                <div className="detallesypagovercompra2">
                                                    <p>Detalles del envío</p>
                                                </div>
                                                <div className="subtitlesverVenta">
                                                    <p>
                                                        Despacha el paquete en
                                                        los puntos TCC
                                                        autorizados
                                                    </p>
                                                    <div className="divButtonVerVenta">
                                                        {
                                                            numeroGuiaDespacho != 0 ?
                                                                <button>
                                                                    <a
                                                                        //href={`${URL_IMAGES_RESULTSSMS}${pdfGuiaDespacho}`}>
                                                                        href={`${pdfGuiaEtiqueta}`}>
                                                                        Consulta o Descarga Etiqueta
                                                                    </a>
                                                                </button>
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="etiquetaCont">
                                                <div className="etiquetaCont1">
                                                    <div className="etiquetaContIMG">
                                                        <img
                                                            src={`${URL_IMAGES_RESULTS}${venta?.nombreImagen}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="nameVerV">
                                                            {
                                                                venta?.nombreProducto
                                                            }
                                                        </p>
                                                        <p className="unidVend">
                                                            Unidades vendidas:{" "}
                                                            {venta?.cantidad}
                                                        </p>
                                                        <p className="nameVerV2">
                                                            $
                                                            {venta?.total?.toLocaleString(
                                                                "en-US"
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="etiquetaContDetails">
                                                    <p className="etiquetaContDetailsTitle">
                                                        Datos del envío
                                                    </p>
                                                    <p>
                                                        {venta?.direcciondeenvio}
                                                    </p>
                                                    <p>
                                                        {venta?.nombreciudad},{" "}
                                                        {venta?.nombre_dep}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="detallesypagovercompra3">
                                                <div>Facturación</div>
                                            </div>

                                            <div className="DetalleSEnvioVerVenta">

                                                <div className="subtitlesverVenta">
                                                    <div className="divButtonAdjFact2">
                                                        <div className="divButtonVerVenta2">
                                                            <Grid container alignItems="center" spacing={1} className="mtmenos30">
                                                                <Grid item xs={12} md={9} lg={9}>
                                                                </Grid>
                                                                <Grid item xs={12} md={3} lg={3}>
                                                                    {
                                                                        numeroGuiaDespacho == 0 ?
                                                                            <button
                                                                                className="buttnGenerarGuia"
                                                                                onClick={
                                                                                    handleClickGuia
                                                                                }>
                                                                                Generar guía despacho
                                                                            </button>
                                                                            :
                                                                            <div>
                                                                                <div
                                                                                    className="buttnDescargarGuia">
                                                                                    <a
                                                                                        //href={`${URL_IMAGES_RESULTSSMS}${pdfGuiaDespacho}`}>
                                                                                        href={`${pdfGuiaDespacho}`}>
                                                                                        Consulta o Descarga tu Guía N. {numeroGuiaDespacho}
                                                                                    </a>
                                                                                </div>

                                                                            </div>
                                                                    }
                                                                </Grid>
                                                            </Grid>

                                                            {facturaExistente ? (
                                                                <div className="factExistente">
                                                                    <p>
                                                                        Ya
                                                                        tienes
                                                                        una
                                                                        factura
                                                                        para
                                                                        esta
                                                                        venta?.
                                                                    </p>
                                                                    <div className="divIconFact">
                                                                        <PiSquareThin
                                                                            size={
                                                                                138
                                                                            }
                                                                            className="iconFact"
                                                                        />
                                                                        {facturaExistente &&
                                                                            (facturaExistente.nombreimagen1.endsWith(
                                                                                ".pdf"
                                                                            ) ? (
                                                                                <a
                                                                                    className="verPdfMain2"
                                                                                    href={`${URL_IMAGES_RESULTSSMS}${facturaExistente.nombreimagen1}`}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer">
                                                                                    <div className="verPdf">
                                                                                        Ver{" "}
                                                                                        <br />{" "}
                                                                                        PDF
                                                                                    </div>
                                                                                </a>
                                                                            ) : (
                                                                                <div>
                                                                                    <img
                                                                                        src={`${URL_IMAGES_RESULTSSMS}${facturaExistente.nombreimagen1}`}
                                                                                        className="imagenDeFondo"
                                                                                    />
                                                                                    <a
                                                                                        href={`${URL_IMAGES_RESULTSSMS}${facturaExistente.nombreimagen1}`}
                                                                                        target="_blank">
                                                                                        <TfiEye className="iconSeeFact" />
                                                                                    </a>
                                                                                </div>
                                                                            ))}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <Grid container alignItems="center" spacing={1}>
                                                                    <Grid item xs={12} md={9} lg={9}>
                                                                        <button
                                                                            className="buttnVerVentaDos"
                                                                            onClick={
                                                                                handleClick
                                                                            }>
                                                                            {buttonText}
                                                                            <input
                                                                                type="file"
                                                                                accept=".pdf,.png,.jpeg,.jpg"
                                                                                onChange={
                                                                                    changeHandler
                                                                                }
                                                                                style={{
                                                                                    display:
                                                                                        "none",
                                                                                }}
                                                                                ref={
                                                                                    fileInput
                                                                                }
                                                                            />
                                                                        </button>
                                                                    </Grid>

                                                                </Grid>
                                                            )}

                                                            {
                                                                guiaDespacho && facturaExistente ?
                                                                    <div className="mtmenos100">
                                                                        <Grid container alignItems="center" spacing={1}>
                                                                            <Grid item xs={12} md={9} lg={9}>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={3} lg={3}>
                                                                                {
                                                                                    numeroGuiaDespacho == 0 ?
                                                                                        <button
                                                                                            className="buttnGenerarGuia"
                                                                                            onClick={
                                                                                                handleClickGuia
                                                                                            }>
                                                                                            Generar guía despacho
                                                                                        </button>
                                                                                        :
                                                                                        <div
                                                                                            className="buttnRastrearDespacho">
                                                                                            <a
                                                                                                href="https://www.envioclick.com/paqueteria/tcc/rastreo-tcc#:~:text=D%C3%B3nde%20rastrear%20tu%20paquete%20TCC&text=Consulta%20el%20estatus%20de%20tu,introduce%20tu%20n%C3%BAmero%20de%20gu%C3%ADa.&text=Consulta%20el%20n%C3%BAmero%20telef%C3%B3nico%20actualizado,sitio%20web%20de%20la%20paqueter%C3%ADa"
                                                                                            >
                                                                                                Rastrear mi envío
                                                                                            </a>
                                                                                        </div>
                                                                                }
                                                                            </Grid>
                                                                        </Grid>
                                                                    </div>
                                                                    :
                                                                    null
                                                            }

                                                            {selectedFile && (
                                                                <div className="verVentaDoc">
                                                                    <div className="diviconSquareVerventa">
                                                                        <PiSquareThin
                                                                            size={
                                                                                138
                                                                            }
                                                                            className="iconSquareVerventa"
                                                                        />
                                                                        {selectedPDF ? (
                                                                            <a
                                                                                className="verPdfMain"
                                                                                href={
                                                                                    selectedPDF
                                                                                }
                                                                                target="_blank"
                                                                                rel="noopener noreferrer">
                                                                                <div className="verPdf">
                                                                                    Ver
                                                                                    PDF
                                                                                </div>
                                                                            </a>
                                                                        ) : (
                                                                            <img
                                                                                src={
                                                                                    selectedFile
                                                                                }
                                                                                alt="preview"
                                                                                className="imgVerVenta"
                                                                            />
                                                                        )}
                                                                    </div>
                                                                    <div
                                                                        className="diviconCloeseDoc"
                                                                        onClick={
                                                                            handleRemoveFile
                                                                        }>
                                                                        <IoMdClose className="iconCloseVerVenta" />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            md={5}
                                            sx={{ paddingLeft: "4rem" }}>
                                            <div className="misVentasRigt1">
                                                <p>{venta?.estadodelaventa}</p>
                                                <div className="subtitlesveVenta1">
                                                    <p>
                                                        Número aprobación de
                                                        pago:
                                                    </p>
                                                    <p>
                                                        {
                                                            venta?.numerodeaprobacion
                                                        }
                                                    </p>
                                                </div>
                                                <div className="subtitlesveVenta1">
                                                    <p>Fecha de pago:</p>
                                                    <p>{venta?.fechadeventa}</p>
                                                </div>
                                            </div>

                                            <div className="misVentasRigt2">
                                                <div className="subtitlesveVenta1">
                                                    <p>Precio del producto:</p>
                                                    {venta?.preciodeventa !==
                                                        null && (
                                                            <p>
                                                                $
                                                                {venta?.preciodeventa?.toLocaleString(
                                                                    "en-US"
                                                                )}
                                                            </p>
                                                        )}
                                                </div>
                                                <div className="subtitlesveVenta1">
                                                    <p>Precio del envío:</p>
                                                    {venta?.precioenvio !==
                                                        null && (
                                                            <p>
                                                                $
                                                                {venta?.precioenvio?.toLocaleString(
                                                                    "en-US"
                                                                )}
                                                            </p>
                                                        )}
                                                </div>
                                            </div>

                                            <div className="misVentasRigt2">
                                                <div className="subtitlesveVenta1">
                                                    <p>Retención:</p>
                                                    {venta?.retencion !==
                                                        null && (
                                                            <p>
                                                                $
                                                                {venta?.retencion?.toLocaleString(
                                                                    "en-US"
                                                                )}
                                                            </p>
                                                        )}
                                                </div>
                                            </div>

                                            <div className="misVentasRigt2">
                                                <div className="subtitlesveVenta1">
                                                    <p>Impuestos:</p>
                                                    {venta?.impuestos !==
                                                        null && (
                                                            <p>
                                                                $
                                                                {venta?.impuestos?.toLocaleString(
                                                                    "en-US"
                                                                )}
                                                            </p>
                                                        )}
                                                </div>
                                            </div>

                                            <div className="misVentasRigt3">
                                                <div className="subtitlesveVenta1">
                                                    <p>Total:</p>
                                                    <p>
                                                        $
                                                        {venta?.total?.toLocaleString(
                                                            "en-US"
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            {
                                                estadoDespacho == 59 ?
                                                    <div className="subtitlesvercompra iconVerVenta2">
                                                        <IoIosInformationCircle
                                                            className="iconVerVenta"
                                                            size={29}
                                                        />

                                                        <p>
                                                            Este dinero estará
                                                            disponible a partir del: <p>{
                                                                Moment(fechaDespacho).add(3, 'days').format("YYYY-MM-DD")}</p>
                                                        </p>
                                                    </div>
                                                    :
                                                    <p>
                                                    </p>
                                            }
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        className="contDataUsers"
                                        container
                                        style={{
                                            width: isMdDown ? "100%" : "90%",
                                            marginTop: "4rem",
                                        }}>
                                        <Grid
                                            className="ContPsubtitlesvercompra"
                                            item
                                            xs={12}
                                            md={7}></Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            md={5}
                                            sx={{ paddingLeft: "4rem" }}>
                                            <div className="datacomprVerVenta">
                                                <p className="nameVendVer">
                                                    {venta?.nombreComprador}{" "}
                                                    {venta?.apellidoComprador}
                                                </p>

                                                {contmensajes.length > 0 ? (
                                                    <p
                                                        className="nameVendedorMiCompra apuntador subrayartextoclicaqui"
                                                        onClick={() =>
                                                            router.push({
                                                                pathname:
                                                                    "./msjComprador",
                                                                query: {
                                                                    venta: JSON.stringify(
                                                                        venta
                                                                    ),
                                                                },
                                                            })
                                                        }>
                                                        Tienes{" "}
                                                        {contmensajes &&
                                                            contmensajes[0]
                                                                .mensajes}{" "}
                                                        mensajes sin leer
                                                    </p>
                                                ) : (
                                                    <p className="nameVendedorMiCompra">
                                                        Tienes{" "}
                                                        {contmensajes.length >
                                                            0 ? (
                                                            contmensajes[0]
                                                                .mensajes
                                                        ) : (
                                                            <p>
                                                                mensajes sin
                                                                leer
                                                            </p>
                                                        )}
                                                    </p>
                                                )}

                                                <div
                                                    className="divButtonVerVenta3"
                                                    onClick={() =>
                                                        router.push({
                                                            pathname:
                                                                "./msjComprador",
                                                            query: {
                                                                venta: JSON.stringify(
                                                                    venta
                                                                ),
                                                            },
                                                        })
                                                    }>
                                                    <button>
                                                        Enviar mensaje
                                                    </button>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <ModalMensajes
                                        shown={showModal}
                                        close={handleModalClose}
                                        titulo={tituloMensajes}
                                        mensaje={textoMensajes}
                                        tipo="error"
                                    />
                                    <ModalMensajesConfirmarMsj
                                        shown={showModal2}
                                        setContinuarEliminar={confirmarEnvio}
                                        setAbandonarEliminar={() =>
                                            setShowModal2(false)
                                        }
                                        titulo="Confirmar envío"
                                        mensaje="¿Estás seguro de que quieres enviar esta factura?"
                                        tipo="confirmación"
                                        buttonText="Enviar" // Aquí pasas el texto del botón
                                    />
                                    <Dialog
                                        className="dialogDatsGuardados"
                                        open={confirmationOpen}
                                        PaperProps={{
                                            style: {
                                                width: isMdDown ? "80%" : "35%",
                                                backgroundColor: "white",
                                                border: "2px solid gray",
                                                padding: "1.4rem",
                                                borderRadius: "10px",
                                            },
                                        }}>
                                        <DialogTitle className="dialogtitleDtsGUardados">
                                            <FaCheckCircle
                                                size={37}
                                                style={{
                                                    color: "#10c045",
                                                    marginLeft: "-17px",
                                                    marginRight: "8px",
                                                }}
                                            />
                                            <p className="dialogtituloP">
                                                ¡Factura enviada con exito!
                                            </p>
                                        </DialogTitle>
                                        <DialogContent className="dialogContentDatsGuardados">
                                            <p className="PdialogContent">
                                                La factura se ha enviado
                                                exitosamente.
                                            </p>
                                        </DialogContent>
                                        <DialogActions className="DialogActionsDatsGuardados">
                                            <div className="div1buttonDialog">
                                                <button
                                                    className="button2DialogDatsGuardados"
                                                    onClick={handleConfirmationSuccess(
                                                        "./misVentas"
                                                    )}>
                                                    Ir a mis ventas
                                                </button>
                                            </div>
                                            <div className="div1buttonDialog">
                                                <button
                                                    className="button1DialogDatsGuardados"
                                                    onClick={handleConfirmationSuccess(
                                                        "/"
                                                    )}>
                                                    Ir al inicio
                                                </button>
                                            </div>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    </Container>
                ) : (
                    <div>
                        {/* Aquí puedes manejar el caso en que 'producto' es 'null' */}
                        <p>Cargando datos del producto...</p>
                    </div>
                )}
            </div>
        </>
    );
}
