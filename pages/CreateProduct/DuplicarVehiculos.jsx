import React, { useState, useEffect, useRef } from "react";
import swal from "sweetalert";
import { Row, Col, Dropdown, Form, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import ModalMensajes from "../mensajes/ModalMensajes";
import ModalMensajesValidar from "../mensajes/ModalMensajesValidar";
import ModalMensajesEliminar from "../mensajes/ModalMensajesEliminar";
import ModalMensajesTipoVehiculo from "../mensajes/ModalMensajesTipoVehiculo";

import ReactTooltip from "react-tooltip";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import { getDataNewModels } from "../../store/datanewmodels/action";
import { getDataNewCylinder } from "../../store/datanewcylinder/action";
import { getTypesVehicles } from "../../store/typesvehicles/action";
import axios from "axios";
import Moment from "moment";

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

const brandnew = null;
const modelnew = null;
const cilindrajenew = null;

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
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
                    className="my-2 tamañocajaoptionsitemssearchtres"
                    placeholder="Buscar"
                    onChange={(e) => setValue(e.target.value)}
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

function DuplicarVehiculos(props) {
    const {
        setVehiculoUnoDuplicar,
        setAgregarVehiculo,
        setEliminoDatos,
        setDuplicar,
        setTipoVehUno,
        setCarroceriaVehUno,
        setMarcaVehUno,
        setAnnoVehUno,
        setModeloVehUno,
        setcilindrajeVehUno,
        settransmisionVehUno,
        setcombustibleVehUno,
        settraccionVehUno,
        tipoVehUno,
        carroceriaVehUno,
        marcaVehUno,
        annoVehUno,
        modeloVehUno,
        cilindrajeVehUno,
        transmisionVehUno,
        combustibleVehUno,
        traccionVehUno,
        setTipoVehSelec,
        setCarroceriaVehSelec,
        setMarcaVehSelec,
        setAnnoVehSelec,
        setModeloVehSelec,
        setCilindrajeVehSelec,
        setTransmisionVehSelec,
        setCombustibleVehSelec,
        setTraccionVehSelec,
        tipoVehSelec,
        carroceriaVehSelec,
        marcaVehSelec,
        annoVehSelec,
        modeloVehSelec,
        cilindrajeVehSelec,
        transmisionVehSelec,
        combustibleVehSelec,
        traccionVehSelec,
        showTraccion,
        setShowTraccion,
        showTransmision,
        setShowTransmision,
        setControlAgregarVehiculo,
        vehiculosSeleccionados,
        setVehiculosSeleccionados,
        controlDuplicar,
        setControlDuplicar,
        dataannos,
        nuevoVehiculo,
        setNuevoVehiculo,
        idVehiculosProducto,
        arrayVehiculosTemporal,
        setArrayVehiculosTemporal,
        setTipoVeh,
        tipoVeh,
        arraySelectEdit,
        setEditarProducto,
        listadoCarrocerias,
        listadoMarcas,
        listadoModelos,
        listadoCilindrajes,
        setDuplicarProducto,
        numeroVehiculosAgregados,
        marcarItemDuplicar,
        setMarcarItemDuplicar,
        marcaNoExiste,
        setMarcaNoExiste,
    } = props;

    const [interval, setInterval] = useState(0);
    // Asignar nombreUno de las opciones seleccionadas en lo vehiculos

    const dispatch = useDispatch();
    const [vehiculos, setVehiculos] = useState([]);
    const [annos, setAnnos] = useState([]);
    const [listMarcas, setListMarcas] = useState([]);
    const [listCarrocerias, setListCarrocerias] = useState([]);
    const [listModelos, setListModelos] = useState([]);
    const [listCilindrajes, setListCilindrajes] = useState([]);

    const [selectMarcaEdit, setSelectMarcaEdit] = useState("Marca");

    const [valueMarca, setValueMarca] = useState("");
    const [valueModelo, setValueModelo] = useState("");
    const [valueCilindraje, setValueCilindraje] = useState("");

    const [continuarRegistro, setContinuarRegistro] = useState(false);
    const [abandonarRegistro, setAbandonarRegistro] = useState(false);
    const [continuarEliminar, setContinuarEliminar] = useState(false);
    const [abandonarEliminar, setAbandonarEliminar] = useState(false);
    const [asignarTipo, setAsignarTipo] = useState(false);
    const [conservarTipo, setConservarTipo] = useState(false);

    const [alertTipo, setAlertTipo] = useState("ml-2 alinearizquierda");
    const [alertCarroceria, setAlertCarroceria] = useState(
        "ml-2 alinearizquierda"
    );
    const [alertMarca, setAlertMarca] = useState("ml-2 alinearizquierda");
    const [alertAnno, setAlertAnno] = useState("tamañocajaoptionsitemssearch");
    const [alertModelo, setAlertModelo] = useState("ml-2 alinearizquierda");
    const [alertCilindraje, setAlertCilindraje] = useState(
        "ml-2 alinearizquierda"
    );
    const [alertTransmision, setAlertTransmision] = useState(
        "ml-2 alinearizquierda"
    );
    const [alertCombustible, setAlertCombustible] = useState(
        "ml-2 alinearizquierda"
    );
    const [alertTraccion, setAlertTraccion] = useState("ml-2 alinearizquierda");

    //Validar que se ingresen todas las caracteristicas de los veh
    const [controlGrabar, setcontrolGrabar] = useState(false);

    // Caracteristicas seleccionadas por vehiculo
    const [editarTipo, setEditarTipo] = useState(false);
    const [editarCarroceria, setEditarCarroceria] = useState(false);
    const [editarMarca, setEditarMarca] = useState(false);
    const [editarModelo, setEditarModelo] = useState(false);

    const [editarMarcaVeh, setEditarMarcaVeh] = useState([]);
    const [editarAnnoVeh, setEditarAnnoVeh] = useState([]);
    const [editarModeloVeh, setEditarModeloVeh] = useState([]);
    const [editarCilindrajesVeh, setEditarCilindrajesVeh] = useState([]);
    const [editarCarroceriaVeh, setEditarCarroceriaVeh] = useState([]);
    const [editarTransmisionVeh, setEditarTransmisionVeh] = useState([]);

    // En la eidición del vehículo controlar el cambio de las caracteristicas
    const [editarCambioMarca, setEditarCambioMarca] = useState(0);
    const [editarCambioModelo, setEditarCambioModelo] = useState(0);
    const [editarCambioCilindraje, setEditarCambioCilindraje] = useState(0);

    // Caracteristicas seleccionadas por vehiculo
    const [nombreMarcaVeh, setNombreMarcaVeh] = useState(null);
    const [nombreAnnoVeh, setNombreAnnoVeh] = useState(null);
    const [nombreModeloVeh, setNombreModeloVeh] = useState(null);
    const [nombreCilindrajesVeh, setNombreCilindrajesVeh] = useState(null);
    const [nombreCarroceriaVeh, setNombreCarroceriaVeh] = useState(null);
    const [nombreTransmisionVeh, setNombreTransmisionVeh] = useState(null);
    const [nombreCombustibleVeh, setNombreCombustibleVeh] = useState(null);
    const [nombreTraccionVeh, setNombreTraccionVeh] = useState(null);

    //Control si cambio algun valor del vehiculo duplicado
    const [tipoVehDuplica, setTipoVehDuplica] = useState(tipoVehUno);
    const [carroceriaVehDuplica, setCarroceriaVehDuplica] =
        useState(carroceriaVehUno);
    const [marcaVehDuplica, setMarcaVehDuplica] = useState(marcaVehUno);
    const [annoVehDuplica, setAnnoVehDuplica] = useState(annoVehUno);
    const [modeloVehDuplica, setModeloVehDuplica] = useState(modeloVehUno);
    const [cilindrajesVehDuplica, setcilindrajeVehUnoDuplica] =
        useState(cilindrajeVehUno);
    const [transmisionVehDuplica, setTransmisionVehDuplica] =
        useState(transmisionVehUno);
    const [combustibleVehDuplica, setCombustibleVehDuplica] =
        useState(combustibleVehUno);
    const [traccionVehDuplica, setTraccionVehDuplica] =
        useState(traccionVehUno);

    // Inicializamos el arrego de Tipos de Vehiculos
    const [marcas, setMarcas] = useState(listadoMarcas);
    const [carrocerias, setCarrocerias] = useState(listadoCarrocerias);
    const [cilindrajes, setCilindrajes] = useState(listadoCilindrajes);
    const [modelos, setModels] = useState(listadoModelos);

    const [marcasInicia, setMarcasInicia] = useState([]);
    const [codigoMarcaVeh, setCodigoMarcaVeh] = useState(0);
    const [codigoModeloVeh, setCodigoModeloVeh] = useState(0);
    const [codigoCilindrajeVeh, setCodigoCilindrajeVeh] = useState(0);

    const [showEdit, setShowEdit] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const targetedit = useRef(null);
    const targetcopy = useRef(null);
    const targetdelete = useRef(null);
    const targetEditUno = useRef(null);
    const [cambia, setCambia] = useState(false);

    const [showModalMensajesValidar, setShowModalMensajesValidar] =
        useState(false);
    const [showModalMensajesEliminar, setShowModalMensajesEliminar] =
        useState(false);
    const [showModalMensajesTipoVeh, setShowModalMensajesTipoVeh] =
        useState(false);
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [textoMensajesAlterno, setTextoMensajesAlterno] = useState(false);

    const [habilitarTipo, setHabilitarTipo] = useState(false);
    const [habilitarCarroceria, setHabilitarCarroceria] = useState(true);
    const [habilitarMarca, setHabilitarMarca] = useState(true);
    const [habilitarAnno, setHabilitarAnno] = useState(true);
    const [habilitarModelo, setHabilitarModelo] = useState(true);
    const [habilitarCilindraje, setHabilitarCilindraje] = useState(true);
    const [habilitarCombustible, setHabilitarCombustible] = useState(true);

    const [openMarca, setOpenMarca] = useState(true);
    const [openModelo, setOpenModelo] = useState(true);
    const [openCilindraje, setOpenCilindraje] = useState(true);

    const [crearNuevovehiculo, setCrearNuevovehiculo] = useState(false);
    const [consecutivoMarca, setConsecutivoMarca] = useState(300000);
    const [consecutivoModelo, setConsecutivoModelo] = useState(300000);
    const [consecutivoCilindraje, setConsecutivoCilindraje] = useState(300000);

    const [listaNuevasMarcas, setListaNuevasMarcas] = useState(true);
    const [listaNuevosModelos, setListaNuevosModelos] = useState(true);
    const [listaNuevosCilindraje, setListaNuevosCilindraje] = useState(true);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [valida, setValida] = useState(false);

    const datosgenerales = useSelector(
        (state) => state.datosgenerales.datosgenerales
    );

    const leetipoveh = useSelector(
        (state) => state.typesvehicles.typesvehicles
    );

    // Lee modelos de los Vehiculos del state
    const datoscrearproductosmodelos = [];

    // Lee modelos de los Vehiculos del state
    const datoscrearproductoscilindrajes = [];
    const duplicarprd = useSelector((state) => state.duplicarprd.duplicarprd);

    useEffect(() => {
        let incremento = interval + 1;

        setHabilitarTipo(true);
        setInterval(incremento);

        if (tipoVehUno == 3 || tipoVehUno == 4) {
            setShowTraccion(true);
            setShowTransmision(true);
            setTransmisionVehSelec("");
            setTraccionVehSelec("");
        } else if (
            tipoVehUno == 1 ||
            tipoVehUno == 3 ||
            tipoVehUno == 4 ||
            tipoVehUno == 6
        ) {
            setShowTraccion(true);
            setTraccionVehSelec("");
        } else {
            setShowTraccion(false);
            setShowTransmision(false);
        }
    }, []);

    useEffect(() => {
        if (crearNuevovehiculo) {
            let nuevamarca = 0;
            if (codigoMarcaVeh > 0) nuevamarca = codigoMarcaVeh;
            else nuevamarca = consecutivoMarca + 1;
            setConsecutivoMarca(nuevamarca);

            let nuevomodelos = 0;
            if (codigoModeloVeh > 0) nuevomodelos = codigoModeloVeh;
            else nuevomodelos = consecutivoModelo + 1;
            setConsecutivoModelo(nuevomodelos);

            let cilindrajenuevo = 0;
            if (codigoCilindrajeVeh > 0) cilindrajenuevo = codigoCilindrajeVeh;
            else cilindrajenuevo = consecutivoCilindraje + 1;
            setConsecutivoCilindraje(cilindrajenuevo);

            setNombreMarcaVeh(marcaVehSelec);
            setNombreModeloVeh(modeloVehSelec);
            setNombreCilindrajesVeh(cilindrajeVehSelec);

            setModeloVehUno(nuevomodelos);
            setcilindrajeVehUno(cilindrajenuevo);
            setMarcaVehUno(nuevamarca);

            if (nuevamarca > 300000) setEsNuevoVehUno(true);
            else if (nuevomodelos > 300000) setEsNuevoVehUno(true);
            else if (nuevamarca > cilindrajenuevo) setEsNuevoVehUno(true);
            else setEsNuevoVehUno(false);

            let arraymarca = {
                carroceria: carroceriaVehUno,
                estado: 1,
                id: nuevamarca,
                label: brandnew,
                text: brandnew,
                tipovehiculo: tipoVehUno,
                url: "vehiculos",
                value: nuevamarca,
            };

            let datosmarcas = [];
            datosmarcas.push(arraymarca);

            let arraymodelo = {
                id: nuevomodelos,
                modelo: modelnew,
                tipovehiculo: tipoVehUno,
                marca: nuevamarca,
                carroceria: carroceriaVehUno,
                estado: 1,
                value: nuevomodelos,
                label: nuevamarca,
            };

            datoscrearproductosmodelos.push(arraymodelo);
            dispatch(getDataNewModels(datosgenerales.vgl_modelosvehiculos));

            let arraycilindraje = {
                id: cilindrajenuevo,
                cilindraje: cilindrajenew,
                tipovehiculo: tipoVehUno,
                marca: nuevamarca,
                carroceria: carroceriaVehUno,
                modelo: nuevomodelos,
                estado: 1,
                value: cilindrajenuevo,
                label: cilindrajenew,
                tipovehiculo: tipoVehUno,
            };

            datoscrearproductoscilindrajes.push(arraycilindraje);

            let datamarcas = [];

            let itemmarcas = {
                carroceria: carroceriaVehUno,
                estado: 1,
                id: nuevamarca,
                text: marcaVehSelec,
                tipoVeh: tipoVehUno,
                url: "vehiculos",
            };

            datamarcas.push(itemmarcas);
            setMarcas(datamarcas);

            let datamodelos = [];

            let itemmodelos = {
                carroceria: carroceriaVehUno,
                estado: 1,
                id: nuevomodelos,
                label: modeloVehSelec,
                marca: nuevamarca,
                modelo: modeloVehSelec,
                tipoVeh: tipoVehUno,
                value: nuevomodelos,
            };

            datamodelos.push(itemmodelos);
            setModels(datamodelos);

            let datacilindraje = [];

            let item = {
                carroceria: carroceriaVehUno,
                estado: 1,
                id: cilindrajenuevo,
                label: cilindrajeVehSelec,
                marca: nuevamarca,
                modelo: nuevomodelos,
                tipoVeh: tipoVehUno,
                value: cilindrajenuevo,
            };

            datacilindraje.push(item);
            setCilindrajes(datacilindraje);

            dispatch(
                getDataNewCylinder(datosgenerales.vgl_cilindrajesvehiculos)
            );
            setCrearNuevovehiculo(false);
            grabarDatosVehiculosTodo();
        }
    }, [crearNuevovehiculo]);

    useEffect(() => {
        if (!marcaNoExiste) {
            let newDet = [];
            listMarcas &&
                listMarcas.forEach((row) => {
                    if (
                        Number.parseInt(row.tipovehiculo) ===
                        Number.parseInt(tipoVehUno) &&
                        Number.parseInt(row.carroceria) ===
                        Number.parseInt(carroceriaVehUno)
                    ) {
                        let item = {
                            id: row.id,
                            text: row.text,
                            tipoVeh: row.tipovehiculo,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            url: row.url,
                        };
                        newDet.push(item);
                    }
                });
            tipoVeh;
            setMarcas(newDet);

            setModels(listadoModelos);

            let newDetCilindraje = [];
            listCilindrajes &&
                listCilindrajes.forEach((row) => {
                    if (
                        Number.parseInt(row.modelo) ===
                        Number.parseInt(modeloVehUno)
                    ) {
                        let item = {
                            id: row.id,
                            carroceria: row.carroceria,
                            tipoVeh: row.tipovehiculo,
                            estado: row.estado,
                            value: row.id,
                            label: row.cilindraje,
                            marca: row.marca,
                            modelo: row.modelo,
                        };

                        newDetCilindraje.push(item);
                    }
                });
            console.log(listadoCilindrajes);
            setCilindrajes(listadoCilindrajes);
        }

        if (tipoVehUno == 3 || tipoVehUno == 4) {
            if (showTransmision) {
                setTransmisionVehSelec("");
                setTraccionVehSelec("");
            }
        }

        if (tipoVehUno == 3 || tipoVehUno == 4) {
            setTransmisionVehSelec("");
            setTraccionVehSelec("");
            setShowTraccion(true);
            setShowTransmision(true);
        } else if (
            tipoVehUno == 1 ||
            tipoVehUno == 3 ||
            tipoVehUno == 4 ||
            tipoVehUno == 6
        ) {
            setTraccionVehSelec("");
            setShowTraccion(true);
            setShowTransmision(false);
        } else if (tipoVehUno == 2) {
            setShowTraccion(false);
            setShowTransmision(false);
        }
    }, [listModelos, listCilindrajes, !marcaNoExiste]);

    useEffect(() => {
        setVehiculos(datosgenerales.vgl_tiposvehiculos);
        setListMarcas(datosgenerales.vgl_marcasvehiculos);
        setListCarrocerias(datosgenerales.vgl_carroceriasvehiculos);
        setListModelos(datosgenerales.vgl_modelosvehiculos);
        setListCilindrajes(datosgenerales.vgl_cilindrajesvehiculos);
        setAnnos(datosgenerales.vgl_annosvehiculos);
    }, [datosgenerales]);

    useEffect(() => {
        if (editarTipo) {
            setMarcas([]);
            setCarrocerias([]);
            setCilindrajes([]);
            setModels([]);
            transmision = [];
            tipotraccion = [];
            setEditarMarcaVeh(null);
            setEditarAnnoVeh(null);
            setEditarModeloVeh(null);
            setEditarCilindrajesVeh(null);
            setEditarCarroceriaVeh(null);
            setEditarTransmisionVeh(null);

            setCarroceriaVehUno(null);
            setMarcaVehUno(null);
            setAnnoVehUno(null);
            setModeloVehUno(0);
            setcilindrajeVehUno(0);
            settransmisionVehUno(0);
            settraccionVehUno(0);
            setcombustibleVehUno(0);

            setCarroceriaVehSelec("Carroceria");
            setMarcaVehSelec("Marca");
            setModeloVehSelec("Modelo");
            setCilindrajeVehSelec("Cilindraje");

            let newDet = [];
            listCarrocerias.forEach((row) => {
                if (
                    Number.parseInt(row.tipovehiculo) ===
                    Number.parseInt(tipoVehUno)
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
            setCarrocerias(newDet);
            setEditarTipo(false);
        }
    }, [editarTipo]);

    useEffect(() => {
        if (editarCarroceria) {
            setMarcas([]);
            setCilindrajes([]);
            setModels([]);

            if (!marcaNoExiste) {
                setMarcaVehUno(0);
                setModeloVehUno(0);
                setcilindrajeVehUno(0);
                setEditarMarcaVeh(null);
                setEditarAnnoVeh(0);
                setEditarModeloVeh(0);
                setEditarCilindrajesVeh(0);
                setEditarTransmisionVeh(0);
            }

            setMarcaVehSelec("Marca");
            setModeloVehSelec("Modelo");
            setCilindrajeVehSelec("Cilindraje");

            let newDet = [];
            listMarcas &&
                listMarcas.forEach((row) => {
                    if (
                        Number.parseInt(row.tipovehiculo) ===
                        Number.parseInt(tipoVehUno) &&
                        Number.parseInt(row.carroceria) ===
                        Number.parseInt(carroceriaVehUno)
                    ) {
                        let item = {
                            id: row.id,
                            text: row.text,
                            tipoVeh: row.tipovehiculo,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            url: row.url,
                        };
                        newDet.push(item);
                    }
                });
            setMarcas(newDet);
            setEditarCarroceria(false);
        }
    }, [editarCarroceria]);

    useEffect(() => {
        if (editarMarca) {
            setCilindrajes([]);
            //setModels([]);

            transmision = [];
            tipotraccion = [];

            if (!marcaNoExiste) {
                setcilindrajeVehUno(null);
                setModeloVehUno(null);
                setModeloVehSelec("Modelo");
                setCilindrajeVehSelec("Cilindraje");
            }

            if (!marcaNoExiste) {
                let newDetMod = [];
                listModelos &&
                    listModelos.forEach((row) => {
                        if (
                            Number.parseInt(row.marca) ===
                            Number.parseInt(marcaVehUno) &&
                            Number.parseInt(row.carroceria) ===
                            Number.parseInt(carroceriaVehUno)
                        ) {
                            let item = {
                                id: row.id,
                                modelo: row.modelo,
                                tipoVeh: row.tipovehiculo,
                                marca: row.marca,
                                carroceria: row.carroceria,
                                estado: row.estado,
                                value: row.id,
                                label: row.modelo,
                            };
                            newDetMod.push(item);
                        }
                    });
                setModels(newDetMod);
            }
            setEditarMarca(false);
        }
    }, [editarMarca]);

    useEffect(() => {
        if (editarModelo) {
            setCilindrajes([]);
            transmision = [];
            tipotraccion = [];

            if (!marcaNoExiste) {
                setEditarCilindrajesVeh(0);
                setcilindrajeVehUno(0);
                setCilindrajeVehSelec("Cilindraje");
            }

            if (!marcaNoExiste) {
                let newDet = [];
                listCilindrajes &&
                    listCilindrajes.forEach((row) => {
                        if (
                            Number.parseInt(row.modelo) ===
                            Number.parseInt(modeloVehUno)
                        ) {
                            let item = {
                                id: row.id,
                                carroceria: row.carroceria,
                                tipoVeh: row.tipovehiculo,
                                estado: row.estado,
                                value: row.id,
                                label: row.cilindraje,
                                marca: row.marca,
                                modelo: row.modelo,
                            };
                            newDet.push(item);
                        }
                    });
                setCilindrajes(newDet);
            }
            setEditarModelo(false);
        }
    }, [editarModelo]);

    useEffect(() => {
        setTipoVehUno(tipoVehUno);
        setMarcaVehUno(marcaVehUno);
        setAnnoVehUno(annoVehUno);
        setModeloVehUno(modeloVehUno);
        setcilindrajeVehUno(cilindrajeVehUno);
        setCarroceriaVehUno(carroceriaVehUno);
        settransmisionVehUno(transmisionVehUno);
        setcombustibleVehUno(combustibleVehUno);
        settraccionVehUno(traccionVehUno);

        setAnnoVehSelec(annoVehSelec);
        setCarroceriaVehSelec(carroceriaVehSelec);
        setCilindrajeVehSelec(cilindrajeVehSelec);
        setCombustibleVehSelec(combustibleVehSelec);
        setMarcaVehSelec(marcaVehSelec);
        setModeloVehSelec(modeloVehSelec);
        setTipoVehSelec(tipoVehSelec);
        setTraccionVehSelec(traccionVehSelec);
        setTransmisionVehSelec(transmisionVehSelec);

        //Asignamos los valores iniciales para controlar que se cambie algin valor
        setTipoVehDuplica(tipoVehUno);
        setMarcaVehDuplica(marcaVehUno);
        setAnnoVehDuplica(annoVehUno);
        setModeloVehDuplica(modeloVehUno);
        setcilindrajeVehUnoDuplica(cilindrajeVehUno);
        setCarroceriaVehDuplica(carroceriaVehUno);
        setTransmisionVehDuplica(transmisionVehUno);
        setCombustibleVehDuplica(combustibleVehUno);
        setTraccionVehDuplica(traccionVehUno);

        setMarcas(listadoMarcas);
        setModels(listadoModelos);
        setCilindrajes(listadoCilindrajes);
        setCarrocerias(listadoCarrocerias);

        const list = datosgenerales.vgl_carroceriasvehiculos;
        setListModelos(datosgenerales.vgl_modelosvehiculos);
        setListCilindrajes(datosgenerales.vgl_cilindrajesvehiculos);
        setVehiculos(datosgenerales.vgl_tiposvehiculos);
        let datosvehiculos = datosgenerales.vgl_tiposvehiculos;

        {
            datosvehiculos &&
                datosvehiculos.map((item) => {
                    if (item.value == tipoVehUno) {
                        setTipoVehSelec(item.text);
                    }
                });
        }

        setListMarcas(datosgenerales.vgl_marcasvehiculos);
        setListCarrocerias(datosgenerales.vgl_carroceriasvehiculos);
        setAnnos(datosgenerales.vgl_annosvehiculos);
    }, []);

    useEffect(() => {
        if (controlGrabar) {
            if (transmisionVehUno == 1) {
                setNombreTransmisionVeh("Automática");
            } else if (transmisionVehUno == 2) {
                setNombreTransmisionVeh("Manual");
            } else {
                setNombreTransmisionVeh("");
            }

            if (combustibleVehUno == 1) {
                setNombreCombustibleVeh("Gasolina");
            } else if (combustibleVehUno == 2) {
                setNombreCombustibleVeh("Diesel");
            } else if (combustibleVehUno == 3) {
                setNombreCombustibleVeh("Gasolina - Gas");
            } else if (combustibleVehUno == 4) {
                setNombreCombustibleVeh("Gasolina – Eléctrico");
            } else {
                setNombreCombustibleVeh("");
            }

            if (tipoVehUno == 3 || tipoVehUno == 4) {
                setNombreTraccionVeh("");
            }

            if (!marcaNoExiste) {
                listCarrocerias &&
                    listCarrocerias.forEach((row) => {
                        if (
                            Number.parseInt(row.id) ===
                            Number.parseInt(carroceriaVehUno)
                        ) {
                            setNombreCarroceriaVeh(row.carroceria);
                        }
                    });

                listMarcas &&
                    listMarcas.forEach((row) => {
                        if (
                            Number.parseInt(row.id) ===
                            Number.parseInt(marcaVehUno)
                        ) {
                            if (row.text) setNombreMarcaVeh(row.text);
                        }
                    });

                annos &&
                    annos.forEach((row) => {
                        if (
                            Number.parseInt(row.id) ===
                            Number.parseInt(annoVehUno)
                        ) {
                            setNombreAnnoVeh(row.anovehiculo);
                        }
                    });

                listModelos &&
                    listModelos.forEach((row) => {
                        if (
                            Number.parseInt(row.id) ===
                            Number.parseInt(modeloVehUno)
                        ) {
                            setNombreModeloVeh(row.modelo);
                        }
                    });

                listCilindrajes &&
                    listCilindrajes.forEach((row) => {
                        if (
                            Number.parseInt(row.id) ===
                            Number.parseInt(cilindrajeVehUno)
                        ) {
                            setNombreCilindrajesVeh(row.cilindraje);
                        }
                    });
            }

            if (marcaNoExiste) {
                setMarcaVehUno(consecutivoMarca);
                setModeloVehUno(consecutivoModelo);
                setcilindrajeVehUno(consecutivoCilindraje);
                setNombreCilindrajesVeh(cilindrajeVehSelec);
                setNombreModeloVeh(modeloVehSelec);
                setNombreMarcaVeh(marcaVehSelec);
            } else {
                setMarcaVehUno(marcaVehUno);
                setModeloVehUno(modeloVehUno);
                setcilindrajeVehUno(cilindrajeVehUno);
            }

            setTipoVehUno(tipoVehUno);
            setAnnoVehUno(annoVehUno);
            setCarroceriaVehUno(carroceriaVehUno);
            settransmisionVehUno(transmisionVehUno);
            setcombustibleVehUno(combustibleVehUno);

            if (!traccionVehUno) settraccionVehUno(0);
            else settraccionVehUno(traccionVehUno);

            if (traccionVehUno == 1) {
                setNombreTraccionVeh("Tracción Delantera");
            } else if (traccionVehUno == 2) {
                setNombreTraccionVeh("Tracción Trasera");
            } else if (traccionVehUno == 3) {
                setNombreTraccionVeh("Tracción 4x4");
            } else if (traccionVehUno == 4) {
                setNombreTraccionVeh("");
            }
            setcontrolGrabar(false);
            setNuevoVehiculo(false);

            const creaVehiculoTemporal = async () => {
                //AQUI
                if (!marcaVehUno || marcaVehUno == 0) {
                    setAlertMarca("ml-2 alinearizquierda textoalert");
                    setShowModalMensajes(true);
                    setTituloMensajes("Información del producto");
                    setTextoMensajes("Heey, Ingresa los datos de la marca!");
                    return;
                }
                if (!modeloVehUno || modeloVehUno == 0) {
                    setAlertModelo("ml-2 alinearizquierda textoalert");
                    setShowModalMensajes(true);
                    setTituloMensajes("Información del producto");
                    setTextoMensajes("Heey, Ingresa los datos del modelo!");
                    return;
                }
                if (!cilindrajeVehUno || cilindrajeVehUno == 0) {
                    setAlertCilindraje("ml-2 alinearizquierda textoalert");
                    setShowModalMensajes(true);
                    setTituloMensajes("Información del producto");
                    setTextoMensajes("Heey, Ingresa los datos del cilindraje!");
                    return;
                }

                let comparar =
                    "" +
                    tipoVehUno +
                    carroceriaVehUno +
                    marcaVehUno +
                    annoVehUno +
                    modeloVehUno +
                    cilindrajeVehUno +
                    transmisionVehUno +
                    combustibleVehUno +
                    traccionVehUno;

                //return

                const params = {
                    id: idVehiculosProducto,
                    idtipoproducto: idVehiculosProducto,
                    tipovehiculo: tipoVehUno,
                    carroceria: carroceriaVehUno,
                    marca: marcaVehUno,
                    anno: annoVehUno,
                    modelo: modeloVehUno,
                    cilindraje: cilindrajeVehUno,
                    transmision: transmisionVehUno,
                    combustible: combustibleVehUno,
                    traccion: traccionVehUno,
                    selecttipo: tipoVehSelec,
                    selectcarroceria: carroceriaVehSelec,
                    selectmarca: marcaVehSelec,
                    selectanno: annoVehSelec,
                    selectmodelo: modeloVehSelec,
                    selectcilindraje: cilindrajeVehSelec,
                    selecttransmision: transmisionVehSelec,
                    selectcombustible: combustibleVehSelec,
                    selecttraccion: traccionVehSelec,
                    estado: 1,
                    comparar: comparar,
                    fecha: fechaactual,
                };

                if (arrayVehiculosTemporal.length == 0) {
                    setTipoVehUno(tipoVehUno);
                    setHabilitarTipo(true);
                }

                if (duplicarprd == 0) {
                    await axios({
                        method: "post",
                        url: "https://gimcloud.com.co/mrp/api/32",
                        params,
                    })
                        .then((res) => {
                            console.log("Producto Temporal OK: ", res.data);
                            setDuplicarProducto(false);
                            setMarcarItemDuplicar(0);
                        })
                        .catch(function (error) {
                            console.log("Producto Temporal Error: ", res.data);
                        });
                } else if (duplicarprd == 2) {
                    let nvoarray = [];
                    let vehproductos = JSON.parse(
                        localStorage.getItem("vehproductos")
                    );

                    const params = {
                        id: arrayVehiculosTemporal[0].idproductovehiculo,
                        tipovehiculo: tipoVehUno,
                        carroceria: carroceriaVehUno,
                        marca: marcaVehUno,
                        anno: annoVehUno,
                        modelo: modeloVehUno,
                        cilindraje: cilindrajeVehUno,
                        transmision: transmisionVehUno,
                        combustible: combustibleVehUno,
                        traccion: traccionVehUno,
                        selecttipo: tipoVehSelec,
                        selectcarroceria: carroceriaVehSelec,
                        selectmarca: marcaVehSelec,
                        selectanno: annoVehSelec,
                        selectmodelo: modeloVehSelec,
                        selectcilindraje: cilindrajeVehSelec,
                        selecttransmision: transmisionVehSelec,
                        selectcombustible: combustibleVehSelec,
                        selecttraccion: traccionVehSelec,
                        estado: 1,
                        comparar: comparar,
                        fecha: fechaactual,
                    };

                    let vehdupl = {
                        anno: annoVehUno,
                        carroceria: carroceriaVehUno,
                        cilindraje: cilindrajeVehUno,
                        combustible: annoVehUno,
                        comparar: comparar,
                        compatible: vehproductos[0].compatible,
                        estado: 1,
                        fecha: vehproductos[0].fecha,
                        id: vehproductos[0].id,
                        idprd: vehproductos[0].idprd,
                        idproducto: vehproductos[0].idproducto,
                        idproductovehiculo: vehproductos[0].idproductovehiculo,
                        idtipoproducto: vehproductos[0].idtipoproducto,
                        marca: marcaVehUno,
                        modelo: modeloVehUno,
                        selectanno: annoVehSelec,
                        selectcarroceria: carroceriaVehSelec,
                        selectcilindraje: cilindrajeVehSelec,
                        selectcombustible: combustibleVehSelec,
                        selectmarca: marcaVehSelec,
                        selectmodelo: modeloVehSelec,
                        selecttipo: tipoVehSelec,
                        selecttraccion: traccionVehSelec,
                        selecttransmision: transmisionVehSelec,
                        tipovehiculo: tipoVehSelec,
                        traccion: traccionVehUno,
                        transmision: transmisionVehUno,
                    }

                    vehproductos.push(vehdupl);

                    arrayVehiculosTemporal &&
                        arrayVehiculosTemporal.map((items) => {
                            nvoarray.push(items);
                        });
                    nvoarray.push(params);
                    setArrayVehiculosTemporal(nvoarray);
                    localStorage.setItem("vehproductos", JSON.stringify(vehproductos));
                    setDuplicarProducto(false);
                    setMarcarItemDuplicar(0);
                }
            };
            creaVehiculoTemporal();
        }
    }, [controlGrabar]);

    const guardarVehiculo = () => {
        let continuar = true;
        let vehiculo;

        if (!traccionVehUno || traccionVehUno == 0) setTraccionVehSelec("");

        if (!transmisionVehUno || transmisionVehUno == 0)
            setTransmisionVehSelec("");

        if (tipoVehUno == 3 || tipoVehUno == 4) {
            vehiculo =
                "" +
                tipoVehUno +
                carroceriaVehUno +
                marcaVehUno +
                annoVehUno +
                modeloVehUno +
                cilindrajeVehUno +
                transmisionVehUno +
                combustibleVehUno +
                traccionVehUno;
        } else if (
            tipoVehUno == 1 ||
            tipoVehUno == 3 ||
            tipoVehUno == 4 ||
            tipoVehUno == 6
        ) {
            vehiculo =
                "" +
                tipoVehUno +
                carroceriaVehUno +
                marcaVehUno +
                annoVehUno +
                modeloVehUno +
                cilindrajeVehUno +
                transmisionVehUno +
                combustibleVehUno +
                traccionVehUno;
        } else {
            vehiculo =
                "" +
                tipoVehUno +
                carroceriaVehUno +
                marcaVehUno +
                annoVehUno +
                modeloVehUno +
                cilindrajeVehUno +
                transmisionVehUno +
                combustibleVehUno +
                traccionVehUno;
        }

        if (valida) {
            arrayVehiculosTemporal &&
                arrayVehiculosTemporal.map((items) => {
                    //console.log("COMPARA : ", vehiculo, " - ", items.comparar);
                    if (items.comparar === vehiculo) {
                        console.log(
                            "VEHICULOS IGUALES : ",
                            items.comparar,
                            " : ",
                            vehiculo
                        );
                        setShowModalMensajes(true);
                        setTituloMensajes("Información del producto");
                        setTextoMensajes(
                            "Heey, No puedes grabar dos vehícuos iguales!"
                        );
                        continuar = false;
                        return;
                        setcontrolGrabar(false);
                    }
                });
        } else setCambia(false);

        if (continuar) {
            setAgregarVehiculo(true);
            setControlAgregarVehiculo(true);
            setTipoVehUno(tipoVehUno);
            setMarcaVehUno(marcaVehUno);
            setAnnoVehUno(annoVehUno);
            setModeloVehUno(modeloVehUno);
            setcilindrajeVehUno(cilindrajeVehUno);
            setCarroceriaVehUno(carroceriaVehUno);
            settransmisionVehUno(transmisionVehUno);
            setcombustibleVehUno(combustibleVehUno);

            if (!traccionVehUno) settraccionVehUno(0);
            else settraccionVehUno(traccionVehUno);

            setcontrolGrabar(true);
        }
    };

    let transmision = [
        { label: "Automática", value: 1 },
        { label: "Manual", value: 2 },
    ];

    let combustible = [
        { label: "Gasolina", value: 1 },
        { label: "Diesel", value: 2 },
        { label: "Gasolina – Gas", value: 3 },
        { label: "Gasolina – Eléctrico", value: 4 },
    ];

    let tipotraccion = [
        { label: "Tracción Delantera", value: 1 },
        { label: "Tracción Trasera", value: 2 },
        { label: "Tracción 4x4", value: 3 },
    ];

    let turbocompresor = [
        { label: "Turbo Sencillo", value: 1 },
        { label: "Turbo Doble", value: 2 },
        { label: "Turbo de Doble Entrada", value: 3 },
        { label: "Turbo de Geometría Variable", value: 4 },
        { label: "Turbo Variable de Doble Entrada", value: 5 },
        { label: "Turbo Eléctrico", value: 6 },
        { label: "No Aplica", value: 7 },
    ];

    const activar = () => {
        setValida(true);
    };

    const handleChange = (selectedOptions) => {
        // Asigna el tipo de vehículo al state

        if (selectedOptions != tipoVehUno) activar();

        dispatch(getTypesVehicles(selectedOptions));

        let newTipo = [];
        newTipo.push(selectedOptions);

        if (selectedOptions == 3 || selectedOptions == 4) {
            setTraccionVehSelec("");
        }

        setEditarTipo(true);
        setTipoVehUno(newTipo[0]);
        setHabilitarCarroceria(false);
        setTipoVehUno(selectedOptions);

        let newDet = [];
        listCarrocerias &&
            listCarrocerias.forEach((row) => {
                if (
                    Number.parseInt(row.tipovehiculo) ===
                    Number.parseInt(selectedOptions)
                ) {
                    let item = {
                        id: row.id,
                        carroceria: row.carroceria,
                        tipoVeh: row.tipovehiculo,
                        estado: row.estado,
                        value: row.id,
                        label: row.carroceria,
                    };
                    newDet.push(item);
                }
            });

        setCarrocerias(newDet);

        if (selectedOptions == 3 || selectedOptions == 4) {
            setShowTransmision(true);
            setTransmisionVehSelec("");
            setShowTraccion(true);
            setTraccionVehSelec("");
        } else if (
            selectedOptions == 1 ||
            selectedOptions == 3 ||
            selectedOptions == 4 ||
            selectedOptions == 6
        ) {
            setShowTransmision(true);
            setTransmisionVehSelec("Transmisión");
            setTraccionVehSelec("");
            setShowTransmision(true);
        } else {
            setShowTransmision(true);
            setShowTraccion(true);
            setTransmisionVehSelec("Transmisión");
            setTraccionVehSelec("Tracción");
        }
    };

    const handleChangeCarroceria = (selectedOptions) => {
        if (selectedOptions != carroceriaVehUno) activar();

        setEditarCarroceria(true);
        setEditarCarroceriaVeh(selectedOptions);
        setCarroceriaVehUno(selectedOptions);

        listCarrocerias &&
            listCarrocerias.forEach((row) => {
                if (
                    Number.parseInt(row.id) === Number.parseInt(selectedOptions)
                ) {
                    setNombreCarroceriaVeh(row.carroceria);
                }
            });
        let newDet = [];
        listMarcas &&
            listMarcas.forEach((row) => {
                if (
                    Number.parseInt(row.tipovehiculo) ===
                    Number.parseInt(tipoVehUno) &&
                    Number.parseInt(row.carroceria) ===
                    Number.parseInt(selectedOptions)
                ) {
                    let item = {
                        id: row.id,
                        text: row.text,
                        tipoVeh: row.tipovehiculo,
                        carroceria: row.carroceria,
                        estado: row.estado,
                        url: row.url,
                    };
                    newDet.push(item);
                }
            });
        setMarcas(newDet);
        setMarcasInicia(newDet);
        setHabilitarMarca(false);
    };

    useEffect(() => {
        if (!listaNuevasMarcas) {
            //console.log("DATO MARCA: ", codigoMarcaVeh);
            let newDetMod = [];
            listModelos &&
                listModelos.forEach((row) => {
                    if (
                        Number.parseInt(row.marca) ===
                        Number.parseInt(codigoMarcaVeh) &&
                        Number.parseInt(row.carroceria) ===
                        Number.parseInt(carroceriaVehUno)
                    ) {
                        let item = {
                            id: row.id,
                            modelo: row.modelo,
                            tipoVeh: row.tipovehiculo,
                            marca: row.marca,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            value: row.id,
                            label: row.modelo,
                        };
                        newDetMod.push(item);
                    }
                });
            //console.log("DATO MODELOS: ", newDetMod);
            setModels(newDetMod);
        }
    }, [listaNuevasMarcas]);

    useEffect(() => {
        if (!listaNuevosModelos) {
            //console.log("DATO MARCA: ", codigoMarcaVeh);
            let newDetCilindraje = [];
            listCilindrajes &&
                listCilindrajes.forEach((row) => {
                    if (
                        Number.parseInt(row.modelo) ===
                        Number.parseInt(codigoModeloVeh)
                    ) {
                        let item = {
                            id: row.id,
                            carroceria: row.carroceria,
                            tipoVeh: row.tipovehiculo,
                            estado: row.estado,
                            value: row.id,
                            label: row.cilindraje,
                            marca: row.marca,
                            modelo: row.modelo,
                        };

                        newDetCilindraje.push(item);
                    }
                });
            setCilindrajes(newDetCilindraje);
        }
    }, [listaNuevosModelos]);

    const handleChangeBrand = (selectedOptions) => {
        if (selectedOptions != marcaVehUno) activar();

        if (selectedOptions == "") {
            setValueMarca("");
            setMarcaVehSelec("");
        }

        if (!nuevoVehiculo || !marcaNoExiste) {
            setEditarMarcaVeh(selectedOptions);

            setMarcaVehUno(selectedOptions);

            setEditarMarca(true);

            listMarcas &&
                listMarcas.forEach((row) => {
                    if (
                        Number.parseInt(row.id) ===
                        Number.parseInt(selectedOptions)
                    ) {
                        setNombreMarcaVeh(row.text);
                        setMarcaVehUno(row.id);
                        setMarcaVehSelec(row.text);
                    }
                });

            let newDetMod = [];
            listModelos &&
                listModelos.forEach((row) => {
                    if (
                        Number.parseInt(row.marca) ===
                        Number.parseInt(selectedOptions) &&
                        Number.parseInt(row.carroceria) ===
                        Number.parseInt(carroceriaVehUno)
                    ) {
                        let item = {
                            id: row.id,
                            modelo: row.modelo,
                            tipoVeh: row.tipovehiculo,
                            marca: row.marca,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            value: row.id,
                            label: row.modelo,
                        };
                        newDetMod.push(item);
                    }
                });
            setModels(newDetMod);
            setHabilitarAnno(false);
        } else {
            if (selectedOptions) {
                let codigomarca = 0;
                let selectmarca = [];

                marcas &&
                    marcas.map((row, index) => {
                        if (row.text == selectedOptions) selectmarca.push(row);
                    });

                let mayusculas = selectedOptions.toUpperCase();

                const newDet = [];
                listMarcas &&
                    listMarcas.forEach((row) => {
                        if (
                            Number.parseInt(row.tipovehiculo) ===
                            Number.parseInt(tipoVehUno) &&
                            Number.parseInt(row.carroceria) ===
                            Number.parseInt(carroceriaVehUno)
                        ) {
                            let item = {
                                id: row.id,
                                text: row.text,
                                tipoVeh: row.tipovehiculo,
                                carroceria: row.carroceria,
                                estado: row.estado,
                                url: row.url,
                            };
                            newDet.push(item);
                        }
                    });
                setMarcas(newDet);

                let filtromarcas =
                    newDet &&
                    newDet
                        .filter((item) => item.text.includes(mayusculas))
                        .map((filteredCilindraje) => filteredCilindraje);

                let arrayWord = [];
                let compara;
                let word;
                for (var i = 0; i < filtromarcas.length; i++) {
                    word = filtromarcas[i].text;

                    for (var x = 0; x < word.length; x++) {
                        if (mayusculas.length == 1) compara = word.substr(x, 1);
                        else if (mayusculas.length == 2)
                            compara = word.substr(x, 2);
                        else if (mayusculas.length == 3)
                            compara = word.substr(x, 3);
                        else if (mayusculas.length == 4)
                            compara = word.substr(x, 4);
                        else if (mayusculas.length == 5)
                            compara = word.substr(x, 5);
                        else if (mayusculas.length == 6)
                            compara = word.substr(x, 6);
                        else if (mayusculas.length == 7)
                            compara = word.substr(x, 7);
                        else if (mayusculas.length == 8)
                            compara = word.substr(x, 8);

                        if (compara == mayusculas) {
                            let item = {
                                carroceria: filtromarcas[i].carroceria,
                                estado: filtromarcas[i].estado,
                                id: filtromarcas[i].id,
                                text: filtromarcas[i].text,
                                tipoVeh: filtromarcas[i].tipoVeh,
                                url: filtromarcas[i].url,
                                posicion: x,
                            };
                            arrayWord.push(item);
                        }
                    }
                }

                arrayWord.sort((a, b) => {
                    if (a.posicion < b.posicion) {
                        return -1;
                    }
                    if (a.posicion > b.posicion) {
                        return 1;
                    }
                    return 0;
                });

                setMarcas(arrayWord);

                setMarcaVehSelec(selectedOptions);
                setSelectMarcaEdit(selectedOptions);
                setValueMarca(selectedOptions);
                setMarcaVehUno(300001);
                setEditarMarcaVeh(300001);
                setMarcaVehUno(300001);
                setEditarMarca(true);

                if (nuevoVehiculo) setMarcaNoExiste(true);

                if (selectmarca.length > 0) {
                    codigomarca = selectmarca[0].id;
                } else {
                    codigomarca = 0;
                }

                let leemarca = false;
                listMarcas &&
                    listMarcas.forEach((row) => {
                        if (
                            Number.parseInt(row.id) ===
                            Number.parseInt(codigomarca)
                        ) {
                            setNombreMarcaVeh(row.text);
                            leemarca = true;
                        }
                    });

                let newDetMod = [];

                if (codigomarca > 0) {
                    listModelos &&
                        listModelos.map((row, index) => {
                            if (
                                Number.parseInt(row.marca) ===
                                Number.parseInt(codigomarca) &&
                                Number.parseInt(row.carroceria) ===
                                Number.parseInt(carroceriaVehUno)
                            ) {
                                let item = {
                                    id: row.id,
                                    modelo: row.modelo,
                                    tipoVeh: row.tipovehiculo,
                                    marca: row.marca,
                                    carroceria: row.carroceria,
                                    estado: row.estado,
                                    value: row.id,
                                    label: row.modelo,
                                };
                                newDetMod.push(item);
                            }
                        });
                }

                if (leemarca) setModels(newDetMod);
                else setModels([]);

                setHabilitarAnno(false);
            } else {
                setMarcas(marcasInicia);
            }
        }
    };

    const handleChangeAnno = (selectedOptions) => {
        if (selectedOptions != annoVehUno) activar();
        setAnnoVehUno(selectedOptions);
        setEditarAnnoVeh(selectedOptions);

        annos &&
            annos.forEach((row) => {
                if (
                    Number.parseInt(row.id) === Number.parseInt(selectedOptions)
                ) {
                    setNombreAnnoVeh(row.anovehiculo);
                }
            });

        setHabilitarModelo(false);
    };

    const handleChangeModels = (selectedOptions) => {
        if (selectedOptions != modeloVehUno) activar();

        if (!nuevoVehiculo && !marcaNoExiste) {
            //setEditarModeloVeh(selectedOptions);
            let newModelo = [];
            newModelo.push(selectedOptions);

            setModeloVehUno(newModelo[0]);
            setCilindrajeVehSelec("Cilindraje");

            listModelos &&
                listModelos.forEach((row) => {
                    if (
                        Number.parseInt(row.id) ===
                        Number.parseInt(selectedOptions)
                    ) {
                        setNombreModeloVeh(row.modelo);
                        setModeloVehSelec(row.modelo);
                        setModeloVehUno(row.id);
                    }
                });

            if (selectedOptions > 0) {
                let modelo = selectedOptions;

                let newDet = [];
                listCilindrajes &&
                    listCilindrajes.forEach((row) => {
                        if (
                            Number.parseInt(row.modelo) ==
                            Number.parseInt(modelo)
                        ) {
                            let item = {
                                id: row.id,
                                carroceria: row.carroceria,
                                tipoVeh: row.tipovehiculo,
                                estado: row.estado,
                                value: row.id,
                                label: row.cilindraje,
                                marca: row.marca,
                                modelo: row.modelo,
                            };
                            newDet.push(item);
                        }
                    });

                setCilindrajes(newDet);
            }

            setHabilitarCilindraje(false);
        } else {
            let codigomodelo = 0;
            let selectmodelo = [];

            //setModeloVehSelec(selectedOptions);
            setValueModelo(selectedOptions);
            setModeloVehUno(300001);
            if (nuevoVehiculo) setMarcaNoExiste(true);

            if (selectmodelo.length > 0) codigomodelo = selectmodelo[0].id;
            else codigomodelo = 0;

            let newModelo = [];
            newModelo.push(codigomodelo);

            let leemodelo = false;
            listModelos &&
                listModelos.forEach((row) => {
                    if (
                        Number.parseInt(row.id) ===
                        Number.parseInt(codigomodelo)
                    ) {
                        setNombreModeloVeh(row.modelo);
                        leemodelo = true;
                    }
                });

            let newDet = [];

            if (codigomodelo > 0) {
                let modelo = codigomodelo;

                listCilindrajes &&
                    listCilindrajes.forEach((row) => {
                        if (
                            Number.parseInt(row.modelo) ==
                            Number.parseInt(modelo)
                        ) {
                            let item = {
                                id: row.id,
                                carroceria: row.carroceria,
                                tipoVeh: row.tipovehiculo,
                                estado: row.estado,
                                value: row.id,
                                label: row.cilindraje,
                                marca: row.marca,
                                modelo: row.modelo,
                            };
                            newDet.push(item);
                        }
                    });
            }

            if (leemodelo) setCilindrajes(newDet);
            else setCilindrajes([]);

            setHabilitarCilindraje(false);
        }
    };

    const handleChangeVersionMotor = (selectedOptions) => {
        if (selectedOptions != cilindrajeVehUno) activar();

        if (!nuevoVehiculo && !marcaNoExiste) {
            setcilindrajeVehUno(selectedOptions);

            listCilindrajes.forEach((row) => {
                if (
                    Number.parseInt(row.id) === Number.parseInt(selectedOptions)
                ) {
                    setNombreCilindrajesVeh(row.cilindraje);
                    setCilindrajeVehSelec(row.cilindraje);
                    setcilindrajeVehUno(row.id);
                }
            });
        } else {
            let validarid;
            let haycaracterid = false;
            let dato = selectedOptions;

            for (var i = 0; i < dato.length; i++) {
                validarid = selectedOptions.substr(i, 1);
                if (
                    validarid != 0 &&
                    validarid != 1 &&
                    validarid != 2 &&
                    validarid != 3 &&
                    validarid != 4 &&
                    validarid != 5 &&
                    validarid != 6 &&
                    validarid != 7 &&
                    validarid != 8 &&
                    validarid != 9
                ) {
                    haycaracterid = true;
                    console.log("CARACTER", i, validarid);
                } else console.log("ES UN NUMERO ", i, validarid);
            }

            if (haycaracterid) {
                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes("Heey, el cilindraje solo acepta numeros!");
                dato = "";
                return;
            }

            if (!selectedOptions) {
                setCilindrajeVehSelec("Cilindraje");
            }

            let codigocilindraje = 0;
            let selectcilindraje = [];

            setNombreCilindrajesVeh(selectedOptions);
            setCilindrajeVehSelec(selectedOptions);
            setValueCilindraje(selectedOptions);
            setcilindrajeVehUno(300001);
            setcilindrajeVehUno(300001);

            if (nuevoVehiculo) setMarcaNoExiste(true);

            if (selectedOptions.length > 0) {
                codigocilindraje = selectedOptions;
            } else {
                codigocilindraje = 0;
            }

            listCilindrajes &&
                listCilindrajes.forEach((row) => {
                    if (
                        Number.parseInt(row.id) ===
                        Number.parseInt(codigocilindraje)
                    ) {
                        setNombreCilindrajesVeh(row.cilindraje);
                    }
                });

            if (tipoVehUno == 3) {
                setShowTransmision(true);
                setShowTraccion(true);
                setTransmisionVehSelec("");
                setTraccionVehSelec("");
                setHabilitarCombustible(false);
            } else if (tipoVehUno == 1 || tipoVehUno == 6) {
                setNombreTraccionVeh("");
                setTransmisionVehSelec("Transmisión");
                setShowTransmision(false);
            }
        }
    };

    const handleChangeTransmision = (selectedOptions) => {
        if (selectedOptions != transmisionVehUno) activar();

        settransmisionVehUno(selectedOptions);

        if (selectedOptions == 1) {
            setNombreTransmisionVeh("Automática");
            setTransmisionVehSelec("Automática");
        } else if (selectedOptions == 2) {
            setNombreTransmisionVeh("Manual");
            setTransmisionVehSelec("Manual");
        } else {
            setNombreTransmisionVeh("");
            setTransmisionVehSelec("");
        }

        setHabilitarCombustible(false);
    };

    const handleChangeCombustible = (selectedOptions) => {
        if (selectedOptions != combustibleVehUno) activar();

        setcombustibleVehUno(selectedOptions);

        if (selectedOptions == 1) {
            setNombreCombustibleVeh("Gasolina");
            setCombustibleVehSelec("Gasolina");
        } else if (selectedOptions == 2) {
            setNombreCombustibleVeh("Diesel");
            setCombustibleVehSelec("Diesel");
        } else if (selectedOptions == 3) {
            setNombreCombustibleVeh("Gasolina - Gas");
            setCombustibleVehSelec("Gasolina - Gas");
        } else if (selectedOptions == 4) {
            setNombreCombustibleVeh("Gasolina – Eléctrico");
            setCombustibleVehSelec("Gasolina – Eléctrico");
        } else {
            setNombreCombustibleVeh("");
            setCombustibleVehSelec("");
        }

        if (tipoVehUno == 1 || tipoVehUno == 3 || tipoVehUno == 6) {
            setNombreTraccionVeh("");
            settraccionVehUno(0);
        }

        if (tipoVehUno == 1 || tipoVehUno == 3 || tipoVehUno == 6) {
            setShowTraccion(true);
        } else {
            setShowTraccion(false);
        }
    };

    const handleChangeTraccion = (selectedOptions) => {
        if (selectedOptions != traccionVehUno) activar();

        settraccionVehUno(selectedOptions);

        if (selectedOptions == 1) {
            setNombreTraccionVeh("Tracción Delantera");
            setTraccionVehSelec("Tracción Delantera");
        } else if (selectedOptions == 2) {
            setNombreTraccionVeh("Tracción Trasera");
            setTraccionVehSelec("Tracción Trasera");
        } else if (selectedOptions == 3) {
            setNombreTraccionVeh("Tracción 4x4");
            setTraccionVehSelec("Tracción 4x4");
        } else if (selectedOptions == 4) {
            setNombreTraccionVeh("");
            setTraccionVehSelec("");
        }
    };

    useEffect(() => {
        if (continuarRegistro) {
            setShowModalMensajesValidar(false);
            setContinuarRegistro(false);
        }
    }, [continuarRegistro]);

    useEffect(() => {
        setShowModalMensajesEliminar(false);

        if (continuarEliminar) eliminaDatosVehiculosAgregado();
    }, [continuarEliminar, abandonarEliminar]);

    useEffect(() => {
        setShowModalMensajesTipoVeh(false);

        if (asignarTipo) {
            dispatch(getTypesVehicles(tipoVehUno));
            setAsignarTipo(false);
            setConservarTipo(false);
        }
    }, [asignarTipo, conservarTipo]);

    useEffect(() => {
        if (abandonarRegistro) {
            setShowModalMensajesValidar(false);
            setAbandonarRegistro(false);
            setDuplicarProducto(false);
            setMarcarItemDuplicar(0);
        }
    }, [abandonarRegistro]);

    useEffect(() => {
        if (abandonarEliminar) {
            setShowModalMensajesEliminar(false);
            setAbandonarEliminar(false);
            setHabilitarTipo(false);
            setHabilitarCarroceria(true);
            setHabilitarMarca(true);
            setHabilitarAnno(true);
            setHabilitarModelo(true);
            setHabilitarCilindraje(true);
            setHabilitarCombustible(true);
            setShowTransmision(true);
            setShowTraccion(true);
        }
    }, [abandonarEliminar]);

    const validaEliminaDatosVehiculosDuplicar = () => {
        let cambio = false;

        if (!valida) {
            setShowModalMensajesValidar(false);
            setDuplicarProducto(false);
            setMarcarItemDuplicar(false);
            return;
        }

        if (
            marcaVehUno === marcaVehDuplica &&
            annoVehUno === annoVehDuplica &&
            modeloVehUno === modeloVehDuplica &&
            cilindrajeVehUno === cilindrajesVehDuplica &&
            carroceriaVehUno === carroceriaVehDuplica &&
            transmisionVehUno === transmisionVehDuplica &&
            combustibleVehUno === combustibleVehDuplica &&
            traccionVehUno === traccionVehDuplica
        ) {
            setShowModalMensajesValidar(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "¿Quieres cerrar el formulario? Si cierras los cambios no se guardaran!"
            );
        } else if (
            marcaVehUno != marcaVehDuplica ||
            annoVehUno != annoVehDuplica ||
            modeloVehUno != modeloVehDuplica ||
            cilindrajeVehUno != cilindrajesVehDuplica ||
            carroceriaVehUno != carroceriaVehDuplica ||
            transmisionVehUno != transmisionVehDuplica ||
            combustibleVehUno != combustibleVehDuplica ||
            traccionVehUno != traccionVehDuplica
        ) {
            setShowModalMensajesValidar(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "¿Quieres cerrar el formulario? Si cierras los cambios no se guardaran!"
            );
        } else setDuplicarProducto(false);
    };

    const eliminaDatosVehiculosAgregado = () => {
        if (continuarEliminar) {
            setcontrolGrabar(false);
            setControlAgregarVehiculo(true);
            setDuplicar(false);
            setTipoVehUno(0);
            setMarcaVehUno(0);
            setAnnoVehUno(0);
            setModeloVehUno(0);
            setCarroceriaVehUno(0);
            setcilindrajeVehUno(0);
            settransmisionVehUno(0);
            setcombustibleVehUno(0);
            settraccionVehUno(0);

            let count = 0;

            let vehiculo = "000000000";
            const Detveh = vehiculosSeleccionados;

            {
                Detveh &&
                    Detveh.map((items, index) => {
                        if (index == 0) {
                            setVehiculosSeleccionados(vehiculo);
                        } else {
                            setVehiculosSeleccionados(items);
                        }
                    });
            }

            setContinuarEliminar(false);
            setAbandonarEliminar(false);
            setEliminoDatos(true);
            setAgregarVehiculo(true);
            setVehiculoUnoDuplicar(false);
        }
    };

    const onClickTipo = () => {
        setAlertTipo("ml-2 alinearizquierda");
    };

    const onClickCarroceria = () => {
        setAlertCarroceria("ml-2 alinearizquierda");
    };

    const onClickMarca = () => {
        if (!listaNuevasMarcas) setListaNuevasMarcas(true);

        if (marcas.length == 0) {
            const newDet = [];
            listMarcas &&
                listMarcas.forEach((row) => {
                    if (
                        Number.parseInt(row.tipovehiculo) ===
                        Number.parseInt(tipoVehUno) &&
                        Number.parseInt(row.carroceria) ===
                        Number.parseInt(carroceriaVehUno)
                    ) {
                        let item = {
                            id: row.id,
                            text: row.text,
                            tipoVeh: row.tipovehiculo,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            url: row.url,
                        };
                        newDet.push(item);
                    }
                });
            setMarcas(newDet);
        }

        setOpenMarca(true);
        if (marcaVehSelec != "Marca") setValueMarca(marcaVehSelec);
        setAlertMarca("ml-2 alinearizquierda");
    };

    const onClickAnno = () => {
        setAlertAnno("tamañocajaoptionsitemssearch");
    };

    const onClickModelo = () => {
        if (!listaNuevosModelos) setListaNuevosModelos(true);

        if (!marcaNoExiste) {
            let newDetMod = [];
            listModelos &&
                listModelos.forEach((row) => {
                    if (
                        Number.parseInt(row.marca) ===
                        Number.parseInt(marcaVehUno) &&
                        Number.parseInt(row.carroceria) ===
                        Number.parseInt(carroceriaVehUno)
                    ) {
                        let item = {
                            id: row.id,
                            modelo: row.modelo,
                            tipoVeh: row.tipovehiculo,
                            marca: row.marca,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            value: row.id,
                            label: row.modelo,
                        };
                        newDetMod.push(item);
                    }
                });
            setModels(newDetMod);
        }

        setOpenModelo(true);
        if (modeloVehSelec != "Modelo") setValueModelo(modeloVehSelec);
        setAlertModelo("ml-2 alinearizquierda");
    };

    const onClickCilindraje = () => {
        if (!listaNuevosCilindraje) setListaNuevosCilindraje(true);

        setOpenCilindraje(true);
        if (cilindrajeVehSelec != "Cilindraje")
            setValueCilindraje(cilindrajeVehSelec);
        setAlertCilindraje("ml-2 alinearizquierda");
    };

    const onClickTransmision = () => {
        setAlertTransmision("ml-2 alinearizquierda");
    };

    const onClickCombustible = () => {
        setAlertCombustible("ml-2 alinearizquierda");
    };

    const onClickTraccion = () => {
        setAlertTraccion("ml-2 alinearizquierda");
    };

    const grabarDatosVehiculosTodo = () => {
        if (!tipoVehUno) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Heey, Selecciona el tipo de vehículo!");
            return;
        }

        if (!tipoVehUno) {
            setAlertTipo("ml-2 alinearizquierda textoalert");
        }

        if (!carroceriaVehUno) {
            setAlertCarroceria("ml-2 alinearizquierda textoalert");
        }

        if (!marcaVehUno && !marcaNoExiste) {
            setAlertMarca("ml-2 alinearizquierda textoalert");
        }

        if (!annoVehUno) {
            setAlertAnno("ml-2 alinearizquierda textoalert");
        }

        if (!modeloVehUno && !marcaNoExiste) {
            setAlertModelo("ml-2 alinearizquierda textoalert");
        }

        if (!cilindrajeVehUno && !marcaNoExiste) {
            setAlertCilindraje("ml-2 alinearizquierda textoalert");
        }

        if (tipoVehUno != 3)
            if (!transmisionVehUno || transmisionVehUno == 0) {
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

        if (!combustibleVehUno) {
            setAlertCombustible("ml-2 alinearizquierda textoalert");
        }

        if (tipoVehUno != 1 && tipoVehUno != 6 && tipoVehUno != 3)
            if (!traccionVehUno || traccionVehUno == 0) {
                setAlertTraccion("ml-2 alinearizquierda textoalert");
            }

        if (tipoVehUno == 1 || tipoVehUno == 6) {
            if (
                (!marcaVehUno && !marcaNoExiste) ||
                !annoVehUno ||
                (!modeloVehUno && !marcaNoExiste) ||
                (!cilindrajeVehUno && !marcaNoExiste) ||
                !carroceriaVehUno ||
                !transmisionVehUno ||
                !combustibleVehUno
            ) {
                let texto =
                    "Heey, Todos los datos del vehículo son requeridos!";
                if (!carroceriaVehUno || carroceriaVehUno == 0) {
                    setAlertCarroceria("ml-2 alinearizquierda textoalert");
                    setAlertMarca("ml-2 alinearizquierda textoalert");
                    setAlertAnno("ml-2 alinearizquierda textoalert");
                    setAlertModelo("ml-2 alinearizquierda textoalert");
                    setAlertCilindraje("ml-2 alinearizquierda textoalert");
                    setAlertCombustible("ml-2 alinearizquierda textoalert");
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                if (!!marcaVehUno || !marcaVehUno == 0) {
                    setAlertMarca("ml-2 alinearizquierda textoalert");
                    setAlertAnno("ml-2 alinearizquierda textoalert");
                    setAlertModelo("ml-2 alinearizquierda textoalert");
                    setAlertCilindraje("ml-2 alinearizquierda textoalert");
                    setAlertCombustible("ml-2 alinearizquierda textoalert");
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                if (!modeloVehUno || modeloVehUno == 0) {
                    setAlertAnno("ml-2 alinearizquierda textoalert");
                    setAlertModelo("ml-2 alinearizquierda textoalert");
                    setAlertCilindraje("ml-2 alinearizquierda textoalert");
                    setAlertCombustible("ml-2 alinearizquierda textoalert");
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                if (!cilindrajeVehUno || cilindrajeVehUno == 0) {
                    setAlertCilindraje("ml-2 alinearizquierda textoalert");
                    setAlertCombustible("ml-2 alinearizquierda textoalert");
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                if (!combustibleVehUno || combustibleVehUno == 0) {
                    setAlertCombustible("ml-2 alinearizquierda textoalert");
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                if (
                    (!traccionVehUno || traccionVehUno == 0) &&
                    tipoVehUno != 1 &&
                    tipoVehUno != 6 &&
                    tipoVehUno != 3
                ) {
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
                }

                if (
                    (!transmisionVehUno || transmisionVehUno == 0) &&
                    tipoVehUno != 3
                ) {
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes(texto);
                return;
            }
        } else if (tipoVehUno == 3) {
            if (
                (!marcaVehUno && !marcaNoExiste) ||
                !annoVehUno ||
                (!modeloVehUno && !marcaNoExiste) ||
                (!cilindrajeVehUno && !marcaNoExiste) ||
                !carroceriaVehUno ||
                !combustibleVehUno
            ) {
                let texto =
                    "Heey, Todos los datos del vehículo son requeridos!";
                if (!carroceriaVehUno || carroceriaVehUno == 0) {
                    setAlertCarroceria("ml-2 alinearizquierda textoalert");
                    setAlertMarca("ml-2 alinearizquierda textoalert");
                    setAlertAnno("ml-2 alinearizquierda textoalert");
                    setAlertModelo("ml-2 alinearizquierda textoalert");
                    setAlertCilindraje("ml-2 alinearizquierda textoalert");
                    setAlertCombustible("ml-2 alinearizquierda textoalert");
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                if (!!marcaVehUno || !marcaVehUno == 0) {
                    setAlertMarca("ml-2 alinearizquierda textoalert");
                    setAlertAnno("ml-2 alinearizquierda textoalert");
                    setAlertModelo("ml-2 alinearizquierda textoalert");
                    setAlertCilindraje("ml-2 alinearizquierda textoalert");
                    setAlertCombustible("ml-2 alinearizquierda textoalert");
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                if (!modeloVehUno || modeloVehUno == 0) {
                    setAlertAnno("ml-2 alinearizquierda textoalert");
                    setAlertModelo("ml-2 alinearizquierda textoalert");
                    setAlertCilindraje("ml-2 alinearizquierda textoalert");
                    setAlertCombustible("ml-2 alinearizquierda textoalert");
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                if (!cilindrajeVehUno || cilindrajeVehUno == 0) {
                    setAlertCilindraje("ml-2 alinearizquierda textoalert");
                    setAlertCombustible("ml-2 alinearizquierda textoalert");
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                if (!combustibleVehUno || combustibleVehUno == 0) {
                    setAlertCombustible("ml-2 alinearizquierda textoalert");
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                if (
                    (!traccionVehUno || traccionVehUno == 0) &&
                    tipoVehUno != 1 &&
                    tipoVehUno != 6 &&
                    tipoVehUno != 3
                ) {
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                if (
                    (!transmisionVehUno || transmisionVehUno == 0) &&
                    tipoVehUno != 3
                ) {
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes(texto);
                return;
            }
        } else {
            if (
                (!marcaVehUno && !marcaNoExiste) ||
                !annoVehUno ||
                (!modeloVehUno && !marcaNoExiste) ||
                (!cilindrajeVehUno && !marcaNoExiste) ||
                !carroceriaVehUno ||
                !transmisionVehUno ||
                !combustibleVehUno ||
                !traccionVehUno
            ) {
                let texto =
                    "Heey, Todos los datos del vehículo son requeridos!";
                if (!carroceriaVehUno || carroceriaVehUno == 0) {
                    setAlertCarroceria("ml-2 alinearizquierda textoalert");
                    setAlertMarca("ml-2 alinearizquierda textoalert");
                    setAlertAnno("ml-2 alinearizquierda textoalert");
                    setAlertModelo("ml-2 alinearizquierda textoalert");
                    setAlertCilindraje("ml-2 alinearizquierda textoalert");
                    setAlertCombustible("ml-2 alinearizquierda textoalert");
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                if (!!marcaVehUno || !marcaVehUno == 0) {
                    setAlertMarca("ml-2 alinearizquierda textoalert");
                    setAlertAnno("ml-2 alinearizquierda textoalert");
                    setAlertModelo("ml-2 alinearizquierda textoalert");
                    setAlertCilindraje("ml-2 alinearizquierda textoalert");
                    setAlertCombustible("ml-2 alinearizquierda textoalert");
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                if (!modeloVehUno || modeloVehUno == 0) {
                    setAlertAnno("ml-2 alinearizquierda textoalert");
                    setAlertModelo("ml-2 alinearizquierda textoalert");
                    setAlertCilindraje("ml-2 alinearizquierda textoalert");
                    setAlertCombustible("ml-2 alinearizquierda textoalert");
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                if (!cilindrajeVehUno || cilindrajeVehUno == 0) {
                    setAlertCilindraje("ml-2 alinearizquierda textoalert");
                    setAlertCombustible("ml-2 alinearizquierda textoalert");
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                if (!combustibleVehUno || combustibleVehUno == 0) {
                    setAlertCombustible("ml-2 alinearizquierda textoalert");
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                if (
                    (!traccionVehUno || traccionVehUno == 0) &&
                    tipoVehUno != 1 &&
                    tipoVehUno != 6 &&
                    tipoVehUno != 3
                ) {
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
                }

                if (
                    (!transmisionVehUno || transmisionVehUno == 0) &&
                    tipoVehUno != 3
                ) {
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes(texto);
                return;
            }
        }

        if (!marcaNoExiste) {
            if (editarCambioModelo == 3) {
                if (editarCambioCilindraje == 3) {
                    console.log("OK");
                } else {
                    if (!marcaVehUno || !modeloVehUno || !cilindrajeVehUno) {
                        let texto =
                            "Heey, Todos los datos del vehículo son requeridos!";
                        if (!carroceriaVehUno || carroceriaVehUno == 0) {
                            setAlertCarroceria(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertMarca("ml-2 alinearizquierda textoalert");
                            setAlertAnno("ml-2 alinearizquierda textoalert");
                            setAlertModelo("ml-2 alinearizquierda textoalert");
                            setAlertCilindraje(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertCombustible(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTraccion(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTransmision(
                                "ml-2 alinearizquierda textoalert"
                            );
                        }

                        if (!!marcaVehUno || !marcaVehUno == 0) {
                            setAlertMarca("ml-2 alinearizquierda textoalert");
                            setAlertAnno("ml-2 alinearizquierda textoalert");
                            setAlertModelo("ml-2 alinearizquierda textoalert");
                            setAlertCilindraje(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertCombustible(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTraccion(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTransmision(
                                "ml-2 alinearizquierda textoalert"
                            );
                        }

                        if (!modeloVehUno || modeloVehUno == 0) {
                            setAlertAnno("ml-2 alinearizquierda textoalert");
                            setAlertModelo("ml-2 alinearizquierda textoalert");
                            setAlertCilindraje(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertCombustible(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTraccion(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTransmision(
                                "ml-2 alinearizquierda textoalert"
                            );
                        }

                        if (!cilindrajeVehUno || cilindrajeVehUno == 0) {
                            setAlertCilindraje(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertCombustible(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTraccion(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTransmision(
                                "ml-2 alinearizquierda textoalert"
                            );
                        }

                        if (!combustibleVehUno || combustibleVehUno == 0) {
                            setAlertCombustible(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTraccion(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTransmision(
                                "ml-2 alinearizquierda textoalert"
                            );
                        }

                        if (
                            (!traccionVehUno || traccionVehUno == 0) &&
                            tipoVehUno != 1 &&
                            tipoVehUno != 6 &&
                            tipoVehUno != 3
                        ) {
                            setAlertTraccion(
                                "ml-2 alinearizquierda textoalert"
                            );
                        }

                        if (
                            (!transmisionVehUno || transmisionVehUno == 0) &&
                            tipoVehUno != 3
                        ) {
                            setAlertTransmision(
                                "ml-2 alinearizquierda textoalert"
                            );
                        }

                        setShowModalMensajes(true);
                        setTituloMensajes("Información del producto");
                        setTextoMensajes(texto);
                        return;
                    }
                }
            }

            if (editarCambioMarca == 2) {
                if (editarCambioModelo == 2 && editarCambioCilindraje == 2) {
                    console.log("OK");
                } else {
                    if (!marcaVehUno || !modeloVehUno || !cilindrajeVehUno) {
                        let texto =
                            "Heey, Todos los datos del vehículo son requeridos!";
                        if (!carroceriaVehUno || carroceriaVehUno == 0) {
                            setAlertCarroceria(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertMarca("ml-2 alinearizquierda textoalert");
                            setAlertAnno("ml-2 alinearizquierda textoalert");
                            setAlertModelo("ml-2 alinearizquierda textoalert");
                            setAlertCilindraje(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertCombustible(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTraccion(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTransmision(
                                "ml-2 alinearizquierda textoalert"
                            );
                        }

                        if (!!marcaVehUno || !marcaVehUno == 0) {
                            setAlertMarca("ml-2 alinearizquierda textoalert");
                            setAlertAnno("ml-2 alinearizquierda textoalert");
                            setAlertModelo("ml-2 alinearizquierda textoalert");
                            setAlertCilindraje(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertCombustible(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTraccion(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTransmision(
                                "ml-2 alinearizquierda textoalert"
                            );
                        }

                        if (!modeloVehUno || modeloVehUno == 0) {
                            setAlertAnno("ml-2 alinearizquierda textoalert");
                            setAlertModelo("ml-2 alinearizquierda textoalert");
                            setAlertCilindraje(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertCombustible(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTraccion(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTransmision(
                                "ml-2 alinearizquierda textoalert"
                            );
                        }

                        if (!cilindrajeVehUno || cilindrajeVehUno == 0) {
                            setAlertCilindraje(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertCombustible(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTraccion(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTransmision(
                                "ml-2 alinearizquierda textoalert"
                            );
                        }

                        if (!combustibleVehUno || combustibleVehUno == 0) {
                            setAlertCombustible(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTraccion(
                                "ml-2 alinearizquierda textoalert"
                            );
                            setAlertTransmision(
                                "ml-2 alinearizquierda textoalert"
                            );
                        }

                        if (
                            (!traccionVehUno || traccionVehUno == 0) &&
                            tipoVehUno != 1 &&
                            tipoVehUno != 6 &&
                            tipoVehUno != 3
                        ) {
                            setAlertTraccion(
                                "ml-2 alinearizquierda textoalert"
                            );
                        }

                        if (
                            (!transmisionVehUno || transmisionVehUno == 0) &&
                            tipoVehUno != 3
                        ) {
                            setAlertTransmision(
                                "ml-2 alinearizquierda textoalert"
                            );
                        }

                        setShowModalMensajes(true);
                        setTituloMensajes("Información del producto");
                        setTextoMensajes(texto);
                        return;
                    }
                }
            }
        }

        guardarVehiculo();
        if (nuevoVehiculo) {
            setcontrolGrabar(true);
        }
    };

    const guardarDatosVehiculosDuplicar = () => {
        //alert("DUPLIDDDA")
        //console.log("arrayDIPLUAS", arrayVehiculosTemporal)
        //return
        //AQUI

        if (
            marcaVehSelec == "Marca" &&
            modeloVehSelec == "Modelo" &&
            cilindrajeVehSelec == "Cilindraje"
        ) {
            setAlertMarca("ml-2 alinearizquierda textoalert");
            setAlertModelo("ml-2 alinearizquierda textoalert");
            setAlertCilindraje("ml-2 alinearizquierda textoalert");
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Heey, Debes ingresar Marca, Modelo y Cilindraje!"
            );
            return;
        } else if (
            modeloVehSelec == "Modelo" &&
            cilindrajeVehSelec == "Cilindraje"
        ) {
            setAlertModelo("ml-2 alinearizquierda textoalert");
            setAlertCilindraje("ml-2 alinearizquierda textoalert");
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Heey, Debes ingresar Modelo y Cilindraje!");
            return;
        } else if (cilindrajeVehSelec == "Cilindraje") {
            setAlertCilindraje("ml-2 alinearizquierda textoalert");
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Heey, Debes ingresar Cilindraje!");
            return;
        } else if (marcaVehSelec == "Marca") {
            setAlertMarca("ml-2 alinearizquierda textoalert");
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Heey, Debes ingresar la marca del vehículo!");
            return;
        } else if (modeloVehSelec == "Modelo") {
            setAlertModelo("ml-2 alinearizquierda textoalert");
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Heey, Debes ingresar el modelo del vehículo!");
            return;
        } else if (cilindrajeVehSelec == "Cilindraje") {
            setAlertCilindraje("ml-2 alinearizquierda textoalert");
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Heey, Debes ingresar el cilindraje del vehículo!"
            );
            return;
        }

        if (!valida) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Heey, No puedes grabar dos vehícuos iguales!");
            return;
        }

        let count = 0;

        if (!marcaVehUno && !modeloVehUno && !cilindrajeVehUno) {
            let texto = "Heey, Todos los datos del vehículo son requeridos!";
            if (!carroceriaVehUno || carroceriaVehUno == 0) {
                setAlertCarroceria("ml-2 alinearizquierda textoalert");
                setAlertMarca("ml-2 alinearizquierda textoalert");
                setAlertAnno("ml-2 alinearizquierda textoalert");
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!!marcaVehUno || !marcaVehUno == 0) {
                setAlertMarca("ml-2 alinearizquierda textoalert");
                setAlertAnno("ml-2 alinearizquierda textoalert");
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!modeloVehUno || modeloVehUno == 0) {
                setAlertAnno("ml-2 alinearizquierda textoalert");
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!cilindrajeVehUno || cilindrajeVehUno == 0) {
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!combustibleVehUno || combustibleVehUno == 0) {
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (
                (!traccionVehUno || traccionVehUno == 0) &&
                tipoVehUno != 1 &&
                tipoVehUno != 6 &&
                tipoVehUno != 3
            ) {
                setAlertTraccion("ml-2 alinearizquierda textoalert");
            }

            if (
                (!transmisionVehUno || transmisionVehUno == 0) &&
                tipoVehUno != 3
            ) {
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            setAlertMarca("ml-2 alinearizquierda textoalert");
            setAlertModelo("ml-2 alinearizquierda textoalert");
            setAlertCilindraje("ml-2 alinearizquierda textoalert");
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(texto);
            return;
        }

        if (!modeloVehUno && !cilindrajeVehUno) {
            let texto = "Heey, Todos los datos del vehículo son requeridos!";
            if (!carroceriaVehUno || carroceriaVehUno == 0) {
                setAlertCarroceria("ml-2 alinearizquierda textoalert");
                setAlertMarca("ml-2 alinearizquierda textoalert");
                setAlertAnno("ml-2 alinearizquierda textoalert");
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!!marcaVehUno || !marcaVehUno == 0) {
                setAlertMarca("ml-2 alinearizquierda textoalert");
                setAlertAnno("ml-2 alinearizquierda textoalert");
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!modeloVehUno || modeloVehUno == 0) {
                setAlertAnno("ml-2 alinearizquierda textoalert");
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!cilindrajeVehUno || cilindrajeVehUno == 0) {
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!combustibleVehUno || combustibleVehUno == 0) {
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (
                (!traccionVehUno || traccionVehUno == 0) &&
                tipoVehUno != 1 &&
                tipoVehUno != 6 &&
                tipoVehUno != 3
            ) {
                setAlertTraccion("ml-2 alinearizquierda textoalert");
            }

            if (
                (!transmisionVehUno || transmisionVehUno == 0) &&
                tipoVehUno != 3
            ) {
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            setAlertModelo("ml-2 alinearizquierda textoalert");
            setAlertCilindraje("ml-2 alinearizquierda textoalert");
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(texto);
            return;
        }

        if (!cilindrajeVehUno) {
            let texto = "Heey, Todos los datos del vehículo son requeridos!";
            if (!carroceriaVehUno || carroceriaVehUno == 0) {
                setAlertCarroceria("ml-2 alinearizquierda textoalert");
                setAlertMarca("ml-2 alinearizquierda textoalert");
                setAlertAnno("ml-2 alinearizquierda textoalert");
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!!marcaVehUno || !marcaVehUno == 0) {
                setAlertMarca("ml-2 alinearizquierda textoalert");
                setAlertAnno("ml-2 alinearizquierda textoalert");
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!modeloVehUno || modeloVehUno == 0) {
                setAlertAnno("ml-2 alinearizquierda textoalert");
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!cilindrajeVehUno || cilindrajeVehUno == 0) {
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!combustibleVehUno || combustibleVehUno == 0) {
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (
                (!traccionVehUno || traccionVehUno == 0) &&
                tipoVehUno != 1 &&
                tipoVehUno != 6 &&
                tipoVehUno != 3
            ) {
                setAlertTraccion("ml-2 alinearizquierda textoalert");
            }

            if (
                (!transmisionVehUno || transmisionVehUno == 0) &&
                tipoVehUno != 3
            ) {
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            setAlertCilindraje("ml-2 alinearizquierda textoalert");
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(texto);
            return;
        }

        grabarDatosVehiculosTodo();
    };

    return (
        <div className="mt-2 ml-10">
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <ModalMensajesValidar
                shown={showModalMensajesValidar}
                setContinuarRegistro={setContinuarRegistro}
                setAbandonarRegistro={setAbandonarRegistro}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <ModalMensajesEliminar
                shown={showModalMensajesEliminar}
                setContinuarEliminar={setContinuarEliminar}
                setAbandonarEliminar={setAbandonarEliminar}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <ModalMensajesTipoVehiculo
                shown={showModalMensajesTipoVeh}
                setAsignarTipo={setAsignarTipo}
                setConservarTipo={setConservarTipo}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                mensajeAlterno={textoMensajesAlterno}
                tipo="1"
            />

            <Row>
                <div className="ml-15">
                    <Row>
                        <Col xl={10} lg={10} md={10} xs={10}>
                            <div>
                                <Dropdown
                                    onSelect={handleChange}
                                    onClick={onClickTipo}>
                                    <Dropdown.Toggle
                                        className="mt-1 dropdowncustom"
                                        disabled="disabled"
                                        variant="outline-light"
                                        id="dropdown-basic">
                                        <div className={alertTipo}>
                                            {tipoVehSelec}
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        variant="outline-light"
                                        className="tamañocajaoptions">
                                        {vehiculos &&
                                            vehiculos.map((item) => {
                                                return (
                                                    <Dropdown.Item
                                                        className="itemsdropdowncustom"
                                                        onClick={() =>
                                                            setTipoVehSelec(
                                                                item.text
                                                            )
                                                        }
                                                        eventKey={item.id}>
                                                        {item.text}
                                                    </Dropdown.Item>
                                                );
                                            })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1}>
                            <div className="cajaiconoguardardos">
                                <CheckIcon
                                    onClick={() => {
                                        guardarDatosVehiculosDuplicar();
                                    }}
                                    style={{
                                        fontSize: 25,
                                    }}
                                    className="iconocancelarguardar mlmenos15"></CheckIcon>
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1} className="mlmenos2">
                            <div className="cajaiconocancelar">
                                <CloseIcon
                                    onClick={() =>
                                        validaEliminaDatosVehiculosDuplicar()
                                    }
                                    style={{
                                        fontSize: 25,
                                    }}
                                    className="iconocancelarguardar mlmenos15"></CloseIcon>
                            </div>
                        </Col>
                    </Row>
                    <Row className="espaciovariablescrearproductodos">
                        <Col xl={5} lg={5} md={5} xs={5}>
                            <Dropdown
                                onSelect={handleChangeCarroceria}
                                onClick={onClickCarroceria}>
                                <Dropdown.Toggle
                                    className="dropdowncustomitems"
                                    variant="outline-light"
                                    id="dropdown-basic">
                                    <div className={alertCarroceria}>
                                        {carroceriaVehSelec}
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu
                                    variant="outline-light"
                                    className="tamañocajaoptionsitems">
                                    {listadoCarrocerias &&
                                        listadoCarrocerias.map((item) => {
                                            return (
                                                <Dropdown.Item
                                                    className="itemsdropdowncustom"
                                                    onClick={() =>
                                                        setCarroceriaVehSelec(
                                                            item.label
                                                        )
                                                    }
                                                    eventKey={item.value}>
                                                    {item.label}
                                                </Dropdown.Item>
                                            );
                                        })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <div className="mlmenos5">
                                <Dropdown
                                    onSelect={handleChangeBrand}
                                    onClick={onClickMarca}>
                                    <Dropdown.Toggle
                                        onclick={CustomToggle}
                                        id="dropdown-custom-components"
                                        arrowColor="#2D2E83"
                                        className="dropdowncustomitems"
                                        variant="outline-light"
                                        value={marcaVehUno}>
                                        <div className={alertMarca}>
                                            {marcaVehSelec}
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        as={CustomMenu}
                                        variant="outline-light"
                                        className="tamañocajaoptionsitemsdos">
                                        {marcas &&
                                            marcas.map((item) => {
                                                return (
                                                    <Dropdown.Item
                                                        className="itemsdropdowncustom"
                                                        onClick={() =>
                                                            setMarcaVehSelec(
                                                                item.text
                                                            )
                                                        }
                                                        eventKey={item.id}>
                                                        {item.text}
                                                    </Dropdown.Item>
                                                );
                                            })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={5} lg={5} md={5} xs={5}>
                            <div>
                                <Dropdown
                                    onSelect={handleChangeAnno}
                                    onClick={onClickAnno}>
                                    <Dropdown.Toggle
                                        onclick={CustomToggle}
                                        id="dropdown-custom-components"
                                        arrowColor="#2D2E83"
                                        className="mt-1 dropdowncustomitems"
                                        variant="outline-light">
                                        <div className={alertAnno}>
                                            {annoVehSelec}
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        as={CustomMenu}
                                        variant="outline-light"
                                        className="tamañocajaoptionsitemsdos">
                                        {annos &&
                                            annos.map((item) => {
                                                return (
                                                    <Dropdown.Item
                                                        className="itemsdropdowncustom"
                                                        onClick={() =>
                                                            setAnnoVehSelec(
                                                                item.label
                                                            )
                                                        }
                                                        eventKey={item.value}>
                                                        {item.label}
                                                    </Dropdown.Item>
                                                );
                                            })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <div className="mlmenos5">
                                <Dropdown
                                    onSelect={handleChangeModels}
                                    onClick={onClickModelo}>
                                    <Dropdown.Toggle
                                        onclick={CustomToggle}
                                        id="dropdown-custom-components"
                                        arrowColor="#2D2E83"
                                        className="mt-1 dropdowncustomitems"
                                        variant="outline-light">
                                        <div className={alertModelo}>
                                            {modeloVehSelec}
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        as={CustomMenu}
                                        variant="outline-light"
                                        className="tamañocajaoptionsitemsdos">
                                        {modelos &&
                                            modelos.map((item) => {
                                                return (
                                                    <Dropdown.Item
                                                        className="itemsdropdowncustom"
                                                        onClick={() =>
                                                            setModeloVehSelec(
                                                                item.label
                                                            )
                                                        }
                                                        eventKey={item.value}>
                                                        {item.label}
                                                    </Dropdown.Item>
                                                );
                                            })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                    <Row className="espaciovariablescrearproductodos">
                        <Col xl={5} lg={5} md={5} xs={5}>
                            <Dropdown
                                onSelect={handleChangeVersionMotor}
                                onClick={onClickCilindraje}>
                                <Dropdown.Toggle
                                    className="dropdowncustomitems"
                                    variant="outline-light"
                                    id="dropdown-basic">
                                    <div className={alertCilindraje}>
                                        {cilindrajeVehSelec}
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    variant="outline-light"
                                    className="tamañocajaoptionsitems">
                                    {cilindrajes &&
                                        cilindrajes.map((item) => {
                                            return (
                                                <Dropdown.Item
                                                    className="itemsdropdowncustom"
                                                    onClick={() =>
                                                        setCilindrajeVehSelec(
                                                            item.label
                                                        )
                                                    }
                                                    eventKey={item.value}>
                                                    {item.label}
                                                </Dropdown.Item>
                                            );
                                        })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <div className="mlmenos5">
                                <Dropdown
                                    onSelect={handleChangeTransmision}
                                    onClick={onClickTransmision}>
                                    <Dropdown.Toggle
                                        className="dropdowncustomitems"
                                        disabled={showTransmision}
                                        variant="outline-light"
                                        id="dropdown-basic">
                                        <div className={alertTransmision}>
                                            {transmisionVehSelec}
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        variant="outline-light"
                                        className="tamañocajaoptionsitems">
                                        {transmision &&
                                            transmision.map((item) => {
                                                return (
                                                    <Dropdown.Item
                                                        className="itemsdropdowncustom"
                                                        onClick={() =>
                                                            setTransmisionVehSelec(
                                                                item.label
                                                            )
                                                        }
                                                        eventKey={item.value}>
                                                        {item.label}
                                                    </Dropdown.Item>
                                                );
                                            })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                    <Row className="espaciovariablescrearproductodos">
                        <Col xl={5} lg={5} md={5} xs={5}>
                            <Dropdown
                                onSelect={handleChangeCombustible}
                                onClick={onClickCombustible}>
                                <Dropdown.Toggle
                                    className="dropdowncustomitemsizquierda"
                                    variant="outline-light"
                                    id="dropdown-basic">
                                    <div className={alertCombustible}>
                                        {combustibleVehSelec}
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    variant="outline-light"
                                    className="tamañocajaoptionsitems">
                                    {combustible &&
                                        combustible.map((item) => {
                                            return (
                                                <Dropdown.Item
                                                    className="itemsdropdowncustom"
                                                    onClick={() =>
                                                        setCombustibleVehSelec(
                                                            item.label
                                                        )
                                                    }
                                                    eventKey={item.value}>
                                                    {item.label}
                                                </Dropdown.Item>
                                            );
                                        })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <div className="mlmenos5">
                                <Dropdown
                                    onSelect={handleChangeTraccion}
                                    onClick={onClickTraccion}>
                                    <Dropdown.Toggle
                                        className="dropdowncustomitemsderecha"
                                        disabled={showTraccion}
                                        variant="outline-light"
                                        id="dropdown-basic">
                                        <div className={alertTraccion}>
                                            {traccionVehSelec}
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        variant="outline-light"
                                        className="tamañocajaoptionsitems">
                                        {tipotraccion &&
                                            tipotraccion.map((item) => {
                                                return (
                                                    <Dropdown.Item
                                                        className="itemsdropdowncustom"
                                                        onClick={() =>
                                                            setTraccionVehSelec(
                                                                item.label
                                                            )
                                                        }
                                                        eventKey={item.value}>
                                                        {item.label}
                                                    </Dropdown.Item>
                                                );
                                            })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Row>
        </div>
    );
}

export default DuplicarVehiculos;
