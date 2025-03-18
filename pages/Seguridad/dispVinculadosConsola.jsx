//import MUI media
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import Container from "../../components/layouts/Container";
import ModalMensajes from "../mensajes/ModalMensajes";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { URL_BD_MR } from "../../helpers/Constants";
import { useDispatch, connect, useSelector } from "react-redux";
import { getLeeIra } from "../../store/leeira/action";
import ModalMensajesShoppingCart from "../../pages/mensajes/ModalMensajesShoppingCart";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebase from "../../utilities/firebase";
import ModalMensajesWishListControl from "../mensajes/ModalMensajesWishListControl";
import Moment from "moment";
//import { setCookie, parseCookies } from 'nookies'
export default function dispVinculadosConsola() {
    const router = useRouter();
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const dispatch = useDispatch();

    //Posición top Pagina
    const irA = useRef(null);
    const [tituloMensajes, setTituloMensajes] = useState(""); //titulo modal
    const [textoMensajes, setTextoMensajes] = useState(""); //texto modal
    const [showModal, setShowModal] = useState(false); //Estado de modal

    const [UidUser, setUidUser] = useState("");
    const [DatosUser, setDatosUser] = useState([]);
    const [dispositivosVinculados, setDispositivosVinculados] = useState([]);

    const [showModalMensajesShoppingCart, setShowModalMensajesShoppingCart] =
        useState(false);
    const [tituloMensajesShoppingCart, setTituloMensajesShoppingCart] =
        useState(false);
    const [textoMensajesShoppingCart, setTextoMensajesShoppingCart] =
        useState(false);

    const [soyNuevo, setSoyNuevo] = useState(false);
    const [tengoCuenta, setTengoCuenta] = useState(false);

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    const [showModalMensajesCtlr, setShowModalMensajesCtlr] = useState(false);
    const [tituloMensajesCtlr, setTituloMensajesCtlr] = useState("");
    const [textoMensajesCtlr, setTextoMensajesCtlr] = useState("");
    const [isUserLogged, setIsUserLogged] = useState(false);

    let iduser = null;
    if (typeof window !== "undefined") {
        if (router.query.iduser) {
            iduser = JSON.parse(router.query.iduser);
            console.log("IDUSER : ", iduser);
            //setUidUser(iduser);
            // Guardar los datos en el almacenamiento local
            //localStorage.setItem("producto", JSON.stringify(producto));
        } 
    }

    //cerrar modal de favoritos y de eliminar un producto
    const handleModalClose = () => {
        setShowModal(false);
    };

    //función para ir a ruta de Seguridad y lobby
    const handleroute = (route) => () => {
        router.push(route);
    };


    //función para ir al top de la pagina
    
    // Estado para almacenar el id del dispositivo actual
    const [idDispositivoActual, setIdDispositivoActual] = useState(null);

    useEffect(() => {
        const handleDeviceDetection = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            let array = userAgent.split(" ");
            //console.log("XXXXXXX : ", array);

            const isMobile =
                /iphone|ipad|ipod|android|blackberry|windows phone/g.test(
                    userAgent
                );
            const isTablet =
                /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(
                    userAgent
                );

            let idDispositivo;
            if (isMobile) {
                idDispositivo =
                    "Mobile" +
                    " " +
                    array[1] +
                    " " +
                    array[2] +
                    array[3] +
                    array[4] +
                    array[5];
            } else if (isTablet) {
                idDispositivo =
                    "Tablet" +
                    " " +
                    array[1] +
                    " " +
                    array[2] +
                    array[3] +
                    array[4] +
                    array[5];
            } else {
                idDispositivo =
                    "Desktop" +
                    " " +
                    array[1] +
                    " " +
                    array[2] +
                    array[3] +
                    array[4] +
                    array[5];
            }

            // Almacena el id del dispositivo en el estado
            setIdDispositivoActual(idDispositivo);

            // Imprime el id del dispositivo actual en la consola
            //console.log("Dispositivo actual:", idDispositivo);
        };

        handleDeviceDetection();
        window.addEventListener("resize", handleDeviceDetection);

        return () => {
            window.removeEventListener("resize", handleDeviceDetection);
        };
    }, []);

    //Función para obtener el UID del Usuario que nos sirve para mapear sus historial
    useEffect(() => {
        const obtenerUidUsuario = async () => {
            setUidUser(iduser);
            let params = {
                usuario: iduser,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });
                setDatosUser(res.data[0]);
                setUidUser(res.data[0].uid);
            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerUidUsuario();
    }, [iduser]);

    //función para leer los dispositivos que están vinculados
    useEffect(() => {
        const leerDispositivosVinculados = async () => {
            setUidUser(iduser);
            let params = {
                usuario: iduser,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "93",
                params,
            })
                .then((res) => {
                    if (res.data && res.data.listLinkedDevices) {
                        const dispositivos = res.data.listLinkedDevices.map(
                            (dispositivo) => {
                                return {
                                    id: dispositivo.id,
                                    iddispositivo: dispositivo.iddispositivo,
                                    usuario: dispositivo.usuario,
                                    localizacion: dispositivo.localizacion,
                                    fechacreacion: dispositivo.fechacreacion,
                                };
                            }
                        );
                        // Almacena los dispositivos vinculados en el estado de tu componente
                        setDispositivosVinculados(dispositivos);

                        // Imprime los dispositivos vinculados en la consola
                        console.log("Dispositivos vinculados:", dispositivos);
                    } else {
                        //console.error("Error: res.data o res.data.listLinkedDevices es undefined");
                    }
                })
                .catch(function (error) {
                    console.error("Error al leer los datos del usuario", error);
                });
        };
        leerDispositivosVinculados();
    }, [iduser]); //Función para obtener el UID del Usuario que nos sirve para mapear sus historial

    const Salir = () => {
        const auth = getAuth(firebase);
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                router.push("/");
                console.log("Sesión Cerrada");
            })
            .catch((error) => {
                // An error happened.
                console.log("Error Cerrando Sesión");
            });
    };

    const borrarDispositivo = async (id, iddispositivo) => {
        let params = {
            usuario: parseInt(iduser),
            id: id,
        };

        console.log("PARAM DELE : ", params);
        //return

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "96",
                params,
            });

            if (res.data && res.data.message === "PROCESO EXITOSO") {
                console.log("Dispositivo borrado con éxito");
                // Actualiza la lista de dispositivos vinculados
                setDispositivosVinculados((prevDispositivos) =>
                    prevDispositivos.filter(
                        (dispositivo) => dispositivo.id !== id
                    )
                );

                // Muestra el modal con el mensaje de éxito
                setShowModal(true);
                setTituloMensajes("Dispositivo borrado");
                let texto = "Dispositivo borrado con éxito";
                setTextoMensajes(texto);

                // Si el dispositivo borrado es el dispositivo actual, cierra la sesión
                if (idDispositivoActual === iddispositivo) {
                    Salir();
                }
            } else {
                throw new Error("No se pudo borrar el dispositivo");
            }
        } catch (error) {
            console.error("Error al borrar el dispositivo", error);
            // Maneja el error según tus necesidades
        }
    };

    const verHistorial = () => {
        router.push("/Seguridad/historialDispVinculados");
        //console.log("Sesión Cerrada");
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
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account">
                                <div
                                    className="ContDatosDocs"
                                    style={{
                                        padding: ".5rem",
                                        justifyContent: "center",
                                        display: "flex",
                                    }}>
                                    <Grid
                                        sx={{
                                            width: isMdDown ? "100%" : "65%",
                                        }}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={8} lg={8}>
                                                <p className="titlemisD">
                                                    Dispositivos vinculados
                                                </p>
                                            </Grid>
                                            <Grid item xs={12} md={4} lg={4}>
                                                <p
                                                    className="botonhistorialdispvin"
                                                    onClick={() =>
                                                        verHistorial()
                                                    }>
                                                    Ver historial
                                                </p>
                                            </Grid>
                                        </Grid>

                                        <div className="contDispVincSubTitle">
                                            <p className="subtitdispvinc">
                                                Actualmente hay{" "}
                                                {dispositivosVinculados.length}{" "}
                                                dispositivos vinculados a tu
                                                cuenta
                                            </p>
                                        </div>

                                        {dispositivosVinculados.length > 0 ? (
                                            dispositivosVinculados
                                                // Ordena los dispositivos para que el dispositivo actual esté primero
                                                .sort((a, b) =>
                                                    a.iddispositivo ===
                                                    idDispositivoActual
                                                        ? -1
                                                        : b.iddispositivo ===
                                                          idDispositivoActual
                                                        ? 1
                                                        : 0
                                                )
                                                .map((dispositivo, index) => {
                                                    let esEsteDispositivo =
                                                        dispositivo.iddispositivo ===
                                                        idDispositivoActual;
                                                    let resultado = "";
                                                    if (
                                                        dispositivo.iddispositivo
                                                    ) {
                                                        let palabras =
                                                            dispositivo.iddispositivo.match(
                                                                /\b(\w+)\b/g
                                                            );
                                                        if (
                                                            palabras &&
                                                            palabras.length >= 3
                                                        ) {
                                                            resultado = palabras
                                                                .slice(0, 3)
                                                                .join(" ");
                                                        }
                                                    }
                                                    return (
                                                        <div
                                                            className="mainDispVinculados"
                                                            key={index}>
                                                            <div className="SubcontainerMisDatos">
                                                                <div className="dateandLocalización">
                                                                    <p className="titleSubContMisD">
                                                                        {
                                                                            resultado
                                                                        }
                                                                    </p>
                                                                    <div className="psubtitlesSubContMisDates">
                                                                        <p className="subtitleSubContMisD">
                                                                            {esEsteDispositivo
                                                                                ? ""
                                                                                : "" //dispositivo.localizacion
                                                                                      .split(
                                                                                          ", "
                                                                                      )
                                                                                      .slice(
                                                                                          -3
                                                                                      )
                                                                                      .join(
                                                                                          ", "
                                                                                      )}
                                                                        </p>
                                                                        <Grid
                                                                            container
                                                                            spacing={
                                                                                1
                                                                            }>
                                                                            <Grid
                                                                                item
                                                                                xs={
                                                                                    12
                                                                                }
                                                                                md={
                                                                                    5
                                                                                }
                                                                                lg={
                                                                                    5
                                                                                }>
                                                                                <div className="textoiniciosesiondos">
                                                                                    Inicio
                                                                                    sesión
                                                                                    en:{" "}
                                                                                </div>
                                                                            </Grid>
                                                                            <Grid
                                                                                item
                                                                                xs={
                                                                                    12
                                                                                }
                                                                                md={
                                                                                    7
                                                                                }
                                                                                lg={
                                                                                    7
                                                                                }>
                                                                                <div className="fechainiciosesiondos">
                                                                                    {Moment(
                                                                                        dispositivo.fechacreacion &&
                                                                                            dispositivo.fechacreacion.split(
                                                                                                " "
                                                                                            )[0]
                                                                                                .created_at
                                                                                    ).format(
                                                                                        "MMM DD, YYYY"
                                                                                    )}
                                                                                </div>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </div>
                                                                </div>
                                                                <div className="CloseSesionDispVinc">
                                                                    <button
                                                                        className="ButtonCloseSession"
                                                                        onClick={() =>
                                                                            borrarDispositivo(
                                                                                dispositivo.id,
                                                                                dispositivo.iddispositivo
                                                                            )
                                                                        }>
                                                                        Cerrar
                                                                        sesión
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                        ) : (
                                            <p>
                                                No tienes dispositivos
                                                vinculados.
                                            </p>
                                        )}

                                        <Grid
                                            container
                                            style={{ width: "100%" }}>
                                            <Grid item xs={12} md={6}></Grid>
                                            <Grid item xs={12} md={6}>
                                                <Box
                                                    display="flex"
                                                    justifyContent="space-between"
                                                    marginTop={15}>
                                                    <button
                                                        className="CancelarFormButton"
                                                        onClick={handleroute(
                                                            "./seguridadData"
                                                        )}>
                                                        Ir a seguridad
                                                    </button>
                                                    <button
                                                        className="GuardarFormButton"
                                                        onClick={handleroute(
                                                            "/"
                                                        )}>
                                                        Ir al inicio
                                                    </button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <ModalMensajes
                                            shown={showModal}
                                            close={handleModalClose}
                                            titulo={tituloMensajes}
                                            mensaje={textoMensajes}
                                            tipo="error"
                                        />
                                        <ModalMensajesWishListControl
                                            shown={showModalMensajesCtlr}
                                            close={() => {}}
                                            titulo={tituloMensajesCtlr}
                                            mensaje={textoMensajesCtlr}
                                            backdrop="static"
                                            keyboard={false}
                                        />
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
