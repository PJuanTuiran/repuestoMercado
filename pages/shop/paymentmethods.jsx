import React, { useEffect, useState } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import { useRouter, connect } from "next/router";
import { Box, Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { myNumber, nameMonth } from "../../utilities/ArrayFunctions";
import Moment from "moment";
import logobancolombia from "../../public/static/img/logobancolombiacirculo.png";
import logonequi from "../../public/static/img/logonequicirculo.png";
import ModalMensajes from "../mensajes/ModalMensajes";

const breadcrumb = [
    {
        text: "Inicio",
        url: "/",
    },
    {
        text: "Tienda",
        url: "/shopping-cart",
    },
    {
        text: "Pagar",
    },
];

const PaymentMethods = () => {
    const router = useRouter();
    const [direccionesUsuarios, setDireccionesUsuarios] = useState([]);
    const [prdComprarAhora, setPrdComprarAhora] = useState([]);
    const [itemCompra, setItemCompra] = useState([]);
    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [unidadesSelect, setunidadesSelect] = useState(0);
    const [entrega, setEntrega] = useState([]);
    const [undsel, setUndsel] = useState([]);
    const [classUndMas, setClassUndMas] = useState("btnunidselshoppingcart");
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const mes = Moment(new Date()).format("MM");
    const dia = Moment(new Date()).format("DD");
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [metodoPagoPse, setMetodoPagoPse] = useState(false);
    const [metodoPagoTarjeta, setMetodoPagoTarjeta] = useState(false);
    const [metodoPagoEfecty, setMetodoPagoEfecty] = useState(false);
    const [metodoPagoBancolombia, setMetodoPagoBancolombia] = useState(false);
    const [metodoPagoNequi, setMetodoPagoNequi] = useState(false);
    const [valorEnvio, setvalorEnvio] = useState(11300);
    const [totalPagar, setTotalPagar] = useState(0);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    useEffect(() => {
        let ent = [];
        let datitem = JSON.parse(localStorage.getItem("itemcompra"));

        let totalpagar = (datitem.cantidad*datitem.precio)+valorEnvio;
        //console.log("DAT XXXX : ", totalpagar);
        setTotalPagar(totalpagar);
        
        setItemCompra(datitem);
        const leerItems = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "65",
                params,
            })
                .then((res) => {
                    res.data.listardireccionesusuario;
                    let datausuario = res.data.listardireccionesusuario;

                    setDireccionesUsuarios(
                        res.data.listardireccionesusuario[0]
                    );
                    setDireccion(
                        res.data.listardireccionesusuario[0].direccion
                    );
                    setCiudad(
                        res.data.listardireccionesusuario[0].nombreciudad
                    );
                    setDepartamento(
                        res.data.listardireccionesusuario[0].nombre_dep
                    );

                    let month = "";
                    if (mes <= 9) month = "0" + mes;
                    else month = "" + mes;

                    let nomMeses = nameMonth(month);
                    let diax = parseInt(dia) + parseInt(3);

                    let entrega =
                        "Se entrega en " +
                        datausuario[0].nombreciudad +
                        " entre el " +
                        dia +
                        " y " +
                        diax +
                        " de " +
                        nomMeses;
                    ent.push(entrega);
                })
                .catch(function (error) {
                    console.log("Error leyendo direcciones");
                });
            setEntrega(ent);
        };
        leerItems();
    }, [datosusuarios]);

    useEffect(() => {
        let numberprd = JSON.parse(localStorage.getItem("numberprd"));

        if (numberprd == "checkoutall") {
            let params = {
                usuario: datosusuarios.uid,
            };

            const leerItems = async () => {
                await axios({
                    method: "post",
                    url: URL_BD_MR + "59",
                    params,
                })
                    .then((res) => {
                        setPrdComprarAhora(res.data.listarcarritocompra);

                        let unidades = [];
                        res.data.listarcarritocompra &&
                            res.data.listarcarritocompra.map((item, index) => {
                                unidades.push(item.cantidad);
                            });

                        setUndsel(unidades);
                    })
                    .catch(function (error) {
                        console.log("Error leyendo datos carrito de compras");
                    });
            };
            leerItems();
        } else if (numberprd == "checkout") {
            let datitem = JSON.parse(localStorage.getItem("itemcompra"));

            let params = {
                usuario: datosusuarios.uid,
                idproducto: datitem.idproducto,
            };

            const leerItems = async () => {
                await axios({
                    method: "post",
                    url: URL_BD_MR + "62",
                    params,
                })
                    .then((res) => {
                        setPrdComprarAhora(res.data.listaritemcarrito);
                        let unidades = [];
                        res.data.listaritemcarrito &&
                            res.data.listaritemcarrito.map((item, index) => {
                                unidades.push(item.cantidad);
                            });

                        setUndsel(unidades);
                    })
                    .catch(function (error) {
                        console.log("Error leyendo datos carrito de compras");
                    });
            };
            leerItems();
        }
    }, [datosusuarios]);

    const selCantidad = (cant, unddispo, index) => {
        if (undsel[index] == null) undsel[index] = parseInt(cant);
        else undsel[index] = parseInt(undsel[index]) + parseInt(cant);

        let cantidad = parseInt(undsel[index]) + parseInt(cant);

        setunidadesSelect(cantidad);
        setQuantity(unddispo);
        //product.numerounidades
    };

    const pasarelaPagos = (dat) => {
        if (
            !metodoPagoPse &&
            !metodoPagoTarjeta &&
            !metodoPagoEfecty &&
            !metodoPagoBancolombia &&
            !metodoPagoNequi
        ) {
            setShowModalMensajes(true);
            setTituloMensajes("Metodos de pago");
            setTextoMensajes("Debes seleccionar el metodo de pago!");
            return;
        } else {
            localStorage.setItem("totalapagar", JSON.stringify(totalPagar));
            let ruta = "/shop/payment/";
            router.push(ruta);
        }
    };

    const metodoPago = (item) => {
        if (item == 1) {
            setMetodoPagoPse(true);
            setMetodoPagoTarjeta(false);
            setMetodoPagoEfecty(false);
            setMetodoPagoBancolombia(false);
            setMetodoPagoNequi(false);
        } else if (item == 2) {
            setMetodoPagoPse(false);
            setMetodoPagoTarjeta(true);
            setMetodoPagoEfecty(false);
            setMetodoPagoBancolombia(false);
            setMetodoPagoNequi(false);
        } else if (item == 3) {
            setMetodoPagoPse(false);
            setMetodoPagoTarjeta(false);
            setMetodoPagoEfecty(true);
            setMetodoPagoBancolombia(false);
            setMetodoPagoNequi(false);
        } else if (item == 4) {
            setMetodoPagoPse(false);
            setMetodoPagoTarjeta(false);
            setMetodoPagoEfecty(false);
            setMetodoPagoBancolombia(true);
            setMetodoPagoNequi(false);
        } else if (item == 5) {
            setMetodoPagoPse(false);
            setMetodoPagoTarjeta(false);
            setMetodoPagoEfecty(false);
            setMetodoPagoBancolombia(false);
            setMetodoPagoNequi(true);
        }
    };

    return (
        <Container title="Checkout">
            <div className="ps-page ps-page--shopping">
                <ModalMensajes
                    shown={showModalMensajes}
                    close={setShowModalMensajes}
                    titulo={tituloMensajes}
                    mensaje={textoMensajes}
                    tipo="1"
                />
                <div className="container">
                    <div className="ml-52">
                        <BreadCrumb breacrumb={breadcrumb} />
                    </div>
                    <div className="cajacompraprd">
                        <div>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item xs={12} md={6} lg={6}>
                                    <div className="titulodireccionenvio">
                                        Detalle del pago
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <div className="titulodireccionenvio">
                                        Resumen de tu pedido
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6} lg={6}>
                                    <div className="cajametodospago">
                                        <Grid
                                            container
                                            spacing={1}
                                            className="mt-2 mb-1">
                                            <Grid item xs={12} md={12} lg={12}>
                                                <div className="titulocomopagar">
                                                    Escoge como deseas pagar
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <div className="cajacomopagar">
                                            <Grid
                                                container
                                                spacing={1}
                                                className="mt-0 pl-10"
                                                onClick={() => metodoPago(1)}>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={1}
                                                    lg={1}>
                                                    <div>
                                                        {metodoPagoPse ? (
                                                            <i
                                                                className="ubicarcheckmetodopago fa fa-check-square-o"
                                                                aria-hidden="true"></i>
                                                        ) : (
                                                            <i
                                                                className="ubicarcheckmetodopago fa fa-square-o"
                                                                aria-hidden="true"></i>
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={2} md={2} lg={2}>
                                                    <div className="circulbotonpago">
                                                        <i
                                                            className="fa fa-university tamañoiconopse"
                                                            aria-hidden="true"></i>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={8} md={8} lg={8}>
                                                    <a>
                                                        <div className="textomediosdepagocomprar">
                                                            Pago con
                                                            transferencias por
                                                            PSE
                                                        </div>
                                                    </a>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="cajacomopagar">
                                            <Grid
                                                container
                                                spacing={1}
                                                className="mt-0 pl-10"
                                                onClick={() => metodoPago(2)}>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={1}
                                                    lg={1}>
                                                    <div>
                                                        {metodoPagoTarjeta ? (
                                                            <i
                                                                className="ubicarcheckmetodopago fa fa-check-square-o"
                                                                aria-hidden="true"></i>
                                                        ) : (
                                                            <i
                                                                className="ubicarcheckmetodopago fa fa-square-o"
                                                                aria-hidden="true"></i>
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={2} md={2} lg={2}>
                                                    <div className="circulbotonpagodos">
                                                        <i
                                                            className="fa fa-credit-card tamañoiconopse"
                                                            aria-hidden="true"></i>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={8} md={8} lg={8}>
                                                    <a>
                                                        <div className="textomediosdepagocomprar">
                                                            Pago con tarjeta de
                                                            debito o crédito
                                                        </div>
                                                    </a>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="cajacomopagar">
                                            <Grid
                                                container
                                                spacing={1}
                                                className="mt-0 pl-10"
                                                onClick={() => metodoPago(3)}>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={1}
                                                    lg={1}>
                                                    <div>
                                                        {metodoPagoEfecty ? (
                                                            <i
                                                                className="ubicarcheckmetodopago fa fa-check-square-o"
                                                                aria-hidden="true"></i>
                                                        ) : (
                                                            <i
                                                                className="ubicarcheckmetodopago fa fa-square-o"
                                                                aria-hidden="true"></i>
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={2} md={2} lg={2}>
                                                    <div className="circulbotonpagodos">
                                                        <i
                                                            className="fa fa-money tamañoiconopse"
                                                            aria-hidden="true"></i>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={8} md={8} lg={8}>
                                                    <a>
                                                        <div className="textomediosdepagocomprar">
                                                            Pago con efectivo a
                                                            través de Efecty
                                                        </div>
                                                    </a>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="cajacomopagar">
                                            <Grid
                                                container
                                                spacing={1}
                                                className="mt-1 pl-10"
                                                onClick={() => metodoPago(4)}>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={1}
                                                    lg={1}>
                                                    <div>
                                                        {metodoPagoBancolombia ? (
                                                            <i
                                                                className="ubicarcheckmetodopago fa fa-check-square-o"
                                                                aria-hidden="true"></i>
                                                        ) : (
                                                            <i
                                                                className="ubicarcheckmetodopago fa fa-square-o"
                                                                aria-hidden="true"></i>
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={2} md={2} lg={2}>
                                                    <div className="circulbotonpagotres">
                                                        <img
                                                            className="logobancolombiacomprar"
                                                            src={
                                                                logobancolombia.src
                                                            }
                                                            alt="First slide"
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={8} md={8} lg={8}>
                                                    <a>
                                                        <div className="textomediosdepagocomprar">
                                                            Pagon con botón
                                                            Bancolombia
                                                        </div>
                                                    </a>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="cajacomopagar">
                                            <Grid
                                                container
                                                spacing={1}
                                                className="mt-1"
                                                onClick={() => metodoPago(5)}>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={1}
                                                    lg={1}>
                                                    <div>
                                                        {metodoPagoNequi ? (
                                                            <i
                                                                className="ubicarcheckmetodopagodos fa fa-check-square-o"
                                                                aria-hidden="true"></i>
                                                        ) : (
                                                            <i
                                                                className="ubicarcheckmetodopagodos fa fa-square-o"
                                                                aria-hidden="true"></i>
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={2} md={2} lg={2}>
                                                    <div className="circulbotonpagocuatro">
                                                        <img
                                                            className="logonequicomprar"
                                                            src={logonequi.src}
                                                            alt="First slide"
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={8} md={8} lg={8}>
                                                    <a>
                                                        <div className="textomediosdepagocomprar pl-9">
                                                            Pago con nequi
                                                        </div>
                                                    </a>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <Grid
                                            container
                                            spacing={1}
                                            className="mt-2 mb-1">
                                            <Grid item xs={12} md={12} lg={12}>
                                                <div
                                                    className="btncomopagar"
                                                    onClick={() =>
                                                        pasarelaPagos()
                                                    }>
                                                    Continuar
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid item xs={12} md={6} lg={6}>
                                    <div className="cajaresumenpedidodos">
                                        {prdComprarAhora.length > 0
                                            ? prdComprarAhora &&
                                              prdComprarAhora.map(
                                                  (item, index) => {
                                                      return (
                                                          <div>
                                                              {item.idproducto ==
                                                              itemCompra.idproducto ? (
                                                                  <Grid
                                                                      container
                                                                      spacing={
                                                                          1
                                                                      }>
                                                                      <Grid
                                                                          item
                                                                          xs={
                                                                              12
                                                                          }
                                                                          md={
                                                                              12
                                                                          }
                                                                          lg={
                                                                              12
                                                                          }>
                                                                          <div>
                                                                              <Grid
                                                                                  container
                                                                                  spacing={
                                                                                      1
                                                                                  }>
                                                                                  <Grid
                                                                                      item
                                                                                      xs={
                                                                                          12
                                                                                      }
                                                                                      md={
                                                                                          3
                                                                                      }
                                                                                      lg={
                                                                                          3
                                                                                      }>
                                                                                      <img
                                                                                          className="imageshoppingcartdos"
                                                                                          src={
                                                                                              URL_IMAGES_RESULTS +
                                                                                              itemCompra.nombreimagen1
                                                                                          }
                                                                                          alt="First slide"
                                                                                      />
                                                                                  </Grid>
                                                                                  <Grid
                                                                                      item
                                                                                      xs={
                                                                                          12
                                                                                      }
                                                                                      md={
                                                                                          9
                                                                                      }
                                                                                      lg={
                                                                                          9
                                                                                      }>
                                                                                      <Grid
                                                                                          item
                                                                                          xs={
                                                                                              12
                                                                                          }
                                                                                          md={
                                                                                              12
                                                                                          }
                                                                                          lg={
                                                                                              12
                                                                                          }>
                                                                                          <div className="textoproductocomprados">
                                                                                              {
                                                                                                  itemCompra.titulonombre
                                                                                              }
                                                                                          </div>
                                                                                      </Grid>

                                                                                      <Grid
                                                                                          item
                                                                                          xs={
                                                                                              12
                                                                                          }
                                                                                          md={
                                                                                              2
                                                                                          }
                                                                                          lg={
                                                                                              2
                                                                                          }>
                                                                                          <div className="ml-19 mt-8">
                                                                                              <Grid
                                                                                                  container
                                                                                                  spacing={
                                                                                                      1
                                                                                                  }>
                                                                                                  <Grid
                                                                                                      item
                                                                                                      xs={
                                                                                                          12
                                                                                                      }
                                                                                                      md={
                                                                                                          3
                                                                                                      }
                                                                                                      lg={
                                                                                                          3
                                                                                                      }>
                                                                                                      <div className="textoundcomprados">
                                                                                                          Cantidad
                                                                                                          :{" "}
                                                                                                          {myNumber(
                                                                                                              1,
                                                                                                              undsel[
                                                                                                                  index
                                                                                                              ],
                                                                                                              2
                                                                                                          )}
                                                                                                      </div>
                                                                                                  </Grid>
                                                                                              </Grid>
                                                                                          </div>
                                                                                      </Grid>
                                                                                  </Grid>
                                                                                  <Grid
                                                                                      item
                                                                                      xs={
                                                                                          12
                                                                                      }
                                                                                      md={
                                                                                          12
                                                                                      }
                                                                                      lg={
                                                                                          12
                                                                                      }>
                                                                                      <Grid
                                                                                          container
                                                                                          spacing={
                                                                                              1
                                                                                          }>
                                                                                          <Grid
                                                                                              item
                                                                                              xs={
                                                                                                  12
                                                                                              }
                                                                                              md={
                                                                                                  6
                                                                                              }
                                                                                              lg={
                                                                                                  6
                                                                                              }>
                                                                                              <div className="textoprecioprdresumen">
                                                                                                  Precio
                                                                                                  producto:
                                                                                              </div>
                                                                                          </Grid>
                                                                                          <Grid
                                                                                              item
                                                                                              xs={
                                                                                                  12
                                                                                              }
                                                                                              md={
                                                                                                  1
                                                                                              }
                                                                                              lg={
                                                                                                  1
                                                                                              }>
                                                                                              <div className="simbolopesostres">
                                                                                                  $
                                                                                              </div>
                                                                                          </Grid>
                                                                                          <Grid
                                                                                              item
                                                                                              xs={
                                                                                                  12
                                                                                              }
                                                                                              md={
                                                                                                  4
                                                                                              }
                                                                                              lg={
                                                                                                  4
                                                                                              }>
                                                                                              <div className="precioprdresumen">
                                                                                                  {" "}
                                                                                                  {myNumber(
                                                                                                      1,
                                                                                                      item.precio,
                                                                                                      2
                                                                                                  )}
                                                                                              </div>
                                                                                          </Grid>
                                                                                      </Grid>

                                                                                      <Grid
                                                                                          container
                                                                                          spacing={
                                                                                              1
                                                                                          }>
                                                                                          <Grid
                                                                                              item
                                                                                              xs={
                                                                                                  12
                                                                                              }
                                                                                              md={
                                                                                                  6
                                                                                              }
                                                                                              lg={
                                                                                                  6
                                                                                              }>
                                                                                              <div className="textoprecioprdresumenenvio">
                                                                                                  Precio
                                                                                                  envio:
                                                                                              </div>
                                                                                          </Grid>
                                                                                          <Grid
                                                                                              item
                                                                                              xs={
                                                                                                  12
                                                                                              }
                                                                                              md={
                                                                                                  1
                                                                                              }
                                                                                              lg={
                                                                                                  1
                                                                                              }>
                                                                                              <div className="simbolopesoscuatro">
                                                                                                  $
                                                                                              </div>
                                                                                          </Grid>
                                                                                          <Grid
                                                                                              item
                                                                                              xs={
                                                                                                  12
                                                                                              }
                                                                                              md={
                                                                                                  4
                                                                                              }
                                                                                              lg={
                                                                                                  4
                                                                                              }>
                                                                                              <div className="precioprdresumenenvio">
                                                                                                  {" "}
                                                                                                  {myNumber(
                                                                                                      1,
                                                                                                      valorEnvio,
                                                                                                      2
                                                                                                  )}
                                                                                              </div>
                                                                                          </Grid>
                                                                                      </Grid>
                                                                                      <Grid
                                                                                          container
                                                                                          spacing={
                                                                                              1
                                                                                          }>
                                                                                          <Grid
                                                                                              item
                                                                                              xs={
                                                                                                  12
                                                                                              }
                                                                                              md={
                                                                                                  6
                                                                                              }
                                                                                              lg={
                                                                                                  6
                                                                                              }>
                                                                                              <div className="textoprecioprdresumentotal">
                                                                                                  Total
                                                                                                  a
                                                                                                  pagar:
                                                                                              </div>
                                                                                          </Grid>
                                                                                          <Grid
                                                                                              item
                                                                                              xs={
                                                                                                  12
                                                                                              }
                                                                                              md={
                                                                                                  1
                                                                                              }
                                                                                              lg={
                                                                                                  1
                                                                                              }>
                                                                                              <div className="simbolopesoscinco">
                                                                                                  $
                                                                                              </div>
                                                                                          </Grid>
                                                                                          <Grid
                                                                                              item
                                                                                              xs={
                                                                                                  12
                                                                                              }
                                                                                              md={
                                                                                                  4
                                                                                              }
                                                                                              lg={
                                                                                                  4
                                                                                              }>
                                                                                              <div className="precioprdresumentotaldos">
                                                                                                  {isNaN(
                                                                                                      parseInt(
                                                                                                          itemCompra.precio *
                                                                                                              undsel[
                                                                                                                  index
                                                                                                              ] +
                                                                                                              valorEnvio
                                                                                                      )
                                                                                                  )
                                                                                                      ? myNumber(
                                                                                                            1,
                                                                                                            itemCompra.precio *
                                                                                                                itemCompra.cantidad +
                                                                                                                valorEnvio,
                                                                                                            2
                                                                                                        )
                                                                                                      : myNumber(
                                                                                                            1,
                                                                                                            itemCompra.precio *
                                                                                                                undsel[
                                                                                                                    index
                                                                                                                ] +
                                                                                                                valorEnvio,
                                                                                                            2
                                                                                                        )}
                                                                                              </div>
                                                                                          </Grid>
                                                                                      </Grid>
                                                                                  </Grid>
                                                                              </Grid>
                                                                          </div>
                                                                      </Grid>
                                                                  </Grid>
                                                              ) : null}
                                                              {prdComprarAhora.length !=
                                                              index + 1 ? (
                                                                  <hr />
                                                              ) : null}

                                                              <br />
                                                          </div>
                                                      );
                                                  }
                                              )
                                            : null}
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PaymentMethods;
