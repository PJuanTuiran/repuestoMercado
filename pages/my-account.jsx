import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, Modal, Row } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import Swal from "sweetalert2";
import Container from "~/components/layouts/Container";
import useGetUsers from "~/hooks/useUsers";
import { URL_BD_MR, URL_API_MR } from "../helpers/Constants";
import ActivateUserRepository from "../repositories/ActivateUserRepository";
import ReadUserEmail from "../repositories/ReadUserEmail";
import UserRepository from "../repositories/UsersRepository";
import { validateEmail } from "../utilities/Validations";
import IngresoFotosDocsNit from "./CreateUsers/ingresofotosdocsnit";
import { Box, Grid, Dialog, DialogContent } from "@mui/material";

//Firebase
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    updateProfile,
    signOut,
} from "firebase/auth";
import TokenRegistroRepository from "../repositories/TokenRegistroRepository";
import firebase from "../utilities/firebase";

import ModalMensajes from "./mensajes/ModalMensajes";
import ModalMensajesPersonaJuridica from "./mensajes/ModalMensajesPersonaJuridica";
import ModalMensajesSoyNuevo from "./mensajes/ModalMensajesSoyNuevo";
import ModalMensajesDctosNit from "./mensajes/ModalMensajesDctosNit";
import ModalMensajesContactanos from "./mensajes/ModalMensajesContactanos";
import ModalMensajesImgNit from "./mensajes/ModalMensajesImgNit";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import InfoIcon from "@material-ui/icons/Info";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { ImEye } from "react-icons/im";
import { FormControl } from "react-bootstrap";
import { getUserMenuPrimary } from "../store/usermenuprimary/action";
import { ImEyeBlocked } from "react-icons/im";

const MyAccountScreen = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");

    const [showModalDos, setShowModalDos] = useState(false); //Estado de modal
    const [showPassword, setShowPassword] = useState(false);

    const [
        showModalMensajesPersonaJuridica,
        setShowModalMensajesPersonaJuridica,
    ] = useState(false);
    const [tituloMensajesPersonaJuridica, setTituloMensajesPersonaJuridica] =
        useState(false);
    const [textoMensajesPersonaJuridica, setTextoMensajesPersonaJuridica] =
        useState(false);

    const [showModalDctosNit, setShowModalDctosNit] = useState(false);
    const [tituloDctosNit, setTituloDctosNit] = useState(false);
    const [textoDctosNit, setTextoDctosNit] = useState(false);

    const [showModalMensajesSoyNuevo, setShowModalMensajesSoyNuevo] =
        useState(false);
    const [tituloMensajesSoyNuevo, setTituloMensajesSoyNuevo] = useState(false);
    const [textoMensajesSoyNuevo, setTextoMensajesSoyNuevo] = useState(false);

    const [showModalCrearCta, setShowModalCrearCta] = useState(false);
    const [tituloCrearCta, setTituloCrearCta] = useState("");
    const [textoCrearCta, setTextoCrearCta] = useState("");

    const [showModalJuridica, setShowModalJuridica] = useState(false);
    const [tituloJuridica, setTituloJuridica] = useState("");
    const [textoJuridica, setTextoJuridica] = useState("");

    const [showPasswordDos, setShowPasswordDos] = useState(false);
    const captcha = useRef(null);
    const irA = useRef(null);
    const router = useRouter();
    const [formData, setFormData] = useState(defaultValueForm());
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);
    const { getUsers } = useGetUsers();
    const [user, setUser] = useState(false);
    const [formDataToken, setFormDataToken] = useState(defaultValueToken());
    const [showModal, setShowModal] = useState(false);
    const [showModalDocsNit, setShowModalDocsNit] = useState(false);
    const [codigoToken, setCodigoToken] = useState("");
    const [idUid, setIdUid] = useState(0);
    const [tipoIdentificacion, setTipoIdentificacion] = useState(false);
    const [tiposId, setTiposId] = useState([]);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [createId, setCreateId] = useState(false);
    const [noSoyRobot, setNoSoyRobot] = useState(false);
    const [terminosCondiciones, setTerminosCondiciones] = useState(false);
    const [showModalFotos, setShowModalFotos] = useState(false);
    const [phone, setPhone] = useState(false);
    const [openNewDialog, setOpenNewDialog] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [mensajePhone, setMensajePhone] = useState(false);
    const [activaMensajePhone, setActivaMensajePhone] = useState(false);
    const [activaMensajeNombre, setActivaMensajeNombre] = useState(false);
    const [mensajeNombre, setMensajeNombre] = useState(false);
    const [activaMensajeApellido, setActivaMensajeApellido] = useState(false);
    const [mensajeApellido, setMensajeApellido] = useState(false);
    const [activaMensajeIdentificacion, setActivaMensajeIdentificacion] =
        useState(false);
    const [mensajeIdentificacion, setMensajeIdentificacion] = useState(false);
    const [activaMensajeRazonSocial, setActivaMensajeRazonSocial] =
        useState(false);
    const [mensajeRazonSocial, setMensajeRazonSocial] = useState(false);

    const [activaMensajeUsuario, setActivaMensajeUsuario] = useState(false);
    const [mensajeUsuario, setMensajeUsuario] = useState(false);

    const [activaMensajeEmail, setActivaMensajeEmail] = useState(false);
    const [mensajeEmail, setMensajeEmail] = useState(false);
    const [activaMensajeConfirmarEmail, setActivaMensajeConfirmarEmail] =
        useState(false);
    const [mensajeConfirmarEmail, setMensajeConfirmarEmail] = useState(false);
    const [activaMensajeContraseña, setActivaMensajeContraseña] =
        useState(false);
    const [mensajeContraseña, setMensajeContraseña] = useState(false);
    const [
        activaMensajeConfirmarContraseña,
        setActivaMensajeConfirmarContraseña,
    ] = useState(false);
    const [mensajeConfirmarContraseña, setMensajeConfirmarContraseña] =
        useState(false);

    const [showModalMedio, setShowModalMedio] = useState(false);
    const [subirDocsNit, setSubirDocsNit] = useState(false);
    const [inicio, setInicio] = useState(false);

    const [inputControlIdentificacion, setInputControlIdentificacion] =
        useState("form-control ps-form__input basecolorinput");
    const [inputControlTelefono, setInputControlTelefono] = useState(
        "form-control ps-form__input basecolorinput"
    );
    const [inputControlEmail, setInputControlEmail] = useState(
        "form-control ps-form__input basecolorinput"
    );
    const [inputControlConfirmarEmail, setInputControlConfirmarEmail] =
        useState("form-control ps-form__input basecolorinput");
    const [inputControlClave, setInputControlClave] = useState(
        "form-control ps-form__input basecolorinput"
    );
    const [inputControlConfirmeClave, setInputControlConfirmeClave] = useState(
        "form-control ps-form__input basecolorinput"
    );
    const [inputControlRazonSocial, setInputControlRazonSocial] = useState(
        "form-control ps-form__input basecolorinput"
    );
    const [inputControlUsuario, setInputControlUsuario] = useState(
        "form-control ps-form__input basecolorinput"
    );
    const [inputControlNombres, setInputControlNombres] = useState(
        "form-control ps-form__input basecolorinput"
    );
    const [inputControlApellidos, setInputControlApellidos] = useState(
        "form-control ps-form__input basecolorinput"
    );
    const [inputControlTerminos, setInputControlTerminos] = useState("");
    const [mensajeTerminos, setMensajeTerminos] = useState(false);
    const [activaMensajeTerminos, setActivaMensajeTerminos] = useState(false);
    const [classTerminos, setclassTerminos] = useState("form-check-label");
    const [classAceptaTerminos, setClassAceptaTerminos] = useState(
        "mensajeaceptaterminos"
    );

    const [mostrarSubirDctos, setMostrarSubirDctos] = useState(false);
    const [crearCta, setCrearCta] = useState(false);
    const [open, setOpen] = useState(false);
    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const refreshpage = useSelector((state) => state.refreshpage.refreshpage);

    const onCloseModalActivarCuenta = () => {
        setShowModal(false);
    };

    const onCloseModalMedioToken = () => {
        setShowModalMedio(false);
    };

    const onCloseModalDocsJuridica = () => {
        //setShowModalDocsNit(false);
    };

    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModalDos(false);
    };

    useEffect(() => {
        if (crearCta) {
            localStorage.setItem("crearusuario", JSON.stringify(true));
            location.reload();
        }
    }, [crearCta]);

    useEffect(() => {
        if (refreshpage) {
            setShowModalJuridica(true);
            setTituloJuridica("Crear Cuenta");
            setTextoJuridica(
                "Ya puedes comprar, estamos revisando los documentos para habilitarte como vendedor!"
            );
        }
    }, [refreshpage]);

    //refreshpage

    useEffect(() => {
        setCodigoToken(datosusuarios.token);
        if (datosusuarios.activo === "N") {
            setShowModal(true);
        }
    }, [datosusuarios]);

    useEffect(() => {
        if (inicio) {
            //router.push("/");
        }
    }, [inicio]);

    useEffect(() => {
        const leerTipoIdentificacion = async () => {
            await axios({
                method: "post",
                url: URL_BD_MR + "7",
            })
                .then((res) => {
                    setTiposId(res.data.tipoidentificacion);
                })
                .catch(function (error) {
                    console.log("Error leyendo datos lista deseos");
                });
        };
        leerTipoIdentificacion();
    }, []);

    const registrarse = async () => {
        setFormError({});
        let errors = {};
        let formOk = true;

        if (!formData.identificacion) {
            setMensajeIdentificacion("Ingresa tu número de identificación!");
            setActivaMensajeIdentificacion(true);
            setInputControlIdentificacion(
                "form-control ps-form__input alertboton  basecolorinput"
            );
            formOk = false;
        }

        if (!formData.usuario) {
            setMensajeUsuario("Ingresa tu nombre de usuario!");
            setActivaMensajeUsuario(true);
            setInputControlUsuario(
                "form-control ps-form__input alertboton  basecolorinput"
            );
            formOk = false;
        }

        if (phone.length < 10) {
            formOk = false;
            setActivaMensajePhone(true);
            setInputControlTelefono(
                "form-control ps-form__input alertboton  basecolorinput"
            );
            setTituloMensajes("Registro usuarios");
            setTextoMensajes("Hola! Ingresa un número de teléfono valido!");
            setShowModalDos(true);
            return;
        }

        //if (!formData.telefono && tipoIdentificacion != 6) {
        if (!formData.telefono || formData.telefono == 0) {
            setMensajePhone("Ingresa un número de teléfono valido!");
            setActivaMensajePhone(true);
            setInputControlTelefono(
                "form-control ps-form__input alertboton  basecolorinput"
            );
            formOk = false;
        }

        if (!formData.razonsocial && tipoIdentificacion == 6) {
            setMensajeRazonSocial("Ingresa razón social!");
            setActivaMensajeRazonSocial(true);
            setInputControlRazonSocial(
                "form-control ps-form__input alertboton  basecolorinput"
            );
            formOk = false;
        }

        if (tipoIdentificacion == 6) {
            if (!formData.razonsocial) {
                setMensajeRazonSocial("Ingresa razón social!");
                setActivaMensajeRazonSocial(true);
                setInputControlRazonSocial(
                    "form-control ps-form__input alertboton  basecolorinput"
                );
                formOk = false;
            }
        } else {
            if (tipoIdentificacion < 6) {
                if (!formData.primernombre && !formData.primerapellido) {
                    setMensajeNombre("Ingresa nombres validos!");
                    setActivaMensajeNombre(true);
                    setInputControlNombres(
                        "form-control ps-form__input alertboton"
                    );
                    setMensajeApellido("Ingresa apellidos validos!");
                    setActivaMensajeApellido(true);
                    setInputControlApellidos(
                        "form-control ps-form__input alertboton"
                    );
                    formOk = false;
                }

                if (!formData.primernombre) {
                    setMensajeNombre("Ingresa un nombre valido!");
                    setActivaMensajeNombre(true);
                    setInputControlNombres(
                        "form-control ps-form__input alertboton"
                    );
                    formOk = false;
                }

                if (!formData.primerapellido) {
                    setMensajeApellido("Ingresa un apellido valido!");
                    setActivaMensajeApellido(true);
                    setInputControlApellidos(
                        "form-control ps-form__input alertboton"
                    );
                    formOk = false;
                }
            }
        }

        if (!formData.email) {
            setMensajeEmail("Ingresa un correo valido!");
            setActivaMensajeEmail(true);
            setInputControlEmail("form-control ps-form__input alertboton");
            formOk = false;
        }

        if (!formData.emaildos) {
            setMensajeConfirmarEmail("Ingresa un correo valido!");
            setActivaMensajeConfirmarEmail(true);
            setInputControlConfirmarEmail(
                "form-control ps-form__input alertboton"
            );
            formOk = false;
        }

        if (!formData.password) {
            setMensajeContraseña("Ingresa una contraseña valida!");
            setActivaMensajeContraseña(true);
            setInputControlClave("form-control ps-form__input alertboton");
            formOk = false;
        }

        if (!formData.passworddos) {
            setMensajeConfirmarContraseña("Ingresa una contraseña valida!");
            setActivaMensajeConfirmarContraseña(true);
            setInputControlConfirmeClave(
                "form-control ps-form__input alertboton"
            );
            formOk = false;
        }

        if (!terminosCondiciones) {
            setInputControlTerminos("alertbotonterminos");
            setclassTerminos("form-check-label mtmenos40");
            setClassAceptaTerminos("mensajeaceptaterminos");
            setMensajeTerminos("Recuerda, Acepta terminos y condiciones!");
            setActivaMensajeTerminos(true);
        }

        if (phone == 0) {
            setTituloMensajes("Registro usuarios");
            setTextoMensajes("Hola! revisa la información ingresada.");
            setShowModalDos(true);
            return;
        }

        if (!formOk) {
            setTituloMensajes("Registro usuarios");
            setTextoMensajes("Hola! revisa la información ingresada.");
            setShowModalDos(true);
            return;
        } else {
            if (!terminosCondiciones) {
                setInputControlTerminos("alertbotonterminos");
                setClassAceptaTerminos("mensajeaceptaterminos");
                setclassTerminos("form-check-label mtmenos40");
                setTituloMensajes("Registro Usuarios");
                setTextoMensajes(
                    "Por favor, Debes aceptar terminos y condiciones!"
                );
                setShowModalDos(true);
                return;
            }
        }
        //Consulta en la BD de MR para ver si el email esta asociado a una cuenta
        const emailusuario = {
            email: formData.email,
        };

        const respuestauser = await ReadUserEmail.getReadUsersEmail(
            emailusuario
        );

        //console.log("RESPUSER : ", respuestauser)

        if (respuestauser.length > 0 && respuestauser[0].activo != 10) {
            setTituloMensajes("Registro Usuarios");
            setTextoMensajes(
                "Por favor revisa el email, ya esta asignado a otra cuenta!"
            );
            setShowModalDos(true);
            return;
        }
        setFormError(errors);

        if (formOk) {
            setLoading(true);

            const grabaUsuario = async () => {
                //alert("OK")
                //return
                const auth = getAuth(firebase);
                createUserWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                )
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;

                        if (tipoIdentificacion < 6) {
                            setTituloMensajes("Registro Usuarios");
                            setTextoMensajes(
                                "Selecciona medio para enviar el Token!"
                            );
                            setShowModalDos(true);
                        } else {
                            setTituloMensajes("Registro Usuarios");
                            setTextoMensajes(
                                "Cuenta creada de forma correcta!"
                            );
                            setShowModalDos(true);
                            // Puedes usar un setTimeout para mostrar el segundo modal después de un tiempo
                            setTimeout(() => {
                                setTituloMensajes("Registro Usuarios");
                                setTextoMensajes(
                                    "Hemos enviado un código de validación a tu correo!"
                                );
                                setShowModalDos(true);
                            }, 3000); // Aquí estoy usando un retraso de 3 segundos, puedes ajustarlo a tus necesidades
                        }

                        const auth = getAuth(firebase);

                        onAuthStateChanged(auth, (user) => {
                            if (user) {
                                //alert("ENTRE")

                                const datos = {
                                    uid: user.metadata.createdAt,
                                    medio: "",
                                };

                                setIdUid(user.metadata.createdAt);

                                setUser(true);
                                updateProfile(auth.currentUser, {
                                    displayName: formData.nombre,
                                    photoURL: "",
                                })
                                    .then(() => {
                                        setTituloMensajes(
                                            "Actualizar Usuarios"
                                        );
                                        setTextoMensajes(
                                            "Nombre Usuario Actualizado de forma correcta!"
                                        );
                                        setShowModalDos(true);
                                        createUser(user.metadata.createdAt);
                                        setCreateId(true);
                                    })
                                    .catch((error) => {
                                        setTituloMensajes(
                                            "Actualizar Usuarios"
                                        );
                                        setTextoMensajes(
                                            "Error Actualizando nombre de Usuario!"
                                        );
                                        setShowModalDos(true);
                                    });
                            } else {
                                setUser(false);
                            }
                        });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setTituloMensajes("Registro Usuarios");
                        setTextoMensajes("Error al crear la cuenta!");
                        setShowModalDos(true);
                    });
            };
            grabaUsuario();
        }
        return;
    };

    useEffect(() => {
        if (createId) {
            activaModal();
        }
    }, [createId]);

    const createUser = async (iDUser) => {
        var caracteres = "012346789";
        var codigoid = "";
        for (var i = 0; i < 4; i++)
            codigoid += caracteres.charAt(
                Math.floor(Math.random() * caracteres.length)
            );
        //let cadena = codigoid; //shortid();
        let tokenid = codigoid; //cadena.substring(0, 6);
        console.log("ID TOKEN : ", tokenid);
        setCodigoToken(tokenid);

        // Lee Web Service para enviar el token al usuario
        const datos = {
            token: tokenid,
            medio: "email",
        };

        let identificacionsinseparadores = formData.identificacion.replace(
            /,/g,
            ""
        );
        //console.log("IDENTIFICACION SIN ESPACIOS : ", identificacionsinseparadores);
        //let telefono = "+57" + formData.telefono;
        let telefono = formData.telefono;
        let firstname = "";
        let lastname = "";
        let tipousuario = 2;
        let estadouser = 31;

        if (tipoIdentificacion == 6) {
            firstname = formData.razonsocial;
            lastname = ".";
            estadouser = 30;
        } else {
            firstname = formData.primernombre;
            lastname = formData.primerapellido;
            estadouser = 31;
        }

        const usuario = {
            id: 0,
            uid: iDUser,
            primernombre: firstname,
            usuario: formData.usuario,
            segundonombre: formData.segundonombre,
            primerapellido: lastname,
            segundoapellido: formData.segundoapellido,
            razonsocial: formData.razonsocial,
            tipoidentificacion: tipoIdentificacion,
            identificacion: identificacionsinseparadores,
            celular: telefono,
            tipousuario: tipousuario,
            email: formData.email,
            token: tokenid,
            activo: estadouser,
            direccion: formData.direccion,
            fechacreacion: fechaactual,
            fechatoken: fechaactual,
            fechaactualiza: fechaactual,
        };

        //console.log("DATOS USUARIO : ", usuario);
        const respuesta = await UserRepository.createUser(usuario).then(
            (response) => {
                if (response) {
                    if (tipoIdentificacion < 6) {
                        if (response.type === 1) {
                            //console.log("CODIGO XXX: ", response);

                            setTituloMensajes("Registro Usuarios");
                            setTextoMensajes(
                                "Selecciona medio para enviar el Token!"
                            );
                            setShowModalDos(true);
                            setLoading(false);
                            token(codigoid);
                            //setShowModal(false);
                            //actualizaDatosUsuarioState(IdToken);
                            //router.push("/");
                        } else {
                            console.log("RESPONSE : ", response);
                            setTituloMensajes("Mercado Repuesto");
                            setTextoMensajes(
                                "No hemos podido grabar el usuario, Intenta nuevamente!"
                            );
                            setShowModalDos(true);
                            setLoading(false);
                            //router.push("/");
                        }
                    } else {
                        console.log(
                            "Respuesta API Creación Usuario : ",
                            response
                        );
                        console.log("CODIGO ID : ", codigoid);
                        token(codigoid);
                    }
                } else {
                    setSubirDocsNit(!subirDocsNit);
                    setShowModalFotos(!showModalFotos);
                }
            }
        );
    };

    const [tokenDialog, setTokenDialog] = useState(null); // Agrega este estado al inicio de tu componente

    const token = async (tokenid) => {

        if (phone) phone.replace("+", "");

        async function enviartoken(dat) {
            //console.log("DATXX : ", datosToken)
            //return

            let parrafo = "CODIGO DE SEGURIDAD: " + tokenid;
            setTokenDialog(tokenid); // Guarda el token en el estado

            const requestData = {
                "remitente": formData.email,
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
                    const response = await axios.post("https://gimcloud.com.co/api/endpoint/mail", requestData, config);
                    console.log(response.data);

                    setOpenNewDialog(true); // Abre el nuevo diálogo
                    setShowModal(true);
                } catch (error) {
                    console.error('Errorxx:', error);
                }
            }
            sendRequest();
        }
        enviartoken(tokenid);
    };

    console.log("tokenDialog : ", tokenDialog);

    const onChangeDatoTelefono = (e) => {
        //console.log("VALOR TELEFONO : ", e.target.value)
        setActivaMensajePhone(false);
        setPhone(e.target.value);
    };

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onChangeToken = (e) => {
        setFormDataToken({
            ...formDataToken,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeTipoIdentificacion = (selectedOptions) => {
        setTipoIdentificacion(selectedOptions);
    };

    const validarToken = () => {
        //return
        if (codigoToken != formDataToken.token) {
            setOpen(true);
            return;
        } else {
            setShowModal(false);
        }

        const params = {
            id: idUid,
            estado: 31
        };

        //console.log("UID USE : ", dat)
        //return

        const activarToken = async () => {

            await axios({
                method: "post",
                url: URL_BD_MR + "20", params
            })
                .then((res) => {
                    console.log("RESDADA : ", res.data)
                    if (res.data.type === 1) {
                        setShowModalCrearCta(true);
                        setTituloCrearCta("Crear Cuenta");
                        setTextoCrearCta(
                            "Ya puedes disfrutar de una experiencia diferente en Mercado Repuesto!"
                        );
                        confirmarCrearCuenta();
                        router.push("/");
                    } else {
                        setShowModalCrearCta(true);
                        setTituloCrearCta("Crear Cuenta");
                        setTextoCrearCta(
                            "Tu cuenta no puede ser activada, comunicate con la administración de MR!"
                        );
                    }
                })
                .catch(function (error) {
                    console.log("Error leyendo datos lista deseos");
                });
        };
        activarToken();
        //console.log("RESPUESTA : ", respuesta);
    };

    function confirmarCrearCuenta() {
        //console.log("DATXX : ", datosToken)
        //return

        let parrafo = "Estamos muy contentos de tenerte por aquí. A partir de ahora vas a poder comprar y vender lo que quieras a millones de personas con la seguridad y tranquilidad que solo te ofrecemos en Mercado Repuesto";

        const dataCreaUsr = {
            "remitente": formData.email,
            "asunto": "¡EMPIEZA A COMPRAR Y VENDER EN MERCADO REPUESTO!",
            "plantilla": "info",
            "to" : "Mercado Repuesto",
            "contenido_html": {
                "title": "TU CUENTA YA ESTÁ ACTIVA",
                "subtitle": "",
                "body": parrafo,
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
        if (mostrarSubirDctos) {
            mostrarDocumentosNit();
        }
    }, [mostrarSubirDctos]);

    const mostrarDocumentosNit = () => {
        //e.preventDefault()
        setShowModalMensajesPersonaJuridica(true);
        setTituloMensajesPersonaJuridica("Documentos persona juridica");
        let texto = "";
        setTextoMensajesPersonaJuridica(texto);
        //return;
    };

    const activaModal = () => {
        if (tipoIdentificacion < 6) {
            //setShowModalMedio(true);
        } else {
            //setShowModalDocsNit(true);
        }
    };

    const tokenmensajetexto = () => {
        let medio = "sms";
        setShowModalMedio(false);
        token(medio);
    };

    const tokenemail = () => {
        let medio = "email";
        setShowModalMedio(false);
        token(medio);
    };

    const tokenwhatsapp = () => {
        let medio = "whatsapp";
        setShowModalMedio(false);
        token(medio);
    };

    const aceptarTerminos = () => {
        setTerminosCondiciones(true);
    };

    const validaIdentificacion = (identificacion) => {
        setActivaMensajePhone(false);
        setFormError({});
        let errors = {};
        let formOk = true;

        if (formData.identificacion) {
            if (!formData.identificacion) {
                setMensajeIdentificacion(
                    "Ingresa tu número de identificación!"
                );
                setActivaMensajeIdentificacion(true);
                setInputControlIdentificacion(
                    "form-control ps-form__input alertboton  basecolorinput"
                );
                errors.identificacion = true;
                formOk = false;
                return;
            }

            if (
                formData.identificacion.length < 6 ||
                formData.identificacion.length > 10
            ) {
                setInputControlIdentificacion(
                    "form-control ps-form__input alertboton  basecolorinput"
                );
                setMensajeIdentificacion(
                    "Recuerda, El documento debe contener solo números, longitud minima de 6 y maximo de 10"
                );
                setActivaMensajeIdentificacion(true);
                errors.identificacion = true;
                formOk = false;
                return;
            }

            let validaidentificacion = formData.identificacion.substr(0, 20);

            let validarid;
            let haycaracterid = false;
            for (var i = 0; i < validaidentificacion.length; i++) {
                validarid = validaidentificacion.substr(i, 1);
                if (
                    validarid != 0 &&
                    validarid != 1 &&
                    validarid != 2 &&
                    validarid != 3 &&
                    validarid != 4 &&
                    validarid != 5 &&
                    validarid != 6 &&
                    validarid != 7 &&
                    validarid != 8 &&
                    validarid != 9
                ) {
                    haycaracterid = true;
                    console.log("CARACTER", i, validarid);
                } else console.log("ES UN NUMERO ", i, validarid);
            }

            if (haycaracterid) {
                setActivaMensajeIdentificacion(true);
                setMensajeIdentificacion(
                    "Recuerda, La identificación solo debe contener números!"
                );
                setInputControlIdentificacion(
                    "form-control ps-form__input alertboton  basecolorinput"
                );
                errors.identificacion = true;
                formOk = false;
                return;
            }

            if (formOk) {
                setInputControlIdentificacion(
                    "form-control ps-form__input  basecolorinput"
                );
            }
        }
    };

    const resetTelefono = () => {
        setInputControlTelefono("form-control ps-form__input  basecolorinput");
        setActivaMensajePhone(false);
    };

    const reiniciarRazonSocial = (email) => {
        setMensajeRazonSocial(false);
        setActivaMensajeRazonSocial(false);
        setInputControlRazonSocial(
            "form-control ps-form__input basecolorinput"
        );
    };

    const reiniciarUsuario = () => {
        setMensajeUsuario(false);
        setActivaMensajeUsuario(false);
        setInputControlUsuario("form-control ps-form__input basecolorinput");
    };

    const reiniciarEmail = (email) => {
        setInputControlEmail("form-control ps-form__input");
        setActivaMensajeEmail(false);
        setInputControlConfirmarEmail("form-control ps-form__input");
        setActivaMensajeConfirmarEmail(false);
    };

    const reiniciarConfirmarEmail = (email) => {
        setInputControlEmail("form-control ps-form__input");
        setActivaMensajeEmail(false);
        setInputControlConfirmarEmail("form-control ps-form__input");
        setActivaMensajeConfirmarEmail(false);
    };

    const validaEmail = (email) => {
        setInputControlEmail("form-control ps-form__input");
        setActivaMensajeEmail(false);
        setInputControlConfirmarEmail("form-control ps-form__input");
        setActivaMensajeConfirmarEmail(false);

        setFormError({});
        let errors = {};
        let formOk = true;

        if (formData.email) {
            if (!validateEmail(formData.email)) {
                setInputControlEmail("form-control ps-form__input  alertboton");
                setMensajeEmail("Recuerda, Ingresa un email valido");
                setActivaMensajeEmail(true);
                errors.email = true;
                formOk = false;
                return;
            }

            if (formData.email && formData.emaildos) {
                if (formData.email != formData.emaildos) {
                    setInputControlConfirmarEmail(
                        "form-control ps-form__input  alertboton"
                    );
                    setMensajeConfirmarEmail(
                        "Email y confirmación email deben ser iguales!"
                    );
                    setActivaMensajeConfirmarEmail(true);
                    setInputControlEmail(
                        "form-control ps-form__input  alertboton"
                    );
                    setMensajeEmail(
                        "Email y confirmación email deben ser iguales!"
                    );
                    setActivaMensajeEmail(true);
                    errors.email = true;
                    formOk = false;
                    return;
                }
            }
        }

        if (formOk) {
            setInputControlEmail("form-control ps-form__input");
        }
    };

    const validaConfirmaEmail = (email) => {
        setInputControlConfirmarEmail("form-control ps-form__input");
        setActivaMensajeConfirmarEmail(false);
        setInputControlEmail("form-control ps-form__input");
        setActivaMensajeEmail(false);

        setFormError({});
        let errors = {};
        let formOk = true;

        if (formData.emaildos) {
            if (!validateEmail(formData.emaildos)) {
                setMensajeConfirmarEmail("Recuerda, Ingresa un email valido");
                setActivaMensajeConfirmarEmail(true);
                setInputControlConfirmarEmail(
                    "form-control ps-form__input alertboton"
                );
                errors.email = true;
                formOk = false;
                return;
            }

            if (formData.email && formData.emaildos) {
                if (formData.email != formData.emaildos) {
                    setInputControlConfirmarEmail(
                        "form-control ps-form__input  alertboton"
                    );
                    setMensajeConfirmarEmail(
                        "Email y confirmación email deben ser iguales!"
                    );
                    setActivaMensajeConfirmarEmail(true);
                    setInputControlEmail(
                        "form-control ps-form__input  alertboton"
                    );
                    setMensajeEmail(
                        "Email y confirmación email deben ser iguales!"
                    );
                    setActivaMensajeEmail(true);
                    errors.email = true;
                    formOk = false;
                    return;
                }
            }
        }

        if (formOk) {
            setInputControlConfirmarEmail("form-control ps-form__input");
        }
    };

    const resetNumeroIdentificacion = () => {
        setInputControlIdentificacion(
            "form-control ps-form__input  basecolorinput"
        );
        setActivaMensajeIdentificacion(false);
    };

    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const validaNombre = (nombre) => {
        var cadena = removeAccents(formData.primernombre);

        setActivaMensajeApellido(false);
        let regex = new RegExp("^[a-zA-Z ]+$");

        if (formData.primernombre) {
            if (!regex.test(cadena)) {
                setActivaMensajeNombre(true);
                setMensajeNombre("Recuerda, Los nombres solo incluyen letras!");
                return false;
            }
        }
    };

    const validaApellido = (apellido) => {
        var cadena = removeAccents(formData.primerapellido);

        let regex = new RegExp("^[a-zA-Z ]+$");

        if (formData.primerapellido) {
            if (!regex.test(cadena)) {
                setActivaMensajeApellido(true);
                setMensajeApellido(
                    "Recuerda, Los apellido solo incluyen letras!"
                );
                return false;
            }
        }
    };

    const validaRazonSocial = (razonsocial) => {
        let regex = new RegExp("^[a-zA-Z0-9]+$");

        if (formData.razonsocial) {
            /*
            if (!regex.test(formData.razonsocial)) {
                setActivaMensajeRazonSocial(true);
                setMensajeRazonSocial(
                    "Recuerda, La Razón Social solo incluyen letras y números!"
                );
                return false;
            }*/
        }
    };

    const validaUsuario = (usuario) => {
        if (usuario.length > 10) {
            setActivaMensajeUsuario(true);
            setMensajeUsuario(
                "Recuerda, La longitud maxima es de 10 caracteres!"
            );
            return false;
        }
        if (formData.usuario) {
            /*
            if (!regex.test(formData.razonsocial)) {
                setActivaMensajeRazonSocial(true);
                setMensajeRazonSocial(
                    "Recuerda, La Razón Social solo incluyen letras y números!"
                );
                return false;
            }*/
        }
    };

    const validaClave = (clave) => {
        setFormError({});
        let errors = {};
        let formOk = true;

        if (formData.password) {
            if (formData.password.length < 8) {
                setActivaMensajeContraseña(true);
                setMensajeContraseña(
                    "La contraseña debe ser mayor a siete (7) caracteres!"
                );
                setInputControlClave("form-control ps-form__input  alertboton");
                setInputControlConfirmeClave(
                    "form-control ps-form__input  alertboton"
                );

                errors.password = true;
                formOk = false;
                return;
            }

            if (formData.passworddos)
                if (formData.password != formData.passworddos) {
                    setActivaMensajeContraseña(true);
                    setMensajeContraseña(
                        "Contraseña y confirmación contraseña deben ser iguales!"
                    );
                    setInputControlClave(
                        "form-control ps-form__input  alertboton"
                    );
                    setInputControlConfirmeClave(
                        "form-control ps-form__input  alertboton"
                    );

                    errors.password = true;
                    formOk = false;
                    return;
                }
        }

        if (formOk) {
            setInputControlClave("form-control ps-form__input");
            setInputControlConfirmeClave("form-control ps-form__input");
        }
    };

    const validaConfirmarClave = (clave) => {
        setFormError({});
        let errors = {};
        let formOk = true;

        if (formData.passworddos) {
            if (formData.passworddos.length < 8) {
                setActivaMensajeConfirmarContraseña(true);
                setMensajeConfirmarContraseña(
                    "Contraseña debe ser mayor a siete (7) caracteres!"
                );
                setInputControlClave("form-control ps-form__input  alertboton");
                setInputControlConfirmeClave(
                    "form-control ps-form__input  alertboton"
                );

                errors.password = true;
                formOk = false;
                return;
            }
        }

        if (formData.passworddos && formData.password)
            if (formData.password != formData.passworddos) {
                setActivaMensajeConfirmarContraseña(true);
                setMensajeConfirmarContraseña(
                    "Contraseña y confirmación contraseña deben ser iguales!"
                );
                setInputControlClave("form-control ps-form__input  alertboton");
                setInputControlConfirmeClave(
                    "form-control ps-form__input  alertboton"
                );

                errors.password = true;
                formOk = false;
                return;
            }

        if (formOk) {
            setInputControlClave("form-control ps-form__input");
            setInputControlConfirmeClave("form-control ps-form__input");
        }
    };

    const onFocusContraseña = () => {
        setActivaMensajeConfirmarContraseña(false);
        setActivaMensajeContraseña(false);
        setInputControlClave("form-control ps-form__input");
        setInputControlConfirmeClave("form-control ps-form__input");
    };

    const onFocusConfirmarContraseña = () => {
        setActivaMensajeConfirmarContraseña(false);
        setActivaMensajeContraseña(false);
        setInputControlClave("form-control ps-form__input");
        setInputControlConfirmeClave("form-control ps-form__input");
    };

    const onFocusNombres = () => {
        setActivaMensajeNombre(false);
        //setActivaMensajeApellido(false);
        setInputControlNombres("form-control ps-form__input");
        //setInputControlApellidos("form-control ps-form__input");
    };

    const onFocusApellidos = () => {
        //setActivaMensajeNombre(false);
        setActivaMensajeApellido(false);
        //setInputControlNombres("form-control ps-form__input");
        setInputControlApellidos("form-control ps-form__input");
    };

    const CustomDropdownButton = React.forwardRef(
        ({ children, onClick, href }, ref) => (
            <button
                ref={ref}
                onClick={(e) => {
                    e.preventDefault();
                    onClick(e);
                }}
                href={href}
                className="DropDownTipoDocumento">
                {children}
            </button>
        )
    );

    const handleSelect = (value, nombre) => {
        if (value != tipoIdentificacion) {
            setFormData(clearValueForm());
        }
        setSelectedItem(nombre);
        setTipoIdentificacion(value);
        resetTelefono();
    };

    const [selectedItem, setSelectedItem] = useState(
        "Seleccione tipo de identificación"
    );

    const optionAceptaTerminos = () => {
        setActivaMensajeTerminos(false);
        setInputControlTerminos("");
        setclassTerminos("form-check-label");
    };

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    return (
        <Container title="Mi Cuenta">
            <ModalMensajesPersonaJuridica
                shown={showModalMensajesPersonaJuridica}
                close={setShowModalMensajesPersonaJuridica}
                titulo={tituloMensajesPersonaJuridica}
                mensaje={textoMensajesPersonaJuridica}
                setSubirDocsNit={setSubirDocsNit}
                setShowModalFotos={setShowModalFotos}
                setSoyNuevo={0}
                setTengoCuenta={0}
                tipo="1"
            />
            <ModalMensajesSoyNuevo
                shown={showModalMensajesSoyNuevo}
                close={setShowModalMensajesSoyNuevo}
                titulo={tituloMensajesSoyNuevo}
                mensaje={textoMensajesSoyNuevo}
                setSoyNuevo={0}
                setTengoCuenta={0}
                tipo="1"
            />
            <ModalMensajes
                shown={showModalDos}
                close={handleModalClose}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="error"
            />
            <ModalMensajesDctosNit
                shown={showModalDctosNit}
                close={setShowModalDctosNit}
                titulo={tituloDctosNit}
                mensaje={textoDctosNit}
                setMostrarSubirDctos={setMostrarSubirDctos}
                tipo="error"
            />
            <ModalMensajesContactanos
                shown={showModalCrearCta}
                close={setShowModalCrearCta}
                titulo={tituloCrearCta}
                mensaje={textoCrearCta}
                setActivarCity={setCrearCta}
                textoBoton="Cerrar"
                tipo="6"
            />
            <ModalMensajesImgNit
                shown={showModalJuridica}
                close={setShowModalJuridica}
                titulo={tituloJuridica}
                mensaje={textoJuridica}
                setActivarCity={0}
                textoBoton="Cerrar"
                tipo="6"
            />

            <div className="ps-page ps-page--inner" id="myaccount" ref={irA}>
                <div className="container">
                    <div className="ps-page__header"></div>
                    <div className="ps-page__content ps-account">
                        <div className="row containerRegistrarse">
                            {!datosusuarios.logged ? (
                                <div className="col-12 col-md-8">
                                    <form onChange={onChange}>
                                        <div className="ps-form--review">
                                            <img
                                                src="/static/img/favicon_2.png"
                                                alt=""
                                            />
                                            <Row>
                                                <Col xs={12} lg={6}>
                                                    <label className="ps-form__label">
                                                        Tipo Identificación
                                                    </label>
                                                    <div>
                                                        <Dropdown
                                                            style={{
                                                                width: "100%",
                                                            }}>
                                                            <Dropdown.Toggle
                                                                as={
                                                                    CustomDropdownButton
                                                                }
                                                                id="dropdown-basic">
                                                                {selectedItem}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="tamañocajaoDropDownTipoDocumento">
                                                                {tiposId &&
                                                                    tiposId.map(
                                                                        (
                                                                            itemselect
                                                                        ) => (
                                                                            <Dropdown.Item
                                                                                className="itemsdropdownTipoDoc"
                                                                                onClick={() =>
                                                                                    handleSelect(
                                                                                        itemselect.id,
                                                                                        `${itemselect.tipoidentificacion} - ${itemselect.descripcion}`
                                                                                    )
                                                                                }
                                                                                eventKey={
                                                                                    itemselect.id
                                                                                }>
                                                                                {`${itemselect.tipoidentificacion} - ${itemselect.descripcion}`}
                                                                            </Dropdown.Item>
                                                                        )
                                                                    )}
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </Col>
                                                <Col xs={12} lg={6}>
                                                    <label className="ps-form__label">
                                                        Nombre usuario
                                                    </label>
                                                    <div>
                                                        <input
                                                            className={
                                                                inputControlUsuario
                                                            }
                                                            placeholder="Maximo 10 caracteres"
                                                            name="usuario"
                                                            value={
                                                                formData.usuario
                                                            }
                                                            type="text"
                                                            onFocus={
                                                                reiniciarUsuario
                                                            }
                                                            onBlur={(e) =>
                                                                validaUsuario(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        {activaMensajeUsuario ? (
                                                            <h4 className="mensajeerrornombreusuario">
                                                                {mensajeUsuario}
                                                            </h4>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                            </Row>
                                            <br />
                                            {tipoIdentificacion == 6 ? (
                                                <div>
                                                    <Row>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Número de
                                                                    identificación
                                                                </label>
                                                                <input
                                                                    className={
                                                                        inputControlIdentificacion
                                                                    }
                                                                    autoComplete={Math.random().toString()}
                                                                    value={
                                                                        formData.identificacion
                                                                    }
                                                                    name="identificacion"
                                                                    onBlur={(
                                                                        e
                                                                    ) =>
                                                                        validaIdentificacion(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    onClick={
                                                                        resetNumeroIdentificacion
                                                                    }
                                                                    onKeyPress={(
                                                                        e
                                                                    ) => {
                                                                        const charCode =
                                                                            e.which
                                                                                ? e.which
                                                                                : e.keyCode;
                                                                        if (
                                                                            charCode >
                                                                            31 &&
                                                                            (charCode <
                                                                                48 ||
                                                                                charCode >
                                                                                57)
                                                                        ) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    maxLength={
                                                                        10
                                                                    }
                                                                />
                                                                {activaMensajeIdentificacion ? (
                                                                    <h4 className="mensajeerrornombreusuario">
                                                                        {
                                                                            mensajeIdentificacion
                                                                        }
                                                                    </h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xs={6} lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Razon Social
                                                                </label>
                                                                <input
                                                                    className={
                                                                        inputControlRazonSocial
                                                                    }
                                                                    placeholder="Ej: Mercado Repuesto S.A.S."
                                                                    name="razonsocial"
                                                                    value={
                                                                        formData.razonsocial
                                                                    }
                                                                    type="text"
                                                                    onFocus={
                                                                        reiniciarRazonSocial
                                                                    }
                                                                    onBlur={(
                                                                        e
                                                                    ) =>
                                                                        validaRazonSocial(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                {activaMensajeRazonSocial ? (
                                                                    <h4 className="mensajeerrornombreusuario">
                                                                        {
                                                                            mensajeRazonSocial
                                                                        }
                                                                    </h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xs={2} lg={2}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label ps-btn--warning">
                                                                    Prefijo *
                                                                </label>
                                                                <input
                                                                    className={
                                                                        inputControlTelefono
                                                                    }
                                                                    defaultValue="+57"
                                                                    value={
                                                                        "+57"
                                                                    }
                                                                    name="prefijo"
                                                                    type="text"
                                                                    disabled
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs={4} lg={4}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label ps-btn--warning">
                                                                    Número
                                                                    telefónico *
                                                                </label>
                                                                <input
                                                                    autoComplete={Math.random().toString()}
                                                                    className={
                                                                        inputControlTelefono
                                                                    }
                                                                    onChange={
                                                                        onChangeDatoTelefono
                                                                    }
                                                                    value={
                                                                        formData.telefono
                                                                    }
                                                                    onClick={
                                                                        resetTelefono
                                                                    }
                                                                    //onBlur={(
                                                                    //    e
                                                                    //) =>
                                                                    //validaTelefono(
                                                                    //    e
                                                                    //        .target
                                                                    //        .value
                                                                    //)
                                                                    //}
                                                                    name="telefono"
                                                                    type="text"
                                                                    onKeyPress={(
                                                                        e
                                                                    ) => {
                                                                        //función para no permitir letras
                                                                        const charCode =
                                                                            e.which
                                                                                ? e.which
                                                                                : e.keyCode;
                                                                        if (
                                                                            charCode >
                                                                            31 &&
                                                                            (charCode <
                                                                                48 ||
                                                                                charCode >
                                                                                57)
                                                                        ) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                            {activaMensajePhone ? (
                                                                <h4 className="mensajeerroringresophonedos">
                                                                    {
                                                                        mensajePhone
                                                                    }
                                                                </h4>
                                                            ) : null}
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Dirección de
                                                                    correo *
                                                                </label>
                                                                <FormControl
                                                                    className={
                                                                        inputControlEmail
                                                                    }
                                                                    type="email"
                                                                    name="email"
                                                                    value={
                                                                        formData.email
                                                                    }
                                                                    onBlur={(
                                                                        e
                                                                    ) =>
                                                                        validaEmail(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    onFocus={
                                                                        reiniciarEmail
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        validaRazonSocial(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    autoComplete={Math.random().toString()}
                                                                />
                                                                {activaMensajeEmail ? (
                                                                    <h4 className="mensajeerrornombreusuario">
                                                                        {
                                                                            mensajeEmail
                                                                        }
                                                                    </h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Confirme
                                                                    dirección de
                                                                    correo *
                                                                </label>
                                                                <FormControl
                                                                    className={
                                                                        inputControlConfirmarEmail
                                                                    }
                                                                    onBlur={(
                                                                        e
                                                                    ) =>
                                                                        validaConfirmaEmail(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    onFocus={
                                                                        reiniciarConfirmarEmail
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        validaEmail(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    type="email"
                                                                    value={
                                                                        formData.emaildos
                                                                    }
                                                                    name="emaildos"
                                                                    autoComplete={Math.random().toString()}
                                                                />
                                                                {activaMensajeConfirmarEmail ? (
                                                                    <h4 className="mensajeerrornombreusuario">
                                                                        {
                                                                            mensajeConfirmarEmail
                                                                        }
                                                                    </h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>

                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Contraseña *
                                                                </label>

                                                                <div className="input-group">
                                                                    <div
                                                                        style={{
                                                                            position:
                                                                                "relative",
                                                                            width: "100%",
                                                                        }}>
                                                                        <input
                                                                            className={
                                                                                inputControlClave
                                                                            }
                                                                            onBlur={(
                                                                                e
                                                                            ) =>
                                                                                validaClave(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                validaConfirmaEmail(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            onFocus={
                                                                                onFocusContraseña
                                                                            }
                                                                            type={
                                                                                showPassword
                                                                                    ? "text"
                                                                                    : "password"
                                                                            }
                                                                            name="password"
                                                                            autoComplete={Math.random().toString()}
                                                                        />
                                                                        <div
                                                                            style={{
                                                                                position:
                                                                                    "absolute",
                                                                                top: "50%",
                                                                                right: "10px",
                                                                                transform:
                                                                                    "translateY(-50%)",
                                                                                cursor: "pointer",
                                                                            }}
                                                                            onClick={() =>
                                                                                setShowPassword(
                                                                                    !showPassword
                                                                                )
                                                                            }>
                                                                            {showPassword ? (
                                                                                <ImEye />
                                                                            ) : (
                                                                                <ImEyeBlocked />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {activaMensajeContraseña ? (
                                                                    <h4 className="mensajeerrornombreusuario">
                                                                        {
                                                                            mensajeContraseña
                                                                        }
                                                                    </h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Confirme
                                                                    contraseña *
                                                                </label>
                                                                <div className="input-group">
                                                                    <div
                                                                        style={{
                                                                            position:
                                                                                "relative",
                                                                            width: "100%",
                                                                        }}>
                                                                        <input
                                                                            className={
                                                                                inputControlConfirmeClave
                                                                            }
                                                                            onBlur={(
                                                                                e
                                                                            ) =>
                                                                                validaConfirmarClave(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                validaClave(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            onFocus={
                                                                                onFocusConfirmarContraseña
                                                                            }
                                                                            type={
                                                                                showPasswordDos
                                                                                    ? "text"
                                                                                    : "password"
                                                                            }
                                                                            name="passworddos"
                                                                            autoComplete={Math.random().toString()}
                                                                        />
                                                                        <div
                                                                            style={{
                                                                                position:
                                                                                    "absolute",
                                                                                top: "50%",
                                                                                right: "10px",
                                                                                transform:
                                                                                    "translateY(-50%)",
                                                                                cursor: "pointer",
                                                                            }}
                                                                            onClick={() =>
                                                                                setShowPasswordDos(
                                                                                    !showPasswordDos
                                                                                )
                                                                            }>
                                                                            {showPasswordDos ? (
                                                                                <ImEye />
                                                                            ) : (
                                                                                <ImEyeBlocked />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {activaMensajeConfirmarContraseña ? (
                                                                    <h4 className="mensajeerrornombreusuario">
                                                                        {
                                                                            mensajeConfirmarContraseña
                                                                        }
                                                                    </h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ) : tipoIdentificacion ? (
                                                <div>
                                                    <Row>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Número de
                                                                    identificación
                                                                </label>
                                                                <input
                                                                    autoComplete={Math.random().toString()}
                                                                    className={
                                                                        inputControlIdentificacion
                                                                    }
                                                                    name="identificacion"
                                                                    value={
                                                                        formData.identificacion
                                                                    }
                                                                    onBlur={(
                                                                        e
                                                                    ) =>
                                                                        validaIdentificacion(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    onClick={
                                                                        resetNumeroIdentificacion
                                                                    }
                                                                    onKeyPress={(
                                                                        e
                                                                    ) => {
                                                                        const charCode =
                                                                            e.which
                                                                                ? e.which
                                                                                : e.keyCode;
                                                                        if (
                                                                            charCode >
                                                                            31 &&
                                                                            (charCode <
                                                                                48 ||
                                                                                charCode >
                                                                                57)
                                                                        ) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    maxLength={
                                                                        10
                                                                    }
                                                                />
                                                            </div>
                                                            {activaMensajeIdentificacion ? (
                                                                <h4 className="mensajeerrornombreusuario">
                                                                    {
                                                                        mensajeIdentificacion
                                                                    }
                                                                </h4>
                                                            ) : null}
                                                        </Col>
                                                        <Col xs lg={2}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label ps-btn--warning">
                                                                    Prefijo *
                                                                </label>
                                                                <input
                                                                    className={
                                                                        inputControlTelefono
                                                                    }
                                                                    defaultValue="+57"
                                                                    value={
                                                                        "+57"
                                                                    }
                                                                    name="prefijo"
                                                                    type="text"
                                                                    disabled
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={4}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label ps-btn--warning">
                                                                    Número
                                                                    telefónico *
                                                                </label>
                                                                <input
                                                                    autoComplete={Math.random().toString()}
                                                                    className={
                                                                        inputControlTelefono
                                                                    }
                                                                    onChange={
                                                                        onChangeDatoTelefono
                                                                    }
                                                                    value={
                                                                        formData.telefono
                                                                    }
                                                                    onClick={
                                                                        resetTelefono
                                                                    }
                                                                    //onBlur={(
                                                                    //    e
                                                                    //) =>
                                                                    //validaTelefono(
                                                                    //    e
                                                                    //        .target
                                                                    //        .value
                                                                    //)
                                                                    //}
                                                                    name="telefono"
                                                                    type="text"
                                                                    onKeyPress={(
                                                                        e
                                                                    ) => {
                                                                        //función para no permitir letras
                                                                        const charCode =
                                                                            e.which
                                                                                ? e.which
                                                                                : e.keyCode;
                                                                        if (
                                                                            charCode >
                                                                            31 &&
                                                                            (charCode <
                                                                                48 ||
                                                                                charCode >
                                                                                57)
                                                                        ) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                            {activaMensajePhone ? (
                                                                <h4 className="mensajeerroringresophonedos">
                                                                    {
                                                                        mensajePhone
                                                                    }
                                                                </h4>
                                                            ) : null}
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Nombres
                                                                </label>
                                                                <input
                                                                    className={
                                                                        inputControlNombres
                                                                    }
                                                                    placeholder="Ej: Juan"
                                                                    name="primernombre"
                                                                    type="text"
                                                                    onFocus={
                                                                        onFocusNombres
                                                                    }
                                                                    value={
                                                                        formData.primernombre
                                                                    }
                                                                    onBlur={(
                                                                        e
                                                                    ) =>
                                                                        validaNombre(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    //onClick={(
                                                                    //    e
                                                                    //) =>
                                                                    //    validaTelefono(
                                                                    //        e
                                                                    //            .target
                                                                    //            .value
                                                                    //    )
                                                                    //}
                                                                    onKeyPress={(
                                                                        e
                                                                    ) => {
                                                                        //función para no permitir numeros
                                                                        const charCode =
                                                                            e.which
                                                                                ? e.which
                                                                                : e.keyCode;
                                                                        if (
                                                                            charCode >
                                                                            31 &&
                                                                            (charCode <
                                                                                65 ||
                                                                                charCode >
                                                                                90) &&
                                                                            (charCode <
                                                                                97 ||
                                                                                charCode >
                                                                                122) &&
                                                                            charCode !==
                                                                            32
                                                                        ) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                                {activaMensajeNombre ? (
                                                                    <h4 className="mensajeerrornombreusuario">
                                                                        {
                                                                            mensajeNombre
                                                                        }
                                                                    </h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Apellidos
                                                                </label>
                                                                <input
                                                                    className={
                                                                        inputControlApellidos
                                                                    }
                                                                    placeholder="Ej: López Álvarez"
                                                                    name="primerapellido"
                                                                    value={
                                                                        formData.primerapellido
                                                                    }
                                                                    type="text"
                                                                    onFocus={
                                                                        onFocusApellidos
                                                                    }
                                                                    onBlur={(
                                                                        e
                                                                    ) =>
                                                                        validaApellido(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        validaNombre(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    onKeyPress={(
                                                                        e
                                                                    ) => {
                                                                        //función para no permitir numeros
                                                                        const charCode =
                                                                            e.which
                                                                                ? e.which
                                                                                : e.keyCode;
                                                                        if (
                                                                            charCode >
                                                                            31 &&
                                                                            (charCode <
                                                                                65 ||
                                                                                charCode >
                                                                                90) &&
                                                                            (charCode <
                                                                                97 ||
                                                                                charCode >
                                                                                122) &&
                                                                            charCode !==
                                                                            32
                                                                        ) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                                {activaMensajeApellido ? (
                                                                    <h4 className="mensajeerrornombreusuario">
                                                                        {
                                                                            mensajeApellido
                                                                        }
                                                                    </h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Dirección de
                                                                    correo *
                                                                </label>
                                                                <FormControl
                                                                    className={
                                                                        inputControlEmail
                                                                    }
                                                                    type="email"
                                                                    name="email"
                                                                    value={
                                                                        formData.email
                                                                    }
                                                                    onBlur={(
                                                                        e
                                                                    ) =>
                                                                        validaEmail(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    autoComplete={Math.random().toString()}
                                                                    onFocus={
                                                                        reiniciarEmail
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        validaRazonSocial(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                {activaMensajeEmail ? (
                                                                    <h4 className="mensajeerrornombreusuario">
                                                                        {
                                                                            mensajeEmail
                                                                        }
                                                                    </h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Confirme
                                                                    dirección de
                                                                    correo *
                                                                </label>
                                                                <FormControl
                                                                    className={
                                                                        inputControlConfirmarEmail
                                                                    }
                                                                    onBlur={(
                                                                        e
                                                                    ) =>
                                                                        validaConfirmaEmail(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    onFocus={
                                                                        reiniciarConfirmarEmail
                                                                    }
                                                                    value={
                                                                        formData.emaildos
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        validaEmail(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    name="emaildos"
                                                                    type="email"
                                                                    autoComplete={Math.random().toString()}
                                                                />
                                                                {activaMensajeConfirmarEmail ? (
                                                                    <h4 className="mensajeerrornombreusuario">
                                                                        {
                                                                            mensajeConfirmarEmail
                                                                        }
                                                                    </h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>

                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Contraseña *
                                                                </label>
                                                                <div className="input-group">
                                                                    <div
                                                                        style={{
                                                                            position:
                                                                                "relative",
                                                                            width: "100%",
                                                                        }}>
                                                                        <input
                                                                            style={{
                                                                                width: "100%",
                                                                            }}
                                                                            className={
                                                                                inputControlClave
                                                                            }
                                                                            onBlur={(
                                                                                e
                                                                            ) =>
                                                                                validaClave(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                validaConfirmaEmail(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            onFocus={
                                                                                onFocusContraseña
                                                                            }
                                                                            type={
                                                                                showPassword
                                                                                    ? "text"
                                                                                    : "password"
                                                                            }
                                                                            name="password"
                                                                        />
                                                                        <div
                                                                            style={{
                                                                                position:
                                                                                    "absolute",
                                                                                top: "50%",
                                                                                right: "10px",
                                                                                transform:
                                                                                    "translateY(-50%)",
                                                                                cursor: "pointer",
                                                                            }}
                                                                            onClick={() =>
                                                                                setShowPassword(
                                                                                    !showPassword
                                                                                )
                                                                            }>
                                                                            {showPassword ? (
                                                                                <ImEye />
                                                                            ) : (
                                                                                <ImEyeBlocked />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {activaMensajeContraseña ? (
                                                                    <h4 className="mensajeerrornombreusuario">
                                                                        {
                                                                            mensajeContraseña
                                                                        }
                                                                    </h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Confirme
                                                                    contraseña *
                                                                </label>
                                                                <div className="input-group">
                                                                    <div
                                                                        style={{
                                                                            position:
                                                                                "relative",
                                                                            width: "100%",
                                                                        }}>
                                                                        <input
                                                                            style={{
                                                                                width: "100%",
                                                                            }}
                                                                            className={
                                                                                inputControlConfirmeClave
                                                                            }
                                                                            onBlur={(
                                                                                e
                                                                            ) =>
                                                                                validaConfirmarClave(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                validaClave(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            onFocus={
                                                                                onFocusConfirmarContraseña
                                                                            }
                                                                            type={
                                                                                showPasswordDos
                                                                                    ? "text"
                                                                                    : "password"
                                                                            }
                                                                            name="passworddos"
                                                                        />
                                                                        <div
                                                                            style={{
                                                                                position:
                                                                                    "absolute",
                                                                                top: "50%",
                                                                                right: "10px",
                                                                                transform:
                                                                                    "translateY(-50%)",
                                                                                cursor: "pointer",
                                                                            }}
                                                                            onClick={() =>
                                                                                setShowPasswordDos(
                                                                                    !showPasswordDos
                                                                                )
                                                                            }>
                                                                            {showPasswordDos ? (
                                                                                <ImEye />
                                                                            ) : (
                                                                                <ImEyeBlocked />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {activaMensajeConfirmarContraseña ? (
                                                                    <h4 className="mensajeerrornombreusuario">
                                                                        {
                                                                            mensajeConfirmarContraseña
                                                                        }
                                                                    </h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ) : null}

                                            {tipoIdentificacion ? (
                                                <div>
                                                    <Row
                                                        style={{
                                                            marginTop:
                                                                "-1.5rem",
                                                        }}>
                                                        <Col xs={3}></Col>

                                                        <Col xs lg={6}>
                                                            {/*   <div className={inputControlRobot} style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center'  }}>
                                                                <ReCAPTCHA
                                                                    ref={captcha}
                                                                    sitekey="6Ld9HvkdAAAAAO7MeibRy8PNVMApQu5xC2vzqGF6"
                                                                    onChange={onChangeNoSoyRobot}
                                                                />
                                                            </div>
                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                {activaMensajeRobot ? (
                                                                    <h4 className="mensajeerrornombreusuario">{mensajeRobot}</h4>
                                                                ) : null}
                                                            </div>*/}
                                                            <div className="SugerenciaCont">
                                                                <p className="ps-form__text">
                                                                    Sugerencia:
                                                                    La
                                                                    contraseña
                                                                    debe tener
                                                                    ocho
                                                                    caracteres
                                                                    como mínimo.
                                                                    Para mayor
                                                                    seguridad,
                                                                    debe incluir
                                                                    letras{" "}
                                                                    <br />{" "}
                                                                    minúsculas,
                                                                    mayúsculas,
                                                                    números y
                                                                    símbolos
                                                                    como !{" "}
                                                                    <br /> " ? $
                                                                    % ^ &amp; ).
                                                                </p>
                                                            </div>
                                                            <div className="TermsContainer">
                                                                <div
                                                                    className={
                                                                        inputControlTerminos
                                                                    }>
                                                                    <div className="form-check form-checkTerminos">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            id="remember"
                                                                            onClick={
                                                                                aceptarTerminos
                                                                            }
                                                                        />
                                                                        <label
                                                                            className={
                                                                                classTerminos
                                                                            }
                                                                            onClick={() =>
                                                                                optionAceptaTerminos()
                                                                            }
                                                                            htmlFor="remember">
                                                                            Acepto
                                                                            términos
                                                                            y
                                                                            condiciones
                                                                        </label>
                                                                    </div>
                                                                    {activaMensajeTerminos ? (
                                                                        <div
                                                                            className={
                                                                                classAceptaTerminos
                                                                            }>
                                                                            {
                                                                                mensajeTerminos
                                                                            }
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                            <div className="subcontFooterForm">
                                                                <div
                                                                    className="BotónRegistrarse"
                                                                    onClick={
                                                                        registrarse
                                                                    }>
                                                                    Registrarse
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col xs={3}></Col>
                                                    </Row>
                                                </div>
                                            ) : null}
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                console.log("FALSO")
                            )}
                        </div>
                    </div>
                </div>
                {subirDocsNit ? (
                    <IngresoFotosDocsNit
                        setShowModalFotos={setShowModalFotos}
                        showModalFotos={showModalFotos}
                        setSubirDocsNit={setSubirDocsNit}
                        idUid={idUid}
                        email={formData.email}
                    />
                ) : (
                    console.log("MOSTRAR MODAL DOCS NIT : FALSE")
                )}
            </div>

            {showModal ? (
                <div
                    className="modal-fondo mtmenos15"
                    onClick={onCloseModalActivarCuenta}>
                    <div
                        className="modal-Token redondearventamensajes"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}>
                        <Row>
                            <Col xl={1} lg={1} md={1} sm={1}>
                                <div className="iconoventanamensajes mtmenos14">
                                    <InfoIcon style={{ fontSize: 45 }} />
                                </div>
                            </Col>
                            <Col xl={9} lg={9} md={9} sm={9}>
                                <div className="ml-30 titulodetaildescription">
                                    Activar cuenta
                                </div>
                            </Col>
                            <Col xl={1} lg={1} md={1} sm={1}>
                                <button
                                    type="button"
                                    className="cerrarmodal ml-40 sinborder colorbase"
                                    data-dismiss="modal"
                                    onClick={() => {
                                        onCloseModalActivarCuenta();
                                    }}>
                                    X
                                </button>
                            </Col>
                        </Row>
                        <div className="mt-18 textoventanamensajesNuevo">
                            <div>
                                <form onChange={onChangeToken}>
                                    <div className="formtOKEN">
                                        <div className="Ptoken">
                                            <p>Ingresar token:</p>
                                        </div>
                                        <input
                                            className="tokenInputMyacount"
                                            name="token"
                                            type="text"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="cerrarVerifButtonToken">
                            <button
                                onClick={() => setShowModal(false)}
                                className="botoncerraractivar">
                                Cerrar
                            </button>
                            <button
                                className="RecuperarContraseñaSMS"
                                onClick={validarToken}>
                                Activar Cuenta
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            <Dialog
                open={open}
                disableScrollLock={true}
                onClose={() => setOpen(false)}
                PaperProps={{
                    style: {
                        borderRadius: 15,
                    },
                }}>
                <div className="contTokenIcorrect">
                    <div className="topContTokenIcorrect">
                        <InfoIcon style={{ fontSize: 41 }} />
                        <p>Mercado repuesto</p>
                        <p>X</p>
                    </div>

                    <div className="txtContTokenIcorrect">
                        <p>
                            {" "}
                            Por favor, revisa el codigo ingresado, no
                            corresponde!
                        </p>
                    </div>

                    <div className="closeContTokenIcorrect">
                        <button onClick={() => setOpen(false)} color="primary">
                            Cerrar
                        </button>
                    </div>
                </div>
            </Dialog>

            <Dialog
                disableScrollLock={true}
                open={openNewDialog}
                //open={true}
                onClose={() => setOpenNewDialog(false)}
                PaperProps={{
                    style: {
                        borderRadius: 15,
                    },
                }}>
                <div className="contTokenEnviado">
                    <div className="topContTokenIcorrect">
                        <InfoIcon style={{ fontSize: 41 }} />
                        <p>Activar cuenta</p>
                        <p>X</p>
                    </div>
                    <div className="txtContTokenEnviado">
                        <Grid container>
                            <p>
                                Token enviado al correo, Recuerda revisar en correos
                                no deseados!
                            </p>
                            {
                                //   <p>token : {tokenDialog}</p>
                            }
                        </Grid>
                    </div>

                    <div className="closeContTokenIcorrect">
                        <button
                            onClick={() => setOpenNewDialog(false)}
                            color="primary">
                            Cerrar
                        </button>
                    </div>
                </div>
            </Dialog>

            <Modal className="modalactivarcuenta" show={showModalMedio}>
                <Modal.Header>
                    <h2>POR QUE MEDIO DESEA RECIBIR EL TOKEN</h2>
                    <button
                        type="button"
                        className="cerrarmodal"
                        data-dismiss="modal"
                        onClick={onCloseModalMedioToken}>
                        {" "}
                        X{" "}
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Row>
                            <Col xs lg={3}></Col>
                            <Col xs lg={3}>
                                <div className="ps-btn botonmediotoken">
                                    {" Email "}
                                </div>
                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
                <div className="botongrabarproducto">
                    <hr />
                    <Row>
                        <Col xs lg={4}></Col>
                        <Col xs lg={3}>
                            <Button
                                className="ps-btn"
                                onClick={() => setShowModalMedio(false)}>
                                {" "}
                                Cancelar{" "}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </Container>
    );
};

function defaultValueForm() {
    return {
        uid: "",
        primernombre: "",
        segundonombre: "",
        primerapellido: "",
        segundoapellido: "",
        razonsocial: "",
        tipoidentificacion: "",
        identificacion: "",
        telefono: "",
        email: "",
        emaildos: "",
        password: "",
        passworddos: "",
        token: "",
        activo: "N",
        direccion: "",
        fechacreacion: "",
    };
}

function clearValueForm() {
    return {
        uid: "",
        usuario: "",
        primernombre: "",
        segundonombre: "",
        primerapellido: "",
        segundoapellido: "",
        razonsocial: "",
        identificacion: "",
        telefono: "",
        email: "",
        emaildos: "",
        password: "",
        passworddos: "",
        token: "",
        activo: "N",
        direccion: "",
        fechacreacion: "",
    };
}

function defaultValueToken() {
    return {
        token: "",
    };
}

export default MyAccountScreen;
