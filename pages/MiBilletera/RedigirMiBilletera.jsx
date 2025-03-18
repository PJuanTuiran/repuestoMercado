import Container from "../../components/layouts/Container";
import { Grid, div, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { URL_BD_MR } from "../../helpers/Constants";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import ModalControlAcceso from "../mensajes/ModalControlAcceso";

export default function RedigirMiBilletera() {
    //const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const irA = useRef(null); //PosiciónTopPage
    const [UidUser, setUidUser] = useState("");
    const [showModalControlAcceso, setShowModalControlAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

    let uidusuario = null;
    let idinterno = null;

    if (typeof window !== "undefined") {
        if (router.query.uidusuario) {
            uidusuario = JSON.parse(router.query.uidusuario);
            idinterno = JSON.parse(router.query.idinterno);
        }
    }

    // Estado de cuenta
    const [estadoCuenta, setEstadoCuenta] = useState(null);

    useEffect(() => {
        //let ctlredirigir = JSON.parse(localStorage.getItem("ctlredirigir"));
        localStorage.setItem("ctlredirigir",JSON.stringify(null));
    }, [])

    // Movimientos del usuario
    const [movimientos, setMovimientos] = useState([]);

    useEffect(() => {
        const ListarMovimientosUsuario = async () => {

            let params = {
                uidcomprador: uidusuario,
            };

            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}218`,
                    params,
                });

                //console.log("DATOSXXX : ", res.data.listmovbilletera)
                const datosUsuario = res.data.listmovbilletera.filter(
                    (usuario) => usuario.idcomprador == uidusuario
                );

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
                setEstadoCuenta(saldocta);

                //console.log("DTASOOSI : ", datosUsuario);
                setMovimientos(datosUsuario);
            } catch (error) {
                console.error(
                    "Error al leer las transacciones del vendedor",
                    error
                );
            }
        };

        if (uidusuario)
            ListarMovimientosUsuario();
    }, [uidusuario]);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <ModalControlAcceso
                            shown={showModalControlAcceso}
                            close={setShowModalControlAcceso}
                            titulo={tituloControlAcceso}
                            mensaje={textoControlAcceso}
                            tipo="1"
                        />
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div
                                className="ps-page__content ps-account"
                                style={{ marginBottom: "28rem" }}>
                                <Grid
                                    className="contDataUsers"
                                    container
                                    style={{
                                        width: isMdDown ? "100%" : "90%",
                                    }}>
                                    <div className="TitleOpVend">
                                        <p>Mi billetera</p>
                                    </div>
                                </Grid>
                                <div className="contMainBilletera">
                                    <div className="saldoBilletera">
                                        <div className="saldoBilleteraLeft">
                                            <h3>Saldo disponible</h3>
                                            {estadoCuenta ? (
                                                <p>
                                                    $
                                                    {estadoCuenta.toLocaleString(
                                                        "en-US"
                                                    )}
                                                </p>
                                            ) : (
                                                <p>
                                                    Ups! aún no has vendido tu
                                                    primer producto.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="contMovimientos">
                                        <div className="TopcontMovimientos">
                                            <p>Movimientos</p>
                                        </div>
                                        {movimientos.length > 0 ? (
                                            movimientos
                                                .sort(
                                                    (a, b) =>
                                                        new Date(
                                                            b.fechacreacion
                                                        ) -
                                                        new Date(
                                                            a.fechacreacion
                                                        )
                                                )
                                                .slice(0, 2)
                                                .map((movimiento, index) => (
                                                    <div
                                                        className="MiddleContMovimientos"
                                                        key={index}>
                                                        <div className="ItemContMovimientos">
                                                            <div className="LeftItemContMovimientos">
                                                                <p>
                                                                    {
                                                                        movimiento.nombre
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="RightItemContMovimientos">
                                                                <p>
                                                                    {movimiento.valorabono.toLocaleString(
                                                                        "en-US"
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                        ) : (
                                            <p>Aún no tienes movimientos.</p>
                                        )}
                                        <div className="ButtonContMovimientos">
                                            <button
                                                onClick={() =>
                                                    router.push({
                                                        pathname:
                                                            "/MiBilletera/misMovimientos",
                                                        query: {
                                                            uidusuario: JSON.stringify(uidusuario),
                                                            idinterno: JSON.stringify(idinterno),
                                                            tipousuario: JSON.stringify(2),
                                                        },
                                                    })
                                                }>
                                                Ver más
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
