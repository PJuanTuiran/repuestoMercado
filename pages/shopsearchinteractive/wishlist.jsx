import React, { useEffect } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Shop from "~/components/partials/shop/Shop";
import { connect } from "react-redux";
import { caculateArrayQuantity } from "~/utilities/ecomerce-helpers";
import useEcomerce from "~/hooks/useEcomerce";
import ModuleEcomerceWishlist from "~/components/ecomerce/modules/ModuleEcomerceWishlist";
import SkeletonTable from "~/components/elements/skeletons/SkeletonTable";
import { Result } from "antd";

const breadcrumb = [
    {
        text: "Inicio",
        url: "/",
    },
    {
        text: "Tienda",
        url: "/shopping-cart",
    },
    {
        text: "Lista de deseos",
    },
];

const WishlistScreen = ({ ecomerce }) => {
    const { loading, products, getProducts } = useEcomerce();

    useEffect(() => {
        if (ecomerce) {
            getProducts(ecomerce.wishlistItems);
        }
    }, [ecomerce]);
    // view
    let totalView, wishListView;
    if (products && products.length > 0) {
        totalView = caculateArrayQuantity(products);
        wishListView = <ModuleEcomerceWishlist source={products} />;
    } else {
        if (loading) {
            wishListView = <SkeletonTable rows={1} />;
        } else {
            wishListView = (
                <Result status="warning" title="Ningún producto en su lista de deseos." />
            );
        }
    }
    //view

    return (
        <Container title="Wishlist">
            <div className="ps-page ps-page--inner">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                        <h1 className="ps-page__heading">
                            Lista de deseos
                            {totalView ? <sup>({totalView})</sup> : ""}
                        </h1>
                    </div>
                    <div className="ps-page__content">{wishListView}</div>
                </div>
            </div>
        </Container>
    );
};
export default connect((state) => state)(WishlistScreen);
