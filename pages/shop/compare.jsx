import React, { useEffect } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Shop from "~/components/partials/shop/Shop";
import { connect } from "react-redux";
import { caculateArrayQuantity } from "~/utilities/ecomerce-helpers";
import useEcomerce from "~/hooks/useEcomerce";
import SkeletonTable from "~/components/elements/skeletons/SkeletonTable";
import { Result } from "antd";
import EcomerceCompareTables from "~/components/ecomerce/EcomerceCompareTables";

const breadcrumb = [
    {
        text: "Home",
        url: "/",
    },
    {
        text: "Shop",
        url: "/shop",
    },
    {
        text: "Compare",
    },
];
const CompareScreen = ({ ecomerce }) => {
    const { loading, products, getProducts } = useEcomerce();

    useEffect(() => {
        if (ecomerce) {
            getProducts(ecomerce.compareItems);
        }
    }, [ecomerce]);

    // view
    let totalView, wishListView;

    if (products && products.length > 0) {
        totalView = caculateArrayQuantity(products);
        wishListView = <EcomerceCompareTables products={products} />;
    } else {
        if (loading) {
            wishListView = <SkeletonTable rows={2} />;
        } else {
            wishListView = (
                <Result
                    status="warning"
                    title="No hay productos en tu lista de comparación."
                />
            );
        }
    }
    //view

    return (
        <Container title="Compare">
            <div className="ps-page ps-page--inner">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                        <h1 className="ps-page__heading">
                            Compare
                            {totalView ? <sup>({totalView})</sup> : ""}
                        </h1>
                    </div>
                    <div className="ps-page__content">{wishListView}</div>
                </div>
            </div>
        </Container>
    );
};
export default connect((state) => state)(CompareScreen);
