import React, { useEffect } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Shop from "~/components/partials/shop/Shop";

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
                <div className="ps-page__header">
                    <div className="container">
                        <BreadCrumb breacrumb={breadcrumb} />
                        <h1 className="ps-page__heading">
                            Face Masks - protective
                            <sup>(150)</sup>
                        </h1>
                    </div>
                </div>
                <div className="ps-page__content">
                    <Shop classes="ps-shop--seperate" fullwidth={true}>
                        {products}
                    </Shop>
                </div>
            </div>
        </Container>
    );
};

export default ShopWithGridDetailScreen;
