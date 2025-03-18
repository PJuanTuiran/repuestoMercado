import Container from "../../components/layouts/Container";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { URL_BD_MR } from "../../helpers/Constants";
import axios from "axios";
import { URL_IMAGES_RESULTSSMS } from "../../helpers/Constants";
import ModalMensajes from "../mensajes/ModalMensajes";
import shortid from "shortid";

import { useRouter } from "next/router";
import { TbSearch } from "react-icons/tb";
import { IoAddCircleOutline } from "react-icons/io5";



export default function index() {

    const router = useRouter();//NextRouter
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const irA = useRef(null); //PosiciónTopPage

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
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: "18rem" }}>
                                <Grid className="contMainOpiniones" container style={{ width: isMdDown ? "100%" : "85%" }} display={"flex"} flexDirection={"column"}>
                                    <div className="TopAyudaPQR">
                                        <p className="TopAyudaPQRIndex">Ayuda / PQR</p>
                                        <p>Para nosotros es muy importante tus preguntas, quejas, reclamos o felicitaciones.</p>
                                    </div>

                                    <div className="MainmiddleAyudaPQR">
                                        <div className="middleAyudaPQR">
                                            <div className="middlePQR">
                                                <p>Buscar mi solicitud</p>
                                                <div>
                                                    <TbSearch onClick={() => router.push({ pathname: '/PQR/buscarPQR' })}/>
                                                </div>
                                            </div>
                                            <div className="middlePQR">
                                                <p>Crear una solicitud</p>
                                                <div>
                                                    <IoAddCircleOutline onClick={() => router.push({ pathname: '/PQR/crearPQR' })}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bottomAyudaPQR">
                                            <p>A tener en cuenta</p>
                                            <p>Si deseas ingresar una petición, queja, reclamo o felicitación; haz clic en “Crear una solicitud” 
                                             <br />   Si deseas buscar una solictud ya enviada, haz clic en “Buscar mi solicitud” y luego igresa el <br /> numero de tu solicitud o tu numero de identificación para realizar la busqueda</p>
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
