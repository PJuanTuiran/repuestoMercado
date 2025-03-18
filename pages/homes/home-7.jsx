import React from "react";
import Container from "~/components/layouts/Container";
import FollowInstagram from "~/components/shared/sections/FollowInstagram";
import HomeSevenSubscribe from "~/components/partials/homepages/home-7/HomeSevenSubscribe";
import HomeSevenChooseYourStyle from "~/components/partials/homepages/home-7/HomeSevenChooseYourStyle";
import Testimonials from "~/components/shared/sections/Testimonials";
import AboutVideo from "~/components/partials/pages/about-us/AboutVideo";
import HomeSevenServices from "~/components/partials/homepages/home-7/HomeSevenServices";
import HomeSevenPromotion from "~/components/partials/homepages/home-7/HomeSevenPromotion";
import HomeSevenTopBanner from "~/components/partials/homepages/home-7/HomeSevenTopBanner";
import HeaderSix from "~/components/shared/headers/HeaderSix";

const HomeSixScreen = () => {
    return (
        <Container title="Homepage 7" header={<HeaderSix />}>
            <main id="homepage-seven" className="ps-home--7">
                <HomeSevenTopBanner />
                <HomeSevenPromotion />
                <HomeSevenServices />
                <AboutVideo />
                <Testimonials container={true} />
                <HomeSevenChooseYourStyle />
                <HomeSevenSubscribe />
                <FollowInstagram />
            </main>
        </Container>
    );
};

export default HomeSixScreen;
