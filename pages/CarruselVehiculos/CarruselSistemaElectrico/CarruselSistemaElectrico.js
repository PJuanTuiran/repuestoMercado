import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import logo from "../../../public/imgcarrusel/sedan/nombrelogomr.png";
import { useDispatch, useSelector } from "react-redux";

function CarruselSistemaElectrico(props) {
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
        
        if (motorelectrico === "1") {
            setImagen1("https://gimcloud.com.co/files/imagenesbuscador/vistaa/1sistemamotor.jpg")
            setImagen2("https://gimcloud.com.co/files/imagenesbuscador/vistab/1sistemamotor.jpg")
        } else
            if (motorelectrico === "2") {
                setImagen1("https://gimcloud.com.co/files/imagenesbuscador/vistaa/13sistemaelectricoaccesorios.jpg")
                setImagen2("https://gimcloud.com.co/files/imagenesbuscador/vistab/13sistemaelectricoaccesorios.jpg")
            } else
                if (motorelectrico === "3") {
                    setImagen1("https://gimcloud.com.co/files/imagenesbuscador/vistaa/3sistemafrenos.jpg")
                    setImagen2("https://gimcloud.com.co/files/imagenesbuscador/vistab/3sistemafrenos.jpg")
                } else
                    if (motorelectrico === "4") {
                        setImagen1("https://gimcloud.com.co/files/imagenesbuscador/vistaa/4sistemadireccion.jpg")
                        setImagen2("https://gimcloud.com.co/files/imagenesbuscador/vistab/4sistemadireccion.jpg")
                    } else
                        if (motorelectrico === "5") {
                            setImagen1("https://gimcloud.com.co/files/imagenesbuscador/vistaa/5sistemasuspension.jpg")
                            setImagen2("https://gimcloud.com.co/files/imagenesbuscador/vistab/5sistemasuspension.jpg")
                        } else
                            if (motorelectrico === "9") {
                                setImagen1("https://gimcloud.com.co/files/imagenesbuscador/vistaa/9sistemarefrigeraciongeneral.jpg")
                                setImagen2("https://gimcloud.com.co/files/imagenesbuscador/vistab/9sistemarefrigeraciongeneral.jpg")
                            } else
                                if (motorelectrico === "12") {
                                    setImagen1("https://gimcloud.com.co/files/imagenesbuscador/vistaa/13sistemaelectricoaccesorios.jpg")
                                    setImagen2("https://gimcloud.com.co/files/imagenesbuscador/vistab/13sistemaelectricoaccesorios.jpg")
                                } else
                                    if (motorelectrico === "13") {
                                        setImagen1("https://gimcloud.com.co/files/imagenesbuscador/vistaa/13sistemaelectricoaccesorios.jpg")
                                        setImagen2("https://gimcloud.com.co/files/imagenesbuscador/vistab/13sistemaelectricoaccesorios.jpg")
                                    } else
                                        if (motorelectrico === "15") {
                                            setImagen1("https://gimcloud.com.co/files/imagenesbuscador/vistaa/15sistemalimpiabrisas.jpg")
                                            setImagen2("https://gimcloud.com.co/files/imagenesbuscador/vistab/15sistemalimpiabrisas.jpg")
                                        } else
                                            if (motorelectrico === "16") {  
                                                setImagen1("https://gimcloud.com.co/files/imagenesbuscador/vistaa/13sistemaelectricoaccesorios.jpg")
                                                setImagen2("https://gimcloud.com.co/files/imagenesbuscador/vistab/13sistemaelectricoaccesorios.jpg")
                                            }


    }, [motorelectrico]);

    return (
        <div>
            <CarruseTresPuertas
                imagen1={imagen1}
                imagen2={imagen2}
            />
        </div>
    );
}

export default CarruselSistemaElectrico;

function CarruseTresPuertas(props) {
    const { imagen1, imagen2 } = props; 
    
    return (
        <div>
            <Carousel className='textocarrusel' prevLabel="" nextLabel="" >
                <Carousel.Item interval={2500} controls="false">
                    <img
                        src={imagen1}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={2500} controls="false">
                    <img
                        src={imagen2}
                        alt="Second slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
}
