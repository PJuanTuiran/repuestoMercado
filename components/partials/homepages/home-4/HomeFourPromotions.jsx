import React from "react";

const HomeFourPromotions = () => {
    return (
        <section className="ps-home-promotions">
            <div className="container">
                <div className="ps-promo">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="ps-promo__item">
                                <img
                                    className="ps-promo__banner"
                                    src="/static/img/promotion/bg-banner2.jpg"
                                    alt="alt"
                                />
                                <div className="ps-promo__content">
                                    <h4 className="ps-promo__name">
                                        Digital <br />
                                        Thermometer <br />
                                        X30-Pro
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
                                    src="/static/img/promotion/bg-banner8.jpg"
                                    alt="alt"
                                />
                                <div className="ps-promo__content">
                                    <h4 className="text-white ps-promo__name">
                                        Hubble <br />
                                        Eye <br />
                                        Lenses
                                    </h4>
                                    <div className="ps-promo__sale text-yellow">
                                        -12%
                                    </div>
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
                                    src="/static/img/promotion/bg-banner7.jpg"
                                    alt="alt"
                                />
                                <div className="ps-promo__content">
                                    <span className="ps-promo__badge">New</span>
                                    <h4 className="mb-20 ps-promo__name">
                                        SuperBrush <br />
                                        X200 Higenic <br />
                                        ProMaster
                                    </h4>
                                    <a className="ps-promo__btn" href="/shop">
                                        More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeFourPromotions;
