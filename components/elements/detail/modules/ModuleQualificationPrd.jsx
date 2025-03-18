import React, { useEffect, useState } from "react";
import Rating from "~/components/elements/Rating";
import { Box, Grid, Button } from "@mui/material";
import SortByViewPrdSingle from "../../../partials/shop/modules/SortByViewPrdSingle";
import axios from "axios";
import Moment from "moment";

const ModuleQualificationPrd = (product) => {
    const [listaCalificacionProducto, setListaCalificacionProducto] = useState(
        []
    );
    const [prdVendidos, setprdVendidos] = useState(0);
    const [ordenarPor, setOrdenarPor] = useState(0);
    const [calificacionPrd, setCalificacionPrd] = useState(0);

    useEffect(() => {
        //const fechaactual = Moment(datosusuario.fechacreacion).format("YYYY-MM-DD");
        const leerCalificacionProducto = async () => {
            let params = {
                producto: product.product.id,
            };

            await axios({
                method: "post",
                url: "https://gimcloud.com.co/mrp/api/48",
                params,
            })
                .then((res) => {
                    //console.log("DATA : ", res.data);
                    setListaCalificacionProducto(
                        res.data.listarcalificacionprd
                    );

                    let totcalificacion = 0;
                    res.data.listarcalificacionprd &&
                        res.data.listarcalificacionprd.map((row, index) => {
                            totcalificacion =
                                parseInt(totcalificacion) +
                                parseInt(row.calificacion);
                        });
                    if (res.data.listarcalificacionprd.length > 0) {
                        let calprd =
                            totcalificacion /
                            res.data.listarcalificacionprd.length;
                        setCalificacionPrd(calprd);
                    } else setCalificacionPrd(0);

                    //let ventas = res.data.listarcalificacionprd.length;
                    //setprdVendidos(ventas);
                })
                .catch(function (error) {
                    console.log("Error leyendo calificación al Producto");
                });
        };
        leerCalificacionProducto();
    }, [product]);

    useEffect(() => {
        if (ordenarPor == 1) {
            let ordenafecha = [];

            listaCalificacionProducto &&
                listaCalificacionProducto.map((row, index) => {
                    ordenafecha.push(row.id);
                });

            let ordenado = ordenafecha.sort((b, a) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionProducto &&
                        listaCalificacionProducto.map((item, index) => {
                            if (row == item.id) {
                                result.push(item);
                            }
                        });
                });

            setListaCalificacionProducto(result);
            //console.log("DATOS : ", result);
        } else if (ordenarPor == 2) {
            let ordenafecha = [];

            listaCalificacionProducto &&
                listaCalificacionProducto.map((row, index) => {
                    ordenafecha.push(row.id);
                });

            let ordenado = ordenafecha.sort((a, b) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionProducto &&
                        listaCalificacionProducto.map((item, index) => {
                            if (row == item.id) {
                                result.push(item);
                            }
                        });
                });

            setListaCalificacionProducto(result);
            //console.log("DATOS : ", result);
        } else if (ordenarPor == 3) {
            let ordenacalificacion = [];

            listaCalificacionProducto &&
                listaCalificacionProducto.map((row, index) => {
                    ordenacalificacion.push(row.calificacion);
                });

            let ordenado = ordenacalificacion.sort((b, a) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionProducto &&
                        listaCalificacionProducto.map((item, index) => {
                            if (row == item.calificacion) {
                                result.push(item);
                            }
                        });
                });

            setListaCalificacionProducto(result);
            //console.log("DATOS : ", result);
        } else if (ordenarPor == 4) {
            let ordenacalificacion = [];

            listaCalificacionProducto &&
                listaCalificacionProducto.map((row, index) => {
                    ordenacalificacion.push(row.calificacion);
                });

            let ordenado = ordenacalificacion.sort((a, b) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionProducto &&
                        listaCalificacionProducto.map((item, index) => {
                            if (row == item.calificacion) {
                                result.push(item);
                            }
                        });
                });

            setListaCalificacionProducto(result);
            //console.log("DATOS : ", result);
        }
    }, [ordenarPor]);

    return (
        <div className="mlmenos23 mtmenos30">
            <Grid container spacing={1}>
                <Grid item xs={12} md={12} lg={12}>
                    <Grid item xs={12} md={12} lg={12}>
                        <div className="boxdatasellerqualification">
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <a className="tamañofuentetab colorbase">
                                        Calificación producto
                                    </a>
                                </Grid>
                            </Grid>
                            {calificacionPrd <= 1 ? (
                                <Grid container spacing={1}>
                                    <Grid item xs={2} md={2} lg={2}>
                                        <div className="calificacionprdviewsingle">
                                            {calificacionPrd}
                                        </div>
                                    </Grid>

                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingleviewtot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingletot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingletot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingletot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingletot fa fa-cog pl-20"></i>
                                    </Grid>
                                </Grid>
                            ) : calificacionPrd <= 2 ? (
                                <Grid container spacing={1}>
                                    <Grid item xs={2} md={2} lg={2}>
                                        <div className="calificacionprdviewsingle">
                                            {calificacionPrd}
                                        </div>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingleviewtot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingleviewtot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingletot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingletot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingletot fa fa-cog pl-20"></i>
                                    </Grid>
                                </Grid>
                            ) : calificacionPrd <= 3 ? (
                                <Grid container spacing={1}>
                                    <Grid item xs={2} md={2} lg={2}>
                                        <div className="calificacionprdviewsingle">
                                            {calificacionPrd}
                                        </div>
                                    </Grid>

                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingleviewtot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingleviewtot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingleviewtot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingletot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingletot fa fa-cog pl-20"></i>
                                    </Grid>
                                </Grid>
                            ) : calificacionPrd <= 4 ? (
                                <Grid container spacing={1}>
                                    <Grid item xs={2} md={2} lg={2}>
                                        <div className="calificacionprdviewsingle">
                                            {calificacionPrd}
                                        </div>
                                    </Grid>

                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingleviewtot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingleviewtot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingleviewtot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingleviewtot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingletot fa fa-cog pl-20"></i>
                                    </Grid>
                                </Grid>
                            ) : calificacionPrd <= 5 ? (
                                <Grid container spacing={1}>
                                    <Grid item xs={2} md={2} lg={2}>
                                        <div className="calificacionprdviewsingle">
                                            {calificacionPrd}
                                        </div>
                                    </Grid>

                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingleviewtot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingleviewtot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingleviewtot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingleviewtot fa fa-cog pl-20"></i>
                                    </Grid>
                                    <Grid xs={1} sm={1} md={1} lg={1}>
                                        <i className="ratingprdsingleviewtot fa fa-cog pl-20"></i>
                                    </Grid>
                                </Grid>
                            ) : (
                                <a className="calificacionproducto">
                                    No tiene calificaciones
                                </a>
                            )}
                            <Grid container spacing={1} className="ml-0">
                                <Grid item xs={12} md={12} lg={12}>
                                    <a className="promediocalificacionprd">
                                        {listaCalificacionProducto.length}{" "}
                                        Calificaciones
                                    </a>
                                </Grid>
                            </Grid>
                        </div>

                        <Grid container spacing={1} className="ml-1 mtmenos90">
                            <Grid item xs={7} md={7} lg={7}>
                                <a className="textocomentarioscompradores">
                                    Comentarios de los usuarios
                                </a>
                            </Grid>
                            <Grid item xs={5} md={5} lg={5}>
                                <div className="mtmenos9">
                                    <SortByViewPrdSingle
                                        setOrdenarPor={setOrdenarPor}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <div className="lineacalificacionvendedortres"></div>
                            </Grid>
                        </Grid>

                        {listaCalificacionProducto.length > 0
                            ? listaCalificacionProducto &&
                              listaCalificacionProducto.map((item, index) => {
                                  return (
                                      <div>
                                          {item.calificacion == 1 ? (
                                              <Grid container spacing={1}>
                                                  <Grid
                                                      xs={1}
                                                      sm={1}
                                                      md={1}
                                                      lg={1}>
                                                      <i className="ratingprdinfsellertres fa fa-cog pl-20"></i>
                                                  </Grid>
                                                  <Grid
                                                      xs={1}
                                                      sm={1}
                                                      md={1}
                                                      lg={1}>
                                                      <a className="ml-45">
                                                          <i className="ratingprdinfseller fa fa-cog"></i>
                                                      </a>
                                                  </Grid>
                                                  <Grid
                                                      xs={1}
                                                      sm={1}
                                                      md={1}
                                                      lg={1}>
                                                      <a className="">
                                                          <i className="ratingprdinfseller fa fa-cog "></i>
                                                      </a>
                                                  </Grid>
                                                  <Grid
                                                      xs={1}
                                                      sm={1}
                                                      md={1}
                                                      lg={1}>
                                                      <a className="mlmenos45">
                                                          <i className="ratingprdinfseller fa fa-cog "></i>
                                                      </a>
                                                  </Grid>
                                                  <Grid
                                                      xs={1}
                                                      sm={1}
                                                      md={1}
                                                      lg={1}>
                                                      <a className="mlmenos89">
                                                          <i className="ratingprdinfseller fa fa-cog "></i>
                                                      </a>
                                                  </Grid>
                                              </Grid>
                                          ) : item.calificacion == 2 ? (
                                              <Grid container spacing={1}>
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
                                                      <a className="mlmenos25">
                                                          <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                      </a>
                                                  </Grid>
                                                  <Grid
                                                      xs={1}
                                                      sm={1}
                                                      md={1}
                                                      lg={1}>
                                                      <a className="mlmenos50">
                                                          <i className="ratingprdinfsellercuatronone fa fa-cog mt-4"></i>
                                                      </a>
                                                  </Grid>
                                                  <Grid
                                                      xs={1}
                                                      sm={1}
                                                      md={1}
                                                      lg={1}>
                                                      <a className="mlmenos75">
                                                          <i className="ratingprdinfsellercinconone fa fa-cog mt-4"></i>
                                                      </a>
                                                  </Grid>
                                                  <Grid
                                                      xs={1}
                                                      sm={1}
                                                      md={1}
                                                      lg={1}>
                                                      <a className="mlmenos100">
                                                          <i className="ratingprdinfseller fa fa-cog mt-4"></i>
                                                      </a>
                                                  </Grid>
                                              </Grid>
                                          ) : item.calificacion == 3 ? (
                                              <Grid container spacing={1}>
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
                                                      <a className="mlmenos25">
                                                          <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                      </a>
                                                  </Grid>
                                                  <Grid
                                                      xs={1}
                                                      sm={1}
                                                      md={1}
                                                      lg={1}>
                                                      <a className="mlmenos50">
                                                          <i className="ratingprdinfsellercuatro fa fa-cog mt-4 "></i>
                                                      </a>
                                                  </Grid>
                                                  <Grid
                                                      xs={1}
                                                      sm={1}
                                                      md={1}
                                                      lg={1}>
                                                      <a className="mlmenos75">
                                                          <i className="ratingprdinfsellercinconone fa fa-cog mt-4 "></i>
                                                      </a>
                                                  </Grid>
                                                  <Grid
                                                      xs={1}
                                                      sm={1}
                                                      md={1}
                                                      lg={1}>
                                                      <a className="mlmenos100">
                                                          <i className="ratingprdinfseller fa fa-cog mt-4 "></i>
                                                      </a>
                                                  </Grid>
                                              </Grid>
                                          ) : item.calificacion == 4 ? (
                                              <Grid container spacing={1}>
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
                                                      <a className="mlmenos25">
                                                          <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                      </a>
                                                  </Grid>
                                                  <Grid
                                                      xs={1}
                                                      sm={1}
                                                      md={1}
                                                      lg={1}>
                                                      <a className="mlmenos50">
                                                          <i className="ratingprdinfsellercuatro fa fa-cog mt-4 "></i>
                                                      </a>
                                                  </Grid>
                                                  <Grid
                                                      xs={1}
                                                      sm={1}
                                                      md={1}
                                                      lg={1}>
                                                      <a className="mlmenos75">
                                                          <i className="ratingprdinfsellercinco fa fa-cog mt-4 "></i>
                                                      </a>
                                                  </Grid>
                                                  <Grid
                                                      xs={1}
                                                      sm={1}
                                                      md={1}
                                                      lg={1}>
                                                      <a className="mlmenos100">
                                                          <i className="ratingprdinfseller fa fa-cog mt-4 "></i>
                                                      </a>
                                                  </Grid>
                                              </Grid>
                                          ) : item.calificacion == 5 ? (
                                              <Grid container spacing={1}>
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
                                                      <a className="mlmenos25">
                                                          <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                      </a>
                                                  </Grid>
                                                  <Grid
                                                      xs={1}
                                                      sm={1}
                                                      md={1}
                                                      lg={1}>
                                                      <a className="mlmenos50">
                                                          <i className="ratingprdinfsellercuatro fa fa-cog mt-4 "></i>
                                                      </a>
                                                  </Grid>
                                                  <Grid
                                                      xs={1}
                                                      sm={1}
                                                      md={1}
                                                      lg={1}>
                                                      <a className="mlmenos75">
                                                          <i className="ratingprdinfsellercinco fa fa-cog mt-4 "></i>
                                                      </a>
                                                  </Grid>
                                                  <Grid
                                                      xs={1}
                                                      sm={1}
                                                      md={1}
                                                      lg={1}>
                                                      <a className="mlmenos100">
                                                          <i className="ratingprdinfsellerok fa fa-cog mt-4 "></i>
                                                      </a>
                                                  </Grid>
                                              </Grid>
                                          ) : null}
                                          <Grid container spacing={1}>
                                              <Grid item xs={7} md={7} lg={7}>
                                                  <a className="textocomentarioscalificacion">
                                                      Comentarios de la
                                                      calificación
                                                  </a>
                                              </Grid>
                                          </Grid>
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
                                                      ).format("YYYY-MM-DD")}
                                                  </div>
                                              </Grid>
                                              <Grid
                                                  item
                                                  xs={12}
                                                  md={12}
                                                  lg={12}>
                                                  <div className="lineacalificacionvendedor"></div>
                                              </Grid>
                                          </Grid>
                                      </div>
                                  );
                              })
                            : null}
                        {/*
 <Grid item xs={12} md={12} lg={12}>
                            <div className="lineacalificacionvendedor"></div>
                        </Grid>
    */}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default ModuleQualificationPrd;
