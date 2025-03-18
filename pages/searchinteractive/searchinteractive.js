import React, { useState, useEffect, useRef } from "react";
import Container from "../../components/layouts/Container";
import { Row, Col, Dropdown, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import axios from "axios";
import swal from "sweetalert";
import ModalMensajes from "../mensajes/ModalMensajes";
import { useDispatch, useSelector } from "react-redux";
import { getTypesVehicles } from "../../store/typesvehicles/action";
import { getEditDataFind } from "../../store/editdatafind/action";
import TypesVehiclesRepository from "~/repositories/TypesVehiclesRepository";
import { MultiSelect } from "react-multi-select-component";
import { getDataSearchInteractive } from "../../store/datasearchinteractive/action";
import { getDataSelectSearch } from "../../store/dataselectsearch/action";
import { getEditData } from "../../store/editdata/action";
import { getCitySelect } from "../../store/cityselect/action";
import { getChangeSearchPrice } from "../../store/changesearchprice/action";
import HistoryVehSpecialSearch from "./historyvehspecialsearch";
import shortid from "shortid";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { getUserMenuPrimary } from "../../store/usermenuprimary/action";
import ReactTooltip from "react-tooltip";
import ModalControlAcceso from "../mensajes/ModalControlAcceso";

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

let dato = [];
let controltraccion = 0;

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

const CustomMenuModels = React.forwardRef(
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
                    className="my-2 tamañofinditemssearchmodels"
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

let anoselect = [
    { id: 94, label: "2023", anovehiculo: "2023", value: 94 },
    //{ id: 93, label: "2022",anovehiculo: "2022", value: 93 },
    //{ id: 92, label: "2021",anovehiculo: "2021", value: 92 },
];

function SearchInteractive() {
    const router = useRouter();
    const controlAnno = useRef();
    const irA = useRef(null);
    //const videoSCR = Car;
    const [tipos, setTipos] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(defaultValueForm());

    const [showEdit, setShowEdit] = useState(false);

    const [listTiposVehiculos, setListtiposVehiculos] = useState([]);
    const [listMarcasVehiculos, setListMarcasVehiculos] = useState([]);
    const [listCarroceriasVehiculos, setListCarroceriasVehiculos] = useState(
        []
    );
    const [listAnnosVehiculos, setListAnnosVehiculos] = useState([]);
    const [marcarItem, setMarcarItem] = useState([]);

    // Arreglo version de motores segun modelo Selecciondo
    const [tipoVehiculo, setTipoVehiculo] = useState(0);
    const [carroceriaVehiculo, setCarroceriaVehiculo] = useState(0);
    const [marcaVehiculo, setMarcaVehiculo] = useState(0);
    const [annoVehiculo, setAnnoVehiculo] = useState([]);
    const [modeloVehiculo, setModeloVehiculo] = useState([]);
    const [cilindrajeVehiculo, setCilindrajeVehiculo] = useState([]);
    const [cilindrajes, setCilindrajes] = useState([]);
    const [tipoCombustible, setTipoCombustible] = useState(0);
    const [tipoTransmision, setTipoTransmision] = useState(0);
    const [tipoTraccion, setTipoTraccion] = useState(0);

    const [showModalControlAcceso, setShowModalControlAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

    const [alertarTipo, setAlertarTipo] = useState("");
    const [alertarCarroceria, setAlertarCarroceria] = useState("");
    const [alertarMarca, setAlertarMarca] = useState("");
    const [alertarModelo, setAlertarModelo] = useState("");

    const [mostrarTransmision, setMostrarTransmision] = useState("mostrar-div");
    const [mostrarTraccion, setMostrarTraccion] = useState("mostrar-div");
    const [mostrarCombustible, setMostrarCombustible] = useState("mostrar-div");

    //const [disabledTipo, setDisabledTipo] = useState(false);
    const [disabledCarroceria, setDisabledCarroceria] = useState(false);
    const [disabledMarca, setDisabledMarca] = useState(false);
    const [disabledModelo, setDisabledModelo] = useState(false);
    const [disabledAnno, setDisabledAnno] = useState("habilitar");
    const [disabledCilindraje, setDisabledCilindraje] = useState(false);
    const [disabledCombustible, setDisabledCombustible] = useState(false);
    const [disabledTransmision, setDisabledTransmision] = useState(false);
    const [disabledTraccion, setDisabledTraccion] = useState(false);

    const [alertaTipo, setAlertaTipo] = useState("");
    const [alertaCarroceria, setAlertaCarroceria] = useState("");
    const [alertaMarca, setAlertaMarca] = useState("");
    const [alertaModelos, setAlertaModelos] = useState("");

    const [nombreTipoVeh, setNombreTipoVeh] = useState("Tipo Vehículo");
    const [nombreCarroceriaVeh, setNombreCarroceriaVeh] = useState("Carrocería");
    const [nombreMarcaVeh, setNombreMarcaVeh] = useState("Marca");
    const [nombreAnnoVeh, setNombreAnnoVeh] = useState("Año");
    const [nombreModeloVeh, setNombreModeloVeh] = useState("Modelo");
    const [nombreModeloBase, setNombreModeloBase] = useState("");
    const [LongitudModelo, setLongitudModelo] = useState(0);
    const [nombreCilindrajeVeh, setNombreCilindrajeVeh] = useState("Cilindraje");
    const [nombreTransmisionVeh, setNombreTransmisionVeh] = useState("Transmisión");
    const [nombreCombustibleVeh, setNombreCombustibleVeh] = useState("Combustible");
    const [nombreTraccionVeh, setNombreTraccionVeh] = useState("Tracción");

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [textoMensajesAlterno, setTextoMensajesAlterno] = useState(false);
    const [activar, setActivar] = useState(false);
    const [open, setOpen] = useState(false);

    // Inicializamos el arrego de Tipos de Vehiculos
    const [vehiculos, setVehiculos] = useState([]);
    // Arreglo tipos de Marcas de Vehiculos
    const [marcas, setMarcas] = useState([]);
    // Arreglo años de los Vehiculos
    const [annos, setAnnos] = useState([]);
    // Arreglo modelos de los Vehiculos segun Marca Seleccionda
    const [modelos, setModels] = useState([]);
    // Arreglo carrocerias de los Vehiculos segun Tipo Selecciondo
    const [carrocerias, setCarrocerias] = useState([]);
    // Disparar procedimiento que lee los Tipos de Vehiculos
    const [classTransmision, setClassTransmision] = useState("alinearizquierda dropdownsearchinteractiveothers");
    const [classTraccion, setClassTraccion] = useState("ml-5 alinearizquierda dropdownsearchinteractiveothers");
    const [classCombustible, setClassCombustible] = useState("alinearizquierda dropdownsearchinteractivecombustible");
    const [classCilindraje, setClassCilindraje] = useState("alinearizquierda dropdownsearchinteractivecilindraje");

    const [cambioCilindraje, setCambioCilindraje] = useState(false);
    const [cambioTransmision, setCambioTransmision] = useState(false);
    const [cambioCombustible, setCambioCombustible] = useState(false);
    const [cambioTraccion, setCambioTraccion] = useState(false);
    const [actualizaTipo, setActualizaTipo] = useState(false);
    const [datSearchInte, setDatSearchInte] = useState([]);
    const [datHistoryVehSearch, setDatHistoryVehSearch] = useState([]);
    const [controlVeh, setControlVeh] = useState(false);

    let editardatosbuscador = [];

    editardatosbuscador = useSelector(
        (state) => state.editdatafind.editdatafind
    );

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    let selectviewprd = useSelector((state) => state.selectviewprd.selectviewprd);

    useEffect(() => {
  
        if (selectviewprd > 0) {
            let carroceriaVehiculo = JSON.parse(localStorage.getItem("carroceriaselect"));

            if (carroceriaVehiculo == 24) {
                router.push("/searchinteractive/sedan/searchsedan#searchmr");
            } else
                if (carroceriaVehiculo == 8) {
                    router.push("/searchinteractive/coupe/searchcoupe#searchmr");
                } else
                    if (carroceriaVehiculo == 2) {
                        router.push("/searchinteractive/automoviltrespuertas/searchtrespuertas#searchmr");
                    } else
                        if (carroceriaVehiculo == 3) {
                            router.push("/searchinteractive/automovilcincopuertas/searchcincopuertas#searchmr");
                        }
                        else
                            if (carroceriaVehiculo == 16) {
                                router.push("/searchinteractive/camionetas/estacadoblechasis/searchestacadoble#searchmr");
                            } else
                                if (carroceriaVehiculo == 17) {
                                    router.push("/searchinteractive/camionetas/estacacabinasencilla/searchestacasencilla#searchmr");
                                } else
                                    if (carroceriaVehiculo == 20) {
                                        router.push("/searchinteractive/camionetas/volcodoblecabina/searchdoblevolco#searchmr");
                                    }
                                    else
                                        if (carroceriaVehiculo == 21) {
                                            router.push("/searchinteractive/camionetas/volcocabinasencilla/searchvolcosencilla#searchmr");
                                        } else
                                            if (carroceriaVehiculo == 25) {
                                                router.push("/searchinteractive/camionetas/suvcamperostrespuertas/searchsuvtrespuertas#searchmr");
                                            } else
                                                if (carroceriaVehiculo == 26) {
                                                    router.push("/searchinteractive/camionetas/suvcamperoscincopuertas/searchsuvcincopuertas#searchmr");
                                                } else
                                                    if (carroceriaVehiculo == 60) {
                                                        router.push("/searchinteractive/camionestrompa/articuladocontrompa/searcharticulado#searchmr");
                                                    } else
                                                        if (carroceriaVehiculo == 13) {
                                                            router.push("/searchinteractive/camionestrompa/dobletroquecontrompa/searchdobletroque#searchmr");
                                                        } else
                                                            if (carroceriaVehiculo == 18) {
                                                                router.push("/searchinteractive/camionestrompa/gruacontrompa/searchgrua#searchmr");
                                                            } else
                                                                if (carroceriaVehiculo == 35) {
                                                                    router.push("/searchinteractive/camionestrompa/sencillocontrompa/searchsencillo#searchmr");
                                                                } else
                                                                    if (carroceriaVehiculo == 31) {
                                                                        router.push("/searchinteractive/camionestrompa/volquetadoblecontrompa/searchvolquetadoble#searchmr");
                                                                    } else
                                                                        if (carroceriaVehiculo == 32) {
                                                                            router.push("/searchinteractive/camionestrompa/volquetasencillacontrompa/searchvolquetasencilla#searchmr");
                                                                        } else
                                                                            if (carroceriaVehiculo == 1) {
                                                                                router.push("/searchinteractive/camionessintrompa/articuladosintrompa/searcharticulado#searchmr");
                                                                            } else
                                                                                if (carroceriaVehiculo == 10) {
                                                                                    router.push("/searchinteractive/camionessintrompa/cuatromanos/searchcuatromanos#searchmr");
                                                                                } else
                                                                                    if (carroceriaVehiculo == 84) {
                                                                                        router.push("/searchinteractive/camionessintrompa/dobletroquesintrompa/searchdobletroque#searchmr");
                                                                                    } else
                                                                                        if (carroceriaVehiculo == 87) {
                                                                                            router.push("/searchinteractive/camionessintrompa/gruasintrompa/searchgrua#searchmr");
                                                                                        }
                                                                                        else
                                                                                            if (carroceriaVehiculo == 7) {
                                                                                                router.push("/searchinteractive/camionessintrompa/sencillosintrompa/searchsencillo#searchmr");
                                                                                            }
                                                                                            else
                                                                                                if (carroceriaVehiculo == 123) {
                                                                                                    router.push("/searchinteractive/camionessintrompa/volquetadoblesintrompa/searchvolquetadoble#searchmr");
                                                                                                }
                                                                                                else
                                                                                                    if (carroceriaVehiculo == 125) {
                                                                                                        router.push("/searchinteractive/automovilcincopuertas/searchcincopuertas#searchmr");
                                                                                                    }
                                                                                                    else
                                                                                                        if (carroceriaVehiculo == 124) {
                                                                                                            router.push("/searchinteractive/automoviltrespuertas/searchtrespuertas#searchmr");
                                                                                                        } else
                                                                                                            if (carroceriaVehiculo == 126) {
                                                                                                                router.push("/searchinteractive/camionetas/suvcamperoscincopuertas/searchsuvcincopuertas#searchmr");
                                                                                                            } else
                                                                                                                if (carroceriaVehiculo == 121) {
                                                                                                                    router.push("/searchinteractive/camionessintrompa/volquetasencillasintrompa/searchvolquetasencilla#searchmr");
                                                                                                                } else
                                                                                                                    if (carroceriaVehiculo == 4) {
                                                                                                                        router.push("/searchinteractive/vansybuses/bus/searchbus#searchmr");
                                                                                                                    } else
                                                                                                                        if (carroceriaVehiculo == 122) {
                                                                                                                            router.push("/searchinteractive/vansybuses/buseta/searchbuseta#searchmr");
                                                                                                                        } else
                                                                                                                            if (carroceriaVehiculo == 30) {
                                                                                                                                router.push("/searchinteractive/vansybuses/vans/searchvans#searchmr");
                                                                                                                            } else
                                                                                                                                if (carroceriaVehiculo == 5) {
                                                                                                                                    router.push("/searchinteractive/motos/calle/searchcalle#searchmr");
                                                                                                                                }
                                                                                                                                else
                                                                                                                                    if (carroceriaVehiculo == 19 || carroceriaVehiculo == 9) {
                                                                                                                                        router.push("/searchinteractive/motos/motocarro/searchcalle#searchmr");
                                                                                                                                    }
                                                                                                                                    else
                                                                                                                                        if (carroceriaVehiculo == 12) {
                                                                                                                                            router.push("/searchinteractive/motos/deportiva/searchdeportiva#searchmr");
                                                                                                                                        } else
                                                                                                                                            if (carroceriaVehiculo == 14) {
                                                                                                                                                router.push("/searchinteractive/motos/enduro/searchenduro#searchmr");
                                                                                                                                            } else
                                                                                                                                                if (carroceriaVehiculo == 22) {
                                                                                                                                                    router.push("/searchinteractive/motos/scooter/searchscooter#searchmr");
                                                                                                                                                } else
                                                                                                                                                    if (carroceriaVehiculo == 28) {
                                                                                                                                                        router.push("/searchinteractive/motos/touring/searchtouring#searchmr");
                                                                                                                                                    }


        }
    }, [selectviewprd])

    useEffect(() => {
        //Lee datos editar variables sistema tren motriz
        dispatch(getUserMenuPrimary(false));
        if (editardatosbuscador) {
            if (editardatosbuscador.editarCilindraje) {
                setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindrajealert")
                setCambioCilindraje(true);
            } else
                setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindraje")

            if (editardatosbuscador.editarCombustible) {
                setClassCombustible("alinearizquierda dropdownsearchinteractivealert")
                setCambioCombustible(true);
            } else
                setClassCombustible("alinearizquierda dropdownsearchinteractivecombustible")

            if (editardatosbuscador.editarTraccion) {
                setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothersalert")
                setCambioTraccion(true);
            } else
                setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothers")

            if (editardatosbuscador.editarTransmision) {
                setClassTransmision("alinearizquierda dropdownsearchinteractiveothersalert")
                setCambioTransmision(true);
            } else
                setClassTransmision("alinearizquierda dropdownsearchinteractiveothers")
        }
    }, [editardatosbuscador]);

    let datosmodelosvehiculos = [];
    datosmodelosvehiculos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_modelosvehiculos
    );
    let datosannos = [];
    datosannos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_annosvehiculos
    );
    let datoscilindrajevehiculos = [];
    datoscilindrajevehiculos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_cilindrajesvehiculos
    );
    let datasearchinteractive = [];
    datasearchinteractive = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );
    //console.log("DATXSESA : ",  datasearchinteractive)
    let editardatos = [];
    editardatos = useSelector(
        (state) => state.editdata.editdata.editar
    );

    const [url, setUrl] = useState(
        "https://gimcloud.com.co/files/mercadorepuesto/buscador/"
    );

    let tiposelectmain = 0;
    let tiposelecthome = 0;
    let carroceriaselecthome = 0;
    let marcaselecthome = 0;
    let editVehSearch = false;

    if (typeof window !== "undefined") {
        //editVehSearch
        if (router.query.editVehSearch) {
            editVehSearch = true;
        } else
            if (router.query.tipoVehiculo) {
                tiposelecthome = JSON.parse(router.query.tipoVehiculo);
                carroceriaselecthome = JSON.parse(router.query.carroceriaVehiculo);
                marcaselecthome = JSON.parse(router.query.marcaVehiculo);
                //setControlVeh(true);
                //AQUI
            } else
                if (router.query.tipoVehiculoMain) {
                    tiposelectmain = JSON.parse(router.query.tipoVehiculoMain);
                }
    }

    useEffect(() => {

        if (tiposelecthome > 0) {

            setControlVeh(true)
            setModeloVehiculo([]);

            setCilindrajeVehiculo([]);
            setCilindrajes([]);
            setModels([]);
            setTipoCombustible(0);
            setTipoTransmision(0);
            setTipoTraccion(0);

            setNombreAnnoVeh(["Año"]);
            setAnnoVehiculo([]);
            setNombreModeloVeh("Modelo");
            setNombreCilindrajeVeh("Cilindraje");
            setNombreCombustibleVeh("Combustible");

            if (tiposelecthome == 3 || tiposelecthome == 4) {
                setMostrarTransmision("ocultar-div");
                setMostrarTraccion("ocultar-div");
                setMostrarCombustible("ocultar-div");
                setNombreTransmisionVeh("");
                setNombreTraccionVeh("");
                setNombreCombustibleVeh("");
            } else if (
                tiposelecthome == 1 ||
                tiposelecthome == 3 ||
                tiposelecthome == 4 ||
                tiposelecthome == 6
            ) {
                setMostrarTraccion("ocultar-div");
                setNombreTraccionVeh("");
                setMostrarTransmision("mostrar-div");
                setNombreTransmisionVeh("Transmisión");
                setNombreCombustibleVeh("Combustible");
                setMostrarCombustible("mostrar-div");
                setDisabledTransmision(false);
                setDisabledCombustible(false);
            } else {
                setMostrarTransmision("mostrar-div");
                setMostrarTraccion("mostrar-div");
                setMostrarCombustible("mostrar-div");
                setNombreTransmisionVeh("Transmisión");
                setNombreTraccionVeh("Tracción");
                setNombreCombustibleVeh("Combustible");
                setDisabledTransmision(false);
                setDisabledTraccion(false);
                setDisabledCombustible(false);
            }

            setTipoVehiculo(tiposelecthome);
            const tipovehiculo = {
                idtipovehiculo: tiposelecthome,
            };

            setListtiposVehiculos(
                JSON.parse(localStorage.getItem("datostiposvehiculos"))
            );

            const newDet = [];
            datosmodelosvehiculos &&
                datosmodelosvehiculos.forEach((row) => {
                    if (
                        parseInt(row.tipovehiculo) ===
                        parseInt(tiposelecthome) &&
                        parseInt(row.marca) ===
                        parseInt(marcaselecthome) &&
                        parseInt(row.carroceria) ===
                        parseInt(carroceriaselecthome)
                    ) {
                        //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                        let item = {
                            id: row.id,
                            modelo: row.modelo,
                            tipovehiculo: row.tipovehiculo,
                            marca: row.marca,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            value: row.id,
                            label: row.modelo,
                        };
                        newDet.push(item);
                    }
                });
            setModels(newDet);
            //console.log("TIPOXXX : ", tiposelecthome);
            //console.log("MARCAXXX : ", marcaselecthome);
            //console.log("CARROCEESXXXX : ", carroceriaselecthome);

            //console.log("listMODELS : ", newDet);
        }

    }, [tiposelecthome, controlVeh])

    useEffect(() => {
        dispatch(getUserMenuPrimary(false));
        if (tiposelectmain > 0) {
            //datostiposvehiculos
            setTipoVehiculo(tiposelectmain);

            let tiposvehiculos = JSON.parse(
                localStorage.getItem("datostiposvehiculos"));
            let carroceriasvehiculos = JSON.parse(
                localStorage.getItem("datoscarroceriasvehiculos")
            );

            tiposvehiculos &&
                tiposvehiculos.forEach((row) => {
                    if (
                        Number.parseInt(row.id) ===
                        Number.parseInt(tiposelectmain)
                    ) {
                        setNombreTipoVeh(row.label);
                    }
                });

            const newDet = [];
            carroceriasvehiculos &&
                carroceriasvehiculos.forEach((row) => {
                    if (parseInt(row.tipovehiculo) === parseInt(tiposelectmain)) {
                        //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                        let item = {
                            id: row.id,
                            carroceria: row.carroceria,
                            tipovehiculo: row.tipovehiculo,
                            estado: row.estado,
                            value: row.id,
                            label: row.carroceria,
                        };
                        newDet.push(item);
                    }
                });
            //console.log("CARROCESSASASA : ", newDet)
            setCarrocerias(newDet);
        }
    }, [tiposelectmain]);

    useEffect(() => {
        if (tiposelecthome > 0) {
            //datostiposvehiculos
            setTipoVehiculo(tiposelecthome);
            setMarcaVehiculo(marcaselecthome);
            //alert("111")
            //alert(carroceriaselecthome)
            setCarroceriaVehiculo(carroceriaselecthome);

            let tiposvehiculos = JSON.parse(
                localStorage.getItem("datostiposvehiculos"));
            let carroceriasvehiculos = JSON.parse(
                localStorage.getItem("datoscarroceriasvehiculos")
            );
            let marcasvehiculos = JSON.parse(
                localStorage.getItem("datosmarcasvehiculos")
            );

            tiposvehiculos &&
                tiposvehiculos.forEach((row) => {
                    if (
                        Number.parseInt(row.id) ===
                        Number.parseInt(tiposelecthome)
                    ) {
                        setNombreTipoVeh(row.label);
                    }
                });

            const newDet = [];
            carroceriasvehiculos &&
                carroceriasvehiculos.forEach((row) => {
                    if (parseInt(row.id) === parseInt(carroceriaselecthome)) {
                        setNombreCarroceriaVeh(row.label);
                    }

                    if (parseInt(row.tipovehiculo) === parseInt(tiposelecthome)) {
                        //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                        let item = {
                            id: row.id,
                            carroceria: row.carroceria,
                            tipovehiculo: row.tipovehiculo,
                            estado: row.estado,
                            value: row.id,
                            label: row.carroceria,
                        };
                        newDet.push(item);
                    }
                });

            setCarrocerias(newDet);

            const newDetMarcas = [];
            marcasvehiculos &&
                marcasvehiculos.forEach((row) => {
                    if (
                        Number.parseInt(row.id) ===
                        Number.parseInt(marcaselecthome)
                    ) {
                        setNombreMarcaVeh(row.label);
                    }
                    if (
                        Number.parseInt(row.tipovehiculo) ===
                        Number.parseInt(tiposelecthome) &&
                        Number.parseInt(row.carroceria) ===
                        Number.parseInt(carroceriaselecthome)
                    ) {
                        let item = {
                            id: row.id,
                            text: row.text,
                            tipovehiculo: row.tipovehiculo,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            url: row.url,
                        };
                        newDetMarcas.push(item);
                    }
                });
            let modelosselecthome = JSON.parse(localStorage.getItem("modelosselecthome"));

            setMarcas(newDetMarcas);
            setModels(modelosselecthome);
        }
    }, [tiposelecthome, carroceriaselecthome, marcaselecthome]);

    useEffect(() => {
        if (tiposelecthome == 0) {
            let editdat = JSON.parse(localStorage.getItem("editdata"));
            let editVehHistory = JSON.parse(localStorage.getItem("editVehHistory"));

            let data = JSON.parse(
                localStorage.getItem("datasearchinteractive")
            );

            localStorage.setItem(
                "annoselect",
                JSON.stringify("")
            );
            setListtiposVehiculos(
                JSON.parse(localStorage.getItem("datostiposvehiculos"))
            );
            setListMarcasVehiculos(
                JSON.parse(localStorage.getItem("datosmarcasvehiculos"))
            );
            setListCarroceriasVehiculos(
                JSON.parse(localStorage.getItem("datoscarroceriasvehiculos"))
            );
            let anosveh = JSON.parse(localStorage.getItem("datosannosvehiculos"));
            setListAnnosVehiculos(
                JSON.parse(localStorage.getItem("datosannosvehiculos"))
            );

            if (editardatos || editdat) {
                if (datasearchinteractive.length == 0) {
                    setDatSearchInte(datasearchinteractive)
                } else {
                    setDatSearchInte(data)
                }

                setDisabledCarroceria(false);
                setDisabledMarca(false);
                setDisabledModelo(false);
                setDisabledAnno("habilitar");
                setDisabledCilindraje(false);
                setDisabledCombustible(false);
                setDisabledTransmision(false);
                setDisabledTraccion(false);

                setTipoVehiculo(data.idvehiculo);
                //alert("222")
                setCarroceriaVehiculo(data.idcarrorecia);
                setMarcaVehiculo(data.idmarca);

                setNombreAnnoVeh(["Año"]);

                //console.log("DASA SÑOS : ", data.codigoano[0].label)
                if (Array.isArray(data.codigoano)) {
                    if (!controlVeh)
                        setAnnoVehiculo(data.codigoano);

                    if (data.codigoano.length > 0) {
                        if (data.codigoano[0].label == 0)
                            setNombreAnnoVeh(["Año"]);
                        else
                            if (data.annosseleccionado == 0)
                                setNombreAnnoVeh(["Año"]);
                            else
                                setNombreAnnoVeh(data.annosseleccionado);
                    } else
                        setNombreAnnoVeh(["Año"]);
                } else {
                    let item = [];
                    let itemNomAno = [];
                    let anossel = 0;

                    if (data.annosseleccionado) {
                        anossel = data.annosseleccionado.split(';');
                        setNombreAnnoVeh(["Año"]);
                    }

                    anosveh &&
                        anosveh.map((row, index) => {
                            anossel &&
                                anossel.map((dat, ind) => {
                                    if (row.anovehiculo == parseInt(dat)) {

                                        if (row.value == 0) {
                                            let sel = {
                                                anovehiculo: "Año",
                                                id: 0,
                                                label: "Año",
                                                value: 0
                                            }
                                            item.push(sel);
                                            itemNomAno.push("Año");
                                            setNombreAnnoVeh("Año");
                                        } else {
                                            item.push(row);
                                            itemNomAno.push(row.anovehiculo);
                                            setNombreAnnoVeh(row.anovehiculo);
                                        }

                                    }
                                });
                        });
                    setNombreAnnoVeh(data.annosseleccionado);
                    if (!controlVeh)
                        setAnnoVehiculo(item);
                }

                setModeloVehiculo(data.codigomodelo);
                setCilindrajeVehiculo(data.codigocilindraje);
                setTipoCombustible(data.codigocombustible);
                setTipoTransmision(data.codigotransmision);
                setTipoTraccion(data.codigotraccion);

                if (editVehSearch || editVehHistory) {
                    setNombreTipoVeh(data.nombretipovehiculo);
                    setNombreCarroceriaVeh(data.nombrecarroceria);
                    setNombreMarcaVeh(data.nombremarca);
                    setNombreModeloVeh(data.nombremodelo);
                    setNombreCilindrajeVeh(data.nombrecilindraje);
                    setNombreCombustibleVeh(data.nombretipocombustible);
                } else
                    if (tiposelecthome == 0 && tiposelectmain == 0) {
                        setNombreTipoVeh(data.nombretipovehiculo);
                    } else
                        if (tiposelecthome == 0) {
                            setNombreCarroceriaVeh(data.nombrecarroceria);
                            setNombreMarcaVeh(data.nombremarca);
                            setNombreModeloVeh(data.nombremodelo);
                            setNombreCilindrajeVeh(data.nombrecilindraje);
                            setNombreCombustibleVeh(data.nombretipocombustible);
                        }

                if (data.idvehiculo != 3 && data.idvehiculo != 4) {
                    setNombreTransmisionVeh(data.nombretransmision);
                    setNombreTraccionVeh(data.nombretraccion);
                } else {
                    setNombreTransmisionVeh("");
                    setNombreTraccionVeh("");
                    setNombreCombustibleVeh("");
                    setDisabledTransmision(true);
                    setDisabledTraccion(true);
                    setDisabledCombustible(true);
                    setMostrarTransmision("ocultar-div");
                    setMostrarTraccion("ocultar-div");
                    setMostrarCombustible("ocultar-div");
                }

                if (data.idvehiculo != 1 && data.idvehiculo != 3 &&
                    data.idvehiculo != 6) {
                    setNombreTraccionVeh(data.nombretraccion);
                } else {
                    setNombreTraccionVeh("");
                    setDisabledTraccion(true);
                    setMostrarTraccion("ocultar-div");
                }

                setMarcas(data.tiposmarcas);
                setModels(data.tiposmodelos);
                setCarrocerias(data.tiposcarrocerias);
                setCilindrajes(data.tiposcilindrajes)
            }

            //console.log("DATOS AÑOS : ", datosannos)
            //setAnnos(JSON.parse(localStorage.getItem("datosannosvehiculos")));

            if (datosannos)
                setAnnos(datosannos);
        } else {
            if (datosannos)
                setAnnos(datosannos);

            let data = JSON.parse(
                localStorage.getItem("datasearchinteractive")
            );

            localStorage.setItem(
                "annoselect",
                JSON.stringify("")
            );
            setListtiposVehiculos(
                JSON.parse(localStorage.getItem("datostiposvehiculos"))
            );
            setListMarcasVehiculos(
                JSON.parse(localStorage.getItem("datosmarcasvehiculos"))
            );
            setListCarroceriasVehiculos(
                JSON.parse(localStorage.getItem("datoscarroceriasvehiculos"))
            );
            let anosveh = JSON.parse(localStorage.getItem("datosannosvehiculos"));
            setListAnnosVehiculos(
                JSON.parse(localStorage.getItem("datosannosvehiculos"))
            );
        }
    }, [editardatos, datasearchinteractive, datosannos]);

    const leerDatosHistorial = () => {
        localStorage.setItem("carroceriaselect", JSON.stringify(carroceriaVehiculo));
        dispatch(getCitySelect([]));
        dispatch(getChangeSearchPrice(false));
        localStorage.setItem("activafiltrociudad", JSON.stringify(false));
        localStorage.setItem("conditionselect", JSON.stringify(0));
        localStorage.setItem("cityselect", JSON.stringify([]));
        localStorage.setItem("redirect", JSON.stringify(0));
        localStorage.setItem("ctlrnotificacion", JSON.stringify(0));
        localStorage.setItem("crearusuario", JSON.stringify(false));
        localStorage.setItem("orderbyprd", JSON.stringify(0));
        localStorage.setItem("textoorderbyprd", JSON.stringify("Ordenar por"));
        localStorage.setItem("ctrlposicionprd", JSON.stringify(0));
        localStorage.setItem("posicionprd", JSON.stringify(0));
        localStorage.setItem("rangoprecios", JSON.stringify([]));
        localStorage.removeItem("dataWords");
        localStorage.setItem("filtrocondicionprd", JSON.stringify(0));
        localStorage.setItem("filtrociudadprd", JSON.stringify([]));
        localStorage.setItem("filtroprecioprd", JSON.stringify([]));
        localStorage.setItem("idvehgarage", JSON.stringify(-1));
        localStorage.setItem("selectvehgarage", JSON.stringify(null));
        let inicia = null;
        localStorage.setItem("placeholdersearch", JSON.stringify(inicia));

        let longveh = 0;
        let params;
        setTipoTransmision(0);

        if (datosusuarios.uid && datosusuarios.uid != 0) {
            params = {
                usuario: datosusuarios.uid
            };

            let historyveh = [];
            const leerHistoryVeh = async () => {
                await axios({
                    method: "post",
                    url: URL_BD_MR + "99",
                    params,
                })
                    .then((res) => {

                        longveh = res.data.listhistoryvehsearchspecial.length;
                        historyveh = res.data.listhistoryvehsearchspecial;
                        setDatHistoryVehSearch(res.data.listhistoryvehsearchspecial);

                        colocarDatosState(historyveh);

                        if (longveh >= 11) {
                            let delregistro = longveh - 1;

                            let params = {
                                id: res.data.listhistoryvehsearchspecial[delregistro].id
                            };

                            const borrarItem = async () => {
                                await axios({
                                    method: "post",
                                    url: URL_BD_MR + "101",
                                    params,
                                })
                                    .then((res) => {
                                        console.log("Borro item historial");
                                    })
                                    .catch(function (error) {
                                        console.log("Error borrar historial");
                                    });
                            };

                            if (datosusuarios.uid && datosusuarios.uid != 0)
                                borrarItem();

                        }
                    })
                    .catch(function (error) {
                        console.log("Lee Productos Temporal Error111: ");
                    });
            };
            leerHistoryVeh();
        } else {
            let datahistoryveh = JSON.parse(localStorage.getItem("datahistoryveh"));
            colocarDatosState(datahistoryveh);

        }
    }

    const colocarDatosState = (historyveh) => {
        let nombretraccionsel;
        let item = {
            idproducto: 0,
            nombreimagen1: "",
            titulonombre: "",
            cantidad: 0,
        };
        localStorage.setItem(
            "addedtocart",
            JSON.stringify(item)
        );

        if (tipoVehiculo == 3 || tipoVehiculo == 6 || tipoVehiculo == 1 || tipoVehiculo == 4) {
            nombretraccionsel = "Tracción";
            setTipoTraccion(0);
        } else
            nombretraccionsel = nombreTraccionVeh;

        if (cambioCilindraje && cambioTransmision) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos cilindraje y transmisión de tu vehículo, son necesarios para continuar."
            );
            return;
        }

        if (cambioCilindraje && cambioCombustible) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos cilindraje y combustible de tu vehículo, son necesarios para continuar."
            );
            return;
        }

        if (cambioCilindraje && cambioTraccion) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos cilindraje y tracción de tu vehículo, son necesarios para continuar."
            );
            return;
        }

        if (cambioCilindraje) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato cilindraje de tu vehículo, es necesario para continuar."
            );
            return;
        }

        if (cambioCombustible && cambioTransmision) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos combustible y transmisión de tu vehículo, son necesarios para continuar."
            );
            return;
        }

        if (cambioCombustible && cambioTraccion) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos combustible y tracción de tu vehículo, son necesarios para continuar."
            );
            return;
        }

        if (cambioCombustible) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato combustible de tu vehículo, es necesario para continuar."
            );
            return;
        }

        if (cambioTraccion && cambioTransmision) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos tracción y transmisión de tu vehículo, son necesarios para continuar."
            );
            return;
        }

        if (cambioTransmision) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato tipo de transmisión de tu vehículo, es necesario para continuar."
            );
            return;
        }

        if (cambioTraccion) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato tipo de tracción de tu vehículo, es necesario para continuar."
            );
            return;
        }
        //localStorage.removeItem("datasearchinteractive");

        let editar = {
            editarCombustible: false,
            editarTraccion: false,
            editarTransmision: false,
            editarCilindraje: false
        };

        dispatch(getEditDataFind(editar));
        if (!tipoVehiculo) {
            setAlertaTipo("textoalertdos")
        }

        if (!carroceriaVehiculo) {
            setAlertaCarroceria("textoalertdos")
        }

        if (!marcaVehiculo) {
            setAlertaMarca("textoalertdos")
        }

        if (!modeloVehiculo || modeloVehiculo.length === 0) {
            setAlertaModelos("textoalert")
        }

        if (!tipoVehiculo && !carroceriaVehiculo && !marcaVehiculo && (!modeloVehiculo || modeloVehiculo.length === 0)) {
            setAlertarTipo("textoalertdos")
            setAlertarCarroceria("textoalertdos")
            setAlertarMarca("textoalertdos")
            setAlertarModelo("textoalertdos")
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos tipo de vehículo, carroceria, marca y modelo son necesarios para continuar."
            );
            return;
        }

        if (!carroceriaVehiculo && !marcaVehiculo && (!modeloVehiculo || modeloVehiculo.length === 0)) {
            setAlertarCarroceria("textoalertdos")
            setAlertarMarca("textoalertdos")
            setAlertarModelo("textoalertdos")

            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos carroceria, marca y modelo de tu vehículo son necesarios para continuar."
            );
            return;
        }
        if (!marcaVehiculo && (!modeloVehiculo || modeloVehiculo.length === 0)) {
            setAlertarMarca("textoalertdos")
            setAlertarModelo("textoalertdos")

            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos marca y modelo del vehículo son necesarios para continuar."
            );
            return;
        }

        if (!marcaVehiculo && !modeloVehiculo) {
            setAlertarMarca("textoalertdos")
            setAlertarModelo("textoalertdos")

            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos marca y modelo del vehículo son necesarios para continuar."
            );
            return;
        }

        if (!modeloVehiculo || modeloVehiculo.length === 0) {
            setAlertarModelo("textoalertdos")
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato modelo del vehículo es necesarios para continuar."
            );
            return;
        }

        if (!tipoVehiculo) {
            setAlertarTipo("textoalertdos")

            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato tipo del vehículo, es necesarios para continuar."
            );
            return;
        }

        if (!carroceriaVehiculo) {
            setAlertarCarroceria("textoalertdos")

            setShowModalMensajes(true);
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato tipo de carroceria del vehículo, es necesarios para continuar."
            );
            return;
        }

        if (!marcaVehiculo) {
            setAlertarMarca("textoalertdos")

            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato marca del vehículo, es necesarios para continuar."
            );
            return;
        }

        let marcasSeleccionadas = "";
        const detNombreAnno = [];
        let annoSeleccionadas = "";
        let modeloSeleccionadas = "";
        let cilindrajeSeleccionadas = "";
        let combustibleSeleccionadas = "";
        let transmisionSeleccionadas = "";
        let traccionSeleccionadas = "";

        if (marcaVehiculo.length > 0) {
            marcasSeleccionadas = marcaVehiculo;
        }

        let longano = annoVehiculo.length;
        //!controlVeh
        if (longano > 0 && !controlVeh) {
            for (var i = 0; i < annoVehiculo.length; i++) {
                detNombreAnno.push(annoVehiculo[i].anovehiculo);
                annoSeleccionadas = annoSeleccionadas + annoVehiculo[i].anovehiculo + "; ";
            }
        } else {
            annoSeleccionadas = 0;
        }

        //console.log("NOMBRE AÑO : ", detNombreAnno)
        //console.log("AÑO VEH SEL : ", annoVehiculo)
        //return

        if (detNombreAnno.length > 0) {
            setNombreAnnoVeh(detNombreAnno);
        }
        else {
            setNombreAnnoVeh(["Año"]);
        }

        if (modeloVehiculo.length > 0) {
            modeloSeleccionadas = modeloVehiculo;
        }

        let codcilindrajesel = 0;

        if (!cilindrajeVehiculo || cilindrajeVehiculo.length == 0) codcilindrajesel = 0;
        else
            codcilindrajesel = cilindrajeVehiculo;

        if (cilindrajeVehiculo.length > 0) {
            cilindrajeSeleccionadas = cilindrajeVehiculo;
        }

        if (tipoCombustible)
            if (tipoCombustible.length > 0) {
                combustibleSeleccionadas = tipoCombustible;
            }

        console.log("tipoTransmision : ", tipoTransmision)

        if (tipoTransmision) {
            if (tipoTransmision.length > 0 || nombreTransmisionVeh != "Transmisión") {
                if ("Automática" == nombreTransmisionVeh) {
                    transmisionSeleccionadas = 1
                } else
                    if ("Manual" == nombreTransmisionVeh) {
                        transmisionSeleccionadas = 2
                    } else {
                        transmisionSeleccionadas = tipoTransmision;
                    }
            }
        } else {
            transmisionSeleccionadas = 0;
            nombreTransmisionVeh == "Transmisión";
        }

        console.log("TRACCION : ", tipoTraccion)

        if (tipoTraccion)
            if (tipoTraccion.length > 0) {
                traccionSeleccionadas = codigoTipoTraccion;
            }

        localStorage.setItem(
            "tipovehselect",
            JSON.stringify(tipoVehiculo)
        );

        let codigoTipoTransmision = 0;
        let codigoTipoCombustible = 0;
        let codigoTipoTraccion = 0;

        if (tipoVehiculo == 4) {
            codigoTipoTransmision = 0;
            codigoTipoCombustible = 0;
            codigoTipoTraccion = 0;
        } else {
            codigoTipoTransmision = tipoTransmision;
            codigoTipoCombustible = tipoCombustible;;
            codigoTipoTraccion = tipoTraccion;
        }

        const DatosBuscadorInteractivo = {
            idvehiculo: tipoVehiculo,
            idcarrorecia: carroceriaVehiculo,
            idmarca: marcaVehiculo,
            codigoano: annoVehiculo,
            codigomodelo: modeloVehiculo,
            codigocilindraje: codcilindrajesel,
            codigocombustible: codigoTipoCombustible,
            codigotransmision: codigoTipoTransmision,
            codigotraccion: codigoTipoTraccion,
            nombretipovehiculo: nombreTipoVeh,
            nombrecarroceria: nombreCarroceriaVeh,
            nombremarca: nombreMarcaVeh,
            nombreanno: nombreAnnoVeh,
            nombremodelo: nombreModeloVeh,
            nombrecilindraje: nombreCilindrajeVeh,
            nombretipocombustible: nombreCombustibleVeh,
            nombretransmision: nombreTransmisionVeh,
            nombretraccion: nombretraccionsel,
            marcasseleccionadas: marcasSeleccionadas,
            annosseleccionado: annoSeleccionadas,
            modelosseleccionados: modeloSeleccionadas,
            cilindrajesseleccionados: cilindrajeSeleccionadas,
            combustiblesseleccionados: combustibleSeleccionadas,
            transmisionesseleccionadas: transmisionSeleccionadas,
            traccionesseleccionadas: traccionSeleccionadas,
            tiposvehiculos: listTiposVehiculos,
            tiposcarrocerias: carrocerias,
            tiposmarcas: marcas,
            tiposmodelos: modelos,
            tiposcilindrajes: cilindrajes,
        };
        // Graba vehiculo consultado en historico del buscador especial

        let idano = 0;
        let anosel = 0;

        if (annoVehiculo.length > 0) {
            idano = annoVehiculo[0].id;
            anosel = nombreAnnoVeh[0];
        }
        else {
            idano = 0;
            anosel = 0;
        }

        let compara = "" + parseInt(tipoVehiculo) + "-" +
            parseInt(carroceriaVehiculo) + "-" +
            parseInt(marcaVehiculo) + "-" +
            idano + "-" +
            parseInt(modeloVehiculo) + "-" +
            parseInt(codcilindrajesel) + "-" +
            parseInt(codigoTipoCombustible) + "-" +
            parseInt(codigoTipoTransmision) + "-" +
            parseInt(codigoTipoTraccion)

        historyveh &&
            historyveh.map((row, index) => {

                let valida = "" + parseInt(row.tipovehiculo) + "-" +
                    parseInt(row.carroceria) + "-" +
                    parseInt(row.marca) + "-" +
                    row.anno + "-" +
                    parseInt(row.modelo) + "-" +
                    parseInt(row.codigocilindraje) + "-" +
                    parseInt(row.codigocombustible) + "-" +
                    parseInt(row.codigotransmision) + "-" +
                    parseInt(row.codigotraccion)

                if (valida == compara) {

                    if (datosusuarios.uid && datosusuarios.uid != 0) {
                        let params = {
                            id: row.id
                        };

                        const borrarItem = async () => {
                            await axios({
                                method: "post",
                                url: URL_BD_MR + "101",
                                params,
                            })
                                .then((res) => {
                                    console.log("Borro item historial");
                                })
                                .catch(function (error) {
                                    console.log("Error borrar historial");
                                });
                        };
                        borrarItem();
                    } else {
                        let datahistoryveh = JSON.parse(localStorage.getItem("datahistoryveh"));
                        let itemdos = [];
                        datahistoryveh &&
                            datahistoryveh.map((dat, item) => {
                                if (index != item) {
                                    itemdos.push(dat)
                                }
                            });
                        localStorage.setItem("datahistoryveh", JSON.stringify(itemdos));
                    }
                }
            });

        let anoVehSel = 0;
        if (nombreAnnoVeh)
            anoVehSel = nombreAnnoVeh[0];
        else {
            anoVehSel = 0;
        }

        let params = {
            usuario: datosusuarios.uid,
            idtipoproducto: shortid(),
            tipovehiculo: parseInt(tipoVehiculo),
            carroceria: parseInt(carroceriaVehiculo),
            marca: parseInt(marcaVehiculo),
            codigoano: idano,
            anno: idano,
            modelo: parseInt(modeloVehiculo),
            cilindraje: parseInt(codcilindrajesel),
            combustible: parseInt(codigoTipoCombustible),
            transmision: parseInt(codigoTipoTransmision),
            traccion: parseInt(codigoTipoTraccion),
            selecttipo: nombreTipoVeh,
            selectcarroceria: nombreCarroceriaVeh,
            selectmarca: nombreMarcaVeh,
            selectanno: anoVehSel,
            selectmodelo: nombreModeloVeh,
            selectcilindraje: nombreCilindrajeVeh,
            selectcombustible: nombreCombustibleVeh,
            selecttransmision: nombreTransmisionVeh,
            selecttraccion: nombretraccionsel,
            estado: 31,
            idvehiculo: parseInt(tipoVehiculo),
            idcarrorecia: parseInt(carroceriaVehiculo),
            idmarca: parseInt(marcaVehiculo),
            codigomodelo: parseInt(modeloVehiculo),
            codigocilindraje: parseInt(codcilindrajesel),
            codigocombustible: parseInt(codigoTipoCombustible),
            codigotransmision: parseInt(codigoTipoTransmision),
            codigotraccion: parseInt(codigoTipoTraccion),
            nombretipovehiculo: nombreTipoVeh,
            nombrecarroceria: nombreCarroceriaVeh,
            nombremarca: nombreMarcaVeh,
            nombreanno: anosel,
            nombremodelo: nombreModeloVeh,
            nombrecilindraje: nombreCilindrajeVeh,
            nombretipocombustible: nombreCombustibleVeh,
            nombretransmision: nombreTransmisionVeh,
            nombretraccion: nombretraccionsel,
            marcasseleccionadas: marcasSeleccionadas,
            annosseleccionado: annoSeleccionadas,
            modelosseleccionados: modeloSeleccionadas,
            cilindrajesseleccionados: cilindrajeSeleccionadas,
            combustiblesseleccionados: combustibleSeleccionadas,
            transmisionesseleccionadas: transmisionSeleccionadas,
            traccionesseleccionadas: traccionSeleccionadas,
        }

        localStorage.setItem(
            "addedtocart",
            JSON.stringify(item)
        );

        const grabarHistoricoVeh = async () => {
            await axios({
                method: "post",
                url: URL_BD_MR + "98",
                params,
            })
                .then((res) => {
                    console.log("ADD HISTORIA VEH : ", res.data);
                    //setArrayHistoryVeh(res.data.listhistoryvehsearchspecial);
                    //setDataFind(datacontact);
                })
                .catch(function (error) {
                    console.log("Lee Productos Temporal Error222: ");
                });
        };

        if (datosusuarios.uid && datosusuarios.uid != 0)
            grabarHistoricoVeh();

        //console.log("HISTORIDDDD : ", params)
        //return

        if (!datosusuarios.uid || datosusuarios.uid == 0) {
            let datahistoryveh = JSON.parse(localStorage.getItem("datahistoryveh"));
            let long = 0;

            if (datahistoryveh)
                long = datahistoryveh.length;

            if (long < 4) {
                let item = [];
                if (long > 0)
                    item = datahistoryveh;

                item.push(params);
                localStorage.setItem("datahistoryveh", JSON.stringify(item));
            } else {
                let item = [];
                datahistoryveh &&
                    datahistoryveh.map((row, index) => {
                        if (index > 0)
                            item.push(row)
                    });
                item.push(params);
                localStorage.setItem("datahistoryveh", JSON.stringify(item));
            }
        }

        let transmisionselect = "";
        let traccionselect = "";
        let cilindrajeselect = "";
        let combustibleselect = "";
        let anosselect = "";

        //console.log("AÑOS XX: ", nombreAnnoVeh)
        if (nombreAnnoVeh[0] != "Año" && nombreAnnoVeh[0] != "A")
            anosselect = "; " + detNombreAnno;

        if (nombreTransmisionVeh != "Transmisión")
            transmisionselect = "; " + nombreTransmisionVeh;

        if (nombretraccionsel != "Tracción") {
            traccionselect = "; " + nombretraccionsel;
        }

        if (nombreCilindrajeVeh != "Cilindraje" && nombreCilindrajeVeh && nombreCombustibleVeh != "Combustible")
            cilindrajeselect = "; " + nombreCilindrajeVeh;
        else
            if (nombreCilindrajeVeh != "Cilindraje" && nombreCilindrajeVeh && nombreCombustibleVeh == "Combustible")
                cilindrajeselect = "" + nombreCilindrajeVeh;
            else
                if (nombreCilindrajeVeh != "Cilindraje" && nombreCilindrajeVeh)
                    cilindrajeselect = "; " + nombreCilindrajeVeh;

        if (nombreCombustibleVeh != "Combustible" && nombreCombustibleVeh)
            combustibleselect = "; " + nombreCombustibleVeh;

        let DatosSeleccionadosBuscador = "";

        let nombreAnoVeh = "";
        //if (nombreAnnoVeh)
        //nombreAnoVeh = nombreAnnoVeh.substr(0, 4);


        if (tipoVehiculo != 4) {
            DatosSeleccionadosBuscador = {
                nombretipovehiculo: nombreTipoVeh,
                nombrecarroceria: "; " + nombreCarroceriaVeh,
                nombremarca: "; " + nombreMarcaVeh,
                nombreanno: nombreAnnoVeh,
                nombremodelo: "; " + nombreModeloVeh,
                nombrecilindraje: cilindrajeselect,
                nombretipocombustible: combustibleselect,
                nombretransmision: transmisionselect,
                nombretraccion: traccionselect
            }
        } else {
            DatosSeleccionadosBuscador = {
                nombretipovehiculo: nombreTipoVeh,
                nombrecarroceria: "; " + nombreCarroceriaVeh,
                nombremarca: "; " + nombreMarcaVeh,
                nombreanno: nombreAnnoVeh,
                //nombreanno: nombreAnnoVeh.substr(0, 4),
                nombremodelo: "; " + nombreModeloVeh,
                nombrecilindraje: cilindrajeselect,
                nombretipocombustible: combustibleselect
            }
        }

        dispatch(getDataSelectSearch(DatosSeleccionadosBuscador));
        localStorage.setItem("dataselectsearch", JSON.stringify(DatosSeleccionadosBuscador));
        //console.log(`DATOS BUSCADOR INTERACTIVO : `, DatosSeleccionadosBuscador);
        dispatch(getDataSearchInteractive(DatosBuscadorInteractivo));
        localStorage.setItem("datasearchinteractive", JSON.stringify(DatosBuscadorInteractivo));
        let editdata = {
            editar: false
        }

        dispatch(getEditData(editdata));
        mostrarCarroceria();
    };

    const mostrarCarroceria = () => {
        //alert(carroceriaVehiculo)
        localStorage.setItem("aadditemcar", JSON.stringify(false));
        localStorage.setItem("editdata", JSON.stringify(false));
        localStorage.setItem("activargrilla", JSON.stringify(0));
        //AQUI

        if (carroceriaVehiculo == 24) {
            router.push("/searchinteractive/sedan/searchsedan#searchmr");
        } else
            if (carroceriaVehiculo == 8) {
                router.push("/searchinteractive/coupe/searchcoupe#searchmr");
            } else
                if (carroceriaVehiculo == 2) {
                    router.push("/searchinteractive/automoviltrespuertas/searchtrespuertas#searchmr");
                } else
                    if (carroceriaVehiculo == 3) {
                        router.push("/searchinteractive/automovilcincopuertas/searchcincopuertas#searchmr");
                    }
                    else
                        if (carroceriaVehiculo == 16) {
                            router.push("/searchinteractive/camionetas/estacadoblechasis/searchestacadoble#searchmr");
                        } else
                            if (carroceriaVehiculo == 17) {
                                router.push("/searchinteractive/camionetas/estacacabinasencilla/searchestacasencilla#searchmr");
                            } else
                                if (carroceriaVehiculo == 20) {
                                    router.push("/searchinteractive/camionetas/volcodoblecabina/searchdoblevolco#searchmr");
                                }
                                else
                                    if (carroceriaVehiculo == 21) {
                                        router.push("/searchinteractive/camionetas/volcocabinasencilla/searchvolcosencilla#searchmr");
                                    } else
                                        if (carroceriaVehiculo == 25) {
                                            router.push("/searchinteractive/camionetas/suvcamperostrespuertas/searchsuvtrespuertas#searchmr");
                                        } else
                                            if (carroceriaVehiculo == 26) {
                                                router.push("/searchinteractive/camionetas/suvcamperoscincopuertas/searchsuvcincopuertas#searchmr");
                                            } else
                                                if (carroceriaVehiculo == 60) {
                                                    router.push("/searchinteractive/camionestrompa/articuladocontrompa/searcharticulado#searchmr");
                                                } else
                                                    if (carroceriaVehiculo == 13) {
                                                        router.push("/searchinteractive/camionestrompa/dobletroquecontrompa/searchdobletroque#searchmr");
                                                    } else
                                                        if (carroceriaVehiculo == 18) {
                                                            router.push("/searchinteractive/camionestrompa/gruacontrompa/searchgrua#searchmr");
                                                        } else
                                                            if (carroceriaVehiculo == 35) {
                                                                router.push("/searchinteractive/camionestrompa/sencillocontrompa/searchsencillo#searchmr");
                                                            } else
                                                                if (carroceriaVehiculo == 31) {
                                                                    router.push("/searchinteractive/camionestrompa/volquetadoblecontrompa/searchvolquetadoble#searchmr");
                                                                } else
                                                                    if (carroceriaVehiculo == 32) {
                                                                        router.push("/searchinteractive/camionestrompa/volquetasencillacontrompa/searchvolquetasencilla#searchmr");
                                                                    } else
                                                                        if (carroceriaVehiculo == 1) {
                                                                            router.push("/searchinteractive/camionessintrompa/articuladosintrompa/searcharticulado#searchmr");
                                                                        } else
                                                                            if (carroceriaVehiculo == 10) {
                                                                                router.push("/searchinteractive/camionessintrompa/cuatromanos/searchcuatromanos#searchmr");
                                                                            } else
                                                                                if (carroceriaVehiculo == 84) {
                                                                                    router.push("/searchinteractive/camionessintrompa/dobletroquesintrompa/searchdobletroque#searchmr");
                                                                                } else
                                                                                    if (carroceriaVehiculo == 87) {
                                                                                        router.push("/searchinteractive/camionessintrompa/gruasintrompa/searchgrua#searchmr");
                                                                                    }
                                                                                    else
                                                                                        if (carroceriaVehiculo == 7) {
                                                                                            router.push("/searchinteractive/camionessintrompa/sencillosintrompa/searchsencillo#searchmr");
                                                                                        }
                                                                                        else
                                                                                            if (carroceriaVehiculo == 123) {
                                                                                                router.push("/searchinteractive/camionessintrompa/volquetadoblesintrompa/searchvolquetadoble#searchmr");
                                                                                            }
                                                                                            else
                                                                                                if (carroceriaVehiculo == 125) {
                                                                                                    router.push("/searchinteractive/automovilcincopuertas/searchcincopuertas#searchmr");
                                                                                                }
                                                                                                else
                                                                                                    if (carroceriaVehiculo == 124) {
                                                                                                        router.push("/searchinteractive/automoviltrespuertas/searchtrespuertas#searchmr");
                                                                                                    } else
                                                                                                        if (carroceriaVehiculo == 126) {
                                                                                                            router.push("/searchinteractive/camionetas/suvcamperoscincopuertas/searchsuvcincopuertas#searchmr");
                                                                                                        } else
                                                                                                            if (carroceriaVehiculo == 121) {
                                                                                                                router.push("/searchinteractive/camionessintrompa/volquetasencillasintrompa/searchvolquetasencilla#searchmr");
                                                                                                            } else
                                                                                                                if (carroceriaVehiculo == 4) {
                                                                                                                    router.push("/searchinteractive/vansybuses/bus/searchbus#searchmr");
                                                                                                                } else
                                                                                                                    if (carroceriaVehiculo == 122) {
                                                                                                                        router.push("/searchinteractive/vansybuses/buseta/searchbuseta#searchmr");
                                                                                                                    } else
                                                                                                                        if (carroceriaVehiculo == 30) {
                                                                                                                            router.push("/searchinteractive/vansybuses/vans/searchvans#searchmr");
                                                                                                                        } else
                                                                                                                            if (carroceriaVehiculo == 5) {
                                                                                                                                router.push("/searchinteractive/motos/calle/searchcalle#searchmr");
                                                                                                                            }
                                                                                                                            else
                                                                                                                                if (carroceriaVehiculo == 19 || carroceriaVehiculo == 9) {
                                                                                                                                    router.push("/searchinteractive/motos/motocarro/searchcalle#searchmr");
                                                                                                                                }
                                                                                                                                else
                                                                                                                                    if (carroceriaVehiculo == 12) {
                                                                                                                                        router.push("/searchinteractive/motos/deportiva/searchdeportiva#searchmr");
                                                                                                                                    } else
                                                                                                                                        if (carroceriaVehiculo == 14) {
                                                                                                                                            router.push("/searchinteractive/motos/enduro/searchenduro#searchmr");
                                                                                                                                        } else
                                                                                                                                            if (carroceriaVehiculo == 22) {
                                                                                                                                                router.push("/searchinteractive/motos/scooter/searchscooter#searchmr");
                                                                                                                                            } else
                                                                                                                                                if (carroceriaVehiculo == 28) {
                                                                                                                                                    router.push("/searchinteractive/motos/touring/searchtouring#searchmr");
                                                                                                                                                }


    };

    let combustible = [
        { label: "Gasolina", value: 1 },
        { label: "Diesel", value: 2 },
        { label: "Gasolina – Gas", value: 3 },
        { label: "Gasolina – Eléctrico", value: 4 },
    ];

    if (tipoVehiculo == 4) {
        combustible = [
            { label: "Gasolina – Eléctrico", value: 4 },
        ];
    } else {
        combustible = [
            { label: "Gasolina", value: 1 },
            { label: "Diesel", value: 2 },
            { label: "Gasolina – Gas", value: 3 },
            { label: "Gasolina – Eléctrico", value: 4 },
        ];
    }

    const transmision = [
        { label: "Automática", value: 1 },
        { label: "Manual", value: 2 },
    ];

    const traccion = [
        { label: "Tracción Delantera", value: 1 },
        { label: "Tracción Trasera", value: 2 },
        { label: "Tracción 4x4", value: 3 },
    ];

    const tracciondos = [
        { label: "Tracción Trasera", value: 2 },
        { label: "Tracción 4x4", value: 3 },
    ];

    // Lee de la base de datos los tipos de Vehiculos
    useEffect(() => {
        let editdat = JSON.parse(localStorage.getItem("editdata"));
        let editVehHistory = JSON.parse(localStorage.getItem("editVehHistory"));

        if (marcarItem.length == 0 && (!editardatos || !editdat)) {

            if (!editVehHistory) {
                setModeloVehiculo([]);
                setCilindrajeVehiculo([]);
                setCilindrajes([]);

                setTipoCombustible(0);
                setTipoTransmision(0);
                setTipoTraccion(0);
                if (tiposelecthome == 0 && tiposelectmain == 0) {
                    setNombreTipoVeh("Tipo Vehículo");
                } else
                    if (tiposelecthome == 0) {
                        setNombreCarroceriaVeh("Carrocería");
                        setNombreMarcaVeh("Marca");
                        setMarcas([]);
                        setModels([]);
                    }
                setNombreAnnoVeh(["Año"]);
                setNombreModeloVeh("Modelo");
                setNombreCilindrajeVeh("Cilindraje");
                setNombreCombustibleVeh("Combustible");

            }
        }
    }, [marcarItem]);

    const handleChange = (selectedOptions) => {
        //setAlertarTipo("textoalertdos");
        //setAlertarCarroceria("textoalertdos");
        //setAlertarMarca("textoalertdos");
        //setAlertarModelo("textoalertdos");
        setClassCombustible("alinearizquierda dropdownsearchinteractivecombustible");
        setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindraje");
        setClassTransmision("alinearizquierda dropdownsearchinteractiveothers");
        setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothers");
        setAlertaTipo("");
        setAlertarTipo("");
        setCarroceriaVehiculo(0);
        setMarcaVehiculo(0);
        //setAnnoVehiculo([]);

        setModeloVehiculo([]);
        setCilindrajeVehiculo([]);
        setCilindrajes([]);
        setModels([]);
        setMarcas([]);
        setTipoCombustible(0);
        setTipoTransmision(0);
        setTipoTraccion(0);

        setNombreCarroceriaVeh("Carrocería");
        setNombreMarcaVeh("Marca");
        setNombreAnnoVeh(["Año"]);
        setAnnoVehiculo([]);
        setNombreModeloVeh("Modelo");
        setNombreCilindrajeVeh("Cilindraje");
        setNombreCombustibleVeh("Combustible");
        // setMostrarCombustible("ocultar-div");
        // setNombreCombustibleVeh("");

        if (selectedOptions == 3 || selectedOptions == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setMostrarCombustible("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
            setNombreCombustibleVeh("");
        } else if (
            selectedOptions == 1 ||
            selectedOptions == 3 ||
            selectedOptions == 4 ||
            selectedOptions == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            setNombreTransmisionVeh("Transmisión");
            setNombreCombustibleVeh("Combustible");
            setMostrarCombustible("mostrar-div");
            setDisabledTransmision(false);
            setDisabledCombustible(false);
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            setMostrarCombustible("mostrar-div");
            setNombreTransmisionVeh("Transmisión");
            setNombreTraccionVeh("Tracción");
            setNombreCombustibleVeh("Combustible");
            setDisabledTransmision(false);
            setDisabledTraccion(false);
            setDisabledCombustible(false);
        }

        setTipoVehiculo(selectedOptions);
        const tipovehiculo = {
            idtipovehiculo: selectedOptions,
        };

        async function readtypevehicle(tipovehiculo) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            listTiposVehiculos &&
                listTiposVehiculos.forEach((row) => {
                    if (
                        Number.parseInt(row.id) ===
                        Number.parseInt(tipovehiculo.idtipovehiculo)
                    ) {
                        setNombreTipoVeh(row.label);
                    }
                });
        }
        readtypevehicle(tipovehiculo);

        const newDet = [];
        console.log("TIPO : ", listCarroceriasVehiculos)
        if (tipovehiculo.idtipovehiculo != 4) {
            listCarroceriasVehiculos.forEach((row) => {
                if (
                    parseInt(row.tipovehiculo) ===
                    parseInt(selectedOptions)
                ) {
                    //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                    let item = {
                        id: row.id,
                        carroceria: row.carroceria,
                        tipovehiculo: row.tipovehiculo,
                        estado: row.estado,
                        value: row.id,
                        label: row.carroceria,
                    };
                    newDet.push(item);
                }
            });
        } else {
            listCarroceriasVehiculos.forEach((row) => {

                if (
                    parseInt(row.tipovehiculo) ===
                    parseInt(selectedOptions)
                ) {
                    if (row.id == 8 || row.id == 24 || row.id == 26 ||
                        row.id == 124 || row.id == 125 || row.id == 126) {
                        let item = {
                            id: row.id,
                            carroceria: row.carroceria,
                            tipovehiculo: row.tipovehiculo,
                            estado: row.estado,
                            value: row.id,
                            label: row.carroceria,
                        };
                        newDet.push(item);
                    }
                }
            });
        }

        console.log("NEWDET : ", newDet)

        setCarrocerias(newDet);
    };

    const handleChangeCarroceria = (selectedOptions) => {
        setAlertaCarroceria("");
        setAlertarCarroceria("");
        setCarroceriaVehiculo(selectedOptions);

        if ((selectedOptions == 16 ||
            selectedOptions == 21 ||
            selectedOptions == 17 ||
            selectedOptions == 20) &&
            controltraccion == 1)
            setNombreTraccionVeh("Tracción")

        setClassCombustible("alinearizquierda dropdownsearchinteractivecombustible");
        setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindraje");
        setClassTransmision("alinearizquierda dropdownsearchinteractiveothers");
        setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothers");

        setMarcaVehiculo(0);
        //setAnnoVehiculo([]);

        setModeloVehiculo([]);
        setCilindrajeVehiculo([]);
        setCilindrajes([]);
        setModels([]);
        setTipoCombustible(0);
        setTipoTransmision(0);
        setTipoTraccion(0);

        setNombreMarcaVeh("Marca");
        //setNombreAnnoVeh("Año...");
        setNombreModeloVeh("Modelo");
        setNombreCilindrajeVeh("Cilindraje");
        //setAlertarMarca("textoalertdos");
        //setAlertarModelo("textoalertdos");

        //setNombreTransmisionVeh("Transmisión");
        //setNombreCombustibleVeh("Combustible");
        //setNombreTraccionVeh("Tracción");
        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
            setMostrarCombustible("ocultar-div");
            setNombreCombustibleVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
            //setNombreTraccionVeh("Tracción");
        }

        const newDet = [];
        listMarcasVehiculos &&
            listMarcasVehiculos.forEach((row) => {
                if (
                    Number.parseInt(row.tipovehiculo) ===
                    Number.parseInt(tipoVehiculo) &&
                    Number.parseInt(row.carroceria) ===
                    Number.parseInt(selectedOptions)
                ) {
                    let item = {
                        id: row.id,
                        text: row.text,
                        tipovehiculo: row.tipovehiculo,
                        carroceria: row.carroceria,
                        estado: row.estado,
                        url: row.url,
                    };
                    newDet.push(item);
                }
            });
        setMarcas(newDet);
    };

    const handleChangeBrand = (selectedOptions) => {
        setAlertaMarca("");
        setAlertarMarca("");
        // Asignamos la marca del Vehiculo Seleccionado por el usuario
        setMarcaVehiculo(selectedOptions);

        //setAnnoVehiculo([]);

        setModeloVehiculo([]);
        setCilindrajeVehiculo([]);
        setCilindrajes([]);
        setTipoCombustible(0);
        setTipoTransmision(0);
        setTipoTraccion(0);

        setClassCombustible("alinearizquierda dropdownsearchinteractivecombustible");
        setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindraje");
        setClassTransmision("alinearizquierda dropdownsearchinteractiveothers");
        setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothers");

        //setNombreAnnoVeh("Año");
        setNombreModeloVeh("Modelo");
        setNombreCilindrajeVeh("Cilindraje");
        //setNombreTransmisionVeh("Transmisión");
        //setNombreCombustibleVeh("Combustible");
        //setNombreTraccionVeh("Tracción");
        //setAlertarModelo("textoalertdos");

        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
            setMostrarCombustible("ocultar-div");
            setNombreCombustibleVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
            //setNombreTraccionVeh("Tracción");
        }

        console.log("datosmodelosvehiculos : ", datosmodelosvehiculos)

        console.log("datosfind : ", tipoVehiculo, carroceriaVehiculo, selectedOptions)

        const newDet = [];
        datosmodelosvehiculos &&
            datosmodelosvehiculos.forEach((row) => {
                if (
                    parseInt(row.tipovehiculo) ===
                    parseInt(tipoVehiculo) &&
                    parseInt(row.marca) ===
                    parseInt(selectedOptions) &&
                    parseInt(row.carroceria) ===
                    parseInt(carroceriaVehiculo)
                ) {
                    //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                    let item = {
                        id: row.id,
                        modelo: row.modelo,
                        tipovehiculo: row.tipovehiculo,
                        marca: row.marca,
                        carroceria: row.carroceria,
                        estado: row.estado,
                        value: row.id,
                        label: row.modelo,
                    };
                    newDet.push(item);
                }
            });
        setModels(newDet);
    };

    const handleChangeModels = (selectedOptions) => {
        setClassCombustible("alinearizquierda dropdownsearchinteractivecombustible");
        setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindraje");
        setClassTransmision("alinearizquierda dropdownsearchinteractiveothers");
        setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothers");

        setAlertaModelos("");
        setAlertarModelo("");

        setModeloVehiculo(selectedOptions);
        //setAnnoVehiculo([]);
        setCilindrajeVehiculo([]);
        setCilindrajes([]);
        setTipoCombustible(0);
        setTipoTransmision(0);
        setTipoTraccion(0);

        //setNombreAnnoVeh("Año...");
        setNombreCilindrajeVeh("Cilindraje");
        //setNombreTransmisionVeh("Transmisión");
        //setNombreCombustibleVeh("Combustible");
        //setNombreTraccionVeh("Tracción");

        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
            setMostrarCombustible("ocultar-div");
            setNombreCombustibleVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
            //setNombreTraccionVeh("Tracción");
        }

        if (selectedOptions.length > 0) {
            const newDet = [];
            datoscilindrajevehiculos &&
                datoscilindrajevehiculos.forEach((row) => {
                    if (
                        parseInt(row.tipovehiculo) ===
                        parseInt(tipoVehiculo) &&
                        parseInt(row.carroceria) ===
                        parseInt(carroceriaVehiculo) &&
                        parseInt(row.modelo) ===
                        parseInt(selectedOptions)
                    ) {
                        //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                        let item = {
                            id: row.id,
                            cilindraje: row.cilindraje,
                            tipovehiculo: row.tipovehiculo,
                            marca: row.marca,
                            carroceria: row.carroceria,
                            modelo: row.modelo,
                            estado: row.estado,
                            value: row.id,
                            label: row.cilindraje,
                        };
                        newDet.push(item);
                    }
                });
            setCilindrajes(newDet);
        }
    };

    const handleChangeAnno = (selectedOptions) => {
        //console.log("AÑOS SELEC: ",selectedOptions)
        setAnnoVehiculo(selectedOptions);

        let nombres = [];
        selectedOptions &&
            selectedOptions.map((row, index) => {
                nombres.push(row.label)
            });
        setNombreAnnoVeh(nombres);

        if (selectedOptions.length === 0) {
            setAnnoVehiculo([]);
            setNombreAnnoVeh(["Año"]);
        }

        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
            setMostrarCombustible("ocultar-div");
            setNombreCombustibleVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
            //setNombreTraccionVeh("Tracción");
        }
    };

    const handleChangeCilindraje = (selectedOptions) => {
        setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindraje");
        setCambioCilindraje(false);
        if (selectedOptions.length > 0) {
            //console.log("VERSION MOTOR SELECCIONADO : ", selectedOptions);
            setCilindrajeVehiculo(selectedOptions);
        }
        /*
                setNombreTransmisionVeh("Transmisión");
                setNombreCombustibleVeh("Combustible");
                setNombreTraccionVeh("Tracción");
        */
        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
            setMostrarCombustible("ocultar-div");
            setNombreCombustibleVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
            //setNombreTraccionVeh("Tracción");
        }
    };

    const handleChangeCombustible = (selectedOptions) => {
        //console.log("COMBUSTIBLE : ", selectedOptions);
        setTipoCombustible(selectedOptions);
        setClassCombustible("alinearizquierda dropdownsearchinteractivecombustible");
        setCambioCombustible(false);
        /*
                setNombreTraccionVeh("Tracción");
                setNombreTransmisionVeh("Transmisión");
        */
        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
            setMostrarCombustible("ocultar-div");
            setNombreCombustibleVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
            //setNombreTraccionVeh("Tracción");
        }
    };

    const handleChangeTransmision = (selectedOptions) => {
        setTipoTransmision(selectedOptions);
        setClassTransmision("alinearizquierda dropdownsearchinteractiveothers");
        setCambioTransmision(false);

        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
        } else {
            setMostrarTraccion("mostrar-div");
            //setNombreTraccionVeh("Tracción");
            //setDisabledTraccion(false);
        }
    };

    const handleChangeTraccion = (selectedOptions) => {
        setTipoTraccion(selectedOptions);
        controltraccion = selectedOptions;
        setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothers");
        setCambioTraccion(false);
    };

    // Lee de la base de datos los tipos de Vehiculos
    useEffect(() => {
        async function typesvehicles(dat) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            const TypesVehicles =
                await TypesVehiclesRepository.getTypesVehicles(0);
            //console.log("TYPES VEHICLES : ", TypesVehicles[0].header_supplies);
            setVehiculos(TypesVehicles[0]?.header_supplies);

            // Coloca los datos en state arreglo de categorias
            dispatch(getTypesVehicles(TypesVehicles));
        }
        typesvehicles(0);
    }, [tipos]);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useOnClickOutside(controlAnno, () => setOpen(false));

    // Control maximo de caracteres en modles
    useEffect(() => {
        if (nombreModeloVeh != "Modelo") {
            let longtexto = "";

            if (nombreModeloVeh)
                longtexto = nombreModeloVeh.length;

            if (longtexto > 15)
                longtexto = 15;

            let numero = "";
            dato = "" + nombreModeloVeh;
            let vid;
            let cont;

            for (var i = 0; i < longtexto; i++) {
                if (vid != "." || cont != "..") {
                    vid = dato.substr(i, 1);
                    cont = dato.substr(i, 2);
                    numero = numero + vid;
                }
            }

            let modelo = "";
            if (longtexto >= 15)
                modelo = numero + "...";
            else
                modelo = numero;
            setLongitudModelo(longtexto);
            setNombreModeloVeh(modelo);
        }
    }, [nombreModeloVeh]);

    // Control maximo de caracteres en marcas
    useEffect(() => {
        if (nombreMarcaVeh != "Marca") {
            let longtexto = 11; //nombreMarcaVeh.length;
            if (longtexto > 13)
                longtexto = 13;

            let numero = "";
            dato = "" + nombreMarcaVeh;
            let vid;

            for (var i = 0; i < longtexto; i++) {
                if (vid != ".") {
                    vid = dato.substr(i, 1);
                    numero = numero + vid;
                }
            }

            let marca = "";
            if (longtexto >= 13)
                marca = numero + "...";
            else
                marca = numero;
            setNombreMarcaVeh(marca);
        }
    }, [nombreMarcaVeh]);

    const onEdit = () => {
        if (nombreModeloVeh != "Modelo")
            setShowEdit(true);
    };
    const offEdit = () => {
        if (nombreModeloVeh != "Modelo")
            setShowEdit(false);
    };

    const asignaNombreModelo = (nombre) => {
        setNombreModeloBase(nombre);
        setNombreModeloVeh(nombre);
    }

    const encontrar = () => {
        if (datosusuarios.activo == 30) {
            //setDisableEnable("deshabilitar");
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Productos MR");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            return;
        }

        localStorage.setItem("placeholdersearch", JSON.stringify(""));
        localStorage.setItem("eraseplaceholder", JSON.stringify(0));
        router.push("/searchinteractive/addvehiclehistorysearch");
    };

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [marcarItem]);

    return (
        <Container title="Mi Cuenta">
            <div id="general" className="ps-page ps-page--inner" ref={irA}>
                <ModalMensajes
                    shown={showModalMensajes}
                    close={setShowModalMensajes}
                    titulo={tituloMensajes}
                    mensaje={textoMensajes}
                    tipo="1"
                />
                <ModalControlAcceso
                    shown={showModalControlAcceso}
                    close={setShowModalControlAcceso}
                    titulo={tituloControlAcceso}
                    mensaje={textoControlAcceso}
                    tipo="1"
                />
                <div className="row">
                    <div className="ml-188 col-md-6">
                        <div className="ps-page__header"></div>
                        <div className="titulotextobuscadorinteractivo">
                            Buscador Interactivo
                        </div>
                        <div className="ps-form__group searchContainer">
                            <div className="searchContainerMargin">
                                <div className="barrainputbuscadorinteractivo">
                                    <Row>
                                        <Col xs={3} sm={3} md={3} lg={3} >
                                            <Dropdown
                                                onSelect={handleChange}
                                            >
                                                <Dropdown.Toggle
                                                    className="alinearizquierda dropdownsearchinteractive"
                                                    variant="outline-light"
                                                    id="dropdown-basic">
                                                    <Row>
                                                        <Col xs={1} sm={1} md={1} lg={1} >
                                                            <h3 className={alertarTipo}> * </h3>
                                                        </Col>
                                                        <Col xs={10} sm={10} md={10} lg={10}
                                                            className={alertaTipo}
                                                        >
                                                            {nombreTipoVeh}
                                                        </Col>
                                                    </Row>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    variant="outline-light"
                                                    className="optionssearchinteractive">
                                                    {listTiposVehiculos &&
                                                        listTiposVehiculos.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustom"
                                                                        eventKey={
                                                                            item.id
                                                                        }
                                                                        onClick={() =>
                                                                            setNombreTipoVeh(item.text)}
                                                                    >
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
                                        <Col xs={2} sm={2} md={3} lg={3} >
                                            <Dropdown
                                                onSelect={handleChangeCarroceria}
                                            >
                                                <Dropdown.Toggle
                                                    className="mlmenos20 alinearizquierda searchcarrocerias"
                                                    variant="outline-light"
                                                    disabled={disabledCarroceria}
                                                    id="dropdown-basic">
                                                    <Row>
                                                        <Col xs={1} sm={1} md={1} lg={1} >
                                                            <h3 className={alertarCarroceria}> * </h3>
                                                        </Col>
                                                        <Col xs={10} sm={10} md={10} lg={10}
                                                            className={alertaCarroceria}
                                                        >
                                                            {nombreCarroceriaVeh}
                                                        </Col>
                                                    </Row>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    variant="outline-light"
                                                    className="optionssearchinteractivecarrocerias">
                                                    {carrocerias &&
                                                        carrocerias.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustom"
                                                                        eventKey={
                                                                            item.value
                                                                        }
                                                                        onClick={() =>
                                                                            setNombreCarroceriaVeh(item.label)}
                                                                    >
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
                                        <Col xs={2} sm={2} md={3} lg={3} >
                                            <Dropdown
                                                onSelect={handleChangeBrand}
                                            >
                                                <Dropdown.Toggle
                                                    onclick={CustomToggle}
                                                    className="ml-40 alinearizquierda 
                                                                   dropdownsearchinteractivebrand"
                                                    disabled={disabledMarca}
                                                    variant="outline-light"
                                                    id="dropdown-basic">
                                                    <Row>
                                                        <Col xs={1} sm={1} md={1} lg={1} >
                                                            <h3 className={alertarMarca}> * </h3>
                                                        </Col>
                                                        <Col xs={10} sm={10} md={10} lg={10}
                                                            className={alertaMarca}
                                                        >
                                                            {nombreMarcaVeh}
                                                        </Col>
                                                    </Row>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    as={CustomMenu}
                                                    variant="outline-light"
                                                    className="optionssearchinteractive">
                                                    {marcas &&
                                                        marcas.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustom"
                                                                        eventKey={
                                                                            item.id
                                                                        }
                                                                        onClick={() =>
                                                                            setNombreMarcaVeh(item.text)}
                                                                    >
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
                                        <div className={disabledAnno} >
                                            <Col xs={2} sm={2} md={2} lg={2}>
                                                <MultiSelect
                                                    options={annos}
                                                    value={annoVehiculo}
                                                    enabled="false"
                                                    onChange={handleChangeAnno}
                                                    enableSearch="true"
                                                    className="ml-3 dropdown-heading-anno-search size-anno-search"
                                                    labelledBy="Año"
                                                    //disabled="true"
                                                    overrideStrings={{
                                                        selectSomeItems: nombreAnnoVeh,
                                                        allItemsAreSelected:
                                                            "Todos los años",
                                                        search: "Buscar",
                                                        selectAll:
                                                            "Todos"
                                                    }}
                                                />

                                            </Col>
                                        </div>
                                    </Row>
                                </div>
                                <br />
                                <div className="barrainputbuscadorinteractivo">
                                    <Row>
                                        <Col xs={3} sm={3} md={3} lg={3}>
                                            <Dropdown
                                                onSelect={handleChangeModels}
                                                onMouseEnter={() => onEdit()}
                                                onMouseLeave={() => offEdit()}
                                            >
                                                <Dropdown.Toggle
                                                    onclick={CustomToggle}
                                                    disabled={disabledModelo}
                                                    className="alinearizquierda dropdownsearchinteractivemodels"
                                                    variant="outline-light"
                                                    id="dropdown-basic">
                                                    <Row>
                                                        <Col xs={1} sm={1} md={1} lg={1} >
                                                            <h3 className={alertarModelo}> * </h3>
                                                        </Col>
                                                        <Col xs={10} sm={10} md={10} lg={10}
                                                            className={alertaModelos}
                                                        >
                                                            {showEdit && LongitudModelo > 13 ? (
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-secondary
                                                                                       botontextocompletomoldeo
                                                                                       sinborder"
                                                                        data-toggle="tooltip"
                                                                        data-placement="top"
                                                                        title="Tooltip on top">
                                                                        {nombreModeloBase}
                                                                    </button>
                                                                    <div className="mtmenos24 cajatextocompletomoldeo">
                                                                        {nombreModeloVeh}
                                                                    </div>
                                                                </div>
                                                            ) : nombreModeloVeh
                                                            }
                                                        </Col>
                                                    </Row>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    as={CustomMenuModels}
                                                    variant="outline-light"
                                                    className="optionssearchinteractivemodelos"
                                                >
                                                    {modelos &&
                                                        modelos.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="optionssearchinteractivemodels"
                                                                        eventKey={
                                                                            item.id
                                                                        }
                                                                        onClick={() =>
                                                                            asignaNombreModelo(item.label)}
                                                                    >
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

                                        <Col xs={2} sm={2} md={2} lg={2} className="mlmenos20" >
                                            <Dropdown
                                                onSelect={handleChangeCilindraje}
                                            >
                                                <Dropdown.Toggle
                                                    onclick={CustomToggle}
                                                    disabled={disabledCilindraje}
                                                    className={classCilindraje}
                                                    variant="outline-light"
                                                    id="dropdown-basic">
                                                    {nombreCilindrajeVeh}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    as={CustomMenu}
                                                    variant="outline-light"
                                                    className="optionssearchinteractiveannos">
                                                    {cilindrajes &&
                                                        cilindrajes.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustom"
                                                                        eventKey={
                                                                            item.id
                                                                        }
                                                                        onClick={() =>
                                                                            setNombreCilindrajeVeh(item.cilindraje)}
                                                                    >
                                                                        {
                                                                            item.cilindraje
                                                                        }
                                                                    </Dropdown.Item>
                                                                );
                                                            }
                                                        )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                        <Col xs={2} sm={2} md={2} lg={2} className="ml-20">
                                            <div className={mostrarCombustible} >
                                                <Dropdown
                                                    onSelect={handleChangeCombustible}
                                                >
                                                    <Dropdown.Toggle
                                                        onclick={CustomToggle}
                                                        disabled={disabledCombustible}
                                                        className={classCombustible}
                                                        variant="outline-light"
                                                        id="dropdown-basic">
                                                        {nombreCombustibleVeh}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        as={CustomMenu}
                                                        variant="outline-light"
                                                        className="optionssearchinteractiveannos">
                                                        {combustible &&
                                                            combustible.map(
                                                                (item) => {
                                                                    return (
                                                                        <Dropdown.Item
                                                                            className="itemsdropdowncustom"
                                                                            eventKey={
                                                                                item.value
                                                                            }
                                                                            onClick={() =>
                                                                                setNombreCombustibleVeh(item.label)}
                                                                        >
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

                                        <Col xs={2} sm={2} md={2} lg={2} className="ml-25">
                                            <div className={mostrarTransmision} >
                                                <Dropdown
                                                    onSelect={handleChangeTransmision}
                                                >
                                                    <Dropdown.Toggle
                                                        onclick={CustomToggle}
                                                        disabled={disabledTransmision}
                                                        className={classTransmision}
                                                        variant="outline-light"
                                                        id="dropdown-basic">
                                                        {nombreTransmisionVeh}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        as={CustomMenu}
                                                        variant="outline-light"
                                                        className="optionssearchinteractiveannos">
                                                        {transmision &&
                                                            transmision.map(
                                                                (item) => {
                                                                    return (
                                                                        <Dropdown.Item
                                                                            className="itemsdropdowncustom"
                                                                            eventKey={
                                                                                item.value
                                                                            }
                                                                            onClick={() =>
                                                                                setNombreTransmisionVeh(item.label)}
                                                                        >
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
                                        <Col xs={2} sm={2} md={2} lg={2} className="mlmenos20">
                                            <div className={mostrarTraccion} >
                                                <Dropdown
                                                    onSelect={handleChangeTraccion}
                                                >
                                                    <Dropdown.Toggle
                                                        onclick={CustomToggle}
                                                        disabled={disabledTraccion}
                                                        className={classTraccion}
                                                        variant="outline-light"
                                                        id="dropdown-basic">
                                                        {nombreTraccionVeh}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        as={CustomMenu}
                                                        variant="outline-light"
                                                        className="optionssearchinteractiveannos">
                                                        {
                                                            carroceriaVehiculo != 16 &&
                                                                carroceriaVehiculo != 21 &&
                                                                carroceriaVehiculo != 17 &&
                                                                carroceriaVehiculo != 20 ?
                                                                traccion &&
                                                                traccion.map(
                                                                    (item) => {
                                                                        return (
                                                                            <Dropdown.Item
                                                                                className="itemsdropdowncustom"
                                                                                eventKey={
                                                                                    item.value
                                                                                }
                                                                                onClick={() =>
                                                                                    setNombreTraccionVeh(item.label)}
                                                                            >
                                                                                {
                                                                                    item.label
                                                                                }
                                                                            </Dropdown.Item>
                                                                        );
                                                                    }
                                                                )
                                                                :
                                                                tracciondos &&
                                                                tracciondos.map(
                                                                    (item) => {
                                                                        return (
                                                                            <Dropdown.Item
                                                                                className="itemsdropdowncustom"
                                                                                eventKey={
                                                                                    item.value
                                                                                }
                                                                                onClick={() =>
                                                                                    setNombreTraccionVeh(item.label)}
                                                                            >
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
                                    </Row>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="mt-20 ml-205">
                    <Row>
                        <Row className="ml-1">
                            <Col xs={9} sm={9} md={9} lg={9} >
                                <h3 className="textobuscadorintecractivo">
                                    ** Las imágenes a continuación son con fines ilustrativos, por ello pueden no
                                    corresponder exactamente con tu vehículo.
                                </h3>
                            </Col>
                            <Col xs={3} sm={3} md={3} lg={3} >
                                <div className="divbotonbuscarprd"
                                    onClick={leerDatosHistorial}
                                >
                                    Buscar producto
                                </div>
                            </Col>
                        </Row>
                        <Col xs={12} sm={12} md={8} lg={8} >
                            <a className="textobuscadorintecractivo">
                                ** Si no encuentras tu vehículo
                                buscas,{" "}
                                <a
                                    className="subrayartextoclicaqui"
                                    onClick={() =>
                                        encontrar()
                                    }>
                                    haz clic aquí
                                </a>
                            </a>
                        </Col>

                    </Row>
                </div>
                <HistoryVehSpecialSearch
                    marcarItem={marcarItem}
                    setMarcarItem={setMarcarItem}
                />
            </div>
        </Container>
    );
}

function defaultValueForm() {
    return {
        codigo: 0,
        codigolatint: 0,
    };
}

// Hook
function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler]
    );
}

export default SearchInteractive;