import React, { useEffect, useState } from 'react';
import { Box, Grid, TextareaAutosize } from "@mui/material";
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
//import FormControl from '@mui/material/FormControl';
import ModalMensajes from '../mensajes/ModalMensajes';
import { FaRegWindowClose } from "react-icons/fa";
import moment from 'moment';
import { URL_BD_MR, URL_IMAGES_RESULTS, URL_IMAGES_RESULTSSMS } from "../../helpers/Constants";

function DatosDevolucion(props) {
    const { dataSelectDevol, setModalDatosAdicional, usuario, email, nombres, razonsocial, useruid,
         identificacion, estadosolicitud, comentario, fechasolicitud, tipoidentificacion,
         cantidad, direccionenvio, idmicompra, precioproducto, precioenvio, idsolicitud } = props;

    console.log("DAT DEVOLXX : ", dataSelectDevol)

    const [listEstados, setListEstados] = useState([]);
    const [estadoSelect, setEstadoSelect] = useState(0);
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [listarValoracion, setListarValoracion] = useState([]);
    const [calificacionPrd, setCalificacionPrd] = useState(0);

    useEffect(() => {
        const leerCalificacionVendedor = async () => {

            let params = {
                uidvendedor: dataSelectDevol.uid
            };

            await axios({
                method: "post",
                url: "https://gimcloud.com.co/mrp/api/502",
                params,
            })
                .then((res) => {
                    console.log("Calificacion Vendedor : ", res.data.listarcalprdvendedor);
                    setListarValoracion(res.data.listarcalprdvendedor);

                    let totcalificacion = 0;
                    res.data.listarcalprdvendedor &&
                        res.data.listarcalprdvendedor.map((row, index) => {
                            totcalificacion =
                                parseInt(totcalificacion) +
                                parseInt(row.calificacion);
                        });

                    if (res.data.listarcalprdvendedor.length > 0) {
                        let calprd =
                            totcalificacion /
                            res.data.listarcalprdvendedor.length;
                        setCalificacionPrd(calprd);
                        console.log("PARAMS : ", calprd);
                    } else setCalificacionPrd(0);

                    //let ventas = res.data.res.data.listarcalprdvendedor.length;
                    //setprdVendidos(ventas);
                })
                .catch(function (error) {
                    console.log("Error leyendo calificación al Producto");
                });
        };
        leerCalificacionVendedor();
    }, []);

    const cerrar = () => {
        setModalDatosAdicional(false)
    }
// {" "}{idsolicitud.toString().padStart(5, '0')}
    return (
        <Grid container spacing={1}>
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <Grid item xs={12} md={2} lg={2}></Grid>
            <Grid item xs={12} md={4} lg={4}>
                <div className='modaldatosadicional3'>
                    <Grid container spacing={1}>
                        <Grid item xs={11} md={11} lg={11}>
                            <div className='titulodatosdevolucion'>
                                Datos de la solicitud #
                                {" "}{idsolicitud}
                            </div>
                        </Grid>
                        <Grid item xs={1} md={1} lg={1}>
                            <FaRegWindowClose
                                onClick={() => cerrar()}
                                className="editclosenit"
                                style={{
                                    fontSize: 25,
                                    color: "#2D2E83",
                                    marginLeft: '35px'
                                }}
                            />
                        </Grid>

                        <div className='mb-30px'>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={1} lg={1}>
                                            <div className='titulodatadevoldos'>
                                                Usuario
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div className='textoalldatadevol'>
                                                Email
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={3} lg={3}>
                                            <div className='textoalldatadevol'>
                                                Nombre
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={1} lg={1}>
                                            <div className='textoalldatadevol'>
                                                Id usuario
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={2} lg={2}>
                                            <div className='textoidentificaciondevol'>
                                                Identificación
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className='lineashoppingcart'>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={1} lg={1}>
                                            <div className='textodatosdevoldos'>
                                                {usuario}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}
                                            sx={{ marginLeft: "15px" }}
                                        >
                                            <div className='textodireccion'>
                                                {email}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={3} lg={3}>
                                            {tipoidentificacion < 6 ?
                                                <div className='textonombre'>
                                                    {nombres}
                                                </div>
                                                :
                                                <div className='textonombre'>
                                                    {razonsocial}
                                                </div>
                                            }
                                        </Grid>
                                        <Grid item xs={12} md={1} lg={1}>
                                            <div className='textodatosdevoldos'>
                                                {useruid}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={2} lg={2}>
                                            <div className='textodatosdevolcinco'>
                                                {identificacion}
                                            </div>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>

                        <div className='mb-40px'>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={1} lg={1}>
                                            <div className='titulodatadevoldos'>
                                                Cantidad
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div className='textoalldatadevol'>
                                                Dirección envio
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={1} lg={1}>
                                            <div className='textoalldatadevol'>
                                                # de la compra
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={1} lg={1}>
                                            <div className='textonombretres'>
                                                Precio producto
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={2} lg={2}>
                                            <div className='textonombrecuatro'>
                                                Precio envio
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className='lineashoppingcart'>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={1} lg={1}>
                                            <div className='textodatosdevoldos'>
                                                {cantidad}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}
                                            sx={{ marginLeft: "0px" }}
                                        >
                                            <div className='textonombrecinco'>
                                                {direccionenvio}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={1} lg={1}>
                                            <div className='textonombrecinco'>
                                                {idmicompra}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={2} lg={2}>
                                            <div className='textonombresiete'>
                                                {precioproducto}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={2} lg={2}>
                                            <div className='textonombreseis'>
                                                {precioenvio}
                                            </div>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>

                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={10} lg={10}>
                                        <div className='titulodatadevol'>
                                            Motivo devolución
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={2} lg={2}>
                                        <div className='titulodatadevol'>
                                            Fecha creación
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} md={12} lg={12}>
                                        <div className='lineashoppingcart'>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={10} lg={10}>
                                        <div className='textodatoscomentariodevol'>
                                            <TextareaAutosize
                                                className='mensajemotivodevol'
                                                defaultValue={comentario}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={2} lg={2}>
                                        <div className='textodatosdevoldos'>
                                            {fechasolicitud}
                                        </div>
                                    </Grid>

                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </div>
            </Grid >

        </Grid >


    );
}

export default DatosDevolucion;