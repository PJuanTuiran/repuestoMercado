import Container from "../../components/layouts/Container";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { URL_BD_MR } from "../../helpers/Constants";
import axios from "axios";
import { URL_IMAGES_RESULTSSMS } from "../../helpers/Constants";
import ModalMensajes from "../mensajes/ModalMensajes";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function GestionPQR() {
    const router = useRouter(); //NextRouter
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const irA = useRef(null); //PosiciónTopPage
    const [estados, setEstados] = useState([]);
    const [respuesta, setRespuesta] = useState("");
    const [pqrData, setPqrData] = useState([]);
    const ciudades = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_ciudades
    ); //obtenemos las ciudades
    const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);
    const [showModal, setShowModal] = useState(false); //Estado de modal
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };

    //Función para listar PQRS
    useEffect(() => {
        const listarPQR = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}152`,
                });

                if (res.data.type === 1) {
                    setPqrData(res.data.listarpqr);
                }
            } catch (error) {
                console.error("Error al listar las PQRs", error);
            }
        };
        listarPQR();
    }, []);

    //Función para actualizar PQR
    const actualizarPQR = async (id, estado, respuesta) => {
        let params = {
            id,
            estado,
            respuesta,
        };
        try {
            const res = await axios({
                method: "post",
                url: `${URL_BD_MR}153`,
                params,
            });
            console.log("Respuesta del servidor:", res);
            setTituloMensajes("¡Éxito!");
            setTextoMensajes("PQR actualizado correctamente");
            setShowModal(true);
        } catch (error) {
            console.error("Error al actualizar la PQR", error);
            setTituloMensajes("¡Error!");
            setTextoMensajes("Error al actualizar la PQR");
            setShowModal(true);
        }
    };

    //Función para obtener estaddos
    useEffect(() => {
        const obtenerEstados = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}158`,
                });

                if (res.data.type === 1) {
                    setEstados(res.data.listarestados);
                }
            } catch (error) {
                console.error("Error al obtener los estados", error);
            }
        };
        obtenerEstados();
    }, []);

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div
                                className="ps-page__content ps-account"
                                style={{ marginBottom: "18rem" }}>
                                <Grid
                                    className="contMainOpiniones"
                                    container
                                    style={{ width: isMdDown ? "100%" : "85%" }}
                                    display={"flex"}
                                    flexDirection={"column"}>
                                    <div className="TopAyudaPQR">
                                        <p className="TopAyudaPQRIndex">
                                            Gestión PQRs
                                        </p>
                                        <p>
                                            Aquí puedes gestionar los PQRs de
                                            los usuarios.
                                        </p>
                                    </div>

                                    <div className="ButtonsGestionPQR">
                                        <button
                                            className={`InactivoPQRbtn ${
                                                estadoSeleccionado === 72
                                                    ? "activoBtnPQR"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setEstadoSeleccionado(72)
                                            }>
                                            Mostrar Enviadas
                                        </button>
                                        <button
                                            className={`InactivoPQRbtn ${
                                                estadoSeleccionado === 73
                                                    ? "activoBtnPQR"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setEstadoSeleccionado(73)
                                            }>
                                            Mostrar En Proceso
                                        </button>
                                        <button
                                            className={`InactivoPQRbtn ${
                                                estadoSeleccionado === 74
                                                    ? "activoBtnPQR"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setEstadoSeleccionado(74)
                                            }>
                                            Mostrar Rechazadas
                                        </button>
                                        <button
                                            className={`InactivoPQRbtn ${
                                                estadoSeleccionado === 75
                                                    ? "activoBtnPQR"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setEstadoSeleccionado(75)
                                            }>
                                            Mostrar Finalizadas
                                        </button>
                                    </div>

                                    <div className="MainmiddleAyudaPQR">
                                        <div className="ContGestionPQR">
                                            {estadoSeleccionado &&
                                                (pqrData.filter(
                                                    (pqr) =>
                                                        pqr.estado ===
                                                        estadoSeleccionado
                                                ).length > 0 ? (
                                                    pqrData
                                                        .filter(
                                                            (pqr) =>
                                                                pqr.estado ===
                                                                estadoSeleccionado
                                                        )
                                                        .map((pqr, index) => {
                                                            const estado =
                                                                estados.find(
                                                                    (e) =>
                                                                        e.tipodeestado ===
                                                                        pqr.estado
                                                                );
                                                            const ciudad =
                                                                ciudades
                                                                    ? ciudades.find(
                                                                          (c) =>
                                                                              c.id_ciu ===
                                                                              pqr.ciudad
                                                                      )
                                                                    : null;
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="MainGestPQr">
                                                                    <div className="infoGestData">
                                                                        <p>
                                                                            Id
                                                                            de
                                                                            petición:{" "}
                                                                            {
                                                                                pqr.id
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            Estado
                                                                            de
                                                                            la
                                                                            petición:{" "}
                                                                            {estado
                                                                                ? estado.nombre
                                                                                : "Desconocido"}
                                                                        </p>
                                                                        <p>
                                                                            Identificación
                                                                            del
                                                                            usuario:{" "}
                                                                            {
                                                                                pqr.identificacion
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            Fecha
                                                                            de
                                                                            Creación:{" "}
                                                                            {pqr.fechacreacion.slice(
                                                                                0,
                                                                                10
                                                                            )}
                                                                        </p>
                                                                        <p>
                                                                            Nombre
                                                                            del
                                                                            usuario:{" "}
                                                                            {
                                                                                pqr.nombres
                                                                            }{" "}
                                                                            {
                                                                                pqr.apellidos
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            Email
                                                                            del
                                                                            usuario:{" "}
                                                                            {
                                                                                pqr.email
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            Teléfono
                                                                            del
                                                                            usuario:{" "}
                                                                            {
                                                                                pqr.telefono
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            Ciudad
                                                                            del
                                                                            usuario:{" "}
                                                                            {ciudad
                                                                                ? ciudad.nombre_ciu
                                                                                : "Desconocida"}
                                                                        </p>
                                                                        <p>
                                                                            Dirección
                                                                            del
                                                                            usuario:{" "}
                                                                            {
                                                                                pqr.direccion
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            Barrio
                                                                            del
                                                                            usuario:{" "}
                                                                            {
                                                                                pqr.barrio
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <div className="dataPQRGest">
                                                                        <p>
                                                                            Motivo
                                                                            del
                                                                            PQR:{" "}
                                                                            {
                                                                                pqr.motivo
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            Asunto
                                                                            del
                                                                            PQR:{" "}
                                                                            {
                                                                                pqr.asunto
                                                                            }{" "}
                                                                        </p>
                                                                        <p>
                                                                            Descripción
                                                                            del
                                                                            PQR:{" "}
                                                                            {
                                                                                pqr.descripcion
                                                                            }{" "}
                                                                        </p>
                                                                    </div>

                                                                    <div className="docsPQR">
                                                                        <div>
                                                                            <p>
                                                                                Archivos
                                                                                adjuntos
                                                                                del
                                                                                usuario:
                                                                            </p>
                                                                        </div>
                                                                        <div>
                                                                            {pqr.nombreimagen1 && (
                                                                                <div>
                                                                                    <a
                                                                                        href={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen1}`}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer">
                                                                                        <img
                                                                                            className="imagengestionpqr"
                                                                                            src={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen1}`}
                                                                                        />
                                                                                    </a>
                                                                                </div>
                                                                            )}
                                                                            {pqr.nombreimagen2 && (
                                                                                <div>
                                                                                    <a
                                                                                        href={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen2}`}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer">
                                                                                        <img
                                                                                            className="imagengestionpqr"
                                                                                            src={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen2}`}
                                                                                        />
                                                                                    </a>
                                                                                </div>
                                                                            )}
                                                                            {pqr.nombreimagen3 && (
                                                                                <div>
                                                                                    <a
                                                                                        href={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen3}`}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer">
                                                                                        <img
                                                                                            className="imagengestionpqr"
                                                                                            src={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen3}`}
                                                                                        />
                                                                                    </a>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    <div className="ResInputPQR">
                                                                        <p>
                                                                            Respuesta
                                                                            a
                                                                            usuario:
                                                                        </p>
                                                                        <textarea
                                                                            type="text"
                                                                            value={
                                                                                respuesta[
                                                                                    pqr
                                                                                        .id
                                                                                ] ||
                                                                                pqr.respuesta ||
                                                                                ""
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setRespuesta(
                                                                                    {
                                                                                        ...respuesta,
                                                                                        [pqr.id]:
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                    }
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>

                                                                    <div className="ButtonsEstadosPQR">
                                                                        <button
                                                                            onClick={() =>
                                                                                actualizarPQR(
                                                                                    pqr.id,
                                                                                    73,
                                                                                    respuesta[
                                                                                        pqr
                                                                                            .id
                                                                                    ] ||
                                                                                        ""
                                                                                )
                                                                            }>
                                                                            Actualizar
                                                                            a En
                                                                            proceso
                                                                        </button>
                                                                        <button
                                                                            onClick={() =>
                                                                                actualizarPQR(
                                                                                    pqr.id,
                                                                                    74,
                                                                                    respuesta[
                                                                                        pqr
                                                                                            .id
                                                                                    ] ||
                                                                                        ""
                                                                                )
                                                                            }>
                                                                            Actualizar
                                                                            a
                                                                            Rechazada
                                                                        </button>
                                                                        <button
                                                                            onClick={() =>
                                                                                actualizarPQR(
                                                                                    pqr.id,
                                                                                    75,
                                                                                    respuesta[
                                                                                        pqr
                                                                                            .id
                                                                                    ] ||
                                                                                        ""
                                                                                )
                                                                            }>
                                                                            Actualizar
                                                                            a
                                                                            Finalizada
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                ) : (
                                                    <p>
                                                        No hay PQRs para el
                                                        estado seleccionado.
                                                    </p>
                                                ))}

                                            <ModalMensajes
                                                shown={showModal}
                                                close={handleModalClose}
                                                titulo={tituloMensajes}
                                                mensaje={textoMensajes}
                                                tipo="error"
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
