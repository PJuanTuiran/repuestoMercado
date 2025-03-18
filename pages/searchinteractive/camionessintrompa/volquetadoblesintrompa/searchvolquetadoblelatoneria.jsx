import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import SelectedVehicle from "../../selectedvehicle";
import CloseIcon from "@material-ui/icons/Close";
//Importafotos
import volquetadoblegris from "~/public/buscadorinteractivo/camionessintrompa/volquetadoblesintrompa/exterior/basegris.jpg";
import { getDataSelectedExternal } from "../../../../store/dataselectedexternal/action";
//import SearchInteractive from "../../../search/searchinteractive.jsx";
import logo from "../../../../public/imgcarrusel/sedan/nombrelogomr.png";
import SearchInteractiveItems from "../../../search/searchinteractiveitems";
import SidebarShopInteractiveSearch from "~/components/shared/sidebar/SidebarShopInteractiveSearch";

const SearchInteractiveDobleTrompa = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [productoBuscar, setProductoBuscar] = useState("BMW");

    //Definie variables para zoom de tipos de vehículos y busqueda de productos
    const [zoomTipoVehiculo, setZoomTipoVehiculo] = useState("col-md-6");
    const [zoomBusquedaProductos, setZoomBusquedaProductos] =
        useState("col-md-6");
    const [zoomBusquedaItems, setZoomBusquedaItems] = useState("");
    const [optionSelect, setOptionSelect] = useState(0);
    const [maximizarOption, setMaximizarOption] = useState(0);

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

    // Asignamos Datos al arreglo de Tipos de Vehiculos desde el state
    const tiposvehiculos = useSelector(
        (state) => state.typesvehicles.typesvehicles
    );
    // Asignamos Datos al arrego de Marcas de Vehiculos desde el state
    const marcasvehiculos = useSelector(
        (state) => state.vehiclesbrands.vehiclesbrands
    );
    // Asignamos Datos al arrego de Años de los Vehiculos desde el state
    const annosvehiculos = useSelector(
        (state) => state.yearsvehicles.yearsvehicles
    );
    // Asignamos Datos al arrego de modelos segun marca de los Vehiculos desde el state
    const modelosvehiculos = useSelector(
        (state) => state.modelsvehicles.modelsvehicles
    );
    // Asignamos Datos al arrego de carrocerias segun tipo de Vehiculos desde el state
    const carroceriasvehiculos = useSelector(
        (state) => state.bodiesvehicles.bodiesvehicles
    );
    // Asignamos Datos seleccionado en el buscador interactivo
    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );
    //console.log("DATOS BUSCADOR : ", datosbuscadorinteractivo);
    const [controlFijar, setControlFijar] = useState("mt-50");
    const [closeWindow, setCloseWindow] = useState(false);

    const mostrarComentariolatoneria = () => {
        setShowModalComentariosLatoneria(true);
    };

    const mostrarComentariohabitaculo = () => {
        setShowModalComentariosHabitaculo(true);
    };

    const mostrarComentariomotor = () => {
        setShowModalComentariosMotor(true);
    };

    const seleccionaUbicarProductoLatoneriaIzquierda = () => {
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Latoneria - izquierda")
        );
        const DatoSeleccionadoLatoneria = {
            exterior: 1,
        };

        console.log(`SELECCIONO LADO IZQUIERDO : `, DatoSeleccionadoLatoneria);
        dispatch(getDataSelectedExternal(DatoSeleccionadoLatoneria));
        router.push(
            "/searchinteractive/camionessintrompa/volquetadoblesintrompa/searchvolquetadoblelatoneriaizquierda"
        );
    };

    const seleccionaUbicarProductoLatoneriaCentro = () => {
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Latoneria - centro")
        );
        const DatoSeleccionadoLatoneria = {
            exterior: 2,
        };

        //console.log(`SELECCIONO EL CENTRO : `, DatoSeleccionadoLatoneria);
        dispatch(getDataSelectedExternal(DatoSeleccionadoLatoneria));
        router.push(
            "/searchinteractive/camionessintrompa/volquetadoblesintrompa/searchvolquetadoblelatoneriacentro"
        );
    };

    const seleccionaUbicarProductoLatoneriaDerecha = () => {
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Latoneria - derecha")
        );
        const DatoSeleccionadoLatoneria = {
            exterior: 3,
        };

        //console.log(`DATOS BUSCADOR INTERACTIVO : `, DatoSeleccionadoLatoneria);
        dispatch(getDataSelectedExternal(DatoSeleccionadoLatoneria));
        router.push(
            "/searchinteractive/camionessintrompa/volquetadoblesintrompa/searchvolquetadoblelatoneriaderecha"
        );
    };

    const seleccionaUbicarProductoLatoneria = () => {};

    const seleccionaUbicarProductoHabitaculo = () => {
        router.push(
            "/searchinteractive/camionessintrompa/volquetadoblesintrompa/searchvolquetadoblehabitaculo"
        );
    };

    const seleccionaUbicarProductoMotorElectrico = () => {
        router.push(
            "/searchinteractive/camionessintrompa/volquetadoblesintrompa/searchvolquetadoblemotorelectrico"
        );
    };

    useEffect(() => {
        if (maximizarOption != 0) setControlFijar("mt-20 fijardatosvehiculo");
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

    // Lee de la base de datos los años de los Vehiculos
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

                            <div className="ml-20">
                                <SelectedVehicle />
                                <Row>
                                    <Col xs lg={11}>
                                        <ButtonGroup>
                                            <div className="espaciosuperiorbordecarroceriasedan">
                                                <Row>
                                                    <Col xs lg={2}>
                                                        <Button
                                                            className="botoncarroceriasedanseleccionada"
                                                            variant="outline-light">
                                                            Exterior
                                                        </Button>
                                                    </Col>
                                                    <Col xs lg={2}>
                                                        <Button
                                                            className="informacionbotoncarroceriasedanseleccionada"
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
                                                            className="botoncarroceriaexterior"
                                                            variant="outline-light"
                                                            onClick={
                                                                seleccionaUbicarProductoHabitaculo
                                                            }>
                                                            Interior
                                                        </Button>
                                                    </Col>
                                                    <Col xs lg={2}>
                                                        <Button
                                                            className="informacionbotoncarroceriaexterior"
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
                                                            className="botoncarroceriatrenmotriz"
                                                            variant="outline-light"
                                                            onClick={
                                                                seleccionaUbicarProductoMotorElectrico
                                                            }>
                                                            Tren Motriz
                                                        </Button>
                                                    </Col>
                                                    <Col xs lg={2}>
                                                        <Button
                                                            className="informacionbotontrenmotriz"
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
                            <div className="mt-3 centrartextosexterior">
                                Elige en que parte del exterior está ubicado tu repuesto
                            </div>
                            <Row>
                                <Col xs lg={11}>
                                    <ButtonGroup>
                                        <div className="espaciosuperiorbordecarroceriasedan">
                                            <Row>
                                            <Col xs={3} md={3} lg={3}>
                                                    {/*
                                                    <Button
                                                        className="botoncarroceriaexteriorizquierdaeit"
                                                        variant="outline-light"
                                                        onClick={
                                                            seleccionaUbicarProductoLatoneriaIzquierda
                                                        }>
                                                        Izquierda
                                                    </Button>
                                                    */}
                                                </Col>
                                                <Col xs={2} md={2} lg={2}>
                                                    {/*
                                                    <Button
                                                        className="informacionbotoncarroceriacdidos"
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
                                                    */}
                                                </Col>

                                                <Col xs={3} md={3} lg={3} className="ml-13" >
                                                    <Button
                                                        className="botoncarrocerialatoneriacentroeit"
                                                        variant="outline-light"
                                                        onClick={
                                                            seleccionaUbicarProductoLatoneriaCentro
                                                        }>
                                                        Unica selección
                                                    </Button>
                                                </Col>
                                                <Col xs={2} md={2} lg={2}>
                                                    <Button
                                                        className="informacionbotonarticuladostrompa"
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
                                                    {/*
                                                    <Button
                                                        className="botoncarrocerialatoneriaderechaeit"
                                                        variant="outline-light"
                                                        onClick={
                                                            seleccionaUbicarProductoLatoneriaDerecha
                                                        }>
                                                        Derecha
                                                    </Button>
                                                    */}
                                                </Col>
                                                <Col xs lg={2}>
                                                    {/*
                                                    <Button
                                                        className="informacionbotonlatoneriaderechacdidos"
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
                                                */}
                                                </Col>
                                            </Row>
                                        </div>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <div className="cajaimagenlatoneriachasissencillo">
                                <div className="auth__box-logo">
                                    <img src={volquetadoblegris.src} />
                                </div>
                            </div>
                            <Row>
                                <Col xs={8} sm={8} md={8} lg={8}>
                                    <h1 className="textobuscadorintecractivomessage">
                                        ** Las imágenes a continuación son con
                                        fines ilustrativos, por ello pueden no
                                        corresponder exactamente con tu
                                        vehículo.
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
                        </div>
                    ) : null}

                    {maximizarOption != 0 ? (
                        <div className="fijarfiltros mt-90 maximizarbusquedafiltros">
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
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default SearchInteractiveDobleTrompa;
