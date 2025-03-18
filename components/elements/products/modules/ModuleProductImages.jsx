import React, { useState } from "react";
import Link from "next/link";
import useProductInteractive from "~/hooks/useProductInteractive";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import { useRouter } from "next/router";
import { myNumber, nameMonth } from "../../../../utilities/ArrayFunctions";
//Constantes
import { URL_IMAGES_RESULTS } from "../../../../helpers/Constants";

const ModuleProductImages = ({ product }) => {
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
        <div className="apuntador" onClick={() => verProduct(product.id)}>
            <div>
                <img
                    className="imageresultprd"
                    src={URL_IMAGES_RESULTS + product.images[0].name}
                    alt="First slide"
                />
            </div>

            <div className="textoubicacionproductoprecio">
                <div className="formatopreciopdrimg">$ {myNumber(1, product.price, 2)}</div>
                <div className="textoprecioprdimg">{product.name}</div>
            </div>
        </div>
    );
};

export default ModuleProductImages;
