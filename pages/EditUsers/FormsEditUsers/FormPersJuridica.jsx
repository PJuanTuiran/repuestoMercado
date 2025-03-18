
import Container from '../../../components/layouts/Container';
import { Box, Grid, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import ModalMensajes from '../../mensajes/ModalMensajes';
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

const FormPersJuridica = () => {
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    const defaultValue = 'NIT';

    const [nit, setNit] = useState('');
    const [valorSocial, setValorSocial] = useState('');
    const [showModalNit, setShowModalNit] = useState(false);
    const [showModalValorSocial, setShowModalValorSocial] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState('');
    const [textoMensajes, setTextoMensajes] = useState('');

    const handleModalCloseNit = () => {
        setShowModalNit(false);
    };

    const handleModalCloseValorSocial = () => {
        setShowModalValorSocial(false);
    };

    const validarNITColombia = (nit) => {
        const nitLimpio = nit.replace(/[\s-]/g, '');

        if (nitLimpio.length !== 9 || !/^\d+$/.test(nitLimpio)) {
            return false;
        }

        return true;
    };

    const handleGuardar = () => {
        // Validar NIT
        if (!validarNITColombia(nit)) {
            setShowModalNit(true);
            setTituloMensajes('Validación de NIT');
            setTextoMensajes('El NIT debe tener 9 dígitos y solo números.');
            return; // Detener el proceso si la validación del NIT falla
        }

        // Validar Valor Social
        if (!valorSocial.trim()) {
            setShowModalValorSocial(true);
            setTituloMensajes('Validación razón Social');
            setTextoMensajes('Por favor, ingresa la razón social.');
            return; // Detener el proceso si no se ha ingresado el valor social
        }

        if (valorSocial.length > 40) {
            setShowModalValorSocial(true);
            setTituloMensajes('Validación de Valor Social');
            setTextoMensajes('El valor social no puede exceder los 40 caracteres.');
            return; // Detener el proceso si el valor social es demasiado largo
        }

        // Si todas las validaciones son exitosas, procede con la acción deseada
        router.push('./ValidDocsPjuridica');

    };

    const irA = useRef(null);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    const handleValidP = () => {
        router.push('../../my-account');
    };

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta"  >
                    <div className="ps-page ps-page--inner" id="myaccount" >
                        <div className="container">
                            <div className="ps-page__header"></div>
                            <div className="ps-page__content ps-account">
                                <div className='titlesformsUsers'>
                                    <p>Cambiar tu cuenta a cuenta de persona juridica</p>
                                </div>
                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '65%' }}>
                                    <form style={{ width: '100%' }}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={3}>
                                                <p className='titlesFormsUsers2'>Tipo de documento</p>
                                                <input
                                                    className='InputFormsUsers'
                                                    type="text"
                                                    style={{
                                                        cursor: 'not-allowed',
                                                    }}
                                                    value={defaultValue}
                                                    readOnly
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={9}>
                                                <p className='titlesFormsUsers2'>Numero de documento</p>
                                                <input
                                                    className='InputFormsUsers'
                                                    type="text"
                                                    placeholder="Ej: 900123456 - 1"
                                                    value={nit}
                                                    onChange={(e) => setNit(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <p className='titlesFormsUsers2'>Razón social</p>
                                                <input
                                                    className='InputFormsUsers'
                                                    type="text"
                                                    placeholder="Ej: ABC S.A.S."
                                                    value={valorSocial}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        // Utiliza una expresión regular para verificar si el valor contiene solo letras y espacios
                                                        if (/^[A-Za-z\s.]+$/.test(inputValue) || inputValue === '') {
                                                            setValorSocial(inputValue);
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}></Grid>
                                            <Grid item xs={12} md={6} >
                                                <Box display="flex" justifyContent="space-between" marginTop={15}>
                                                    <button onClick={handleValidP} className='CancelarFormButton'>Cancelar</button>
                                                    <button
                                                        onClick={handleGuardar}
                                                        type='button'
                                                        style={{
                                                            width: '49%', backgroundColor: '#2D2E83',
                                                            color: 'white', borderRadius: '10px', fontSize: '16px',
                                                            alignItems: 'center', display: 'flex',
                                                            justifyContent: 'center', height: '40px'
                                                        }}>
                                                        Continuar
                                                    </button>
                                                    <ModalMensajes
                                                        shown={showModalNit}
                                                        close={handleModalCloseNit}
                                                        titulo={tituloMensajes}
                                                        mensaje={textoMensajes}
                                                        tipo="error"
                                                    />
                                                    <ModalMensajes
                                                        shown={showModalValorSocial}
                                                        close={handleModalCloseValorSocial}
                                                        titulo={tituloMensajes}
                                                        mensaje={textoMensajes}
                                                        tipo="error"
                                                    />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default FormPersJuridica;
