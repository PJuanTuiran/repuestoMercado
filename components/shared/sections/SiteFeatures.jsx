import React from "react";

const SiteFeatures = () => {
    return (
        <div className="ps-footer--top ps-site-features">
            <div className="container">
                <div className="row m-0">
                    <div className="col-12 col-sm-4 p-0">
                        <p className="text-center">
                            <a className="ps-footer__link" href="#">
                                <i className="icon-wallet"></i>100% Devolución de dinero
                            </a>
                        </p>
                    </div>
                    <div className="col-12 col-sm-4 p-0">
                        <p className="text-center">
                            <a className="ps-footer__link" href="#">
                                <i className="icon-bag2"></i> Envío sin contacto
                            </a>
                        </p>
                    </div>
                    <div className="col-12 col-sm-4 p-0">
                        <p className="text-center">
                            <a className="ps-footer__link" href="#">
                                <i className="icon-truck"></i>Entrega gratuita para pedidos de más de $ 1.000.000
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiteFeatures;
