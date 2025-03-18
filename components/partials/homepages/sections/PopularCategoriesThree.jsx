import React from "react";

import Slider from "react-slick";
import NextArrow from "~/components/elements/carousel/NextArrow";
import PrevArrow from "~/components/elements/carousel/PrevArrow";

const carouselSetting = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: false,
    dots: false,
    lazyload: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1366,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 2,
                infinite: true,
                dots: true,
                arrows: false,
            },
        },
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                dots: true,
                arrows: false,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true,
                arrows: false,
            },
        },
    ],
};
const PopularCategoriesThree = () => {
    return (
        <div className="ps-section--categories">
            <div className="ps-section--category-horizontal">
                <div className="container">
                    <div className="ps-category__carousel">
                        <Slider {...carouselSetting} className="ps-carousel">
                            <div className="carousel-item">
                                <div className="ps-category__item">
                                    <a
                                        className="ps-category__link"
                                        href="/shop">
                                        <img
                                            src="/static/img/branch/plastercross.svg"
                                            alt=""
                                        />
                                    </a>
                                    <h5 className="ps-category__name">
                                        <a href="/shop">Bandages</a>
                                    </h5>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <div className="ps-category__item">
                                    <a
                                        className="ps-category__link"
                                        href="/shop">
                                        <img
                                            src="/static/img/branch/capsule.svg"
                                            alt=""
                                        />
                                    </a>
                                    <h5 className="ps-category__name">
                                        <a href="/shop">Capsules</a>
                                    </h5>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="ps-category__item">
                                    <a
                                        className="ps-category__link"
                                        href="/shop">
                                        <img
                                            src="/static/img/branch/dental.svg"
                                            alt=""
                                        />
                                    </a>
                                    <h5 className="ps-category__name">
                                        <a href="/shop">Dental</a>
                                    </h5>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="ps-category__item">
                                    <a
                                        className="ps-category__link"
                                        href="/shop">
                                        <img
                                            src="/static/img/branch/thermometer.svg"
                                            alt=""
                                        />
                                    </a>
                                    <h5 className="ps-category__name">
                                        <a href="/shop">Thermometer</a>
                                    </h5>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="ps-category__item">
                                    <a
                                        className="ps-category__link"
                                        href="/shop">
                                        <img
                                            src="/static/img/branch/heart-healt.svg"
                                            alt=""
                                        />
                                    </a>
                                    <h5 className="ps-category__name">
                                        <a href="/shop">Heart Health</a>
                                    </h5>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="ps-category__item">
                                    <a
                                        className="ps-category__link"
                                        href="/shop">
                                        <img
                                            src="/static/img/branch/microscope.svg"
                                            alt=""
                                        />
                                    </a>
                                    <h5 className="ps-category__name">
                                        <a href="/shop">Micrscope</a>
                                    </h5>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="ps-category__item">
                                    <a
                                        className="ps-category__link"
                                        href="/shop">
                                        <img
                                            src="/static/img/branch/tube.svg"
                                            alt=""
                                        />
                                    </a>
                                    <h5 className="ps-category__name">
                                        <a href="/shop">Tubes</a>
                                    </h5>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularCategoriesThree;
