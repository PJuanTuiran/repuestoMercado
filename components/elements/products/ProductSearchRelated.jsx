import React from "react";
import Link from "next/link";
import ModuleProductActions from "~/components/elements/products/modules/ModuleProductActions";
import useProduct from "~/hooks/useProduct";
import { useRouter } from "next/router";
import ModuleProductRating from "~/components/elements/products/modules/ModuleProductRatingRelated";
import ModuleProductImages from "~/components/elements/products/modules/ModuleProductImagesSearch";


const ProductSearchRelated = ({ product }) => {
    const { pricerelatedsearch, badges } = useProduct();

    return (
        <div className="ps-product ps-product--grid positiontwo">
            <div className="ps-product__thumbnail">
                <Link href="/product/[id]" as={`/product/${product.id}`}>
                    <a className="ps-product__overlay"></a>
                </Link>
                <ModuleProductImages product={product} />
                <ModuleProductActions product={product} />
                {badges(product)}
            </div>
            <div className="ps-product__content">
                <h4 className="ps-product__title">
                    <Link href="/product/[id]" as={`/product/${product.id}`}>
                        <div className="tamañotextoprdsearchrelated">{product.name}</div>
                    </Link>
                </h4>
                    {pricerelatedsearch(product)}
                {
                    //<ModuleProductRating />
                }
                
            </div>
        </div>
    );
};

export default ProductSearchRelated;
