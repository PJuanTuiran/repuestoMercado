import Container from "../../components/layouts/Container";
import { Grid, useMediaQuery, useTheme, Button } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { URL_BD_MR } from "../../helpers/Constants";
import { RiSettings5Fill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { getLeeIra } from "../../store/leeira/action";
import ModalMensajesShoppingCart from "../../pages/mensajes/ModalMensajesShoppingCart";

import LateralMenu from "../../pages/LateralMenu";
import MenuIcon from "@material-ui/icons/Menu";
import { getUserMenuPrimary } from "../../store/usermenuprimary/action";
import { getCloseMenu } from "../../store/closemenu/action";

import firebase from "../../utilities/firebase";
import { getAuth, signOut } from "firebase/auth";

export default function opinionesVendedor() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const router = useRouter();
    const irA = useRef(null); //PosiciónTopPage
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    //console.log("Datos usuario vendedor: ", datosusuarios);
    const [tiempoComoVendedor, setTiempoComoVendedor] = useState("");
    const [nombreVendedor, setNombreVendedor] = useState(""); //Nombrevendedor
    const [idVendedor, setIdVendedor] = useState(""); //Nombrevendedor
    const [numeroVentas, setNumeroVentas] = useState(0); //estado para guardar ventas cantidad

    const [showModalMensajesShoppingCart, setShowModalMensajesShoppingCart] =
        useState(false);
    const [tituloMensajesShoppingCart, setTituloMensajesShoppingCart] =
        useState(false);
    const [textoMensajesShoppingCart, setTextoMensajesShoppingCart] =
        useState(false);

    // Estado para almacenar la dirección más reciente
    const [ciudadVendedor, setCiudadVendedor] = useState("");
    const [departamentoVendedor, setDepartamentoVendedor] = useState("");
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    // Estado para almacenar las calificaciones
    const [calificaciones, setCalificaciones] = useState([]);
    // Estado para almacenar la calificación promedio
    const [calificacionPromedio, setCalificacionPromedio] = useState(0);

    const [sombraOpen, setSombraOpen] = useState("");
    const [sombraOpenDos, setSombraOpenDos] = useState("contCalificaciones");
    const [sombraOpenTres, setSombraOpenTres] = useState(
        "renderCalificaciones"
    );

    const [controlImg, setControlImg] = useState("");
    const [disabledImg, setDisabledImg] = useState("menulateralcuatro");
    const [closeOpen, setcloseOpen] = useState(false);
    const activausermenu = useSelector((state) => state.usermenu.usermenu);
    const closemenu = useSelector((state) => state.closemenu.closemenu);

    let vendedor = 0;

    if (typeof window !== "undefined") {
        if (router.query.vendedor) {
            const auth = getAuth(firebase);
            signOut(auth).then(() => {
                console.log("Sesión Cerrada")
            }).catch((error) => {
                console.log("Error Cerrando Sesión")
            });
            vendedor = JSON.parse(router.query.vendedor);
        }
    }

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        if ((!datosusuarios.uid || datosusuarios.uid == 0) && vendedor) {
            /* Guarda datos del producto que se debe agregar al localstorage */
            localStorage.setItem("ira", JSON.stringify(7));
            localStorage.setItem("rutaira", JSON.stringify(router.pathname));

            dispatch(getLeeIra(7));

            setShowModalMensajesShoppingCart(true);
            setTituloMensajesShoppingCart(
                "¡Bienvenido! Para ir a opiniones vendedor debes ingresar a tu cuenta"
            );
            let texto = "";
            setTextoMensajesShoppingCart(texto);
            //setLogin(true);
            return;
        }
    }, []);

    //Función para obtener, nombre de vendedor, número de ventas y tiempo como vendedor
    useEffect(() => {
        const obtenerDatosVendedor = async () => {
            let usuario = 0;
            if (vendedor > 0) usuario = vendedor;
            else usuario = datosusuarios.uid;

            let params = {
                uidvendedor: usuario,
            };
            try {
                console.log(
                    "Enviando solicitud a endPoint 106 con params: ",
                    params
                );
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "106",
                    params,
                });
                console.log("Respuesta recibida del endPoint 106: ", res.data);

                // Mapeo de los datos
                if (res.data && res.data.listarmisventas) {
                    // Asumiendo que todos los objetos son ventas del mismo vendedor
                    setNumeroVentas(res.data.listarmisventas.length);
                    const vendedor = res.data.listarmisventas[0];
                    // Asumiendo que vendedor.uid es "1652703118227"
                    const ultimoCincoDigitos = vendedor.uidvendedor.slice(-7);
                    setNombreVendedor(ultimoCincoDigitos);
                }
            } catch (error) {
                console.error(
                    "Error al leer los datos del vendedor en endPoint 106",
                    error
                );
                // Maneja el error según tus necesidades
            }
        };
        obtenerDatosVendedor();
    }, [datosusuarios]);

    //Función para calcular el tiempo que lleva como vendedor
    useEffect(() => {
        const fechaCreacionVendedor = async () => {
            let usuario = 0;
            if (vendedor > 0) usuario = vendedor;
            else usuario = datosusuarios.uid;

            let params = {
                usuario: usuario,
            };
            try {
                console.log(
                    "Enviando solicitud a tuEndPoint con params: ",
                    params
                );
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });
                console.log("Respuesta recibida de tuEndPoint: ", res.data);

                if (res.data && res.data.length > 0) {
                    const fechaCreacion = moment(
                        res.data[0].fechacreacion,
                        "YYYY-MM-DD HH:mm:ss"
                    );

                    if (fechaCreacion.isValid()) {
                        const fechaActual = moment();
                        const diferenciaEnDias = fechaActual.diff(
                            fechaCreacion,
                            "days"
                        );

                        if (diferenciaEnDias < 365) {
                            setTiempoComoVendedor(`${diferenciaEnDias} días`);
                        } else {
                            const duracion = moment.duration(
                                diferenciaEnDias,
                                "days"
                            );
                            const years = duracion.years();
                            const remainingDays = duracion.days();

                            setTiempoComoVendedor(
                                `${years} año${
                                    years !== 1 ? "s" : ""
                                } y ${remainingDays} día${
                                    remainingDays !== 1 ? "s" : ""
                                }`
                            );
                        }
                    } else {
                        console.error("La fecha de creación no es válida.");
                    }
                } else {
                    console.error(
                        "No se encontraron datos del usuario en tuEndPoint."
                    );
                }
            } catch (error) {
                console.error(
                    "Error al leer los datos del usuario en tuEndPoint",
                    error
                );
                // Maneja el error según tus necesidades
            }
        };

        fechaCreacionVendedor();
    }, [datosusuarios]);

    //Función para conocer ubicación del comprador
    useEffect(() => {
        const obtenerDireccionVendedor = async () => {
            let usuario = 0;
            if (vendedor > 0) usuario = vendedor;
            else usuario = datosusuarios.uid;

            let params = {
                usuario: usuario,
            };

            try {
                console.log(
                    "Enviando solicitud a endPoint 65 con params: ",
                    params
                );
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "65",
                    params,
                });
                console.log("Respuesta recibida del endPoint 65: ", res.data);

                // Mapeo de los datos
                if (res.data && res.data.listardireccionesusuario) {
                    // Ordenamos las direcciones por fecha de creación y tomamos la más reciente
                    const direccionesOrdenadas =
                        res.data.listardireccionesusuario.sort(
                            (a, b) =>
                                new Date(b.fechacreacion) -
                                new Date(a.fechacreacion)
                        );
                    setCiudadVendedor(direccionesOrdenadas[0].nombreciudad);

                    // Convertir el nombre del departamento a formato de título
                    let departamento =
                        direccionesOrdenadas[0].nombre_dep.toLowerCase();
                    departamento =
                        departamento.charAt(0).toUpperCase() +
                        departamento.slice(1);
                    setDepartamentoVendedor(departamento);
                }
            } catch (error) {
                console.error(
                    "Error al leer los datos del vendedor en endPoint 65",
                    error
                );
                // Maneja el error según tus necesidades
            }
        };
        obtenerDireccionVendedor();
    }, [datosusuarios]);

    //console.log("Ciudad vendedor: ", ciudadVendedor)
    //console.log("Departamento vendedor: ", departamentoVendedor)
    //console.log("Dias como vendedor: ", diasComoVendedor)

    //función para obtener las calificaciones del vendedor
    useEffect(() => {
        const obtenerCalificacionesVendedor = async () => {
            let usuario = 0;
            if (vendedor > 0) usuario = vendedor;
            else usuario = datosusuarios.uid;

            let params = {
                uidvendedor: usuario,
            };

            try {
                console.log(
                    "Enviando solicitud a endPoint 502 con params: ",
                    params
                );
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "502",
                    params,
                });
                console.log("Respuesta recibida del endPoint 502: ", res.data);

                // Mapeo de los datos
                if (res.data && res.data.listarcalprdvendedor) {
                    setCalificaciones(res.data.listarcalprdvendedor);

                    // Calcular la calificación promedio
                    const sumaCalificaciones =
                        res.data.listarcalprdvendedor.reduce(
                            (suma, calificacion) =>
                                suma + calificacion.calificacion,
                            0
                        );
                    const promedio =
                        sumaCalificaciones /
                        res.data.listarcalprdvendedor.length;
                    setCalificacionPromedio(promedio);
                }
            } catch (error) {
                console.error(
                    "Error al leer los datos del vendedor en endPoint 502",
                    error
                );
                // Maneja el error según tus necesidades
            }
        };
        obtenerCalificacionesVendedor();
    }, [datosusuarios]);

    //Seleccionar funcion por mas antiguo o mas nuevo
    const handleSelect = (eventKey) => {
        setSelectedSortOption(eventKey);

        if (eventKey === "Más antiguo") {
            setCalificaciones((prevCalificaciones) =>
                [...prevCalificaciones].sort(
                    (a, b) =>
                        new Date(a.fechacreacion) - new Date(b.fechacreacion)
                )
            );
        } else if (eventKey === "Más reciente") {
            setCalificaciones((prevCalificaciones) =>
                [...prevCalificaciones].sort(
                    (a, b) =>
                        new Date(b.fechacreacion) - new Date(a.fechacreacion)
                )
            );
        } else if (eventKey === "Mayor calificación") {
            setCalificaciones((prevCalificaciones) =>
                [...prevCalificaciones].sort(
                    (a, b) => b.calificacion - a.calificacion
                )
            );
        } else if (eventKey === "Menor calificación") {
            setCalificaciones((prevCalificaciones) =>
                [...prevCalificaciones].sort(
                    (a, b) => a.calificacion - b.calificacion
                )
            );
        }
    };

    //Button de dropdown
    const CustomDropdownButton = React.forwardRef(
        ({ children, onClick }, ref) => (
            <button
                ref={ref}
                onClick={onClick}
                className="dropdowncustomMiscomprasPersButton">
                {selectedSortOption ? `${selectedSortOption}` : "Ordenar por"}
            </button>
        )
    );

    // Función para enviar mensajes
    useEffect(() => {
        setcloseOpen(false);
        setSombraOpen("");
        setSombraOpenDos("contCalificaciones");
        setSombraOpenTres("renderCalificaciones");
        //setDisabledImg("");
    }, [activausermenu]);

    useEffect(() => {
        if (closemenu) {
            setcloseOpen(false);
            setSombraOpen("");
            setSombraOpenDos("contCalificaciones");
            setSombraOpenTres("renderCalificaciones");
            //setDisabledImg("");
            dispatch(getCloseMenu(false));
        }
    }, [closemenu]);

    const closeOpenMenu = () => {
        setcloseOpen(true);
        setSombraOpen("disablemyaccountcuatro3");

        setSombraOpenDos("contCalificacionesDisable");
        setSombraOpenTres("renderCalificacionesDisable");
        setControlImg("disabledimg");
        dispatch(getUserMenuPrimary(false));
    };

    useEffect(() => {
        if (closeOpen) {
            setDisabledImg("menulateralcinco");
        } else {
            setDisabledImg("menulateralcuatro");
            setControlImg("");
        }
    }, [closeOpen]);

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
                            <div
                                className="ps-page__content ps-account"
                                style={{ marginBottom: "18rem" }}>
                                <div className="mtmenos30">
                                    <Grid container spacing={1}>
                                        <Grid item xs={1} md={1} lg={1}>
                                            <Button
                                                variant="outline-light"
                                                onClick={() => closeOpenMenu()}
                                                style={{
                                                    backgroundColor:
                                                        "transparent",
                                                }}>
                                                <div className={disabledImg}>
                                                    <MenuIcon className="menuproperty" />
                                                </div>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={8} md={8} lg={8}>
                                            <div className="titlesformsUsersCuatro">
                                                <div className="textomisfacturas">
                                                    <p>
                                                        Mis opiniones como
                                                        vendedor
                                                    </p>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <div className="mtmenos20">
                                                    {closeOpen ? (
                                                        <LateralMenu />
                                                    ) : null}
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>

                                <div className={sombraOpen}>
                                    <Grid
                                        className="contMainOpiniones"
                                        container
                                        style={{
                                            width: isMdDown ? "100%" : "94%",
                                        }}
                                        display={"flex"}
                                        flexDirection={"column"}>
                                        <div className="dataContVendedor">
                                            <div className="dataVendedor">
                                                <div>
                                                    <p className="titleDataVend">
                                                        Vendedor:{" "}
                                                    </p>{" "}
                                                    {/*UID VENDEDOR */}
                                                    <p className="infotitleDataVend">
                                                        {nombreVendedor}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="titleDataVend">
                                                        Tiempo como vendedor:{" "}
                                                    </p>
                                                    <p className="infotitleDataVend">
                                                        {tiempoComoVendedor}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="titleDataVend">
                                                        Número de ventas:{" "}
                                                    </p>
                                                    <p className="infotitleDataVend">
                                                        {numeroVentas}
                                                    </p>
                                                </div>
                                                <p className="infotitleDataVend">
                                                    {ciudadVendedor},{" "}
                                                    {departamentoVendedor}
                                                </p>
                                            </div>
                                            <div className="cantCalificaciones">
                                                <div className="SubcontCalificOpinionesV">
                                                    <p className="SubcontCalificOpinionesVP">
                                                        {" "}
                                                        {calificacionPromedio.toFixed(
                                                            1
                                                        )}
                                                    </p>
                                                    <div className="contnumbercalifics">
                                                        <div className="iconsOpinVend">
                                                            {[
                                                                1, 2, 3, 4, 5,
                                                            ].map((index) => (
                                                                <RiSettings5Fill
                                                                    key={index}
                                                                    size={22}
                                                                    className={
                                                                        index <=
                                                                        Math.floor(
                                                                            calificacionPromedio
                                                                        )
                                                                            ? "iconoConfOpiVn colorRojo"
                                                                            : "iconoConfOpiVn"
                                                                    }
                                                                />
                                                            ))}
                                                        </div>
                                                        <p>
                                                            {
                                                                calificaciones.length
                                                            }{" "}
                                                            calificaciones
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={sombraOpenDos}>
                                            <div className="toPcontCalificaciones">
                                                <p>Tus opiniones</p>
                                                <Dropdown
                                                    onSelect={handleSelect}
                                                    className="dropOpiniones">
                                                    <Dropdown.Toggle
                                                        as={
                                                            CustomDropdownButton
                                                        }
                                                        id="dropdown-basic">
                                                        {selectedSortOption
                                                            ? `Ordenar por ${selectedSortOption}`
                                                            : "Ordenar por"}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="tamañocajaoptionsVendedor">
                                                        <Dropdown.Item
                                                            eventKey="Más antiguo"
                                                            className="itemsdropdownVerVenta">
                                                            Más antiguo
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            eventKey="Más reciente"
                                                            className="itemsdropdownVerVenta">
                                                            Más reciente
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            eventKey="Mayor calificación"
                                                            className="itemsdropdownVerVenta">
                                                            Mayor calificación
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            eventKey="Menor calificación"
                                                            className="itemsdropdownVerVenta">
                                                            Menor calificación
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>

                                            <div className={sombraOpenTres}>
                                                {calificaciones.map(
                                                    (calificacion, index) => (
                                                        <div
                                                            className="subCmainComentarios"
                                                            key={index}>
                                                            <div className="subCmainComentarios2">
                                                                <div className="subCmainIconos">
                                                                    <div>
                                                                        {[
                                                                            1,
                                                                            2,
                                                                            3,
                                                                            4,
                                                                            5,
                                                                        ].map(
                                                                            (
                                                                                index
                                                                            ) => (
                                                                                <RiSettings5Fill
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    size={
                                                                                        18
                                                                                    }
                                                                                    className={
                                                                                        index <=
                                                                                        calificacion.calificacion
                                                                                            ? "iconoConfOpiVn colorRojo"
                                                                                            : "iconoConfOpiVn"
                                                                                    }
                                                                                />
                                                                            )
                                                                        )}
                                                                    </div>
                                                                    <p>
                                                                        {calificacion.fechacreacion
                                                                            ? calificacion.fechacreacion.slice(
                                                                                  0,
                                                                                  10
                                                                              )
                                                                            : ""}
                                                                    </p>
                                                                </div>
                                                                {calificacion.comentario && (
                                                                    <div className="comentClif">
                                                                        <p>
                                                                            Comentario
                                                                            de
                                                                            la
                                                                            calificación:
                                                                        </p>
                                                                        <p>
                                                                            {
                                                                                calificacion.comentario
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
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
