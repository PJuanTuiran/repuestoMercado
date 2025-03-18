import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import ProductRepository from "~/repositories/ProductRepository";
import SkeletonProductDetail from "~/components/elements/skeletons/SkeletonProductDetail";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Container from "~/components/layouts/Container";

import WidgetProductPromotion from "~/components/shared/widgets/WidgetProductPromotion";
import DetailDefault from "~/components/elements/detail/DetailDefault";
import WidgetShopRelatedProducts from "~/components/shared/widgets/WidgetShopRelatedProducts";
import WidgetShopPromotion from "~/components/shared/widgets/WidgetShopPromotion";
import CustomerBought from "~/components/partials/products/CustomerBought";
import useGetProducts from "~/hooks/useGetProducts";

const ProductDetailPage = () => {
    const Router = useRouter();
    const { id } = Router.query;
    const { loading, product, getPublicatById } = useGetProducts();
    //console.log("DATOS PRODUCTO : ", product);
    const [ nombreProducto, setNombreProducto ] = useState("Productos")

    useEffect(() => {
        if (id) {
            getPublicatById(id);
        }
    }, [id]);

    useEffect(() => {
        if(product)
            setNombreProducto(product.name)
    }, [product]);

    // View area
    let productView;

    if (loading || product === null) {
        productView = (
            <div className="container">
                <SkeletonProductDetail />
            </div>
        );
    } else {
        productView = <DetailDefault product={product} />;
    }

    const breadcrumb = [
        {
            id: 1,
            text: "Inicio",
            url: "/",
        },
        {
            id: 2,
            text: "Tienda",
            url: "/shop",
        },
        {
            id: 3,
            text: nombreProducto,
        },
    ];

    return (
        <Container title="Product">
            <div className="ps-page ps-page--product">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                    </div>
                    <div className="ps-page__content">
                        <div className="ps-layout--with-sidebar ps-reverse">
                            <div className="ps-layout__left">
                                <WidgetProductPromotion />
                                <WidgetShopRelatedProducts />
                                <WidgetShopPromotion />
                            </div>
                            <div className="ps-layout__right">
                                {productView}
                            </div>
                        </div>
                    </div>
                </div>
                <CustomerBought />
            </div>
        </Container>
    );
};

export default ProductDetailPage;
