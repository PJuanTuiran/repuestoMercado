import React from "react";
import Slider from "react-slick";
import NextArrow from "~/components/elements/carousel/NextArrow";
import PrevArrow from "~/components/elements/carousel/PrevArrow";
import Rating from "~/components/elements/Rating";
import TestimonialItem from "~/components/elements/TestimonialItem";

const carouselSetting = {
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: true,
                arrows: false,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: true,
                arrows: false,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: false,
            },
        },
    ],
};

const reviews = [
    {
        id: 1,
        text: "I ordered on Friday evening and on Monday at 12:30 the package was with me. I have never encountered such a fast order processing.",
        name: "Mark J.",
    },
    {
        id: 2,
        text: "There was a small mistake in the order. In return, I got the correct order and I could keep the wrong one for myself.",
        name: "Mark J.",
    },
    {
        id: 3,
        text: " Everything is perfect. I would recommend!",
        name: "Kristin Watson",
    },
    {
        id: 4,
        text: " There was a small mistake in the order. In return, I got the correct order and I could keep the wrong one for myself.!",
        name: "Brooklyn Simmons",
    },
];

const HomeSixTestimonials = () => {
    const items = reviews.map((item) => (
        <div key={item.id}>
            <TestimonialItem source={item} />
        </div>
    ));
    return (
        <>
            <div className="ps-home-testimonials">
                <div className="ps-section__left">
                    <img
                        src="/static/img/promotion/home6-latest-review_280x.png"
                        alt=""
                    />
                </div>
                <div className="ps-section__right">
                    <div className="ps-section__content">
                        <h3 className="ps-section__title">
                            <img src="/static/img/quote-icon.png" alt="" />
                            Latest reviews
                        </h3>
                        <Slider {...carouselSetting} className="ps-carousel">
                            {items}
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeSixTestimonials;
