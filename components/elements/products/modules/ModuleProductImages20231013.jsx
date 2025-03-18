import React, { useState } from "react";
import Link from "next/link";
import useProductInteractive from "~/hooks/useProductInteractive";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import { useRouter } from "next/router";
import { myNumber, nameMonth } from "../../../../utilities/ArrayFunctions";

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
        <div className="ps-product__images apuntador"
            onClick={() => verProduct(product.id)}
            onMouseEnter={() => mostrarNombre()}
            onMouseLeave={() => ocultarNombre()}>
                
            {thumbnailImages(product)}
            <div className="textoubicacionproductoprecio">
                <a>$ {myNumber(1, product.price, 2)}</a>
                <br/>
                {
                    showName ?
                    <a>{product.name}</a>
                    :
                    null
                }
            </div>
        </div>
    );
};

export default ModuleProductImages;
