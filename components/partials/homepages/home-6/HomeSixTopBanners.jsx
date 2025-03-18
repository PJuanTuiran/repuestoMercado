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
const HomeSixTopBanners = () => {
    return (
        <div className="ps-section--banner  ps-top-banners">
            <div className="ps-section__overlay">
                <div className="ps-section__loading"></div>
            </div>
            <Slider
                {...carouselSetting}
                className="ps-carousel ps-carousel--fullwidth">
                <div className="carousel-item">
                    <div
                        className="ps-banner"
                        style={{ background: "#fcfcfe" }}>
                        <img
                            className="not-fuild ps-banner__imagebg"
                            src="/static/img/promotion/home6-bg.jpg"
                            alt="alt"
                        />
                        <div className="container container-initial">
                            <div className="ps-banner__block">
                                <div className="ps-banner__content">
                                    <h2 className="ps-banner__title">
                                        Antibacterial <br />
                                        Medical Mask
                                    </h2>
                                    <div className="ps-banner__desc">
                                        Just a few seconds to measure your{" "}
                                        <br />
                                        body temperature.
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
                                    <div className="ps-banner__persen bg-yellow">
                                        only <br /> $25
                                    </div>
                                </div>
                                <div className="ps-banner__thumnail">
                                    <img
                                        className="ps-banner__round"
                                        src="/static/img/round5.png"
                                        alt="alt"
                                    />
                                    <img
                                        className="ps-banner__image"
                                        src="/static/img/promotion/home6-bg.jpg"
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
                        style={{ background: "#fcfcfe" }}>
                        <img
                            className="fuild ps-banner__imagebg"
                            src="/static/img/promotion/home6-bg2.jpg"
                            alt="alt"
                        />
                        <div className="container container-initial">
                            <div className="ps-banner__block">
                                <div className="ps-banner__content">
                                    <h2 className="ps-banner__title">
                                        Dental office <br /> equipement <br />{" "}
                                        on sale
                                    </h2>
                                    <div className="ps-banner__desc">
                                        Only in this week. Don’t misss!
                                    </div>
                                    <div className="ps-banner__price">
                                        <span>$15.99</span>
                                        <del>$29.99</del>
                                    </div>
                                    <a
                                        className="bg-warning ps-banner__shop"
                                        href="#">
                                        Shop now
                                    </a>
                                    <div className="ps-banner__persen bg-primary">
                                        -30%
                                    </div>
                                </div>
                                <div className="ps-banner__thumnail ps-banner__fluid">
                                    <img
                                        className="ps-banner__image"
                                        src="/static/img/promotion/home6-bg2.jpg"
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
                        style={{ background: "#F3F5F4" }}>
                        <img
                            className="fuild ps-banner__imagebg"
                            src="/static/img/promotion/home6-bg3.jpg"
                            alt="alt"
                        />
                        <div className="container container-initial">
                            <div className="ps-banner__block">
                                <div className="ps-banner__content">
                                    <h2 className="ps-banner__title">
                                        Best prices <br /> for all the lenses
                                    </h2>
                                    <div className="ps-banner__desc">
                                        All correction values
                                    </div>
                                    <div className="ps-banner__text">
                                        Up to -30%
                                    </div>
                                    <a
                                        className="bg-warning ps-banner__shop"
                                        href="#">
                                        Shop now
                                    </a>
                                </div>
                                <div className="ps-banner__thumnail ps-banner__fluid">
                                    <img
                                        className="ps-banner__image"
                                        src="/static/img/promotion/home6-bg3.jpg"
                                        alt="alt"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default HomeSixTopBanners;
