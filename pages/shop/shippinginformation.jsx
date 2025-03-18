import React, { useEffect, useState } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ModalMensajes from "../mensajes/ModalMensajes";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { myNumber } from "../../utilities/ArrayFunctions";
import PropTypes, { func } from "prop-types";
import { useRouter} from "next/router";
import {
    Button,
    Row,
    Col,
    Card,
    Form,
    ListGroup,
    Tooltip,
    Overlay,
    Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
        text: "Direcciones",
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

let undsel = [];
let itemaddress = [];

const ShippingInformation = () => {
    const router = useRouter();
    const [direccionesUsuarios, setDireccionesUsuarios] = useState([]);
    const [addressSelect, setAddressSelect] = useState([]);
    const [DireccionEnvio, setDireccionEnvio] = useState([]);
    const [itemCompra, setItemCompra] = useState([]);
    const [prdComprarAhora, setPrdComprarAhora] = useState([]);

    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [departamento, setDepartamento] = useState("");

    const [selectdepto, setSelectDepto] = useState("Seleccione departamento");
    const [selectciudad, setSelectCiudad] = useState("Seleccione ciudad");
    const [selecttipocalle, setSelectTipoCalle] = useState("Tipo de calle");
    const [enableCiudad, setEnableCiudad] = useState(true);
    const [enableTipoCalle, setEnableTipoCalle] = useState(true);
    const [contadorLetrasDescripcion, setContadorLetrasDescripcion] =
        useState(0);

    const [alertBtnDpto, setAlertBtnDpto] = useState("dropdowncustomaddress");
    const [alertBtnCiudad, setAlertBtnCiudad] = useState(
        "dropdowncustomaddress"
    );
    const [alertBtnTipoCalle, setAlertBtnTipoCalle] = useState(
        "dropdowncustomtipocalle"
    );
    const [alertBtnCalle, setAlertBtnCalle] = useState("cajacalle");
    const [alertBtnNumeroUno, setAlertBtnNumeroUno] =
        useState("cajanumerocalle");
    const [alertBtnNumeroDos, setAlertBtnNumeroDos] =
        useState("cajanumerocalle");
    const [alertBtnComplemento, setAlertBtnComplemento] = useState(
        "dropdowncustomtipocalle"
    );
    const [alertBtnNombre, setAlertBtnNombre] = useState(
        "nombreapellidorecibe"
    );
    const [alertBtnTelefono, setAlertBtnTelefono] = useState("telefonorecibe");

    const [tituloDescripcion, setTituloDescripcion] = useState(null);
    const [textoDescripcion, setTextoDescripcion] = useState(
        "Aquí puedes escribir el nombre del edificio, conjunto, numero de apartamento, torre, o puntos de referencia de tu dirección."
    );

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [dptoSeleccionado, setDptoSeleccionado] = useState(null);
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);
    const [barrioSeleccionado, setBarrioSeleccionado] = useState(null);
    const [calleSeleccionada, setCalleSeleccionada] = useState(null);
    const [numeroUnoSeleccionado, setNumeroUnoSeleccionado] = useState(null);
    const [numeroDosSeleccionado, setNumeroDosSeleccionado] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [unidadesSelect, setunidadesSelect] = useState(0);
    const [nombreRecibeSeleccionado, setNombreRecibeSeleccionado] =
        useState(null);
    const [telefonoRecibeSeleccionado, setTelefonoRecibeSeleccionado] =
        useState(null);

    const [tipoCalleSeleccionada, setTipoCalleSeleccionada] = useState(null);
    const [ciudadDepto, setCiudadDepto] = useState([]);
    const [inputDescripcionProducto, setInputDescripcionProducto] = useState(
        "form-control ps-form__input complementoaddress colorboder"
    );
    const [fecha, setFecha] = useState(null);
    const [idSelect, setIdSelect] = useState(null);

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    let departamentos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_departamentos
    );
    let ciudades = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_ciudades
    );

    //console.log("DATOS GEN : ", datosciu)
    useEffect(() => {
        let datitem = JSON.parse(localStorage.getItem("itemcompra"));
        let direccionenvio = JSON.parse(localStorage.getItem("direccionenvio"));
        setDireccionEnvio(direccionenvio);

        setIdSelect(direccionenvio.id);
        setDptoSeleccionado(direccionenvio.codigo_dep);
        setCiudadSeleccionada(direccionenvio.ciudad);
        setTipoCalleSeleccionada(direccionenvio.tipocalle);
        setSelectDepto(direccionenvio.nombre_dep);
        setSelectCiudad(direccionenvio.nombreciudad);
        setSelectTipoCalle(direccionenvio.tipocalle);
        setBarrioSeleccionado(direccionenvio.barrio);
        setCalleSeleccionada(direccionenvio.calle);
        setNumeroUnoSeleccionado(direccionenvio.numerouno);
        setNumeroDosSeleccionado(direccionenvio.numerodos);
        setNombreRecibeSeleccionado(direccionenvio.nombrerecibe);
        setTelefonoRecibeSeleccionado(direccionenvio.telefonorecibe);
        setTituloDescripcion(direccionenvio.comentario);
        setFecha(direccionenvio.fechacreacion);
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
                    res.data.listardireccionesusuario;

                    setDireccionesUsuarios(res.data.listardireccionesusuario);
                    setDireccion(
                        res.data.listardireccionesusuario[0].direccion
                    );
                    setCiudad(
                        res.data.listardireccionesusuario[0].nombreciudad
                    );
                    /*
                    setDepartamento(
                        res.data.listardireccionesusuario[0].nombre_dep
                    );
                    setSelectDepto(
                        res.data.listardireccionesusuario[0].nombre_dep
                    );
                    setSelectCiudad(
                        res.data.listardireccionesusuario[0].nombreciudad
                    );
                    setSelectTipoCalle("Avenida");
                    */
                })
                .catch(function (error) {
                    console.log("Error leyendo direcciones");
                });
        };
        leerItems();
    }, [datosusuarios]);

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
                    console.log(
                        "DAT SHOPPING CART: ",
                        res.data.listarcarritocompra
                    );

                    res.data.listarcarritocompra &&
                        res.data.listarcarritocompra.map((item, index) => {
                            undsel[index] = item.cantidad;
                        });
                    //ispatch(getDataShoppingCart(res.data.listarcarritocompra.length));
                })
                .catch(function (error) {
                    console.log("Error leyendo datos carrito de compras");
                });
        };
        leerItems();
    }, [datosusuarios]);

    const reiniciardpto = () => {
        setAlertBtnDpto("dropdowncustomaddress");
    };

    const reiniciarciudad = () => {
        setAlertBtnCiudad("dropdowncustomaddress");
    };

    const reiniciartipocalle = () => {
        setAlertBtnTipoCalle("dropdowncustomtipocalle");
    };

    const reiniciarcalle = () => {
        setAlertBtnCalle("cajacalle");
    };

    const reiniciarDescripcion = () => {
        setInputDescripcionProducto(
            "form-control ps-form__input complementoaddress colorboder"
        );
    };

    const reiniciarNumeroUno = () => {
        setAlertBtnNumeroUno("cajanumerocalle");
    };

    const reiniciarNumeroDos = () => {
        setAlertBtnNumeroDos("cajanumerocalle");
    };

    const reiniciarNombre = () => {
        setAlertBtnNombre("nombreapellidorecibe");
    };

    const reiniciarTelefono = () => {
        setAlertBtnTelefono("telefonorecibe");
    };

    const SelectDepto = (data, name) => {
        setSelectDepto(name);
        setSelectCiudad("Seleccione ciudad");
        let ciud = [];
        ciudades &&
            ciudades.map((item) => {
                if (item.departamento_ciu == data) {
                    ciud.push(item);
                }
            });
        setDptoSeleccionado(data);
        setCiudadDepto(ciud);
        if (ciud.length > 0) setEnableCiudad(false);
    };

    const SelectCiudad = (data, name) => {
        setSelectCiudad(name);
        setCiudadSeleccionada(data);
        setEnableTipoCalle(false);
    };

    const SelectTipoCalle = (data, name) => {
        setSelectTipoCalle(name);
        setTipoCalleSeleccionada(data);
    };

    const handleChangeInputBarrio = (data) => {
        setBarrioSeleccionado(data);
    };

    const handleChangeInputCalle = (data) => {
        setCalleSeleccionada(data);
    };

    const handleChangeInputNumeroUno = (data) => {
        setNumeroUnoSeleccionado(data);
    };

    const handleChangeInputNumeroDos = (data) => {
        setNumeroDosSeleccionado(data);
    };

    const handleChangeInputNombreApellido = (data) => {
        setNombreRecibeSeleccionado(data);
    };

    const handleChangeInputTelefonoRecibe = (data) => {
        setTelefonoRecibeSeleccionado(data);
    };

    //console.log("BARRIO : ", barrioSeleccionado);

    const descripcionOnChange = (e) => {
        //console.log("LONGITUD DESCRIPCION : ", e);
        var strLength = e.length;
        //console.log("DESCRIPCION : ", strLength);
        let descripcion = "";
        let letra;
        for (var i = 0; i < 139; i++) {
            letra = e.substr(i, 1);
            descripcion = descripcion + letra;
        }
        setTituloDescripcion(descripcion);

        setContadorLetrasDescripcion(strLength);

        if (strLength > 139) {
            setShowModalMensajes(true);
            setTituloMensajes("Información adicional");
            setTextoMensajes(
                "Número de caracteres supera el maximo de 140 permitido!"
            );
            return;
        }
    };

    const updateAddress = () => {
        if (!dptoSeleccionado) {
            setAlertBtnDpto("dropdowncustomaddressalert");
        }
        if (!ciudadSeleccionada) {
            setAlertBtnCiudad("dropdowncustomaddressalert");
        }
        if (!tipoCalleSeleccionada) {
            setAlertBtnTipoCalle("dropdowncustomtipocallealert");
        }
        if (!calleSeleccionada) {
            setAlertBtnCalle("cajacalle alertboton");
        }
        if (!tituloDescripcion) {
            setInputDescripcionProducto(
                "form-control ps-form__input complementoaddressalert"
            );
        }
        if (!numeroUnoSeleccionado) {
            setAlertBtnNumeroUno("cajanumerocalle alertboton");
        }
        if (!numeroDosSeleccionado) {
            setAlertBtnNumeroDos("cajanumerocalle alertboton");
        }
        if (!nombreRecibeSeleccionado) {
            setAlertBtnNombre("nombreapellidorecibe alertboton");
        }
        if (!telefonoRecibeSeleccionado) {
            setAlertBtnTelefono("telefonorecibe alertboton");
        }

        const actualizadireccion = async () => {
            let params = {
                id: idSelect,
                usuario: datosusuarios.uid,
                direccion:
                    calleSeleccionada +
                    " # " +
                    numeroUnoSeleccionado +
                    " - " +
                    numeroDosSeleccionado,
                tipocalle: selecttipocalle,
                calle: calleSeleccionada,
                numerouno: numeroUnoSeleccionado,
                numerodos: numeroDosSeleccionado,
                ciudad: ciudadSeleccionada,
                telefonorecibe: telefonoRecibeSeleccionado,
                nombrerecibe: nombreRecibeSeleccionado,
                comentario: tituloDescripcion,
                barrio: barrioSeleccionado,
                fechacreacion: fecha,
            };

            //console.log("ACTUALIZA : ", params);
            //return;

            await axios({
                method: "post",
                url: URL_BD_MR + "67",
                params,
            })
                .then((res) => {
                    //console.log("DIRECIONES : ", res.data);
                    setShowModalMensajes(true);
                    setTituloMensajes("Direcciones usuarios");
                    setTextoMensajes("Dirección actualizada!");
                })
                .catch(function (error) {
                    console.log("Error Actualizando direcciones");
                });
        };
        actualizadireccion();
    };

    const selectItems = (dat) => {
        let item = [];
        item.push(dat);
        setAddressSelect(item);
        localStorage.setItem("addressselect", JSON.stringify(dat));
    };

    const selCantidad = (cant, unddispo, index) => {
        if (undsel[index] == null) undsel[index] = parseInt(cant);
        else undsel[index] = parseInt(undsel[index]) + parseInt(cant);

        let cantidad = parseInt(undsel[index]) + parseInt(cant);

        setunidadesSelect(cantidad);
        setQuantity(unddispo);
        //product.numerounidades
    };

    const metodosPago = (dat) => {
        let ruta = "/shop/paymentmethods/";
        localStorage.setItem("numberprd", JSON.stringify("checkout"));
        router.push(ruta);
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
                    <div>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs={12} md={7} lg={7}>
                                <div className="titulodireccionenvio">
                                    Dirección de envio
                                </div>
                            </Grid>
                            <Grid item xs={12} md={5} lg={5}>
                                <div className="titulotusproductos">
                                    Tus productos
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <div>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs={12} md={7} lg={7}>
                                <div className="boxshippinginformation">
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}>
                                        <Grid item xs={12} md={1} lg={1}>
                                            <div className="iconlocate">
                                                <LocationOnIcon
                                                    className="locationoniconaddress"
                                                    style={{
                                                        fontSize: 38,
                                                    }}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                            <div className="textodirecciones">
                                                Agregar dirección
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}>
                                        <Grid item xs={12} md={6} lg={6}>
                                            <div className="mt-20 eliminarborde">
                                                <div className="tituloaddress pb-3">
                                                    * Departamento
                                                </div>
                                                <Dropdown
                                                    onClick={() =>
                                                        reiniciardpto()
                                                    }>
                                                    <div>
                                                        <Dropdown.Toggle
                                                            onclick={
                                                                CustomToggle
                                                            }
                                                            id="dropdown-custom-components"
                                                            arrowColor="#2D2E83"
                                                            className={
                                                                alertBtnDpto
                                                            }
                                                            variant="outline-light"
                                                            //</Dropdown>value={marcaVeh}
                                                        >
                                                            <div className="ajustecity">
                                                                <a>
                                                                    {
                                                                        selectdepto
                                                                    }
                                                                </a>
                                                            </div>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu
                                                            as={CustomMenu}
                                                            variant="outline-light"
                                                            className="tamañocajaoptionsaddress">
                                                            {departamentos &&
                                                                departamentos.map(
                                                                    (item) => {
                                                                        return (
                                                                            <Dropdown.Item
                                                                                className="itemsdropdowncustomcity"
                                                                                onClick={() =>
                                                                                    SelectDepto(
                                                                                        item.codigo_dep,
                                                                                        item.label
                                                                                    )
                                                                                }
                                                                                eventKey={
                                                                                    item.codigo_dep
                                                                                }>
                                                                                {
                                                                                    item.label
                                                                                }
                                                                            </Dropdown.Item>
                                                                        );
                                                                    }
                                                                )}
                                                        </Dropdown.Menu>
                                                    </div>
                                                </Dropdown>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                            <div className="mt-20 eliminarborde">
                                                <div className="tituloaddress pb-3">
                                                    * Ciudad
                                                </div>
                                                <Dropdown
                                                    onClick={() =>
                                                        reiniciarciudad()
                                                    }>
                                                    <Dropdown.Toggle
                                                        onclick={CustomToggle}
                                                        id="dropdown-custom-components"
                                                        arrowColor="#2D2E83"
                                                        className={
                                                            alertBtnCiudad
                                                        }
                                                        variant="outline-light"
                                                        //</Dropdown>value={marcaVeh}
                                                    >
                                                        <div className="ajustecity">
                                                            <a>
                                                                {selectciudad}
                                                            </a>
                                                        </div>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        as={CustomMenu}
                                                        variant="outline-light"
                                                        className="tamañocajaoptionsaddress">
                                                        {ciudadDepto &&
                                                            ciudadDepto.map(
                                                                (item) => {
                                                                    return (
                                                                        <Dropdown.Item
                                                                            className="itemsdropdowncustomcity"
                                                                            onClick={() =>
                                                                                SelectCiudad(
                                                                                    item.id_ciu,
                                                                                    item.label
                                                                                )
                                                                            }
                                                                            eventKey={
                                                                                item.codigo_ciu
                                                                            }>
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </Dropdown.Item>
                                                                    );
                                                                }
                                                            )}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}>
                                        <Grid item xs={12} md={6} lg={6}>
                                            <div className="mt-20 eliminarborde">
                                                <div className="tituloaddress pb-3">
                                                    Barrio
                                                </div>
                                                <input
                                                    className="cajabarrios"
                                                    type="text"
                                                    placeholder="Nombre del barrio o sector"
                                                    value={barrioSeleccionado}
                                                    onChange={(e) =>
                                                        handleChangeInputBarrio(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}>
                                        <Grid item xs={12} md={3} lg={3}>
                                            <div className="mt-20 eliminarborde">
                                                <div className="tituloaddress pb-3">
                                                    * Tipo de calle
                                                </div>
                                                <Dropdown
                                                    onClick={() =>
                                                        reiniciartipocalle()
                                                    }>
                                                    <Dropdown.Toggle
                                                        onclick={CustomToggle}
                                                        id="dropdown-custom-components"
                                                        arrowColor="#2D2E83"
                                                        className={
                                                            alertBtnTipoCalle
                                                        }
                                                        variant="outline-light"
                                                        //</Dropdown>value={marcaVeh}
                                                    >
                                                        <div className="ajustecity">
                                                            <a>
                                                                {
                                                                    selecttipocalle
                                                                }
                                                            </a>
                                                        </div>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        as={CustomMenu}
                                                        variant="outline-light"
                                                        className="tamañocajaoptionsaddress">
                                                        {tipoCalle &&
                                                            tipoCalle.map(
                                                                (item) => {
                                                                    return (
                                                                        <Dropdown.Item
                                                                            className="itemsdropdowncustomcity"
                                                                            onClick={() =>
                                                                                SelectTipoCalle(
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
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={5} lg={5}>
                                            <div
                                                className="ml-10 mt-20 eliminarborde"
                                                onClick={() =>
                                                    reiniciarcalle()
                                                }>
                                                <div className="tituloaddress pb-3">
                                                    * Calle
                                                </div>
                                                <input
                                                    className={alertBtnCalle}
                                                    type="text"
                                                    placeholder="Nombre y el prefijo. Ej: 22 Sur."
                                                    value={calleSeleccionada}
                                                    onChange={(e) =>
                                                        handleChangeInputCalle(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={2} lg={2}>
                                            <div
                                                className="ml-40 mt-20 eliminarborde"
                                                onClick={() =>
                                                    reiniciarNumeroUno()
                                                }>
                                                <div className="tituloaddress pb-3">
                                                    Número
                                                </div>
                                                <input
                                                    className={
                                                        alertBtnNumeroUno
                                                    }
                                                    type="text"
                                                    value={
                                                        numeroUnoSeleccionado
                                                    }
                                                    onChange={(e) =>
                                                        handleChangeInputNumeroUno(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="#"
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={1} lg={1}>
                                            <div
                                                className="ml-15 mt-43 eliminarborde"
                                                onClick={() =>
                                                    reiniciarNumeroDos()
                                                }>
                                                <div className="tituloaddress pb-3"></div>
                                                <input
                                                    className={
                                                        alertBtnNumeroDos
                                                    }
                                                    type="text"
                                                    placeholder="-"
                                                    value={
                                                        numeroDosSeleccionado
                                                    }
                                                    onChange={(e) =>
                                                        handleChangeInputNumeroDos(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <div
                                            className="ps-form__group"
                                            onClick={() =>
                                                reiniciarDescripcion()
                                            }>
                                            <div className="tituloaddress mt-10 pb-3">
                                                Complemento o referencias
                                                adicionales
                                            </div>
                                            <textarea
                                                className={
                                                    inputDescripcionProducto
                                                }
                                                placeholder={textoDescripcion}
                                                value={tituloDescripcion}
                                                name="descripcionproducto"
                                                //onClick={(e) =>
                                                //    iniciarDescripcionproducto()
                                                //}
                                                onChange={(e) =>
                                                    descripcionOnChange(
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                            />
                                            <div className="textocontadoraddress">
                                                {contadorLetrasDescripcion}{" "}
                                                {"/"} 140
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <div
                                            className="ps-form__group"
                                            onClick={() => reiniciarNombre()}>
                                            <div className="tituloaddress mtmenos10 pb-3">
                                                Nombre y apellido de quien
                                                recibe
                                            </div>
                                            <input
                                                className={alertBtnNombre}
                                                type="text"
                                                placeholder="Nombre y apellido de quien recibe"
                                                value={nombreRecibeSeleccionado}
                                                onChange={(e) =>
                                                    handleChangeInputNombreApellido(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </Grid>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}>
                                        <Grid item xs={12} md={6} lg={6}>
                                            <div
                                                className="ps-form__group"
                                                onClick={() =>
                                                    reiniciarTelefono()
                                                }>
                                                <div className="tituloaddress mt-10  pb-3">
                                                    Teléfono de quien recibe
                                                </div>
                                                <input
                                                    className={alertBtnTelefono}
                                                    type="text"
                                                    placeholder="Teléfono de quien recibe"
                                                    value={
                                                        telefonoRecibeSeleccionado
                                                    }
                                                    onChange={(e) =>
                                                        handleChangeInputTelefonoRecibe(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                            <div className="ps-form__group">
                                                <div
                                                    className="botongrabardireccion mt-10  pb-3"
                                                    onClick={() =>
                                                        updateAddress()
                                                    }>
                                                    Guardar dirección
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={5} lg={5}>
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <div className="cajaresumenenviouno">
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
                                                                                                  className="imageshoppingcart"
                                                                                                  src={
                                                                                                      URL_IMAGES_RESULTS +
                                                                                                      itemCompra.nombreimagen1
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
                                                                                              <div className="textoproductocomprauno">
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
                                                                                                      alignItems="center"
                                                                                                      spacing={
                                                                                                          1
                                                                                                      }
                                                                                                      className="cajaundselectcompra">
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
                                                                                                                          itemCompra.numerodeunidades,
                                                                                                                          index
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
                                                                                                                          itemCompra.numerodeunidades,
                                                                                                                          index
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
                                                                                                          itemCompra.numerodeunidades ? (
                                                                                                              <div
                                                                                                                  className="btnundcompramas sinborder deshabilitar"
                                                                                                                  onClick={() =>
                                                                                                                      selCantidad(
                                                                                                                          1,
                                                                                                                          itemCompra.numerodeunidades,
                                                                                                                          index
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
                                                                                                                          itemCompra.numerodeunidades,
                                                                                                                          index
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
                                                                                                                  itemCompra.numerodeunidades,
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
                                                                                          <div className="textopreciounitcompra">
                                                                                              Precio
                                                                                              unitario:
                                                                                              $
                                                                                              {myNumber(
                                                                                                  1,
                                                                                                  itemCompra.precio,
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
                                                                                          <div className="textopreciototcompra">
                                                                                              Precio
                                                                                              Total
                                                                                              :
                                                                                              $
                                                                                              {isNaN(
                                                                                                  parseInt(
                                                                                                      itemCompra.precio *
                                                                                                          undsel[
                                                                                                              index
                                                                                                          ]
                                                                                                  )
                                                                                              )
                                                                                                  ? myNumber(
                                                                                                        1,
                                                                                                        itemCompra.precio *
                                                                                                            itemCompra.cantidad,
                                                                                                        2
                                                                                                    )
                                                                                                  : myNumber(
                                                                                                        1,
                                                                                                        itemCompra.precio *
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
                                                                  ) : null}
                                                              </div>
                                                          );
                                                      }
                                                  )
                                                : null}
                                        </div>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        md={12}
                                        lg={12}
                                        onClick={() => metodosPago()}>
                                        <div className="botoncontinuarenviouno">
                                            Siguiente
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ShippingInformation;
