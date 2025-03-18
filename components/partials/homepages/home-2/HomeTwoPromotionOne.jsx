import React from "react";

const HomeTwoPromotionOne = () => {
    return (
        <div className="ps-promo ps-promotions ps-home-promotions">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="ps-promo__item">
                            <img
                                className="ps-promo__banner"
                                src="/static/img/promotion/bg-banner4.jpg"
                                alt="alt"
                            />
                            <div className="ps-promo__content">
                                <span className="ps-promo__badge">New</span>
                                <h4 className="mb-20 ps-promo__name">
                                    Get rid of bacteria <br />
                                    in your home
                                </h4>
                                <a className="ps-promo__btn" href="/shop">
                                    More
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="ps-promo__item">
                            <img
                                className="ps-promo__banner"
                                src="/static/img/promotion/bg-banner5.jpg"
                                alt="alt"
                            />
                            <div className="ps-promo__content">
                                <h4 className="ps-promo__name">
                                    Candid <br />
                                    Whitening Kit
                                </h4>
                                <div className="ps-promo__sale">-10%</div>
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

export default HomeTwoPromotionOne;
