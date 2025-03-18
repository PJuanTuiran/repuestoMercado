import React, { useState, useEffect, useRef } from "react";
import Container from "~/components/layouts/Container";
import PropTypes, { func } from "prop-types";
import NumberFormat from "react-number-format";
import {
    Button,
    Row,
    Col,
    Form,
    Tooltip,
    Overlay,
    Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "~/components/elements/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import InfoIcon from "@material-ui/icons/Info";
import ModalMensajes from "../mensajes/ModalMensajes";
import ModalMensajesConfirmar from "../mensajes/ModalMensajesConfirmar";
import ModalMensajesVender from "../mensajes/ModalMensajesVender";
import ModalControlAcceso from "../mensajes/ModalControlAcceso";
import RegistrarFotos from "./RegistrarFotos";
import shortid from "shortid";
import axios from "axios";
import { URL_BD_MR, URL_MK_MR } from "../../helpers/Constants";
import { Box, Grid, Buttom, Autocomplete, TextField } from "@mui/material";

// Componentes Crear Producto
import DatosLatoneria from "./DatosLatoneria";
import DatosVehiculos from "./DatosVehiculos";

// Componente mostrar vehículos temporales asociados a productos
import MostrarVehiculos from "./MostrarVehiculos";
import EditarVehiculos from "./EditarVehiculos";
import DuplicarVehiculos from "./DuplicarVehiculos";

import CategoriasProductosGenericos from "./CategoriasProductosGenericos";
import ModalInformacionGenericos from "./ModalInformacionGenericos";
import ModalInformacionPorUnoVarios from "./ModalInformacionPorUnoVarios";
import { getResetInput } from "../../store/resetinput/action";
import { getUserMenuPrimary } from "../../store/usermenuprimary/action";
import { set } from "lodash";

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

        //console.log("VAULUE : ", value);
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
                { }
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

const CreateProduct = () => {
    const targetshow = useRef(null);
    const irA = useRef(null);
    const router = useRouter();
    const [idVehiculosProducto, setIdvehiculosProducto] = useState(0);

    const [tipoVeh, setTipoVeh] = useState(null);
    const [tipo, setTipo] = useState(0);

    const [showEdit, setShowEdit] = useState(false);
    const [agregarDatos, setAgregarDatos] = useState(false);
    const [eliminoDatos, setEliminoDatos] = useState(false);
    const [mostrarBotonDatosMotor, setMostrarBotonDatosMotor] = useState(false);
    const [agregarVehiculo, setAgregarVehiculo] = useState(false);
    const [showModalDatosProducto, setShowModalDatosProducto] = useState(false);
    const [abrirCerrarCategoriasGenerico, setAbrirCerrarCategoriasGenerico] =
        useState(true);

    const [showModalMensajesConfirmar, setShowModalMensajesConfirmar] =
        useState(false);
    const [confirmarMensaje, setconfirmarMensaje] = useState(false);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [showModalControlAcceso, setShowModalControlAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

    const [showModalMensajesVender, setShowModalMensajesVender] =
        useState(false);
    const [tituloMensajesVender, setTituloMensajesVender] = useState(false);
    const [textoMensajesVender, setTextoMensajesVender] = useState(false);

    const [controlDuplicar, setControlDuplicar] = useState([]);

    const [controlAgregarVehiculo, setControlAgregarVehiculo] = useState(false);
    const [mostrar, setMostrar] = useState(false);
    const [tamaño, setTamaño] = useState("col-12 col-md-6 ml-200");
    const [cerrarDatos, setCerrarDatos] = useState(
        "ps-form__group cajavehiculoscompatiblesproducto colorbase"
    );
    const [cerrarDatosDos, setCerrarDatosDos] = useState(
        "custom-selectidentificavehiculo redondearbordegenerico colorbase"
    );
    const [iconoCerrarUno, setIconCerrarUno] = useState(
        "ml-40 showcerrarabrir"
    );
    const [iconoCerrarDos, setIconCerrarDos] = useState(
        "form-control ps-form__input"
    );

    const [showIconoCerrarAbrir, setShowIconoCerrarAbrir] = useState(false);
    const [genericoUno, setGenericoUno] = useState("Si");
    const [labelGenericoUno, setLabelGenericoUno] = useState(
        "Si - Es compatible con diferentes marcas y modelos de Vehículos."
    );
    const [genericoDos, setGenericoDos] = useState("No");
    const [labelGenericoDos, setLabelGenericoDos] = useState(
        "No - No es compatible con varias marcas y modelos de Vehículos."
    );
    const [botonGenerico, setBotonGenerico] = useState("botongenerico");
    const [classBtnGenerico, setClassBtnGenerico] = useState("botongenerico");
    const [classBtnOpenClose, setClassBtnOpenClose] =
        useState("showcerrarabrir");
    const [selectGenerico, setSelectGenerico] = useState(null);

    const [showCreateProduct, setCreateProduct] = useState(true);

    const [activaDuplicar, setActivaDuplicar] = useState(false);

    const [showModalLatoneria, setShowModalLatoneria] = useState(false);
    const [abrioLatoneria, setAbrioLatoneria] = useState(false);
    const [showModalLatoneriaActiva, setShowModalLatoneriaActiva] =
        useState(false);

    const [showDatosProductos, setShowDatosProductos] = useState(false);
    const [showDatosProductosActiva, setShowDatosProductosActiva] =
        useState(false);

    const [showDatosProductosAdicionales, setShowDatosProductosAdicionales] =
        useState(false);
    const [showIngresoFotos, setShowIngresoFotos] = useState(false);
    const [pageAcount, setPageAcount] = useState("ps-page__content ps-account");
    const [mostrarDatosVehiculos, setMostrarDatosVehiculos] = useState(false);

    /* Adiciona esta variable para control cuando se muestran o no vehículos agregados  */
    const [mostrarVehAgregados, setmostrarVehAgregados] = useState(false);

    const [contador, setContador] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [vehiculosSeleccionados, setVehiculosSeleccionados] = useState([]);
    const [vehiculoBorrar, setVehiculoBorrar] = useState(false);

    const [tipoVehiculoSeleccionado, settipoVehiculoSeleccionado] =
        useState(null);

    const [tipoVehUno, setTipoVehUno] = useState(0);
    const [carroceriaVehUno, setCarroceriaVehUno] = useState(0);
    const [marcaVehUno, setMarcaVehUno] = useState(0);
    const [annoVehUno, setAnnoVehUno] = useState(0);
    const [modeloVehUno, setModeloVehUno] = useState(0);
    const [cilindrajeVehUno, setcilindrajeVehUno] = useState(0);
    const [transmisionVehUno, settransmisionVehUno] = useState(0);
    const [combustibleVehUno, setcombustibleVehUno] = useState(0);
    const [traccionVehUno, settraccionVehUno] = useState(0);

    const [vehiculoUno, setVehiculoUno] = useState(false); // Esta variable habilita la creacion de vehículos

    const [tipoVehSelec, setTipoVehSelec] = useState(0);
    const [carroceriaVehSelec, setCarroceriaVehSelec] = useState(0);
    const [marcaVehSelec, setMarcaVehSelec] = useState(0);
    const [annoVehSelec, setAnnoVehSelec] = useState(0);
    const [modeloVehSelec, setModeloVehSelec] = useState(0);
    const [cilindrajeVehSelec, setCilindrajeVehSelec] = useState(0);
    const [transmisionVehSelec, setTransmisionVehSelec] = useState(0);
    const [combustibleVehSelec, setCombustibleVehSelec] = useState(0);
    const [traccionVehSelec, setTraccionVehSelec] = useState(0);

    const [controlAccion, setControlAccion] = useState(0);
    const [controlAgregaNuevo, setControlAgregaNuevo] = useState(false);
    const [generico, setGenerico] = useState("No");
    const [compatibilidad, setCompatibilidad] = useState(null);
    const [duplicar, setDuplicar] = useState(false);
    const [nuevoVehiculo, setNuevoVehiculo] = useState(false);

    const [showTraccion, setShowTraccion] = useState(false);
    const [showTransmision, setShowTransmision] = useState(false);
    const [showModalGenerico, setShowModalGenerico] = useState(false);
    const [showModalParaUnoVarios, setShowModalParaUnoVarios] = useState(false);

    const [listMarcasVehiculos, setListMarcasVehiculos] = useState([]);
    const [listCarroceriasVehiculos, setListCarroceriasVehiculos] = useState(
        []
    );

    const [listModelosVehiculos, setListModelosVehiculos] = useState([]);
    const [listCilindrajesVehiculos, setListCilindrajesVehiculos] = useState(
        []
    );

    const [vehiculoUnoCrear, setVehiculoUnoCrear] = useState(false);
    const [vehiculoUnoSelecc, setVehiculoUnoSelecc] = useState(false);
    const [vehiculoUnoEditar, setVehiculoUnoEditar] = useState(false);
    const [vehiculoUnoDuplicar, setVehiculoUnoDuplicar] = useState(false);
    const [vehiculoUnoUbicar, setVehiculoUnoUbicar] = useState(false);

    const [botonCrearVehiculo, setbotonCrearVehiculo] = useState(false);

    const [seleccionoTipoVeh, setSeleccionoTipoVeh] = useState(false);
    const [seleccionoUbicacionProducto, setSeleccionoUbicacionProducto] =
        useState(false);
    const [SelecDatosProducto, setSelecDatosProducto] = useState(false);
    const [categoria, setCategoria] = useState(null);
    const [selecCategoria, setSelecCategoria] = useState("No");
    const [quantity, setQuantity] = useState(0);
    const [tituloInformacionProducto, setTituloInformacionProducto] = useState(
        "ml-15 mb-3 tituloadvertenciaproductosizquierda"
    );
    const [descripcionNuevoVehiculo, setDescripcionNuevoVehiculo] = useState(
        "¿Su producto es genérico?"
    );
    const leetipoveh = useSelector(
        (state) => state.typesvehicles.typesvehicles
    );

    const [arrayVehiculosTemporal, setArrayVehiculosTemporal] = useState([]);
    const [numeroVehiculosAgregados, setNumeroVehiculosAgregados] = useState(0);
    const [idProducto, setIdProducto] = useState(0);
    const [codigoProducto, setcodigoProducto] = useState(0);
    const [editarProducto, setEditarProducto] = useState(false);
    const [duplicarProducto, setDuplicarProducto] = useState(false);
    const [borrarProducto, setBorrarProducto] = useState(false);
    const [arraySelectEdit, setArraySelectEdit] = useState([]);
    const [listadoCarrocerias, setListadoCarrocerias] = useState([]);
    const [listadoMarcas, setListadoMarcas] = useState([]);
    const [listadoModelos, setListadoModelos] = useState([]);
    const [listadoCilindrajes, setListadoCilindrajes] = useState([]);

    const [controlNuevo, setControlNuevo] = useState(false);
    const [controlAgregar, setControlAgregar] = useState(false);

    const [marcarItem, setMarcarItem] = useState(null);
    const [marcarItemDuplicar, setMarcarItemDuplicar] = useState(null);
    const [marcaNoExiste, setMarcaNoExiste] = useState(false);

    const [marcaCodigo, setMarcaCodigo] = useState(0);
    const [modeloCodigo, setModeloCodigo] = useState(0);
    const [cilindrajeCodigo, setCilindrajeCodigo] = useState(0);
    const [userLogged, setuserLogged] = useState(false);

    const [tituloVender, setTituloVender] = useState("Crear Producto");
    const [itemEditar, setitemEditar] = useState(null);
    const [openClose, setOpenClose] = useState(false);
    const [openCloseUbicarPrd, setOpenCloseUbicarPrd] = useState(false);
    const [openCloseInformacionPrd, setOpenCloseInformacionPrd] = useState(false);
    const [openCloseDatPublicaPrd, setOpenCloseDatPublicaPrd] = useState(false);

    const datosgenerales = useSelector(
        (state) => state.datosgenerales.datosgenerales
    );

    // Inicializamos el arrego de Tipos de Vehiculos
    const [vehiculos, setVehiculos] = useState(
        datosgenerales.vgl_tiposvehiculos
    );

    // Arreglo años de los Vehiculos
    const [annos, setAnnos] = useState([]);

    // Arreglo carrocerias de Vehiculos
    const datoscarrocerias = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_carroceriasvehiculos
    );

    const userlogged = useSelector((state) => state.userlogged.userlogged);
    const duplicarprd = useSelector((state) => state.duplicarprd.duplicarprd);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    useEffect(() => {
        if (datosusuarios.activo == 30) {
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Crear productos");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
        }

        //console.log("DATUSER : ", datosusuarios);
        if (datosusuarios.activo == 35) {
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Crear productos");
            setTextoControlAcceso(
                "Tu cuenta se encuentra suspendida, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            //router.push("/");
        }
    }, [datosusuarios]);

    console.log("marcaVehSelec : ", marcaVehSelec)

    useEffect(() => {
        dispatch(getResetInput(1));
        dispatch(getUserMenuPrimary(false));
        setuserLogged(userlogged.logged);
    }, [userlogged]);

    let editarprd = false;
    let itemeditar = false;

    if (typeof window !== "undefined") {
        if (router.query.editarprd == 1) {
            editarprd = true;
            itemeditar = router.query.itemeditar;
        } else {
            editarprd = false;
        }
    }

    //console.log("BOTON GENERICO : ", botonGenerico);

    useEffect(() => {
        let accion = JSON.parse(localStorage.getItem("accion"));
        if (accion == "editar" && editarprd) {
            setTituloVender("Editar Producto");
        } else if (accion == "duplicar") {
            setTituloVender("Duplicar Producto");
        } else setTituloVender("Crear Producto");

        if (duplicarprd == 2 && itemEditar) {
            let datosprducto = JSON.parse(localStorage.getItem("duplicarprd"));
            let vehproductos = JSON.parse(localStorage.getItem("vehproductos"));
            //console.log("VEH PROD : ", vehproductos);

            setTipoVeh(vehproductos[itemEditar].tipovehiculo);
            setTipoVehUno(vehproductos[itemEditar].tipovehiculo);
            setCarroceriaVehUno(vehproductos[itemEditar].carroceria);
            setMarcaVehUno(vehproductos[itemEditar].marca);
            setAnnoVehUno(vehproductos[itemEditar].anno);
            setModeloVehUno(vehproductos[itemEditar].modelo);
            setcilindrajeVehUno(vehproductos[itemEditar].cilindraje);
            settransmisionVehUno(vehproductos[itemEditar].transmision);
            setcombustibleVehUno(vehproductos[itemEditar].combustible);
            settraccionVehUno(vehproductos[itemEditar].traccion);
            setTipoVehSelec(vehproductos[itemEditar].selecttipo);
            setCarroceriaVehSelec(vehproductos[itemEditar].selectcarroceria);
            setMarcaVehSelec(vehproductos[itemEditar].selectmarca);
            setAnnoVehSelec(vehproductos[itemEditar].selectanno);
            setModeloVehSelec(vehproductos[itemEditar].selectmodelo);
            setCilindrajeVehSelec(vehproductos[itemEditar].selectcilindraje);
            setTransmisionVehSelec(vehproductos[itemEditar].selecttransmision);
            setCombustibleVehSelec(vehproductos[itemEditar].selectcombustible);
            setTraccionVehSelec(vehproductos[itemEditar].selecttraccion);

            let idvehcompduplicar = shortid();
            localStorage.setItem(
                "idvehcompduplicar",
                JSON.stringify(idvehcompduplicar)
            );
            setArrayVehiculosTemporal(vehproductos);
            handleChangeGenerico("No");
            mostrarVehiculos();
        } else
            if (duplicarprd == 2 && itemeditar == 2) {
                let datosprducto = JSON.parse(localStorage.getItem("duplicarprd"));
                let vehproductos = JSON.parse(localStorage.getItem("vehproductos"));
                //console.log("VEH PROD : ", vehproductos);

                setTipoVeh(vehproductos[0].tipovehiculo);
                setTipoVehUno(vehproductos[0].tipovehiculo);
                setCarroceriaVehUno(vehproductos[0].carroceria);
                setMarcaVehUno(vehproductos[0].marca);
                setAnnoVehUno(vehproductos[0].anno);
                setModeloVehUno(vehproductos[0].modelo);
                setcilindrajeVehUno(vehproductos[0].cilindraje);
                settransmisionVehUno(vehproductos[0].transmision);
                setcombustibleVehUno(vehproductos[0].combustible);
                settraccionVehUno(vehproductos[0].traccion);
                setTipoVehSelec(vehproductos[0].selecttipo);
                setCarroceriaVehSelec(vehproductos[0].selectcarroceria);
                setMarcaVehSelec(vehproductos[0].selectmarca);
                setAnnoVehSelec(vehproductos[0].selectanno);
                setModeloVehSelec(vehproductos[0].selectmodelo);
                setCilindrajeVehSelec(vehproductos[0].selectcilindraje);
                setTransmisionVehSelec(vehproductos[0].selecttransmision);
                setCombustibleVehSelec(vehproductos[0].selectcombustible);
                setTraccionVehSelec(vehproductos[0].selecttraccion);

                let idvehcompduplicar = shortid();
                localStorage.setItem(
                    "idvehcompduplicar",
                    JSON.stringify(idvehcompduplicar)
                );
                setArrayVehiculosTemporal(vehproductos);
                handleChangeGenerico("No");
                mostrarVehiculos();
            }
            else if (duplicarprd == 1) {
                let datosprducto = JSON.parse(localStorage.getItem("duplicarprd"));
                let vehproductos = JSON.parse(localStorage.getItem("vehproductos"));
                setArrayVehiculosTemporal(vehproductos);
                handleChangeGenerico("Si");
                //mostrarVehiculos();
            }
        //let tem = JSON.parse(localStorage.getItem("duplicarprd"));
        //console.log("DAT PRD AAAA : ", tem);
    }, [duplicarprd, itemEditar, itemeditar]);

    useEffect(() => {
        if (confirmarMensaje && tipo == 1) {
            router.push("/my-account");
        }
    }, [confirmarMensaje]);

    useEffect(() => {
        if (selectGenerico == 1) {
            setClassBtnGenerico("botongenericotres");
            setClassBtnOpenClose("showcerrarabrir");
        } else if (selectGenerico == 2) {
            setBotonGenerico("botongenericotres");
            setIconCerrarUno("showcerrarabrirselect");
        } else {
            setClassBtnGenerico("botongenerico");
            setBotonGenerico("botongenerico");
            setClassBtnOpenClose("showcerrarabrir");
            setIconCerrarUno("ml-40 showcerrarabrir");
        }

        setListMarcasVehiculos(datosgenerales.vgl_marcasvehiculos);
        setListCarroceriasVehiculos(datosgenerales.vgl_carroceriasvehiculos);
        setListModelosVehiculos(datosgenerales.vgl_modelosvehiculos);
        setListCilindrajesVehiculos(datosgenerales.vgl_cilindrajesvehiculos);
        setAnnos(datosgenerales.vgl_annosvehiculos);
        //setAnnos(JSON.parse(localStorage.getItem("datosannosvehiculos")));
        //setLoading(false)
    }, [selectGenerico]);

    useEffect(() => {
        const creaVehiculoTemporal = async () => {
            const params = {
                codigo: idVehiculosProducto,
            };

            //console.log("ID TEM : ", idVehiculosProducto);

            await axios({
                method: "post",
                url: "https://gimcloud.com.co/mrp/api/33",
                params,
            })
                .then((res) => {
                    if (duplicarprd == 0) setArrayVehiculosTemporal(res.data);

                    if (res.data.length > 0) {
                        if (arraySelectEdit.length > 0) {
                            let newDet = [];
                            datoscarrocerias &&
                                datoscarrocerias.forEach((row) => {
                                    if (
                                        Number.parseInt(row.tipovehiculo) ===
                                        Number.parseInt(
                                            arraySelectEdit[0].tipovehiculo
                                        )
                                    ) {
                                        let item = {
                                            id: row.id,
                                            carroceria: row.carroceria,
                                            tipoVeh: row.tipovehiculo,
                                            estado: row.estado,
                                            value: row.id,
                                            label: row.carroceria,
                                            text: row.carroceria,
                                        };
                                        newDet.push(item);
                                    }
                                });
                            setListadoCarrocerias(newDet);

                            if (
                                arraySelectEdit[0].marca > 299999 ||
                                arraySelectEdit[0].modelo > 299999 ||
                                arraySelectEdit[0].cilindraje > 299999
                            ) {
                                setMarcaNoExiste(true);
                            }

                            setTipoVeh(arraySelectEdit[0].tipovehiculo);
                            setTipoVehUno(arraySelectEdit[0].tipovehiculo);
                            setCarroceriaVehUno(arraySelectEdit[0].carroceria);
                            setMarcaVehUno(arraySelectEdit[0].marca);
                            setAnnoVehUno(arraySelectEdit[0].anno);
                            setModeloVehUno(arraySelectEdit[0].modelo);
                            setcilindrajeVehUno(arraySelectEdit[0].cilindraje);
                            settransmisionVehUno(
                                arraySelectEdit[0].transmision
                            );
                            setcombustibleVehUno(
                                arraySelectEdit[0].combustible
                            );
                            settraccionVehUno(arraySelectEdit[0].traccion);
                            setTipoVehSelec(arraySelectEdit[0].selecttipo);
                            setCarroceriaVehSelec(
                                arraySelectEdit[0].selectcarroceria
                            );
                            setMarcaVehSelec(arraySelectEdit[0].selectmarca);
                            setAnnoVehSelec(arraySelectEdit[0].selectanno);
                            setModeloVehSelec(arraySelectEdit[0].selectmodelo);
                            setCilindrajeVehSelec(
                                arraySelectEdit[0].selectcilindraje
                            );
                            setTransmisionVehSelec(
                                arraySelectEdit[0].selecttransmision
                            );
                            setCombustibleVehSelec(
                                arraySelectEdit[0].selectcombustible
                            );
                            setTraccionVehSelec(
                                arraySelectEdit[0].selecttraccion
                            );
                        } else if (arrayVehiculosTemporal.length > 0) {
                            let newDet = [];
                            datoscarrocerias &&
                                datoscarrocerias.forEach((row) => {
                                    if (
                                        Number.parseInt(row.tipovehiculo) ===
                                        Number.parseInt(
                                            arrayVehiculosTemporal[0]
                                                .tipovehiculo
                                        )
                                    ) {
                                        let item = {
                                            id: row.id,
                                            carroceria: row.carroceria,
                                            tipoVeh: row.tipovehiculo,
                                            estado: row.estado,
                                            value: row.id,
                                            label: row.carroceria,
                                            text: row.carroceria,
                                        };
                                        newDet.push(item);
                                    }
                                });
                            setListadoCarrocerias(newDet);

                            setTipoVeh(arrayVehiculosTemporal[0].tipovehiculo);
                            setTipoVehUno(
                                arrayVehiculosTemporal[0].tipovehiculo
                            );
                            setCarroceriaVehUno(
                                arrayVehiculosTemporal[0].carroceria
                            );
                            setMarcaVehUno(arrayVehiculosTemporal[0].marca);
                            setAnnoVehUno(arrayVehiculosTemporal[0].anno);
                            setModeloVehUno(arrayVehiculosTemporal[0].modelo);
                            setcilindrajeVehUno(
                                arrayVehiculosTemporal[0].cilindraje
                            );
                            settransmisionVehUno(
                                arrayVehiculosTemporal[0].transmision
                            );
                            setcombustibleVehUno(
                                arrayVehiculosTemporal[0].combustible
                            );
                            settraccionVehUno(
                                arrayVehiculosTemporal[0].traccion
                            );
                            setTipoVehSelec(
                                arrayVehiculosTemporal[0].selecttipo
                            );

                            setCarroceriaVehSelec(
                                arrayVehiculosTemporal[0].selectcarroceria
                            );
                            setMarcaVehSelec(arrayVehiculosTemporal[0].selectmarca);
                            setAnnoVehSelec(
                                arrayVehiculosTemporal[0].selectanno
                            );
                            setModeloVehSelec(
                                arrayVehiculosTemporal[0].selectmodelo
                            );
                            setCilindrajeVehSelec(
                                arrayVehiculosTemporal[0].selectcilindraje
                            );
                            setTransmisionVehSelec(
                                arrayVehiculosTemporal[0].selecttransmision
                            );
                            setCombustibleVehSelec(
                                arrayVehiculosTemporal[0].selectcombustible
                            );
                            setTraccionVehSelec(
                                arrayVehiculosTemporal[0].selecttraccion
                            );

                            if (
                                arraySelectEdit[0].marca > 299999 ||
                                arraySelectEdit[0].modelo > 299999 ||
                                arraySelectEdit[0].cilindraje > 299999
                            ) {
                                setMarcaNoExiste(true);
                            }
                        }
                        setNumeroVehiculosAgregados(res.data.length);
                    } else {
                        //setListadoCarrocerias(datoscarrocerias);
                        setNumeroVehiculosAgregados(0);
                    }
                    setBorrarProducto(false);
                })
                .catch(function (error) {
                    console.log("Lee Productos Temporal Error: ");

                    if (listadoCarrocerias.length > 0) {
                        let newDet = [];
                        datoscarrocerias &&
                            datoscarrocerias.forEach((row) => {
                                if (
                                    Number.parseInt(row.tipovehiculo) ===
                                    Number.parseInt(
                                        arrayVehiculosTemporal[0].tipovehiculo
                                    )
                                ) {
                                    let item = {
                                        id: row.id,
                                        carroceria: row.carroceria,
                                        tipoVeh: row.tipovehiculo,
                                        estado: row.estado,
                                        value: row.id,
                                        label: row.carroceria,
                                        text: row.carroceria,
                                    };
                                    newDet.push(item);
                                }
                            });
                        setListadoCarrocerias(newDet);
                        //console.log("ARRAY CAROCERIA : ", newDet);
                    }
                });
        };
        creaVehiculoTemporal();
    }, [
        idVehiculosProducto,
        vehiculoUnoCrear,
        editarProducto,
        duplicarProducto,
        borrarProducto,
    ]);

    useEffect(() => {
        if (selecCategoria == "No" && contador == 0) {
            let dato = [];
            localStorage.setItem("informacionproducto", JSON.stringify(dato));
            localStorage.setItem(
                "datospublicacionproducto",
                JSON.stringify(dato)
            );
        }
    }, []);

    const productogenerico = [
        {
            label: "Seleccione tipo de producto",
            value: "",
        },
        {
            label: labelGenericoUno,
            value: genericoUno,
        },
        {
            label: labelGenericoDos,
            value: genericoDos,
        },
    ];

    useEffect(() => {
        if (agregarDatos) {
            if (duplicarprd == 0) setVehiculoUno(true);
        }
    }, [agregarDatos]);

    const datosCrearProducto = () => {
        //console.log("CONTADOR : ", contador);
        let nombre = " Un ";
    };

    const habilitarBotonTipo = () => {
        if (!userlogged.logged) {

            localStorage.setItem("ira", JSON.stringify(13));
            localStorage.setItem("rutaira", JSON.stringify(router.pathname));

            setShowModalMensajesVender(true);
            setTituloMensajesVender(
                "Para crear productos en Mercado Repuesto, tienes que estar registrado..."
            );
            setTextoMensajesVender(
                "Para crear productos en Mercado Repuesto, tienes que estar registrado..."
            );
            return;
        }

        setBotonGenerico("botongenerico");
        setIconCerrarUno("showcerrarabrir");
        setSelectGenerico(2);
        let idveh = shortid();
        setIdvehiculosProducto(idveh);

        if (
            duplicarProducto ||
            editarProducto ||
            vehiculoUno ||
            showModalLatoneria
        ) {
            location.reload();
        }

        setbotonCrearVehiculo(true);
        setSelecCategoria("No");
        handleChangeGenerico("No");
        setShowDatosProductos(false);
    };

    const handleChangeGenerico = (selectedOptions) => {
        if (!userlogged.logged) {
            setShowModalMensajesVender(true);
            setTituloMensajesVender(
                "Para crear productos en Mercado Repuesto, tienes que estar registrado..."
            );
            setTextoMensajesVender(
                "Para crear productos en Mercado Repuesto, tienes que estar registrado..."
            );
            return;
        }

        let accion = JSON.parse(localStorage.getItem("accion"));
        if (accion == "noaplica") {
            setArrayVehiculosTemporal([]);
            setmostrarVehAgregados(false);
        } else setmostrarVehAgregados(true);

        setClassBtnGenerico("botongenericotres");
        setClassBtnOpenClose("showcerrarabrir");
        setSelectGenerico(1);

        setAbrirCerrarCategoriasGenerico(true);
        if (selectedOptions == "No") {
            setCompatibilidad(2);
        } else if (selectedOptions == "Si") {
            setCompatibilidad(1);
        }

        if (selectedOptions === "Si") {
            setAgregarDatos(false);
            setAgregarVehiculo(false);
            setSelecCategoria("Si");
            const newDetUno = [];
            const newDetDos = [];
            let itemUno = {
                tipoVehUno: 0,
                marcaVehUno: 0,
                annoVehUno: 0,
                modeloVehUno: 0,
                cilindrajeVehUno: 0,
                carroceriaVehUno: 0,
                transmisionVehUno: 0,
                combustibleVehUno: 0,
                traccionVehUno: 0,
            };
            newDetUno.push(itemUno);

            localStorage.setItem(
                "vehiculoscompatibles",
                JSON.stringify(newDetUno)
            );

            let itemDos = {
                ubicacionProducto: 0,
                posicionProducto: 0,
            };
            newDetDos.push(itemDos);
            //setSistemaMotorSeleccionado(1);
            localStorage.setItem(
                "ubicacionposicionproducto",
                JSON.stringify(newDetDos)
            );
        }

        let control = contador + 1;
        if (control === 1) {
            setContador(control);

            if (control === 1) {
                setVehiculoUnoCrear(true);
                if (duplicarprd == 0) setVehiculoUno(true);
            }
        }
        setGenerico(selectedOptions);
        setMostrarDatosVehiculos(true);
    };

    const agregarDatosVehiculos = () => {
        if (!userlogged.logged) {
            setShowModalMensajesVender(true);
            setTituloMensajesVender(
                "Para crear productos en Mercado Repuesto, tienes que estar registrado..."
            );
            setTextoMensajesVender(
                "Para crear productos en Mercado Repuesto, tienes que estar registrado..."
            );
            return;
        }

        if (editarProducto || duplicarProducto) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Heey, no puedes agregar vehículo!");
            return;
        } else if (vehiculoUno && controlAgregar) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Heey, estas en agregar vehículo");
            return;
        } else if (numeroVehiculosAgregados < 10) {
            setVehiculoUnoCrear(true);
            setControlAgregar(true);
            setControlNuevo(false);
            setNuevoVehiculo(false);
            setVehiculoUno(true);
        } else {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Número de vehículos no puede ser mayor a 10!");
            return;
        }
    };

    const crearVehiculos = () => {
        if (editarProducto || duplicarProducto) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Heey, no puedes crear vehículo");
            return;
        } else if (vehiculoUno && controlNuevo) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Heey, estas en crear nuevo vehículo");
            return;
        } else if (numeroVehiculosAgregados < 10) {
            setVehiculoUnoCrear(true);
            setControlAgregar(false);
            setControlNuevo(true);
            setNuevoVehiculo(true);
            setVehiculoUno(true);
            setDescripcionNuevoVehiculo(
                "¿Su producto es genérico? - Estas creando un nuevo vehículo"
            );
        } else {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Número de vehículos no puede ser mayor a 10!");
            return;
        }
    };

    //console.log("VEHPRODCDD : ", arrayVehiculosTemporal);

    useEffect(() => {
        let vehproductos = JSON.parse(localStorage.getItem("vehproductos"));
        if (vehproductos.length > 0 && arrayVehiculosTemporal.length > 0) {
            localStorage.setItem("vehproductos", JSON.stringify(arrayVehiculosTemporal));
        }
    }, [arrayVehiculosTemporal])

    const agregarDatosLatoneria = () => {
        if (duplicarProducto || editarProducto || vehiculoUno) {
            setShowModalMensajes(true);
            setTituloMensajes("Vehículos compatibles");
            setTextoMensajes(
                "Para continuar debes cerrar todos los formularios de vehículos compatibles."
            );
            return;
        }

        if (duplicarprd == 2) {
            let idvehcompduplicar = JSON.parse(
                localStorage.getItem("idvehcompduplicar")
            );
            //setArrayVehiculosTemporal(vehproductos);
            arrayVehiculosTemporal &&
                arrayVehiculosTemporal.map((items) => {
                    //console.log("VEH TEMP : ", arrayVehiculosTemporal);
                    //return

                    const params = {
                        id: idvehcompduplicar,
                        idtipoproducto: idvehcompduplicar,
                        tipovehiculo: items.tipovehiculo,
                        carroceria: items.carroceria,
                        marca: items.marca,
                        anno: items.anno,
                        modelo: items.modelo,
                        cilindraje: items.cilindraje,
                        transmision: items.transmision,
                        combustible: items.combustible,
                        traccion: items.traccion,
                        selecttipo: items.selecttipo,
                        selectcarroceria: items.selectcarroceria,
                        selectmarca: items.selecttipo,
                        selectanno: items.selectmarca,
                        selectmodelo: items.selectmodelo,
                        selectcilindraje: items.selectcilindraje,
                        selecttransmision: items.selecttransmision,
                        selectcombustible: items.selectcombustible,
                        selecttraccion: items.selecttraccion,
                        estado: items.estado,
                        comparar: items.comparar,
                        fecha: items.fecha,
                    };

                    const grabarVehTemp = async () => {
                        await axios({
                            method: "post",
                            url: "https://gimcloud.com.co/mrp/api/32",
                            params,
                        })
                            .then((res) => {
                                console.log("Producto Temporal OK: ", res.data);
                            })
                            .catch(function (error) {
                                console.log(
                                    "Producto Temporal Error: ",
                                    res.data
                                );
                            });
                    };
                    grabarVehTemp();

                    //console.log("VEH DUPLICAR : ", params);
                });
        }

        setShowIconoCerrarAbrir(true);
        setAgregarVehiculo(false);
        setbotonCrearVehiculo(false);

        setActivaDuplicar(true);

        //setCerrarDatos("");
        setCerrarDatosDos("mt-1 datoscerrados");
        setIconCerrarUno("showcerrarabrir");
        setIconCerrarDos("form-control ps-form__input ml-20");
        setGenericoUno("Si");
        setLabelGenericoUno("Es genérico, sirve para varios vehículos.");
        setGenericoDos("No");
        setLabelGenericoDos("No es genérico, sirve para varios vehículos.");
        setBotonGenerico("botongenerico");
        setIconCerrarUno("showcerrarabrir");
        setMostrar(true);
        setmostrarVehAgregados(false);
        setShowModalLatoneria(true);
        setAbrioLatoneria(true);
        setShowModalLatoneriaActiva(true);
    };

    const agregarDatosGenerico = () => {
        let accion = JSON.parse(localStorage.getItem("accion"));
        if (accion == "noaplica") {
            setArrayVehiculosTemporal([]);
            setmostrarVehAgregados(false);
        } else setmostrarVehAgregados(true);

        setGenerico("No");
        setVehiculoUno(false);
        setContador(0);
        setCompatibilidad(null);
        setAgregarVehiculo(false);
        setShowModalLatoneria(false);
        setShowModalLatoneriaActiva(false);
    };

    const mostrarVehiculos = () => {
        setmostrarVehAgregados(true);
        setBotonGenerico("botongenericotres");
        setAgregarVehiculo(true);
        setShowIconoCerrarAbrir(false);
        setShowModalLatoneria(true);
        setAbrioLatoneria(true);
        //alert(openCloseUbicarPrd)
        //alert(openCloseInformacionPrd)
        //alert(openCloseDatPublicaPrd);
        //setOpenClose(!openClose);

        setCerrarDatos(
            "ps-form__group cajavehiculoscompatiblesproducto colorbase"
        );
        setCerrarDatosDos(
            "custom-selectcreateproducto redondearbordegenerico colorbase"
        );

        setIconCerrarUno(
            "form-control ps-form__input textoeditardatosvehiculo colorbase"
        );
        setIconCerrarDos("form-control ps-form__input");

        setGenericoUno("Si");
        setLabelGenericoUno(
            "Si - Es compatible con diferentes marcas y modelos del vehículos."
        );
        setGenericoDos("No");
        setLabelGenericoDos(
            "No - NO es compatible con varias marcas y modelos de vehículos."
        );

        setBotonGenerico("botongenericotres");
        setMostrar(false);
    };

    const ingresarDatosProductos = () => {
        setShowDatosProductos(true);
        setSelecDatosProducto(true);
        setShowModalDatosProducto(true);
    };

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    const crearPrdCompa = () => {
        let vehproductos = JSON.parse(
            localStorage.getItem("vehproductos")
        );

        const ubiposprod = JSON.parse(
            localStorage.getItem("ubicacionposicionproducto"))

        const datpubli = JSON.parse(
            localStorage.getItem("datospublicacionproducto")
        );

        const infoprod = JSON.parse(
            localStorage.getItem("informacionproducto")
        );

        vehproductos &&
            vehproductos.map((veh) => {
                let params = {
                    idproductovehiculo: "XXYYUU9000",
                    productogenerico: "No",
                    tipovehiculo: veh.tipovehiculo,
                    carroceria: veh.carroceria,
                    marca: veh.marca,
                    anno: veh.anno,
                    modelo: veh.modelo,
                    cilindraje: veh.cilindraje,
                    combustible: veh.combustible,
                    transmision: veh.transmision,
                    traccion: veh.traccion,
                    partedelvehiculo: ubiposprod[0].ubicacionProducto,
                    posicionproducto: ubiposprod[0].posicionProducto,
                    titulonombre: infoprod[0].titulonombre,
                    marcarepuesto: infoprod[0].marcarepuesto,
                    condicion: infoprod[0].condicion,
                    estadoproducto: infoprod[0].estadoproducto,
                    numerodeunidades: datpubli[0].numerodeunidades,
                    precio: 0,  //valorproducto,
                    numerodeparte: infoprod[0].numerodeparte,
                    compatible: 0, //idvehiculoscompatible,
                    descripcionproducto: datpubli[0].descripcionproducto,
                    vendeporpartes: infoprod[0].vendeporpartes,
                };

                console.log("PRDCOMP : ", params)

                const grabaVehCompatibles = async () => {
                    await axios({
                        method: "post",
                        url: URL_BD_MR + "36", params
                    })
                        .then((res) => {
                            console.log("DAT RES: ", res);
                            console.log("DAT YYY: ", res.data);
                        })
                        .catch(function (error) {
                            console.log(
                                "Error leyendo productos termporales"
                            );
                        });
                };
                grabaVehCompatibles();
            });
    }

    return (
        <Container title="Mi Cuenta">
            <ModalControlAcceso
                shown={showModalControlAcceso}
                close={setShowModalControlAcceso}
                titulo={tituloControlAcceso}
                mensaje={textoControlAcceso}
                tipo="1"
            />
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <ModalMensajesConfirmar
                shown={showModalMensajesConfirmar}
                close={setShowModalMensajesConfirmar}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                setconfirmarMensaje={setconfirmarMensaje}
                setTipo={setTipo}
            />
            <ModalMensajesVender
                shown={showModalMensajesVender}
                close={setShowModalMensajesVender}
                titulo={tituloMensajesVender}
                mensaje={textoMensajesVender}
                setVender={0}
                setTengoCuenta={0}
                tipo="1"
            />

            <div className="tamañospinner">{loading ? <Loading /> : null}</div>

            {/* <div className="ps-page ps-page--inner ml-250">  */}
            <div ref={irA}>
                <div className="ml-35 mt-40">
                    <div className="container">
                        <Row className="mt-10">
                            <Col xl={2} lg={2} md={2} xs={2}>
                                <h2 className="titulocrearproducto">
                                    {tituloVender}
                                </h2>
                            </Col>

                            <Col xl={9} lg={9} md={9} xs={9}>
                                <div className="cajaadvertenciavehiculoscompatiblesproducto">
                                    <i
                                        className="ml-710 fa iconoadvertenciacrearproducto fa-exclamation-triangle"
                                        aria-hidden="true"></i>
                                    <h4 className="ml-2 tituloadvertenciaproductos mtmenos30">
                                        Antes de empezar, debes saber que!
                                    </h4>

                                    <br />
                                    <h4 className="ml-2 textoadvertenciaproductos">
                                        Para poder publicar un producto debes:
                                        <br />
                                        Agregar al menos una foto.
                                        <br />
                                        Completar tus datos personales. *Si eres
                                        persona jurídica debes subir los
                                        documentos requeridos (Certificado de
                                        Cámara de comercio, RUT, Cedula de
                                        ciudadanía Representante legal).
                                    </h4>
                                </div>
                            </Col>
                        </Row>
                        <div className="ps-page__header"></div>
                        <div className={pageAcount}>
                            <div className="row">
                                <div className={tamaño}>
                                    {showCreateProduct ? (
                                        <div>
                                            <div className={cerrarDatos}>
                                                {generico === "No" ? (
                                                    <div className="ml-13 mb-4">
                                                        <br />
                                                        <br />
                                                        <h4 className="tituloadvertenciaproductos mtmenos30">
                                                            Identificación de
                                                            los vehículos
                                                            compatibles
                                                        </h4>
                                                        <br />
                                                        <h4 className="tamañotextotoken">
                                                            {
                                                                descripcionNuevoVehiculo
                                                            }
                                                        </h4>
                                                        <Row>
                                                            {!compatibilidad ||
                                                                compatibilidad ==
                                                                1 ? (
                                                                <Row>
                                                                    <div>
                                                                        <Col
                                                                            xl={
                                                                                10
                                                                            }
                                                                            lg={
                                                                                10
                                                                            }
                                                                            md={
                                                                                10
                                                                            }
                                                                            xs={
                                                                                10
                                                                            }>
                                                                            <div
                                                                                disabled={
                                                                                    mostrar
                                                                                }
                                                                                className={
                                                                                    classBtnGenerico
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    handleChangeGenerico(
                                                                                        "Si"
                                                                                    )
                                                                                }>
                                                                                {
                                                                                    labelGenericoUno
                                                                                }
                                                                            </div>
                                                                        </Col>
                                                                    </div>

                                                                    {showIconoCerrarAbrir ? (
                                                                        <Col
                                                                            xl={
                                                                                1
                                                                            }
                                                                            lg={
                                                                                1
                                                                            }
                                                                            md={
                                                                                1
                                                                            }
                                                                            xs={
                                                                                1
                                                                            }
                                                                            className="mlmenos80">
                                                                            <div
                                                                                className={
                                                                                    iconoCerrarUno
                                                                                }>
                                                                                <i
                                                                                    onClick={() =>
                                                                                        mostrarVehiculos()
                                                                                    }
                                                                                    className="colortextoselect mt-1 fa fa-angle-down d-flex justify-content-center"
                                                                                    aria-hidden="true"
                                                                                    ref={
                                                                                        targetshow
                                                                                    }
                                                                                    onMouseOver={() =>
                                                                                        setShowEdit(
                                                                                            true
                                                                                        )
                                                                                    }
                                                                                    onMouseOut={() =>
                                                                                        setShowEdit(
                                                                                            false
                                                                                        )
                                                                                    }></i>
                                                                            </div>
                                                                        </Col>
                                                                    ) : (
                                                                        <div className="mlmenos42">
                                                                            <Col
                                                                                xl={
                                                                                    1
                                                                                }
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                md={
                                                                                    1
                                                                                }
                                                                                xs={
                                                                                    1
                                                                                }>
                                                                                <div className="cajaiconoinfomaterial apuntador">
                                                                                    <div className="fondodivselecciontipoproducto">
                                                                                        <InfoIcon
                                                                                            onClick={() => {
                                                                                                setShowModalGenerico(
                                                                                                    !showModalGenerico
                                                                                                );
                                                                                            }}
                                                                                            style={{
                                                                                                fontSize: 30,
                                                                                            }}
                                                                                            className="iconoinfomaterial"></InfoIcon>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        </div>
                                                                    )}
                                                                </Row>
                                                            ) : null}

                                                            {!compatibilidad ||
                                                                compatibilidad ==
                                                                2 ? (
                                                                <div>
                                                                    <Row>
                                                                        <Col
                                                                            xl={
                                                                                10
                                                                            }
                                                                            lg={
                                                                                10
                                                                            }
                                                                            md={
                                                                                10
                                                                            }
                                                                            xs={
                                                                                10
                                                                            }>
                                                                            <div
                                                                                disabled={
                                                                                    mostrar
                                                                                }
                                                                                className={
                                                                                    botonGenerico
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    habilitarBotonTipo()
                                                                                }>
                                                                                {
                                                                                    labelGenericoDos
                                                                                }
                                                                            </div>
                                                                        </Col>

                                                                        {showIconoCerrarAbrir ? (
                                                                            <Col
                                                                                xl={
                                                                                    1
                                                                                }
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                md={
                                                                                    1
                                                                                }
                                                                                xs={
                                                                                    1
                                                                                }
                                                                                className="mt-6 mlmenos78 apuntador">
                                                                                <div
                                                                                    className={
                                                                                        iconoCerrarUno
                                                                                    }>
                                                                                    <i
                                                                                        onClick={() =>
                                                                                            mostrarVehiculos()
                                                                                        }
                                                                                        className="colortextoselect mt-1 fa fa-angle-down d-flex justify-content-center"
                                                                                        aria-hidden="true"
                                                                                        ref={
                                                                                            targetshow
                                                                                        }
                                                                                        onMouseOver={() =>
                                                                                            setShowEdit(
                                                                                                true
                                                                                            )
                                                                                        }
                                                                                        onMouseOut={() =>
                                                                                            setShowEdit(
                                                                                                false
                                                                                            )
                                                                                        }></i>
                                                                                </div>
                                                                                <Overlay
                                                                                    onClick={() => setOpenClose(!openClose)}
                                                                                    className=""
                                                                                    target={
                                                                                        targetshow.current
                                                                                    }
                                                                                    show={
                                                                                        showEdit
                                                                                    }
                                                                                    placement="top">
                                                                                    {(
                                                                                        props
                                                                                    ) => (
                                                                                        <Tooltip
                                                                                            id="overlay-example"
                                                                                            {...props}>
                                                                                            <div className="textotooltiptipoprd">
                                                                                                {" "}
                                                                                                Mostrar
                                                                                                Vehículos{" "}
                                                                                            </div>
                                                                                        </Tooltip>
                                                                                    )}
                                                                                </Overlay>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                xl={
                                                                                    1
                                                                                }
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                md={
                                                                                    1
                                                                                }
                                                                                xs={
                                                                                    1
                                                                                }>
                                                                                <div className="cajaiconoinfomaterialdos apuntador">
                                                                                    <div className="fondodivselecciontipoproducto">
                                                                                        <InfoIcon
                                                                                            onClick={() => {
                                                                                                setShowModalGenerico(
                                                                                                    !showModalGenerico
                                                                                                );
                                                                                            }}
                                                                                            style={{
                                                                                                fontSize: 30,
                                                                                            }}
                                                                                            className="iconoinfomaterial"></InfoIcon>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        )}
                                                                    </Row>
                                                                </div>
                                                            ) : null}
                                                        </Row>
                                                    </div>
                                                ) : null}

                                                {generico ? (
                                                    generico === "No" ? (
                                                        <div className="mtmenos4">
                                                            <div>
                                                                {arrayVehiculosTemporal.length &&
                                                                    mostrarVehAgregados >
                                                                    0 ? (
                                                                    <MostrarVehiculos
                                                                        arrayVehiculosTemporal={
                                                                            arrayVehiculosTemporal
                                                                        }
                                                                        setArrayVehiculosTemporal={
                                                                            setArrayVehiculosTemporal
                                                                        }
                                                                        setIdProducto={
                                                                            setIdProducto
                                                                        }
                                                                        setcodigoProducto={
                                                                            setcodigoProducto
                                                                        }
                                                                        setEditarProducto={
                                                                            setEditarProducto
                                                                        }
                                                                        editarProducto={
                                                                            editarProducto
                                                                        }
                                                                        setVehiculoUno={
                                                                            setVehiculoUno
                                                                        }
                                                                        setArraySelectEdit={
                                                                            setArraySelectEdit
                                                                        }
                                                                        setListadoCarrocerias={
                                                                            setListadoCarrocerias
                                                                        }
                                                                        setListadoMarcas={
                                                                            setListadoMarcas
                                                                        }
                                                                        setListadoModelos={
                                                                            setListadoModelos
                                                                        }
                                                                        setListadoCilindrajes={
                                                                            setListadoCilindrajes
                                                                        }
                                                                        setDuplicarProducto={
                                                                            setDuplicarProducto
                                                                        }
                                                                        duplicarProducto={
                                                                            duplicarProducto
                                                                        }
                                                                        numeroVehiculosAgregados={
                                                                            arrayVehiculosTemporal.length
                                                                        }
                                                                        setBorrarProducto={
                                                                            setBorrarProducto
                                                                        }
                                                                        marcarItem={
                                                                            marcarItem
                                                                        }
                                                                        setMarcarItem={
                                                                            setMarcarItem
                                                                        }
                                                                        marcarItemDuplicar={
                                                                            marcarItemDuplicar
                                                                        }
                                                                        setMarcarItemDuplicar={
                                                                            setMarcarItemDuplicar
                                                                        }
                                                                        setMarcaCodigo={
                                                                            setMarcaCodigo
                                                                        }
                                                                        setModeloCodigo={
                                                                            setModeloCodigo
                                                                        }
                                                                        setCilindrajeCodigo={
                                                                            setCilindrajeCodigo
                                                                        }
                                                                        vehiculoUno={
                                                                            vehiculoUno
                                                                        }
                                                                        controlNuevo={
                                                                            controlNuevo
                                                                        }
                                                                        abrioLatoneria={
                                                                            abrioLatoneria
                                                                        }
                                                                        itemEditar={itemEditar}
                                                                        setitemEditar={setitemEditar}
                                                                    />
                                                                ) : null}
                                                            </div>

                                                            {
                                                                <div>
                                                                    {vehiculoUno ? (
                                                                        <DatosVehiculos
                                                                            vehiculoUnoCrear={
                                                                                vehiculoUnoCrear
                                                                            }
                                                                            setVehiculoUnoCrear={
                                                                                setVehiculoUnoCrear
                                                                            }
                                                                            vehiculoUnoSelecc={
                                                                                vehiculoUnoSelecc
                                                                            }
                                                                            setVehiculoUnoSelecc={
                                                                                setVehiculoUnoSelecc
                                                                            }
                                                                            vehiculoUnoEditar={
                                                                                vehiculoUnoEditar
                                                                            }
                                                                            setVehiculoUnoEditar={
                                                                                setVehiculoUnoEditar
                                                                            }
                                                                            vehiculoUnoDuplicar={
                                                                                vehiculoUnoDuplicar
                                                                            }
                                                                            setVehiculoUnoDuplicar={
                                                                                setVehiculoUnoDuplicar
                                                                            }
                                                                            agregarVehiculo={
                                                                                agregarVehiculo
                                                                            }
                                                                            setAgregarVehiculo={
                                                                                setAgregarVehiculo
                                                                            }
                                                                            setAgregarDatos={
                                                                                setAgregarDatos
                                                                            }
                                                                            agregarDatos={
                                                                                agregarDatos
                                                                            }
                                                                            setEliminoDatos={
                                                                                setEliminoDatos
                                                                            }
                                                                            eliminoDatos={
                                                                                eliminoDatos
                                                                            }
                                                                            setDuplicar={
                                                                                setDuplicar
                                                                            }
                                                                            duplicar={
                                                                                duplicar
                                                                            }
                                                                            vehiculoUnoUbicar={
                                                                                vehiculoUnoUbicar
                                                                            }
                                                                            setVehiculoUnoUbicar={
                                                                                setVehiculoUnoUbicar
                                                                            }
                                                                            setTipoVehUno={
                                                                                setTipoVehUno
                                                                            }
                                                                            setMarcaVehUno={
                                                                                setMarcaVehUno
                                                                            }
                                                                            setAnnoVehUno={
                                                                                setAnnoVehUno
                                                                            }
                                                                            setModeloVehUno={
                                                                                setModeloVehUno
                                                                            }
                                                                            setCarroceriaVehUno={
                                                                                setCarroceriaVehUno
                                                                            }
                                                                            setcilindrajeVehUno={
                                                                                setcilindrajeVehUno
                                                                            }
                                                                            settransmisionVehUno={
                                                                                settransmisionVehUno
                                                                            }
                                                                            setcombustibleVehUno={
                                                                                setcombustibleVehUno
                                                                            }
                                                                            settraccionVehUno={
                                                                                settraccionVehUno
                                                                            }
                                                                            tipoVehUno={
                                                                                tipoVehUno
                                                                            }
                                                                            showTraccion={
                                                                                showTraccion
                                                                            }
                                                                            setShowTraccion={
                                                                                setShowTraccion
                                                                            }
                                                                            showTransmision={
                                                                                showTransmision
                                                                            }
                                                                            setShowTransmision={
                                                                                setShowTransmision
                                                                            }
                                                                            controlAgregarVehiculo={
                                                                                controlAgregarVehiculo
                                                                            }
                                                                            setControlAgregarVehiculo={
                                                                                setControlAgregarVehiculo
                                                                            }
                                                                            vehiculosSeleccionados={
                                                                                vehiculosSeleccionados
                                                                            }
                                                                            setVehiculosSeleccionados={
                                                                                setVehiculosSeleccionados
                                                                            }
                                                                            vehiculoBorrar={
                                                                                vehiculoBorrar
                                                                            }
                                                                            setVehiculoBorrar={
                                                                                setVehiculoBorrar
                                                                            }
                                                                            controlAccion={
                                                                                controlAccion
                                                                            }
                                                                            setControlAccion={
                                                                                setControlAccion
                                                                            }
                                                                            contador={
                                                                                contador
                                                                            }
                                                                            setContador={
                                                                                setContador
                                                                            }
                                                                            controlDuplicar={
                                                                                controlDuplicar
                                                                            }
                                                                            setControlDuplicar={
                                                                                setControlDuplicar
                                                                            }
                                                                            dataannos={
                                                                                annos
                                                                            }
                                                                            settipoVehiculoSeleccionado={
                                                                                settipoVehiculoSeleccionado
                                                                            }
                                                                            tipoVehiculoSeleccionado={
                                                                                tipoVehiculoSeleccionado
                                                                            }
                                                                            marcaVehUno={
                                                                                marcaVehUno
                                                                            }
                                                                            annoVehUno={
                                                                                annoVehUno
                                                                            }
                                                                            modeloVehUno={
                                                                                modeloVehUno
                                                                            }
                                                                            carroceriaVehUno={
                                                                                carroceriaVehUno
                                                                            }
                                                                            cilindrajeVehUno={
                                                                                cilindrajeVehUno
                                                                            }
                                                                            transmisionVehUno={
                                                                                transmisionVehUno
                                                                            }
                                                                            combustibleVehUno={
                                                                                combustibleVehUno
                                                                            }
                                                                            traccionVehUno={
                                                                                traccionVehUno
                                                                            }
                                                                            nuevoVehiculo={
                                                                                nuevoVehiculo
                                                                            }
                                                                            setNuevoVehiculo={
                                                                                setNuevoVehiculo
                                                                            }
                                                                            idVehiculosProducto={
                                                                                idVehiculosProducto
                                                                            }
                                                                            arrayVehiculosTemporal={
                                                                                arrayVehiculosTemporal
                                                                            }
                                                                            setArrayVehiculosTemporal={
                                                                                setArrayVehiculosTemporal
                                                                            }
                                                                            setTipoVeh={
                                                                                setTipoVeh
                                                                            }
                                                                            tipoVeh={
                                                                                tipoVeh
                                                                            }
                                                                            numeroVehiculosAgregados={
                                                                                arrayVehiculosTemporal.length
                                                                            }
                                                                            setVehiculoUno={
                                                                                setVehiculoUno
                                                                            }
                                                                            setListadoCarrocerias={
                                                                                setListadoCarrocerias
                                                                            }
                                                                            listadoCarrocerias={
                                                                                listadoCarrocerias
                                                                            }
                                                                            tipoVehSelec={
                                                                                tipoVehSelec
                                                                            }
                                                                            vehiculos={
                                                                                vehiculos
                                                                            }
                                                                        />
                                                                    ) : editarProducto ? (
                                                                        <EditarVehiculos
                                                                            setTipoVehUno={
                                                                                setTipoVehUno
                                                                            }
                                                                            setCarroceriaVehUno={
                                                                                setCarroceriaVehUno
                                                                            }
                                                                            setMarcaVehUno={
                                                                                setMarcaVehUno
                                                                            }
                                                                            setAnnoVehUno={
                                                                                setAnnoVehUno
                                                                            }
                                                                            setModeloVehUno={
                                                                                setModeloVehUno
                                                                            }
                                                                            setcilindrajeVehUno={
                                                                                setcilindrajeVehUno
                                                                            }
                                                                            settransmisionVehUno={
                                                                                settransmisionVehUno
                                                                            }
                                                                            setcombustibleVehUno={
                                                                                setcombustibleVehUno
                                                                            }
                                                                            settraccionVehUno={
                                                                                settraccionVehUno
                                                                            }
                                                                            tipoVehUno={
                                                                                tipoVehUno
                                                                            }
                                                                            carroceriaVehUno={
                                                                                carroceriaVehUno
                                                                            }
                                                                            marcaVehUno={
                                                                                marcaVehUno
                                                                            }
                                                                            annoVehUno={
                                                                                annoVehUno
                                                                            }
                                                                            modeloVehUno={
                                                                                modeloVehUno
                                                                            }
                                                                            cilindrajeVehUno={
                                                                                cilindrajeVehUno
                                                                            }
                                                                            transmisionVehUno={
                                                                                transmisionVehUno
                                                                            }
                                                                            combustibleVehUno={
                                                                                combustibleVehUno
                                                                            }
                                                                            traccionVehUno={
                                                                                traccionVehUno
                                                                            }
                                                                            setTipoVehSelec={
                                                                                setTipoVehSelec
                                                                            }
                                                                            setCarroceriaVehSelec={
                                                                                setCarroceriaVehSelec
                                                                            }
                                                                            setMarcaVehSelec={
                                                                                setMarcaVehSelec
                                                                            }
                                                                            setAnnoVehSelec={
                                                                                setAnnoVehSelec
                                                                            }
                                                                            setModeloVehSelec={
                                                                                setModeloVehSelec
                                                                            }
                                                                            setCilindrajeVehSelec={
                                                                                setCilindrajeVehSelec
                                                                            }
                                                                            setTransmisionVehSelec={
                                                                                setTransmisionVehSelec
                                                                            }
                                                                            setCombustibleVehSelec={
                                                                                setCombustibleVehSelec
                                                                            }
                                                                            setTraccionVehSelec={
                                                                                setTraccionVehSelec
                                                                            }
                                                                            tipoVehSelec={
                                                                                tipoVehSelec
                                                                            }
                                                                            carroceriaVehSelec={
                                                                                carroceriaVehSelec
                                                                            }
                                                                            marcaVehSelec={
                                                                                marcaVehSelec
                                                                            }
                                                                            annoVehSelec={
                                                                                annoVehSelec
                                                                            }
                                                                            modeloVehSelec={
                                                                                modeloVehSelec
                                                                            }
                                                                            cilindrajeVehSelec={
                                                                                cilindrajeVehSelec
                                                                            }
                                                                            transmisionVehSelec={
                                                                                transmisionVehSelec
                                                                            }
                                                                            combustibleVehSelec={
                                                                                combustibleVehSelec
                                                                            }
                                                                            traccionVehSelec={
                                                                                traccionVehSelec
                                                                            }
                                                                            vehiculoUnoEditar={
                                                                                vehiculoUnoEditar
                                                                            }
                                                                            setVehiculoUnoEditar={
                                                                                setVehiculoUnoEditar
                                                                            }
                                                                            setAgregarVehiculo={
                                                                                setAgregarVehiculo
                                                                            }
                                                                            vehiculoUnoUbicar={
                                                                                vehiculoUnoUbicar
                                                                            }
                                                                            showTraccion={
                                                                                showTraccion
                                                                            }
                                                                            setShowTraccion={
                                                                                setShowTraccion
                                                                            }
                                                                            showTransmision={
                                                                                showTransmision
                                                                            }
                                                                            setShowTransmision={
                                                                                setShowTransmision
                                                                            }
                                                                            setControlAgregarVehiculo={
                                                                                setControlAgregarVehiculo
                                                                            }
                                                                            nuevoVehiculo={
                                                                                nuevoVehiculo
                                                                            }
                                                                            setNuevoVehiculo={
                                                                                setNuevoVehiculo
                                                                            }
                                                                            idVehiculosProducto={
                                                                                idVehiculosProducto
                                                                            }
                                                                            arrayVehiculosTemporal={
                                                                                arrayVehiculosTemporal
                                                                            }
                                                                            setArrayVehiculosTemporal={
                                                                                setArrayVehiculosTemporal
                                                                            }
                                                                            setTipoVeh={
                                                                                setTipoVeh
                                                                            }
                                                                            tipoVeh={
                                                                                tipoVeh
                                                                            }
                                                                            arraySelectEdit={
                                                                                arraySelectEdit
                                                                            }
                                                                            setEditarProducto={
                                                                                setEditarProducto
                                                                            }
                                                                            listadoCarrocerias={
                                                                                listadoCarrocerias
                                                                            }
                                                                            listadoMarcas={
                                                                                listadoMarcas
                                                                            }
                                                                            listadoModelos={
                                                                                listadoModelos
                                                                            }
                                                                            listadoCilindrajes={
                                                                                listadoCilindrajes
                                                                            }
                                                                            marcarItem={
                                                                                marcarItem
                                                                            }
                                                                            setMarcarItem={
                                                                                setMarcarItem
                                                                            }
                                                                            marcaNoExiste={
                                                                                marcaNoExiste
                                                                            }
                                                                            setMarcaNoExiste={
                                                                                setMarcaNoExiste
                                                                            }
                                                                            modeloCodigo={
                                                                                modeloCodigo
                                                                            }
                                                                            cilindrajeCodigo={
                                                                                cilindrajeCodigo
                                                                            }
                                                                        />
                                                                    ) : duplicarProducto ? (
                                                                        <DuplicarVehiculos
                                                                            setVehiculoUnoDuplicar={
                                                                                setVehiculoUnoDuplicar
                                                                            }
                                                                            setAgregarVehiculo={
                                                                                setAgregarVehiculo
                                                                            }
                                                                            setEliminoDatos={
                                                                                setEliminoDatos
                                                                            }
                                                                            setDuplicar={
                                                                                setDuplicar
                                                                            }
                                                                            duplicar={
                                                                                duplicar
                                                                            }
                                                                            setTipoVehUno={
                                                                                setTipoVehUno
                                                                            }
                                                                            setCarroceriaVehUno={
                                                                                setCarroceriaVehUno
                                                                            }
                                                                            setMarcaVehUno={
                                                                                setMarcaVehUno
                                                                            }
                                                                            setAnnoVehUno={
                                                                                setAnnoVehUno
                                                                            }
                                                                            setModeloVehUno={
                                                                                setModeloVehUno
                                                                            }
                                                                            setcilindrajeVehUno={
                                                                                setcilindrajeVehUno
                                                                            }
                                                                            settransmisionVehUno={
                                                                                settransmisionVehUno
                                                                            }
                                                                            setcombustibleVehUno={
                                                                                setcombustibleVehUno
                                                                            }
                                                                            settraccionVehUno={
                                                                                settraccionVehUno
                                                                            }
                                                                            //SIGUE
                                                                            tipoVehUno={
                                                                                tipoVehUno
                                                                            }
                                                                            carroceriaVehUno={
                                                                                carroceriaVehUno
                                                                            }
                                                                            marcaVehUno={
                                                                                marcaVehUno
                                                                            }
                                                                            annoVehUno={
                                                                                annoVehUno
                                                                            }
                                                                            modeloVehUno={
                                                                                modeloVehUno
                                                                            }
                                                                            cilindrajeVehUno={
                                                                                cilindrajeVehUno
                                                                            }
                                                                            transmisionVehUno={
                                                                                transmisionVehUno
                                                                            }
                                                                            combustibleVehUno={
                                                                                combustibleVehUno
                                                                            }
                                                                            traccionVehUno={
                                                                                traccionVehUno
                                                                            }
                                                                            setTipoVehSelec={
                                                                                setTipoVehSelec
                                                                            }
                                                                            setCarroceriaVehSelec={
                                                                                setCarroceriaVehSelec
                                                                            }
                                                                            setMarcaVehSelec={
                                                                                setMarcaVehSelec
                                                                            }
                                                                            setAnnoVehSelec={
                                                                                setAnnoVehSelec
                                                                            }
                                                                            setModeloVehSelec={
                                                                                setModeloVehSelec
                                                                            }
                                                                            setCilindrajeVehSelec={
                                                                                setCilindrajeVehSelec
                                                                            }
                                                                            setTransmisionVehSelec={
                                                                                setTransmisionVehSelec
                                                                            }
                                                                            setCombustibleVehSelec={
                                                                                setCombustibleVehSelec
                                                                            }
                                                                            setTraccionVehSelec={
                                                                                setTraccionVehSelec
                                                                            }
                                                                            tipoVehSelec={
                                                                                tipoVehSelec
                                                                            }
                                                                            carroceriaVehSelec={
                                                                                carroceriaVehSelec
                                                                            }
                                                                            marcaVehSelec={
                                                                                marcaVehSelec
                                                                            }
                                                                            annoVehSelec={
                                                                                annoVehSelec
                                                                            }
                                                                            modeloVehSelec={
                                                                                modeloVehSelec
                                                                            }
                                                                            cilindrajeVehSelec={
                                                                                cilindrajeVehSelec
                                                                            }
                                                                            transmisionVehSelec={
                                                                                transmisionVehSelec
                                                                            }
                                                                            combustibleVehSelec={
                                                                                combustibleVehSelec
                                                                            }
                                                                            traccionVehSelec={
                                                                                traccionVehSelec
                                                                            }
                                                                            showTraccion={
                                                                                showTraccion
                                                                            }
                                                                            setShowTraccion={
                                                                                setShowTraccion
                                                                            }
                                                                            showTransmision={
                                                                                showTransmision
                                                                            }
                                                                            setShowTransmision={
                                                                                setShowTransmision
                                                                            }
                                                                            setControlAgregarVehiculo={
                                                                                setControlAgregarVehiculo
                                                                            }
                                                                            vehiculosSeleccionados={
                                                                                vehiculosSeleccionados
                                                                            }
                                                                            setVehiculosSeleccionados={
                                                                                setVehiculosSeleccionados
                                                                            }
                                                                            controlDuplicar={
                                                                                controlDuplicar
                                                                            }
                                                                            setControlDuplicar={
                                                                                setControlDuplicar
                                                                            }
                                                                            dataannos={
                                                                                annos
                                                                            }
                                                                            nuevoVehiculo={
                                                                                nuevoVehiculo
                                                                            }
                                                                            setNuevoVehiculo={
                                                                                setNuevoVehiculo
                                                                            }
                                                                            idVehiculosProducto={
                                                                                idVehiculosProducto
                                                                            }
                                                                            arrayVehiculosTemporal={
                                                                                arrayVehiculosTemporal
                                                                            }
                                                                            setArrayVehiculosTemporal={
                                                                                setArrayVehiculosTemporal
                                                                            }
                                                                            setTipoVeh={
                                                                                setTipoVeh
                                                                            }
                                                                            tipoVeh={
                                                                                tipoVeh
                                                                            }
                                                                            arraySelectEdit={
                                                                                arraySelectEdit
                                                                            }
                                                                            setEditarProducto={
                                                                                setEditarProducto
                                                                            }
                                                                            listadoCarrocerias={
                                                                                listadoCarrocerias
                                                                            }
                                                                            listadoMarcas={
                                                                                listadoMarcas
                                                                            }
                                                                            listadoModelos={
                                                                                listadoModelos
                                                                            }
                                                                            listadoCilindrajes={
                                                                                listadoCilindrajes
                                                                            }
                                                                            setDuplicarProducto={
                                                                                setDuplicarProducto
                                                                            }
                                                                            numeroVehiculosAgregados={
                                                                                arrayVehiculosTemporal.length
                                                                            }
                                                                            marcarItemDuplicar={
                                                                                marcarItemDuplicar
                                                                            }
                                                                            setMarcarItemDuplicar={
                                                                                setMarcarItemDuplicar
                                                                            }
                                                                            marcaNoExiste={
                                                                                marcaNoExiste
                                                                            }
                                                                            setMarcaNoExiste={
                                                                                setMarcaNoExiste
                                                                            }
                                                                        />
                                                                    ) : null}
                                                                </div>
                                                            }
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {
                                                                <div className="mt-25">
                                                                    <h4 className="ml-15 tituloadvertenciaproductos mtmenos30">
                                                                        Identificación
                                                                        de los
                                                                        vehículos
                                                                        compatibles
                                                                    </h4>
                                                                    <br />
                                                                    <Row>
                                                                        <Col
                                                                            xl={
                                                                                6
                                                                            }
                                                                            lg={
                                                                                6
                                                                            }
                                                                            md={
                                                                                6
                                                                            }
                                                                            xs={
                                                                                6
                                                                            }>
                                                                            <div
                                                                                className="ml-20 mt-1 datoscerradosgenericosdos"
                                                                                disabled={
                                                                                    true
                                                                                }>
                                                                                <h4
                                                                                    className=" 
                                                                                    ml-16 textoubicacionproducto">
                                                                                    Es
                                                                                    genérico,
                                                                                    sirve
                                                                                    para
                                                                                    varios
                                                                                    vehículos.
                                                                                </h4>
                                                                            </div>
                                                                        </Col>
                                                                        <Col
                                                                            xl={
                                                                                1
                                                                            }
                                                                            lg={
                                                                                1
                                                                            }
                                                                            md={
                                                                                1
                                                                            }
                                                                            xs={
                                                                                1
                                                                            }
                                                                            className="ml-198 mtmenos2">
                                                                            <div
                                                                                className={
                                                                                    classBtnOpenClose
                                                                                }>
                                                                                <i
                                                                                    className="colortextoselect mt-2 fa fa-angle-down d-flex justify-content-center apuntador"
                                                                                    onClick={
                                                                                        agregarDatosGenerico
                                                                                    }
                                                                                    aria-hidden="true"
                                                                                    ref={
                                                                                        targetshow
                                                                                    }
                                                                                    onMouseOver={() =>
                                                                                        setShowEdit(
                                                                                            true
                                                                                        )
                                                                                    }
                                                                                    onMouseOut={() =>
                                                                                        setShowEdit(
                                                                                            false
                                                                                        )
                                                                                    }></i>
                                                                            </div>

                                                                            <Overlay
                                                                                className=""
                                                                                target={
                                                                                    targetshow.current
                                                                                }
                                                                                show={
                                                                                    showEdit
                                                                                }
                                                                                placement="top">
                                                                                {(
                                                                                    props
                                                                                ) => (
                                                                                    <Tooltip
                                                                                        className="ubicartooltipgenerico"
                                                                                        id="overlay-example"
                                                                                        {...props}>
                                                                                        <div className="tamañotextotoolgenerico">
                                                                                            {" "}
                                                                                            Tipo
                                                                                            de
                                                                                            producto{" "}
                                                                                        </div>
                                                                                    </Tooltip>
                                                                                )}
                                                                            </Overlay>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                ) : null}

                                                {agregarVehiculo ? (
                                                    <div>
                                                        {
                                                            /*controlAgregarVehiculo ? (*/
                                                            <div className="ml-10">
                                                                <div
                                                                    className="ps-form__input mt-3
                                                                                   botonagregarotrovehiculo"
                                                                    onClick={() =>
                                                                        agregarDatosVehiculos()
                                                                    }>
                                                                    {
                                                                        <h4>
                                                                            Click
                                                                            para
                                                                            agregar
                                                                            vehículo
                                                                        </h4>
                                                                    }
                                                                </div>
                                                                <div
                                                                    className="ps-form__input mt-3
                                                                                   botonagregarotrovehiculo"
                                                                    onClick={() =>
                                                                        crearVehiculos()
                                                                    }>
                                                                    {
                                                                        <h4>
                                                                            ¿No
                                                                            encuentras
                                                                            tu
                                                                            vehículo?
                                                                            Créalo.
                                                                        </h4>
                                                                    }
                                                                </div>

                                                                <div
                                                                    className="ml-580 ps-btn redondearborde botonazul mt-15"
                                                                    onClick={() =>
                                                                        agregarDatosLatoneria()
                                                                    }>
                                                                    {
                                                                        <div className="botonvehcompatibles">
                                                                            Siguiente
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                            /*) : null*/
                                                        }
                                                    </div>
                                                ) : botonCrearVehiculo ? (
                                                    <div className="ml-10">
                                                        <div
                                                            className="ps-form__input mt-3
                                                                                   botonagregarotrovehiculo"
                                                            onClick={() =>
                                                                agregarDatosVehiculos()
                                                            }>
                                                            {
                                                                <h4>
                                                                    Click para
                                                                    agregar
                                                                    vehículo
                                                                </h4>
                                                            }
                                                        </div>
                                                        <div
                                                            className="ps-form__input mt-3 botonagregarotrovehiculo"
                                                            onClick={() =>
                                                                crearVehiculos()
                                                            }>
                                                            {
                                                                <h4>
                                                                    ¿No
                                                                    encuentras
                                                                    tu vehículo?
                                                                    Créalo.
                                                                </h4>
                                                            }
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </div>

                                            {selecCategoria == "Si" ? (
                                                <div className="cajavehiculoscompatiblesproducto">
                                                    <CategoriasProductosGenericos
                                                        setShowDatosProductos={
                                                            setShowDatosProductos
                                                        }
                                                        showDatosProductos={
                                                            showDatosProductos
                                                        }
                                                        abrirCerrarCategoriasGenerico={
                                                            abrirCerrarCategoriasGenerico
                                                        }
                                                        setAbrirCerrarCategoriasGenerico={
                                                            setAbrirCerrarCategoriasGenerico
                                                        }
                                                        categoria={categoria}
                                                        setCategoria={
                                                            setCategoria
                                                        }
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                    ) : (
                                        <div className="ps-form__group mtmenos20">
                                            <Row>
                                                <Col
                                                    xl={11}
                                                    lg={11}
                                                    md={11}
                                                    xs={11}>
                                                    <div className="form-control ps-form__input">
                                                        <select
                                                            //disabled="disabled"
                                                            className="custom-select ps-form__labelselect"
                                                            onChange={(e) =>
                                                                handleChangeGenerico(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }>
                                                            <option
                                                                selected
                                                                className="select-fontsize ps-form__label">
                                                                Producto es
                                                                Genérico
                                                            </option>
                                                            {productogenerico &&
                                                                productogenerico.map(
                                                                    (
                                                                        itemselect
                                                                    ) => {
                                                                        return (
                                                                            <option
                                                                                value={
                                                                                    itemselect.value
                                                                                }>
                                                                                {
                                                                                    itemselect.label
                                                                                }
                                                                            </option>
                                                                        );
                                                                    }
                                                                )}
                                                        </select>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}

                                    <div className="ps-form__submit">
                                        <div>
                                            {mostrarBotonDatosMotor ? (
                                                <p className="ps-form__text tamañotextocrearproducto">
                                                    Ahora vamos a identificar
                                                    las caracteristícas del
                                                    motor
                                                </p>
                                            ) : null}
                                        </div>
                                        <div>
                                            {mostrarBotonDatosMotor ? (
                                                <div
                                                    className="ps-btn"
                                                    onClick={
                                                        datosCrearProducto
                                                    }>
                                                    Click aquí
                                                </div>
                                            ) : seleccionoTipoVeh ? (
                                                <Row>
                                                    <Col
                                                        xl={4}
                                                        lg={4}
                                                        md={4}
                                                        sm={4}>
                                                        <div className="botonimagenesilustrativas mt-20">
                                                            <h4 className="textoimagenesilustrativas ">
                                                                Listo, ya
                                                                Seleccionaste el
                                                                tipo de
                                                                Vehículo!
                                                            </h4>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-140">
                                {showModalLatoneria ? (
                                    <DatosLatoneria
                                        setShowModalLatoneria={
                                            setShowModalLatoneria
                                        }
                                        showModalLatoneria={showModalLatoneria}
                                        setShowModalLatoneriaActiva={
                                            setShowModalLatoneriaActiva
                                        }
                                        showModalLatoneriaActiva={
                                            showModalLatoneriaActiva
                                        }
                                        seleccionoUbicacionProducto={
                                            seleccionoUbicacionProducto
                                        }
                                        setSeleccionoUbicacionProducto={
                                            setSeleccionoUbicacionProducto
                                        }
                                        showModalDatosProducto={
                                            showModalDatosProducto
                                        }
                                        setShowModalDatosProducto={
                                            setShowModalDatosProducto
                                        }
                                        setShowDatosProductos={
                                            setShowDatosProductos
                                        }
                                        setSelecDatosProducto={
                                            setSelecDatosProducto
                                        }
                                        tipoVehUno={tipoVehUno}
                                        activaDuplicar={activaDuplicar}
                                        setActivaDuplicar={setActivaDuplicar}
                                        setOpenCloseUbicarPrd={setOpenCloseUbicarPrd}
                                    />
                                ) : seleccionoUbicacionProducto ? (
                                    <div className="ml-40">
                                        <Row className="mtmenos80">
                                            <Col
                                                xl={1}
                                                lg={1}
                                                md={1}
                                                sm={1}></Col>
                                            <Col xl={4} lg={4} md={4} sm={4}>
                                                <div className="botonimagenesilustrativas mt-100">
                                                    <h4 className="textoimagenesilustrativas ">
                                                        OK, ya hemos ubicado tu
                                                        producto, Oprime
                                                        continuar para ingresar
                                                        los datos adicionales.
                                                    </h4>
                                                </div>
                                            </Col>
                                        </Row>
                                        {!SelecDatosProducto ? (
                                            <Row>
                                                <Col
                                                    xl={3}
                                                    lg={3}
                                                    md={3}
                                                    sm={3}></Col>
                                                <Col
                                                    xl={4}
                                                    lg={4}
                                                    md={4}
                                                    sm={4}>
                                                    <Button
                                                        className="ps-btn botonazul mt-20"
                                                        onClick={
                                                            ingresarDatosProductos
                                                        }>
                                                        Click para continuar
                                                    </Button>
                                                </Col>
                                            </Row>
                                        ) : null}
                                    </div>
                                ) : null}
                            </div>

                            {showDatosProductos ? (
                                <DatosProductos
                                    setShowDatosProductos={
                                        setShowDatosProductos
                                    }
                                    showDatosProductos={showDatosProductos}
                                    setShowDatosProductosActiva={
                                        setShowDatosProductosActiva
                                    }
                                    showDatosProductosActiva={
                                        showDatosProductosActiva
                                    }
                                    SelecDatosProducto={SelecDatosProducto}
                                    setSelecDatosProducto={
                                        setSelecDatosProducto
                                    }
                                    showDatosProductosAdicionales={
                                        showDatosProductosAdicionales
                                    }
                                    setShowDatosProductosAdicionales={
                                        setShowDatosProductosAdicionales
                                    }
                                    showModalDatosProducto={
                                        showModalDatosProducto
                                    }
                                    setShowModalDatosProducto={
                                        setShowModalDatosProducto
                                    }
                                    generico={generico}
                                    tituloInformacionProducto={
                                        tituloInformacionProducto
                                    }
                                    setTituloInformacionProducto={
                                        setTituloInformacionProducto
                                    }
                                    setOpenCloseInformacionPrd={setOpenCloseInformacionPrd}
                                />
                            ) : SelecDatosProducto ? (
                                console.log("VERDADERO")
                            ) : null}

                            {showDatosProductosAdicionales ? (
                                <DatosProductosAdicionales
                                    showDatosProductosAdicionales={
                                        showDatosProductosAdicionales
                                    }
                                    setShowDatosProductosAdicionales={
                                        setShowDatosProductosAdicionales
                                    }
                                    showIngresoFotos={showIngresoFotos}
                                    setShowIngresoFotos={setShowIngresoFotos}
                                    categoria={categoria}
                                    setCategoria={setCategoria}
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                    datosgenerales={datosgenerales}
                                    setOpenCloseDatPublicaPrd={setOpenCloseDatPublicaPrd}
                                />
                            ) : SelecDatosProducto ? (
                                console.log("VERDADERO")
                            ) : null}

                            {showIngresoFotos ? (
                                <RegistrarFotos
                                    showIngresoFotos={showIngresoFotos}
                                    setShowIngresoFotos={setShowIngresoFotos}
                                    generico={generico}
                                    idVehiculosProducto={idVehiculosProducto}
                                    openCloseUbicarPrd={openCloseUbicarPrd}
                                    openCloseInformacionPrd={openCloseInformacionPrd}
                                    openCloseDatPublicaPrd={openCloseDatPublicaPrd}
                                    openClose={openClose}
                                />
                            ) : SelecDatosProducto ? (
                                console.log("VERDADERO")
                            ) : null}
                        </div>
                    </div>

                    <div className="App">
                        <ModalInformacionGenericos
                            shown={showModalGenerico}
                            close={() => {
                                setShowModalGenerico(false);
                            }}
                        />
                    </div>
                    <div className="App">
                        <ModalInformacionPorUnoVarios
                            shown={showModalParaUnoVarios}
                            close={() => {
                                setShowModalParaUnoVarios(false);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="ps-page ps-page--inner mt-200"></div>
        </Container>
    );
};

function DatosProductos(props) {
    const {
        setShowDatosProductos,
        showDatosProductos,
        setShowDatosProductosActiva,
        showDatosProductosActiva,
        SelecDatosProducto,
        setSelecDatosProducto,
        showDatosProductosAdicionales,
        setShowDatosProductosAdicionales,
        generico,
        tituloInformacionProducto,
        setTituloInformacionProducto,
        setOpenCloseInformacionPrd
    } = props;

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [classPosicionCaja, setClassPosicionCaja] = useState("ml-250 mt-20");
    const [showEdit, setShowEdit] = useState(false);
    const targetshow = useRef(null);
    const caracteristicasVeh = useSelector(
        (state) => state.vehiculoseleccionado.vehiculoseleccionado
    );

    const [formData, setFormData] = useState(defaultValueForm());
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);
    const [informacionProducto, setInformacionProducto] = useState(true);
    const [calificacionEstadoProducto, setCalificacionEstadoProducto] =
        useState(0);
    const [estadoUno, setEstadoUno] = useState(
        "ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog"
    );
    const [estadoDos, setEstadoDos] = useState(
        "ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog"
    );
    const [estadoTres, setEstadoTres] = useState(
        "ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog"
    );
    const [estadoCuatro, setEstadoCuatro] = useState(
        "ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog"
    );
    const [estadoCinco, setEstadoCinco] = useState(
        "ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog"
    );
    const [contarLetrasTitulo, setcontarLetrasTitulo] = useState(0);
    const [tituloProducto, setTituloProducto] = useState(null);
    const [tituloProductoDos, setTituloProductoDos] = useState(0);
    const [puntosConsecutivos, setPuntosConsecutivos] = useState(null);

    const [inputTituloProducto, setInputTituloProducto] =
        useState("inputdatosproducto");
    const [inputMarcaProducto, setInputMarcaProducto] = useState(
        "inputdatosproductomarca sinborder"
    );
    const [inputCondicionProducto, setInputCondicionProducto] = useState(
        "dropdowncondicionproducto"
    );
    const [bordeCondicion, setBordeCondicion] = useState("");
    const [bordeVendePartes, setBordeVendePartes] = useState("");
    const [bordeFuncionalidad, setBordeFuncionalidad] = useState("");

    const [inputNumParteProducto, setInputNumParteProducto] = useState(
        "inputdatosproductomarca sinborder"
    );
    const [inputVenParteProducto, setInputVenParteProducto] = useState(
        "form-control ps-form__input tamañoinputdatosproducto mlmenos20"
    );
    const [inputFuncionalidadProducto, setInputFuncionalidadProducto] =
        useState("form-control ps-form__input");
    const [inputEstadoProducto, setInputEstadoProducto] = useState("");
    const [classInformacionProducto, setClassInformacionProducto] = useState(
        "cajavehiculoscompatiblesproducto"
    );

    const [tituloEditar, setTituloEditar] = useState(null);
    const [marcaEditar, setMarcaEditar] = useState(null);
    const [condicionEditar, setCondicionEditar] = useState(null);
    const [numeroparteEditar, setNumeroParteEditar] = useState(null);
    const [vendeparteEditar, setVendeParteEditar] = useState(null);
    const [funcionalidadEditar, setFuncionalidadEditar] = useState(null);
    const [estadoEditar, setEstadoEditar] = useState(null);

    const [tipoCondicion, setTipoCondicion] = useState(
        "Selecciona la condición de tu producto"
    );
    const [classtipoCondicion, setClassTipoCondicion] = useState("mlmenos35");

    const [vendePorPartes, setVendePorPartes] = useState(
        "Producto se vende por partes"
    );
    const [classPorPartes, setClassPorPartes] = useState("mlmenos100");

    const [tipoFuncionalidad, setTipoFuncionalidad] = useState(
        "Funcionalidad del producto"
    );
    const [classtipoFuncionalidad, setClassTipoFuncionalidad] =
        useState("mlmenos130");

    const duplicarprd = useSelector((state) => state.duplicarprd.duplicarprd);

    useEffect(() => {
        if (duplicarprd == 1 || duplicarprd == 2) {
            let datosprducto = JSON.parse(localStorage.getItem("duplicarprd"));
            let vehproductos = JSON.parse(localStorage.getItem("vehproductos"));

            setTituloProducto(datosprducto.titulonombre);
            setMarcaEditar(datosprducto.marcarepuesto);

            let condicion = "";
            if (datosprducto.condicion == 1) condicion = "Nuevo";
            else if (datosprducto.condicion == 2) condicion = "Usado";
            setClassTipoCondicion("mlmenos275");
            setTipoCondicion(condicion);
            setCondicionEditar(datosprducto.condicion);
            setNumeroParteEditar(datosprducto.numerodeparte);
            let vendepartes = "";
            if (datosprducto.vendeporpartes == 1)
                vendepartes = "Si, se vende por partes";
            else if (datosprducto.vendeporpartes == 2)
                vendepartes = "No, se vende completo";
            else vendepartes = "No, se vende completo";
            setVendePorPartes(vendepartes);
            /*
 { label: "Baja", value: 1 },
        { label: "Regular", value: 2 },
        { label: "Buena", value: 3 },
        { label: "Excelente", value: 4 },
*/
            let funcionalidad = "";
            if (datosprducto.funcionalidad == 1) funcionalidad = "Baja";
            else if (datosprducto.funcionalidad == 2) funcionalidad = "Regular";
            if (datosprducto.funcionalidad == 3) funcionalidad = "Buena";
            else if (datosprducto.funcionalidad == 3)
                funcionalidad = "Excelente";
            else funcionalidad = "Baja";

            setTipoFuncionalidad(funcionalidad);
            setEstadoEditar(datosprducto.estadoproducto);
            setCalificacionEstadoProducto(datosprducto.estadoproducto);
            setClassPorPartes("mlmenos150");

            setClassTipoFuncionalidad("mlmenos275");

            if (datosprducto.estadoproducto == 1) {
                calificacionEstadoUno(1);
            } else if (datosprducto.estadoproducto == 2) {
                calificacionEstadoDos(2);
            } else if (datosprducto.estadoproducto == 3) {
                calificacionEstadoTres(3);
            } else if (datosprducto.estadoproducto == 4) {
                calificacionEstadoCuatro(4);
            } else if (datosprducto.estadoproducto == 5) {
                calificacionEstadoCinco(5);
            }
        }
    }, [duplicarprd]);

    useEffect(() => {
        if (generico == "No") {
            setClassPosicionCaja("ml-200");
            setClassInformacionProducto(
                "mt-20 cajavehiculoscompatiblesproducto"
            );
        } else {
            setClassPosicionCaja("ml-200 mtmenos55");
            setClassInformacionProducto(
                "mt-82 cajavehiculoscompatiblesproducto"
            );
        }
    }, []);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const tituloOnChange = (e) => {
        //console.log("LONGITUD TITULO NOMBRE : ", e);
        var strLength = e.length;

        let titulo = "";
        let letra;
        for (var i = 0; i < 69; i++) {
            letra = e.substr(i, 1);
            titulo = titulo + letra;

            if (i <= 35) setTituloProductoDos(titulo);
        }
        setTituloProducto(titulo);
        setcontarLetrasTitulo(strLength);

        if (tituloProductoDos.length > 35) setPuntosConsecutivos("...");
        else setPuntosConsecutivos("");

        if (strLength > 69) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Número de caracteres supera el maximo de 70 permitido!"
            );
            return;
        }
    };

    const calificacionproducto = [
        { label: "Baja", value: 1 },
        { label: "Regular", value: 2 },
        { label: "Buena", value: 3 },
        { label: "Excelente", value: 4 },
    ];

    const condicionproducto = [
        { label: "Nuevo", value: 1 },
        { label: "Usado", value: 2 },
    ];

    const porpartes = [
        { label: "Si, se vende por partes", value: 1 },
        { label: "No, se vende completo", value: 2 },
    ];

    const iniciarTituloProducto = (e) => {
        setInputTituloProducto("inputdatosproducto");
    };

    const marcaOnChange = (e) => {
        //console.log("LONGITUD DESCRIPCION : ", e);
        var strLength = e.length;
        //console.log("DESCRIPCION : ", strLength);
        //setContadorLetrasDescripcion(strLength);
        setMarcaEditar(e);
        if (strLength > 30) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Número de caracteres de la marca supera el maximo de 30 permitido!"
            );
            return;
        }
    };

    const downMarcaEdit = (dato) => {
        if (dato.charCode == "0") {
            setMarcaEditar("");
        }
    };

    const numeroParteOnChange = (e) => {
        //console.log("LONGITUD DESCRIPCION : ", e);
        var strLength = e.length;
        setNumeroParteEditar(e);
        //console.log("DESCRIPCION : ", strLength);
        //setContadorLetrasDescripcion(strLength);

        if (strLength > 30) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Número de caracteres del codigo de parte supera el maximo de 30 permitido!"
            );
            return;
        }
    };

    const iniciarMarca = (e) => {
        setInputMarcaProducto("inputdatosproductomarca sinborder");
    };

    const iniciarCondicion = (e) => {
        setInputCondicionProducto("dropdowncondicionproducto");
        setBordeCondicion("");
    };

    const seleccionarTipoCondicion = (e, value) => {
        setTipoCondicion(e);
        if(tipoCondicion != e){
            localStorage.setItem("cambiacondicionprd", JSON.stringify(true));
        }
        setCondicionEditar(value);
        setClassTipoCondicion("mlmenos275");
    };

    const seleccionarVendePartes = (e) => {
        setVendePorPartes(e);
        setClassPorPartes("mlmenos150");
        setBordeVendePartes("");
    };

    const seleccionarTipoFuncionalidad = (e) => {
        setTipoFuncionalidad(e);
        setClassTipoFuncionalidad("mlmenos275");
        setBordeFuncionalidad("");
    };

    const iniciarNumParte = (e) => {
        setInputNumParteProducto("inputdatosproductomarca sinborder");
    };

    const iniciarVendParte = (e) => {
        setInputVenParteProducto(
            "form-control ps-form__input tamañoinputdatosproducto mlmenos20"
        );
        setBordeVendePartes("");
    };

    const iniciarFuncionalidad = (e) => {
        setInputFuncionalidadProducto("form-control ps-form__input");
        setBordeFuncionalidad("");
    };

    const iniciarEstado = (e) => {
        setInputEstadoProducto("");
    };

    //setInputEstadoProducto("ps-form__group tamañoinputdatosproducto");

    const grabardatosadicionales = async (e) => {
        e.preventDefault();
        setOpenCloseInformacionPrd(false);
        let valores = JSON.parse(localStorage.getItem("informacionproducto"));
        let datosprducto = JSON.parse(localStorage.getItem("duplicarprd"));

        let funcionalidad = null;
        let condicion = null;
        let marcarepuesto = null;
        let numerodeparte = 0;
        let titulonombre = null;
        let vendeporpartes = null;
        let estadoproducto = 0;

        let porpartes = 0;

        if (duplicarprd == 1 || duplicarprd == 2) {
            funcionalidad = funcionalidadEditar;
            condicion = condicionEditar;
            marcarepuesto = marcaEditar;
            numerodeparte = numeroparteEditar;
            titulonombre = tituloProducto;
            vendeporpartes = vendeparteEditar;
            estadoproducto = calificacionEstadoProducto;
        } else if (valores.length > 0 && !formData.titulonombre) {
            if (valores[0].vendeporpartes == "Producto se vende por partes")
                porpartes = 0;
            else porpartes = valores[0].vendeporpartes;

            funcionalidad = valores[0].funcionalidad;
            condicion = valores[0].condicion;
            marcarepuesto = valores[0].marcarepuesto;
            numerodeparte = valores[0].numerodeparte;
            titulonombre = valores[0].titulonombre;
            vendeporpartes = porpartes;
            estadoproducto = valores[0].estadoproducto;
        } else {
            if (vendePorPartes == "Producto se vende por partes") porpartes = 0;
            else porpartes = calificacionEstadoProducto;

            funcionalidad = tipoFuncionalidad;
            condicion = tipoCondicion;
            marcarepuesto = formData.marcarepuesto;
            numerodeparte = formData.numerodeparte;
            titulonombre = tituloProducto;
            vendeporpartes = porpartes;
            estadoproducto = calificacionEstadoProducto;
        }

        setFormError({});
        let errors = {};
        let formOk = true;

        if (!titulonombre) {
            setShowModalMensajes(true);

            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar el titulo de la publicación!");
            setInputTituloProducto("inputdatosproducto alertbotonproducto");
            errors.titulonombre = true;
            formOk = false;
        }

        if (!marcarepuesto) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar la Marca del Repuesto!");
            setInputMarcaProducto("inputdatosproductomarca alertbotonproducto");
            errors.marcarepuesto = true;
            formOk = false;
        }

        if (
            condicion == "Selecciona la condición de tu producto" ||
            !condicionEditar
        ) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Debe ingresar en que Condición esta el Producto!"
            );
            setInputCondicionProducto("dropdowncondicionproducto");
            setBordeCondicion("alertbotonproducto");
            errors.condicion = true;
            formOk = false;
        }

        setFormError(errors);
        //console.log("FORM OK : ", formOk)

        //if (!formOk && valores.length == 0 && duplicarprd != 1) {
        if (!formOk) {
            setLoading(true);
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Debes ingresar los datos obligatorios (están resaltados en rojo.)!"
            );
            return;
        }

        if (condicion == "Nuevo") condicion = 1;
        else if (condicion == "Usado") condicion = 2;

        if (tipoFuncionalidad == "Baja") funcionalidad = 1;
        if (tipoFuncionalidad == "Regular") funcionalidad = 2;
        if (tipoFuncionalidad == "Buena") funcionalidad = 3;
        if (tipoFuncionalidad == "Excelente") funcionalidad = 4;

        if (vendePorPartes == "Si, se vende por partes") vendeporpartes = 1;
        else if (vendePorPartes == "No, se vende completo") vendeporpartes = 2;

        const newDet = [];
        let item = {
            funcionalidad: funcionalidad,
            condicion: condicion,
            marcarepuesto: marcarepuesto,
            numerodeparte: numerodeparte,
            titulonombre: titulonombre,
            vendeporpartes: vendeporpartes,
            estadoproducto: estadoproducto,
        };
        newDet.push(item);

        //setSistemaMotorSeleccionado(1);
        localStorage.setItem("informacionproducto", JSON.stringify(newDet));

        //console.log("INFORMACION PRODUCTO : ", formData)

        onCloseModaDatosProductos();
    };

    const onCloseModaDatosProductos = () => {
        setShowDatosProductosAdicionales(true);
        //setShowDatosProductosActiva(false)
        setInformacionProducto(false);
    };

    const onChangeCondicion = (event) => {
        setCondicionEditar(event);
    };

    const onChangeFuncionalidad = (event) => {
        setFuncionalidadEditar(event);
    };

    const onChangeEstado = (event) => {
        setEstadoEditar(event);
    };

    const onChangeVendePartes = (event) => {
        setVendeParteEditar(event);
    };

    const onOpenModaDatosProductos = () => {
        setOpenCloseInformacionPrd(true);
        //setShowDatosProductosAdicionales(false);
        let valores = null;
        valores = JSON.parse(localStorage.getItem("informacionproducto"));

        if (valores && duplicarprd == 0) {
            setTituloEditar(valores[0].titulonombre);
            setMarcaEditar(valores[0].marcarepuesto);
            setCondicionEditar(valores[0].condicion);
            setNumeroParteEditar(valores[0].numerodeparte);
            setVendeParteEditar(valores[0].vendeporpartes);
            setFuncionalidadEditar(valores[0].funcionalidad);
            setEstadoEditar(valores[0].estadoproducto);
            setInformacionProducto(true);
        } else setInformacionProducto(true);
    };

    useEffect(() => {
        let valores = JSON.parse(localStorage.getItem("informacionproducto"));
        //console.log("VALORES : ", valores);

        if (valores.length > 0 && duplicarprd == 0) {
            setTituloEditar(valores[0].titulonombre);
            setMarcaEditar(valores[0].marcarepuesto);
            setCondicionEditar(valores[0].condicion);
            setNumeroParteEditar(valores[0].numerodeparte);
            setVendeParteEditar(valores[0].vendeporpartes);
            setFuncionalidadEditar(valores[0].funcionalidad);
            setEstadoEditar(valores[0].estadoproducto);
        }
    }, [marcaEditar]);

    const offCalificacionEstado = () => {
        if (!calificacionEstadoProducto || calificacionEstadoProducto == 0) {
            setEstadoUno("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
            setEstadoDos("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
            setEstadoTres("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
            setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
            setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        }
    };

    const OncalificacionEstadoUno = () => {
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const OncalificacionEstadoDos = () => {
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const OncalificacionEstadoTres = () => {
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const OncalificacionEstadoCuatro = () => {
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const OncalificacionEstadoCinco = () => {
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
    };

    const calificacionEstadoUno = () => {
        setCalificacionEstadoProducto(1);
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const calificacionEstadoDos = () => {
        setCalificacionEstadoProducto(2);
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const calificacionEstadoTres = () => {
        setCalificacionEstadoProducto(3);
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const calificacionEstadoCuatro = () => {
        setCalificacionEstadoProducto(4);
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const calificacionEstadoCinco = () => {
        setCalificacionEstadoProducto(5);
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
    };

    return (
        <div className={classPosicionCaja}>
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />

            {informacionProducto ? (
                <div className={classInformacionProducto}>
                    <h4 className={tituloInformacionProducto}>
                        Información sobre tu producto.
                    </h4>
                    <form onChange={onChange}>
                        <div className="ml-1">
                            <Row>
                                <Col xl={12} lg={12} md={12} xs={12}>
                                    <div>
                                        <label className="ps-form__label colorbase">
                                            * Titulo publicación
                                        </label>
                                        <input
                                            className={inputTituloProducto}
                                            autocomplete="off"
                                            placeholder="Escribre el nombre del producto y las características más relevantes"
                                            name="titulonombre"
                                            defaultValue={tituloEditar}
                                            value={tituloProducto}
                                            onClick={(e) =>
                                                iniciarTituloProducto()
                                            }
                                            onChange={(e) =>
                                                tituloOnChange(e.target.value)
                                            }
                                            type="text"
                                        />
                                        <h4 className="ml-650 mt-1">
                                            {contarLetrasTitulo} {"/"} 70
                                        </h4>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={5} lg={5} md={5} xs={5}>
                                    <div
                                        className={
                                            "ps-form__group tamañoinputdatosproducto ml-3"
                                        }>
                                        <label className="ps-form__label colorbase">
                                            * Marca del Repuesto
                                        </label>
                                        <input
                                            className={inputMarcaProducto}
                                            autoComplete="off"
                                            defaultValue={marcaEditar}
                                            onKeyDown={(e) => downMarcaEdit(e)}
                                            onCut={(e) =>
                                                marcaOnChange(e.target.value)
                                            }
                                            onChange={(e) =>
                                                marcaOnChange(e.target.value)
                                            }
                                            onClick={(e) => iniciarMarca()}
                                            placeholder="Ingresa la marca del producto"
                                            name="marcarepuesto"
                                            type="text"
                                        />
                                    </div>
                                </Col>
                                <Col
                                    xl={4}
                                    lg={4}
                                    md={4}
                                    xs={4}
                                    className="ml-43">
                                    <label className="ps-form__label colorbase">
                                        * Condición
                                    </label>
                                    <div className={bordeCondicion}>
                                        <Dropdown
                                            onSelect={onChangeCondicion}
                                            onClick={iniciarCondicion}>
                                            <Dropdown.Toggle
                                                className={
                                                    inputCondicionProducto
                                                }
                                                name="condicion"
                                                variant="outline-light"
                                                id="dropdown-basic">
                                                <div
                                                    className={
                                                        classtipoCondicion
                                                    }>
                                                    {tipoCondicion}
                                                </div>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu
                                                variant="outline-light"
                                                //ref={targetEditUno}
                                                className="tamañocajacondicionproducto">
                                                {condicionproducto &&
                                                    condicionproducto.map(
                                                        (item) => {
                                                            return (
                                                                <Dropdown.Item
                                                                    className="itemsdropdowncustom"
                                                                    onClick={() =>
                                                                        seleccionarTipoCondicion(
                                                                            item.label,
                                                                            item.value
                                                                        )
                                                                    }
                                                                    eventKey={
                                                                        item.value
                                                                    }>
                                                                    {item.label}
                                                                </Dropdown.Item>
                                                            );
                                                        }
                                                    )}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <div className="ps-form__group tamañoinputdatosproducto ml-3">
                                        <label className="ps-form__label colorbase">
                                            Número de Parte - Opcional
                                        </label>
                                        <input
                                            className={inputNumParteProducto}
                                            autoComplete="off"
                                            name="numerodeparte"
                                            defaultValue={numeroparteEditar}
                                            onClick={(e) => iniciarNumParte()}
                                            onChange={(e) =>
                                                numeroParteOnChange(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Ingresa número de parte del producto"
                                            type="text"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                inputComponent:
                                                    NumberFormatCelular,
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col
                                    xl={6}
                                    lg={6}
                                    md={6}
                                    xs={6}
                                    className="mlmenos23">
                                    <label className="ps-form__label colorbase">
                                        Vende por partes
                                    </label>
                                    <div className={bordeVendePartes}>
                                        <Dropdown
                                            onSelect={onChangeVendePartes}
                                            onClick={iniciarVendParte}>
                                            <Dropdown.Toggle
                                                className="dropdowncondicionproducto"
                                                name="vendeporpartes"
                                                variant="outline-light"
                                                id="dropdown-basic">
                                                <div className={classPorPartes}>
                                                    {vendePorPartes}
                                                </div>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu
                                                variant="outline-light"
                                                //ref={targetEditUno}
                                                className="tamañocajacondicionproducto">
                                                {porpartes &&
                                                    porpartes.map((item) => {
                                                        return (
                                                            <Dropdown.Item
                                                                className="itemsdropdowncustom"
                                                                onClick={() =>
                                                                    seleccionarVendePartes(
                                                                        item.label
                                                                    )
                                                                }
                                                                eventKey={
                                                                    item.value
                                                                }>
                                                                {item.label}
                                                            </Dropdown.Item>
                                                        );
                                                    })}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col
                                    xl={5}
                                    lg={5}
                                    md={5}
                                    xs={5}
                                    className="ml-10">
                                    <label className="ps-form__label colorbase">
                                        Escala de funcionalidad
                                    </label>
                                    <div className={bordeFuncionalidad}>
                                        <Dropdown
                                            onSelect={onChangeFuncionalidad}
                                            onClick={iniciarFuncionalidad}>
                                            <Dropdown.Toggle
                                                className="dropdowncondicionproducto"
                                                name="funcionalidad"
                                                variant="outline-light"
                                                id="dropdown-basic">
                                                <div
                                                    className={
                                                        classtipoFuncionalidad
                                                    }>
                                                    {tipoFuncionalidad}
                                                </div>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu
                                                variant="outline-light"
                                                //ref={targetEditUno}
                                                className="tamañocajacondicionproducto">
                                                {calificacionproducto &&
                                                    calificacionproducto.map(
                                                        (item) => {
                                                            return (
                                                                <Dropdown.Item
                                                                    className="itemsdropdowncustom"
                                                                    onClick={() =>
                                                                        seleccionarTipoFuncionalidad(
                                                                            item.label
                                                                        )
                                                                    }
                                                                    eventKey={
                                                                        item.value
                                                                    }>
                                                                    {item.label}
                                                                </Dropdown.Item>
                                                            );
                                                        }
                                                    )}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </Col>
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <div
                                        className={
                                            "ps-form__group ml-35 tamañoinputestadoproducto"
                                        }>
                                        <label className="ps-form__label colorbase">
                                            Estado del producto
                                        </label>
                                        <div
                                            className={inputEstadoProducto}
                                            value={estadoEditar}
                                            onChange={(e) =>
                                                onChangeEstado(e.target.value)
                                            }
                                            onClick={(e) => iniciarEstado()}>
                                            <div className="ml-20">
                                                <Row>
                                                    <Col
                                                        xl={2}
                                                        lg={2}
                                                        md={2}
                                                        xs={2}>
                                                        <i
                                                            className={
                                                                estadoUno
                                                            }
                                                            onClick={() =>
                                                                calificacionEstadoUno()
                                                            }></i>
                                                    </Col>
                                                    <Col
                                                        xl={2}
                                                        lg={2}
                                                        md={2}
                                                        xs={2}>
                                                        <i
                                                            className={
                                                                estadoDos
                                                            }
                                                            onClick={() =>
                                                                calificacionEstadoDos()
                                                            }></i>
                                                    </Col>
                                                    <Col
                                                        xl={2}
                                                        lg={2}
                                                        md={2}
                                                        xs={2}>
                                                        <i
                                                            className={
                                                                estadoTres
                                                            }
                                                            onClick={() =>
                                                                calificacionEstadoTres()
                                                            }></i>
                                                    </Col>
                                                    <Col
                                                        xl={2}
                                                        lg={2}
                                                        md={2}
                                                        xs={2}>
                                                        <i
                                                            className={
                                                                estadoCuatro
                                                            }
                                                            onClick={() =>
                                                                calificacionEstadoCuatro()
                                                            }></i>
                                                    </Col>
                                                    <Col
                                                        xl={2}
                                                        lg={2}
                                                        md={2}
                                                        xs={2}>
                                                        <i
                                                            className={
                                                                estadoCinco
                                                            }
                                                            onClick={() =>
                                                                calificacionEstadoCinco()
                                                            }></i>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            {caracteristicasVeh.productogenerico === "Si" ? (
                                <div className="ps-form__group">
                                    <label className="ps-form__label colorbase">
                                        Con que Vehiculos es Compatible
                                    </label>
                                    <input
                                        className="form-control ps-form__input"
                                        name="compatible"
                                        type="text"
                                    />
                                </div>
                            ) : null}
                        </div>
                    </form>

                    <div className="botongrabarproducto mtmenos10">
                        <Row>
                            <Col xl={9} lg={9} md={9} xs={9}>
                                <div>
                                    <p className="ml-10 ps-form__text ">
                                        * Datos Requeridos.
                                    </p>
                                </div>
                            </Col>
                            <Col xl={2} lg={2} md={2} xs={2}>
                                <div
                                    className="ml-18 ps-btn redondearborde"
                                    onClick={grabardatosadicionales}>
                                    Siguiente
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : (
                <div>
                    <div className={classInformacionProducto}>
                        <h4 className="ml-15 tituloadvertenciaproductosizquierda">
                            Información sobre el producto
                        </h4>
                        <div className="ml-15">
                            <Row>
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <div
                                        className="mt-1 datoscerrados"
                                        disabled={true}>
                                        <h4 className="textoubicacionproductodos">
                                            {duplicarprd == 1 ||
                                                duplicarprd == 2
                                                ? tituloProducto
                                                : formData.titulonombre
                                                    ? tituloProductoDos +
                                                    puntosConsecutivos
                                                    : tituloEditar
                                                        ? tituloEditar
                                                        : null}
                                        </h4>
                                    </div>
                                </Col>
                                <Col
                                    xl={1}
                                    lg={1}
                                    md={1}
                                    xs={1}
                                    className="ml-189 mtmenos2 apuntador">
                                    <div className="showcerrarabrir">
                                        <i
                                            className="colortextoselect mt-2 fa fa-angle-down d-flex justify-content-center"
                                            onClick={onOpenModaDatosProductos}
                                            aria-hidden="true"
                                            ref={targetshow}
                                            onMouseOver={() =>
                                                setShowEdit(true)
                                            }
                                            onMouseOut={() =>
                                                setShowEdit(false)
                                            }></i>
                                    </div>

                                    <Overlay
                                        className=""
                                        target={targetshow.current}
                                        show={showEdit}
                                        placement="top">
                                        {(props) => (
                                            <Tooltip
                                                className="ubicartooltipproducto"
                                                id="overlay-example"
                                                {...props}>
                                                <h4 className="tamañotextotooltipproducto">
                                                    {" "}
                                                    Editar{" "}
                                                </h4>
                                            </Tooltip>
                                        )}
                                    </Overlay>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

let ciudaddpto = [];

function DatosProductosAdicionales(props) {
    const {
        SelecDatosProducto,
        setSelecDatosProducto,
        showDatosProductosAdicionales,
        setShowDatosProductosAdicionales,
        showIngresoFotos,
        setShowIngresoFotos,
        categoria,
        setCategoria,
        quantity,
        setQuantity,
        datosgenerales,
        setOpenCloseDatPublicaPrd
    } = props;

    // Inicializamos el arrego de Ciudades
    let ciudades = datosgenerales.vgl_ciudades;

    // Inicializamos el arrego de Departamentos
    let departamentos = datosgenerales.vgl_departamentos;

    //console.log("DEPA  XXX: ", datosgenerales.vgl_departamentos)

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [showEdit, setShowEdit] = useState(false);
    const targetshow = useRef(null);
    const [datosPublicacion, setDatosPublicacion] = useState(true);
    const [formData, setFormData] = useState(defaultValueForm());
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);

    const [inputDescripcionProducto, setInputDescripcionProducto] = useState(
        "form-control ps-form__input descripcionproducto  colorboder"
    );
    const [inputNumeroUnidades, setInputNumeroUnidades] = useState(
        "form-control ps-form__input inputnumerounidaades ml-9"
    );
    const [inputPrecio, setInputPrecio] = useState(
        "form-control ps-form__input baseinput inputdatospublicacion eliminarborde mlmenos15"
    );
    const [inputPeso, setInputPeso] = useState(
        "form-control ps-form__input baseinput inputdatospublicacion eliminarborde"
    );
    const [inputLargo, setInputLargo] = useState(
        "form-control ps-form__input baseinput inputdatospublicacion eliminarborde"
    );
    const [inputAncho, setInputAncho] = useState(
        "form-control ps-form__input baseinput inputdatospublicacion eliminarborde"
    );
    const [inputAltura, setInputAltura] = useState(
        "form-control ps-form__input baseinput inputdatospublicacion mlmenos10 eliminarborde"
    );

    const [tituloDescripcion, setTituloDescripcion] = useState(null);
    const [textoDescripcion, setTextoDescripcion] = useState("");
    const [entre, setEntre] = useState(true);
    const [ingresaPrecio, setIngresaPrecio] = useState(0);
    const [contadorLetrasDescripcion, setContadorLetrasDescripcion] =
        useState(0);

    const [descripcionEditar, setDescripcionEditar] = useState("");
    const [unidadesEditar, setUnidadesEditar] = useState("");

    const [precioEditar, setPrecioEditar] = useState("");

    const [precioProducto, setPrecioProducto] = useState(0);

    const [pesoProducto, setPesoProducto] = useState(0);
    const [pesoEditar, setPesoEditar] = useState("");

    const [largoProducto, setLargoProducto] = useState(0);
    const [largoEditar, setLargoEditar] = useState("");

    const [anchoProducto, setAnchoProducto] = useState(0);
    const [anchoEditar, setAnchoEditar] = useState("");

    const [alturaProducto, setAlturaProducto] = useState(0);
    const [alturaEditar, setAlturaEditar] = useState("");
    const [selectdepto, setSelectDepto] = useState("Seleccione departamento");
    const [selectciudad, setSelectCiudad] = useState("Seleccione ciudad");
    const [enableCiudad, setEnableCiudad] = useState(true);

    const [alertBtnDpto, setAlertBtnDpto] = useState("");
    const [alertBtnCiudad, setAlertBtnCiudad] = useState("");

    const [dptoSeleccionado, setDptoSeleccionado] = useState(null);
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const duplicarprd = useSelector((state) => state.duplicarprd.duplicarprd);

    useEffect(() => {
        if (duplicarprd == 1 || duplicarprd == 2) {
            let datosprducto = JSON.parse(localStorage.getItem("duplicarprd"));
            let vehproductos = JSON.parse(localStorage.getItem("vehproductos"));

            setTituloDescripcion(datosprducto.descripcionproducto);
            setQuantity(datosprducto.numerodeunidades);
            setPrecioEditar(datosprducto.precio);
            setPrecioProducto(datosprducto.precio);
            setPesoEditar(datosprducto.peso);
            setPesoProducto(datosprducto.peso);
            setLargoEditar(datosprducto.largo);
            setLargoProducto(datosprducto.largo);
            setAnchoEditar(datosprducto.ancho);
            setAnchoProducto(datosprducto.ancho);
            setAlturaEditar(datosprducto.alto);
            setAlturaProducto(datosprducto.alto);
            setSelectDepto(datosprducto.nombre_dep);
            setSelectCiudad(datosprducto.nombreciudad);
            setEnableCiudad(false);
        }
    }, [duplicarprd]);

    useEffect(() => {
        //console.log("CATEGORIA : 0, categoria")
        if (categoria === 1) {
            setTextoDescripcion(
                "Sugerencia: Aquí puedes escribir para que sirve tu producto"
            );
        } else if (categoria === 2) {
            setTextoDescripcion(
                "Sugerencia: Aquí puedes escribir el material de tu producto, disponibilidad de colores, y medidas."
            );
        } else if (categoria === 3) {
            setTextoDescripcion(
                "Sugerencia: Aquí puedes escribir el material de tu producto, disponibilidad de colores, y medidas."
            );
        } else if (categoria === 4) {
            setTextoDescripcion(
                "Sugerencia: Aquí puedes escribir la potencia y especificaciones técnicas del producto."
            );
        } else if (categoria === 5) {
            setTextoDescripcion(
                "Aquí puedes escribir el voltaje, amperaje, lúmenes, referencia, entre otros elementos que consideres relevantes."
            );
        } else if (categoria === 6) {
            setTextoDescripcion(
                "Sugerencia: Puedes escribir la referencia del producto, como son: 5W30, 20W50, 15W40, 25W60, dot4, entre otros."
            );
        } else if (categoria === 7) {
            setTextoDescripcion(
                "Sugerencia: Puedes escribir el ancho (mm), alto (mm-%), rin, índice de carga, indice de velocidad."
            );
        } else if (categoria === 8) {
            setTextoDescripcion(
                "Sugerencia: Puedes escribir el amperaje, ancho, alto, y largo, y el tipo de vehículo para el cual sirve"
            );
        } else if (categoria === 9) {
            setTextoDescripcion(
                "Sugerencia: Aquí puedes escribir la longitud de las plumillas en pulgadas"
            );
        } else if (categoria === 10) {
            setTextoDescripcion(
                "Sugerencia: Aquí puedes describir el contenido del kit, las características o materiales del producto."
            );
        } else
            setTextoDescripcion(
                "Suegerencia: Aquí puedes ingresar información relacionada con tu producto."
            );
    }, [categoria]);

    const datosAdicionalesProducto = async (e) => {
        e.preventDefault();
        //console.log("FORM DATA : ", formData);
        setOpenCloseDatPublicaPrd(false);

        setFormError({});
        let errors = {};
        let formOk = true;

        let valores = JSON.parse(
            localStorage.getItem("datospublicacionproducto")
        );

        let alto = null;
        let ancho = null;
        let descripcionproducto = null;
        let largo = null;
        let numerodeunidades = null;
        let peso = null;
        let precio = null;
        let ciudad = null;

        let datosprducto = JSON.parse(localStorage.getItem("duplicarprd"));

        if (duplicarprd == 1 || duplicarprd == 2) {
            alto = alturaProducto;
            ancho = anchoProducto;
            descripcionproducto = tituloDescripcion;
            largo = largoProducto;
            numerodeunidades = quantity;
            peso = pesoProducto;
            precio = precioProducto;
            ciudad = datosprducto.ciudad;
        } else if (valores.length > 0 && !formData.descripcionproducto) {
            alto = valores[0].alto;
            ancho = valores[0].ancho;
            descripcionproducto = valores[0].descripcionproducto;
            largo = valores[0].largo;
            numerodeunidades = valores[0].numerodeunidades;
            peso = valores[0].peso;
            precio = valores[0].precio;
            ciudad = valores[0].ciudad;
        } else {
            alto = formData.alto;
            ancho = formData.ancho;
            descripcionproducto = tituloDescripcion;
            largo = formData.largo;
            numerodeunidades = quantity;
            peso = formData.peso;
            precio = formData.precio;
            ciudad = ciudadSeleccionada;
        }

        if (quantity == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar Número de Unidades del producto!");
            setInputNumeroUnidades(
                "form-control ps-form__input inputnumerounidaades ml-10 alertboton"
            );
            errors.numerodeunidades = true;
            formOk = false;
        }

        if (numerodeunidades == 0 || !numerodeunidades) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar Número de Unidades del producto!");
            setInputNumeroUnidades(
                "form-control ps-form__input inputnumerounidaades ml-10 alertboton"
            );
            errors.numerodeunidades = true;
            formOk = false;
        }

        if (!precioProducto || precioProducto == "$ 0") {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar el precio del producto!");
            setInputPrecio(
                "form-control ps-form__input inputdatospublicacion alertboton mlmenos15"
            );
            errors.precio = true;
            formOk = false;
        }

        if (!precio || precio == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar el precio del producto!");
            setInputPrecio(
                "form-control ps-form__input inputdatospublicacion alertboton mlmenos15"
            );
            errors.precio = true;
            formOk = false;
        }

        let validavalor = formData.precio;

        if (!tituloDescripcion) {
            //setShowModalMensajes(true);
            //setTituloMensajes("Información del producto");
            //setTextoMensajes("Debe ingresar la Descripción del producto!");
            setInputDescripcionProducto(
                "form-control ps-form__input descripcionproducto colorboderalert"
            );
            //errors.descripcionproducto = true;
            formOk = false;
        }

        if (!descripcionproducto) {
            //setShowModalMensajes(true);
            //setTituloMensajes("Información del producto");
            //setTextoMensajes("Debe ingresar la Descripción del producto!");
            setInputDescripcionProducto(
                "form-control ps-form__input descripcionproducto colorboderalert"
            );
            //errors.descripcionproducto = true;
            formOk = false;
        }

        if (!pesoProducto || pesoProducto == 0) {
            //setShowModalMensajes(true);
            //setTituloMensajes("Información del producto");
            //setTextoMensajes("Debe ingresar el peso del producto!");
            setInputPeso(
                "form-control ps-form__input inputdatospublicacion alertboton"
            );
            //errors.peso = true;
            formOk = false;
        }

        if (!peso || peso == 0) {
            //setShowModalMensajes(true);
            //setTituloMensajes("Información del producto");
            //setTextoMensajes("Debe ingresar el peso del producto!");
            setInputPeso(
                "form-control ps-form__input inputdatospublicacion alertboton"
            );
            //errors.peso = true;
            formOk = false;
        }

        if (!largoProducto || largoProducto == 0) {
            //setShowModalMensajes(true);
            //setTituloMensajes("Información del producto");
            //setTextoMensajes("Debe ingresar longitud del producto");
            setInputLargo(
                "form-control ps-form__input inputdatospublicacion alertboton"
            );
            //errors.largo = true;
            formOk = false;
        }

        if (!largo || largo == 0) {
            //setShowModalMensajes(true);
            //setTituloMensajes("Información del producto");
            //setTextoMensajes("Debe ingresar longitud del producto");
            setInputLargo(
                "form-control ps-form__input inputdatospublicacion alertboton"
            );
            //errors.largo = true;
            formOk = false;
        }

        if (!alturaProducto || alturaProducto == 0) {
            //setShowModalMensajes(true);
            //setTituloMensajes("Información del producto");
            //setTextoMensajes("Debe ingresar la altura del producto");
            setInputAltura(
                "form-control ps-form__input inputdatospublicacion mlmenos10 alertboton"
            );
            //errors.alto = true;
            formOk = false;
        }

        if (!alto || alto == 0) {
            //setShowModalMensajes(true);
            //setTituloMensajes("Información del producto");
            //setTextoMensajes("Debe ingresar la altura del producto");
            setInputAltura(
                "form-control ps-form__input inputdatospublicacion mlmenos10 alertboton"
            );
            //errors.alto = true;
            formOk = false;
        }

        if (!anchoProducto || anchoProducto == 0) {
            //setShowModalMensajes(true);
            //setTituloMensajes("Información del producto");
            //setTextoMensajes("Debe ingresar el ancho del producto");
            setInputAncho(
                "form-control ps-form__input inputdatospublicacion alertboton"
            );
            //errors.ancho = true;
            formOk = false;
        }

        if (!ancho || ancho == 0) {
            //setShowModalMensajes(true);
            //setTituloMensajes("Información del producto");
            //setTextoMensajes("Debe ingresar el ancho del producto");
            setInputAncho(
                "form-control ps-form__input inputdatospublicacion alertboton"
            );
            //errors.ancho = true;
            formOk = false;
        }

        setFormError(errors);
        //console.log("FORM OK : ", formOk)

        if (selectdepto == "Seleccione departamento") {
            setAlertBtnDpto("alertbotonproductocity pt-2");
        }
        /*
        if (!ciudadSeleccionada) {
            setAlertBtnCiudad("alertbotonproductocity pt-2");
        }
*/
        if (selectciudad == "Seleccione ciudad") {
            setAlertBtnCiudad("alertbotonproductocity pt-2");
            formOk = false;
        }

        if (!formOk) {
            setLoading(true);
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Debes ingresar los datos obligatorios (están resaltados en rojo)!"
            );
            return;
        }

        //console.log("DATOS PUBLICACION : ", formData);
        const newDet = [];
        let item = {
            alto: alto,
            ancho: ancho,
            descripcionproducto: descripcionproducto,
            largo: largo,
            numerodeunidades: numerodeunidades,
            peso: peso,
            precio: precio,
            ciudad: ciudad,
        };
        newDet.push(item);
        //setSistemaMotorSeleccionado(1);
        localStorage.setItem(
            "datospublicacionproducto",
            JSON.stringify(newDet)
        );
        onCloseModalDatosPublicacion();
    };

    const onCloseModalDatosPublicacion = () => {
        setShowIngresoFotos(true);
        setDatosPublicacion(false);
    };

    const onOpenModalDatosPublicacion = () => {
        setOpenCloseDatPublicaPrd(true);
        let valores = JSON.parse(
            localStorage.getItem("datospublicacionproducto")
        );
        setDescripcionEditar(valores[0].descripcionproducto);
        setUnidadesEditar(valores[0].numerodeunidades);
        setPrecioEditar(valores[0].precio);
        setPesoEditar(valores[0].peso);
        setLargoEditar(valores[0].largo);
        setAnchoEditar(valores[0].ancho);
        setAlturaEditar(valores[0].alto);

        //setShowIngresoFotos(false);
        setDatosPublicacion(true);
    };

    useEffect(() => {
        let valores = JSON.parse(
            localStorage.getItem("datospublicacionproducto")
        );

        if (valores.length > 0 && duplicarprd == 0) {
            setDescripcionEditar(valores[0].descripcionproducto);
            setUnidadesEditar(valores[0].numerodeunidades);
            setPrecioEditar(valores[0].precio);
            setPesoEditar(valores[0].peso);
            setLargoEditar(valores[0].largo);
            setAnchoEditar(valores[0].ancho);
            setAlturaEditar(valores[0].alto);
        }
    }, [precioEditar]);

    const iniciarInputUnidades = (e) => {
        setInputNumeroUnidades(
            "form-control ps-form__input inputnumerounidaades ml-10"
        );
    };

    const iniciarInputPrecio = (e) => {
        setInputPrecio(
            "form-control ps-form__input inputdatospublicacion eliminarborde mlmenos15"
        );
    };

    const iniciarInputPeso = (e) => {
        setInputPeso(
            "form-control ps-form__input inputdatospublicacion eliminarborde"
        );
    };

    const iniciarInputLargo = (e) => {
        setInputLargo(
            "form-control ps-form__input inputdatospublicacion eliminarborde"
        );
    };
    const iniciarInputAncho = (e) => {
        setInputAncho(
            "form-control ps-form__input inputdatospublicacion eliminarborde"
        );
    };
    const iniciarInputAltura = (e) => {
        setInputAltura(
            "form-control ps-form__input inputdatospublicacion mlmenos10 eliminarborde"
        );
    };

    const IncrementItem = () => {
        setInputNumeroUnidades(
            "form-control ps-form__input inputnumerounidaades ml-10"
        );
        let contador = quantity + 1;
        //console.log("VALOR : ", contador)
        setQuantity(contador);

        setFormData({
            ...formData,
            [formData.numerodeunidades]: contador,
        });
    };

    const DecreaseItem = () => {
        setInputNumeroUnidades(
            "form-control ps-form__input inputnumerounidaades ml-10"
        );
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
        //console.log("MENOS : ", quantity);
    };

    const handleChange = (event) => {
        //console.log("VALOR : ", variable);

        if (isNaN(parseInt(event))) {
            setQuantity(0);
        } else setQuantity(parseInt(event));
    };

    const iniciarDescripcionproducto = (e) => {
        setInputDescripcionProducto(
            "form-control ps-form__input descripcionproducto  colorboder"
        );
    };

    const descripcionOnChange = (e) => {
        //console.log("LONGITUD DESCRIPCION : ", e);
        var strLength = e.length;
        //console.log("DESCRIPCION : ", strLength);
        let descripcion = "";
        let letra;
        for (var i = 0; i < 179; i++) {
            letra = e.substr(i, 1);
            descripcion = descripcion + letra;
        }
        setTituloDescripcion(descripcion);

        setContadorLetrasDescripcion(strLength);

        if (strLength > 179) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Número de caracteres supera el maximo de 180 permitido!"
            );
            return;
        }
    };

    const precioOnChange = (e) => {
        var strLength = e.length;
        let precio = "";
        let numeros;

        for (var i = 0; i < 28; i++) {
            numeros = e.substr(i, 1);
            precio = precio + numeros;
        }

        setPrecioProducto(precio);
        if (strLength > 28) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Número de caracteres supera el maximo de 20 permitido!"
            );
            return;
        }
    };

    const pesoOnChange = (e) => {
        var strLength = e.length;
        let peso = "";
        let numeros;

        for (var i = 0; i < 27; i++) {
            numeros = e.substr(i, 1);
            peso = peso + numeros;
        }

        setPesoProducto(peso);
        if (strLength > 27) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Número de caracteres supera el maximo de 20 permitido!"
            );
            return;
        }
    };

    const largoOnChange = (e) => {
        var strLength = e.length;
        let largo = "";
        let numeros;

        for (var i = 0; i < 27; i++) {
            numeros = e.substr(i, 1);
            largo = largo + numeros;
        }

        setLargoProducto(largo);
        if (strLength > 27) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Número de caracteres supera el maximo de 20 permitido!"
            );
            return;
        }
    };

    const anchoOnChange = (e) => {
        var strLength = e.length;
        let ancho = "";
        let numeros;

        for (var i = 0; i < 27; i++) {
            numeros = e.substr(i, 1);
            ancho = ancho + numeros;
        }

        setAnchoProducto(ancho);
        if (strLength > 27) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Número de caracteres supera el maximo de 20 permitido!"
            );
            return;
        }
    };

    const alturaOnChange = (e) => {
        var strLength = e.length;
        let altura = "";
        let numeros;

        for (var i = 0; i < 27; i++) {
            numeros = e.substr(i, 1);
            altura = altura + numeros;
        }

        setAlturaProducto(altura);
        if (strLength > 27) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Número de caracteres supera el maximo de 20 permitido!"
            );
            return;
        }
    };

    const validaPrecio = (precio) => {
        //console.log("Precio : ", formData.precio);
        //setInputControlTelefono("form-control ps-form__input");
        setIngresaPrecio(formData.precio);

        let validavalor = formData.precio;

        let validarprecio;
        let haycaracterid = false;
        for (var i = 0; i < validavalor.length; i++) {
            validarprecio = validavalor.substr(i, 1);
            if (
                validarprecio != 0 &&
                validarprecio != 1 &&
                validarprecio != 2 &&
                validarprecio != 3 &&
                validarprecio != 4 &&
                validarprecio != 5 &&
                validarprecio != 6 &&
                validarprecio != 7 &&
                validarprecio != 8 &&
                validarprecio != 9
            ) {
                haycaracterid = true;
                console.log("CARACTER", i, validarprecio);
            } else console.log("ES UN NUMERO ", i, validarprecio);
        }

        if (haycaracterid) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Por favor ingresa el precio, sin separadores o caracteres especiales!"
            );
            return;
        }
    };

    const precioSinFormato = () => {
        setEntre(false);
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
        ciudaddpto = ciud;
        if (ciud.length > 0) setEnableCiudad(false);
    };

    const SelectCiudad = (data, name) => {
        setSelectCiudad(name);
        setCiudadSeleccionada(data);
    };

    const reiniciardpto = () => {
        setAlertBtnDpto("");
    };

    const reiniciarciudad = () => {
        setAlertBtnCiudad("");
    };

    return (
        <div>
            <div className="ps-page__header ml-270 mt-25">
                <ModalMensajes
                    shown={showModalMensajes}
                    close={setShowModalMensajes}
                    titulo={tituloMensajes}
                    mensaje={textoMensajes}
                    tipo="1"
                />
                {datosPublicacion ? (
                    <div className="mlmenos60 cajavehiculoscompatiblesproducto">
                        <div>
                            <h4 className="ml-15 tituloadvertenciaproductosizquierda">
                                Datos de la publicación.
                            </h4>
                        </div>
                        <form onChange={onChange}>
                            <div className="ps-form__group inputdatosproductoadicional">
                                <Row>
                                    <Col lg={12} xl={12} md={12} xs={12}>
                                        <div className="ps-form__group inputdatosproductoadicional">
                                            <div className="textodatospublicacion">
                                                * Descripción del producto
                                            </div>
                                            <textarea
                                                className={
                                                    inputDescripcionProducto
                                                }
                                                placeholder={textoDescripcion}
                                                defaultValue={descripcionEditar}
                                                value={tituloDescripcion}
                                                name="descripcionproducto"
                                                onClick={(e) =>
                                                    iniciarDescripcionproducto()
                                                }
                                                onChange={(e) =>
                                                    descripcionOnChange(
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                            />
                                            <div className="ml-650 mt-1 colorbase">
                                                {contadorLetrasDescripcion}{" "}
                                                {"/"} 180
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="mtmenos10">
                                    <Col lg={6} xl={6} md={6} xs={6}>
                                        <div className="ml-10 textodatospublicacion">
                                            * Número de Unidades
                                        </div>
                                        <div className={inputNumeroUnidades}>
                                            <Row>
                                                <button
                                                    className="ml-10 mt-1 colorboder"
                                                    type="button"
                                                    onClick={DecreaseItem}>
                                                    <i className="fa fa-minus"></i>
                                                </button>

                                                <NumberFormat
                                                    className="ml-55 eliminarborde colordelfondo"
                                                    name="numerodeunidades"
                                                    defaultValue={
                                                        unidadesEditar
                                                    }
                                                    value={quantity}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            e.target.value
                                                        )
                                                    }
                                                    onClick={() =>
                                                        iniciarInputUnidades()
                                                    }
                                                    placeholder="Ingrese número de unidades"
                                                    thousandSeparator={true}
                                                    prefix={""}
                                                />
                                                <button
                                                    className="ml-50 colorboder"
                                                    type="button"
                                                    onClick={IncrementItem}>
                                                    <i className="fa fa-plus"></i>
                                                </button>
                                            </Row>
                                        </div>
                                    </Col>

                                    {entre ? (
                                        <Col lg={6} xl={6} md={6} xs={6}>
                                            <div className="mlmenos15 textodatospublicacion">
                                                * Precio del producto
                                            </div>
                                            <NumberFormat
                                                //variant="outline-light"
                                                className={inputPrecio}
                                                autoComplete="off"
                                                onMouseOut={precioSinFormato}
                                                defaultValue={precioEditar}
                                                onClick={() =>
                                                    iniciarInputPrecio()
                                                }
                                                name="precio"
                                                onBlur={(e) =>
                                                    validaPrecio(e.target.value)
                                                }
                                                placeholder="Ingrese precio del producto"
                                            //thousandSeparator={true}
                                            //prefix={"$"}
                                            />
                                        </Col>
                                    ) : (
                                        <Col lg={6} xl={6} md={6} xs={6}>
                                            <div className="mlmenos15 textodatospublicacion">
                                                * Precio del producto
                                            </div>
                                            <NumberFormat
                                                defaultValue={precioEditar}
                                                className={inputPrecio}
                                                value={precioProducto == 0 ? "" : precioProducto}
                                                autoComplete="off"
                                                onClick={() =>
                                                    iniciarInputPrecio()
                                                }
                                                onChange={(e) =>
                                                    precioOnChange(
                                                        e.target.value
                                                    )
                                                }
                                                name="precio"
                                                placeholder="Ingrese precio del producto"
                                                thousandSeparator={true}
                                                prefix={"$ "}
                                            />
                                        </Col>
                                    )}
                                </Row>

                                <div className="ps-form__group inputdatosproductoadicional mt-10">
                                    <Row>
                                        <Col lg={5} xl={5} md={5} xs={5}>
                                            <div className="ps-form__label textodatospublicacion">
                                                * Peso del producto
                                            </div>
                                            <NumberFormat
                                                className={inputPeso}
                                                autoComplete="off"
                                                value={pesoProducto == 0 ? "" : pesoProducto}
                                                defaultValue={pesoEditar}
                                                onClick={() =>
                                                    iniciarInputPeso()
                                                }
                                                onChange={(e) =>
                                                    pesoOnChange(e.target.value)
                                                }
                                                name="peso"
                                                placeholder="Ingrese peso del producto en"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            md={1}
                                            xs={1}
                                            className="medidastipounidad mt-34">
                                            <div className="ml-15 textomedidas">
                                                Kg
                                            </div>
                                        </Col>

                                        <Col
                                            lg={4}
                                            xl={4}
                                            md={4}
                                            xs={4}
                                            className="ml-2">
                                            <div className="ml-1 textodatospublicacion">
                                                * Largo del producto
                                            </div>
                                            <NumberFormat
                                                className={inputLargo}
                                                autoComplete="off"
                                                value={largoProducto == 0 ? "" : largoProducto}
                                                defaultValue={largoEditar}
                                                name="largo"
                                                onClick={() =>
                                                    iniciarInputLargo()
                                                }
                                                onChange={(e) =>
                                                    largoOnChange(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Longitud del producto en"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            md={1}
                                            xs={1}
                                            className="medidastipounidad mt-34">
                                            <div className="ml-70 textomedidas">
                                                Cm
                                            </div>
                                        </Col>
                                        <Col
                                            lg={5}
                                            xl={5}
                                            md={5}
                                            xs={5}
                                            className="mt-20">
                                            <div className="ps-form__label textodatospublicacion">
                                                * Ancho del producto
                                            </div>
                                            <NumberFormat
                                                className={inputAncho}
                                                autoComplete="off"
                                                value={anchoProducto == 0 ? "" : anchoProducto}
                                                defaultValue={anchoEditar}
                                                name="ancho"
                                                onClick={() =>
                                                    iniciarInputAncho()
                                                }
                                                onChange={(e) =>
                                                    anchoOnChange(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Ancho del producto en"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            md={1}
                                            xs={1}
                                            className="medidastipounidad mlmenos5 mt-53">
                                            <div className="ml-12 textomedidas">
                                                Cm
                                            </div>
                                        </Col>
                                        <Col
                                            lg={4}
                                            xl={4}
                                            md={4}
                                            xs={4}
                                            className="ml-16 mt-20">
                                            <div className="mlmenos8 textodatospublicacion">
                                                * Altura del producto
                                            </div>
                                            <NumberFormat
                                                className={inputAltura}
                                                autoComplete="off"
                                                value={alturaProducto == 0 ? "" : alturaProducto}
                                                defaultValue={alturaEditar}
                                                name="alto"
                                                onClick={() =>
                                                    iniciarInputAltura()
                                                }
                                                onChange={(e) =>
                                                    alturaOnChange(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Altura del producto en"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            md={1}
                                            xs={1}
                                            className="medidastipounidad mt-53 ml-45">
                                            <div className="ml-60 textomedidas textodatospublicacion">
                                                Cm
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={6} lg={6} md={6} xs={6}>
                                            <div className="mt-20 eliminarborde">
                                                <div className="ps-form__label pb-2 textodatospublicacion">
                                                    * Departamento
                                                </div>
                                                <Dropdown
                                                    className={alertBtnDpto}
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
                                                            className="dropdowncustomitemscity"
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
                                                            className="tamañocajaoptionsitemscity">
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
                                        </Col>
                                        <Col xl={6} lg={6} md={6} xs={6}>
                                            <div className="mlmenos25 mt-20 eliminarborde">
                                                <div className="ps-form__label pb-2 textodatospublicacion">
                                                    * Ciudad
                                                </div>
                                                <Dropdown
                                                    className={alertBtnCiudad}
                                                    onClick={() =>
                                                        reiniciarciudad()
                                                    }>
                                                    <Dropdown.Toggle
                                                        disabled={enableCiudad}
                                                        onclick={CustomToggle}
                                                        id="dropdown-custom-components"
                                                        arrowColor="#2D2E83"
                                                        className="dropdowncustomitemscity"
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
                                                        className="tamañocajaoptionsitemscity">
                                                        {ciudaddpto &&
                                                            ciudaddpto.map(
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
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </form>

                        <div className="botongrabaradicionalproducto">
                            <Row>
                                <Col xl={4} lg={4} md={4} xs={4}>
                                    <div>
                                        <p className="ps-form__text">
                                            * Datos Requeridos.
                                        </p>
                                    </div>
                                </Col>
                                <Col xl={8} lg={8} md={8} xs={8}>
                                    <div
                                        className="ps-btn tamañoinputpublicacion ml-100 redondearborde"
                                        onClick={datosAdicionalesProducto}>
                                        Vamos al ingreso de fotos del producto
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                ) : (
                    <div className="mlmenos60 mt-25 cajainformacionprouctos">
                        <h4 className="ml-15 tituloadvertenciaproductosizquierda">
                            Datos publicación.
                        </h4>
                        <div>
                            <Row>
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <div
                                        className="ml-15 mt-1 datoscerrados"
                                        disabled={true}>
                                        <h4 className="textoubicacionproducto">
                                            Precio del producto{" "}
                                            {formData.precio}
                                        </h4>
                                    </div>
                                </Col>
                                <Col
                                    xl={1}
                                    lg={1}
                                    md={1}
                                    xs={1}
                                    className="mtmenos2 ml-197 apuntador">
                                    <div className="showcerrarabrir">
                                        <i
                                            className="colortextoselect mt-2 fa fa-angle-down d-flex justify-content-center"
                                            onClick={
                                                onOpenModalDatosPublicacion
                                            }
                                            aria-hidden="true"
                                            ref={targetshow}
                                            onMouseOver={() =>
                                                setShowEdit(true)
                                            }
                                            onMouseOut={() =>
                                                setShowEdit(false)
                                            }></i>
                                    </div>

                                    <Overlay
                                        className=""
                                        target={targetshow.current}
                                        show={showEdit}
                                        placement="top">
                                        {(props) => (
                                            <Tooltip
                                                className="ubicartooltipproducto"
                                                id="overlay-example"
                                                {...props}>
                                                <h4 className="tamañotextotooltipproducto">
                                                    {" "}
                                                    Editar{" "}
                                                </h4>
                                            </Tooltip>
                                        )}
                                    </Overlay>
                                </Col>
                            </Row>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function defaultValueForm() {
    return {
        id: null,
        productogenerico: null,
        tipoVeh: null,
        carroceria: null,
        marca: null,
        anno: null,
        modelo: null,
        cilindrajemotor: null,
        tipocombustible: null,
        transmision: null,
        partedelVeh: null,
        posicionproducto: null,
        titulonombre: null,
        marcarepuesto: null,
        condicion: null,
        funcionalidad: null,
        estadoproducto: null,
        numerodeunidades: null,
        precio: null,
        ciudad: null,
        numerodeparte: 0,
        compatible: null,
        descripcionproducto: null,
        vendeporpartes: null,
        peso: null,
        largo: null,
        ancho: null,
        alto: null,
        tipotraccion: null,
        turbocompresor: null,
        descuento: null,
        usuario: null,
        moneda: null,
        estado: null,
        numerodeimagenes: null,
        nombreimagen1: null,
        nombreimagen2: null,
        nombreimagen3: null,
        nombreimagen4: null,
        nombreimagen5: null,
        nombreimagen6: null,
        nombreimagen7: null,
        nombreimagen8: null,
        nombreimagen9: null,
        nombreimagen10: null,
    };
}

export default CreateProduct;
