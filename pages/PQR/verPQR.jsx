import Container from "../../components/layouts/Container";
import PropTypes from "prop-types";
import { Table, TableHead, TableBody, TableCell, TableContainer, Box, Modal, useMediaQuery, useTheme } from "@mui/material";
import { Typography, Grid, InputLabel, Select, FormControl, Button, Tooltip } from "@mui/material";
import { TableFooter, TablePagination, TableRow, Paper, IconButton, rowsPerPage } from "@mui/material";

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Card from '@mui/material/Card';
import { GrDocumentImage } from "react-icons/gr";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import { URL_BD_MR } from "../../helpers/Constants";
import { useRouter } from "next/router";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { jsPDF } from "jspdf";
import { URL_IMAGES_RESULTSSMS } from "../../helpers/Constants";


const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Notification(props) {

    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div>
            <Box sx={{ flexShrink: 0, ml: 2.5 }}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="previous page"
                >
                    {theme.direction === "rtl" ? (
                        <KeyboardArrowRight />
                    ) : (
                        <KeyboardArrowLeft />
                    )}
                </IconButton>

                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === "rtl" ? (
                        <KeyboardArrowLeft />
                    ) : (
                        <KeyboardArrowRight />
                    )}
                </IconButton>

                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </Box>
        </div>
    );
}

Notification.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


export default function verPQR() {
    const router = useRouter(); //NextRouter
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const irA = useRef(null); //PosiciónTopPage
    const ciudades = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_ciudades
    );
    const [estados, setEstados] = useState([]);
    const [tiposIdentificacion, setTiposIdentificacion] = useState([]);
    const { id } = router.query;
    const [pqr, setPQR] = useState(null);
    const [respuesta, setRespuesta] = useState({});
    const [arrayNotificacion, setArrayNotificacion] = useState([]);
    const [arrayNotificacionAll, setArrayNotificacionAll] = useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(1000);

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
                    console.error(
                        "Error: se esperaba un array, pero se recibió",
                        res.data.tipoidentificacion
                    );
                }
            } catch (error) {
                console.error(
                    "Error al obtener los tipos de identificación",
                    error
                );
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
                console.log("Respuesta del servidor:", res.data); // Agregamos esta línea para imprimir la respuesta del servidor
                if (Array.isArray(res.data.listarestados)) {
                    setEstados(res.data.listarestados);
                } else {
                    console.error(
                        "Error: se esperaba un array, pero se recibió",
                        res.data.listarestados
                    );
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
                const pqrEncontrado = res.data.listarpqr.find(
                    (pqr) => pqr.id.toString() === id
                );
                setPQR(pqrEncontrado);
                HistorialNotificacionPQR(pqrEncontrado)
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
        doc.text(respuesta[pqr.id] || pqr.respuesta || "", 10, 10);
        doc.save("respuesta.pdf");
    };

    const HistorialNotificacionPQR = (datapqr) => {
        const datauser = JSON.parse(localStorage.getItem("datauser"));

        if (datauser) {
            const leerNotificacionesActivas = async () => {
                let params = {
                    uidusuario: datauser.uid,
                };

                //console.log("USER ID:", params);
                await axios({
                    method: "post",
                    url: URL_BD_MR + "825",
                    params,
                })
                    .then((res) => {
                        console.log("Notificar PQR:", res.data.listarnotificacionesactivas);

                        if (res.data.type === 1) {
                            console.log("Notificación ACTIVAS Usuario:", res.data.listarnotificacionesactivas);
                            let datanotificacion = res.data.listarnotificacionesactivas;

                            let arraydata = [];
                            datanotificacion &&
                                datanotificacion.map((item, index) => {
                                    if (item.tiponotificacion == 8 && item.idorigen == datapqr.id) {
                                        arraydata.push(item);
                                    }
                                });
                            setArrayNotificacion(arraydata);
                            setArrayNotificacionAll(arraydata);
                        } else if (res.data.type === 0 || res.data === "ERROR de notificaciones") {
                            console.error("Error notificaciones activas:", res.data);
                        } else {
                            console.error("Respuesta inesperada notificaciones activas:", res.data);
                        }
                    })
                    .catch(function (error) {
                        console.error("Error petición notificaciones activas:", error);
                    });
            };
            leerNotificacionesActivas();
            //console.log("XXXXXXX: ", array);
        }
    }

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrayNotificacion.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            {pqr && (
                <div ref={irA}>
                    <Container title="Mi Cuenta">
                        <div className="ps-page ps-page--inner" id="myaccount">
                            <div className="container">
                                <div className="ps-page__header"> </div>
                                <div className="ps-page__content ps-account"
                                    style={{ marginBottom: "1rem" }}>
                                    <Grid
                                        className="contMainOpiniones"
                                        container
                                        style={{
                                            width: isMdDown ? "100%" : "80%",
                                        }}
                                        display={"flex"}
                                        flexDirection={"column"}>
                                        <div className="mainContVerPQR">
                                            <div className="SubMainContVerPQR">
                                                <div className="TopAyudaPQR">
                                                    <p className="solPQR">
                                                        Solicitud #{pqr.id}
                                                    </p>
                                                    <p>
                                                        Información de la
                                                        solicitud
                                                    </p>
                                                </div>

                                                <div className="DatePQR">
                                                    <p>Fecha solicitud</p>
                                                    <p>
                                                        {pqr.fechacreacion.slice(
                                                            0,
                                                            10
                                                        )}
                                                    </p>
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
                                                    <p>
                                                        {
                                                            tiposIdentificacion.find(
                                                                (tipo) =>
                                                                    tipo.id ===
                                                                    pqr.tipoidentificacion
                                                            )?.descripcion
                                                        }
                                                    </p>
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
                                                    <p>
                                                        {ciudades &&
                                                            ciudades.find(
                                                                (ciudad) =>
                                                                    ciudad.id_ciu ===
                                                                    pqr.ciudad
                                                            )?.nombre_ciu}
                                                    </p>
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
                                                    {pqr.asunto.length > 50 ? (
                                                        <Grid
                                                            container
                                                            spacing={1}>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={12}
                                                                lg={12}>
                                                                <p className="divasuntopqr">
                                                                    Asunto:{" "}
                                                                    {pqr.asunto.substr(
                                                                        0,
                                                                        50
                                                                    )}
                                                                </p>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={12}
                                                                lg={12}>
                                                                <p className="divasuntopqrdos">
                                                                    {pqr.asunto.substr(
                                                                        51,
                                                                        100
                                                                    )}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    ) : null}

                                                    {pqr.descripcion.length >
                                                        70 ? (
                                                        <Grid
                                                            container
                                                            spacing={1}>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={12}
                                                                lg={12}>
                                                                <p className="divdescripcionpqr">
                                                                    Descripción:{" "}{" "}
                                                                    {pqr.descripcion.substr(
                                                                        0,
                                                                        48
                                                                    )}
                                                                </p>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={12}
                                                                lg={12}>
                                                                <p className="divdescripcionpqrdos">
                                                                    {pqr.descripcion.substr(
                                                                        49,
                                                                        60
                                                                    )}
                                                                </p>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={12}
                                                                lg={12}>
                                                                <p className="divdescripcionpqrdos">
                                                                    {pqr.descripcion.substr(
                                                                        108,
                                                                        60
                                                                    )}
                                                                </p>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={12}
                                                                lg={12}>
                                                                <p className="divdescripcionpqrdos">
                                                                    {pqr.descripcion.substr(
                                                                        168,
                                                                        60
                                                                    )}
                                                                </p>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={12}
                                                                lg={12}>
                                                                <p className="divdescripcionpqrdos">
                                                                    {pqr.descripcion.substr(
                                                                        228,
                                                                        60
                                                                    )}
                                                                </p>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={12}
                                                                lg={12}>
                                                                <p className="divdescripcionpqrdos">
                                                                    {pqr.descripcion.substr(
                                                                        288,
                                                                        60
                                                                    )}
                                                                </p>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={12}
                                                                lg={12}>
                                                                <p className="divdescripcionpqrdos">
                                                                    {pqr.descripcion.substr(
                                                                        348,
                                                                        60
                                                                    )}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    ) : null}
                                                </div>

                                                <div className="mtmenos50">
                                                    <p>Archivos adjuntos</p>
                                                </div>

                                                <div className="docsPQR">
                                                    <div>
                                                        {pqr.nombreimagen1 ? (
                                                            pqr.nombreimagen1.substr(
                                                                -3,
                                                                3
                                                            ) == "pdf" ? (
                                                                <div className="verpdfpqr">
                                                                    <a
                                                                        href={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen1}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer">
                                                                        <p>
                                                                            VER
                                                                            PDF
                                                                        </p>
                                                                    </a>
                                                                </div>
                                                            ) : (
                                                                pqr.nombreimagen1 && (
                                                                    <div>
                                                                        <a
                                                                            href={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen1}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer">
                                                                            <img
                                                                                className="imgpqr"
                                                                                src={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen1}`}
                                                                            />
                                                                        </a>
                                                                    </div>
                                                                )
                                                            )
                                                        ) : null}

                                                        {pqr.nombreimagen2 ? (
                                                            pqr.nombreimagen2.substr(
                                                                -3,
                                                                3
                                                            ) == "pdf" ? (
                                                                <div className="verpdfpqr">
                                                                    <a
                                                                        href={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen2}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer">
                                                                        <p>
                                                                            VER
                                                                            PDF
                                                                        </p>
                                                                    </a>
                                                                </div>
                                                            ) : (
                                                                pqr.nombreimagen2 && (
                                                                    <div>
                                                                        <a
                                                                            href={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen2}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer">
                                                                            <img
                                                                                className="imgpqr"
                                                                                src={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen2}`}
                                                                            />
                                                                        </a>
                                                                    </div>
                                                                )
                                                            )
                                                        ) : null}
                                                        {pqr.nombreimagen3 ? (
                                                            pqr.nombreimagen3.substr(
                                                                -3,
                                                                3
                                                            ) == "pdf" ? (
                                                                <div className="verpdfpqr">
                                                                    <a
                                                                        href={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen3}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer">
                                                                        <p>
                                                                            VER
                                                                            PDF
                                                                        </p>
                                                                    </a>
                                                                </div>
                                                            ) : (
                                                                pqr.nombreimagen3 && (
                                                                    <div>
                                                                        <a
                                                                            href={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen3}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer">
                                                                            <img
                                                                                className="imgpqr"
                                                                                src={`${URL_IMAGES_RESULTSSMS}${pqr.nombreimagen3}`}
                                                                            />
                                                                        </a>
                                                                    </div>
                                                                )
                                                            )
                                                        ) : null}
                                                    </div>
                                                    <div className="SolicituState">
                                                        <p>
                                                            Asunto de la
                                                            solicitud:{" "}
                                                            {
                                                                <a className="textosolicitudpqr">{pqr.asunto}</a>
                                                            }
                                                        </p>
                                                    </div>

                                                    <div className="SolicituState">
                                                        <p>
                                                            Estado de la
                                                            solicitud:{" "}
                                                            {
                                                                <a className="textosolicitudpqr">
                                                                    {
                                                                        estados.find(
                                                                            (estado) =>
                                                                                estado.tipodeestado ===
                                                                                pqr.estado
                                                                        )?.nombre
                                                                    }
                                                                </a>
                                                            }
                                                        </p>
                                                    </div>

                                                    <div className="SolicituState">
                                                        <p>
                                                            Descripción:{" "}
                                                            {
                                                                <a className="textosolicitudpqr">{pqr.descripcion}</a>
                                                            }
                                                        </p>
                                                    </div>

                                                    <div className="descrRespuesta">
                                                        <p>
                                                            {pqr.observacion}
                                                        </p>
                                                    </div>

                                                    {pqr.estado == 116 ? (
                                                        <div className="DownloadRespuesta">
                                                            <span
                                                                onClick={
                                                                    descargarRespuesta
                                                                }>
                                                                <p>
                                                                    Descargar
                                                                    respuesta
                                                                </p>
                                                                <MdOutlineDownloadForOffline />
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <p>
                                                            Aún no tienes
                                                            respuesta.
                                                        </p>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                        <div className="divhistorialpqr">
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <div className="textotitulopqr">Historial de la PQR</div>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <TableContainer
                                        component={Paper}
                                        sx={{
                                            boxShadow: "none",
                                        }}
                                    >
                                        <Table
                                            sx={{ minWidth: 500 }}
                                            aria-label="custom pagination table"
                                            className="dark-table"
                                        >
                                            <TableHead
                                                sx={{
                                                    "& th": {
                                                        color: "#2D2E83",
                                                        fontSize: "14px",
                                                        backgroundColor: "#F1F2F6",
                                                    },
                                                }}>
                                                <TableRow>
                                                    <TableCell
                                                        sx={{
                                                            width: "100px",
                                                        }}>
                                                        Fecha
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            width: "700px",
                                                        }}>
                                                        Descripción
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            width: "100px",
                                                        }}>
                                                        Ver adjunto
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {(rowsPerPage > 0
                                                    ? arrayNotificacion && arrayNotificacion.slice(
                                                        page * rowsPerPage,
                                                        page * rowsPerPage + rowsPerPage
                                                    )
                                                    : arrayNotificacion
                                                ).map((row) => (
                                                    <TableRow key={row.id}>
                                                        <TableCell
                                                            style={{
                                                                width: '200px',
                                                                borderBottom: "1px solid #F7FAFF",
                                                                fontSize: "14px",
                                                                padding: "10px",
                                                                paddingLeft: '18px',
                                                                color: '#2D2E83',
                                                            }}
                                                        >
                                                            {row.fechacreacion}
                                                        </TableCell>
                                                        <TableCell
                                                            style={{
                                                                width: '350px',
                                                                borderBottom: "1px solid #F7FAFF",
                                                                fontSize: "14px",
                                                                padding: "10px",
                                                                paddingLeft: '15px',
                                                                color: '#2D2E83',
                                                            }}
                                                        >
                                                            {row.comentario}
                                                        </TableCell>

                                                        <TableCell
                                                            style={{
                                                                width: '200px',
                                                                borderBottom: "1px solid #F7FAFF",
                                                                fontSize: "14px",
                                                                padding: "10px",
                                                                paddingLeft: '18px',
                                                                color: '#2D2E83',
                                                            }}
                                                        >
                                                            <Tooltip title='Ver adjunto' placement="top-start"
                                                                className="vercompradevoluciondos"
                                                            >
                                                                {
                                                                    row.nombrearchivo ?
                                                                        <a
                                                                            href={`${URL_IMAGES_RESULTSSMS}${row.nombrearchivo}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            <GrDocumentImage
                                                                                className="replyicon"
                                                                                style={{
                                                                                    fontSize: 25,
                                                                                    color: "#2D2E83",
                                                                                }}
                                                                            />
                                                                        </a>
                                                                        :
                                                                        <GrDocumentImage
                                                                            className="disableicon"
                                                                            style={{
                                                                                fontSize: 25,
                                                                                color: "#2D2E83",
                                                                            }}
                                                                        />
                                                                }
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}

                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: 53 * emptyRows }}>
                                                        <TableCell
                                                            colSpan={3}
                                                            style={{ borderBottom: "1px solid #F7FAFF" }}
                                                        />
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                            {
                                                /*
                                            <TableFooter>
                                                                                            <TableRow>
                                                                                                <TablePagination
                                                                                                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                                                                                    colSpan={5}
                                                                                                    count={arrayNotificacion.length}
                                                                                                    rowsPerPage={rowsPerPage}
                                                                                                    page={page}
                                                                                                    SelectProps={{
                                                                                                        inputProps: {
                                                                                                            "aria-label": "Registros por pagina",
                                                                                                        },
                                                                                                        native: true,
                                                                                                    }}
                                                                                                    labelRowsPerPage='Registros por pagina:'
                                                                                                    onPageChange={handleChangePage}
                                                                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                                                                    ActionsComponent={Notification}
                                                                                                    style={{ fontSize: "10px" }}
                                                                                                />
                                                                                            </TableRow>
                                                                                        </TableFooter>
                                                */
                                            }

                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </div>

                    </Container>
                </div>
            )}
        </>
    );
}
