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
import { URL_BD_MR, URL_API_MR } from "../../helpers/Constants";
import { useDispatch, connect, useSelector } from "react-redux";
import { AiOutlineRight } from 'react-icons/ai';
import ReverseCounter from "../../components/timer/ReverseCounter";

export default function compSmsSeguridad() {
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const [showContainer, setShowContainer] = useState(false);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [datosUsuario, setDatosUsuario] = useState("");
    const [nombres, setNombres] = useState("");
    const [nombresDos, setNombresDos] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [apellidosDos, setApellidosDos] = useState("");
    const [telefonoRecibeSeleccionado, setTelefonoRecibeSeleccionado] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [selectOption, setSelectOption] = useState(0);

    const [seconds, setSeconds] = useState(300);

    const router = useRouter();
    const { tipoInformacion, info } = router.query;
    const [codigo, setCodigo] = useState('');
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [input5, setInput5] = useState('');
    const [input6, setInput6] = useState('');
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    const input5Ref = useRef(null);
    const input6Ref = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState('');
    const [textoMensajes, setTextoMensajes] = useState('');
    const [tituloSubcontainer, setTituloSubcontainer] = useState('Ingresa el código de verificación');
    const irA = useRef(null);

    const [resetCounter, setResetCounter] = useState(false);
    const [habilitar, setHabilitar] = useState(false);

    let titulo;

    // Determinar el título según el tipo de informac ión
    switch (tipoInformacion) {
        case 'password':
            titulo = 'Editar contraseña';
            break;
        case 'email':
            titulo = 'Editar correo electrónico';
            break;
        default:
            titulo = 'editar Usuario';
    }
    const redirectToComponent = (nuevoTitulo, item) => {
        const nuevoCodigo = Math.floor(100000 + Math.random() * 900000);
        setCodigo(nuevoCodigo);
        //console.log(nuevoCodigo);  // Imprimir el código en la consola

        setSelectOption(item);
        /* Enviar codigo por correo */

        /* Enviar codigo por correo */
        if (item == 1) {
            const sendSMS = () => {
                //console.log("DATOS USU : ", datosusuarios)
                //return
                let parrafo = "Para cambiar el nombre del usuario debes ingresar el siguiente codigo " + nuevoCodigo;

                const requestData = {
                    "phone": datosusuarios.celular,
                    "sms": parrafo,
                    "tipo": "09"
                };

                const config = {
                    headers: {
                        "Authorization": "$2y$10$hc8dShHM0E71/08Tcjq3nOdq.hCmOcn5mEH5a/UZ9Lk0eBptD8CeG",
                        "Content-Type": "application/json" || x < z
                    }
                };

                const sendRequest = async () => {
                    try {
                        const response = await axios.post(URL_API_MR + "endpoint/sms", requestData, config);
                        console.log("RESPONSE SMS : ", response.data);
                        //setOpenNewDialog(true); // Abre el nuevo diálogo
                        //setShowModal(true);
                    } catch (error) {
                        console.error('Errorxx:', error);
                    }
                }
                sendRequest();
            }
            sendSMS();

        } else
            if (item == 2) {
                const sendEmail = () => {
                    let parrafo = "CODIGO DE SEGURIDAD:  " + nuevoCodigo;

                    const requestData = {
                        "remitente": correoElectronico,
                        "asunto": "CODIGO DE SEGURIDAD",
                        "plantilla": "info",
                        "to" : "Mercado Repuesto",
                        "contenido_html": {
                            "title": "Para activar tu cuenta debes ingresar el siguiente codigo",
                            "subtitle": parrafo,
                            "body": "<p>Este dato es exclusivo para que puedas registrar tu cuenta, nadie de Mercado Repuesto te lo va a pedir en ninguna instancia, <strong>¡No compartas este código! ten en cuenta que vence en 5 minutos.</strong>.</p>",
                            "tipo": "01"
                        }
                    };

                    const config = {
                        headers: {
                            "Authorization": "$2y$10$hc8dShHM0E71/08Tcjq3nOdq.hCmOcn5mEH5a/UZ9Lk0eBptD8CeG",
                            "Content-Type": "application/json" || x < z
                        }
                    };

                    const sendRequest = async () => {
                        try {
                            const response = await axios.post(URL_API_MR + "endpoint/mail", requestData, config);
                            console.log(response.data);
                            //setOpenNewDialog(true); // Abre el nuevo diálogo
                            //setShowModal(true);
                        } catch (error) {
                            console.error('Errorxx:', error);
                        }
                    }
                    sendRequest();
                }
                sendEmail();
            } else
                if (item == 3) {
                    const sendEmail = () => {
                        let parrafo = "Para confirmar que deseas actulizar tus datos ingresa el siguiente codigo: " + nuevoCodigo;

                        let nombreusuario;
                        if (datosUsuario.tipoidentificacion != 1)
                            nombreusuario = datosUsuario.name + datosUsuario.lastname;
                        else
                            nombreusuario = datosUsuario.razonsocial;

                        const requestData = {
                            "to": "57" + datosusuarios.celular,
                            "template": "compra_cliente",
                            "parameters": [
                                {
                                    "type": "text",
                                    "text": nombreusuario
                                },
                                {
                                    "type": "text",
                                    "text": "Mercado Repuesto SAS"
                                },
                                {
                                    "type": "text",
                                    "text": "Actualización de datos"
                                },
                                {
                                    "type": "text",
                                    "text": parrafo
                                },
                                {
                                    "type": "text",
                                    "text": "XXXXX"
                                }
                            ]
                        };

                        const config = {
                            headers: {
                                "Authorization": "$2y$10$hc8dShHM0E71/08Tcjq3nOdq.hCmOcn5mEH5a/UZ9Lk0eBptD8CeG",
                                "Content-Type": "application/json" || x < z
                            }
                        };

                        const sendRequest = async () => {
                            try {
                                const response = await axios.post(URL_API_MR + "endpoint/ws-plantilla", requestData, config);
                                console.log("RESPONSE WHATSAPP : ", response.data);
                                //setOpenNewDialog(true); // Abre el nuevo diálogo
                                //setShowModal(true);
                            } catch (error) {
                                console.error('Errorxx:', error);
                            }
                        }
                        sendRequest();
                    }
                    sendEmail();
                } else {
                    setShowModal(true);
                    setTituloMensajes("Actualizar Datos");
                    setTextoMensajes("Selecciona un medio valido.");
                }


        // Mostrar el nuevo contenedor
        setShowContainer(true);
        setTituloSubcontainer(nuevoTitulo);
    };

    const handleContinue = () => {
        const inputCodigo = input1 + input2 + input3 + input4 + input5 + input6;
        if (inputCodigo === codigo.toString()) {
            // Navegar a la nueva ruta
            switch (info) {
                case 'password':
                    router.push('./formPassword');
                    break;
                case 'domicilio':
                    router.push('/EditUsers/FormsEditUsers/FormDomicilio');
                    break;
                case 'email':
                    router.push('./formEmailSeguridad');
                    break;
                default:
                    router.push('./seguridadData.jsx');
            }
        } else {
            // Mostrar modal indicando que el código es incorrecto
            setShowModal(true);
            setTituloMensajes('Código Incorrecto');
            setTextoMensajes('El código ingresado es incorrecto.');
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };
    const handleClose = () => {
        // Cerrar el popup
        setOpen(false);
    };


    useEffect(() => {
        const leerDatosUsuario = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });

                setDatosUsuario(res.data[0]);
                setNombres(res.data[0].primernombre);
                setNombresDos(res.data[0].segundonombre);
                setApellidos(res.data[0].primerapellido);
                setApellidosDos(res.data[0].segundoapellido);
                setTelefonoRecibeSeleccionado(res.data[0].celular);
                setCorreoElectronico(res.data[0].email);

            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
                // Maneja el error según tus necesidades
            }
        };

        leerDatosUsuario();
    }, [datosusuarios]);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    useEffect(() => {
        if (!habilitar) {
            const timer = setInterval(() => {
                setSeconds((prevSeconds) => parseInt(prevSeconds) - 1)
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [habilitar]);
    //console.log("TIMER : ", seconds)

    const reiniciar = () => {
        setHabilitar(true);
    }

    const reenviarToken = () => {
        setSeconds(300);
        setHabilitar(false);
        setResetCounter(true);
        redirectToComponent(tituloSubcontainer, selectOption);
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
                                    <p>{titulo}</p>
                                </div>
                                {!showContainer ? (
                                    <Grid className="containerOptionsMassage" container style={{ width: isMdDown ? '100%' : '55%', display: 'flex', margin: '0', padding: '.5rem', margin: '0 auto', justifyContent: 'center' }}>

                                        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                            <p className='titlescompSMS'>Verifica que eres tu</p>
                                            <p className='titlescompSMS'>Por donde deseas recibir el codigo de verificación</p>
                                        </div>

                                        <Box sx={{ borderRadius: '10px', padding: '.3rem', width: '100%', cursor: 'pointer' }}>
                                            <div onClick={() => redirectToComponent('Recibiste un número de 6 dígitos por SMS.', 1)} style={{ borderRadius: '10px', display: 'flex', justifyContent: 'space-between', color: '#2C2E82', backgroundColor: '#F0F1F5', padding: '2.4rem', width: '100%' }}>
                                                <div style={{ width: '100%', borderRadius: '10px' }}>
                                                    <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>SMS</p>
                                                    <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>Al celular terminado en {telefonoRecibeSeleccionado.slice(-4)}</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                                </div>
                                            </div>
                                        </Box>
                                        <Box sx={{ padding: '.3rem', width: '100%' }}>
                                            <div onClick={() => redirectToComponent('Recibiste un número de 6 dígitos por Correo.', 2)} style={{ borderRadius: '10px', display: 'flex', justifyContent: 'space-between', color: '#2C2E82', backgroundColor: '#F0F1F5', padding: '2.4rem', width: '100%', cursor: 'pointer' }}>
                                                <div style={{ width: '100%' }}>
                                                    <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>Correo Electrónico</p>
                                                    <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>Al correo: {correoElectronico}</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                                </div>
                                            </div>
                                        </Box>

                                        <Box sx={{ padding: '.3rem', width: '100%' }}>
                                            <div onClick={() => redirectToComponent('Recibiste un número de 6 dígitos por Whatsapp.', 3)} style={{ borderRadius: '10px', display: 'flex', justifyContent: 'space-between', color: '#2C2E82', backgroundColor: '#F0F1F5', padding: '2.4rem', width: '100%', cursor: 'pointer' }}>
                                                <div style={{ width: '100%' }}>
                                                    <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>Por WhatsApp</p>
                                                    <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>Al celular terminado en {telefonoRecibeSeleccionado.slice(-4)}</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                                </div>
                                            </div>
                                        </Box>
                                    </Grid>
                                ) : (


                                    <Grid className="newContainer" container style={{ width: isMdDown ? '100%' : '50%', display: 'flex', margin: '0', padding: '.5rem', margin: '0 auto', backgroundColor: '#f0f1f5', padding: '5rem', borderRadius: '10px', justifyContent: 'center', marginTop: '3rem' }}>
                                        <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                                            <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>Ingresa el codigo que recibiste.</p>
                                            <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>{tituloSubcontainer}</p>
                                        </div>
                                        <div className="input-fields" style={{ display: 'flex', width: '100%', marginTop: '2rem', marginBottom: '4.5rem', justifyContent: 'center' }}>
                                            <input style={{ height: '3.7em', width: '3.2em', outline: 'none', textAlign: 'center', fontSize: '1.5rem', color: '#2C2E82', borderRadius: '5px', margin: '.5rem' }} maxLength="1" type="tel" value={input1} onChange={(e) => { setInput1(e.target.value); if (e.target.value) input2Ref.current.focus(); }} onKeyDown={(e) => { if (e.key === 'Backspace' && !input1) input1Ref.current.focus(); }} ref={input1Ref} onFocus={(e) => e.target.style.border = '2px solid #2d2e83'} onBlur={(e) => e.target.style.border = '1px solid #f0f1f5'} />
                                            <input style={{ height: '3.7em', width: '3.2em', outline: 'none', textAlign: 'center', fontSize: '1.5rem', color: '#2C2E82', borderRadius: '5px', margin: '.5rem' }} maxLength="1" type="tel" value={input2} onChange={(e) => { setInput2(e.target.value); if (e.target.value) input3Ref.current.focus(); }} onKeyDown={(e) => { if (e.key === 'Backspace' && !input2) input1Ref.current.focus(); }} ref={input2Ref} onFocus={(e) => e.target.style.border = '2px solid #2d2e83'} onBlur={(e) => e.target.style.border = '1px solid #f0f1f5'} />
                                            <input style={{ height: '3.7em', width: '3.2em', outline: 'none', textAlign: 'center', fontSize: '1.5rem', color: '#2C2E82', borderRadius: '5px', margin: '.5rem' }} maxLength="1" type="tel" value={input3} onChange={(e) => { setInput3(e.target.value); if (e.target.value) input4Ref.current.focus(); }} onKeyDown={(e) => { if (e.key === 'Backspace' && !input3) input2Ref.current.focus(); }} ref={input3Ref} onFocus={(e) => e.target.style.border = '2px solid #2d2e83'} onBlur={(e) => e.target.style.border = '1px solid #f0f1f5'} />
                                            <input style={{ height: '3.7em', width: '3.2em', outline: 'none', textAlign: 'center', fontSize: '1.5rem', color: '#2C2E82', borderRadius: '5px', margin: '.5rem' }} maxLength="1" type="tel" value={input4} onChange={(e) => { setInput4(e.target.value); if (e.target.value) input5Ref.current.focus(); }} onKeyDown={(e) => { if (e.key === 'Backspace' && !input4) input3Ref.current.focus(); }} ref={input4Ref} onFocus={(e) => e.target.style.border = '2px solid #2d2e83'} onBlur={(e) => e.target.style.border = '1px solid #f0f1f5'} />
                                            <input style={{ height: '3.7em', width: '3.2em', outline: 'none', textAlign: 'center', fontSize: '1.5rem', color: '#2C2E82', borderRadius: '5px', margin: '.5rem' }} maxLength="1" type="tel" value={input5} onChange={(e) => { setInput5(e.target.value); if (e.target.value) input6Ref.current.focus(); }} onKeyDown={(e) => { if (e.key === 'Backspace' && !input5) input4Ref.current.focus(); }} ref={input5Ref} onFocus={(e) => e.target.style.border = '2px solid #2d2e83'} onBlur={(e) => e.target.style.border = '1px solid #f0f1f5'} />
                                            <input style={{ height: '3.7em', width: '3.2em', outline: 'none', textAlign: 'center', fontSize: '1.5rem', color: '#2C2E82', borderRadius: '5px', margin: '.5rem' }} maxLength="1" type="tel" value={input6} onChange={(e) => setInput6(e.target.value)} onKeyDown={(e) => { if (e.key === 'Backspace' && !input6) input5Ref.current.focus(); }} ref={input6Ref} onFocus={(e) => e.target.style.border = '2px solid #2d2e83'} onBlur={(e) => e.target.style.border = '1px solid #f0f1f5'} />
                                        </div>
                                        <div style={{ width: '67%' }}>

                                            <button onClick={handleContinue} style={{ width: '100%', backgroundColor: '#2D2E83', color: '#F0F1F5', padding: '10px', borderRadius: '10px', fontSize: '1.8rem' }}>Continuar</button>

                                            {
                                                !habilitar ?
                                                    <button
                                                        type="button"
                                                        style={{
                                                            width: '100%',
                                                            backgroundColor: '#F0F1F5',
                                                            color: '#2D2E83',
                                                            padding: '10px',
                                                            borderRadius: '10px',
                                                            fontSize: '1.8rem',
                                                            border: '2px solid #2D2E83',
                                                            marginTop: '1.5rem'
                                                        }}>
                                                            Reenviar código en: {
                                                                <ReverseCounter
                                                                    resetCounter={resetCounter}
                                                                    setResetCounter={setResetCounter}
                                                                />}
                                                    </button>
                                                    :
                                                    null
                                            }

                                            {
                                                habilitar ?
                                                    <div className="btnotrometodo"
                                                        onClick={() => reenviarToken()}
                                                    >
                                                        Reenviar codigo
                                                    </div>
                                                    :
                                                    null
                                            }
                                        </div>

                                        {
                                            seconds <= 0 && !habilitar ?
                                                reiniciar()
                                                :
                                                null
                                        }

                                        <div style={{ width: '70%', justifyContent: 'center', display: 'flex' }}>
                                            <div
                                                type="button"
                                                className="btnotrometodo"
                                                onClick={() => setShowContainer(false)}
                                            >
                                                Probar otro metodo
                                            </div>
                                        </div>
                                        {
                                            //<p>Código generado: {codigo}</p>
                                        }

                                        <ModalMensajes
                                            shown={showModal}
                                            close={handleModalClose}
                                            titulo={tituloMensajes}
                                            mensaje={textoMensajes}
                                            tipo="error"
                                        />
                                    </Grid>

                                )}

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}