import React, { useState, useEffect, useRef } from "react";
import { Button, Row, Col, Form, Dropdown } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";

function ModalInfoTrenMotriz({
    shown,
    close,
    texto,
    mensajeUbicacionProd,
    posicionUbicacionProd,
    tipoVehUno,
    seleccionaTrenMotriz,
    tipoSistema,
    setTipoSistema,
    setSistemaNoDisponible,
    sistemaNoDisponible,
    imagen,
    setImagen,
}) {
    const ref = useRef();
    const [carrocerias, setCarrocerias] = useState([]);
    const [isModalOpen, setModalOpen] = useState(null);
    const [nombreCarroceriaSelect, setNombreCarroceriaSelect] = useState(
        "Seleccione carroceria"
    );

    const cerrarModal = () => {
        close(false);
        setImagen(null);
    };

    useEffect(() => {
        setNombreCarroceriaSelect("Seleccione carroceria");

        let listaCarrocerias = JSON.parse(
            localStorage.getItem("datoscarroceriasvehiculos")
        );

        const newDet = [];
        listaCarrocerias &&
            listaCarrocerias.forEach((row) => {
                if (parseInt(row.tipovehiculo) === parseInt(tipoVehUno)) {
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
    }, [tipoVehUno, close]);

    const handleChangeCarroceria = (selectedOptions) => {
        //alert(selectedOptions);
    };

    const selectCarroceria = (codigo, label) => {
        setNombreCarroceriaSelect(label);
        //setImagen(null);
        let sistema = "";
        let imagensel = "";
        let url = "";
        //setImagen(url);
        setTipoSistema(0);
        setSistemaNoDisponible(0);
        //alert(seleccionaTrenMotriz);
        if (seleccionaTrenMotriz == 1) {
            sistema = "1sistemamotor";
        } else if (seleccionaTrenMotriz == 2) {
            sistema = "2sistematraccion";
        } else if (seleccionaTrenMotriz == 3) {
            sistema = "3sistemafrenos";
        } else if (seleccionaTrenMotriz == 4) {
            sistema = "4sistemadireccion";
        } else if (seleccionaTrenMotriz == 5) {
            sistema = "5sistemasuspension";
        } else if (seleccionaTrenMotriz == 6) {
            setTipoSistema(seleccionaTrenMotriz);
            sistema = "6sistemacaja";
        } else if (seleccionaTrenMotriz == 7) {
            setTipoSistema(seleccionaTrenMotriz);
            sistema = "7sistemaembrague";
        } else if (seleccionaTrenMotriz == 8) {
            sistema = "8sistemainyeccion";
        } else if (seleccionaTrenMotriz == 9) {
            sistema = "9sistemarefrigeraciongeneral";
        } else if (seleccionaTrenMotriz == 10) {
            sistema = "10sistemarefrigeracioncaja";
        } else if (seleccionaTrenMotriz == 11) {
            sistema = "11sistemaescape";
        } else if (seleccionaTrenMotriz == 12) {
            sistema = "12sistemaaireacondicionado";
        } else if (seleccionaTrenMotriz == 13) {
            sistema = "13sistemaelectricoaccesorios";
        } else if (seleccionaTrenMotriz == 14) {
            sistema = "14sistemadearranque";
        } else if (seleccionaTrenMotriz == 15) {
            sistema = "15sistemalimpiabrisas";
        } else if (seleccionaTrenMotriz == 16) {
            sistema = "16sistemaelectricomotor";
        }

        let carroceria = "";
        let tipotraccion = "tracciondelantera";

        if (codigo == 24) {
            carroceria = "sedan";
        } else if (codigo == 8) {
            carroceria = "coupe";
        } else if (codigo == 2) {
            carroceria = "automoviltrespuertas";
        } else if (codigo == 3) {
            carroceria = "automovilcincopuertas";
        } else if (codigo == 16) {
            carroceria = "camionetas/estacadoblechasis/";
            tipotraccion = "tracciontrasera";
        } else if (codigo == 17) {
            carroceria = "camionetas/estacacabinasencilla/";
            tipotraccion = "tracciontrasera";
        } else if (codigo == 20) {
            carroceria = "camionetas/volcodoblecabina/";
            tipotraccion = "tracciontrasera";
        } else if (codigo == 21) {
            carroceria = "camionetas/volcocabinasencilla/";
            tipotraccion = "tracciontrasera";
        } else if (codigo == 25) {
            carroceria = "camionetas/suvcamperostrespuertas/";
        } else if (codigo == 26) {
            carroceria = "camionetas/suvcamperoscincopuertas/";
        } else if (codigo == 60) {
            carroceria = "camionestrompa/articuladocontrompa/";
        } else if (codigo == 13) {
            carroceria = "camionestrompa/dobletroquecontrompa/";
        } else if (codigo == 18) {
            carroceria = "camionestrompa/gruacontrompa/";
        } else if (codigo == 35) {
            carroceria = "camionestrompa/sencillocontrompa/";
        } else if (codigo == 31) {
            carroceria = "camionestrompa/volquetadoblecontrompa/";
        } else if (codigo == 32) {
            carroceria = "camionestrompa/volquetasencillacontrompa/";
        } else if (codigo == 1) {
            carroceria = "camionessintrompa/articuladosintrompa/";
        } else if (codigo == 10) {
            carroceria = "camionessintrompa/cuatromanos/";
        } else if (codigo == 84) {
            carroceria = "camionessintrompa/dobletroquesintrompa/";
        } else if (codigo == 87) {
            carroceria = "camionessintrompa/gruasintrompa/";
        } else if (codigo == 7) {
            carroceria = "camionessintrompa/sencillosintrompa/";
        } else if (codigo == 123) {
            carroceria = "camionessintrompa/volquetadoblesintrompa/";
        } else if (codigo == 121) {
            carroceria = "camionessintrompa/volquetasencillasintrompa/";
        } else if (codigo == 4) {
            carroceria = "vansybuses/bus/";
        } else if (codigo == 122) {
            carroceria = "vansybuses/buseta/";
        } else if (codigo == 30) {
            carroceria = "vansybuses/vans/";
        } else if (codigo == 5) {
            carroceria = "motos/calle/";
        } else if (codigo == 12) {
            carroceria = "motos/deportiva/";
        } else if (codigo == 14) {
            carroceria = "motos/enduro/";
        } else if (codigo == 22) {
            carroceria = "motos/scooter/";
            setSistemaNoDisponible(codigo);
        } else if (codigo == 28) {
            carroceria = "motos/touring/";
        }
        //console.log("IMAGEN : ", imagensel);
        url =
            "/buscadorinteractivo/" +
            carroceria +
            "/trenmotriz/" +
            tipotraccion +
            "/" +
            sistema +
            "/1.jpg";

        setImagen(url);
    };

    useOnClickOutside(ref, () => setModalOpen(false));

    const cerrarOpcion = () => {
        setModalOpen(true);
        //setTipo(0);
        //setSistemaNoDisponible(0);
    };

    useEffect(() => {
        if (!isModalOpen) {
            setModalOpen(null);
            close();
        }
    }, [isModalOpen]);

    return shown ? (
        <div
            className="modal-fondo"
            //onClick={() => {close();}}
        >
            <div
                ref={ref}
                className="modal-ubicacion-prd redondearventamensajes"
                //onClick={(e) => { e.stopPropagation();}}
                onClick={() => cerrarOpcion()}>
                <div>
                    <Row>
                        <Col
                            xl={11}
                            lg={11}
                            md={11}
                            sm={11}
                            className="mtmenos10">
                            <div className="tamañotextoubicacioninfoproducto">
                                <Row>
                                    <Col md={1} sm={1} xl={1} lg={1}>
                                        <InfoIcon
                                            style={{
                                                fontSize: 35,
                                            }}
                                            className="iconomaterialinfoubicacion"></InfoIcon>
                                    </Col>
                                    <Col md={12} sm={12} xl={9} lg={9}>
                                        <div className="textotittulotrenmotriz">
                                            {posicionUbicacionProd}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodal colorbase"
                                data-dismiss="modal"
                                onClick={() => cerrarModal()}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                </div>

                <div className="textomodalubicaprdmotriz">
                    <div className="descripcioninfoubicacion">
                        {mensajeUbicacionProd}
                    </div>
                </div>
                <Row>
                    <div className="centrarsearchinfomotriz">
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <Dropdown onSelect={handleChangeCarroceria}>
                                <Dropdown.Toggle
                                    className="searchinfocarrocerias"
                                    variant="outline-light"
                                    //disabled={disabledCarroceria}
                                    id="dropdown-basic">
                                    <Row>
                                        <Col xs={10} sm={10} md={10} lg={10}>
                                            {nombreCarroceriaSelect}
                                        </Col>
                                    </Row>
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    variant="outline-light"
                                    className="optionsinfocarrocerias">
                                    {carrocerias &&
                                        carrocerias.map((item) => {
                                            return (
                                                <Dropdown.Item
                                                    className="itemsdropdowncustom"
                                                    eventKey={item.value}
                                                    onClick={() =>
                                                        selectCarroceria(
                                                            item.value,
                                                            item.label
                                                        )
                                                    }>
                                                    {item.label}
                                                </Dropdown.Item>
                                            );
                                        })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </div>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        {(tipoSistema == 6 || tipoSistema == 7) &&
                        sistemaNoDisponible == 22 ? (
                            <div className="cajanodisponible">
                                Sistema no disponible en este vehículo
                            </div>
                        ) : imagen ? (
                            <img
                                className="tamañoimageninfotrenmotriz"
                                src={imagen}
                                alt="First slide"
                            />
                        ) : null}
                    </Col>
                </Row>
            </div>
        </div>
    ) : null;
}

function useOnClickOutside(ref, handler) {
    useEffect(() => {
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
    }, [ref, handler]);
}

export default ModalInfoTrenMotriz;
