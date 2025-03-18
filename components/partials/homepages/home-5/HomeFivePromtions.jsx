import React from "react";

const HomeFivePromtions = () => {
    return (
        <div className="ps-home-promotions">
            <div className="container">
                <div className="ps-promo">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="ps-promo__item">
                                <img
                                    className="ps-promo__banner"
                                    src="/static/img/promotion/bg-banner13.jpg"
                                    alt="alt"
                                />
                                <div className="ps-promo__content">
                                    <h4 className="mb-20 text-white ps-promo__name">
                                        Antibacterial <br />
                                        Medical Mask
                                    </h4>
                                    <div className="ps-promo__icon">
                                        <span>Anti-Bacterial</span>
                                    </div>
                                    <a
                                        className="btn-warning ps-promo__btn"
                                        href="/shop">
                                        Agregar al carrito
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="ps-promo__item">
                                <img
                                    className="ps-promo__banner"
                                    src="/static/img/promotion/bg-banner14.jpg"
                                    alt="alt"
                                />
                                <div className="ps-promo__content">
                                    <h4 className="text-white ps-promo__name">
                                        PowerSteel <br />
                                        X-tra 200 Brush
                                    </h4>
                                    <div className="ps-promo__meta">
                                        <p className="ps-promo__price">
                                            $119.00
                                        </p>
                                        <p className="ps-promo__del">$129.00</p>
                                    </div>
                                    <a
                                        className="btn-yellow ps-promo__btn"
                                        href="/shop">
                                        Shop now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeFivePromtions;
