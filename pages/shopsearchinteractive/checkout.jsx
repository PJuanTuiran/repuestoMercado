import React from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import ModulEcomerceOrderSummary from "~/components/ecomerce/modules/ModulEcomerceOrderSummary";
import FormCheckout from "~/components/shared/forms/FormCheckout";

const CheckoutScreen = () => {
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
            text: "Pagar",
        },
    ];

    return (
        <Container title="Checkout">
            <div className="ps-page ps-page--shopping">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                        <h1 className="ps-page__heading">Zona de Pago</h1>
                    </div>
                    <div className="ps-page__content">
                        <div className="ps-checkout">
                            <div className="ps-checkout__wapper">
                                <p className="ps-checkout__text">
                                    Regresar?{" "}
                                    <a href="#">Click aquí para regresar</a>
                                </p>
                                <p className="ps-checkout__text">
                                    Tienes un cupon?{" "}
                                    <a href="shopping-cart.html">
                                        Click Aquí para ingresar tu código
                                    </a>
                                </p>
                            </div>
                            <div className="row">
                                <div className="col-md-8">
                                    <FormCheckout />
                                </div>
                                <div className="col-md-4">
                                    <ModulEcomerceOrderSummary />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CheckoutScreen;
