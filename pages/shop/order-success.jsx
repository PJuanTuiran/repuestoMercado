import React from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import { Alert } from "antd";

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
            text: "Pedido confirmado!",
        },
    ];

    return (
        <Container title="Order Succe">
            <div className="ps-page ps-page--inner">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                        <h1 className="ps-page__heading">Pedido Confirmado</h1>
                    </div>
                    <div className="ps-page__content">
                        <div className="row">
                            <div className="col-md-6">
                                <Alert
                                    message="Gracias. Tu orden ha sido recibida."
                                    description="Ingresar información del producto y/o pedido XXXXXXXXXXXXXXXXXXXXXXXXXXX? "
                                    type="success"
                                    showIcon
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CheckoutScreen;
