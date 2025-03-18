import React from "react";

const HomeOnePromotions = () => {
    return (
        <div className="ps-promo ps-not-padding ps-home-promotion ps-home-promotion--one">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="ps-promo__item">
                            <img
                                className="ps-promo__banner"
                                src="/static/img/promotion/ofertasmrp/oferta1.jpg"
                                alt="alt"
                            />
                            <div className="ps-promo__content">
                                <span className="ps-promo__badge">New</span>
                                <h4 className="mb-20 ps-promo__name">
                                    Caja de Herramienta <br />
                                    Klatter
                                </h4>
                                <a className="ps-promo__btn" href="/shop">
                                    More
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="ps-promo__item">
                            <img
                                className="ps-promo__banner"
                                src="/static/img/promotion/ofertasmrp/oferta2.png"
                                alt="alt"
                            />
                            <div className="ps-promo__content">
                                <h4 className="ps-promo__name">
                                    Llantas Kumo <br />
                                    215 / 55 ZR / 17
                                </h4>
                                <div className="ps-promo__sale">-10%</div>
                                <a className="ps-promo__btn" href="/shop">
                                    Shop now
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="ps-promo__item">
                            <img
                                className="ps-promo__banner"
                                src="/static/img/promotion/ofertasmrp/oferta3.jpg"
                                alt="alt"
                            />
                            <div className="ps-promo__content">
                                <h4 className="text-white ps-promo__name">
                                    Kia Cerato <br />
                                    Lambasi original
                                </h4>
                                <div className="ps-promo__meta">
                                    <p className="ps-promo__price">$119.00</p>
                                    <p className="ps-promo__del">$129.00</p>
                                </div>
                                <a className="ps-promo__btn" href="/shop">
                                    Shop now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeOnePromotions;
