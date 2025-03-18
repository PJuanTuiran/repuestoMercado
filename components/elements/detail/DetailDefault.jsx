import React from "react";
import ModuleDetailTopInformation from "~/components/elements/detail/modules/ModuleDetailTopInformation";
import ModuleProductDetailDescription from "~/components/elements/detail/modules/ModuleProductDetailDescription";
import ModuleDetailShoppingActions from "~/components/elements/detail/modules/ModuleDetailShoppingActions";
import ModuleProductDetailSharing from "~/components/elements/detail/modules/ModuleProductDetailSharing";
import ModuleDetailThumbnail from "~/components/elements/detail/modules/ModuleDetailThumbnail";
import useProduct from "~/hooks/useProduct";
import ModuleDetailMeta from "~/components/elements/detail/modules/ModuleDetailMeta";
import ModuleDetailColors from "~/components/elements/detail/modules/ModuleDetailColors";
import ModuleDetailSizes from "~/components/elements/detail/modules/ModuleDetailSizes";
import ModuleDetailTabs from "~/components/elements/detail/modules/ModuleDetailTabs";
import FrequentlyBoughtTogether from "~/components/partials/products/FrequentlyBoughtTogether";

const DetailDefault = ({ product, status = "in-stock" }) => {
    console.log(" PRODUCTODETAIL : ", product);
    const { price } = useProduct();
    let statusView;

    if (status !== "out-stock") {
        statusView = (
            <p className="ps-product__log-status">
                Unidades Disponibles : {product.numerounidades}
            </p>
        );
    } else {
        statusView = (
            <p className="ps-product__log-status outstock">Out of stock</p>
        );
    }

    return (
        <div className="product--detail ps-product--detail">
            <div className="ps-product__header">
                <ModuleDetailThumbnail product={product} />
                <div className="ps-product__info">
                    {statusView}
                    <ModuleDetailTopInformation product={product} />
                    <ModuleProductDetailDescription product={product} />
                    {price(product)}
                    <div className="ps-product__variants">
                        {
                            //<ModuleDetailColors />
                            //<ModuleDetailSizes />
                        }
                    </div>
                    {status !== "out-stock" && (
                        <ModuleDetailShoppingActions product={product} />
                    )}
                    <ModuleDetailMeta />
                    <ModuleProductDetailSharing />
                </div>
            </div>
            <div className="ps-product__content ">
                <FrequentlyBoughtTogether />
                <ModuleDetailTabs product={product} />
            </div>
        </div>
    );
};

export default DetailDefault;
