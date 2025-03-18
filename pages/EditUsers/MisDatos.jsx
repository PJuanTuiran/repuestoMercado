import Container from "../../components/layouts/Container";
import React, { useState, useEffect, useRef } from "react";

//import MUI media
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { AiOutlineRight } from "react-icons/ai";
import { useRouter } from "next/router";

import { URL_BD_MR } from "../../helpers/Constants";
import axios from "axios";
import { useDispatch, connect, useSelector } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";

import MenuIcon from "@material-ui/icons/Menu";
import LateralMenu from "../../pages/LateralMenu";
import { getUserMenuPrimary } from "../../store/usermenuprimary/action";
import { getCloseMenu } from "../../store/closemenu/action";
import ModalMensajesConfirmar from "../mensajes/ModalMensajesConfirmar";
import ModalMensajes from "../mensajes/ModalMensajes";
import ModalControlAcceso from "../mensajes/ModalControlAcceso";

//Firebase
import { getAuth, deleteUser, signOut } from "firebase/auth";
import firebase from "../../utilities/firebase";

export default function MisDatos() {
    const dispatch = useDispatch();
    let datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [datosUsuario, setDatosUsuario] = useState("");
    const [usuario, setUsuario] = useState("");
    const [nombres, setNombres] = useState("");
    const [nombresDos, setNombresDos] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [apellidosDos, setApellidosDos] = useState("");
    const [sombraOpen, setSombraOpen] = useState("");
    const [sombraOpenDos, setSombraOpenDos] = useState("SubcontainerMisDatos");
    const [telefonoRecibeSeleccionado, setTelefonoRecibeSeleccionado] =
        useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [nroDocumentoSeleccionado, setNroDocumentoSeleccionado] =
        useState("");
    const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] =
        useState("");
    const [disabledImg, setDisabledImg] = useState("menulateraluno");

    const [showModalMensajesConfirmar, setShowModalMensajesConfirmar] =
        useState(false);
    const [confirmarMensaje, setconfirmarMensaje] = useState(false);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [tipo, setTipo] = useState(0);
    const [mostrarModal, setMostrarModal] = useState(false);

    const [showModalControlAcceso, setShowModalControlAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

    const [showModalDeleteMensajes, setShowDeleteModalMensajes] =
        useState(false);
    const [tituloDeleteMensajes, setTituloDeleteMensajes] = useState(false);
    const [textoDeleteMensajes, setTextoDeleteMensajes] = useState(false);

    const [selectedOption, setSelectedOption] = useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

    const [closeOpen, setcloseOpen] = useState(false);
    const router = useRouter();
    const activausermenu = useSelector((state) => state.usermenu.usermenu);
    const closemenu = useSelector((state) => state.closemenu.closemenu);
    const userlogged = useSelector((state) => state.userlogged.userlogged);

    const handleOnClick = (option) => {
        setSelectedOption(option);
    };

    useEffect(() => {
        if (datosUsuario) {
            if (datosusuarios.activo == 30) {
                setShowModalControlAcceso(true);
                setTituloControlAcceso("Mis datos");
                setTextoControlAcceso(
                    "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
                );
                return;
            }
        }
    });

    useEffect(() => {
        setcloseOpen(false);
        setSombraOpen("");
        setSombraOpenDos("SubcontainerMisDatos");
    }, [activausermenu]);

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

                // Actualiza el estado con los datos adicionales que necesitas
                setDatosUsuario(res.data[0]);

                if (res.data[0].usuario) setUsuario(res.data[0].usuario);
                else setUsuario(" ");

                if (res.data[0].primernombre)
                    setNombres(res.data[0].primernombre);
                else setNombres(" ");

                if (res.data[0].segundonombre)
                    setNombresDos(res.data[0].segundonombre);
                else setNombresDos(" ");

                if (res.data[0].primerapellido)
                    setApellidos(res.data[0].primerapellido);
                else setApellidos(" ");

                if (res.data[0].segundoapellido)
                    setApellidosDos(res.data[0].segundoapellido);
                else setApellidosDos(" ");

                setTelefonoRecibeSeleccionado(res.data[0].celular);
                setCorreoElectronico(res.data[0].email);
                setNroDocumentoSeleccionado(res.data[0].identificacion);
                setTipoDocumentoSeleccionado(res.data[0].nombredocumento);

                // Agrega más setState según sea necesario
            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
                // Maneja el error según tus necesidades
            }
        };
        leerDatosUsuario();
    }, [datosusuarios]);

    const editUser = (tipoInformacion) => {
        router.push({
            pathname: "./CompSMS",
            query: { tipoInformacion, info: tipoInformacion },
        });
    };

    const handleClickDomicilio = (e) => {
        e.preventDefault();
        router.push("./FormsEditUsers/FormDomicilio");
    };

    const handleClicPjuridica = (e) => {
        e.preventDefault();

        const leerdcosnit = async () => {
            let params = {
                usuario: datosusuarios.uid
            }

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "273", params
                });

                if (res.data.type == 1 && res.data.listardcosnit.length > 0) {
                    router.push("/EditUsers/FormsEditUsers/ValidDocsPjuridica");
                } else {
                    leerSolicitud();
                }
            } catch (error) {
                console.error("Error al leer documentos nit", error);
            }
        };

        leerdcosnit();

        const leerSolicitud = async () => {
            let params = {
                usuario: datosusuarios.uid
            }

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "269", params
                });
                console.log("DATAXXX : ", res.data.listardcosnit)

                if (res.data.type == 1 && res.data.listardcosnit.length > 0) {

                    let data = res.data.listardcosnit[0];
                    let long = res.data.listardcosnit.length;

                    const saveDctosNit = async () => {
                        let array = [];

                        let itemuno = {
                            usuario: datosusuarios.uid,
                            estado: 128,
                            nombredocumento: data.nombredocumento1,
                            controlactivar: data.controlactivar,
                            fechadecreacion: data.fechadecreacion,
                            fechaactualizacion: data.fechadecreacion,
                        }

                        let itemdos = {
                            usuario: datosusuarios.uid,
                            estado: 128,
                            nombredocumento: data.nombredocumento2,
                            controlactivar: data.controlactivar,
                            fechadecreacion: data.fechadecreacion,
                            fechaactualizacion: data.fechadecreacion,
                        }

                        let itemtres = {
                            usuario: datosusuarios.uid,
                            estado: 128,
                            nombredocumento: data.nombredocumento3,
                            controlactivar: data.controlactivar,
                            fechadecreacion: data.fechadecreacion,
                            fechaactualizacion: data.fechadecreacion,
                        }

                        array.push(itemuno);
                        array.push(itemdos);
                        array.push(itemtres);

                        array &&
                            array.map((item, index) => {
                                //console.log("ITEMDDASAS: ", item)
                                const grabar = async () => {
                                    try {
                                        const res = await axios({
                                            method: "post",
                                            url: URL_BD_MR + "272", params: item
                                        });

                                        if (res.data.type == 1) {
                                            console.log("Grabar datos OK documentos nit", res.data);
                                            router.push("/EditUsers/FormsEditUsers/ValidDocsPjuridica");
                                        }
                                    } catch (error) {
                                        console.error("Error al leer documentos nit", res.data);
                                    }
                                };
                                grabar();
                            });
                    }

                    saveDctosNit();
                } else {
                    console.log("Error al leer documentos nit");
                    router.push("./FormsEditUsers/FormPersJuridica");
                }
            } catch (error) {
                console.error("Error al leer documentos nit", error);
            }
        };
    };

    const handleDeleteUser = (e) => {
        e.preventDefault();
        setShowModalMensajesConfirmar(true);
        setTituloMensajes("Eliminar usuario");
        setTextoMensajes("Confirme eliminar la cuenta!");
    };

    useEffect(() => {
        if (confirmarMensaje) {

            const auth = getAuth(firebase);
            const user = auth.currentUser;

            deleteUser(user).then(() => {
                setShowDeleteModalMensajes(true);
                setTituloDeleteMensajes("Eliminado usuario");
                setTextoDeleteMensajes(
                    "Cuenta del usuario eliminada de Mercado Repuesto"
                );
                router.push("/");
                return;
            });
        }
    }, [confirmarMensaje]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const abrirModal = () => {
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
    };

    const irA = useRef(null);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    useEffect(() => {
        if (closemenu) {
            setcloseOpen(false);
            setSombraOpen("");
            setSombraOpenDos("SubcontainerMisDatos");
            dispatch(getCloseMenu(false));
        }
    }, [closemenu]);

    useEffect(() => {
        if (closeOpen) {
            setDisabledImg("menulateraltres");
        } else {
            setDisabledImg("menulateraluno");
        }
    }, [closeOpen]);

    const closeOpenMenu = () => {
        setcloseOpen(true);
        setSombraOpen("disablemyaccount1");
        setSombraOpenDos("SubcontainerMisDatosDisabled");
        dispatch(getUserMenuPrimary(false));
    };

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <ModalMensajes
                        shown={showModalDeleteMensajes}
                        close={setShowDeleteModalMensajes}
                        titulo={tituloDeleteMensajes}
                        mensaje={textoDeleteMensajes}
                        tipo="1"
                    />
                    <ModalMensajesConfirmar
                        shown={showModalMensajesConfirmar}
                        close={setShowModalMensajesConfirmar}
                        titulo={tituloMensajes}
                        mensaje={textoMensajes}
                        setconfirmarMensaje={setconfirmarMensaje}
                        setTipo={setTipo}
                    />
                    <ModalControlAcceso
                        shown={showModalControlAcceso}
                        close={setShowModalControlAcceso}
                        titulo={tituloControlAcceso}
                        mensaje={textoControlAcceso}
                        tipo="1"
                    />
                    <div className="ml-57 mt-20">
                        <Grid container spacing={1}>
                            <Grid item xs={1} md={1} lg={1}>
                                <Button
                                    className="sinborder"
                                    variant="outline-light"
                                    onClick={() => closeOpenMenu()}
                                    style={{
                                        backgroundColor: "transparent",
                                    }}>
                                    <div className={disabledImg}>
                                        <MenuIcon className="menuproperty" />
                                    </div>
                                </Button>
                            </Grid>
                            <Grid item xs={8} md={8} lg={8}>
                                <div className="titlesformsUsersdos">
                                    <p></p>
                                </div>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <div className="mt-18">
                                        {closeOpen ? <LateralMenu /> : null}
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    <div className={sombraOpen}>
                        <div className="ps-page ps-page--inner" id="myaccount">
                            <div
                                ref={irA}
                                className="rtmenos40"
                                style={{
                                    padding: ".5rem",
                                    justifyContent: "center",
                                    display: "flex",
                                }}>
                                <Grid
                                    sx={{
                                        width: isMdDown ? "100%" : "65%",
                                    }}>
                                    <div style={{ marginBottom: "2rem" }}>
                                        <p className="titlemisD">Mis datos</p>
                                    </div>
                                    <div
                                        className={sombraOpenDos}
                                        onClick={abrirModal}>
                                        <div
                                            style={{ width: "100%" }}
                                            className="">
                                            <p className="titleSubContMisD">
                                                Nombre de usuario
                                            </p>
                                            <p className="subtitleSubContMisD">
                                                {usuario}{" "}
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}>
                                            <AiOutlineRight
                                                size={30}
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {mostrarModal && (
                                        <div
                                            className="modal-fondo mtmenos15"
                                            onClick={() => {
                                                cerrarModal();
                                            }}>
                                            <div
                                                className="modal-mensajes-login redondearventamensajes"
                                                onClick={(e) => {
                                                    // Evitar que se cierre el modal si se hace clic en su contenido
                                                    e.stopPropagation();
                                                }}>
                                                {/* Contenido del modal */}
                                                <Row>
                                                    <Col
                                                        xl={1}
                                                        lg={1}
                                                        md={1}
                                                        sm={1}>
                                                        <div className="iconoventanamensajes mtmenos14">
                                                            <InfoIcon
                                                                style={{
                                                                    fontSize: 45,
                                                                }}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col
                                                        xl={9}
                                                        lg={9}
                                                        md={9}
                                                        sm={9}>
                                                        <div className="ml-30 titulodetaildescription">
                                                            Nombre de usuario
                                                        </div>
                                                    </Col>
                                                    <Col
                                                        xl={1}
                                                        lg={1}
                                                        md={1}
                                                        sm={1}>
                                                        <button
                                                            type="button"
                                                            className="cerrarmodal ml-40 sinborder colorbase"
                                                            data-dismiss="modal"
                                                            onClick={() =>
                                                                cerrarModal()
                                                            }>
                                                            X
                                                        </button>
                                                    </Col>
                                                </Row>

                                                <div className="mt-35 textoventanamensajes">
                                                    <div>
                                                        {/* Aquí va el mensaje del modal */}
                                                        No es posible editar el
                                                        nombre de usuario, ya
                                                        que este es asignado de
                                                        manera automática por la
                                                        plataforma.
                                                    </div>
                                                </div>

                                                <div className="ml-330 mt-29">
                                                    <Row>
                                                        <Col
                                                            xl={4}
                                                            lg={4}
                                                            md={4}
                                                            xs={4}></Col>
                                                        <Col
                                                            xl={6}
                                                            lg={6}
                                                            md={6}
                                                            xs={6}>
                                                            <Button
                                                                variant="outline-light"
                                                                className="ps-btn redondearborde"
                                                                onClick={() =>
                                                                    cerrarModal()
                                                                }>
                                                                <span className="modal-text">
                                                                    Cerrar
                                                                </span>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div
                                        className={sombraOpenDos}
                                        onClick={() => editUser("nombres")}>
                                        <div style={{ width: "100%" }}>
                                            <p className="titleSubContMisD">
                                                Nombres y apellidos
                                            </p>
                                            <p className="subtitleSubContMisD">
                                                {nombres} {nombresDos}{" "}
                                                {apellidos} {apellidosDos}
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}>
                                            <AiOutlineRight
                                                size={30}
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={sombraOpenDos}
                                        onClick={() => editUser("email")}>
                                        <div style={{ width: "100%" }}>
                                            <p className="titleSubContMisD">
                                                Correo electrónico
                                            </p>
                                            <p className="subtitleSubContMisD">
                                                {correoElectronico}{" "}
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}>
                                            <AiOutlineRight
                                                size={30}
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={sombraOpenDos}
                                        onClick={() =>
                                            editUser("DocIdentificacion")
                                        }>
                                        <div style={{ width: "100%" }}>
                                            <p className="titleSubContMisD">
                                                Tipo y número de documento
                                            </p>
                                            <p className="subtitleSubContMisD">
                                                {tipoDocumentoSeleccionado},{" "}
                                                {nroDocumentoSeleccionado}
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}>
                                            <AiOutlineRight
                                                size={30}
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={sombraOpenDos}
                                        onClick={() => editUser("teléfono")}>
                                        <div style={{ width: "100%" }}>
                                            <p className="titleSubContMisD">
                                                Teléfono
                                            </p>
                                            <p className="subtitleSubContMisD">
                                                {" "}
                                                {
                                                    telefonoRecibeSeleccionado
                                                }{" "}
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}>
                                            <AiOutlineRight
                                                size={30}
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={sombraOpenDos}
                                        onClick={handleClickDomicilio}>
                                        <div style={{ width: "100%" }}>
                                            <p className="titleSubContMisD">
                                                Domicilio
                                            </p>
                                            <p className="subtitleSubContMisD">
                                                Tus direcciones
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}>
                                            <AiOutlineRight
                                                size={30}
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={sombraOpenDos}
                                        onClick={handleDeleteUser}>
                                        <div style={{ width: "100%" }}>
                                            <p className="titleSubContMisD">
                                                Eliminar cuenta
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}>
                                            <AiOutlineRight
                                                size={30}
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={sombraOpenDos}
                                        onClick={handleClicPjuridica}
                                        style={{ marginTop: "8rem" }}>
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}>
                                            <p className="titlePJuridicaMisDatos">
                                                Cambiar cuenta a cuenta de
                                                persona juridica
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}>
                                            <AiOutlineRight
                                                size={30}
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
