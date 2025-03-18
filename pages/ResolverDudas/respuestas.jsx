import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, InputAdornment, TextField, InputBase } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { AiOutlineRight } from 'react-icons/ai';
import { GrNext } from "react-icons/gr";
import { URL_BD_MR, URL_IMAGES_RESULTSSMS } from "../../helpers/Constants";
import BuscarComponente from "./BuscarComponente";

export default function Respuestas() {
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);
    const [datos, setDatos] = useState([]);
    const [indicesAleatorios, setIndicesAleatorios] = useState([]);
    const router = useRouter();
    const { dato } = router.query;
    const datoParsed = dato ? JSON.parse(dato) : null;

    useEffect(() => {
        if (datoParsed) {
            console.log(datoParsed);
        }
    }, [datoParsed]);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    // Modifica la función para aceptar un parámetro
    const obtenerDatos = async (nombreniveluno) => {
        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "116",
            });
            // Si nombreniveluno es null, retorna todos los datos
            if (!nombreniveluno) {
                return res.data.resolverdudasdos;
            }
            // Si nombreniveluno no es null, filtra los datos
            return res.data.resolverdudasdos.filter(dato => dato.nombreniveluno === nombreniveluno);
        } catch (error) {
            console.error("Error al leer los datos", error);
            return [];
        }
    };

    // Luego, en el efecto de React, pasa el valor de nombreniveluno a la función
    useEffect(() => {
        const obtenerYSeleccionarDatos = async () => {
            // Si la página se recarga, pasa null a obtenerDatos
            const datosObtenidos = await obtenerDatos(null);
            setDatos(datosObtenidos);

            let indices = [];
            if (datosObtenidos.length >= 3) {
                while (indices.length < 3) {
                    let indice = Math.floor(Math.random() * datosObtenidos.length);
                    if (!indices.includes(indice)) {
                        indices.push(indice);
                    }
                }
            }
            setIndicesAleatorios(indices);
        };

        obtenerYSeleccionarDatos();
    }, []);

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: '18rem' }}>

                                <Grid className="contMainOpiniones" container style={{ width: isMdDown ? '100%' : '87%' }} display={'flex'} flexDirection={'column'}>
                                    <div className='TitleDinamicoDudas'>
                                        <Breadcrumbs separator={<GrNext style={{ color: '#D9D9D9' }} size={17} />} aria-label="breadcrumb">
                                            <Link
                                                className="linkMisv"
                                                underline="none"
                                                href="./"
                                                onClick={(e) => { e.preventDefault(); router.push('./') }}

                                            >
                                                <p className="VerVentaLink">Resuelve tus dudas</p>
                                            </Link>
                                            <p className="VerVentaLink">{datoParsed ? datoParsed.nombreniveldos : 'Cargando...'}</p>
                                        </Breadcrumbs>
                                    </div>
                                    
                                    <div className="contMainResolverDudas">

                                        <BuscarComponente />

                                        {/*Contenedor de la info de la pregunta*/}
                                        <div className="maincontRespuestadudas">
                                            <div className="titlecontRespuestadudas">
                                                <p>{datoParsed ? datoParsed.nombreniveldos : 'Cargando...'}</p>
                                            </div>
                                            <div className="contRespuestadudas">
                                                <div>
                                                    <p>{datoParsed ? datoParsed.descripcionniveldos : 'Cargando...'}</p>
                                                </div>
                                                <div className="imagenRespuestaDuda">
                                                    {
                                                        datoParsed ?
                                                            <img src={URL_IMAGES_RESULTSSMS + datoParsed.nombreimagen1}
                                                                alt=""
                                                            />
                                                            :
                                                            null
                                                    }
                                                </div>
                                                <div>
                                                    <p>{datoParsed ? datoParsed.descripcionniveltres : 'Cargando...'}</p>
                                                </div>
                                                <div className="imagenRespuestaDuda imagen2Respuesta">
                                                    {
                                                        datoParsed ?
                                                            <img src={URL_IMAGES_RESULTSSMS + datoParsed.nombreimagen2}
                                                                alt=""
                                                            />
                                                            :
                                                            null
                                                    }
                                                </div>
                                                <div className="descrip4">
                                                    <p>{datoParsed ? datoParsed.descripcionnivelcuatro : 'Cargando...'}</p>
                                                </div>
                                                <div className="imagenRespuestaDuda imagen2Respuesta">
                                                    {
                                                        datoParsed ?
                                                            <img src={URL_IMAGES_RESULTSSMS + datoParsed.nombreimagen3}
                                                                alt=""
                                                            />
                                                            :
                                                            null
                                                    }
                                                </div>
                                                <div className="descrip4">
                                                    {
                                                        datoParsed?.linkpdf ?
                                                            <a className="linkmensajesayuda"
                                                                href={URL_IMAGES_RESULTSSMS + datoParsed.linkpdf}
                                                            >
                                                                Ir al documento
                                                            </a>
                                                            :
                                                            null
                                                    }
                                                </div>
                                            
                                                <div className="descrip4">
                                                    {
                                                        datoParsed?.linkvideo ?
                                                            <a className="linkmensajesayuda"
                                                                href={datoParsed.linkvideo}
                                                            >
                                                                Ver video instructivo MR
                                                            </a>
                                                            :
                                                            null
                                                    }
                                                </div>
                                            </div>
                                        </div>


                                        {/*Otras dudas relacionadas contenedor */}
                                        <div className="sobreComprarDudas sobreMiCuentaCont">
                                            <div className="contTitulo ">
                                                <p>Te podría interesar</p>
                                            </div>
                                            {indicesAleatorios.map((indice, i) => {
                                                // Verifica si el dato existe antes de intentar acceder a nombreniveldos
                                                const dato = datos[indice];
                                                if (!dato) {
                                                    return null; // Retorna null o algún componente de relleno
                                                }

                                                let className = "contTitulosDudas";
                                                if (i === 0) {
                                                    className += " startContDudas"; // Agrega la clase al primer elemento
                                                } else if (i === indicesAleatorios.length - 1) {
                                                    className += " endContDudas"; // Agrega la clase al último elemento
                                                }
                                                return (
                                                    <div key={indice} 
                                                    onClick={() => {
                                                        router.replace({
                                                            pathname: `../ResolverDudas/respuestas`,
                                                            query: { dato: JSON.stringify(dato) }
                                                        }).then(() => window.location.reload());
                                                    }} className={className}>
                                                        <p>{dato.nombreniveldos}</p>
                                                        <AiOutlineRight size={27} />
                                                    </div>
                                                );
                                            })}
                                        </div>



                                    </div>
                                </Grid>

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}