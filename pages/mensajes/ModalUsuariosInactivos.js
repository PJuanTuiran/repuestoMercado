import React, { useState, useEffect, Suspense } from "react";
//import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import { Box, Grid, Popover, Typography, TextField, FormControl, Button } from "@mui/material";
import InfoIcon from "@material-ui/icons/Info";

import { Table, TableHead, TableBody, TableCell, TableContainer } from "@mui/material";
import TableRow from "@mui/material/TableRow";

function ModalUsuariosInactivos(props) {
    const { shown, close, titulo, mensaje, tipo, tiempoInactivo, arrayNotificacion } = props;

    return shown ? (
        <div
            className="modal-fondo mtmenos15"
            onClick={() => {
                close(false);
            }}>
            <div
                className="modal-mensajes-usuario redondearventamensajes "
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Grid container spacing={1}>
                        <Grid item xs={1} md={1} lg={1}>
                            <div className="iconoventanamensajes mtmenos14">
                                <InfoIcon style={{ fontSize: 45 }} />
                            </div>
                        </Grid>
                        <Grid item xs={9} md={9} lg={9}>
                            <div className="    titulodetaildescription">
                                {titulo}
                            </div>
                        </Grid>
                        <Grid item xs={1} md={1} lg={1}>
                            <button
                                type="button"
                                className="cerrarmodal ml-50px sinborder colorbase"
                                data-dismiss="modal"
                                onClick={() => close(false)}>
                                {" "}
                                X{" "}
                            </button>
                        </Grid>
                    </Grid>
                </div>
                {
                    <TableContainer>
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
                                      className="nombreusuarioinactivo"
                                      >
                                        Usuario
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: "200px",
                                          
                                        }}>
                                        ID
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    arrayNotificacion.length > 0 ?
                                        arrayNotificacion && arrayNotificacion.map((item, index) => {
                                            return (
                                                <div>

                                                    {item.tiempo <= 2 && tiempoInactivo == 2 ?
                                                        <TableRow
                                                            sx={{
                                                                "&:last-child td, &:last-child th":
                                                                {
                                                                    color: "#2D2E83",
                                                                    fontSize:
                                                                        "10px",
                                                                },
                                                            }}>
                                                            <TableCell>
                                                                <Typography className="textouusuariositectivos">
                                                                    {item.usuario}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography className="textouusuariositectivos">
                                                                    {item.uid}
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                        :
                                                        item.tiempo > 2 && item.tiempo <= 5 && tiempoInactivo == 5 ?
                                                            <TableRow
                                                                sx={{
                                                                    "&:last-child td, &:last-child th":
                                                                    {
                                                                        color: "#2D2E83",
                                                                        fontSize:
                                                                            "10px",
                                                                    },
                                                                }}>
                                                                <TableCell>
                                                                    <Typography className="textouusuariositectivos">
                                                                        {item.usuario}
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Typography className="textouusuariositectivos">
                                                                        {item.uid}
                                                                    </Typography>
                                                                </TableCell>
                                                            </TableRow>
                                                            : item.tiempo > 5 && tiempoInactivo == 6 ?
                                                                <TableRow
                                                                    sx={{
                                                                        "&:last-child td, &:last-child th":
                                                                        {
                                                                            color: "#2D2E83",
                                                                            fontSize:
                                                                                "10px",
                                                                        },
                                                                    }}>
                                                                    <TableCell>
                                                                        <Typography className="textouusuariositectivos">
                                                                            {item.usuario}
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Typography className="textouusuariositectivos">
                                                                            {item.uid}
                                                                        </Typography>
                                                                    </TableCell>
                                                                </TableRow>
                                                                : null
                                                    }
                                                </div>
                                            )

                                        }) :
                                        null
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
                <div className="">
                    <Grid container spacing={1}>
                        <Grid xl={4} lg={4} md={4} xs={4} />
                        <Grid xl={6} lg={6} md={6} xs={6}>
                            <div
                                variant="outline-light"
                                className="botonusariosinactivos"
                                onClick={() => close(false)}>
                                {" "}
                                Cerrar
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalUsuariosInactivos;