import React, { useEffect } from "react";
import { useRouter } from "next/router";

import SkeletonProductDetail from "~/components/elements/skeletons/SkeletonProductDetail";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Container from "~/components/layouts/Container";

import DetailTwo from "~/components/elements/detail/DetailTwo";
import useGetProducts from "~/hooks/useGetProducts";

const DetailLayoutTwo = () => {
    const Router = useRouter();
    const { id } = Router.query;
    const { loading, product, getProductById } = useGetProducts();

    useEffect(() => {
        if (id) {
            getProductById(id);
        }
    }, [id]);

    // View area
    let productView;

    if (loading || product === null) {
        productView = (
            <div className="container">
                <SkeletonProductDetail />
            </div>
        );
    } else {
        productView = <DetailTwo product={product} />;
    }
    const breadcrumb = [
        {
            id: 1,
            text: "Home",
            url: "/",
        },
        {
            id: 2,
            text: "Shop",
            url: "/shop",
        },
        {
            id: 3,
            text: " Face Masks - protective",
        },
    ];
    return (
        <Container title="Product">
            <div className="ps-page ps-page--product">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                    </div>
                    <div className="ps-page__content">{productView}</div>
                </div>
            </div>
        </Container>
    );
};

export default DetailLayoutTwo;
