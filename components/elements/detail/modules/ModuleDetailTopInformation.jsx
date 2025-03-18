import React from "react";
import Link from "next/link";
import Rating from "~/components/elements/Rating";
import useProduct from "~/hooks/useProduct";

const ModuleDetailTopInformation = ({ product }) => {
    // Views
    const { priceviewsingle } = useProduct();
    const { brand } = useProduct();
    //console.log("INFO PRODUCTO : ", product)

    return (
        <header className="ps-product__top-info">
            <h3 className="nameprdviewsingle">{product && product.name}</h3>
            {priceviewsingle(product && product)}
          
            {/*
            <div className="ps-product__rating">
                <Rating />
                <span className="ml-20">(1 revisión)</span>
            </div>
             */}
        </header>
    );
};

export default ModuleDetailTopInformation;
