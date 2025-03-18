import React from "react";
import Slider from "react-slick";
import NextArrow from "~/components/elements/carousel/NextArrow";
import PrevArrow from "~/components/elements/carousel/PrevArrow";

const carouselSetting = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    lazyload: true,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
};
const HomeTwoTopBanner = () => {
    return (
        <div className="ps-top-banners container">
            <div className="ps-section--banner ps-banner--container">
                <div className="ps-section__overlay">
                    <div className="ps-section__loading"></div>
                </div>
                <Slider {...carouselSetting} className="ps-carousel">
                    <div className="carousel-item">
                        <div
                            className="ps-banner"
                            style={{ background: "#103178" }}>
                            <div className="container-no-round">
                                <div className="ps-banner__block">
                                    <div className="ps-banner__content">
                                        <h2 className="ps-banner__title text-white">
                                            PowerSteel <br /> X-tra 200 Brush
                                        </h2>
                                        <div className="ps-banner__desc text-white">
                                            Solo en esta semana. No te pierdas!
                                        </div>
                                        <div className="ps-banner__price">
                                            <span className="text-yellow">
                                                $29.99
                                            </span>
                                            <del>$15.99</del>
                                        </div>
                                        <a
                                            className="bg-yellow ps-banner__shop"
                                            href="#">
                                            Agregar al carrito
                                        </a>
                                        <div className="ps-banner__persen bg-yellow">
                                            -30%
                                        </div>
                                    </div>
                                    <div className="ps-banner__thumnail ps-banner__fluid">
                                        <img
                                            className="ps-banner__image"
                                            src="/static/img/promotion/slide2.jpg"
                                            alt="alt"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div
                            className="ps-banner"
                            style={{ background: "#F0F2F5" }}>
                            <div className="container container-initial">
                                <div className="ps-banner__block">
                                    <div className="ps-banner__content">
                                        <h2 className="ps-banner__title">
                                            Fully equipped <br /> of ophthalmic
                                            rooms
                                        </h2>
                                        <div className="ps-banner__desc">
                                            Solo en esta semana. No te pierdas!
                                        </div>
                                        <div className="ps-banner__btn-group">
                                            <div className="ps-banner__btn">
                                                <img
                                                    src="/static/img/icon/bacterial.svg"
                                                    alt="alt"
                                                />
                                                Anti-Bacterial
                                            </div>
                                            <div className="ps-banner__btn">
                                                <img
                                                    src="/static/img/icon/virus.svg"
                                                    alt="alt"
                                                />
                                                Anti-Virus
                                            </div>
                                        </div>
                                        <a
                                            className="bg-warning ps-banner__shop"
                                            href="#">
                                            Shop now
                                        </a>
                                        <div className="ps-banner__persen bg-yellow ps-top">
                                            <small>only</small>$25
                                        </div>
                                    </div>
                                    <div className="ps-banner__thumnail">
                                        <img
                                            className="ps-banner__round"
                                            src="/static/img/round2.png"
                                            alt="alt"
                                        />
                                        <img
                                            className="ps-banner__image"
                                            src="/static/img/promotion/slide5.jpg"
                                            alt="alt"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div
                            className="ps-banner"
                            style={{ background: "#F0F2F5" }}>
                            <div className="container-no-round">
                                <div className="ps-banner__block">
                                    <div className="ps-banner__content">
                                        <h2 className="ps-banner__title text-white">
                                            Antibacterial <br /> Medical Mask
                                        </h2>
                                        <div className="ps-banner__desc text-white">
                                            Solo en esta semana. No te pierdas!
                                        </div>
                                        <div className="ps-banner__btn-group">
                                            <div className="ps-banner__btn text-warning">
                                                <img
                                                    src="/static/img/icon/bacterial.svg"
                                                    alt="alt"
                                                    style={{
                                                        filter: "invert(60%) sepia(75%) saturate(1000%) hue-rotate(360deg) brightness(100%) contrast(100%)",
                                                    }}
                                                />
                                                Anti-Bacterial
                                            </div>
                                            <div className="ps-banner__btn text-warning">
                                                <img
                                                    src="/static/img/icon/virus.svg"
                                                    alt="alt"
                                                    style={{
                                                        filter: "invert(60%) sepia(75%) saturate(1000%) hue-rotate(360deg) brightness(100%) contrast(100%)",
                                                    }}
                                                />
                                                Anti-Virus
                                            </div>
                                        </div>
                                        <a
                                            className="bg-warning ps-banner__shop"
                                            href="#">
                                            Agregar al carrito
                                        </a>
                                        <div className="ps-banner__persen bg-warning ps-left">
                                            -30%
                                        </div>
                                    </div>
                                    <div className="ps-banner__thumnail ps-banner__fluid">
                                        <img
                                            className="ps-banner__image"
                                            src="/static/img/promotion/slide8.jpg"
                                            alt="alt"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default HomeTwoTopBanner;
