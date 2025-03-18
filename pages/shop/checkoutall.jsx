import React, { useEffect, useState } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import { useRouter, connect } from "next/router";
import { Box, Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { myNumber, nameMonth } from "../../utilities/ArrayFunctions";
import Moment from "moment";
import { Form, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes, { func } from "prop-types";
import ModalMensajes from "../mensajes/ModalMensajes";
import { getItemComprar } from "../../store/itemcomprar/action";
import { getSelectedAddress } from "../../store/selectedaddress/action";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}>
        {children}
        &#x25bc;
    </a>
));

const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
        const [value, setValue] = useState("");
        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}>
                <Form.Control
                    autoFocus
                    className="my-2 tamañocajaoptionsitemssearchcity"
                    placeholder="Buscar"
                    onChange={(e) => setValue(e.target.value.toLowerCase())}
                    //value={value}
                />

                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value ||
                            child.props.children
                                .toString()
                                .toLowerCase()
                                .startsWith(value) ||
                            child.props.children.toString().startsWith(value)
                    )}
                </ul>
                {}
            </div>
        );
    }
);

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix=""
        />
    );
}

function NumberFormatCelular(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            isNumericString
            prefix=""
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

NumberFormatCelular.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

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

const tipoCalle = [
    { value: 1, nombre: "Avenida" },
    { value: 2, nombre: "Avenida Calle" },
    { value: 3, nombre: "Avenida Carrera" },
    { value: 4, nombre: "Calle" },
    { value: 5, nombre: "Carrera" },
    { value: 6, nombre: "Circular" },
    { value: 7, nombre: "Circunvalar" },
    { value: 8, nombre: "Diagonal" },
    { value: 9, nombre: "Manzana" },
    { value: 10, nombre: "Transversal" },
    { value: 11, nombre: "Vía" },
];

let ent = [];
let totaldetalle = [];
let envios = 0;

const CheckoutAll = () => {
    const router = useRouter();
    const dispatch = useDispatch();
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
    let mes = Moment(new Date()).format("MM");
    let dia = Moment(new Date()).format("DD");
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [fechaSel, setFechaSel] = useState("Seleccione Fecha");
    const [totalItems, setTotalItems] = useState(0);
    const [totalCompra, setTotalCompra] = useState(0);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    let selectedaddress = [];
    selectedaddress = useSelector(
        (state) => state.selectedaddress.selectedaddress
    );

    // console.log("MES Y DIA : ", mes, " - ", dia);
    useEffect(() => {
        ent = [];
        let datitem = JSON.parse(localStorage.getItem("itemcompraall"));
        //console.log("DAITEM : ", datitem);
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
                    if (res.data.listardireccionesusuario.length > 0) {
                        res.data.listardireccionesusuario;
                        let datausuario = res.data.listardireccionesusuario;

                        if (selectedaddress.length == 0) {
                            setDireccionesUsuarios(
                                res.data.listardireccionesusuario[0]
                            );
                            setDireccion(
                                res.data.listardireccionesusuario[0].direccion
                            );
                            dispatch(getSelectedAddress(res.data.listardireccionesusuario[0]));
                            setCiudad(
                                res.data.listardireccionesusuario[0]
                                    .nombreciudad
                            );
                            setDepartamento(
                                res.data.listardireccionesusuario[0].nombre_dep
                            );
                        }
                        let month = "";
                        if (mes <= 9) month = "0" + mes;
                        else month = "" + mes;

                        let nomMeses = nameMonth(month);
                        let diax = parseInt(dia) + parseInt(3);
                        if (diax > 0) {
                            dia = 1;
                            diax = 3;
                            mes = parseInt(mes) + parseInt(1);

                            if (mes <= 9) month = "0" + mes;
                            else month = "" + mes;

                            nomMeses = nameMonth(month);
                        }

                        res.data.listardireccionesusuario &&
                            res.data.listardireccionesusuario.map(
                                (item, index) => {
                                    if (index == 0) {
                                        let entrega =
                                            item.nombreciudad +
                                            " entre el " +
                                            dia +
                                            " y " +
                                            diax +
                                            " de " +
                                            nomMeses;

                                        let row = {
                                            value: index,
                                            nombre: entrega,
                                        };

                                        ent.push(row);
                                    }
                                }
                            );
                    }
                })
                .catch(function (error) {
                    console.log("Error leyendo direcciones");
                });
        };
        leerItems();
        //setEntrega(ent);
    }, [datosusuarios]);

    useEffect(() => {
        if (selectedaddress.length > 0) {
            setDireccionesUsuarios(selectedaddress[0]);
            localStorage.setItem(
                "direccionusuario",
                JSON.stringify(selectedaddress[0])
            );

            setDireccion(selectedaddress[0].direccion);
            //dispatch(getSelectedAddress(selectedaddress[0]));
            setCiudad(selectedaddress[0].nombreciudad);
            setDepartamento(selectedaddress[0].nombre_dep);
            //console.log("DIRECCIONES : ", selectedaddress);
        }
    }, [selectedaddress]);

    useEffect(() => {
        const leerItems = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "59",
                params,
            })
                .then((res) => {
                    setPrdComprarAhora(res.data.listarcarritocompra);
                    let unidades = [];
                    envios = 11500 * res.data.listarcarritocompra.length;

                    totaldetalle = [];
                    res.data.listarcarritocompra &&
                        res.data.listarcarritocompra.map((item, index) => {
                            unidades.push(item.cantidad);
                            let totitem =
                                parseInt(item.precio) * parseInt(item.cantidad);
                            totaldetalle.push(totitem);
                        });
                    //console.log("UND SEL : ", totaldetalle);
                    setUndsel(unidades);
                    //ispatch(getDataShoppingCart(res.data.listarcarritocompra.length));
                    let total = 0;
                    totaldetalle &&
                        totaldetalle.map((row) => {
                            //console.log("UND SEL : ", row);
                            total = parseInt(total) + parseInt(row);
                        });
                    setTotalItems(total);
                    setTotalCompra(total + envios);
                })
                .catch(function (error) {
                    console.log("Error leyendo datos carrito de compras");
                });
        };
        leerItems();
    }, [datosusuarios]);

    const selCantidad = (cant, unddispo, index, precio) => {
        if (undsel[index] == null) undsel[index] = parseInt(cant);
        else undsel[index] = parseInt(undsel[index]) + parseInt(cant);

        let cantidad = parseInt(undsel[index]) + parseInt(cant);
        let valor = undsel[index] * precio;

        let total = 0;
        let totdet = [];
        //console.log("TOT DET : ", totaldetalle);
        totaldetalle &&
            totaldetalle.map((row, item) => {
                if (index == item) {
                    total = parseInt(total) + parseInt(valor);
                    totdet.push(valor);
                } else {
                    total = parseInt(total) + parseInt(row);
                    totdet.push(row);
                }
            });

        totaldetalle = totdet;
        setTotalItems(total);

        setunidadesSelect(cantidad);
        setQuantity(unddispo);
        //product.numerounidades
    };

    const tusDirecciones = (dat) => {
        let ruta = "/shop/youraddresses/";
        router.push(ruta);
    };

    const infoSiguiente = (dat) => {
        if (fechaSel == "Seleccione Fecha" || !fechaSel) {
            setShowModalMensajes(true);
            setTituloMensajes("Direcciones usuarios");
            setTextoMensajes(
                "Debes seleccionar la fecha de entrega del producto!"
            );
            return;
        } else {
            if (direccionesUsuarios.length === 0) {
                let ruta = "/shop/youraddresses/";
                router.push(ruta);
            } else {
                localStorage.setItem(
                    "totalapagar",
                    JSON.stringify(totalCompra)
                );
                let ruta = "/shop/payment/";

                dispatch(getItemComprar(true));

                router.push({
                    pathname: "/shop/payment/",
                    query: {
                        direccion: JSON.stringify(direccion),
                    },
                });
            }
        }
    };

    const selectFechaEntrega = (data, name) => {
        setFechaSel(name);
        //setTipoCalleSeleccionada(data);
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
                    <div className="cajacheckout">
                        <div className="cajacompraprd">
                            <div>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={7} lg={7}>
                                        <div className="titulodireccionenvio">
                                            Dirección de envío
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={5} lg={5}>
                                        <div className="titulodireccionenviodos">
                                            Resumen de pedido
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>

                            <div>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={7} lg={7}>
                                        <Grid
                                            container
                                            alignItems="center"
                                            spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <div className="cajadireccionenvioall">
                                                    <Grid
                                                        container
                                                        alignItems="center"
                                                        spacing={1}>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={1}
                                                            lg={1}>
                                                            <div className="iconlocatecuatro">
                                                                <LocationOnIcon
                                                                    className="locationoniconaddress"
                                                                    style={{
                                                                        fontSize: 30,
                                                                    }}
                                                                />
                                                            </div>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={7}
                                                            lg={7}>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={12}
                                                                lg={12}>
                                                                <div className="textodireccionenviouno">
                                                                    {direccionesUsuarios
                                                                        ? direccion
                                                                        : null}
                                                                </div>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={12}
                                                                lg={12}>
                                                                <div className="textodireccionenviotres">
                                                                    {direccionesUsuarios
                                                                        ? ciudad +
                                                                          ", " +
                                                                          departamento
                                                                              .charAt(
                                                                                  0
                                                                              )
                                                                              .toUpperCase() +
                                                                          departamento
                                                                              .slice(
                                                                                  1
                                                                              )
                                                                              .toLowerCase()
                                                                        : null}
                                                                </div>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={3}
                                                            lg={3}>
                                                            <div
                                                                className="btnaddaddress"
                                                                onClick={() =>
                                                                    tusDirecciones()
                                                                }>
                                                                Elegir o agregar
                                                                una nueva
                                                                dirección
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className="titulodetallesenvioall">
                                                Detalles del envío
                                            </div>
                                        </Grid>
                                        {prdComprarAhora.length > 0
                                            ? prdComprarAhora &&
                                              prdComprarAhora.map(
                                                  (item, index) => {
                                                      return (
                                                          <div className="cajadetallesenvioall">
                                                              <Grid
                                                                  container
                                                                  alignItems="center"
                                                                  spacing={1}>
                                                                  <Grid
                                                                      item
                                                                      xs={12}
                                                                      md={12}
                                                                      lg={12}>
                                                                      <Grid
                                                                          container
                                                                          alignItems="center"
                                                                          spacing={
                                                                              1
                                                                          }>
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
                                                                              <div className="iconlocatedos">
                                                                                  <LocalShippingIcon
                                                                                      className="locationoniconaddress"
                                                                                      style={{
                                                                                          fontSize: 30,
                                                                                      }}
                                                                                  />
                                                                              </div>
                                                                          </Grid>

                                                                          <Grid
                                                                              item
                                                                              xs={
                                                                                  12
                                                                              }
                                                                              md={
                                                                                  7
                                                                              }
                                                                              lg={
                                                                                  7
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
                                                                                                  6
                                                                                              }
                                                                                              lg={
                                                                                                  6
                                                                                              }>
                                                                                              <div className="textodireccionenviosel">
                                                                                                  Tu
                                                                                                  paquete
                                                                                                  llegará
                                                                                                  a{" "}
                                                                                                  {
                                                                                                      entrega[0]
                                                                                                  }
                                                                                              </div>
                                                                                          </Grid>
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
                                                                                              <Dropdown>
                                                                                                  <Dropdown.Toggle
                                                                                                      onclick={
                                                                                                          CustomToggle
                                                                                                      }
                                                                                                      id="dropdown-custom-components"
                                                                                                      arrowColor="#2D2E83"
                                                                                                      className="dropdownfechaentrega"
                                                                                                      variant="outline-light"
                                                                                                      //</Dropdown>value={marcaVeh}
                                                                                                  >
                                                                                                      <div className="ajustecity">
                                                                                                          <a>
                                                                                                              {
                                                                                                                  fechaSel
                                                                                                              }
                                                                                                          </a>
                                                                                                      </div>
                                                                                                  </Dropdown.Toggle>
                                                                                                  <Dropdown.Menu
                                                                                                      /*
                                                                                                  as={
                                                                                                      CustomMenu
                                                                                                  }
                                                                                                  variant="outline-light"*/
                                                                                                      className="tamañocajafechaentrega">
                                                                                                      {ent &&
                                                                                                          ent.map(
                                                                                                              (
                                                                                                                  item
                                                                                                              ) => {
                                                                                                                  return (
                                                                                                                      <Dropdown.Item
                                                                                                                          className="itemsdropdowncustomcity"
                                                                                                                          onClick={() =>
                                                                                                                              selectFechaEntrega(
                                                                                                                                  item.value,
                                                                                                                                  item.nombre
                                                                                                                              )
                                                                                                                          }
                                                                                                                          eventKey={
                                                                                                                              item.value
                                                                                                                          }>
                                                                                                                          {
                                                                                                                              item.nombre
                                                                                                                          }
                                                                                                                      </Dropdown.Item>
                                                                                                                  );
                                                                                                              }
                                                                                                          )}
                                                                                                  </Dropdown.Menu>
                                                                                              </Dropdown>
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
                                                                                  3
                                                                              }
                                                                              lg={
                                                                                  3
                                                                              }>
                                                                              <div className="textopreciounitfechaentrega">
                                                                                  $
                                                                                  11.500
                                                                              </div>
                                                                          </Grid>
                                                                      </Grid>
                                                                  </Grid>
                                                                  <Grid
                                                                      container
                                                                      alignItems="center"
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
                                                                                  alignItems="center"
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
                                                                                      <div>
                                                                                          <img
                                                                                              className="imageshoppingcarttres"
                                                                                              src={
                                                                                                  URL_IMAGES_RESULTS +
                                                                                                  item.nombreimagen1
                                                                                              }
                                                                                              alt="First slide"
                                                                                          />
                                                                                      </div>
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
                                                                                          <div className="textoproductocompratres">
                                                                                              {
                                                                                                  item.titulonombre
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
                                                                                                  alignItems="center"
                                                                                                  spacing={
                                                                                                      1
                                                                                                  }
                                                                                                  className="cajaundselectcompratres">
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
                                                                                                      {undsel[
                                                                                                          index
                                                                                                      ] <=
                                                                                                      1 ? (
                                                                                                          <div
                                                                                                              className="btnundcompramenos sinborder deshabilitar"
                                                                                                              onClick={() =>
                                                                                                                  selCantidad(
                                                                                                                      -1,
                                                                                                                      item.numerodeunidades,
                                                                                                                      index,
                                                                                                                      item.precio
                                                                                                                  )
                                                                                                              }>
                                                                                                              _
                                                                                                          </div>
                                                                                                      ) : (
                                                                                                          <div
                                                                                                              className="btnundcompramenos sinborder"
                                                                                                              onClick={() =>
                                                                                                                  selCantidad(
                                                                                                                      -1,
                                                                                                                      item.numerodeunidades,
                                                                                                                      index,
                                                                                                                      item.precio
                                                                                                                  )
                                                                                                              }>
                                                                                                              _
                                                                                                          </div>
                                                                                                      )}
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
                                                                                                      <div className="mtmenos5">
                                                                                                          <input
                                                                                                              className="cajaundinputcompra"
                                                                                                              type="text"
                                                                                                              defaultValue="1"
                                                                                                              value={
                                                                                                                  undsel[
                                                                                                                      index
                                                                                                                  ]
                                                                                                              }
                                                                                                              //onChange={(e)=>handleChangeInput(e.target.value)}
                                                                                                              placeholder="1"
                                                                                                          />
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
                                                                                                      {undsel[
                                                                                                          index
                                                                                                      ] >=
                                                                                                      item.numerodeunidades ? (
                                                                                                          <div
                                                                                                              className="btnundcompramas sinborder deshabilitar"
                                                                                                              onClick={() =>
                                                                                                                  selCantidad(
                                                                                                                      1,
                                                                                                                      item.numerodeunidades,
                                                                                                                      index,
                                                                                                                      item.precio
                                                                                                                  )
                                                                                                              }>
                                                                                                              +
                                                                                                          </div>
                                                                                                      ) : (
                                                                                                          <div
                                                                                                              className="btnundcompramas sinborder"
                                                                                                              onClick={() =>
                                                                                                                  selCantidad(
                                                                                                                      1,
                                                                                                                      item.numerodeunidades,
                                                                                                                      index,
                                                                                                                      item.precio
                                                                                                                  )
                                                                                                              }>
                                                                                                              +
                                                                                                          </div>
                                                                                                      )}
                                                                                                  </Grid>

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
                                                                                                      <div className="textoundcompra">
                                                                                                          Disponibles:{" "}
                                                                                                          {myNumber(
                                                                                                              1,
                                                                                                              item.numerodeunidades,
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
                                                                                      <div className="textopreciounitcompratres">
                                                                                          Precio
                                                                                          Unitario:
                                                                                          $
                                                                                          {myNumber(
                                                                                              1,
                                                                                              item.precio,
                                                                                              2
                                                                                          )}
                                                                                          {}
                                                                                      </div>
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
                                                                                      {}
                                                                                      <div className="textopreciototcompratres">
                                                                                          Precio
                                                                                          Total
                                                                                          :
                                                                                          $
                                                                                          {isNaN(
                                                                                              parseInt(
                                                                                                  item.precio *
                                                                                                      undsel[
                                                                                                          index
                                                                                                      ]
                                                                                              )
                                                                                          )
                                                                                              ? myNumber(
                                                                                                    1,
                                                                                                    item.precio *
                                                                                                        itemCompra.cantidad,
                                                                                                    2
                                                                                                )
                                                                                              : myNumber(
                                                                                                    1,
                                                                                                    item.precio *
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
                                                              </Grid>
                                                          </div>
                                                      );
                                                  }
                                              )
                                            : null}
                                    </Grid>

                                    <Grid item xs={12} md={5} lg={5}>
                                        <Grid
                                            container
                                            alignItems="center"
                                            spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <div className="cajaresumenpedidoalldos">
                                                    <Grid
                                                        container
                                                        alignItems="center"
                                                        spacing={1}>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={9}
                                                            lg={9}>
                                                            <div className="textoprdresumencompra">
                                                                Total productos
                                                                (
                                                                {
                                                                    prdComprarAhora.length
                                                                }
                                                                )
                                                            </div>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={1}
                                                            lg={1}>
                                                            <div className="textoprdresumencompra">
                                                                $
                                                            </div>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={2}
                                                            lg={2}>
                                                            <div className="formatoprecioresumenpedido">
                                                                {myNumber(
                                                                    1,
                                                                    totalItems,
                                                                    2
                                                                )}
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid
                                                        container
                                                        alignItems="center"
                                                        spacing={1}>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={9}
                                                            lg={9}>
                                                            <div className="textoprdresumencompra">
                                                                Total envios
                                                            </div>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={1}
                                                            lg={1}>
                                                            <div className="textoprdresumencompra">
                                                                $
                                                            </div>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={2}
                                                            lg={2}>
                                                            <div className="formatoprecioresumenpedido">
                                                                {myNumber(
                                                                    1,
                                                                    envios,
                                                                    2
                                                                )}
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid
                                                        container
                                                        alignItems="center"
                                                        spacing={1}>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={9}
                                                            lg={9}>
                                                            <div className="textoprdresumencompra">
                                                                Total a pagar
                                                            </div>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={1}
                                                            lg={1}>
                                                            <div className="textoprdresumencompra">
                                                                $
                                                            </div>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={2}
                                                            lg={2}>
                                                            <div className="formatoprecioresumenpedido">
                                                                {myNumber(
                                                                    1,
                                                                    totalCompra,
                                                                    2
                                                                )}
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={10} lg={10}></Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        md={2}
                                        lg={2}
                                        onClick={() => infoSiguiente()}>
                                        <div className="botoncontinuardireccion">
                                            Siguiente
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CheckoutAll;
