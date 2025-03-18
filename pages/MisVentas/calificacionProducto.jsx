import React, { useEffect, useState } from "react";
import Rating from "~/components/elements/Rating";
import { Box, Grid, Button } from "@mui/material";
//import SortByViewPrdSingle from "../../../partials/shop/modules/SortByViewPrdSingle";
import SortByViewPrdSingle from "../../components/partials/shop/modules/SortByViewPrdSingle";
import axios from "axios";
import Moment from "moment";
import ContainerPrd from "../../components/layouts/ContainerPrd";
import { useRouter } from "next/router";
import { getUserMenuPrimary } from "../../store/usermenuprimary/action";
import { useDispatch, useSelector } from "react-redux";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";

function CalificacionPrd(props) {

    const router = useRouter();
    const dispatch = useDispatch();
    const [listaCalificacionProducto, setListaCalificacionProducto] = useState(
        []
    );
    const [prdVendidos, setprdVendidos] = useState(0);
    const [ordenarPor, setOrdenarPor] = useState(0);
    const [calificacionPrd, setCalificacionPrd] = useState(0);

    let product = 0;
    let imagen = "";
    let titulo = "";

    if (typeof window !== "undefined") {
        if (router.query.product) {
            product = JSON.parse(router.query.product);
            imagen = router.query.imagen;
            titulo = router.query.titulo;
        }
    }

    useEffect(() => {
        //const fechaactual = Moment(datosusuario.fechacreacion).format("YYYY-MM-DD");
        dispatch(getUserMenuPrimary(false));
        const leerCalificacionProducto = async () => {
            let params = {
                producto: product,
            };

            //console.log("PRODUCTO : ", params);
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
        dispatch(getUserMenuPrimary(false));
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
        <ContainerPrd>
            <div className="cajacalificacionprd">
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
                                {calificacionPrd > 0 ? (
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className="tituloimagenescalificacionprd">
                                                {titulo}
                                            </div>
                                        </Grid>

                                        <Grid item xs={4} md={4} lg={4}>
                                            <div className="cajaimagenespost">
                                                {
                                                    <a
                                                    //href={`/product/${product.id}`}
                                                    //as={`/product/${product.id}`}
                                                    >
                                                        <img
                                                            className="cajaimagencalificacionprd"
                                                            src={
                                                                URL_IMAGES_RESULTS +
                                                                "/" +
                                                                imagen
                                                            }
                                                            alt="First slide"
                                                        />
                                                        {
                                                            //badges(product)
                                                        }
                                                    </a>
                                                }
                                            </div>
                                        </Grid>

                                        <Grid item xs={3} md={3} lg={3}>
                                            <div className="calificaciontotprd">
                                                {calificacionPrd}
                                            </div>
                                        </Grid>

                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            {calificacionPrd > 0 ? (
                                                <i className="calificacionprdtotal fa fa-cog"></i>
                                            ) : (
                                                <i className="calificacionprdtotal3 fa fa-cog"></i>
                                            )}
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <div className="ml-10">
                                                {calificacionPrd > 1 ? (
                                                    <i className="calificacionprdtotal fa fa-cog"></i>
                                                ) : (
                                                    <i className="calificacionprdtotal3 fa fa-cog"></i>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <div className="ml-20">
                                                {calificacionPrd > 2 ? (
                                                    <i className="calificacionprdtotal fa fa-cog"></i>
                                                ) : (
                                                    <i className="calificacionprdtotal3 fa fa-cog"></i>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <div className="ml-30">
                                                {calificacionPrd > 3 ? (
                                                    <i className="calificacionprdtotal fa fa-cog"></i>
                                                ) : (
                                                    <i className="calificacionprdtotal3 fa fa-cog"></i>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <div className="ml-40">
                                                {calificacionPrd > 4 ? (
                                                    <i className="calificacionprdtotal fa fa-cog"></i>
                                                ) : (
                                                    <i className="calificacionprdtotal3 fa fa-cog"></i>
                                                )}
                                            </div>
                                        </Grid>
                                        
                                    </Grid>
                                ) : (
                                    <a className="calificacionproducto">
                                        No tiene calificaciones
                                    </a>
                                )}
                            </div>
                            <Grid container spacing={1} >
                                <Grid item xs={12} md={12} lg={12}>
                                    <div className="cajacalificacionespromedioprd">
                                        {listaCalificacionProducto.length}{" "}
                                        Calificaciones
                                    </div>
                                </Grid>
                            </Grid>

                            <div className="mt-90"></div>
                            

                            <Grid
                                container
                                spacing={1}
                                className="ml-1 ">
                                <Grid item xs={7} md={7} lg={7}>
                                    <a className="textocomentarioscompradores">
                                        Comentarios de los usuarios
                                    </a>
                                </Grid>
                                <Grid item xs={5} md={5} lg={5}>
                                    <div className="mtmenos10">
                                        <SortByViewPrdSingle
                                            setOrdenarPor={setOrdenarPor}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <div className="lineacalificacionprd"></div>
                                </Grid>
                            </Grid>

                            {listaCalificacionProducto.length > 0
                                ? listaCalificacionProducto &&
                                  listaCalificacionProducto.map(
                                      (item, index) => {
                                          return (
                                              <div className="mlmenos3">
                                                  {item.calificacion == 1 ? (
                                                      <Grid
                                                          container
                                                          spacing={1}>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <div>
                                                                  <i className="ratingcalificacionprd fa fa-cog "></i>
                                                              </div>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog"></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                      </Grid>
                                                  ) : item.calificacion == 2 ? (
                                                      <Grid
                                                          container
                                                          spacing={1}>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingcalificacionprd fa fa-cog"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog"></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog"></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog"></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog"></i>
                                                              </a>
                                                          </Grid>
                                                      </Grid>
                                                  ) : item.calificacion == 3 ? (
                                                      <Grid
                                                          container
                                                          spacing={1}>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingcalificacionprd fa fa-cog"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog"></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                      </Grid>
                                                  ) : item.calificacion == 4 ? (
                                                      <Grid
                                                          container
                                                          spacing={1}>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingcalificacionprd fa fa-cog"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog"></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                      </Grid>
                                                  ) : item.calificacion == 5 ? (
                                                      <Grid
                                                          container
                                                          spacing={1}>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingcalificacionprd fa fa-cog"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog"></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                      </Grid>
                                                  ) : null}
                                                  <Grid container spacing={1}>
                                                      <Grid
                                                          item
                                                          xs={7}
                                                          md={7}
                                                          lg={7}>
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
                                                          <div className="lineacalificacionvendedor"></div>
                                                      </Grid>
                                                  </Grid>
                                              </div>
                                          );
                                      }
                                  )
                                : null}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </ContainerPrd>
    );
}

export default CalificacionPrd;
