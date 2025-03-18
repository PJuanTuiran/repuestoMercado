import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import NextArrow from "~/components/elements/carousel/NextArrow";
import PrevArrow from "~/components/elements/carousel/PrevArrow";

const carouselSetting = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
};
const HomeOneTopBanners = () => {
    const [descripcion, setDescripcion ] = useState("Solo en esta semana. ¡No te pierdas!");
    const [nombreProducto, setNombreProducto] = useState("Kit de Arrastre");
    const [precioDescuento, setPrecioDescuento] = useState(131900);
    const [precioBase, setPrecioBase] = useState(191.255);
    const [descuento, setDescuento] = useState(45);

    return (
        <section className="ps-section--banner ps-top-banners">
            <div className="ps-section__overlay">
                <div className="ps-section__loading"></div>
            </div>
            <Slider
                {...carouselSetting}
                className="ps-carousel ps-carousel--fullwidth">
                <div>
                    <div
                        className="ps-banner"
                        style={{ background: "#DAECFA" }}>
                        <div className="container container-initial">
                            <div className="ps-banner__block">
                                <div className="ps-banner__content">
                                    <h2 className="ps-banner__title">
                                        {nombreProducto}
                                    </h2>
                                    <div className="ps-banner__desc">
                                        {descripcion}!
                                    </div>
                                    <div className="ps-banner__price">
                                        <span>$ {precioDescuento}</span>
                                        <del> $ {precioBase}</del>
                                    </div>
                                    <a
                                        className="bg-warning ps-banner__shop"
                                        href="#">
                                        Compra ahora
                                    </a>
                                    <div className="ps-banner__persen bg-warning ps-center">
                                        -{descuento}%
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
                                        src="/static/img/promotion/slide1_1.png"
                                        alt="alt"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className="ps-banner"
                        style={{ background: "#F0F2F5" }}>
                        <div className="container container-initial">
                            <div className="ps-banner__block">
                                <div className="ps-banner__content">
                                    <h2 className="ps-banner__title">
                                        Direccionales
                                        <br /> BMW GS 300
                                    </h2>
                                    <div className="ps-banner__desc">
                                        Cambia la apariencia de tu Moto
                                    </div>
                                    <div className="ps-banner__btn-group">
                                        <div className="ps-banner__btn">
                                            <img
                                                src="/static/img/icon/bacterial.svg"
                                                alt="alt"
                                            />
                                            Gangas Destacadas de Direccionales Para Moto
                                        </div>
                                        <div className="ps-banner__btn">
                                            <img
                                                src="/static/img/icon/virus.svg"
                                                alt="alt"
                                            />
                                            El mejor precio
                                        </div>
                                    </div>
                                    <a
                                        className="bg-warning ps-banner__shop"
                                        href="#">
                                        Compra ahora
                                    </a>
                                    <div className="ps-banner__persen bg-yellow ps-top">
                                        <small>Por solo</small>$15.000
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
                                        src="/static/img/promotion/direccionales.jpg"
                                        alt="alt"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className="ps-banner"
                        style={{ background: "#FFCC00" }}>
                        <div className="container container-initial">
                            <div className="ps-banner__block">
                                <div className="ps-banner__content">
                                    <h2 className="ps-banner__title">
                                        Bajas Pulsar <br />
                                        NS 200 Azul
                                    </h2>
                                    <div className="ps-banner__desc">
                                        Nada mejor que una Bajaj Pulsar 200NS? - Puede ser tuya Ahora!
                                    </div>
                                    <div className="ps-banner__btn-group">
                                        <div className="ps-banner__btn">
                                            <img
                                                src="/static/img/icon/bacterial.svg"
                                                alt="alt"
                                            />
                                            Puede ser tuya!
                                        </div>
                                        <div className="ps-banner__btn">
                                            <img
                                                src="/static/img/icon/virus.svg"
                                                alt="alt"
                                            />
                                            Modelo 2022
                                        </div>
                                    </div>
                                    <a
                                        className="bg-white ps-banner__shop"
                                        href="#">
                                        Comprar Ahora
                                    </a>
                                    <div className="ps-banner__persen bg-primary">
                                        -5%
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
                                        src="/static/img/promotion/pulsar-ns-200-500x500.jpg"
                                        alt="alt"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
        </section>
    );
};

export default HomeOneTopBanners;
