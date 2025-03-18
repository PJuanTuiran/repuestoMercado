import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, InputAdornment, TextField, InputBase } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { Dropdown } from "react-bootstrap";
import { NextRouter } from "next/router";
import { useNavigate } from "react-router-dom";
import { Router } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { IoMdReturnRight } from "react-icons/io";
import ModalMensajes from "../mensajes/ModalMensajes";
import { FaCheckCircle } from "react-icons/fa";

export default function Resp() {
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    //PosiciónTopPage
    const irA = useRef(null);
    const { nombreImagen, nombreProducto, uidcomprador, uidvendedor, idproducto, idpregunta } = router.query;
    const [comentario, setComentario] = useState('');

    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false); //Modal de confirmación si ingresó los datos
    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };

    // Nueva validación para palabras no permitidas
    const palabrasProhibidas = ["www", "carrera", "avenida", "#", "N°", "@", ".com", ".co", ".net", "contactanos", "contacto", "llama", "llamar", "telefono", "celular", "movil", "email", "gmail"];


    const validarComentario = () => {
        // Verifica que el comentario no esté vacío
        if (comentario.length === 0) {
            setTituloMensajes('Validación de mensaje');
            setTextoMensajes('Tu mensaje está vacío. Por favor, escribe tu pregunta.');
            setShowModal(true);
            return false;
        }

        // Verifica que el comentario no sea demasiado largo
        if (comentario.length > 130) {
            setTituloMensajes('Validación de mensaje');
            setTextoMensajes('Por tu seguridad y la de tu compra, te recomendamos no incluir datos de contacto dentro de tus preguntas.');
            setShowModal(true);
            return false;
        }

        // Verifica que el comentario no contenga palabras prohibidas
        for (let palabra of palabrasProhibidas) {
            if (comentario.toLowerCase().includes(palabra)) {
                setTituloMensajes('Validación de mensaje');
                setTextoMensajes('Por tu seguridad y la de tu compra, te recomendamos no incluir datos de contacto dentro de tus preguntas.');
                setShowModal(true);
                return false;
            }
        }

        // Verifica que el comentario no contenga 5 números seguidos
        const numerosSeguidos = comentario.match(/\d{5,}/);
        if (numerosSeguidos) {
            setTituloMensajes('Validación de mensaje');
            setTextoMensajes('Por tu seguridad y la de tu compra, te recomendamos no incluir datos de contacto dentro de tus preguntas.');
            setShowModal(true);
            return false;
        }

        return true;
    };

    const enviarPregunta = async () => {

        if (!validarComentario()) {
            return;
        }

        let params = {
            idprd: idproducto, // Reemplaza esto con el idprd correspondiente
            uidcomprador: uidcomprador,
            uidvendedor: uidvendedor,
            idpregunta: idpregunta,
            comentario: comentario,
            estado: 82
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "51", // Reemplaza esto con la URL correcta
                params,
            });

            // Aquí puedes manejar la respuesta del servidor
            console.log(res.data);

            // Muestra el diálogo de confirmación
            setConfirmationOpen(true);


        } catch (error) {
            console.error("Error al enviar la pregunta", error);
        }
    };

    //router push si los datos son colocados correctamente sale esto en el dialog
    const handleConfirmationSuccess = (route) => () => {
        router.push(route);
    };

    return (
        <>
            <div ref={irA}>
                <div>
                    <Container title="Mi Cuenta">
                        <div className="ps-page ps-page--inner" id="myaccount">
                            <div className="container">
                                <div className="ps-page__header"></div>
                                <div className="ps-page__content ps-account">
                                    <Grid container>
                                        <Grid className="subcprinccalific" item xs={12} md={7} sx={{ width: isMdDown ? '100%' : '90%' }} flexDirection={'column'}>
                                            <div className='titleTproblema'>
                                                <p>Responder al comprador</p>
                                            </div>
                                            <Grid className="MainContOtraPreg" item xs={12} md={12} sx={{ width: isMdDown ? '100%' : '90%' }} flexDirection={'column'} >
                                                <div className="OtraPregContainer">
                                                    <p className="titleOtraPregContainer">Escribe tu respuesta para el comprador aquí</p>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            value={comentario}
                                                            onChange={(e) => setComentario(e.target.value)}
                                                        />
                                                        <button onClick={enviarPregunta}>
                                                            Enviar
                                                        </button>
                                                    </div>
                                                    <div className="textOtraPreg">
                                                        <p>
                                                            * Recuerda que para poder seguir siendo tu apoyo en el proceso de compra debes abstenerte de escribir información de contacto como telefono, direcciones, correos electrónicos, entre otros.
                                                        </p>
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid className="contInfoProdComprCalif" item xs={12} md={5} flexDirection={'column'}>
 
                                            <Grid container>
                                                <Grid item xs={12} md={4} className="contImgRighCalif" mt={'2rem'}>
                                                    <img src={`${URL_IMAGES_RESULTS}${nombreImagen}`} alt={nombreProducto} />
                                                </Grid>
                                                <Grid item xs={12} md={8} className="continfocalifimg" flexDirection={'column'}>
                                                    <p className="pNameProductCalif">{nombreProducto}</p>
                                                </Grid>
                                                <ModalMensajes
                                                    shown={showModal}
                                                    close={handleModalClose}
                                                    titulo={tituloMensajes}
                                                    mensaje={textoMensajes}
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
                                                        <p className='dialogtituloP'>Respuesta enviada con exito!</p>
                                                    </DialogTitle>
                                                    <DialogContent className='dialogContentDatsGuardados'>
                                                        <p className='PdialogContent'>Tu respuesta fue enviada con exito.</p>
                                                    </DialogContent>
                                                    <DialogActions className='DialogActionsDatsGuardados'>
                                                        <div className='div1buttonDialog' >
                                                            <button className='button2DialogDatsGuardados' onClick={handleConfirmationSuccess('./preguntasSobreMisProductos')} >
                                                                Ir a mis preguntas
                                                            </button>
                                                        </div>
                                                        <div className='div1buttonDialog' >
                                                            <button className='button1DialogDatsGuardados' onClick={handleConfirmationSuccess('/')} >
                                                                Ir al inicio
                                                            </button>
                                                        </div>
                                                    </DialogActions>
                                                </Dialog>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </div>

                    </Container>
                </div>
            </div>
        </>
    )
}