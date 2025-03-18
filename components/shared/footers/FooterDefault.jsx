import React, { useEffect, useState, useRef } from "react";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { URL_IMAGES_RESULTSSMS } from "../../../helpers/Constants";
import { useDispatch, useSelector } from "react-redux";
import { getCtlrInput } from "~/store/ctlrinput/action";

const FooterDefault = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const openclosecity = useSelector(
        (state) => state.openclosecity.openclosecity
    );
    const [classCity, setClassCity] = useState("FooterWebPage");

    // Asignamos Datos al arreglo de Usuarios desde el state

    useEffect(() => {
        if (openclosecity == 1) {
            setClassCity("FooterWebPageOpenCity");
        } else if (openclosecity == 2) {
            setClassCity("FooterWebPageOpenCityDos");
        } else {
            setClassCity("FooterWebPage");
        }
    }, [openclosecity]);

    const handleClick = () => {
        dispatch(getCtlrInput(true));
    };

    const locationComprar = () => {
        router.push("/");
        location.reload();
    }

    return (
        <div>
            <footer className={classCity}>
                <Grid
                    container
                    style={{ width: "100%" }}
                    className="SubFooterWebPage">
                    <div className="SubcMainFooter">
                        <div className="footerDataMain">
                            <p>
                                HAZ PARTE DE NUESTRO <br /> EQUIPO
                            </p>
                            <div className="footerData">
                                <span
                                    onClick={() =>
                                        router
                                            .push({ pathname: "/my-account" })
                                            .then(() =>
                                                window.location.reload()
                                            )
                                    }>
                                    Registrarme
                                </span>
                                <span
                                    onClick={() =>
                                        router
                                            .push({ pathname: "/loginaccount" })
                                            .then(() =>
                                                window.location.reload()
                                            )
                                    }>
                                    Iniciar sesión
                                </span>
                                <span
                                    onClick={() =>
                                        router.push({
                                            pathname:
                                                "/CreateProduct/createproduct",
                                        })
                                    }>
                                    Vender
                                </span>
                                <span
                                    onClick={() =>
                                        router.push({ pathname: "/" })
                                    }>
                                    Comprar
                                </span>
                            </div>
                        </div>

                        <div className="footerDataMain ">
                            <p>AYUDA</p>
                            <div className="footerData2">
                                {
                                    /*
                                    <span
                                    onClick={() =>
                                        router.push({
                                            pathname: "/ResolverDudas",
                                        })
                                    }>
                                    Necesito ayuda
                                </span>
                                    */
                                }
                                <span
                                    onClick={() =>
                                        router.push({ pathname: "/PQR" })
                                    }>
                                    PQRS
                                </span>
                                <span
                                    onClick={() =>
                                        router.push({
                                            pathname: "/ResolverDudas",
                                        })
                                    }>
                                    Centro de ayuda
                                </span>
                                <span>Terminos y condiciones</span>
                                <span>Tratamiento de datos</span>
                            </div>
                        </div>

                        <div className="footerDataMain">
                            <p>SECCIONES POPULARES</p>
                            <div className="footerData2">
                                <span
                                    onClick={() =>
                                        router.push({
                                            pathname:
                                                "/searchinteractive/searchinteractive",
                                        })
                                    }>
                                    Buscador interactivo{" "}
                                </span>
                                <span
                                    onClick={() =>
                                        router.push({
                                            pathname:
                                                "/CreateProduct/createproduct",
                                        })
                                    }>
                                    Vender
                                </span>
                                <span
                                    onClick={() => locationComprar()}>
                                    Comprar
                                </span>
                                <div
                                    onClick={() => handleClick()}
                                >
                                    <span>Categorías</span>
                                </div>

                            </div>
                        </div>
                        <div className="footerDataMainContactanos footerDataMain">
                            <p>CONTÁCTANOS</p>
                            <div className="footerData2">
                                <span
                                    onClick={() =>
                                        router.push({ pathname: "/PQR" })
                                    }>
                                    PQRS
                                </span>
                                <span>Facebook</span>
                                <span>Instagram</span>
                                <span>Tiktok</span>
                                <span>Youtube</span>
                            </div>
                        </div>
                        <div className="footerDataMain footerDataMainIMG">
                            <img
                                src={
                                    URL_IMAGES_RESULTSSMS +
                                    "/imgmr/logomrblanco.png"
                                }
                                alt=""
                            />
                        </div>
                    </div>

                    <Grid
                        container
                        style={{ width: "100%" }}
                        className="SubInfoMediosPagoFooter">
                        <Grid
                            container
                            style={{ width: "90%" }}
                            className="infoContainerFooter"
                            display={"flex"}
                            justifyContent={"space-between"}>
                            <div className="mainMedioPagoFooter">
                                <p>Medios de pago:</p>
                                <div className="medioPagoFooter">
                                    <img
                                        src={
                                            URL_IMAGES_RESULTSSMS +
                                            "/imgmr/Efecty.png"
                                        }
                                        alt=""
                                    />
                                    <img
                                        src={
                                            URL_IMAGES_RESULTSSMS +
                                            "/imgmr/Nequi.png"
                                        }
                                        alt=""
                                    />
                                    <img
                                        src={
                                            URL_IMAGES_RESULTSSMS +
                                            "/imgmr/Mastercard.png"
                                        }
                                        alt=""
                                    />
                                    <img
                                        src={
                                            URL_IMAGES_RESULTSSMS +
                                            "/imgmr/Bancolombia.png"
                                        }
                                        alt=""
                                    />
                                    <img
                                        src={
                                            URL_IMAGES_RESULTSSMS +
                                            "/imgmr/PSE.png"
                                        }
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="Wompi">
                                <img
                                    src={
                                        URL_IMAGES_RESULTSSMS +
                                        "/imgmr/Wompi.png"
                                    }
                                    alt=""
                                />
                            </div>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        style={{ width: "100%" }}
                        className="DerechosContainerMain">
                        <Grid
                            container
                            style={{ width: "90%" }}
                            className="DerechosContainer"
                            display={"flex"}
                            justifyContent={"center"}>
                            <p>
                                Todos los derechos reservados de Mercado
                                Repuesto 2024©
                            </p>
                        </Grid>
                    </Grid>
                </Grid>
            </footer>
        </div>
    );
};

export default FooterDefault;
