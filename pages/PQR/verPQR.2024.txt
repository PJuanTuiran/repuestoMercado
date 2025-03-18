import Container from "../../components/layouts/Container";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { URL_BD_MR } from "../../helpers/Constants";
import axios from "axios";
import { useRouter } from "next/router";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { jsPDF } from "jspdf";
import { useSelector } from "react-redux";
import { URL_IMAGES_RESULTSSMS } from "../../helpers/Constants";

export default function verPQR() {

    const router = useRouter();//NextRouter
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const irA = useRef(null); //PosiciónTopPage
    const ciudades = useSelector((state) => state.datosgenerales.datosgenerales.vgl_ciudades);
    const [estados, setEstados] = useState([]);
    const [tiposIdentificacion, setTiposIdentificacion] = useState([]);
    const { id } = router.query;
    const [pqr, setPQR] = useState(null);
    const [respuesta, setRespuesta] = useState({});


    useEffect(() => {
        if (irA.current) {
            irA.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, []);

    useEffect(() => {
        const obtenerTiposIdentificacion = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}7`,
                });
                if (Array.isArray(res.data.tipoidentificacion)) {
                    setTiposIdentificacion(res.data.tipoidentificacion);
                } else {
                    console.error("Error: se esperaba un array, pero se recibió", res.data.tipoidentificacion);
                }
            } catch (error) {
                console.error("Error al obtener los tipos de identificación", error);
            }
        };
        obtenerTiposIdentificacion();
    }, []);

    useEffect(() => {
        const obtenerEstados = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}158`,
                });
                console.log('Respuesta del servidor:', res.data); // Agregamos esta línea para imprimir la respuesta del servidor
                if (Array.isArray(res.data.listarestados)) {
                    setEstados(res.data.listarestados);
                } else {
                    console.error("Error: se esperaba un array, pero se recibió", res.data.listarestados);
                }
            } catch (error) {
                console.error("Error al obtener los estados", error);
            }
        };
        obtenerEstados();
    }, []);


    useEffect(() => {
        console.log(ciudades);
    }, [ciudades]);

    useEffect(() => {
        const obtenerPQR = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}152`,
                });
                const pqrEncontrado = res.data.listarpqr.find(pqr => pqr.id.toString() === id);
                setPQR(pqrEncontrado);
            } catch (error) {
                console.error("Error al leer el PQR", error);
            }
        };
        if (id) {
            obtenerPQR();
        }
    }, [id]);

    const descargarRespuesta = () => {
        const doc = new jsPDF();
        doc.text(respuesta[pqr.id] || pqr.respuesta || '', 10, 10);
        doc.save('respuesta.pdf');
    }



    return (
        <>
            {pqr && (
                <div ref={irA}>
                    <Container title="Mi Cuenta">
                        <div className="ps-page ps-page--inner" id="myaccount">
                            <div className="container">
                                <div className="ps-page__header"> </div>
                                <div className="ps-page__content ps-account" style={{ marginBottom: "18rem" }}>
                                    <Grid className="contMainOpiniones" container style={{ width: isMdDown ? "100%" : "80%" }} display={"flex"} flexDirection={"column"}>


                                        <div className="mainContVerPQR">

                                            <div className="SubMainContVerPQR">
                                                <div className="TopAyudaPQR">
                                                    <p className="solPQR">Solicitud #{pqr.id}</p>
                                                    <p>Información de la solicitud</p>
                                                </div>

                                                <div className="DatePQR">
                                                    <p>Fecha solicitud</p>
                                                    <p>{pqr.fechacreacion.slice(0, 10)}</p>
                                                </div>

                                                <div>
                                                    <p>Nombres</p>
                                                    <p>{pqr.nombres}</p>
                                                </div>

                                                <div>
                                                    <p>Apellidos</p>
                                                    <p>{pqr.apellidos}</p>
                                                </div>

                                                <div>
                                                    <p>Tipo de documento</p>
                                                    <p>{tiposIdentificacion.find(tipo => tipo.id === pqr.tipoidentificacion)?.descripcion}</p>
                                                </div>

                                                <div>
                                                    <p>Número de documento</p>
                                                    <p>{pqr.identificacion}</p>
                                                </div>

                                                <div>
                                                    <p>Correo electronico</p>
                                                    <p>{pqr.email}</p>
                                                </div>

                                                <div>
                                                    <p>Numero de contacto</p>
                                                    <p>{pqr.telefono}</p>
                                                </div>

                                                <div>
                                                    <p>Ciudad</p>
                                                    <p>{ciudades && ciudades.find(ciudad => ciudad.id_ciu === pqr.ciudad)?.nombre_ciu}</p>
                                                </div>

                                                <div>
                                                    <p>Dirección</p>
                                                    <p>{pqr.direccion}</p>
                                                </div>

                                                <div>
                                                    <p>Barrio</p>
                                                    <p>{pqr.barrio}</p>
                                                </div>

                                                <div className="MotivoPQR">
                                                    <p>Motivo: {pqr.motivo}</p>
                                                </div>

                                                <div className="AsuntoDescrpPQR">
                                                    <p>Asunto: {pqr.asunto}</p>
                                                    <p>Descripción: {pqr.descripcion}</p>
                                                </div>

                                                <div>
                                                    <p>Archivos adjuntos</p>
                                                </div>


                                                <div className="docsPQR">
                                                    <div>
                                                        {pqr.nombreimagen1 && (
                                                            <div>
                                                                <a href={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen1}`} target="_blank" rel="noopener noreferrer">
                                                                    <img src={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen1}`} />
                                                                </a>
                                                            </div>
                                                        )}
                                                        {pqr.nombreimagen2 && (
                                                            <div>
                                                                <a href={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen2}`} target="_blank" rel="noopener noreferrer">
                                                                    <img src={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen2}`} />
                                                                </a>
                                                            </div>
                                                        )}
                                                        {pqr.nombreimagen3 && (
                                                            <div>
                                                                <a href={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen3}`} target="_blank" rel="noopener noreferrer">
                                                                    <img src={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen3}`} />
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="SolicituState">
                                                        <p>Estado de la solicitud: {estados.find(estado => estado.tipodeestado === pqr.estado)?.nombre}</p>
                                                    </div>

                                                    <div className="descrRespuesta">
                                                        <p>Tu solicitud fue enviada y tienen un tiempo aproximado de respuesta de XX día habiles</p>
                                                    </div>

                                                    {respuesta[pqr.id] || pqr.respuesta ? (
                                                        <div className="DownloadRespuesta">
                                                            <span onClick={descargarRespuesta}>
                                                                <p>Descargar respuesta</p>
                                                                <MdOutlineDownloadForOffline />
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <p>Aún no tienes respuesta.</p>
                                                    )}

                                                </div>
                                            </div>




                                        </div>

                                    </Grid>

                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            )}
        </>
    );
}
