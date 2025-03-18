import React from "react";

const WidgetProductPromotion = () => {
    return (
        <div className="ps-product--extension">
            <div className="ps-product__delivery">
                <div className="ps-delivery__item">
                    <i className="icon-wallet"></i>100% <br />
                    Devolución de dinero
                </div>
                <div className="ps-delivery__item">
                    <i className="icon-bag2"></i>Sin contacto<br />
                    Envíos
                </div>
                <div className="ps-delivery__item">
                    <i className="icon-truck"></i>Entrega gratuita para pedidos <br />
                    superiores a $ 1.000.000
                </div>
            </div>
            <div className="ps-product__payment">
                <img src="/static/img/payment-product.png" alt="" />
            </div>
            <div className="ps-product__gif">
                <div className="ps-gif__text">
                    <i className="icon-shield-check"></i>
                    <strong>Entrega 100% segura </strong>sin llamar al transportador
                </div>
                <img
                    //className="ps-gif__thumbnail"
                    className="mt-90"
                    width="200px"
                    height="180px"
                    src="/imgcarrusel/homepage/entrega.jpg"
                    alt=""
                />
            </div>
        </div>
    );
};

export default WidgetProductPromotion;
