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
import gruahabitaculo from "~/public/buscadorinteractivo/camionessintrompa/gruasintrompa/interior/general.jpg";
import gruahabitaculoconsola from "~/public/buscadorinteractivo/camionessintrompa/gruasintrompa/interior/tablero.jpg";
import gruahabitaculoasientos from "~/public/buscadorinteractivo/camionessintrompa/gruasintrompa/interior/asientos.jpg";
import gruahabitaculotecho from "~/public/buscadorinteractivo/camionessintrompa/gruasintrompa/interior/techo.jpg";
import logo from "../../../../public/imgcarrusel/sedan/nombrelogomr.png";
import SearchInteractiveItems from "../../../search/searchinteractiveitems";
import SidebarShopInteractiveSearch from "~/components/shared/sidebar/SidebarShopInteractiveSearch";

const GruaHabitaculo = (props) => {
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
    const [marcaBotonConsola, setMarcaBotonConsola] = useState(
        "botoncarroceriahabitaculotechoeit"
    );
    const [marcaBotonAsiento, setMarcaBotonAsiento] = useState(
        "botoncarroceriahabitaculotechoeit"
    );
    const [marcaBotontecho, setMarcaBotontecho] = useState(
        "botoncarroceriahabitaculotechoeit"
    );
    const [informacionMarcaBotonConsola, setInformacionMarcaBotonConsola] =
        useState("informacionbotoncarroceriasedancdidos");
    const [informacionMarcaBotonAsiento, setInformacionMarcaBotonAsiento] =
        useState("informacionbotonhabitaculocdi");
    const [informacionMarcaBotontecho, setInformacionMarcaBotontecho] =
        useState("informacionbotoncarroceriasedancditres");

    const [showModalComentariosLatoneria, setShowModalComentariosLatoneria] =
        useState(false);
    const [ubicarProductoLatoneria, setUbicarProductoLatoneria] =
        useState(false);

    const [ubicarProductoConsola, setUbicarProductoConsola] = useState(false);
    const [ubicarProductoAsientoGeneral, setUbicarProductoAsientoGeneral] =
        useState(false);
    const [ubicarProductoTecho, setUbicarProductoTecho] = useState(false);

    const [habilitarMarcacion, setHabilitarMarcacion] = useState(false);

    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(true);
    const [marcarHabitaculo, setMarcarHabitaculo] = useState(false);

    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);

    const [habilitarCategoriaHabitaculo, setHabilitarCategoriaHabitaculo] =
        useState(true);
    const [showModalComentariosHabitaculo, setShowModalComentariosHabitaculo] =
        useState(false);
    // Definición Motor Eléctrico
    const [showModalComentariosMotor, setShowModalComentariosMotor] =
        useState(false);
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

    const seleccionaParteConsola = () => {
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Interior - consola")
        );
        setUbicarProductoHabitaculo(false);
        setHabilitarCategoriaHabitaculo(true);

        setUbicarProductoConsola(true);
        setUbicarProductoAsientoGeneral(false);
        setUbicarProductoTecho(false);

        setMarcaBotonConsola("botonsedanizquierdaderechacentromarcado");
        setMarcaBotonAsiento("botoncarrocerianoseleccionasientos");
        setMarcaBotontecho("botoncarrocerianoseleccionasientos");

        setInformacionMarcaBotonConsola(
            "informacionbotoncarroceriasedanseleccionada"
        );
        setInformacionMarcaBotonAsiento("informacionbotonnoseleccionasientos");
        setInformacionMarcaBotontecho("informacionbotonnoselecciontecho");
    };

    const seleccionaParteAsientosGeneral = () => {
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Interior - asiento")
        );
        setUbicarProductoHabitaculo(false);
        setHabilitarCategoriaHabitaculo(true);
        setUbicarProductoAsientoGeneral(true);
        setUbicarProductoConsola(false);
        setUbicarProductoTecho(false);
        setMarcaBotonConsola("botoncarrocerianoseleccionconsola");
        setMarcaBotonAsiento("botonsedanizquierdaderechacentromarcado");
        setMarcaBotontecho("botoncarrocerianoseleccionconsola");

        setInformacionMarcaBotonConsola("informacionbotonnoselecciontecho");
        setInformacionMarcaBotonAsiento(
            "informacionbotoncarroceriasedanseleccionada"
        );
        setInformacionMarcaBotontecho("informacionbotonnoselecciontecho");
    };

    const seleccionaParteTecho = () => {
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Interior - techo")
        );
        setUbicarProductoHabitaculo(false);
        setHabilitarCategoriaHabitaculo(true);
        setUbicarProductoTecho(true);
        setUbicarProductoAsientoGeneral(false);
        setUbicarProductoConsola(false);
        setMarcaBotonConsola("botoncarrocerianoseleccionconsola");
        setMarcaBotonAsiento("botoncarrocerianoseleccionasientos");
        setMarcaBotontecho("botonsedanizquierdaderechacentromarcado");
        //router.push("/searchinteractive/sedan/searchsedanlatoneriaderecha");

        setInformacionMarcaBotonConsola("informacionbotonnoselecciontecho");
        setInformacionMarcaBotonAsiento("informacionbotonnoseleccionasientos");
        setInformacionMarcaBotontecho(
            "informacionbotoncarroceriasedanseleccionada"
        );
    };

    const seleccionaUbicarProductoLatoneria = () => {
        router.push(
            "/searchinteractive/camionessintrompa/gruasintrompa/searchgrualatoneria"
        );
    };

    const seleccionaUbicarProductoHabitaculo = () => {
        setUbicarProductoHabitaculo(true);
        setHabilitarCategoriaHabitaculo(true);
        setUbicarProductoTecho(false);
        setUbicarProductoAsientoGeneral(false);
        setUbicarProductoConsola(false);
        setInformacionMarcaBotonConsola(
            "informacionbotoncarroceriasedancdidos"
        );
        setInformacionMarcaBotonAsiento(
            "informacionbotonhabitaculocdi"
        );
        setInformacionMarcaBotontecho("informacionbotoncarroceriasedancditres");
        setMarcaBotonConsola("botoncarroceriahabitaculotechoeit");
        setMarcaBotonAsiento("botoncarroceriahabitaculotechoeit");
        setMarcaBotontecho("botoncarroceriahabitaculotechoeit");
        router.push(
            "/searchinteractive/camionessintrompa/gruasintrompa/searchgruahabitaculo"
        );
    };

    const seleccionaUbicarProductoMotorElectrico = () => {
        router.push(
            "/searchinteractive/camionessintrompa/gruasintrompa/searchgruamotorelectrico"
        );
    };

    useEffect(() => {
        if (maximizarOption != 0)
            setControlFijar("mt-20 fijardatosvehiculohabitaculo");
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
                                                        className="botoncarroceriaexterior"
                                                        variant="outline-light"
                                                        onClick={
                                                            seleccionaUbicarProductoLatoneria
                                                        }>
                                                        Exterior
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className="informacionbotoncarroceriaexterior"
                                                        variant="outline-light"
                                                        onClick={
                                                            mostrarComentariolatoneria
                                                        }>
                                                        {!ubicarProductoLatoneria ? (
                                                            <i
                                                                className="fa fa-info d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        ) : (
                                                            <i
                                                                v="fa fa-check-square-o d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        )}
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className="botoncarroceriasedanseleccionadados"
                                                        variant="outline-light"
                                                        onClick={
                                                            seleccionaUbicarProductoHabitaculo
                                                        }>
                                                        Interior
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className="informacionbotoncarroceriasedanseleccionada"
                                                        variant="outline-light"
                                                        onClick={
                                                            mostrarComentariohabitaculo
                                                        }>
                                                        {
                                                            /*!ubicarProductoHabitaculo ? (*/
                                                            <i
                                                                className="fa fa-info d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                            /*) : (
                                                    <i
                                                        class="fa fa-check-square-o d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                )*/
                                                        }
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className="botoncarroceriaexterior"
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
                                                                className="fa fa-info d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        ) : (
                                                            <i
                                                                className="fa fa-check-square-o d-flex justify-content-center"
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
                                Elige en que parte del interior está ubicado tu
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
                                                            marcaBotonConsola
                                                        }
                                                        variant="outline-light"
                                                        onClick={
                                                            seleccionaParteConsola
                                                        }>
                                                        Consola
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className={
                                                            informacionMarcaBotonConsola
                                                        }
                                                        variant="outline-light"
                                                        onClick={
                                                            mostrarComentariolatoneria
                                                        }>
                                                        {!habilitarMarcacion ? (
                                                            <i
                                                                className="fa fa-info d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        ) : (
                                                            <i
                                                                className="fa fa-check-square-o d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        )}
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className={
                                                            marcaBotonAsiento
                                                        }
                                                        variant="outline-light"
                                                        onClick={
                                                            seleccionaParteAsientosGeneral
                                                        }>
                                                        Asientos
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className={
                                                            informacionMarcaBotonAsiento
                                                        }
                                                        variant="outline-light"
                                                        onClick={
                                                            mostrarComentariohabitaculo
                                                        }>
                                                        {!habilitarMarcacion ? (
                                                            <i
                                                                className="fa fa-info d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        ) : (
                                                            <i
                                                                className="fa fa-check-square-o d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        )}
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className={
                                                            marcaBotontecho
                                                        }
                                                        variant="outline-light"
                                                        onClick={
                                                            seleccionaParteTecho
                                                        }>
                                                        Techo
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className={
                                                            informacionMarcaBotontecho
                                                        }
                                                        variant="outline-light"
                                                        onClick={
                                                            mostrarComentariomotor
                                                        }>
                                                        {!habilitarMarcacion ? (
                                                            <i
                                                                className="fa fa-info d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        ) : (
                                                            <i
                                                                className="fa fa-check-square-o d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        )}
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col xs={6} md={6} lg={12}>
                                    {ubicarProductoHabitaculo ? (
                                        <div>
                                            <img
                                                className="tamañoimageneshabitaculochasissencillo"
                                                src={gruahabitaculo.src}
                                            />
                                        </div>
                                    ) : ubicarProductoConsola ? (
                                        <div>
                                            <img
                                                className="tamañoimageneshabitaculochasissencillo"
                                                src={
                                                    gruahabitaculoconsola.src
                                                }
                                            />
                                        </div>
                                    ) : ubicarProductoAsientoGeneral ? (
                                        <div>
                                            <img
                                                className="tamañoimageneshabitaculochasissencillo"
                                                src={
                                                    gruahabitaculoasientos.src
                                                }
                                            />
                                        </div>
                                    ) : ubicarProductoTecho ? (
                                        <div>
                                            <img
                                                className="tamañoimageneshabitaculochasissencillo"
                                                src={
                                                    gruahabitaculotecho.src
                                                }
                                            />
                                        </div>
                                    ) : null}
                                </Col>
                            </Row>
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

export default GruaHabitaculo;
