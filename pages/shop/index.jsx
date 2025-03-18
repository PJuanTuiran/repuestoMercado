import React, { useEffect } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import ShopSearchIconoTres from "~/components/partials/shop/ShopSearchIconoTres";
import SidebarShopInteractiveSearch from "~/components/shared/sidebar/SidebarShopInteractiveSearch";
import PromotionSecureInformation from "~/components/shared/sections/PromotionSecureInformation";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroup";
import ShopBestSellers from "~/components/partials/shop/ShopBestSellers";
import { useRouter } from "next/router";

const breadcrumb = [
    {
        id: 1,
        text: "Home",
        url: "/",
    },

    {
        id: 2,
        text: "Shop",
    },
];

const ShopScreen = () => {
    const { loading, productItems, getProducts } = useGetProducts();
    const { withGrid, withList } = useProductGroup();
    const Router = useRouter();
    const { query } = Router;
    let products = "";

    useEffect(() => {
        const queries = {
            _limit: 24,
        };
        getProducts(queries);
    }, []);

    if (productItems && productItems.length > 0) {
        if (query) {
            if (query.layout === "list") {
                products = withList(productItems, loading, 4);
            } else if (query.layout === "grid") {
                products = withGrid(productItems, loading, 4);
                switch (query.columns) {
                    case "2":
                        products = withGrid(productItems, loading, 2);
                        break;
                    case "3":
                        products = withGrid(productItems, loading, 3);
                        break;
                    default:
                        products = withGrid(productItems, loading, 4);
                        break;
                }
            } else {
                products = withGrid(productItems, loading, 4);
            }
        } else {
            products = withGrid(productItems, loading, 4);
        }
    }

    return (
        <Container title="Shop">
            <div className="ps-page ps-page--shopping">
                <div className="containersearchinteractive">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                        <h1 className="ps-page__heading">
                            
                            <a className="tamañotextoextrellas">
                                Shop  (
                                {productItems && productItems.length > 0
                                    ? productItems.length
                                    : 0}
                                )
                            </a>
                        </h1>
                    </div>
                    <div className="ps-page__content">
                        <div className="ps-layout--with-sidebar">
                            <div className="ps-layout__left tamañocajasidebarshop">
                                <SidebarShopInteractiveSearch />
                            </div>
                            <div className="mlmenos40 ps-layout__right">
                                <ShopBestSellers />
                                <ShopSearchIconoTres 
                                    classes="ps-shop--grid"
                                >
                                    {products}
                                </ShopSearchIconoTres>
                                <PromotionSecureInformation />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ShopScreen;
