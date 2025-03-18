//import MUI media
import { Grid, useMediaQuery, useTheme, Button } from "@mui/material";
import Container from "../../components/layouts/Container";
import ModalMensajes from "../mensajes/ModalMensajes";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import InfoIcon from "@material-ui/icons/Info";

import MenuIcon from "@material-ui/icons/Menu";
import LateralMenu from "../../pages/LateralMenu";
import { getUserMenuPrimary } from "../../store/usermenuprimary/action";
import { getCloseMenu } from "../../store/closemenu/action";
import { getLeeIra } from "../../store/leeira/action";
import ModalMensajesShoppingCart from "../../pages/mensajes/ModalMensajesShoppingCart";
import axios from "axios";
import { URL_BD_MR } from "../../helpers/Constants";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineRight } from "react-icons/ai";

export default function seguridadData() {
    const dispatch = useDispatch();
    const router = useRouter();
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const [sombraOpen, setSombraOpen] = useState("");
    const [sombraOpenDos, setSombraOpenDos] = useState("SubcontainerMisDatos");
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [datosUsuario, setDatosUsuario] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");

    const [showModalMensajesShoppingCart, setShowModalMensajesShoppingCart] =
        useState(false);
    const [tituloMensajesShoppingCart, setTituloMensajesShoppingCart] =
        useState(false);
    const [textoMensajesShoppingCart, setTextoMensajesShoppingCart] =
        useState(false);

    const [sizeMenu, setSizeMenu] = useState("menulateralseis");
    const [disabledImg, setDisabledImg] = useState("menulateralcuatro1");
    const [closeOpen, setcloseOpen] = useState(false);
    const activausermenu = useSelector((state) => state.usermenu.usermenu);
    const closemenu = useSelector((state) => state.closemenu.closemenu);

    useEffect(() => {
        setcloseOpen(false);
        setSombraOpen("");
        setSombraOpenDos("SubcontainerMisDatos");
    }, [activausermenu]);

    //Posición top Pagina
    const irA = useRef(null);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        if (!datosusuarios.uid || datosusuarios.uid == 0) {
            /* Guarda datos del producto que se debe agregar al localstorage */
            localStorage.setItem("ira", JSON.stringify(7));
            localStorage.setItem("rutaira", JSON.stringify(router.pathname));

            dispatch(getLeeIra(7));

            setShowModalMensajesShoppingCart(true);
            setTituloMensajesShoppingCart(
                "¡Bienvenido! Para ir a seguridad debes ingresar a tu cuenta"
            );
            let texto = "";
            setTextoMensajesShoppingCart(texto);
            //setLogin(true);
            return;
        }
    }, []);

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
                setCorreoElectronico(res.data[0].email);
                //setNombres(res.data[0].primernombre);
                //setNombresDos(res.data[0].segundonombre);
                //setApellidos(res.data[0].primerapellido);
                //setApellidosDos(res.data[0].segundoapellido);
                //setTelefonoRecibeSeleccionado(res.data[0].celular);

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
            pathname: "./compSmsSeguridad",
            query: { tipoInformacion, info: tipoInformacion },
        });
    };

    const rutaDispVinc = (e) => {
        e.preventDefault();
        router.push("./dispVinculados");
    };

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
            setDisabledImg("menulateralcinco");
        } else {
            setDisabledImg("menulateralcuatro1");
        }
    }, [closeOpen]);

    const closeOpenMenu = () => {
        setcloseOpen(true);
        setSombraOpen("disablemyaccountcuatro");
        setSombraOpenDos("SubcontainerMisDatosDisabled");
        dispatch(getUserMenuPrimary(false));
    };

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <ModalMensajesShoppingCart
                        shown={showModalMensajesShoppingCart}
                        close={setShowModalMensajesShoppingCart}
                        titulo={tituloMensajesShoppingCart}
                        mensaje={textoMensajesShoppingCart}
                        setSoyNuevo={0}
                        setTengoCuenta={0}
                        tipo="1"
                    />
                    <div className="ml-57 mt-20">
                        <Grid container spacing={1}>
                            <Grid item xs={1} md={1} lg={1} className="ml-15">
                                <Button
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

                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div
                                className={sombraOpen}
                                style={{
                                    padding: ".5rem",
                                    justifyContent: "center",
                                    display: "flex",
                                }}>
                                <Grid sx={{ width: isMdDown ? "100%" : "65%" }}>
                                    <div style={{ marginBottom: "2rem" }}>
                                        <p className="titlemisD">Seguridad</p>
                                    </div>

                                    <div
                                        className={sombraOpenDos}
                                        onClick={() => editUser("email")}>
                                        <div style={{ width: "100%" }}>
                                            <p className="titleSubContMisD">
                                                Correo electronico
                                            </p>
                                            <p className="subtitleSubContMisD">
                                                {correoElectronico}
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}>
                                            <AiOutlineRight
                                                size={30}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={sombraOpenDos}
                                        onClick={() => editUser("password")}>
                                        <div style={{ width: "100%" }}>
                                            <p className="titleSubContMisD">
                                                Contraseña
                                            </p>
                                            <p className="subtitleSubContMisD">
                                                xxxxxxxx
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}>
                                            <AiOutlineRight
                                                size={30}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={sombraOpenDos}
                                        onClick={rutaDispVinc}>
                                        <div style={{ width: "100%" }}>
                                            <p className="titleSubContMisD">
                                                Dispositivos vinculados
                                            </p>
                                            <p className="subtitleSubContMisD">
                                                Mira tus dispositivos vinculados
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}>
                                            <AiOutlineRight
                                                size={30}
                                                style={{ cursor: "pointer" }}
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
