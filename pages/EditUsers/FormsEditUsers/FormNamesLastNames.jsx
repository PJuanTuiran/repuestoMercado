//import MUI media
import {
    Box,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Button,
} from "@mui/material";
import Container from "../../../components/layouts/Container";
import ModalMensajes from "../../mensajes/ModalMensajes";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { URL_BD_MR } from "../../../helpers/Constants";
import { useDispatch, connect, useSelector } from "react-redux";


export default function FormNamesLastNames() {

    const router = useRouter();
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    /*States Modales*/
    const [datosUsuario, setDatosUsuario] = useState([]);
    const [datUsers, SetDatUser] = useState(null);
    const [nombresData, SetnombresData] = useState(null);
    const [apellidosData, SetapellidosData] = useState(null);
    const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] = useState(null); // Nuevo estado
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [apellidosCompletos, setApellidosCompletos] = useState("");
    const handleInputChange = (event, setInput) => {
        const inputValue = event.target.value;
        if (/^[A-Za-z\s]+$/.test(inputValue) || inputValue === "") {
            setInput((prevValue) => inputValue);
        }
    };

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    useEffect(() => {
        const leerDatosUsuario = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };
            //console.log("VISITAS: ", params);
            await axios({
                method: "post",
                url: URL_BD_MR + "13",
                params,
            })
                .then((res) => {
                    //console.log("DAT USERS: ", res.data);
                    setDatosUsuario(res.data[0]);
                    setNombreCompleto(res.data[0].primernombre + " " + res.data[0].segundonombre);
                    setApellidosCompletos(res.data[0].primerapellido + " " + res.data[0].segundoapellido);
                })
                .catch(function (error) {
                    return;
                });
        };
        leerDatosUsuario();
    }, [datosusuarios]);

    //modal Open cuando se guarde
    const handleConfirmationOpen = () => {
        setConfirmationOpen(true);
    };

    //Cerrar Modal
    const handleModalClose = () => {
        setShowModal(false);
    };

    //ruta de cuando se confirma correctamente el modal
    const handleConfirmationSuccess = (route) => () => {
        router.push(route);
    };

    const handleValidacion = () => {
        let nombres = nombreCompleto.split(" ");
        let primerNombre = nombres[0];
        let segundoNombre = nombres[1];

        let apellidos = apellidosCompletos.split(" ");
        let primerApellido = apellidos[0];
        let segundoApellido = apellidos[1];

        if (primerNombre.length < 2 || primerApellido.length < 2) {
            setTituloMensajes("Validación de Nombres y Apellidos");
            setTextoMensajes("Cada campo debe tener al menos dos caracteres.");
            setShowModal(true);
            return;
        }
        if (/^\d+$/.test(primerNombre) || /^\d+$/.test(primerApellido)) {
            setTituloMensajes("Nombres y Apellidos");
            setTextoMensajes(
                "Los nombres y apellidos no pueden contener solo números."
            );
            setShowModal(true);
            return;
        }
        if (primerNombre.length > 40 || primerApellido.length > 40) {
            setTituloMensajes("Nombres y Apellidos");
            setTextoMensajes("Cada campo no puede exceder los 40 caracteres.");
            setShowModal(true);
            return;
        }
        updateData(primerNombre, segundoNombre, primerApellido, segundoApellido);
    };

    const updateData = (primerNombre, segundoNombre, primerApellido, segundoApellido) => {
        //alert("ENTRE")
        //return
        const url = "https://gimcloud.com.co/mrp/api/+75";

        let params = {
            primernombre: primerNombre,
            segundonombre: segundoNombre,
            primerapellido: primerApellido,
            segundoapellido: segundoApellido,
            razonsocial: ".",
            tipoidentificacion: datosUsuario.tipoidentificacion,
            identificacion: datosUsuario.identificacion,
            celular: datosUsuario.celular,
            email: datosUsuario.email,
            token: datosUsuario.token,
            activo: datosUsuario.activo,
            direccion: datosUsuario.direccion,
            fechacreacion: datosUsuario.fechacreacion,
            fechatoken: datosUsuario.fechatoken,
            uid: datosUsuario.uid,
            // ...resto de los datos
        };
        console.log("Datos usuario : ", params);

        const updateDatosUsuario = async () => {
            //console.log("VISITAS: ", params);
            await axios({
                method: "post",
                url: URL_BD_MR + "75",
                params,
            })
                .then((res) => {
                    handleConfirmationOpen();
                    console.log("ACTULIZA DAT USERS: ", res.data);
                    confirmarCrearCuenta();
                })
                .catch(function (error) {
                    return;
                });
        };
        updateDatosUsuario();

    };

    function confirmarCrearCuenta() {
        //console.log("DATXX : ", datosToken)
        //return
        const dataCreaUsr = {
            "remitente": datosUsuario.email,
            "asunto": "¡ACTUALIZASTE TUS DATOS EN MERCADO REPUESTO!",
            "plantilla": "info",
            "to" : "Mercado Repuesto",
            "contenido_html": {
                "title": "Actualización de datos",
                "subtitle": "Realizaste la actualización de datos",
                "body": "<p>Puedes revisar tus nuevos datos, iniciando sesión en nuestra pagina web, <strong>si no fuiste tu por favor contáctanos de manera inmediata.</strong>.</p>",
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

    useEffect(() => {
        //leerDatosUsuario();
    }, []);

    //Botón ir a mis datos
    const handleValidP = () => {
        router.push("../../my-account");
    };

    //Posición top Pagina
    const irA = useRef(null);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    //console.log("NOMBRE : ", nombreCompleto);
    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account">
                                <div className="titlesformsUsers">
                                    <p>Editar nombres y apellidos</p>
                                </div>

                                <Grid
                                    className="contDataUsers"
                                    container
                                    style={{
                                        width: isMdDown ? "100%" : "65%",
                                    }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <p className="titlesFormsUsers2">
                                                Nombres
                                            </p>
                                            <input
                                                type="text"
                                                value={nombreCompleto}
                                                placeholder="Ingrese primer y segundo nombre"
                                                className="InputFormsUsers"
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        setNombreCompleto
                                                    )
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <p className="titlesFormsUsers2">
                                                Apellidos
                                            </p>
                                            <input
                                                type="text"
                                                value={apellidosCompletos}
                                                placeholder="Ingrese apellidos"
                                                className="InputFormsUsers"
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        setApellidosCompletos
                                                    )
                                                }
                                            />
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                marginTop={15}>
                                                <button
                                                    onClick={handleValidP}
                                                    className="CancelarFormButton">
                                                    Cancelar
                                                </button>
                                                <button
                                                    onClick={handleValidacion}
                                                    className="GuardarFormButton">
                                                    Guardar
                                                </button>
                                                <ModalMensajes
                                                    shown={showModal}
                                                    close={handleModalClose}
                                                    titulo={tituloMensajes}
                                                    mensaje={textoMensajes}
                                                    tipo="error"
                                                />
                                            </Box>
                                            <Dialog
                                                className="dialogDatsGuardados"
                                                open={confirmationOpen}
                                                PaperProps={{
                                                    style: {
                                                        width: isMdDown
                                                            ? "80%"
                                                            : "35%",
                                                        backgroundColor:
                                                            "white",
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
                                                        ¡Cambios realizados con
                                                        éxito!
                                                    </p>
                                                </DialogTitle>
                                                <DialogContent className="dialogContentDatsGuardados">
                                                    <p className="PdialogContent">
                                                        Tus cambios fueron
                                                        realizamos con exito. Se
                                                        verán reflejados un unos
                                                        minutos.
                                                    </p>
                                                </DialogContent>
                                                <DialogActions className="DialogActionsDatsGuardados">
                                                    <div className="div1buttonDialog">
                                                        <button
                                                            className="button2DialogDatsGuardados"
                                                            onClick={handleConfirmationSuccess(
                                                                "/EditUsers/MisDatos"
                                                            )}>
                                                            Ir a Mis datos
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
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

