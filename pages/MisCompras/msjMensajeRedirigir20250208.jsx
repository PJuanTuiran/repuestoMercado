import Container from "../../components/layouts/Container";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ModalMensajes from "../mensajes/ModalMensajes";
import { SlPaperClip } from "react-icons/sl";
import { LuSendHorizonal } from "react-icons/lu";
import {
    URL_BD_MR,
    URL_IMAGES_RESULTS,
    URL_IMAGES_RESULTSSMS,
} from "../../helpers/Constants";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";
import { myNumber } from "../../utilities/ArrayFunctions";
import moment from "moment";

let producto = null;

export default function msjMensajeRedirigir({ UsuarioVendedor }) {
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const irA = useRef(null);
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const scrollRef = useRef(null);
    const [fechacreacion, setFechacreacion] = useState(null);
    // Estado para almacenar el nombre de la imagen
    const [selectImage, setSelectImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const [zoomImgUno, setZoomImgUno] = useState("imageresultprgvende");
    const [fechaCreaMensaje, setFechaCreaMensaje] = useState(null);

    let hoy = moment();
    let now = moment();
    let masdias = "192:00:00";
    now.add(moment.duration(masdias));
    let fechavence = moment(now).format("YYYY-MM-DD");
    let fechahoy = moment(hoy).format("YYYY-MM-DD");

    const [mostrar, setMostrar] = useState(true);

    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [extension, setExtension] = useState("");
    const messagesRef = useRef(null);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    const imgImgUnoAmpliar = async (index) => {
        setSelectImage(index);
        setZoomImgUno("imageresultprgvende zoommensajevend");
    };

    const imgImgUnoDisminuir = async () => {
        setSelectImage(null);
        setZoomImgUno("imageresultprgvende");
    };

    //recibir los datos del producto comprado y guardar url para cuando reinicie seguir en el mismo

    let idproducto = null;
    let idmicompra = null;

    if (typeof window !== "undefined") {
        if (router.query.idproducto) {
            idproducto = JSON.parse(router.query.idproducto);
            idmicompra = JSON.parse(router.query.idmicompra);
            console.log("idmicompra  : ", idmicompra);
            // Guardar los datos en el almacenamiento local
        } else {
            // Recuperar los datos del almacenamiento local
            const data = localStorage.getItem("producto");
            if (data) {
                producto = JSON.parse(data);
            }
        }
    }

    //cerrar modal si no hay nada en el input
    const handleModalClose = () => {
        setShowModal(false);
    };
    //TopPage
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    // Función para validar el mensaje
    const validarMensaje = () => {
        // Validación del textarea

        if (!inputMessage.trim() && !selectedImage) {
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

        // Dividir el comentario en palabras
        const palabrasComentario = inputMessage.split(" ");

        for (let i = 0; i < validaword.length; i++) {
            if (palabrasComentario.includes(validaword[i].word)) {
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

        for (let i = 0; i < palabrasComentario.length; i++) {
            let palabra = palabrasComentario[i];
            let valornum = "";
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
                    valornum = valornum + validacaracteres;
                }

                if (valornum.length > 5) {
                    setTituloMensajes("Validación de mensaje");
                    setTextoMensajes(
                        "Tu mensaje contiene palabras o caracteres no permitidos."
                    );
                    setShowModal(true);
                    return false;
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

    const userId = datosusuarios.uid; // ID del usuario actua
    const usuarioenvia = datosusuarios.uid;

    // Función para enviar un mensaje
    const sendMessage = async () => {
        const estado = 21;
        const usuariocompra = datosusuarios.uid;
        const idproducto = producto[0]?.idproducto;
        const idmicompra = producto[0]?.numerodeaprobacion;
        let usuariovende;

        //console.log("DATOS XX : ", producto);
        //return;
        // obtener usuariovende desde producto.usuario

        if (producto && producto[0]?.UsuarioVendedor) {
            usuariovende = producto[0]?.UsuarioVendedor;
        } else {
            setTituloMensajes("Validación de mensaje");
            setTextoMensajes(
                "Los mensajes al vendedor, se relaciona con un producto."
            );
            setShowModal(true);
            return false;
        }

        const nuevoMensaje = {
            usuariocompra,
            idproducto,
            usuariovende,
            idmicompra,
            estado,
            comentario: inputMessage,
            observacionintera: "",
            nombreimagen1: imageName + extension,
            nombreimagen2: "",
            nombreimagen3: "",
            nombreimagen4: "",
            nombreimagen5: "",
            imagen1: selectedImage,
        };

        //console.log("NVO MENSA : ",nuevoMensaje)
        //return
        let numimg = 0;

        if (selectedImage) numimg = 1;
        else numimg = 0;

        let idmessage = shortid();

        const formdata = new FormData();
        formdata.append("usuariocompra", usuariocompra);
        formdata.append("idproducto", idproducto);
        formdata.append("usuariovende", usuariovende);
        formdata.append("idmicompra", idmicompra);
        formdata.append("idaprobacioncompra", 0);
        formdata.append("estado", estado);
        formdata.append("comentario", inputMessage);
        formdata.append("idmessage", idmessage);
        formdata.append("estadosolicitud", 21);
        formdata.append("mensajeleidovendedor", 0);
        formdata.append("mensajeleidocomprador", 0);
        formdata.append("paraquien", 1);

        formdata.append("observacionintera", "");
        formdata.append("nombreimagen1", imageName + extension);
        formdata.append("nombreimagen2", "");
        formdata.append("nombreimagen3", "");
        formdata.append("nombreimagen4", "");
        formdata.append("nombreimagen5", "");
        formdata.append("imagen1", selectedImage);
        formdata.append("imagen2", "");
        formdata.append("imagen3", "");
        formdata.append("imagen4", "");
        formdata.append("imagen5", "");
        formdata.append("numeroimagenes", numimg);

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

                        // Actualizar la lista de mensajes después de enviar
                        setMessages((prevMessages) => {
                            if (!Array.isArray(prevMessages)) {
                                // Si prevMessages no es un array, devolvemos un array con el nuevo mensaje
                                return [nuevoMensaje];
                            }
                            // Si prevMessages es un array, agregamos el nuevo mensaje
                            return [...prevMessages, nuevoMensaje];
                        });

                        // Desplazarse hacia abajo
                        scrollToBottom();

                        // Limpiar el campo de entrada después de enviar
                        setInputMessage("");
                        setImageName(""); // Restablecer el nombre de la imagen
                        setSelectedImage(null); // Restablecer la imagen seleccionada
                        // Leer los mensajes nuevamente para obtener la fecha y hora del servidor
                        leerMensajes();
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

    // Función para enviar un mensaje
    const manejarEnvioMensaje = () => {
        if (validarMensaje()) {
            sendMessage();
        }
    };

    // Función para leer mensajes
    const leerMensajes = async () => {
        //const datauser = producto.uidcomprador;
        //console.log("DATUSERASS : ", datauser);

        const readPrdByID = async () => {
            let params = {
                idarticulo: idproducto,
            };

            console.log("VISITAS: ", params);

            await axios({
                method: "post",
                url: URL_BD_MR + "18",
                params,
            })
                .then((res) => {

                    console.log("PRD DUPLICAR: ", res.data);

                    producto = res.data;
                    localStorage.setItem("producto", JSON.stringify(producto));

                })
                .catch(function (error) {
                    return;
                });
        };

        if (idproducto)
            readPrdByID();


        let params = {
            estado: 21,
        };

        try {
            const response = await axios({
                method: "post",
                url: `${URL_BD_MR}849`,
                params,
            });

            const datax = response.data.listmensajecompra;
            //console.log("DAT XXXX : ", datax);

            let messag = [];
            datax &&
                datax.map((row, index) => {

                    if (
                        //datauser == row.uidcomprador &&
                        (row.estado == 21 ||
                            row.estado == 22 ||
                            row.estado == 24 ||
                            row.estado == 25 ||
                            row.estado == 26)
                    ) {

                        console.log("PRD XXXX : ", row, " - ", idmicompra);

                        if (idmicompra == row.idmicompra) {
                            let enviamensaje = null;
                            let mascara = "";
                            //console.log("DAT XXXX : ", row);
                            if (row.estado == 24) {
                                enviamensaje = false;
                                mascara =
                                    row.primernombre.substring(0, 1) +
                                    row.primerapellido.substring(0, 1);
                            } else if (row.estado == 21 || row.estado == 22 ||
                                row.estado == 25 || row.estado == 26) {
                                enviamensaje = true;
                                mascara =
                                    row.nombreuno.substring(0, 1) +
                                    row.apellidouno.substring(0, 1);
                            }

                            let item = {
                                activo: row.activo,
                                celular: row.celular,
                                comentario: row.comentario,
                                direccion: row.direccion,
                                email: row.email,
                                estado: row.estado,
                                fechacreacion: row.fechacreacion,
                                fechacreamensaje: null, //row.fechacreamensaje,
                                fechatoken: row.fechatoken,
                                id: row.id,
                                idmsj: row.idmsj,
                                idaprobacioncompra: row.idaprobacioncompra,
                                identificacion: row.identificacion,
                                idproducto: row.idproducto,
                                nombreimagen1: row.nombreimagen1,
                                nombreimagen2: row.nombreimagen2,
                                nombreimagen3: row.nombreimagen3,
                                nombreimagen4: row.nombreimagen4,
                                nombreimagen5: row.nombreimagen5,
                                observacionintera: row.observacionintera,
                                primerapellido: row.primerapellido,
                                primernombre: row.primernombre,
                                razonsocial: row.razonsocial,
                                segundoapellido: row.segundoapellido,
                                segundonombre: row.segundonombre,
                                tipoidentificacion: row.tipoidentificacion,
                                tipousuario: row.tipousuario,
                                titulonombre: row.titulonombre,
                                token: row.token,
                                uid: row.uid,
                                uidcomprador: row.uidcomprador,
                                usuariovende: row.uidvendedor,
                                michat: enviamensaje,
                                mascara: mascara,
                            };
                            messag.push(item);
                        }
                    }
                });

            const mensajes = messag;

            console.log("USUARIO  : ", mensajes)
            //console.log("DATOS USRSU  : ", datosusuarios)

            // Ordenar los mensajes por fecha de creación
            const mensajesOrdenados = mensajes.sort(
                (a, b) => a.idmsj - b.idmsj
            );

            // Actualizar el estado con los mensajes recibidos
            setFechaCreaMensaje(mensajes[0]?.fechacreamensaje);
            setMessages(mensajesOrdenados);
        } catch (error) {
            console.error("Error leyendo mensajes:", error);
        }
    };
    // Efecto para cargar mensajes al montar y actualizar
    useEffect(() => {
        leerMensajes();
    }, [idproducto]);

    // Función para desplazar hacia abajo cuando se actualizan los mensajes
    const scrollToBottom = () => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        // Desplázate hacia abajo cuando el componente se monta o cuando los mensajes se actualizan
        scrollToBottom();
    }, [messages]);

    // Función para manejar la subida de la imagen

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            // Convertir la imagen a base64
            const base64Image = reader.result;

            // Generar un ID único para la imagen
            let uniqueImageName = shortid.generate();
            uniqueImageName = uniqueImageName.substring(0, 11);

            // Almacenar la imagen en localStorage con el nuevo nombre
            //localStorage.setItem(uniqueImageName, base64Image);

            // Actualizar el estado con la imagen seleccionada
            let extension =
                "." +
                base64Image.substring(
                    base64Image.indexOf("/") + 1,
                    base64Image.indexOf(";base64")
                );
            setExtension(extension);
            setSelectedImage(base64Image);
        };

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

                // Si la imagen pasa todas las validaciones, actualiza el estado
                let nombreimagen = shortid();
                setImageName(nombreimagen);
                // Ahora puedes mostrar el nombre de la imagen en el input
                //setInputMessage(file.name);

                // Leer la imagen como una URL de datos
                reader.readAsDataURL(file);
            } else {
                setShowModal(true);
                setTituloMensajes("Archivo incorrecto");
                setTextoMensajes("Solo se permiten archivos JPG, JPEG y PNG.");
            }
        } else {
            console.log("No se seleccionó ningún archivo");
        }
        // Restablecer el valor del campo de entrada del archivo
        event.target.value = null;
    };

    //funcion para bloquar en localstorage
    /*
    const [mostrar, setMostrar] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("mostrar") === "false";
        }
        return true;
    });
    */

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("mostrar", mostrar);
        }
    }, [mostrar]);

    // Función para identificar si el usuario loggeado corresponde al usuariovende
    const esUsuarioVende = () => {
        return datosusuarios.uid === detallesProducto.usuario;
    };

    // Añade un estado para el comentario
    const [comentario, setComentario] = useState("");

    // Función para manejar el cambio en el Input
    const handleInputChange = (event) => {
        setComentario(event.target.value);
    };

    return (
        <div ref={irA}>
            <div>
                {producto ? (
                    <Container title="Mi Cuenta">
                        <div className="ps-page ps-page--inner" id="myaccount">
                            <div className="container">
                                <div className="ps-page__header"> </div>
                                <div className="ps-page__content ps-account">
                                    <Grid container>
                                        <Grid
                                            className="subcprinccalific"
                                            item
                                            xs={12}
                                            md={7}
                                            sx={{
                                                width: isMdDown
                                                    ? "100%"
                                                    : "90%",
                                            }}
                                            flexDirection={"column"}>
                                            <div className="titleTproblema">
                                                <p>Contactar con el vendedor</p>
                                            </div>
                                            <Grid
                                                container
                                                className="calificSubC contPrincMsjVend"
                                                item
                                                xs={12}
                                                md={12}
                                                sx={{
                                                    width: isMdDown
                                                        ? "100%"
                                                        : "90%",
                                                }}
                                                flexDirection={"column"}>
                                                <div className="fstdivmsjV">
                                                    <p>{producto[0]?.nombres}</p>
                                                </div>
                                                <div className="diaMsj">
                                                    {fechaCreaMensaje ? (
                                                        <p>
                                                            {moment(
                                                                fechaCreaMensaje
                                                            ).format(
                                                                "YYYY-MM-DD"
                                                            )}
                                                        </p>
                                                    ) : null}
                                                </div>
                                                {
                                                    console.log("messages : ", messages)

                                                }
                                                <div
                                                    className="contMensajes"
                                                    ref={messagesRef}>
                                                    {Array.isArray(messages) &&
                                                        messages.length > 0 ? (
                                                        messages.map(
                                                            (
                                                                message,
                                                                index
                                                            ) => (
                                                                <div
                                                                    key={index}>
                                                                    {message?.michat ? (
                                                                        // Mensaje propio
                                                                        <div
                                                                            className="MsjVendedor"
                                                                            key={
                                                                                index
                                                                            }>
                                                                            {message?.nombreimagen1 && message?.nombreimagen1 != 0 && (
                                                                                <div className="imageContainerChatZoom2">
                                                                                    <div className="imgmensajescompras2">
                                                                                        {index ==
                                                                                            selectImage ? (
                                                                                            <img
                                                                                                onMouseLeave={() =>
                                                                                                    imgImgUnoDisminuir()
                                                                                                }
                                                                                                className={
                                                                                                    zoomImgUno
                                                                                                }
                                                                                                src={
                                                                                                    URL_IMAGES_RESULTSSMS +
                                                                                                    message?.nombreimagen1
                                                                                                }
                                                                                                alt={
                                                                                                    message?.nombreimagen1
                                                                                                }
                                                                                            />
                                                                                        ) : (
                                                                                            <img
                                                                                                onClick={() =>
                                                                                                    imgImgUnoAmpliar(
                                                                                                        index
                                                                                                    )
                                                                                                }
                                                                                                onMouseLeave={() =>
                                                                                                    imgImgUnoDisminuir()
                                                                                                }
                                                                                                className="imageresultprgvende"
                                                                                                src={
                                                                                                    URL_IMAGES_RESULTSSMS +
                                                                                                    message?.nombreimagen1
                                                                                                }
                                                                                                alt={
                                                                                                    message?.nombreimagen1
                                                                                                }
                                                                                            />
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                            <div className="msjsVend">
                                                                                {message?.comentario ? (
                                                                                    <div className="contComment">
                                                                                        <div className="msjVendedor2">
                                                                                            {message?.comentario}
                                                                                        </div>
                                                                                    </div>
                                                                                ) : null}
                                                                                <div className="namevendedor">
                                                                                    <div className="BallNamEv">
                                                                                        <p>
                                                                                            {
                                                                                                message?.mascara
                                                                                            }
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="contDateMSJ">
                                                                                <div
                                                                                    style={{
                                                                                        width: "81%",
                                                                                    }}></div>
                                                                                <div
                                                                                    style={{
                                                                                        width: "19%",
                                                                                    }}>
                                                                                    <div
                                                                                        style={{
                                                                                            width: "60%",
                                                                                        }}>
                                                                                        <p className="textofechamensaje">
                                                                                            {moment(
                                                                                                message?.fechacreamensaje
                                                                                            ).format(
                                                                                                "HH:mm"
                                                                                            )}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        // Mensaje no propio
                                                                        <div
                                                                            className="ContMsjsVendedor"
                                                                            key={
                                                                                index
                                                                            }>
                                                                            {message?.nombreimagen1 && message?.nombreimagen1 != 0 && (
                                                                                <div className="imageContainerChat2">
                                                                                    <div className="imgmensajescompras">
                                                                                        <img
                                                                                            className="imageresultprgvende"
                                                                                            src={
                                                                                                URL_IMAGES_RESULTSSMS +
                                                                                                message?.nombreimagen1
                                                                                            }
                                                                                            alt={
                                                                                                message?.nombreimagen1
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                            <div className="msjsVend1">
                                                                                <div className="namevendedor2">
                                                                                    <div className="BallNamEv2">
                                                                                        <p>
                                                                                            {
                                                                                                message?.mascara
                                                                                            }
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                                {message?.comentario ? (
                                                                                    <div className="contComment">
                                                                                        <div className="msjVendedor1">
                                                                                            {message?.comentario}
                                                                                        </div>
                                                                                    </div>
                                                                                ) : null}
                                                                            </div>
                                                                            <div className="contDateMSJ2">
                                                                                <p className="textofechamensaje">
                                                                                    {moment(
                                                                                        message?.fechacreamensaje
                                                                                    ).format(
                                                                                        "HH:mm"
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )
                                                        )
                                                    ) : (
                                                        <div className="haventMsjsDisples">
                                                            <p>
                                                                No hay mensajes
                                                                disponibles
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="contInputYimgSend">
                                                    {mostrar ? (
                                                        <div
                                                            className="inputandsendMsjVendedor"
                                                            onKeyPress={(e) => {
                                                                if (
                                                                    e.key ===
                                                                    "Enter"
                                                                ) {
                                                                    e.preventDefault(); // Evita la recarga de la página
                                                                    manejarEnvioMensaje();
                                                                }
                                                            }}>
                                                            <div className="contButtonImg">
                                                                <input
                                                                    type="file"
                                                                    id="imageUpload"
                                                                    onChange={
                                                                        handleImageUpload
                                                                    }
                                                                />
                                                                <button
                                                                    onClick={() =>
                                                                        document
                                                                            .getElementById(
                                                                                "imageUpload"
                                                                            )
                                                                            .click()
                                                                    }>
                                                                    <SlPaperClip
                                                                        size={
                                                                            19
                                                                        }
                                                                    />
                                                                </button>
                                                            </div>
                                                            <div className="contImgandInput">
                                                                <input
                                                                    value={
                                                                        inputMessage
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setInputMessage(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    placeholder="Escribe un mensaje al vendedor"
                                                                    readOnly={
                                                                        imageName
                                                                            ? true
                                                                            : false
                                                                    } // Hacer el input de solo lectura si se ha seleccionado una imagen
                                                                />
                                                                {selectedImage && (
                                                                    <div className="contImgSelected">
                                                                        <img
                                                                            src={
                                                                                selectedImage
                                                                            }
                                                                        />
                                                                        <button
                                                                            onClick={() => {
                                                                                setSelectedImage(
                                                                                    null
                                                                                );
                                                                                setInputMessage(
                                                                                    ""
                                                                                );
                                                                                setImageName(
                                                                                    ""
                                                                                );
                                                                            }}>
                                                                            <IoMdClose
                                                                                size={
                                                                                    30
                                                                                }
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="contSendMessage">
                                                                <button
                                                                    onClick={
                                                                        manejarEnvioMensaje
                                                                    }>
                                                                    <LuSendHorizonal
                                                                        size={
                                                                            25
                                                                        }
                                                                    //style={{
                                                                    //    cursor: inputMessage.trim()
                                                                    //        ? "pointer"
                                                                    //        : "not-allowed",
                                                                    //}}
                                                                    />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="inputandsendMsjVendedor">
                                                            {/* Segundo subcontainer */}
                                                            <p>
                                                                Has decidido no
                                                                recibir mensajes
                                                                del vendedor!
                                                            </p>
                                                            <p
                                                                className="unblocktext"
                                                                onClick={() =>
                                                                    setMostrar(
                                                                        true
                                                                    )
                                                                }>
                                                                Desbloquear
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </Grid>
                                        </Grid>

                                        {/*Right container */}
                                        <Grid
                                            className="contInfoProdComprCalif"
                                            item
                                            xs={12}
                                            md={5}
                                            flexDirection={"column"}>
                                            <div className="titlecalifVended">
                                                <p>Producto vendido: </p>
                                            </div>
                                            <Grid container>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={4}
                                                    className="contImgRighCalif"
                                                    mt={"2rem"}>
                                                    <img
                                                        src={`${URL_IMAGES_RESULTS}${producto[0]?.nombreImagen}`}
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={8}
                                                    className="continfocalifimg"
                                                    flexDirection={"column"}>
                                                    <p className="pNameProductCalif">
                                                        {
                                                            producto[0]?.nombreProducto
                                                        }
                                                    </p>
                                                    <div className="subtitlesvercompra">
                                                        <p>
                                                            Unidades compradas:
                                                        </p>
                                                        <p>
                                                            {producto[0]?.cantidad}
                                                        </p>
                                                    </div>
                                                    {
                                                        console.log("producto.price : ", producto)
                                                    }
                                                    <div className="subtitlesvercompra">
                                                        <p>
                                                            Precio del producto:
                                                        </p>
                                                        <p>
                                                            {myNumber(
                                                                1,
                                                                producto[0]?.price,
                                                                2
                                                            )}
                                                        </p>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            md={7}
                                            sx={{
                                                width: isMdDown
                                                    ? "100%"
                                                    : "90%",
                                            }}></Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            md={5}
                                            sx={{
                                                textAlign: "center",
                                                marginTop: "-4.3rem",
                                            }}>
                                            <p
                                                style={{
                                                    fontSize: "18px",
                                                    color: "#2D2E83",
                                                    textDecoration: "underline",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    setMostrar(false)
                                                }>
                                                No deseo recibir más mensajes
                                                del vendedor
                                            </p>
                                            <ModalMensajes
                                                shown={showModal}
                                                close={handleModalClose}
                                                titulo={tituloMensajes}
                                                mensaje={textoMensajes}
                                                tipo="error"
                                            />
                                        </Grid>
                                    </Grid>
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
        </div>
    );
}
