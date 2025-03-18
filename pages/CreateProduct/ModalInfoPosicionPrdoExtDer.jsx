import React, { useState, useEffect, useRef } from "react";
import { Button, Row, Col, Form, Dropdown } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";

function ModalInfoPosicionPrdExtDer({
    shown,
    close,
    texto,
    mensajeUbicacionProd,
    posicionUbicacionProd,
    tipoVehUno,
    mostrarCodigo,
}) {
    const ref = useRef();
    const [carrocerias, setCarrocerias] = useState([]);
    const [isModalOpen, setModalOpen] = useState(null);
    const [imagen, setImagen] = useState(null);
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

        if (mostrarCodigo == 1) {
            if (codigo == 24) {
                imagensel = "/buscadorinteractivo/sedan/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 8) {
                imagensel = "/buscadorinteractivo/coupe/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 2) {
                imagensel =
                    "/buscadorinteractivo/automoviltrespuertas/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 3) {
                imagensel =
                    "/buscadorinteractivo/automovilcincopuertas/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 16) {
                imagensel =
                    "/buscadorinteractivo/camionetas/estacadoblechasis/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 17) {
                imagensel =
                    "/buscadorinteractivo/camionetas/estacacabinasencilla/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 20) {
                imagensel =
                    "/buscadorinteractivo/camionetas/volcodoblecabina/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 21) {
                imagensel =
                    "/buscadorinteractivo/camionetas/volcocabinasencilla/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 25) {
                imagensel =
                    "/buscadorinteractivo/camionetas/suvcamperostrespuertas/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 26) {
                imagensel =
                    "/buscadorinteractivo/camionetas/suvcamperoscincopuertas/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 60) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/articuladocontrompa/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 13) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/dobletroquecontrompa/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 18) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/gruacontrompa/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 35) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/sencillocontrompa/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 31) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/volquetadoblecontrompa/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 32) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/volquetasencillacontrompa/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 1) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/articuladosintrompa/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 10) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/cuatromanos/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 84) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/dobletroquesintrompa/sexterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 87) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/gruasintrompa/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 7) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/sencillosintrompa/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 123) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/volquetadoblesintrompa/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 121) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/volquetasencillasintrompa/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 4) {
                imagensel =
                    "/buscadorinteractivo/vansybuses/bus/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 122) {
                imagensel =
                    "/buscadorinteractivo/vansybuses/buseta/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 30) {
                imagensel =
                    "/buscadorinteractivo/vansybuses/vans/exterior/derecha/3.jpg";
                setImagen(imagensel);
            } else if (codigo == 5) {
                imagensel =
                    "/buscadorinteractivo/motos/calle/exterior/derecha/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 12) {
                imagensel =
                    "/buscadorinteractivo/motos/deportiva/exterior/derecha/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 14) {
                imagensel =
                    "/buscadorinteractivo/motos/enduro/exterior/derecha/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 22) {
                imagensel =
                    "/buscadorinteractivo/motos/scooter/exterior/derecha/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 28) {
                imagensel =
                    "/buscadorinteractivo/motos/touring/exterior/derecha/1.jpg";
                setImagen(imagensel);
            }
        } else if (mostrarCodigo == 2) {
            if (codigo == 24) {
                imagensel = "/buscadorinteractivo/sedan/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 8) {
                imagensel = "/buscadorinteractivo/coupe/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 2) {
                imagensel =
                    "/buscadorinteractivo/automoviltrespuertas/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 3) {
                imagensel =
                    "/buscadorinteractivo/automovilcincopuertas/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 16) {
                imagensel =
                    "/buscadorinteractivo/camionetas/estacadoblechasis/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 17) {
                imagensel =
                    "/buscadorinteractivo/camionetas/estacacabinasencilla/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 20) {
                imagensel =
                    "/buscadorinteractivo/camionetas/volcodoblecabina/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 21) {
                imagensel =
                    "/buscadorinteractivo/camionetas/volcocabinasencilla/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 25) {
                imagensel =
                    "/buscadorinteractivo/camionetas/suvcamperostrespuertas/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 26) {
                imagensel =
                    "/buscadorinteractivo/camionetas/suvcamperoscincopuertas/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 60) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/articuladocontrompa/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 13) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/dobletroquecontrompa/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 18) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/gruacontrompa/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 35) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/sencillocontrompa/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 31) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/volquetadoblecontrompa/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 32) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/volquetasencillacontrompa/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 1) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/articuladosintrompa/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 10) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/cuatromanos/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 84) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/dobletroquesintrompa/sexterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 87) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/gruasintrompa/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 7) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/sencillosintrompa/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 123) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/volquetadoblesintrompa/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 121) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/volquetasencillasintrompa/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 4) {
                imagensel =
                    "/buscadorinteractivo/vansybuses/bus/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 122) {
                imagensel =
                    "/buscadorinteractivo/vansybuses/buseta/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 30) {
                imagensel =
                    "/buscadorinteractivo/vansybuses/vans/exterior/centro/4.jpg";
                setImagen(imagensel);
            } else if (codigo == 5) {
                imagensel =
                    "/buscadorinteractivo/motos/calle/exterior/centro/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 12) {
                imagensel =
                    "/buscadorinteractivo/motos/deportiva/exterior/centro/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 14) {
                imagensel =
                    "/buscadorinteractivo/motos/enduro/exterior/centro/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 22) {
                imagensel =
                    "/buscadorinteractivo/motos/scooter/exterior/centro/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 28) {
                imagensel =
                    "/buscadorinteractivo/motos/touring/exterior/centro/1.jpg";
                setImagen(imagensel);
            }
        } else if (mostrarCodigo == 3) {
            if (codigo == 24) {
                imagensel =
                    "/buscadorinteractivo/sedan/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 8) {
                imagensel =
                    "/buscadorinteractivo/coupe/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 2) {
                imagensel =
                    "/buscadorinteractivo/automoviltrespuertas/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 3) {
                imagensel =
                    "/buscadorinteractivo/automovilcincopuertas/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 16) {
                imagensel =
                    "/buscadorinteractivo/camionetas/estacadoblechasis/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 17) {
                imagensel =
                    "/buscadorinteractivo/camionetas/estacacabinasencilla/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 20) {
                imagensel =
                    "/buscadorinteractivo/camionetas/volcodoblecabina/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 21) {
                imagensel =
                    "/buscadorinteractivo/camionetas/volcocabinasencilla/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 25) {
                imagensel =
                    "/buscadorinteractivo/camionetas/suvcamperostrespuertas/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 26) {
                imagensel =
                    "/buscadorinteractivo/camionetas/suvcamperoscincopuertas/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 60) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/articuladocontrompa/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 13) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/dobletroquecontrompa/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 18) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/gruacontrompa/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 35) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/sencillocontrompa/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 31) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/volquetadoblecontrompa/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 32) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/volquetasencillacontrompa/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 1) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/articuladosintrompa/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 10) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/cuatromanos/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 84) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/dobletroquesintrompa/sexterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 87) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/gruasintrompa/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 7) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/sencillosintrompa/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 123) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/volquetadoblesintrompa/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 121) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/volquetasencillasintrompa/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 4) {
                imagensel =
                    "/buscadorinteractivo/vansybuses/bus/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 122) {
                imagensel =
                    "/buscadorinteractivo/vansybuses/buseta/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 30) {
                imagensel =
                    "/buscadorinteractivo/vansybuses/vans/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 5) {
                imagensel =
                    "/buscadorinteractivo/motos/calle/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 12) {
                imagensel =
                    "/buscadorinteractivo/motos/deportiva/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 14) {
                imagensel =
                    "/buscadorinteractivo/motos/enduro/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 22) {
                imagensel =
                    "/buscadorinteractivo/motos/scooter/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            } else if (codigo == 28) {
                imagensel =
                    "/buscadorinteractivo/motos/touring/exterior/izquierda/1.jpg";
                setImagen(imagensel);
            }
        } else if (mostrarCodigo == 4) {
            if (codigo == 24) {
                imagensel = "/buscadorinteractivo/sedan/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 8) {
                imagensel = "/buscadorinteractivo/coupe/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 2) {
                imagensel =
                    "/buscadorinteractivo/automoviltrespuertas/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 3) {
                imagensel =
                    "/buscadorinteractivo/automovilcincopuertas/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 16) {
                imagensel =
                    "/buscadorinteractivo/camionetas/estacadoblechasis/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 17) {
                imagensel =
                    "/buscadorinteractivo/camionetas/estacacabinasencilla/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 20) {
                imagensel =
                    "/buscadorinteractivo/camionetas/volcodoblecabina/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 21) {
                imagensel =
                    "/buscadorinteractivo/camionetas/volcocabinasencilla/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 25) {
                imagensel =
                    "/buscadorinteractivo/camionetas/suvcamperostrespuertas/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 26) {
                imagensel =
                    "/buscadorinteractivo/camionetas/suvcamperoscincopuertas/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 60) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/articuladocontrompa/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 13) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/dobletroquecontrompa/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 18) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/gruacontrompa/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 35) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/sencillocontrompa/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 31) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/volquetadoblecontrompa/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 32) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/volquetasencillacontrompa/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 1) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/articuladosintrompa/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 10) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/cuatromanos/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 84) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/dobletroquesintrompa/sinterior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 87) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/gruasintrompa/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 7) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/sencillosintrompa/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 123) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/volquetadoblesintrompa/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 121) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/volquetasencillasintrompa/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 4) {
                imagensel =
                    "/buscadorinteractivo/vansybuses/bus/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 122) {
                imagensel =
                    "/buscadorinteractivo/vansybuses/buseta/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 30) {
                imagensel =
                    "/buscadorinteractivo/vansybuses/vans/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 5) {
                imagensel =
                    "/buscadorinteractivo/motos/calle/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 12) {
                imagensel =
                    "/buscadorinteractivo/motos/deportiva/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 14) {
                imagensel =
                    "/buscadorinteractivo/motos/enduro/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 22) {
                imagensel =
                    "/buscadorinteractivo/motos/scooter/interior/tablero.jpg";
                setImagen(imagensel);
            } else if (codigo == 28) {
                imagensel =
                    "/buscadorinteractivo/motos/touring/interior/tablero.jpg";
                setImagen(imagensel);
            }
        } else if (mostrarCodigo == 5) {
            if (codigo == 24) {
                imagensel = "/buscadorinteractivo/sedan/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 8) {
                imagensel = "/buscadorinteractivo/coupe/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 2) {
                imagensel =
                    "/buscadorinteractivo/automoviltrespuertas/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 3) {
                imagensel =
                    "/buscadorinteractivo/automovilcincopuertas/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 16) {
                imagensel =
                    "/buscadorinteractivo/camionetas/estacadoblechasis/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 17) {
                imagensel =
                    "/buscadorinteractivo/camionetas/estacacabinasencilla/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 20) {
                imagensel =
                    "/buscadorinteractivo/camionetas/volcodoblecabina/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 21) {
                imagensel =
                    "/buscadorinteractivo/camionetas/volcocabinasencilla/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 25) {
                imagensel =
                    "/buscadorinteractivo/camionetas/suvcamperostrespuertas/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 26) {
                imagensel =
                    "/buscadorinteractivo/camionetas/suvcamperoscincopuertas/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 60) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/articuladocontrompa/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 13) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/dobletroquecontrompa/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 18) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/gruacontrompa/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 35) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/sencillocontrompa/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 31) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/volquetadoblecontrompa/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 32) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/volquetasencillacontrompa/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 1) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/articuladosintrompa/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 10) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/cuatromanos/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 84) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/dobletroquesintrompa/sinterior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 87) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/gruasintrompa/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 7) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/sencillosintrompa/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 123) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/volquetadoblesintrompa/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 121) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/volquetasencillasintrompa/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 4) {
                imagensel =
                    "/buscadorinteractivo/vansybuses/bus/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 122) {
                imagensel =
                    "/buscadorinteractivo/vansybuses/buseta/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 30) {
                imagensel =
                    "/buscadorinteractivo/vansybuses/vans/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 5) {
                imagensel =
                    "/buscadorinteractivo/motos/calle/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 12) {
                imagensel =
                    "/buscadorinteractivo/motos/deportiva/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 14) {
                imagensel =
                    "/buscadorinteractivo/motos/enduro/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 22) {
                imagensel =
                    "/buscadorinteractivo/motos/scooter/interior/asientos.jpg";
                setImagen(imagensel);
            } else if (codigo == 28) {
                imagensel =
                    "/buscadorinteractivo/motos/touring/interior/asientos.jpg";
                setImagen(imagensel);
            }
        } else if (mostrarCodigo == 6) {
            if (codigo == 24) {
                imagensel = "/buscadorinteractivo/sedan/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 8) {
                imagensel = "/buscadorinteractivo/coupe/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 2) {
                imagensel =
                    "/buscadorinteractivo/automoviltrespuertas/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 3) {
                imagensel =
                    "/buscadorinteractivo/automovilcincopuertas/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 16) {
                imagensel =
                    "/buscadorinteractivo/camionetas/estacadoblechasis/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 17) {
                imagensel =
                    "/buscadorinteractivo/camionetas/estacacabinasencilla/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 20) {
                imagensel =
                    "/buscadorinteractivo/camionetas/volcodoblecabina/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 21) {
                imagensel =
                    "/buscadorinteractivo/camionetas/volcocabinasencilla/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 25) {
                imagensel =
                    "/buscadorinteractivo/camionetas/suvcamperostrespuertas/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 26) {
                imagensel =
                    "/buscadorinteractivo/camionetas/suvcamperoscincopuertas/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 60) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/articuladocontrompa/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 13) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/dobletroquecontrompa/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 18) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/gruacontrompa/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 35) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/sencillocontrompa/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 31) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/volquetadoblecontrompa/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 32) {
                imagensel =
                    "/buscadorinteractivo/camionestrompa/volquetasencillacontrompa/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 1) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/articuladosintrompa/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 10) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/cuatromanos/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 84) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/dobletroquesintrompa/sinterior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 87) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/gruasintrompa/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 7) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/sencillosintrompa/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 123) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/volquetadoblesintrompa/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 121) {
                imagensel =
                    "/buscadorinteractivo/camionessintrompa/volquetasencillasintrompa/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 4) {
                imagensel =
                    "/buscadorinteractivo/vansybuses/bus/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 122) {
                imagensel =
                    "/buscadorinteractivo/vansybuses/buseta/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 30) {
                imagensel =
                    "/buscadorinteractivo/vansybuses/vans/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 5) {
                imagensel =
                    "/buscadorinteractivo/motos/calle/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 12) {
                imagensel =
                    "/buscadorinteractivo/motos/deportiva/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 14) {
                imagensel =
                    "/buscadorinteractivo/motos/enduro/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 22) {
                imagensel =
                    "/buscadorinteractivo/motos/scooter/interior/techo.jpg";
                setImagen(imagensel);
            } else if (codigo == 28) {
                imagensel =
                    "/buscadorinteractivo/motos/touring/interior/techo.jpg";
                setImagen(imagensel);
            }
        }
        //console.log("IMAGEN : ", imagensel);
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
                                className="cerrarmodal colorbase"
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

export default ModalInfoPosicionPrdExtDer;
