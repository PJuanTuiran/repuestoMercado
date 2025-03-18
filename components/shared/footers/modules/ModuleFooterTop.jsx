import React from 'react';

const ModuleFooterTop = () => {
    return (
        <div className="mtmenos60 ml-100 ps-footer--top ps-footer__top tamañocajafooter">
            <div className="container">
                <div className="row m-0">
                    <div className="col-12 col-sm-3 p-0">
                        <p className="text-center">
                            <a className="ps-footer__link" href="#">
                                <i className="icon-wallet"></i>100% Devolución de dinero
                            </a>
                        </p>
                    </div>
                    <div className="col-12 col-sm-3 p-0">
                        <p className="text-center">
                            <a className="ps-footer__link" href="#">
                                <i className="icon-bag2"></i>Sin contacto para Envío
                            </a>
                        </p>
                    </div>
                    <div className="col-12 col-sm-4 p-0">
                        <p className="text-center">
                            <a className="ps-footer__link" href="#">
                                <i className="icon-truck"></i>Entrega gratuita para pedidos superiores a $1.000.000
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleFooterTop;
