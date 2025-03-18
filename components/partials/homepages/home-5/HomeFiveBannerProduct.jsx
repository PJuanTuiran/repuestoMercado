import React from "react";

const HomeFiveBannerProduct = ({ type = 1 }) => {
    if (type === 1) {
        return (
            <div className="ps-block__image">
                <section className="ps-home__banner">
                    <div className="ps-banner">
                        <img
                            className="ps-banner__overlay"
                            src="/static/img/promotion/bg-banner15.jpg"
                            alt="alt"
                        />
                        <div className="ps-banner__block">
                            <div className="ps-banner__content">
                                <h2 className="ps-banner__title">
                                    Take care of <br />
                                    yourself and <br />
                                    your loved ones
                                </h2>
                                <div className="ps-banner__btn-group">
                                    <div className="ps-banner__btn">
                                        Anti-Bacterial
                                    </div>
                                    <div className="ps-banner__btn">
                                        Anti-Virus
                                    </div>
                                </div>
                                <a
                                    className="bg-yellow ps-banner__shop"
                                    href="#">
                                    Face mask
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    } else if (type === 2) {
        return (
            <div className="ps-block__image">
                <section className="ps-home__banner">
                    <div className="ps-banner">
                        <img
                            className="ps-banner__overlay"
                            src="/static/img/promotion/blood-pressure.jpg"
                            alt="alt"
                        />
                        <div className="ps-banner__block">
                            <div className="ps-banner__content">
                                <h2 className="ps-banner__title">
                                    Best blood <br />
                                    pressure <br />
                                    monitors
                                </h2>
                                <a
                                    className="bg-yellow ps-banner__shop"
                                    href="#">
                                    Blood pressure
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    } else if (type === 3) {
        return (
            <div className="ps-block__image">
                <section className="ps-home__banner">
                    <div className="ps-banner">
                        <img
                            className="ps-banner__overlay"
                            src="/static/img/promotion/bg-banner-dental.jpg"
                            alt="alt"
                        />
                        <div className="ps-banner__block">
                            <div className="ps-banner__content">
                                <h2 className="ps-banner__title text-white">
                                    Home and <br />
                                    dental office <br />
                                    equipment
                                </h2>
                                <div className="ps-banner__price">
                                    <span className="text-yellow">$25.99</span>
                                    <del>$15.99</del>
                                </div>
                                <a
                                    className="bg-yellow ps-banner__shop"
                                    href="#">
                                    Dental
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
};

export default HomeFiveBannerProduct;
