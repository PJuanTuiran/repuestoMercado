import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { Table, TableHead, TableBody, TableCell, TableContainer, Box, Modal } from "@mui/material";
import { Typography, Grid, InputLabel, Select, FormControl, Button, Tooltip } from "@mui/material";
import { URL_IMAGES_RESULTSSMS, URL_MK_MR } from "../../helpers/Constants";

import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Container from "../../components/layouts/Container";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import { URL_BD_MR } from "../../helpers/Constants";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Card from '@mui/material/Card';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GrDocumentImage } from "react-icons/gr";
import { useRouter } from "next/router";
import ModalUsuariosInactivos from "../mensajes/ModalUsuariosInactivos";
import VerSolicitudNvoVeh from "./VerSolicitudNvoVeh";
import DatosDevolucion from "./DatosDevolucion";
import Link from "next/link";

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

function createData(id, text, readEmail, date) {
    return { id, text, readEmail, date };
}

let tiponotificacion = null;
let useruid = null;
let idnotificacion = null;

export default function NotificationTable() {
    const router = useRouter();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [arrayNotificacion, setArrayNotificacion] = useState([]);
    const [arrayNotificacionAll, setArrayNotificacionAll] = useState([]);
    const [showModalMensajesInactivos, setShowModalMensajesInactivos] = useState(false);
    const [tituloMensajesInactivos, setTituloMensajesInactivos] = useState(false);
    const [textoMensajesInactivos, setTextoMensajesInactivos] = useState(false);
    const [tiempoInactivo, setTiempoInactivo] = useState(0);
    const [listEstados, setListEstados] = useState([]);

    const [modalDatosAdicional, setModalDatosAdicional] = useState(false);
    const [modalDevolucion, setModalDevolucion] = useState(false);

    const [datosSolicitud, setDatosSolicitud] = useState([]);
    const [dataSelectDevol, setDataSelectDevol] = useState([]);

    const handleCloseDatosAdicionl = () => setModalDatosAdicional(false);
    const handleCloseDevolucion = () => setModaxlDevolucion(false);

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    /*
    if (typeof window !== "undefined") {
        if (router.query.tiponotificacion) {
            tiponotificacion = router.query.tiponotificacion;
            useruid = router.query.uid;
            idnotificacion = router.query.idnotificacion;
        }
    } else {
        tiponotificacion = null;
    }
    */

    useEffect(() => {
        const leerEstadosProceso = async () => {
            let params = {
                proceso: 4
            }
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "163", params
                });

                if (res.data.type == 1) {
                    console.log(res.data)
                    setListEstados(res.data.listarestadosproceso)
                }
            } catch (error) {
                console.error("Error al leer estados por proceso", error);
            }
        };
        leerEstadosProceso();
    }, []);

    useEffect(() => {
        //let array = JSON.parse(localStorage.getItem("notificacionesusuario"));
        const leerNotificacionesActivas = async () => {
            let params = {
                uidusuario: datosusuarios.uid,
            };

            //console.log("USER ID:", params);
            await axios({
                method: "post",
                url: URL_BD_MR + "825",
                params,
            })
                .then((res) => {
                    if (res.data.type === 1) {

                        console.log("Notificación ACTIVAS:", res.data.listarnotificacionesactivas);

                        let datanotificacion = res.data.listarnotificacionesactivas;
                        localStorage.setItem(
                            "notificacionesusuario",
                            JSON.stringify(datanotificacion)
                        );

                        if (tiponotificacion == "usuario") {
                            let arraydata = [];
                            datanotificacion &&
                                datanotificacion.map((item, index) => {
                                    if (item.idnotificacion == idnotificacion) {
                                        arraydata.push(item);
                                    }
                                });
                            setArrayNotificacion(arraydata);
                        } else {
                            setArrayNotificacion(datanotificacion);
                            setArrayNotificacionAll(datanotificacion);
                        }

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
    }, [])

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

    const filtrarDatosEstado = (data) => {
        let nvoprod = [];
        arrayNotificacionAll &&
            arrayNotificacionAll.map((row, index) => {
                if (row.estado == data)
                    nvoprod.push(row);
            });
        setArrayNotificacion(nvoprod);
    }

    // Dropdown
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const verUserMas = (data) => {
        /*
        router.push({
            pathname: "/users/Users",
            query: {
                tiponotificacion: "usuario",
                uid: data.uid
            },
        });
        */
    }

    const limpiarFiltro = () => {
        setArrayNotificacion(arrayNotificacionAll);
    }

    const masDatos = (data) => {
        //alert(data.tiponotificacion)
        //console.log("DATSXXX: ", data);
        //return

        const leerCompra = async () => {
            let params = {
                numerodeaprobacion: data.idorigen
            }

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "1032", params
                });
                console.log("Leer Compras: ", res.data.listarmiscompras);

                if (res.data.listarmiscompras.length === 0) {
                    console.log("No se recibieron datos Compras ");
                    return;
                } else {
                    console.log("XXXXX : ", res.data.listarmiscompras);
                    let datacompra = res.data.listarmiscompras[0];

                    router.push({
                        pathname:
                            "/MisCompras/verCompra",
                        query: {
                            producto:
                                JSON.stringify(
                                    datacompra
                                ),
                            uidcomprador:
                                JSON.stringify(
                                    datacompra.uidcomprador
                                ),
                            ctlredirigir: JSON.stringify("0246810"),
                        },
                    })
                    //router.push(`/PQR/verPQR?id=${data.idorigen}`);
                }

            } catch (error) {
                console.error("Error al obtener los MarcasData", error);
            }
        }

        if (data.tiponotificacion == 3)
            leerCompra();

        const leerVenta = async () => {
            let params = {
                numerodeaprobacion: data.idorigen
            }

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "1032", params
                });
                console.log("Leer Compras: ", res.data.listarmiscompras);

                if (res.data.listarmiscompras.length === 0) {
                    console.log("No se recibieron datos Compras ");
                    return;
                } else {
                    console.log("XXXXX : ", res.data.listarmiscompras);
                    let datacompra = res.data.listarmiscompras[0];

                    router.push(
                        {
                            pathname:
                                "/MisVentas/verVenta",
                            query: {
                                venta: JSON.stringify(
                                    datacompra
                                ),
                            },
                            ctlredirigir: JSON.stringify("0246810"),
                        }
                    )
                    //router.push(`/PQR/verPQR?id=${data.idorigen}`);
                }

            } catch (error) {
                console.error("Error al obtener los MarcasData", error);
            }
        }

        if (data.tiponotificacion == 4 || data.tiponotificacion == 6)
            leerVenta();

        const leerFactura = async () => {

            let params = {
                numerodeventa: data.idorigen
            }

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "290", params
                });

                console.log("Leer Compras: ", res.data.listarfacturavendedor);

                if (res.data.listarfacturavendedor.length === 0) {
                    console.log("No se recibieron datos Compras ");
                    return;
                } else {
                    console.log("XXXXX : ", res.data.listarfacturavendedor);
                    let datacompra = res.data.listarfacturavendedor[0];
                    /*
                     <a
                         href={`${URL_IMAGES_RESULTSSMS}${datacompra.nombreimagen1}`}
                         target="_blank">
                     </a>
                     */
                    //router.push(`${URL_IMAGES_RESULTSSMS}${datacompra.nombreimagen1}`);
                    window.open(`${URL_IMAGES_RESULTSSMS}${datacompra.nombreimagen1}`, '_blank');
                }

            } catch (error) {
                console.error("Error al obtener los MarcasData", error);
            }
        }

        if (data.tiponotificacion == 15)
            leerFactura();


        const leerPQR = async () => {
            let params = {
                id: data.idorigen
            }

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "278", params
                });
                console.log("Leer PQR: ", res.data.listarpqr);

                if (res.data.listarpqr.length === 0) {
                    console.log("No se recibieron datos PQR ");
                    return;
                } else {
                    //console.log("XXXXX : ", res.data.listarpqr[0]);
                    router.push(`/PQR/verPQR?id=${data.idorigen}`);
                }

            } catch (error) {
                console.error("Error al obtener los MarcasData", error);
            }
        }

        if (data.tiponotificacion == 8)
            leerPQR();

        const leerSolicitud = async () => {
            let params = {
                idsolicitud: data.idorigen
            }

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "207", params
                });
                console.log("Respuesta Nvo veh: ", res.data.listarsolicitudnvoveh);

                if (res.data.listarsolicitudnvoveh.length === 0) {
                    console.log("No se recibieron datos");
                    return;
                } else {
                    //console.log("XXXXX : ", res.data.listarsolicitudnvoveh[0]);
                    setDatosSolicitud(res.data.listarsolicitudnvoveh[0])
                    setModalDatosAdicional(true);
                }

            } catch (error) {
                console.error("Error al obtener los MarcasData", error);
            }
        }

        if (data.tiponotificacion == 10)
            leerSolicitud();

        const leerPrd = async () => {
            let producto = 0;

            let params = {
                numerodeaprobacion: data.idorigen
            }

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "1032", params
                });

                producto = res.data.listarmiscompras[0];
                //console.log("PASASASx : ", producto);
                //return
                router.push({
                    pathname: "/MisCompras/msjMensajeRedirigir",
                    query: {
                        uidusuario: JSON.stringify(data.uidusuario),
                        idproducto: JSON.stringify(producto.idproducto),
                        idmicompra: JSON.stringify(producto.numerodeaprobacion),
                        ctlredirigir: JSON.stringify("0246810"),
                    },
                })
            } catch (error) {
                console.error("Error al leer estados por proceso", error);
            }
        };

        if (data.tiponotificacion == 7)
            leerPrd();

        const leerDevoluciones = async () => {
            let producto = 0;

            let params = {
                numerodeaprobacion: data.idorigen
            }

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "1032", params
                });

                producto = res.data.listarmiscompras[0];
                //console.log("PASASASx : ", producto);
                //return

                router.push({
                    pathname:
                        "/MisCompras/SeguimientoProblemas",
                    query: {
                        producto:
                            JSON.stringify(
                                producto
                            ),
                        ctlredirigir: JSON.stringify("0246810"),
                    },
                })
            } catch (error) {
                console.error("Error al leer estados por proceso", error);
            }
        }

        if (data.tiponotificacion == 2)
            leerDevoluciones();

        return

        const verPreguntaComprador = () => {
            //URL_MK_MR + "PreguntasYrespuestas/prgRealizadasPorUsuarioRedirigir",
            router.push({
                pathname:
                    URL_MK_MR + "PreguntasYrespuestas/prgRealizadasPorUsuarioRedirigir",
                query: {
                    uidcomprador: JSON.stringify(data.uidusuario),
                    idpregunta: JSON.stringify(data.idorigen),
                    ctlredirigir: JSON.stringify("0246810"),
                },
            })
        }

        if (data.tiponotificacion == 5)
            verPreguntaComprador();

    }

    return (
        <Container>

            <Modal
                open={modalDatosAdicional}
                onClose={handleCloseDatosAdicionl}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                < VerSolicitudNvoVeh
                    datosSolicitud={datosSolicitud}
                    idsolicitud={datosSolicitud.id}
                    setModalDatosAdicional={setModalDatosAdicional}
                />
            </Modal>

            <Modal
                open={modalDevolucion}
                onClose={handleCloseDatosAdicionl}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <DatosDevolucion
                    dataSelectDevol={dataSelectDevol}
                    setModalDatosAdicional={setModalDevolucion}
                    usuario={dataSelectDevol.usuariocomprador}
                    email={dataSelectDevol.emailcomprador}
                    nombres={dataSelectDevol.nombrecomprador + " " + dataSelectDevol.apellidocomprador}
                    razonsocial={dataSelectDevol.razonsocialcomprador}
                    useruid={dataSelectDevol.usuariocompra}
                    identificacion={dataSelectDevol.identificacioncomprador}
                    estadosolicitud={dataSelectDevol.estadosolicitud}
                    comentario={dataSelectDevol.comentario}
                    cantidad={dataSelectDevol.cantidad}
                    direccionenvio={dataSelectDevol.direcciondeenvio}
                    fechasolicitud={dataSelectDevol.fechasolicitud}
                    tipoidentificacion={dataSelectDevol.tipoidentificacion}
                    idmicompra={dataSelectDevol.idmicompra}
                    precioproducto={dataSelectDevol.preciodeventa + dataSelectDevol.precioenvio}
                    precioenvio={dataSelectDevol.precioenvio}
                    idsolicitud={dataSelectDevol.idsolicitud}
                //idmicompra
                />
            </Modal>

            <div>
                <ModalUsuariosInactivos
                    shown={showModalMensajesInactivos}
                    close={setShowModalMensajesInactivos}
                    titulo={tituloMensajesInactivos}
                    mensaje={textoMensajesInactivos}
                    tiempoInactivo={tiempoInactivo}
                    arrayNotificacion={arrayNotificacion}
                    tipo="1"
                />
            </div>
            <div>
                <Card
                    sx={{
                        boxShadow: "none",
                        borderRadius: "10px",
                        p: "25px 25px 10px",
                        mb: "15px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: "1px solid #EEF0F7",
                            paddingBottom: "10px",
                            mb: "20px",
                        }}
                        className="for-dark-bottom-border"
                    >
                        <Grid container spacing={1}
                            sx={{ marginTop: '5px' }}
                        >
                            <Grid item xs={12} md={5} lg={5}>
                                <Typography
                                    as="h3"
                                    sx={{
                                        fontSize: 16,
                                        fontWeight: 500,
                                    }}
                                >
                                    Lista de notificaciones
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={5} lg={5}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        sx={{ marginLeft: -1, marginTop: -2.7, fontSize: '14px' }}
                                    >Estado notificación</InputLabel>
                                    <Select

                                        label="Filtra por estado"
                                        sx={{
                                            marginTop: -1.5,
                                            width: 160,
                                            height: 30,
                                            color: '#2D2E83',
                                            fontSize: '14px',
                                        }}
                                    >
                                        {
                                            listEstados &&
                                            listEstados.map((row, index) => {
                                                return (
                                                    <MenuItem
                                                        sx={{ fontSize: '14px', color: '#2D2E83', }}
                                                        value={row.tipodeestado}
                                                        onClick={() => filtrarDatosEstado(row.tipodeestado)}
                                                    >
                                                        {row.nombre}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={2} lg={2}>
                                <Button
                                    sx={{ ml: 0, width: 120, minWidth: 120 }}
                                    className="botonlimpiarfiltro" color="primary"
                                    onClick={() => limpiarFiltro()}
                                >
                                    Limpiar filtro
                                </Button>
                            </Grid>
                        </Grid>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
                                    "& .MuiAvatar-root": {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    "&:before": {
                                        content: '""',
                                        display: "block",
                                        position: "absolute",
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: "background.paper",
                                        transform: "translateY(-50%) rotate(45deg)",
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                            <MenuItem sx={{ fontSize: "14px" }}>Ultimos 3 días</MenuItem>
                            <MenuItem sx={{ fontSize: "14px" }}>Ultimos 7 días</MenuItem>
                            <MenuItem sx={{ fontSize: "14px" }}>ultimos 15 días</MenuItem>
                        </Menu>
                    </Box>

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
                                            width: "150px",
                                        }}>
                                        Tipo
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: "500px",
                                        }}>
                                        Descripción
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: "100px",
                                        }}>
                                        Fecha
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: "100px",
                                        }}>
                                        Estado
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: "300px",
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
                                                width: '100px',
                                                borderBottom: "1px solid #F7FAFF",
                                                fontSize: "14px",
                                                padding: "10px",
                                                color: '#2D2E83',
                                                paddingLeft: '18px'
                                            }}
                                        >
                                            {row.nombrenotificacion}
                                        </TableCell>
                                        <TableCell
                                            className="apuntador textnotificacion"
                                            onClick={() => masDatos(row)}
                                        >
                                            {
                                                row.tiponotificacion == 3 ?
                                                    <div>
                                                        <button
                                                            className="textnotificacion2"
                                                        >
                                                            {row.comentario}
                                                        </button>
                                                    </div>
                                                    :
                                                    row.tiponotificacion == 14 ?
                                                        <div>
                                                            <a
                                                                href={row.urlpdf}>
                                                                {row.comentario}
                                                            </a>
                                                        </div>
                                                        :
                                                        row.tiponotificacion == 13 ?
                                                            <div>
                                                                <a
                                                                    href={`/product/${row.idproducto}`}>
                                                                    {row.comentario}
                                                                </a>
                                                            </div>
                                                            :
                                                            row.tiponotificacion == 11 ?
                                                                <div>
                                                                    <a
                                                                        href={`/product/${row.idproducto}`}>
                                                                        {row.comentario}
                                                                    </a>
                                                                </div>
                                                                :
                                                                row.tiponotificacion == 1 ?
                                                                    <div>
                                                                        <button
                                                                            onClick={() =>
                                                                                router.push({
                                                                                    pathname:
                                                                                        "/EditUsers/FormsEditUsers/ValidDocsPjuridica"
                                                                                })
                                                                            }>
                                                                            {row.comentario}
                                                                        </button>
                                                                    </div>
                                                                    :
                                                                    row.tiponotificacion == 12 ?
                                                                        <div>
                                                                            <button
                                                                                onClick={() =>
                                                                                    router.push({
                                                                                        pathname:
                                                                                            "/MiBilletera"
                                                                                    })
                                                                                }>
                                                                                {row.comentario}
                                                                            </button>
                                                                        </div>
                                                                        :
                                                                        row.tiponotificacion == 23 ?
                                                                            <div>
                                                                                <button
                                                                                    onClick={() =>
                                                                                        router.push({
                                                                                            pathname:
                                                                                                "/MisCompras/verCompra",
                                                                                            query: {
                                                                                                producto:
                                                                                                    JSON.stringify(
                                                                                                        row
                                                                                                    ),
                                                                                                uidcomprador:
                                                                                                    JSON.stringify(
                                                                                                        row.uid
                                                                                                    ),
                                                                                                ctlredirigir: JSON.stringify("0246810"),
                                                                                            },
                                                                                        })
                                                                                    }>
                                                                                    Ver Compra
                                                                                </button>
                                                                            </div>
                                                                            :
                                                                            <div
                                                                                onClick={() => masDatos(row)}
                                                                            >
                                                                                {row.comentario}
                                                                            </div>
                                            }

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
                                            {row.fechacreacion}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                width: '220px',
                                                borderBottom: "1px solid #F7FAFF",
                                                fontSize: "14px",
                                                padding: "10px",
                                                paddingLeft: '18px',
                                                color: '#2D2E83',
                                            }}
                                        >
                                            {row.nombreestado}
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
                                        className="textopagenumber"
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={Notification}
                                        style={{ fontSize: "13px", color: "#2D2E83" }}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Card>
            </div>
        </Container>
    );
} 1