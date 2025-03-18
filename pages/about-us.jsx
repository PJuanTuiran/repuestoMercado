import React from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import AboutBanner from "~/components/partials/pages/about-us/AboutBanner";
import AboutInfo from "~/components/partials/pages/about-us/AboutInfo";
import AboutPromotion from "~/components/partials/pages/about-us/AboutPromotion";
import AboutProject from "~/components/partials/pages/about-us/AboutProject";
import AboutVideo from "~/components/partials/pages/about-us/AboutVideo";
import Testimonials from "~/components/shared/sections/Testimonials";
import Subscribe from "~/components/shared/sections/Subscribe";

const breadcrumb = [
    {
        id: 1,
        text: "Inicio",
        url: "/",
    },

    {
        id: 2,
        text: "Sobre nosotros",
    },
];

const AboutUsScreen = () => {
    return (
        <Container title="About Us">
            <main className="ps-page ps-page--inner">
                <div className="ps-page__header">
                    <div className="container">
                        <BreadCrumb breacrumb={breadcrumb} />
                    </div>
                </div>
                <div className="ps-page__content">
                    <div className="ps-about">
                        <div className="container">
                            <AboutBanner />
                            <AboutInfo />
                        </div>
                        <div className="ps-about__content">
                            <AboutPromotion />
                            <AboutProject />
                            <AboutVideo />
                        </div>
                        <Testimonials />
                        <Subscribe />
                    </div>
                </div>
            </main>
        </Container>
    );
};

export default AboutUsScreen;
