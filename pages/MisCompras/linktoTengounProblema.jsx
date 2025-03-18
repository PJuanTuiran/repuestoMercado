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
import { URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { FaCheck } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosSquareOutline } from "react-icons/io";
import { BsSquare } from "react-icons/bs";
import { PiSquare } from "react-icons/pi";
import { PiSquareThin } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { URL_BD_MR } from "../../helpers/Constants";

export default function linktoTengounProblema() {
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    //recibir producto y guardarlo y almacenarlo after en el localstorage
    const router = useRouter();
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

    const irA = useRef(null); //useref top page
    //top page transición
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
                                    <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '100%', marginBottom: '20rem' }}>
                                        <Grid container>

                                            <Grid className="subcPrincipTengoUnProblema" item xs={12} md={7} sx={{ width: isMdDown ? '90%' : '90%', flexDirection: 'column' }}>
                                                <Grid className="ContVendedor4" container sx={{ width: isMdDown ? '100%' : '90%' }}>
                                                    <div className="ConttitlecontVend3">
                                                        <p className="titlecontVend3">¿Que pasó con tu compra?</p>
                                                    </div>
                                                </Grid>
                                                <Grid onClick={() => router.push({
                                                    pathname: './tengoUnProblema',
                                                    query: { producto: JSON.stringify(producto) }
                                                })} className="subContVendedor4" container sx={{ width: isMdDown ? '100%' : '90%' }} >
                                                    <div className="cajasProblemas">
                                                        <p className="titlesproblemas">El producto tiene defectos</p>
                                                        <AiOutlineRight size={23} />
                                                    </div>
                                                </Grid>
                                                <Grid onClick={() => router.push({
                                                    pathname: './tengoUnProblema',
                                                    query: { producto: JSON.stringify(producto) }
                                                })} className="subContVendedor4" container sx={{ width: isMdDown ? '100%' : '90%' }}>
                                                    <div className="cajasProblemas">
                                                        <p className="titlesproblemas">La compra llegó incompleta</p>
                                                        <AiOutlineRight size={23} />
                                                    </div>
                                                </Grid>
                                                <Grid onClick={() => router.push({
                                                    pathname: './tengoUnProblema',
                                                    query: { producto: JSON.stringify(producto) }
                                                })} className="subContVendedor4" container sx={{ width: isMdDown ? '100%' : '90%' }}>
                                                    <div className="cajasProblemas">
                                                        <p className="titlesproblemas">Mi compra es diferente al producto recibido</p>
                                                        <AiOutlineRight size={23} />
                                                    </div>
                                                </Grid>
                                                <Grid onClick={() => router.push({
                                                    pathname: './tengoUnProblema',
                                                    query: { producto: JSON.stringify(producto) }
                                                })} className="subContVendedor4" container sx={{ width: isMdDown ? '100%' : '90%' }}>
                                                    <div className="cajasProblemas">
                                                        <p className="titlesproblemas">Yo no realicé la compra</p>
                                                        <AiOutlineRight size={23} />
                                                    </div>
                                                </Grid>
                                                <Grid onClick={() => router.push({
                                                    pathname: './tengoUnProblema',
                                                    query: { producto: JSON.stringify(producto) }
                                                })} className="subContVendedorUlt" container sx={{ width: isMdDown ? '100%' : '90%' }} >
                                                    <div className="cajasProblemas">
                                                        <p className="titlesproblemas">Recibí el producto pero lo quiero devolver</p>
                                                        <AiOutlineRight size={23} />
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={5} className="contImg1TengounPrblema">
                                                <Grid className="contImgTengoProblema" item xs={12} md={4}>
                                                    <img src={`${URL_IMAGES_RESULTS}${producto.nombreImagen}`} />
                                                </Grid>
                                                <Grid className="contdatosprobls" item xs={12} md={8} sx={{ flexDirection: 'column' }}>
                                                    <p className="contTengoProblemadatos">{producto.nombreProducto}</p>
                                                    <div className="subtitlesvercompra">
                                                        <p>Unidades compradas:</p>
                                                        <p>{producto.cantidad}</p>
                                                    </div>
                                                    <div className="subtitlesvercompra">
                                                        <p>Precio del producto:</p>
                                                        <p>{producto.preciodeventa}</p>
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