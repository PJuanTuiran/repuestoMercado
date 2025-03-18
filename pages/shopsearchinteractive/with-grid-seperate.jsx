import React, { useEffect } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Shop from "~/components/partials/shop/Shop";
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
const ShopWithGridDetailScreen = () => {
    const { loading, productItems, getProducts } = useGetProducts();
    const { withGridDetail } = useProductGroup();

    useEffect(() => {
        const queries = {
            _limit: 12,
        };
        getProducts(queries);
    }, []);

    let products;
    if (productItems && productItems.length > 0) {
        products = withGridDetail(productItems, loading, 4);
    } else {
        products = withGridDetail([], loading, 4);
    }

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
