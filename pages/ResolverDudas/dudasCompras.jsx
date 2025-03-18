import Container from "../../components/layouts/Container"
import {  Grid, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios'; 
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link'; 
import { AiOutlineRight } from 'react-icons/ai';
import { GrNext } from "react-icons/gr";
import { URL_BD_MR } from "../../helpers/Constants"; 
import { useSelector, useDispatch } from "react-redux"; 
import ModalMensajesWishListControl from "../mensajes/ModalMensajesWishListControl";
import { getLeeIra } from "../../store/leeira/action";
import { useParams } from 'react-router-dom';
import BuscarComponente from "./BuscarComponente";




export default function dudasCompras() {



    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage
    const router = useRouter(); 
    const dispatch = useDispatch();
    const [showModalMensajesCtlr, setShowModalMensajesCtlr] = useState(false);
    const [tituloMensajesCtlr, setTituloMensajesCtlr] = useState('');
    const [textoMensajesCtlr, setTextoMensajesCtlr] = useState('');
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [datosNivelUno, setDatosNivelUno] = useState([]); 

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);



    //Usefect para conocer si el usuario está loggeado o no
    useEffect(() => {
        if (!datosusuarios.uid || datosusuarios.uid == 0) {
            setIsUserLogged(false);
        } else {
            setIsUserLogged(true);
        }
    }, [datosusuarios.uid]);

    //función para redireccionar usurio a resolver dudas cuando se loggee
    const handleButtonClick = (ruta) => {
        if (!isUserLogged) {
            dispatch(getLeeIra(12));
            localStorage.setItem("ira", JSON.stringify(12));
            let itemsresolverdudas = {
                ruta: "/ResolverDudas/dudasCompras",
            };
            localStorage.setItem(
                "itemsresolverdudas",
                JSON.stringify(itemsresolverdudas)
            );

            setShowModalMensajesCtlr(true);
            setTituloMensajesCtlr("Dispositivos vinculados");
            let texto = "¡Bienvenido! Para ver tus dispositivos vinculados primero debes iniciar sesión o registrarte.";
            setTextoMensajesCtlr(texto);
        } else {
            router.push({ pathname: ruta });
        }
    };




    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "116",
                });
                const datosNivelUno = res.data.resolverdudasdos.filter(dato => dato.niveluno === 1); 
                setDatosNivelUno(datosNivelUno); 
            } catch (error) {
                console.error("Error al leer los datos", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerDatos();
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
                                                <p className="VerVentaLink">Resuelve tus dudas </p>
                                            </Link>
                                            <p className="VerVentaLink">Sobre comprar</p>
                                        </Breadcrumbs>
                                    </div>
                                    <div className="contMainResolverDudas">
                                        <BuscarComponente />
                                        {/*Container de mis compras */}
                                        <div className="sobreComprarDudas">
                                            <div className="contTitulo ">
                                                <p>Sobre comprar</p>
                                            </div>
                                            <div onClick={() => handleButtonClick('../MisCompras/misCompras')} className="contTitulosDudas startContDudas">
                                                <p>Ir a mis compras</p>
                                                <AiOutlineRight size={27} style={{ cursor: 'pointer' }} />
                                            </div>

                                            {datosNivelUno.map((dato, index) => (
                                                <div
                                                    className={`contTitulosDudas ${index === datosNivelUno.length - 1 ? 'endContDudas' : ''}`}
                                                    onClick={() => router.push({
                                                        pathname: `../ResolverDudas/respuestas`,
                                                        query: { dato: JSON.stringify(dato) }
                                                    })}
                                                >
                                                    <p>{dato.nombreniveldos}</p>
                                                    <AiOutlineRight size={27} />
                                                </div>
                                            ))} 

                                        </div>
                                    </div>
                                </Grid>
                                <ModalMensajesWishListControl
                                    shown={showModalMensajesCtlr}
                                    close={() => { }}
                                    titulo={tituloMensajesCtlr}
                                    mensaje={textoMensajesCtlr}
                                    backdrop="static"
                                    keyboard={false}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}