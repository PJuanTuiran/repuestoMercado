import { validateEmail } from "../../utilities/Validations"
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
import Container from "../../components/layouts/Container";
import ModalMensajes from "../mensajes/ModalMensajes";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { URL_BD_MR } from "../../helpers/Constants";
import { useDispatch, connect, useSelector } from "react-redux";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import firebase from "../../utilities/firebase";
import { getAuth, signInWithEmailAndPassword, updatePassword } from "firebase/auth";

export default function formPassword() {
    const router = useRouter();
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    // Inicializa el estado para el correo electrónico, la contraseña actual y la nueva contraseña
    const [email, setEmail] = useState('');
    const [contraseñaActual, setContraseñaActual] = useState('');
    const [nuevaContraseña, setNuevaContraseña] = useState('');
    const [datosUsuario, setDatosUsuario] = useState("");
    // Obtiene los datos del usuario autenticado desde el estado de Redux
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [confirmarNuevaContraseña, setConfirmarNuevaContraseña] = useState('');

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    //ModalDatosGUardados
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    //modales errores
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [showModalCodigo, setShowModalCodigo] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    //Top screen
    const irA = useRef(null);

    const handleConfirmationSuccess = (route) => () => {
        router.push(route);
    };
    //mostrarModaldeConfirmación
    const handleConfirmationOpen = () => {
        setConfirmationOpen(true);
    };
    //cerrarmodalError
    const handleModalClose = () => {
        setShowModalMensajes(false);
    };

    // Define un efecto de React que se ejecuta después de que el componente se monta y cada vez que 'datosusuarios' cambia
    useEffect(() => {
        // Define una función asíncrona para obtener los datos del usuario
        const leerDatosUsuario = async () => {
            // Define los parámetros para la solicitud
            let params = {
                usuario: datosusuarios.uid,
            };

            // Realiza una solicitud POST a tu endpoint
            await axios({
                method: "post",
                url: URL_BD_MR + "13",
                params,
            })
                .then((res) => {
                    setDatosUsuario(res.data[0]);
                    // Si la solicitud es exitosa, actualiza el estado del correo electrónico con el correo electrónico obtenido del endpoint
                    setEmail(res.data[0].email);
                })
                .catch(function (error) {
                    // Si ocurre un error, registra el error en la consola
                    console.error("Error al leer los datos del usuario", error);
                });
        };

        // Llama a la función para obtener los datos del usuario
        leerDatosUsuario();
    }, [datosusuarios]);  // Dependencias del efecto

    // Define una función asíncrona para manejar el envío del formulario
    const manejarEnvío = async (event) => {
        event.preventDefault();
        const auth = getAuth(firebase);

        // Validación de que todos los campos estén llenos
        if (!contraseñaActual || !nuevaContraseña || !confirmarNuevaContraseña) {
            console.error('Todos los campos deben estar llenos.');
            setShowModalMensajes(true);
            setTituloMensajes("Datos contraseña");
            setTextoMensajes("Todos los campos deben estar llenos.");
            return;
        }

        // Validación de que las contraseñas coincidan
        if (nuevaContraseña !== confirmarNuevaContraseña) {
            console.error('Las contraseñas ingresadas no coinciden. Por favor, asegúrate de que ambas sean iguales.');
            setShowModalMensajes(true);
            setTituloMensajes("Datos contraseña");
            setTextoMensajes("Las contraseñas ingresadas no coinciden. Por favor, asegúrate de que ambas sean iguales.");
            return;
        }

        // Validación de que la nueva contraseña no sea la misma que la contraseña actual
        if (nuevaContraseña === contraseñaActual) {
            console.error('La nueva contraseña no puede ser la misma que la contraseña actual.');
            setShowModalMensajes(true);
            setTituloMensajes("Datos contraseña");
            setTextoMensajes("La nueva contraseña no puede ser la misma que la contraseña actual.");
            return;
        }

        // Validación de que la contraseña no incluya caracteres especiales
        if (/[^a-zA-Z0-9]/.test(nuevaContraseña)) {
            console.error('La contraseña no debe incluir caracteres especiales.');
            setShowModalMensajes(true);
            setTituloMensajes("Datos contraseña");
            setTextoMensajes("La contraseña no debe incluir caracteres especiales.");
            return;
        }

        // Validación de la longitud de la contraseña
        if (nuevaContraseña.length < 8) {
            console.error('La contraseña debe contener mínimo 8 caracteres.');
            setShowModalMensajes(true);
            setTituloMensajes("Datos contraseña");
            setTextoMensajes("La contraseña debe contener mínimo 8 caracteres.");
            return;
        }

        // Validación de que la contraseña incluya números, letras minúsculas y mayúsculas
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(nuevaContraseña)) {
            console.error('La contraseña debe incluir números, letras minúsculas y mayúsculas.');
            setShowModalMensajes(true);
            setTituloMensajes("Datos contraseña");
            setTextoMensajes("La contraseña debe incluir números, letras minúsculas y mayúsculas.");
            return;
        }

        try {
            // Reautenticar al usuario
            await signInWithEmailAndPassword(auth, email, contraseñaActual);

            // Cambiar la contraseña
            const user = auth.currentUser;
            if (user) {
                await updatePassword(user, nuevaContraseña);
                console.log('La contraseña se actualizó correctamente');
                confirmarCrearCuenta();
                handleConfirmationOpen();
            } else {
                console.log('El usuario no está autenticado');
            }
        } catch (error) {
            console.error('Ocurrió un error', error);
            if (error.code === 'auth/wrong-password') {
                setShowModalMensajes(true);
                setTituloMensajes("Datos contraseña");
                setTextoMensajes("La contraseña actual ingresada no coincide con la contraseña de tu cuenta.");
            }
        }
    };

    function confirmarCrearCuenta() {
        //console.log("DATXX : ", datosToken)
        //return
        const dataCreaUsr = {
            "remitente": email,
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

    //Funciónes ver o no password1
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    const handleClickShowPassword3 = () => {
        setShowPassword3(!showPassword3);
    };

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    //Ruta ir atrás
    const rutaBack = (e) => {
        e.preventDefault()
        router.push('./seguridadData')
    }

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account">

                                <div className='titlesformsUsers'>
                                    <p>Editar contraseña</p>
                                </div>
                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '65%' }}>
                                    <Grid container spacing={2} mb={5}>
                                        <Grid item xs={12} md={6}>
                                            <div>
                                                <p className='titlesFormsUsers2'>Contraseña actual:</p>
                                                <div className="inpustEyes">
                                                    <input
                                                        type={showPassword3 ? 'text' : 'password'}
                                                        value={contraseñaActual}
                                                        onChange={(event) => setContraseñaActual(event.target.value)}
                                                    />
                                                    <div onClick={handleClickShowPassword3}>
                                                        {showPassword3 ? <FiEye /> : < FiEyeOff />}
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <div>
                                                <p className='titlesFormsUsers2'>Nueva contraseña</p>
                                                <div className="inpustEyes">
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={nuevaContraseña}
                                                        onChange={(event) => setNuevaContraseña(event.target.value)}
                                                    />
                                                    <div onClick={handleClickShowPassword}>
                                                        {showPassword ? <FiEye /> : < FiEyeOff />}
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <div>
                                                <p className='titlesFormsUsers2'>Confirmar nueva contraseña</p>
                                                <div className="inpustEyes">
                                                    <input
                                                        type={showPassword2 ? 'text' : 'password'}
                                                        value={confirmarNuevaContraseña}
                                                        onChange={(event) => setConfirmarNuevaContraseña(event.target.value)}
                                                    />
                                                    <div onClick={handleClickShowPassword2}>
                                                        {showPassword2 ? <FiEye /> : < FiEyeOff />}
                                                    </div>
                                                </div>
                                                <Box display="flex" justifyContent="space-between" marginTop={15}>
                                                    <button className='CancelarFormButton' onClick={rutaBack}>Cancelar</button>
                                                    <button className='GuardarFormButton' onClick={manejarEnvío}>Guardar</button>
                                                    <ModalMensajes
                                                        shown={showModalMensajes}
                                                        close={handleModalClose}
                                                        titulo={tituloMensajes}
                                                        mensaje={textoMensajes}
                                                        tipo="error"
                                                    />
                                                    <Dialog
                                                        className='dialogDatsGuardados'
                                                        open={confirmationOpen}
                                                        PaperProps={{
                                                            style: {
                                                                width: isMdDown ? '80%' : '35%',
                                                                backgroundColor: 'white',
                                                                border: '2px solid gray',
                                                                padding: '1.4rem',
                                                                borderRadius: '10px'
                                                            },
                                                        }}
                                                    >
                                                        <DialogTitle className='dialogtitleDtsGUardados' >
                                                            <FaCheckCircle size={37} style={{ color: '#10c045', marginLeft: '-17px', marginRight: '8px' }} />
                                                            <p className='dialogtituloP'>¡Cambios realizados con éxito!</p>
                                                        </DialogTitle>
                                                        <DialogContent className='dialogContentDatsGuardados'>
                                                            <p className='PdialogContent'>Tus cambios fueron realizamos con exito. Se verán reflejados un unos minutos.</p>
                                                        </DialogContent>
                                                        <DialogActions className='DialogActionsDatsGuardados'>
                                                            <div className='div1buttonDialog' >
                                                                <button className='button2DialogDatsGuardados' onClick={handleConfirmationSuccess('./seguridadData')} >
                                                                    Ir a seguridad
                                                                </button>
                                                            </div>
                                                            <div className='div1buttonDialog' >
                                                                <button className='button1DialogDatsGuardados' onClick={handleConfirmationSuccess('/')} >
                                                                    Ir al inicio
                                                                </button>
                                                            </div>
                                                        </DialogActions>
                                                    </Dialog>
                                                </Box>
                                            </div>
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