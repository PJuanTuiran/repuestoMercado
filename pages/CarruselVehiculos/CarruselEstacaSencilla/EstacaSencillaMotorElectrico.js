import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import logo from "../../../public/imgcarrusel/sedan/nombrelogomr.png";
import { useDispatch, useSelector } from "react-redux";

import uno1 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/1sistemamotor/1.jpg";
import uno2 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/1sistemamotor/2.jpg";
import dos1 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/2sistematraccion/1.jpg";
import dos2 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/2sistematraccion/2.jpg";
import tres1 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/3sistemafrenos/1.jpg";
import tres2 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/3sistemafrenos/2.jpg";
import cuatro1 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/4sistemadireccion/1.jpg";
import cuatro2 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/4sistemadireccion/2.jpg";
import cinco1 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/5sistemasuspension/1.jpg";
import cinco2 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/5sistemasuspension/2.jpg";
import seis1 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/6sistemacaja/1.jpg";
import seis2 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/6sistemacaja/2.jpg";
import siete1 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/7sistemaembrague/1.jpg";
import siete2 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/7sistemaembrague/2.jpg";
import ocho1 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/8sistemainyeccion/1.jpg";
import ocho2 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/8sistemainyeccion/2.jpg";
import nueve1 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/9sistemarefrigeraciongeneral/1.jpg";
import nueve2 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/9sistemarefrigeraciongeneral/2.jpg";
import diez1 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/10sistemarefrigeracioncaja/1.jpg";
import diez2 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/10sistemarefrigeracioncaja/2.jpg";
import once1 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/11sistemaescape/1.jpg";
import once2 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/11sistemaescape/2.jpg";
import doce1 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/12sistemaaireacondicionado/1.jpg";
import doce2 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/12sistemaaireacondicionado/2.jpg";
import trece1 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/13sistemaelectricoaccesorios/1.jpg";
import trece2 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/13sistemaelectricoaccesorios/2.jpg";
import catorce1 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/14sistemadearranque/1.jpg";
import catorce2 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/14sistemadearranque/2.jpg";
import quince1 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/15sistemalimpiabrisas/1.jpg";
import quince2 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/15sistemalimpiabrisas/2.jpg";
import dieciseis1 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/16sistemaelectricomotor/1.jpg";
import dieciseis2 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/16sistemaelectricomotor/2.jpg";

import uno11 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/1sistemamotor/1.jpg";
import uno12 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/1sistemamotor/2.jpg";
import dos11 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/2sistematraccion/1.jpg";
import dos12 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/2sistematraccion/2.jpg";
import tres11 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/3sistemafrenos/1.jpg";
import tres12 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/3sistemafrenos/2.jpg";
import cuatro11 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/4sistemadireccion/1.jpg";
import cuatro12 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/4sistemadireccion/2.jpg";
import cinco11 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/5sistemasuspension/1.jpg";
import cinco12 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/5sistemasuspension/2.jpg";
import seis11 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/6sistemacaja/1.jpg";
import seis12 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/6sistemacaja/2.jpg";
import siete11 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/7sistemaembrague/1.jpg";
import siete12 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/7sistemaembrague/2.jpg";
import ocho11 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/8sistemainyeccion/1.jpg";
import ocho12 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/8sistemainyeccion/2.jpg";
import nueve11 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/9sistemarefrigeraciongeneral/1.jpg";
import nueve12 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/9sistemarefrigeraciongeneral/2.jpg";
import diez11 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/10sistemarefrigeracioncaja/1.jpg";
import diez12 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/10sistemarefrigeracioncaja/2.jpg";
import once11 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/11sistemaescape/1.jpg";
import once12 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/11sistemaescape/2.jpg";
import doce11 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/12sistemaaireacondicionado/1.jpg";
import doce12 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/12sistemaaireacondicionado/2.jpg";
import trece11 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/13sistemaelectricoaccesorios/1.jpg";
import trece12 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/13sistemaelectricoaccesorios/2.jpg";
import catorce11 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/14sistemadearranque/1.jpg";
import catorce12 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/14sistemadearranque/2.jpg";
import quince11 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/15sistemalimpiabrisas/1.jpg";
import quince12 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/15sistemalimpiabrisas/2.jpg";
import dieciseis11 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/16sistemaelectricomotor/1.jpg";
import dieciseis12 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/tracciontrasera/16sistemaelectricomotor/2.jpg";

import uno21 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/1sistemamotor/1.jpg";
import uno22 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/1sistemamotor/2.jpg";
import dos21 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/2sistematraccion/1.jpg";
import dos22 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/2sistematraccion/2.jpg";
import tres21 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/3sistemafrenos/1.jpg";
import tres22 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/3sistemafrenos/2.jpg";
import cuatro21 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/4sistemadireccion/1.jpg";
import cuatro22 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/4sistemadireccion/2.jpg";
import cinco21 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/5sistemasuspension/1.jpg";
import cinco22 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/5sistemasuspension/2.jpg";
import seis21 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/6sistemacaja/1.jpg";
import seis22 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/6sistemacaja/2.jpg";
import siete21 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/7sistemaembrague/1.jpg";
import siete22 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/7sistemaembrague/2.jpg";
import ocho21 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/8sistemainyeccion/1.jpg";
import ocho22 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/8sistemainyeccion/2.jpg";
import nueve21 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/9sistemarefrigeraciongeneral/1.jpg";
import nueve22 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/9sistemarefrigeraciongeneral/2.jpg";
import diez21 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/10sistemarefrigeracioncaja/1.jpg";
import diez22 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/10sistemarefrigeracioncaja/2.jpg";
import once21 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/11sistemaescape/1.jpg";
import once22 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/11sistemaescape/2.jpg";
import doce21 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/12sistemaaireacondicionado/1.jpg";
import doce22 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/12sistemaaireacondicionado/2.jpg";
import trece21 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/13sistemaelectricoaccesorios/1.jpg";
import trece22 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/13sistemaelectricoaccesorios/2.jpg";
import catorce21 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/14sistemadearranque/1.jpg";
import catorce22 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/14sistemadearranque/2.jpg";
import quince21 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/15sistemalimpiabrisas/1.jpg";
import quince22 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/15sistemalimpiabrisas/2.jpg";
import dieciseis21 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/16sistemaelectricomotor/1.jpg";
import dieciseis22 from "~/public/buscadorinteractivo/camionetas/estacacabinasencilla/trenmotriz/traccion4x4/16sistemaelectricomotor/2.jpg";

function EstacaSencillaMotorElectrico(props) {
    const { motorelectrico } = props;
    //alert(motorelectrico)
    //console.log("IMAGEN : ", imagen1)
    const [imagen1, setImagen1] = useState("");
    const [imagen2, setImagen2] = useState("");
    const [fotos, setFotos] = useState(false);

    // Asignamos Datos seleccionado en el buscador interactivo
    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );


    useEffect(() => {
        let tipotraccion = datosbuscadorinteractivo.nombretraccion;

        if (
            tipotraccion == "Tracción" ||
            tipotraccion == "Tracción Delantera"
        ) {
            if (motorelectrico === "1") {
                setImagen1(uno1)
                setImagen2(uno2)
            } else
                if (motorelectrico === "2") {
                    setImagen1(dos1)
                    setImagen2(dos2)
                } else
                    if (motorelectrico === "3") {
                        setImagen1(tres1)
                        setImagen2(tres2)
                    } else
                        if (motorelectrico === "4") {
                            setImagen1(cuatro1)
                            setImagen2(cuatro2)
                        } else
                            if (motorelectrico === "5") {
                                setImagen1(cinco1)
                                setImagen2(cinco2)
                            } else
                                if (motorelectrico === "6") {
                                    setImagen1(seis1)
                                    setImagen2(seis2)
                                } else
                                    if (motorelectrico === "7") {
                                        setImagen1(siete1)
                                        setImagen2(siete2)
                                    } else
                                        if (motorelectrico === "8") {
                                            setImagen1(ocho1)
                                            setImagen2(ocho2)
                                        } else
                                            if (motorelectrico === "9") {
                                                setImagen1(nueve1)
                                                setImagen2(nueve2)
                                            } else
                                                if (motorelectrico === "10") {
                                                    setImagen1(diez1)
                                                    setImagen2(diez2)
                                                } else
                                                    if (motorelectrico === "11") {
                                                        setImagen1(once1)
                                                        setImagen2(once2)
                                                    } else
                                                        if (motorelectrico === "12") {
                                                            setImagen1(doce1)
                                                            setImagen2(doce2)
                                                        } else
                                                            if (motorelectrico === "13") {
                                                                setImagen1(trece1)
                                                                setImagen2(trece2)
                                                            } else
                                                                if (motorelectrico === "14") {
                                                                    setImagen1(catorce1)
                                                                    setImagen2(catorce2)
                                                                } else
                                                                    if (motorelectrico === "15") {
                                                                        setImagen1(quince1)
                                                                        setImagen2(quince2)
                                                                    } else
                                                                        if (motorelectrico === "16") {
                                                                            setImagen1(dieciseis1)
                                                                            setImagen2(dieciseis2)
                                                                        }
        } else
            if (tipotraccion == "Tracción Trasera") {
                if (motorelectrico === "1") {
                    setImagen1(uno11)
                    setImagen2(uno12)
                } else
                    if (motorelectrico === "2") {
                        setImagen1(dos11)
                        setImagen2(dos12)
                    } else
                        if (motorelectrico === "3") {
                            setImagen1(tres11)
                            setImagen2(tres12)
                        } else
                            if (motorelectrico === "4") {
                                setImagen1(cuatro11)
                                setImagen2(cuatro12)
                            } else
                                if (motorelectrico === "5") {
                                    setImagen1(cinco11)
                                    setImagen2(cinco12)
                                } else
                                    if (motorelectrico === "6") {
                                        setImagen1(seis11)
                                        setImagen2(seis12)
                                    } else
                                        if (motorelectrico === "7") {
                                            setImagen1(siete11)
                                            setImagen2(siete12)
                                        } else
                                            if (motorelectrico === "8") {
                                                setImagen1(ocho11)
                                                setImagen2(ocho12)
                                            } else
                                                if (motorelectrico === "9") {
                                                    setImagen1(nueve11)
                                                    setImagen2(nueve12)
                                                } else
                                                    if (motorelectrico === "10") {
                                                        setImagen1(diez11)
                                                        setImagen2(diez12)
                                                    } else
                                                        if (motorelectrico === "11") {
                                                            setImagen1(once11)
                                                            setImagen2(once12)
                                                        } else
                                                            if (motorelectrico === "12") {
                                                                setImagen1(doce11)
                                                                setImagen2(doce12)
                                                            } else
                                                                if (motorelectrico === "13") {
                                                                    setImagen1(trece11)
                                                                    setImagen2(trece12)
                                                                } else
                                                                    if (motorelectrico === "14") {
                                                                        setImagen1(catorce11)
                                                                        setImagen2(catorce12)
                                                                    } else
                                                                        if (motorelectrico === "15") {
                                                                            setImagen1(quince11)
                                                                            setImagen2(quince12)
                                                                        } else
                                                                            if (motorelectrico === "16") {
                                                                                setImagen1(dieciseis11)
                                                                                setImagen2(dieciseis12)
                                                                            }
            } else
                if (tipotraccion == "Tracción 4x4") {
                    if (motorelectrico === "1") {
                        setImagen1(uno21)
                        setImagen2(uno22)
                    } else
                        if (motorelectrico === "2") {
                            setImagen1(dos21)
                            setImagen2(dos22)
                        } else
                            if (motorelectrico === "3") {
                                setImagen1(tres21)
                                setImagen2(tres22)
                            } else
                                if (motorelectrico === "4") {
                                    setImagen1(cuatro21)
                                    setImagen2(cuatro22)
                                } else
                                    if (motorelectrico === "5") {
                                        setImagen1(cinco21)
                                        setImagen2(cinco22)
                                    } else
                                        if (motorelectrico === "6") {
                                            setImagen1(seis21)
                                            setImagen2(seis22)
                                        } else
                                            if (motorelectrico === "7") {
                                                setImagen1(siete21)
                                                setImagen2(siete22)
                                            } else
                                                if (motorelectrico === "8") {
                                                    setImagen1(ocho21)
                                                    setImagen2(ocho22)
                                                } else
                                                    if (motorelectrico === "9") {
                                                        setImagen1(nueve21)
                                                        setImagen2(nueve22)
                                                    } else
                                                        if (motorelectrico === "10") {
                                                            setImagen1(diez21)
                                                            setImagen2(diez22)
                                                        } else
                                                            if (motorelectrico === "11") {
                                                                setImagen1(once21)
                                                                setImagen2(once22)
                                                            } else
                                                                if (motorelectrico === "12") {
                                                                    setImagen1(doce21)
                                                                    setImagen2(doce22)
                                                                } else
                                                                    if (motorelectrico === "13") {
                                                                        setImagen1(trece21)
                                                                        setImagen2(trece22)
                                                                    } else
                                                                        if (motorelectrico === "14") {
                                                                            setImagen1(catorce21)
                                                                            setImagen2(catorce22)
                                                                        } else
                                                                            if (motorelectrico === "15") {
                                                                                setImagen1(quince21)
                                                                                setImagen2(quince22)
                                                                            } else
                                                                                if (motorelectrico === "16") {
                                                                                    setImagen1(dieciseis21)
                                                                                    setImagen2(dieciseis22)
                                                                                }
                }
    }, [motorelectrico]);

    return (
        <div>
            <CarruselEstacaSencilla
                imagen1={imagen1}
                imagen2={imagen2}
            />
        </div>
    );
}

export default EstacaSencillaMotorElectrico;

function CarruselEstacaSencilla(props) {
    const { imagen1, imagen2 } = props;
    return (
        <div>
            <Carousel className='textocarrusel' prevLabel="" nextLabel="" >
                <Carousel.Item interval={2500} controls="false">
                    <img
                        src={imagen1.src}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={2500} controls="false">
                    <img
                        src={imagen2.src}
                        alt="Second slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
}
