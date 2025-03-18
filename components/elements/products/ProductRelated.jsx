import React from "react";
import Link from "next/link";
import ModuleProductActionsRelated from "~/components/elements/products/modules/ModuleProductActionsRelated";
import useProduct from "~/hooks/useProduct";
import ModuleProductRating from "~/components/elements/products/modules/ModuleProductRating";
import ModuleProductImagesRelated from "~/components/elements/products/modules/ModuleProductImagesRelated";

const ProductRelated = ({ product }) => {
    const { price, badges } = useProduct();

    return (
        <div className="ps-product ps-product--grid positiontwo">
            <div className="ps-product__thumbnail">
                <Link href="/product/[id]" as={`/product/${product.id}`}>
                    <a className="ps-product__overlay"></a>
                </Link>
                <ModuleProductImagesRelated product={product} />
                {
                    <ModuleProductActionsRelated product={product} />
                }
                {badges(product)}
            </div>
            <div className="cajaproductrelated">
                <h4 className="ml-4 ps-product__title">
                    <Link href="/product/[id]" as={`/product/${product.id}`}>
                        <div className="tamañotextotooltipproducto">
                            {product.name}
                        </div>
                    </Link>
                </h4>
                {/*
                    price(product)
                    <ModuleProductRating />
                */}
            </div>
        </div>
    );
};

export default ProductRelated;
