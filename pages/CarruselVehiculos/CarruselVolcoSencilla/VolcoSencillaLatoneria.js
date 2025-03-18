import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
/* Imagenes Coupe Latoneria Izquierda */
import izquierda1 from "../../../public/buscadorinteractivo/camionetas/volcocabinasencilla/exterior/izquierda/1.jpg";
import izquierda2 from "../../../public/buscadorinteractivo/camionetas/volcocabinasencilla/exterior/izquierda/2.jpg";
import izquierda3 from "../../../public/buscadorinteractivo/camionetas/volcocabinasencilla/exterior/izquierda/3.jpg";
import izquierda4 from "../../../public/buscadorinteractivo/camionetas/volcocabinasencilla/exterior/izquierda/4.jpg";

/* Imagenes Coupe Latoneria Derecha */
import derecha1 from "../../../public/buscadorinteractivo/camionetas/volcocabinasencilla/exterior/derecha/1.jpg";
import derecha2 from "../../../public/buscadorinteractivo/camionetas/volcocabinasencilla/exterior/derecha/2.jpg";
import derecha3 from "../../../public/buscadorinteractivo/camionetas/volcocabinasencilla/exterior/derecha/3.jpg";
import derecha4 from "../../../public/buscadorinteractivo/camionetas/volcocabinasencilla/exterior/derecha/4.jpg";

/* Imagenes Coupe Latoneria Centro */
import centro1 from "../../../public/buscadorinteractivo/camionetas/volcocabinasencilla/exterior/centro/1.jpg";
import centro2 from "../../../public/buscadorinteractivo/camionetas/volcocabinasencilla/exterior/centro/2.jpg";
import centro3 from "../../../public/buscadorinteractivo/camionetas/volcocabinasencilla/exterior/centro/3.jpg";
import centro4 from "../../../public/buscadorinteractivo/camionetas/volcocabinasencilla/exterior/centro/4.jpg";

import logo from "../../../public/imgcarrusel/sedan/nombrelogomr.png";

function VolcoSencillaLatoneria(props) {
    const { ubicacion } = props;
    const [imagen1, setImagen1] = useState(0);
    const [imagen2, setImagen2] = useState(0);
    const [imagen3, setImagen3] = useState(0);
    const [imagen4, setImagen4] = useState(0);
    const [fotos, setFotos] = useState(false);
    const [pare, setPare] = useState(false);
    //console.log("IMAGEN : ", imagen1)

    useEffect(() => {
        if (ubicacion === "izquierda") {
            setImagen1(izquierda1)
            setImagen2(izquierda2)
            setImagen3(izquierda3)
            setImagen4(izquierda4)
        }

        if (ubicacion === "centro") {
            setImagen1(centro1)
            setImagen2(centro2)
            setImagen3(centro3)
            setImagen4(centro4)
        }

        if (ubicacion === "derecha") {
            setImagen1(derecha1)
            setImagen2(derecha2)
            setImagen3(derecha3)
            setImagen4(derecha4)
        }
    }, [fotos]);

    setTimeout(() => { setPare(true); }, 100);

    return (
        <div>
            <Carousel className='textocarrusel' prevLabel="" nextLabel="" >
                <Carousel.Item interval={2500}>
                    <img
                        className=" d-block w-100"
                        src={imagen1.src}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={2500}>
                    <img
                        className=" d-block w-100"
                        src={imagen2.src}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={2500}>
                    <img
                        className=" d-block w-100"
                        src={imagen3.src}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={2500}>
                    <img
                        className=" d-block w-100"
                        src={imagen4.src}
                        alt="Second slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default VolcoSencillaLatoneria;