import React, { useState, useEffect, useRef } from "react";
import { Button, Row, Col, Form, Dropdown } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";

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

function ModalComentariosUbicacionProducto({
    shown,
    close,
    texto,
    mensajeUbicacionProd,
    posicionUbicacionProd,
    tipoVehUno,
}) {
    const ref = useRef();
    const [carrocerias, setCarrocerias] = useState([]);
    const [imagen, setImagen] = useState(null);
    const [isModalOpen, setModalOpen] = useState(null);
    const [nombreCarroceriaSelect, setNombreCarroceriaSelect] = useState(
        "Seleccione carroceria"
    );

    useEffect(() => {
        setImagen(null);
        setNombreCarroceriaSelect("Seleccione carroceria");

        let listaCarrocerias = JSON.parse(
            localStorage.getItem("datoscarroceriasvehiculos")
        );
        //console.log("CARROCERIAS : ", listaCarrocerias)
        //console.log("TIPO VEH : ", tipoVehUno)

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

        let imagensel = "";
        //console.log("IMAGEN : ", imagensel);
        setImagen("");

        if (codigo == 24) {
            imagensel = "/buscadorinteractivo/sedan/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 8) {
            imagensel = "/buscadorinteractivo/coupe/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 2) {
            imagensel =
                "/buscadorinteractivo/automoviltrespuertas/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 3) {
            imagensel =
                "/buscadorinteractivo/automovilcincopuertas/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 16) {
            imagensel =
                "/buscadorinteractivo/camionetas/estacadoblechasis/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 17) {
            imagensel =
                "/buscadorinteractivo/camionetas/estacacabinasencilla/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 20) {
            imagensel =
                "/buscadorinteractivo/camionetas/volcodoblecabina/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 21) {
            imagensel =
                "/buscadorinteractivo/camionetas/volcocabinasencilla/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 25) {
            imagensel =
                "/buscadorinteractivo/camionetas/suvcamperostrespuertas/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 26) {
            imagensel =
                "/buscadorinteractivo/camionetas/suvcamperoscincopuertas/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 60) {
            imagensel =
                "/buscadorinteractivo/camionestrompa/articuladocontrompa/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 13) {
            imagensel =
                "/buscadorinteractivo/camionestrompa/dobletroquecontrompa/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 18) {
            imagensel =
                "/buscadorinteractivo/camionestrompa/gruacontrompa/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 35) {
            imagensel =
                "/buscadorinteractivo/camionestrompa/sencillocontrompa/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 31) {
            imagensel =
                "/buscadorinteractivo/camionestrompa/volquetadoblecontrompa/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 32) {
            imagensel =
                "/buscadorinteractivo/camionestrompa/volquetasencillacontrompa/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 1) {
            imagensel =
                "/buscadorinteractivo/camionessintrompa/articuladosintrompa/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 10) {
            imagensel =
                "/buscadorinteractivo/camionessintrompa/cuatromanos/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 84) {
            imagensel =
                "/buscadorinteractivo/camionessintrompa/dobletroquesintrompa/sexterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 87) {
            imagensel =
                "/buscadorinteractivo/camionessintrompa/gruasintrompa/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 7) {
            imagensel =
                "/buscadorinteractivo/camionessintrompa/sencillosintrompa/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 123) {
            imagensel =
                "/buscadorinteractivo/camionessintrompa/volquetadoblesintrompa/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 121) {
            imagensel =
                "/buscadorinteractivo/camionessintrompa/volquetasencillasintrompa/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 4) {
            imagensel =
                "/buscadorinteractivo/vansybuses/bus/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 122) {
            imagensel =
                "/buscadorinteractivo/vansybuses/buseta/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 30) {
            imagensel =
                "/buscadorinteractivo/vansybuses/vans/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 5) {
            imagensel =
                "/buscadorinteractivo/motos/calle/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 12) {
            imagensel =
                "/buscadorinteractivo/motos/deportiva/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 14) {
            imagensel =
                "/buscadorinteractivo/motos/enduro/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 22) {
            imagensel =
                "/buscadorinteractivo/motos/scooter/exterior/basegris.jpg";
            setImagen(imagensel);
        } else if (codigo == 28) {
            imagensel =
                "/buscadorinteractivo/motos/touring/exterior/basegris.jpg";
            setImagen(imagensel);
        }
        console.log("IMAGEN : ", imagensel);
    };

    useOnClickOutside(ref, () => setModalOpen(false));

    const cerrarOpcion = () => {
        setModalOpen(true);
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
                className="modal-contenido-ubicacion redondearventamensajes"
                //onClick={(e) => { e.stopPropagation();}}
                onClick={() => cerrarOpcion()}>
                <div>
                    <Row>
                        <Col xl={11} lg={11} md={11} sm={11} className="mb-10">
                            <div className="tamañotextoubicacioninfoproducto">
                                <Row>
                                    <Col xl={1} lg={1} md={1} sm={1}>
                                        <InfoIcon
                                            style={{
                                                fontSize: 35,
                                            }}
                                            className="iconomaterialinfoubicacion"></InfoIcon>
                                    </Col>
                                    <Col xl={6} lg={6} md={12} sm={12}>
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
                                className="cerrarmodal"
                                data-dismiss="modal"
                                onClick={close}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                </div>
                <div className="textomodalubicaprd">
                    <div className="descripcioninfoubicacion">
                        {mensajeUbicacionProd}
                    </div>
                </div>
                <Row className="mt-10">
                    <Col xs={12} sm={12} md={3} lg={3}></Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <Dropdown onSelect={handleChangeCarroceria}>
                            <Dropdown.Toggle
                                onclick={CustomToggle}
                                className="mt-10 searchinfocarrocerias"
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
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        {imagen ? (
                            <img
                                className="tamañoimageninfocarrocerias2"
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

export default ModalComentariosUbicacionProducto;
