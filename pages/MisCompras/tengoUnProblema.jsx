import Container from "../../components/layouts/Container";
import {
    Box,
    Grid,
    useMediaQuery,
    useTheme,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import shortid from "shortid";
import { IoIosCamera } from "react-icons/io";
import ModalMensajes from "../mensajes/ModalMensajes";
import ModalMensajesChat from "../mensajes/ModalMensajesChat";
import {
    URL_IMAGES_RESULTS,
    URL_IMAGES_RESULTSSMS,
} from "../../helpers/Constants";
import { FaCheckCircle } from "react-icons/fa";
import { PiSquareThin } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { URL_BD_MR } from "../../helpers/Constants";
import { useDispatch, useSelector } from "react-redux";

const idnotificacion = Math.floor(Math.random() * 10000000);

export default function tengoUnProblema() {
    const [comentario, setComentario] = useState("");
    const [fechacreacion, setFechacreacion] = useState(null);
    const [observacionintera, setObservacionintera] = useState(null);
    const [contadorCaracteres, setContadorCaracteres] = useState(0);
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const irA = useRef(null); //useref top page
    const router = useRouter();
    const [confirmationOpen, setConfirmationOpen] = useState(false); //estado confirmación modal
    const [fileData1, setFileData1] = useState(null); //primerArchivoImagen
    const [fileData2, setFileData2] = useState(null); //segundoArchivoImagen
    const [fileData3, setFileData3] = useState(null); //tercerArchivoImagen
    const [fileData4, setFileData4] = useState(null); //cuartoArchivoImagen
    const [fileData5, setFileData5] = useState(null); //quintoArchivoImagen

    const [enableImg2, setEnableImg2] = useState(true); //Habilitar segundoArchivoImagen
    const [enableImg3, setEnableImg3] = useState(true); //Habilitar segundoArchivoImagen
    const [enableImg4, setEnableImg4] = useState(true); //Habilitar segundoArchivoImagen
    const [enableImg5, setEnableImg5] = useState(true); //Habilitar segundoArchivoImagen

    const [fileData1Base64, setFileData1Base64] = useState(null); //primerArchivoImagen
    const [fileData2Base64, setFileData2Base64] = useState(null); //segundoArchivoImagen
    const [fileData3Base64, setFileData3Base64] = useState(null); //tercerArchivoImagen
    const [fileData4Base64, setFileData4Base64] = useState(null); //cuartoArchivoImagen
    const [fileData5Base64, setFileData5Base64] = useState(null); //quintoArchivoImagen

    const [showModal, setShowModal] = useState(false); //Estado de modal
    const [tituloMensajes, setTituloMensajes] = useState(""); //titulo modal
    const [textoMensajes, setTextoMensajes] = useState(""); //texto modal

    const [showModalMensajesCity, setShowModalMensajesCity] = useState(false);
    const [tituloMensajesCity, setTituloMensajesCity] = useState("");
    const [textoMensajesCity, setTextoMensajesCity] = useState("");
    const [textoBoton, setTextoBoton] = useState("Ir a Mis compras");
    const [textoBotonDos, setTextoBotonDos] = useState("Ir al Inicio");

    const [imagePresent1, setImagePresent1] = useState(false);
    const [imagePresent2, setImagePresent2] = useState(false);
    const [imagePresent3, setImagePresent3] = useState(false);
    const [imagePresent4, setImagePresent4] = useState(false);
    const [imagePresent5, setImagePresent5] = useState(false);

    const [numImg, setNumImg] = useState(null);

    //mostrar cont letras
    const [showAll, setShowAll] = useState(false);
    const [nombreImagen1, setNombreImagen1] = useState(null);
    const [nombreImagen2, setNombreImagen2] = useState(null);
    const [nombreImagen3, setNombreImagen3] = useState(null);
    const [nombreImagen4, setNombreImagen4] = useState(null);
    const [nombreImagen5, setNombreImagen5] = useState(null);

    const [emailVendedor, setEmailVendedor] = useState(null);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (fileData1) setEnableImg2(false);

        if (fileData2) setEnableImg3(false);

        if (fileData3) setEnableImg4(false);

        if (fileData4) setEnableImg5(false);
    }, [fileData1, fileData2, fileData3, fileData4, fileData5]);

    const handleComentarioChange = (event) => {
        const nuevoComentario = event.target.value;
        if (nuevoComentario.length <= 180) {
            setComentario(nuevoComentario);
            setContadorCaracteres(nuevoComentario.length);
        } else {
            // Si el comentario supera los 180 caracteres, no se actualiza.
        }
    };

    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };

    //Ruta de confirmación de modal
    const handleConfirmationSuccess = (route) => () => {
        router.push("/");
    };

    //handle de confirmación
    const handleConfirmationOpen = () => {
        setConfirmationOpen(true);
    };

    //top page transición
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };
    //envío calificación vendedor con mvalidaciones

    //recibir producto y guardarlo y almacenarlo after en el localstorage

    let producto = null;

    if (typeof window !== "undefined") {
        if (router.query.producto) {
            producto = JSON.parse(router.query.producto);
            console.log("DATPRD : ", producto);
        } else {
            // Recuperar los datos del almacenamiento local
            const data = localStorage.getItem("producto");
            if (data) {
                producto = JSON.parse(data);
            }
        }
    }

    useEffect(() => {
        if (producto) {

            const leerDatosUsuario = async () => {
                let params = {
                    usuario: producto.uidvendedor,
                };

                try {
                    const res = await axios({
                        method: "post",
                        url: URL_BD_MR + "13",
                        params,
                    });

                    //console.log("UIDSSSS: ", res.data);
                    setEmailVendedor(res.data[0].email)

                } catch (error) {
                    console.error("Error al leer los datos del usuario", error);
                    // Maneja el error según tus necesidades
                }
            };

            leerDatosUsuario();
        }
    }, [producto]);

    const validarDatos = async () => {
        //AQUI
        const tengoproblema = localStorage.getItem("tengoproblema");
        const requiredFiles = [
            fileData1,
            fileData2,
            fileData3,
            fileData4,
            fileData5,
        ];
        const atLeastOneFilePresent = requiredFiles.some(
            (fileData) => fileData !== null
        );

        if (!atLeastOneFilePresent && tengoproblema == 1) {
            setTituloMensajes("Validación de Archivos");
            setTextoMensajes("Debes subir al menos una imagen.");
            setShowModal(true);
            return false;
        }

        // Validación del textarea
        if (!comentario.trim()) {
            setTituloMensajes("Validación de mensaje");
            setTextoMensajes("Debes rellenar el formulario del mensaje.");
            setShowModal(true);
            return false;
        }

        // Nueva validación para palabras no permitidas
        let validaword = [
            { word: "www" },
            { word: "carrera" },
            { word: "avenida" },
            { word: "#" },
            { word: "N°" },
            { word: "@" },
            { word: ".com" },
            { word: ".co" },
            { word: ".net" },
            { word: "contactanos" },
            { word: "contacto" },
            { word: "llama" },
            { word: "llamar" },
            { word: "telefono" },
            { word: "celular" },
            { word: "movil" },
            { word: "email" },
            { word: "gmail" },
            { word: "calle" },
            { word: "call" },
            { word: "cra" },
        ];

        for (let i = 0; i < validaword.length; i++) {
            if (comentario.includes(validaword[i].word)) {
                setTituloMensajes("Validación de mensaje");
                setTextoMensajes(
                    "Tu mensaje contiene palabras o caracteres no permitidos."
                );
                setShowModal(true);
                return false;
            }
        }

        // Nueva validación para números y el carácter "@"
        let validacaracteres;
        let palabrasComentario = comentario.split(" ");

        for (let i = 0; i < palabrasComentario.length; i++) {
            let palabra = palabrasComentario[i];
            for (var j = 0; j < palabra.length; j++) {
                validacaracteres = palabra.substr(j, 1);

                if (
                    validacaracteres == 0 ||
                    validacaracteres == 1 ||
                    validacaracteres == 2 ||
                    validacaracteres == 3 ||
                    validacaracteres == 4 ||
                    validacaracteres == 5 ||
                    validacaracteres == 6 ||
                    validacaracteres == 7 ||
                    validacaracteres == 8 ||
                    validacaracteres == 9
                ) {
                    if (palabra.length > 5) {
                        setTituloMensajes("Validación de mensaje");
                        setTextoMensajes(
                            "Tu mensaje contiene palabras o caracteres no permitidos."
                        );
                        setShowModal(true);
                        return false;
                    }
                }

                if (validacaracteres == "@") {
                    setTituloMensajes("Validación de mensaje");
                    setTextoMensajes(
                        "Tu mensaje contiene palabras o caracteres no permitidos."
                    );
                    setShowModal(true);
                    return false;
                }
            }
        }

        return true;
    };

    //validación imagenes
    const handleFileChange = async (index, event) => {
        setNumImg(index);
        const file = event.target.files[0];

        if (file) {
            const allowedFileTypes = ["image/jpeg", "image/png"];
            const maxImageSize = 819200; // 800 KB in bytes
            const maxImageWidth = 1024;
            const maxImageHeight = 1024;

            if (allowedFileTypes.includes(file.type)) {
                if (file.size > maxImageSize) {
                    setShowModal(true);
                    setTituloMensajes("Tamaño incorrecto");
                    setTextoMensajes("Las imágenes deben pesar máximo 800 KB.");
                    return;
                }

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

                const reader = new FileReader();

                reader.onloadend = () => {
                    // Convertir la imagen a base64
                    const base64Image = reader.result;
                    // Generar un ID único para la imagen
                    let uniqueImageName = shortid.generate();
                    uniqueImageName = uniqueImageName.substring(0, 11);

                    // Obtener la extensión del archivo
                    let extension =
                        "." +
                        base64Image.substring(
                            base64Image.indexOf("/") + 1,
                            base64Image.indexOf(";base64")
                        );

                    // Actualizar el estado con la imagen seleccionada
                    setSelectedImage(base64Image);

                    switch (index) {
                        case 1:
                            setFileData1Base64(base64Image);
                            break;
                        case 2:
                            setFileData2Base64(base64Image);
                            break;
                        case 3:
                            setFileData3Base64(base64Image);
                            break;
                        case 4:
                            setFileData4Base64(base64Image);
                            break;
                        case 5:
                            setFileData5Base64(base64Image);
                            break;
                        default:
                            break;
                    }
                    // Actualizar el estado con el nombre de la imagen
                    setImageName(uniqueImageName + extension);
                };
                // Leer la imagen como una URL de datos
                reader.readAsDataURL(file);

                const newFileData = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data: URL.createObjectURL(file),
                };

                switch (index) {
                    case 1:
                        setFileData1(newFileData);
                        //localStorage.setItem('uploadedFile1', JSON.stringify(newFileData));
                        setImagePresent1(true);
                        break;
                    case 2:
                        setFileData2(newFileData);
                        //localStorage.setItem('uploadedFile2', JSON.stringify(newFileData));
                        setImagePresent2(true);
                        break;
                    case 3:
                        setFileData3(newFileData);
                        //localStorage.setItem('uploadedFile3', JSON.stringify(newFileData));
                        setImagePresent3(true);
                        break;
                    case 4:
                        setFileData4(newFileData);
                        //localStorage.setItem('uploadedFile4', JSON.stringify(newFileData));
                        setImagePresent4(true);
                        break;
                    case 5:
                        setFileData5(newFileData);
                        //localStorage.setItem('uploadedFile5', JSON.stringify(newFileData));
                        setImagePresent5(true);
                        break;
                    default:
                        break;
                }
            } else {
                setShowModal(true);
                setTituloMensajes("Archivo incorrecto");
                setTextoMensajes("Solo se permiten archivos JPG, JPEG y PNG.");
            }
        }
    };

    const handleSquareClick = (index) => {
        document.getElementById(`fileInput${index}`).click();
    };

    const [UidUser, setUidUser] = useState("");
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [DatosUser, setDatosUser] = useState([]);
    //console.log("DAT USER UID TENGO UN PROBLEMA  : ", datosusuarios.uid);

    //Función para obtener el UID del Usuario que nos sirve para mapear sus historial
    useEffect(() => {
        const obtenerUidUsuario = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });
                setDatosUser(res.data[0]);
                setUidUser(res.data[0].uid);
            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerUidUsuario();
    }, [datosusuarios]);

    const handleValidacion = async () => {
        //AQUI
        const usuariocompra = datosusuarios.uid; // Recupera el UID del usuario que compra
        const usuariovende = producto.UsuarioVendedor; // Recupera el UID del usuario que vende
        const idproducto = producto.idproducto; // Recupera el UID del producto
        const idmicompra = producto.idmicompra; // Recupera el UID del producto

        const nuevoMensaje = {
            usuariocompra,
            usuariovende,
            idproducto,
            estado: 31,
            comentario,
            observacionintera,
            nombreimagen1: fileData1 ? imageName + extension : "",
            nombreimagen2: fileData2 ? fileData2.name + extension : "",
            nombreimagen3: fileData3 ? fileData3.name + extension : "",
            nombreimagen4: fileData4 ? fileData4.name + extension : "",
            nombreimagen5: fileData5 ? fileData5.name + extension : "",
            imagen1: fileData1 ? fileData1Base64 : null,
            imagen2: fileData2 ? fileData2Base64 : null,
            imagen3: fileData3 ? fileData3Base64 : null,
            imagen4: fileData4 ? fileData4Base64 : null,
            imagen5: fileData5 ? fileData5Base64 : null,
        };

        let idmessage = shortid();

        const formdata = new FormData();
        formdata.append("usuariocompra", usuariocompra);
        formdata.append("usuariovende", usuariovende);
        formdata.append("idproducto", idproducto);
        formdata.append("idmicompra", producto.numerodeaprobacion); //idmicompra);
        formdata.append("idaprobacioncompra", producto.numerodeaprobacion);
        formdata.append("idmessage", idmessage);
        formdata.append("estado", 31);
        formdata.append("estadosolicitud", 65);
        formdata.append("mensajeleidovendedor", 0);
        formdata.append("mensajeleidocomprador", 0);
        formdata.append("comentario", comentario);
        formdata.append("observacionintera", "");
        formdata.append("paraquien", 100);
        formdata.append(
            "nombreimagen1",
            fileData1 ? "1" + imageName + extension : ""
        );
        formdata.append(
            "nombreimagen2",
            fileData2 ? "2" + imageName + extension : ""
        );
        formdata.append(
            "nombreimagen3",
            fileData3 ? "3" + imageName + extension : ""
        );
        formdata.append(
            "nombreimagen4",
            fileData4 ? "4" + imageName + extension : ""
        );
        formdata.append(
            "nombreimagen5",
            fileData5 ? "5" + imageName + extension : ""
        );
        formdata.append("imagen1", fileData1 ? fileData1Base64 : null);
        formdata.append("imagen2", fileData2 ? fileData2Base64 : null);
        formdata.append("imagen3", fileData3 ? fileData3Base64 : null);
        formdata.append("imagen4", fileData4 ? fileData4Base64 : null);
        formdata.append("imagen5", fileData5 ? fileData5Base64 : null);
        formdata.append("numeroimagenes", numImg ? numImg : null);

        const grabarImg = async () => {
            await fetch(`${URL_BD_MR}83`, {
                method: "POST",
                body: formdata,
                //headers: headers,
            }).then((response) => {
                //setIsLoading(false);
                if (response) {
                    if (response.status === 200) {
                        console.log("Respuesta del servidor:", response.data);

                        const crearNotificacionUsuario = async () => {

                            
                            let comentario = 'Consulta sobre producto ' + producto.numerodeaprobacion + ' esta disponible para su consulta.';

                            let params = {
                                estado: 0,
                                uidusuario: producto.uidcomprador,
                                idnotificacion: idnotificacion,
                                idorigen: producto.numerodeaprobacion,
                                comentario: comentario,
                                estado: 90,
                                ctlrnotificaentrada: 0,
                                ctlrnotificasalida: 0,
                                tiponotificacion: 2,
                            }

                            try {
                                const res = await axios({
                                    method: "post",
                                    url: URL_BD_MR + "823", params
                                });

                                if (res.data.type == 1) {
                                    console.log("RESULT NOTOFID :", res.data)
                                }
                            } catch (error) {
                                console.error("Error creando Notificación", error);
                            }
                        };
                        crearNotificacionUsuario();

                        const crearNotificacion = async () => {

                            let comentario = 'Consulta sobre producto ' + producto.numerodeaprobacion + ' esta disponible para su consulta.';

                            let params = {
                                estado: 0,
                                uidusuario: producto.uidvendedor,
                                idnotificacion: idnotificacion,
                                idorigen: producto.numerodeaprobacion,
                                comentario: comentario,
                                estado: 90,
                                ctlrnotificaentrada: 0,
                                ctlrnotificasalida: 0,
                                tiponotificacion: 2,
                            }

                            try {
                                const res = await axios({
                                    method: "post",
                                    url: URL_BD_MR + "823", params
                                });

                                if (res.data.type == 1) {
                                    console.log("RESULT NOTOFID :", res.data)
                                }
                            } catch (error) {
                                console.error("Error creando Notificación", error);
                            }
                        };

                        crearNotificacion();

                        // Actualizar la lista de mensajes después de enviar
                        setMessages((prevMessages) => {
                            if (!Array.isArray(prevMessages)) {
                                // Si prevMessages no es un array, devolvemos un array con el nuevo mensaje
                                return [nuevoMensaje];
                            }
                            // Si prevMessages es un array, agregamos el nuevo mensaje
                            return [...prevMessages, nuevoMensaje];
                        });
                        confirmarCrearCuenta()
                        setShowModalMensajesCity(true);
                        setTituloMensajesCity("¡Solicitud enviada con exito!");
                        setTextoMensajesCity(
                            "Tu solicitud fue enviada con exito. Esta será revisada y procesada por nosotros, en un máximo de 5 días habiles te estaremos dando repuesta."
                        );
                        /*
                        setTituloMensajes("Mensaje enviado");
                        setTextoMensajes(
                            "Mensaje enviado al administrador de MR."
                        );
                        */
                        setShowModal(true);
                        return false;

                        // Desplazarse hacia abajo
                        //scrollTfoBottom();

                        // Limpiar el campo de entrada después de enviar
                        //setInputMessage("");
                        setImageName(""); // Restablecer el nombre de la imagen
                        setSelectedImage(null); // Restablecer la imagen seleccionada
                        // Leer los mensajes nuevamente para obtener la fecha y hora del servidor
                        //leerMensajes();
                    } else {
                        console.log("ERROR EN MJS IMG : ", response);
                    }
                } else {
                    console.log("RESPONSE INGRESO FOTOS : ", response);
                }
            });
        };
        grabarImg();
    };

    function confirmarCrearCuenta() {
        //alert("entre")
        //console.log("DATXX : ", datosToken)
        //return
        let mensaje = "Pregunta relacionado con el producto : " + producto.nombreProducto + " " + comentario;
        const dataCreaUsr = {
            "remitente": emailVendedor,
            "asunto": "¡MENSAJE DEL COMPRADOR!",
            "plantilla": "info",
            "to": "Mercado Repuesto",
            "contenido_html": {
                "title": "Pregunta comprador",
                "subtitle": "Recibiste un mensaje del comprador",
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

        const sendMessage = async () => {
            try {
                const response = await axios.post("https://gimcloud.com.co/api/endpoint/mail", dataCreaUsr, config);
                console.log(response.data);
            } catch (error) {
                console.error('Errorxx:', error);
            }
        }
        sendMessage();
    }

    const manejarEnvioDatos = async () => {
        if (await validarDatos()) {
            handleValidacion();
        }
    };

    const getFileIcon = (fileData) => {
        if (!fileData) {
            return (
                <IoIosCamera
                    size={65}
                    style={{
                        color: "#2D2E83",
                        position: "relative",
                        top: "30px",
                    }}
                />
            );
        }

        const { type, data } = fileData || {}; // Asegúrate de que fileData sea un objeto

        if (type && type.startsWith("image/")) {
            return (
                <img
                    src={data}
                    alt="Uploaded File"
                    style={{ width: "65px", height: "65px" }}
                />
            );
        } else {
            return (
                <IoIosCamera
                    size={65}
                    style={{
                        color: "#2D2E83",
                        position: "relative",
                        top: "30px",
                    }}
                />
            );
        }
    };

    //Handle función para eliminar imagenes
    const handleDeleteImage = (index) => {
        switch (index) {
            case 1:
                setFileData1(null);
                localStorage.removeItem("uploadedFile1");
                setImagePresent1(false);
                break;
            case 2:
                setFileData2(null);
                localStorage.removeItem("uploadedFile2");
                setImagePresent2(true);
                break;
            case 3:
                setFileData3(null);
                localStorage.removeItem("uploadedFile3");
                setImagePresent3(true);
                break;
            case 4:
                setFileData4(null);
                localStorage.removeItem("uploadedFile4");
                setImagePresent4(true);
                break;
            case 5:
                setFileData5(null);
                localStorage.removeItem("uploadedFile5");
                setImagePresent5(true);
                break;
        }
    };

    const [extension, setExtension] = useState("");
    const [imageName, setImageName] = useState("");
    const [imageName2, setImageName2] = useState("");

    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div ref={irA}>
            <div>
                {producto ? (
                    <Container title="Mi Cuenta">
                        <div className="ps-page ps-page--inner" id="myaccount">
                            <div className="container">
                                <div className="ps-page__header"> </div>
                                <div className="ps-page__content ps-account">
                                    <Grid
                                        className="contDataUsers"
                                        container
                                        style={{
                                            width: isMdDown ? "100%" : "100%",
                                            marginBottom: "20rem",
                                        }}>
                                        <Grid container>
                                            <div className="titleTproblema">
                                                <p>
                                                    Cuentanos qué pasó con tu
                                                    compra
                                                </p>
                                            </div>
                                            <Grid
                                                className="ContPrinctextareatengounproblema"
                                                item
                                                xs={12}
                                                md={7}
                                                sx={{
                                                    width: isMdDown
                                                        ? "100%"
                                                        : "90%",
                                                }}>
                                                <Grid
                                                    className="SubContPrinctextareatengounproblema"
                                                    container
                                                    sx={{
                                                        width: isMdDown
                                                            ? "100%"
                                                            : "85%",
                                                    }}>
                                                    <div
                                                        style={{
                                                            width: "100%",
                                                        }}>
                                                        <textarea
                                                            value={comentario}
                                                            onChange={
                                                                handleComentarioChange
                                                            }
                                                            placeholder="Escribe un mensaje al vendedor"
                                                            style={{
                                                                height: "160px",
                                                                width: "100%",
                                                                resize: "none",
                                                            }}
                                                        />
                                                        <div
                                                            style={{
                                                                textAlign:
                                                                    "right",
                                                                marginTop:
                                                                    "0.5rem",
                                                                color: "#2C2E82",
                                                                fontSize:
                                                                    "14px",
                                                            }}>
                                                            {contadorCaracteres}
                                                            /180
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                className="subcontImgTengoProblema"
                                                item
                                                xs={12}
                                                md={5}>
                                                <Grid
                                                    className="contImgTengoProblema"
                                                    item
                                                    xs={12}
                                                    md={4}>
                                                    <img
                                                        src={`${URL_IMAGES_RESULTS}${producto.nombreImagen}`}
                                                    />
                                                </Grid>
                                                <Grid
                                                    className="contdatosprobls"
                                                    item
                                                    xs={12}
                                                    md={8}
                                                    sx={{
                                                        flexDirection: "column",
                                                    }}>
                                                    <p className="contTengoProblemadatos">
                                                        {
                                                            producto.nombreProducto
                                                        }
                                                    </p>
                                                    <div className="subtitlesvercompra">
                                                        <p>
                                                            Unidades compradas:
                                                        </p>
                                                        <p>
                                                            {producto.cantidad}
                                                        </p>
                                                    </div>
                                                    <div className="subtitlesvercompra">
                                                        <p>
                                                            Precio del producto:
                                                        </p>
                                                        <p>
                                                            {
                                                                producto.preciodeventa
                                                            }
                                                        </p>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                className="contAGGFotosTengoProblema"
                                                item
                                                xs={12}
                                                md={7}
                                                sx={{
                                                    width: isMdDown
                                                        ? "100%"
                                                        : "90%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent:
                                                        "flex-start",
                                                    marginTop: "9rem",
                                                    marginBottom: "5rem",
                                                }}>
                                                <div className="titleTproblema">
                                                    <p>
                                                        Agregar fotos del
                                                        producto o del paquete
                                                    </p>
                                                </div>
                                                <Grid
                                                    className="contSendImgsTengoProblema"
                                                    container
                                                    sx={{
                                                        width: isMdDown
                                                            ? "100%"
                                                            : "85%",
                                                    }}>
                                                    {/* Primer div */}
                                                    <div>
                                                        <div
                                                            className="aggfotosubcaja"
                                                            onClick={() =>
                                                                handleSquareClick(
                                                                    1
                                                                )
                                                            }
                                                            style={{
                                                                position:
                                                                    "relative",
                                                                textAlign:
                                                                    "center",
                                                            }}>
                                                            <input
                                                                type="file"
                                                                id="fileInput1"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleFileChange(
                                                                        1,
                                                                        event
                                                                    )
                                                                }
                                                                accept=".jpg, .jpeg, .png,"
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                            />
                                                            <PiSquareThin
                                                                size={115}
                                                                style={{
                                                                    color: "#2D2E83",
                                                                }}
                                                            />
                                                            {fileData1 ? (
                                                                <div
                                                                    style={{
                                                                        position:
                                                                            "absolute",
                                                                        top: "66%",
                                                                        left: "50%",
                                                                        transform:
                                                                            "translate(-50%, -50%)",
                                                                    }}>
                                                                    {getFileIcon(
                                                                        fileData1
                                                                    )}
                                                                    {imagePresent1 && (
                                                                        <button
                                                                            className="buttonquitarIMG"
                                                                            onClick={() =>
                                                                                handleDeleteImage(
                                                                                    1
                                                                                )
                                                                            }>
                                                                            <IoMdClose
                                                                                onClick={() =>
                                                                                    handleDeleteImage(
                                                                                        1
                                                                                    )
                                                                                }
                                                                                size={
                                                                                    25
                                                                                }
                                                                                style={{
                                                                                    marginTop:
                                                                                        ".5rem",
                                                                                }}
                                                                            />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <IoIosCamera
                                                                    size={50}
                                                                    className="icCam"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Segundo div */}
                                                    <div>
                                                        <div
                                                            className="aggfotosubcaja"
                                                            onClick={() =>
                                                                handleSquareClick(
                                                                    2
                                                                )
                                                            }
                                                            style={{
                                                                position:
                                                                    "relative",
                                                                textAlign:
                                                                    "center",
                                                            }}>
                                                            <input
                                                                type="file"
                                                                disabled={
                                                                    enableImg2
                                                                }
                                                                id="fileInput2"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleFileChange(
                                                                        2,
                                                                        event
                                                                    )
                                                                }
                                                                accept=".jpg, .jpeg, .png,"
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                            />
                                                            <PiSquareThin
                                                                size={115}
                                                                style={{
                                                                    color: "#2D2E83",
                                                                }}
                                                            />
                                                            {fileData2 ? (
                                                                <div
                                                                    style={{
                                                                        position:
                                                                            "absolute",
                                                                        top: "66%",
                                                                        left: "50%",
                                                                        transform:
                                                                            "translate(-50%, -50%)",
                                                                    }}>
                                                                    {getFileIcon(
                                                                        fileData2
                                                                    )}
                                                                    {imagePresent2 && (
                                                                        <button
                                                                            className="buttonquitarIMG"
                                                                            onClick={() =>
                                                                                handleDeleteImage(
                                                                                    2
                                                                                )
                                                                            }>
                                                                            <IoMdClose
                                                                                onClick={() =>
                                                                                    handleDeleteImage(
                                                                                        2
                                                                                    )
                                                                                }
                                                                                size={
                                                                                    25
                                                                                }
                                                                                style={{
                                                                                    marginTop:
                                                                                        ".5rem",
                                                                                }}
                                                                            />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <IoIosCamera
                                                                    size={50}
                                                                    className="icCam"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Tercer div */}
                                                    <div>
                                                        <div
                                                            className="aggfotosubcaja"
                                                            onClick={() =>
                                                                handleSquareClick(
                                                                    3
                                                                )
                                                            }
                                                            style={{
                                                                position:
                                                                    "relative",
                                                                textAlign:
                                                                    "center",
                                                            }}>
                                                            <input
                                                                type="file"
                                                                disabled={
                                                                    enableImg3
                                                                }
                                                                id="fileInput3"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleFileChange(
                                                                        3,
                                                                        event
                                                                    )
                                                                }
                                                                accept=".jpg, .jpeg, .png,"
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                            />
                                                            <PiSquareThin
                                                                size={115}
                                                                style={{
                                                                    color: "#2D2E83",
                                                                }}
                                                            />
                                                            {fileData3 ? (
                                                                <div
                                                                    style={{
                                                                        position:
                                                                            "absolute",
                                                                        top: "66%",
                                                                        left: "50%",
                                                                        transform:
                                                                            "translate(-50%, -50%)",
                                                                    }}>
                                                                    {getFileIcon(
                                                                        fileData3
                                                                    )}
                                                                    {imagePresent3 && (
                                                                        <button
                                                                            className="buttonquitarIMG"
                                                                            onClick={() =>
                                                                                handleDeleteImage(
                                                                                    3
                                                                                )
                                                                            }>
                                                                            <IoMdClose
                                                                                onClick={() =>
                                                                                    handleDeleteImage(
                                                                                        3
                                                                                    )
                                                                                }
                                                                                size={
                                                                                    25
                                                                                }
                                                                                style={{
                                                                                    marginTop:
                                                                                        ".5rem",
                                                                                }}
                                                                            />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <IoIosCamera
                                                                    size={50}
                                                                    className="icCam"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* cuarto div */}
                                                    <div>
                                                        <div
                                                            className="aggfotosubcaja"
                                                            onClick={() =>
                                                                handleSquareClick(
                                                                    4
                                                                )
                                                            }
                                                            style={{
                                                                position:
                                                                    "relative",
                                                                textAlign:
                                                                    "center",
                                                            }}>
                                                            <input
                                                                type="file"
                                                                disabled={
                                                                    enableImg4
                                                                }
                                                                id="fileInput4"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleFileChange(
                                                                        4,
                                                                        event
                                                                    )
                                                                }
                                                                accept=".jpg, .jpeg, .png,"
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                            />
                                                            <PiSquareThin
                                                                size={115}
                                                                style={{
                                                                    color: "#2D2E83",
                                                                }}
                                                            />
                                                            {fileData4 ? (
                                                                <div
                                                                    style={{
                                                                        position:
                                                                            "absolute",
                                                                        top: "66%",
                                                                        left: "50%",
                                                                        transform:
                                                                            "translate(-50%, -50%)",
                                                                    }}>
                                                                    {getFileIcon(
                                                                        fileData4
                                                                    )}
                                                                    {imagePresent4 && (
                                                                        <button
                                                                            className="buttonquitarIMG"
                                                                            onClick={() =>
                                                                                handleDeleteImage(
                                                                                    4
                                                                                )
                                                                            }>
                                                                            <IoMdClose
                                                                                onClick={() =>
                                                                                    handleDeleteImage(
                                                                                        4
                                                                                    )
                                                                                }
                                                                                size={
                                                                                    25
                                                                                }
                                                                                style={{
                                                                                    marginTop:
                                                                                        ".5rem",
                                                                                }}
                                                                            />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <IoIosCamera
                                                                    size={50}
                                                                    className="icCam"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* quinto div div */}

                                                    <div>
                                                        <div
                                                            className="aggfotosubcaja"
                                                            onClick={() =>
                                                                handleSquareClick(
                                                                    5
                                                                )
                                                            }
                                                            style={{
                                                                position:
                                                                    "relative",
                                                                textAlign:
                                                                    "center",
                                                            }}>
                                                            <input
                                                                type="file"
                                                                disabled={
                                                                    enableImg5
                                                                }
                                                                id="fileInput5"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleFileChange(
                                                                        5,
                                                                        event
                                                                    )
                                                                }
                                                                accept=".jpg, .jpeg, .png,"
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                            />
                                                            <PiSquareThin
                                                                size={115}
                                                                style={{
                                                                    color: "#2D2E83",
                                                                }}
                                                            />
                                                            {fileData5 ? (
                                                                <div
                                                                    style={{
                                                                        position:
                                                                            "absolute",
                                                                        top: "66%",
                                                                        left: "50%",
                                                                        transform:
                                                                            "translate(-50%, -50%)",
                                                                    }}>
                                                                    {getFileIcon(
                                                                        fileData5
                                                                    )}
                                                                    {imagePresent5 && (
                                                                        <button
                                                                            className="buttonquitarIMG"
                                                                            onClick={() =>
                                                                                handleDeleteImage(
                                                                                    5
                                                                                )
                                                                            }>
                                                                            <IoMdClose
                                                                                onClick={() =>
                                                                                    handleDeleteImage(
                                                                                        5
                                                                                    )
                                                                                }
                                                                                size={
                                                                                    25
                                                                                }
                                                                                style={{
                                                                                    marginTop:
                                                                                        ".5rem",
                                                                                }}
                                                                            />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <IoIosCamera
                                                                    size={50}
                                                                    className="icCam"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <div className="rectextprobl">
                                                    {showAll ? (
                                                        <>
                                                            <p>
                                                                - Debes agregar
                                                                como mínimo
                                                                una(01) imagen y
                                                                como máximo
                                                                cinco(05)
                                                            </p>
                                                            <p>
                                                                - El tamaño
                                                                máximo de las
                                                                imágenes es 1024
                                                                x 1024
                                                            </p>
                                                            <p>
                                                                - La proporción
                                                                de las imágenes
                                                                debe ser de 4:3,{" "}
                                                                <br /> es decir
                                                                4 unidades de
                                                                alto por 3 de
                                                                ancho
                                                            </p>
                                                            <p>
                                                                - Cada imagen
                                                                debe pesar
                                                                máximo 800KB
                                                            </p>
                                                            <p>
                                                                - Tus imágenes
                                                                deben ser en
                                                                formato jpg,
                                                                jpeg o png
                                                            </p>
                                                            <p>
                                                                - Las imágenes
                                                                deben ser
                                                                cuadradas,
                                                                óptimo 1024 x
                                                                1024
                                                            </p>
                                                            <p>
                                                                - Las imágenes
                                                                deben llenar al
                                                                menos el 85% o
                                                                más del marco de
                                                                la imagen
                                                            </p>
                                                            <p>
                                                                - La imagen debe
                                                                estar enfocada
                                                            </p>
                                                            <p>
                                                                - No incluir
                                                                datos de
                                                                teléfonos
                                                            </p>
                                                            <p>
                                                                - No incluir
                                                                datos de
                                                                contactos
                                                            </p>
                                                            <p>
                                                                - Las imágenes
                                                                deben ser
                                                                nítidas
                                                            </p>
                                                            <div className="contButtonVermasomenos">
                                                                <button
                                                                    onClick={
                                                                        toggleShowAll
                                                                    }>
                                                                    Ver menos...
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p>
                                                                **Ten en cuenta
                                                                que:
                                                            </p>
                                                            <p>
                                                                - Debes agregar
                                                                como mínimo
                                                                una(01) imagen y
                                                                como máximo
                                                                cinco(05)
                                                            </p>
                                                            <p>
                                                                - El tamaño
                                                                máximo de las
                                                                imágenes es 1024
                                                                x 1024
                                                            </p>
                                                            <p>
                                                                - La proporción
                                                                de las imágenes
                                                                debe ser de 4:3,{" "}
                                                                <br /> es decir
                                                                4 unidades de
                                                                alto por 3 de
                                                                ancho
                                                            </p>
                                                            <p>
                                                                - Cada imagen
                                                                debe pesar
                                                                máximo 800KB
                                                            </p>
                                                            <p>
                                                                - Tus imágenes
                                                                deben ser en
                                                                formato jpg,
                                                                jpeg o png
                                                            </p>
                                                            <div className="contButtonVermasomenos">
                                                                <button
                                                                    onClick={
                                                                        toggleShowAll
                                                                    }>
                                                                    Ver más...
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                md={7}
                                                sx={{
                                                    width: isMdDown
                                                        ? "100%"
                                                        : "90%",
                                                    display: "flex",
                                                    marginTop: "3rem",
                                                }}>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={4}></Grid>
                                                <Grid item xs={12} md={8}>
                                                    <Box
                                                        display="flex"
                                                        justifyContent="space-between"
                                                        sx={{ width: "80%" }}>
                                                        <button
                                                            className="CancelarFormButton"
                                                            onClick={handleConfirmationSuccess(
                                                                "./misCompras"
                                                            )}>
                                                            Ir a mis compras
                                                        </button>
                                                        <button
                                                            onClick={
                                                                manejarEnvioDatos
                                                            }
                                                            className="GuardarFormButton">
                                                            Enviar
                                                        </button>
                                                        <ModalMensajes
                                                            shown={showModal}
                                                            close={
                                                                handleModalClose
                                                            }
                                                            titulo={
                                                                tituloMensajes
                                                            }
                                                            mensaje={
                                                                textoMensajes
                                                            }
                                                            tipo="error"
                                                        />
                                                        <ModalMensajesChat
                                                            shown={
                                                                showModalMensajesCity
                                                            }
                                                            close={
                                                                setShowModalMensajesCity
                                                            }
                                                            titulo={
                                                                tituloMensajesCity
                                                            }
                                                            mensaje={
                                                                textoMensajesCity
                                                            }
                                                            setActivarCity=""
                                                            textoBoton={
                                                                textoBoton
                                                            }
                                                            textoBotonDos={
                                                                textoBotonDos
                                                            }
                                                            tipo="6"
                                                        />
                                                        <Dialog
                                                            className="dialogDatsGuardados"
                                                            open={
                                                                confirmationOpen
                                                            }
                                                            PaperProps={{
                                                                style: {
                                                                    width: isMdDown
                                                                        ? "80%"
                                                                        : "35%",
                                                                    backgroundColor:
                                                                        "white",
                                                                    border: "2px solid gray",
                                                                    padding:
                                                                        "1.4rem",
                                                                    borderRadius:
                                                                        "10px",
                                                                },
                                                            }}>
                                                            <DialogTitle className="dialogtitleDtsGUardados">
                                                                <FaCheckCircle
                                                                    size={37}
                                                                    style={{
                                                                        color: "#10c045",
                                                                        marginLeft:
                                                                            "-17px",
                                                                        marginRight:
                                                                            "8px",
                                                                    }}
                                                                />

                                                                <p className="dialogtituloP">
                                                                    Información
                                                                    enviada con
                                                                    éxito!
                                                                </p>
                                                            </DialogTitle>
                                                            <DialogContent className="dialogContentDatsGuardados">
                                                                <p className="PdialogContent">
                                                                    Tu
                                                                    información
                                                                    fue enviada
                                                                    con exito.
                                                                    tendrás la
                                                                    respuesta en
                                                                    X días
                                                                    habiles.
                                                                </p>
                                                            </DialogContent>
                                                            <DialogActions className="DialogActionsDatsGuardados">
                                                                <div className="div1buttonDialog">
                                                                    <button
                                                                        className="button2DialogDatsGuardados"
                                                                        onClick={handleConfirmationSuccess(
                                                                            "./misCompras"
                                                                        )}>
                                                                        Ir a mis
                                                                        compras
                                                                    </button>
                                                                </div>
                                                                <div className="div1buttonDialog">
                                                                    <button
                                                                        className="button1DialogDatsGuardados"
                                                                        onClick={handleConfirmationSuccess(
                                                                            "/"
                                                                        )}>
                                                                        Ir al
                                                                        inicio
                                                                    </button>
                                                                </div>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </Container>
                ) : (
                    <div>
                        {/*Si el producto es null */}
                        <p>Cargando datos del producto...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
