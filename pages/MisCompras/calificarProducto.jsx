import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, InputAdornment, TextField, InputBase } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { Dropdown } from "react-bootstrap";
import { NextRouter } from "next/router";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { AiOutlineRight } from 'react-icons/ai';
import { IoIosCamera } from "react-icons/io";
import { IoSquareOutline } from "react-icons/io5";
import ModalMensajes from "../mensajes/ModalMensajes";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { RiSettings5Fill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export default function calificarProducto() {
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [confirmationOpen, setConfirmationOpen] = useState(false); //Modal de confirmación si ingresó los datos
    const [showCalificacionModal, setShowCalificacionModal] = useState(false); //Modal que avisa si no puso calificación
    const [showComentarioModal, setShowComentarioModal] = useState(false);//Modal que avisa si no puso comeents
    const [showAmbosModal, setShowAmbosModal] = useState(false);//Modal que avisa si no puso nada
    const [calificacionSeleccionada, setCalificacionSeleccionada] = useState(0);
    const [comentario, setComentario] = useState("");
    const contadorCaracteres = `${comentario ? comentario.length : 0}/180`;
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const irA = useRef(null);
    const router = useRouter();
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    //console.log("DAT USER CALIFICAR PRODUCTO: ", datosusuarios.uid);

    //recibir los datos del producto comprado y guardar url para cuando reinicie seguir en el mismo
    let producto = null

    if (typeof window !== 'undefined') {
        if (router.query.producto) {
            producto = JSON.parse(router.query.producto)
            // Guardar los datos en el almacenamiento local
            localStorage.setItem('producto', JSON.stringify(producto))
        } else {
            // Recuperar los datos del almacenamiento local
            const data = localStorage.getItem('producto')
            if (data) {
                producto = JSON.parse(data)
            }
        }
    }

    //router push si los datos son colocados correctamente sale esto en el dialog
    const handleConfirmationSuccess = (route) => () => {
        router.push(route);
    };

    //handlechange calificación
    const handleCalificacionIconClick = (calificacion) => {
        setCalificacionSeleccionada(calificacion);
    };

    //handlechange de comentario con max 180 caracteres
    const handleComentarioChange = (event) => {
        const nuevoComentario = event.target.value.slice(0, 180); // Limitar a 180 caracteres
        setComentario(nuevoComentario);
    };
    const [showModal, setShowModal] = useState(false); //Estado de modal
    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };


    //envío calificación vendedor con mvalidaciones
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
            if (comentario.includes(validaword[i].word)) {
                setTituloMensajes('Validación de mensaje');
                setTextoMensajes('Tu mensaje contiene palabras o caracteres no permitidos.');
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
                setTituloMensajes('Validación de mensaje');
                setTextoMensajes('Tu mensaje contiene palabras o caracteres no permitidos.');
                setShowModal(true);
                return false;
            }

            if (validacaracteres == "@") {
                setTituloMensajes('Validación de mensaje');
                setTextoMensajes('Tu mensaje contiene palabras o caracteres no permitidos.');
                setShowModal(true);
                return false;
            }
        }

        return true;
    };

    const enviarCalificacion = async (compatible) => {
        const idproducto = producto.idproducto; 
        const nuevaCalificacion = {
            idcomprador: datosusuarios.uid,
            compatible,
            calificacion: calificacionSeleccionada,
            comentario,
            idproducto

        };

        await axios({
            method: "post",
            url: `${URL_BD_MR}47`,
            params: nuevaCalificacion,
        })
            .then((res) => {
                console.log("Respuesta del servidor:", res.data);
                setConfirmationOpen(true);
                // Actualizar lógica adicional según sea necesario
            })
            .catch((error) => {
                console.error('Error al enviar la calificación:', error);
            });
    };

    const manejarEnvioCalificacion = () => {
        const compatible = producto.compatible; // Recupera el valor compatible del usuario por medio de producto.compatible
        if (validarCalificacion()) {
            enviarCalificacion(compatible);
        }
    };

    const [calificacionProducto, setCalificacionProducto] = useState(0);
    const [productoCalificado, setProductoCalificado] = useState(false);
    const [calificaciones, setCalificaciones] = useState([]);

    const obtenerCalificacionesProducto = async () => {
        const compatible = producto.compatible; // Recupera el compatible del producto
        let params = {
            compatible: compatible,
            idcomprador: datosusuarios.uid,
        };

        await axios({
            method: "post",
            url: `${URL_BD_MR}481`,
            params,
        })
            .then((res) => {
                console.log("Respuesta completa del servidor:", res);
                setCalificaciones(res.data.listarcalificacionprd);


                // Comprueba si el vendedor ya ha sido calificado
                const productoCalificado = res.data.listarcalificacionprd.length > 0;
                setProductoCalificado(productoCalificado);

                // Si ya ha sido calificado, establece el comentario en el textarea y la calificación en los íconos con los datos de la última calificación
                if (productoCalificado) {
                    const ultimaCalificacion = obtenerUltimaCalificacion(res.data.listarcalificacionprd);
                    setComentario(ultimaCalificacion.comentario);
                    setCalificacionProducto(ultimaCalificacion.calificacion);
                }
            })
            .catch(function (error) {
                console.error('Error al obtener las calificaciones del producto:', error);
            });
    };

    useEffect(() => {
        obtenerCalificacionesProducto();
    }, []); 
    //Funcion para obtener ultima calificacion
    const obtenerUltimaCalificacion = (calificaciones) => {
        // Ordena las calificaciones por fecha en orden descendente
        const calificacionesOrdenadas = [...calificaciones].sort((a, b) => new Date(b.fechacreacion) - new Date(a.fechacreacion));
        // Devuelve la primera calificación del array ordenado
        return calificacionesOrdenadas[0];
    };

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
                                        <Grid className="subcprinccalific" item xs={12} md={7} sx={{ width: isMdDown ? '100%' : '90%' }} flexDirection={'column'}>
                                            <div className='titleTproblema'>
                                                <p>Calificar producto</p>

                                            </div>
                                            <Grid className="calificSubC" item xs={12} md={12} sx={{ width: isMdDown ? '100%' : '90%' }} flexDirection={'column'} >
                                                <form style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
                                                    <p>Elige de uno a cinco la calificación para tu vendedor, siendo uno lo más bajo y cinco lo más alto:</p>
                                                    <div className="SubContcalificSubC">
                                                        <div className="notanumero">
                                                            <p>{(productoCalificado ? calificacionProducto : calificacionSeleccionada).toFixed(1)}</p>
                                                        </div>
                                                        <div className="iconsConfig">
                                                            {[1, 2, 3, 4, 5].map((valoracion, index) => (
                                                                <RiSettings5Fill
                                                                    key={index}
                                                                    size={40}
                                                                    style={{
                                                                        color: valoracion <= (productoCalificado ? calificacionProducto : calificacionSeleccionada) ? '#2C2E82' : '#acadcd', cursor: 'pointer'

                                                                    }}
                                                                    onClick={() => handleCalificacionIconClick(valoracion)}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="textmiddlecalific">
                                                        <p>Si deseas deja un comentario sobre tu experiencia con el vendedor:</p>
                                                    </div>
                                                    <div>
                                                        <textarea
                                                            disabled={productoCalificado}
                                                            value={comentario}
                                                            onChange={handleComentarioChange}
                                                            placeholder="Escribe un mensaje al vendedor"
                                                            style={{ height: '160px', width: '100%', resize: 'none' }}
                                                        />
                                                        <div style={{ textAlign: 'right', marginTop: '0.5rem', color: '#2C2E82', fontSize: '14px' }}>
                                                            {contadorCaracteres}
                                                        </div>
                                                    </div>
                                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '3rem' }}>
                                                        {productoCalificado ? (
                                                            <p>Este producto ya ha sido calificado, solo es posible calificarlo una vez.</p>
                                                        ) : (
                                                            <button
                                                                style={{
                                                                    width: '170px', // Ajusté el valor de ancho
                                                                    backgroundColor: '#2D2E83',
                                                                    color: 'white',
                                                                    borderRadius: '10px',
                                                                    fontSize: '16px',
                                                                    height: '40px'
                                                                }}
                                                                onClick={manejarEnvioCalificacion}
                                                                type="button"
                                                            >
                                                                Enviar
                                                            </button>
                                                        )}
                                                    </div>
                                                </form>
                                            </Grid>
                                        </Grid>
                                        <Grid className="contInfoProdComprCalif" item xs={12} md={5} flexDirection={'column'}>

                                            <div className='titlecalifVended'>
                                                <p>Producto vendido: </p>
                                            </div>
                                            <Grid container>
                                                <Grid item xs={12} md={4} className="contImgRighCalif" mt={'2rem'}>
                                                    <img src={`${URL_IMAGES_RESULTS}${producto.nombreImagen}`} />
                                                </Grid>
                                                <Grid item xs={12} md={8} className="continfocalifimg" flexDirection={'column'}>
                                                    <p className="pNameProductCalif">{producto.nombreProducto}</p>
                                                    <div className="subtitlesvercompra">
                                                        <p>Unidades compradas:</p>
                                                        <p>{producto.cantidad}</p>
                                                    </div>
                                                    <div className="subtitlesvercompra">
                                                        <p>Precio del producto:</p>
                                                        <p>{producto.preciodeventa}</p>
                                                        <ModalMensajes
                                                            shown={showCalificacionModal}
                                                            close={() => setShowCalificacionModal(false)}
                                                            titulo="Calificación"
                                                            mensaje="Por favor, elige una calificación."
                                                            tipo="error"
                                                        />
                                                        <ModalMensajes
                                                            shown={showModal}
                                                            close={handleModalClose}
                                                            titulo={tituloMensajes}
                                                            mensaje={textoMensajes}
                                                            tipo="error"
                                                        />
                                                        <ModalMensajes
                                                            shown={showComentarioModal}
                                                            close={() => setShowComentarioModal(false)}
                                                            titulo="Comentario"
                                                            mensaje="Por favor, deja un comentario sobre tu experiencia."
                                                            tipo="error"
                                                        />
                                                        <ModalMensajes
                                                            shown={showAmbosModal}
                                                            close={() => setShowAmbosModal(false)}
                                                            titulo="Calificación y Comentario"
                                                            mensaje="Por favor, elige una calificación y deja un comentario sobre tu experiencia."
                                                            tipo="error"
                                                        />
                                                        <Dialog
                                                            className='dialogDatsGuardados'
                                                            open={confirmationOpen}
                                                            PaperProps={{
                                                                style: {
                                                                    width: isMdDown ? '80%' : '35%',
                                                                    backgroundColor: 'white',
                                                                    border: '2px solid gray',
                                                                    padding: '1.4rem',
                                                                    borderRadius: '10px'
                                                                },
                                                            }}
                                                        >
                                                            <DialogTitle className='dialogtitleDtsGUardados' >
                                                                <FaCheckCircle size={37} style={{ color: '#10c045', marginLeft: '-17px', marginRight: '8px' }} />
                                                                <p className='dialogtituloP'>¡Calificación enviada con exito!</p>
                                                            </DialogTitle>
                                                            <DialogContent className='dialogContentDatsGuardados'>
                                                                <p className='PdialogContent'>Tus comentarios fueron enciados con exito. Se verán reflejados un unos minutos.</p>
                                                            </DialogContent>
                                                            <DialogActions className='DialogActionsDatsGuardados'>
                                                                <div className='div1buttonDialog' >
                                                                    <button className='button2DialogDatsGuardados' onClick={handleConfirmationSuccess('./misCompras')} >
                                                                        Ir a mis compras
                                                                    </button>
                                                                </div>
                                                                <div className='div1buttonDialog' >
                                                                    <button className='button1DialogDatsGuardados' onClick={handleConfirmationSuccess('/')} >
                                                                        Ir al inicio
                                                                    </button>
                                                                </div>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </div>
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
    )
}