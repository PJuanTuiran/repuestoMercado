import React, { useEffect, useMemo, useState } from "react";
import { Dialog, Grid, useMediaQuery, useTheme, IconButton, Slide, Paper, Table, Drawer } from "@mui/material";
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Divider } from "@mui/material";
import axios from "axios";
import { Typography } from "antd";
import { FaRegWindowClose } from "react-icons/fa";

function VerSolicitudNvoVeh({ datosSolicitud, setModalDatosAdicional, idsolicitud }) {
    //const {datosAdicional} = props;
    //console.log("XXXXX : ", datosSolicitud);
    const columns2 = ["Tipo Vehículo", "Carroceria", "Marca", "Año", "Modelo", "Cilindraje", "Combustible", "Transmisón", "Tracción"];

    const cerrarDatosSolicitud = () => {
        setModalDatosAdicional(false);
    }

    return (
        <div className='modalverdatossolicitud'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={11} lg={11}>
                    <Typography className="textodatasolicitud">
                        Datos Solicitud # {idsolicitud}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={1} lg={1}
                    onClick={() => cerrarDatosSolicitud()}
                >
                    <FaRegWindowClose
                        className="iconclosesolicitud"
                    />
                </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                <Table id="table-to-xls" sx={{ minWidth: 730 }} aria-label="custom pagination table" className="dark-table"  >
                    <TableHead sx={{ background: "#F7FAFF" }}>
                        <TableRow>
                            {columns2.map((column) => (
                                <TableCell
                                    key={column}
                                    sx={{
                                        borderBottom: "1px solid #2D2E83",
                                        color: '#2D2E83',
                                        fontSize: "16px",
                                    }}
                                >
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody key={idsolicitud}>
                        <TableRow>
                            <TableCell
                                className="textoitemcategorias"
                            >
                                {datosSolicitud && datosSolicitud.selecttipo}
                            </TableCell>
                            <TableCell
                                className="textoitemcategorias"
                            >
                                {datosSolicitud && datosSolicitud.selectcarroceria}
                            </TableCell>
                            <TableCell
                                className="textoitemcategorias"
                            >
                                {datosSolicitud && datosSolicitud.selectmarca}
                            </TableCell>
                            <TableCell
                                className="textoitemcategorias"
                            >
                                {datosSolicitud && datosSolicitud.selectanno}
                            </TableCell>
                            <TableCell
                                className="textoitemcategorias"
                            >
                                {datosSolicitud && datosSolicitud.selectmodelo}
                            </TableCell>
                            <TableCell
                                className="textoitemcategorias"
                            >
                                {datosSolicitud && datosSolicitud.selectcilindraje}
                            </TableCell>
                            <TableCell
                                className="textoitemcategorias"
                            >
                                {datosSolicitud && datosSolicitud.selectcombustible}
                            </TableCell>
                            <TableCell
                                className="textoitemcategorias"
                            >
                                {datosSolicitud && datosSolicitud.selecttransmision}
                            </TableCell>
                            <TableCell
                                className="textoitemcategorias"
                            >
                                {datosSolicitud && datosSolicitud.selecttraccion}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid item xs={12} md={12} lg={12}>
                <Typography className="textosolicitudveh">
                    La respuesta a tu solicitud, sera enviada al correo que tienes registrado en Mercado Repuesto
                </Typography>
            </Grid>
        </div>
    );
}

export default VerSolicitudNvoVeh;