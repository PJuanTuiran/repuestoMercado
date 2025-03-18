import React, { useState, useEffect, useRef } from "react";
import ContainerResult from "~/components/layouts/ContainerResult";
import swal from "sweetalert";
import { Row, Col, Dropdown, Form, ListGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import ModalMensajesHistoryVeh from "../mensajes/ModalMensajesHistoryVeh";
import ModalMensajesContactanos from "../mensajes/ModalMensajesContactanos";
import ModalMensajes from "../mensajes/ModalMensajes";
import { getDataSearchInteractive } from "../../store/datasearchinteractive/action";
import { URL_BD_MR } from "../../helpers/Constants";

import axios from "axios";
import Moment from "moment";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import SearchContact from "../searchcontact"

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

let consveh = 600000;
let nombrecilindrajesel = 0;
let valorcilindrajesel = 0;

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
                { }
            </div>
        );
    }
);

function AddVehicleHistorySearch(props) {
    const dispatch = useDispatch();
    const [alertTipo, setAlertTipo] = useState("ml-2 alinearizquierda");
    const targetEditUno = useRef(null);
    const irA = useRef(null);
    const [tipoVeh, setTipoVeh] = useState(0);
    const router = useRouter();
    const [selectTipo, setSelectTipo] = useState("Tipo Vehículo");
    const [selectModelo, setSelectModelo] = useState("Modelo");
    const [selectAnno, setSelectAnno] = useState("Año");
    const [selectCarroceria, setSelectCarroceria] = useState("Carroceria");
    const [selectMarca, setSelectMarca] = useState("Marca");
    const [selectCilindraje, setSelectCilindraje] = useState("Cilindraje");
    const [selectTransmision, setSelectTransmision] = useState("Transmisión");
    const [selectCombustible, setSelectCombustible] = useState("Combustible");
    const [selectTraccion, setSelectTraccion] = useState("Tracción");

    const [showModalMensajesCity, setShowModalMensajesCity] = useState(false);
    const [tituloMensajesCity, setTituloMensajesCity] = useState("");
    const [textoMensajesCity, setTextoMensajesCity] = useState("");

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [showModalMensajesHistory, setShowModalMensajesHistory] = useState(false);
    const [tituloMensajesHistory, setTituloMensajesHistory] = useState(false);
    const [textoMensajesHistory, setTextoMensajesHistory] = useState(false);

    const [textoBoton, setTextoBoton] = useState("Seguir comprando");

    const [tiposVehiculos, setTiposVehiculos] = useState([]);
    const [annos, setAnnos] = useState([]);
    const [listMarcas, setListMarcas] = useState([]);
    const [listCarrocerias, setListCarrocerias] = useState([]);
    const [listModelos, setListModelos] = useState([]);
    const [listCilindrajes, setListCilindrajes] = useState([]);

    const [habilitarTipo, setHabilitarTipo] = useState(false);
    const [habilitarCarroceria, setHabilitarCarroceria] = useState(true);
    const [habilitarMarca, setHabilitarMarca] = useState(true);
    const [habilitarAnno, setHabilitarAnno] = useState(true);
    const [habilitarModelo, setHabilitarModelo] = useState(true);
    const [habilitarCilindraje, setHabilitarCilindraje] = useState(true);
    const [habilitarCombustible, setHabilitarCombustible] = useState(true);
    const [habilitarTransmision, setHabilitarTransmision] = useState(true);
    const [habilitarTraccion, setHabilitarTraccion] = useState(true);
    const [nombreAnnoVeh, setNombreAnnoVeh] = useState("Año");

    const [alertMarca, setAlertMarca] = useState("ml-2 alinearizquierda");
    const [alertCarroceria, setAlertCarroceria] = useState(
        "ml-2 alinearizquierda"
    );

    const [selectMarcaEdit, setSelectMarcaEdit] = useState("Marca");
    const [openMarca, setOpenMarca] = useState(true);
    const [openModelo, setOpenModelo] = useState(null);
    const [openCilindraje, setOpenCilindraje] = useState(true);

    // Inicializamos el arrego de Tipos de Vehiculos
    const [marcas, setMarcas] = useState([]);
    const [cilindrajes, setCilindrajes] = useState([]);
    const [modelos, setModels] = useState([]);
    const [carrocerias, setCarrocerias] = useState([]);

    const [annoVeh, setAnnoVeh] = useState(null);
    const [modeloVeh, setModeloVeh] = useState(null);
    const [marcaVeh, setMarcaVeh] = useState(null);
    const [cilindrajesVeh, setCilindrajesVeh] = useState(null);
    const [carroceriaVeh, setCarroceriaVeh] = useState(null);
    const [transmisionVeh, setTransmisionVeh] = useState(null);
    const [combustibleVeh, setCombustibleVeh] = useState(null);
    const [traccionVeh, setTraccionVeh] = useState(null);

    // Caracteristicas seleccionadas por vehiculo
    // Caracteristicas seleccionadas por vehiculo
    const [nombreTransmisionVeh, setNombreTransmisionVeh] = useState(null);
    const [nombreCombustibleVeh, setNombreCombustibleVeh] = useState(null);
    const [nombreTraccionVeh, setNombreTraccionVeh] = useState(null);

    const [editarTipo, setEditarTipo] = useState(false);
    const [editarCarroceria, setEditarCarroceria] = useState(false);

    const [editarAnnoVeh, setEditarAnnoVeh] = useState([]);
    const [editarCarroceriaVeh, setEditarCarroceriaVeh] = useState([]);

    const [valueMarca, setValueMarca] = useState("");
    const [valueModelo, setValueModelo] = useState("");
    const [valueCilindraje, setValueCilindraje] = useState("");
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

    const [dataBrand, setDataBrand] = useState(null);

    const [codigoTipoSel, setCodigoTipoSel] = useState(0);
    const [codigoModeloSel, setCodigoModeloSel] = useState(0);
    const [codigoAnnoSel, setCodigoAnnoSel] = useState(0);
    const [codigoCarroceriaSel, setCodigoCarroceriaSel] = useState(0);
    const [codigoMarcaSel, setCodigoMarcaSel] = useState(0);
    const [codigoCilindrajeSel, setCodigoCilindrajeSel] = useState(0);
    const [codigoTransmisionSel, setCodigoTransmisionSel] = useState(0);
    const [codigoCombustibleSel, setCodigoCombustibleSel] = useState(0);
    const [codigoTraccionSel, setCodigoTraccionSel] = useState(0);
    const [openCloseDatosVeh, setOpenCloseDatosVeh] = useState(0);

    const [habilitarEnviar, setHabilitarEnviar] = useState(false);
    const [emailContact, setEmailContact] = useState(null);

    const datosgenerales = useSelector(
        (state) => state.datosgenerales.datosgenerales
    );
    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    //console.log("USER : ", datosusuarios.email)

    let datosvehiculos = datosgenerales.vgl_tiposvehiculos;

    useEffect(() => {
        //setEmailContact(datosusuarios.email);
    }, [datosusuarios]);


    useEffect(() => {
        setTiposVehiculos(datosgenerales.vgl_tiposvehiculos);
        setListMarcas(datosgenerales.vgl_marcasvehiculos);
        setListCarrocerias(datosgenerales.vgl_carroceriasvehiculos);
        setListModelos(datosgenerales.vgl_modelosvehiculos);
        setListCilindrajes(datosgenerales.vgl_cilindrajesvehiculos);
        setAnnos(datosgenerales.vgl_annosvehiculos);
    }, [datosgenerales]);

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
        setCodigoTipoSel(selectedOptions)
        setCarroceriaVeh(null);
        setMarcaVeh(null);
        setAnnoVeh(null);
        setModeloVeh(null);
        setCilindrajesVeh(null);

        setSelectModelo("Modelo");
        setSelectCarroceria("Carroceria");
        setSelectMarca("Marca");
        setSelectAnno("Año");
        setSelectCilindraje("Cilindraje");
        setSelectTransmision("Transmisión");
        setSelectCombustible("Combustible");
        setSelectTraccion("Tracción");

        setAlertTipo("ml-2 alinearizquierda");
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
        setHabilitarMarca(true);
        setHabilitarAnno(true);
        setHabilitarModelo(true);
        setHabilitarCilindraje(true);
        setHabilitarCombustible(true);
        setHabilitarTransmision(true);
        setHabilitarTraccion(true);

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
            setSelectTransmision("");
            setHabilitarTraccion(true);
            setSelectTraccion("");
            setSelectCombustible("");
        } else if (
            selectedOptions == 1 ||
            selectedOptions == 3 ||
            selectedOptions == 4 ||
            selectedOptions == 6
        ) {
            setSelectTransmision("Transmisión");
            setSelectTraccion("");
        } else {
            setSelectTransmision("Transmisión");
            setSelectTraccion("Tracción");
        }
    }

    const onClickTipo = (selectedOptions) => {

    }

    const handleChangeCarroceria = (selectedOptions) => {
        setCodigoCarroceriaSel(selectedOptions);
        setCarroceriaVeh(selectedOptions);
        setMarcaVeh(null);
        //setAnnoVeh(null);
        setModeloVeh(null);
        setCilindrajesVeh(null);
        //setTransmisionVeh(null);
        //setCombustibleVeh(null);
        setEditarCarroceria(true);
        setEditarCarroceriaVeh(selectedOptions);
        setCarroceriaVeh(selectedOptions);
        setAlertCarroceria("ml-2 alinearizquierda");

        setSelectModelo("Modelo");
        setSelectMarca("Marca");
        setSelectCilindraje("Cilindraje");
        //setSelectTransmision("Transmisión");
        //setSelectCombustible("Combustible");
        //setSelectTraccion("Tracción");

        listCarrocerias &&
            listCarrocerias.forEach((row) => {
                if (
                    Number.parseInt(row.id) === Number.parseInt(selectedOptions)
                ) {
                    //setNombreCarroceriaVeh(row.carroceria);
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
        //setMarcasInicia(newDet);
        setHabilitarMarca(false);
    }

    const handleChangeBrand = (selectedOptions) => {
        setMarcaVeh(selectedOptions);
        let codigomarca = selectedOptions;
        let selectmarca = [];

        let find = false;
        let codigo = 0;

        setSelectModelo("Modelo");
        setSelectMarca("Marca");
        setSelectCilindraje("Cilindraje");
        setAlertMarca("ml-2 alinearizquierda");

        marcas &&
            marcas.map((row, index) => {
                if (row.text == selectedOptions) {
                    selectmarca.push(row);
                    find = true;
                    codigo = row.id;
                }
            });

        if (!find) {
            let incremento = consveh + 1;
            setCodigoMarcaSel(incremento);
            setMarcaVeh(incremento);
            consveh = incremento;
        } else {
            setCodigoMarcaSel(codigo);
            setMarcaVeh(incremento);
        }

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
        setMarcas([newDet]);

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

        listMarcas.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                if (row.text) setSelectMarca(row.text);
            }
        });

        setValueMarca(selectedOptions);

        let leemarca = false;
        listMarcas &&
            listMarcas.forEach((row) => {
                if (
                    Number.parseInt(row.id) ===
                    Number.parseInt(selectedOptions)
                ) {
                    //setNombreMarcaVeh(row.text);
                    leemarca = true;
                }
            });

        let newDetMod = [];

        if (selectedOptions > 0) {
            listModelos &&
                listModelos.map((row, index) => {
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
        }

        if (leemarca) setModels(newDetMod);
        else setModels([]);
        setHabilitarAnno(false);
    }

    const handleChangeModels = (selectedOptions) => {
        let codigomodelo = 0;
        let selectmodelo = [];
        setSelectCilindraje("Cilindraje");

        setValueModelo(selectedOptions);
        setSelectModelo(selectedOptions);
        setAlertModelo("ml-2 alinearizquierda");

        let leemodelo = false;
        listModelos &&
            listModelos.forEach((row) => {
                if (
                    Number.parseInt(row.modelo) ===
                    Number.parseInt(selectedOptions)
                ) {
                    //setNombreModeloVeh(row.modelo);
                    leemodelo = true;
                    codigomodelo = row.id;
                    setCodigoModeloSel(row.id);
                    setModeloVeh(row.id);
                }
            });

        let find = false;
        let codigo = 0;
        listModelos &&
            listModelos.map((row, index) => {
                if (row.modelo == selectedOptions) {
                    selectmodelo.push(row);
                    find = true;
                    codigo = row.id;
                }
            });

        if (!find) {
            let incremento = consveh + 1;
            setCodigoModeloSel(incremento);
            setModeloVeh(incremento)
            consveh = incremento;
        } else {
            setCodigoModeloSel(codigo)
            setModeloVeh(codigo)
        }

        //console.log(consveh)

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
    };

    const handleChangeCilindraje = (selectedOptions) => {
        let codigocilindraje = 0;
        let selectcilindraje = [];

        setValueCilindraje(selectedOptions);
        setSelectCilindraje(selectedOptions);
        setAlertCilindraje("ml-2 alinearizquierda");

        let leecilindraje = false;
        listCilindrajes &&
            listCilindrajes.forEach((row) => {
                if (
                    Number.parseInt(row.cilindraje) ===
                    Number.parseInt(selectedOptions)
                ) {
                    //setNombreModeloVeh(row.modelo);
                    leecilindraje = true;
                    codigocilindraje = row.id;
                    setCodigoCilindrajeSel(row.id);
                    setCilindrajesVeh(row.id);
                }
            });

        let find = false;
        let codigo = 0;
        listCilindrajes &&
            listCilindrajes.map((row, index) => {
                if (row.cilindraje == selectedOptions) {
                    selectcilindraje.push(row);
                    find = true;
                    codigo = row.id;
                }
            });

        if (!find) {
            let incremento = consveh + 1;
            setCodigoCilindrajeSel(incremento);
            setCilindrajesVeh(incremento);
            consveh = incremento;
        } else {
            setCilindrajesVeh(codigo);
            setCodigoCilindrajeSel(codigo);
        }

        let newDet = [];

        if (codigoTipoSel == 3 || codigoTipoSel == 4) {
            setHabilitarTransmision(true);
            setHabilitarTraccion(true);
            setSelectTransmision("");
            setSelectTraccion("");
            setHabilitarCombustible(false);
        } else
            if (codigoTipoSel == 1 || codigoTipoSel == 3 || codigoTipoSel == 4 || codigoTipoSel == 6) {
                setHabilitarTraccion(true);
                setSelectTransmision("");
                setHabilitarTransmision(false);
                setSelectTransmision("Transmisión");
            } else {
                //setHabilitarTraccion(false);
                //setSelectTransmision("Tracción");
                setHabilitarTransmision(false);
                setSelectTransmision("Transmisión");
            }

    };

    const handleChangeAnno = (selectedOptions) => {
        setAnnoVeh(selectedOptions);
        setEditarAnnoVeh(selectedOptions);
        setCodigoAnnoSel(selectedOptions);
        setAnnoVeh(selectedOptions);
        setAlertAnno("tamañocajaoptionsitemssearch");

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

    const handleChangeTransmision = (selectedOptions) => {
        setTransmisionVeh(selectedOptions);
        setCodigoTransmisionSel(selectedOptions);
        setTransmisionVeh(selectedOptions);
        setAlertTransmision("ml-2 alinearizquierda");

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
        setCodigoCombustibleSel(selectedOptions);
        setCombustibleVeh(selectedOptions);
        setAlertCombustible("ml-2 alinearizquierda");

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
            setHabilitarTraccion(true);
            setSelectTraccion("");
        } else if (
            tipoVeh == 1 ||
            tipoVeh == 3 ||
            tipoVeh == 4 ||
            tipoVeh == 6
        ) {
            setHabilitarTraccion(true);
            setSelectTraccion("");
        } else {
            setHabilitarTraccion(false);
            //setSelectTraccion("Tracción");
        }
    };

    const handleChangeTraccion = (selectedOptions) => {
        setTraccionVeh(selectedOptions);
        setCodigoTraccionSel(selectedOptions);
        setTraccionVeh(selectedOptions);
        setAlertTraccion("ml-2 alinearizquierda");

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

    const onClickAnno = () => {
        setAlertAnno("tamañocajaoptionsitemssearch");
    };

    const onClickMarca = () => {
        setAlertMarca("ml-2 alinearizquierda");

        if (!openMarca) {
            setOpenMarca(true);
        }
    }

    const onClickCarroceria = () => {
        setAlertCarroceria("ml-2 alinearizquierda");
    };

    const onClickModelo = () => {
        setAlertModelo("ml-2 alinearizquierda");

        if (!openModelo) {
            setOpenModelo(true);
        }
    }

    const switchModelo = (e) => {
        if (e.keyCode == 13) setOpenModelo(false);
        //setOpenModelo(false);
    };

    const inputModelo = (dato, valor) => {

        setHabilitarCilindraje(false);
        setModeloVeh(valor);
        setValueModelo(dato);
        setSelectModelo(dato);
        setOpenModelo(false);
        setSelectCilindraje("Cilindraje");

        let selectmodelo = [];
        let find = false;
        let codigo = 0;
        listModelos &&
            listModelos.map((row, index) => {
                if (row.modelo == dato) {
                    selectmodelo.push(row);
                    find = true;
                    codigo = row.id;
                }
            });

        if (!find) {
            let incremento = consveh + 1;
            setCodigoModeloSel(incremento);
            setModeloVeh(incremento)
            consveh = incremento;
        } else {
            setCodigoModeloSel(codigo)
            setModeloVeh(codigo)
        }

        let newDet = [];
        if (valor > 0) {
            let modelo = valor;
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
                            cilindraje: row.cilindraje,
                        };
                        newDet.push(item);
                    }
                });
        }

        if (newDet) setCilindrajes(newDet);
        else setCilindrajes([]);

    };

    const onClickCilindraje = () => {
        setAlertCilindraje("ml-2 alinearizquierda");

        if (!openCilindraje) {
            setOpenCilindraje(true);
        }
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

    const iniciaInputMarca = () => {
        setValueMarca("");
    };

    const inputMarca = (dato, valor) => {

        setSelectModelo("Modelo");
        setSelectCilindraje("Cilindraje");

        setHabilitarAnno(false);
        setValueMarca(dato);
        setSelectMarca(dato);
        setOpenMarca(false);

        let selectmarca = [];
        let find = false;
        let codigo = 0;
        marcas &&
            marcas.map((row, index) => {
                if (row.text == dato) {
                    selectmarca.push(row);
                    find = true;
                    codigo = row.id;
                }
            });

        if (!find) {
            let incremento = consveh + 1;
            setCodigoMarcaSel(incremento);
            setMarcaVeh(incremento);
            consveh = incremento;
        } else {
            setCodigoMarcaSel(codigo);
            setMarcaVeh(codigo);
        }
        //console.log("OPTIONSXXX : ", dato)
        //console.log("FINDXXX: ", find)
        let newDetMod = [];

        listModelos &&
            listModelos.map((row, index) => {
                if (
                    Number.parseInt(row.marca) ===
                    Number.parseInt(valor) &&
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
    };

    const iniciaInputModelo = () => {
        setValueModelo("");
    };

    const iniciaInputCilindraje = () => {
        setValueCilindraje("");
    };

    const inputCilindraje = (dato, valor) => {
        setHabilitarTransmision(false);
        setCilindrajesVeh(valor);
        setValueCilindraje(dato);
        setSelectCilindraje(dato);

        nombrecilindrajesel = dato;
        valorcilindrajesel = valor;

        setOpenCilindraje(false);

        if (codigoTipoSel == 3 || codigoTipoSel == 4) {
            setHabilitarTransmision(true);
            setHabilitarTraccion(true);
            setSelectTransmision("");
            setSelectTraccion("");
        } else
            if (codigoTipoSel == 1 || codigoTipoSel == 3 || codigoTipoSel == 4 || codigoTipoSel == 6) {
                setHabilitarTraccion(true);
                setSelectTransmision("");
                setHabilitarTransmision(false);
                setSelectTransmision("Transmisión");
            } else {
                //setHabilitarTraccion(false);
                //setSelectTransmision("Tracción");
                //setHabilitarTransmision(false);
                //setSelectTransmision("Transmisión");
            }

        if (codigoTipoSel == 3)
            setHabilitarCombustible(false);

        let selectcilindraje = [];
        let find = false;
        let codigo = 0;
        listCilindrajes &&
            listCilindrajes.map((row, index) => {
                if (row.modelo == codigoModeloSel) {
                    selectcilindraje.push(row);
                    find = true;
                    codigo = row.id;
                }
            });

        if (!find) {
            let incremento = consveh + 1;
            setCodigoCilindrajeSel(incremento)
            setCilindrajesVeh(incremento);
            consveh = incremento;
        } else {
            setCodigoCilindrajeSel(codigo)
            setCilindrajesVeh(codigo);
        }

    };

    const switchMarca = (e) => {
        //if (e.keyCode == 13) setOpenMarca(false);
    };

    const switchCilindraje = (e) => {
        if (e.keyCode == 13) setOpenCilindraje(false);
    };

    const enviarDatos = () => {
        let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(emailContact);

        if (!validEmail || !emailContact) {
            setShowModalMensajes(true);
            setTituloMensajes("Información contactanos");
            setTextoMensajes(
                "Por favor, ingresa un email valido!"
            );
            return
        } else {
            //console.log("OK")
            let idusuario = null;
            if (!datosusuarios.uid || datosusuarios.uid == 0)
                idusuario = emailContact;
            else
                idusuario = datosusuarios.uid;

            let params = {
                uidusuario: idusuario,
                tipovehiculo: parseInt(codigoTipoSel),
                modelo: parseInt(codigoModeloSel),
                anno: parseInt(codigoAnnoSel),
                carroceria: parseInt(codigoCarroceriaSel),
                marca: parseInt(codigoMarcaSel),
                cilindraje: parseInt(codigoCilindrajeSel),
                transmision: parseInt(codigoTransmisionSel),
                combustible: parseInt(codigoCombustibleSel),
                traccion: parseInt(codigoTraccionSel),
                selecttipo: selectTipo,
                selectcarroceria: selectCarroceria,
                selectmarca: selectTransmision,
                selectanno: selectAnno,
                selectmarca: selectMarca,
                selectmodelo: selectModelo,
                selectcilindraje: selectCilindraje,
                selecttransmision: selectTransmision,
                selectcombustible: selectCombustible,
                selecttraccion: selectTraccion,
                estado: 120
            }

            const GrabarVehNuevo = async () => {

                try {
                    const res = await axios({
                        method: "post",
                        url: URL_BD_MR + "196", params
                    });
                    console.log("Respuesta recibida: ", res.data);

                    if (res.data.type === 0) {
                        console.log("Error grabando Vehículo");
                        return;
                    } else
                        console.log("Vehículo grabado de forma correcta!");

                } catch (error) {
                    console.error("Error al grabar vehículo", error);
                }

            };
            GrabarVehNuevo();

            setShowModalMensajesCity(true);
            setTituloMensajesCity("¡Solicitud enviada con exito!");
            setTextoMensajesCity(
                "Te notificarémos cuando hayamos añadido tu vehículo en nuestra base de datos"
            );
        }
    }

    const grabarDatosVehiculos = () => {
        if (
            selectMarca == "Marca" &&
            selectModelo == "Modelo" &&
            selectCilindraje == "Cilindraje"
        ) {
            let texto = "Heey, Todos los datos del vehículo son requeridos!";

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
            let texto = "Heey, Todos los datos del vehículo son requeridos 3!";
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
            let texto = "Heey, Todos los datos del vehículo son requeridos 4!";
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
            let texto = "Heey, Todos los datos del vehículo son requeridos 5!";
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
            let texto = "Heey, Todos los datos del vehículo son requeridos 6!";
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
        } else if (selectCombustible == "Combustible") {
            let texto = "Heey, Todos los datos del vehículo son requeridos 6!";

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
        }
        consultarPrd();
    };

    const consultarPrd = () => {

        const leerDatPrd = async () => {
            const params = {
                tipovehiculo: parseInt(codigoTipoSel),
                carroceria: parseInt(codigoCarroceriaSel),
                marca: parseInt(codigoMarcaSel),
                modelo: parseInt(codigoModeloSel),
                cilindrajemotor: parseInt(codigoCilindrajeSel),
            };

            //console.log("PARAMS : ", params)
            //return

            await axios({
                method: "post",
                url: "https://gimcloud.com.co/mrp/api/102",
                params,
            })
                .then((res) => {
                    //console.log("DATPRD : ", res.data);
                    let numreg = res.data.listvehiclesmr.length;
                    //console.log("DATVEHFIND : ", res.data);
                    //return
                    //console.log("DATVEHFIND : ", listCilindrajes);
                    //AQUI

                    if (numreg > 0) {

                        let datos = res.data.listvehiclesmr[0];

                        let nombrecilindraje = "";
                        listCilindrajes &&
                            listCilindrajes.forEach((row) => {
                                if (
                                    Number.parseInt(row.id) ==
                                    Number.parseInt(datos.codigocilindraje)
                                ) {
                                    nombrecilindraje = row.label;
                                }
                            });

                        let nombreanno = "";

                        const DatosBuscadorInteractivo = {
                            idvehiculo: datos.tipovehiculo,
                            idcarrorecia: datos.codigocarroceria,
                            idmarca: datos.codigomarca,
                            codigoano: annoVeh,
                            codigomodelo: datos.codigomodelo,
                            codigocilindraje: valorcilindrajesel,
                            codigocombustible: combustibleVeh,
                            codigotransmision: transmisionVeh,
                            codigotraccion: traccionVeh,
                            nombretipovehiculo: datos.nombretipo,
                            nombrecarroceria: datos.nombrecarroceria,
                            nombremarca: datos.nombremarca,
                            nombreanno: nombreAnnoVeh,
                            nombremodelo: datos.nombremodelo,
                            nombrecilindraje: nombrecilindrajesel,
                            nombretipocombustible: nombreCombustibleVeh,
                            nombretransmision: nombreTransmisionVeh,
                            nombretraccion: nombreTraccionVeh,
                            marcasseleccionadas: datos.codigomarca,
                            annosseleccionado: nombreAnnoVeh,
                            modelosseleccionados: datos.codigomodelo,
                            cilindrajesseleccionados: valorcilindrajesel,
                            combustiblesseleccionados: combustibleVeh,
                            transmisionesseleccionadas: transmisionVeh,
                            traccionesseleccionadas: traccionVeh,
                            tiposvehiculos: tiposVehiculos,
                            tiposcarrocerias: carrocerias,
                            tiposmarcas: marcas,
                            tiposmodelos: modelos,
                            tiposcilindrajes: cilindrajes,
                        };

                        localStorage.setItem("editdata", JSON.stringify(true));
                        localStorage.setItem("editVehHistory", JSON.stringify(true));

                        localStorage.setItem("datasearchinteractive", JSON.stringify(DatosBuscadorInteractivo));
                        dispatch(getDataSearchInteractive(DatosBuscadorInteractivo));
                        setHabilitarEnviar(false);
                        setShowModalMensajesHistory(true);
                        setTituloMensajesHistory("Consulta vehículos");
                        setTextoMensajesHistory(
                            "El vehículo ingresado existe en nuestra base de datos!"
                        );
                        return
                    }
                    else {

                        setHabilitarEnviar(true);
                        console.log("NO XSHSHSHS")
                    }

                })
                .catch(function (error) {
                    console.log("Lee Productos Temporal Error: ");
                });
        };
        leerDatPrd();
    }

    const changeEmail = (e) => {
        setEmailContact(e)
    }

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [habilitarEnviar]);

    const irABuscadorEspecial = () => {
        let ruta = "/searchinteractive/searchinteractive/";
        router.push(ruta);
    };

    return (
        <ContainerResult>
            <div className="containercontactanos" ref={irA}>



                <ModalMensajesContactanos
                    shown={showModalMensajesCity}
                    close={setShowModalMensajesCity}
                    titulo={tituloMensajesCity}
                    mensaje={textoMensajesCity}
                    setActivarCity=""
                    textoBoton={textoBoton}
                    tipo="6"
                />
                <ModalMensajes
                    shown={showModalMensajes}
                    close={setShowModalMensajes}
                    titulo={tituloMensajes}
                    mensaje={textoMensajes}
                    tipo="1"
                />
                <ModalMensajesHistoryVeh
                    shown={showModalMensajesHistory}
                    close={setShowModalMensajesHistory}
                    titulo={tituloMensajesHistory}
                    mensaje={textoMensajesHistory}
                    tipo="1"
                />
                <div className="mt-30">
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12} lg={12}>
                            <h3 className="textotituloclickaqui">
                                ¿No encuentras tu vehículo en nuestra base de datos?
                            </h3>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <h3 className="textoaddvehiclehistory">
                                Por favor completa la siguiente información y trataremos de añadir tu vehículo a nuestra base de datos
                            </h3>
                        </Grid>
                    </Grid>
                </div>
                <div className="divhistoryveh">
                    <h3 className="textodatostuvehiculo">
                        Datos de tu vehículo
                    </h3>
                    <Row className="pl-15">
                        <Row>
                            <Col xl={10} lg={10} md={10} xs={10}>
                                <Dropdown
                                    onSelect={handleChange}
                                    onClick={onClickTipo}>
                                    <Dropdown.Toggle
                                        className="ml-20 mt-1 dropdowncustom"
                                        //disabled={habilitarTipo}
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
                            </Col>
                        </Row>
                        <Row className="espaciovariablescrearproducto">
                            <Col xl={5} lg={5} md={5} xs={5}>
                                <div className="ml-20">
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
                                        <Dropdown.Menu
                                            variant="outline-light"
                                            className="tamañocajaoptionsitems">
                                            {carrocerias &&
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

                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                            <Col xl={6} lg={6} md={6} xs={6}>
                                <div className="ml-33">
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

                                        ) : null}
                                    </Dropdown>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={5} lg={5} md={5} xs={5}>
                                <div className="ml-20">
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
                            <Col xl={6} lg={6} md={6} xs={6}>
                                <div className="ml-33">
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
                                            variant="outline-light"
                                            onMouseEnter={
                                                iniciaInputModelo}
                                        >
                                            <div
                                                className={
                                                    alertModelo
                                                }>
                                                {selectModelo}
                                            </div>
                                        </Dropdown.Toggle>
                                        {openModelo ? (
                                            <Dropdown.Menu>
                                                <input
                                                    list="idmodelo"
                                                    id="myModels"
                                                    autoComplete="off"
                                                    placeholder="Ingrese modelo"
                                                    className="inputbuscarvehiculos"
                                                    onClick={(
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
                                        )
                                            : null
                                        }
                                    </Dropdown>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mtrem-1">
                            <Col xl={5} lg={5} md={5} xs={5}>
                                <div className="ml-20">
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
                                                        handleChangeCilindraje(
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
                                        ) : null}
                                    </Dropdown>
                                </div>
                            </Col>
                            <Col xl={6} lg={6} md={6} xs={6}>
                                <div className="ml-33">
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
                                                habilitarTransmision
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
                                <div className="ml-20">
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
                                </div>
                            </Col>
                            <Col xl={6} lg={6} md={6} xs={6}>
                                <div className="ml-33">
                                    <Dropdown
                                        onSelect={
                                            handleChangeTraccion
                                        }
                                        onClick={onClickTraccion}>
                                        <Dropdown.Toggle
                                            className="dropdowncustomitemsderecha"
                                            disabled={
                                                habilitarTraccion
                                            }
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
                    </Row>
                    <br/>
                    <Grid container>
                        <Grid item xs={12} md={7} lg={7}>
                        </Grid>
                        <Grid item xs={12} md={2} lg={2}>
                            <Button
                                className="botondatostuvehiculo"
                                variant="outline-light"
                                onClick={() => irABuscadorEspecial()}
                            >
                                Cancelar
                            </Button>
                        </Grid>

                        <Grid item xs={12} md={2} lg={2}>
                            <Button
                                className="botondatostuvehiculodos"
                                variant="outline-light"
                                onClick={() => grabarDatosVehiculos()}
                            >
                                Continuar
                            </Button>
                        </Grid>
                    </Grid>
                </div>

                {
                    habilitarEnviar ?
                        <div className="divinfohistoryveh">
                            <Grid container spacing={1}>
                                <Grid item xs={9} md={9} lg={9}>
                                    <h3 className="mensajedatoscontactar">
                                        Escribe el correo al que deseas que te notifiquemos cuando hayamos añadido tu vehículo en nuestra base de datos
                                    </h3>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} className="mb-1 mlmenos2">
                                <Grid item xs={12} md={12} lg={12}>
                                    <div className="tituloenviarcorreo">
                                        Correo eléctronico
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} className="mb-4 mlmenos10">
                                <Grid item xs={10} md={10} lg={10}>
                                    <input
                                        //defaultValue={datosusuarios.email}
                                        autocomplete="off"
                                        className="inputcorreocontactanos"
                                        onChange={(e) => changeEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} md={2} lg={2}>
                                    <Button className="botondatoscontactanosenviar"
                                        variant="outline-light"
                                        onClick={() => enviarDatos()}
                                    >
                                        Enviar
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                        :
                        null
                }
            </div>

        </ContainerResult>
    );
}

export default AddVehicleHistorySearch;