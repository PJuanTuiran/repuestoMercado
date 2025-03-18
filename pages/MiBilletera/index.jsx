import Container from "../../components/layouts/Container";
import { Grid, div, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { URL_BD_MR, URL_CONSOLA_MR } from "../../helpers/Constants";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import ModalControlAcceso from "../mensajes/ModalControlAcceso";

export default function index() {
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const irA = useRef(null); //PosiciónTopPage
    const [UidUser, setUidUser] = useState("");
    const [showModalControlAcceso, setShowModalControlAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

    useEffect(() => {
        if (datosusuarios.activo == 30) {
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Mis datos");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            return;
        }
    });

    // Estado de cuenta
    const [estadoCuenta, setEstadoCuenta] = useState(null);

    // Movimientos del usuario
    const [movimientos, setMovimientos] = useState([]);

    useEffect(() => {
        const listarSolPendientes = async () => {

            let valsolpendiente = 0;

            let params = {
                uidvendedor: datosusuarios.uid
            }

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "1552", params
                });

                if (res.data.type == 1) {
                    res.data.listarsolpendiente &&
                        res.data.listarsolpendiente.map((pendt) => {
                            valsolpendiente = parseFloat(valsolpendiente) + parseFloat(pendt.valortransferencia);
                            //console.log("PENDIE : ", pendt.valortransferencia)
                        });
                        ListarMovimientosUsuario(valsolpendiente);
                }
            } catch (error) {
                console.error("Error al leer los datos", error);
            }
        };
        listarSolPendientes();


        const ListarMovimientosUsuario = async (valpte) => {

            let params = {
                uidcomprador: datosusuarios.uid,
            };

            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}218`,
                    params,
                });

                console.log("DATOSXXX : ", res.data.listmovbilletera)
                const datosUsuario = res.data.listmovbilletera.filter(
                    (usuario) => usuario.idcomprador === datosusuarios.uid
                );

                let saldocta = 0;
                res.data.listmovbilletera &&
                    res.data.listmovbilletera.map((mov) => {
                        if (mov.idtransaccion == 1) {
                            saldocta = parseFloat(saldocta) + parseFloat(mov.valorabono);
                        } else
                            if (mov.idtransaccion == 2) {
                                saldocta = parseFloat(saldocta) - parseFloat(mov.valorabono);
                            }

                    });

                console.log("VAL PEDNTE : ", valpte)
                saldocta = parseFloat(saldocta) - parseFloat(valpte);
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
        
    }, [datosusuarios]);

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
                                                    Aún no has vendido tu
                                                    primer producto.
                                                </p>
                                            )}
                                        </div>
                                        <div className="saldoBilleteraRight">
                                            <button
                                                onClick={() =>
                                                    router.push({
                                                        pathname:
                                                            "/MiBilletera/RetiroDinero",
                                                    })
                                                }>
                                                Solicitar dinero
                                            </button>
                                        </div>
                                        <div className="botonsolpendiente">
                                            <button
                                                onClick={() =>
                                                    router.push({
                                                        pathname: "./MiBilletera/SolicitudRetiro/",
                                                        query: {
                                                            uidusuario: JSON.stringify(datosusuarios.uid)
                                                        },
                                                    })
                                                }>
                                                Solicitudes pendientes
                                            </button>
                                        </div>

                                    </div>
                                    <div >
                                        <Grid container>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <div className="textosubirdctos">
                                                    Si tienes solicitudes de dinero pendientes, al saldo de tu cuenta estamos restando esos valores.
                                                </div>
                                            </Grid>
                                        </Grid>
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
                                                            uidusuario: JSON.stringify(datosusuarios.uid),
                                                            idinterno: JSON.stringify(datosusuarios.idinterno),
                                                            tipousuario: JSON.stringify(1)
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
