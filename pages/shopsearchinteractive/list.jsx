import React, { useEffect } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import SidebarShop from "~/components/shared/sidebar/SidebarShop";
import Shop from "~/components/partials/shop/Shop";
import PromotionSecureInformation from "~/components/shared/sections/PromotionSecureInformation";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroup";

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
const ShopProductList = () => {
    const { loading, productItems, getProducts } = useGetProducts();
    const { withList } = useProductGroup();

    useEffect(() => {
        const queries = {
            _limit: 12,
        };
        getProducts(queries);
    }, []);

    let products;
    if (productItems && productItems.length > 0) {
        products = withList(productItems, loading, 3);
    } else {
        products = withList([], loading, 4);
    }

    return (
        <Container title="Shop List">
            <div className="ps-page ps-page--shopping">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                        <h1 className="ps-page__heading">
                            Face Masks - protective
                            <sup>(150)</sup>
                        </h1>
                    </div>
                    <div className="ps-page__content">
                        <div className="ps-layout--with-sidebar">
                            <div className="ps-layout__left">
                                <SidebarShop />
                            </div>
                            <div className="ps-layout__right">
                                <Shop>{products}</Shop>
                                <PromotionSecureInformation />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ShopProductList;
