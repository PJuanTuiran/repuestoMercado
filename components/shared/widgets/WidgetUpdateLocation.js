import React, { useEffect, useState } from "react";
import ModalLocationResult from "../../../pages/mensajes/ModalLocationResult";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import ModalMensajesCity from "../../../pages/mensajes/ModalMensajesCity";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function WidgetUpdateLocation(props) {
    const { dataCitySelect, setDataCitySelect } = props;
    const dataciudad = useSelector(
        (state) => state.datacityprd.datacityprd
    );

    useEffect(() => {
        setDataCitySelect(dataciudad)
    }, [dataciudad]);


    console.log("CUDADKKKXX : ", dataciudad)
    return (
        <div>

        </div>
    );
}

export default WidgetUpdateLocation;