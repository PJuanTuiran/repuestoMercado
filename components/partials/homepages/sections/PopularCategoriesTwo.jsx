import React from "react";

const PopularCategoriesTwo = () => {
    return (
        <div className="ps-section--categories ">
            <div className="container">
                <h3 className="ps-section__title">Popular categories</h3>
                <div className="ps-section__content">
                    <div className="ps-categories__list">
                        <div className="ps-categories__item">
                            <a className="ps-categories__link" href="/shop">
                                <img
                                    src="/static/img/branch/plastercross.svg"
                                    alt=""
                                />
                            </a>
                            <aps-popular--categories-two
                                className="ps-categories__name"
                                href="/shop">
                                Bandages
                            </aps-popular--categories-two>
                        </div>
                        <div className="ps-categories__item">
                            <a className="ps-categories__link" href="/shop">
                                <img
                                    src="/static/img/branch/capsule.svg"
                                    alt=""
                                />
                            </a>
                            <a className="ps-categories__name" href="/shop">
                                Capsules
                            </a>
                        </div>
                        <div className="ps-categories__item">
                            <a className="ps-categories__link" href="/shop">
                                <img
                                    src="/static/img/branch/dental.svg"
                                    alt=""
                                />
                            </a>
                            <a className="ps-categories__name" href="/shop">
                                Dental
                            </a>
                        </div>
                        <div className="ps-categories__item">
                            <a className="ps-categories__link" href="/shop">
                                <img
                                    src="/static/img/branch/thermometer.svg"
                                    alt=""
                                />
                            </a>
                            <a className="ps-categories__name" href="/shop">
                                Thermometer
                            </a>
                        </div>
                        <div className="ps-categories__item">
                            <a className="ps-categories__link" href="/shop">
                                <img
                                    src="/static/img/branch/heart-healt.svg"
                                    alt=""
                                />
                            </a>
                            <a className="ps-categories__name" href="/shop">
                                Heart Health
                            </a>
                        </div>
                        <div className="ps-categories__item">
                            <a className="ps-categories__link" href="/shop">
                                <img
                                    src="/static/img/branch/microscope.svg"
                                    alt=""
                                />
                            </a>
                            <a className="ps-categories__name" href="/shop">
                                Micrscope
                            </a>
                        </div>
                        <div className="ps-categories__item">
                            <a className="ps-categories__link" href="/shop">
                                <img src="/static/img/branch/tube.svg" alt="" />
                            </a>
                            <a className="ps-categories__name" href="/shop">
                                Tubes
                            </a>
                        </div>
                    </div>
                    <div className="text-center">
                        <a className="ps-categories__show" href="/shop">
                            Show all
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularCategoriesTwo;
