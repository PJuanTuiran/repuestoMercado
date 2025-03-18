import Container from "../../components/layouts/Container";
import {
    Box,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    InputAdornment,
    TextField,
    InputBase,
    Button,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import { Dropdown } from "react-bootstrap";
import { NextRouter } from "next/router";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { AiOutlineRight } from "react-icons/ai";
import { IoIosCamera } from "react-icons/io";
import { IoSquareOutline } from "react-icons/io5";
import ModalMensajes from "../mensajes/ModalMensajes";
import { URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { RiSettings5Fill } from "react-icons/ri";
import { URL_BD_MR } from "../../helpers/Constants";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export default function calificarVendedor() {
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [confirmationOpen, setConfirmationOpen] = useState(false); //Modal de confirmación si ingresó los datos
    const [showCalificacionModal, setShowCalificacionModal] = useState(false); //Modal que avisa si no puso calificación
    const [showComentarioModal, setShowComentarioModal] = useState(false); //Modal que avisa si no puso comeents
    const [showAmbosModal, setShowAmbosModal] = useState(false); //Modal que avisa si no puso nada
    const [calificacionSeleccionada, setCalificacionSeleccionada] = useState(0);
    const [vendedorCalificado, setVendedorCalificado] = useState(false);
    const [comentarioExistente, setComentarioExistente] = useState("");
    const [calificacionProducto, setCalificacionProducto] = useState(null);
    const [calificacionExistente, setCalificacionExistente] = useState(null);
    const [comentario, setComentario] = useState("");

    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const irA = useRef(null);
    const router = useRouter();
    const contadorCaracteres = `${
        comentarioExistente ? comentarioExistente.length : 0
    }/180`;
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    //console.log("DAT USER CALIFICAR VENDEDOR: ", datosusuarios.uid);
    const [calificacionVendedor, setCalificacionVendedor] = useState(0);
    const [showModal, setShowModal] = useState(false); //Estado de modal

    //recibir los datos del producto comprado y guardar url para cuando reinicie seguir en el mismo
    let producto = null;

    if (typeof window !== "undefined") {
        if (router.query.producto) {
            producto = JSON.parse(router.query.producto);
            // Guardar los datos en el almacenamiento local
            localStorage.setItem("producto", JSON.stringify(producto));
        } else {
            // Recuperar los datos del almacenamiento local
            const data = localStorage.getItem("producto");
            if (data) {
                producto = JSON.parse(data);
            }
        }
    }

    if (producto) {
        console.log("Id del producto: ", producto.idproducto);
    } else {
        console.log("Producto es null");
    }

    //router push si los datos son colocados correctamente sale esto en el dialog
    const handleConfirmationSuccess = (route) => () => {
        router.push(route);
    };

    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };
    //validar si hay una calificación
    const validarCalificacion = () => {
        if (!calificacionSeleccionada) {
            // Modal si no seleccionó calificación
            setShowCalificacionModal(true);
            return false;
        }

        // Nueva validación para palabras no permitidas
        let validaword = [
            { word: "www" },
            { word: "carrera" },
            { word: "avenida" },
            { word: "#" },
            { word: "N°" },
            { word: "@" },
            { word: ".com" },
            { word: ".co" },
            { word: ".net" },
            { word: "contactanos" },
            { word: "contacto" },
            { word: "llama" },
            { word: "llamar" },
            { word: "telefono" },
            { word: "celular" },
            { word: "movil" },
            { word: "email" },
            { word: "gmail" },
        ];

        for (let i = 0; i < validaword.length; i++) {
            if (
                comentario
                    .toLowerCase()
                    .includes(validaword[i].word.toLowerCase())
            ) {
                setTituloMensajes("Validación de mensaje");
                setTextoMensajes(
                    "Tu mensaje contiene palabras o caracteres no permitidos."
                );
                setShowModal(true);
                return false;
            }
        }

        // Nueva validación para números y el carácter "@"
        let validacaracteres;
        let valornum = "";

        for (var i = 0; i < comentario.length; i++) {
            validacaracteres = comentario.substr(i, 1);

            if (
                validacaracteres == 0 ||
                validacaracteres == 1 ||
                validacaracteres == 2 ||
                validacaracteres == 3 ||
                validacaracteres == 4 ||
                validacaracteres == 5 ||
                validacaracteres == 6 ||
                validacaracteres == 7 ||
                validacaracteres == 8 ||
                validacaracteres == 9
            ) {
                valornum = valornum + validacaracteres;
            }

            if (valornum.length > 5) {
                setTituloMensajes("Validación de mensaje");
                setTextoMensajes(
                    "Tu mensaje contiene palabras o caracteres no permitidos."
                );
                setShowModal(true);
                return false;
            }

            if (validacaracteres == "@") {
                setTituloMensajes("Validación de mensaje");
                setTextoMensajes(
                    "Tu mensaje contiene palabras o caracteres no permitidos."
                );
                setShowModal(true);
                return false;
            }
        }

        return true;
    };

    const obtenerUidVendedor = (producto) => {
        if (!producto) {
            console.error("Error: producto es null");
            return;
        }

        let params = {
            idarticulo: producto.idproducto,
        };

        return axios({
            method: "post",
            url: `${URL_BD_MR}18`,
            params,
        })
            .then((res) => {
                return res.data[0].usuario; // Devuelve directamente el uidvendedor
            })
            .catch((error) => {
                console.error("Error al obtener el uidvendedor:", error);
            });
    };

    const enviarCalificacion = async () => {
        if (!validarCalificacion()) {
            return; // Si la validación falla, termina la función aquí
        }
        const uidvendedor = await obtenerUidVendedor(producto);
        const uidproducto = producto.idproducto;
        const nuevaCalificacion = {
            uidcomprador: datosusuarios.uid,
            uidvendedor: uidvendedor,
            uidproducto: uidproducto,
            calificacion: calificacionSeleccionada,
            comentario: comentarioExistente, // Utiliza comentarioExistente aquí
        };

        await axios({
            method: "post",
            url: `${URL_BD_MR}49`,
            params: nuevaCalificacion,
        })
            .then((res) => {
                console.log("Respuesta del servidor:", res.data);
                setConfirmationOpen(true);

                // Actualizar lógica adicional según sea necesario
            })
            .catch((error) => {
                console.error("Error al enviar la calificación:", error);
            });
    };

    const handleComentarioChange = (event) => {
        if (event.target.value.length <= 180) {
            setComentarioExistente(event.target.value);
        }
    };
    const handleCalificacionIconClick = (valoracion) => {
        setCalificacionSeleccionada(valoracion);
    };

    const listarCalificaciones = async () => {
        console.log("listarCalificaciones se está ejecutando");

        const uidvendedor = await obtenerUidVendedor(producto);
        const uidproducto = producto.idproducto;

        const params = {
            uidcomprador: datosusuarios.uid,
            uidvendedor: uidvendedor,
            uidproducto: uidproducto,
        };

        return axios({
            method: "post",
            url: `${URL_BD_MR}50`,
            params,
        })
            .then((res) => {
                console.log("Respuesta del servidor:", res.data);
                // Mapear y mostrar cada calificación
                res.data.listarcalificacionvendprd.map((calificacion) => {
                    console.log("Calificación:", calificacion);
                });

                // Si hay calificaciones, establece la primera como la calificación del producto
                if (res.data.listarcalificacionvendprd.length > 0) {
                    const calificacionExistente =
                        res.data.listarcalificacionvendprd[0];
                    setCalificacionProducto(calificacionExistente.calificacion);
                    setComentarioExistente(calificacionExistente.comentario);
                    setCalificacionSeleccionada(
                        calificacionExistente.calificacion
                    ); // Actualiza calificacionSeleccionada

                    if (calificacionExistente.calificacion !== null) {
                        setVendedorCalificado(true);
                        setCalificacionVendedor(
                            calificacionExistente.calificacion
                        ); // Agrega esta línea
                    }
                }
            })
            .catch((error) => {
                console.error("Error al listar las calificaciones:", error);
            });
    };

    useEffect(() => {
        listarCalificaciones();
    }, []); // El array vacío significa que este efecto solo se ejecutará una vez, cuando el componente se monte

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    return (
        <div ref={irA}>
            <div>
                {producto ? (
                    <Container title="Mi Cuenta">
                        <div className="ps-page ps-page--inner" id="myaccount">
                            <div className="container">
                                <div className="ps-page__header"> </div>
                                <div className="ps-page__content ps-account">
                                    <Grid container>
                                        <Grid
                                            className="subcprinccalific"
                                            item
                                            xs={12}
                                            md={7}
                                            sx={{
                                                width: isMdDown
                                                    ? "100%"
                                                    : "90%",
                                            }}
                                            flexDirection={"column"}>
                                            <div className="titleTproblema">
                                                <p>Calificar vendedor</p>
                                            </div>
                                            <Grid
                                                className="calificSubC"
                                                item
                                                xs={12}
                                                md={12}
                                                sx={{
                                                    width: isMdDown
                                                        ? "100%"
                                                        : "90%",
                                                }}
                                                flexDirection={"column"}>
                                                <form
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "flex-end",
                                                        flexDirection: "column",
                                                    }}>
                                                    <p>
                                                        Elige de uno a cinco la
                                                        calificación para tu
                                                        vendedor, siendo uno lo
                                                        más bajo y cinco lo más
                                                        alto:
                                                    </p>
                                                    <div className="SubContcalificSubC">
                                                        <div className="notanumero">
                                                            <p>
                                                                {(vendedorCalificado
                                                                    ? calificacionVendedor
                                                                    : calificacionExistente ||
                                                                      calificacionSeleccionada ||
                                                                      0
                                                                ).toFixed(1)}
                                                            </p>
                                                        </div>
                                                        <div className="iconsConfig">
                                                            {[
                                                                1, 2, 3, 4, 5,
                                                            ].map(
                                                                (
                                                                    valoracion,
                                                                    index
                                                                ) => (
                                                                    <RiSettings5Fill
                                                                        key={
                                                                            index
                                                                        }
                                                                        size={
                                                                            40
                                                                        }
                                                                        style={{
                                                                            color:
                                                                                valoracion <=
                                                                                calificacionSeleccionada
                                                                                    ? "#2C2E82"
                                                                                    : "#acadcd",
                                                                            cursor: vendedorCalificado
                                                                                ? "default"
                                                                                : "pointer",
                                                                        }}
                                                                        onClick={
                                                                            vendedorCalificado
                                                                                ? null
                                                                                : () =>
                                                                                      handleCalificacionIconClick(
                                                                                          valoracion
                                                                                      )
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="textmiddlecalific">
                                                        <p>
                                                            Si deseas deja un
                                                            comentario sobre tu
                                                            experiencia con el
                                                            vendedor:
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <textarea
                                                            value={
                                                                comentarioExistente
                                                            }
                                                            onChange={
                                                                handleComentarioChange
                                                            }
                                                            placeholder="Escribe un mensaje al vendedor"
                                                            style={{
                                                                height: "160px",
                                                                width: "100%",
                                                                resize: "none",
                                                            }}
                                                            disabled={
                                                                vendedorCalificado
                                                            }
                                                        />
                                                        <div
                                                            style={{
                                                                textAlign:
                                                                    "right",
                                                                marginTop:
                                                                    "0.5rem",
                                                                color: "#2C2E82",
                                                                fontSize:
                                                                    "14px",
                                                            }}>
                                                            {contadorCaracteres}
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: "100%",
                                                            display: "flex",
                                                            justifyContent:
                                                                "flex-end",
                                                            marginTop: "3rem",
                                                        }}>
                                                        {vendedorCalificado ? (
                                                            <p>
                                                                Este vendedor ya
                                                                ha sido
                                                                calificado, solo
                                                                es posible
                                                                calificarlo una
                                                                vez.
                                                            </p>
                                                        ) : (
                                                            <button
                                                                style={{
                                                                    width: "170px",
                                                                    backgroundColor:
                                                                        "#2D2E83",
                                                                    color: "white",
                                                                    borderRadius:
                                                                        "10px",
                                                                    fontSize:
                                                                        "16px",
                                                                    height: "40px",
                                                                }}
                                                                onClick={
                                                                    enviarCalificacion
                                                                }
                                                                type="button">
                                                                Enviar
                                                            </button>
                                                        )}
                                                    </div>
                                                </form>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            className="contInfoProdComprCalif"
                                            item
                                            xs={12}
                                            md={5}
                                            flexDirection={"column"}>
                                            <div className="titlecalifVended">
                                                <p>Producto vendido: </p>
                                            </div>
                                            <Grid container>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={4}
                                                    className="contImgRighCalif"
                                                    mt={"2rem"}>
                                                    <img
                                                        src={`${URL_IMAGES_RESULTS}${producto.nombreImagen}`}
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={8}
                                                    className="continfocalifimg"
                                                    flexDirection={"column"}>
                                                    <p className="pNameProductCalif">
                                                        {
                                                            producto.nombreProducto
                                                        }
                                                    </p>
                                                    <div className="subtitlesvercompra">
                                                        <p>
                                                            Unidades compradas:
                                                        </p>
                                                        <p>
                                                            {producto.cantidad}
                                                        </p>
                                                    </div>
                                                    <div className="subtitlesvercompra">
                                                        <p>
                                                            Precio del producto:
                                                        </p>
                                                        <p>
                                                            {
                                                                producto.preciodeventa
                                                            }
                                                        </p>
                                                    </div>
                                                    <ModalMensajes
                                                        shown={showModal}
                                                        close={handleModalClose}
                                                        titulo={tituloMensajes}
                                                        mensaje={textoMensajes}
                                                        tipo="error"
                                                    />
                                                    <ModalMensajes
                                                        shown={
                                                            showCalificacionModal
                                                        }
                                                        close={() =>
                                                            setShowCalificacionModal(
                                                                false
                                                            )
                                                        }
                                                        titulo="Calificación"
                                                        mensaje="Por favor, elige una calificación."
                                                        tipo="error"
                                                    />
                                                    <ModalMensajes
                                                        shown={
                                                            showComentarioModal
                                                        }
                                                        close={() =>
                                                            setShowComentarioModal(
                                                                false
                                                            )
                                                        }
                                                        titulo="Comentario"
                                                        mensaje="Por favor, deja un comentario sobre tu experiencia."
                                                        tipo="error"
                                                    />
                                                    <ModalMensajes
                                                        shown={showAmbosModal}
                                                        close={() =>
                                                            setShowAmbosModal(
                                                                false
                                                            )
                                                        }
                                                        titulo="Calificación y Comentario"
                                                        mensaje="Por favor, elige una calificación y deja un comentario sobre tu experiencia."
                                                        tipo="error"
                                                    />
                                                    <Dialog
                                                        className="dialogDatsGuardados"
                                                        open={confirmationOpen}
                                                        PaperProps={{
                                                            style: {
                                                                width: isMdDown
                                                                    ? "80%"
                                                                    : "35%",
                                                                backgroundColor:
                                                                    "white",
                                                                border: "2px solid gray",
                                                                padding:
                                                                    "1.4rem",
                                                                borderRadius:
                                                                    "10px",
                                                            },
                                                        }}>
                                                        <DialogTitle className="dialogtitleDtsGUardados">
                                                            <FaCheckCircle
                                                                size={37}
                                                                style={{
                                                                    color: "#10c045",
                                                                    marginLeft:
                                                                        "-17px",
                                                                    marginRight:
                                                                        "8px",
                                                                }}
                                                            />
                                                            <p className="dialogtituloP">
                                                                ¡Calificación
                                                                enviada con
                                                                exito!
                                                            </p>
                                                        </DialogTitle>
                                                        <DialogContent className="dialogContentDatsGuardados">
                                                            <p className="PdialogContent">
                                                                Tus comentarios
                                                                fueron enviados
                                                                con exito. Se
                                                                verán reflejados
                                                                un unos minutos.
                                                            </p>
                                                        </DialogContent>
                                                        <DialogActions className="DialogActionsDatsGuardados">
                                                            <div className="div1buttonDialog">
                                                                <button
                                                                    className="button2DialogDatsGuardados"
                                                                    onClick={handleConfirmationSuccess(
                                                                        "./misCompras"
                                                                    )}>
                                                                    Ir a mis
                                                                    compras
                                                                </button>
                                                            </div>
                                                            <div className="div1buttonDialog">
                                                                <button
                                                                    className="button1DialogDatsGuardados"
                                                                    onClick={handleConfirmationSuccess(
                                                                        "/"
                                                                    )}>
                                                                    Ir al inicio
                                                                </button>
                                                            </div>
                                                        </DialogActions>
                                                    </Dialog>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </Container>
                ) : (
                    <div>
                        {/* Aquí puedes manejar el caso en que 'producto' es 'null' */}
                        <p>Cargando datos del producto...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
