import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CloseIcon from "@material-ui/icons/Close";
import LoadingMotorEectrico from "../../../../components/elements/Loading/LoadingMotorEectrico";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getTypesVehicles } from "../../../../store/typesvehicles/action";
import TypesVehiclesRepository from "~/repositories/TypesVehiclesRepository";
import { getYearsVehicles } from "../../../../store/yearsvehicles/action";
import { getEditDataFind } from "../../../../store/editdatafind/action";
import YearsVehiclesRepository from "~/repositories/YearsVehiclesRepository";
import SelectedVehicle from "../../selectedvehicle";
import SearchInteractiveItems from "../../../search/searchinteractiveitems";
import SidebarShopInteractiveSearch from "~/components/shared/sidebar/SidebarShopInteractiveSearch";
import ModalMensajesBuscar from "../../../mensajes/ModalMensajesBuscar";
import ModalMensajesCerrar from "../../../mensajes/ModalMensajesCerrar";

//Importafotos traccion delantera
import imagenaireacondicionadomotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/12sistemaaireacondicionado/1.jpg";
import imagenfrenosmotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/3sistemafrenos/1.jpg";
import imagenmotorcajamotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/6sistemacaja/1.jpg";
import imagenrefrigeracioncajamotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/10sistemarefrigeracioncaja/1.jpg";
import imagensistemadearranquemotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/14sistemadearranque/1.jpg";
import imagensistemadeembraguemotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/7sistemaembrague/1.jpg";
import imagensistemadeinyeccionmotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/8sistemainyeccion/1.jpg";
import imagensistemadeescapemotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/11sistemaescape/1.jpg";
import imagendireccionmotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/4sistemadireccion/1.jpg";
import imagensistemaderefrigeracionmotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/9sistemarefrigeraciongeneral/1.jpg";
import imagensistemaelectricomotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/16sistemaelectricomotor/1.jpg";
import imagensuspensionmotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/5sistemasuspension/1.jpg";
import imagenmotormotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/1sistemamotor/1.jpg";
import imagenparabrisasmotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/15sistemalimpiabrisas/1.jpg";
import imagensistematrasmision from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/2sistematraccion/1.jpg";
import imagensistemaelectricogeneral from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/13sistemaelectricoaccesorios/1.jpg";
import imagen1 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/1.jpg";

//Importafotos - tren motriz trasero
import imagendosaireacondicionadomotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/12sistemaaireacondicionado/1.jpg";
import imagendosfrenosmotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/3sistemafrenos/1.jpg";
import imagendosmotorcajamotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/6sistemacaja/1.jpg";
import imagendosrefrigeracioncajamotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/10sistemarefrigeracioncaja/1.jpg";
import imagendossistemadearranquemotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/14sistemadearranque/1.jpg";
import imagendossistemadeembraguemotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/7sistemaembrague/1.jpg";
import imagendossistemadeinyeccionmotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/8sistemainyeccion/1.jpg";
import imagendossistemadeescapemotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/11sistemaescape/1.jpg";
import imagendosdireccionmotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/4sistemadireccion/1.jpg";
import imagendossistemaderefrigeracionmotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/9sistemarefrigeraciongeneral/1.jpg";
import imagendossistemaelectricomotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/16sistemaelectricomotor/1.jpg";
import imagendossuspensionmotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/5sistemasuspension/1.jpg";
import imagendosmotormotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/1sistemamotor/1.jpg";
import imagendosparabrisasmotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/15sistemalimpiabrisas/1.jpg";
import imagendossistematrasmision from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/2sistematraccion/1.jpg";
import imagendossistemaelectricogeneral from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/13sistemaelectricoaccesorios/1.jpg";
import imagen2 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/1.jpg";

//Importafotos - tren motriz 4 x 4
import imagentresaireacondicionadomotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/12sistemaaireacondicionado/1.jpg";
import imagentresfrenosmotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/3sistemafrenos/1.jpg";
import imagentresmotorcajamotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/6sistemacaja/1.jpg";
import imagentresrefrigeracioncajamotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/10sistemarefrigeracioncaja/1.jpg";
import imagentressistemadearranquemotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/14sistemadearranque/1.jpg";
import imagentressistemadeembraguemotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/7sistemaembrague/1.jpg";
import imagentressistemadeinyeccionmotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/8sistemainyeccion/1.jpg";
import imagentressistemadeescapemotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/11sistemaescape/1.jpg";
import imagentresdireccionmotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/4sistemadireccion/1.jpg";
import imagentressistemaderefrigeracionmotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/9sistemarefrigeraciongeneral/1.jpg";
import imagentressistemaelectricomotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/16sistemaelectricomotor/1.jpg";
import imagentressuspensionmotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/5sistemasuspension/1.jpg";
import imagentresmotormotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/1sistemamotor/1.jpg";
import imagentresparabrisasmotorelectrico from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/15sistemalimpiabrisas/1.jpg";
import imagentressistematrasmision from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/2sistematraccion/1.jpg";
import imagentressistemaelectricogeneral from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/13sistemaelectricoaccesorios/1.jpg";
import imagen3 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/1.jpg";

//Importacion Iconos Motor / ELéctrico - Inicial
import aireacondicionado from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/aireacondicionado.png";
import direccion from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/direccion.png";
import frenos from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/frenos.png";
import cajamotor from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/caja.png";
import sistemadeenfriamientomotor from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/refrigeracioncaja.png";
import sistemaarranque from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/arranque.png";
import sistemaembrague from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/embrague.png";
import sistemadeescape from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/escape.png";
import sistemadeinyeccion from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/inyeccion.png";
import refrijeracionvehiculo from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/refrigeracion.png";
import sistemaelectricomotor from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/sistemaelectricomotor.png";
import sistemaelectricovehiculo from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/sistemaelectrico.png";
import sistemasuspension from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/suspension.png";
import sistematransmision from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/transmision.png";
import sistemaparabrisas from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/parabrisas.png";
import sistemamotor from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/motor.png";

//Importacion Iconos Motor / ELéctrico - Seleccionado
import aireacondicionado2 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/aireacondicionado.png";
import direccion2 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/direccion.png";
import frenos2 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/frenos.png";
import cajamotor2 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/caja.png";
import sistemadeenfriamientomotor2 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/refrigeracioncaja.png";
import sistemaarranque2 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/arranque.png";
import sistemaembrague2 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/embrague.png";
import sistemadeescape2 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/escape.png";
import sistemadeinyeccion2 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/inyeccion.png";
import refrijeracionvehiculo2 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/refrigeracion.png";
import sistemaelectricomotor2 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/sistemaelectricomotor.png";
import sistemaelectricovehiculo2 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/sistemaelectrico.png";
import sistemasuspension2 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/suspension.png";
import sistematransmision2 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/transmision.png";
import sistemaparabrisas2 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/parabrisas.png";
import sistemamotor2 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/motor.png";

//Importacion Iconos Motor / ELéctrico - Descarte
import aireacondicionado3 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/aireacondicionado.png";
import direccion3 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/direccion.png";
import frenos3 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/frenos.png";
import cajamotor3 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/caja.png";
import sistemadeenfriamientomotor3 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/refrigeracioncaja.png";
import sistemaarranque3 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/arranque.png";
import sistemaembrague3 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/embrague.png";
import sistemadeescape3 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/escape.png";
import sistemadeinyeccion3 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/inyeccion.png";
import refrijeracionvehiculo3 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/refrigeracion.png";
import sistemaelectricomotor3 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/sistemaelectricomotor.png";
import sistemaelectricovehiculo3 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/sistemaelectrico.png";
import sistemasuspension3 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/suspension.png";
import sistematransmision3 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/transmision.png";
import sistemaparabrisas3 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/parabrisas.png";
import sistemamotor3 from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/motor.png";

//Importar Carrusel
import EstacaSencillaMotorElectrico from "../../../CarruselVehiculos/CarruselEstacaSencilla/EstacaSencillaMotorElectrico";

import logo from "~/public/imgcarrusel/sedan/nombrelogomr.png";

import { set } from "lodash";

const SearchInteractiveMotorElectrico = (props) => {
    const router = useRouter();
    const [productoBuscar, setProductoBuscar] = useState("BMW");

    //const videoSCR = Car;
    const [tipos, setTipos] = useState(false);
    const dispatch = useDispatch();

    //Definie variables para zoom de tipos de vehículos y busqueda de productos
    const [zoomTipoVehiculo, setZoomTipoVehiculo] = useState("col-md-6");
    const [zoomBusquedaProductos, setZoomBusquedaProductos] =
        useState("col-md-6");
    const [zoomBusquedaItems, setZoomBusquedaItems] = useState("");
    const [optionSelect, setOptionSelect] = useState(0);
    const [maximizarOption, setMaximizarOption] = useState(0);

    // Definicion Latoneria
    const [showModalLatoneria, setShowModalLatoneria] = useState(false);
    const [showModalComenLaton, setShowModalComenLaton] = useState(false);
    const [ubicarPrdLaton, setUbicarPrdLaton] = useState(false);
    const [ubicarProdHab, setUbicarProdHab] = useState(false);
    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);

    // Definicion Habitácuolo
    const [showModalHabitaculo, setShowModalhabitaculo] = useState(false);
    const [showModalComenHab, setShowModalComenHab] = useState(false);

    // Definición Motor Eléctrico
    const [showModalMtrElect, setShowModalMtrElect] = useState(false);
    const [showModalComenMtr, setShowModalComenMtr] = useState(false);

    const [showImagenMtrElect, setShowImagenMtrElect] = useState(true);
    const [showAirecondicionado, setShowAirecondicionado] = useState(false);
    const [showDireccion, setShowDireccion] = useState(false);
    const [showFrenos, setShowFrenos] = useState(false);
    const [showCaja, setShowCaja] = useState(false);
    const [showRefrigeracioncaja, setShowRefrigeracioncaja] = useState(false);
    const [showSistdearranque, setShowSistdearranque] = useState(false);
    const [showSistparabrisas, setShowSistparabrisas] = useState(false);
    const [showSistmotor, setShowSistmotor] = useState(false);
    const [showSistdeEmbrague, setShowSistdeEmbrague] = useState(false);
    const [showSistdeEscape, setShowSistdeEscape] = useState(false);
    const [showSistdeInyeccion, setShowSistdeInyeccion] = useState(false);
    const [showSistdeRefrigeracion, setShowSistdeRefrigeracion] =
        useState(false);
    const [showSistdeElectrico, setShowSistdeElectrico] = useState(false);
    const [showSistdeElectricoMotor, setShowSistdeElectricoMotor] =
        useState(false);
    const [showSuspension, setShowSuspension] = useState(false);
    const [showSistTrasmision, setShowSistTrasmision] = useState(false);

    const [onClickImagenMtrElect, setOnClickImagenMtrElect] = useState(false);
    const [onClickAirecondicionado, setOnClickAirecondicionado] =
        useState(false);
    const [onClickDireccion, setOnClickDireccion] = useState(false);
    const [onClickFrenos, setOnClickFrenos] = useState(false);
    const [onClickCaja, setOnClickCaja] = useState(false);
    const [onClickRefrigeracionCaja, setOnClickRefrigeracionCaja] =
        useState(false);
    const [onClickSistdeArranque, setOnClickSistdeArranque] = useState(false);
    const [onClickSistdeParabrisas, setOnClickSistdeParabrisas] =
        useState(false);
    const [onClickMotor, setOnClickMotor] = useState(false);
    const [onClickEmbrague, setOnClickEmbrague] = useState(false);
    const [onClickEscape, setOnClickEscape] = useState(false);
    const [onClickInyeccion, setOnClickInyeccion] = useState(false);
    const [onClickRefrigeracion, setOnClickRefrigeracion] = useState(false);
    const [onClickElectrico, setOnClickElectrico] = useState(false);
    const [onClickElectricoMotor, setOnClickElectricoMotor] = useState(false);
    const [onClickSuspension, setOnClickSuspension] = useState(false);
    const [onClickTransmision, setOnClickSistdeElectrico] = useState(false);

    //Asigna Icono Seleccionado
    const [showaireacondicionado, setAireacondicionado] =
        useState(aireacondicionado);
    const [showarranque, setArranque] = useState(sistemaarranque);
    const [showcaja, setCaja] = useState(cajamotor);
    const [showdireccion, setDireccion] = useState(direccion);
    const [showembrague, setEmbrague] = useState(sistemaembrague);
    const [showescape, setEscape] = useState(sistemadeescape);
    const [showfrenos, setFrenos] = useState(frenos);
    const [showinyeccion, setInyeccion] = useState(sistemadeinyeccion);
    const [showMotor, setMotor] = useState(sistemamotor);
    const [showparabrisas, setParabrisas] = useState(sistemaparabrisas);
    const [showrefrigeracion, setRefrigeracion] = useState(
        refrijeracionvehiculo
    );
    const [showrefrigeracioncaja, setRefrigeracioncaja] = useState(
        sistemadeenfriamientomotor
    );
    const [showsistemaelectrico, setSistelectrico] = useState(
        sistemaelectricovehiculo
    );
    const [showsistemaelectricomotor, setSistelectricomotor] = useState(
        sistemaelectricomotor
    );
    const [showsuspension, setSuspension] = useState(sistemasuspension);
    const [showtransmision, setTransmision] = useState(sistematransmision);
    const [partesTrenMotrizSeleccionada, setpartesTrenMotrizSeleccionada] =
        useState([]);
    const [iconoSeleccionadoUno, setIconoSeleccionadoUno] = useState("");
    const [iconoSeleccionadoDos, setIconoSeleccionadoDos] = useState("");
    const [iconoSeleccionadoTres, setIconoSeleccionadoTres] = useState("");
    const [iconoSeleccionadoCuatro, setIconoSeleccionadoCuatro] = useState("");
    const [borrar, setBorrar] = useState(false);

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

    // Asignamos Datos seleccionado en el buscador interactivo
    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );

    const [controlFijar, setControlFijar] = useState("mt-50");
    const [closeWindow, setCloseWindow] = useState(false);

    const [motormotorelectrico, setMotormotorelectrico] = useState([]);
    const [
        aireacondicionadomotorelectrico,
        setAireacondicionadomotorelectrico,
    ] = useState([]);
    const [direccionmotorelectrico, setDireccionmotorelectrico] = useState([]);
    const [frenosmotorelectrico, setFrenosmotorelectrico] = useState([]);
    const [motorcajamotorelectrico, setMotorcajamotorelectrico] = useState([]);
    const [
        refrigeracioncajamotorelectrico,
        setRefrigeracioncajamotorelectrico,
    ] = useState([]);
    const [
        sistemadearranquemotorelectrico,
        setSistemadearranquemotorelectrico,
    ] = useState([]);
    const [
        sistemadeembraguemotorelectrico,
        setSistemadeembraguemotorelectrico,
    ] = useState([]);
    const [sistemadeescapemotorelectrico, setSistemadeescapemotorelectrico] =
        useState([]);
    const [
        sistemadeinyeccionmotorelectrico,
        setSistemadeinyeccionmotorelectrico,
    ] = useState([]);
    const [
        sistemaderefrigeracionmotorelectrico,
        setSistemaderefrigeracionmotorelectrico,
    ] = useState([]);
    const [sistemaelectricogeneral, setSistemaelectricogeneral] = useState([]);
    const [sistemaelectricomotorelectrico, setSistemaelectricomotorelectrico] =
        useState([]);
    const [suspensionmotorelectrico, setSuspensionmotorelectrico] = useState(
        []
    );
    const [parabrisasmotorelectrico, setParabrisasmotorelectrico] = useState(
        []
    );
    const [sistematrasmision, setSistematrasmision] = useState([]);
    const [imagenBase, setImagenBase] = useState(imagen1);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [showModalMensajesCerrar, setShowModalMensajesCerrar] =
        useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [editarBuscador, setEditarBuscador] = useState(
        "col-md-1 posicionuno"
    );
    const [editarDatos, setEditarDatos] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [datosFaltantes, setDatosFaltantes] = useState(false);

    const [habilitaCajaMotor, setHabilitaCajaMotor] = useState(false);
    const [habilitaEnframientoMotor, setHabilitaEnframientoMotor] =
        useState(false);
    const [habilitaEmbrague, setHabilitaEmbrague] = useState(false);
    const [habilitaMotor, setHabilitaMotor] = useState(false);
    const [habilitaInyeccion, setHabilitaInyeccion] = useState(false);
    const [habilitaRefrijeracion, setHabilitaRefrijeracion] = useState(false);
    const [habilitaTrasmision, setHabilitaTrasmision] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(false);
        }, 300);
        return () => clearInterval(interval);
    }, [isLoading]);

    const mostrarComentariolatoneria = () => {
        setShowModalComenLaton(true);
    };

    const mostrarComentariohabitaculo = () => {
        setShowModalComenHab(true);
    };

    const mostrarComentariomotor = () => {
        setShowModalComenMtr(true);
    };

    useEffect(() => {
        let tipotraccion = datosbuscadorinteractivo.nombretraccion;

        if (
            tipotraccion == "Tracción" ||
            tipotraccion == "Tracción Delantera"
        ) {
            setMotormotorelectrico(imagenmotormotorelectrico);
            setAireacondicionadomotorelectrico(
                imagenaireacondicionadomotorelectrico
            );
            setDireccionmotorelectrico(imagendireccionmotorelectrico);
            setFrenosmotorelectrico(imagenfrenosmotorelectrico);
            setMotorcajamotorelectrico(imagenmotorcajamotorelectrico);
            setRefrigeracioncajamotorelectrico(
                imagenrefrigeracioncajamotorelectrico
            );
            setSistemadearranquemotorelectrico(
                imagensistemadearranquemotorelectrico
            );
            setSistemadeembraguemotorelectrico(
                imagensistemadeembraguemotorelectrico
            );
            setSistemadeescapemotorelectrico(
                imagensistemadeescapemotorelectrico
            );
            setSistemadeinyeccionmotorelectrico(
                imagensistemadeinyeccionmotorelectrico
            );
            setSistemaderefrigeracionmotorelectrico(
                imagensistemaderefrigeracionmotorelectrico
            );
            setSistemaelectricogeneral(imagensistemaelectricogeneral);
            setSistemaelectricomotorelectrico(
                imagensistemaelectricomotorelectrico
            );
            setSuspensionmotorelectrico(imagensuspensionmotorelectrico);
            setParabrisasmotorelectrico(imagenparabrisasmotorelectrico);
            setSistematrasmision(imagensistematrasmision);
            setImagenBase(imagen1);
        } else if (tipotraccion == "Tracción Trasera") {
            setMotormotorelectrico(imagendosmotormotorelectrico);
            setAireacondicionadomotorelectrico(
                imagendosaireacondicionadomotorelectrico
            );
            setDireccionmotorelectrico(imagendosdireccionmotorelectrico);
            setFrenosmotorelectrico(imagendosfrenosmotorelectrico);
            setMotorcajamotorelectrico(imagendosmotorcajamotorelectrico);
            setRefrigeracioncajamotorelectrico(
                imagendosrefrigeracioncajamotorelectrico
            );
            setSistemadearranquemotorelectrico(
                imagendossistemadearranquemotorelectrico
            );
            setSistemadeembraguemotorelectrico(
                imagendossistemadeembraguemotorelectrico
            );
            setSistemadeescapemotorelectrico(
                imagendossistemadeescapemotorelectrico
            );
            setSistemadeinyeccionmotorelectrico(
                imagendossistemadeinyeccionmotorelectrico
            );
            setSistemaderefrigeracionmotorelectrico(
                imagendossistemaderefrigeracionmotorelectrico
            );
            setSistemaelectricogeneral(imagendossistemaelectricogeneral);
            setSistemaelectricomotorelectrico(
                imagendossistemaelectricomotorelectrico
            );
            setSuspensionmotorelectrico(imagendossuspensionmotorelectrico);
            setParabrisasmotorelectrico(imagendosparabrisasmotorelectrico);
            setSistematrasmision(imagendossistematrasmision);
            setImagenBase(imagen2);
        } else if (tipotraccion == "Tracción 4x4") {
            setMotormotorelectrico(imagentresmotormotorelectrico);
            setAireacondicionadomotorelectrico(
                imagentresaireacondicionadomotorelectrico
            );
            setDireccionmotorelectrico(imagentresdireccionmotorelectrico);
            setFrenosmotorelectrico(imagentresfrenosmotorelectrico);
            setMotorcajamotorelectrico(imagentresmotorcajamotorelectrico);
            setRefrigeracioncajamotorelectrico(
                imagentresrefrigeracioncajamotorelectrico
            );
            setSistemadearranquemotorelectrico(
                imagentressistemadearranquemotorelectrico
            );
            setSistemadeembraguemotorelectrico(
                imagentressistemadeembraguemotorelectrico
            );
            setSistemadeescapemotorelectrico(
                imagentressistemadeescapemotorelectrico
            );
            setSistemadeinyeccionmotorelectrico(
                imagentressistemadeinyeccionmotorelectrico
            );
            setSistemaderefrigeracionmotorelectrico(
                imagentressistemaderefrigeracionmotorelectrico
            );
            setSistemaelectricogeneral(imagentressistemaelectricogeneral);
            setSistemaelectricomotorelectrico(
                imagentressistemaelectricomotorelectrico
            );
            setSuspensionmotorelectrico(imagentressuspensionmotorelectrico);
            setParabrisasmotorelectrico(imagentresparabrisasmotorelectrico);
            setSistematrasmision(imagentressistematrasmision);
            setImagenBase(imagen3);
        } else {
        }
    }, [datosbuscadorinteractivo.nombretraccion]);

    let editardatosbuscador = useSelector(
        (state) => state.editdatafind.editdatafind
    );

    useEffect(() => {
        //Lee datos editar variables sistema tren motriz
        if (datosFaltantes) {
            if (habilitaCajaMotor) {
                prdCajaMotorEstacaSencilla();
            }
            if (habilitaEnframientoMotor) {
                prdEnframientoMotorEstacaSencilla();
            }
            if (habilitaEmbrague) {
                prdEmbragueEstacaSencilla();
            }
            if (habilitaMotor) {
                prdMotorEstacaSencilla();
            }
            if (habilitaInyeccion) {
                prdInyeccionEstacaSencilla();
            }
            if (habilitaRefrijeracion) {
                prdRefrijeracionEstacaSencilla();
            }
            if (habilitaTrasmision) {
                prdTrasmisionEstacaSencilla();
            }

            setHabilitaCajaMotor(false);
            setHabilitaEnframientoMotor(false);
            setHabilitaEmbrague(false);
            setHabilitaMotor(false);
            setHabilitaInyeccion(false);
            setHabilitaRefrijeracion(false);
            setHabilitaTrasmision(false);

            let editar = {
                editarCombustible: false,
                editarTraccion: false,
                editarTransmision: false,
                editarCilindraje: false,
            };
            //setShowModalMensajes(false);
            dispatch(getEditDataFind(editar));
        }
    }, [datosFaltantes]);

    useEffect(() => {
        //Lee datos editar variables sistema tren motriz
        if (!showModalMensajes) {
            setHabilitaCajaMotor(false);
            setHabilitaEnframientoMotor(false);
            setHabilitaEmbrague(false);
            setHabilitaMotor(false);
            setHabilitaInyeccion(false);
            setHabilitaRefrijeracion(false);
            setHabilitaTrasmision(false);
        }
    }, [showModalMensajes]);

    const seleccionaUbicarPrdLaton = () => {
        setShowModalLatoneria(true);
        setUbicarPrdLaton(true);
        setUbicarProdHab(false);
        setUbicarProductoMotor(false);
        router.push(
            "/searchinteractive/camionetas/estacacabinasencilla/searchestacasencillalatoneria"
        );
    };

    const seleccionaUbicarProdHab = () => {
        setShowModalhabitaculo(true);
        setUbicarProdHab(true);
        setUbicarPrdLaton(false);
        setUbicarProductoMotor(false);
        router.push(
            "/searchinteractive/camionetas/estacacabinasencilla/searchestacasencillahabitaculo"
        );
    };

    const seleccionaUbicarProductoMtrElect = () => {
        setShowModalMtrElect(true);
        setUbicarProdHab(false);
        setUbicarPrdLaton(false);
        setUbicarProductoMotor(true);
    };

    // Lee de la base de datos los años de los Vehiculos
    useEffect(() => {
        async function yearsvehicles(dat) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            const YearsVehicles =
                await YearsVehiclesRepository.getYearsVehicles(0);
            //console.log("YEARS VEHICLES : ", YearsVehicles);
            setAnnos(YearsVehicles);

            // Coloca los datos en state arreglo de años de los vehiculos
            dispatch(getYearsVehicles(YearsVehicles));
        }
        yearsvehicles(0);
    }, [tipos]);

    // Lee de la base de datos los tipos de Vehiculos
    useEffect(() => {
        async function typesvehicles(dat) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            const TypesVehicles =
                await TypesVehiclesRepository.getTypesVehicles(0);
            //console.log("TYPES VEHICLES : ", TypesVehicles[0].header_supplies);
            setVehiculos(TypesVehicles[0].header_supplies);

            // Coloca los datos en state arreglo de categorias
            dispatch(getTypesVehicles(TypesVehicles));
        }
        typesvehicles(0);
    }, [tipos]);

    const mostrarAireAcondicionadoEstacaSencilla = () => {
        if (!onClickImagenMtrElect) {
            setShowImagenMtrElect(false);
            setShowAirecondicionado(true);
            setOnClickImagenMtrElect(false);
        }
    };

    const cerrarAireAcondicionadoEstacaSencilla = () => {
        setShowAirecondicionado(false);
        setShowImagenMtrElect(true);
    };

    const mostrarDireccionEstacaSencilla = () => {
        if (!onClickImagenMtrElect) {
            setShowImagenMtrElect(false);
            setShowDireccion(true);
            setOnClickImagenMtrElect(false);
        }
    };

    const cerrarDireccionEstacaSencilla = () => {
        setShowDireccion(false);
        setShowImagenMtrElect(true);
    };

    const mostrarFrenosEstacaSencilla = () => {
        if (!onClickImagenMtrElect) {
            setShowImagenMtrElect(false);
            setShowFrenos(true);
            setOnClickImagenMtrElect(false);
        }
    };

    const cerrarFrenosEstacaSencilla = () => {
        setShowFrenos(false);
        setShowImagenMtrElect(true);
    };

    const mostrarMotorcajaEstacaSencilla = () => {
        if (!onClickImagenMtrElect) {
            setShowImagenMtrElect(false);
            setShowCaja(true);
            setOnClickImagenMtrElect(false);
        }
    };

    const cerrarMotorcajaEstacaSencilla = () => {
        setShowCaja(false);
        setShowImagenMtrElect(true);
    };

    const mostrarRefrigeracioncajaEstacaSencilla = () => {
        if (!onClickImagenMtrElect) {
            setShowImagenMtrElect(false);
            setShowRefrigeracioncaja(true);
            setOnClickImagenMtrElect(false);
        }
    };

    const cerrarRefrigeracioncajaEstacaSencilla = () => {
        setShowRefrigeracioncaja(false);
        setShowImagenMtrElect(true);
    };

    const mostrarSistdearranqueEstacaSencilla = () => {
        if (!onClickImagenMtrElect) {
            setShowImagenMtrElect(false);
            setShowSistdearranque(true);
            setOnClickImagenMtrElect(false);
        }
    };

    const cerrarSistdearranqueEstacaSencilla = () => {
        setShowImagenMtrElect(true);
        setShowSistdearranque(false);
    };

    const mostrarSistparabrisasEstacaSencilla = () => {
        if (!onClickImagenMtrElect) {
            setShowImagenMtrElect(false);
            setShowSistparabrisas(true);
            setOnClickImagenMtrElect(false);
        }
    };

    const cerrarSistparabrisasEstacaSencilla = () => {
        setShowImagenMtrElect(true);
        setShowSistparabrisas(false);
    };

    const mostrarSistmotorEstacaSencilla = () => {
        if (!onClickImagenMtrElect) {
            setShowSistmotor(true);
            setShowImagenMtrElect(false);
            setOnClickImagenMtrElect(false);
        }
    };

    const cerrarSistmotorEstacaSencilla = () => {
        setShowSistmotor(false);
        setShowImagenMtrElect(true);
    };

    const mostrarSistdeEmbragueEstacaSencilla = () => {
        if (!onClickImagenMtrElect) {
            setShowImagenMtrElect(false);
            setShowSistdeEmbrague(true);
            setOnClickImagenMtrElect(false);
        }
    };

    const cerrarSistdeEmbragueEstacaSencilla = () => {
        setShowSistdeEmbrague(false);
        setShowImagenMtrElect(true);
    };

    const mostrarSistdeEscapeEstacaSencilla = () => {
        if (!onClickImagenMtrElect) {
            setShowImagenMtrElect(false);
            setShowSistdeEscape(true);
            setOnClickImagenMtrElect(false);
        }
    };

    const cerrarSistdeEscapeEstacaSencilla = () => {
        setShowSistdeEscape(false);
        setShowImagenMtrElect(true);
    };

    const mostrarSistdeInyeccionEstacaSencilla = () => {
        if (!onClickImagenMtrElect) {
            setShowImagenMtrElect(false);
            setShowSistdeInyeccion(true);
            setOnClickImagenMtrElect(false);
        }
    };

    const cerrarSistdeInyeccionEstacaSencilla = () => {
        setShowSistdeInyeccion(false);
        setShowImagenMtrElect(true);
    };

    const mostrarSistdeRefrigeracionEstacaSencilla = () => {
        if (!onClickImagenMtrElect) {
            setShowImagenMtrElect(false);
            setShowSistdeRefrigeracion(true);
            setOnClickImagenMtrElect(false);
        }
    };

    const cerrarSistdeRefrigeracionEstacaSencilla = () => {
        setShowSistdeRefrigeracion(false);
        setShowImagenMtrElect(true);
    };

    const mostrarSistdeElectricoEstacaSencilla = () => {
        if (!onClickImagenMtrElect) {
            setShowImagenMtrElect(false);
            setShowSistdeElectrico(true);
            setOnClickImagenMtrElect(false);
        }
    };

    const cerrarSistdeElectricoEstacaSencilla = () => {
        setShowSistdeElectrico(false);
        setShowImagenMtrElect(true);
    };

    const mostrarSistdeElectricoMotorEstacaSencilla = () => {
        if (!onClickImagenMtrElect) {
            setShowImagenMtrElect(false);
            setShowSistdeElectricoMotor(true);
            setOnClickImagenMtrElect(false);
        }
    };

    const cerrarSistdeElectricoMotorEstacaSencilla = () => {
        setShowSistdeElectricoMotor(false);
        setShowImagenMtrElect(true);
    };

    const mostrarSuspensionEstacaSencilla = () => {
        if (!onClickImagenMtrElect) {
            setShowImagenMtrElect(false);
            setShowSuspension(true);
            setOnClickImagenMtrElect(false);
        }
    };

    const cerrarSuspensionEstacaSencilla = () => {
        setShowSuspension(false);
        setShowImagenMtrElect(true);
    };

    const mostrarSistTrasmisionEstacaSencilla = () => {
        if (!onClickImagenMtrElect) {
            setShowImagenMtrElect(false);
            setShowSistTrasmision(true);
            setOnClickImagenMtrElect(false);
        }
    };

    const cerrarSistTrasmisionEstacaSencilla = () => {
        setShowSistTrasmision(false);
        setShowImagenMtrElect(true);
    };

    const prdAireacondicionadoEstacaSencilla = () => {
        setDatosFaltantes(false);
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Tren motriz - aire acondicionado")
        );
        setOnClickImagenMtrElect(true);

        let dato = [];
        let item;
        item = {
            sistemauno: 1,
            imagen: aireacondicionado2,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemauno != item.sistemauno) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(aireacondicionado2);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != aireacondicionado2 &&
            iconoSeleccionadoUno != aireacondicionado2
        ) {
            setIconoSeleccionadoUno(aireacondicionado2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != aireacondicionado2 &&
            iconoSeleccionadoUno != aireacondicionado2 &&
            iconoSeleccionadoTres != aireacondicionado2
        ) {
            setIconoSeleccionadoUno(aireacondicionado2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != aireacondicionado2 &&
            iconoSeleccionadoUno != aireacondicionado2 &&
            iconoSeleccionadoTres != aireacondicionado2
        ) {
            setIconoSeleccionadoUno(aireacondicionado2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != aireacondicionado2 &&
            iconoSeleccionadoUno != aireacondicionado2 &&
            iconoSeleccionadoTres != aireacondicionado2 &&
            iconoSeleccionadoCuatro != aireacondicionado2
        ) {
            setIconoSeleccionadoUno(aireacondicionado2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setOnClickAirecondicionado(true);
        setOnClickDireccion(false);
        setOnClickFrenos(false);
        setOnClickCaja(false);
        setOnClickRefrigeracionCaja(false);
        setOnClickSistdeArranque(false);
        setOnClickSistdeParabrisas(false);
        setOnClickMotor(false);
        setOnClickEmbrague(false);
        setOnClickEscape(false);
        setOnClickInyeccion(false);
        setOnClickRefrigeracion(false);
        setOnClickElectrico(false);
        setOnClickElectricoMotor(false);
        setOnClickSuspension(false);
        setOnClickSistdeElectrico(false);

        // Asigna Color Icono Seleccionado y Marca los  No seleccionados por el usuario
        setAireacondicionado(aireacondicionado2);
        setDireccion(direccion3);
        setFrenos(frenos3);
        setCaja(cajamotor3);
        setRefrigeracioncaja(sistemadeenfriamientomotor3);
        setArranque(sistemaarranque3);
        setParabrisas(sistemaparabrisas3);
        setMotor(sistemamotor3);
        setEmbrague(sistemaembrague3);
        setEscape(sistemadeescape3);
        setInyeccion(sistemadeinyeccion3);
        setRefrigeracion(refrijeracionvehiculo3);
        setSistelectrico(sistemaelectricovehiculo3);
        setSistelectricomotor(sistemaelectricomotor3);
        setSuspension(sistemasuspension3);
        setTransmision(sistematransmision3);
    };

    const prdDireccionEstacaSencilla = () => {
        setDatosFaltantes(false);
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Tren motriz - dirección")
        );
        setOnClickImagenMtrElect(true);

        let dato = [];
        let item = {
            sistemados: 2,
            imagen: direccion2,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemados != item.sistemados) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(direccion2);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != direccion2 &&
            iconoSeleccionadoUno != direccion2
        ) {
            setIconoSeleccionadoUno(direccion2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != direccion2 &&
            iconoSeleccionadoUno != direccion2 &&
            iconoSeleccionadoTres != direccion2
        ) {
            setIconoSeleccionadoUno(direccion2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != direccion2 &&
            iconoSeleccionadoUno != direccion2 &&
            iconoSeleccionadoTres != direccion2
        ) {
            setIconoSeleccionadoUno(direccion2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != direccion2 &&
            iconoSeleccionadoUno != direccion2 &&
            iconoSeleccionadoTres != direccion2 &&
            iconoSeleccionadoCuatro != direccion2
        ) {
            setIconoSeleccionadoUno(direccion2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }
        setpartesTrenMotrizSeleccionada(dato);

        setOnClickAirecondicionado(false);
        setOnClickDireccion(true);
        setOnClickFrenos(false);
        setOnClickCaja(false);
        setOnClickRefrigeracionCaja(false);
        setOnClickSistdeArranque(false);
        setOnClickSistdeParabrisas(false);
        setOnClickMotor(false);
        setOnClickEmbrague(false);
        setOnClickEscape(false);
        setOnClickInyeccion(false);
        setOnClickRefrigeracion(false);
        setOnClickElectrico(false);
        setOnClickElectricoMotor(false);
        setOnClickSuspension(false);
        setOnClickSistdeElectrico(false);

        // Asigna Color Icono Seleccionado y Marca los  No seleccionados por el usuario
        setAireacondicionado(aireacondicionado3);
        setDireccion(direccion2);
        setFrenos(frenos3);
        setCaja(cajamotor3);
        setRefrigeracioncaja(sistemadeenfriamientomotor3);
        setArranque(sistemaarranque3);
        setParabrisas(sistemaparabrisas3);
        setMotor(sistemamotor3);
        setEmbrague(sistemaembrague3);
        setEscape(sistemadeescape3);
        setInyeccion(sistemadeinyeccion3);
        setRefrigeracion(refrijeracionvehiculo3);
        setSistelectrico(sistemaelectricovehiculo3);
        setSistelectricomotor(sistemaelectricomotor3);
        setSuspension(sistemasuspension3);
        setTransmision(sistematransmision3);
    };

    const prdFrenosEstacaSencilla = () => {
        setDatosFaltantes(false);
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Tren motriz - frenos")
        );
        setOnClickImagenMtrElect(true);

        let dato = [];
        let item = {
            sistematres: 3,
            imagen: frenos2,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistematres != item.sistematres) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(frenos2);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != frenos2 &&
            iconoSeleccionadoUno != frenos2
        ) {
            setIconoSeleccionadoUno(frenos2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != frenos2 &&
            iconoSeleccionadoUno != frenos2 &&
            iconoSeleccionadoTres != frenos2
        ) {
            setIconoSeleccionadoUno(frenos2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != frenos2 &&
            iconoSeleccionadoUno != frenos2 &&
            iconoSeleccionadoTres != frenos2
        ) {
            setIconoSeleccionadoUno(frenos2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != frenos2 &&
            iconoSeleccionadoUno != frenos2 &&
            iconoSeleccionadoTres != frenos2 &&
            iconoSeleccionadoCuatro != frenos2
        ) {
            setIconoSeleccionadoUno(frenos2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setOnClickAirecondicionado(false);
        setOnClickDireccion(false);
        setOnClickFrenos(true);
        setOnClickCaja(false);
        setOnClickRefrigeracionCaja(false);
        setOnClickSistdeArranque(false);
        setOnClickSistdeParabrisas(false);
        setOnClickMotor(false);
        setOnClickEmbrague(false);
        setOnClickEscape(false);
        setOnClickInyeccion(false);
        setOnClickRefrigeracion(false);
        setOnClickElectrico(false);
        setOnClickElectricoMotor(false);
        setOnClickSuspension(false);
        setOnClickSistdeElectrico(false);

        // Asigna Color Icono Seleccionado y Marca los  No seleccionados por el usuario
        setAireacondicionado(aireacondicionado3);
        setDireccion(direccion3);
        setFrenos(frenos2);
        setCaja(cajamotor3);
        setRefrigeracioncaja(sistemadeenfriamientomotor3);
        setArranque(sistemaarranque3);
        setParabrisas(sistemaparabrisas3);
        setMotor(sistemamotor3);
        setEmbrague(sistemaembrague3);
        setEscape(sistemadeescape3);
        setInyeccion(sistemadeinyeccion3);
        setRefrigeracion(refrijeracionvehiculo3);
        setSistelectrico(sistemaelectricovehiculo3);
        setSistelectricomotor(sistemaelectricomotor3);
        setSuspension(sistemasuspension3);
        setTransmision(sistematransmision3);
    };

    const prdCajaMotorEstacaSencilla = () => {
        setDatosFaltantes(false);
        let tipotraccion = datosbuscadorinteractivo.nombretraccion;
        let tipotransmision = datosbuscadorinteractivo.nombretransmision;

        if (tipotraccion == "Tracción" && tipotransmision == "Transmisión") {
            setHabilitaCajaMotor(true);
            let editar = {
                editarCombustible: false,
                editarTraccion: true,
                editarTransmision: true,
                editarCilindraje: false,
            };
            setEditarDatos(editar);
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Para poder seguir con el proceso de búsqueda debes elegir el tipo de transmisión y tracción de tu vehículo."
            );
            return;
        }

        if (tipotraccion == "Tracción") {
            setHabilitaCajaMotor(true);
            let editar = {
                editarCombustible: false,
                editarTraccion: true,
                editarTransmision: false,
                editarCilindraje: false,
            };
            setEditarDatos(editar);
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Para poder seguir con el proceso de búsqueda debes elegir la tracción de tu vehículo."
            );
            return;
        }

        if (tipotransmision == "Transmisión") {
            setHabilitaCajaMotor(true);
            let editar = {
                editarCombustible: false,
                editarTraccion: false,
                editarTransmision: true,
                editarCilindraje: false,
            };
            setEditarDatos(editar);
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Para poder seguir con el proceso de búsqueda debes elegir la transmisión de tu vehículo."
            );
            return;
        }

        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Tren motriz - caja motor")
        );
        setOnClickImagenMtrElect(true);

        let dato = [];
        let item = {
            sistemacuatro: 4,
            imagen: cajamotor2,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemacuatro != item.sistemacuatro) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(cajamotor2);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != cajamotor2 &&
            iconoSeleccionadoUno != cajamotor2
        ) {
            setIconoSeleccionadoUno(cajamotor2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != cajamotor2 &&
            iconoSeleccionadoUno != cajamotor2 &&
            iconoSeleccionadoTres != cajamotor2
        ) {
            setIconoSeleccionadoUno(cajamotor2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != cajamotor2 &&
            iconoSeleccionadoUno != cajamotor2 &&
            iconoSeleccionadoTres != cajamotor2
        ) {
            setIconoSeleccionadoUno(cajamotor2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != cajamotor2 &&
            iconoSeleccionadoUno != cajamotor2 &&
            iconoSeleccionadoTres != cajamotor2 &&
            iconoSeleccionadoCuatro != cajamotor2
        ) {
            setIconoSeleccionadoUno(cajamotor2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setOnClickAirecondicionado(false);
        setOnClickDireccion(false);
        setOnClickFrenos(false);
        setOnClickCaja(true);
        setOnClickRefrigeracionCaja(false);
        setOnClickSistdeArranque(false);
        setOnClickSistdeParabrisas(false);
        setOnClickMotor(false);
        setOnClickEmbrague(false);
        setOnClickEscape(false);
        setOnClickInyeccion(false);
        setOnClickRefrigeracion(false);
        setOnClickElectrico(false);
        setOnClickElectricoMotor(false);
        setOnClickSuspension(false);
        setOnClickSistdeElectrico(false);

        // Asigna Color Icono Seleccionado y Marca los  No seleccionados por el usuario
        setAireacondicionado(aireacondicionado3);
        setDireccion(direccion3);
        setFrenos(frenos3);
        setCaja(cajamotor2);
        setRefrigeracioncaja(sistemadeenfriamientomotor3);
        setArranque(sistemaarranque3);
        setParabrisas(sistemaparabrisas3);
        setMotor(sistemamotor3);
        setEmbrague(sistemaembrague3);
        setEscape(sistemadeescape3);
        setInyeccion(sistemadeinyeccion3);
        setRefrigeracion(refrijeracionvehiculo3);
        setSistelectrico(sistemaelectricovehiculo3);
        setSistelectricomotor(sistemaelectricomotor3);
        setSuspension(sistemasuspension3);
        setTransmision(sistematransmision3);
    };

    const prdEnframientoMotorEstacaSencilla = () => {
        setDatosFaltantes(false);
        let tipotraccion = datosbuscadorinteractivo.nombretraccion;
        let tipotransmision = datosbuscadorinteractivo.nombretransmision;

        if (tipotraccion == "Tracción" && tipotransmision == "Transmisión") {
            setHabilitaEnframientoMotor(true);
            let editar = {
                editarCombustible: false,
                editarTraccion: true,
                editarTransmision: true,
                editarCilindraje: false,
            };
            setEditarDatos(editar);
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Para poder seguir con el proceso de búsqueda debes elegir el tipo de transmisión y tracción de tu vehículo."
            );
            return;
        }

        if (tipotraccion == "Tracción") {
            setHabilitaEnframientoMotor(true);
            let editar = {
                editarCombustible: false,
                editarTraccion: true,
                editarTransmision: false,
                editarCilindraje: false,
            };
            setEditarDatos(editar);
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Para poder seguir con el proceso de búsqueda debes elegir la tracción de tu vehículo."
            );
            return;
        }

        if (tipotransmision == "Transmisión") {
            setHabilitaEnframientoMotor(true);
            let editar = {
                editarCombustible: false,
                editarTraccion: false,
                editarTransmision: true,
                editarCilindraje: false,
            };
            setEditarDatos(editar);
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Para poder seguir con el proceso de búsqueda debes elegir la transmisión de tu vehículo."
            );
            return;
        }

        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Tren motriz - enfriamiento")
        );
        setOnClickImagenMtrElect(true);

        let dato = [];
        let item = {
            sistemacinco: 5,
            imagen: sistemadeenfriamientomotor2,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemacinco != item.sistemacinco) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(sistemadeenfriamientomotor2);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != sistemadeenfriamientomotor2 &&
            iconoSeleccionadoUno != sistemadeenfriamientomotor2
        ) {
            setIconoSeleccionadoUno(sistemadeenfriamientomotor2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != sistemadeenfriamientomotor2 &&
            iconoSeleccionadoUno != sistemadeenfriamientomotor2 &&
            iconoSeleccionadoTres != sistemadeenfriamientomotor2
        ) {
            setIconoSeleccionadoUno(sistemadeenfriamientomotor2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != sistemadeenfriamientomotor2 &&
            iconoSeleccionadoUno != sistemadeenfriamientomotor2 &&
            iconoSeleccionadoTres != sistemadeenfriamientomotor2
        ) {
            setIconoSeleccionadoUno(sistemadeenfriamientomotor2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != sistemadeenfriamientomotor2 &&
            iconoSeleccionadoUno != sistemadeenfriamientomotor2 &&
            iconoSeleccionadoTres != sistemadeenfriamientomotor2 &&
            iconoSeleccionadoCuatro != sistemadeenfriamientomotor2
        ) {
            setIconoSeleccionadoUno(sistemadeenfriamientomotor2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setOnClickAirecondicionado(false);
        setOnClickDireccion(false);
        setOnClickFrenos(false);
        setOnClickCaja(false);
        setOnClickRefrigeracionCaja(true);
        setOnClickSistdeArranque(false);
        setOnClickSistdeParabrisas(false);
        setOnClickMotor(false);
        setOnClickEmbrague(false);
        setOnClickEscape(false);
        setOnClickInyeccion(false);
        setOnClickRefrigeracion(false);
        setOnClickElectrico(false);
        setOnClickElectricoMotor(false);
        setOnClickSuspension(false);
        setOnClickSistdeElectrico(false);

        // Asigna Color Icono Seleccionado y Marca los  No seleccionados por el usuario
        setAireacondicionado(aireacondicionado3);
        setDireccion(direccion3);
        setFrenos(frenos3);
        setCaja(cajamotor3);
        setRefrigeracioncaja(sistemadeenfriamientomotor2);
        setArranque(sistemaarranque3);
        setParabrisas(sistemaparabrisas3);
        setMotor(sistemamotor3);
        setEmbrague(sistemaembrague3);
        setEscape(sistemadeescape3);
        setInyeccion(sistemadeinyeccion3);
        setRefrigeracion(refrijeracionvehiculo3);
        setSistelectrico(sistemaelectricovehiculo3);
        setSistelectricomotor(sistemaelectricomotor3);
        setSuspension(sistemasuspension3);
        setTransmision(sistematransmision3);
    };

    const prdArranqueEstacaSencilla = () => {
        setDatosFaltantes(false);
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Tren motriz - arranque")
        );
        setOnClickImagenMtrElect(true);

        let dato = [];
        let item = {
            sistemaseis: 6,
            imagen: sistemaarranque2,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaseis != item.sistemaseis) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(sistemaarranque2);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != sistemaarranque2 &&
            iconoSeleccionadoUno != sistemaarranque2
        ) {
            setIconoSeleccionadoUno(sistemaarranque2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != sistemaarranque2 &&
            iconoSeleccionadoUno != sistemaarranque2 &&
            iconoSeleccionadoTres != sistemaarranque2
        ) {
            setIconoSeleccionadoUno(sistemaarranque2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != sistemaarranque2 &&
            iconoSeleccionadoUno != sistemaarranque2 &&
            iconoSeleccionadoTres != sistemaarranque2
        ) {
            setIconoSeleccionadoUno(sistemaarranque2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != sistemaarranque2 &&
            iconoSeleccionadoUno != sistemaarranque2 &&
            iconoSeleccionadoTres != sistemaarranque2 &&
            iconoSeleccionadoCuatro != sistemaarranque2
        ) {
            setIconoSeleccionadoUno(sistemaarranque2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setOnClickAirecondicionado(false);
        setOnClickDireccion(false);
        setOnClickFrenos(false);
        setOnClickCaja(false);
        setOnClickRefrigeracionCaja(false);
        setOnClickSistdeArranque(true);
        setOnClickSistdeParabrisas(false);
        setOnClickMotor(false);
        setOnClickEmbrague(false);
        setOnClickEscape(false);
        setOnClickInyeccion(false);
        setOnClickRefrigeracion(false);
        setOnClickElectrico(false);
        setOnClickElectricoMotor(false);
        setOnClickSuspension(false);
        setOnClickSistdeElectrico(false);

        // Asigna Color Icono Seleccionado y Marca los  No seleccionados por el usuario
        setAireacondicionado(aireacondicionado3);
        setDireccion(direccion3);
        setFrenos(frenos3);
        setCaja(cajamotor3);
        setRefrigeracioncaja(sistemadeenfriamientomotor3);
        setArranque(sistemaarranque2);
        setParabrisas(sistemaparabrisas3);
        setMotor(sistemamotor3);
        setEmbrague(sistemaembrague3);
        setEscape(sistemadeescape3);
        setInyeccion(sistemadeinyeccion3);
        setRefrigeracion(refrijeracionvehiculo3);
        setSistelectrico(sistemaelectricovehiculo3);
        setSistelectricomotor(sistemaelectricomotor3);
        setSuspension(sistemasuspension3);
        setTransmision(sistematransmision3);
    };

    const prdParabrisasEstacaSencilla = () => {
        setDatosFaltantes(false);
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Tren motriz - parabrisas")
        );
        setOnClickImagenMtrElect(true);

        let dato = [];
        let item = {
            sistemasiete: 7,
            imagen: sistemaparabrisas2,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemasiete != item.sistemasiete) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(sistemaparabrisas2);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != sistemaparabrisas2 &&
            iconoSeleccionadoUno != sistemaparabrisas2
        ) {
            setIconoSeleccionadoUno(sistemaparabrisas2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != sistemaparabrisas2 &&
            iconoSeleccionadoUno != sistemaparabrisas2 &&
            iconoSeleccionadoTres != sistemaparabrisas2
        ) {
            setIconoSeleccionadoUno(sistemaparabrisas2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != sistemaparabrisas2 &&
            iconoSeleccionadoUno != sistemaparabrisas2 &&
            iconoSeleccionadoTres != sistemaparabrisas2
        ) {
            setIconoSeleccionadoUno(sistemaparabrisas2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != sistemaparabrisas2 &&
            iconoSeleccionadoUno != sistemaparabrisas2 &&
            iconoSeleccionadoTres != sistemaparabrisas2 &&
            iconoSeleccionadoCuatro != sistemaparabrisas2
        ) {
            setIconoSeleccionadoUno(sistemaparabrisas2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setOnClickAirecondicionado(false);
        setOnClickDireccion(false);
        setOnClickFrenos(false);
        setOnClickCaja(false);
        setOnClickRefrigeracionCaja(false);
        setOnClickSistdeArranque(false);
        setOnClickSistdeParabrisas(true);
        setOnClickMotor(false);
        setOnClickEmbrague(false);
        setOnClickEscape(false);
        setOnClickInyeccion(false);
        setOnClickRefrigeracion(false);
        setOnClickElectrico(false);
        setOnClickElectricoMotor(false);
        setOnClickSuspension(false);
        setOnClickSistdeElectrico(false);

        // Asigna Color Icono Seleccionado y Marca los  No seleccionados por el usuario
        setAireacondicionado(aireacondicionado3);
        setDireccion(direccion3);
        setFrenos(frenos3);
        setCaja(cajamotor3);
        setRefrigeracioncaja(sistemadeenfriamientomotor3);
        setArranque(sistemaarranque3);
        setParabrisas(sistemaparabrisas2);
        setMotor(sistemamotor3);
        setEmbrague(sistemaembrague3);
        setEscape(sistemadeescape3);
        setInyeccion(sistemadeinyeccion3);
        setRefrigeracion(refrijeracionvehiculo3);
        setSistelectrico(sistemaelectricovehiculo3);
        setSistelectricomotor(sistemaelectricomotor3);
        setSuspension(sistemasuspension3);
        setTransmision(sistematransmision3);
    };

    const prdMotorEstacaSencilla = () => {
        let tipocilindraje = datosbuscadorinteractivo.nombrecilindraje;
        let tipocombustible = datosbuscadorinteractivo.nombretipocombustible;
        setDatosFaltantes(false);

        if (
            tipocilindraje == "Cilindraje" &&
            tipocombustible == "Combustible"
        ) {
            setHabilitaMotor(true);
            let editar = {
                editarCombustible: true,
                editarTraccion: false,
                editarTransmision: false,
                editarCilindraje: true,
            };
            setEditarDatos(editar);
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Para poder seguir con el proceso de búsqueda debes elegir el cilindraje y combustible de tu vehículo."
            );
            return;
        }

        if (tipocilindraje == "Cilindraje") {
            setHabilitaMotor(true);
            let editar = {
                editarCombustible: false,
                editarTraccion: false,
                editarTransmision: false,
                editarCilindraje: true,
            };
            setEditarDatos(editar);
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Para poder seguir con el proceso de búsqueda debes elegir el cilindraje de tu vehículo."
            );
            return;
        }

        if (tipocombustible == "Combustible") {
            setHabilitaMotor(true);
            let editar = {
                editarCombustible: true,
                editarTraccion: false,
                editarTransmision: false,
                editarCilindraje: false,
            };
            setEditarDatos(editar);
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Para poder seguir con el proceso de búsqueda debes elegir el combustible de tu vehículo."
            );
            return;
        }

        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Tren motriz - motor")
        );
        setOnClickImagenMtrElect(true);

        let dato = [];
        let item = {
            sistemaocho: 8,
            imagen: sistemamotor2,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaocho != item.sistemaocho) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(sistemamotor2);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != sistemamotor2 &&
            iconoSeleccionadoUno != sistemamotor2
        ) {
            setIconoSeleccionadoUno(sistemamotor2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != sistemamotor2 &&
            iconoSeleccionadoUno != sistemamotor2 &&
            iconoSeleccionadoTres != sistemamotor2
        ) {
            setIconoSeleccionadoUno(sistemamotor2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != sistemamotor2 &&
            iconoSeleccionadoUno != sistemamotor2 &&
            iconoSeleccionadoTres != sistemamotor2
        ) {
            setIconoSeleccionadoUno(sistemamotor2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != sistemamotor2 &&
            iconoSeleccionadoUno != sistemamotor2 &&
            iconoSeleccionadoTres != sistemamotor2 &&
            iconoSeleccionadoCuatro != sistemamotor2
        ) {
            setIconoSeleccionadoUno(sistemamotor2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setOnClickAirecondicionado(false);
        setOnClickDireccion(false);
        setOnClickFrenos(false);
        setOnClickCaja(false);
        setOnClickRefrigeracionCaja(false);
        setOnClickSistdeArranque(false);
        setOnClickSistdeParabrisas(false);
        setOnClickMotor(true);
        setOnClickEmbrague(false);
        setOnClickEscape(false);
        setOnClickInyeccion(false);
        setOnClickRefrigeracion(false);
        setOnClickElectrico(false);
        setOnClickElectricoMotor(false);
        setOnClickSuspension(false);
        setOnClickSistdeElectrico(false);

        // Asigna Color Icono Seleccionado y Marca los  No seleccionados por el usuario
        setAireacondicionado(aireacondicionado3);
        setDireccion(direccion3);
        setFrenos(frenos3);
        setCaja(cajamotor3);
        setRefrigeracioncaja(sistemadeenfriamientomotor3);
        setArranque(sistemaarranque3);
        setParabrisas(sistemaparabrisas3);
        setMotor(sistemamotor2);
        setEmbrague(sistemaembrague3);
        setEscape(sistemadeescape3);
        setInyeccion(sistemadeinyeccion3);
        setRefrigeracion(refrijeracionvehiculo3);
        setSistelectrico(sistemaelectricovehiculo3);
        setSistelectricomotor(sistemaelectricomotor3);
        setSuspension(sistemasuspension3);
        setTransmision(sistematransmision3);
    };

    const prdEmbragueEstacaSencilla = () => {
        setDatosFaltantes(false);
        if (
            datosbuscadorinteractivo.transmisionesseleccionadas == 1 &&
            !datosFaltantes
        ) {
            setShowModalMensajesCerrar(true);
            setTituloMensajes("Sistema no disponible");
            setTextoMensajes(
                "Tu vehículo es automático, por ello, no tiene sistema de embrague."
            );
            return;
        }

        let tipotransmision = datosbuscadorinteractivo.nombretransmision;

        if (tipotransmision == "Transmisión") {
            setHabilitaEmbrague(true);
            let editar = {
                editarCombustible: false,
                editarTraccion: false,
                editarTransmision: true,
                editarCilindraje: false,
            };
            setEditarDatos(editar);
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Para poder seguir con el proceso de búsqueda debes elegir la transmisión de tu vehículo."
            );
            return;
        }

        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Tren motriz - embrague")
        );
        setOnClickImagenMtrElect(true);

        let dato = [];
        let item = {
            sistemanueve: 9,
            imagen: sistemaembrague2,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemanueve != item.sistemanueve) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(sistemaembrague2);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != sistemaembrague2 &&
            iconoSeleccionadoUno != sistemaembrague2
        ) {
            setIconoSeleccionadoUno(sistemaembrague2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != sistemaembrague2 &&
            iconoSeleccionadoUno != sistemaembrague2 &&
            iconoSeleccionadoTres != sistemaembrague2
        ) {
            setIconoSeleccionadoUno(sistemaembrague2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != sistemaembrague2 &&
            iconoSeleccionadoUno != sistemaembrague2 &&
            iconoSeleccionadoTres != sistemaembrague2
        ) {
            setIconoSeleccionadoUno(sistemaembrague2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != sistemaembrague2 &&
            iconoSeleccionadoUno != sistemaembrague2 &&
            iconoSeleccionadoTres != sistemaembrague2 &&
            iconoSeleccionadoCuatro != sistemaembrague2
        ) {
            setIconoSeleccionadoUno(sistemaembrague2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setOnClickAirecondicionado(false);
        setOnClickDireccion(false);
        setOnClickFrenos(false);
        setOnClickCaja(false);
        setOnClickRefrigeracionCaja(false);
        setOnClickSistdeArranque(false);
        setOnClickSistdeParabrisas(false);
        setOnClickMotor(false);
        setOnClickEmbrague(true);
        setOnClickEscape(false);
        setOnClickInyeccion(false);
        setOnClickRefrigeracion(false);
        setOnClickElectrico(false);
        setOnClickElectricoMotor(false);
        setOnClickSuspension(false);
        setOnClickSistdeElectrico(false);

        // Asigna Color Icono Seleccionado y Marca los  No seleccionados por el usuario
        setAireacondicionado(aireacondicionado3);
        setDireccion(direccion3);
        setFrenos(frenos3);
        setCaja(cajamotor3);
        setRefrigeracioncaja(sistemadeenfriamientomotor3);
        setArranque(sistemaarranque3);
        setParabrisas(sistemaparabrisas3);
        setMotor(sistemamotor3);
        setEmbrague(sistemaembrague2);
        setEscape(sistemadeescape3);
        setInyeccion(sistemadeinyeccion3);
        setRefrigeracion(refrijeracionvehiculo3);
        setSistelectrico(sistemaelectricovehiculo3);
        setSistelectricomotor(sistemaelectricomotor3);
        setSuspension(sistemasuspension3);
        setTransmision(sistematransmision3);
    };

    const prdEscapeEstacaSencilla = () => {
        setDatosFaltantes(false);
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Tren motriz - escape")
        );
        setOnClickImagenMtrElect(true);

        let dato = [];
        let item = {
            sistemadiez: 10,
            imagen: sistemadeescape2,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemadiez != item.sistemadiez) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(sistemadeescape2);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != sistemadeescape2 &&
            iconoSeleccionadoUno != sistemadeescape2
        ) {
            setIconoSeleccionadoUno(sistemadeescape2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != sistemadeescape2 &&
            iconoSeleccionadoUno != sistemadeescape2 &&
            iconoSeleccionadoTres != sistemadeescape2
        ) {
            setIconoSeleccionadoUno(sistemadeescape2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != sistemadeescape2 &&
            iconoSeleccionadoUno != sistemadeescape2 &&
            iconoSeleccionadoTres != sistemadeescape2
        ) {
            setIconoSeleccionadoUno(sistemadeescape2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != sistemadeescape2 &&
            iconoSeleccionadoUno != sistemadeescape2 &&
            iconoSeleccionadoTres != sistemadeescape2 &&
            iconoSeleccionadoCuatro != sistemadeescape2
        ) {
            setIconoSeleccionadoUno(sistemadeescape2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setOnClickAirecondicionado(false);
        setOnClickDireccion(false);
        setOnClickFrenos(false);
        setOnClickCaja(false);
        setOnClickRefrigeracionCaja(false);
        setOnClickSistdeArranque(false);
        setOnClickSistdeParabrisas(false);
        setOnClickMotor(false);
        setOnClickEmbrague(false);
        setOnClickEscape(true);
        setOnClickInyeccion(false);
        setOnClickRefrigeracion(false);
        setOnClickElectrico(false);
        setOnClickElectricoMotor(false);
        setOnClickSuspension(false);
        setOnClickSistdeElectrico(false);

        // Asigna Color Icono Seleccionado y Marca los  No seleccionados por el usuario
        setAireacondicionado(aireacondicionado3);
        setDireccion(direccion3);
        setFrenos(frenos3);
        setCaja(cajamotor3);
        setRefrigeracioncaja(sistemadeenfriamientomotor3);
        setArranque(sistemaarranque3);
        setParabrisas(sistemaparabrisas3);
        setMotor(sistemamotor3);
        setEmbrague(sistemaembrague3);
        setEscape(sistemadeescape2);
        setInyeccion(sistemadeinyeccion3);
        setRefrigeracion(refrijeracionvehiculo3);
        setSistelectrico(sistemaelectricovehiculo3);
        setSistelectricomotor(sistemaelectricomotor3);
        setSuspension(sistemasuspension3);
        setTransmision(sistematransmision3);
    };

    const prdInyeccionEstacaSencilla = () => {
        setDatosFaltantes(false);
        let tipocombustible = datosbuscadorinteractivo.nombretipocombustible;

        if (tipocombustible == "Combustible") {
            setHabilitaInyeccion(true);
            let editar = {
                editarCombustible: true,
                editarTraccion: false,
                editarTransmision: false,
                editarCilindraje: false,
            };
            setEditarDatos(editar);
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Para poder seguir con el proceso de búsqueda debes elegir el combustible de tu vehículo."
            );
            return;
        }

        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Tren motriz - inyección")
        );
        setOnClickImagenMtrElect(true);

        let dato = [];
        let item = {
            sistemaonce: 11,
            imagen: sistemadeinyeccion2,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaonce != item.sistemaonce) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(sistemadeinyeccion2);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != sistemadeinyeccion2 &&
            iconoSeleccionadoUno != sistemadeinyeccion2
        ) {
            setIconoSeleccionadoUno(sistemadeinyeccion2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != sistemadeinyeccion2 &&
            iconoSeleccionadoUno != sistemadeinyeccion2 &&
            iconoSeleccionadoTres != sistemadeinyeccion2
        ) {
            setIconoSeleccionadoUno(sistemadeinyeccion2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != sistemadeinyeccion2 &&
            iconoSeleccionadoUno != sistemadeinyeccion2 &&
            iconoSeleccionadoTres != sistemadeinyeccion2
        ) {
            setIconoSeleccionadoUno(sistemadeinyeccion2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != sistemadeinyeccion2 &&
            iconoSeleccionadoUno != sistemadeinyeccion2 &&
            iconoSeleccionadoTres != sistemadeinyeccion2 &&
            iconoSeleccionadoCuatro != sistemadeinyeccion2
        ) {
            setIconoSeleccionadoUno(sistemadeinyeccion2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setOnClickAirecondicionado(false);
        setOnClickDireccion(false);
        setOnClickFrenos(false);
        setOnClickCaja(false);
        setOnClickRefrigeracionCaja(false);
        setOnClickSistdeArranque(false);
        setOnClickSistdeParabrisas(false);
        setOnClickMotor(false);
        setOnClickEmbrague(false);
        setOnClickEscape(false);
        setOnClickInyeccion(true);
        setOnClickRefrigeracion(false);
        setOnClickElectrico(false);
        setOnClickElectricoMotor(false);
        setOnClickSuspension(false);
        setOnClickSistdeElectrico(false);

        // Asigna Color Icono Seleccionado y Marca los  No seleccionados por el usuario
        setAireacondicionado(aireacondicionado3);
        setDireccion(direccion3);
        setFrenos(frenos3);
        setCaja(cajamotor3);
        setRefrigeracioncaja(sistemadeenfriamientomotor3);
        setArranque(sistemaarranque3);
        setParabrisas(sistemaparabrisas3);
        setMotor(sistemamotor3);
        setEmbrague(sistemaembrague3);
        setEscape(sistemadeescape3);
        setInyeccion(sistemadeinyeccion2);
        setRefrigeracion(refrijeracionvehiculo3);
        setSistelectrico(sistemaelectricovehiculo3);
        setSistelectricomotor(sistemaelectricomotor3);
        setSuspension(sistemasuspension3);
        setTransmision(sistematransmision3);
    };

    const prdRefrijeracionEstacaSencilla = () => {
        setDatosFaltantes(false);
        let tipocombustible = datosbuscadorinteractivo.nombretipocombustible;

        if (tipocombustible == "Combustible") {
            setHabilitaRefrijeracion(true);
            let editar = {
                editarCombustible: true,
                editarTraccion: false,
                editarTransmision: false,
                editarCilindraje: false,
            };
            setEditarDatos(editar);
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Para poder seguir con el proceso de búsqueda debes elegir el combustible de tu vehículo."
            );
            return;
        }

        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Tren motriz - refrijeración")
        );
        setOnClickImagenMtrElect(true);

        let dato = [];
        let item = {
            sistemadoce: 12,
            imagen: refrijeracionvehiculo2,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemadoce != item.sistemadoce) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(refrijeracionvehiculo2);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != refrijeracionvehiculo2 &&
            iconoSeleccionadoUno != refrijeracionvehiculo2
        ) {
            setIconoSeleccionadoUno(refrijeracionvehiculo2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != refrijeracionvehiculo2 &&
            iconoSeleccionadoUno != refrijeracionvehiculo2 &&
            iconoSeleccionadoTres != refrijeracionvehiculo2
        ) {
            setIconoSeleccionadoUno(refrijeracionvehiculo2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != refrijeracionvehiculo2 &&
            iconoSeleccionadoUno != refrijeracionvehiculo2 &&
            iconoSeleccionadoTres != refrijeracionvehiculo2
        ) {
            setIconoSeleccionadoUno(refrijeracionvehiculo2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != refrijeracionvehiculo2 &&
            iconoSeleccionadoUno != refrijeracionvehiculo2 &&
            iconoSeleccionadoTres != refrijeracionvehiculo2 &&
            iconoSeleccionadoCuatro != refrijeracionvehiculo2
        ) {
            setIconoSeleccionadoUno(refrijeracionvehiculo2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setOnClickAirecondicionado(false);
        setOnClickDireccion(false);
        setOnClickFrenos(false);
        setOnClickCaja(false);
        setOnClickRefrigeracionCaja(false);
        setOnClickSistdeArranque(false);
        setOnClickSistdeParabrisas(false);
        setOnClickMotor(false);
        setOnClickEmbrague(false);
        setOnClickEscape(false);
        setOnClickInyeccion(false);
        setOnClickRefrigeracion(true);
        setOnClickElectrico(false);
        setOnClickElectricoMotor(false);
        setOnClickSuspension(false);
        setOnClickSistdeElectrico(false);

        // Asigna Color Icono Seleccionado y Marca los  No seleccionados por el usuario
        setAireacondicionado(aireacondicionado3);
        setDireccion(direccion3);
        setFrenos(frenos3);
        setCaja(cajamotor3);
        setRefrigeracioncaja(sistemadeenfriamientomotor3);
        setArranque(sistemaarranque3);
        setParabrisas(sistemaparabrisas3);
        setMotor(sistemamotor3);
        setEmbrague(sistemaembrague3);
        setEscape(sistemadeescape3);
        setInyeccion(sistemadeinyeccion3);
        setRefrigeracion(refrijeracionvehiculo2);
        setSistelectrico(sistemaelectricovehiculo3);
        setSistelectricomotor(sistemaelectricomotor3);
        setSuspension(sistemasuspension3);
        setTransmision(sistematransmision3);
    };

    const prdElectricoVehiculoEstacaSencilla = () => {
        setDatosFaltantes(false);
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Tren motriz - eléctrico")
        );
        setOnClickImagenMtrElect(true);

        let dato = [];
        let item = {
            sistematrece: 13,
            imagen: sistemaelectricovehiculo2,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistematrece != item.sistematrece) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(sistemaelectricovehiculo2);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != sistemaelectricovehiculo2 &&
            iconoSeleccionadoUno != sistemaelectricovehiculo2
        ) {
            setIconoSeleccionadoUno(sistemaelectricovehiculo2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != sistemaelectricovehiculo2 &&
            iconoSeleccionadoUno != sistemaelectricovehiculo2 &&
            iconoSeleccionadoTres != sistemaelectricovehiculo2
        ) {
            setIconoSeleccionadoUno(sistemaelectricovehiculo2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != sistemaelectricovehiculo2 &&
            iconoSeleccionadoUno != sistemaelectricovehiculo2 &&
            iconoSeleccionadoTres != sistemaelectricovehiculo2
        ) {
            setIconoSeleccionadoUno(sistemaelectricovehiculo2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != sistemaelectricovehiculo2 &&
            iconoSeleccionadoUno != sistemaelectricovehiculo2 &&
            iconoSeleccionadoTres != sistemaelectricovehiculo2 &&
            iconoSeleccionadoCuatro != sistemaelectricovehiculo2
        ) {
            setIconoSeleccionadoUno(sistemaelectricovehiculo2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setOnClickAirecondicionado(false);
        setOnClickDireccion(false);
        setOnClickFrenos(false);
        setOnClickCaja(false);
        setOnClickRefrigeracionCaja(false);
        setOnClickSistdeArranque(false);
        setOnClickSistdeParabrisas(false);
        setOnClickMotor(false);
        setOnClickEmbrague(false);
        setOnClickEscape(false);
        setOnClickInyeccion(false);
        setOnClickRefrigeracion(false);
        setOnClickElectrico(true);
        setOnClickElectricoMotor(false);
        setOnClickSuspension(false);
        setOnClickSistdeElectrico(false);

        // Asigna Color Icono Seleccionado y Marca los  No seleccionados por el usuario
        setAireacondicionado(aireacondicionado3);
        setDireccion(direccion3);
        setFrenos(frenos3);
        setCaja(cajamotor3);
        setRefrigeracioncaja(sistemadeenfriamientomotor3);
        setArranque(sistemaarranque3);
        setParabrisas(sistemaparabrisas3);
        setMotor(sistemamotor3);
        setEmbrague(sistemaembrague3);
        setEscape(sistemadeescape3);
        setInyeccion(sistemadeinyeccion3);
        setRefrigeracion(refrijeracionvehiculo3);
        setSistelectrico(sistemaelectricovehiculo2);
        setSistelectricomotor(sistemaelectricomotor3);
        setSuspension(sistemasuspension3);
        setTransmision(sistematransmision3);
    };

    const prdElectricoMotorEstacaSencilla = () => {
        setDatosFaltantes(false);
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Tren motriz - eléctrico motor")
        );
        setOnClickImagenMtrElect(true);

        let dato = [];
        let item = {
            sistemacatorce: 14,
            imagen: sistemaelectricomotor2,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemacatorce != item.sistemacatorce) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(sistemaelectricomotor2);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != sistemaelectricomotor2 &&
            iconoSeleccionadoUno != sistemaelectricomotor2
        ) {
            setIconoSeleccionadoUno(sistemaelectricomotor2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != sistemaelectricomotor2 &&
            iconoSeleccionadoUno != sistemaelectricomotor2 &&
            iconoSeleccionadoTres != sistemaelectricomotor2
        ) {
            setIconoSeleccionadoUno(sistemaelectricomotor2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != sistemaelectricomotor2 &&
            iconoSeleccionadoUno != sistemaelectricomotor2 &&
            iconoSeleccionadoTres != sistemaelectricomotor2
        ) {
            setIconoSeleccionadoUno(sistemaelectricomotor2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != sistemaelectricomotor2 &&
            iconoSeleccionadoUno != sistemaelectricomotor2 &&
            iconoSeleccionadoTres != sistemaelectricomotor2 &&
            iconoSeleccionadoCuatro != sistemaelectricomotor2
        ) {
            setIconoSeleccionadoUno(sistemaelectricomotor2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setOnClickAirecondicionado(false);
        setOnClickDireccion(false);
        setOnClickFrenos(false);
        setOnClickCaja(false);
        setOnClickRefrigeracionCaja(false);
        setOnClickSistdeArranque(false);
        setOnClickSistdeParabrisas(false);
        setOnClickMotor(false);
        setOnClickEmbrague(false);
        setOnClickEscape(false);
        setOnClickInyeccion(false);
        setOnClickRefrigeracion(false);
        setOnClickElectrico(false);
        setOnClickElectricoMotor(true);
        setOnClickSuspension(false);
        setOnClickSistdeElectrico(false);

        // Asigna Color Icono Seleccionado y Marca los  No seleccionados por el usuario
        setAireacondicionado(aireacondicionado3);
        setDireccion(direccion3);
        setFrenos(frenos3);
        setCaja(cajamotor3);
        setRefrigeracioncaja(sistemadeenfriamientomotor3);
        setArranque(sistemaarranque3);
        setParabrisas(sistemaparabrisas3);
        setMotor(sistemamotor3);
        setEmbrague(sistemaembrague3);
        setEscape(sistemadeescape3);
        setInyeccion(sistemadeinyeccion3);
        setRefrigeracion(refrijeracionvehiculo3);
        setSistelectrico(sistemaelectricovehiculo3);
        setSistelectricomotor(sistemaelectricomotor2);
        setSuspension(sistemasuspension3);
        setTransmision(sistematransmision3);
    };

    const prdSuspensionEstacaSencilla = () => {
        setDatosFaltantes(false);
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Tren motriz - suspensión")
        );
        setOnClickImagenMtrElect(true);

        let dato = [];
        let item = {
            sistemaquince: 15,
            imagen: sistemasuspension2,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaquince != item.sistemaquince) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(sistemasuspension2);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != sistemasuspension2 &&
            iconoSeleccionadoUno != sistemasuspension2
        ) {
            setIconoSeleccionadoUno(sistemasuspension2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != sistemasuspension2 &&
            iconoSeleccionadoUno != sistemasuspension2 &&
            iconoSeleccionadoTres != sistemasuspension2
        ) {
            setIconoSeleccionadoUno(sistemasuspension2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != sistemasuspension2 &&
            iconoSeleccionadoUno != sistemasuspension2 &&
            iconoSeleccionadoTres != sistemasuspension2
        ) {
            setIconoSeleccionadoUno(sistemasuspension2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != sistemasuspension2 &&
            iconoSeleccionadoUno != sistemasuspension2 &&
            iconoSeleccionadoTres != sistemasuspension2 &&
            iconoSeleccionadoCuatro != sistemasuspension2
        ) {
            setIconoSeleccionadoUno(sistemasuspension2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setOnClickAirecondicionado(false);
        setOnClickDireccion(false);
        setOnClickFrenos(false);
        setOnClickCaja(false);
        setOnClickRefrigeracionCaja(false);
        setOnClickSistdeArranque(false);
        setOnClickSistdeParabrisas(false);
        setOnClickMotor(false);
        setOnClickEmbrague(false);
        setOnClickEscape(false);
        setOnClickInyeccion(false);
        setOnClickRefrigeracion(false);
        setOnClickElectrico(false);
        setOnClickElectricoMotor(false);
        setOnClickSuspension(true);
        setOnClickSistdeElectrico(false);

        // Asigna Color Icono Seleccionado y Marca los  No seleccionados por el usuario
        setAireacondicionado(aireacondicionado3);
        setDireccion(direccion3);
        setFrenos(frenos3);
        setCaja(cajamotor3);
        setRefrigeracioncaja(sistemadeenfriamientomotor3);
        setArranque(sistemaarranque3);
        setParabrisas(sistemaparabrisas3);
        setMotor(sistemamotor3);
        setEmbrague(sistemaembrague3);
        setEscape(sistemadeescape3);
        setInyeccion(sistemadeinyeccion3);
        setRefrigeracion(refrijeracionvehiculo3);
        setSistelectrico(sistemaelectricovehiculo3);
        setSistelectricomotor(sistemaelectricomotor3);
        setSuspension(sistemasuspension2);
        setTransmision(sistematransmision3);
    };

    const prdTrasmisionEstacaSencilla = () => {
        setDatosFaltantes(false);
        let tipotraccion = datosbuscadorinteractivo.nombretraccion;
        let tipotransmision = datosbuscadorinteractivo.nombretransmision;

        if (tipotraccion == "Tracción" && tipotransmision == "Transmisión") {
            setHabilitaTrasmision(true);
            let editar = {
                editarCombustible: false,
                editarTraccion: true,
                editarTransmision: true,
                editarCilindraje: false,
            };
            setEditarDatos(editar);
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Para poder seguir con el proceso de búsqueda debes elegir el tipo de transmisión y tracción de tu vehículo."
            );
            return;
        }

        if (tipotraccion == "Tracción") {
            setHabilitaTrasmision(true);
            let editar = {
                editarCombustible: false,
                editarTraccion: true,
                editarTransmision: false,
                editarCilindraje: false,
            };
            setEditarDatos(editar);
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Para poder seguir con el proceso de búsqueda debes elegir la tracción de tu vehículo."
            );
            return;
        }

        if (tipotransmision == "Transmisión") {
            setHabilitaTrasmision(true);
            let editar = {
                editarCombustible: false,
                editarTraccion: false,
                editarTransmision: true,
                editarCilindraje: false,
            };
            setEditarDatos(editar);
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Para poder seguir con el proceso de búsqueda debes elegir la transmisión de tu vehículo."
            );
            return;
        }

        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Tren motriz - transmisión")
        );
        setOnClickImagenMtrElect(true);

        let dato = [];
        let item = {
            sistemadieciseis: 16,
            imagen: sistematransmision2,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemadieciseis != item.sistemadieciseis) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(sistematransmision2);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != sistematransmision2 &&
            iconoSeleccionadoUno != sistematransmision2
        ) {
            setIconoSeleccionadoUno(sistematransmision2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != sistematransmision2 &&
            iconoSeleccionadoUno != sistematransmision2 &&
            iconoSeleccionadoTres != sistematransmision2
        ) {
            setIconoSeleccionadoUno(sistematransmision2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != sistematransmision2 &&
            iconoSeleccionadoUno != sistematransmision2 &&
            iconoSeleccionadoTres != sistematransmision2
        ) {
            setIconoSeleccionadoUno(sistematransmision2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != sistematransmision2 &&
            iconoSeleccionadoUno != sistematransmision2 &&
            iconoSeleccionadoTres != sistematransmision2 &&
            iconoSeleccionadoCuatro != sistematransmision2
        ) {
            setIconoSeleccionadoUno(sistematransmision2);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setOnClickAirecondicionado(false);
        setOnClickDireccion(false);
        setOnClickFrenos(false);
        setOnClickCaja(false);
        setOnClickRefrigeracionCaja(false);
        setOnClickSistdeArranque(false);
        setOnClickSistdeParabrisas(false);
        setOnClickMotor(false);
        setOnClickEmbrague(false);
        setOnClickEscape(false);
        setOnClickInyeccion(false);
        setOnClickRefrigeracion(false);
        setOnClickElectrico(false);
        setOnClickElectricoMotor(false);
        setOnClickSuspension(false);
        setOnClickSistdeElectrico(true);

        // Asigna Color Icono Seleccionado y Marca los  No seleccionados por el usuario
        setAireacondicionado(aireacondicionado3);
        setDireccion(direccion3);
        setFrenos(frenos3);
        setCaja(cajamotor3);
        setRefrigeracioncaja(sistemadeenfriamientomotor3);
        setArranque(sistemaarranque3);
        setParabrisas(sistemaparabrisas3);
        setMotor(sistemamotor3);
        setEmbrague(sistemaembrague3);
        setEscape(sistemadeescape3);
        setInyeccion(sistemadeinyeccion3);
        setRefrigeracion(refrijeracionvehiculo3);
        setSistelectrico(sistemaelectricovehiculo3);
        setSistelectricomotor(sistemaelectricomotor3);
        setSuspension(sistemasuspension3);
        setTransmision(sistematransmision2);
    };

    const eliminarElemento = (item) => {
        let array = partesTrenMotrizSeleccionada;
        array.splice(item, 1);
        setpartesTrenMotrizSeleccionada(array);
        setBorrar(true);
    };

    useEffect(() => {
        setBorrar(false);
    }, [borrar]);

    useEffect(() => {
        if (maximizarOption != 0)
            setControlFijar("mt-20 fijardatosvehiculomotorelectrico");
        else setControlFijar("");
    }, [maximizarOption]);

    const minimizar = () => {
        if (maximizarOption != 0) {
            setMaximizarOption(0);
        }
    };

    const cerrarVenta = () => {
        setCloseWindow(true);
    };

    // Restaura datos del buscador interactivo
    useEffect(() => {
        if (maximizarOption == 0) setCloseWindow(false);
    }, [maximizarOption]);

    return (
        <Container title="Mi Cuenta">
            {" "}
            <ModalMensajesBuscar
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                setEditarBuscador={setEditarBuscador}
                editarDatos={editarDatos}
                setDatosFaltantes={setDatosFaltantes}
                setIsLoading={setIsLoading}
                tipo="1"
            />
            <ModalMensajesCerrar
                shown={showModalMensajesCerrar}
                close={setShowModalMensajesCerrar}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
            />
            <div className="row ps-page ps-page--inner" id="searchmr">
                <div className={zoomTipoVehiculo}>
                    {!closeWindow ? (
                        <div className={controlFijar}>
                            {maximizarOption != 0 ? (
                                <Row>
                                    <Col xs={1} sm={2} md={2} lg={2}>
                                        <a
                                            className="tamanoiconocerrarsearch tamañomaximizaricon"
                                            onClick={() => minimizar()}>
                                            <i
                                                className="mt-3 fa fa-2x fa fa-arrows-alt"
                                                aria-hidden="true"></i>
                                        </a>
                                    </Col>
                                    <Col xs={1} sm={2} md={2} lg={2}>
                                        <div className="bordecajaiconcerrar apuntador">
                                            <CloseIcon
                                                className="mlmenos3"
                                                style={{
                                                    fontSize: 90,
                                                    color: "#2D2E83",
                                                }}
                                                onClick={() =>
                                                    cerrarVenta()
                                                }></CloseIcon>
                                        </div>
                                    </Col>
                                </Row>
                            ) : null}

                            <div className="mlmenos11">
                                <div className="espacioizquierdoselectdvehicle mb-1">
                                    <SelectedVehicle />
                                </div>
                                <Row>
                                    <Col xs lg={11}>
                                        <ButtonGroup>
                                            <div className="espaciosuperiorbordecarroceriasedan">
                                                <Row>
                                                    <Col xs lg={2}>
                                                        <Button
                                                            className="botonexteriortrenmotriz"
                                                            variant="outline-light"
                                                            onClick={
                                                                seleccionaUbicarPrdLaton
                                                            }>
                                                            Exterior
                                                        </Button>
                                                    </Col>
                                                    <Col xs lg={2}>
                                                        <Button
                                                            className="informacionbotonexteriortrenmotriz"
                                                            variant="outline-light"
                                                            onClick={
                                                                mostrarComentariolatoneria
                                                            }>
                                                            {!ubicarPrdLaton ? (
                                                                <i
                                                                    class="fa fa-info d-flex justify-content-center"
                                                                    aria-hidden="true"></i>
                                                            ) : (
                                                                <i
                                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                                    aria-hidden="true"></i>
                                                            )}
                                                        </Button>
                                                    </Col>

                                                    <Col xs lg={2}>
                                                        <Button
                                                            className="botoncarroceriasedan"
                                                            variant="outline-light"
                                                            onClick={
                                                                seleccionaUbicarProdHab
                                                            }>
                                                            Interior
                                                        </Button>
                                                    </Col>
                                                    <Col xs lg={2}>
                                                        <Button
                                                            className="informacionbotoninterior"
                                                            variant="outline-light"
                                                            onClick={
                                                                mostrarComentariohabitaculo
                                                            }>
                                                            {!ubicarProdHab ? (
                                                                <i
                                                                    class="fa fa-info d-flex justify-content-center"
                                                                    aria-hidden="true"></i>
                                                            ) : (
                                                                <i
                                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                                    aria-hidden="true"></i>
                                                            )}
                                                        </Button>
                                                    </Col>
                                                    <Col xs lg={2}>
                                                        <Button
                                                            className="botoncarroceriatrenmotrizseleccionada"
                                                            variant="outline-light"
                                                            onClick={
                                                                seleccionaUbicarProductoMtrElect
                                                            }>
                                                            Tren Motriz
                                                        </Button>
                                                    </Col>
                                                    <Col xs lg={2}>
                                                        <Button
                                                            className="informacionbotoncarroceriatrenmotrizseleccionada"
                                                            variant="outline-light"
                                                            onClick={
                                                                mostrarComentariomotor
                                                            }>
                                                            {!ubicarProductoMotor ? (
                                                                <i
                                                                    class="fa fa-info d-flex justify-content-center"
                                                                    aria-hidden="true"></i>
                                                            ) : (
                                                                <i
                                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                                    aria-hidden="true"></i>
                                                            )}
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                                <h3 className="mt-3 centrartextosexterior">
                                    Elige en que sistema del tren motriz está
                                    ubicado tu repuesto
                                </h3>
                                <div className="espaciobordemotorelectrico">
                                    <Row>
                                        <div className="row">
                                            <div className={editarBuscador}>
                                                <Col xs lg={1}>
                                                    <Row xs={2} md={4} lg={12}>
                                                        <Col xs lg={12}>
                                                            <div className="bordediviconomotorelectrico">
                                                                <img
                                                                    className="tamañoimagensedamotorelectrico"
                                                                    onMouseOver={
                                                                        mostrarSistdeInyeccionEstacaSencilla
                                                                    }
                                                                    onMouseOut={
                                                                        cerrarSistdeInyeccionEstacaSencilla
                                                                    }
                                                                    onClick={() =>
                                                                        prdInyeccionEstacaSencilla()
                                                                    }
                                                                    src={
                                                                        showinyeccion.src
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={12}>
                                                            <div className="bordediviconomotorelectrico">
                                                                <img
                                                                    className="tamañoimagensedamotorelectrico"
                                                                    onMouseOver={
                                                                        mostrarSistdeRefrigeracionEstacaSencilla
                                                                    }
                                                                    onMouseOut={
                                                                        cerrarSistdeRefrigeracionEstacaSencilla
                                                                    }
                                                                    onClick={() =>
                                                                        prdRefrijeracionEstacaSencilla()
                                                                    }
                                                                    src={
                                                                        showrefrigeracion.src
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={12}>
                                                            <div className="bordediviconomotorelectrico">
                                                                <img
                                                                    className="tamañoimagensedamotorelectrico"
                                                                    onMouseOver={
                                                                        mostrarSistdeElectricoMotorEstacaSencilla
                                                                    }
                                                                    onMouseOut={
                                                                        cerrarSistdeElectricoMotorEstacaSencilla
                                                                    }
                                                                    onClick={() =>
                                                                        prdElectricoMotorEstacaSencilla()
                                                                    }
                                                                    src={
                                                                        showsistemaelectricomotor.src
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={12}>
                                                            <div className="bordediviconomotorelectrico">
                                                                <img
                                                                    className="tamañoimagensedamotorelectrico"
                                                                    onMouseOver={
                                                                        mostrarSistdearranqueEstacaSencilla
                                                                    }
                                                                    onMouseOut={
                                                                        cerrarSistdearranqueEstacaSencilla
                                                                    }
                                                                    onClick={() =>
                                                                        prdArranqueEstacaSencilla()
                                                                    }
                                                                    src={
                                                                        showarranque.src
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={12}>
                                                            <div className="bordediviconomotorelectrico">
                                                                <img
                                                                    className="tamañoimagensedamotorelectrico"
                                                                    onMouseOver={
                                                                        mostrarSistdeEscapeEstacaSencilla
                                                                    }
                                                                    onMouseOut={
                                                                        cerrarSistdeEscapeEstacaSencilla
                                                                    }
                                                                    onClick={() =>
                                                                        prdEscapeEstacaSencilla()
                                                                    }
                                                                    src={
                                                                        showescape.src
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={12}>
                                                            <div className="bordediviconomotorelectrico">
                                                                <img
                                                                    className="tamañoimagensedamotorelectrico"
                                                                    onMouseOver={
                                                                        mostrarAireAcondicionadoEstacaSencilla
                                                                    }
                                                                    onMouseOut={
                                                                        cerrarAireAcondicionadoEstacaSencilla
                                                                    }
                                                                    onClick={() =>
                                                                        prdAireacondicionadoEstacaSencilla()
                                                                    }
                                                                    src={
                                                                        showaireacondicionado.src
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={12}>
                                                            <div className="bordediviconomotorelectrico">
                                                                <img
                                                                    className="tamañoimagensedamotorelectrico"
                                                                    onMouseOver={
                                                                        mostrarSistmotorEstacaSencilla
                                                                    }
                                                                    onMouseOut={
                                                                        cerrarSistmotorEstacaSencilla
                                                                    }
                                                                    onClick={() =>
                                                                        prdMotorEstacaSencilla()
                                                                    }
                                                                    src={
                                                                        showMotor.src
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={12}>
                                                            <div className="bordediviconomotorelectrico">
                                                                <img
                                                                    className="tamañoimagensedamotorelectrico"
                                                                    onMouseOver={
                                                                        mostrarSistdeEmbragueEstacaSencilla
                                                                    }
                                                                    onMouseOut={
                                                                        cerrarSistdeEmbragueEstacaSencilla
                                                                    }
                                                                    onClick={() =>
                                                                        prdEmbragueEstacaSencilla()
                                                                    }
                                                                    src={
                                                                        showembrague.src
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </div>
                                            {
                                                //AQUI
                                            }
                                            <FuncionMotorElectrico
                                                showCaja={showCaja}
                                                showSistmotor={showSistmotor}
                                                showAirecondicionado={
                                                    showAirecondicionado
                                                }
                                                showDireccion={showDireccion}
                                                showImagenMtrElect={
                                                    showImagenMtrElect
                                                }
                                                showRefrigeracioncaja={
                                                    showRefrigeracioncaja
                                                }
                                                showSistdearranque={
                                                    showSistdearranque
                                                }
                                                showSistdeEmbrague={
                                                    showSistdeEmbrague
                                                }
                                                showSistdeEscape={
                                                    showSistdeEscape
                                                }
                                                showSistdeInyeccion={
                                                    showSistdeInyeccion
                                                }
                                                showSistdeRefrigeracion={
                                                    showSistdeRefrigeracion
                                                }
                                                showSistdeElectrico={
                                                    showSistdeElectrico
                                                }
                                                showSistdeElectricoMotor={
                                                    showSistdeElectricoMotor
                                                }
                                                showSuspension={showSuspension}
                                                showSistparabrisas={
                                                    showSistparabrisas
                                                }
                                                showSistTrasmision={
                                                    showSistTrasmision
                                                }
                                                onClickImagenMtrElect={
                                                    onClickImagenMtrElect
                                                }
                                                onClickMotor={onClickMotor}
                                                onClickTransmision={
                                                    onClickTransmision
                                                }
                                                onClickFrenos={onClickFrenos}
                                                onClickDireccion={
                                                    onClickDireccion
                                                }
                                                onClickSuspension={
                                                    onClickSuspension
                                                }
                                                onClickCaja={onClickCaja}
                                                onClickEmbrague={
                                                    onClickEmbrague
                                                }
                                                onClickInyeccion={
                                                    onClickInyeccion
                                                }
                                                onClickRefrigeracion={
                                                    onClickRefrigeracion
                                                }
                                                onClickRefrigeracionCaja={
                                                    onClickRefrigeracionCaja
                                                }
                                                onClickEscape={onClickEscape}
                                                onClickAirecondicionado={
                                                    onClickAirecondicionado
                                                }
                                                onClickElectrico={
                                                    onClickElectrico
                                                }
                                                onClickSistdeArranque={
                                                    onClickSistdeArranque
                                                }
                                                onClickSistdeParabrisas={
                                                    onClickSistdeParabrisas
                                                }
                                                onClickElectricoMotor={
                                                    onClickElectricoMotor
                                                }
                                                imagenmotormotorelectrico={
                                                    motormotorelectrico
                                                }
                                                imagenaireacondicionadomotorelectrico={
                                                    aireacondicionadomotorelectrico
                                                }
                                                imagendireccionmotorelectrico={
                                                    direccionmotorelectrico
                                                }
                                                imagenfrenosmotorelectrico={
                                                    frenosmotorelectrico
                                                }
                                                imagenmotorcajamotorelectrico={
                                                    motorcajamotorelectrico
                                                }
                                                imagenrefrigeracioncajamotorelectrico={
                                                    refrigeracioncajamotorelectrico
                                                }
                                                imagensistemadearranquemotorelectrico={
                                                    sistemadearranquemotorelectrico
                                                }
                                                imagensistemadeembraguemotorelectrico={
                                                    sistemadeembraguemotorelectrico
                                                }
                                                imagensistemadeescapemotorelectrico={
                                                    sistemadeescapemotorelectrico
                                                }
                                                imagensistemadeinyeccionmotorelectrico={
                                                    sistemadeinyeccionmotorelectrico
                                                }
                                                imagensistemaderefrigeracionmotorelectrico={
                                                    sistemaderefrigeracionmotorelectrico
                                                }
                                                imagensistemaelectricogeneral={
                                                    sistemaelectricogeneral
                                                }
                                                imagensistemaelectricomotorelectrico={
                                                    sistemaelectricomotorelectrico
                                                }
                                                imagensuspensionmotorelectrico={
                                                    suspensionmotorelectrico
                                                }
                                                imagenparabrisasmotorelectrico={
                                                    parabrisasmotorelectrico
                                                }
                                                imagensistematrasmision={
                                                    sistematrasmision
                                                }
                                                imagenBase={imagenBase}
                                                showFrenos={showFrenos}
                                            />
                                            {
                                                //CONTINUA ICONOS
                                            }
                                            <div className="col-md-1 posiciontres ml-520">
                                                <Col xs lg={1}>
                                                    <Row xs={2} md={4} lg={12}>
                                                        <Col xs lg={12}>
                                                            <div className="bordediviconomotorelectrico">
                                                                <img
                                                                    className="tamañoimagensedamotorelectrico"
                                                                    onMouseOver={
                                                                        mostrarRefrigeracioncajaEstacaSencilla
                                                                    }
                                                                    onMouseOut={
                                                                        cerrarRefrigeracioncajaEstacaSencilla
                                                                    }
                                                                    onClick={() =>
                                                                        prdEnframientoMotorEstacaSencilla()
                                                                    }
                                                                    src={
                                                                        showrefrigeracioncaja.src
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={12}>
                                                            <div className="bordediviconomotorelectrico">
                                                                <img
                                                                    className="tamañoimagensedamotorelectrico"
                                                                    onMouseOver={
                                                                        mostrarMotorcajaEstacaSencilla
                                                                    }
                                                                    onMouseOut={
                                                                        cerrarMotorcajaEstacaSencilla
                                                                    }
                                                                    onClick={() =>
                                                                        prdCajaMotorEstacaSencilla()
                                                                    }
                                                                    src={
                                                                        showcaja.src
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={12}>
                                                            <div className="bordediviconomotorelectrico">
                                                                <img
                                                                    className="tamañoimagensedamotorelectrico"
                                                                    onMouseOver={
                                                                        mostrarSistTrasmisionEstacaSencilla
                                                                    }
                                                                    onMouseOut={
                                                                        cerrarSistTrasmisionEstacaSencilla
                                                                    }
                                                                    onClick={() =>
                                                                        prdTrasmisionEstacaSencilla()
                                                                    }
                                                                    src={
                                                                        showtransmision.src
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={12}>
                                                            <div className="bordediviconomotorelectrico">
                                                                <img
                                                                    className="tamañoimagensedamotorelectrico"
                                                                    onMouseOver={
                                                                        mostrarDireccionEstacaSencilla
                                                                    }
                                                                    onMouseOut={
                                                                        cerrarDireccionEstacaSencilla
                                                                    }
                                                                    onClick={() =>
                                                                        prdDireccionEstacaSencilla()
                                                                    }
                                                                    src={
                                                                        showdireccion.src
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={12}>
                                                            <div className="bordediviconomotorelectrico">
                                                                <img
                                                                    className="tamañoimagensedamotorelectrico"
                                                                    onMouseOver={
                                                                        mostrarFrenosEstacaSencilla
                                                                    }
                                                                    onMouseOut={
                                                                        cerrarFrenosEstacaSencilla
                                                                    }
                                                                    onClick={() =>
                                                                        prdFrenosEstacaSencilla()
                                                                    }
                                                                    src={
                                                                        showfrenos.src
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={12}>
                                                            <div className="bordediviconomotorelectrico">
                                                                <img
                                                                    className="tamañoimagensedamotorelectrico"
                                                                    onMouseOver={
                                                                        mostrarSuspensionEstacaSencilla
                                                                    }
                                                                    onMouseOut={
                                                                        cerrarSuspensionEstacaSencilla
                                                                    }
                                                                    onClick={() =>
                                                                        prdSuspensionEstacaSencilla()
                                                                    }
                                                                    src={
                                                                        showsuspension.src
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={12}>
                                                            <div className="bordediviconomotorelectrico">
                                                                <img
                                                                    className="tamañoimagensedamotorelectrico"
                                                                    onMouseOver={
                                                                        mostrarSistparabrisasEstacaSencilla
                                                                    }
                                                                    onMouseOut={
                                                                        cerrarSistparabrisasEstacaSencilla
                                                                    }
                                                                    onClick={() =>
                                                                        prdParabrisasEstacaSencilla()
                                                                    }
                                                                    src={
                                                                        showparabrisas.src
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={12}>
                                                            <div className="bordediviconomotorelectrico">
                                                                <img
                                                                    className="tamañoimagensedamotorelectrico"
                                                                    onMouseOver={
                                                                        mostrarSistdeElectricoEstacaSencilla
                                                                    }
                                                                    onMouseOut={
                                                                        cerrarSistdeElectricoEstacaSencilla
                                                                    }
                                                                    onClick={() =>
                                                                        prdElectricoVehiculoEstacaSencilla()
                                                                    }
                                                                    src={
                                                                        showsistemaelectrico.src
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </div>
                                        </div>
                                    </Row>
                                </div>
                            </div>
                            <img
                                className="espaciologomrmotorelectrico"
                                src={logo.src}
                                alt="First slide"
                            />
                            <br />

                            <div className="mtmenos64 ml-110">
                                {partesTrenMotrizSeleccionada.length > 0 &&
                                maximizarOption == 0 ? (
                                    <Row>
                                        <Col xl={10} lg={10} md={10} sm={10}>
                                            <h3 className="titulosistemasseleccionados">
                                                Sistemas seleccionados
                                            </h3>
                                        </Col>
                                    </Row>
                                ) : null}

                                {maximizarOption == 0
                                    ? partesTrenMotrizSeleccionada &&
                                      partesTrenMotrizSeleccionada.map(
                                          (part, index) => {
                                              return (
                                                  <div className="row">
                                                      <div className="col">
                                                          {index == 0 ? (
                                                              <div>
                                                                  <a
                                                                      onClick={() =>
                                                                          eliminarElemento(
                                                                              index
                                                                          )
                                                                      }>
                                                                      <i
                                                                          class="colortamañoiconoborrarselect
                                                            fa fa-times-circle-o"
                                                                          aria-hidden="true"></i>
                                                                  </a>

                                                                  <img
                                                                      className="tamañoiconoseleccionado"
                                                                      src={
                                                                          part
                                                                              .imagen
                                                                              .src
                                                                      }
                                                                      alt="First slide"
                                                                  />
                                                              </div>
                                                          ) : null}
                                                          {index == 1 ? (
                                                              <div className="posicioniconoseleccionado">
                                                                  <a
                                                                      onClick={() =>
                                                                          eliminarElemento(
                                                                              index
                                                                          )
                                                                      }>
                                                                      <i
                                                                          class="colortamañoiconoborrarselect
                                                            fa fa-times-circle-o"
                                                                          aria-hidden="true"></i>
                                                                  </a>

                                                                  <img
                                                                      className="tamañoiconoseleccionado"
                                                                      src={
                                                                          part
                                                                              .imagen
                                                                              .src
                                                                      }
                                                                      alt="First slide"
                                                                  />
                                                              </div>
                                                          ) : null}
                                                          {index == 2 ? (
                                                              <div className="posicioniconoseleccionadodos">
                                                                  <a
                                                                      onClick={() =>
                                                                          eliminarElemento(
                                                                              index
                                                                          )
                                                                      }>
                                                                      <i
                                                                          class="colortamañoiconoborrarselect
                                                            fa fa-times-circle-o"
                                                                          aria-hidden="true"></i>
                                                                  </a>

                                                                  <img
                                                                      className="tamañoiconoseleccionado"
                                                                      src={
                                                                          part
                                                                              .imagen
                                                                              .src
                                                                      }
                                                                      alt="First slide"
                                                                  />
                                                              </div>
                                                          ) : null}
                                                          {index == 3 ? (
                                                              <div className="posicioniconoseleccionadotres">
                                                                  <a
                                                                      onClick={() =>
                                                                          eliminarElemento(
                                                                              index
                                                                          )
                                                                      }>
                                                                      <i
                                                                          class="colortamañoiconoborrarselect
                                                            fa fa-times-circle-o"
                                                                          aria-hidden="true"></i>
                                                                  </a>

                                                                  <img
                                                                      className="tamañoiconoseleccionado"
                                                                      src={
                                                                          part
                                                                              .imagen
                                                                              .src
                                                                      }
                                                                      alt="First slide"
                                                                  />
                                                              </div>
                                                          ) : null}
                                                      </div>
                                                  </div>
                                              );
                                          }
                                      )
                                    : null}
                            </div>
                            {partesTrenMotrizSeleccionada.length > 0 ? (
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12}>
                                        <h1 className="textobuscadorimagenesmotorelectricodos">
                                            ** Las imágenes a continuación son
                                            con fines ilustrativos, por ello
                                            pueden no corresponder exactamente
                                            con tu vehículo.
                                        </h1>
                                    </Col>
                                </Row>
                            ) : (
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12}>
                                        <h1 className="textobuscadorimagenesmotorelectrico">
                                            ** Las imágenes a continuación son
                                            con fines ilustrativos, por ello
                                            pueden no corresponder exactamente
                                            con tu vehículo.
                                        </h1>
                                    </Col>
                                </Row>
                            )}
                        </div>
                    ) : null}

                    {maximizarOption != 0 ? (
                        <div className="fijarfiltros mt-90 maximizarbusquedafiltros">
                            <SidebarShopInteractiveSearch />
                        </div>
                    ) : null}
                </div>

                {isLoading ? <LoadingMotorEectrico /> : null}

                <div className={zoomBusquedaProductos}>
                    <div className="espacioiconosderechamotorelectrico">
                        <SearchInteractiveItems
                            productoBuscar={productoBuscar}
                            zoomTipoVehiculo={zoomTipoVehiculo}
                            setZoomTipoVehiculo={setZoomTipoVehiculo}
                            zoomBusquedaProductos={zoomBusquedaProductos}
                            setZoomBusquedaProductos={setZoomBusquedaProductos}
                            zoomBusquedaItems={zoomBusquedaItems}
                            setZoomBusquedaItems={setZoomBusquedaItems}
                            setOptionSelect={setOptionSelect}
                            optionSelect={optionSelect}
                            setMaximizarOption={setMaximizarOption}
                            maximizarOption={maximizarOption}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default SearchInteractiveMotorElectrico;

function FuncionMotorElectrico(props) {
    const {
        showCaja,
        showSistmotor,
        showAirecondicionado,
        showDireccion,
        showImagenMtrElect,
        showRefrigeracioncaja,
        showSistdearranque,
        showSistdeEmbrague,
        showSistdeEscape,
        showSistdeInyeccion,
        showSistdeRefrigeracion,
        showSistdeElectrico,
        showSistdeElectricoMotor,
        showSuspension,
        showSistparabrisas,
        showSistTrasmision,
        onClickImagenMtrElect,
        onClickMotor,
        onClickTransmision,
        onClickFrenos,
        onClickDireccion,
        onClickSuspension,
        onClickCaja,
        onClickEmbrague,
        onClickInyeccion,
        onClickRefrigeracion,
        onClickRefrigeracionCaja,
        onClickEscape,
        onClickAirecondicionado,
        onClickElectrico,
        onClickSistdeArranque,
        onClickSistdeParabrisas,
        onClickElectricoMotor,
        imagenmotormotorelectrico,
        imagenaireacondicionadomotorelectrico,
        imagendireccionmotorelectrico,
        imagenfrenosmotorelectrico,
        imagenmotorcajamotorelectrico,
        imagenrefrigeracioncajamotorelectrico,
        imagensistemadearranquemotorelectrico,
        imagensistemadeembraguemotorelectrico,
        imagensistemadeescapemotorelectrico,
        imagensistemadeinyeccionmotorelectrico,
        imagensistemaderefrigeracionmotorelectrico,
        imagensistemaelectricogeneral,
        imagensistemaelectricomotorelectrico,
        imagensuspensionmotorelectrico,
        imagenparabrisasmotorelectrico,
        imagensistematrasmision,
        imagenBase,
        showFrenos,
    } = props;

    return (
        <div>
            <div className="mlmenos50 col-md-10 posiciondos">
                <Col xs lg={10}>
                    {!onClickImagenMtrElect ? (
                        showImagenMtrElect ? (
                            <Row>
                                <Col xs lg={12}>
                                    <div className="cajaimagenesmotorelectricocamionetasencillachasis pt-9">
                                        <h2 className="mt-59 seccionesvehiculotexto"></h2>
                                        <img src={imagenBase.src} />
                                    </div>
                                </Col>
                            </Row>
                        ) : showSistmotor ? (
                            <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                                <h2 className="seccionesvehiculotexto">
                                    Sistema motor
                                </h2>
                                <img src={imagenmotormotorelectrico.src} />
                            </div>
                        ) : showAirecondicionado ? (
                            <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                                <h2 className="seccionesvehiculotexto">
                                    Sistema de aire acondicionado
                                </h2>
                                <img
                                    src={
                                        imagenaireacondicionadomotorelectrico.src
                                    }
                                />
                            </div>
                        ) : showDireccion ? (
                            <div className="cajaimagenesmotorelectricocamionetasencillachasis espaciosuperior">
                                <div className=" espaciosuperior">
                                    <h2 className="seccionesvehiculotexto">
                                        Sistema de dirección
                                    </h2>
                                    <img
                                        src={imagendireccionmotorelectrico.src}
                                    />
                                </div>
                            </div>
                        ) : showFrenos ? (
                            <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                                <h2 className="seccionesvehiculotexto">
                                    Sistema de frenos
                                </h2>
                                <img src={imagenfrenosmotorelectrico.src} />
                            </div>
                        ) : showCaja ? (
                            <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                                <h2 className="seccionesvehiculotexto">
                                    Sistema de caja
                                </h2>
                                <img src={imagenmotorcajamotorelectrico.src} />
                            </div>
                        ) : showRefrigeracioncaja ? (
                            <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                                <h2 className="seccionesvehiculotexto">
                                    Sistema de refrigeración de caja
                                </h2>
                                <img
                                    src={
                                        imagenrefrigeracioncajamotorelectrico.src
                                    }
                                />
                            </div>
                        ) : showSistdearranque ? (
                            <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                                <h2 className="seccionesvehiculotexto">
                                    Sistema de arranque
                                </h2>
                                <img
                                    src={
                                        imagensistemadearranquemotorelectrico.src
                                    }
                                />
                            </div>
                        ) : showSistdeEmbrague ? (
                            <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                                <h2 className="seccionesvehiculotexto">
                                    Sistema de embrague
                                </h2>
                                <img
                                    src={
                                        imagensistemadeembraguemotorelectrico.src
                                    }
                                />
                            </div>
                        ) : showSistdeEscape ? (
                            <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                                <div className=" espaciosuperior">
                                    <h2 className="seccionesvehiculotexto">
                                        Sistema de escape
                                    </h2>
                                    <img
                                        src={
                                            imagensistemadeescapemotorelectrico.src
                                        }
                                    />
                                </div>
                            </div>
                        ) : showSistdeInyeccion ? (
                            <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                                <h2 className="seccionesvehiculotexto">
                                    Sistema de inyección
                                </h2>
                                <img
                                    src={
                                        imagensistemadeinyeccionmotorelectrico.src
                                    }
                                />
                            </div>
                        ) : showSistdeRefrigeracion ? (
                            <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                                <h2 className="seccionesvehiculotexto">
                                    Sistema de refrigeración motor
                                </h2>
                                <img
                                    src={
                                        imagensistemaderefrigeracionmotorelectrico.src
                                    }
                                />
                            </div>
                        ) : showSistdeElectrico ? (
                            <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                                <h2 className="seccionesvehiculotexto">
                                    Sistema eléctrico accesorios
                                </h2>
                                <img src={imagensistemaelectricogeneral.src} />
                            </div>
                        ) : showSistdeElectricoMotor ? (
                            <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                                <h2 className="seccionesvehiculotexto">
                                    Sistema eléctrico motor
                                </h2>
                                <img
                                    src={
                                        imagensistemaelectricomotorelectrico.src
                                    }
                                />
                            </div>
                        ) : showSuspension ? (
                            <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                                <h2 className="seccionesvehiculotexto">
                                    Sistema de suspensión
                                </h2>
                                <img src={imagensuspensionmotorelectrico.src} />
                            </div>
                        ) : showSistparabrisas ? (
                            <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                                <h2 className="seccionesvehiculotexto">
                                    Sistema de limpiaparabrisas
                                </h2>
                                <img src={imagenparabrisasmotorelectrico.src} />
                            </div>
                        ) : showSistTrasmision ? (
                            <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                                <h2 className="seccionesvehiculotexto">
                                    Sistema de transmisión
                                </h2>
                                <img src={imagensistematrasmision.src} />
                            </div>
                        ) : null
                    ) : onClickMotor ? (
                        <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                            <h2 className="seccionesvehiculotexto">
                                Sistema motor
                            </h2>
                            <EstacaSencillaMotorElectrico motorelectrico={"1"} />
                        </div>
                    ) : onClickTransmision ? (
                        <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                            <h2 className="seccionesvehiculotexto">
                                Sistema de transmisión
                            </h2>
                            <EstacaSencillaMotorElectrico motorelectrico={"2"} />
                        </div>
                    ) : onClickFrenos ? (
                        <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                            <h2 className="seccionesvehiculotexto">
                                sistema de frenos
                            </h2>
                            <EstacaSencillaMotorElectrico motorelectrico={"3"} />
                        </div>
                    ) : onClickDireccion ? (
                        <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                            <h2 className="seccionesvehiculotexto">
                                Sistema de dirección
                            </h2>
                            <EstacaSencillaMotorElectrico motorelectrico={"4"} />
                        </div>
                    ) : onClickSuspension ? (
                        <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                            <h2 className="seccionesvehiculotexto">
                                sistema de suspensión
                            </h2>
                            <EstacaSencillaMotorElectrico motorelectrico={"5"} />
                        </div>
                    ) : onClickCaja ? (
                        <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                            <h2 className="seccionesvehiculotexto">
                                Sistema de caja
                            </h2>
                            <EstacaSencillaMotorElectrico motorelectrico={"6"} />
                        </div>
                    ) : onClickEmbrague ? (
                        <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                            <h2 className="seccionesvehiculotexto">
                                Sistema de embrague
                            </h2>
                            <EstacaSencillaMotorElectrico motorelectrico={"7"} />
                        </div>
                    ) : onClickInyeccion ? (
                        <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                            <h2 className="seccionesvehiculotexto">
                                sistema de inyección
                            </h2>
                            <EstacaSencillaMotorElectrico motorelectrico={"8"} />
                        </div>
                    ) : onClickRefrigeracion ? (
                        <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                            <h2 className="seccionesvehiculotexto">
                                sistema Refrigeración motor
                            </h2>
                            <EstacaSencillaMotorElectrico motorelectrico={"9"} />
                        </div>
                    ) : onClickRefrigeracionCaja ? (
                        <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                            <h2 className="seccionesvehiculotexto">
                                Sistema de refrigeración de caja
                            </h2>
                            <EstacaSencillaMotorElectrico motorelectrico={"10"} />
                        </div>
                    ) : onClickEscape ? (
                        <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                            <h2 className="seccionesvehiculotexto">
                                Sistema de escape
                            </h2>
                            <EstacaSencillaMotorElectrico motorelectrico={"11"} />
                        </div>
                    ) : onClickAirecondicionado ? (
                        <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                            <h2 className="seccionesvehiculotexto">
                                Sistema de aire acondicionado
                            </h2>
                            <EstacaSencillaMotorElectrico motorelectrico="12" />
                        </div>
                    ) : onClickElectrico ? (
                        <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                            <h2 className="seccionesvehiculotexto">
                                Sistema eléctrico accesorios
                            </h2>
                            <EstacaSencillaMotorElectrico motorelectrico={"13"} />
                        </div>
                    ) : onClickSistdeArranque ? (
                        <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                            <h2 className="seccionesvehiculotexto">
                                Sistema de arranque
                            </h2>
                            <EstacaSencillaMotorElectrico motorelectrico={"14"} />
                        </div>
                    ) : onClickSistdeParabrisas ? (
                        <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                            <h2 className="seccionesvehiculotexto">
                                Sistema de limpiaparabrisas
                            </h2>
                            <EstacaSencillaMotorElectrico motorelectrico={"15"} />
                        </div>
                    ) : onClickElectricoMotor ? (
                        <div className="cajaimagenesmotorelectricocamionetasencillachasis">
                            <h2 className="seccionesvehiculotexto">
                                Sistema eléctrico motor
                            </h2>
                            <EstacaSencillaMotorElectrico motorelectrico={"16"} />
                        </div>
                    ) : null}
                </Col>
            </div>
        </div>
    );
}
