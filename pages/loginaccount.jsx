import React, { useState, useEffect, useRef } from "react";
import Container from "~/components/layouts/Container";
import { validateEmail } from "../utilities/Validations";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ActivateUserRepository from "../repositories/ActivateUserRepository";
import UpdateTokenRepository from "~/repositories/UpdateTokenRepository";
import ReadUserEmail from "../repositories/ReadUserEmail";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";

import { getTokenRegistro } from "../store/tokenregistro/action";
import { getAddEdToCart } from "../store/addedtocart/action";
import { getAddLogin } from "../store/addlogin/action";
import { getDuplicarPrd } from "../store/duplicarprd/action";

import axios from "axios";
import Users from "~/repositories/Users";
import Moment from "moment";
import ModalLogin from "./mensajes/ModalLogin";
import ModalMensajesSoyNuevo from "./mensajes/ModalMensajesSoyNuevo";
//Constantes
import InfoIcon from "@material-ui/icons/Info";
import { URL_BD_MR, URL_IMAGES_RESULTS, URL_MK_MR } from "../helpers/Constants";
import Dialog from "@mui/material/Dialog";
//Firebase
import {
    signOut,
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";

import firebase from "../utilities/firebase";
import TokenRegistroRepository from "../repositories/TokenRegistroRepository";
import ModalControlAcceso from "./mensajes/ModalControlAcceso";

const LoginAccount = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(defaultValueForm());
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(false);
    const [formDataToken, setFormDataToken] = useState(defaultValueToken());
    const [formDataValidarToken, setFormDataValidarToken] = useState(
        defaultValueValidarToken()
    );
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [showModalMensajesCtlr, setShowModalMensajesCtlr] = useState(false);
    const [tituloMensajesCtlr, setTituloMensajesCtlr] = useState(false);
    const [textoMensajesCtlr, setTextoMensajesCtlr] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [showModalLlamada, setShowModalLlamada] = useState(false);
    const [showModalMedioReenviar, setShowModalMedioReenviar] = useState(false);
    const [showModalPropietarioCuenta, setShowModalPropietarioCuenta] =
        useState(false);
    const [showModalVerificar, setShowModalVerificar] = useState(false);

    const [showModalMensajesSoyNuevo, setShowModalMensajesSoyNuevo] =
        useState(false);
    const [tituloMensajesSoyNuevo, setTituloMensajesSoyNuevo] = useState(false);
    const [textoMensajesSoyNuevo, setTextoMensajesSoyNuevo] = useState(false);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [codigoToken, setCodigoToken] = useState("");
    const [idUid, setIdUid] = useState(0);
    const [recuperar, setRecuperar] = React.useState(false);
    const [usuario, setUsuario] = React.useState([]);
    const [medioSeleccionado, setMedioSeleccionado] = useState(false);
    const [telefonoRecupear, setTelefonoRecupear] = useState(0);
    const [cortartelefono, setCortarTelefono] = useState(0);
    const [venta, setVenta] = useState([]);

    const [showModalMedio, setShowModalMedio] = useState(false);
    const [classNameverificar, setClassNameverificar] = useState(
        "textoverificardeotraforma"
    );
    const [classNameSMS, setClassNameSMS] = useState(
        "cajaopcionesrecuperarcuenta mb-20"
    );
    const [classNameWhatsapp, setClassNameWhatsapp] = useState(
        "cajaopcionesrecuperarcuenta mt-20"
    );

    const [classNamePassword, setClassNamePassword] = useState("password");

    const [classNameEye, setClassNameEye] = useState(
        "fa fa-eye-slash toogle-password colorinput colorbase"
    );

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    const [inputControlEmail, setInputControlEmail] = useState(
        "form-controlNuevo ps-form__inputNuevo"
    );

    const [isError, setIsError] = useState(false);
    const [recoveryMethod, setRecoveryMethod] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [userCode, setUserCode] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");
    const [input4, setInput4] = useState("");
    const [input5, setInput5] = useState("");
    const [input6, setInput6] = useState("");
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    const input5Ref = useRef(null);
    const input6Ref = useRef(null);

    let redirect = null;
    let idventa = null;
    let ctlredirigir = null;
    let uidusuario = null;

    if (typeof window !== "undefined") {
        if (router.query.redirect) {
            let redirigir = router.query.redirect;
            redirect = router.query.redirect;
            idventa = router.query.idventa;
            ctlredirigir = router.query.ctlredirigir;
            uidusuario = router.query.uidusuario;
            //producto = JSON.parse(router.query.venta);
            //console.log("PRODDAAAA  : ", producto);
            // Guardar los datos en el almacenamiento local
            localStorage.setItem("redirect", JSON.stringify(redirigir));
            localStorage.setItem("idventa", JSON.stringify(idventa));
            localStorage.setItem("ctlredirigir", JSON.stringify(ctlredirigir));
            localStorage.setItem("uidusuario", JSON.stringify(uidusuario));
        }
    }

    useEffect(() => {
        const leerVenta = async () => {
            let params = {
                numerodeaprobacion: idventa
            }
            await axios({
                method: "post",
                url: URL_BD_MR + "1032",
                params,
            })
                .then((res) => {
                    //console.log("RES VENTA : ", res.data.listarmiscompras)
                    localStorage.setItem("venta", JSON.stringify(res.data.listarmiscompras));
                    setVenta(res.data.listarmiscompras[0]);
                })
                .catch(function (error) {
                    console.log(
                        "ERROR Leyendo venta producto"
                    );
                });
        }

        const leerMensaje = async () => {
            let params = {
                idmensaje: idventa
            }
            await axios({
                method: "post",
                url: URL_BD_MR + "242",
                params,
            })
                .then((res) => {
                    console.log("RES VENTA : ", res.data.listarmensajes);

                    setVenta(res.data.listarmensajes[0]);
                })
                .catch(function (error) {
                    console.log(
                        "ERROR Leyendo mensajes usuarios"
                    );
                });
        }

        const readIDMessage = async () => {
            let params = {
                idmensaje: idventa
            }
            await axios({
                method: "post",
                url: URL_BD_MR + "245",
                params,
            })
                .then((res) => {
                    //console.log("RES VENTA : ", res.data.listarmensajes)
                    setVenta(res.data.listarmensajes[0]);
                })
                .catch(function (error) {
                    console.log(
                        "ERROR Leyendo mensajes usuarios"
                    );
                });
        }

        const leerDevoluciones = async () => {
            let params = {
                idmensaje: idventa
            }
            await axios({
                method: "post",
                url: URL_BD_MR + "243",
                params,
            })
                .then((res) => {
                    //console.log("RES VENTA : ", res.data.listardevoluciones)
                    setVenta(res.data.listardevoluciones[0]);
                })
                .catch(function (error) {
                    console.log(
                        "ERROR Leyendo mensajes usuarios"
                    );
                });
        }

        if (redirect == 7)
            readIDMessage();
        else
            if (redirect == 5 || redirect == 6)
                leerDevoluciones();
            else
                if (redirect == 3 || redirect == 4)
                    leerMensaje();
                else
                    leerVenta();

    }, [idventa])

    //const [agregarCarrito, setagregarCarrito] = useState(false);

    const onCloseModalMedioToken = () => {
        setShowModalMedio(false);
    };

    const onCloseModalVerificar = () => {
        setShowModalVerificar(!showModalVerificar);
    };

    const onCloseModalPropietario = () => {
        setShowModalPropietarioCuenta(!showModalPropietarioCuenta);
    };

    function confirmarCrearCuenta() {
        let dispositivo = JSON.parse(localStorage.getItem("dispositivo"));
        //alert("entre")
        //console.log("DATXX : ", dispositivo)

        let mensaje = "Fecha y hora en que se inicio la sesión:  : " + fechaactual + ", " + dispositivo + " " +
            "Si no fuiste tu, por favor contactanos de manera inmediata";

        const dataCreaUsr = {
            "remitente": formData.email,
            "asunto": "¡NUEVO INICIO DE SESION DESDE TU CUENTA!",
            "plantilla": "info",
            "to": "Mercado Repuesto",
            "contenido_html": {
                "title": "Revisa los detalles a continuación para confirmar que fuiste tu",
                "subtitle": "Información del dispositivo, y lugar de conexión",
                "body": mensaje,
                "tipo": "01"
            }
        };

        //console.log("DATAUSER : ", dataCreaUsr)
        //return

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

    const login = async () => {

        let uidUsuario = null;
        console.log("    : ", formData.email, " - ", formData.password)
        const auth = getAuth(firebase);
        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("ACCESO OK : ", userCredential.user.metadata.createdAt);
                uidUsuario = userCredential.user.metadata.createdAt;
                
                if (ctlredirigir && ctlredirigir != uidUsuario) {
                    setShowModalMensajes(true);
                    setTituloMensajes("Iniciar sesión");
                    setTextoMensajes(
                        "Usuario no autorizado para realizar esta consulta11111!"
                    );
                    return;
                }
                validarDatosUsuario(uidUsuario);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("ACCESO ERROR : ", errorCode);
                setShowModalMensajes(true);
                setTituloMensajes("Iniciar sesión");
                setTextoMensajes(
                    "Datos de inicio de sesión incorrectos.!"
                );
                return;
            });

        const validarDatosUsuario = async (uidUsuario) => {

            if (ctlredirigir == uidUsuario) {

                //Consulta en la BD de MR para ver si el email esta asociado a una cuenta
                if (!formData.email || !formData.password) {
                    setShowModalMensajes(true);
                    setTituloMensajes("Iniciar sesión");
                    setTextoMensajes(
                        "Heey, Recuerda debes ingresar usuario y contraseña!"
                    );
                    return;
                }

                setFormError({});
                let errors = {};
                let formOk = true;

                if (!validateEmail(formData.email)) {
                    errors.email = true;
                    formOk = false;
                }
                if (formData.password.length < 6) {
                    errors.password = true;
                    formOk = false;
                }
                setFormError(errors);

                const emailusuario = {
                    email: formData.email,
                };
                //console.log("EMAIL : ", emailusuario)
                //Consulta en la BD de MR para ver si el email esta asociado a una cuenta
                const respuestauser = await ReadUserEmail.getReadUsersEmail(
                    emailusuario
                );

                const auth = getAuth(firebase);
                signInWithEmailAndPassword(auth, formData.email, formData.password)
                    .then((userCredential) => {
                        //alert("ENTRE")
                        confirmarCrearCuenta();
                        const user = userCredential.user;
                        // Lee los datos del usuario para validar si ya esta Activo
                        const dat = {
                            usuario: user.metadata.createdAt,
                        };
                        //console.log("ACCESO OK");
                        //.push("/");
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setLoading(false);
                        setShowModalMensajes(true);
                        setTituloMensajes("Control de acceso");
                        setTextoMensajes(
                            "El correo y/o la contraseña ingresada no corresponde, para cambiar, dar click en olvidaste contraseña!"
                        );
                        //router.push("/");
                    });

                //alert(formOk)

                if (formOk) {
                    setLoading(true);

                    const auth = getAuth(firebase);
                    signInWithEmailAndPassword(auth, formData.email, formData.password)
                        .then((userCredential) => {
                            //alert("ENTRE")

                            const user = userCredential.user;
                            // Lee los datos del usuario para validar si ya esta aActivo
                            const dat = {
                                usuario: user.metadata.createdAt,
                            };

                            setIdUid(user.metadata.createdAt);
                            //alert(user.metadata.createdAt)

                            const leeDatosUsuario = async () => {
                                let datprd = [];
                                localStorage.setItem(
                                    "duplicarprd",
                                    JSON.stringify(datprd)
                                );
                                localStorage.setItem(
                                    "vehproductos",
                                    JSON.stringify(datprd)
                                );
                                dispatch(getDuplicarPrd(0));

                                const DatosUsuario = await Users.getUsers(dat);

                                //console.log("DATOS USER : ", DatosUsuario);

                                if (DatosUsuario.length > 0) {
                                    setUsuario(DatosUsuario);


                                    let item = {
                                        login: false,
                                    };

                                    if (redirect == 15) {
                                        //router.push("/MisVentas/misVentas");
                                        if (ctlredirigir != dat.usuario) {
                                            setShowModalMensajesCtlr(true);
                                            setTituloMensajesCtlr("Iniciar sesión");
                                            setTextoMensajesCtlr(
                                                "Usuario no autorizado para esta consultaXXXXXX!"
                                            );
                                            const auth = getAuth(firebase);
                                            signOut(auth).then(() => {
                                                // Sign-out successful.
                                                //router.push("/");
                                                console.log("Sesión Cerrada")
                                            }).catch((error) => {
                                                // An error happened.
                                                console.log("Error Cerrando Sesión")
                                            });
                                            return;
                                            //AQUI
                                        }

                                        router.push(
                                            {
                                                pathname:
                                                    "/MiBilletera/RedigirMiBilletera",
                                                query: {
                                                    venta: JSON.stringify(venta),
                                                    ctlredirigir: JSON.stringify(ctlredirigir),
                                                    uidusuario: JSON.stringify(uidusuario),
                                                    idinterno: JSON.stringify(ctlredirigir),
                                                },
                                            }
                                        )
                                    } else
                                        if (redirect == 1) {
                                            //router.push("/MisVentas/misVentas");
                                            router.push(
                                                {
                                                    pathname:
                                                        "./MisVentas/verVenta",
                                                    query: {
                                                        venta: JSON.stringify(
                                                            venta
                                                        ),
                                                    },
                                                }
                                            )
                                            //usuariologueado();
                                        } else

                                            if (redirect == 2) {
                                                //router.push("/MisVentas/misVentas");
                                                router.push(
                                                    {
                                                        pathname:
                                                            "./MisCompras/verCompra",
                                                        query: {
                                                            producto: JSON.stringify(
                                                                venta
                                                            ),
                                                        },
                                                    }
                                                )
                                                //usuariologueado();
                                            } else
                                                if (redirect == 3) {
                                                    //router.push("/MisVentas/misVentas");
                                                    router.push(
                                                        {
                                                            pathname:
                                                                "./MisVentas/msjCompradorRedirigir",
                                                            query: {
                                                                producto: JSON.stringify(
                                                                    venta
                                                                ),
                                                            },
                                                        }
                                                    )

                                                } else
                                                    if (redirect == 4) {
                                                        //router.push("/MisVentas/misVentas");
                                                        router.push(
                                                            {
                                                                pathname:
                                                                    "./MisCompras/msjVendedorRedirigir",
                                                                query: {
                                                                    producto: JSON.stringify(
                                                                        venta
                                                                    ),
                                                                },
                                                            }
                                                        )

                                                    } else
                                                        if (redirect == 5) {
                                                            //router.push("/MisVentas/misVentas");
                                                            router.push(
                                                                {
                                                                    pathname:
                                                                        "./MisCompras/SeguimientoProblemasRedirigir",
                                                                    query: {
                                                                        producto: JSON.stringify(
                                                                            venta
                                                                        ),
                                                                    },
                                                                }
                                                            )

                                                        } else
                                                            if (redirect == 6) {
                                                                //router.push("/MisVentas/misVentas");
                                                                router.push(
                                                                    {
                                                                        pathname:
                                                                            "./MisCompras/SeguimientoProblemasRedirigir",
                                                                        query: {
                                                                            producto: JSON.stringify(
                                                                                venta
                                                                            ),
                                                                        },
                                                                    }
                                                                )

                                                            } else
                                                                if (redirect == 7) {
                                                                    //router.push("/MisVentas/misVentas");
                                                                    router.push(
                                                                        {
                                                                            pathname:
                                                                                "./MisVentas/msjCompradorRedirigir",
                                                                            query: {
                                                                                venta: JSON.stringify(
                                                                                    venta
                                                                                ),
                                                                            },
                                                                        }
                                                                    )

                                                                } else
                                                                    if (ira == 12) {
                                                                        let datitem = JSON.parse(
                                                                            localStorage.getItem(
                                                                                "itemsresolverdudas"
                                                                            )
                                                                        );

                                                                        router.push(datitem.ruta);

                                                                        localStorage.setItem(
                                                                            "itemsresolverdudas",
                                                                            JSON.stringify("Ok")
                                                                        );
                                                                    } else if (ira == 11) {
                                                                        let datitem = JSON.parse(
                                                                            localStorage.getItem(
                                                                                "itemsadddispvinvulados"
                                                                            )
                                                                        );

                                                                        router.push(datitem.ruta);

                                                                        localStorage.setItem(
                                                                            "itemsadddispvinvulados",
                                                                            JSON.stringify("Ok")
                                                                        );
                                                                    }
                                                                    else
                                                                        if (ira == 4) {
                                                                            let datitem = JSON.parse(
                                                                                localStorage.getItem("itemswishlistadd")
                                                                            );

                                                                            const validaPrdListWish = () => {
                                                                                const leerItems = async () => {
                                                                                    let params = {
                                                                                        idproducto: datitem.idproducto,
                                                                                        usuario: DatosUsuario[0].uid,
                                                                                        compatible: datitem.compatible,
                                                                                    };

                                                                                    await axios({
                                                                                        method: "post",
                                                                                        url: URL_BD_MR + "57",
                                                                                        params,
                                                                                    })
                                                                                        .then((res) => {
                                                                                            if (
                                                                                                res.data
                                                                                                    .listaritemdeseos
                                                                                                    .length > 0
                                                                                            ) {
                                                                                                console.log(
                                                                                                    "PRD EXISTE EN Wish List"
                                                                                                );
                                                                                            } else agregarListaDeseo();
                                                                                        })
                                                                                        .catch(function (error) {
                                                                                            console.log(
                                                                                                "ERROR PRD EN Wish List"
                                                                                            );
                                                                                        });
                                                                                };
                                                                                leerItems();
                                                                            };
                                                                            validaPrdListWish();

                                                                            const agregarListaDeseo = () => {
                                                                                const grabarItem = async () => {
                                                                                    let params = {
                                                                                        idproducto: datitem.idproducto,
                                                                                        usuario: DatosUsuario[0].uid,
                                                                                        compatible: datitem.compatible,
                                                                                    };

                                                                                    await axios({
                                                                                        method: "post",
                                                                                        url: URL_BD_MR + "53",
                                                                                        params,
                                                                                    })
                                                                                        .then((res) => {

                                                                                            const grabarItemhistorial = async () => {
                                                                                                let params = {
                                                                                                    idproducto: datitem.idproducto,
                                                                                                    usuario: DatosUsuario[0].uid,
                                                                                                    compatible: datitem.compatible,
                                                                                                };

                                                                                                await axios({
                                                                                                    method: "post",
                                                                                                    url: URL_BD_MR + "531",
                                                                                                    params,
                                                                                                })
                                                                                                    .then((res) => {
                                                                                                        console.log("HISTORIAL LISTA DESEOS ", OK);
                                                                                                    })
                                                                                                    .catch(function (error) {
                                                                                                        console.log("ERROR HISTORIAL LISTA DESEOS");
                                                                                                    });
                                                                                            };
                                                                                            grabarItemhistorial();

                                                                                            router.push(
                                                                                                datitem.ruta +
                                                                                                datitem.idproducto
                                                                                            );

                                                                                            localStorage.setItem(
                                                                                                "itemswishlistadd",
                                                                                                JSON.stringify("Ok")
                                                                                            );
                                                                                        })
                                                                                        .catch(function (error) {
                                                                                            console.log(
                                                                                                "Error leyendo preguntas al vendedor"
                                                                                            );
                                                                                        });
                                                                                };
                                                                                grabarItem();
                                                                            };
                                                                        } else if (ira == 6) {
                                                                            localStorage.setItem(
                                                                                "activargrilla",
                                                                                JSON.stringify(3)
                                                                            );
                                                                            let datitem = JSON.parse(
                                                                                localStorage.getItem(
                                                                                    "itemshoppingcartadd"
                                                                                )
                                                                            );

                                                                            const controlNumPrdCar = (data) => {
                                                                                let continuar = true;

                                                                                const leerItemsCarrito = async () => {
                                                                                    let params = {
                                                                                        usuario: DatosUsuario[0].uid,
                                                                                    };

                                                                                    await axios({
                                                                                        method: "post",
                                                                                        url: URL_BD_MR + "59",
                                                                                        params,
                                                                                    })
                                                                                        .then((res) => {
                                                                                            if (res.data.type == 1) {
                                                                                                if (
                                                                                                    res.data
                                                                                                        .listarcarritocompra
                                                                                                        .length >= 15
                                                                                                ) {
                                                                                                    continuar = false;
                                                                                                    setShowModalMensajes(
                                                                                                        true
                                                                                                    );
                                                                                                    setTituloMensajes(
                                                                                                        "Carrito de compra"
                                                                                                    );
                                                                                                    let texto =
                                                                                                        "Puedes agregar maximo 15 productos al carrito de compra";
                                                                                                    setTextoMensajes(
                                                                                                        texto
                                                                                                    );
                                                                                                    return;
                                                                                                } else
                                                                                                    grabarItemCarrito();
                                                                                            } else {
                                                                                                continuar = true;
                                                                                                grabarItemCarrito();
                                                                                            }
                                                                                        })
                                                                                        .catch(function (error) {
                                                                                            console.log(
                                                                                                "Error leyendo items carrito de compra"
                                                                                            );
                                                                                        });
                                                                                };
                                                                                leerItemsCarrito();
                                                                            };
                                                                            controlNumPrdCar();

                                                                            const grabarItemCarrito = async () => {
                                                                                let params = {
                                                                                    compatible: datitem.compatible,
                                                                                    idproducto: datitem.idproducto,
                                                                                    usuario: DatosUsuario[0].uid,
                                                                                    cantidad: 1,
                                                                                };

                                                                                await axios({
                                                                                    method: "post",
                                                                                    url: URL_BD_MR + "58",
                                                                                    params,
                                                                                })
                                                                                    .then((res) => {

                                                                                        const grabarItemCarritoHistorial = async () => {
                                                                                            let params = {
                                                                                                compatible: datitem.compatible,
                                                                                                idproducto: datitem.idproducto,
                                                                                                usuario: DatosUsuario[0].uid,
                                                                                                cantidad: 1,
                                                                                            };

                                                                                            await axios({
                                                                                                method: "post",
                                                                                                url: URL_BD_MR + "581",
                                                                                                params,
                                                                                            })
                                                                                                .then((res) => {
                                                                                                    console.log(
                                                                                                        "OK item  add carrito de compra"
                                                                                                    );
                                                                                                })
                                                                                                .catch(function (error) {
                                                                                                    console.log(
                                                                                                        "Error item add carrito de compra"
                                                                                                    );
                                                                                                });
                                                                                        };
                                                                                        grabarItemCarritoHistorial();

                                                                                        let row = [];
                                                                                        let item = {
                                                                                            idproducto:
                                                                                                datitem.idproducto,
                                                                                            nombreimagen1:
                                                                                                datitem.nombreimagen1,
                                                                                            titulonombre:
                                                                                                datitem.titulonombre,
                                                                                            cantidad: 1,
                                                                                        };

                                                                                        dispatch(getAddEdToCart(item));
                                                                                        row.push(item);
                                                                                        dispatch(getAddLogin(row));

                                                                                        localStorage.setItem(
                                                                                            "addedtocart",
                                                                                            JSON.stringify(item)
                                                                                        );
                                                                                    })
                                                                                    .catch(function (error) {
                                                                                        console.log(
                                                                                            "Error leyendo items carrito de compra"
                                                                                        );
                                                                                    });
                                                                            };
                                                                            router.push(datitem.ruta);
                                                                        } else if (ira == 3) {
                                                                            let datitem = JSON.parse(
                                                                                localStorage.getItem(
                                                                                    "itemshoppingcartadd"
                                                                                )
                                                                            );

                                                                            const controlNumPrdCar = (data) => {
                                                                                let continuar = true;

                                                                                const leerItemsCarrito = async () => {
                                                                                    let params = {
                                                                                        usuario: DatosUsuario[0].uid,
                                                                                    };

                                                                                    await axios({
                                                                                        method: "post",
                                                                                        url: URL_BD_MR + "59",
                                                                                        params,
                                                                                    })
                                                                                        .then((res) => {
                                                                                            if (res.data.type == 1) {
                                                                                                if (
                                                                                                    res.data
                                                                                                        .listarcarritocompra
                                                                                                        .length >= 15
                                                                                                ) {
                                                                                                    continuar = false;
                                                                                                    setShowModalMensajes(
                                                                                                        true
                                                                                                    );
                                                                                                    setTituloMensajes(
                                                                                                        "Carrito de compra"
                                                                                                    );
                                                                                                    let texto =
                                                                                                        "Puedes agregar maximo 15 productos al carrito de compra";
                                                                                                    setTextoMensajes(
                                                                                                        texto
                                                                                                    );
                                                                                                    return;
                                                                                                } else
                                                                                                    grabarItemCarrito();
                                                                                            } else {
                                                                                                continuar = true;
                                                                                                grabarItemCarrito();
                                                                                            }
                                                                                        })
                                                                                        .catch(function (error) {
                                                                                            console.log(
                                                                                                "Error leyendo items carrito de compra"
                                                                                            );
                                                                                        });
                                                                                };
                                                                                leerItemsCarrito();
                                                                            };
                                                                            controlNumPrdCar();

                                                                            const grabarItemCarrito = async () => {
                                                                                let params = {
                                                                                    compatible: datitem.compatible,
                                                                                    idproducto: datitem.idproducto,
                                                                                    usuario: DatosUsuario[0].uid,
                                                                                    cantidad: 1,
                                                                                };

                                                                                await axios({
                                                                                    method: "post",
                                                                                    url: URL_BD_MR + "58",
                                                                                    params,
                                                                                })
                                                                                    .then((res) => {

                                                                                        const grabarItemCarritoHistorial = async () => {
                                                                                            let params = {
                                                                                                compatible: datitem.compatible,
                                                                                                idproducto: datitem.idproducto,
                                                                                                usuario: DatosUsuario[0].uid,
                                                                                                cantidad: 1,
                                                                                            };

                                                                                            await axios({
                                                                                                method: "post",
                                                                                                url: URL_BD_MR + "581",
                                                                                                params,
                                                                                            })
                                                                                                .then((res) => {
                                                                                                    console.log(
                                                                                                        "OK item  add carrito de compra"
                                                                                                    );
                                                                                                })
                                                                                                .catch(function (error) {
                                                                                                    console.log(
                                                                                                        "Error item add carrito de compra"
                                                                                                    );
                                                                                                });
                                                                                        };
                                                                                        grabarItemCarritoHistorial();

                                                                                        let row = [];
                                                                                        let item = {
                                                                                            idproducto:
                                                                                                datitem.idproducto,
                                                                                            nombreimagen1:
                                                                                                datitem.nombreimagen1,
                                                                                            titulonombre:
                                                                                                datitem.titulonombre,
                                                                                            cantidad: 1,
                                                                                        };
                                                                                        dispatch(getAddEdToCart(item));
                                                                                        localStorage.setItem(
                                                                                            "aadditemcar",
                                                                                            JSON.stringify(true)
                                                                                        );
                                                                                        row.push(item);
                                                                                        dispatch(getAddLogin(row));
                                                                                        localStorage.setItem(
                                                                                            "addedtocart",
                                                                                            JSON.stringify(item)
                                                                                        );
                                                                                    })
                                                                                    .catch(function (error) {
                                                                                        console.log(
                                                                                            "Error leyendo items carrito de compra"
                                                                                        );
                                                                                    });
                                                                            };

                                                                            if (datitem.valida == 0)
                                                                                router.push(datitem.ruta);
                                                                            else
                                                                                router.push(
                                                                                    datitem.ruta + datitem.idproducto
                                                                                );
                                                                        } else if (ira == 2) {
                                                                            let datitem = JSON.parse(
                                                                                localStorage.getItem(
                                                                                    "itemshoppingcartadd"
                                                                                )
                                                                            );
                                                                            if (datitem) {
                                                                                router.push(
                                                                                    datitem.ruta + datitem.idproducto
                                                                                );
                                                                            } else {
                                                                                router.push("/");
                                                                            }
                                                                        } else if (ira == 7) {
                                                                            let rutaira = JSON.parse(
                                                                                localStorage.getItem("rutaira")
                                                                            );
                                                                            router.push(rutaira);
                                                                        } else if (ira == 8) {
                                                                            let prdira = JSON.parse(
                                                                                localStorage.getItem("prdira")
                                                                            );
                                                                            let ruta = "/product/" + prdira;
                                                                            router.push(ruta);
                                                                        } else if (ira == 10) {
                                                                            let rutaira = JSON.parse(
                                                                                localStorage.getItem("rutaira")
                                                                            );
                                                                            router.push(rutaira);
                                                                        } else if (ira == 13) {
                                                                            let rutaira = JSON.parse(
                                                                                localStorage.getItem("rutaira")
                                                                            );
                                                                            router.push(rutaira);
                                                                        } else {
                                                                            localStorage.setItem(
                                                                                "loginvender",
                                                                                JSON.stringify(item)
                                                                            );
                                                                            //router.push("/CreateProduct/createproduct");
                                                                            router.push("/");
                                                                        }

                                }
                            };
                            leeDatosUsuario();

                            setLoading(false);
                            //console.log("ACCESO OK");
                            //.push("/");
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            setLoading(false);
                            setShowModalMensajes(true);
                            setTituloMensajes("Control de acceso");
                            setTextoMensajes(
                                "El correo y/o la contraseña ingresada no corresponde, para cambiar, dar click en olvidaste contraseña!"
                            );
                            //router.push("/");
                        });
                }
            } else {
                let loginvender = JSON.parse(localStorage.getItem("loginvender"));
                localStorage.setItem("placeholdersearch", JSON.stringify(""));
                let ira = JSON.parse(localStorage.getItem("ira"));
                //console.log("LOGIN : ", formData.email);

                //Consulta en la BD de MR para ver si el email esta asociado a una cuenta
                if (!formData.email || !formData.password) {
                    setShowModalMensajes(true);
                    setTituloMensajes("Iniciar sesión");
                    setTextoMensajes(
                        "Heey, Recuerda debes ingresar usuario y contraseña!"
                    );
                    return;
                }

                setFormError({});
                let errors = {};
                let formOk = true;

                if (!validateEmail(formData.email)) {
                    errors.email = true;
                    formOk = false;
                }
                if (formData.password.length < 6) {
                    errors.password = true;
                    formOk = false;
                }
                setFormError(errors);

                const emailusuario = {
                    email: formData.email,
                };
                //console.log("EMAIL : ", emailusuario)
                //Consulta en la BD de MR para ver si el email esta asociado a una cuenta
                const respuestauser = await ReadUserEmail.getReadUsersEmail(
                    emailusuario
                );

                const auth = getAuth(firebase);
                signInWithEmailAndPassword(auth, formData.email, formData.password)
                    .then((userCredential) => {
                        //alert("ENTRE")
                        confirmarCrearCuenta();
                        const user = userCredential.user;
                        // Lee los datos del usuario para validar si ya esta aActivo
                        const dat = {
                            usuario: user.metadata.createdAt,
                        };
                        //console.log("ACCESO OK");
                        //.push("/");
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setLoading(false);
                        setShowModalMensajes(true);
                        setTituloMensajes("Control de acceso");
                        setTextoMensajes(
                            "El correo y/o la contraseña ingresada no corresponde, para cambiar, dar click en olvidaste contraseña!"
                        );
                        //router.push("/");
                    });

                if (respuestauser.length > 0) {
                    //console.log("TOKEN11 : ", respuestauser)
                    setCodigoToken(respuestauser[0].token);
                    if (respuestauser[0].activo === "30") {
                        setShowModalMensajesSoyNuevo(true);
                        setTituloMensajesSoyNuevo(
                            "Tienes una cuenta, pero esta bloqueada, comunicate con la administración de MR"
                        );
                        let texto = "";
                        setTextoMensajesSoyNuevo(texto);
                        return;
                    } else {
                        if (respuestauser[0].activo === "R") {
                            setShowModalMensajes(true);
                            setTituloMensajes("Iniciar sesión");
                            setTextoMensajes(
                                "Estamos revisando tus documentos para habilitar tu usuario!"
                            );
                            return;
                        }
                    }
                } else {
                    /*
                    setShowModalMensajesSoyNuevo(true);
                    setTituloMensajesSoyNuevo("Aún no eres parte de la comunidad MR");
                    let texto = "";
                    setTextoMensajesSoyNuevo(texto);
                    */
                    setShowModalMensajes(true);
                    setTituloMensajes("Iniciar sesión");
                    setTextoMensajes(
                        "Los datos ingresados para correo y contraseña no son validos!"
                    );
                    return;
                }

                if (formOk) {
                    setLoading(true);

                    const auth = getAuth(firebase);
                    signInWithEmailAndPassword(auth, formData.email, formData.password)
                        .then((userCredential) => {
                            //alert("ENTRE")

                            const user = userCredential.user;
                            // Lee los datos del usuario para validar si ya esta aActivo
                            const dat = {
                                usuario: user.metadata.createdAt,
                            };

                            setIdUid(user.metadata.createdAt);
                            //alert(user.metadata.createdAt)

                            const leeDatosUsuario = async () => {
                                let datprd = [];
                                localStorage.setItem(
                                    "duplicarprd",
                                    JSON.stringify(datprd)
                                );
                                localStorage.setItem(
                                    "vehproductos",
                                    JSON.stringify(datprd)
                                );
                                dispatch(getDuplicarPrd(0));

                                const DatosUsuario = await Users.getUsers(dat);

                                //console.log("DATOS USER : ", DatosUsuario);

                                if (DatosUsuario.length > 0) {
                                    setUsuario(DatosUsuario);

                                    if (DatosUsuario[0].activo === 350) {
                                        //setShowModal(true);
                                        setShowModalMensajes(true);
                                        setTituloMensajes("Iniciar sesión");
                                        setTextoMensajes(
                                            "Tu usuario esta inactivo, debes comunicarte con la administración de MR!"
                                        );
                                        //return;
                                        //router.push("/loginaccount");
                                    } else if (loginvender.login) {

                                        //alert(redirect)
                                        //alert(ira)

                                        let item = {
                                            login: false,
                                        };

                                        if (redirect == 15) {
                                            //router.push("/MisVentas/misVentas");
                                            if (ctlredirigir != dat.usuario) {
                                                setShowModalMensajesCtlr(true);
                                                setTituloMensajesCtlr("Iniciar sesión");
                                                setTextoMensajesCtlr(
                                                    "Usuario no autorizado para esta consultaVVVVV!"
                                                );
                                                const auth = getAuth(firebase);
                                                signOut(auth).then(() => {
                                                    // Sign-out successful.
                                                    //router.push("/");
                                                    console.log("Sesión Cerrada")
                                                }).catch((error) => {
                                                    // An error happened.
                                                    console.log("Error Cerrando Sesión")
                                                });
                                                return;
                                                //AQUI
                                            }

                                            router.push(
                                                {
                                                    pathname:
                                                        "/MiBilletera/RedigirMiBilletera",
                                                    query: {
                                                        venta: JSON.stringify(venta),
                                                        ctlredirigir: JSON.stringify(ctlredirigir),
                                                        uidusuario: JSON.stringify(uidusuario),
                                                        idinterno: JSON.stringify(ctlredirigir),
                                                    },
                                                }
                                            )
                                        } else
                                            if (redirect == 1) {
                                                //router.push("/MisVentas/misVentas");
                                                router.push(
                                                    {
                                                        pathname:
                                                            "./MisVentas/verVenta",
                                                        query: {
                                                            venta: JSON.stringify(
                                                                venta
                                                            ),
                                                        },
                                                    }
                                                )
                                            } else
                                                if (redirect == 2) {
                                                    //router.push("/MisVentas/misVentas");
                                                    router.push(
                                                        {
                                                            pathname:
                                                                "./MisCompras/verCompra",
                                                            query: {
                                                                producto: JSON.stringify(
                                                                    venta
                                                                ),
                                                            },
                                                        }
                                                    )

                                                } else
                                                    if (redirect == 3) {
                                                        //router.push("/MisVentas/misVentas");
                                                        router.push(
                                                            {
                                                                pathname:
                                                                    "./MisVentas/msjCompradorRedirigir",
                                                                query: {
                                                                    producto: JSON.stringify(
                                                                        venta
                                                                    ),
                                                                },
                                                            }
                                                        )

                                                    } else
                                                        if (redirect == 4) {
                                                            //router.push("/MisVentas/misVentas");
                                                            router.push(
                                                                {
                                                                    pathname:
                                                                        "./MisCompras/msjVendedorRedirigir",
                                                                    query: {
                                                                        producto: JSON.stringify(
                                                                            venta
                                                                        ),
                                                                    },
                                                                }
                                                            )

                                                        } else
                                                            if (redirect == 5) {
                                                                //router.push("/MisVentas/misVentas");
                                                                router.push(
                                                                    {
                                                                        pathname:
                                                                            "./MisCompras/SeguimientoProblemasRedirigir",
                                                                        query: {
                                                                            producto: JSON.stringify(
                                                                                venta
                                                                            ),
                                                                        },
                                                                    }
                                                                )

                                                            } else
                                                                if (redirect == 6) {
                                                                    //router.push("/MisVentas/misVentas");
                                                                    router.push(
                                                                        {
                                                                            pathname:
                                                                                "./MisCompras/SeguimientoProblemasRedirigir",
                                                                            query: {
                                                                                producto: JSON.stringify(
                                                                                    venta
                                                                                ),
                                                                            },
                                                                        }
                                                                    )

                                                                } else
                                                                    if (redirect == 7) {
                                                                        //router.push("/MisVentas/misVentas");
                                                                        router.push(
                                                                            {
                                                                                pathname:
                                                                                    "./MisVentas/msjCompradorRedirigir",
                                                                                query: {
                                                                                    venta: JSON.stringify(
                                                                                        venta
                                                                                    ),
                                                                                },
                                                                            }
                                                                        )

                                                                    } else
                                                                        if (ira == 12) {
                                                                            let datitem = JSON.parse(
                                                                                localStorage.getItem(
                                                                                    "itemsresolverdudas"
                                                                                )
                                                                            );

                                                                            router.push(datitem.ruta);

                                                                            localStorage.setItem(
                                                                                "itemsresolverdudas",
                                                                                JSON.stringify("Ok")
                                                                            );
                                                                        } else if (ira == 11) {
                                                                            let datitem = JSON.parse(
                                                                                localStorage.getItem(
                                                                                    "itemsadddispvinvulados"
                                                                                )
                                                                            );

                                                                            router.push(datitem.ruta);

                                                                            localStorage.setItem(
                                                                                "itemsadddispvinvulados",
                                                                                JSON.stringify("Ok")
                                                                            );
                                                                        }
                                                                        else
                                                                            if (ira == 4) {
                                                                                let datitem = JSON.parse(
                                                                                    localStorage.getItem("itemswishlistadd")
                                                                                );

                                                                                const validaPrdListWish = () => {
                                                                                    const leerItems = async () => {
                                                                                        let params = {
                                                                                            idproducto: datitem.idproducto,
                                                                                            usuario: DatosUsuario[0].uid,
                                                                                            compatible: datitem.compatible,
                                                                                        };

                                                                                        await axios({
                                                                                            method: "post",
                                                                                            url: URL_BD_MR + "57",
                                                                                            params,
                                                                                        })
                                                                                            .then((res) => {
                                                                                                if (
                                                                                                    res.data
                                                                                                        .listaritemdeseos
                                                                                                        .length > 0
                                                                                                ) {
                                                                                                    console.log(
                                                                                                        "PRD EXISTE EN Wish List"
                                                                                                    );
                                                                                                } else agregarListaDeseo();
                                                                                            })
                                                                                            .catch(function (error) {
                                                                                                console.log(
                                                                                                    "ERROR PRD EN Wish List"
                                                                                                );
                                                                                            });
                                                                                    };
                                                                                    leerItems();
                                                                                };
                                                                                validaPrdListWish();

                                                                                const agregarListaDeseo = () => {
                                                                                    const grabarItem = async () => {
                                                                                        let params = {
                                                                                            idproducto: datitem.idproducto,
                                                                                            usuario: DatosUsuario[0].uid,
                                                                                            compatible: datitem.compatible,
                                                                                        };

                                                                                        await axios({
                                                                                            method: "post",
                                                                                            url: URL_BD_MR + "53",
                                                                                            params,
                                                                                        })
                                                                                            .then((res) => {

                                                                                                const grabarItemhistorial = async () => {
                                                                                                    let params = {
                                                                                                        idproducto: datitem.idproducto,
                                                                                                        usuario: DatosUsuario[0].uid,
                                                                                                        compatible: datitem.compatible,
                                                                                                    };

                                                                                                    await axios({
                                                                                                        method: "post",
                                                                                                        url: URL_BD_MR + "531",
                                                                                                        params,
                                                                                                    })
                                                                                                        .then((res) => {
                                                                                                            console.log("HISTORIAL LISTA DESEOS ", OK);
                                                                                                        })
                                                                                                        .catch(function (error) {
                                                                                                            console.log("ERROR HISTORIAL LISTA DESEOS");
                                                                                                        });
                                                                                                };
                                                                                                grabarItemhistorial();

                                                                                                router.push(
                                                                                                    datitem.ruta +
                                                                                                    datitem.idproducto
                                                                                                );

                                                                                                localStorage.setItem(
                                                                                                    "itemswishlistadd",
                                                                                                    JSON.stringify("Ok")
                                                                                                );
                                                                                            })
                                                                                            .catch(function (error) {
                                                                                                console.log(
                                                                                                    "Error leyendo preguntas al vendedor"
                                                                                                );
                                                                                            });
                                                                                    };
                                                                                    grabarItem();
                                                                                };
                                                                            } else if (ira == 6) {
                                                                                localStorage.setItem(
                                                                                    "activargrilla",
                                                                                    JSON.stringify(3)
                                                                                );
                                                                                let datitem = JSON.parse(
                                                                                    localStorage.getItem(
                                                                                        "itemshoppingcartadd"
                                                                                    )
                                                                                );

                                                                                const controlNumPrdCar = (data) => {
                                                                                    let continuar = true;

                                                                                    const leerItemsCarrito = async () => {
                                                                                        let params = {
                                                                                            usuario: DatosUsuario[0].uid,
                                                                                        };

                                                                                        await axios({
                                                                                            method: "post",
                                                                                            url: URL_BD_MR + "59",
                                                                                            params,
                                                                                        })
                                                                                            .then((res) => {
                                                                                                if (res.data.type == 1) {
                                                                                                    if (
                                                                                                        res.data
                                                                                                            .listarcarritocompra
                                                                                                            .length >= 15
                                                                                                    ) {
                                                                                                        continuar = false;
                                                                                                        setShowModalMensajes(
                                                                                                            true
                                                                                                        );
                                                                                                        setTituloMensajes(
                                                                                                            "Carrito de compra"
                                                                                                        );
                                                                                                        let texto =
                                                                                                            "Puedes agregar maximo 15 productos al carrito de compra";
                                                                                                        setTextoMensajes(
                                                                                                            texto
                                                                                                        );
                                                                                                        return;
                                                                                                    } else
                                                                                                        grabarItemCarrito();
                                                                                                } else {
                                                                                                    continuar = true;
                                                                                                    grabarItemCarrito();
                                                                                                }
                                                                                            })
                                                                                            .catch(function (error) {
                                                                                                console.log(
                                                                                                    "Error leyendo items carrito de compra"
                                                                                                );
                                                                                            });
                                                                                    };
                                                                                    leerItemsCarrito();
                                                                                };
                                                                                controlNumPrdCar();

                                                                                const grabarItemCarrito = async () => {
                                                                                    let params = {
                                                                                        compatible: datitem.compatible,
                                                                                        idproducto: datitem.idproducto,
                                                                                        usuario: DatosUsuario[0].uid,
                                                                                        cantidad: 1,
                                                                                    };

                                                                                    await axios({
                                                                                        method: "post",
                                                                                        url: URL_BD_MR + "58",
                                                                                        params,
                                                                                    })
                                                                                        .then((res) => {

                                                                                            const grabarItemCarritoHistorial = async () => {
                                                                                                let params = {
                                                                                                    compatible: datitem.compatible,
                                                                                                    idproducto: datitem.idproducto,
                                                                                                    usuario: DatosUsuario[0].uid,
                                                                                                    cantidad: 1,
                                                                                                };

                                                                                                await axios({
                                                                                                    method: "post",
                                                                                                    url: URL_BD_MR + "581",
                                                                                                    params,
                                                                                                })
                                                                                                    .then((res) => {
                                                                                                        console.log(
                                                                                                            "OK item  add carrito de compra"
                                                                                                        );
                                                                                                    })
                                                                                                    .catch(function (error) {
                                                                                                        console.log(
                                                                                                            "Error item add carrito de compra"
                                                                                                        );
                                                                                                    });
                                                                                            };
                                                                                            grabarItemCarritoHistorial();

                                                                                            let row = [];
                                                                                            let item = {
                                                                                                idproducto:
                                                                                                    datitem.idproducto,
                                                                                                nombreimagen1:
                                                                                                    datitem.nombreimagen1,
                                                                                                titulonombre:
                                                                                                    datitem.titulonombre,
                                                                                                cantidad: 1,
                                                                                            };

                                                                                            dispatch(getAddEdToCart(item));
                                                                                            row.push(item);
                                                                                            dispatch(getAddLogin(row));

                                                                                            localStorage.setItem(
                                                                                                "addedtocart",
                                                                                                JSON.stringify(item)
                                                                                            );
                                                                                        })
                                                                                        .catch(function (error) {
                                                                                            console.log(
                                                                                                "Error leyendo items carrito de compra"
                                                                                            );
                                                                                        });
                                                                                };
                                                                                router.push(datitem.ruta);
                                                                            } else if (ira == 3) {
                                                                                let datitem = JSON.parse(
                                                                                    localStorage.getItem(
                                                                                        "itemshoppingcartadd"
                                                                                    )
                                                                                );

                                                                                const controlNumPrdCar = (data) => {
                                                                                    let continuar = true;

                                                                                    const leerItemsCarrito = async () => {
                                                                                        let params = {
                                                                                            usuario: DatosUsuario[0].uid,
                                                                                        };

                                                                                        await axios({
                                                                                            method: "post",
                                                                                            url: URL_BD_MR + "59",
                                                                                            params,
                                                                                        })
                                                                                            .then((res) => {
                                                                                                if (res.data.type == 1) {
                                                                                                    if (
                                                                                                        res.data
                                                                                                            .listarcarritocompra
                                                                                                            .length >= 15
                                                                                                    ) {
                                                                                                        continuar = false;
                                                                                                        setShowModalMensajes(
                                                                                                            true
                                                                                                        );
                                                                                                        setTituloMensajes(
                                                                                                            "Carrito de compra"
                                                                                                        );
                                                                                                        let texto =
                                                                                                            "Puedes agregar maximo 15 productos al carrito de compra";
                                                                                                        setTextoMensajes(
                                                                                                            texto
                                                                                                        );
                                                                                                        return;
                                                                                                    } else
                                                                                                        grabarItemCarrito();
                                                                                                } else {
                                                                                                    continuar = true;
                                                                                                    grabarItemCarrito();
                                                                                                }
                                                                                            })
                                                                                            .catch(function (error) {
                                                                                                console.log(
                                                                                                    "Error leyendo items carrito de compra"
                                                                                                );
                                                                                            });
                                                                                    };
                                                                                    leerItemsCarrito();
                                                                                };
                                                                                controlNumPrdCar();

                                                                                const grabarItemCarrito = async () => {
                                                                                    let params = {
                                                                                        compatible: datitem.compatible,
                                                                                        idproducto: datitem.idproducto,
                                                                                        usuario: DatosUsuario[0].uid,
                                                                                        cantidad: 1,
                                                                                    };

                                                                                    await axios({
                                                                                        method: "post",
                                                                                        url: URL_BD_MR + "58",
                                                                                        params,
                                                                                    })
                                                                                        .then((res) => {

                                                                                            const grabarItemCarritoHistorial = async () => {
                                                                                                let params = {
                                                                                                    compatible: datitem.compatible,
                                                                                                    idproducto: datitem.idproducto,
                                                                                                    usuario: DatosUsuario[0].uid,
                                                                                                    cantidad: 1,
                                                                                                };

                                                                                                await axios({
                                                                                                    method: "post",
                                                                                                    url: URL_BD_MR + "581",
                                                                                                    params,
                                                                                                })
                                                                                                    .then((res) => {
                                                                                                        console.log(
                                                                                                            "OK item  add carrito de compra"
                                                                                                        );
                                                                                                    })
                                                                                                    .catch(function (error) {
                                                                                                        console.log(
                                                                                                            "Error item add carrito de compra"
                                                                                                        );
                                                                                                    });
                                                                                            };
                                                                                            grabarItemCarritoHistorial();

                                                                                            let row = [];
                                                                                            let item = {
                                                                                                idproducto:
                                                                                                    datitem.idproducto,
                                                                                                nombreimagen1:
                                                                                                    datitem.nombreimagen1,
                                                                                                titulonombre:
                                                                                                    datitem.titulonombre,
                                                                                                cantidad: 1,
                                                                                            };
                                                                                            dispatch(getAddEdToCart(item));
                                                                                            localStorage.setItem(
                                                                                                "aadditemcar",
                                                                                                JSON.stringify(true)
                                                                                            );
                                                                                            row.push(item);
                                                                                            dispatch(getAddLogin(row));
                                                                                            localStorage.setItem(
                                                                                                "addedtocart",
                                                                                                JSON.stringify(item)
                                                                                            );
                                                                                        })
                                                                                        .catch(function (error) {
                                                                                            console.log(
                                                                                                "Error leyendo items carrito de compra"
                                                                                            );
                                                                                        });
                                                                                };

                                                                                if (datitem.valida == 0)
                                                                                    router.push(datitem.ruta);
                                                                                else
                                                                                    router.push(
                                                                                        datitem.ruta + datitem.idproducto
                                                                                    );
                                                                            } else if (ira == 2) {
                                                                                let datitem = JSON.parse(
                                                                                    localStorage.getItem(
                                                                                        "itemshoppingcartadd"
                                                                                    )
                                                                                );
                                                                                if (datitem) {
                                                                                    router.push(
                                                                                        datitem.ruta + datitem.idproducto
                                                                                    );
                                                                                } else {
                                                                                    router.push("/");
                                                                                }
                                                                            } else if (ira == 7) {
                                                                                let rutaira = JSON.parse(
                                                                                    localStorage.getItem("rutaira")
                                                                                );
                                                                                router.push(rutaira);
                                                                            } else if (ira == 8) {
                                                                                let prdira = JSON.parse(
                                                                                    localStorage.getItem("prdira")
                                                                                );
                                                                                let ruta = "/product/" + prdira;
                                                                                router.push(ruta);
                                                                            } else if (ira == 10) {
                                                                                let rutaira = JSON.parse(
                                                                                    localStorage.getItem("rutaira")
                                                                                );
                                                                                router.push(rutaira);
                                                                            } else if (ira == 13) {
                                                                                let rutaira = JSON.parse(
                                                                                    localStorage.getItem("rutaira")
                                                                                );
                                                                                router.push(rutaira);
                                                                            } else {
                                                                                localStorage.setItem(
                                                                                    "loginvender",
                                                                                    JSON.stringify(item)
                                                                                );
                                                                                //router.push("/CreateProduct/createproduct");
                                                                                router.push("/");
                                                                            }
                                    } else {
                                        router.push("/");
                                    }
                                }
                            };
                            leeDatosUsuario();

                            setLoading(false);
                            //console.log("ACCESO OK");
                            //.push("/");
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            setLoading(false);
                            setShowModalMensajes(true);
                            setTituloMensajes("Control de acceso");
                            setTextoMensajes(
                                "El correo y/o la contraseña ingresada no corresponde, para cambiar, dar click en olvidaste contraseña!"
                            );
                            //router.push("/");
                        });
                }
                //datosusuarios = useSelector((state) => state.userlogged.userlogged);
            }
        }
    };

    async function usuariologueado() {
        //Valida si el Usuario esta logueado en Mercado Repuesto
        const auth = getAuth(firebase);
        //console.log("USUARIO LOGUEADO : ", auth.currentUser);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("USUARIO LOGUEADO : ", user);
                const uid = user.uid;

                const leer = async () => {
                    const dat = {
                        usuario: user.metadata.createdAt,
                    };

                    const DatosUsuario = await Users.getUsers(dat);

                    if (DatosUsuario.length > 0) {


                        setCodigoToken(DatosUsuario[0].token);
                        if (DatosUsuario.length > 0) {
                            setUsuario(DatosUsuario[0]);

                            const Usuario = {
                                uid: user.metadata.createdAt,
                                logged: true,
                                name: DatosUsuario[0].primernombre,
                                usuario: DatosUsuario[0].usuario,
                                lastname:
                                    DatosUsuario[0].primerapellido,
                                idinterno: DatosUsuario[0].id,
                                tipousuario:
                                    DatosUsuario[0].tipousuario,
                                activo: DatosUsuario[0].activo,
                                tipoidentificacion:
                                    DatosUsuario[0]
                                        .tipoidentificacion,
                                identificacion:
                                    DatosUsuario[0].identificacion,
                                razonsocial:
                                    DatosUsuario[0].razonsocial,
                                email: DatosUsuario[0].email,
                                celular: DatosUsuario[0].celular,
                                fechatoken:
                                    DatosUsuario[0].fechatoken,
                            };
                            //console.log("USUARIO LOGUEADO : ",Usuario);
                            localStorage.setItem(
                                "datauser",
                                JSON.stringify(Usuario)
                            );
                            //dispatch(getUserLogged(Usuario));
                            //router.push("/");
                        }
                    } else {

                        const Usuario = {
                            uid: user.metadata.createdAt,
                            logged: true,
                            name: user.displayName,
                            usuario: DatosUsuario[0].usuario,
                            lastname:
                                DatosUsuario[0].primerapellido,
                            idinterno: DatosUsuario[0].id,
                            tipousuario:
                                DatosUsuario[0].tipousuario,
                            activo: DatosUsuario[0].activo,
                            tipoidentificacion:
                                DatosUsuario[0].tipoidentificacion,
                            identificacion:
                                DatosUsuario[0].identificacion,
                            razonsocial:
                                DatosUsuario[0].razonsocial,
                            token: DatosUsuario[0].token,
                            email: DatosUsuario[0].email,
                            celular: DatosUsuario[0].celular,
                            fechatoken: DatosUsuario[0].fechatoken,
                        };
                        dispatch(getUserLogged(Usuario));
                        localStorage.setItem(
                            "datauser",
                            JSON.stringify(null)
                        );
                        localStorage.setItem(
                            "dataUser",
                            JSON.stringify(null)
                        );
                    }
                }

                leer();
            } else {
                console.log("USUARIO NO ESTA LOGUEADO");
              
                const Usuario = {
                    uid: 0,
                    logged: false,
                    name: "",
                    usuario: "",
                    idinterno: 0,
                    activo: "",
                    tipoidentificacion: 0,
                    identificacion: 0,
                    razonsocial: "",
                    token: 0,
                    email: 0,
                    celular: 0,
                    fechatoken: "",
                };
                dispatch(getUserLogged(Usuario));
                localStorage.setItem(
                    "datauser",
                    JSON.stringify(null)
                );
                localStorage.setItem(
                    "dataUser",
                    JSON.stringify(null)
                );
            }
        });
    }


    const signIn = async () => {
        const auth = getAuth(firebase);
        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                //console.log("DATOS USER : ", user);
                // Lee los datos del usuario para validar si ya esta aActivo

                const dat = {
                    usuario: user.metadata.createdAt,
                };

                setIdUid(user.metadata.createdAt);

                const leeDatosUsuario = async () => {
                    const DatosUsuario = await Users.getUsers(dat);
                };
                leeDatosUsuario();

                setLoading(false);
                //console.log("ACCESO OK");
                //.push("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoading(false);
                setShowModalMensajes(true);
                setTituloMensajes("Control de acceso");
                setTextoMensajes(
                    "Error al Intentar la Conexion... Intente mas Tarde!"
                );
            });
    };

    const token = async (medio) => {
        const emailusuario = {
            email: formData.email,
        };

        let telefono = "";

        //Consulta en la BD datos del usuario asociados al Email
        const respuestauser = await ReadUserEmail.getReadUsersEmail(
            emailusuario
        ).then((response) => {
            if (response) {
                telefono = response[0].celular;
                console.log("TELEFONO USER : ", telefono);
            } else {
                console.log("RESPONSE DATA : ", "FALSO");
            }
        });

        async function enviartoken(dat) {
            var caracteres = "012346789";
            var codigoid = "";
            for (var i = 0; i < 6; i++)
                codigoid += caracteres.charAt(
                    Math.floor(Math.random() * caracteres.length)
                );
            let tokenid = codigoid;
            setCodigoToken(tokenid);

            const datosToken = {
                token: tokenid,
                email_cliente: formData.email,
                nro_ws: "3155337803", //telefono,
                medio: dat,
            };

            const TokenUsuario = await TokenRegistroRepository.getTokenRegistro(
                datosToken
            )
                .then(() => {
                    setShowModalMensajes(true);
                    setTituloMensajes("Envio Token");
                    setTextoMensajes(
                        "Listo, hemos enviado la clave al medio seleccionado!"
                    );
                    set(true);
                })
                .catch((error) => {
                    setShowModalMensajes(true);
                    setTituloMensajes("Envio token");
                    setTextoMensajes(
                        "Error enviando token al medio seleccionado!"
                    );
                    setShowModalPropietarioCuenta(false);
                    router.push("/");
                });
        }
        enviartoken(medio);
    };

    const tokenReenviar = async (medio) => {
        async function enviartoken(dat) {
            // Lee Web Service para enviar el token al usuario
            //let cadena = shortid();
            //let tokenid = cadena.substring(0, 6);

            var caracteres = "012346789";
            var codigoid = "";
            for (var i = 0; i < 6; i++)
                codigoid += caracteres.charAt(
                    Math.floor(Math.random() * caracteres.length)
                );
            let tokenid = codigoid;
            let fecha = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            //console.log("ID TOKEN : ", tokenid);
            setCodigoToken(tokenid);

            const datosToken = {
                token: tokenid,
                email_cliente: formData.email,
                nro_ws: "3155337803", //formData.telefono,
                medio: dat,
            };

            const TokenUsuario = await TokenRegistroRepository.getTokenRegistro(
                datosToken
            )
                .then(() => {
                    setShowModalMensajes(true);
                    setTituloMensajes("Reenvio token");
                    setTextoMensajes("Token enviado al medio seleccionado!");

                    const datos = {
                        token: tokenid,
                        id: datosusuarios.uid,
                        fechatoken: fecha,
                    };

                    const actualizatokenusuario = async () => {
                        const updateTokenUsuario =
                            await UpdateTokenRepository.getUpdateToken(datos)
                                .then(() => {
                                    //setShowModal(true);
                                })
                                .catch((error) => {
                                    setShowModalMensajes(true);
                                    setTituloMensajes("Reenvio token");
                                    setTextoMensajes(
                                        "Error reenviando token al medio seleccionado!"
                                    );
                                    setShowModal(false);
                                    router.push("/");
                                });
                    };
                    actualizatokenusuario();
                })
                .catch((error) => {
                    setShowModalMensajes(true);
                    setTituloMensajes("Reenvio token");
                    setTextoMensajes(
                        "Error reenviando token al medio seleccionado!"
                    );
                    setShowModal(false);
                    router.push("/");
                });

            //setCarrocerias(BodiesVehicles);
            // Coloca los datos en state arreglo de modelos de vehiculos segun marca
            //dispatch(getBodiesVehicles(BodiesVehicles));
        }
        enviartoken(medio);
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

    const onChangeValidarToken = (e) => {
        setFormDataValidarToken({
            ...formDataValidarToken,
            [e.target.name]: e.target.value,
        });
    };

    const leeTokenUsuario = async () => {
        const emailusuario = {
            email: formData.email,
        };

        //Consulta en la BD de MR para ver si el email esta asociado a una cuenta
        const datoToken = await ReadUserEmail.getReadUsersEmail(emailusuario);

        const datosusu = {
            idToken: datoToken[0].token,
            uid: datoToken[0].uid,
            fechatoken: datoToken[0].fechatoken,
        };

        validarToken(datosusu);
    };

    const crearCuenta = () => {
        router.push("/my-account");
    };
    const validarToken = (datosusu) => {
        let activartoken = "S";
        let fechaactual = new Date();
        var a = Moment(fechaactual, "YYYY-MM-DD HH:mm:ss");
        var b = Moment(datosusu.fechatoken, "YYYY-MM-DD HH:mm:ss");

        let tiempo = a.diff(b, "minutes");

        if (tiempo > 10) {
            setShowModalMensajes(true);
            setTituloMensajes("Validar token");
            setTextoMensajes(
                "El token esta vencido, supero tiempo limite, vamos a reenviar el token"
            );
            setShowModalMedioReenviar(true);
            activartoken = "N";
        }

        if (formDataToken.token !== datosusu.idToken) {
            setShowModalMensajes(true);
            setTituloMensajes("Validar token");
            setTextoMensajes(
                "El token Ingresado no es valido, vamos a reenviar el token!"
            );
            setShowModal(false);
            setShowModalMedioReenviar(true);
            activartoken = "N";
        }

        if (activartoken === "S") {
            const dat = {
                id: datosusu.uid,
            };

            const activarToken = async () => {
                const respuesta = await ActivateUserRepository.getActivateUser(
                    dat
                ).then((response) => {
                    if (response) {
                        if (response.type === 1) {
                            setShowModalMensajes(true);
                            setTituloMensajes("Mercado Repuesto");
                            setTextoMensajes(
                                "Ya puedes disfrutar de una experiencia diferente MR!"
                            );
                            setShowModal(false);
                            router.push("/");
                        } else {
                            setShowModalMensajes(true);
                            setTituloMensajes("Mercado Repuesto");
                            setTextoMensajes(
                                "Algo salio mal, si deseas puedes reenviar tu token de activación!"
                            );
                            router.push("/");
                        }
                    } else {
                        console.log("ENVIAR TOKEN : ", response);
                        //return null;
                    }
                });
            };
            activarToken();
        }
    };

    const validarPropietarioCuenta = () => {
        if (codigoToken != formDataValidarToken.tokenvalidar) {
            setShowModalMensajes(true);
            setTituloMensajes("Mercado Repuesto");
            setTextoMensajes(
                "Por favor, revisa el codigo ingresado, no corresponde!"
            );
            return;
        }

        let respuesta = "0";

        if (formDataValidarToken.tokenvalidar !== codigoToken) {
            setShowModalMensajes(true);
            setTituloMensajes("Validar token");
            setTextoMensajes(
                "El token Ingresado no es valido, debes validar la información!"
            );
            setShowModalPropietarioCuenta(false);
            router.push("/");
        } else {
            const auth = getAuth();
            sendPasswordResetEmail(auth, formData.email)
                .then(() => {
                    setShowModalMensajes(true);
                    setTituloMensajes("Recuperar contraseña");
                    setTextoMensajes(
                        "Hemos enviado un enlace a tu cuenta de correo para recuperar la contraseña!"
                    );
                    onCloseModalPropietario();
                })
                .catch((error) => {
                    setShowModalMensajes(true);
                    setTituloMensajes("Recuperar contraseña");
                    setTextoMensajes(
                        "Intentalo nuevamente, el proceso de recuperación de contraseña a fallado!"
                    );
                    onCloseModalPropietario();
                });
        }
    };

    const tokenmensajetexto = () => {
        let medio = "sms";
        setMedioSeleccionado("sms");
        setShowModalMedio(false);
        token(medio);
    };

    const tokenemail = () => {
        let medio = "email";
        setMedioSeleccionado("email");
        //setShowModalMedio(false);
        token(medio);
    };

    const llamadatelefonica = () => {
        let medio = "llamada";
        setMedioSeleccionado("llamada");
        setShowModalLlamada(true);
        //token(medio);
    };

    const tokenwhatsapp = () => {
        let medio = "whatsapp";
        setMedioSeleccionado("whatsapp");
        setShowModalMedio(false);
        token(medio);
    };

    const reenvioCodigo = () => {
        tokenReenviar(medioSeleccionado);
    };

    const textoMedioToken = () => {
        if (!formData.email) {
            setShowModalMensajes(true);
            setTituloMensajes("Recuperar contraseña");
            setTextoMensajes("Por favor ingresa el email de recuperación!");
            return;
        }

        const emailusuario = {
            email: formData.email,
        };

        let telefono = "";

        //Consulta en la BD datos del usuario asociados al Email
        const leerTelefono = async () => {
            const respuestauser = await ReadUserEmail.getReadUsersEmail(
                emailusuario
            ).then((response) => {
                if (response) {
                    //console.log("RESPONSE DATA : ", response);
                    telefono = response[0].celular;
                    //console.log("TELEFONO USER : ", telefono);
                    setTelefonoRecupear(telefono);
                    let cortar = telefono.substr(9, 4);
                    setCortarTelefono(cortar);
                    //console.log("CORTAR : ", cortar);
                } else {
                    console.log("RESPONSE DATA : ", "FALSO");
                }
            });
        };
        leerTelefono();

        if (!formData.email) {
            setInputControlEmail("form-controlNuevo ps-form__inputNuevo");
            setShowModalMensajes(true);
            setTituloMensajes("Recuperar contraseña");
            setTextoMensajes("Por favor ingresa el email de recuperación!");
        } else {
            setRecuperar(true);
            setShowModalMedio(true);
        }
    };

    const reenviarToken = () => {
        let medio = "email";
        setShowModalMedioReenviar(false);
        tokenReenviar(medio);
    };

    const pasarmouseverificarotraforma = () => {
        setClassNameverificar("textoverificardeotraformados");
    };

    const pasarmousesms = () => {
        setClassNameSMS("cajaopcionesrecuperarcuentados mb-20");
    };

    const pasarmousewhatsapp = () => {
        setClassNameWhatsapp("cajaopcionesrecuperarcuentados");
    };

    const salirmouseverificarotraforma = () => {
        setClassNameverificar("textoverificardeotraforma");
    };

    const salirmousesms = () => {
        setClassNameSMS("cajaopcionesrecuperarcuenta");
    };

    const salirmousewhatsapp = () => {
        setClassNameWhatsapp("cajaopcionesrecuperarcuenta");
    };

    const mostrarContraseña = () => {
        if (classNamePassword === "password") {
            setClassNamePassword("text");
            setClassNameEye("fa fa-eye toogle-password colorinput  colorbase");
        } else if (classNamePassword === "text") {
            setClassNamePassword("password");
            setClassNameEye(
                "fa fa-eye-slash toogle-password colorinput  colorbase"
            );
        }
    };

    const closeModalOlvidasteContraseña = () => {
        setShowModalMedio(false);
    };

    const resetInputs = () => {
        setInput1("");
        setInput2("");
        setInput3("");
        setInput4("");
        setInput5("");
        setInput6("");
    };

    const handleButtonClickSMS = () => {
        setRecoveryMethod("SMS");
        const code = Math.floor(100000 + Math.random() * 900000);
        setVerificationCode(code);
        //console.log(code);
        setShowModalMedio(false);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleInputChange = (e, setInput) => {
        setInput(e.target.value);
        setIsError(false);
    };

    const sendResetEmail = () => {
        const userCode = input1 + input2 + input3 + input4 + input5 + input6;

        if (Number(userCode) !== verificationCode) {
            setIsError(true);
            resetInputs(); // Limpia los campos de entrada
            return;
        }

        firebase
            .auth()
            .sendPasswordResetEmail(formData.email)
            .then(() => {
                setIsError(false);
                setShowModalMensajes(true);
                setTituloMensajes("Recuperar contraseña");
                setTextoMensajes(
                    "¡Hemos enviado al correo electrónico registrado un link para recuperar tu contraseña, recuerda revisar en spam o correos no deseados!"
                );
                setOpenDialog(false);
                resetInputs();
            })
            .catch((error) => {
                setShowModalMensajes(true);
                setTituloMensajes("Error");
                setTextoMensajes(
                    `Error al enviar el correo electrónico de recuperación: ${error.message}`
                );
            });
    };

    const handleButtonClickWhatsApp = () => {
        setRecoveryMethod("WhatsApp");
        const code = Math.floor(100000 + Math.random() * 900000);
        setVerificationCode(code);
        //console.log(code);
        setShowModalMedio(false);
        setOpenDialog(true);
    };

    const handleButtonClickEmail = () => {
        setRecoveryMethod("Email");
        const code = Math.floor(100000 + Math.random() * 900000);
        setVerificationCode(code);
        //console.log(code);
        setShowModalMedio(false);
        setOpenDialog(true);
        onCloseModalVerificar();
    };

    const handleButtonClickGoogle = () => {
        setRecoveryMethod("Google");
        const code = Math.floor(100000 + Math.random() * 900000);
        setVerificationCode(code);
        //console.log(code);
        setShowModalMedio(false);
        setOpenDialog(true);
        onCloseModalVerificar();
    };

    const handleAlternativeMethod = () => {
        setOpenDialog(false);
        setShowModalVerificar(true);
    };

    return (
        <Container title="Mi Cuenta">
            <div className="ps-page ps-page--inner" id="login">
                <ModalControlAcceso
                    shown={showModalMensajesCtlr}
                    close={setShowModalMensajesCtlr}
                    titulo={tituloMensajesCtlr}
                    mensaje={textoMensajesCtlr}
                    tipo="1"
                />

                <ModalLogin
                    shown={showModalMensajes}
                    close={setShowModalMensajes}
                    titulo={tituloMensajes}
                    mensaje={textoMensajes}
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

                <div className="container">
                    <div className="ps-page__header"></div>

                    <form onChange={onChange}>
                        <div className="LoginNewContainer">
                            <img src="/static/img/favicon_2.png" alt="" />

                            <div className="inputContLogin inputContLoginCorreo">
                                <p>* Correo electronico</p>
                                <input
                                    className={inputControlEmail}
                                    name="email"
                                    type="email"
                                />
                            </div>
                            <div className="inputContLogin inputContLoginContraseña">
                                <p>* Contraseña</p>
                                <div className="input-group">
                                    <input
                                        className="contraseñainputiniciarsesion"
                                        name="password"
                                        type={classNamePassword}
                                    />
                                    <a
                                        className={classNameEye}
                                        href="#"
                                        onClick={mostrarContraseña}></a>
                                </div>
                            </div>
                            <div className="partebajaLogin">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="remember"
                                    />
                                    <label
                                        className="form-check-label colorbase"
                                        htmlFor="remember">
                                        Recuérdame
                                    </label>
                                </div>

                                <p onClick={() => textoMedioToken()}>
                                    ¿Olvidaste tu contraseña?
                                </p>
                            </div>
                            {user ? (
                                <div
                                    className="ps-btn ps-btn--warning"
                                    href="/my-additionaldata">
                                    Datos Adicionales
                                </div>
                            ) : null}
                            <div className="ContbuttonEntrarLogin">
                                <div
                                    className="buttonEntrarLogin"
                                    onClick={login}>
                                    Ingresar
                                </div>
                            </div>
                            <div className="Otext">
                                <p>O</p>
                            </div>
                            <div className="CrearcuentaCont">
                                <p onClick={() => crearCuenta()}>
                                    Crea tu cuenta
                                </p>
                            </div>
                            <div className="Otext">
                                <p>
                                    Sugerencia: Si no estas registrado en
                                    Mercado Repuesto, primero debes crear tu
                                    usuario, una cuenta te permite estar al
                                    tanto de las novedades de nuestro sitio.
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <Modal dialogClassName="modaltoken" show={showModal}>
                <Modal.Header closeButton>
                    <h2>ACTIVAR CUENTA</h2>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    <form onChange={onChangeToken}>
                        <div className="ps-form__group">
                            <label className="ps-form__label ">
                                Ingresar Codigo :
                            </label>
                            <input
                                className="form-control ps-form__input "
                                name="token"
                                type="text"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <div className="botongrabarproducto">
                    <Row>
                        <Col xs lg={6}>
                            <div
                                className="ps-btn ps-btn--warning"
                                onClick={leeTokenUsuario}>
                                Activar Cuenta
                            </div>
                        </Col>
                        <Col xs lg={2}>
                            <Button
                                className="ps-btn ps-btn--warning"
                                onClick={() => setShowModal(false)}>
                                {" "}
                                Cancelar{" "}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Modal>

            {showModalMedio ? (
                <div
                    className="modal-fondo mtmenos15"
                    onClick={() => {
                        closeModalOlvidasteContraseña();
                    }}>
                    <div
                        className="modal-mensajesLogin redondearventamensajes"
                        onClick={(e) => {
                            // Evitar que se cierre el modal si se hace clic en su contenido
                            e.stopPropagation();
                        }}>
                        {/* Contenido del modal */}
                        <Row>
                            <Col xl={1} lg={1} md={1} sm={1}>
                                <div className="iconoventanamensajes mtmenos14">
                                    <InfoIcon style={{ fontSize: 45 }} />
                                </div>
                            </Col>
                            <Col xl={9} lg={9} md={9} sm={9}>
                                <div className="ml-30 titulodetaildescription">
                                    Recuperar contraseña
                                </div>
                            </Col>
                            <Col xl={1} lg={1} md={1} sm={1}>
                                <button
                                    type="button"
                                    className="cerrarmodal ml-40 sinborder colorbase"
                                    data-dismiss="modal"
                                    onClick={() => {
                                        closeModalOlvidasteContraseña();
                                    }}>
                                    X
                                </button>
                            </Col>
                        </Row>

                        <div className="mt-18 textoventanamensajesNuevo">
                            <div>
                                Para recuperar tu contraseña te vamos a enviar
                                un código de verificación
                            </div>
                        </div>

                        <div className="mt-15 textoventanamensajesNuevo">
                            <div>¿Por dónde deseas recibirlo?</div>
                        </div>

                        <div className="mt-15 textoventanamensajesNuevo">
                            <button
                                className="RecuperarContraseñaSMSDOS"
                                onClick={handleButtonClickSMS}>
                                SMS - Mensaje de Texto
                                <br />
                                Al número celular terminado en {cortartelefono}
                            </button>
                        </div>

                        <div className="mt-15 textoventanamensajesNuevo">
                            <button
                                className="RecuperarContraseñaSMSDOS"
                                onClick={handleButtonClickWhatsApp}>
                                WhatsApp
                                <br />
                                Al número celular terminado en {cortartelefono}
                            </button>
                        </div>

                        <div className="mt-24 textoventanamensajesNuevo">
                            <button
                                className="VerifOtraManerButon"
                                onClick={onCloseModalVerificar}
                                onMouseOver={pasarmouseverificarotraforma}
                                onMouseOut={salirmouseverificarotraforma}>
                                Verificar de otra forma
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            <Dialog
                open={openDialog}
                maxWidth="lg"
                fullWidth={true}
                PaperProps={{
                    style: {
                        maxWidth: "580px",
                        borderRadius: "10px",
                    },
                }}
                disableScrollLock={true}>
                <div className="DialogTokenLogin">
                    <div className="TopDialogTokenLogin">
                        <p>Ingresa el codigo que recibiste.</p>
                        <p>
                            Recibiste un número de 6 dígitos por{" "}
                            {recoveryMethod}.
                        </p>
                    </div>

                    <div className="inputsLoginA">
                        <input
                            className="InputPutCode"
                            maxLength="1"
                            type="tel"
                            value={input1}
                            onChange={(e) => {
                                setInput1(e.target.value);
                                if (e.target.value) input2Ref.current.focus();
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" && !input1)
                                    input1Ref.current.focus();
                            }}
                            ref={input1Ref}
                            onFocus={(e) =>
                                (e.target.style.border = "2px solid #2d2e83")
                            }
                            onBlur={(e) =>
                                (e.target.style.border = "1px solid #f0f1f5")
                            }
                        />
                        <input
                            className="InputPutCode"
                            maxLength="1"
                            type="tel"
                            value={input2}
                            onChange={(e) => {
                                setInput2(e.target.value);
                                if (e.target.value) input3Ref.current.focus();
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" && !input2)
                                    input1Ref.current.focus();
                            }}
                            ref={input2Ref}
                            onFocus={(e) =>
                                (e.target.style.border = "2px solid #2d2e83")
                            }
                            onBlur={(e) =>
                                (e.target.style.border = "1px solid #f0f1f5")
                            }
                        />
                        <input
                            className="InputPutCode"
                            maxLength="1"
                            type="tel"
                            value={input3}
                            onChange={(e) => {
                                setInput3(e.target.value);
                                if (e.target.value) input4Ref.current.focus();
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" && !input3)
                                    input2Ref.current.focus();
                            }}
                            ref={input3Ref}
                            onFocus={(e) =>
                                (e.target.style.border = "2px solid #2d2e83")
                            }
                            onBlur={(e) =>
                                (e.target.style.border = "1px solid #f0f1f5")
                            }
                        />
                        <input
                            className="InputPutCode"
                            maxLength="1"
                            type="tel"
                            value={input4}
                            onChange={(e) => {
                                setInput4(e.target.value);
                                if (e.target.value) input5Ref.current.focus();
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" && !input4)
                                    input3Ref.current.focus();
                            }}
                            ref={input4Ref}
                            onFocus={(e) =>
                                (e.target.style.border = "2px solid #2d2e83")
                            }
                            onBlur={(e) =>
                                (e.target.style.border = "1px solid #f0f1f5")
                            }
                        />
                        <input
                            className="InputPutCode"
                            maxLength="1"
                            type="tel"
                            value={input5}
                            onChange={(e) => {
                                setInput5(e.target.value);
                                if (e.target.value) input6Ref.current.focus();
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" && !input5)
                                    input4Ref.current.focus();
                            }}
                            ref={input5Ref}
                            onFocus={(e) =>
                                (e.target.style.border = "2px solid #2d2e83")
                            }
                            onBlur={(e) =>
                                (e.target.style.border = "1px solid #f0f1f5")
                            }
                        />
                        <input
                            className="InputPutCode"
                            maxLength="1"
                            type="tel"
                            value={input6}
                            onChange={(e) => setInput6(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" && !input6)
                                    input5Ref.current.focus();
                            }}
                            ref={input6Ref}
                            onFocus={(e) =>
                                (e.target.style.border = "2px solid #2d2e83")
                            }
                            onBlur={(e) =>
                                (e.target.style.border = "1px solid #f0f1f5")
                            }
                        />
                    </div>

                    <div className="SendDialogTokenLogin">
                        <div>
                            <button
                                onClick={sendResetEmail}
                                className="ButtonSendToken">
                                Enviar código de verificación
                            </button>
                            {isError && (
                                <div>
                                    <BsInfoCircleFill />{" "}
                                    <p>
                                        El código de verificación es incorrecto.
                                    </p>
                                </div>
                            )}
                        </div>
                        <button
                            className="ButtonCancelToken"
                            onClick={handleCloseDialog}>
                            Cancelar
                        </button>
                    </div>

                    <div
                        className="ChangeMetodToken"
                        onClick={handleAlternativeMethod}>
                        <p>Probar otro metodo</p>
                    </div>

                    <div className="CodeToken">
                        <p>{verificationCode}</p>
                    </div>
                </div>
            </Dialog>

            {showModalVerificar ? (
                <div
                    className="modal-fondo mtmenos15"
                    onClick={onCloseModalVerificar}>
                    <div
                        className="modal-Verificar redondearventamensajes"
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
                                    Recuperar contraseña
                                </div>
                            </Col>
                            <Col xl={1} lg={1} md={1} sm={1}>
                                <button
                                    type="button"
                                    className="cerrarmodal ml-40 sinborder colorbase"
                                    data-dismiss="modal"
                                    onClick={() => {
                                        onCloseModalVerificar();
                                    }}>
                                    X
                                </button>
                            </Col>
                        </Row>
                        <div className="mt-18 textoventanamensajesNuevo">
                            <div>
                                Selecciona el medio para recuperar el acceso a
                                tu cuenta.
                            </div>
                        </div>

                        <div className="mt-15 textoventanamensajesNuevo">
                            <button
                                className="RecuperarContraseñaSMSDOS"
                                onClick={handleButtonClickGoogle}>
                                Ingresa con Google
                            </button>
                        </div>

                        <div className="mt-15 textoventanamensajesNuevo">
                            <button
                                className="RecuperarContraseñaSMSDOS"
                                onClick={handleButtonClickEmail}>
                                Ingresa con tu e-mail
                            </button>
                        </div>
                        <div className="cerrarVerifButton">
                            <button
                                onClick={() => {
                                    onCloseModalVerificar();
                                }}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            <Modal
                dialogClassName="modalmediotoken"
                show={showModalMedioReenviar}>
                <Modal.Header closeButton>
                    <h2>REENVIAR TOKEN</h2>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    <form>
                        <br />
                        <br />
                        <br />
                        <Row>
                            <Col xs lg={2}></Col>
                            <Col xs lg={4}>
                                <div
                                    className="ps-btn ps-btn--warning"
                                    onClick={reenviarToken}>
                                    Email
                                </div>
                            </Col>
                            <Col xs lg={4}>
                                <Button
                                    className="ps-btn"
                                    onClick={() =>
                                        setShowModalMedioReenviar(false)
                                    }>
                                    {" "}
                                    Cancelar{" "}
                                </Button>
                            </Col>
                        </Row>

                        <br />
                        <br />
                        <br />
                    </form>
                </Modal.Body>
            </Modal>

            {showModalPropietarioCuenta ? (
                <div
                    className="mlmenos650 modal-fondo"
                    onClick={() => {
                        onCloseModalPropietario();
                    }}>
                    <div
                        className="modal-contenido redondearventamensajes"
                        onClick={(e) => {
                            // do not close modal if anything inside modal content is clicked
                            e.stopPropagation();
                        }}>
                        <br />
                        <Row className="mtmenos10">
                            <Col
                                xl={10}
                                lg={10}
                                md={10}
                                sm={10}
                                className="textotuproductoestaen ml-2">
                                <h2>Ingresa el codigo de verificación</h2>
                            </Col>

                            <Col
                                xl={1}
                                lg={1}
                                md={1}
                                sm={1}
                                className="ml-50 mtmenos10">
                                <h1 onClick={onCloseModalPropietario}>X</h1>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col xl={9} lg={9} md={9} sm={7} className="ml-2">
                                <form onChange={onChangeValidarToken}>
                                    <div className="ps-form__group tamañotextotoken">
                                        <h3 className="textoenviocodigo">
                                            Hemos enviado un código de 6 digitos
                                            por {cortartelefono}
                                        </h3>
                                        <div className="ml-200 mt-60">
                                            <Row>
                                                <Col
                                                    xl={1}
                                                    lg={1}
                                                    md={1}
                                                    sm={1}>
                                                    <input
                                                        className="tamañoinputtoken"
                                                        name="tokenvalidar"
                                                        type="text"
                                                        size="1"
                                                        minlength="1"
                                                        maxlength="1"
                                                    />
                                                </Col>
                                                <Col
                                                    xl={1}
                                                    lg={1}
                                                    md={1}
                                                    sm={1}>
                                                    <input
                                                        className="ml-10 tamañoinputtoken"
                                                        name="tokenvalidar"
                                                        type="text"
                                                        size="1"
                                                        minlength="1"
                                                        maxlength="1"
                                                    />
                                                </Col>
                                                <Col
                                                    xl={1}
                                                    lg={1}
                                                    md={1}
                                                    sm={1}>
                                                    <input
                                                        className="ml-20 tamañoinputtoken"
                                                        name="tokenvalidar"
                                                        type="text"
                                                        size="1"
                                                        minlength="1"
                                                        maxlength="1"
                                                    />
                                                </Col>
                                                <Col
                                                    xl={1}
                                                    lg={1}
                                                    md={1}
                                                    sm={1}>
                                                    <input
                                                        className="ml-30 tamañoinputtoken"
                                                        name="tokenvalidar"
                                                        type="text"
                                                        size="1"
                                                        minlength="1"
                                                        maxlength="1"
                                                    />
                                                </Col>
                                                <Col
                                                    xl={1}
                                                    lg={1}
                                                    md={1}
                                                    sm={1}>
                                                    <input
                                                        className="ml-40 tamañoinputtoken"
                                                        name="tokenvalidar"
                                                        type="text"
                                                        size="1"
                                                        minlength="1"
                                                        maxlength="1"
                                                    />
                                                </Col>
                                                <Col
                                                    xl={1}
                                                    lg={1}
                                                    md={1}
                                                    sm={1}>
                                                    <input
                                                        className="ml-50 tamañoinputtoken"
                                                        name="tokenvalidar"
                                                        type="text"
                                                        size="1"
                                                        minlength="1"
                                                        maxlength="1"
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <div className="ml-100 mt-60 mb-20">
                            <Row>
                                <Col xl={5} lg={5} md={5} sm={5}></Col>
                                <Col xl={4} lg={4} md={4} sm={4}>
                                    <div
                                        className="botonreenviarcodigo"
                                        onClick={reenvioCodigo}>
                                        Reenviar código
                                    </div>
                                </Col>
                                <Col xl={1} lg={1} md={1} sm={1}>
                                    <Button
                                        className="ps-btn"
                                        onClick={() =>
                                            setShowModalPropietarioCuenta(false)
                                        }>
                                        {" "}
                                        Continuar{" "}
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                        <br />
                    </div>
                </div>
            ) : null}

            <Modal dialogClassName="modaltoken" show={showModalLlamada}>
                <Modal.Header closeButton>
                    <h2>LLAMADA TELEFONICA</h2>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    <Row>
                        <Col xs lg={6}>
                            <h4>Llamando ...</h4>
                        </Col>
                        <Col xs lg={6}>
                            <Button
                                className="ps-btn"
                                onClick={() => setShowModalLlamada(false)}>
                                {" "}
                                Cancelar{" "}
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

function defaultValueForm() {
    return {
        email: null,
        password: null,
        nombre: null,
        telefono: 0,
    };
}

function defaultValueToken() {
    return {
        token: "",
    };
}

function defaultValueValidarToken() {
    return {
        tokenvalidar: "",
    };
}

export default LoginAccount;
