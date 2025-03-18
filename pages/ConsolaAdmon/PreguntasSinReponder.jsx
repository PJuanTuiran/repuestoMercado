import React, { Component, forwardRef, useState, useEffect } from "react";
import Container from "../../components/layouts/Container";
import ContainerAdmon from "../../components/layouts/ContainerAdmon";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import EditIcon from "@material-ui/icons/Edit";
import { useRouter } from "next/router";
import {
    Typography,
    Button,
    Modal,
    Avatar,
    IconButton,
    FormControlLabel,
    Input,
} from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
    URL_BD_MR,
    URL_IMAGES_RESULTS,
    URL_IMAGES_RESULTSSMS,
} from "../../helpers/Constants";
import axios from "axios";
import moment from "moment";
import { getReturn } from "../../store/return/action";
import { useDispatch, useSelector } from "react-redux";

function PreguntasSinReponder(props) {
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();
    const datareturn = useSelector((state) => state.retornar.return);

    const leerMensajes = async () => {
        const datauser = JSON.parse(localStorage.getItem("datauser"));
        let params = {
            estado: 81,
        };

        try {
            const response = await axios({
                method: "post",
                url: `${URL_BD_MR}844`,
                params,
            });

            const datax = response.data.listarmensajes;

            let messag = [];
            datax &&
                datax.map((row, index) => {
                    if (datauser.tipousuario == 1) {
                        const readUsersCompra = async () => {
                            params = {
                                usuario: row.usuariocompra,
                            };

                            await axios({
                                method: "post",
                                url: URL_BD_MR + "13",
                                params,
                            })
                                .then((res) => {
                                    let datusr = res.data[0];

                                    let item = {
                                        activo: row.activo,
                                        celular: row.celular,
                                        comentario: row.comentario,
                                        direccion: row.direccion,
                                        email: row.email,
                                        estado: row.estado,
                                        fechacreacion: row.fechacreacion,
                                        fechatoken: row.fechatoken,
                                        id: row.id,
                                        idprd: row.idprd,
                                        idaprobacioncompra:
                                            row.idaprobacioncompra,
                                        identificacion: row.identificacion,
                                        idproducto: row.idproducto,
                                        nombreimagen1: row.nombreimagen1,
                                        nombreimagen2: row.nombreimagen2,
                                        nombreimagen3: row.nombreimagen3,
                                        nombreimagen4: row.nombreimagen4,
                                        nombreimagen5: row.nombreimagen5,
                                        observacionintera:
                                            row.observacionintera,
                                        primerapellido: row.primerapellido,
                                        primernombre: row.primernombre,
                                        razonsocial: row.razonsocial,
                                        segundoapellido: row.segundoapellido,
                                        segundonombre: row.segundonombre,
                                        tipoidentificacion:
                                            row.tipoidentificacion,
                                        tipousuario: row.tipousuario,
                                        titulonombre: row.titulonombre,
                                        token: row.token,
                                        uid: row.uid,
                                        usuariocomprador: row.usuariocompra,
                                        usuariovende: row.usuariovende,
                                        fechaventa: row.fechaventa,
                                        nombrecomprador:
                                            datusr.primernombre +
                                            " " +
                                            datusr.primerapellido,
                                        telefonocomprador: datusr.celular,
                                        unidadesdisponible:
                                            row.unidadesdisponible,
                                        precio: row.precio,
                                        nombrecomprador: datusr.primernombre,
                                        apellidocomprador:
                                            datusr.primerapellido,
                                        emailcomprador: datusr.email,
                                        identificacioncomprador:
                                            datusr.identificacion,
                                        nombreestado: row.nombreestado,
                                    };
                                    messag.push(item);

                                    setMessages(messag);
                                })
                                .catch(function (error) {});
                        };
                        readUsersCompra();
                    }
                });

            const mensajesOrdenados = messag.sort(
                (a, b) => new Date(a.fechacreacion) - new Date(b.fechacreacion)
            );

            // Actualizar el estado con los mensajes recibidos
            //setMessages(mensajesOrdenados);
        } catch (error) {
            console.error("Error leyendo mensajes:", error);
        }
    };
    // Efecto para cargar mensajes al montar y actualizar
    useEffect(() => {
        leerMensajes();
    }, [datareturn]);

    const irDetalle = (row) => {
        dispatch(getReturn(false));
        router.push({
            pathname: "./VerDetalleMensaje",
            query: {
                producto: JSON.stringify(row),
            },
        });
    };

    return (
        <div>
            <ContainerAdmon title="Mi Cuenta">
                <div className="ps-page ps-page--inner" id="myaccount">
                    <div className="divprgsinresponder">
                        <Box>
                            {/* Page title */}
                            <TableContainer
                                component={Paper}
                                sx={{
                                    boxShadow: "none",
                                    maxHeight: "900px",
                                    overflowY: "auto",
                                }}>
                                <Table
                                    sx={{ minWidth: 700, ml: "0px" }}
                                    aria-label="simple table"
                                    className="dark-table"
                                    id="ventasinmuebles">
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
                                                    width: "50px",
                                                }}>
                                                Nombre cliente
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    width: "50px",
                                                }}>
                                                Identificación cliente
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    width: "50px",
                                                }}>
                                                Teléfono cliente
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    width: "50px",
                                                }}>
                                                Producto
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    width: "80px",
                                                }}>
                                                Fecha de venta
                                            </TableCell>

                                            <TableCell
                                                sx={{
                                                    width: "80px",
                                                }}>
                                                Vendedor
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    width: "80px",
                                                }}>
                                                Telefono vendedor
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    width: "80px",
                                                }}>
                                                Estado pregunta
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    width: "80px",
                                                }}>
                                                Editar
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {messages &&
                                            messages.map((row, index) => {
                                                return (
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
                                                            <Typography className="textoprgsinresponder">
                                                                {row.nombrecomprador +
                                                                    " " +
                                                                    row.apellidocomprador}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography className="textoprgsinresponder">
                                                                {
                                                                    row.identificacioncomprador
                                                                }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography className="textoprgsinresponder">
                                                                {
                                                                    row.telefonocomprador
                                                                }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography className="textoprgsinresponder">
                                                                {
                                                                    row.titulonombre
                                                                }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Typography className="textoprgsinresponder">
                                                                {moment(
                                                                    row.fechaventa
                                                                ).format(
                                                                    "YYYY-MM-DD"
                                                                )}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography className="textoprgsinresponder">
                                                                {row.primernombre +
                                                                    " " +
                                                                    row.primerapellido}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography className="textoprgsinresponder">
                                                                {row.celular}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography className="textoprgsinresponder">
                                                                {
                                                                    row.nombreestado
                                                                }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            onClick={() =>
                                                                irDetalle(row)
                                                            }>
                                                            <EditIcon
                                                                className="editprgresponder"
                                                                style={{
                                                                    fontSize: 25,
                                                                    color: "#2D2E83",
                                                                    marginleft: 10,
                                                                }}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </div>
                </div>
            </ContainerAdmon>
        </div>
    );
}

export default PreguntasSinReponder;
