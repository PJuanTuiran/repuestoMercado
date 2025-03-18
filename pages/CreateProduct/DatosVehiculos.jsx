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
                    className="my-2 tamañocajaoptionsitemssearchdos"
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
                {}
            </div>
        );
    }
);

function DatosVehiculos(props) {
    const {
        vehiculoUnoCrear,
        setVehiculoUnoCrear,
        vehiculoUnoEditar,
        setVehiculoUnoEditar,
        setVehiculoUnoDuplicar,
        setVehiculoUnoSelecc,
        setAgregarVehiculo,
        setDuplicar,
        duplicar,
        setTipoVehUno,
        setMarcaVehUno,
        setAnnoVehUno,
        setModeloVehUno,
        setCarroceriaVehUno,
        setcilindrajeVehUno,
        settransmisionVehUno,
        setcombustibleVehUno,
        settraccionVehUno,
        showTraccion,
        setShowTraccion,
        showTransmision,
        setShowTransmision,
        setControlAgregarVehiculo,
        vehiculosSeleccionados,
        setVehiculosSeleccionados,
        vehiculoBorrar,
        setVehiculoBorrar,
        setEliminoDatos,
        controlAccion,
        setControlAccion,
        tipoVehiculoSeleccionado,
        settipoVehiculoSeleccionado,
        marcaVehUno,
        annoVehUno,
        modeloVehUno,
        carroceriaVehUno,
        cilindrajeVehUno,
        transmisionVehUno,
        combustibleVehUno,
        traccionVehUno,
        nuevoVehiculo,
        setNuevoVehiculo,
        idVehiculosProducto,
        arrayVehiculosTemporal,
        setArrayVehiculosTemporal,
        setVehiculoUno,
        numeroVehiculosAgregados,
        setListadoCarrocerias,
        listadoCarrocerias,
        tipoVeh,
        setTipoVeh,
        tipoVehSelec,
        vehiculos,
    } = props;

    const [interval, setInterval] = useState(0);
    // Asignar nombreUno de las opciones seleccionadas en lo vehiculos
    const dispatch = useDispatch();
    const [tiposVehiculos, setTiposVehiculos] = useState([]);
    const [annos, setAnnos] = useState([]);
    const [listMarcas, setListMarcas] = useState([]);
    const [listCarrocerias, setListCarrocerias] = useState([]);
    const [listModelos, setListModelos] = useState([]);
    const [listCilindrajes, setListCilindrajes] = useState([]);

    const [selectTipo, setSelectTipo] = useState("Tipo Vehículo");
    const [selectCarroceria, setSelectCarroceria] = useState("Carroceria");
    const [selectMarca, setSelectMarca] = useState("Marca");
    const [selectMarcaEdit, setSelectMarcaEdit] = useState("Marca");

    const [valueMarca, setValueMarca] = useState("");
    const [valueModelo, setValueModelo] = useState("");
    const [valueCilindraje, setValueCilindraje] = useState("");

    const [selectAnno, setSelectAnno] = useState("Año");
    const [selectModelo, setSelectModelo] = useState("Modelo");
    const [continuarRegistro, setContinuarRegistro] = useState(false);
    const [abandonarRegistro, setAbandonarRegistro] = useState(false);
    const [continuarEliminar, setContinuarEliminar] = useState(false);
    const [abandonarEliminar, setAbandonarEliminar] = useState(false);
    const [asignarTipo, setAsignarTipo] = useState(false);
    const [conservarTipo, setConservarTipo] = useState(false);

    const [selectCilindraje, setSelectCilindraje] = useState("Cilindraje");
    const [selectTransmision, setSelectTransmision] = useState("Transmisión");
    const [selectCombustible, setSelectCombustible] = useState("Combustible");
    const [selectTraccion, setSelectTraccion] = useState("Tracción");

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

    // Caracteristicas seleccionadas por vehiculo

    const [marcaVeh, setMarcaVeh] = useState(null);
    const [annoVeh, setAnnoVeh] = useState(null);
    const [modeloVeh, setModeloVeh] = useState(null);
    const [cilindrajesVeh, setCilindrajesVeh] = useState(null);
    const [carroceriaVeh, setCarroceriaVeh] = useState(null);
    const [transmisionVeh, setTransmisionVeh] = useState(null);
    const [combustibleVeh, setCombustibleVeh] = useState(null);
    const [traccionVeh, setTraccionVeh] = useState(null);

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
    const [editarCombustibleVeh, setEditarCombustibleVeh] = useState([]);
    const [editarTraccionVeh, setEditarTraccionVeh] = useState([]);

    // En la eidición del vehículo controlar el cambio de las caracteristicas
    const [editarCambioCarroceria, setEditarCambioCarroceria] = useState(0);
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

    // Inicializamos el arrego de Tipos de Vehiculos
    const [marcas, setMarcas] = useState([]);
    const [carrocerias, setCarrocerias] = useState([]);
    const [cilindrajes, setCilindrajes] = useState([]);
    const [modelos, setModels] = useState([]);

    const [marcasInicia, setMarcasInicia] = useState([]);
    const [codigoMarcaVeh, setCodigoMarcaVeh] = useState(0);
    const [codigoModeloVeh, setCodigoModeloVeh] = useState(0);
    const [codigoCilindrajeVeh, setCodigoCilindrajeVeh] = useState(0);

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
    const [marcaNoExiste, setMarcaNoExiste] = useState(false);
    const [esNuevoVehUno, setEsNuevoVehUno] = useState(false);

    const [consecutivoMarca, setConsecutivoMarca] = useState(300000);
    const [consecutivoModelo, setConsecutivoModelo] = useState(300000);
    const [consecutivoCilindraje, setConsecutivoCilindraje] = useState(300000);

    const [listaNuevasMarcas, setListaNuevasMarcas] = useState(true);
    const [listaNuevosModelos, setListaNuevosModelos] = useState(true);
    const [listaNuevosCilindraje, setListaNuevosCilindraje] = useState(true);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    const datosgenerales = useSelector(
        (state) => state.datosgenerales.datosgenerales
    );
    const duplicarprd = useSelector((state) => state.duplicarprd.duplicarprd);

    useEffect(() => {
       if (numeroVehiculosAgregados === 0) {
            setHabilitarTipo(false);
        } else {
            setHabilitarTipo(true);
            setHabilitarCarroceria(false);
            setCarrocerias(listadoCarrocerias);
            if (tipoVehSelec == 0) setSelectTipo("Tipo Vehículo");
            else setSelectTipo(tipoVehSelec);
        }
    }, [numeroVehiculosAgregados, tipoVehSelec, duplicarprd]);

    useEffect(() => {
        let incremento = interval + 1;

        setInterval(incremento);
        setSelectMarca("Marca");
        setSelectAnno("Año");
        setSelectModelo("Modelo");
        setSelectCilindraje("Cilindraje");
        setSelectTransmision("Transmisión");
        setSelectCombustible("Combustible");
        setSelectTraccion("Tracción");

        setHabilitarAnno(true);
        setHabilitarModelo(true);
        setHabilitarCilindraje(true);
        setHabilitarCombustible(true);
        setShowTraccion(true);
        setShowTransmision(true);

        if (tipoVeh == 3 || tipoVeh == 4) {
            setShowTraccion(true);
            setShowTransmision(true);
            setSelectTransmision("");
            setSelectTraccion("");
        } else if (
            tipoVeh == 1 ||
            tipoVeh == 3 ||
            tipoVeh == 4 ||
            tipoVeh == 6
        ) {
            setShowTraccion(true);
            setSelectTraccion("");
            setSelectTransmision("Transmisión");
        } else {
            setSelectTransmision("Transmisión");
            setSelectTraccion("Tracción");
        }
    }, [nuevoVehiculo]);

    useEffect(() => {
        if (vehiculoBorrar && !duplicar && !vehiculoUnoEditar) {
            setVehiculoBorrar(false);
        }
    }, [vehiculoBorrar]);

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

            setNombreMarcaVeh(selectMarca);
            setNombreModeloVeh(selectModelo);
            setNombreCilindrajesVeh(selectCilindraje);

            setModeloVeh(nuevomodelos);
            setCilindrajesVeh(cilindrajenuevo);
            setMarcaVeh(nuevamarca);

            if (nuevamarca > 300000) setEsNuevoVehUno(true);
            else if (nuevomodelos > 300000) setEsNuevoVehUno(true);
            else if (nuevamarca > cilindrajenuevo) setEsNuevoVehUno(true);
            else setEsNuevoVehUno(false);

            setCrearNuevovehiculo(false);
            grabarDatosVehiculosTodo();
        }
    }, [crearNuevovehiculo]);

    useEffect(() => {
        if (vehiculoUnoCrear) {
            let dato = [];
            localStorage.setItem("informacionproducto", JSON.stringify(dato));
            localStorage.setItem(
                "datospublicacionproducto",
                JSON.stringify(dato)
            );

            setMarcaVeh("");
            setAnnoVeh("");
            setModeloVeh("");
            setCilindrajesVeh("");
            setCarroceriaVeh("");
            setTransmisionVeh(0);
            setCombustibleVeh("");
            setTraccionVeh(0);
            setMarcas([]);
            setModels([]);
            setCilindrajes([]);

            if (numeroVehiculosAgregados > 0) {
                setHabilitarCarroceria(false);
            } else {
                setHabilitarCarroceria(true);
                setSelectTipo("Tipo Vehículo");
            }

            setHabilitarMarca(true);
            setHabilitarAnno(true);
            setHabilitarModelo(true);
            setHabilitarCilindraje(true);
            setHabilitarCombustible(true);
            setShowTraccion(true);
            setShowTransmision(true);

            let tipo = 0;

            //if (contador > 1) {
            let datosvehiculos = datosgenerales.vgl_tiposvehiculos;

            datosvehiculos &&
                datosvehiculos.map((item) => {
                    if (item.text == tipoVehiculoSeleccionado) {
                        tipo = item.value;
                    }
                });

            let newDet = [];

            listCarrocerias.forEach((row) => {
                if (
                    Number.parseInt(row.tipovehiculo) ===
                    Number.parseInt(tipoVeh)
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
            //}

            setSelectCarroceria("Carroceria");
            setSelectMarca("Marca");
            setSelectAnno("Año");
            setSelectModelo("Modelo");
            setSelectCilindraje("Cilindraje");
            setSelectCombustible("Combustible");

            if (tipoVeh == 3 || tipoVeh == 4) {
                setShowTraccion(true);
                setShowTransmision(true);
                setSelectTransmision("");
                setSelectTraccion("");
            } else if (
                tipoVeh == 1 ||
                tipoVeh == 3 ||
                tipoVeh == 4 ||
                tipoVeh == 6
            ) {
                setShowTraccion(true);
                setSelectTraccion("");
                setSelectTransmision("Transmisión");
            } else {
                setSelectTransmision("Transmisión");
                setSelectTraccion("Tracción");
            }
        }
    }, [vehiculoUnoCrear]);

    useEffect(() => {
        if (vehiculoUnoEditar) {
            setMarcaVeh(marcaVehUno);
            setAnnoVeh(annoVehUno);
            setModeloVeh(modeloVehUno);
            setCilindrajesVeh(cilindrajeVehUno);
            setCarroceriaVeh(carroceriaVehUno);
            setTransmisionVeh(transmisionVehUno);
            setCombustibleVeh(combustibleVehUno);
            setTraccionVeh(traccionVehUno);

            listCarrocerias.forEach((row) => {
                if (
                    Number.parseInt(row.id) ===
                    Number.parseInt(carroceriaVehUno)
                ) {
                    setSelectCarroceria(row.carroceria);
                }
            });

            listMarcas.forEach((row) => {
                if (Number.parseInt(row.id) === Number.parseInt(marcaVehUno)) {
                    if (row.text) setSelectMarca(row.text);
                }
            });

            annos.forEach((row) => {
                if (Number.parseInt(row.id) === Number.parseInt(annoVehUno)) {
                    setSelectAnno(row.anovehiculo);
                }
            });

            listModelos.forEach((row) => {
                if (Number.parseInt(row.id) === Number.parseInt(modeloVehUno)) {
                    setSelectModelo(row.modelo);
                }
            });

            listCilindrajes.forEach((row) => {
                if (
                    Number.parseInt(row.id) ===
                    Number.parseInt(cilindrajeVehUno)
                ) {
                    setSelectCilindraje(row.cilindraje);
                }
            });

            if (transmisionVehUno == 1) {
                setSelectTransmision("Automática");
            } else if (transmisionVehUno == 2) {
                setSelectTransmision("Manual");
            } else {
                setSelectTransmision("");
            }

            if (combustibleVehUno == 1) {
                setSelectCombustible("Gasolina");
            } else if (combustibleVehUno == 2) {
                setSelectCombustible("Diesel");
            } else if (combustibleVehUno == 3) {
                setSelectCombustible("Gasolina - Gas");
            } else if (combustibleVehUno == 4) {
                setSelectCombustible("Gasolina – Eléctrico");
            } else {
                setSelectCombustible("");
            }

            if (traccionVehUno == 1) {
                setSelectTraccion("Tracción Delantera");
            } else if (traccionVehUno == 2) {
                setSelectTraccion("Tracción Trasera");
            } else if (traccionVehUno == 3) {
                setSelectTraccion("Tracción 4x4");
            } else if (traccionVehUno == 4) {
                setSelectTraccion("");
            }

            if (!marcaNoExiste) {
                let newDet = [];
                listMarcas &&
                    listMarcas.forEach((row) => {
                        if (
                            Number.parseInt(row.tipovehiculo) ===
                                Number.parseInt(tipoVeh) &&
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
                        marcaVehUno;
                    });
                setModels(newDetMod);

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
                setCilindrajes(newDetCilindraje);
            }

            if (marcaNoExiste) {
                setSelectMarca(nombreMarcaVeh);
                setSelectModelo(nombreModeloVeh);
                setSelectCilindraje(nombreCilindrajesVeh);
            }

            if (tipoVeh == 3 || tipoVeh == 4) {
                if (showTransmision) {
                    setSelectTransmision("");
                    setSelectTraccion("");
                }
            }

            if (tipoVeh == 3 || tipoVeh == 4) {
                setSelectTransmision("");
                setSelectTraccion("");
                setShowTraccion(true);
                setShowTransmision(true);
            } else if (
                tipoVeh == 1 ||
                tipoVeh == 3 ||
                tipoVeh == 4 ||
                tipoVeh == 6
            ) {
                setSelectTraccion("");
                setShowTraccion(true);
                setShowTransmision(false);
            } else if (tipoVeh == 2) {
                setShowTraccion(false);
                setShowTransmision(false);
            }
        }
    }, [vehiculoUnoEditar]);

    useEffect(() => {
        setTiposVehiculos(datosgenerales.vgl_tiposvehiculos);
        setListMarcas(datosgenerales.vgl_marcasvehiculos);
        setListCarrocerias(datosgenerales.vgl_carroceriasvehiculos);
        setListModelos(datosgenerales.vgl_modelosvehiculos);
        setListCilindrajes(datosgenerales.vgl_cilindrajesvehiculos);
        setAnnos(datosgenerales.vgl_annosvehiculos);

        if (duplicarprd === 2) {
            let newDet = [];
            datosgenerales.vgl_carroceriasvehiculos &&
                datosgenerales.vgl_carroceriasvehiculos.forEach((row) => {
                    if (
                        Number.parseInt(row.tipovehiculo) ===
                        Number.parseInt(tipoVeh)
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
                //console.log("CARROCE SSS : ",newDet)
                setListadoCarrocerias(newDet);
            setCarrocerias(newDet);
        }
    }, [datosgenerales]);

    useEffect(() => {
        if (editarTipo) {
            setMarcas([]);
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

            setSelectCarroceria("Carroceria");
            setSelectMarca("Marca");
            setSelectModelo("Modelo");
            setSelectCilindraje("Cilindraje");

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
                setEditarMarcaVeh(null);
                setEditarAnnoVeh(0);
                setEditarModeloVeh(0);
                setEditarCilindrajesVeh(0);
                setEditarTransmisionVeh(0);
            }

            setSelectMarca("Marca");
            setSelectModelo("Modelo");
            setSelectCilindraje("Cilindraje");

            let newDet = [];
            listMarcas &&
                listMarcas.forEach((row) => {
                    if (
                        Number.parseInt(row.tipovehiculo) ===
                            Number.parseInt(tipoVeh) &&
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

            //setMarcas(newDet);
            setEditarCarroceria(false);
        }
    }, [editarCarroceria]);

    useEffect(() => {
        if (editarMarca) {
            setCilindrajes([]);
            setModels([]);

            transmision = [];
            tipotraccion = [];

            if (!marcaNoExiste) {
                setcilindrajeVehUno(null);
                setModeloVehUno(null);
                setSelectModelo("Modelo");
                setSelectCilindraje("Cilindraje");
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
            setcilindrajeVehUno(0);

            if (!marcaNoExiste) {
                setEditarCilindrajesVeh(0);
                setcilindrajeVehUno(0);
                setSelectCilindraje("Cilindraje");
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
        if (controlGrabar) {
            if (transmisionVeh == 1) {
                setNombreTransmisionVeh("Automática");
            } else if (transmisionVeh == 2) {
                setNombreTransmisionVeh("Manual");
            } else {
                setNombreTransmisionVeh("");
            }

            if (combustibleVeh == 1) {
                setNombreCombustibleVeh("Gasolina");
            } else if (combustibleVeh == 2) {
                setNombreCombustibleVeh("Diesel");
            } else if (combustibleVeh == 3) {
                setNombreCombustibleVeh("Gasolina - Gas");
            } else if (combustibleVeh == 4) {
                setNombreCombustibleVeh("Gasolina – Eléctrico");
            } else {
                setNombreCombustibleVeh("");
            }

            if (tipoVeh == 3 || tipoVeh == 4) {
                setNombreTraccionVeh("");
            }

            if (!marcaNoExiste) {
                listCarrocerias &&
                    listCarrocerias.forEach((row) => {
                        if (
                            Number.parseInt(row.id) ===
                            Number.parseInt(carroceriaVeh)
                        ) {
                            setNombreCarroceriaVeh(row.carroceria);
                        }
                    });

                listMarcas &&
                    listMarcas.forEach((row) => {
                        if (
                            Number.parseInt(row.id) ===
                            Number.parseInt(marcaVeh)
                        ) {
                            if (row.text) setNombreMarcaVeh(row.text);
                        }
                    });

                annos &&
                    annos.forEach((row) => {
                        if (
                            Number.parseInt(row.id) === Number.parseInt(annoVeh)
                        ) {
                            setNombreAnnoVeh(row.anovehiculo);
                        }
                    });

                listModelos &&
                    listModelos.forEach((row) => {
                        if (
                            Number.parseInt(row.id) ===
                            Number.parseInt(modeloVeh)
                        ) {
                            setNombreModeloVeh(row.modelo);
                        }
                    });

                listCilindrajes &&
                    listCilindrajes.forEach((row) => {
                        if (
                            Number.parseInt(row.id) ===
                            Number.parseInt(cilindrajesVeh)
                        ) {
                            setNombreCilindrajesVeh(row.cilindraje);
                        }
                    });
            }

            if (marcaNoExiste) {
                setMarcaVehUno(consecutivoMarca);
                setModeloVehUno(consecutivoModelo);
                setcilindrajeVehUno(consecutivoCilindraje);
                setNombreCilindrajesVeh(selectCilindraje);
                setNombreModeloVeh(selectModelo);
                setNombreMarcaVeh(selectMarca);
            } else {
                setMarcaVehUno(marcaVeh);
                setModeloVehUno(modeloVeh);
                setcilindrajeVehUno(cilindrajesVeh);
            }

            setTipoVehUno(tipoVeh);
            setAnnoVehUno(annoVeh);
            setCarroceriaVehUno(carroceriaVeh);
            settransmisionVehUno(transmisionVeh);
            setcombustibleVehUno(combustibleVeh);

            if (!traccionVeh) settraccionVehUno(0);
            else settraccionVehUno(traccionVeh);

            if (traccionVeh == 1) {
                setNombreTraccionVeh("Tracción Delantera");
            } else if (traccionVeh == 2) {
                setNombreTraccionVeh("Tracción Trasera");
            } else if (traccionVeh == 3) {
                setNombreTraccionVeh("Tracción 4x4");
            } else if (traccionVeh == 4) {
                setNombreTraccionVeh("");
            }
            setcontrolGrabar(false);
            setNuevoVehiculo(false);

            const creaVehiculoTemporal = async () => {
                let comparar =
                    "" +
                    tipoVeh +
                    carroceriaVeh +
                    marcaVeh +
                    annoVeh +
                    modeloVeh +
                    cilindrajeVehUno +
                    transmisionVeh +
                    combustibleVeh +
                    traccionVehUno;

                const params = {
                    id: idVehiculosProducto,
                    idtipoproducto: idVehiculosProducto,
                    tipovehiculo: tipoVeh,
                    carroceria: carroceriaVeh,
                    marca: marcaVeh,
                    anno: annoVeh,
                    modelo: modeloVeh,
                    cilindraje: cilindrajeVehUno,
                    transmision: transmisionVeh,
                    combustible: combustibleVeh,
                    traccion: traccionVehUno,
                    selecttipo: selectTipo,
                    selectcarroceria: selectCarroceria,
                    selectmarca: selectMarca,
                    selectanno: selectAnno,
                    selectmodelo: selectModelo,
                    selectcilindraje: selectCilindraje,
                    selecttransmision: selectTransmision,
                    selectcombustible: selectCombustible,
                    selecttraccion: selectTraccion,
                    estado: 1,
                    comparar: comparar,
                    fecha: fechaactual,
                };

                if (numeroVehiculosAgregados == 0) {
                    setTipoVeh(tipoVeh);
                    setHabilitarTipo(false);
                }

                if (duplicarprd == 0) {
                    await axios({
                        method: "post",
                        url: "https://gimcloud.com.co/mrp/api/32",
                        params,
                    })
                        .then((res) => {
                            console.log("Producto Temporal OK: ", res.data);
                            setVehiculoUnoCrear(false);
                            setVehiculoUno(false);
                        })
                        .catch(function (error) {
                            console.log("Producto Temporal Error: ", res.data);
                        });
                } else if (duplicarprd == 2) {
                    let nvoarray = [];

                    const params = {
                        id: arrayVehiculosTemporal[0].idproductovehiculo,
                        tipovehiculo: tipoVeh,
                        carroceria: carroceriaVeh,
                        marca: marcaVeh,
                        anno: annoVeh,
                        modelo: modeloVeh,
                        cilindraje: cilindrajeVehUno,
                        transmision: transmisionVeh,
                        combustible: combustibleVeh,
                        traccion: traccionVehUno,
                        selecttipo: selectTipo,
                        selectcarroceria: selectCarroceria,
                        selectmarca: selectMarca,
                        selectanno: selectAnno,
                        selectmodelo: selectModelo,
                        selectcilindraje: selectCilindraje,
                        selecttransmision: selectTransmision,
                        selectcombustible: selectCombustible,
                        selecttraccion: selectTraccion,
                        estado: 1,
                        comparar: comparar,
                        fecha: fechaactual,
                    };

                    arrayVehiculosTemporal &&
                        arrayVehiculosTemporal.map((items) => {
                            nvoarray.push(items);
                        });
                    nvoarray.push(params);
                    setArrayVehiculosTemporal(nvoarray);
                    setVehiculoUnoCrear(false);
                    setVehiculoUno(false);
                }
            };
            creaVehiculoTemporal();
        }
    }, [controlGrabar]);

    const guardarVehiculo = () => {
        let continuar = true;
        let vehiculo;

        if (!traccionVeh || traccionVeh == 0) setSelectTraccion("");

        if (!transmisionVeh || transmisionVeh == 0) setSelectTransmision("");

        if (tipoVeh == 3 || tipoVeh == 4) {
            vehiculo =
                "" +
                tipoVeh +
                carroceriaVeh +
                marcaVeh +
                annoVeh +
                modeloVeh +
                cilindrajesVeh +
                transmisionVeh +
                combustibleVeh +
                traccionVeh;
        } else if (
            tipoVeh == 1 ||
            tipoVeh == 3 ||
            tipoVeh == 4 ||
            tipoVeh == 6
        ) {
            vehiculo =
                "" +
                tipoVeh +
                carroceriaVeh +
                marcaVeh +
                annoVeh +
                modeloVeh +
                cilindrajesVeh +
                transmisionVeh +
                combustibleVeh +
                traccionVeh;
        } else {
            vehiculo =
                "" +
                tipoVeh +
                carroceriaVeh +
                marcaVeh +
                annoVeh +
                modeloVeh +
                cilindrajesVeh +
                transmisionVeh +
                combustibleVeh +
                traccionVeh;
        }

        if (!cambia) {
            arrayVehiculosTemporal &&
                arrayVehiculosTemporal.map((items) => {
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
                    }
                });
        } else setCambia(false);

        if (continuar) {
            setAgregarVehiculo(true);
            setControlAgregarVehiculo(true);
            setTipoVehUno(tipoVeh);
            setMarcaVehUno(marcaVeh);
            setAnnoVehUno(annoVeh);
            setModeloVehUno(modeloVeh);
            setcilindrajeVehUno(cilindrajesVeh);
            setCarroceriaVehUno(carroceriaVeh);
            settransmisionVehUno(transmisionVeh);
            setcombustibleVehUno(combustibleVeh);

            if (!traccionVeh) settraccionVehUno(0);
            else settraccionVehUno(traccionVeh);

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

    const handleChange = (selectedOptions) => {
        // Asigna el tipo de vehículo al state
        dispatch(getTypesVehicles(selectedOptions));

        setCarroceriaVeh(null);
        setMarcaVeh(null);
        setAnnoVeh(null);
        setModeloVeh(null);
        setCilindrajesVeh(null);
        //setTransmisionVeh(null);
        //setCombustibleVeh(null);

        setAlertCarroceria("ml-2 alinearizquierda");
        setAlertMarca("ml-2 alinearizquierda");
        setAlertAnno("tamañocajaoptionsitemssearch");
        setAlertModelo("ml-2 alinearizquierda");
        setAlertCilindraje("ml-2 alinearizquierda");
        setAlertTransmision("ml-2 alinearizquierda");
        setAlertCombustible("ml-2 alinearizquierda");
        setAlertTraccion("ml-2 alinearizquierda");

        let newTipo = [];
        newTipo.push(selectedOptions);

        if (selectedOptions == 3 || selectedOptions == 4) {
            setSelectTraccion("");
        }

        setEditarTipo(true);
        setTipoVeh(newTipo[0]);
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
            setSelectTransmision("");
            setShowTraccion(true);
            setSelectTraccion("");
        } else if (
            selectedOptions == 1 ||
            selectedOptions == 3 ||
            selectedOptions == 4 ||
            selectedOptions == 6
        ) {
            setShowTransmision(true);
            setSelectTransmision("Transmisión");
            setSelectTraccion("");
            setShowTransmision(true);
        } else {
            //setShowTransmision(true);
            //setShowTraccion(true);
            setSelectTransmision("Transmisión");
            setSelectTraccion("Tracción");
        }
    };

    const handleChangeCarroceria = (selectedOptions) => {
        setMarcaVeh(null);
        //setAnnoVeh(null);
        setModeloVeh(null);
        setCilindrajesVeh(null);
        //setTransmisionVeh(null);
        //setCombustibleVeh(null);

        setEditarCarroceria(true);
        setEditarCarroceriaVeh(selectedOptions);
        setCarroceriaVeh(selectedOptions);

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
                        Number.parseInt(tipoVeh) &&
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
                            Number.parseInt(carroceriaVeh)
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

    const inputMarca = (dato, valor) => {
        if (marcaVehUno < 29999 && selectMarca != dato) {
            let newDetMod = [];
            setSelectModelo("Modelo");
            listModelos &&
                listModelos.map((row, index) => {
                    if (
                        Number.parseInt(row.marca) === Number.parseInt(valor) &&
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

        setCodigoMarcaVeh(valor);
        setListaNuevasMarcas(false);
        setHabilitarAnno(false);
        setMarcaVeh(valor);
        setMarcaVehUno(valor);
        setValueMarca(dato);
        setSelectMarca(dato);
    };

    const inputModelo = (dato, valor) => {
        setCodigoModeloVeh(valor);
        setListaNuevosModelos(false);
        setHabilitarCilindraje(false);
        setModeloVeh(valor);
        setModeloVehUno(valor);
        setValueModelo(dato);
        setSelectModelo(dato);
    };

    const inputCilindraje = (dato, valor) => {
        if (tipoVeh == 3) {
            setShowTransmision(true);
            setShowTraccion(true);
            setSelectTransmision("");
            setSelectTraccion("");
            setHabilitarCombustible(false);
        } else {
            setShowTransmision(false);
        }
        setListaNuevosCilindraje(false);
        setCodigoCilindrajeVeh(valor);
        setCilindrajesVeh(valor);
        setcilindrajeVehUno(valor);
        setValueCilindraje(dato);
        setSelectCilindraje(dato);
    };

    const handleChangeBrand = (selectedOptions) => {
        console.log("BRAND ; ", selectedOptions);
        //setAnnoVeh(null);
        setModeloVeh(null);
        setCilindrajesVeh(null);
        //setTransmisionVeh(null);
        //setCombustibleVeh(null);
        //setSelectAnno("Año");

        if (selectedOptions == "") {
            setValueMarca("");
            setSelectMarca("");
        }

        if (!nuevoVehiculo && !marcaNoExiste) {
            setEditarMarcaVeh(selectedOptions);

            setMarcaVeh(selectedOptions);

            setEditarMarca(true);

            listMarcas &&
                listMarcas.forEach((row) => {
                    if (
                        Number.parseInt(row.id) ===
                        Number.parseInt(selectedOptions)
                    ) {
                        setNombreMarcaVeh(row.text);
                        setMarcaVehUno(row.id);
                        setSelectMarca(row.text);
                    }
                });

            let newDetMod = [];
            listModelos &&
                listModelos.forEach((row) => {
                    if (
                        Number.parseInt(row.marca) ===
                            Number.parseInt(selectedOptions) &&
                        Number.parseInt(row.carroceria) ===
                            Number.parseInt(carroceriaVeh)
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
                                Number.parseInt(tipoVeh) &&
                            Number.parseInt(row.carroceria) ===
                                Number.parseInt(carroceriaVeh)
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

                setSelectMarca(selectedOptions);
                setSelectMarcaEdit(selectedOptions);
                setValueMarca(selectedOptions);
                setMarcaVehUno(300001);
                setEditarMarcaVeh(300001);
                setMarcaVeh(300001);
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
                                    Number.parseInt(carroceriaVeh)
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

                if (vehiculoUnoEditar) {
                    setEditarMarca(true);
                    setEditarCambioMarca(2);
                }

                if (vehiculoUnoEditar && editarCambioCarroceria == 1)
                    setEditarCambioMarca(1);

                setHabilitarAnno(false);
            } else {
                setMarcas(marcasInicia);
            }
        }
    };

    const handleChangeAnno = (selectedOptions) => {
        setAnnoVeh(selectedOptions);
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
        //setCilindrajesVeh(null);
        //setTransmisionVeh(null);
        //setCombustibleVeh(null);

        if (!nuevoVehiculo && !marcaNoExiste) {
            //setEditarModeloVeh(selectedOptions);
            let newModelo = [];
            newModelo.push(selectedOptions);

            setModeloVeh(newModelo[0]);
            setSelectCilindraje("Cilindraje");

            setEditarModelo(true);

            listModelos &&
                listModelos.forEach((row) => {
                    if (
                        Number.parseInt(row.id) ===
                        Number.parseInt(selectedOptions)
                    ) {
                        setNombreModeloVeh(row.modelo);
                        setSelectModelo(row.modelo);
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

            setSelectModelo(selectedOptions);
            setValueModelo(selectedOptions);
            setModeloVeh(300001);
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
        if (!nuevoVehiculo && !marcaNoExiste) {
            setCilindrajesVeh(selectedOptions);

            listCilindrajes.forEach((row) => {
                if (
                    Number.parseInt(row.id) === Number.parseInt(selectedOptions)
                ) {
                    setNombreCilindrajesVeh(row.cilindraje);
                    setSelectCilindraje(row.cilindraje);
                    setcilindrajeVehUno(row.id);
                }
            });

            if (tipoVeh == 3 || tipoVeh == 4) {
                setShowTraccion(true);
                setShowTransmision(true);
                //setSelectTransmision("");
                //setSelectTraccion("");
                setHabilitarCombustible(false);
            } else if (
                tipoVeh == 1 ||
                tipoVeh == 3 ||
                tipoVeh == 4 ||
                tipoVeh == 6
            ) {
                setShowTraccion(true);
                //setSelectTraccion("");
                setShowTransmision(false);
                //setSelectTransmision("Transmisión");
            } else {
                setShowTransmision(false);
                //setSelectTransmision("Transmisión");
                //setShowTraccion(false);
                //setSelectTraccion("Tracción");
            }
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
                setSelectCilindraje("Cilindraje");
            }

            let codigocilindraje = 0;
            let selectcilindraje = [];

            setNombreCilindrajesVeh(selectedOptions);
            setSelectCilindraje(selectedOptions);
            setValueCilindraje(selectedOptions);
            setCilindrajesVeh(300001);
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

            if (tipoVeh == 3 || tipoVeh == 4) {
                setShowTraccion(true);
                setShowTransmision(true);
                //setSelectTransmision("");
                //setSelectTraccion("");
                setHabilitarCombustible(false);
            } else if (
                tipoVeh == 1 ||
                tipoVeh == 3 ||
                tipoVeh == 4 ||
                tipoVeh == 6
            ) {
                setShowTraccion(true);
                //setSelectTraccion("");
                setShowTransmision(false);
                //setSelectTransmision("Transmisión");
            } else {
                setShowTransmision(false);
                //setSelectTransmision("Transmisión");
                setShowTraccion(false);
                //setSelectTraccion("Tracción");
            }
        }
    };

    const handleChangeTransmision = (selectedOptions) => {
        setTransmisionVeh(selectedOptions);

        if (selectedOptions == 1) {
            setNombreTransmisionVeh("Automática");
        } else if (selectedOptions == 2) {
            setNombreTransmisionVeh("Manual");
        } else {
            setNombreTransmisionVeh("");
        }

        setHabilitarCombustible(false);
    };

    const handleChangeCombustible = (selectedOptions) => {
        setCombustibleVeh(selectedOptions);

        if (selectedOptions == 1) {
            setNombreCombustibleVeh("Gasolina");
        } else if (selectedOptions == 2) {
            setNombreCombustibleVeh("Diesel");
        } else if (selectedOptions == 3) {
            setNombreCombustibleVeh("Gasolina - Gas");
        } else if (selectedOptions == 4) {
            setNombreCombustibleVeh("Gasolina – Eléctrico");
        } else {
            setNombreCombustibleVeh("");
        }

        if (tipoVeh == 3 || tipoVeh == 4) {
            setShowTraccion(true);
            setSelectTraccion("");
        } else if (
            tipoVeh == 1 ||
            tipoVeh == 3 ||
            tipoVeh == 4 ||
            tipoVeh == 6
        ) {
            setShowTraccion(true);
            setSelectTraccion("");
        } else {
            setShowTraccion(false);
            //setSelectTraccion("Tracción");
        }
    };

    const handleChangeTraccion = (selectedOptions) => {
        setTraccionVeh(selectedOptions);

        if (selectedOptions == 1) {
            setNombreTraccionVeh("Tracción Delantera");
        } else if (selectedOptions == 2) {
            setNombreTraccionVeh("Tracción Trasera");
        } else if (selectedOptions == 3) {
            setNombreTraccionVeh("Tracción 4x4");
        } else if (selectedOptions == 4) {
            setNombreTraccionVeh("");
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
            dispatch(getTypesVehicles(tipoVeh));
            setAsignarTipo(false);
            setConservarTipo(false);
        }
    }, [asignarTipo, conservarTipo]);

    useEffect(() => {
        if (abandonarRegistro) {
            setShowModalMensajesValidar(false);
            setAbandonarRegistro(false);
            setVehiculoUnoCrear(false);
            setVehiculoUno(false);
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

    const validaEliminaDatosVehiculos = () => {
        if (numeroVehiculosAgregados === 0 && tipoVeh) {
            setShowModalMensajesValidar(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "¿Quieres cerrar el formulario? Si cierras los cambios no se guardaran!"
            );
        } else if (
            !marcaVeh &&
            !annoVeh &&
            !modeloVeh &&
            !cilindrajesVeh &&
            !carroceriaVeh &&
            !transmisionVeh &&
            !combustibleVeh &&
            !traccionVeh
        ) {
            setNuevoVehiculo(false);
            setMarcaNoExiste(false);
            setVehiculoUnoCrear(false);
            setVehiculoUno(false);
        } else if (
            marcaVeh ||
            annoVeh ||
            modeloVeh ||
            cilindrajesVeh ||
            carroceriaVeh ||
            transmisionVeh ||
            combustibleVeh ||
            traccionVeh
        ) {
            setNuevoVehiculo(false);
            setMarcaNoExiste(false);
            setShowModalMensajesValidar(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "¿Quieres cerrar el formulario? Si cierras los cambios no se guardaran!"
            );
        }
    };

    const eliminaDatosVehiculosAgregado = () => {
        if (continuarEliminar) {
            if (controlAccion > 1) {
                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes(
                    "Heey, solo una acción a la vez, crear, editar, duplicar o eliminar!"
                );
                return;
            }

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
            setVehiculoUnoCrear(false);
            setVehiculoUnoEditar(false);
            setVehiculoUnoDuplicar(false);
            setVehiculoUnoSelecc(false);
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
                            Number.parseInt(tipoVeh) &&
                        Number.parseInt(row.carroceria) ===
                            Number.parseInt(carroceriaVeh)
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
        if (selectMarca != "Marca") setValueMarca(selectMarca);
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
                            Number.parseInt(marcaVeh) &&
                        Number.parseInt(row.carroceria) ===
                            Number.parseInt(carroceriaVeh)
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
        if (selectModelo != "Modelo") setValueModelo(selectModelo);
        setAlertModelo("ml-2 alinearizquierda");
    };

    const onClickCilindraje = () => {
        if (!listaNuevosCilindraje) setListaNuevosCilindraje(true);

        setOpenCilindraje(true);
        if (selectCilindraje != "Cilindraje")
            setValueCilindraje(selectCilindraje);
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

    const grabarDatosVehiculos = () => {
        if (
            selectMarca == "Marca" &&
            selectModelo == "Modelo" &&
            selectCilindraje == "Cilindraje"
        ) {
            let texto = "Heey, Todos los datos del vehículo son requerido!";

            if (!tipoVeh || tipoVeh == 0) {
                setAlertTipo("ml-2 alinearizquierda textoalert");
                setAlertCarroceria("ml-2 alinearizquierda textoalert");
                setAlertMarca("ml-2 alinearizquierda textoalert");

                if (!annoVeh || annoVeh == 0)
                    setAlertAnno("ml-2 alinearizquierda textoalert");

                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!carroceriaVeh || carroceriaVeh == 0) {
                setAlertCarroceria("ml-2 alinearizquierda textoalert");
                setAlertMarca("ml-2 alinearizquierda textoalert");

                if (!annoVeh || annoVeh == 0)
                    setAlertAnno("ml-2 alinearizquierda textoalert");

                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!marcaVeh || marcaVeh == 0) {
                setAlertMarca("ml-2 alinearizquierda textoalert");

                if (!annoVeh || annoVeh == 0)
                    setAlertAnno("ml-2 alinearizquierda textoalert");

                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!annoVeh || annoVeh == 0) {
                if (!annoVeh || annoVeh == 0)
                    setAlertAnno("ml-2 alinearizquierda textoalert");

                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!modeloVeh || modeloVeh == 0) {
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!cilindrajesVeh || cilindrajesVeh == 0) {
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!combustibleVeh || combustibleVeh == 0) {
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (
                (!traccionVeh || traccionVeh == 0) &&
                tipoVeh != 1 &&
                tipoVeh != 6 &&
                tipoVeh != 3
            ) {
                setAlertTraccion("ml-2 alinearizquierda textoalert");
            }

            if ((!transmisionVeh || transmisionVeh == 0) && tipoVeh != 3) {
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(texto);
            return;
        } else if (
            selectModelo == "Modelo" &&
            selectCilindraje == "Cilindraje"
        ) {
            let texto = "Heey, Todos los datos del vehículo son requeridos!";
            if (!carroceriaVeh || carroceriaVeh == 0) {
                setAlertCarroceria("ml-2 alinearizquierda textoalert");
                setAlertMarca("ml-2 alinearizquierda textoalert");

                if (!annoVeh || annoVeh == 0)
                    setAlertAnno("ml-2 alinearizquierda textoalert");

                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!marcaVeh || marcaVeh == 0) {
                setAlertMarca("ml-2 alinearizquierda textoalert");

                if (!annoVeh || annoVeh == 0)
                    setAlertAnno("ml-2 alinearizquierda textoalert");

                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!annoVeh || annoVeh == 0) {
                setAlertAnno("ml-2 alinearizquierda textoalert");
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!modeloVeh || modeloVeh == 0) {
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!cilindrajesVeh || cilindrajesVeh == 0) {
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!combustibleVeh || combustibleVeh == 0) {
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (
                (!traccionVeh || traccionVeh == 0) &&
                tipoVeh != 1 &&
                tipoVeh != 6 &&
                tipoVeh != 3
            ) {
                setAlertTraccion("ml-2 alinearizquierda textoalert");
            }

            if ((!transmisionVeh || transmisionVeh == 0) && tipoVeh != 3) {
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            setAlertModelo("ml-2 alinearizquierda textoalert");
            setAlertCilindraje("ml-2 alinearizquierda textoalert");
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(texto);
            return;
        } else if (selectCilindraje == "Cilindraje") {
            let texto = "Heey, Todos los datos del vehículo son requeridos!";
            if (!carroceriaVeh || carroceriaVeh == 0) {
                setAlertCarroceria("ml-2 alinearizquierda textoalert");
                setAlertMarca("ml-2 alinearizquierda textoalert");

                if (!annoVeh || annoVeh == 0)
                    setAlertAnno("ml-2 alinearizquierda textoalert");

                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!marcaVeh || marcaVeh == 0) {
                setAlertMarca("ml-2 alinearizquierda textoalert");

                if (!annoVeh || annoVeh == 0)
                    setAlertAnno("ml-2 alinearizquierda textoalert");

                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!annoVeh || annoVeh == 0) {
                setAlertAnno("ml-2 alinearizquierda textoalert");
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!modeloVeh || modeloVeh == 0) {
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!cilindrajesVeh || cilindrajesVeh == 0) {
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!combustibleVeh || combustibleVeh == 0) {
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (
                (!traccionVeh || traccionVeh == 0) &&
                tipoVeh != 1 &&
                tipoVeh != 6 &&
                tipoVeh != 3
            ) {
                setAlertTraccion("ml-2 alinearizquierda textoalert");
            }

            if ((!transmisionVeh || transmisionVeh == 0) && tipoVeh != 3) {
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            setAlertCilindraje("ml-2 alinearizquierda textoalert");
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(texto);
            return;
        } else if (selectMarca == "Marca") {
            let texto = "Heey, Todos los datos del vehículo son requeridos!";
            if (!carroceriaVeh || carroceriaVeh == 0) {
                setAlertCarroceria("ml-2 alinearizquierda textoalert");
                setAlertMarca("ml-2 alinearizquierda textoalert");

                if (!annoVeh || annoVeh == 0)
                    setAlertAnno("ml-2 alinearizquierda textoalert");

                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!marcaVeh || marcaVeh == 0) {
                setAlertMarca("ml-2 alinearizquierda textoalert");
                setAlertModelo("ml-2 alinearizquierda textoalert");

                if (!annoVeh || annoVeh == 0)
                    setAlertAnno("ml-2 alinearizquierda textoalert");

                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!annoVeh || annoVeh == 0) {
                setAlertAnno("ml-2 alinearizquierda textoalert");
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!modeloVeh || modeloVeh == 0) {
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!cilindrajesVeh || cilindrajesVeh == 0) {
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!combustibleVeh || combustibleVeh == 0) {
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (
                (!traccionVeh || traccionVeh == 0) &&
                tipoVeh != 1 &&
                tipoVeh != 6 &&
                tipoVeh != 3
            ) {
                setAlertTraccion("ml-2 alinearizquierda textoalert");
            }

            if ((!transmisionVeh || transmisionVeh == 0) && tipoVeh != 3) {
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            setAlertMarca("ml-2 alinearizquierda textoalert");
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(texto);
            return;
        } else if (selectModelo == "Modelo") {
            let texto = "Heey, Todos los datos del vehículo son requeridos!";
            if (!carroceriaVeh || carroceriaVeh == 0) {
                setAlertCarroceria("ml-2 alinearizquierda textoalert");
                setAlertMarca("ml-2 alinearizquierda textoalert");

                if (!annoVeh || annoVeh == 0)
                    setAlertAnno("ml-2 alinearizquierda textoalert");

                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!marcaVeh || marcaVeh == 0) {
                setAlertMarca("ml-2 alinearizquierda textoalert");
                setAlertModelo("ml-2 alinearizquierda textoalert");

                if (!annoVeh || annoVeh == 0)
                    setAlertAnno("ml-2 alinearizquierda textoalert");

                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!annoVeh || annoVeh == 0) {
                setAlertAnno("ml-2 alinearizquierda textoalert");
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!modeloVeh || modeloVeh == 0) {
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!cilindrajesVeh || cilindrajesVeh == 0) {
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!combustibleVeh || combustibleVeh == 0) {
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (
                (!traccionVeh || traccionVeh == 0) &&
                tipoVeh != 1 &&
                tipoVeh != 6 &&
                tipoVeh != 3
            ) {
                setAlertTraccion("ml-2 alinearizquierda textoalert");
            }

            if ((!transmisionVeh || transmisionVeh == 0) && tipoVeh != 3) {
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            setAlertModelo("ml-2 alinearizquierda textoalert");
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(texto);
            return;
        } else if (selectCilindraje == "Cilindraje") {
            let texto = "Heey, Todos los datos del vehículo son requeridos!";
            if (!carroceriaVeh || carroceriaVeh == 0) {
                setAlertCarroceria("ml-2 alinearizquierda textoalert");
                setAlertMarca("ml-2 alinearizquierda textoalert");

                if (!annoVeh || annoVeh == 0)
                    setAlertAnno("ml-2 alinearizquierda textoalert");

                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!marcaVeh || marcaVeh == 0) {
                setAlertMarca("ml-2 alinearizquierda textoalert");
                setAlertModelo("ml-2 alinearizquierda textoalert");

                if (!annoVeh || annoVeh == 0)
                    setAlertAnno("ml-2 alinearizquierda textoalert");

                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!annoVeh || annoVeh == 0) {
                setAlertAnno("ml-2 alinearizquierda textoalert");
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!modeloVeh || modeloVeh == 0) {
                setAlertModelo("ml-2 alinearizquierda textoalert");
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!cilindrajesVeh || cilindrajesVeh == 0) {
                setAlertCilindraje("ml-2 alinearizquierda textoalert");
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (!combustibleVeh || combustibleVeh == 0) {
                setAlertCombustible("ml-2 alinearizquierda textoalert");
                setAlertTraccion("ml-2 alinearizquierda textoalert");
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            if (
                (!traccionVeh || traccionVeh == 0) &&
                tipoVeh != 1 &&
                tipoVeh != 6 &&
                tipoVeh != 3
            ) {
                setAlertTraccion("ml-2 alinearizquierda textoalert");
            }

            if ((!transmisionVeh || transmisionVeh == 0) && tipoVeh != 3) {
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

            setAlertCilindraje("ml-2 alinearizquierda textoalert");
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(texto);
            return;
        }

        if (marcaNoExiste && !nuevoVehiculo && !vehiculoUnoEditar) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Heey, Marca no existe, dar click en crear vehículo!"
            );
            return;
        } else setCrearNuevovehiculo(false);

        if (nuevoVehiculo) {
            setCrearNuevovehiculo(true);
        } else {
            grabarDatosVehiculosTodo();
        }
    };

    const grabarDatosVehiculosTodo = () => {
        if (!tipoVeh) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Heey, Selecciona el tipo de vehículo!");
            return;
        }

        if (!tipoVeh) {
            setAlertTipo("ml-2 alinearizquierda textoalert");
        }

        if (!carroceriaVeh) {
            setAlertCarroceria("ml-2 alinearizquierda textoalert");
        }

        if (!marcaVeh && !marcaNoExiste) {
            setAlertMarca("ml-2 alinearizquierda textoalert");
        }

        if (!annoVeh) {
            setAlertAnno("ml-2 alinearizquierda textoalert");
        }

        if (!modeloVeh && !marcaNoExiste) {
            setAlertModelo("ml-2 alinearizquierda textoalert");
        }

        if (!cilindrajesVeh && !marcaNoExiste) {
            setAlertCilindraje("ml-2 alinearizquierda textoalert");
        }

        if (tipoVeh != 3)
            if (!transmisionVeh || transmisionVeh == 0) {
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

        if (!combustibleVeh) {
            setAlertCombustible("ml-2 alinearizquierda textoalert");
        }

        if (tipoVeh != 1 && tipoVeh != 6 && tipoVeh != 3)
            if (!traccionVeh || traccionVeh == 0) {
                setAlertTraccion("ml-2 alinearizquierda textoalert");
            }
        if (tipoVeh == 1 || tipoVeh == 6) {
            if (
                (!marcaVeh && !marcaNoExiste) ||
                !annoVeh ||
                (!modeloVeh && !marcaNoExiste) ||
                (!cilindrajesVeh && !marcaNoExiste) ||
                !carroceriaVeh ||
                !transmisionVeh ||
                !combustibleVeh
            ) {
                let texto =
                    "Heey, Todos los datos del vehículo son requeridos!";
                if (!combustibleVeh || combustibleVeh == 0) {
                    setAlertCombustible("ml-2 alinearizquierda textoalert");
                }

                if (!transmisionVeh || transmisionVeh == 0) {
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes(texto);
                return;
            }
        } else if (tipoVeh == 3) {
            if (
                (!marcaVeh && !marcaNoExiste) ||
                !annoVeh ||
                (!modeloVeh && !marcaNoExiste) ||
                (!cilindrajesVeh && !marcaNoExiste) ||
                !carroceriaVeh ||
                !combustibleVeh
            ) {
                let texto =
                    "Heey, Todos los datos del vehículo son requeridos!";

                if (!cilindrajesVeh || cilindrajesVeh == 0) {
                    setAlertCilindraje("ml-2 alinearizquierda textoalert");
                }

                if (!combustibleVeh || combustibleVeh == 0) {
                    setAlertCombustible("ml-2 alinearizquierda textoalert");
                }

                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes(texto);
                return;
            }
        } else {
            if (
                ((!marcaVeh && !marcaNoExiste) ||
                    !annoVeh ||
                    (!modeloVeh && !marcaNoExiste) ||
                    (!cilindrajesVeh && !marcaNoExiste) ||
                    !carroceriaVeh ||
                    !transmisionVeh ||
                    !combustibleVeh ||
                    !traccionVeh) &&
                tipoVeh != 3 &&
                tipoVeh != 4
            ) {
                let texto =
                    "Heey, Todos los datos del vehículo son requeridos!";
                if (!combustibleVeh || combustibleVeh == 0) {
                    setAlertCombustible("ml-2 alinearizquierda textoalert");
                }

                if (!transmisionVeh || transmisionVeh == 0) {
                    setAlertTransmision("ml-2 alinearizquierda textoalert");
                }

                if (
                    (!traccionVeh || traccionVeh == 0) &&
                    tipoVeh != 1 &&
                    tipoVeh != 6 &&
                    tipoVeh != 3
                ) {
                    setAlertTraccion("ml-2 alinearizquierda textoalert");
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
                    if (!marcaVeh || !modeloVeh || !cilindrajesVeh) {
                        setShowModalMensajes(true);
                        setTituloMensajes("Información del producto");
                        setTextoMensajes(
                            "Heey, Ingresa los datos del Cilindraje!"
                        );
                        return;
                    }
                }
            }

            if (editarCambioMarca == 2) {
                if (editarCambioModelo == 2 && editarCambioCilindraje == 2) {
                    console.log("OK");
                } else {
                    if (!marcaVeh || !modeloVeh || !cilindrajesVeh) {
                        setShowModalMensajes(true);
                        setTituloMensajes("Información del producto");
                        setTextoMensajes(
                            "Heey, Ingresa los datos de Modelo y Cilindraje!"
                        );
                        return;
                    }
                }
            }
        }

        settipoVehiculoSeleccionado(selectTipo);

        guardarVehiculo();

        //if (nuevoVehiculo) {
        //    setcontrolGrabar(true);
        //}
    };

    const iniciaInputMarca = () => {
        setValueMarca("");
    };

    const iniciaInputCilindraje = () => {
        setValueCilindraje("");
    };

    const switchMarca = (e) => {
        if (e.keyCode == 13) setOpenMarca(false);
    };

    const switchModelo = (e) => {
        if (e.keyCode == 13) setOpenModelo(false);
    };

    const switchCilindraje = (e) => {
        if (e.keyCode == 13) setOpenCilindraje(false);
    };

    return (
        <div className="mt-2 ml-12">
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
                <SwitchTransition>
                    <CSSTransition
                        classNames="fade"
                        key={interval}
                        addEndListener={(node, done) =>
                            node.addEventListener("transitionend", done, false)
                        }>
                        <div>
                            <Col>
                                <div>
                                    <Row>
                                        <Col xl={10} lg={10} md={10} xs={10}>
                                            <div>
                                                <Dropdown
                                                    onSelect={handleChange}
                                                    onClick={onClickTipo}>
                                                    <Dropdown.Toggle
                                                        className="mt-1 dropdowncustom"
                                                        disabled={habilitarTipo}
                                                        variant="outline-light"
                                                        id="dropdown-basic">
                                                        <div
                                                            className={
                                                                alertTipo
                                                            }>
                                                            {selectTipo}
                                                        </div>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        variant="outline-light"
                                                        //ref={targetEditUno}
                                                        className="tamañocajaoptions">
                                                        {tiposVehiculos &&
                                                            tiposVehiculos.map(
                                                                (item) => {
                                                                    return (
                                                                        <Dropdown.Item
                                                                            className="itemsdropdowncustom"
                                                                            onClick={() =>
                                                                                setSelectTipo(
                                                                                    item.text
                                                                                )
                                                                            }
                                                                            eventKey={
                                                                                item.id
                                                                            }>
                                                                            {
                                                                                item.text
                                                                            }
                                                                        </Dropdown.Item>
                                                                    );
                                                                }
                                                            )}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </Col>
                                        <Col xl={1} lg={1} md={1} xs={1}>
                                            <div className="cajaiconoguardar">
                                                <CheckIcon
                                                    onClick={() => {
                                                        grabarDatosVehiculos();
                                                    }}
                                                    style={{
                                                        fontSize: 25,
                                                    }}
                                                    className="iconocancelarguardar mlmenos15"></CheckIcon>
                                            </div>
                                        </Col>
                                        <Col
                                            xl={1}
                                            lg={1}
                                            md={1}
                                            xs={1}
                                            className="mlmenos2">
                                            <div className="cajaiconocancelar">
                                                <CloseIcon
                                                    onClick={() =>
                                                        validaEliminaDatosVehiculos()
                                                    }
                                                    style={{
                                                        fontSize: 25,
                                                    }}
                                                    className="iconocancelarguardar mlmenos15"></CloseIcon>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="espaciovariablescrearproducto">
                                        <Col xl={5} lg={5} md={5} xs={5}>
                                            <div>
                                                <Dropdown
                                                    onSelect={
                                                        handleChangeCarroceria
                                                    }
                                                    onClick={onClickCarroceria}>
                                                    <Dropdown.Toggle
                                                        className="mtmenos1 dropdowncustomitems"
                                                        variant="outline-light"
                                                        disabled={
                                                            habilitarCarroceria
                                                        }
                                                        id="dropdown-basic">
                                                        <div
                                                            className={
                                                                alertCarroceria
                                                            }>
                                                            {selectCarroceria}
                                                        </div>
                                                    </Dropdown.Toggle>
{
    console.log("NUM VEH AGRE : ",numeroVehiculosAgregados)
}
                                                    <Dropdown.Menu
                                                        variant="outline-light"
                                                        className="tamañocajaoptionsitems">
                                                        {numeroVehiculosAgregados ===
                                                        0
                                                            ? carrocerias &&
                                                              carrocerias.map(
                                                                  (item) => {
                                                                      return (
                                                                          <Dropdown.Item
                                                                              className="itemsdropdowncustom"
                                                                              onClick={() =>
                                                                                  setSelectCarroceria(
                                                                                      item.label
                                                                                  )
                                                                              }
                                                                              eventKey={
                                                                                  item.value
                                                                              }>
                                                                              {
                                                                                  item.label
                                                                              }
                                                                          </Dropdown.Item>
                                                                      );
                                                                  }
                                                              )
                                                            : listadoCarrocerias &&
                                                              listadoCarrocerias.map(
                                                                  (item) => {
                                                                      return (
                                                                          <Dropdown.Item
                                                                              className="itemsdropdowncustom"
                                                                              onClick={() =>
                                                                                  setSelectCarroceria(
                                                                                      item.label
                                                                                  )
                                                                              }
                                                                              eventKey={
                                                                                  item.value
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
                                        {!nuevoVehiculo ? (
                                            <Col xl={6} lg={6} md={6} xs={6}>
                                                <div className="mlmenos5">
                                                    <Dropdown
                                                        onSelect={
                                                            handleChangeBrand
                                                        }
                                                        onClick={onClickMarca}>
                                                        <Dropdown.Toggle
                                                            onclick={
                                                                CustomToggle
                                                            }
                                                            id="dropdown-custom-components"
                                                            arrowColor="#2D2E83"
                                                            disabled={
                                                                habilitarMarca
                                                            }
                                                            className="mtmenos1 dropdowncustomitems"
                                                            variant="outline-light"
                                                            value={marcaVeh}>
                                                            <div
                                                                className={
                                                                    alertMarca
                                                                }>
                                                                {selectMarca}
                                                            </div>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu
                                                            as={CustomMenu}
                                                            variant="outline-light"
                                                            className="tamañocajaoptionsitemsdos">
                                                            {marcas &&
                                                                marcas.map(
                                                                    (item) => {
                                                                        return (
                                                                            <Dropdown.Item
                                                                                className="itemsdropdowncustom"
                                                                                onClick={() =>
                                                                                    setSelectMarca(
                                                                                        item.text
                                                                                    )
                                                                                }
                                                                                eventKey={
                                                                                    item.id
                                                                                }>
                                                                                {
                                                                                    item.text
                                                                                }
                                                                            </Dropdown.Item>
                                                                        );
                                                                    }
                                                                )}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </Col>
                                        ) : (
                                            <Col xl={6} lg={6} md={6} xs={6}>
                                                <div className="mlmenos5">
                                                    <Dropdown
                                                        open="true"
                                                        onClick={onClickMarca}>
                                                        <Dropdown.Toggle
                                                            onclick={
                                                                CustomToggle
                                                            }
                                                            id="dropdown-custom-components"
                                                            arrowColor="#2D2E83"
                                                            disabled={
                                                                habilitarMarca
                                                            }
                                                            className="mtmenos1 dropdowncustomitems"
                                                            variant="outline-light"
                                                            onMouseEnter={
                                                                iniciaInputMarca
                                                            }
                                                            value={marcaVeh}>
                                                            <div
                                                                className={
                                                                    alertMarca
                                                                }>
                                                                {selectMarca}
                                                            </div>
                                                        </Dropdown.Toggle>
                                                        {openMarca ? (
                                                            listaNuevasMarcas ? (
                                                                <Dropdown.Menu>
                                                                    <div>
                                                                        <input
                                                                            list="idmarca"
                                                                            id="myBrand"
                                                                            autoComplete="off"
                                                                            onKeyUp={(
                                                                                e
                                                                            ) =>
                                                                                switchMarca(
                                                                                    e
                                                                                )
                                                                            }
                                                                            placeholder="Ingrese marca"
                                                                            value={
                                                                                valueMarca
                                                                            }
                                                                            className="inputbuscarvehiculos"
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleChangeBrand(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />

                                                                        <ListGroup
                                                                            id="idmarca"
                                                                            className="itemsdropdowncustomcrear">
                                                                            {marcas &&
                                                                                marcas.map(
                                                                                    (
                                                                                        item
                                                                                    ) => {
                                                                                        return (
                                                                                            <ListGroup.Item
                                                                                                className="listgroupitemscrear"
                                                                                                onClick={(
                                                                                                    e
                                                                                                ) =>
                                                                                                    inputMarca(
                                                                                                        item.text,
                                                                                                        item.id
                                                                                                    )
                                                                                                }>
                                                                                                {
                                                                                                    item.text
                                                                                                }
                                                                                            </ListGroup.Item>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                        </ListGroup>
                                                                    </div>
                                                                </Dropdown.Menu>
                                                            ) : null
                                                        ) : null}
                                                    </Dropdown>
                                                </div>
                                            </Col>
                                        )}
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
                                                        disabled={habilitarAnno}
                                                        className="mt-1 dropdowncustomitems"
                                                        variant="outline-light">
                                                        <div
                                                            className={
                                                                alertAnno
                                                            }>
                                                            {selectAnno}
                                                        </div>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        as={CustomMenu}
                                                        variant="outline-light"
                                                        ref={targetEditUno}
                                                        className="tamañocajaoptionsitemsdos">
                                                        {annos &&
                                                            annos.map(
                                                                (item) => {
                                                                    return (
                                                                        <Dropdown.Item
                                                                            className="mtmenos6 itemsdropdowncustom"
                                                                            onClick={() =>
                                                                                setSelectAnno(
                                                                                    item.label
                                                                                )
                                                                            }
                                                                            eventKey={
                                                                                item.value
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
                                        {!nuevoVehiculo ? (
                                            <Col xl={6} lg={6} md={6} xs={6}>
                                                <div className="mlmenos5">
                                                    <Dropdown
                                                        onSelect={
                                                            handleChangeModels
                                                        }
                                                        onClick={onClickModelo}>
                                                        <Dropdown.Toggle
                                                            onclick={
                                                                CustomToggle
                                                            }
                                                            id="dropdown-custom-components"
                                                            arrowColor="#2D2E83"
                                                            disabled={
                                                                habilitarModelo
                                                            }
                                                            className="mt-1 dropdowncustomitems"
                                                            variant="outline-light">
                                                            <div
                                                                className={
                                                                    alertModelo
                                                                }>
                                                                {selectModelo}
                                                            </div>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu
                                                            as={CustomMenu}
                                                            variant="outline-light"
                                                            className="tamañocajaoptionsitemsdos">
                                                            {modelos &&
                                                                modelos.map(
                                                                    (item) => {
                                                                        return (
                                                                            <Dropdown.Item
                                                                                className="itemsdropdowncustom"
                                                                                onClick={() =>
                                                                                    setSelectModelo(
                                                                                        item.label
                                                                                    )
                                                                                }
                                                                                eventKey={
                                                                                    item.value
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
                                        ) : (
                                            <Col xl={6} lg={6} md={6} xs={6}>
                                                <div className="mlmenos5">
                                                    <Dropdown
                                                        onClick={onClickModelo}>
                                                        <Dropdown.Toggle
                                                            onclick={
                                                                CustomToggle
                                                            }
                                                            id="InputNext"
                                                            arrowColor="#2D2E83"
                                                            disabled={
                                                                habilitarModelo
                                                            }
                                                            className="mt-1 dropdowncustomitems"
                                                            variant="outline-light">
                                                            <div
                                                                className={
                                                                    alertModelo
                                                                }>
                                                                {selectModelo}
                                                            </div>
                                                        </Dropdown.Toggle>
                                                        {openModelo ? (
                                                            listaNuevosModelos ? (
                                                                <Dropdown.Menu>
                                                                    <input
                                                                        list="idmodelo"
                                                                        id="myModels"
                                                                        autoComplete="off"
                                                                        placeholder="Ingrese modelo"
                                                                        className="inputbuscarvehiculos"
                                                                        onKeyUp={(
                                                                            e
                                                                        ) =>
                                                                            switchModelo(
                                                                                e
                                                                            )
                                                                        }
                                                                        value={
                                                                            valueModelo
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleChangeModels(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />

                                                                    <ListGroup
                                                                        id="idmodelo"
                                                                        className="itemsdropdowncustomcrear">
                                                                        {modelos &&
                                                                            modelos.map(
                                                                                (
                                                                                    item
                                                                                ) => {
                                                                                    return (
                                                                                        <ListGroup.Item
                                                                                            className="listgroupitemscrear"
                                                                                            onClick={(
                                                                                                e
                                                                                            ) =>
                                                                                                inputModelo(
                                                                                                    item.label,
                                                                                                    item.id
                                                                                                )
                                                                                            }>
                                                                                            {
                                                                                                item.label
                                                                                            }
                                                                                        </ListGroup.Item>
                                                                                    );
                                                                                }
                                                                            )}
                                                                    </ListGroup>
                                                                </Dropdown.Menu>
                                                            ) : null
                                                        ) : null}
                                                    </Dropdown>
                                                </div>
                                            </Col>
                                        )}
                                    </Row>
                                    <Row className="espaciovariablescrearproductodos">
                                        {!nuevoVehiculo ? (
                                            <Col xl={5} lg={5} md={5} xs={5}>
                                                <Dropdown
                                                    onSelect={
                                                        handleChangeVersionMotor
                                                    }
                                                    onClick={onClickCilindraje}>
                                                    <Dropdown.Toggle
                                                        className="dropdowncustomitems"
                                                        variant="outline-light"
                                                        disabled={
                                                            habilitarCilindraje
                                                        }
                                                        id="dropdown-basic">
                                                        <div
                                                            className={
                                                                alertCilindraje
                                                            }>
                                                            {selectCilindraje}
                                                        </div>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        variant="outline-light"
                                                        type="numeric"
                                                        className="tamañocajaoptionsitems">
                                                        {cilindrajes &&
                                                            cilindrajes.map(
                                                                (item) => {
                                                                    return (
                                                                        <Dropdown.Item
                                                                            className="itemsdropdowncustom"
                                                                            onClick={() =>
                                                                                setSelectCilindraje(
                                                                                    item.label
                                                                                )
                                                                            }
                                                                            eventKey={
                                                                                item.value
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
                                            </Col>
                                        ) : (
                                            <Col xl={5} lg={5} md={5} xs={5}>
                                                <Dropdown
                                                    onClick={onClickCilindraje}>
                                                    <Dropdown.Toggle
                                                        className="dropdowncustomitemsnuevo"
                                                        variant="outline-light"
                                                        disabled={
                                                            habilitarCilindraje
                                                        }
                                                        id="dropdown-custom-components"
                                                        onclick={CustomToggle}
                                                        onMouseEnter={
                                                            iniciaInputCilindraje
                                                        }
                                                        arrowColor="#2D2E83">
                                                        <div
                                                            className={
                                                                alertCilindraje
                                                            }>
                                                            {selectCilindraje}
                                                        </div>
                                                    </Dropdown.Toggle>
                                                    {openCilindraje ? (
                                                        listaNuevosCilindraje ? (
                                                            <Dropdown.Menu>
                                                                <input
                                                                    list="idcilindraje"
                                                                    id="myCilindraje"
                                                                    autoComplete="off"
                                                                    type="text"
                                                                    placeholder="Ingrese cilindraje"
                                                                    className="inputbuscarvehiculos"
                                                                    onKeyUp={(
                                                                        e
                                                                    ) =>
                                                                        switchCilindraje(
                                                                            e
                                                                        )
                                                                    }
                                                                    value={
                                                                        valueCilindraje
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleChangeVersionMotor(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                <ListGroup
                                                                    id="idcilindraje"
                                                                    className="itemsdropdowncustomcrearcilindraje 
                                                                                       list-groupcilindraje">
                                                                    {cilindrajes &&
                                                                        cilindrajes.map(
                                                                            (
                                                                                item
                                                                            ) => {
                                                                                return (
                                                                                    <ListGroup.Item
                                                                                        className="listgroupitemscrear"
                                                                                        onClick={(
                                                                                            e
                                                                                        ) =>
                                                                                            inputCilindraje(
                                                                                                item.label,
                                                                                                item.id
                                                                                            )
                                                                                        }>
                                                                                        {
                                                                                            item.label
                                                                                        }
                                                                                    </ListGroup.Item>
                                                                                );
                                                                            }
                                                                        )}
                                                                </ListGroup>
                                                            </Dropdown.Menu>
                                                        ) : null
                                                    ) : null}
                                                </Dropdown>
                                            </Col>
                                        )}
                                        <Col xl={6} lg={6} md={6} xs={6}>
                                            <div className="mlmenos5">
                                                <Dropdown
                                                    onSelect={
                                                        handleChangeTransmision
                                                    }
                                                    onClick={
                                                        onClickTransmision
                                                    }>
                                                    <Dropdown.Toggle
                                                        className="dropdowncustomitems"
                                                        disabled={
                                                            showTransmision
                                                        }
                                                        variant="outline-light"
                                                        id="dropdown-basic">
                                                        <div
                                                            className={
                                                                alertTransmision
                                                            }>
                                                            {selectTransmision}
                                                        </div>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        variant="outline-light"
                                                        className="tamañocajaoptionsitems">
                                                        {transmision &&
                                                            transmision.map(
                                                                (item) => {
                                                                    return (
                                                                        <Dropdown.Item
                                                                            className="itemsdropdowncustom"
                                                                            onClick={() =>
                                                                                setSelectTransmision(
                                                                                    item.label
                                                                                )
                                                                            }
                                                                            eventKey={
                                                                                item.value
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
                                    <Row className="espaciovariablescrearproductodos">
                                        <Col xl={5} lg={5} md={5} xs={5}>
                                            <Dropdown
                                                onSelect={
                                                    handleChangeCombustible
                                                }
                                                onClick={onClickCombustible}>
                                                <Dropdown.Toggle
                                                    className="dropdowncustomitemsizquierda"
                                                    disabled={
                                                        habilitarCombustible
                                                    }
                                                    variant="outline-light"
                                                    id="dropdown-basic">
                                                    <div
                                                        className={
                                                            alertCombustible
                                                        }>
                                                        {selectCombustible}
                                                    </div>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    variant="outline-light"
                                                    className="tamañocajaoptionsitems">
                                                    {combustible &&
                                                        combustible.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustom"
                                                                        onClick={() =>
                                                                            setSelectCombustible(
                                                                                item.label
                                                                            )
                                                                        }
                                                                        eventKey={
                                                                            item.value
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
                                        </Col>
                                        <Col xl={6} lg={6} md={6} xs={6}>
                                            <div className="mlmenos5">
                                                <Dropdown
                                                    onSelect={
                                                        handleChangeTraccion
                                                    }
                                                    onClick={onClickTraccion}>
                                                    <Dropdown.Toggle
                                                        className="dropdowncustomitemsderecha"
                                                        disabled={showTraccion}
                                                        variant="outline-light"
                                                        id="dropdown-basic">
                                                        <div
                                                            className={
                                                                alertTraccion
                                                            }>
                                                            {selectTraccion}
                                                        </div>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        variant="outline-light"
                                                        className="tamañocajaoptionsitems">
                                                        {tipotraccion &&
                                                            tipotraccion.map(
                                                                (item) => {
                                                                    return (
                                                                        <Dropdown.Item
                                                                            className="itemsdropdowncustom"
                                                                            onClick={() =>
                                                                                setSelectTraccion(
                                                                                    item.label
                                                                                )
                                                                            }
                                                                            eventKey={
                                                                                item.value
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
                            </Col>
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </Row>
        </div>
    );
}

export default DatosVehiculos;
