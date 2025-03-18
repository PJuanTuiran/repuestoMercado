import Container from "../../components/layouts/Container"
import { Dialog, DialogTitle, DialogActions, DialogContent, TextField } from '@mui/material';
import { Modal, Grid, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { URL_BD_MR, URL_MK_MR,  URL_IMAGES_RESULTSSMS, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import ModalMensajes from "../mensajes/ModalMensajes";
import shortid from "shortid";
import { FaCamera } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import PDFViewer from "./VerPDF";
import Moment from "moment";

let arrayImagenes = [];

export default function RetiroDinero() {

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.

    const [imagenSel1, setImagenSel1] = useState(null);
    const [imagenSel2, setImagenSel2] = useState(null);

    const irA = useRef(null);//PosiciónTopPage
    const fileInput = useRef(null);

    const fileEditImguno = useRef(null);
    const fileEditImgDos = useRef(null);

    const [UidUser, setUidUser] = useState("");
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [mostrarContenedor, setMostrarContenedor] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [showModal, setShowModal] = useState(false); //Estado de modal
    // Estado de cuenta
    const [estadoCuenta, setEstadoCuenta] = useState(null);
    const [datosUsuario, setDatosUsuario] = useState(null);
    const [bancos, setBancos] = useState([]);
    const [tiposIdentificacion, setTiposIdentificacion] = useState([]);
    const [tipoIdentificacion, setTipoIdentificacion] = useState("");
    const [tipodeCuenta, setTipodeCuenta] = useState("");
    const [selectedTipoIdentificacion, setSelectedTipoIdentificacion] = useState("tipo de identificación");
    const [selectedTipoCuenta, setSelectedTipoCuenta] = useState("tipo de cuenta");
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [textoEnlace, setTextoEnlace] = useState("Haz clic aquí, para ir a tu billetera: ");

    const [errorNombreTitular, setErrorNombreTitular] = useState(false);
    // Estado para manejar el error en el campo "identificacion"
    const [errorIdentificacion, setErrorIdentificacion] = useState(false);
    // Estado para manejar el error en el campo "numerodecuenta"
    const [errorNumeroDeCuenta, setErrorNumeroDeCuenta] = useState(false);
    // Estado para manejar el error en el campo "selectedTipoIdentificacion"
    const [errorTipoIdentificacion, setErrorTipoIdentificacion] = useState(false);
    // Estado para manejar el error en el campo "selectedEntidadBancaria"
    const [errorEntidadBancaria, setErrorEntidadBancaria] = useState(false);
    // Estado para manejar el error en el campo "selectedTipodeCuenta"
    const [errorTipoCuenta, setErrorTipoCuenta] = useState(false);
    const [errorNombreDctoUno, setErrorNombreDctoUno] = useState(false);
    // Estado para manejar el error en el campo "identificacion"
    const [errorNombreDctoDos, setErrorNombreDctoDos] = useState(false);
    // Estado para manejar el error en el campo "identificacion"

    const [selectedEntidadBancaria, setSelectedEntidadBancaria] = useState("Seleccione banco");
    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };
    const [archivoUser, setArchivoUser] = useState(null);

    const [nameFileLoad, setNameFileLoad] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPDF, setSelectedPDF] = useState(null);
    const [selectedImageDos, setSelectedImageDos] = useState(null);
    const [selectedPDFDos, setSelectedPDFDos] = useState(null);

    const [modalVerPdf, setModalVerPdf] = useState(false);
    const [pdfSelectedView, setPdfSelectedView] = useState(null);

    const [extensionUno, setExtensionUno] = useState("");
    const [extensionDos, setExtensionDos] = useState("");

    const [tipoFileUno, setTipoFileUno] = useState(null);
    const [tipoFileDos, setTipoFileDos] = useState(null);

    const handleClosePdf = () => setModalVerPdf(false);

    const [loadFile, setLoadFile] = useState(false);

    const handleClickImg = () => {
        fileInput.current.click();
    }

    const handleEditImgUno = () => {
        fileEditImguno.current.click();
    }

    const handleEditImgDos = () => {
        fileEditImgDos.current.click();
    }

    const verDatosPdf = (data) => {
        setPdfSelectedView(selectedPDF)
        setModalVerPdf(true);
    }

    const verDatosPdfDos = (data) => {
        setPdfSelectedView(selectedPDFDos)
        setModalVerPdf(true);
    }

    useEffect(() => {
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

        const obtenerTipodecuenta = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}233`,
                });
                if (Array.isArray(res.data.tipodecuenta)) {
                    setTipodeCuenta(res.data.tipodecuenta);
                } else {
                    console.error("Error: se esperaba un array, pero se recibió", res.data.tipodecuenta);
                }
            } catch (error) {
                console.error("Error al obtener los tipos de identificación", error);
            }
        };
        obtenerTipodecuenta();
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

    const CustomDropdownButton = React.forwardRef(({ children, onClick, href }, ref) => (
        <button
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            href={href}
            className="DropDownTipoDocumentoBanco"
        >
            {children}
        </button>
    ));

    const CustomDropdownButtonBanco = React.forwardRef(({ children, onClick, href }, ref) => (
        <button
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            href={href}
            className="DropDownTipoDocumentoBanco"
        >
            {children}
        </button>
    ));


    //Botón de siguiente verificando el numero y el dinero del usuario
    const handleClick = () => {
        // Verificamos si el valor de la transferencia es mayor que 0 y no comienza con 0
        const valorTransferencia = parseInt(form.valortransferencia.replace(/,/g, ''));
        if (valorTransferencia <= 0 || form.valortransferencia.startsWith('0')) {
            setTituloMensajes('Validación de mensaje');
            setTextoMensajes('El valor de la transferencia debe ser mayor a 0');
            setShowModal(true);
            return; // Salimos de la función para no abrir el siguiente contenedor
        }

        // Verificamos si el valor de la transferencia es mayor que el saldo final
        if (valorTransferencia > estadoCuenta) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('El valor de la transferencia no puede ser mayor al saldo de tu cuenta!');
            setShowModal(true);
            return; // Salimos de la función para no abrir el siguiente contenedor
        }

        // Si todo está bien, abrimos el siguiente contenedor
        setMostrarContenedor(true);
    };

    //Petición para ver estado de cuenta del usuario con su uid
    useEffect(() => {
        const listarSolPendientes = async () => {

            let valsolpendiente = 0;

            let params = {
                uidvendedor: datosusuarios.uid
            }

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "1552", params
                });

                if (res.data.type == 1) {
                    res.data.listarsolpendiente &&
                        res.data.listarsolpendiente.map((pendt) => {
                            valsolpendiente = parseFloat(valsolpendiente) + parseFloat(pendt.valortransferencia);
                            //console.log("PENDIE : ", pendt.valortransferencia)
                        });
                    EstadoCuentaUsuario(valsolpendiente);
                }
            } catch (error) {
                console.error("Error al leer los datos", error);
            }
        };
        listarSolPendientes();

        const EstadoCuentaUsuario = async (valpte) => {

            //console.log("PENDIE : ", valpte)

            let params = {
                uidcomprador: datosusuarios.uid,
            };

            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}218`,
                    params,
                });

                //console.log("DATOSXXX : ", res.data.listmovbilletera)

                let saldocta = 0;
                res.data.listmovbilletera &&
                    res.data.listmovbilletera.map((mov) => {
                        //console.log("MOCCC : ", mov)
                        if (mov.idtransaccion == 1) {
                            saldocta = parseFloat(saldocta) + parseFloat(mov.valorabono);
                        } else
                            if (mov.idtransaccion == 2) {
                                saldocta = parseFloat(saldocta) - parseFloat(mov.valorabono);
                            }

                    });

                //console.log("SALDCTA : ", saldocta)
                saldocta = parseFloat(saldocta) - parseFloat(valpte);
                setEstadoCuenta(saldocta);
            } catch (error) {
                console.error(
                    "Error al leer las transacciones del vendedor",
                    error
                );
            }
        };

    }, [datosusuarios]);

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
                setDatosUsuario(res.data[0]);
                setUidUser(res.data[0].uid)
            } catch (error) {
                console.error("Error al leer los datos del usuario a retirar", error);
                // Maneja el error según tus necesidades
            }
        };
        datosDeusuario();
    }, [datosusuarios]);


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

    //función para obtener bancos
    useEffect(() => {
        const obtenerBancos = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}157`,
                });
                if (Array.isArray(res.data.listarbancos)) {
                    setBancos(res.data.listarbancos);
                } else {
                    console.error("Error: se esperaba un array, pero se recibió", res.data.listarbancos);
                }
            } catch (error) {
                console.error("Error al obtener los bancos", error);
            }
        };
        obtenerBancos();
    }, []);


    //función para obtener tipos de identificación
    useEffect(() => {
        const obtenerTiposIdentificacion = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}7`,
                });
                if (Array.isArray(res.data.tipoidentificacion)) {
                    setTiposIdentificacion(res.data.tipoidentificacion);
                } else {
                    console.error("Error: se esperaba un array, pero se recibió", res.data.tipoidentificacion);
                }
            } catch (error) {
                console.error("Error al obtener los tipos de identificación", error);
            }
        };
        obtenerTiposIdentificacion();
    }, []);

    //función para ponerle "," a valor
    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    //Función para eliminar "," a la hora de envíar
    const handleChangeValorTransferencia = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, "");
        setForm({
            ...form,
            valortransferencia: formatNumber(value),
        });
    };

    //Función para handles de form para hacer retiro 
    const handleChangeRetiro = (e) => {
        const { name, value } = e.target;

        // Actualiza el valor del campo
        setForm(prevState => ({ ...prevState, [name]: value }));

        // Verifica el campo "nombretitular"
        if (name === 'nombretitular') {
            if (!value) {
                setErrorNombreTitular(true);
            } else {
                setErrorNombreTitular(false);
            }
        }

        if (name === 'nombredocumentouno') {
            if (!value) {
                setErrorNombreDctoUno(true);
            } else {
                setErrorNombreDctoUno(false);
            }
        }

        if (name === 'nombredocumentodos') {
            if (!value) {
                setErrorNombreDctoDos(true);
            } else {
                setErrorNombreDctoDos(false);
            }
        }

        // Verifica el campo "identificacion"
        if (name === 'identificacion') {
            if (!value || value.length < 6) {
                setErrorIdentificacion(true);
            } else {
                setErrorIdentificacion(false);
            }
        }

        // Verifica el campo "numerodecuenta"
        if (name === 'numerodecuenta') {
            if (!value || value.length < 6) {
                setErrorNumeroDeCuenta(true);
            } else {
                setErrorNumeroDeCuenta(false);
            }
        }

    };

    //petición para hacer el retiro del usuario
    const validarFormulario = () => {
        // Verificamos si algún campo está vacío
        for (let campo in form) {
            if (form[campo] === '') {
                setTituloMensajes('¡Cuidado!');
                setTextoMensajes('Todos los campos deben estar llenos para poder enviar la petición.');
                setShowModal(true);
                return false; // Salimos de la función para no enviar la petición
            }
        }

        // Verificamos si el número de identificación y el número de cuenta tienen al menos 6 caracteres
        if (form.identificacion.length < 6 || form.numerodecuenta.length < 6) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('El número de identificación y el número de cuenta deben tener al menos 6 caracteres.');
            setShowModal(true);
            return false; // Salimos de la función para no enviar la petición
        }

        // Verificamos si el valor de la transferencia es 0 o comienza con 0
        const valorTransferencia = parseInt(form.valortransferencia.replace(/,/g, ''));
        if (valorTransferencia <= 0 || form.valortransferencia.startsWith('0')) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('El valor de la transferencia debe ser mayor que 0 y no puede comenzar con 0.');
            setShowModal(true);
            return false; // Salimos de la función para no enviar la petición
        }

        // Verificamos si el valor de la transferencia es mayor que el saldo final
        if (valorTransferencia > estadoCuenta) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('El valor de la transferencia no puede ser mayor al saldo de tu cuenta!');
            setShowModal(true);
            return false; // Salimos de la función para no enviar la petición
        }

        // Si todas las validaciones pasan, retornamos true
        return true;
    };

    // Función para hacer la petición a la API
    const enviarPeticion = async (params) => {
        try {
            const res = await axios({
                method: "post",
                url: `${URL_BD_MR}154`,
                params,
            });
            console.log("Respuesta del servidor petición retiro:", res.data); // Aquí agregamos el console.log

            if (res.data.type == 1) {
                const crearNotificacionUsuario = async () => {

                    const idnotificacion = Math.floor(Math.random() * 10000000);
                    let comentario = 'Tienes una nueva solicitud de retiro';

                    let params = {
                        estado: 0,
                        uidusuario: 1653161788618,
                        idnotificacion: idnotificacion,
                        idorigen: 0,
                        comentario: comentario,
                        estado: 90,
                        ctlrnotificaentrada: 0,
                        ctlrnotificasalida: 0,
                        tiponotificacion: 12,
                    }

                    try {
                        const res = await axios({
                            method: "post",
                            url: URL_BD_MR + "823", params
                        });

                        if (res.data.type == 1) {
                            console.log("Notificación creada")
                            sendEmailRetiro();
                            //handleOpenDialog();
                        }
                    } catch (error) {
                        console.error("Error creando Notificación", error);
                    }
                };
                crearNotificacionUsuario();
            }
            // Si la petición se completa con éxito, abrimos el dialog

        } catch (error) {
            console.error("Error al enviar petición a retirar", error);
        }
    };

    function sendEmailRetiro() {
        let datauser = JSON.parse(localStorage.getItem("datauser"));
        //alert("entre")
        console.log("DATUSER : ", datauser)
        console.log("NOMBRE : ", form.nombretitular)
        console.log("CUENTA : ", form.numerodecuenta)
        //form.numerodecuenta
        const crearNotificacionUsuario = async () => {
            const idnotificacion = Math.floor(Math.random() * 10000000);
            let comentario = 'Tienes una nueva solicitud de retiro';

            let params = {
                estado: 0,
                uidusuario: datauser.uid,
                idnotificacion: idnotificacion,
                idorigen: 0,
                comentario: comentario,
                estado: 90,
                ctlrnotificaentrada: 0,
                ctlrnotificasalida: 0,
                tiponotificacion: 12,
            }

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "823", params
                });

                if (res.data.type == 1) {
                    console.log("Notificación creada")
                    enviarCorreo();
                }
            } catch (error) {
                console.error("Error creando Notificación", error);
            }
        };
        crearNotificacionUsuario();

        const enviarCorreo = async () => {
            let mensaje = "Hemos recibido una solicitud de retiro: " + fechaactual +
                " a nombre de:  " + form.nombretitular;

            let enlace = URL_MK_MR + "loginaccount/?ctlredirigir=0246810&redirect=15";
            //let enlace = "http://localhost:3000/loginaccount/?ctlredirigir=0246810&redirect=15";

            const dataRetiro = {
                "remitente": datauser.email,
                "asunto": "SOLICITUD DE RETIRO",
                "plantilla": "info",
                "to": "Mercado Repuesto",
                "contenido_html": {
                    "title": "Consignar en la cuenta N. " + form.numerodecuenta,
                    "subtitle": textoEnlace + " " + enlace,
                    "body": mensaje,
                    "tipo": "01"
                }
            };

            //console.log("DATARETIRO : ", dataRetiro)
            //return

            const config = {
                headers: {
                    "Authorization": "$2y$10$hc8dShHM0E71/08Tcjq3nOdq.hCmOcn5mEH5a/UZ9Lk0eBptD8CeG",
                    "Content-Type": "application/json" || x < z
                }
            };

            const sendMessage = async () => {
                try {
                    const response = await axios.post("https://gimcloud.com.co/api/endpoint/mail", dataRetiro, config);
                    console.log(response.data);
                    router.push("./");
                } catch (error) {
                    console.error('Errorxx:', error);
                }
            }
            sendMessage();
        }
    }

    const hacerPeticionRetiro = async () => {
        // Inicializamos una variable para verificar si el formulario es válido
        let esFormularioValido = true;

        // Verificamos si el campo "nombretitular" está vacío
        if (!form.nombretitular) {
            setErrorNombreTitular(true);
            esFormularioValido = false;
        } else {
            setErrorNombreTitular(false);
        }

        if (!form.nombredocumentouno) {
            setErrorNombreDctoUno(true);
            esFormularioValido = false;
        } else {
            setErrorNombreDctoUno(false);
        }

        if (!form.nombredocumentodos) {
            setErrorNombreDctoDos(true);
            esFormularioValido = false;
        } else {
            setErrorNombreDctoDos(false);
        }

        // Verificamos si el campo "identificacion" está vacío o tiene menos de 6 caracteres
        if (!form.identificacion || form.identificacion.length < 6) {
            setErrorIdentificacion(true);
            esFormularioValido = false;
        } else {
            setErrorIdentificacion(false);
        }

        // Verificamos si el campo "numerodecuenta" está vacío o tiene menos de 6 caracteres
        if (!form.numerodecuenta || form.numerodecuenta.length < 6) {
            setErrorNumeroDeCuenta(true);
            esFormularioValido = false;
        } else {
            setErrorNumeroDeCuenta(false);
        }

        // Verificamos si el campo "selectedTipoIdentificacion" está vacío o es "tipo de identificación"
        if (!selectedTipoIdentificacion || selectedTipoIdentificacion === "tipo de identificación") {
            setErrorTipoCuenta(true);
            esFormularioValido = false;
        } else {
            setErrorTipoIdentificacion(false);
        }

        // Verificamos si el campo "selectedEntidadBancaria" está vacío o es "Seleccione banco"
        if (!selectedEntidadBancaria || selectedEntidadBancaria === "Seleccione banco") {
            setErrorEntidadBancaria(true);
            esFormularioValido = false;
        } else {
            setErrorEntidadBancaria(false);
        }

        // Si el formulario no es válido, mostramos el modal y salimos de la función para no enviar la petición
        if (!esFormularioValido) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('Por favor, asegúrate de llenar todos los campos correctamente antes de enviar el formulario.');
            setShowModal(true);
            return;
        }

        // Si el formulario es válido, procedemos a hacer la petición
        let idcertificado = shortid();
        let params = {
            usuario: datosusuarios.uid,
            idcertificado: idcertificado,
            estado: 102,
            ...form,
            valortransferencia: form.valortransferencia.replace(/,/g, ''), // Eliminamos las comas
        };
        //console.log("Parámetros enviados a retirar: ", params);

        // Llamamos a la función para enviar la petición
        grabarDocumentos(idcertificado);
        enviarPeticion(params);
    };

    //Estilos a arreglar
    const textFieldStyles = {
        '& .MuiOutlinedInput-root': {
            fontSize: '18px', // Tamaño de fuente de 18px
            color: '#2D2E83', // Color de letra
            fontFamily: '"Jost", sans-serif', // Fuente
            fontWeight: '500', // Grosor de la fuente
            backgroundColor: '#f0f1f5', // Color de fondo 
            marginLeft: '.2rem',
            marginTop: '1px',
            '& fieldset': {
                border: 'none',
            },
            '&:hover fieldset': {
                borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'transparent',
            },
            '& .MuiOutlinedInput-input': {
                padding: '0',
            },
        },
    };

    const handleSelectTipoIdentificacion = (value, nombre) => {
        setSelectedTipoIdentificacion(nombre);
        setForm({ ...form, tipoidentificacion: value });

        // Verificamos si el campo "selectedTipoIdentificacion" está vacío o es "tipo de identificación"
        if (!nombre || nombre === "tipo de identificación") {
            setErrorTipoIdentificacion(true);
        } else {
            setErrorTipoIdentificacion(false);
        }
    };

    const handleSelectTipoCuenta = (value, nombre) => {
        setSelectedTipoCuenta(nombre);
        setForm({ ...form, tipodecuenta: value });

        // Verificamos si el campo "selectedTipoCuenta" está vacío o es "tipo de cuenta"
        if (!nombre || nombre === "tipo de cuenta") {
            setErrorTipoCuenta(true);
        } else {
            setErrorTipoCuenta(false);
        }
    };

    const handleSelectEntidadBancaria = (value, nombre) => {
        setSelectedEntidadBancaria(nombre);
        setForm({ ...form, entidadbancaria: value });

        // Verificamos si el campo "selectedEntidadBancaria" está vacío o es "Seleccione banco"
        if (!nombre || nombre === "Seleccione banco") {
            setErrorEntidadBancaria(true);
        } else {
            setErrorEntidadBancaria(false);
        }
    };

    const changeHandler = async (event) => {
        if (event.target.files.length > 2) {
            setShowModal(true);
            setTituloMensajes("Documentos");
            setTextoMensajes("Recuerda maximo dos archivos, cédula o nit y certificación bancaria");
            return
        }
        setLoadFile(true);

        if (arrayImagenes.length == 1) {
            changeHandlerDos(event);
            return
        }

        const readeruno = new FileReader();
        const readerdos = new FileReader();

        const file = event.target.files;
        //console.log("FILE : ", file)
        setNameFileLoad(file.name)

        if (file.length >= 1) {
            readeruno.onloadend = () => {
                arrayImagenes = [];
                // Convertir la imagen a base64
                const base64Image = readeruno.result;

                let extension =
                    "." +
                    base64Image.substring(
                        base64Image.indexOf("/") + 1,
                        base64Image.indexOf(";base64")
                    );

                if (file[0].type === "application/pdf") {
                    const blob = new Blob([file], { type: "application/pdf" });
                    //setUserFile(blob);
                    setSelectedPDF(event.target.files[0]);
                    setTipoFileUno(2);
                    setExtensionUno(".pdf");
                    arrayImagenes.push(file[0]);
                    setImagenSel1(file[0]);
                } else {
                    setExtensionUno(extension);
                    setSelectedImage(base64Image);
                    setTipoFileUno(1);
                    arrayImagenes.push(base64Image);
                    setImagenSel1(URL.createObjectURL(file[0]));
                    //console.log("IMAGEN UNO: ", base64Image)
                }
            };
            readeruno.readAsDataURL(file[0]);
        }

        if (file.length >= 2) {
            readerdos.onloadend = () => {
                // Convertir la imagen a base64
                const base64Image = readerdos.result;

                let extension =
                    "." +
                    base64Image.substring(
                        base64Image.indexOf("/") + 1,
                        base64Image.indexOf(";base64")
                    );


                if (file[1].type === "application/pdf") {
                    const blob = new Blob([file], { type: "application/pdf" });
                    //setUserFile(blob);
                    setSelectedPDFDos(event.target.files[1]);
                    setTipoFileDos(2);
                    setExtensionDos(".pdf");
                    arrayImagenes.push(file[1]);
                    setImagenSel2(file[1]);
                } else {
                    setExtensionDos(extension);
                    setSelectedImageDos(base64Image);
                    setTipoFileDos(1);
                    arrayImagenes.push(base64Image);
                    setImagenSel2(URL.createObjectURL(file[1]));
                    //console.log("IMAGEN DOS: ", base64Image)
                }
            };
            readerdos.readAsDataURL(file[1]);
        }
    };

    const changeHandlerDos = async (event) => {
        if ((event.target.files.length + arrayImagenes.length) > 2) {
            setShowModal(true);
            setTituloMensajes("Documentos");
            setTextoMensajes("Recuerda maximo dos archivos, cédula o nit y certificación bancaria");
            return
        }
        setLoadFile(true);

        const readerdos = new FileReader();

        const file = event.target.files;
        //console.log("FILE : ", file)
        setNameFileLoad(file.name)

        if (file.length >= 1) {
            readerdos.onloadend = () => {
                // Convertir la imagen a base64
                const base64Image = readerdos.result;

                let extension =
                    "." +
                    base64Image.substring(
                        base64Image.indexOf("/") + 1,
                        base64Image.indexOf(";base64")
                    );


                if (file[0].type === "application/pdf") {
                    const blob = new Blob([file], { type: "application/pdf" });
                    //setUserFile(blob);
                    setSelectedPDFDos(event.target.files[0]);
                    setTipoFileDos(2);
                    setExtensionDos(".pdf");
                    arrayImagenes.push(file[0]);
                    setImagenSel2(file[0]);
                } else {
                    setExtensionDos(extension);
                    setSelectedImageDos(base64Image);
                    setTipoFileDos(1);
                    arrayImagenes.push(base64Image);
                    setImagenSel2(URL.createObjectURL(file[0]));
                    //console.log("IMAGEN DOS: ", base64Image)
                }
            };
            readerdos.readAsDataURL(file[0]);
        }
    };


    const ChangeHandlerEditImgUno = async (event) => {
        let newarray = arrayImagenes[0];
        arrayImagenes = [];
        arrayImagenes.push(newarray);

        const readeruno = new FileReader();

        const file = event.target.files[0];
        //console.log("FILE : ", file)

        readeruno.onloadend = () => {
            // Convertir la imagen a base64
            const base64Image = readeruno.result;

            let extension =
                "." +
                base64Image.substring(
                    base64Image.indexOf("/") + 1,
                    base64Image.indexOf(";base64")
                );

            if (file.type === "application/pdf") {
                const blob = new Blob([file], { type: "application/pdf" });
                //setUserFile(blob);
                setSelectedPDF(file);
                setTipoFileUno(2);
                setExtensionUno(".pdf");
                arrayImagenes.push(file);
                setImagenSel1(file);
            } else {
                setExtensionUno(extension);
                setSelectedImage(base64Image);
                setTipoFileUno(1);
                arrayImagenes.push(base64Image);
                setImagenSel1(URL.createObjectURL(file));
                //console.log("IMAGEN UNO: ", base64Image)
            }
        }
        readeruno.readAsDataURL(file);
    };

    const ChangeHandlerEditImgDos = async (event) => {
        let newarray = arrayImagenes[1];
        arrayImagenes = [];
        arrayImagenes.push(newarray);

        const readerdos = new FileReader();

        const file = event.target.files[0];
        //console.log("FILE : ", file)

        readerdos.onloadend = () => {
            // Convertir la imagen a base64
            const base64Image = readerdos.result;

            let extension =
                "." +
                base64Image.substring(
                    base64Image.indexOf("/") + 1,
                    base64Image.indexOf(";base64")
                );

            if (file.type === "application/pdf") {
                const blob = new Blob([file], { type: "application/pdf" });
                //setUserFile(blob);
                setSelectedPDFDos(file);
                setTipoFileDos(2);
                setExtensionDos(".pdf");
                arrayImagenes.push(file);
                setImagenSel2(file);
            } else {
                setExtensionDos(extension);
                setSelectedImage(base64Image);
                setTipoFileDos(1);
                arrayImagenes.push(base64Image);
                setImagenSel2(URL.createObjectURL(file));
                //console.log("IMAGEN Dos: ", base64Image)
            }
        }
        readerdos.readAsDataURL(file);
    };

    const grabarDocumentos = async (idcertificado) => {
        if (archivoUser) {
            setShowModalMensajes(true);
            setTituloMensajes("Documentos");
            setTextoMensajes("Ya tienes registrados documentos, puedes actualizar los archivos");
            return
        }

        //console.log("arrayImagenes : ", arrayImagenes)
        //return

        let control = true;

        arrayImagenes &&
            arrayImagenes.map((item, index) => {

                let archivo;
                let URLTIPO;
                let extension;
                let nombrearchivo;

                if (index == 0) {
                    if (tipoFileUno == 1) {
                        archivo = selectedImage;
                        URLTIPO = `${URL_BD_MR}234`;
                        extension = extensionUno;
                    } else if (tipoFileUno == 2) {
                        archivo = selectedPDF;
                        URLTIPO = `${URL_BD_MR}235`;
                        extension = extensionUno;
                    }
                    nombrearchivo = form.nombredocumentouno;
                }

                if (index == 1) {
                    if (tipoFileDos == 1) {
                        archivo = selectedImageDos;
                        URLTIPO = `${URL_BD_MR}234`;
                        extension = extensionDos;
                    } else if (tipoFileDos == 2) {
                        archivo = selectedPDFDos;
                        URLTIPO = `${URL_BD_MR}235`;
                        extension = extensionDos;
                    }
                    nombrearchivo = form.nombredocumentodos;
                }

                //Generar nombre de la imagen
                let ImageName = shortid();

                // Crear un objeto FormData
                let formData = new FormData();
                // Agregar los demás campos a formData
                formData.append("uid", datosusuarios.uid);
                formData.append("image", ImageName + extension);
                formData.append("nombrearchivo", nombrearchivo);
                formData.append("idcertificado", idcertificado);
                formData.append("nombreimagen1", ImageName + extension);
                formData.append("numerodeimagenes", 1);
                formData.append("imagen1", archivo);

                const data = {
                    uid: datosusuarios.uid,
                    image: archivo,
                    idcertificado: idcertificado,
                    nombrearchivo: nombrearchivo,
                    nombreimagen1: ImageName + extensionUno,
                    numerodeimagenes: 1,
                    imagen1: archivo
                };

                // Verificar si estás enviando una imagen o un PDF

                //console.log("DAT IMG : ", data);
                //return
                try {

                    const grabarImg = async () => {
                        await fetch(`${URLTIPO}`, {
                            method: "POST",
                            body: formData,
                            //headers: headers,
                        }).then((response) => {
                            //setIsLoading(false);
                            if (response.data && response.data.type === '0') {
                                console.error("Errror grabando archivo!", "error");
                            } else {
                                console.error("Archivo grabado!", "success");
                            }
                        });

                    };
                    grabarImg();
                    //listsDocuments();
                } catch (error) {
                    console.error("Error al enviar la factura", error);
                    // Maneja el error según tus necesidades
                }
            });

        if (control) {
            //alert("Solicitud enviada");
            //goBack();
        }
    };

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <Modal
                        open={modalVerPdf}
                        onClose={handleClosePdf}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <PDFViewer
                            pdfSelectedView={pdfSelectedView}
                            setModalVerPdf={setModalVerPdf}
                        />
                    </Modal>
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container" >
                            <div className="ps-page__header" > </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: '28rem' }}>
                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <div className='TitleOpVend'>
                                        <p>Solicitar retiro de dinero</p>
                                    </div>
                                </Grid>
                                <div className="contMainBilletera">
                                    <div className="saldoBilletera">
                                        <div className="saldoBilleteraLeft">
                                            <h3>Saldo que deseas retirar</h3>
                                            <div>
                                                <p>$</p>
                                                <TextField
                                                    value={form.valortransferencia}
                                                    onChange={handleChangeValorTransferencia}
                                                    sx={textFieldStyles}
                                                />
                                            </div>
                                        </div>
                                        <div className="saldoBilleteraRight">
                                            <button onClick={handleClick}>Siguiente</button>
                                        </div>
                                    </div>

                                    {mostrarContenedor &&
                                        <div className="contMainBilleteraDos">
                                            <div className="contMovimientos">
                                                <div className="TopcontMovimientos">
                                                    <p>A donde deseas que llegue tu dinero</p>
                                                </div>

                                                {datosUsuario ? (
                                                    <div className="MiddleContMovimientos">
                                                        <div className="DataMiddleContMovimientos">
                                                            <p>Nombre del titular de la cuenta</p>
                                                            <div>
                                                                <input
                                                                    autoComplete="off"
                                                                    name="nombretitular"
                                                                    type="text"
                                                                    value={form.nombretitular}
                                                                    onChange={handleChangeRetiro}
                                                                    onClick={() => setErrorNombreTitular(false)}
                                                                    style={errorNombreTitular ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                                    placeholder="Nombre del titular"
                                                                    maxLength={50}
                                                                    onInput={(e) => {
                                                                        // Permitir solo letras y espacios
                                                                        e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                                        // Capitalizar la primera letra de cada palabra
                                                                        e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                                    }}
                                                                />
                                                                {errorNombreTitular && <div className="ErrorRetitorText"> <p>Ingresa un nombre valido!</p></div>}
                                                            </div>

                                                        </div>

                                                        <div className="DataMiddleContMovimientos">
                                                            <p>Tipo de documento del titular de la cuenta</p>
                                                            <div>
                                                                <Dropdown
                                                                    style={errorTipoIdentificacion ? { border: '1px solid red', borderRadius: '10px', width: '230px' } : { width: '230px' }}
                                                                    onClick={() => setErrorTipoIdentificacion(false)}
                                                                >
                                                                    <Dropdown.Toggle as={CustomDropdownButton} id="dropdown-basic">
                                                                        {selectedTipoIdentificacion}
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu className="tamañocajaoDropDownBanco">
                                                                        {tipoIdentificacion && tipoIdentificacion.map((tipo) => (
                                                                            <Dropdown.Item
                                                                                className="itemsdropdownBanco"
                                                                                onClick={() => handleSelectTipoIdentificacion(tipo.id, `${tipo.tipoidentificacion}`)}
                                                                            >
                                                                                {`${tipo.descripcion}`}
                                                                            </Dropdown.Item>
                                                                        ))}
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                                {errorTipoIdentificacion && <div className="ErrorRetitorTextDos"> <p>Recuerda, debes elegir un tipo de identificación</p></div>}
                                                            </div>
                                                        </div>

                                                        <div className="DataMiddleContMovimientos">
                                                            <p>Numero de documento del titular de la cuenta</p>
                                                            <div>
                                                                <input
                                                                    autoComplete="off"
                                                                    name="identificacion"
                                                                    type="text"
                                                                    maxLength={16}
                                                                    value={form.identificacion}
                                                                    onChange={handleChangeRetiro}
                                                                    onClick={() => setErrorIdentificacion(false)}
                                                                    style={errorIdentificacion ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                                    placeholder="Número de identificación"
                                                                    onKeyPress={(event) => {
                                                                        if (!/[0-9]/.test(event.key)) {
                                                                            event.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                                {errorIdentificacion && <div className="ErrorRetitorText"> <p>Recuerda, El documento debe contener solo números, longitud minima de 6 y maximo de 10</p></div>}
                                                            </div>
                                                        </div>

                                                        <div className="DataMiddleContMovimientos">
                                                            <p>Entidad Bancaria</p>
                                                            <div>
                                                                <Dropdown
                                                                    style={errorEntidadBancaria ? { border: '1px solid red', borderRadius: '10px', width: '230px' } : { width: '230px' }}
                                                                    onClick={() => setErrorEntidadBancaria(false)}
                                                                >
                                                                    <Dropdown.Toggle as={CustomDropdownButtonBanco} id="dropdown-basic">
                                                                        {selectedEntidadBancaria}
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu className="tamañocajaoDropDownBanco" style={{ maxHeight: '280px', overflowY: 'auto' }}>
                                                                        {bancos && bancos.map((banco) => (
                                                                            <Dropdown.Item
                                                                                className="itemsdropdownBanco"
                                                                                onClick={() => handleSelectEntidadBancaria(banco.codigo, `${banco.nombre}`)}
                                                                            >
                                                                                {`${banco.nombre}`}
                                                                            </Dropdown.Item>
                                                                        ))}
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                                {errorEntidadBancaria && <div className="ErrorRetitorTextDos"> <p>Recuerda, debes elegir un banco</p></div>}
                                                            </div>
                                                        </div>
                                                        <div className="DataMiddleContMovimientos">
                                                            <p>Tipo de cuenta</p>
                                                            <div>
                                                                <Dropdown
                                                                    style={errorTipoCuenta ? { border: '1px solid red', borderRadius: '10px', width: '230px' } : { width: '230px' }}
                                                                    onClick={() => setErrorTipoCuenta(false)}
                                                                >
                                                                    <Dropdown.Toggle as={CustomDropdownButton} id="dropdown-basic">
                                                                        {selectedTipoCuenta}
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu className="tamañocajaoDropDownBanco">
                                                                        {tipodeCuenta && tipodeCuenta.map((tipo) => (
                                                                            <Dropdown.Item
                                                                                className="itemsdropdownBanco"
                                                                                onClick={() => handleSelectTipoCuenta(tipo.id, `${tipo.descripcion}`)}
                                                                            >
                                                                                {`${tipo.descripcion}`}
                                                                            </Dropdown.Item>
                                                                        ))}
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                                {errorTipoCuenta && <div className="ErrorRetitorTextDos"> <p>Recuerda, debes elegir un tipo de cuenta</p></div>}
                                                            </div>
                                                        </div>
                                                        <div className="DataMiddleContMovimientos">
                                                            <p>Numero de cuenta</p>
                                                            <div>
                                                                <input
                                                                    autoComplete="off"
                                                                    name="numerodecuenta"
                                                                    type="text"
                                                                    maxLength={16}
                                                                    value={form.numerodecuenta}
                                                                    onChange={handleChangeRetiro}
                                                                    onClick={() => setErrorNumeroDeCuenta(false)}
                                                                    style={errorNumeroDeCuenta ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                                    placeholder="Número de cuenta"
                                                                    onKeyPress={(event) => {
                                                                        if (!/[0-9]/.test(event.key)) {
                                                                            event.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                                {errorNumeroDeCuenta && <div className="ErrorRetitorText"> <p>Porfavor, ingresa un número de cuenta bancaria valido!</p></div>}
                                                            </div>

                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p>No se encontraron datos del usuario.</p>
                                                )}


                                            </div>
                                            <Grid container>
                                                <Grid item xs={12} md={12} lg={12}>
                                                    <div className="textosubirdctos">
                                                        Recuerda debes subir los siguientes documentos, cedula o nit, y certificación bancaria
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={12} md={9} lg={9}>
                                                    {
                                                        <div>
                                                            <a>
                                                                <button
                                                                    className="certificadosuser"
                                                                    onClick={
                                                                        handleClickImg
                                                                    }
                                                                >
                                                                    < div >
                                                                        Click aqui para subir cédula o nit y certificación bancaria
                                                                    </div>
                                                                    <a>
                                                                        <input
                                                                            type="file"
                                                                            multiple
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
                                                                    </a>
                                                                </button>
                                                            </a>
                                                            <div className="nombreimg">{nameFileLoad}</div>
                                                        </div>
                                                    }
                                                </Grid>
                                                {
                                                    /*
                                                                                                        <Grid item xs={12} md={3} lg={3}>
                                                                                                            <div className="guardardcobilletera"
                                                                                                                onClick={() => grabarDocumentos()}
                                                                                                            >
                                                                                                                Guardar documentos
                                                                                                            </div>
                                                                                                        </Grid>
                                                    */
                                                }

                                                <Grid item xs={12} md={3} lg={3}>
                                                    <div className="SendSolicitudb">
                                                        {selectedImage || selectedPDF ?
                                                            <button
                                                                //onClick={hacerPeticionRetiro}
                                                                onClick={hacerPeticionRetiro}
                                                            >Enviar solicitud
                                                            </button>
                                                            :
                                                            <button
                                                                className="deshabilitar"
                                                            >
                                                                Enviar solicitud
                                                            </button>
                                                        }

                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <div className="mlmenos50">
                                                <Grid container spacing={1}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={12} md={4} lg={4}>
                                                            <div className="DataMiddleContMovimientos2">
                                                                <div>
                                                                    <input
                                                                        autoComplete="off"
                                                                        name="nombredocumentouno"
                                                                        type="text"
                                                                        value={form.nombredocumentouno}
                                                                        onChange={handleChangeRetiro}
                                                                        onClick={() => setErrorNombreDctoUno(false)}
                                                                        style={errorNombreDctoUno ? { border: '1px solid red', textAlign: 'left', borderRadius: '10px' } : {}}
                                                                        placeholder="Nombre documento uno"
                                                                        maxLength={100}
                                                                        onInput={(e) => {
                                                                            // Permitir solo letras y espacios
                                                                            //e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                                            // Capitalizar la primera letra de cada palabra
                                                                            //e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                                        }}
                                                                    />
                                                                    {errorNombreDctoUno && <div className="ErrorRetitorTextTres"> <p>Ingresa un nombre valido!</p></div>}
                                                                </div>

                                                            </div>
                                                        </Grid>

                                                        <Grid item xs={12} md={4} lg={4}>
                                                            <div className="DataMiddleContMovimientos2">
                                                                <div className="mlmenos40">
                                                                    <input
                                                                        autoComplete="off"
                                                                        name="nombredocumentodos"
                                                                        type="text"
                                                                        value={form.nombredocumentodos}
                                                                        onChange={handleChangeRetiro}
                                                                        onClick={() => setErrorNombreDctoDos(false)}
                                                                        style={errorNombreDctoDos ? { border: '1px solid red', textAlign: 'left', borderRadius: '10px' } : {}}
                                                                        placeholder="Nombre documento dos"
                                                                        maxLength={100}
                                                                        onInput={(e) => {
                                                                            // Permitir solo letras y espacios
                                                                            //e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                                            // Capitalizar la primera letra de cada palabra
                                                                            //e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                                        }}
                                                                    />
                                                                    {errorNombreDctoDos && <div className="ErrorRetitorTextTres"> <p>Ingresa un nombre valido!</p></div>}
                                                                </div>

                                                            </div>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12} md={4} lg={4}>
                                                        {
                                                            tipoFileUno == 2 ?
                                                                <div>
                                                                    <FaFilePdf
                                                                        onClick={() => verDatosPdf()}
                                                                        className="imgloadwo"
                                                                    />
                                                                    <button
                                                                        onClick={
                                                                            handleEditImgUno
                                                                        }
                                                                    >
                                                                        <a>
                                                                            <input
                                                                                type="file"
                                                                                accept=".pdf,.png,.jpeg,.jpg"
                                                                                onChange={
                                                                                    ChangeHandlerEditImgUno
                                                                                }
                                                                                style={{
                                                                                    display:
                                                                                        "none",
                                                                                }}
                                                                                ref={
                                                                                    fileEditImguno
                                                                                }
                                                                            />
                                                                        </a>
                                                                        <div className="textoeditarimg">
                                                                            Editar Documento
                                                                        </div>
                                                                    </button>
                                                                </div>
                                                                :
                                                                imagenSel1 ?
                                                                    <div>
                                                                        <img
                                                                            className="imgloadwo"
                                                                            src={
                                                                                imagenSel1
                                                                            }
                                                                        />
                                                                        <button
                                                                            onClick={
                                                                                handleEditImgUno
                                                                            }
                                                                        >
                                                                            <a>
                                                                                <input
                                                                                    type="file"
                                                                                    accept=".pdf,.png,.jpeg,.jpg"
                                                                                    onChange={
                                                                                        ChangeHandlerEditImgUno
                                                                                    }
                                                                                    style={{
                                                                                        display:
                                                                                            "none",
                                                                                    }}
                                                                                    ref={
                                                                                        fileEditImguno
                                                                                    }
                                                                                />
                                                                            </a>
                                                                            <div className="textoeditarimg">
                                                                                Editar Documento
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                                    :
                                                                    <FaCamera
                                                                        className="imgloadwo"
                                                                    />
                                                        }
                                                    </Grid>
                                                    <Grid item xs={12} md={2} lg={2}>
                                                        {
                                                            tipoFileDos == 2 ?
                                                                <div>
                                                                    <FaFilePdf
                                                                        onClick={() => verDatosPdfDos()}
                                                                        className="imgloadwo"
                                                                    />

                                                                    <button
                                                                        onClick={
                                                                            handleEditImgDos
                                                                        }
                                                                    >
                                                                        <a>
                                                                            <input
                                                                                type="file"
                                                                                accept=".pdf,.png,.jpeg,.jpg"
                                                                                onChange={
                                                                                    ChangeHandlerEditImgDos
                                                                                }
                                                                                style={{
                                                                                    display:
                                                                                        "none",
                                                                                }}
                                                                                ref={
                                                                                    fileEditImgDos
                                                                                }
                                                                            />
                                                                        </a>
                                                                        <div className="textoeditarimg">
                                                                            Editar Documento
                                                                        </div>
                                                                    </button>
                                                                </div>
                                                                :
                                                                imagenSel2 ?
                                                                    <div>
                                                                        <img
                                                                            className="imgloadwo"
                                                                            src={
                                                                                imagenSel2
                                                                            }
                                                                        />
                                                                        <button
                                                                            onClick={
                                                                                handleEditImgDos
                                                                            }
                                                                        >
                                                                            <a>
                                                                                <input
                                                                                    type="file"
                                                                                    accept=".pdf,.png,.jpeg,.jpg"
                                                                                    onChange={
                                                                                        ChangeHandlerEditImgDos
                                                                                    }
                                                                                    style={{
                                                                                        display:
                                                                                            "none",
                                                                                    }}
                                                                                    ref={
                                                                                        fileEditImgDos
                                                                                    }
                                                                                />
                                                                            </a>
                                                                            <div className="textoeditarimg">
                                                                                Editar Documento
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                                    :
                                                                    <FaCamera
                                                                        className="imgloadwo"
                                                                    />
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </div>
                                    }

                                </div>

                                <Dialog
                                    className='dialogDatsGuardados'
                                    open={dialogOpen}
                                    disableScrollLock={true}
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
                                        <p className='dialogtituloP'>¡Solicitud enviada con exito!</p>
                                    </DialogTitle>
                                    <DialogContent className='dialogContentDatsGuardados'>
                                        <p className='PdialogContent'>Tu solicitud fue enviada con exito. Esta será revisada y procesada por nosotros, en un máximo de 5 días habiles te estaremos dando repuesta.</p>
                                    </DialogContent>
                                    <DialogActions className='DialogActionsDatsGuardados'>
                                        <div className='div1buttonDialog' >
                                            <button className='button2DialogDatsGuardados' onClick={() => router.push({ pathname: './' })} >
                                                Ir a mi billetera
                                            </button>
                                        </div>
                                        <div className='div1buttonDialog' >
                                            <button className='button1DialogDatsGuardados' onClick={() => router.push({ pathname: '/' })} >
                                                Ir al inicio
                                            </button>
                                        </div>
                                    </DialogActions>
                                </Dialog>
                                <ModalMensajes
                                    shown={showModal}
                                    close={handleModalClose}
                                    titulo={tituloMensajes}
                                    mensaje={textoMensajes}
                                    tipo="error"
                                />
                            </div>
                        </div>
                    </div >
                </Container >
            </div >
        </>
    )
}