import Container from "../../components/layouts/Container";
import { Breadcrumbs, Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { URL_BD_MR } from "../../helpers/Constants";
import axios from "axios";
import ModalMensajes from "../mensajes/ModalMensajes";
import Link from '@mui/material/Link';
import { GrNext } from "react-icons/gr";
import { useRouter } from "next/router";



export default function buscarPQR() {

    const router = useRouter();//NextRouter
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const irA = useRef(null); //PosiciónTopPage
    const [showModal, setShowModal] = useState(false); //Estado de modal
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [datosusuarios, setDatosUsuarios] = useState([]);
    const [id, setId] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    // Estado para manejar el error en los campos "id" e "identificacion"
    const [errorId, setErrorId] = useState(false);
    const [errorIdentificacion, setErrorIdentificacion] = useState(false);


    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);


    //función para obtener datos de usuarios de PQR
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}152`,
                });
                setDatosUsuarios(res.data.listarpqr);
            } catch (error) {
                console.error("Error al leer las transacciones del vendedor", error);
            }
        };
        obtenerDatos();
    }, []);


    const buscarPQR = () => {
        // Verificamos si los campos "id" e "identificacion" están vacíos
        if (!id) {
            setErrorId(true);
        } else {
            setErrorId(false);
        }

        // Verificamos si el campo "identificacion" está vacío o si su longitud no está entre 6 y 10
        if (!identificacion || identificacion.length < 6 || identificacion.length > 10) {
            setErrorIdentificacion(true);
        } else {
            setErrorIdentificacion(false);
        }

        // Si los campos no están vacíos y la longitud de "identificacion" es correcta, procedemos a buscar el PQR
        if (id && identificacion && identificacion.length >= 6 && identificacion.length <= 10) {
            const pqrEncontrado = datosusuarios.find(pqr => pqr.id.toString() === id && pqr.identificacion === identificacion);
            if (pqrEncontrado) {
                router.push(`./verPQR?id=${pqrEncontrado.id}`);
            } else {
                setTituloMensajes('¡Cuidado!');
                setTextoMensajes('No se encontró un PQR para esa combinación de datos.');
                setShowModal(true);
            }
        } else {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('Debes llenar todos los campos correctamente para buscar.');
            setShowModal(true);
        }
    }



    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: "18rem" }}>
                                <Grid className="contMainOpiniones" container style={{ width: isMdDown ? "100%" : "80%" }} display={"flex"} flexDirection={"column"}>
                                    <div className="TopBuscarPQR">
                                        <Breadcrumbs separator={<GrNext style={{ color: '#D9D9D9' }} size={17} />} aria-label="breadcrumb">
                                            <Link
                                                className="linkMisv"
                                                underline="none"
                                                href="./"
                                                onClick={(e) => { e.preventDefault(); router.push('./') }}

                                            >
                                                <p className="VerVentaLink">Ayuda / PQRS</p>
                                            </Link>
                                            <p className="VerVentaLink">Buscar solicitud</p>
                                        </Breadcrumbs>
                                        <p className="SubtitleBuscar">Buscar solicitud</p>
                                    </div>

                                    <div className="MainmiddleAyudaPQR">

                                        <div className="inputsPQR">
                                            <div>
                                                <p>Número de identificación</p>
                                                <input
                                                    type="text"
                                                    value={identificacion}
                                                    onChange={e => setIdentificacion(e.target.value)}
                                                    onClick={() => setErrorIdentificacion(false)}
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    style={errorIdentificacion ? { border: '1px solid red' } : {}}
                                                />
                                                <div className="ErrBuscarPQR">
                                                    {errorIdentificacion && <div className="errorInputPQR"> <span>Recuerda, El documento debe contener solo números, longitud minima de 6 y maximo de 10! </span></div>}
                                                </div>
                                            </div>

                                            <div>
                                                <p>Número de solicitud</p>
                                                <input
                                                    type="text"
                                                    value={id}
                                                    onChange={e => setId(e.target.value)}
                                                    onClick={() => setErrorId(false)}
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    style={errorId ? { border: '1px solid red' } : {}}
                                                />
                                                <div className="ErrBuscarPQR">
                                                    {errorId && <div className="errorInputPQR"> <span>Ingresa un numero de solicitud valido!</span></div>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sendBuscarPQR">
                                            <button onClick={buscarPQR}>Buscar</button>
                                        </div>
                                    </div>
                                </Grid>
                                <ModalMensajes
                                    shown={showModal}
                                    close={handleModalClose}
                                    titulo={tituloMensajes}
                                    mensaje={textoMensajes}
                                    tipo="error"
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
