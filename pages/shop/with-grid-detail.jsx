import React, { useEffect } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import SidebarShop from "~/components/shared/sidebar/SidebarShop";
import Shop from "~/components/partials/shop/Shop";
import PromotionSecureInformation from "~/components/shared/sections/PromotionSecureInformation";
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
const ShopWithGridDetailScreen = () => {
    const { withGridDetail } = useProductGroup();

    let products;

    return (
        <Container title="Shop">
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

export default ShopWithGridDetailScreen;
