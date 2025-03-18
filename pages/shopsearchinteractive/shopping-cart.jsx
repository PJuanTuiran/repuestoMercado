import React, { useEffect } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Shop from "~/components/partials/shop/Shop";
import Link from "next/link";
import ModuleEcomerceCartItems from "~/components/ecomerce/modules/ModuleEcomerceCartItems";
import ModuleEcomerceCartSummary from "~/components/ecomerce/modules/ModuleEcomerceCartSummary";
import { connect } from "react-redux";
import { calculateCartQuantity } from "~/utilities/ecomerce-helpers";
import useEcomerce from "~/hooks/useEcomerce";
import { Result } from "antd";
import SkeletonTable from "~/components/elements/skeletons/SkeletonTable";

const breadcrumb = [
    {
        text: "Inicio",
        url: "/",
    },
    {
        text: "Tienda",
        url: "/shopping",
    },
    {
        text: "Carrito de Compras",
    },
];

const ShoppingCart = ({ ecomerce }) => {
    const { loading, products, getProducts } = useEcomerce();

    useEffect(() => {
        if (ecomerce.cartItems) {
            getProducts(ecomerce.cartItems, "cart");
        }
    }, [ecomerce]);

    // Views
    let cartContentView, totalView;
    if (products && products.length > 0) {
        totalView = calculateCartQuantity(products);
        cartContentView = (
            <>
                <div className="ps-cart--primary">
                    <div className="ps-cart__content">
                        <div className="ps-cart__items">
                            <ModuleEcomerceCartItems cartItems={products} />
                        </div>
                        <div className="ps-cart__actions">
                            <div className="ps-cart__link">
                                <Link href="/shop">
                                    <a className="ps-btn ps-btn--orange">
                                        Volver a la tienda
                                    </a>
                                </Link>
                            </div>
                            <div className="ps-cart__coupon">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingresa tu cupon"
                                />
                                <button className="ps-btn ps-btn--primary">
                                    Solicitar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="ps-cart__order-summary">
                        <ModuleEcomerceCartSummary cartItems={products} />
                    </div>
                </div>
            </>
        );
    } else {
        if (loading) {
            cartContentView = (
                <div className="ps-cart--primary">
                    <div className="ps-cart__content">
                        <div className="ps-cart__items">
                            <SkeletonTable rows={2} />
                        </div>
                    </div>
                    <div className="ps-cart__order-summary">
                        <ModuleEcomerceCartSummary />
                    </div>
                </div>
            );
        } else {
            cartContentView = (
                <Result status="warning" title="No hay productos en el carrito." />
            );
        }
    }

    return (
        <Container title="Shopping Cart">
            <div className="ps-page ps-page--shopping">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                        <h1 className="ps-page__heading">
                            Carrito de compras
                            {totalView ? <sup>({totalView})</sup> : ""}
                        </h1>
                    </div>
                    <div className="ps-page__content">{cartContentView}</div>
                </div>
            </div>
        </Container>
    );
};
export default connect((state) => state)(ShoppingCart);
