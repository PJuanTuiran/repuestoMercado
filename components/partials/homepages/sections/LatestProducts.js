import React, { useEffect } from "react";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroup";

const LatestProducts = ({ collectionSlug }) => {

    let products = [];

    return (
        <div className="ps-section--standard ps-latest-products">
            <div className="container">
                <div className="ps-section__header">
                    <h3>Últimos Productos</h3>
                </div>
                <div className="ps-section__content">{products}</div>
            </div>
        </div>
    );
};

export default LatestProducts;
