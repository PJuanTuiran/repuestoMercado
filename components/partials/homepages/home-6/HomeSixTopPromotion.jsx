import React from "react";

const HomeSixTopPromotion = () => {
    return (
        <>
            <div className="ps-banner--promotion-seven ps-home-banner--one bg--cover">
                <div className="container">
                    <div className="ps-banner__left">
                        <div className="ps-banner__content">
                            <h2 className="ps-banner__title">
                                The best quality <br />
                                masks at the
                                <br />
                                best price
                            </h2>

                            <div className="ps-banner__meta">
                                <span>
                                    <img
                                        src="/static/img/icon/virus.svg"
                                        alt="alt"
                                        className="mr-2"
                                    />
                                    Up to 5 users simultaneously
                                </span>
                                <span>
                                    <img
                                        src="/static/img/icon/ribbon.svg"
                                        alt="alt"
                                        className="mr-2"
                                    />
                                    Has HEALTH certificate
                                </span>
                            </div>
                            <a className="ps-btn ps-btn--rounded" href="#">
                                Shop Now
                            </a>
                        </div>
                    </div>
                    <div className="ps-banner__right">
                        <img
                            className="ps-banner__image"
                            src="/static/img/promotion/face-masks.jpg"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeSixTopPromotion;
