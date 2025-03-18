import React from "react";

const PopularCategoriesFour = () => {
    return (
        <div className="ps-section--categories ps-section--category ps-category--image">
            <div className="container">
                <h3 className="ps-section__title">
                    Check out the most popular categories
                </h3>
                <div className="ps-section__content">
                    <div className="row">
                        <div className="col-6 col-md-4">
                            <div className="ps-category__thumbnail">
                                <a className="ps-category__image" href="/shop">
                                    <img
                                        src="/static/img/promotion/facemask-cat.png"
                                        alt=""
                                    />
                                </a>
                                <div className="ps-category__content">
                                    <a
                                        className="ps-category__name"
                                        href="/shop">
                                        Face masks
                                    </a>
                                    <a
                                        className="ps-category__more"
                                        href="/shop">
                                        More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="ps-category__thumbnail">
                                <a className="ps-category__image" href="/shop">
                                    <img
                                        src="/static/img/promotion/uniforms-cat.png"
                                        alt=""
                                    />
                                </a>
                                <div className="ps-category__content">
                                    <a
                                        className="ps-category__name"
                                        href="/shop">
                                        Uniforms
                                    </a>
                                    <a
                                        className="ps-category__more"
                                        href="/shop">
                                        More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="ps-category__thumbnail">
                                <a className="ps-category__image" href="/shop">
                                    <img
                                        src="/static/img/promotion/protectcover-cat.png"
                                        alt=""
                                    />
                                </a>
                                <div className="ps-category__content">
                                    <a
                                        className="ps-category__name"
                                        href="/shop">
                                        Protective covers
                                    </a>
                                    <a
                                        className="ps-category__more"
                                        href="/shop">
                                        More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="ps-category__thumbnail">
                                <a className="ps-category__image" href="/shop">
                                    <img
                                        src="/static/img/promotion/dental-cat.png"
                                        alt=""
                                    />
                                </a>
                                <div className="ps-category__content">
                                    <a
                                        className="ps-category__name"
                                        href="/shop">
                                        Dental
                                    </a>
                                    <a
                                        className="ps-category__more"
                                        href="/shop">
                                        More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="ps-category__thumbnail">
                                <a className="ps-category__image" href="/shop">
                                    <img
                                        src="/static/img/promotion/pressure-cat.png"
                                        alt=""
                                    />
                                </a>
                                <div className="ps-category__content">
                                    <a
                                        className="ps-category__name"
                                        href="/shop">
                                        Blood pressure
                                    </a>
                                    <a
                                        className="ps-category__more"
                                        href="/shop">
                                        More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="ps-category__thumbnail">
                                <a className="ps-category__image" href="/shop">
                                    <img
                                        src="/static/img/promotion/sugarlevel-cat.png"
                                        alt=""
                                    />
                                </a>
                                <div className="ps-category__content">
                                    <a
                                        className="ps-category__name"
                                        href="/shop">
                                        Sugar level
                                    </a>
                                    <a
                                        className="ps-category__more"
                                        href="/shop">
                                        More
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

export default PopularCategoriesFour;
