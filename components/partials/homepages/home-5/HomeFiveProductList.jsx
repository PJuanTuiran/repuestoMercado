import React, { useEffect } from "react";
import HomeFiveBannerProduct from "~/components/partials/homepages/home-5/HomeFiveBannerProduct";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroup";

const HomeFiveProductList = ({
    collectionSlug,
    reversed = false,
    banner = <HomeFiveBannerProduct type={1} />,
}) => {
    const { loading, productItems, getProducts } = useGetProducts();
    const { withGrid } = useProductGroup();

    useEffect(() => {
        getProducts({ _limit: 6 });
    }, [collectionSlug]);

    const products = withGrid(productItems, loading, 3);

    return (
        <div
            className={`ps-home-product-with-banner ${
                reversed ? "ps-reversed" : false
            }`}>
            <div className="container">
                <div className="ps-section__left ps-home ps-home--block">
                    {banner}
                </div>
                <div className="ps-section__right">{products}</div>
            </div>
        </div>
    );
};

export default HomeFiveProductList;
