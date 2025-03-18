import Container from "../../components/layouts/Container";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AiOutlineRight } from "react-icons/ai";
import { URL_BD_MR } from "../../helpers/Constants";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import ModalMensajesWishListControl from "../mensajes/ModalMensajesWishListControl";
import ModalMensajesSoyNuevo from "../mensajes/ModalMensajesSoyNuevo";
import BuscarComponente from "./BuscarComponente";
import { getLeeIra } from "../../store/leeira/action";
import ModalMensajesShoppingCart from "../../pages/mensajes/ModalMensajesShoppingCart";

export default function index() {
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const irA = useRef(null); //PosiciónTopPage
    const dispatch = useDispatch();
    const [showModalMensajesCtlr, setShowModalMensajesCtlr] = useState(false);

    const [showModalMensajesShoppingCart, setShowModalMensajesShoppingCart] =
        useState(false);
    const [tituloMensajesShoppingCart, setTituloMensajesShoppingCart] =
        useState(false);
    const [textoMensajesShoppingCart, setTextoMensajesShoppingCart] =
        useState(false);

    const [tituloMensajesCtlr, setTituloMensajesCtlr] = useState("");
    const [textoMensajesCtlr, setTextoMensajesCtlr] = useState("");
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [isUserLogged, setIsUserLogged] = useState(false);
    const router = useRouter();

    const [datosNivelUno, setDatosNivelUno] = useState([]);
    const [datosNivelDos, setDatosNivelDos] = useState([]);
    const [datosNivelTres, setDatosNivelTres] = useState([]);
    const [datosNivelCuatro, setDatosNivelCuatro] = useState([]);

    const [nombreNivelCero1, setNombreNivelCero1] = useState("");
    const [nombreNivelCero2, setNombreNivelCero2] = useState("");
    const [nombreNivelCero3, setNombreNivelCero3] = useState("");
    const [nombreNivelCero4, setNombreNivelCero4] = useState("");
    const [nombreNivelCero5, setNombreNivelCero5] = useState("");

    const [nombreNivelUno1, setNombreNivelUno1] = useState("");
    const [nombreNivelUno2, setNombreNivelUno2] = useState("");
    const [nombreNivelUno3, setNombreNivelUno3] = useState("");
    const [nombreNivelUno4, setNombreNivelUno4] = useState("");

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
                "¡Bienvenido! Para ir a resolver dudas debes ingresar a tu cuenta"
            );
            let texto = "";
            setTextoMensajesShoppingCart(texto);
            //setLogin(true);
            return;
        }
    }, []);

    //Usefect para conocer si el usuario está loggeado o no
    useEffect(() => {
        if (!datosusuarios.uid || datosusuarios.uid == 0) {
            setIsUserLogged(false);
        } else {
            setIsUserLogged(true);
        }
    }, [datosusuarios.uid]);

    //función para redireccionar usurio a resolver dudas cuando se loggee
    const handleButtonClick = (ruta) => {
        if (!isUserLogged) {
            dispatch(getLeeIra(12));
            localStorage.setItem("ira", JSON.stringify(12));
            let itemsresolverdudas = {
                ruta: "/ResolverDudas",
            };
            localStorage.setItem(
                "itemsresolverdudas",
                JSON.stringify(itemsresolverdudas)
            );

            setShowModalMensajesCtlr(true);
            setTituloMensajesCtlr("Dispositivos vinculados");
            let texto =
                "¡Bienvenido! Para ver tus dispositivos vinculados primero debes iniciar sesión o registrarte.";
            setTextoMensajesCtlr(texto);
        } else {
            router.push({ pathname: ruta });
        }
    };

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "116",
                });
                const datosNivelUno = res.data.resolverdudasdos.filter(
                    (dato) => dato.niveluno === 1
                );
                const datosNivelDos = res.data.resolverdudasdos.filter(
                    (dato) => dato.niveluno === 2
                );
                const datosNivelTres = res.data.resolverdudasdos.filter(
                    (dato) => dato.niveluno === 3
                );
                const datosNivelCuatro = res.data.resolverdudasdos.filter(
                    (dato) => dato.niveluno === 4
                );
                setDatosNivelUno(datosNivelUno);
                setDatosNivelDos(datosNivelDos);
                setDatosNivelTres(datosNivelTres);
                setDatosNivelCuatro(datosNivelCuatro);
            } catch (error) {
                console.error("Error al leer los datos", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerDatos();

        const datosNivelCero = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "176",
                });

                //console.log("DATOS NIVEL CERO", res.data);
                setNombreNivelCero1(res.data.resolverdudascero[0].nombrenivelcero);
                setNombreNivelCero2(res.data.resolverdudascero[1].nombrenivelcero);
                setNombreNivelCero3(res.data.resolverdudascero[2].nombrenivelcero);
                setNombreNivelCero4(res.data.resolverdudascero[3].nombrenivelcero);
                setNombreNivelCero5(res.data.resolverdudascero[4].nombrenivelcero);

            } catch (error) {
                console.error("Error al leer los datos", error);
                // Maneja el error según tus necesidades
            }
        };
        datosNivelCero();

        const datosNivelUno = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "115",
                });

                //console.log("DATOS NIVEL CERO", res.data);
                setNombreNivelUno1(res.data.resolverdudasuno[0].nombreniveluno);
                setNombreNivelUno2(res.data.resolverdudasuno[1].nombreniveluno);
                setNombreNivelUno3(res.data.resolverdudasuno[2].nombreniveluno);
                setNombreNivelUno4(res.data.resolverdudasuno[3].nombreniveluno);

            } catch (error) {
                console.error("Error al leer los datos", error);
                // Maneja el error según tus necesidades
            }
        };
        datosNivelUno();
    }, []);

    return (
        <>
        {
            console.log("datosNivelUno : ", datosNivelUno)
        }
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <ModalMensajesSoyNuevo
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
                                <Grid
                                    className="contMainOpiniones"
                                    container
                                    style={{ width: isMdDown ? "100%" : "87%" }}
                                    display={"flex"}
                                    flexDirection={"column"}>
                                    <div className="TitleOpVend">
                                        <p>{nombreNivelCero1}</p>
                                    </div>
                                    <div className="contMainResolverDudas">
                                        <BuscarComponente />

                                        <div className="sobreComprarDudas">
                                            <div className="contTitulo ">
                                                <p>{nombreNivelCero2}</p>
                                            </div>
                                            <div
                                                onClick={() =>
                                                    handleButtonClick(
                                                        "../MisCompras/misCompras"
                                                    )
                                                }
                                                className="contTitulosDudas startContDudas">
                                                <p>{nombreNivelUno1}</p>
                                                <AiOutlineRight
                                                    size={27}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                />
                                            </div>
                                           
                                            {datosNivelUno
                                                .slice(0, 2)
                                                .map((dato) => (
                                                    <div
                                                        className="contTitulosDudas"
                                                        onClick={() =>
                                                            router.push({
                                                                pathname: `../ResolverDudas/respuestas`,
                                                                query: {
                                                                    dato: JSON.stringify(
                                                                        dato
                                                                    ),
                                                                },
                                                            })
                                                        }>
                                                        <p>
                                                            {
                                                                dato.nombreniveldos
                                                            }
                                                        </p>
                                                        <AiOutlineRight
                                                            size={27}
                                                        />
                                                    </div>
                                                ))}

                                            <div
                                                onClick={() =>
                                                    router.push({
                                                        pathname:
                                                            "../ResolverDudas/dudasCompras",
                                                    })
                                                }
                                                className="contTitulosDudas endContDudas">
                                                <p>Ver más opciones</p>
                                                <AiOutlineRight size={27} />
                                            </div>
                                        </div>

                                        <div className="sobreComprarDudas SobreVenderCont">
                                            <div className="contTitulo">
                                                <p>{nombreNivelCero3}</p>
                                            </div>
                                            <div
                                                onClick={() =>
                                                    handleButtonClick(
                                                        "../MisVentas/misVentas"
                                                    )
                                                }
                                                className="contTitulosDudas startContDudas">
                                                <p>{nombreNivelUno2}</p>
                                                <AiOutlineRight
                                                    size={27}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                />
                                            </div>

                                            {datosNivelDos
                                                .slice(0, 2)
                                                .map((dato) => (
                                                    <div
                                                        className="contTitulosDudas"
                                                        onClick={() =>
                                                            router.push({
                                                                pathname: `../ResolverDudas/respuestas`,
                                                                query: {
                                                                    dato: JSON.stringify(
                                                                        dato
                                                                    ),
                                                                },
                                                            })
                                                        }>
                                                        <p>
                                                            {
                                                                dato.nombreniveldos
                                                            }
                                                        </p>
                                                        <AiOutlineRight
                                                            size={27}
                                                        />
                                                    </div>
                                                ))}

                                            <div
                                                onClick={() =>
                                                    router.push({
                                                        pathname:
                                                            "../ResolverDudas/dudasVentas",
                                                    })
                                                }
                                                className="contTitulosDudas endContDudas">
                                                <p>Ver más opciones</p>
                                                <AiOutlineRight size={27} />
                                            </div>
                                        </div>

                                        <div className="sobreComprarDudas sobreMiCuentaCont">
                                            <div className="contTitulo ">
                                                <p>{nombreNivelCero4}</p>
                                            </div>
                                            <div
                                                className="contTitulosDudas startContDudas"
                                                onClick={() =>
                                                    handleButtonClick(
                                                        "../EditUsers/MisDatos"
                                                    )
                                                }>
                                                <p>{nombreNivelUno3}</p>
                                                <AiOutlineRight
                                                    size={27}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                />
                                            </div>

                                            {datosNivelTres
                                                .slice(0, 2)
                                                .map((dato) => (
                                                    <div
                                                        className="contTitulosDudas"
                                                        onClick={() =>
                                                            router.push({
                                                                pathname: `../ResolverDudas/respuestas`,
                                                                query: {
                                                                    dato: JSON.stringify(
                                                                        dato
                                                                    ),
                                                                },
                                                            })
                                                        }>
                                                        <p>
                                                            {
                                                                dato.nombreniveldos
                                                            }
                                                        </p>
                                                        <AiOutlineRight
                                                            size={27}
                                                        />
                                                    </div>
                                                ))}

                                            <div
                                                onClick={() =>
                                                    router.push({
                                                        pathname:
                                                            "../ResolverDudas/dudasDatos",
                                                    })
                                                }
                                                className="contTitulosDudas endContDudas">
                                                <p>Ver más opciones</p>
                                                <AiOutlineRight size={27} />
                                            </div>
                                        </div>
                                        <div className="sobreComprarDudas">
                                            <div className="contTitulo ">
                                                <p>{nombreNivelCero5}</p>
                                            </div>
                                            {datosNivelCuatro
                                                .slice(0, 2)
                                                .map((dato) => (
                                                    <div
                                                        className="contTitulosDudas"
                                                        onClick={() =>
                                                            router.push({
                                                                pathname: `../ResolverDudas/respuestas`,
                                                                query: {
                                                                    dato: JSON.stringify(
                                                                        dato
                                                                    ),
                                                                },
                                                            })
                                                        }>
                                                        <p>
                                                            {
                                                                dato.nombreniveldos
                                                            }
                                                        </p>
                                                        <AiOutlineRight
                                                            size={27}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </Grid>
                                <ModalMensajesWishListControl
                                    shown={showModalMensajesCtlr}
                                    close={() => { }}
                                    titulo={tituloMensajesCtlr}
                                    mensaje={textoMensajesCtlr}
                                    backdrop="static"
                                    keyboard={false}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
