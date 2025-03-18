import React, { useState, useEffect, useRef } from "react";
import Container from "~/components/layouts/Container";
import PropTypes from "prop-types";
import swal from "sweetalert";
import NumberFormat from "react-number-format";
import {
    Button,
    Row,
    Col,
    Modal,
    ButtonGroup,
    Card,
    Form,
    Tooltip,
    Overlay,
} from "react-bootstrap";

function DatosGenerico(props) {
    const {
        vehiculoUnoCrear,
        setVehiculoUnoCrear,
        vehiculoDosCrear,
        setVehiculoDosCrear,
        vehiculoTresCrear,
        setVehiculoTresCrear,
        vehiculoCuatroCrear,
        setVehiculoCuatroCrear,
        vehiculoCincoCrear,
        setVehiculoCincoCrear,
        vehiculoSeisCrear,
        setVehiculoSeisCrear,
        vehiculoSieteCrear,
        setVehiculoSieteCrear,
        vehiculoOchoCrear,
        setVehiculoOchoCrear,
        vehiculoNueveCrear,
        setVehiculoNueveCrear,
        vehiculoDiezCrear,
        setVehiculoDiezCrear,
        vehiculoUno,
        setVehiculoUno,
        vehiculoDos,
        setVehiculoDos,
        vehiculoTres,
        setVehiculoTres,
        vehiculoCuatro,
        setVehiculoCuatro,
        vehiculoCinco,
        setVehiculoCinco,
        vehiculoSeis,
        setVehiculoSeis,
        vehiculoSiete,
        setVehiculoSiete,
        vehiculoOcho,
        setVehiculoOcho,
        vehiculoNueve,
        setVehiculoNueve,
        vehiculoDiez,
        setVehiculoDiez,
        contador,
        setContador,
        setGenerico,
        setMostrarDatosVehiculos,
        mostrar,
        setMostrar,
    } = props;

    const productogenerico = [
        {
            label: "Si - Es Compatible con diferentes marcas y modelos del Vehículos.",
            value: "Si",
        },
        {
            label: "No - NO es Compatible con varias marcas y modelos de Vehículos.",
            value: "No",
        },
    ];

    const handleChangeGenerico = (selectedOptions) => {
        //console.log("OPCION GENERICOS : ", selectedOptions);
        //alert("GENERICO");
        let control = contador + 1;
        setContador(control);

        if (control === 1) {
            setVehiculoUnoCrear(true);
            setVehiculoUno(true);
        } else if (control === 2) {
            setVehiculoDosCrear(true);
            setVehiculoDos(true);
        } else if (control === 3) {
            setVehiculoTresCrear(true);
            setVehiculoTres(true);
        } else if (control === 4) {
            setVehiculoCuatroCrear(true);
            setVehiculoCuatro(true);
        } else if (control === 5) {
            setVehiculoCincoCrear(true);
            setVehiculoCinco(true);
        } else if (control === 6) {
            setVehiculoSeisCrear(true);
            setVehiculoSeis(true);
        } else if (control === 7) {
            setVehiculoSieteCrear(true);
            setVehiculoSiete(true);
        } else if (control === 8) {
            setVehiculoOchoCrear(true);
            setVehiculoOcho(true);
        } else if (control === 9) {
            setVehiculoNueveCrear(true);
            setVehiculoNueve(true);
        } else if (control === 10) {
            setVehiculoDiezCrear(true);
            setVehiculoDiez(true);
        }

        setGenerico(selectedOptions);
        setMostrarDatosVehiculos(true);
    };

    return (
        <div>
            {mostrar ? (
                <div>
                    <Row>
                        <Col xl={11} lg={11} md={11} xs={11}>
                            <div>
                                <select
                                    //disabled="disabled"
                                    className="custom-selectcreateproducto redondearbordegenerico"
                                    onChange={(e) =>
                                        handleChangeGenerico(e.target.value)
                                    }>
                                    {productogenerico &&
                                        productogenerico.map((itemselect) => {
                                            return (
                                                <option
                                                    value={itemselect.value}>
                                                    {itemselect.label}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1}>
                            <div className="form-control ps-form__input  mlmenos15">
                                <i
                                    onClick={() => {
                                        setShowModalGenerico(
                                            !showModalGenerico
                                        );
                                    }}
                                    className="fa fa-info d-flex justify-content-center"
                                    aria-hidden="true"></i>
                            </div>
                        </Col>
                    </Row>
                </div>
            ) : (
                <div>
                   <Row>
                        <Col xl={11} lg={11} md={11} xs={11}>
                            <div>
                                <select
                                    //disabled="disabled"
                                    className="custom-selectcreateproducto redondearbordegenerico"
                                    onChange={(e) =>
                                        handleChangeGenerico(e.target.value)
                                    }>
                                    {productogenerico &&
                                        productogenerico.map((itemselect) => {
                                            return (
                                                <option
                                                    value={itemselect.value}>
                                                    {itemselect.label}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1}>
                            <div className="form-control ps-form__input  mlmenos15">
                                <i
                                    onClick={() => {
                                        setShowModalGenerico(
                                            !showModalGenerico
                                        );
                                    }}
                                    className="fa fa-info d-flex justify-content-center"
                                    aria-hidden="true"></i>
                            </div>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
}

export default DatosGenerico;
