import React from "react";
import Link from "next/link";
import ModuleProductActions from "~/components/elements/products/modules/ModuleProductActions";
import useProduct from "~/hooks/useProduct";
import ModuleProductRating from "~/components/elements/products/modules/ModuleProductRating";
import ModuleProductImages from "~/components/elements/products/modules/ModuleProductImages";

const ProductWithAvailable = ({ product }) => {
    const { price, onSale } = useProduct();

    return (
        <div className="ps-product ps-product--grid">
            <div className="ps-product__thumbnail">
                <Link href="/product/[id]" as={`/product/${product.id}`}>
                    <a className="ps-product__overlay"></a>
                </Link>
                <ModuleProductImages product={product} />
                <ModuleProductActions product={product} />
                {onSale(product)}
            </div>
            <div className="ps-product__content">
                <h4 className="ps-product__title">
                    <Link href="/product/[id]" as={`/product/${product.id}`}>
                        <a>{product.name}</a>
                    </Link>
                </h4>
                {price(product)}
                <ModuleProductRating />
                <div className="ps-product__number-available">
                    <span>
                        Número de piezas disponibles <br />
                    </span>
                    <strong>{product.numerounidades}</strong>
                </div>
            </div>
        </div>
    );
};

export default ProductWithAvailable;
