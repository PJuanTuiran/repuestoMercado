import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';

const ShopGridItems = ({ queries }) => {
    const [loading, setLoading] = useState(true);

    async function getProducts(queries) {
        setLoading(true);
        const SPProduct = await ProductRepository.getProducts(queries);
        if (SPProduct) {
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        } else {
            console.log('error');
        }
        return SPProduct;
    }

    return <div className="ps-shop-items">{}</div>;
};

export default ShopGridItems;
