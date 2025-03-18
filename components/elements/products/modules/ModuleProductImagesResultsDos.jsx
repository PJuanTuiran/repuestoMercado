import React, { useState } from "react";
import Link from "next/link";
import useProductInteractive from "~/hooks/useProductInteractive";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import { useRouter } from "next/router";
import { myNumber, nameMonth } from "../../../../utilities/ArrayFunctions";

//Constantes
import { URL_IMAGES_RESULTS } from "../../../../helpers/Constants";

const ModuleProductImagesResultsDos = ({ product }) => {
    const { price, badges, thumbnailImages } = useProductInteractive();
    const [showName, setShowName] = useState(false);

    const router = useRouter();
    const verProduct = (dat) => {
        let ruta = "/product/" + dat;
        router.push(ruta);
    };

    const mostrarNombre = () => {
        setShowName(true);
    };

    const ocultarNombre = () => {
        setShowName(false);
    };

    return (
        <div
            className="ps-product__images ml-10 apuntador"
            onClick={() => verProduct(product.id)}
            onMouseEnter={() => mostrarNombre()}
            onMouseLeave={() => ocultarNombre()}>
            <img
                className="imageresult"
                src={URL_IMAGES_RESULTS + product.images[0].name}
                alt="First slide"
            />
            <div className="textoubicacionproductoprecio">
                {showName ? <a>{product.name}</a> : null}
            </div>
        </div>
    );
};

export default ModuleProductImagesResultsDos;
