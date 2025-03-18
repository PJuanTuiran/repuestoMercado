import Fade from '@mui/material/Fade';
import { AiFillCaretDown } from 'react-icons/ai'
import { AiFillCaretUp } from 'react-icons/ai'
import Container from '../../../components/layouts/Container'
import {
    Dropdown,
    DropdownButton
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalMensajes from '../../mensajes/ModalMensajes';
import { useRouter } from "next/router";
//import MUI media
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, Button } from '@mui/material';
import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { URL_BD_MR } from '../../../helpers/Constants';
import axios from 'axios';
import { useDispatch, connect, useSelector } from "react-redux";

const CustomDropdownButton = React.forwardRef(({ children, onClick, href }, ref) => (
    <button
        ref={ref}
        onClick={onClick}
        href={href}
        className="dropdowncustomTdocPersButton"
    >
        {children}
    </button>
));

export default function FormDocumento() {
    const router = useRouter();
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const handleConfirmationOpen = () => {
        setConfirmationOpen(true);
    };

    const handleConfirmationSuccess = (route) => () => {
        router.push(route);
    };
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const [datosUsuario, setDatosUsuario] = useState([]);

    const [datUsers, SetDatUser] = useState(null);
    const [nombresData, SetnombresData] = useState(null);
    const [apellidosData, SetapellidosData] = useState(null);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [alertBtnNroDcto, setAlertBtnNroDcto] = useState("cajanrodocto alertboton");
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");

    const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] = useState(null); // Nuevo estado
    const [selectedItem, setSelectedItem] = useState('Tipo documento');

    const [nroDocumentoSeleccionado, setNroDocumentoSeleccionado] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [nombresDos, setNombresDos] = useState("");
    const [apellidosDos, setApellidosDos] = useState("");
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
                    setNombres(res.data[0].primernombre);
                    setNombresDos(res.data[0].segundonombre);
                    setApellidos(res.data[0].primerapellido);
                    setApellidosDos(res.data[0].segundoapellido);
                    setNroDocumentoSeleccionado(res.data[0].identificacion);
                    setSelectedItem(res.data[0].nombredocumento);
                })
                .catch(function (error) {
                    return;
                });
        };
        leerDatosUsuario();
    }, [datosusuarios]);

    const handleSelect = (data, name) => {
        setSelectedItem(name);
        setTipoDocumentoSeleccionado(data); // Seleccionar un tipo de documento establece el estado en verdadero
    };

    const handleModalClose = () => {
        setShowModalMensajes(false);
    };

    const handleChangeInputCedula = (data) => {
        setNroDocumentoSeleccionado(data);
    };

    const handleValidacionCedula = () => {
        let control = false;
        // Validar caracteres de la cédula
        let validarid;
        let haycaracterididentificacion = false;
        for (let i = 0; i < nroDocumentoSeleccionado.length; i++) {
            validarid = nroDocumentoSeleccionado.substr(i, 1);
            if (!/^\d+$/.test(validarid)) {
                haycaracterididentificacion = true;
                console.log("CARACTER", i, validarid);
            } else {
                console.log("ES UN NUMERO ", i, validarid);
            }
        }
        // Validar longitud mínima de la cédula
        if (nroDocumentoSeleccionado.length < 6) {
            haycaracterididentificacion = true;
        }
        if (haycaracterididentificacion) {
            control = true;
            setAlertBtnNroDcto("cajanrodocto alertboton");
            setShowModalMensajes(true);
            setTituloMensajes("Datos de pago");
            setTextoMensajes("Por favor ingresa una identificación válida!");
        }
        // Validar si se ha seleccionado un tipo de documento
        if (tipoDocumentoSeleccionado === false) {
            setShowModalMensajes(true);
            setTituloMensajes("Datos de pago");
            setTextoMensajes("Por favor, selecciona un tipo de documento.");
            return;
        }
        if (!control) {
            updateData();
        }
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        if (/^[0-9\s]+$/.test(inputValue) || inputValue === '') {
            setNroDocumentoSeleccionado(inputValue);
        }
    };

    const updateData = () => { 

        let params = {
            primernombre: nombres,
            segundonombre: nombresDos,
            primerapellido: apellidos,
            segundoapellido: apellidosDos,
            razonsocial: ".",
            tipoidentificacion: tipoDocumentoSeleccionado,
            identificacion: nroDocumentoSeleccionado,
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
        //console.log("Datos usuario : ", params);
        //return
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
                "title": "ACTUALIZACIÓN DE DATOS EXITOSA",
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

    const tipoDocumento = [
        { value: 1, nombre: "Cedula de ciudadanía" },
        { value: 2, nombre: "Cedula de extranjería" },
        { value: 3, nombre: "Pasaporte" },
        { value: 6, nombre: "Numero de identificación tributaria" }
    ];

    const handleValidP = () => {
        router.push('../../my-account');
    };

    const irA = useRef(null);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount" ref={irA}>
                        <div className="container">
                            <div className="ps-page__header"></div>
                            <div className="ps-page__content ps-account">

                                <div className='titlesformsUsers'>
                                    <p>Editar documento identidad</p>
                                </div>

                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '65%' }}>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={4}>
                                            <p className='titlesFormsUsers2'>Tipo de documento</p>
                                            <Dropdown style={{ width: '100%' }} >
                                                <Dropdown.Toggle
                                                    as={CustomDropdownButton}
                                                    id="dropdown-basic"
                                                >
                                                    {selectedItem}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="tamañocajaoptionsTdocPersona">
                                                    {tipoDocumento &&
                                                        tipoDocumento.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustomcity"
                                                                        onClick={() =>
                                                                            handleSelect(
                                                                                item.value,
                                                                                item.nombre
                                                                            )
                                                                        }
                                                                        eventKey={
                                                                            item.value
                                                                        }>
                                                                        {
                                                                            item.nombre
                                                                        }
                                                                    </Dropdown.Item>
                                                                )
                                                            }
                                                        )
                                                    }
                                                   
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Grid>
                                        <Grid item xs={12} md={8}>
                                            <p className='titlesFormsUsers2'>Documento de identidad</p>
                                            <input
                                                type="text"
                                                placeholder="Ej: 1000193191"
                                                className='InputFormsUsers'
                                                value={nroDocumentoSeleccionado}
                                                onChange={(e) => handleChangeInputCedula(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}></Grid>
                                        <Grid item xs={12} md={6}>
                                            <Box display="flex" justifyContent="space-between" marginTop={15}>
                                                <button onClick={handleValidP} className='CancelarFormButton'>Cancelar</button>
                                                <button onClick={handleValidacionCedula} className='GuardarFormButton'>Guardar</button>
                                                <ModalMensajes
                                                    shown={showModalMensajes}
                                                    close={handleModalClose}
                                                    titulo={tituloMensajes}
                                                    mensaje={textoMensajes}
                                                    tipo="error"
                                                />
                                            </Box>
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
                                                        <button className='button2DialogDatsGuardados' onClick={handleConfirmationSuccess("/EditUsers/MisDatos")} >
                                                            Ir a Mis datos
                                                        </button>
                                                    </div>
                                                    <div className='div1buttonDialog' >
                                                        <button className='button1DialogDatsGuardados' onClick={handleConfirmationSuccess('/')} >
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