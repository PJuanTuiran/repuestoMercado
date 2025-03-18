import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SelectedVehicle from "../selectedvehicle";
import CloseIcon from "@material-ui/icons/Close";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SearchInteractiveItems from "../../search/searchinteractiveitems";
import SidebarShopInteractiveSearch from "~/components/shared/sidebar/SidebarShopInteractiveSearch";
import logo from "../../../public/imgcarrusel/sedan/nombrelogomr.png";

//Importar Carrusel
import CoupeLatoneria from "../../CarruselVehiculos/CarruselCoupe/CoupeLatoneria";

let tipovehsel = 0;

const SearchInteractiveCoupeLatoneriaIzquierda = (props) => {
    const router = useRouter();
    const [productoBuscar, setProductoBuscar] = useState("BMW");

    //Definie variables para zoom de tipos de vehículos y busqueda de productos
    const [zoomTipoVehiculo, setZoomTipoVehiculo] = useState("col-md-6");
    const [zoomBusquedaProductos, setZoomBusquedaProductos] =
        useState("col-md-6");
    const [zoomBusquedaItems, setZoomBusquedaItems] = useState("");
    const [optionSelect, setOptionSelect] = useState(0);
    const [maximizarOption, setMaximizarOption] = useState(0);

    // Definicion Latoneria
    const [marcaBotonIzquierdo, setMarcaBotonIzquierdo] = useState(
        "bbotoncarroceriatrenmotriztres"
    );
    const [marcaBotonCentro, setMarcaBotonCentro] = useState(
        "bbotoncarroceriatrenmotriz"
    );
    const [marcaBotonDerecho, setMarcaBotonDerecho] = useState(
        "botoncarroceriatrenmotriz"
    );
    const [informacionMarcaBotonIzquierdo, setInformacionMarcaBotonIzquierdo] =
        useState("informacionbotoncarroceriasedan");
    const [informacionMarcaBotonCentro, setInformacionMarcaBotonCentro] =
        useState("informacionbotoncarroceriaexteriortres");
    const [informacionMarcaBotonDerecho, setInformacionMarcaBotonDerecho] =
        useState("informacionbotoncarroceriaexterior");

    const [showModalComentariosLatoneria, setShowModalComentariosLatoneria] =
        useState(false);
    const [ubicarProductoLatoneria, setUbicarProductoLatoneria] =
        useState(false);
    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(false);
    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);

    // Definicion Habitácuolo
    const [showModalComentariosHabitaculo, setShowModalComentariosHabitaculo] =
        useState(false);

    // Definición Motor Eléctrico
    const [showModalComentariosMotor, setShowModalComentariosMotor] =
        useState(false);
    // Asignamos Datos seleccionado en el buscador interactivo
    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );
    console.log("DATOS BUSCADOR : ", datosbuscadorinteractivo);

    // Asignamos Datos seleccionado en el exterior vehículo
    const datoseleccinoexterior = useSelector(
        (state) => state.dataselectedexternal.dataselectedexternal
    );

    const [controlFijar, setControlFijar] = useState("mt-50");
    const [closeWindow, setCloseWindow] = useState(false);

    console.log(
        "LADO DEL VEHICULO SELECCIONADO : ",
        datoseleccinoexterior.exterior
    );

    useEffect(() => {
        setMarcaBotonIzquierdo("botoncarroceriasedanseleccionada");
        setInformacionMarcaBotonIzquierdo(
            "informacionbotoncarroceriasedanseleccionada"
        );

        setMarcaBotonCentro("botoncarroceriatrenmotriz ml-3");
        setInformacionMarcaBotonCentro(
            "informacionbotoncarroceriaexteriortres"
        );

        setMarcaBotonDerecho("botoncarroceriatrenmotriz");
        setInformacionMarcaBotonDerecho("informacionbotoncarroceriaexterior");
    }, []);

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
        router.push(
            "/searchinteractive/coupe/searchcoupelatoneria"
        );
    };

    const seleccionaUbicarProductoHabitaculo = () => {
        router.push(
            "/searchinteractive/coupe/searchcoupehabitaculo"
        );
    };

    const seleccionaUbicarProductoMotorElectrico = () => {
        if (tipovehsel != 4) {
            router.push(
                "/searchinteractive/coupe/searchcoupemotorelectrico"
            );
        } else {
            router.push(
                "/searchinteractive/automoviltrespuertas/searchtrespuertassistemasvehelectrico"
            );
        }
    };

    useEffect(() => {
        tipovehsel = JSON.parse(localStorage.getItem("tipovehselect"));
    }, []); 

    const irLatoneriaIzquierda = () => {
        router.push(
            "/searchinteractive/coupe/searchcoupelatoneriaizquierda"
        );
    };

    const irLatoneriaCentro = () => {
        router.push(
            "/searchinteractive/coupe/searchcoupelatoneriacentro"
        );
    };

    const irLatoneriaDerecha = () => {
        router.push(
            "/searchinteractive/coupe/searchcoupelatoneriaderecha"
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
                            </div>

                            <Row>
                                <Col xs lg={11}>
                                    <ButtonGroup>
                                        <div className="espaciosposicionproductocarroceriaexterior">
                                            <Row>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className="botoncarroceriasedanseleccionada"
                                                        variant="outline-light"
                                                        onClick={
                                                            seleccionaUbicarProductoLatoneria
                                                        }>
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
                                                        className="informacionbotoncarroceriaexteriortres"
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
                                                        className="botoncarroceriaexteriorcentrodos"
                                                        variant="outline-light"
                                                        onClick={
                                                            seleccionaUbicarProductoMotorElectrico
                                                        }>
                                                        Tren Motriz
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className="informacionbotoncarroceriaexterior"
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
                            <div className="mt-3 centrartextosexterior">
                                Elige en que parte del exterior está ubicado tu
                                repuesto
                            </div>
                            <Row>
                                <Col xs lg={11}>
                                    <ButtonGroup>
                                        <div className="espaciosposicionproductocarroceriaexterior">
                                            <Row>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className={
                                                            marcaBotonIzquierdo
                                                        }
                                                        onClick={
                                                            irLatoneriaIzquierda
                                                        }
                                                        variant="outline-light">
                                                        Izquierda
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className={
                                                            informacionMarcaBotonIzquierdo
                                                        }
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
                                                        className={
                                                            marcaBotonCentro
                                                        }
                                                        onClick={
                                                            irLatoneriaCentro
                                                        }
                                                        variant="outline-light">
                                                        Centro
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className={
                                                            informacionMarcaBotonCentro
                                                        }
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
                                                        className={
                                                            marcaBotonDerecho
                                                        }
                                                        onClick={
                                                            irLatoneriaDerecha
                                                        }
                                                        variant="outline-light">
                                                        Derecha
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className={
                                                            informacionMarcaBotonDerecho
                                                        }
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
                            <Row>
                                <Col xs lg={7}>
                                    <div className="cajacoupeimagenlatoneria auth__box-logo">
                                        <CoupeLatoneria
                                            ubicacion={"izquierda"}
                                        />
                                    </div>
                                </Col>
                            </Row>
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

export default SearchInteractiveCoupeLatoneriaIzquierda;
