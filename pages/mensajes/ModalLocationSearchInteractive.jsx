import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import { useDispatch, useSelector } from "react-redux";
import { getCitySelect } from "../../store/cityselect/action";
import { getDataCityPrd } from "../../store/datacityprd/action";

let ciudadesAlt = [];
let ciudadesselAlt = [];

function ModalLocationSearchInteractive(props) {
    const {
        shown,
        close,
        titulo,
        setActivar,
        PrdCiudadUno,
        PrdCiudadDos,
        setSelected,
        marcaSelected,
        setmarcaSelected,
        ciudades,
        setCiudades,
        ciudadesSel,
        setCiudadesSel,
        setActivaCiudad,
        setAbrirModal,
        setActivarCity,
        setCitySelected,
        setShowModalMensajesCity,
        setTituloMensajesCity,
        setTextoMensajesCity,
    } = props;

    const [itemSel, setitemSel] = useState(null);
    const [cambia, setCambia] = useState(false);
    const dispatch = useDispatch();

    const cerrar = () => {
        close(false);
        setCiudades([]);
        setCiudadesSel([]);
        setActivaCiudad(false);
        setActivar("habilitar");
        ciudadesAlt = [];
        ciudadesselAlt = [];
        //setActivarCity(true);
    };

    const filtrar = () => {
        if (ciudadesSel.length > 4) {
            setAbrirModal(true);
            return;
        } else {
            if (ciudadesAlt.length > 0) {
                localStorage.setItem("activafiltrociudad", JSON.stringify(true));
                dispatch(getCitySelect(ciudadesselAlt));
                localStorage.setItem("cityselect", JSON.stringify(ciudadesSel));
                //console.log("SELASASAS : ", ciudadesSel)
                setCiudades(ciudadesAlt);
                setSelected(ciudadesSel);
                setCitySelected(ciudadesSel);
                setActivaCiudad(true);
                ciudadesAlt = [];
                ciudadesselAlt = [];
                dispatch(getDataCityPrd(ciudadesselAlt));
                //ciudades = [];
                close(false);
            }
            setActivar("habilitar");
        }
    };

    const control = () => {
        setCambia(!cambia);
    };

    const SelectCity = (item, ciudad, nombreciu, productosciudad) => {
        if (ciudades.includes(ciudad)) {
            setCambia(!cambia);

            let idcity = ciudades;
            let idcitysel = ciudadesSel;

            setCiudades([]);
            setCiudadesSel([]);

            let idcitydos = [];
            let idcitydossel = [];

            idcity &&
                idcity.map((row, index) => {
                    if (row != ciudad) {
                        idcitydos.push(row);
                        setmarcaSelected("");
                    }
                });

            idcitysel &&
                idcitysel.map((row, index) => {
                    if (row.idciu != ciudad) {
                        idcitydossel.push(row);
                        setmarcaSelected("");
                    }
                });

            setCiudades(idcitydos);
            setCiudadesSel(idcitydossel);
            ciudadesAlt = idcitydos;
            ciudadesselAlt = idcitydossel;
            setSelected(idcitydossel);
        } else {
            if (ciudadesAlt.length > 3) {
                //setActivar("deshabilitar");
                setShowModalMensajesCity(true);
                setTituloMensajesCity("Filtro por Ubicación");
                setTextoMensajesCity(
                    "Puedes escoger un maximo de cuatro ciudades!"
                );
                //setActivar("deshabilitar");
                return;
            } else {
                setitemSel(item);
                setmarcaSelected("subrayartexto");
                setActivaCiudad(false);
                ciudadesAlt.push(ciudad);
                setCiudades(ciudadesAlt);
                let row = {
                    id: item,
                    idciu: ciudad,
                    nombreciu: nombreciu,
                    productosciudad: productosciudad
                };
                ciudadesselAlt.push(row);
                setCiudadesSel(ciudadesselAlt);
            }
        }
    };

    //console.log("ciudadesselAlt : ", ciudadesselAlt)
    //console.log(" ciudadesAltDDD : ",  ciudadesAlt)

    return shown ? (
        <div
            className="modal-fondo"
            onClick={() => {
                cerrar();
            }}>
            <div
                className="modal-location-search redondearventamensaje"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Row>
                        <Col xl={10} lg={10} md={10} sm={10}>
                            <div className="mtmenos10 titulomodallocationresult">
                                {titulo}
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodal ml-65 sinborder colorbase"
                                data-dismiss="modal"
                                onClick={() => cerrar()}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                </div>
                {
                    console.log("PrdCiudadUno : ", PrdCiudadUno)
                }
                {
                    console.log("PrdCiudadDos : ", PrdCiudadDos)
                }
                <div className="dropdowncity">
                    <Row className="mlmenos">
                        <Col xl={6} lg={6} md={6} sm={6}>
                            <div
                                className="dropdown-ubicacion-prd-ciudad"
                                onMouseEnter={() => control()}>
                                {PrdCiudadUno &&
                                    PrdCiudadUno.map((item, index) => {
                                        return (
                                            <div
                                                className="mt-3"
                                                onClick={() =>
                                                    SelectCity(
                                                        item.id,
                                                        item.idciu,
                                                        item.nombre_ciu,
                                                        item.productosciudad
                                                    )
                                                }>
                                                {cambia || !cambia ? (
                                                    ciudades.includes(
                                                        item.idciu
                                                    ) ? (
                                                        <div>
                                                            <i
                                                                className="tamañoletra11 fa fa-check-square-o"
                                                                aria-hidden="true"></i>
                                                            <label
                                                                className={
                                                                    marcaSelected
                                                                }
                                                                htmlFor="five-star">
                                                                <span className="ps-rating">
                                                                    <a>
                                                                        {
                                                                            item.nombre_ciu
                                                                        }{" "}
                                                                    </a>
                                                                </span>
                                                                <span className="total">
                                                                    (
                                                                    {
                                                                        item.productosciudad

                                                                    }
                                                                    )
                                                                </span>
                                                            </label>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <i
                                                                className="tamañoletra11 fa fa-square-o"
                                                                aria-hidden="true"></i>
                                                            <label htmlFor="five-star">
                                                                <span className="ps-rating">
                                                                    <a>
                                                                        {
                                                                            item.nombre_ciu
                                                                        }{" "}
                                                                    </a>
                                                                </span>
                                                                <span className="total">
                                                                    (
                                                                    {
                                                                        item.productosciudad
                                                                    }
                                                                    )
                                                                </span>
                                                            </label>
                                                        </div>
                                                    )
                                                ) : null}
                                            </div>
                                        );
                                    })}
                            </div>
                        </Col>
                        <div className="mlmenos55">
                            <Col xl={3} lg={3} md={3} sm={3}>
                                <div
                                    className="dropdown-ubicacion-prd-ciudad"
                                    onMouseEnter={() => control()}>
                                    {PrdCiudadDos &&
                                        PrdCiudadDos.map((item, index) => {
                                            return (
                                                <div
                                                    className="mt-3"
                                                    onClick={() =>
                                                        SelectCity(
                                                            item.id,
                                                            item.idciu,
                                                            item.nombre_ciu,
                                                            item.productosciudad
                                                        )
                                                    }>
                                                    {cambia || !cambia ? (
                                                        ciudades.includes(
                                                            item.idciu
                                                        ) ? (
                                                            <div>
                                                                <i
                                                                    className="tamañoletra11 fa fa-check-square-o"
                                                                    aria-hidden="true"></i>
                                                                <label
                                                                    className={
                                                                        marcaSelected
                                                                    }
                                                                    htmlFor="five-star">
                                                                    <span className="ps-rating">
                                                                        <a>
                                                                            {
                                                                                item.nombre_ciu
                                                                            }{" "}
                                                                        </a>
                                                                    </span>
                                                                    <span className="total">
                                                                        (
                                                                        {
                                                                            item.productosciudad
                                                                        }
                                                                        )
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <i
                                                                    className="tamañoletra11 fa fa-square-o"
                                                                    aria-hidden="true"></i>
                                                                <label htmlFor="five-star">
                                                                    <span className="ps-rating">
                                                                        <a>
                                                                            {
                                                                                item.nombre_ciu
                                                                            }{" "}
                                                                        </a>
                                                                    </span>
                                                                    <span className="total">
                                                                        (
                                                                        {
                                                                            item.productosciudad
                                                                        }
                                                                        )
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        )
                                                    ) : null}
                                                </div>
                                            );
                                        })}
                                    {
                                        <div>
                                            <Button
                                                onClick={() => filtrar()}
                                                className="botoncity">
                                                Aceptar
                                            </Button>
                                        </div>
                                    }{" "}
                                </div>
                            </Col>
                        </div>
                    </Row>
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalLocationSearchInteractive;
