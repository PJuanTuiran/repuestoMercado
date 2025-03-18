import React, { useEffect, useState } from "react";
import Rating from "~/components/elements/Rating";
import { Box, Grid, Button } from "@mui/material";
import SortBySearchInteractiveSeller from "../../../partials/shop/modules/SortBySearchInteractiveSeller";
import axios from "axios";
import Moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../../helpers/Constants";

const ModuleDetailSeller = (props) => {
    const { product } = props;
    const [listaCalificacionVendedor, setListaCalificacionVendedor] = useState(
        []
    );
    const [prdVendidos, setprdVendidos] = useState(0);
    const [ordenarPor, setOrdenarPor] = useState(0);
    const [calificacionPrd, setCalificacionPrd] = useState(0);
    const [datosUsuarios, setDatosUsuarios] = useState("");
    const [undVendidas, setUndVendidas] = useState(0);
    const [ubicacion, setUbicacion] = useState("");
    //const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    useEffect(() => {
        const leerCalificacionVendedor = async () => {
            //console.log("PRODUCTO XXXX: ", product)
            let params = {
                uidvendedor: product.usuario,
                uidproducto: product.id,
            };
            console.log("params: ", params);
            await axios({
                method: "post",
                url: "https://gimcloud.com.co/mrp/api/50",
                params,
            })
                .then((res) => {
                    setListaCalificacionVendedor(
                        res.data.listarcalificacionvendprd
                    );
                    let ventas = res.data.listarcalificacionvendprd.length;
                    //console.log("DAT VENTAS: ", ventas);
                    setprdVendidos(ventas);

                    let totcalificacion = 0;
                    res.data.listarcalificacionvendprd &&
                        res.data.listarcalificacionvendprd.map((row, index) => {
                            totcalificacion =
                                parseInt(totcalificacion) +
                                parseInt(row.calificacion);
                        });

                    let calprd =
                        totcalificacion /
                        res.data.listarcalificacionvendprd.length;
                        //console.log("TOT CALF: ", totcalificacion)
                        //console.log("CALIF CEBEDE: ", res.data.listarcalificacionvendprd)
                    if (isNaN(calprd)) setCalificacionPrd(0);
                    else setCalificacionPrd(calprd);
                })
                .catch(function (error) {
                    console.log("Error leyendo calificación al vendedor");
                });
        };
        leerCalificacionVendedor();

        const leerDatosUsuario = async () => {
            let params = {
                usuario: product.usuario,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "13",
                params,
            })
                .then((res) => {
                    //console.log("DAT USER XXX: ", res.data);
                    setDatosUsuarios(res.data[0]);
                })
                .catch(function (error) {
                    console.error("Error al leer los datos del usuario", error);
                });
        };

        leerDatosUsuario();

        const prdVendidos = async () => {
            let params = {
                uidvendedor: product.usuario,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "159",
                params,
            })
                .then((res) => {
                    //console.log("PRD VENDIDOS XXX: ", res.data);
                    setUndVendidas(res.data[0].productosvendidos);
                })
                .catch(function (error) {
                    console.error("Error al leer los datos del usuario", error);
                });
        };
        prdVendidos();

        let direccionusuario = localStorage.getItem("direccionenvio");

        if (direccionusuario.length > 0) {
            console.log("DIRECCC : ",direccionusuario)
            direccionusuario = JSON.parse(
                localStorage.getItem("direccionenvio")
            );
        }
        let datubicacion =
            direccionusuario.nombreciudad + " - " + direccionusuario.nombre_dep;
        setUbicacion(datubicacion);
    }, []);

    useEffect(() => {
        if (ordenarPor == 1) {
            let ordenafecha = [];

            listaCalificacionVendedor &&
                listaCalificacionVendedor.map((row, index) => {
                    ordenafecha.push(row.id);
                });

            let ordenado = ordenafecha.sort((b, a) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionVendedor &&
                        listaCalificacionVendedor.map((item, index) => {
                            if (row == item.id) {
                                result.push(item);
                            }
                        });
                });

            setListaCalificacionVendedor(result);
            //console.log("DATOS : ", result);
        } else if (ordenarPor == 2) {
            let ordenafecha = [];

            listaCalificacionVendedor &&
                listaCalificacionVendedor.map((row, index) => {
                    ordenafecha.push(row.id);
                });

            let ordenado = ordenafecha.sort((a, b) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionVendedor &&
                        listaCalificacionVendedor.map((item, index) => {
                            if (row == item.id) {
                                result.push(item);
                            }
                        });
                });

            setListaCalificacionVendedor(result);
            //console.log("DATOS : ", result);
        } else if (ordenarPor == 3) {
            let ordenacalificacion = [];

            listaCalificacionVendedor &&
                listaCalificacionVendedor.map((row, index) => {
                    ordenacalificacion.push(row.calificacion);
                });

            let ordenado = ordenacalificacion.sort((b, a) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionVendedor &&
                        listaCalificacionVendedor.map((item, index) => {
                            if (row == item.calificacion) {
                                result.push(item);
                            }
                        });
                });

            //console.log("ORDENADO MAYOR : ", result);

            setListaCalificacionVendedor(result);
            //console.log("DATOS : ", result);
        } else if (ordenarPor == 4) {
            let ordenacalificacion = [];

            listaCalificacionVendedor &&
                listaCalificacionVendedor.map((row, index) => {
                    ordenacalificacion.push(row.calificacion);
                });

            let ordenado = ordenacalificacion.sort((a, b) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionVendedor &&
                        listaCalificacionVendedor.map((item, index) => {
                            if (row == item.calificacion) {
                                result.push(item);
                            }
                        });
                });
            //console.log("ORDENADO MENOR : ", result);

            setListaCalificacionVendedor(result);
            //console.log("DATOS : ", result);
        }
    }, [ordenarPor]);

    return (
        <div className="mtmenos30">
            <Grid container spacing={1}>
                <Grid item xs={4} md={4} lg={4}>
                    <div className="boxdataseller textosellerdos">
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                <h3 className="textoseller">
                                    Vendedor : {datosUsuarios.primernombre}{" "}
                                    {datosUsuarios.primerapellido}
                                </h3>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                Tiempo como vendedor:{" "}
                                {datosUsuarios.tiempocomovendedor} Meses
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                Número de ventas: {undVendidas}
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                Ubicación : {ubicacion}
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item xs={8} md={8} lg={8}>
                    <div className="cajacalificacionvendedor ml-15 mt-20">
                        <Grid item xs={12} md={12} lg={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <a className="ml-25 tamañofuentetab colorbase">
                                        Calificación del vendedor
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={2} md={2} lg={2}>
                                    <a className="tamañoCalificacionvendedor">
                                        {calificacionPrd}
                                    </a>
                                </Grid>
                                <div className="mlmenos5 mt-15">
                                {calificacionPrd >= 1 && calificacionPrd < 2 ? (
                                    <Grid container spacing={1}>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellerdos1 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdnoselect1 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdnoselect2 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdnoselect3 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdnoselect fa fa-cog"></i>
                                        </Grid>
                                    </Grid>
                                ) : calificacionPrd >= 2 &&
                                  calificacionPrd < 3 ? (
                                    <Grid container spacing={1}>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellerdos1 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellertres1 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdnoselect2 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdnoselect3 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdnoselect fa fa-cog"></i>
                                        </Grid>
                                    </Grid>
                                ) : calificacionPrd >= 3 &&
                                  calificacionPrd < 4 ? (
                                    <Grid container spacing={1}>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellerdos1 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellertres1 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellercuatro1 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdnoselect3 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdnoselect fa fa-cog"></i>
                                        </Grid>
                                    </Grid>
                                ) : calificacionPrd >= 4 &&
                                  calificacionPrd < 5 ? (
                                    <Grid container spacing={1}>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellerdos1 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellertres1 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellercuatro1 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellercinco1 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdnoselect fa fa-cog"></i>
                                        </Grid>
                                    </Grid>
                                ) : calificacionPrd >= 5 ? (
                                    <Grid container spacing={1}>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellerdos1 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellertres1 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellercuatro1 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellercinco1 fa fa-cog"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellerseis1 fa fa-cog"></i>
                                        </Grid>
                                    </Grid>
                                ) : null}
                                </div>
                            </Grid>

                            <Grid contain spacing={1} className="ml-10">
                                <Grid item xs={12} md={12} lg={12}>
                                    <a className="ml-17 tamañofuentetab colorbase">
                                        {prdVendidos} Calificaciones
                                    </a>
                                </Grid>
                            </Grid>

                            <Grid
                                contain
                                spacing={1}
                                className="ml-10 mtmenos5">
                                <Grid item xs={7} md={7} lg={7}>
                                    <a className="textocomentarioscompradores">
                                        Comentarios de los compradores
                                    </a>
                                </Grid>
                                <Grid item xs={5} md={5} lg={5}>
                                    <SortBySearchInteractiveSeller
                                        setOrdenarPor={setOrdenarPor}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} lg={12}>
                                    <div className="lineacalificacionvendedordos"></div>
                                </Grid>
                            </Grid>

                            {listaCalificacionVendedor &&
                            listaCalificacionVendedor.length > 0
                                ? listaCalificacionVendedor &&
                                  listaCalificacionVendedor.map(
                                      (item, index) => {
                                          return (
                                              <div>
                                                  {item.calificacion >= 1 &&
                                                  item.calificacion < 2 ? (
                                                      <Grid
                                                          container
                                                          spacing={1}>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdnoselect2 fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdnoselect1 fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdnoselect4 fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdnoselect5 fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                      </Grid>
                                                  ) : item.calificacion >= 2 &&
                                                    item.calificacion < 3 ? (
                                                      <Grid
                                                          container
                                                          spacing={1}>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellercuatronone fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellercinconone fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfseller fa fa-cog mt-4"></i>
                                                          </Grid>
                                                      </Grid>
                                                  ) : item.calificacion >= 3 &&
                                                    item.calificacion < 4 ? (
                                                      <Grid
                                                          container
                                                          spacing={1}>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellercuatro fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellercinconone fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfseller fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                      </Grid>
                                                  ) : item.calificacion >= 4 &&
                                                    item.calificacion < 5 ? (
                                                      <Grid
                                                          container
                                                          spacing={1}>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellercuatro fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellercinco fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfseller fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                      </Grid>
                                                  ) : item.calificacion >= 5 ? (
                                                      <Grid
                                                          container
                                                          spacing={1}>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellercuatro fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellercinco fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellerok fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                      </Grid>
                                                  ) : null}

                                                  <Grid container spacing={1}>
                                                      <Grid
                                                          item
                                                          xs={12}
                                                          md={12}
                                                          lg={12}>
                                                          <div className="textocomentarioscompradoresdos">
                                                              {item.comentario}
                                                          </div>
                                                      </Grid>
                                                      <Grid
                                                          item
                                                          xs={12}
                                                          md={12}
                                                          lg={12}>
                                                          <div className="textocomentarioscompradorestres">
                                                              {Moment(
                                                                  item.fechacreacion
                                                              ).format(
                                                                  "YYYY-MM-DD"
                                                              )}
                                                          </div>
                                                      </Grid>
                                                      <Grid
                                                          item
                                                          xs={12}
                                                          md={12}
                                                          lg={12}>
                                                          
                                                      </Grid>
                                                  </Grid>
                                              </div>
                                          );
                                      }
                                  )
                                : null}
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default ModuleDetailSeller;
