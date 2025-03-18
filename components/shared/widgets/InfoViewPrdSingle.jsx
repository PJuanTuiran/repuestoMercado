import React, { useEffect } from "react";
import { Box, Grid, Button } from "@mui/material";
import logobancolombia from "../../../public/static/img/logobancolombia.jpg";
import logonequi from "../../../public/static/img/logonequi.jpg";
import { useRouter } from "next/router";
import { getViewCheckout } from "../../../store/viewcheckout/action";
import { useSelector, useDispatch } from "react-redux";

const InfoViewPrdSingle = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    
    const comprainteractiva = () => {
        if (router.pathname != "/searchinteractive/searchinteractive") {
            router.replace("/searchinteractive/searchinteractive");
            router.push("/searchinteractive/searchinteractive");
        } else {
            router.replace("/searchinteractive/searchinteractive");
            router.push("/searchinteractive/searchinteractive");
            location.reload();
        }
    };

    const teAyudamos = () => {
        console.log("ASASASAS");
    };

    useEffect(() => {
        dispatch(getViewCheckout(false));
    }, [])

    return (
        <div className="ps-product--extension">
            <div className="cajainfoviewprdsingle">
                <div className="ps-delivery__item">¿No es lo que buscas?</div>
                <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    className="cajalinkfindviewprdsingle apuntador mb-10"
                    onClick={() => comprainteractiva()}>
                    <Grid item xs={2} md={2} lg={2}>
                        <a>
                            <i
                                className="iconomotocajalink fa fa-car"
                                aria-hidden="true"></i>
                        </a>
                    </Grid>
                    <Grid item xs={8} md={8} lg={8}>
                        <p className="textolinkfindviewprdsingle">
                            Busca coincidencias
                        </p>
                    </Grid>
                    <Grid item xs={3} md={3} lg={3} className="mtmenos20">
                        <a>
                            <i
                                className="iconomotocajalink fa fa-motorcycle"
                                aria-hidden="true"></i>
                        </a>
                    </Grid>
                    <Grid item xs={8} md={8} lg={8}>
                        <p className="textolinkfindviewprdsingle mtmenos20">
                            con tu vehículo
                        </p>
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={1}
                    className="mt-4 pl-10 teayudamos"
                    onClick={() => teAyudamos()}>
                    <Grid container>
                        <Grid item xs={10} md={10} lg={10}>
                            Nosotros te ayudamos a garantizar la seguridad de tu
                            dinero, conoce aquí
                        </Grid>
                        <Grid item xs={2} md={2} lg={2}>
                            <i
                                className="tamañoflechateayudamos fa fa-chevron-right"
                                aria-hidden="true"></i>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={1}
                    className="mt-4 pl-10 teayudamos"
                    onClick={() => teAyudamos()}>
                    <Grid container>
                        <Grid item xs={10} md={10} lg={10}>
                            Nosotros te ayudamos en caso de devolución, conoce
                            más aquí.
                        </Grid>
                        <Grid item xs={2} md={2} lg={2}>
                            <i
                                className="tamañoflechateayudamos fa fa-chevron-right"
                                aria-hidden="true"></i>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={1}
                    className="mt-2 mb-1 pl-10"
                    onClick={() => teAyudamos()}>
                    <Grid item xs={12} md={12} lg={12}>
                        Medios de pago:
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={1}
                    className="mt-0 pl-10"
                    onClick={() => teAyudamos()}>
                    <Grid item xs={2} md={2} lg={2}>
                        <a className="cursordisable">
                            <i className="fa fa-university" aria-hidden="true"></i>
                        </a>
                    </Grid>
                    <Grid item xs={10} md={10} lg={10}>
                        <a>
                            <h3 className="textomediosdepago">
                                Transferencias por PSE
                            </h3>
                        </a>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={1}
                    className="mt-0 pl-10"
                    onClick={() => teAyudamos()}>
                    <Grid item xs={2} md={2} lg={2}>
                        <a className="cursordisable">
                            <i className="cursordisable fa fa-credit-card" aria-hidden="true"></i>
                        </a>
                    </Grid>
                    <Grid item xs={10} md={10} lg={10}>
                        <a>
                            <h3 className="textomediosdepago">
                                Tarjeta de crédito
                            </h3>
                        </a>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={1}
                    className="mt-0 pl-10"
                    onClick={() => teAyudamos()}>
                    <Grid item xs={2} md={2} lg={2}>
                        <a className="cursordisable">
                            <i className="cursordisable fa fa-money" aria-hidden="true"></i>
                        </a>
                    </Grid>
                    <Grid item xs={10} md={10} lg={10}>
                        <a>
                            <h3 className="textomediosdepago">Efecty</h3>
                        </a>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={1}
                    className="mt-1 pl-10"
                    onClick={() => teAyudamos()}>
                    <Grid item xs={2} md={2} lg={2}>
                        <a className="cursordisable">
                            <img
                                className="logobancolombia"
                                src={logobancolombia.src}
                                alt="First slide"
                            />
                        </a>
                    </Grid>
                    <Grid item xs={10} md={10} lg={10}>
                        <a className="cursordisable">
                            <h3 className="textomediosdepagobancolombia">
                                Botón Bancolombia
                            </h3>
                        </a>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={1}
                    className="mt-1"
                    onClick={() => teAyudamos()}>
                    <Grid item xs={2} md={2} lg={2}>
                        <a className="cursordisable">
                            <img
                                className="logonequi"
                                src={logonequi.src}
                                alt="First slide"
                            />
                        </a>
                    </Grid>
                    <Grid item xs={10} md={10} lg={10}>
                        <a>
                            <h3 className="textomediosdepagonequi">Nequi</h3>
                        </a>
                    </Grid>
                </Grid>
            </div>

            {
                /*
                <div className="ps-product__gif">
                    <div className="ps-gif__text">
                        <i className="icon-shield-check"></i>
                        <strong>Entrega 100% segura </strong>sin llamar al
                        transportador
                    </div>
                    <img
                        //className="ps-gif__thumbnail"
                        className="mt-90"
                        width="200px"
                        height="180px"
                        src="/imgcarrusel/homepage/entrega.jpg"
                        alt=""
                    />    
                </div>
                */
            }
        </div>
    );
};

export default InfoViewPrdSingle;
