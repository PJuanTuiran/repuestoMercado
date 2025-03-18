import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SelectedVehicle from "../../selectedvehicle";
import { getTypesVehicles } from "../../../../store/typesvehicles/action";
import TypesVehiclesRepository from "~/repositories/TypesVehiclesRepository";
import CloseIcon from "@material-ui/icons/Close";

import { getYearsVehicles } from "../../../../store/yearsvehicles/action";
import YearsVehiclesRepository from "~/repositories/YearsVehiclesRepository";
import logo from "../../../../public/imgcarrusel/sedan/nombrelogomr.png";
import SearchInteractiveItems from "../../../search/searchinteractiveitems";
import SidebarShopInteractiveSearch from "~/components/shared/sidebar/SidebarShopInteractiveSearch";
import WidgetFilterByPriceRangeInteractive from "~/components/shared/widgets/WidgetFilterByPriceRangeInteractive";
import Alert from "react-bootstrap/Alert";

const SearchInteractiveVolquetaDoble = (props) => {
    const router = useRouter();
    //const videoSCR = Car;
    const [tipos, setTipos] = useState(false);
    const dispatch = useDispatch();
    const [productoBuscar, setProductoBuscar] = useState("Chevrolet");

    //Definie variables para zoom de tipos de vehículos y busqueda de productos
    const [zoomTipoVehiculo, setZoomTipoVehiculo] = useState("col-md-6");
    const [zoomBusquedaProductos, setZoomBusquedaProductos] =
        useState("col-md-6");
    const [zoomBusquedaItems, setZoomBusquedaItems] = useState("");
    const [optionSelect, setOptionSelect] = useState(0);
    const [maximizarOption, setMaximizarOption] = useState(0);
    const [zoom, setZoom] = useState(false);
    const [ubicarProductos, setUbicarProductos] = useState("");

    // Definicion Latoneria
    const [showModalComentariosLatoneria, setShowModalComentariosLatoneria] =
        useState(false);
    const [ubicarProductoLatoneria, setUbicarProductoLatoneria] =
        useState(false);
    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(false);
    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);

    // Definicion Habitácuolo
    const [showModalHabitaculo, setShowModalhabitaculo] = useState(false);
    const [showModalComentariosHabitaculo, setShowModalComentariosHabitaculo] =
        useState(false);

    // Definición Motor Eléctrico
    const [showModalMotorElectrico, setShowModalMotorElectrico] =
        useState(false);
    const [showModalComentariosMotor, setShowModalComentariosMotor] =
        useState(false);
    const [controlFijar, setControlFijar] = useState("mt-50");
    const [closeWindow, setCloseWindow] = useState(false);

    // Inicializamos el arrego de Tipos de Vehiculos
    const [vehiculos, setVehiculos] = useState([]);
    // Arreglo tipos de Marcas de Vehiculos
    const [annos, setAnnos] = useState([]);
    // Arreglo modelos de los Vehiculos segun Marca Seleccionda

    let viewSearch = useSelector((state) => state.viewsearch.viewsearch);
    let selectviewprd = useSelector((state) => state.selectviewprd.selectviewprd);
    //console.log("VIEW SEARCH : ", selectviewprd);

    useEffect(() => {
        if (selectviewprd > 0 && viewSearch) {
            cerrarVenta();
        }
    }, [viewSearch, selectviewprd]);

    const mostrarComentariolatoneria = () => {
        setShowModalComentariosLatoneria(true);
    };

    const mostrarComentariohabitaculo = () => {
        setShowModalComentariosHabitaculo(true);
    };

    const mostrarComentariomotor = () => {
        setShowModalComentariosMotor(true);
    };

    const seleccionaUbicarProductoLatoneria = () => {
        setUbicarProductos("Latoneria ");
        localStorage.setItem("ubicacionproducto", JSON.stringify("Latoneria"));
        setUbicarProductoHabitaculo(false);
        setUbicarProductoMotor(false);
        router.push(
            "/searchinteractive/camionessintrompa/volquetadoblesintrompa/searchvolquetadoblelatoneria"
        );
    };

    const seleccionaUbicarProductoHabitaculo = () => {
        setShowModalhabitaculo(true);
        setUbicarProductos("Habitáculo ");
        localStorage.setItem("ubicacionproducto", JSON.stringify("Habitáculo"));
        setUbicarProductoLatoneria(false);
        setUbicarProductoMotor(false);
        router.push(
            "/searchinteractive/camionessintrompa/volquetadoblesintrompa/searchvolquetadoblehabitaculo"
        );
    };

    const seleccionaUbicarProductoMotorElectrico = () => {
        setUbicarProductos("Motor electrico ");
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Motor electrico")
        );
        setShowModalMotorElectrico(true);
        setUbicarProductoHabitaculo(false);
        setUbicarProductoLatoneria(false);
        router.push(
            "/searchinteractive/camionessintrompa/volquetadoblesintrompa/searchvolquetadoblemotorelectrico"
        );
    };

    useEffect(() => {
        if (maximizarOption != 0) setControlFijar("mt-20 fijardatosvehiculo");
        else setControlFijar("");
    }, [maximizarOption]);

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
            //location.reload();
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
                                        <div className="bordecajaiconcerrar apuntador   ">
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

                            <div className="ml-20">
                                <SelectedVehicle />
                                <div className="mt-3 centrartextosedankatoneria">
                                    Elige la ubicación de tu repuesto
                                </div>
                                <Row>
                                    <Col xs lg={11}>
                                        <ButtonGroup>
                                            <div className="espaciosposicionproductocarroceria">
                                                <Row>
                                                    <Col xs lg={2}>
                                                        <Button
                                                            className="botoncarroceriasedanlatoneriaeit"
                                                            variant="outline-light"
                                                            onClick={
                                                                seleccionaUbicarProductoLatoneria
                                                            }>
                                                            Exterior
                                                        </Button>
                                                    </Col>
                                                    <Col xs lg={2}>
                                                        <Button
                                                            className="informacionbotoncarroceriasedancdi"
                                                            variant="outline-light"
                                                            onClick={
                                                                mostrarComentariolatoneria
                                                            }>
                                                            {!ubicarProductoLatoneria ? (
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
                                                            className="botoncarroceriasedanlatoneriaeit"
                                                            variant="outline-light"
                                                            onClick={
                                                                seleccionaUbicarProductoHabitaculo
                                                            }>
                                                            Interior
                                                        </Button>
                                                    </Col>
                                                    <Col xs lg={2}>
                                                        <Button
                                                            className="informacionbotoncarroceriasedancdi"
                                                            variant="outline-light"
                                                            onClick={
                                                                mostrarComentariohabitaculo
                                                            }>
                                                            {!ubicarProductoHabitaculo ? (
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
                                                            className="botoncarroceriasedanlatoneriaeit"
                                                            variant="outline-light"
                                                            onClick={
                                                                seleccionaUbicarProductoMotorElectrico
                                                            }>
                                                            Tren Motriz
                                                        </Button>
                                                    </Col>
                                                    <Col xs lg={2}>
                                                        <Button
                                                            className="informacionbotoncarroceriasedancdi"
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
                            </div>
                            <div className="pt-41">
                                <div className="cajaimagenlatoneriachasissencillo">
                                    <video autoPlay="false">
                                        <source
                                            src="/buscadorinteractivo/camionessintrompa/volquetadoblesintrompa/volquetadobletroquesintrompa.mp4"
                                            type="video/mp4"></source>
                                    </video>
                                </div>
                            </div>
                            {maximizarOption == 0 ? (
                                <Row>
                                    <Col xs={8} sm={8} md={8} lg={8}>
                                        <h1 className="textobuscadorintecractivomessage">
                                            ** Las imágenes a continuación son
                                            con fines ilustrativos, por ello
                                            pueden no corresponder exactamente
                                            con tu vehículo.
                                        </h1>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        <img
                                            className="logobuscadormr"
                                            src={logo.src}
                                            alt="First slide"
                                        />
                                    </Col>
                                </Row>
                            ) : null}
                        </div>
                    ) : null}
                    {maximizarOption != 0 ? (
                         <div className="fijarfiltros maximizarbusquedafiltros">
                            <SidebarShopInteractiveSearch />
                        </div>
                    ) : null}
                </div>

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
                            zoom={zoom}
                            setZoom={setZoom}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default SearchInteractiveVolquetaDoble;
